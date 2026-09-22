import { AssistantId, AssistantMetadata } from "@/types/saaj";

export const ASSISTANTS: Record<AssistantId, AssistantMetadata> = {
  tonito: {
    id: "tonito",
    name: "Tonito",
    role: "Guia SAAJ Virtual",
    tagline: "Respostas claras, diretas e privadas para as tuas dúvidas de saúde.",
    description:
      "O Tonito está disponível para te ajudar com informações sobre saúde sexual e reprodutiva, métodos contracetivos e agendamentos.",
    avatar: "/assets/assistants/tonito.png",
    theme: {
      primary: "#0066FF",
      bgSubtle: "#F2F8FF",
      accent: "#0052CC",
      textDark: "#1A365D",
      border: "#C9E3FF",
      bubbleUser: "#0066FF",
      bubbleBot: "#F2F8FF",
    },
  },
  manuela: {
    id: "manuela",
    name: "Manuela",
    role: "Guia SAAJ Virtual",
    tagline: "Um espaço seguro e acolhedor para conversares abertamente.",
    description:
      "A Manuela oferece apoio empático e confidencial para tirar dúvidas sobre o teu corpo, saúde reprodutiva e agendamento de consultas.",
    avatar: "/assets/assistants/manuela.png",
    theme: {
      primary: "#D93868",
      bgSubtle: "#FFF5F7",
      accent: "#B82350",
      textDark: "#4A1525",
      border: "#FCD5CE",
      bubbleUser: "#D93868",
      bubbleBot: "#FFF5F7",
    },
  },
};

export function getAssistant(id: AssistantId): AssistantMetadata {
  return ASSISTANTS[id] || ASSISTANTS.tonito;
}
