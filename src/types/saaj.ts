export type AssistantId = "tonito" | "manuela";

export type ServiceArea = "maxixe" | "massinga" | "geral";

export interface GeographicLocation {
  province: string;
  district?: string | null;
}

export interface LocationState extends GeographicLocation {
  serviceArea: ServiceArea;
}

export interface CapabilitySet {
  message: boolean;
  call: boolean;
  appointment: boolean;
}

export interface AssistantMetadata {
  id: AssistantId;
  name: string;
  role: string;
  tagline: string;
  description: string;
  avatar: string;
  theme: {
    primary: string;
    bgSubtle: string;
    accent: string;
    textDark: string;
    border: string;
    bubbleUser: string;
    bubbleBot: string;
  };
}

export interface SaajAction {
  type: "appointment" | "call" | "link";
  label: string;
  url?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant" | "system";
  text: string;
  timestamp: string;
  actions?: SaajAction[];
}

export interface ConversationThread {
  conversationId: string;
  assistant: AssistantId;
  serviceArea: ServiceArea;
  voiceflowSessionId: string;
  title: string;
  preview?: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface UserState {
  anonymousUserId: string;
  onboardingCompleted: boolean;
  location: LocationState;
  lastAssistant: AssistantId;
  conversations: ConversationThread[];
  activeConversationId?: string | null;
}

export type VoiceCallState =
  | "idle"
  | "requesting_permission"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "ending"
  | "ended"
  | "failed";
