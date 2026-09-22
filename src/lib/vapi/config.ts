import { AssistantId, ServiceArea } from "@/types/saaj";

/**
 * Resolves the configured Vapi assistant ID based on assistant and service area.
 * Returns null if serviceArea is 'geral' or if ID is missing.
 */
export function resolveVapiAssistantId(
  assistant: AssistantId,
  serviceArea: ServiceArea
): string | null {
  if (serviceArea === "geral") {
    return null;
  }

  if (assistant === "tonito") {
    if (serviceArea === "maxixe") {
      return (
        process.env.NEXT_PUBLIC_VAPI_TONITO_MAXIXE_ASSISTANT_ID ||
        process.env.VAPI_TONITO_MAXIXE_ASSISTANT_ID ||
        "16a2c837-ffba-4e6e-8fce-896be5735739"
      );
    }
    if (serviceArea === "massinga") {
      return (
        process.env.NEXT_PUBLIC_VAPI_TONITO_MASSINGA_ASSISTANT_ID ||
        process.env.VAPI_TONITO_MASSINGA_ASSISTANT_ID ||
        "2148ca59-9f18-4fbc-8870-987beb223f1f"
      );
    }
  }

  if (assistant === "manuela") {
    if (serviceArea === "maxixe") {
      return (
        process.env.NEXT_PUBLIC_VAPI_MANUELA_MAXIXE_ASSISTANT_ID ||
        process.env.VAPI_MANUELA_MAXIXE_ASSISTANT_ID ||
        "b49c93d1-b488-4150-a7ae-3a8cf97b16b2"
      );
    }
    if (serviceArea === "massinga") {
      return (
        process.env.NEXT_PUBLIC_VAPI_MANUELA_MASSINGA_ASSISTANT_ID ||
        process.env.VAPI_MANUELA_MASSINGA_ASSISTANT_ID ||
        "98081746-b184-45df-906d-51281f42ddb0"
      );
    }
  }

  return null;
}

/**
 * Resolves the client-accessible Vapi public key.
 */
export function getVapiPublicKey(): string | null {
  return (
    process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY ||
    "adefa80c-e24e-427d-9564-b94518bc7e26"
  );
}
