"use client";

import React from "react";
import { Home, MessageCircle, MoreHorizontal } from "lucide-react";

export type NavTab = "inicio" | "conversas" | "mais";

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  unreadCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  unreadCount = 0,
}) => {
  const tabs = [
    {
      id: "inicio" as NavTab,
      label: "Início",
      icon: Home,
    },
    {
      id: "conversas" as NavTab,
      label: "Conversas",
      icon: MessageCircle,
      badge: unreadCount > 0 ? unreadCount : null,
    },
    {
      id: "mais" as NavTab,
      label: "Mais",
      icon: MoreHorizontal,
    },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-4 pointer-events-none safe-bottom flex justify-center">
      <nav className="pointer-events-auto w-full max-w-sm glass-nav rounded-full px-3 py-2 shadow-floating transition-all border border-slate-900/[0.08] flex items-center justify-between">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center justify-center gap-2 py-2.5 px-5 rounded-full transition-all duration-200 active-press ${
                isActive
                  ? "bg-slate-900 text-white font-semibold shadow-sm scale-100"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/70 font-medium"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-manuela-600 text-[10px] font-bold text-white shadow-2xs">
                    {tab.badge}
                  </span>
                )}
              </div>

              {isActive && (
                <span className="text-xs tracking-tight animate-fadeIn font-semibold">
                  {tab.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
