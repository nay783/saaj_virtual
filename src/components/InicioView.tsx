"use client";

import React from "react";
import Image from "next/image";
import { MapPin, MessageSquare, ShieldCheck, ArrowRight, Heart } from "lucide-react";
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
      <div className="px-4 py-4 max-w-md mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-white/80 shadow-xs">
            <Image
              src="/logo/LOGO_APP.jpg"
              alt="SAAJ Virtual Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="font-bold text-slate-900 tracking-tight text-lg">
            SAAJ Virtual
          </span>
        </div>

        <button
          onClick={onChangeLocation}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-card text-slate-800 text-xs font-semibold shadow-2xs hover:bg-white active-press"
        >
          <MapPin className="w-3.5 h-3.5 text-tonito-500" />
          <span>
            {location.district ? `${location.district}` : location.province}
          </span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="max-w-md mx-auto w-full px-4 pt-2 space-y-6">
        {/* Welcome Greeting Surface */}
        <div className="glass-card rounded-4xl p-6 shadow-soft relative overflow-hidden border border-white/90">
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Privado & Confidencial</span>
            </div>

            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Olá! Como estás?
            </h1>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xs">
              Tens dúvidas de saúde sexual ou reprodutiva? Escolhe um guia para apoio confidencial.
            </p>
          </div>
        </div>

        {/* Assistant Cards Section (Routes to Assistant Profiles) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Escolher Guia
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">Apoio 24/7</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Tonito Feature Card */}
            <div
              onClick={() => onSelectAssistant("tonito")}
              className="cursor-pointer glass-card p-5 rounded-4xl border border-white/90 shadow-soft hover:shadow-glow-blue transition-all flex flex-col items-center text-center group active-press"
            >
              <AssistantAvatar
                assistantId="tonito"
                size="lg"
                showAura={true}
                className="mb-3"
              />
              <h4 className="font-extrabold text-slate-900 text-base">{ASSISTANTS.tonito.name}</h4>
              <p className="text-[11px] text-tonito-600 font-bold mb-3">{ASSISTANTS.tonito.role}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectAssistant("tonito");
                }}
                className="w-full py-2.5 px-3 rounded-2xl bg-tonito-50 hover:bg-tonito-500 hover:text-white text-tonito-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Ver Perfil</span>
              </button>
            </div>

            {/* Manuela Feature Card */}
            <div
              onClick={() => onSelectAssistant("manuela")}
              className="cursor-pointer glass-card p-5 rounded-4xl border border-white/90 shadow-soft hover:shadow-glow-pink transition-all flex flex-col items-center text-center group active-press"
            >
              <AssistantAvatar
                assistantId="manuela"
                size="lg"
                showAura={true}
                className="mb-3"
              />
              <h4 className="font-extrabold text-slate-900 text-base">{ASSISTANTS.manuela.name}</h4>
              <p className="text-[11px] text-manuela-600 font-bold mb-3">{ASSISTANTS.manuela.role}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectAssistant("manuela");
                }}
                className="w-full py-2.5 px-3 rounded-2xl bg-manuela-50 hover:bg-manuela-500 hover:text-white text-manuela-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Ver Perfil</span>
              </button>
            </div>
          </div>
        </div>

        {/* SAAJ Values Banner */}
        <div className="glass-card p-4 rounded-3xl border border-white/90 shadow-soft flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-pink-50 text-pink-600 shrink-0">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-xs">Atendimento sem Julgamentos</h4>
            <p className="text-[11px] text-slate-500">
              Informação médica de confiança, acessível e 100% confidencial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
