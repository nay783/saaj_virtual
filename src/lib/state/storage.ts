import { AssistantId, ConversationThread, LocationState, UserState } from "@/types/saaj";
import { createLocationState } from "@/lib/routing/location";

const STORAGE_KEY = "saaj_virtual_user_state_v1";

function generateAnonymousId(): string {
  if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `anon_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`;
}

export const DEFAULT_USER_STATE: UserState = {
  anonymousUserId: "",
  onboardingCompleted: false,
  location: createLocationState("Inhambane", "Maxixe"),
  lastAssistant: "tonito",
  conversations: [],
  activeConversationId: null,
};

export function loadUserState(): UserState {
  if (typeof window === "undefined") {
    return DEFAULT_USER_STATE;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const newState: UserState = {
        ...DEFAULT_USER_STATE,
        anonymousUserId: generateAnonymousId(),
      };
      saveUserState(newState);
      return newState;
    }
    const parsed = JSON.parse(raw);
    if (!parsed.anonymousUserId) {
      parsed.anonymousUserId = generateAnonymousId();
    }
    return parsed;
  } catch (error) {
    console.error("Failed to load SAAJ local user state:", error);
    return {
      ...DEFAULT_USER_STATE,
      anonymousUserId: generateAnonymousId(),
    };
  }
}

export function saveUserState(state: UserState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save SAAJ local user state:", error);
  }
}

export function clearConversationsOnly(): void {
  if (typeof window === "undefined") return;
  const current = loadUserState();
  current.conversations = [];
  current.activeConversationId = null;
  saveUserState(current);
}

export function resetAllDeviceData(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.clear();
  } catch (error) {
    console.error("Failed to clear SAAJ device data:", error);
  }
}
