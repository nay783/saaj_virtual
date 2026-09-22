import { CapabilitySet, LocationState, ServiceArea } from "@/types/saaj";

export const PROVINCES_MOZAMBIQUE = [
  "Inhambane",
  "Cabo Delgado",
  "Gaza",
  "Manica",
  "Maputo Cidade",
  "Maputo Província",
  "Nampula",
  "Niassa",
  "Sofala",
  "Tete",
  "Zambézia",
];

export const INHAMBANE_DISTRICTS = [
  "Mabote",
  "Govuro",
  "Inhassoro",
  "Vilankulo",
  "Massinga",
  "Funhalouro",
  "Morrumbene",
  "Maxixe",
  "Inhambane",
  "Homoíne",
  "Panda",
  "Jangamo",
  "Inharrime",
  "Zavala",
];

export function resolveServiceArea(
  province: string,
  district?: string | null
): ServiceArea {
  if (province.trim().toLowerCase() === "inhambane") {
    const cleanDistrict = (district || "").trim().toLowerCase();
    if (cleanDistrict === "maxixe") {
      return "maxixe";
    }
    if (cleanDistrict === "massinga") {
      return "massinga";
    }
  }
  return "geral";
}

export function createLocationState(
  province: string,
  district?: string | null
): LocationState {
  const serviceArea = resolveServiceArea(province, district);
  return {
    province,
    district: district || null,
    serviceArea,
  };
}

export const SERVICE_CAPABILITIES: Record<ServiceArea, CapabilitySet> = {
  maxixe: {
    message: true,
    call: true,
    appointment: true,
  },
  massinga: {
    message: true,
    call: true,
    appointment: true,
  },
  geral: {
    message: true,
    call: false,
    appointment: false,
  },
};

export function getServiceCapabilities(
  serviceArea?: ServiceArea | string | null
): CapabilitySet {
  if (!serviceArea) {
    return SERVICE_CAPABILITIES.geral;
  }
  const cleanKey = String(serviceArea).trim().toLowerCase() as ServiceArea;
  return SERVICE_CAPABILITIES[cleanKey] || SERVICE_CAPABILITIES.geral;
}

