import { AssistantId, ServiceArea } from "@/types/saaj";

export interface VoiceflowProjectConfig {
  projectID: string;
  assistant: AssistantId;
  serviceArea: ServiceArea;
}

// Fallback authoritative project matrix from VOICEFLOW_EMBEDS.md
const VERIFIED_VOICEFLOW_PROJECTS: Record<AssistantId, Record<ServiceArea, string>> = {
  tonito: {
    maxixe: "6a02ea7a8532999d6114892c",
    massinga: "6a02ea85171482ed6438ff05",
    geral: "6a02ea6ebc1ce2a5e7d48b4b",
  },
  manuela: {
    maxixe: "6ab065f92ea3e7c2c7b0f21a",
    massinga: "6ab066032ea3e7c2c7b0f220",
    geral: "6ab0660c2ea3e7c2c7b0f226",
  },
};

export function resolveVoiceflowProjectId(
  assistant: AssistantId,
  serviceArea: ServiceArea
): string {
  const verified = VERIFIED_VOICEFLOW_PROJECTS[assistant]?.[serviceArea];
  if (!verified) {
    return VERIFIED_VOICEFLOW_PROJECTS.tonito.geral;
  }
  return verified;
}
