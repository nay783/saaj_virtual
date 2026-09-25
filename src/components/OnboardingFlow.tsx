"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  ShieldCheck,
  Heart,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { AssistantId, LocationState } from "@/types/saaj";
import {
  createLocationState,
  INHAMBANE_DISTRICTS,
  PROVINCES_MOZAMBIQUE,
} from "@/lib/routing/location";
import { ASSISTANTS } from "@/lib/config/assistants";
import { AssistantAvatar } from "@/components/AssistantAvatar";

interface OnboardingFlowProps {
  onComplete: (location: LocationState, assistant: AssistantId) => void;
  initialLocation?: LocationState;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  onComplete,
  initialLocation,
}) => {
  const [step, setStep] = useState<"welcome" | "location" | "assistant">(
    "welcome"
  );

  const [selectedProvince, setSelectedProvince] = useState<string>(
    initialLocation?.province || ""
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string>(
    initialLocation?.district || ""
  );
  const [selectedAssistant, setSelectedAssistant] = useState<AssistantId>(
    "tonito"
  );

  const isInhambane = selectedProvince === "Inhambane";

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProvince) return;
    if (isInhambane && !selectedDistrict) return;

    setStep("assistant");
  };

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    // Reset dependent district when province changes
    setSelectedDistrict("");
  };

  const handleFinish = (assistant: AssistantId) => {
    const locState = createLocationState(
      selectedProvince,
      isInhambane ? selectedDistrict : null
    );
    onComplete(locState, assistant);
  };

  return (
    <div className="min-h-screen-dvh flex flex-col justify-between bg-ambient-neutral px-4 py-6 safe-top safe-bottom">
      {/* Top Header Identity */}
      <div className="flex items-center justify-between max-w-xl mx-auto w-full mb-2">
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

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-card text-slate-700 text-xs font-medium border border-slate-900/[0.06] shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Privado & Confidencial</span>
        </div>
      </div>

      {/* Step 1: Welcome */}
      {step === "welcome" && (
        <div className="max-w-xl mx-auto w-full my-auto flex flex-col items-center text-center animate-fadeIn py-4">
          <div className="relative flex items-center justify-center mb-6">
            {/* Subtle atmospheric ambient glow behind central mark */}
            <div className="absolute w-36 h-36 rounded-full bg-blue-500/10 blur-2xl -z-10" />
            <div className="relative w-24 h-24 rounded-3xl overflow-hidden shadow-soft border border-slate-900/[0.06] bg-white p-2">
              <Image
                src="/logo/LOGO_APP.jpg"
                alt="SAAJ Virtual"
                fill
                className="object-contain p-2"
              />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight mb-2.5 leading-snug">
            O teu espaço seguro de saúde sexual
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 max-w-sm font-normal">
            Tira dúvidas, conversa com os nossos guias e agenda consultas com total privacidade e sem julgamentos.
          </p>

          <div className="w-full space-y-3 mb-6 text-left glass-card p-5 rounded-3xl border border-slate-900/[0.06] shadow-soft">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-2xl bg-blue-50 text-tonito-600 mt-0.5 shrink-0 border border-blue-100">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-900">Sem registo obrigatório</h4>
                <p className="text-[11px] text-slate-500 font-normal">Podes aceder ao apoio sem criar conta ou dar palavra-passe.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-2xl bg-rose-50 text-manuela-600 mt-0.5 shrink-0 border border-rose-100">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-900">Guias dedicados</h4>
                <p className="text-[11px] text-slate-500 font-normal">O Tonito e a Manuela estão prontos para te ouvir e ajudar.</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep("location")}
            className="w-full h-14 px-6 rounded-2xl bg-tonito-600 hover:bg-tonito-700 text-white font-semibold text-sm tracking-tight shadow-md transition-all flex items-center justify-center gap-2 active-press hover:-translate-y-0.5"
          >
            <span>Começar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: Location Selection */}
      {step === "location" && (
        <div className="max-w-xl mx-auto w-full my-auto flex flex-col animate-fadeIn py-4">
          {/* Back Control */}
          <button
            type="button"
            onClick={() => setStep("welcome")}
            className="self-start inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 mb-4 px-2 py-1.5 rounded-xl transition-colors active-press hover:bg-white/60"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          <div className="mb-6 text-center">
            <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-tonito-600 mb-3 border border-blue-100">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 tracking-tight mb-2">
              Onde te encontras?
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto font-normal">
              A tua localização ajuda-nos a mostrar os serviços disponíveis na tua região.
            </p>
          </div>

          {/* Form Surface */}
          <form
            onSubmit={handleLocationSubmit}
            className="space-y-5 glass-card p-6 rounded-3xl border border-slate-900/[0.06] shadow-soft"
          >
            {/* Field 1: Província */}
            <div>
              <label
                htmlFor="province-select"
                className="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-2"
              >
                Província
              </label>
              <div className="relative">
                <select
                  id="province-select"
                  value={selectedProvince}
                  onChange={(e) => handleProvinceChange(e.target.value)}
                  className="w-full h-13 px-4 pr-10 rounded-xl border border-slate-200 bg-white/95 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-tonito-500 focus:border-tonito-500 shadow-2xs appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Seleciona a província...
                  </option>
                  {PROVINCES_MOZAMBIQUE.map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Field 2: Distrito / Cidade */}
            {isInhambane && (
              <div className="space-y-2 pt-1 animate-fadeIn transition-all duration-300 ease-out motion-reduce:transition-none">
                <label
                  htmlFor="district-select"
                  className="block text-xs font-medium text-slate-700 uppercase tracking-wider"
                >
                  Distrito / Cidade
                </label>
                <div className="relative">
                  <select
                    id="district-select"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full h-13 px-4 pr-10 rounded-xl border border-tonito-300 bg-white/95 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-tonito-500 focus:border-tonito-500 shadow-2xs appearance-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Seleciona o distrito...
                    </option>
                    {INHAMBANE_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                !selectedProvince ||
                (isInhambane && !selectedDistrict)
              }
              className="w-full h-14 rounded-2xl bg-tonito-600 hover:bg-tonito-700 text-white font-semibold text-sm tracking-tight shadow-md transition-all flex items-center justify-center gap-2 active-press disabled:opacity-40 disabled:cursor-not-allowed mt-3 hover:-translate-y-0.5"
            >
              <span>Continuar</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Step 3: Assistant Choice */}
      {step === "assistant" && (
        <div className="max-w-xl mx-auto w-full my-auto flex flex-col animate-fadeIn py-4">
          {/* Back Control */}
          <button
            type="button"
            onClick={() => setStep("location")}
            className="self-start inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 mb-3 px-2 py-1.5 rounded-xl transition-colors active-press hover:bg-white/60"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Voltar para Localização</span>
          </button>

          <div className="mb-6 text-center">
            <div className="inline-flex p-3 rounded-2xl bg-purple-50 text-purple-600 mb-2 border border-purple-100">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 tracking-tight mb-1">
              Com quem preferes começar?
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-normal">
              Podes falar com qualquer um dos guias a qualquer momento.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {/* Tonito Card */}
            <div
              onClick={() => setSelectedAssistant("tonito")}
              className={`cursor-pointer p-5 rounded-3xl border transition-all flex items-center gap-4 active-press ${
                selectedAssistant === "tonito"
                  ? "border-tonito-500/40 bg-tonito-50/70 shadow-[0_8px_25px_-6px_rgba(37,99,235,0.15)]"
                  : "border-slate-900/[0.06] glass-card hover:border-slate-300"
              }`}
            >
              <AssistantAvatar assistantId="tonito" size="lg" showAura={selectedAssistant === "tonito"} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="font-semibold text-slate-900 text-base">
                    {ASSISTANTS.tonito.name}
                  </h3>
                  {selectedAssistant === "tonito" && (
                    <CheckCircle2 className="w-5 h-5 text-tonito-600" />
                  )}
                </div>
                <p className="text-xs text-tonito-700 font-semibold mb-1">
                  {ASSISTANTS.tonito.role}
                </p>
                <p className="text-[11px] text-slate-500 line-clamp-2 font-normal">
                  {ASSISTANTS.tonito.tagline}
                </p>
              </div>
            </div>

            {/* Manuela Card */}
            <div
              onClick={() => setSelectedAssistant("manuela")}
              className={`cursor-pointer p-5 rounded-3xl border transition-all flex items-center gap-4 active-press ${
                selectedAssistant === "manuela"
                  ? "border-manuela-500/40 bg-manuela-50/70 shadow-[0_8px_25px_-6px_rgba(225,29,72,0.15)]"
                  : "border-slate-900/[0.06] glass-card hover:border-slate-300"
              }`}
            >
              <AssistantAvatar assistantId="manuela" size="lg" showAura={selectedAssistant === "manuela"} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="font-semibold text-slate-900 text-base">
                    {ASSISTANTS.manuela.name}
                  </h3>
                  {selectedAssistant === "manuela" && (
                    <CheckCircle2 className="w-5 h-5 text-manuela-600" />
                  )}
                </div>
                <p className="text-xs text-manuela-700 font-semibold mb-1">
                  {ASSISTANTS.manuela.role}
                </p>
                <p className="text-[11px] text-slate-500 line-clamp-2 font-normal">
                  {ASSISTANTS.manuela.tagline}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleFinish(selectedAssistant)}
            className={`w-full h-14 px-6 rounded-2xl text-white font-semibold text-sm tracking-tight shadow-md transition-all flex items-center justify-center gap-2 active-press hover:-translate-y-0.5 ${
              selectedAssistant === "tonito"
                ? "bg-tonito-600 hover:bg-tonito-700 shadow-glow-blue"
                : "bg-manuela-600 hover:bg-manuela-700 shadow-glow-pink"
            }`}
          >
            <span>Concluir e Entrar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Footer attribution */}
      <div className="text-center text-[11px] text-slate-400 mt-2 font-normal">
        Desenvolvido por NCAI Consultorias e Serviços, EI
      </div>
    </div>
  );
};
