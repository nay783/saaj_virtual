"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AssistantId, LocationState, UserState } from "@/types/saaj";
import { DEFAULT_USER_STATE, loadUserState, saveUserState } from "@/lib/state/storage";
import { Splash } from "@/components/Splash";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { BottomNav, NavTab } from "@/components/BottomNav";
import { InicioView } from "@/components/InicioView";
import { ConversasView } from "@/components/ConversasView";
import { MaisView } from "@/components/MaisView";
import { ContactProfile } from "@/components/ContactProfile";
import { SaajChat } from "@/components/SaajChat";
import { VoiceCallModal } from "@/components/VoiceCallModal";

export default function Home() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [userState, setUserState] = useState<UserState>(DEFAULT_USER_STATE);
  const [activeTab, setActiveTab] = useState<NavTab>("inicio");

  // Modal / Subview states
  const [selectedProfileAssistant, setSelectedProfileAssistant] = useState<AssistantId | null>(null);
  const [activeMessagingAssistant, setActiveMessagingAssistant] = useState<AssistantId | null>(null);
  const [messagingSource, setMessagingSource] = useState<"profile" | "conversas">("conversas");
  const [activeVoiceCallAssistant, setActiveVoiceCallAssistant] = useState<AssistantId | null>(null);

  // Initialize SAAJ user state on client load
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("[SAAJ BOOT] Root component mounted, restoring persisted SAAJ state...");
    }
    const loaded = loadUserState();
    setUserState(loaded);
    if (process.env.NODE_ENV === "development") {
      console.log("[SAAJ BOOT] SAAJ local user state restored successfully:", {
        onboardingCompleted: loaded.onboardingCompleted,
        serviceArea: loaded.location.serviceArea,
      });
    }
  }, []);

  const handleSplashComplete = useCallback(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("[SAAJ BOOT] Splash completed, releasing application shell...");
    }
    setIsInitializing(false);
  }, []);

  const updateState = (updater: (prev: UserState) => UserState) => {
    setUserState((prev) => {
      const next = updater(prev);
      saveUserState(next);
      return next;
    });
  };

  // Onboarding completion
  const handleOnboardingComplete = (location: LocationState, assistant: AssistantId) => {
    updateState((prev) => ({
      ...prev,
      onboardingCompleted: true,
      location,
      lastAssistant: assistant,
    }));
    // Open contact profile for chosen assistant
    setSelectedProfileAssistant(assistant);
  };

  // Canonical function to open messaging with an assistant
  const handleStartMessaging = (assistantId: AssistantId, source: "profile" | "conversas" = "conversas") => {
    setMessagingSource(source);
    setSelectedProfileAssistant(null);
    setActiveMessagingAssistant(assistantId);
  };

  if (isInitializing) {
    return <Splash onComplete={handleSplashComplete} minDurationMs={800} />;
  }

  // Mandatory onboarding flow
  if (!userState.onboardingCompleted) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  // 1. Active Voice Call Modal overlay (highest priority overlay)
  if (activeVoiceCallAssistant) {
    return (
      <VoiceCallModal
        assistantId={activeVoiceCallAssistant}
        serviceArea={userState.location.serviceArea}
        onClose={() => setActiveVoiceCallAssistant(null)}
        onQuickExit={() => {
          setActiveVoiceCallAssistant(null);
          setSelectedProfileAssistant(null);
        }}
      />
    );
  }

  // 2. Active ConvoCore Messaging View overlay
  if (activeMessagingAssistant) {
    return (
      <SaajChat
        assistantId={activeMessagingAssistant}
        serviceArea={userState.location.serviceArea}
        anonymousUserId={userState.anonymousUserId}
        onBack={() => setActiveMessagingAssistant(null)}
        onQuickExit={() => {
          setActiveMessagingAssistant(null);
        }}
        source={messagingSource}
      />
    );
  }

  // 3. Assistant Contact Profile overlay
  if (selectedProfileAssistant) {
    return (
      <ContactProfile
        assistantId={selectedProfileAssistant}
        serviceArea={userState.location.serviceArea}
        onBack={() => setSelectedProfileAssistant(null)}
        onStartMessage={() => handleStartMessaging(selectedProfileAssistant, "profile")}
        onStartCall={() => setActiveVoiceCallAssistant(selectedProfileAssistant)}
      />
    );
  }

  return (
    <main className="relative min-h-screen-dvh bg-slate-50">
      {/* Active Tab rendering */}
      {activeTab === "inicio" && (
        <InicioView
          location={userState.location}
          onSelectAssistant={(assistant) => setSelectedProfileAssistant(assistant)}
          onChangeLocation={() => {
            updateState((prev) => ({ ...prev, onboardingCompleted: false }));
          }}
        />
      )}

      {activeTab === "conversas" && (
        <ConversasView
          onStartConversation={(assistant) => handleStartMessaging(assistant, "conversas")}
        />
      )}

      {activeTab === "mais" && (
        <MaisView
          location={userState.location}
          onChangeLocation={() => {
            updateState((prev) => ({ ...prev, onboardingCompleted: false }));
          }}
          onConversationsCleared={() => {
            updateState((prev) => ({
              ...prev,
              conversations: [],
              activeConversationId: null,
            }));
          }}
          onResetDevice={() => {
            setUserState(loadUserState());
          }}
        />
      )}

      {/* Primary Floating Glass Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  );
}
