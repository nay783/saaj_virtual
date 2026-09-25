"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mic, MicOff, PhoneOff, ShieldCheck, AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";
import { AssistantId, ServiceArea } from "@/types/saaj";
import { getAssistant } from "@/lib/config/assistants";
import { QuickExitButton } from "@/components/QuickExitButton";
import { AssistantAvatar } from "@/components/AssistantAvatar";
import { vapiClient } from "@/lib/vapi/client";
import { VapiCallStatus } from "@/lib/vapi/types";

interface VoiceCallModalProps {
  assistantId: AssistantId;
  serviceArea: ServiceArea;
  onClose: () => void;
  onQuickExit?: () => void;
}

export const VoiceCallModal: React.FC<VoiceCallModalProps> = ({
  assistantId,
  serviceArea,
  onClose,
  onQuickExit,
}) => {
  const assistant = getAssistant(assistantId);
  const [callStatus, setCallStatus] = useState<VapiCallStatus>("starting");
  const [isMuted, setIsMuted] = useState(false);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const cleanupTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = () => {
    cleanupTimer();
    setDurationSeconds(0);
    timerRef.current = setInterval(() => {
      setDurationSeconds((prev) => prev + 1);
    }, 1000);
  };

  const initiateCall = async () => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[SAAJ VAPI] [${performance.now().toFixed(2)}ms] call screen mounted for ${assistantId} (${serviceArea})`);
    }
    setErrorMessage(null);
    setDurationSeconds(0);
    cleanupTimer();

    await vapiClient.startVoiceCall({
      assistant: assistantId,
      serviceArea,
      onStatusChange: (status) => {
        setCallStatus(status);
        if (status === "active") {
          startTimer();
        } else if (status === "ended" || status === "error") {
          cleanupTimer();
        }
      },
      onError: (msg) => {
        setErrorMessage(msg);
      },
    });
  };

  useEffect(() => {
    initiateCall();

    return () => {
      if (process.env.NODE_ENV === "development") {
        console.log(`[SAAJ VAPI] [${performance.now().toFixed(2)}ms] VoiceCallModal effect cleanup executing (preserving active Vapi session)`);
      }
      cleanupTimer();
    };
  }, [assistantId, serviceArea]);

  const handleEndCall = () => {
    if (callStatus === "ending" || callStatus === "ended") return;
    setCallStatus("ending");
    vapiClient.stopVoiceCall("user-pressed-hangup");
    cleanupTimer();
    setTimeout(() => {
      onClose();
    }, 250);
  };

  const handleBack = () => {
    if (callStatus === "active" || callStatus === "starting") {
      vapiClient.stopVoiceCall("user-pressed-back");
    }
    cleanupTimer();
    onClose();
  };

  const handleQuickExit = () => {
    if (callStatus === "active" || callStatus === "starting") {
      vapiClient.stopVoiceCall("user-pressed-quick-exit");
    }
    cleanupTimer();
    if (onQuickExit) {
      onQuickExit();
    } else {
      onClose();
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    vapiClient.setMuted(nextMute);
    setIsMuted(nextMute);
  };

  const formatDuration = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-slate-950 text-white p-6 safe-top safe-bottom animate-fadeIn">
      {/* Header with Back button and Quick Exit */}
      <div className="flex items-center justify-between max-w-xl mx-auto w-full">
        <button
          onClick={handleBack}
          className="p-2.5 rounded-full bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-all border border-slate-800 active-press"
          aria-label="Voltar para o perfil"
          title="Voltar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-900 text-slate-300 text-xs border border-slate-800 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Chamada Confidencial SAAJ</span>
        </div>

        <QuickExitButton onQuickExit={handleQuickExit} variant="badge" />
      </div>

      {/* Main Avatar & Call Status Display */}
      <div className="flex flex-col items-center text-center my-auto max-w-sm mx-auto w-full">
        <div className="relative mb-6">
          <AssistantAvatar
            assistantId={assistantId}
            size="xl"
            showAura={callStatus === "active"}
          />
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-white">{assistant.name}</h2>
        <p className="text-xs text-slate-400 mt-1 font-medium">{assistant.role}</p>

        {/* Dynamic Status Display */}
        <div className="mt-6 w-full flex flex-col items-center min-h-[4rem]">
          {(callStatus === "starting" || callStatus === "idle") && (
            <span className="text-xs text-blue-400 animate-pulse font-medium">
              A iniciar chamada...
            </span>
          )}

          {callStatus === "active" && (
            <div className="flex flex-col items-center">
              <span className="text-xs text-emerald-400 font-semibold mb-1 tracking-wider uppercase">
                Chamada em curso
              </span>
              <span className="font-mono text-2xl font-semibold tracking-wider text-slate-100">
                {formatDuration(durationSeconds)}
              </span>
            </div>
          )}

          {callStatus === "ending" && (
            <span className="text-xs text-slate-400 animate-pulse font-medium">
              A terminar chamada...
            </span>
          )}

          {callStatus === "ended" && (
            <span className="text-xs text-slate-400 font-medium">
              Chamada terminada
            </span>
          )}

          {callStatus === "error" && (
            <div className="w-full flex flex-col items-center space-y-3">
              <div className="flex items-center gap-2 text-xs text-rose-300 bg-rose-950/70 p-3.5 rounded-2xl border border-rose-800/60 text-left w-full">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{errorMessage || "Não foi possível iniciar a chamada."}</span>
              </div>

              {/* Recoverable Actions when call fails */}
              <div className="flex items-center gap-3 w-full pt-1">
                <button
                  onClick={() => {
                    vapiClient.stopVoiceCall("new-call-replacing-active-call");
                    initiateCall();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 active-press"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Tentar novamente</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-800 active-press"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Voltar</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Control Buttons Footer */}
      {callStatus !== "error" && (
        <div className="flex items-center justify-center gap-6 pb-6 max-w-xl mx-auto w-full">
          {/* Mute button */}
          <button
            onClick={toggleMute}
            disabled={callStatus !== "active"}
            className={`p-4 rounded-full transition-all active-press ${
              isMuted
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                : "bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-800"
            } disabled:opacity-40 disabled:cursor-not-allowed`}
            title={isMuted ? "Ativar Microfone" : "Silenciar Microfone"}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          {/* End Call button */}
          <button
            onClick={handleEndCall}
            disabled={callStatus === "ending" || callStatus === "ended"}
            className="p-5 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-lg active-press transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            title="Desligar Chamada"
          >
            <PhoneOff className="w-7 h-7" />
          </button>
        </div>
      )}
    </div>
  );
};
