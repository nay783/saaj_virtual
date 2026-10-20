import React from "react";
import type { Metadata } from "next";
import { TermsConditionsContent } from "@/components/TermsConditionsContent";

export const metadata: Metadata = {
  title: "Termos e Condições de Utilização | SAAJ Virtual",
  description:
    "Termos e Condições de Utilização do SAAJ Virtual — Informação sobre o funcionamento da plataforma, assistentes virtuais Tonito e Manuela, chamadas de voz e marcações de consultas SAAJ em Moçambique.",
  alternates: {
    canonical: "https://saajvirtual.vercel.app/terms",
  },
  openGraph: {
    title: "Termos e Condições de Utilização | SAAJ Virtual",
    description:
      "Condições de utilização, carácter informativo e funcionamento do SAAJ Virtual em Moçambique.",
    url: "https://saajvirtual.vercel.app/terms",
    siteName: "SAAJ Virtual",
    locale: "pt_MZ",
    type: "website",
  },
};

export default function TermsAndConditionsPage() {
  return <TermsConditionsContent />;
}
