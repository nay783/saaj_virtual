"use client";

import React, { useEffect, useState } from "react";
import { X, Calendar, ShieldCheck, AlertCircle } from "lucide-react";
import { ServiceArea } from "@/types/saaj";
import { QuickExitButton } from "@/components/QuickExitButton";

interface AppointmentEmbedModalProps {
  serviceArea: ServiceArea;
  onClose: () => void;
  onQuickExit?: () => void;
}

export const AppointmentEmbedModal: React.FC<AppointmentEmbedModalProps> = ({
  serviceArea,
  onClose,
  onQuickExit,
}) => {
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const calLink =
    serviceArea === "maxixe"
      ? "saaj-maxixe-8w8m61/saaj-virtual-marcacao-de-consulta"
      : serviceArea === "massinga"
      ? "saaj-massinga-0cr1s3/saaj-virtual-marcacao-de-consulta"
      : null;

  useEffect(() => {
    if (!calLink) return;

    // Listen for Cal.com iframe postMessages to verify booking confirmation
    const handleCalEvent = (e: MessageEvent) => {
      if (typeof e.data === "object" && e.data?.type === "CAL:bookingSuccessful") {
        setBookingConfirmed(true);
      }
    };

    window.addEventListener("message", handleCalEvent);
    return () => window.removeEventListener("message", handleCalEvent);
  }, [calLink]);

  if (!calLink) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 safe-top safe-bottom">
        <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-elevated border border-slate-900/[0.06]">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-lg font-semibold text-slate-900">Serviço indisponível</h3>
          <p className="text-xs text-slate-600 font-normal">
            O agendamento de consultas presenciais está disponível atualmente apenas para Maxixe e Massinga.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-900 text-white font-semibold text-xs active-press"
          >
            Fechar
          </button>
        </div>
      </div>
    );
  }

  const iframeSrc = `https://app.cal.com/${calLink}?embed=true&layout=month_view`;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-50 safe-top safe-bottom animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-900/[0.06] shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 text-tonito-600 border border-blue-100">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 leading-none">
              Marcar Consulta ({serviceArea === "maxixe" ? "Maxixe" : "Massinga"})
            </h3>
            <span className="text-[11px] text-slate-500 font-normal">
              Serviço Amigo dos Adolescentes e Jovens
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <QuickExitButton onQuickExit={onQuickExit} variant="badge" />
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors active-press"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Confirmation notification banner */}
      {bookingConfirmed && (
        <div className="bg-emerald-50 border-b border-emerald-200/80 px-4 py-2.5 flex items-center justify-between text-xs text-emerald-800">
          <div className="flex items-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Consulta agendada com sucesso! Guardaremos o teu agendamento de forma confidencial.</span>
          </div>
        </div>
      )}

      {/* Cal.com Responsive Embed Container */}
      <div className="flex-1 w-full relative bg-white">
        <iframe
          src={iframeSrc}
          className="w-full h-full border-none"
          title={`Agendamento SAAJ ${serviceArea}`}
        />
      </div>

      {/* Footer privacy reminder */}
      <div className="bg-white border-t border-slate-900/[0.06] px-4 py-2.5 text-center text-[11px] text-slate-400 font-normal">
        Os teus dados pessoais são recolhidos exclusivamente para o agendamento da tua consulta SAAJ.
      </div>
    </div>
  );
};
