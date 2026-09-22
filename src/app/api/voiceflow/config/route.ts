import { NextRequest, NextResponse } from "next/server";
import { AssistantId, ServiceArea } from "@/types/saaj";
import { resolveVoiceflowProjectId } from "@/lib/integrations/voiceflow";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const assistant = searchParams.get("assistant") as AssistantId;
  const serviceArea = searchParams.get("serviceArea") as ServiceArea;

  if (!assistant || !serviceArea) {
    return NextResponse.json(
      { error: "Parâmetros 'assistant' e 'serviceArea' são obrigatórios." },
      { status: 400 }
    );
  }

  // Environment variable mapping
  let envProjectId: string | undefined;

  if (assistant === "tonito") {
    if (serviceArea === "maxixe") {
      envProjectId = process.env.VOICEFLOW_TONITO_MAXIXE_PROJECT_ID;
    } else if (serviceArea === "massinga") {
      envProjectId = process.env.VOICEFLOW_TONITO_MASSINGA_PROJECT_ID;
    } else {
      envProjectId = process.env.VOICEFLOW_TONITO_GERAL_PROJECT_ID;
    }
  } else if (assistant === "manuela") {
    if (serviceArea === "maxixe") {
      envProjectId = process.env.VOICEFLOW_MANUELA_MAXIXE_PROJECT_ID;
    } else if (serviceArea === "massinga") {
      envProjectId = process.env.VOICEFLOW_MANUELA_MASSINGA_PROJECT_ID;
    } else {
      envProjectId = process.env.VOICEFLOW_MANUELA_GERAL_PROJECT_ID;
    }
  }

  const projectID = envProjectId || resolveVoiceflowProjectId(assistant, serviceArea);

  return NextResponse.json({
    projectID,
    assistant,
    serviceArea,
  });
}
