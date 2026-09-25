"use client";

import React from "react";
import { MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { AssistantId } from "@/types/saaj";
import { ASSISTANTS } from "@/lib/config/assistants";
import { AssistantAvatar } from "@/components/AssistantAvatar";

interface ConversasViewProps {
  onStartConversation: (assistant: AssistantId) => void;
}

export const ConversasView: React.FC<ConversasViewProps> = ({
  onStartConversation,
}) => {
  return (
    <div className="min-h-screen-dvh flex flex-col bg-ambient-neutral pb-28 safe-top">
      {/* Top Header */}
      <div className="px-4 py-4 max-w-xl mx-auto w-full">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Conversas</h1>
        <p className="text-xs text-slate-600 mt-1 font-normal">
          Escolhe com quem queres conversar.
        </p>
      </div>

      {/* Assistant Messaging Gateway Cards */}
      <div className="max-w-xl mx-auto w-full px-4 pt-1 space-y-4">
        {/* Tonito Gateway Card */}
        <div
          onClick={() => onStartConversation("tonito")}
          className="cursor-pointer glass-card p-5 rounded-3xl border border-slate-900/[0.06] shadow-soft hover:shadow-glow-blue transition-all flex flex-col space-y-4 group active-press bg-tonito-50/40 hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-4">
            <AssistantAvatar
              assistantId="tonito"
              size="lg"
              showAura={true}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 text-lg">
                  {ASSISTANTS.tonito.name}
                </h3>
                <ArrowRight className="w-5 h-5 text-tonito-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-tonito-700 font-semibold mt-0.5">
                {ASSISTANTS.tonito.role}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            "{ASSISTANTS.tonito.tagline}"
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onStartConversation("tonito");
            }}
            className="w-full h-12 px-4 rounded-2xl bg-tonito-600 hover:bg-tonito-700 text-white font-semibold text-xs tracking-tight transition-all flex items-center justify-center gap-2 shadow-md active-press"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Conversar com Tonito</span>
          </button>
        </div>

        {/* Manuela Gateway Card */}
        <div
          onClick={() => onStartConversation("manuela")}
          className="cursor-pointer glass-card p-5 rounded-3xl border border-slate-900/[0.06] shadow-soft hover:shadow-glow-pink transition-all flex flex-col space-y-4 group active-press bg-manuela-50/40 hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-4">
            <AssistantAvatar
              assistantId="manuela"
              size="lg"
              showAura={true}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 text-lg">
                  {ASSISTANTS.manuela.name}
                </h3>
                <ArrowRight className="w-5 h-5 text-manuela-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-manuela-700 font-semibold mt-0.5">
                {ASSISTANTS.manuela.role}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            "{ASSISTANTS.manuela.tagline}"
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onStartConversation("manuela");
            }}
            className="w-full h-12 px-4 rounded-2xl bg-manuela-600 hover:bg-manuela-700 text-white font-semibold text-xs tracking-tight transition-all flex items-center justify-center gap-2 shadow-md active-press"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Conversar com Manuela</span>
          </button>
        </div>

        {/* Confidentiality Notice Footer */}
        <div className="glass-card rounded-3xl p-4 text-center text-xs text-slate-500 border border-slate-900/[0.06] space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-semibold text-slate-700 text-xs">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Histórico Seguro & Privado</span>
          </div>
          <p className="text-[11px] text-slate-400 font-normal">
            As tuas conversas são encriptadas e geridas com privacidade total.
          </p>
        </div>
      </div>
    </div>
  );
};
