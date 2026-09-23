import Vapi from "@vapi-ai/web";
import { resolveVapiAssistantId, getVapiPublicKey } from "./config";
import { StartCallParams, VapiCallStatus } from "./types";
import { AssistantId, ServiceArea } from "@/types/saaj";

class VapiClientService {
  private vapiInstance: Vapi | null = null;
  private currentPublicKey: string | null = null;
  private listenersAttached = false;
  private statusCallback: ((status: VapiCallStatus) => void) | null = null;
  private errorCallback: ((errorMsg: string) => void) | null = null;
  private volumeCallback: ((volume: number) => void) | null = null;

  // Session Token to prevent asynchronous race conditions & stale events
  private currentSessionId = 0;
  private currentCallStatus: VapiCallStatus = "idle";
  private wasEverActive = false;
  private lastEndedReason: string | null = null;
  private lastExplicitUserStopReason: string | null = null;

  // Latency instrumentation timestamps (T0 to T4)
  private t0_ctaClick = 0;
  private t1_clientReady = 0;
  private t2_startInvoked = 0;
  private t3_callStart = 0;
  private t4_firstResponse = 0;
  private firstResponseCaptured = false;
  private activeAssistant: AssistantId | null = null;
  private activeServiceArea: ServiceArea | null = null;

  /**
   * Preloads/pre-initializes the Vapi Web SDK singleton instance.
   */
  preload(): void {
    if (typeof window === "undefined") return;
    try {
      const publicKey = getVapiPublicKey();
      if (publicKey && (!this.vapiInstance || this.currentPublicKey !== publicKey)) {
        if (process.env.NODE_ENV === "development") {
          console.log(`[SAAJ VAPI] [${performance.now().toFixed(2)}ms] Preloading Vapi Web SDK singleton instance...`);
        }
        this.getVapiInstance(publicKey);
      }
    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[SAAJ VAPI] Preload attempt failed quietly:", e);
      }
    }
  }

  /**
   * Retrieves or instantiates the stable singleton Vapi client.
   * Configures explicit microphone permissions & audio source options for Daily.co WebRTC transport.
   */
  private getVapiInstance(publicKey: string): Vapi {
    if (!this.vapiInstance || this.currentPublicKey !== publicKey) {
      if (process.env.NODE_ENV === "development") {
        console.log(`[SAAJ VAPI] [${performance.now().toFixed(2)}ms] Instantiating singleton Vapi client`);
      }
      this.vapiInstance = new Vapi(
        publicKey,
        undefined,
        { alwaysIncludeMicInPermissionPrompt: true },
        { audioSource: true, startAudioOff: false }
      );
      this.currentPublicKey = publicKey;
      this.listenersAttached = false;
    }

    if (!this.listenersAttached && this.vapiInstance) {
      this.attachListeners(this.vapiInstance);
      this.listenersAttached = true;
      if (process.env.NODE_ENV === "development") {
        console.log(`[SAAJ VAPI] [${performance.now().toFixed(2)}ms] Vapi event listeners attached`);
      }
    }

    return this.vapiInstance;
  }

  private updateStatus(newStatus: VapiCallStatus, sessionId: number): void {
    if (sessionId !== this.currentSessionId) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[SAAJ VAPI] Ignored status update "${newStatus}" from stale session #${sessionId} (current: #${this.currentSessionId})`);
      }
      return;
    }

    if (newStatus === "active") {
      this.wasEverActive = true;
    }

    const allowed = this.isValidTransition(this.currentCallStatus, newStatus);
    if (!allowed) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[SAAJ VAPI] Blocked invalid transition: "${this.currentCallStatus}" -> "${newStatus}"`);
      }
      return;
    }

    this.currentCallStatus = newStatus;
    if (this.statusCallback) {
      this.statusCallback(newStatus);
    }
  }

  private isValidTransition(from: VapiCallStatus, to: VapiCallStatus): boolean {
    if (from === to) return true;
    // Terminal states cannot transition back to active or starting
    if ((from === "ended" || from === "error" || from === "ending") && (to === "active" || to === "starting")) {
      return false;
    }
    return true;
  }

  /**
   * Pre-flight microphone permission and hardware check without creating competing stream objects.
   */
  private async checkMicrophonePermission(): Promise<{ allowed: boolean; reason?: string }> {
    if (typeof window === "undefined") return { allowed: true };

    if (!navigator?.mediaDevices) {
      return { allowed: false, reason: "O teu navegador não suporta chamadas de áudio." };
    }

    try {
      if (navigator.permissions && typeof navigator.permissions.query === "function") {
        const perm = await navigator.permissions.query({ name: "microphone" as PermissionName });
        if (perm && perm.state === "denied") {
          return { allowed: false, reason: "Não foi possível aceder ao microfone." };
        }
      }
    } catch {
      // Permission API query for 'microphone' is unsupported on older Safari/iOS versions, ignore
    }

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices.filter((d) => d.kind === "audioinput");
      if (devices.length > 0 && audioInputs.length === 0) {
        return { allowed: false, reason: "Nenhum microfone encontrado no dispositivo." };
      }
    } catch {
      // Ignore device enumeration errors
    }

    return { allowed: true };
  }

  /**
   * Privacy-safe technical diagnostic logging after call start.
   * NEVER logs audio, transcripts, or personal identifiable information.
   */
  private async runPrivacySafeDiagnostics(vapi: Vapi, activeSession: number): Promise<void> {
    if (typeof window === "undefined") return;

    let permState = "unknown";
    try {
      if (navigator.permissions && typeof navigator.permissions.query === "function") {
        const perm = await navigator.permissions.query({ name: "microphone" as PermissionName });
        permState = perm?.state || "unknown";
      }
    } catch {
      permState = "unsupported-query";
    }

    let audioDeviceCount = 0;
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      audioDeviceCount = devices.filter((d) => d.kind === "audioinput").length;
    } catch {
      audioDeviceCount = -1;
    }

    let isMuted = false;
    try {
      isMuted = vapi.isMuted();
    } catch {
      isMuted = false;
    }

    const dailyCall = (vapi as any)?.call || (vapi as any)?.dailyCallObject;
    const localParticipant = dailyCall?.participants?.()?.local;
    const audioTrackState = localParticipant?.tracks?.audio;
    const track: MediaStreamTrack | null = audioTrackState?.track || null;

    if (process.env.NODE_ENV === "development") {
      console.log(`[SAAJ VAPI DIAGNOSTIC] Technical Call-Start Summary [Session #${activeSession}]:
- Permission State: ${permState}
- Audio Input Devices Found: ${audioDeviceCount}
- Vapi isMuted: ${isMuted}
- Daily Audio State: ${audioTrackState?.state || "unknown"}
- MediaStreamTrack Present: ${!!track}
- Track readyState: ${track?.readyState || "N/A"}
- Track enabled: ${track?.enabled ?? "N/A"}
- Track muted: ${track?.muted ?? "N/A"}`);
    }

    this.monitorAudioTrack(vapi, activeSession);
  }

  /**
   * Monitors active MediaStreamTrack state transitions (readyState, enabled, muted)
   * and remediates iOS Safari audio routing mutes automatically.
   */
  private monitorAudioTrack(vapi: Vapi, activeSession: number): void {
    try {
      const dailyCall = (vapi as any)?.call || (vapi as any)?.dailyCallObject;
      const localParticipant = dailyCall?.participants?.()?.local;
      const audioTrackState = localParticipant?.tracks?.audio;

      if (audioTrackState?.state === "blocked") {
        const blockedReason = audioTrackState?.blocked?.reason || "permissions";
        if (process.env.NODE_ENV === "development") {
          console.warn(`[SAAJ VAPI DIAGNOSTIC] Session #${activeSession}: Daily microphone track BLOCKED (reason: "${blockedReason}")`);
        }
        if (activeSession === this.currentSessionId) {
          this.updateStatus("error", activeSession);
          if (this.errorCallback) {
            this.errorCallback("Não foi possível aceder ao microfone.");
          }
        }
        return;
      }

      const track: MediaStreamTrack | null = audioTrackState?.track || null;
      if (!track) return;

      // Attach event handlers to track state changes
      track.onmute = () => {
        if (process.env.NODE_ENV === "development") {
          console.warn(`[SAAJ VAPI DIAGNOSTIC] Session #${activeSession}: MediaStreamTrack CHANGED -> muted=true (readyState=${track.readyState}, enabled=${track.enabled})`);
        }
        // iOS Safari remediation: when Safari sets muted=true on audio route change, re-enable/unmute
        try {
          if (this.vapiInstance && activeSession === this.currentSessionId) {
            this.vapiInstance.setMuted(false);
            if (dailyCall && typeof dailyCall.setLocalAudio === "function") {
              dailyCall.setLocalAudio(true);
            }
          }
        } catch {
          // quiet catch
        }
      };

      track.onunmute = () => {
        if (process.env.NODE_ENV === "development") {
          console.log(`[SAAJ VAPI DIAGNOSTIC] Session #${activeSession}: MediaStreamTrack CHANGED -> muted=false (readyState=${track.readyState}, enabled=${track.enabled})`);
        }
      };

      track.onended = () => {
        if (process.env.NODE_ENV === "development") {
          console.warn(`[SAAJ VAPI DIAGNOSTIC] Session #${activeSession}: MediaStreamTrack CHANGED -> readyState=ended (enabled=${track.enabled}, muted=${track.muted})`);
        }
      };
    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[SAAJ VAPI DIAGNOSTIC] Session #${activeSession}: Track monitor error:`, e);
      }
    }
  }

  private attachListeners(vapi: Vapi): void {
    vapi.on("call-start", () => {
      const activeSession = this.currentSessionId;
      this.t3_callStart = performance.now();
      const startToCallStart = Math.round(this.t3_callStart - this.t2_startInvoked);
      const totalToConnected = Math.round(this.t3_callStart - this.t0_ctaClick);

      if (process.env.NODE_ENV === "development") {
        console.log(`[SAAJ VAPI] [${this.t3_callStart.toFixed(2)}ms] CALL START (connected in ${totalToConnected}ms) [Session #${activeSession}]`);
      }

      // Ensure local microphone starts unmuted
      try {
        vapi.setMuted(false);
      } catch {
        // quiet catch
      }

      // Run privacy-safe diagnostics & track state monitoring
      this.runPrivacySafeDiagnostics(vapi, activeSession);

      this.updateStatus("active", activeSession);
    });

    vapi.on("speech-start", () => {
      if (!this.firstResponseCaptured && this.t3_callStart > 0) {
        this.t4_firstResponse = performance.now();
        this.firstResponseCaptured = true;
        this.logFullPerformanceMetrics();
      }
      // Re-verify track status when assistant begins speaking
      this.monitorAudioTrack(vapi, this.currentSessionId);
    });

    vapi.on("message", (msg: any) => {
      const activeSession = this.currentSessionId;
      const endedReason = msg?.endedReason || msg?.call?.endedReason || msg?.reason;
      if (endedReason) {
        this.lastEndedReason = endedReason;
        if (process.env.NODE_ENV === "development") {
          console.log(`[SAAJ VAPI] [${performance.now().toFixed(2)}ms] EVENT: message with endedReason: "${endedReason}" [Session #${activeSession}]`);
        }
      }

      if (
        !this.firstResponseCaptured &&
        this.t3_callStart > 0 &&
        (msg?.type === "transcript" || msg?.role === "assistant" || msg?.type === "voice-input")
      ) {
        this.t4_firstResponse = performance.now();
        this.firstResponseCaptured = true;
        this.logFullPerformanceMetrics();
      }
    });

    vapi.on("call-end", () => {
      const activeSession = this.currentSessionId;
      const nowMs = performance.now();
      const endedReason = this.lastEndedReason || "call-ended";

      if (process.env.NODE_ENV === "development") {
        console.log(`[SAAJ VAPI] [${nowMs.toFixed(2)}ms] CALL END. endedReason: "${endedReason}", wasEverActive: ${this.wasEverActive} [Session #${activeSession}]`);
      }

      const isMicPermissionErrorReason =
        endedReason === "customer-did-not-give-microphone-permission" ||
        endedReason === "call.in-progress.error-assistant-did-not-receive-customer-audio" ||
        endedReason === "call.in-progress.error-warm-transfer-microphone-timeout";

      if (isMicPermissionErrorReason) {
        this.updateStatus("error", activeSession);
        if (this.errorCallback && activeSession === this.currentSessionId) {
          this.errorCallback("Não foi possível aceder ao microfone.");
        }
        return;
      }

      if (!this.wasEverActive) {
        // If call never connected, transition to error state
        this.updateStatus("error", activeSession);
        if (this.errorCallback && activeSession === this.currentSessionId) {
          const isUserExplicitStop = !!this.lastExplicitUserStopReason;
          const userFacingReason =
            endedReason === "user-hung-up" && !isUserExplicitStop
              ? "Não foi possível iniciar a chamada."
              : endedReason === "silence-timed-out" || endedReason === "silence"
              ? "Não foi possível aceder ao microfone."
              : `Não foi possível iniciar a chamada (${endedReason}).`;

          this.errorCallback(userFacingReason);
        }
      } else {
        this.updateStatus("ended", activeSession);
      }
    });

    vapi.on("volume-level", (volume: number) => {
      if (this.volumeCallback) {
        this.volumeCallback(volume);
      }
    });

    vapi.on("error", (e: any) => {
      const activeSession = this.currentSessionId;
      const errorMsg =
        e?.message ||
        e?.error?.message ||
        e?.errorMsg ||
        (typeof e === "string" ? e : null) ||
        (e && Object.keys(e).length > 0 ? JSON.stringify(e) : String(e));

      // Ignore internal Daily observer cleanup & ejection messages when tearing down calls
      const isDailyTeardown =
        errorMsg.includes("startRemoteParticipantsAudioLevelObserver") ||
        errorMsg.includes("Meeting ended due to ejection") ||
        errorMsg.includes("Meeting has ended") ||
        errorMsg.includes("ejection");

      if (isDailyTeardown || this.currentCallStatus === "ending" || this.currentCallStatus === "ended") {
        if (process.env.NODE_ENV === "development") {
          console.warn(`[SAAJ VAPI] Suppressed internal Daily teardown message [Session #${activeSession}]: "${errorMsg}"`);
        }
        return;
      }

      if (process.env.NODE_ENV === "development") {
        console.error(`[SAAJ VAPI] [${performance.now().toFixed(2)}ms] ERROR detail [Session #${activeSession}]:`, errorMsg);
      }

      this.updateStatus("error", activeSession);

      if (this.errorCallback && activeSession === this.currentSessionId) {
        const isMicError =
          e?.name === "NotAllowedError" ||
          e?.name === "NotFoundError" ||
          e?.name === "PermissionDeniedError" ||
          String(errorMsg).toLowerCase().includes("mic") ||
          String(errorMsg).toLowerCase().includes("permission") ||
          String(errorMsg).toLowerCase().includes("notallowederror");

        this.errorCallback(
          isMicError
            ? "Não foi possível aceder ao microfone."
            : "Não foi possível estabelecer a chamada. Tenta novamente."
        );
      }
    });
  }

  private logFullPerformanceMetrics(): void {
    if (process.env.NODE_ENV === "development" && this.t0_ctaClick > 0) {
      const ctaToReady = Math.round(this.t1_clientReady - this.t0_ctaClick);
      const ctaToStart = Math.round(this.t2_startInvoked - this.t0_ctaClick);
      const startToCallStart = Math.round(this.t3_callStart - this.t2_startInvoked);
      const callStartToFirstResponse =
        this.t4_firstResponse > 0 ? Math.round(this.t4_firstResponse - this.t3_callStart) : 0;
      const total =
        this.t4_firstResponse > 0
          ? Math.round(this.t4_firstResponse - this.t0_ctaClick)
          : Math.round(performance.now() - this.t0_ctaClick);

      console.log(`[SAAJ VAPI] LATENCY SUMMARY:
Session: #${this.currentSessionId}
Assistant: ${this.activeAssistant}
Service Area: ${this.activeServiceArea}
CTA -> client ready: ${ctaToReady}ms
CTA -> vapi.start(): ${ctaToStart}ms
vapi.start() -> call-start: ${startToCallStart}ms
call-start -> first response: ${callStartToFirstResponse}ms
Total: ${total}ms`);
    }
  }

  async startVoiceCall({
    assistant,
    serviceArea,
    onStatusChange,
    onError,
    onVolumeLevel,
  }: StartCallParams): Promise<Vapi | null> {
    const sessionId = ++this.currentSessionId;
    this.currentCallStatus = "starting";
    this.wasEverActive = false;
    this.lastEndedReason = null;
    this.lastExplicitUserStopReason = null;

    this.t0_ctaClick = performance.now();
    this.t1_clientReady = 0;
    this.t2_startInvoked = 0;
    this.t3_callStart = 0;
    this.t4_firstResponse = 0;
    this.firstResponseCaptured = false;
    this.activeAssistant = assistant;
    this.activeServiceArea = serviceArea;

    this.statusCallback = onStatusChange;
    this.errorCallback = onError;
    this.volumeCallback = onVolumeLevel || null;

    if (process.env.NODE_ENV === "development") {
      console.log(`[SAAJ VAPI] [${this.t0_ctaClick.toFixed(2)}ms] START REQUESTED: assistant="${assistant}", serviceArea="${serviceArea}" [Session #${sessionId}]`);
    }

    this.updateStatus("starting", sessionId);

    if (serviceArea === "geral") {
      const err = "Chamadas de voz não estão disponíveis para a localização Geral.";
      if (sessionId === this.currentSessionId) {
        onError(err);
        this.updateStatus("error", sessionId);
      }
      return null;
    }

    const publicKey = getVapiPublicKey();
    const assistantId = resolveVapiAssistantId(assistant, serviceArea);

    if (!publicKey) {
      const err = "Configuração Vapi ausente (NEXT_PUBLIC_VAPI_PUBLIC_KEY).";
      if (process.env.NODE_ENV === "development") {
        console.error(`[SAAJ VAPI] ${err}`);
      }
      if (sessionId === this.currentSessionId) {
        onError(err);
        this.updateStatus("error", sessionId);
      }
      return null;
    }

    if (!assistantId) {
      const err = `ID do assistente Vapi não configurado para ${assistant} em ${serviceArea}.`;
      if (process.env.NODE_ENV === "development") {
        console.error(`[SAAJ VAPI] ${err}`);
      }
      if (sessionId === this.currentSessionId) {
        onError(err);
        this.updateStatus("error", sessionId);
      }
      return null;
    }

    // Pre-flight microphone permission and hardware check
    const micCheck = await this.checkMicrophonePermission();
    if (!micCheck.allowed) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[SAAJ VAPI DIAGNOSTIC] Pre-flight microphone check failed [Session #${sessionId}]: ${micCheck.reason}`);
      }
      if (sessionId === this.currentSessionId) {
        onError(micCheck.reason || "Não foi possível aceder ao microfone.");
        this.updateStatus("error", sessionId);
      }
      return null;
    }

    const vapi = this.getVapiInstance(publicKey);
    this.t1_clientReady = performance.now();
    if (process.env.NODE_ENV === "development") {
      console.log(`[SAAJ VAPI] [${this.t1_clientReady.toFixed(2)}ms] Vapi client ready [Session #${sessionId}]`);
    }

    this.t2_startInvoked = performance.now();

    try {
      if (process.env.NODE_ENV === "development") {
        console.log(`[SAAJ VAPI] [${this.t2_startInvoked.toFixed(2)}ms] vapi.start() invoked (Assistant ID: ${assistantId}) [Session #${sessionId}]`);
      }

      if (sessionId !== this.currentSessionId) {
        if (process.env.NODE_ENV === "development") {
          console.log(`[SAAJ VAPI] Aborting call start for stale session #${sessionId}`);
        }
        return null;
      }

      const call = await vapi.start(assistantId);
      const resolveMs = performance.now();

      if (process.env.NODE_ENV === "development") {
        console.log(`[SAAJ VAPI] [${resolveMs.toFixed(2)}ms] vapi.start() resolved [Session #${sessionId}]:`, {
          callId: (call as any)?.id || (call as any)?.callId || "active",
          status: (call as any)?.status || "started",
        });
      }

      return vapi;
    } catch (err: any) {
      if (sessionId !== this.currentSessionId) return null;

      const errorMsg = err?.message || String(err);
      if (
        errorMsg.includes("startRemoteParticipantsAudioLevelObserver") ||
        errorMsg.includes("Meeting ended due to ejection") ||
        errorMsg.includes("Meeting has ended") ||
        errorMsg.includes("ejection")
      ) {
        if (process.env.NODE_ENV === "development") {
          console.warn(`[SAAJ VAPI] Suppressed internal Daily start exception [Session #${sessionId}]`);
        }
        return null;
      }

      if (process.env.NODE_ENV === "development") {
        console.error(`[SAAJ VAPI] vapi.start() rejected [Session #${sessionId}]:`, err);
      }
      this.updateStatus("error", sessionId);

      const isPermissionDenied =
        err?.name === "NotAllowedError" ||
        err?.name === "PermissionDeniedError" ||
        err?.message?.toLowerCase().includes("permission") ||
        err?.message?.toLowerCase().includes("microphone") ||
        err?.message?.toLowerCase().includes("notallowederror");

      onError(
        isPermissionDenied
          ? "Não foi possível aceder ao microfone."
          : "Não foi possível iniciar a chamada. Verifica a tua ligação."
      );
      return null;
    }
  }

  /**
   * Canonical stop function. Invoked strictly by explicit user actions.
   */
  stopVoiceCall(reason: string): void {
    const validUserReasons = [
      "user-pressed-hangup",
      "user-pressed-back",
      "user-pressed-quick-exit",
      "new-call-replacing-active-call",
    ];

    if (!validUserReasons.includes(reason)) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[SAAJ VAPI] REJECTED INVALID STOP REQUEST: reason="${reason}" is not an explicit user action!`);
      }
      return;
    }

    const activeSession = this.currentSessionId;
    this.currentSessionId++;
    const prevStatus = this.currentCallStatus;
    this.currentCallStatus = "ending";
    this.lastExplicitUserStopReason = reason;

    if (process.env.NODE_ENV === "development") {
      const nowMs = performance.now();
      console.trace(`[SAAJ VAPI] [${nowMs.toFixed(2)}ms] vapi.stop() INVOKED`);
      console.log(`[SAAJ VAPI] [${nowMs.toFixed(2)}ms] STOP REQUESTED: reason="${reason}", callState="${prevStatus}", assistant="${this.activeAssistant}" [Previous Session #${activeSession}] -> New Session: #${this.currentSessionId}`);
    }

    if (this.vapiInstance) {
      try {
        this.vapiInstance.stop();
      } catch (e) {
        if (process.env.NODE_ENV === "development") {
          console.error("[SAAJ VAPI] Error stopping call:", e);
        }
      }
    }

    if (this.statusCallback) {
      this.statusCallback("ending");
    }

    this.statusCallback = null;
    this.errorCallback = null;
    this.volumeCallback = null;
  }

  setMuted(muted: boolean): void {
    if (this.vapiInstance) {
      try {
        this.vapiInstance.setMuted(muted);
      } catch (e) {
        if (process.env.NODE_ENV === "development") {
          console.error("[SAAJ VAPI] Error setting mute:", e);
        }
      }
    }
  }
}

export const vapiClient = new VapiClientService();
