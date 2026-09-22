import { NextRequest, NextResponse } from "next/server";
import { AssistantId, ServiceArea } from "@/types/saaj";

interface ChatApiRequestBody {
  assistant: AssistantId;
  serviceArea: ServiceArea;
  messageText: string;
  voiceflowSessionId: string;
}

function getVoiceflowCredentials(assistant: AssistantId, serviceArea: ServiceArea) {
  if (assistant === "tonito") {
    if (serviceArea === "maxixe") {
      return {
        apiKey: process.env.VOICEFLOW_TONITO_MAXIXE_API_KEY,
        projectId: process.env.VOICEFLOW_TONITO_MAXIXE_PROJECT_ID,
      };
    }
    if (serviceArea === "massinga") {
      return {
        apiKey: process.env.VOICEFLOW_TONITO_MASSINGA_API_KEY,
        projectId: process.env.VOICEFLOW_TONITO_MASSINGA_PROJECT_ID,
      };
    }
    return {
      apiKey: process.env.VOICEFLOW_TONITO_GERAL_API_KEY,
      projectId: process.env.VOICEFLOW_TONITO_GERAL_PROJECT_ID,
    };
  }

  // Manuela
  if (serviceArea === "maxixe") {
    return {
      apiKey: process.env.VOICEFLOW_MANUELA_MAXIXE_API_KEY,
      projectId: process.env.VOICEFLOW_MANUELA_MAXIXE_PROJECT_ID,
    };
  }
  if (serviceArea === "massinga") {
    return {
      apiKey: process.env.VOICEFLOW_MANUELA_MASSINGA_API_KEY,
      projectId: process.env.VOICEFLOW_MANUELA_MASSINGA_PROJECT_ID,
    };
  }
  return {
    apiKey: process.env.VOICEFLOW_MANUELA_GERAL_API_KEY,
    projectId: process.env.VOICEFLOW_MANUELA_GERAL_PROJECT_ID,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatApiRequestBody = await req.json();
    const { assistant, serviceArea, messageText, voiceflowSessionId } = body;

    if (!assistant || !serviceArea || !messageText || !voiceflowSessionId) {
      return NextResponse.json(
        { error: "Parâmetros inválidos." },
        { status: 400 }
      );
    }

    const { apiKey, projectId } = getVoiceflowCredentials(assistant, serviceArea);

    if (!apiKey) {
      console.warn(`Missing Voiceflow API key for ${assistant} in ${serviceArea}`);
      // Fallback friendly response when Voiceflow is offline or unconfigured
      return NextResponse.json({
        messages: [
          {
            type: "text",
            text: `Olá! Sou o/a ${assistant === "tonito" ? "Tonito" : "Manuela"}. Estou pronto/a para esclarecer as tuas dúvidas de saúde sexual e reprodutiva com total privacidade.`,
          },
        ],
      });
    }

    // Call Voiceflow General Runtime API
    const vfResponse = await fetch(
      `https://general-runtime.voiceflow.com/state/user/${encodeURIComponent(
        voiceflowSessionId
      )}/interact`,
      {
        method: "POST",
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: {
            type: "text",
            payload: messageText,
          },
        }),
      }
    );

    if (!vfResponse.ok) {
      console.error("Voiceflow API Error:", vfResponse.status, await vfResponse.text());
      return NextResponse.json(
        {
          messages: [
            {
              type: "text",
              text: "Desculpa, ocorreu uma falha temporária ao ligar ao serviço. Por favor tenta novamente.",
            },
          ],
        },
        { status: 200 }
      );
    }

    const traces = await vfResponse.json();
    const responseMessages: Array<{ type: string; text: string }> = [];

    if (Array.isArray(traces)) {
      for (const trace of traces) {
        if (trace.type === "text" || trace.type === "speak") {
          const text = trace.payload?.message || trace.payload?.body;
          if (text) {
            responseMessages.push({ type: "text", text });
          }
        }
      }
    }

    if (responseMessages.length === 0) {
      responseMessages.push({
        type: "text",
        text: "Obrigado pela tua mensagem. Em que mais te posso ajudar hoje?",
      });
    }

    return NextResponse.json({ messages: responseMessages });
  } catch (error) {
    console.error("Server error handling chat message:", error);
    return NextResponse.json(
      {
        messages: [
          {
            type: "text",
            text: "Ocorreu um erro inesperado ao processar a tua mensagem. Por favor tenta novamente.",
          },
        ],
      },
      { status: 200 }
    );
  }
}
