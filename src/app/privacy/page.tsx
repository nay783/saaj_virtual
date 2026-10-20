import React from "react";
import type { Metadata } from "next";
import { PrivacyPolicyContent } from "@/components/PrivacyPolicyContent";

export const metadata: Metadata = {
  title: "Política de Privacidade | SAAJ Virtual",
  description:
    "Política de Privacidade do SAAJ Virtual — Saiba como protegemos os seus dados pessoais, conversas e marcações de consultas de saúde sexual e reprodutiva em Moçambique.",
  alternates: {
    canonical: "https://saajvirtual.vercel.app/privacy",
  },
  openGraph: {
    title: "Política de Privacidade | SAAJ Virtual",
    description:
      "Informação clara e transparente sobre privacidade, segurança e proteção de dados no SAAJ Virtual.",
    url: "https://saajvirtual.vercel.app/privacy",
    siteName: "SAAJ Virtual",
    locale: "pt_MZ",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
