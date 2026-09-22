import { AssistantId, ServiceArea } from "@/types/saaj";

export interface ConvoCoreAgentConfig {
  agentId: string;
  region: string;
  renderMode: string;
}

export interface VGConfig {
  ID: string;
  region: string;
  render: string;
  userID?: string;
  stylesheets?: string[];
}

declare global {
  interface Window {
    VG_CONFIG?: VGConfig;
  }
}
