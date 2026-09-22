import { AssistantId, ServiceArea } from "@/types/saaj";

export type VapiCallStatus =
  | "idle"
  | "starting"
  | "active"
  | "ending"
  | "ended"
  | "error";

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
