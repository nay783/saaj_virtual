"use client";

import React from "react";
import { AssistantId } from "@/types/saaj";
import { ASSISTANTS } from "@/lib/config/assistants";

interface AssistantAvatarProps {
  assistantId: AssistantId;
  size?: "sm" | "md" | "lg" | "xl";
  showAura?: boolean;
  className?: string;
}

export const AssistantAvatar: React.FC<AssistantAvatarProps> = ({
  assistantId,
  size = "md",
  showAura = false,
  className = "",
}) => {
  const isTonito = assistantId === "tonito";
  const assistant = ASSISTANTS[assistantId];

  const sizeClasses = {
    sm: "w-9 h-9 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-20 h-20 text-xl",
    xl: "w-28 h-28 text-3xl",
  };

  const auraSizes = {
    sm: "w-12 h-12 -inset-1.5",
    md: "w-16 h-16 -inset-2",
    lg: "w-28 h-28 -inset-4",
    xl: "w-36 h-36 -inset-4",
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Soft atmospheric aura background */}
      {showAura && (
        <div
          className={`absolute rounded-full blur-xl opacity-60 transition-all ${
            auraSizes[size]
          } ${isTonito ? "bg-tonito-500/30" : "bg-manuela-500/30"}`}
        />
      )}

      {/* Styled Assistant Portrait Avatar Badge */}
      <div
        className={`relative z-10 rounded-full flex items-center justify-center font-bold tracking-tight shadow-md transition-transform ${
          sizeClasses[size]
        } ${
          isTonito
            ? "bg-gradient-to-tr from-tonito-600 via-tonito-500 to-blue-400 text-white border-2 border-white/80 shadow-glow-blue"
            : "bg-gradient-to-tr from-manuela-600 via-manuela-500 to-rose-400 text-white border-2 border-white/80 shadow-glow-pink"
        }`}
      >
        <svg
          className="w-1/2 h-1/2 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isTonito ? (
            /* Tonito stylized sleek icon badge */
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          ) : (
            /* Manuela stylized sleek icon badge */
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          )}
        </svg>
      </div>
    </div>
  );
};
