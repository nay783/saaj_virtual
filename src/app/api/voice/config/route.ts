import { NextRequest, NextResponse } from "next/server";
import { AssistantId, ServiceArea } from "@/types/saaj";

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

  if (serviceArea === "geral") {
    return NextResponse.json(
      { error: "Chamadas de voz não estão disponíveis para esta localização." },
      { status: 400 }
    );
  }

  let assistantId: string | undefined;

  if (assistant === "tonito") {
    if (serviceArea === "maxixe") {
      assistantId = process.env.VAPI_TONITO_MAXIXE_ASSISTANT_ID;
    } else if (serviceArea === "massinga") {
      assistantId = process.env.VAPI_TONITO_MASSINGA_ASSISTANT_ID;
    }
  } else if (assistant === "manuela") {
    if (serviceArea === "maxixe") {
      assistantId = process.env.VAPI_MANUELA_MAXIXE_ASSISTANT_ID;
    } else if (serviceArea === "massinga") {
      assistantId = process.env.VAPI_MANUELA_MASSINGA_ASSISTANT_ID;
    }
  }

  const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;

  if (!assistantId || !publicKey) {
    return NextResponse.json(
      { error: "Configuração de voz indisponível no momento." },
      { status: 503 }
    );
  }

  return NextResponse.json({
    publicKey,
    assistantId,
  });
}
