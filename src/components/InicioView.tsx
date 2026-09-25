"use client";

import React from "react";
import Image from "next/image";
import { MapPin, MessageSquare, ShieldCheck, Heart } from "lucide-react";
import { AssistantId, LocationState } from "@/types/saaj";
import { ASSISTANTS } from "@/lib/config/assistants";
import { AssistantAvatar } from "@/components/AssistantAvatar";

interface InicioViewProps {
  location: LocationState;
  onSelectAssistant: (assistant: AssistantId) => void;
  onChangeLocation: () => void;
}

export const InicioView: React.FC<InicioViewProps> = ({
  location,
  onSelectAssistant,
  onChangeLocation,
}) => {
  return (
    <div className="min-h-screen-dvh flex flex-col bg-ambient-neutral pb-28 safe-top">
      {/* Top Header */}
      <div className="px-4 py-4 max-w-xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-slate-900/[0.08] shadow-2xs bg-white">
            <Image
              src="/logo/LOGO_APP.jpg"
              alt="SAAJ Virtual Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="font-semibold text-slate-900 tracking-tight text-lg">
            SAAJ Virtual
          </span>
        </div>

        <button
          onClick={onChangeLocation}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-card text-slate-800 text-xs font-semibold shadow-2xs hover:bg-white active-press border border-slate-900/[0.06]"
        >
          <MapPin className="w-3.5 h-3.5 text-tonito-600" />
          <span>
            {location.district ? `${location.district}` : location.province}
          </span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="max-w-xl mx-auto w-full px-4 pt-2 space-y-6">
        {/* Welcome Greeting Surface */}
        <div className="glass-card rounded-3xl p-6 shadow-soft relative overflow-hidden border border-slate-900/[0.06]">
          <div className="relative z-10 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Privado & Confidencial</span>
            </div>

            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
              Olá! Como estás?
            </h1>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm font-normal">
              Tens dúvidas de saúde sexual ou reprodutiva? Escolhe um guia para apoio confidencial.
            </p>
          </div>
        </div>

        {/* Assistant Cards Section (Routes to Assistant Profiles) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Escolher Guia
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">Apoio 24/7</span>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {/* Tonito Feature Card */}
            <div
              onClick={() => onSelectAssistant("tonito")}
              className="cursor-pointer glass-card p-5 rounded-3xl border border-slate-900/[0.06] shadow-soft hover:shadow-glow-blue transition-all flex flex-col items-center text-center group active-press hover:-translate-y-0.5"
            >
              <AssistantAvatar
                assistantId="tonito"
                size="lg"
                showAura={true}
                className="mb-3"
              />
              <h4 className="font-semibold text-slate-900 text-base">{ASSISTANTS.tonito.name}</h4>
              <p className="text-[11px] text-tonito-600 font-semibold mb-3">{ASSISTANTS.tonito.role}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectAssistant("tonito");
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-tonito-50 hover:bg-tonito-600 hover:text-white text-tonito-700 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border border-tonito-100/80 shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Ver Perfil</span>
              </button>
            </div>

            {/* Manuela Feature Card */}
            <div
              onClick={() => onSelectAssistant("manuela")}
              className="cursor-pointer glass-card p-5 rounded-3xl border border-slate-900/[0.06] shadow-soft hover:shadow-glow-pink transition-all flex flex-col items-center text-center group active-press hover:-translate-y-0.5"
            >
              <AssistantAvatar
                assistantId="manuela"
                size="lg"
                showAura={true}
                className="mb-3"
              />
              <h4 className="font-semibold text-slate-900 text-base">{ASSISTANTS.manuela.name}</h4>
              <p className="text-[11px] text-manuela-600 font-semibold mb-3">{ASSISTANTS.manuela.role}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectAssistant("manuela");
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-manuela-50 hover:bg-manuela-600 hover:text-white text-manuela-700 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border border-manuela-100/80 shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Ver Perfil</span>
              </button>
            </div>
          </div>
        </div>

        {/* SAAJ Values Banner */}
        <div className="glass-card p-4.5 rounded-3xl border border-slate-900/[0.06] shadow-soft flex items-center gap-3.5">
          <div className="p-2.5 rounded-2xl bg-rose-50 text-rose-600 shrink-0 border border-rose-100">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 text-xs">Atendimento sem Julgamentos</h4>
            <p className="text-[11px] text-slate-500 font-normal">
              Informação médica de confiança, acessível e 100% confidencial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
