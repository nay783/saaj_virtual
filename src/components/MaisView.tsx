"use client";

import React, { useState } from "react";
import { MapPin, Shield, Trash2, HelpCircle, Info, FileText, ChevronRight } from "lucide-react";
import { LocationState } from "@/types/saaj";
import { clearConversationsOnly, resetAllDeviceData } from "@/lib/state/storage";

interface MaisViewProps {
  location: LocationState;
  onChangeLocation: () => void;
  onConversationsCleared: () => void;
  onResetDevice: () => void;
}

export const MaisView: React.FC<MaisViewProps> = ({
  location,
  onChangeLocation,
  onConversationsCleared,
  onResetDevice,
}) => {
  const [confirmClearConversations, setConfirmClearConversations] = useState(false);
  const [confirmResetDevice, setConfirmResetDevice] = useState(false);
  const [activeModal, setActiveModal] = useState<"about" | "help" | "terms" | null>(null);

  const handleClearConversations = () => {
    clearConversationsOnly();
    setConfirmClearConversations(false);
    onConversationsCleared();
  };

  const handleResetDevice = () => {
    resetAllDeviceData();
    setConfirmResetDevice(false);
    onResetDevice();
  };

  return (
    <div className="min-h-screen-dvh flex flex-col bg-ambient-neutral pb-28 safe-top">
      {/* Top Header */}
      <div className="px-4 py-4 max-w-md mx-auto w-full">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Mais</h1>
      </div>

      <div className="max-w-md mx-auto w-full px-4 pt-1 space-y-6">
        {/* Localização Group */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2">
            Localização
          </h3>
          <div className="glass-card rounded-3xl border border-white/90 shadow-soft overflow-hidden">
            <button
              onClick={onChangeLocation}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50/60 transition-colors active-press"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-2xl bg-blue-50 text-tonito-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {location.district ? `${location.district}, ${location.province}` : location.province}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Área: <span className="font-bold uppercase text-slate-700">{location.serviceArea}</span>
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Privacidade e Segurança Group */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2">
            Privacidade e Segurança
          </h3>
          <div className="glass-card rounded-3xl border border-white/90 shadow-soft divide-y divide-slate-100 overflow-hidden">
            <button
              onClick={() => setConfirmClearConversations(true)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50/60 transition-colors active-press"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Limpar conversas</h4>
                  <p className="text-xs text-slate-500">Apaga o histórico guardado no dispositivo</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button
              onClick={() => setConfirmResetDevice(true)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50/60 transition-colors active-press"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-2xl bg-red-50 text-red-600">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-red-600 text-sm">Limpar dados deste dispositivo</h4>
                  <p className="text-xs text-slate-500">Reinicia as definições locais do dispositivo</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Sobre Group */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2">
            Sobre
          </h3>
          <div className="glass-card rounded-3xl border border-white/90 shadow-soft divide-y divide-slate-100 overflow-hidden">
            <button
              onClick={() => setActiveModal("about")}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50/60 transition-colors active-press"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600">
                  <Info className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-900 text-sm">Sobre o SAAJ Virtual</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveModal("help")}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50/60 transition-colors active-press"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-900 text-sm">Ajuda e apoio</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveModal("terms")}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50/60 transition-colors active-press"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-900 text-sm">Termos e privacidade</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Developer attribution */}
        <div className="text-center pt-2 text-xs text-slate-400">
          <p className="font-bold text-slate-600 mb-0.5">SAAJ Virtual V1.0</p>
          <p>Desenvolvido por NCAI Consultorias e Serviços, EI</p>
        </div>
      </div>

      {/* Confirmation Modal: Clear Conversations */}
      {confirmClearConversations && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 safe-top safe-bottom animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-2xl rounded-4xl p-6 max-w-sm w-full space-y-4 shadow-elevated border border-white/80">
            <h3 className="text-lg font-extrabold text-slate-900">Limpar Conversas?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Esta ação removerá o teu histórico de mensagens locais. As tuas definições de localização e agendamentos não serão afetadas.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setConfirmClearConversations(false)}
                className="flex-1 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs active-press"
              >
                Cancelar
              </button>
              <button
                onClick={handleClearConversations}
                className="flex-1 py-3 rounded-2xl bg-amber-600 text-white font-bold text-xs shadow-md active-press"
              >
                Sim, Limpar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Reset Device */}
      {confirmResetDevice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 safe-top safe-bottom animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-2xl rounded-4xl p-6 max-w-sm w-full space-y-4 shadow-elevated border border-white/80">
            <h3 className="text-lg font-extrabold text-red-600">Limpar Todos os Dados?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Esta ação reiniciará a aplicação e removerá todos os dados guardados neste dispositivo.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setConfirmResetDevice(false)}
                className="flex-1 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs active-press"
              >
                Cancelar
              </button>
              <button
                onClick={handleResetDevice}
                className="flex-1 py-3 rounded-2xl bg-red-600 text-white font-bold text-xs shadow-md active-press"
              >
                Sim, Reiniciar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Information Sheet Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 safe-top safe-bottom animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-2xl rounded-4xl p-6 max-w-md w-full space-y-4 shadow-elevated border border-white/80 max-h-[80vh] overflow-y-auto">
            {activeModal === "about" && (
              <>
                <h3 className="text-lg font-extrabold text-slate-900">Sobre o SAAJ Virtual</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  O SAAJ Virtual é uma plataforma digital desenvolvida para facilitar o acesso dos jovens em Moçambique a informações confiáveis, orientação e serviços de saúde sexual e reprodutiva.
                </p>
              </>
            )}

            {activeModal === "help" && (
              <>
                <h3 className="text-lg font-extrabold text-slate-900">Ajuda e Apoio</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Em caso de urgência médica ou necessidade de apoio presencial imediato, dirige-te ao centro de saúde ou unidade SAAJ mais próxima.
                </p>
              </>
            )}

            {activeModal === "terms" && (
              <>
                <h3 className="text-lg font-extrabold text-slate-900">Termos e Privacidade</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  O SAAJ Virtual não exige registo de conta para apoio inicial. A tua privacidade é garantida por omissão.
                </p>
              </>
            )}

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs active-press"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
