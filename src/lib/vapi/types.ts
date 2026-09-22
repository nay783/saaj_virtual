import { AssistantId, ServiceArea } from "@/types/saaj";

export type VapiCallStatus =
  | "idle"
  | "preparing"
  | "requesting_permission"
  | "connecting"
  | "connected"
  | "ending"
  | "ended"
  | "failed";

export interface VapiCallConfig {
  publicKey: string;
  assistantId: string;
}

export interface StartCallParams {
  assistant: AssistantId;
  serviceArea: ServiceArea;
  onStatusChange: (status: VapiCallStatus) => void;
  onError: (errorMessage: string) => void;
  onVolumeLevel?: (volume: number) => void;
}
