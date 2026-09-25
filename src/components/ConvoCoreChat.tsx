"use client";

import React, { useEffect, useRef, useState } from "react";
import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";
import { AssistantId, ServiceArea } from "@/types/saaj";
import {
  CONVOCORE_GLOBAL_CONFIG,
  resolveConvoCoreAgent,
  validateConvoCoreConfig,
} from "@/lib/convocore/config";
import { reloadConvoCoreScript } from "@/lib/convocore/loader";
import { VGConfig } from "@/lib/convocore/types";

interface ConvoCoreChatProps {
  assistant: AssistantId;
  serviceArea: ServiceArea;
  anonymousUserId?: string;
  onBack?: () => void;
  source?: "profile" | "conversas";
}

let globalInitCounter = 0;

export const ConvoCoreChat: React.FC<ConvoCoreChatProps> = ({
  assistant,
  serviceArea,
  anonymousUserId,
  onBack,
  source = "conversas",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const isTonito = assistant === "tonito";
  const watchdogTimerRef = useRef<NodeJS.Timeout | null>(null);

  const cleanupWatchdog = () => {
    if (watchdogTimerRef.current) {
      clearTimeout(watchdogTimerRef.current);
      watchdogTimerRef.current = null;
    }
  };

  useEffect(() => {
    validateConvoCoreConfig();
  }, []);

  useEffect(() => {
    const currentToken = ++globalInitCounter;
    let isMounted = true;
    setIsLoading(true);
    setErrorMessage(null);
    cleanupWatchdog();

    async function initConvoCore() {
      try {
        const agentId = resolveConvoCoreAgent(assistant, serviceArea);

        if (process.env.NODE_ENV === "development") {
          console.log(`[ConvoCore] CTA source=${source}`);
          console.log(`[ConvoCore] assistant=${assistant}`);
          console.log(`[ConvoCore] serviceArea=${serviceArea}`);
          console.log(`[ConvoCore] agent=${agentId}`);
        }

        // Verify container element and dimensions
        if (!containerRef.current) {
          throw new Error("Target container element not found in DOM.");
        }

        // Clean container DOM content from previous instance
        containerRef.current.innerHTML = "";

        const rect = containerRef.current.getBoundingClientRect();
        if (process.env.NODE_ENV === "development") {
          console.log(`[ConvoCore] container mounted, dimensions=${Math.round(rect.width)}x${Math.round(rect.height)}`);
        }

        // Assign window.VG_CONFIG before bundle script execution
        const vgConfig: VGConfig = {
          ID: agentId,
          region: CONVOCORE_GLOBAL_CONFIG.region,
          render: CONVOCORE_GLOBAL_CONFIG.renderMode,
          stylesheets: [CONVOCORE_GLOBAL_CONFIG.stylesheetUrl],
        };

        if (anonymousUserId) {
          vgConfig.userID = anonymousUserId;
        }

        window.VG_CONFIG = vgConfig;

        if (process.env.NODE_ENV === "development") {
          console.log("[ConvoCore] VG_CONFIG assigned:", vgConfig);
          console.log(`[ConvoCore] initialization started (token=${currentToken})`);
        }

        // Controlled remount of bundle script
        await reloadConvoCoreScript(currentToken);

        if (!isMounted || currentToken !== globalInitCounter) {
          if (process.env.NODE_ENV === "development") {
            console.log(`[ConvoCore] Stale initialization aborted (token=${currentToken})`);
          }
          return;
        }

        // Start watchdog timer (6 seconds) to detect if widget fails to render content
        watchdogTimerRef.current = setTimeout(() => {
          if (isMounted && currentToken === globalInitCounter) {
            const hasContent = containerRef.current && containerRef.current.children.length > 0;
            if (!hasContent) {
              if (process.env.NODE_ENV === "development") {
                console.error("[ConvoCore] Watchdog timeout: widget failed to render content within 6 seconds.");
              }
              setIsLoading(false);
              setErrorMessage("Não foi possível carregar o assistente. Tenta novamente.");
            }
          }
        }, 6000);

        // Allow widget render tick
        setTimeout(() => {
          if (isMounted && currentToken === globalInitCounter) {
            cleanupWatchdog();
            setIsLoading(false);
            if (process.env.NODE_ENV === "development") {
              console.log("[ConvoCore] mounted successfully");
            }
          }
        }, 400);
      } catch (err: any) {
        if (process.env.NODE_ENV === "development") {
          console.error("[ConvoCore] initialization failed:", err.message || err);
        }
        if (isMounted && currentToken === globalInitCounter) {
          cleanupWatchdog();
          setIsLoading(false);
          setErrorMessage(
            err.message || "Não foi possível abrir a conversa. Verifica a tua ligação."
          );
        }
      }
    }

    initConvoCore();

    return () => {
      isMounted = false;
      cleanupWatchdog();
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [assistant, serviceArea, anonymousUserId, retryCount]);

  return (
    <div className="relative w-full h-full flex flex-col flex-1 min-h-0 bg-slate-50 convo-core-page overflow-hidden">
      {/* SAAJ Loading Surface */}
      {isLoading && (
        <div
          className={`absolute inset-0 z-30 flex flex-col items-center justify-center p-6 space-y-4 animate-fadeIn ${
            isTonito ? "bg-blue-50/95 backdrop-blur-md" : "bg-rose-50/95 backdrop-blur-md"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-full border-3 border-t-transparent animate-spin ${
              isTonito ? "border-tonito-600" : "border-manuela-600"
            }`}
          />
          <span className="text-xs font-semibold text-slate-800">
            A preparar a conversa com {isTonito ? "Tonito" : "Manuela"}...
          </span>
        </div>
      )}

      {/* SAAJ Failure Surface */}
      {errorMessage && !isLoading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-50 p-6 text-center space-y-4 animate-fadeIn">
          <div className="p-3.5 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 shadow-2xs">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-slate-900 text-sm">
              Não foi possível abrir a conversa
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto font-normal">{errorMessage}</p>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setRetryCount((prev) => prev + 1)}
              className="inline-flex items-center gap-2 py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-sm active-press"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Tentar novamente</span>
            </button>
            {onBack && (
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 py-3 px-5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs transition-all active-press"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ConvoCore Shell Container */}
      <div className="convo-core-shell flex-1 min-h-0 min-w-0 w-full relative">
        <div
          ref={containerRef}
          id="VG_OVERLAY_CONTAINER"
          className="w-full h-full min-h-0 overflow-hidden max-w-xl mx-auto"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};
