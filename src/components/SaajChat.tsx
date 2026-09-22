"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { AssistantId, ServiceArea } from "@/types/saaj";
import { QuickExitButton } from "@/components/QuickExitButton";
import { ConvoCoreChat } from "@/components/ConvoCoreChat";

interface SaajChatProps {
  assistantId: AssistantId;
  serviceArea: ServiceArea;
  anonymousUserId?: string;
  onBack?: () => void;
  onQuickExit?: () => void;
  source?: "profile" | "conversas";
}

export const SaajChat: React.FC<SaajChatProps> = ({
  assistantId,
  serviceArea,
  anonymousUserId,
  onBack,
  onQuickExit,
  source = "conversas",
}) => {
  return (
    <div className="flex flex-col h-screen-dvh bg-slate-50 safe-top safe-bottom overflow-hidden z-40 relative">
      {/* Minimal SAAJ Safety Shell Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-2xs shrink-0 z-20 max-w-4xl mx-auto w-full">
        {onBack ? (
          <button
            onClick={onBack}
            className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors active-press flex items-center gap-1"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <div />
        )}

        <QuickExitButton onQuickExit={onQuickExit} variant="badge" />
      </div>

      {/* ConvoCore User-Facing Chat Engine */}
      <div className="flex-1 w-full min-h-0 relative overflow-hidden flex flex-col max-w-4xl mx-auto">
        <ConvoCoreChat
          assistant={assistantId}
          serviceArea={serviceArea}
          anonymousUserId={anonymousUserId}
          onBack={onBack}
          source={source}
        />
      </div>
    </div>
  );
};
