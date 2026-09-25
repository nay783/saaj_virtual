"use client";

import React from "react";
import { LogOut } from "lucide-react";

interface QuickExitButtonProps {
  onQuickExit?: () => void;
  className?: string;
  variant?: "badge" | "button" | "icon";
}

export const QuickExitButton: React.FC<QuickExitButtonProps> = ({
  onQuickExit,
  className = "",
  variant = "button",
}) => {
  const handleExit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickExit) {
      onQuickExit();
    }
    // Neutral destination redirect
    window.location.href = "https://www.google.com";
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleExit}
        className={`p-2 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 border border-rose-200/60 ${className}`}
        title="Saída Rápida"
        aria-label="Saída Rápida"
      >
        <LogOut className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={handleExit}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200/80 hover:bg-rose-100 active:scale-[0.985] transition-all shadow-2xs ${className}`}
      title="Fechar imediatamente o aplicativo e ir para um site neutro"
      aria-label="Saída Rápida"
    >
      <LogOut className="w-3.5 h-3.5 text-rose-600" />
      <span>Saída Rápida</span>
    </button>
  );
};
