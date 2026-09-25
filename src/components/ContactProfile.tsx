"use client";

import React from "react";
import { MessageSquare, PhoneCall, ShieldCheck, ArrowLeft, Info } from "lucide-react";
import { AssistantId, ServiceArea } from "@/types/saaj";
import { getAssistant } from "@/lib/config/assistants";
import { getServiceCapabilities } from "@/lib/routing/location";
import { QuickExitButton } from "@/components/QuickExitButton";
import { AssistantAvatar } from "@/components/AssistantAvatar";
import { vapiClient } from "@/lib/vapi/client";

interface ContactProfileProps {
  assistantId: AssistantId;
  serviceArea: ServiceArea;
  onStartMessage: () => void;
  onStartCall: () => void;
  onBack?: () => void;
}

export const ContactProfile: React.FC<ContactProfileProps> = ({
  assistantId,
  serviceArea,
  onStartMessage,
  onStartCall,
  onBack,
}) => {
  const assistant = getAssistant(assistantId);
  const isTonito = assistantId === "tonito";
  const capabilities = getServiceCapabilities(serviceArea);

  const ambientBgClass = isTonito ? "bg-ambient-tonito" : "bg-ambient-manuela";
  const hasVoiceCall = capabilities?.call && serviceArea !== "geral";

  React.useEffect(() => {
    if (hasVoiceCall) {
      vapiClient.preload();
    }
  }, [hasVoiceCall]);

  return (
    <div className={`min-h-screen-dvh flex flex-col ${ambientBgClass} safe-top safe-bottom`}>
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-4 max-w-xl mx-auto w-full">
        {onBack ? (
          <button
            onClick={onBack}
            className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:bg-white shadow-soft transition-all active-press border border-slate-900/[0.06]"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-card text-xs font-medium text-slate-700 shadow-2xs border border-slate-900/[0.06]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Atendimento Privado SAAJ</span>
        </div>

        <QuickExitButton variant="badge" />
      </div>

      {/* Main Profile Content Area */}
      <div className="flex-1 max-w-xl mx-auto w-full px-4 py-2 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Profile Hero Composition */}
          <div className="flex flex-col items-center text-center pt-2 pb-2">
            <AssistantAvatar
              assistantId={assistantId}
              size="xl"
              showAura={true}
              className="mb-4"
            />

            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              {assistant.name}
            </h1>
            <p
              className={`text-xs font-semibold uppercase tracking-wider mt-1 ${
                isTonito ? "text-tonito-600" : "text-manuela-600"
              }`}
            >
              {assistant.role}
            </p>

            <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-medium uppercase tracking-wider shadow-xs">
              <span>SAAJ • {serviceArea}</span>
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed max-w-xs font-normal">
              "{assistant.tagline}"
            </p>
          </div>

          {/* Action Cards Area */}
          <div className="w-full">
            {hasVoiceCall ? (
              /* Maxixe & Massinga: Balanced 2-Action Grid (Mensagem + Ligar) */
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                {/* Mensagem Tile */}
                <button
                  onClick={onStartMessage}
                  className={`p-5 rounded-3xl glass-card text-center flex flex-col items-center justify-center gap-2.5 group transition-all active-press shadow-soft hover:shadow-elevated border border-slate-900/[0.06] hover:-translate-y-0.5 ${
                    isTonito ? "hover:border-tonito-300" : "hover:border-manuela-300"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                      isTonito
                        ? "bg-tonito-50 text-tonito-600 group-hover:bg-tonito-600 group-hover:text-white border border-tonito-100"
                        : "bg-manuela-50 text-manuela-600 group-hover:bg-manuela-600 group-hover:text-white border border-manuela-100"
                    }`}
                  >
                    <MessageSquare className="w-5 h-5 shrink-0" />
                  </div>
                  <span className="font-semibold text-slate-900 text-xs">Mensagem</span>
                </button>

                {/* Ligar Tile */}
                <button
                  onClick={onStartCall}
                  className={`p-5 rounded-3xl glass-card text-center flex flex-col items-center justify-center gap-2.5 group transition-all active-press shadow-soft hover:shadow-elevated border border-slate-900/[0.06] hover:-translate-y-0.5 ${
                    isTonito ? "hover:border-tonito-300" : "hover:border-manuela-300"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                      isTonito
                        ? "bg-tonito-50 text-tonito-600 group-hover:bg-tonito-600 group-hover:text-white border border-tonito-100"
                        : "bg-manuela-50 text-manuela-600 group-hover:bg-manuela-600 group-hover:text-white border border-manuela-100"
                    }`}
                  >
                    <PhoneCall className="w-5 h-5 shrink-0" />
                  </div>
                  <span className="font-semibold text-slate-900 text-xs">Ligar</span>
                </button>
              </div>
            ) : (
              /* Geral: Single Centered Action Card (Mensagem) */
              <div className="flex justify-center w-full">
                <button
                  onClick={onStartMessage}
                  className={`w-full max-w-sm p-5 rounded-3xl glass-card text-center flex flex-col items-center justify-center gap-2.5 group transition-all active-press shadow-soft hover:shadow-elevated border border-slate-900/[0.06] hover:-translate-y-0.5 ${
                    isTonito ? "hover:border-tonito-300" : "hover:border-manuela-300"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                      isTonito
                        ? "bg-tonito-50 text-tonito-600 group-hover:bg-tonito-600 group-hover:text-white border border-tonito-100"
                        : "bg-manuela-50 text-manuela-600 group-hover:bg-manuela-600 group-hover:text-white border border-manuela-100"
                    }`}
                  >
                    <MessageSquare className="w-5 h-5 shrink-0" />
                  </div>
                  <span className="font-semibold text-slate-900 text-sm">Mensagem</span>
                </button>
              </div>
            )}
          </div>

          {/* Supporting Information Surface (Strictly contained heading row & description) */}
          <div className="glass-card rounded-3xl p-5 border border-slate-900/[0.06] shadow-soft">
            <div className="flex items-center gap-2 font-semibold text-slate-900 text-xs mb-2.5">
              <Info className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Sobre o atendimento</span>
            </div>
            <p className="leading-relaxed text-[11px] text-slate-500 font-normal">
              {assistant.description}
            </p>
          </div>
        </div>

        {/* Concise trust language */}
        <div className="py-4 text-center text-[11px] text-slate-400 font-normal">
          Orientação confidencial e sem julgamentos.
        </div>
      </div>
    </div>
  );
};
