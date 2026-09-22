import { AssistantId, ServiceArea } from "@/types/saaj";

/**
 * Central ConvoCore Agent Matrix
 * Maps assistantId + serviceArea to exact ConvoCore Agent ID.
 */
export const CONVOCORE_AGENTS: Record<AssistantId, Record<ServiceArea, string>> = {
  tonito: {
    maxixe:
      process.env.NEXT_PUBLIC_CONVOCORE_TONITO_MAXIXE_AGENT_ID ||
      "vRRTsmjoE6RtEmxET3Lf",
    massinga:
      process.env.NEXT_PUBLIC_CONVOCORE_TONITO_MASSINGA_AGENT_ID ||
      "BeBRQjZOtKYYrmCjQmbQ",
    geral:
      process.env.NEXT_PUBLIC_CONVOCORE_TONITO_GERAL_AGENT_ID ||
      "pfaITnBkpZFjnfbvH6eL",
  },
  manuela: {
    maxixe:
      process.env.NEXT_PUBLIC_CONVOCORE_MANUELA_MAXIXE_AGENT_ID ||
      "PAwlOrU45uhtDn3TRzD2",
    massinga:
      process.env.NEXT_PUBLIC_CONVOCORE_MANUELA_MASSINGA_AGENT_ID ||
      "4q90z4k2CIhxu3UdxzEC",
    geral:
      process.env.NEXT_PUBLIC_CONVOCORE_MANUELA_GERAL_AGENT_ID ||
      "vYaK48jkWjnsMiP4LtlA",
  },
};

export const CONVOCORE_GLOBAL_CONFIG = {
  region: process.env.NEXT_PUBLIC_CONVOCORE_REGION || "na",
  renderMode: "full-width",
  scriptUrl:
    process.env.NEXT_PUBLIC_CONVOCORE_SCRIPT_URL ||
    "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js",
  stylesheetUrl:
    process.env.NEXT_PUBLIC_CONVOCORE_STYLESHEET_URL ||
    "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css",
};

/**
 * Central resolver: resolves the exact ConvoCore Agent ID from assistant + serviceArea.
 */
export function resolveConvoCoreAgent(
  assistant: AssistantId,
  serviceArea: ServiceArea
): string {
  const normalizedArea = (serviceArea || "geral").toLowerCase() as ServiceArea;
  const agentId = CONVOCORE_AGENTS[assistant]?.[normalizedArea];

  if (!agentId) {
    throw new Error(
      `[ConvoCore] Undefined agent ID for assistant: ${assistant}, serviceArea: ${serviceArea}`
    );
  }

  return agentId;
}

/**
 * Startup / Development validation.
 * Verifies that all 6 required ConvoCore Agent IDs exist.
 */
export function validateConvoCoreConfig(): void {
  if (process.env.NODE_ENV === "development") {
    const assistants: AssistantId[] = ["tonito", "manuela"];
    const serviceAreas: ServiceArea[] = ["maxixe", "massinga", "geral"];

    assistants.forEach((ast) => {
      serviceAreas.forEach((sa) => {
        const id = resolveConvoCoreAgent(ast, sa);
        if (!id) {
          console.error(
            `[ConvoCore Config Error] Missing Agent ID for assistant: ${ast}, serviceArea: ${sa}`
          );
        }
      });
    });
  }
}
