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
      <div className="px-4 py-4 max-w-md mx-auto w-full">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Conversas</h1>
        <p className="text-xs text-slate-600 mt-1 font-medium">
          Escolhe com quem queres conversar.
        </p>
      </div>

      {/* Assistant Messaging Gateway Cards */}
      <div className="max-w-md mx-auto w-full px-4 pt-1 space-y-4">
        {/* Tonito Gateway Card */}
        <div
          onClick={() => onStartConversation("tonito")}
          className="cursor-pointer glass-card p-5 rounded-4xl border border-white/90 shadow-soft hover:shadow-glow-blue transition-all flex flex-col space-y-4 group active-press bg-tonito-50/40"
        >
          <div className="flex items-center gap-4">
            <AssistantAvatar
              assistantId="tonito"
              size="lg"
              showAura={true}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-lg">
                  {ASSISTANTS.tonito.name}
                </h3>
                <ArrowRight className="w-5 h-5 text-tonito-500 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-tonito-700 font-bold mt-0.5">
                {ASSISTANTS.tonito.role}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            "{ASSISTANTS.tonito.tagline}"
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onStartConversation("tonito");
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-tonito-500 hover:bg-tonito-600 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Conversar com Tonito</span>
          </button>
        </div>

        {/* Manuela Gateway Card */}
        <div
          onClick={() => onStartConversation("manuela")}
          className="cursor-pointer glass-card p-5 rounded-4xl border border-white/90 shadow-soft hover:shadow-glow-pink transition-all flex flex-col space-y-4 group active-press bg-manuela-50/40"
        >
          <div className="flex items-center gap-4">
            <AssistantAvatar
              assistantId="manuela"
              size="lg"
              showAura={true}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-lg">
                  {ASSISTANTS.manuela.name}
                </h3>
                <ArrowRight className="w-5 h-5 text-manuela-500 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-manuela-700 font-bold mt-0.5">
                {ASSISTANTS.manuela.role}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            "{ASSISTANTS.manuela.tagline}"
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onStartConversation("manuela");
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-manuela-500 hover:bg-manuela-600 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Conversar com Manuela</span>
          </button>
        </div>

        {/* Confidentiality Notice Footer */}
        <div className="glass-card rounded-3xl p-4 text-center text-xs text-slate-500 border border-white/80 space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-bold text-slate-700 text-xs">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>Histórico Seguro & Privado</span>
          </div>
          <p className="text-[11px] text-slate-400">
            As tuas conversas são encriptadas e geridas com privacidade total.
          </p>
        </div>
      </div>
    </div>
  );
};
