"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { vapiClient } from "@/lib/vapi/client";

export default function Home() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [userState, setUserState] = useState<UserState>(DEFAULT_USER_STATE);
  const [activeTab, setActiveTab] = useState<NavTab>("inicio");

  // Modal / Subview states
  const [selectedProfileAssistant, setSelectedProfileAssistant] = useState<AssistantId | null>(null);
  const [activeMessagingAssistant, setActiveMessagingAssistant] = useState<AssistantId | null>(null);
  const [messagingSource, setMessagingSource] = useState<"profile" | "conversas">("conversas");
  const [activeVoiceCallAssistant, setActiveVoiceCallAssistant] = useState<AssistantId | null>(null);

  // Refs for tracking current state inside popstate event listeners without stale closures
  const activeVoiceCallRef = useRef(activeVoiceCallAssistant);
  const activeMessagingRef = useRef(activeMessagingAssistant);
  const messagingSourceRef = useRef(messagingSource);
  const selectedProfileRef = useRef(selectedProfileAssistant);

  useEffect(() => {
    activeVoiceCallRef.current = activeVoiceCallAssistant;
    activeMessagingRef.current = activeMessagingAssistant;
    messagingSourceRef.current = messagingSource;
    selectedProfileRef.current = selectedProfileAssistant;
  }, [activeVoiceCallAssistant, activeMessagingAssistant, messagingSource, selectedProfileAssistant]);

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

  // History / Android System Back button handling
  useEffect(() => {
    const handlePopState = () => {
      // 1. If voice call active, end call and close voice modal
      if (activeVoiceCallRef.current) {
        vapiClient.stopVoiceCall("user-pressed-back");
        setActiveVoiceCallAssistant(null);
        return;
      }

      // 2. If messaging active, close messaging
      if (activeMessagingRef.current) {
        const source = messagingSourceRef.current;
        const currentAssistant = activeMessagingRef.current;
        setActiveMessagingAssistant(null);
        if (source === "profile" && currentAssistant) {
          setSelectedProfileAssistant(currentAssistant);
        } else {
          setSelectedProfileAssistant(null);
        }
        return;
      }

      // 3. If profile active, close profile
      if (selectedProfileRef.current) {
        setSelectedProfileAssistant(null);
        return;
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Onboarding completion
  const handleOnboardingComplete = (location: LocationState, assistant: AssistantId) => {
    updateState((prev) => ({
      ...prev,
      onboardingCompleted: true,
      location,
      lastAssistant: assistant,
    }));
    handleSelectAssistantProfile(assistant);
  };

  // Open contact profile for an assistant
  const handleSelectAssistantProfile = (assistantId: AssistantId) => {
    setSelectedProfileAssistant(assistantId);
    try {
      window.history.pushState({ view: "profile", assistant: assistantId }, "");
    } catch (e) {}
  };

  // Canonical function to open messaging with an assistant
  const handleStartMessaging = (assistantId: AssistantId, source: "profile" | "conversas" = "conversas") => {
    setMessagingSource(source);
    if (source === "profile") {
      setSelectedProfileAssistant(assistantId);
    } else {
      setSelectedProfileAssistant(null);
    }
    setActiveMessagingAssistant(assistantId);
    try {
      window.history.pushState({ view: "chat", assistant: assistantId, source }, "");
    } catch (e) {}
  };

  // Start voice call
  const handleStartVoiceCall = (assistantId: AssistantId) => {
    setActiveVoiceCallAssistant(assistantId);
    try {
      window.history.pushState({ view: "voice", assistant: assistantId }, "");
    } catch (e) {}
  };

  // Close messaging and respect navigation hierarchy
  const handleCloseMessaging = () => {
    setActiveMessagingAssistant(null);
    if (messagingSource === "profile" && selectedProfileAssistant) {
      // Keep selectedProfileAssistant set so view returns to assistant profile
    } else {
      setSelectedProfileAssistant(null);
    }
  };

  // Close assistant profile and return to main tab
  const handleCloseProfile = () => {
    setSelectedProfileAssistant(null);
  };

  // Close voice call modal
  const handleCloseVoiceCall = () => {
    setActiveVoiceCallAssistant(null);
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
        onClose={handleCloseVoiceCall}
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
        onBack={handleCloseMessaging}
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
        onBack={handleCloseProfile}
        onStartMessage={() => handleStartMessaging(selectedProfileAssistant, "profile")}
        onStartCall={() => handleStartVoiceCall(selectedProfileAssistant)}
      />
    );
  }

  return (
    <main className="relative min-h-screen-dvh bg-slate-50">
      {/* Active Tab rendering */}
      {activeTab === "inicio" && (
        <InicioView
          location={userState.location}
          onSelectAssistant={(assistant) => handleSelectAssistantProfile(assistant)}
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
