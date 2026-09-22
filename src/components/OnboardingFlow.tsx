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
      <div className="flex items-center justify-between max-w-md mx-auto w-full mb-2">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-white/80 shadow-2xs">
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

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-card text-slate-700 text-xs font-semibold shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Privado & Confidencial</span>
        </div>
      </div>

      {/* Step 1: Welcome */}
      {step === "welcome" && (
        <div className="max-w-md mx-auto w-full my-auto flex flex-col items-center text-center animate-fadeIn">
          <div className="relative w-28 h-28 mb-5 rounded-3xl overflow-hidden shadow-soft border-2 border-white bg-white p-2">
            <Image
              src="/logo/LOGO_APP.jpg"
              alt="SAAJ Virtual"
              fill
              className="object-contain p-2"
            />
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
            O teu espaço seguro de saúde sexual
          </h1>

          <p className="text-xs text-slate-600 leading-relaxed mb-6 max-w-xs">
            Tira dúvidas, conversa com os nossos guias e agenda consultas com total privacidade e sem julgamentos.
          </p>

          <div className="w-full space-y-3 mb-6 text-left glass-card p-4 rounded-3xl border border-white/90 shadow-soft">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 mt-0.5 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Sem registo obrigatório</h4>
                <p className="text-[11px] text-slate-500">Podes aceder ao apoio sem criar conta ou dar palavra-passe.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-pink-50 text-pink-600 mt-0.5 shrink-0">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Guias dedicados</h4>
                <p className="text-[11px] text-slate-500">O Tonito e a Manuela estão prontos para te ouvir e ajudar.</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep("location")}
            className="w-full py-4 px-6 rounded-3xl bg-tonito-500 hover:bg-tonito-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active-press"
          >
            <span>Começar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: Location Selection (Premium Mobile Dropdown V1) */}
      {step === "location" && (
        <div className="max-w-md mx-auto w-full my-auto flex flex-col animate-fadeIn">
          {/* Back Control */}
          <button
            type="button"
            onClick={() => setStep("welcome")}
            className="self-start inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 mb-4 px-1 py-1 rounded-lg transition-colors active-press"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          <div className="mb-6 text-center">
            <div className="inline-flex p-3 rounded-full bg-blue-50 text-tonito-600 mb-3">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
              Onde te encontras?
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
              A tua localização ajuda-nos a mostrar os serviços disponíveis na tua região.
            </p>
          </div>

          {/* Premium Form Surface */}
          <form
            onSubmit={handleLocationSubmit}
            className="space-y-5 glass-card p-6 rounded-4xl border border-white/90 shadow-soft"
          >
            {/* Field 1: Província */}
            <div>
              <label
                htmlFor="province-select"
                className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2"
              >
                Província
              </label>
              <div className="relative">
                <select
                  id="province-select"
                  value={selectedProvince}
                  onChange={(e) => handleProvinceChange(e.target.value)}
                  className="w-full h-14 px-4 pr-10 rounded-2xl border border-slate-200/90 bg-white/95 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-tonito-500 focus:border-tonito-500 shadow-2xs appearance-none cursor-pointer"
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

            {/* Field 2: Distrito / Cidade (Revealed only when province = Inhambane) */}
            {isInhambane && (
              <div className="space-y-2 pt-1 animate-fadeIn transition-all duration-300 ease-out motion-reduce:transition-none">
                <label
                  htmlFor="district-select"
                  className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider"
                >
                  Distrito / Cidade
                </label>
                <div className="relative">
                  <select
                    id="district-select"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full h-14 px-4 pr-10 rounded-2xl border border-tonito-300 bg-white/95 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-tonito-500 focus:border-tonito-500 shadow-2xs appearance-none cursor-pointer"
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
              className="w-full h-14 rounded-3xl bg-tonito-500 hover:bg-tonito-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active-press disabled:opacity-40 disabled:cursor-not-allowed mt-3"
            >
              <span>Continuar</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Step 3: Assistant Choice */}
      {step === "assistant" && (
        <div className="max-w-md mx-auto w-full my-auto flex flex-col animate-fadeIn">
          {/* Back Control */}
          <button
            type="button"
            onClick={() => setStep("location")}
            className="self-start inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 mb-3 px-1 py-1 rounded-lg transition-colors active-press"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Voltar para Localização</span>
          </button>

          <div className="mb-6 text-center">
            <div className="inline-flex p-3 rounded-full bg-purple-50 text-purple-600 mb-2">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mb-1">
              Com quem preferes começar?
            </h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Podes falar com qualquer um dos guias a qualquer momento.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {/* Tonito Card */}
            <div
              onClick={() => setSelectedAssistant("tonito")}
              className={`cursor-pointer p-5 rounded-4xl border-2 transition-all flex items-center gap-4 active-press ${
                selectedAssistant === "tonito"
                  ? "border-tonito-500 bg-tonito-50/70 shadow-glow-blue"
                  : "border-white/90 glass-card hover:border-slate-300"
              }`}
            >
              <AssistantAvatar assistantId="tonito" size="lg" showAura={selectedAssistant === "tonito"} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {ASSISTANTS.tonito.name}
                  </h3>
                  {selectedAssistant === "tonito" && (
                    <CheckCircle2 className="w-5 h-5 text-tonito-500" />
                  )}
                </div>
                <p className="text-xs text-tonito-700 font-bold mb-1">
                  {ASSISTANTS.tonito.role}
                </p>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {ASSISTANTS.tonito.tagline}
                </p>
              </div>
            </div>

            {/* Manuela Card */}
            <div
              onClick={() => setSelectedAssistant("manuela")}
              className={`cursor-pointer p-5 rounded-4xl border-2 transition-all flex items-center gap-4 active-press ${
                selectedAssistant === "manuela"
                  ? "border-manuela-500 bg-manuela-50/70 shadow-glow-pink"
                  : "border-white/90 glass-card hover:border-slate-300"
              }`}
            >
              <AssistantAvatar assistantId="manuela" size="lg" showAura={selectedAssistant === "manuela"} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {ASSISTANTS.manuela.name}
                  </h3>
                  {selectedAssistant === "manuela" && (
                    <CheckCircle2 className="w-5 h-5 text-manuela-500" />
                  )}
                </div>
                <p className="text-xs text-manuela-700 font-bold mb-1">
                  {ASSISTANTS.manuela.role}
                </p>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {ASSISTANTS.manuela.tagline}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleFinish(selectedAssistant)}
            className={`w-full py-4 px-6 rounded-3xl text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active-press ${
              selectedAssistant === "tonito"
                ? "bg-tonito-500 hover:bg-tonito-600 shadow-glow-blue"
                : "bg-manuela-500 hover:bg-manuela-600 shadow-glow-pink"
            }`}
          >
            <span>Concluir e Entrar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Footer attribution */}
      <div className="text-center text-[11px] text-slate-400 mt-2">
        Desenvolvido por NCAI Consultorias e Serviços, EI
      </div>
    </div>
  );
};
