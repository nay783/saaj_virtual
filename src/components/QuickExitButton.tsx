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
        className={`p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${className}`}
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
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 active:scale-95 transition-all shadow-sm ${className}`}
      title="Fechar imediatamente o aplicativo e ir para um site neutro"
      aria-label="Saída Rápida"
    >
      <LogOut className="w-3.5 h-3.5 text-red-600" />
      <span>Saída Rápida</span>
    </button>
  );
};
