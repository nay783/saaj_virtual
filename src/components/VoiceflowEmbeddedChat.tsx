"use client";

import React, { useEffect, useRef, useState } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { AssistantId, ServiceArea } from "@/types/saaj";
import { loadVoiceflowSDK } from "@/lib/integrations/voiceflowLoader";

interface VoiceflowEmbeddedChatProps {
  assistant: AssistantId;
  serviceArea: ServiceArea;
}

export const VoiceflowEmbeddedChat: React.FC<VoiceflowEmbeddedChatProps> = ({
  assistant,
  serviceArea,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setErrorMsg(null);

    async function initVoiceflowEmbed() {
      try {
        // Fetch project configuration from server API
        const res = await fetch(
          `/api/voiceflow/config?assistant=${assistant}&serviceArea=${serviceArea}`
        );

        if (!res.ok) {
          throw new Error("Não foi possível resolver a configuração da conversa.");
        }

        const data = await res.json();
        const projectID = data.projectID;

        if (!isMounted) return;

        // Load Voiceflow Client SDK
        await loadVoiceflowSDK();

        if (!isMounted) return;

        if (!window.voiceflow || !window.voiceflow.chat) {
          throw new Error("SDK do Voiceflow não inicializou corretamente.");
        }

        // Clean previous instances/DOM if any
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }

        if (window.voiceflow.chat.destroy) {
          try {
            window.voiceflow.chat.destroy();
          } catch (e) {}
        }

        // Initialize Voiceflow Embedded Chat Widget
        window.voiceflow.chat.load({
          verify: {
            projectID,
          },
          url: "https://general-runtime.voiceflow.com",
          versionID: "production",
          voice: {
            url: "https://runtime-api.voiceflow.com",
          },
          render: {
            mode: "embedded",
            target: containerRef.current,
          },
        });

        if (isMounted) {
          setIsLoading(false);
        }
      } catch (err: any) {
        console.error("Voiceflow embed initialization error:", err);
        if (isMounted) {
          setIsLoading(false);
          setErrorMsg(
            err.message || "Não foi possível carregar a conversa. Verifica a ligação."
          );
        }
      }
    }

    initVoiceflowEmbed();

    return () => {
      isMounted = false;
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      if (typeof window !== "undefined" && window.voiceflow?.chat?.destroy) {
        try {
          window.voiceflow.chat.destroy();
        } catch (e) {}
      }
    };
  }, [assistant, serviceArea, reloadKey]);

  return (
    <div className="relative w-full h-full flex flex-col flex-1 min-h-0 bg-slate-50">
      {/* Loading SAAJ Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50 p-6 space-y-4">
          <div
            className={`w-12 h-12 rounded-full border-4 border-t-transparent animate-spin ${
              assistant === "tonito" ? "border-tonito-500" : "border-manuela-500"
            }`}
          />
          <span className="text-xs font-semibold text-slate-600">
            A carregar conversa com {assistant === "tonito" ? "Tonito" : "Manuela"}...
          </span>
        </div>
      )}

      {/* Error Retry SAAJ State */}
      {errorMsg && !isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50 p-6 text-center space-y-4">
          <div className="p-3 rounded-full bg-red-50 text-red-600">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">Não foi possível carregar a conversa</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">{errorMsg}</p>
          </div>
          <button
            onClick={() => setReloadKey((prev) => prev + 1)}
            className="inline-flex items-center gap-2 py-2.5 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Tentar novamente</span>
          </button>
        </div>
      )}

      {/* Target Container for Embedded Voiceflow Chatbot */}
      <div
        ref={containerRef}
        id="vfb-embedded-container"
        className="voiceflow-embedded-target w-full h-full flex-1 min-h-0 overflow-hidden max-w-3xl mx-auto"
      />
    </div>
  );
};
