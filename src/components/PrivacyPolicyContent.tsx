"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  MessageSquare,
  PhoneCall,
  Calendar,
  Server,
  Database,
  UserCheck,
  Users,
  Mail,
  AlertTriangle,
  Smartphone,
  CheckCircle2,
  FileText,
  ArrowRight,
  Eye,
  ClipboardCheck,
  Building2,
  Workflow,
} from "lucide-react";

/**
 * Publication control flag.
 * Keep false until all 11 institutional, legal, clinical, and technical items
 * have been formally approved and verified in production.
 * NOTE: A front-end flag alone does not restrict public HTTP access if deployed.
 */
export const IS_PUBLICATION_APPROVED = false;

export type PolicyViewMode = "internal_review" | "public_release";

interface PolicySection {
  id: string;
  number: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const POLICY_SECTIONS: PolicySection[] = [
  { id: "operador", number: "01", title: "Responsabilidades Institucionais", icon: Building2 },
  { id: "dados-recolhidos", number: "02", title: "Dados Recolhidos e Finalidades", icon: Database },
  { id: "conversas-saude", number: "03", title: "Informação de Saúde e Conversas", icon: MessageSquare },
  { id: "chamadas-voz", number: "04", title: "Chamadas de Voz, Gravações e Transcrições", icon: PhoneCall },
  { id: "consultas-referencias", number: "05", title: "Marcação de Consultas e Encaminhamentos", icon: Calendar },
  { id: "prestadores-terceiros", number: "06", title: "Prestadores de Serviços e Dados no Airtable", icon: Server },
  { id: "retencao-seguranca", number: "07", title: "Conservação e Segurança de Dados", icon: Lock },
  { id: "direitos-utilizador", number: "08", title: "Direitos de Acesso, Correcção e Eliminação", icon: UserCheck },
  { id: "menores-consentimento", number: "09", title: "Adolescentes, Menores e Salvaguarda", icon: Users },
  { id: "contactos-vigencia", number: "10", title: "Contactos e Data de Entrada em Vigor", icon: Mail },
];

export type VerificationStatusLabel =
  | "Confirmado pelo administrador do projecto"
  | "Verificado tecnicamente no código"
  | "Pendente de auditoria técnica em produção"
  | "Pendente de aprovação institucional"
  | "Pendente de aprovação jurídica/clínica"
  | "Pendente de implementação";

export interface ConfirmationChecklistItem {
  id: string;
  itemNumber: string;
  section: string;
  title: string;
  interviewResult: string;
  actionRequired: string;
  responsibleParty: string;
  statuses: VerificationStatusLabel[];
  blocksPublication: boolean;
}

export const OUTSTANDING_CONFIRMATIONS: ConfirmationChecklistItem[] = [
  {
    id: "chk-01-controller",
    itemNumber: "01",
    section: "Secção 01",
    title: "Designação jurídica formal do Responsável pelo Tratamento de Dados",
    interviewResult:
      "O administrador do projecto indicou a proposta de responsabilidade institucional conjunta entre o MISAU e a Pathfinder International no âmbito do projecto Futuros com Escolha, com apoio financeiro da Irish Aid e desenvolvimento técnico pela NCAI Consultorias e Serviços, EI.",
    actionRequired:
      "Validar e formalizar nos acordos institucionais aplicáveis a qualificação jurídica exacta de Responsável(eis) pelo Tratamento de Dados (Data Controller) e de Subcontratante(s) (Data Processor).",
    responsibleParty: "MISAU & Pathfinder International (Equipas Jurídicas / Direcção)",
    statuses: [
      "Confirmado pelo administrador do projecto",
      "Pendente de aprovação institucional",
      "Pendente de aprovação jurídica/clínica",
    ],
    blocksPublication: true,
  },
  {
    id: "chk-02-vapi-recordings",
    itemNumber: "02",
    section: "Secção 04",
    title: "Gravações de áudio das chamadas na Vapi e aviso prévio na interface",
    interviewResult:
      "Confirmado pelo administrador do projecto que a Vapi grava e armazena gravações de áudio das chamadas de voz nos quatro assistentes de produção (Tonito Maxixe, Tonito Massinga, Manuela Maxixe e Manuela Massinga). A inspecção técnica ao código (VoiceCallModal.tsx) confirma que a chamada inicia imediatamente sem um aviso prévio explícito de gravação no ecrã de chamada.",
    actionRequired:
      "Auditar as definições exactas de gravação e prazos de retenção em cada um dos 4 assistentes na consola Vapi e decidir/implementar um aviso claro de gravação antes do início da chamada de voz.",
    responsibleParty: "NCAI Consultorias e Serviços, EI & Coordenação MISAU/Pathfinder",
    statuses: [
      "Confirmado pelo administrador do projecto",
      "Verificado tecnicamente no código",
      "Pendente de auditoria técnica em produção",
      "Pendente de aprovação jurídica/clínica",
      "Pendente de implementação",
    ],
    blocksPublication: true,
  },
  {
    id: "chk-03-transcripts",
    itemNumber: "03",
    section: "Secção 04",
    title: "Retenção de transcrições integrais na Vapi vs. resumos e dados extraídos no Airtable",
    interviewResult:
      "Confirmado pelo administrador que a Vapi conserva transcrições integrais das chamadas de voz, enquanto o Airtable não recebe transcrições completas através do fluxo descrito, recebendo apenas informações estruturadas extraídas e resumos da conversa via n8n.",
    actionRequired:
      "Confirmar mediante auditoria técnica aos fluxos de produção do n8n e às tabelas do Airtable que nenhum campo transfere transcrições integrais para o Airtable.",
    responsibleParty: "NCAI Consultorias e Serviços, EI",
    statuses: [
      "Confirmado pelo administrador do projecto",
      "Pendente de auditoria técnica em produção",
    ],
    blocksPublication: true,
  },
  {
    id: "chk-04-airtable-fields",
    itemNumber: "04",
    section: "Secções 04 e 06",
    title: "Auditoria de produção aos 10 campos armazenados no Airtable (Recolha de dados SAAJ)",
    interviewResult:
      "O administrador reportou 10 categorias de dados armazenadas operacionalmente no Airtable: (1) Nome, (2) Idade, (3) Género, (4) Bairro, (5) Motivo da consulta ou interacção, (6) Distrito (Maxixe/Massinga), (7) Resumo da conversa, (8) Número de telefone, (9) Data e hora da interacção e (10) Estado da marcação ou encaminhamento.",
    actionRequired:
      "Verificar o esquema real em produção na base Airtable 'Recolha de dados SAAJ', nos outputs estruturados Vapi (saaj_interacao, saaj_marcacao) e nos mapeamentos do n8n.",
    responsibleParty: "NCAI Consultorias e Serviços, EI",
    statuses: [
      "Confirmado pelo administrador do projecto",
      "Pendente de auditoria técnica em produção",
    ],
    blocksPublication: true,
  },
  {
    id: "chk-05-retention",
    itemNumber: "05",
    section: "Secção 07",
    title: "Definição e verificação dos prazos de conservação nos 5 sistemas",
    interviewResult:
      "O administrador confirmou que os prazos de retenção configurados para (1) Voiceflow/ConvoCore, (2) Vapi, (3) Cal.com, (4) Airtable e (5) logs de execução do n8n não são actualmente conhecidos nem foram auditados em produção.",
    actionRequired:
      "Auditar as configurações de retenção nos 5 sistemas e aprovar institucionalmente os critérios e prazos de conservação e eliminação.",
    responsibleParty: "NCAI Consultorias e Serviços, EI & Coordenação MISAU/Pathfinder",
    statuses: [
      "Confirmado pelo administrador do projecto",
      "Pendente de auditoria técnica em produção",
      "Pendente de aprovação institucional",
    ],
    blocksPublication: true,
  },
  {
    id: "chk-06-dsr-procedure",
    itemNumber: "06",
    section: "Secção 08",
    title: "Formalização do procedimento operacional para pedidos de titulares de dados",
    interviewResult:
      "Confirmado que os pedidos são actualmente tratados de forma manual com apoio operacional da NCAI, sem procedimento formal documentado nem prazo oficial de resposta estabelecido.",
    actionRequired:
      "Desenvolver e aprovar o procedimento formal de 6 etapas (recepção, verificação de identidade, localização nos sistemas, avaliação legal, execução de correcção/eliminação e registo/resposta ao utilizador).",
    responsibleParty: "MISAU, Pathfinder International & NCAI Consultorias e Serviços, EI",
    statuses: [
      "Confirmado pelo administrador do projecto",
      "Pendente de aprovação institucional",
      "Pendente de implementação",
    ],
    blocksPublication: true,
  },
  {
    id: "chk-07-minors-consent",
    itemNumber: "07",
    section: "Secção 09",
    title: "Quadro de consentimento e salvaguarda para adolescentes dos 10 aos 17 anos",
    interviewResult:
      "Achado crítico: Não existe actualmente mecanismo específico de consentimento implementado na aplicação para utilizadores dos 10 aos 17 anos, nem aprovação formal jurídica e clínica do protocolo de consentimento e salvaguarda.",
    actionRequired:
      "Obter deliberação e aprovação formal das equipas jurídicas e clínicas (MISAU e Pathfinder) sobre os 7 pontos obrigatórios de consentimento de menores, dados sensíveis de SSR, aviso de gravação de voz e protocolos de salvaguarda.",
    responsibleParty: "Equipas Jurídicas e Clínicas (MISAU & Pathfinder International)",
    statuses: [
      "Confirmado pelo administrador do projecto",
      "Verificado tecnicamente no código",
      "Pendente de aprovação jurídica/clínica",
      "Pendente de implementação",
    ],
    blocksPublication: true,
  },
  {
    id: "chk-08-privacy-email",
    itemNumber: "08",
    section: "Secção 10",
    title: "Endereço de e-mail institucional oficial para privacidade",
    interviewResult:
      "Preferência por utilizar um e-mail institucional pertencente à Pathfinder International ou ao MISAU, sujeito a aprovação institucional. Nenhum endereço oficial foi ainda fornecido.",
    actionRequired:
      "Designar, aprovar e activar o endereço de e-mail institucional oficial para recepção de pedidos de privacidade.",
    responsibleParty: "Pathfinder International & MISAU",
    statuses: [
      "Confirmado pelo administrador do projecto",
      "Pendente de aprovação institucional",
      "Pendente de implementação",
    ],
    blocksPublication: true,
  },
  {
    id: "chk-09-support-phone",
    itemNumber: "09",
    section: "Secção 10",
    title: "Número dedicado de telefone ou WhatsApp para apoio de privacidade",
    interviewResult:
      "Será criado um número de telefone ou WhatsApp dedicado para questões de privacidade; actualmente ainda não existe número activo para inclusão na Política.",
    actionRequired:
      "Criar, configurar e aprovar a linha telefónica/WhatsApp dedicada antes da publicação final.",
    responsibleParty: "Pathfinder International, MISAU & NCAI",
    statuses: [
      "Confirmado pelo administrador do projecto",
      "Pendente de implementação",
    ],
    blocksPublication: true,
  },
  {
    id: "chk-10-addresses",
    itemNumber: "10",
    section: "Secção 10",
    title: "Endereços físicos oficiais do MISAU e da Pathfinder International em Moçambique",
    interviewResult:
      "A Política deverá incluir os endereços físicos oficiais da Pathfinder International em Moçambique e do Ministério da Saúde (MISAU). Os endereços exactos ainda não foram fornecidos nem aprovados para correspondência de privacidade.",
    actionRequired:
      "Fornecer e aprovar institucionalmente os endereços postais/físicos oficiais do MISAU e da Pathfinder International em Moçambique.",
    responsibleParty: "MISAU & Pathfinder International",
    statuses: [
      "Confirmado pelo administrador do projecto",
      "Pendente de aprovação institucional",
    ],
    blocksPublication: true,
  },
  {
    id: "chk-11-request-oversight",
    itemNumber: "11",
    section: "Secções 08 e 10",
    title: "Aprovação formal da governação de pedidos de privacidade (MISAU + Pathfinder + NCAI)",
    interviewResult:
      "Acordado informalmente que o MISAU e a Pathfinder International asseguram a supervisão institucional conjunta dos pedidos de privacidade, enquanto a NCAI presta apoio técnico para localizar, corrigir ou eliminar dados mediante instrução e autorização.",
    actionRequired:
      "Formalizar institucionalmente esta repartição de responsabilidades e o fluxo de autorização entre o MISAU, a Pathfinder International e a NCAI.",
    responsibleParty: "MISAU, Pathfinder International & NCAI Consultorias e Serviços, EI",
    statuses: [
      "Confirmado pelo administrador do projecto",
      "Pendente de aprovação institucional",
    ],
    blocksPublication: true,
  },
];

const REPORTED_AIRTABLE_FIELDS = [
  { number: "01", field: "Nome", context: "Identificação fornecida na interacção ou marcação de consulta" },
  { number: "02", field: "Idade", context: "Idade declarada (público-alvo dos 10 aos 24 anos)" },
  { number: "03", field: "Género", context: "Género declarado durante o atendimento ou agendamento" },
  { number: "04", field: "Bairro", context: "Bairro ou zona de residência para orientação e planeamento local" },
  { number: "05", field: "Motivo da consulta ou interacção", context: "Tema ou necessidade de atendimento apresentada pelo utilizador" },
  { number: "06", field: "Distrito (Maxixe/Massinga)", context: "Distrito ou área de serviço SAAJ associada ao atendimento" },
  { number: "07", field: "Resumo da conversa", context: "Síntese operacional gerada a partir da interacção (não a transcrição integral)" },
  { number: "08", field: "Número de telefone", context: "Contacto telefónico associado à chamada, marcação ou lembrete" },
  { number: "09", field: "Data e hora da interacção", context: "Registo temporal da interacção ou do pedido de marcação" },
  { number: "10", field: "Estado da marcação ou encaminhamento", context: "Indicação sobre encaminhamento ou estado da consulta agendada" },
];

function ReviewBadge({
  show,
  label = "Requer confirmação antes da publicação",
}: {
  show: boolean;
  label?: string;
}) {
  if (!show) return null;
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200/90 align-middle">
      <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
      <span>{label}</span>
    </span>
  );
}

export const PrivacyPolicyContent: React.FC = () => {
  const hasPendingConfirmations =
    !IS_PUBLICATION_APPROVED ||
    OUTSTANDING_CONFIRMATIONS.some((item) => item.blocksPublication);

  const [viewMode, setViewMode] = useState<PolicyViewMode>(
    hasPendingConfirmations ? "internal_review" : "public_release"
  );

  const isReviewMode = viewMode === "internal_review";

  return (
    <div className="min-h-screen-dvh flex flex-col bg-ambient-neutral text-slate-900 safe-top safe-bottom">
      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-30 glass-panel border-b border-slate-900/[0.06] shadow-2xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 text-xs font-semibold border border-slate-900/[0.06] shadow-2xs transition-all active-press"
              aria-label="Voltar ao SAAJ Virtual"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar à Aplicação</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="relative w-7 h-7 rounded-xl overflow-hidden border border-slate-900/[0.08] bg-white shrink-0">
                <Image
                  src="/logo/LOGO_APP.jpg"
                  alt="SAAJ Virtual Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-semibold text-slate-900 tracking-tight text-sm">
                SAAJ Virtual
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasPendingConfirmations && (
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-semibold">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Versão Preliminar para Revisão Institucional</span>
              </span>
            )}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Privacidade & Protecção de Dados</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Publication Gate & Mode Control Bar */}
        {hasPendingConfirmations && (
          <section
            aria-label="Controlo de modo de revisão e estado de publicação"
            className="rounded-3xl p-5 sm:p-6 bg-amber-50/95 border border-amber-200/90 shadow-soft space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200/70">
              <div className="flex items-start sm:items-center gap-2.5">
                <div className="p-2 rounded-2xl bg-amber-100 text-amber-800 shrink-0">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm sm:text-base font-semibold text-amber-950">
                      Documento em Revisão Pré-Publicação (IS_PUBLICATION_APPROVED = false)
                    </h2>
                  </div>
                  <p className="text-xs text-amber-900/90">
                    Foram integradas as respostas da entrevista institucional e técnica (11 pontos).
                    A aprovação jurídica, clínica, institucional e a auditoria técnica de produção
                    permanecem obrigatórias antes da publicação definitiva.
                  </p>
                </div>
              </div>

              {/* Mode Switcher */}
              <div className="inline-flex rounded-2xl bg-white/90 p-1 border border-amber-200/90 shadow-2xs self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode("internal_review")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isReviewMode
                      ? "bg-amber-600 text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <ClipboardCheck className="w-3.5 h-3.5" />
                  <span>Modo de Revisão Interna</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("public_release")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    !isReviewMode
                      ? "bg-slate-900 text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Pré-visualização de Leitura</span>
                </button>
              </div>
            </div>

            {isReviewMode ? (
              <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                Estás no <strong>Modo de Revisão Interna</strong>. As etiquetas{" "}
                <ReviewBadge show={true} /> e as notas técnicas/jurídicas destacam os pontos que
                aguardam validação formal pelas equipas do <strong>MISAU</strong>, da{" "}
                <strong>Pathfinder International</strong> e da <strong>NCAI</strong>. Consulta a{" "}
                <a
                  href="#checklist-revisao"
                  className="font-semibold underline hover:text-amber-950"
                >
                  Matriz de Verificação Pré-Publicação (11 Pontos)
                </a>{" "}
                no final da página.
              </p>
            ) : (
              <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                Estás na <strong>Pré-visualização de Leitura</strong> (sem etiquetas internas de
                revisão). <strong>Importante:</strong> Esta página continua em estado de minuta não
                aprovada (<code>IS_PUBLICATION_APPROVED = false</code>) e não oculta factos
                materiais nem declara aprovações institucionais ou legais ainda pendentes.
              </p>
            )}
          </section>
        )}

        {/* Hero Card */}
        <section className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-tonito-700 border border-blue-100 text-xs font-semibold">
              <FileText className="w-3.5 h-3.5" />
              <span>Política de Privacidade • SAAJ Virtual (Moçambique)</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
              <span>
                Data de entrada em vigor:{" "}
                <strong className="text-slate-800">20 de Outubro de 2026</strong>
              </span>
              {hasPendingConfirmations && (
                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[11px] font-semibold">
                  Minuta sujeita a aprovação formal
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
              Política de Privacidade do SAAJ Virtual
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              O <strong>SAAJ Virtual</strong> (Serviço Amigo dos Adolescentes e Jovens — Virtual) é uma
              plataforma digital concebida para disponibilizar informação sobre saúde sexual e
              reprodutiva e facilitar encaminhamentos e marcações de consultas presenciais para
              adolescentes e jovens dos <strong>10 aos 24 anos</strong> em Moçambique.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              Esta Política de Privacidade explica de forma clara e honesta quem participa na
              iniciativa, que informações são recolhidas quando utilizas a plataforma, o que acontece
              durante as conversas por texto e chamadas de voz (incluindo gravações e transcrições),
              que dados são registados para funcionamento e monitoria do serviço e como podes
              apresentar pedidos relativos aos teus dados.
            </p>
          </div>

          {/* Core Privacy Summary Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-900/[0.05] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Acesso sem criação de conta</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Não precisas de criar conta nem palavra-passe para abrir a aplicação. Todavia, quando
                interages por texto, fazes chamadas de voz ou marcas consulta, determinados dados são
                processados e armazenados pelos sistemas do serviço.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-900/[0.05] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                <Smartphone className="w-4 h-4 text-tonito-600 shrink-0" />
                <span>Sem localização GPS automática</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                A aplicação não recolhe coordenadas GPS do teu telemóvel. Tu escolhes manualmente a
                tua província e distrito (por exemplo, Maxixe ou Massinga) e podes indicar o teu
                bairro durante o atendimento.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-900/[0.05] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                <Workflow className="w-4 h-4 text-manuela-600 shrink-0" />
                <span>Chamadas de voz e registos</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                As chamadas de voz são processadas através da Vapi (que conserva gravações áudio e
                transcrições integrais), e dados extraídos e resumos são enviados via n8n para o
                Airtable para funcionamento e monitoria.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Navigation Index */}
        <nav
          aria-label="Índice da Política de Privacidade"
          className="glass-card rounded-3xl p-5 sm:p-6 border border-slate-900/[0.06] shadow-soft space-y-3"
        >
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
            Índice do Documento
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {POLICY_SECTIONS.map((sec) => {
              const Icon = sec.icon;
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-100/80 transition-colors text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 active-press"
                >
                  <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-600 font-semibold text-xs flex items-center justify-center shrink-0">
                    {sec.number}
                  </span>
                  <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{sec.title}</span>
                </a>
              );
            })}
          </div>
        </nav>

        {/* Policy Sections */}
        <div className="space-y-6">
          {/* SECTION 1: INSTITUTIONAL RESPONSIBILITIES */}
          <section
            id="operador"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-blue-50 text-tonito-600 border border-blue-100">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-tonito-600">
                    Secção 01
                  </span>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                    Enquadramento Institucional e Responsabilidades
                  </h2>
                </div>
              </div>
              <ReviewBadge show={isReviewMode} />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/50 border border-blue-100/90 text-slate-800 font-medium leading-relaxed">
                O SAAJ Virtual é uma iniciativa implementada no âmbito do projecto{" "}
                <strong>Futuros com Escolha</strong>, em colaboração com o{" "}
                <strong>Ministério da Saúde da República de Moçambique</strong> e a{" "}
                <strong>Pathfinder International</strong>, com o apoio financeiro da{" "}
                <strong>Cooperação Irlandesa (Irish Aid)</strong>. O desenvolvimento tecnológico da
                plataforma foi realizado pela <strong>NCAI Consultorias e Serviços, EI</strong>.
              </div>

              <p>
                As entidades envolvidas no projecto <em>Futuros com Escolha</em> participam segundo as
                seguintes atribuições institucionais e técnicas:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <h3 className="text-xs font-semibold text-slate-900">
                    Ministério da Saúde (MISAU)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Parceiro institucional governamental e de saúde pública, responsável pelo
                    enquadramento sectorial dos Serviços Amigos dos Adolescentes e Jovens (SAAJ). No
                    arranjo operacional proposto para o projecto, participa na governação conjunta dos
                    dados associados ao serviço, sujeita à formalização nos acordos aplicáveis.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <h3 className="text-xs font-semibold text-slate-900">
                    Pathfinder International
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Parceiro de implementação do projecto <em>Futuros com Escolha</em>, responsável
                    pela coordenação operacional e programática da iniciativa em colaboração com o
                    MISAU, participando igualmente no modelo proposto de governação de dados do
                    projecto.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <h3 className="text-xs font-semibold text-slate-900">
                    Cooperação Irlandesa (Irish Aid / Governo da Irlanda)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Parceiro de financiamento e cooperação internacional que apoia financeiramente o
                    projecto <em>Futuros com Escolha</em>. A concessão de financiamento não confere,
                    por si só, a qualidade de responsável pelo tratamento de dados pessoais dos
                    utilizadores.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <h3 className="text-xs font-semibold text-slate-900">
                    NCAI Consultorias e Serviços, EI
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Entidade responsável pelo desenvolvimento tecnológico, implementação técnica e
                    suporte operacional da plataforma SAAJ Virtual. A NCAI actua como prestadora de
                    serviços tecnológicos e <strong>não é a proprietária institucional</strong> do
                    projecto.
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600">
                <strong>Nota sobre a qualificação jurídica formal:</strong> Embora o modelo operacional
                do projecto preveja a responsabilidade institucional conjunta do{" "}
                <strong>Ministério da Saúde (MISAU)</strong> e da{" "}
                <strong>Pathfinder International</strong> na governação dos dados pessoais — com a{" "}
                <strong>NCAI Consultorias e Serviços, EI</strong> a assegurar a operação técnica —, a
                designação jurídica formal de Responsável(eis) pelo Tratamento de Dados (
                <em>Data Controller</em>) e de Subcontratante(s) (<em>Data Processor</em>) encontra-se
                sujeita a validação jurídica e aprovação formal nos termos dos acordos institucionais
                aplicáveis antes da publicação definitiva desta Política.
              </p>

              {isReviewMode && (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-1.5 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold text-amber-950">
                      Item 01 da Entrevista — Qualificação Jurídica de MISAU, Pathfinder e NCAI:
                    </span>
                    <ReviewBadge show={true} />
                  </div>
                  <p className="text-amber-900/90">
                    <strong>Estado:</strong> Proposta de co-responsabilidade MISAU + Pathfinder
                    confirmada pelo administrador do projecto, mas{" "}
                    <strong>pendente de validação jurídica e aprovação institucional</strong> face aos
                    acordos formais do projecto <em>Futuros com Escolha</em>.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 2: WHAT PERSONAL INFORMATION IS COLLECTED AND WHY */}
          <section
            id="dados-recolhidos"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-50 text-tonito-600 border border-blue-100">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-tonito-600">
                  Secção 02
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Que Informações Recolhemos e Porquê
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                O SAAJ Virtual recolhe e processa diferentes categorias de informação consoante a
                forma como utilizas a plataforma:
              </p>

              <div className="space-y-2.5">
                <h3 className="text-sm font-semibold text-slate-900">
                  2.1. Dados guardados localmente no teu dispositivo ou navegador
                </h3>
                <p>
                  Para recordar a tua área de serviço sem exigir registo de conta, a aplicação guarda
                  localmente no navegador ou telemóvel (<code>localStorage</code>, chave{" "}
                  <code>saaj_virtual_user_state_v1</code>):
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    <strong>Identificador pseudónimo do dispositivo (<code>anonymousUserId</code>):</strong>{" "}
                    código aleatório gerado automaticamente (UUID) para manter a continuidade das
                    sessões no mesmo dispositivo;
                  </li>
                  <li>
                    <strong>Localização seleccionada manualmente:</strong> província escolhida e, na
                    Província de Inhambane, o distrito seleccionado (por exemplo,{" "}
                    <strong>Maxixe</strong> ou <strong>Massinga</strong>), determinando a área de
                    serviço (<code>maxixe</code>, <code>massinga</code> ou <code>geral</code>).{" "}
                    <strong>A aplicação não recolhe coordenadas GPS;</strong>
                  </li>
                  <li>
                    <strong>Preferências de navegação:</strong> indicação de conclusão do passo
                    inicial (<code>onboardingCompleted</code>) e último assistente escolhido (
                    <code>tonito</code> ou <code>manuela</code>).
                  </li>
                </ul>
              </div>

              <div className="space-y-2.5">
                <h3 className="text-sm font-semibold text-slate-900">
                  2.2. Dados recolhidos durante interacções por voz, conversas por texto e marcações
                </h3>
                <p>
                  Quando conversas com os assistentes virtuais <strong>Tonito</strong> ou{" "}
                  <strong>Manuela</strong> (por texto ou por chamada de voz) ou quando solicitas uma
                  marcação de consulta ou encaminhamento, podem ser recolhidos e processados:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    <strong>Dados pessoais e demográficos fornecidos na interacção:</strong> nome,
                    idade (e grupo etário derivado: <code>10–14</code>, <code>15–19</code> ou{" "}
                    <code>20–24</code>), género, número de telefone, província, distrito (Maxixe ou
                    Massinga) e bairro;
                  </li>
                  <li>
                    <strong>Dados relativos ao atendimento e saúde sexual e reprodutiva:</strong>{" "}
                    perguntas colocadas em texto, voz gravada e transcrição da chamada, motivo da
                    consulta ou interacção, tema principal e subtema de saúde, resumo da conversa,
                    classificação de risco, estado da marcação ou encaminhamento e avaliação de
                    satisfação;
                  </li>
                  <li>
                    <strong>Dados técnicos e de sessão:</strong> endereço IP, tipo de navegador e
                    dispositivo, identificadores de sessão (como o <code>Vapi Call ID</code> ou{" "}
                    <code>Session ID</code>) e data e hora da interacção.
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  2.3. Porque recolhemos estas informações (Finalidades)
                </h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    Disponibilizar orientação informativa sobre saúde sexual e reprodutiva adaptada à
                    tua faixa etária e localização;
                  </li>
                  <li>
                    Registar e gerir marcações de consultas presenciais e encaminhamentos para as
                    unidades SAAJ de Maxixe e Massinga (incluindo envio de confirmações e lembretes);
                  </li>
                  <li>
                    Apoiar o funcionamento operacional, o acompanhamento dos serviços e a monitoria
                    estatística e programática do projecto <em>Futuros com Escolha</em>.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 3: HEALTH-RELATED INFORMATION AND CONVERSATIONS */}
          <section
            id="conversas-saude"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-rose-50 text-manuela-600 border border-rose-100">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-manuela-600">
                  Secção 03
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Informação Relacionada com a Saúde e Conversas por Texto
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                As conversas no SAAJ Virtual abordam temas sensíveis de saúde sexual e reprodutiva,
                incluindo contracepção, saúde menstrual, gravidez, infecções de transmissão sexual
                (ITS), relacionamentos, bem-estar e prevenção de violência.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Carácter informativo dos assistentes virtuais:</strong> O{" "}
                  <strong>Tonito</strong> e a <strong>Manuela</strong> são assistentes virtuais
                  automatizados. As respostas fornecidas têm carácter informativo, educativo e de
                  apoio ao encaminhamento, <strong>não substituindo uma consulta médica ou de enfermagem</strong>{" "}
                  nem constituindo diagnóstico clínico.
                </li>
                <li>
                  <strong>Processamento de conversas por texto (ConvoCore e Voiceflow):</strong> O
                  chat de texto funciona através do widget <strong>ConvoCore</strong> ligado aos
                  projectos conversacionais <strong>Voiceflow</strong> (<code>Tonito Maxixe</code>,{" "}
                  <code>Tonito Massinga</code>, <code>Tonito Geral</code>,{" "}
                  <code>Manuela Maxixe</code>, <code>Manuela Massinga</code> e{" "}
                  <code>Manuela Geral</code>). As mensagens escritas e variáveis de sessão são
                  processadas nestas plataformas para gerar as respostas e orientar o encaminhamento.
                </li>
                <li>
                  <strong>Ausência de fins publicitários:</strong> As informações de saúde partilhadas
                  nas conversas não são vendidas a terceiros nem utilizadas para fins de marketing ou
                  publicidade comercial.
                </li>
                <li>
                  <strong>Atenção em telemóveis partilhados:</strong> Caso utilizes um dispositivo
                  partilhado com outras pessoas, podes remover o histórico local do navegador usando os
                  botões <strong>&ldquo;Limpar conversas&rdquo;</strong> ou{" "}
                  <strong>&ldquo;Limpar dados deste dispositivo&rdquo;</strong> no separador{" "}
                  <strong>Mais</strong>.
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 4: VOICE CALLS, AUDIO RECORDINGS, TRANSCRIPTS, AND DATA FLOW */}
          <section
            id="chamadas-voz"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-blue-50 text-tonito-600 border border-blue-100">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-tonito-600">
                    Secção 04
                  </span>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                    Chamadas de Voz, Gravações de Áudio, Transcrições e Fluxo de Dados
                  </h2>
                </div>
              </div>
              <ReviewBadge show={isReviewMode} />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {/* Confirmed Wording Block on Voice Recordings & Transcripts */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 text-slate-800">
                <p>
                  Quando utilizas a funcionalidade de chamadas de voz do SAAJ Virtual, a tua conversa
                  pode ser gravada e armazenada através da plataforma <strong>Vapi</strong>. Estas
                  gravações são utilizadas no contexto do funcionamento e acompanhamento do serviço,
                  de acordo com os procedimentos operacionais aplicáveis.
                </p>
                <p>
                  As chamadas de voz podem gerar <strong>gravações áudio</strong> e{" "}
                  <strong>transcrições integrais</strong>, conservadas na plataforma{" "}
                  <strong>Vapi</strong>. Determinadas informações extraídas dessas interacções,
                  incluindo dados estruturados e resumos, são posteriormente processadas através de
                  fluxos automatizados e armazenadas no <strong>Airtable</strong> para fins de
                  funcionamento, acompanhamento e monitoria do serviço.
                </p>
                <p className="text-xs text-slate-600">
                  <strong>Confirmação operacional:</strong> De acordo com a configuração operacional
                  actual confirmada pela administração do projecto, a plataforma <strong>Vapi</strong>{" "}
                  grava e armazena o áudio das chamadas de voz e conserva as respectivas transcrições
                  integrais, pelo que as interacções por voz <strong>não são anónimas nem efémeras</strong>.
                </p>
              </div>

              <div className="space-y-2.5">
                <h3 className="text-sm font-semibold text-slate-900">
                  4.1. Assistentes de Voz em Produção
                </h3>
                <p>
                  A funcionalidade de chamada de voz está disponível nas áreas de serviço de{" "}
                  <strong>Maxixe</strong> e <strong>Massinga</strong> através de quatro assistentes de
                  produção:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <div className="px-3 py-2 rounded-xl bg-blue-50/70 border border-blue-100 text-xs font-semibold text-tonito-700 text-center">
                    Tonito Maxixe
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-blue-50/70 border border-blue-100 text-xs font-semibold text-tonito-700 text-center">
                    Tonito Massinga
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-rose-50/70 border border-rose-100 text-xs font-semibold text-manuela-700 text-center">
                    Manuela Maxixe
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-rose-50/70 border border-rose-100 text-xs font-semibold text-manuela-700 text-center">
                    Manuela Massinga
                  </div>
                </div>
                <p className="pt-1">
                  O microfone do teu dispositivo é activado quando tocas em{" "}
                  <strong>&ldquo;Ligar&rdquo;</strong> e autorizas o acesso ao microfone no navegador
                  ou telemóvel. Podes silenciar o microfone ou desligar a chamada a qualquer momento.
                </p>
              </div>

              {/* Distinction of what each system retains: Vapi vs n8n vs Airtable */}
              <div className="space-y-3 pt-1">
                <h3 className="text-sm font-semibold text-slate-900">
                  4.2. Distinção Clara entre Vapi, n8n e Airtable (Fluxo Vapi → n8n → Airtable)
                </h3>
                <p>
                  Para compreenderes com precisão onde ficam guardados os diferentes elementos de uma
                  chamada de voz, o processamento divide-se em três sistemas distintos:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-1">
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      <span>Passo 1</span>
                      <ArrowRight className="w-3.5 h-3.5 hidden sm:inline text-slate-300" />
                    </div>
                    <p className="text-xs font-semibold text-slate-900">Chamada de Voz</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Falas com o Tonito ou a Manuela (Maxixe ou Massinga) através da aplicação.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-tonito-600">
                      <span>Passo 2 • Vapi</span>
                      <ArrowRight className="w-3.5 h-3.5 hidden sm:inline text-slate-300" />
                    </div>
                    <p className="text-xs font-semibold text-slate-900">Gravação e Transcrição</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      A <strong>Vapi</strong> processa a chamada e conserva a{" "}
                      <strong>gravação de áudio</strong>, a <strong>transcrição integral</strong> e
                      dados técnicos da sessão (<code>Vapi Call ID</code>).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-purple-600">
                      <span>Passo 3 • n8n</span>
                      <ArrowRight className="w-3.5 h-3.5 hidden sm:inline text-slate-300" />
                    </div>
                    <p className="text-xs font-semibold text-slate-900">Extracção e Automação</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      O <strong>n8n</strong> processa e transfere apenas informações seleccionadas
                      extraídas da chamada (via <code>saaj_interacao</code> e{" "}
                      <code>saaj_marcacao</code>).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                      <span>Passo 4 • Airtable</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-900">Dados Extraídos e Resumo</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      O <strong>Airtable</strong> armazena os dados extraídos e o{" "}
                      <strong>resumo da conversa</strong>, <strong>não recebendo a transcrição integral</strong>{" "}
                      através deste fluxo.
                    </p>
                  </div>
                </div>
              </div>

              {/* 10 Operational Fields Stored in Airtable */}
              <div className="space-y-2.5 pt-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  4.3. Campos Operacionais Extraídos e Armazenados no Airtable
                </h3>
                <p>
                  De acordo com a informação operacional reportada pela administração do projecto, o
                  fluxo automatizado para a base <strong>Recolha de dados SAAJ</strong> no{" "}
                  <strong>Airtable</strong> regista até <strong>10 categorias de dados</strong>{" "}
                  resultantes das interacções e marcações:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {REPORTED_AIRTABLE_FIELDS.map((item) => (
                    <div
                      key={item.number}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5"
                    >
                      <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[11px] font-bold shrink-0">
                        {item.number}
                      </span>
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-slate-900">{item.field}</p>
                        <p className="text-[11px] text-slate-600 leading-relaxed">{item.context}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-500 pt-1">
                  Estes campos destinam-se ao funcionamento operacional do serviço, gestão de
                  marcações/encaminhamentos e monitoria programática. A verificação técnica exacta dos
                  esquemas de produção (incluindo variáveis analíticas complementares documentadas na
                  arquitectura, como identificadores de sessão, grupo etário, tema/subtema, risco e
                  satisfação) encontra-se identificada para auditoria de produção antes da publicação
                  final.
                </p>
              </div>

              {isReviewMode && (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-2 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold text-amber-950">
                      Itens 02, 03 e 04 da Entrevista — Verificação Técnica de Produção (Vapi, n8n, Airtable):
                    </span>
                    <ReviewBadge show={true} />
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-amber-900/90">
                    <li>
                      <strong>Gravações e transcrições na Vapi (Confirmado pelo administrador):</strong>{" "}
                      A Vapi grava áudio e conserva transcrições integrais. As definições exactas de
                      gravação e os prazos de retenção em cada um dos 4 assistentes requerem auditoria
                      na consola de produção da Vapi.
                    </li>
                    <li>
                      <strong>Ausência actual de aviso pré-chamada no código:</strong> A inspecção ao
                      componente <code>src/components/VoiceCallModal.tsx</code> confirma que a chamada
                      inicia imediatamente quando o modal abre, sem exibir um aviso explícito prévio de
                      que a chamada é gravada. Não declaramos que esse aviso já existe na interface e
                      recomendamos a sua implementação/validação jurídica.
                    </li>
                    <li>
                      <strong>Campos no Airtable (Reportados operacionalmente):</strong> Os 10 campos
                      listados acima foram reportados pela administração do projecto e aguardam
                      auditoria directa ao esquema de produção da base{" "}
                      <code>Recolha de dados SAAJ</code> e aos fluxos n8n.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 5: APPOINTMENT INFORMATION AND REFERRALS */}
          <section
            id="consultas-referencias"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                  Secção 05
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Marcação de Consultas e Encaminhamentos (Referências)
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Quando uma interacção identifica a necessidade de atendimento presencial, ou quando
                solicitas directamente o agendamento nos distritos suportados (<strong>Maxixe</strong>{" "}
                e <strong>Massinga</strong>), o SAAJ Virtual facilita a marcação para a unidade
                sanitária SAAJ correspondente.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Infraestrutura de agendamento (Cal.com) e fluxos integrados:</strong> As
                  marcações presenciais utilizam o sistema <strong>Cal.com</strong> configurado para
                  Maxixe e Massinga e/ou os fluxos automatizados pós-interacção (através da função{" "}
                  <code>saaj_marcacao</code> e integração via <strong>n8n</strong> para o{" "}
                  <strong>Airtable</strong>).
                </li>
                <li>
                  <strong>Dados tratados para a marcação:</strong> Incluem nome, idade, género,
                  bairro, distrito (Maxixe ou Massinga), número de telefone, motivo da consulta, data e
                  hora pretendida e estado da marcação ou encaminhamento.
                </li>
                <li>
                  <strong>Confirmações e lembretes:</strong> O número de telefone fornecido pode ser
                  utilizado para envio de confirmação e lembrete da consulta agendada.
                </li>
                <li>
                  <strong>Independência face aos dados locais do navegador:</strong> Limpar o histórico
                  local no teu telemóvel não cancela automaticamente uma marcação já registada no
                  Cal.com ou no Airtable.
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 6: THIRD-PARTY SERVICE PROVIDERS */}
          <section
            id="prestadores-terceiros"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-700">
                    Secção 06
                  </span>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                    Prestadores de Serviços e Tecnologias Utilizadas
                  </h2>
                </div>
              </div>
              <ReviewBadge show={isReviewMode} />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                O SAAJ Virtual recorre a plataformas tecnológicas especializadas para operar o chat de
                texto, as chamadas de voz, o agendamento de consultas e a monitoria operacional. Cada
                fornecedor processa tipos específicos de informação:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100/90 text-slate-800 border-b border-slate-200/80">
                      <th className="py-3 px-4 font-semibold">Serviço / Tecnologia</th>
                      <th className="py-3 px-4 font-semibold">Papel no SAAJ Virtual</th>
                      <th className="py-3 px-4 font-semibold">Dados Processados / Conservados</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 bg-white/80">
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        ConvoCore (e Bunny CDN)
                      </td>
                      <td className="py-3 px-4">
                        Interface de chat por texto e carregamento do widget conversacional.
                      </td>
                      <td className="py-3 px-4">
                        Identificador pseudónimo (<code>anonymousUserId</code>), mensagens de texto,
                        identificador do agente (região <code>na</code>) e dados técnicos de ligação.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Voiceflow</td>
                      <td className="py-3 px-4">
                        Motor conversacional e fluxos de diálogo de saúde sexual e reprodutiva dos
                        assistentes Tonito e Manuela.
                      </td>
                      <td className="py-3 px-4">
                        Mensagens escritas, identificadores de sessão conversacional e variáveis do
                        fluxo de atendimento.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        Vapi (e Daily.co WebRTC)
                      </td>
                      <td className="py-3 px-4">
                        Infraestrutura de chamadas de voz para os 4 assistentes em Maxixe e Massinga.
                      </td>
                      <td className="py-3 px-4">
                        <strong>Gravações de áudio das chamadas</strong>,{" "}
                        <strong>transcrições integrais das chamadas</strong>, metadados de sessão (
                        <code>Vapi Call ID</code>) e outputs estruturados (
                        <code>saaj_interacao</code>, <code>saaj_marcacao</code>).
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">n8n</td>
                      <td className="py-3 px-4">
                        Automação de fluxos pós-interacção e integração entre a Vapi/Cal.com e o
                        Airtable.
                      </td>
                      <td className="py-3 px-4">
                        Dados estruturados extraídos e resumos transferidos para o Airtable (e
                        eventuais registos técnicos de execução dos fluxos, sujeitos a verificação).
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Airtable</td>
                      <td className="py-3 px-4">
                        Base de dados operacional e de monitoria do projecto (
                        <em>Recolha de dados SAAJ</em>).
                      </td>
                      <td className="py-3 px-4">
                        Dados estruturados extraídos e resumos da conversa (incluindo os 10 campos
                        operacionais descritos na Secção 4.3: Nome, Idade, Género, Bairro, Motivo,
                        Distrito, Resumo da conversa, Telefone, Data/hora e Estado da
                        marcação/encaminhamento). <strong>Não armazena transcrições integrais.</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Cal.com</td>
                      <td className="py-3 px-4">
                        Agendamento de consultas presenciais para as unidades SAAJ de Maxixe e
                        Massinga.
                      </td>
                      <td className="py-3 px-4">
                        Dados de marcação fornecidos pelo utilizador (nome, telefone, data/hora e
                        motivo/contexto da consulta).
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Vercel</td>
                      <td className="py-3 px-4">
                        Alojamento web da plataforma pública <code>saajvirtual.vercel.app</code>.
                      </td>
                      <td className="py-3 px-4">
                        Pedidos HTTPS, endereço IP, cabeçalhos do navegador e logs técnicos de
                        servidor.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-slate-500">
                Estes prestadores de serviços tecnológicos podem processar e armazenar dados em
                infraestruturas de nuvem internacionais fora da República de Moçambique, utilizando
                comunicações cifradas (HTTPS/TLS).
              </p>
            </div>
          </section>

          {/* SECTION 7: DATA RETENTION AND SECURITY */}
          <section
            id="retencao-seguranca"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 border border-slate-200">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Secção 07
                  </span>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                    Conservação (Retenção) e Segurança de Dados
                  </h2>
                </div>
              </div>
              <ReviewBadge show={isReviewMode} />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  7.1. Sistemas Onde os Dados São Conservados
                </h3>
                <p>
                  A conservação de dados no ecossistema do SAAJ Virtual distribui-se por cinco
                  sistemas externos/operacionais, além do armazenamento local no teu dispositivo:
                </p>

                <ol className="list-decimal pl-5 space-y-2 pt-1">
                  <li>
                    <strong>Voiceflow / ConvoCore:</strong> conversas de texto e estado das sessões
                    conversacionais;
                  </li>
                  <li>
                    <strong>Vapi:</strong> gravações de áudio das chamadas de voz, transcrições
                    integrais das chamadas e metadados/outputs das interacções de voz nos quatro
                    assistentes de produção;
                  </li>
                  <li>
                    <strong>Cal.com:</strong> registos de marcações de consultas presenciais para
                    Maxixe e Massinga;
                  </li>
                  <li>
                    <strong>Airtable (base <em>Recolha de dados SAAJ</em>):</strong> dados pessoais e
                    operacionais extraídos, resumos de conversas, marcações e indicadores de monitoria;
                  </li>
                  <li>
                    <strong>n8n:</strong> registos técnicos de execução (<em>execution logs</em>) dos
                    fluxos automatizados de integração.
                  </li>
                </ol>

                <p className="pt-1">
                  No teu próprio dispositivo, os dados locais (<code>localStorage</code>) permanecem
                  guardados no navegador ou telemóvel até utilizares as opções de limpeza na área{" "}
                  <strong>Mais</strong> ou apagares os dados do navegador.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  7.2. Estado Actual dos Prazos de Conservação
                </h3>
                <p>
                  Os períodos específicos de conservação e os calendários de eliminação para cada um
                  dos cinco sistemas acima identificados (<strong>Voiceflow/ConvoCore</strong>,{" "}
                  <strong>Vapi</strong>, <strong>Cal.com</strong>, <strong>Airtable</strong> e{" "}
                  <strong>logs do n8n</strong>) <strong>ainda não foram verificados em produção nem formalmente fixados</strong>{" "}
                  pelas entidades responsáveis pelo projecto.
                </p>
                <p>
                  Por razões de transparência, o SAAJ Virtual <strong>não promete</strong> que as
                  gravações, transcrições, resumos ou registos operacionais sejam eliminados
                  automaticamente ou imediatamente após o atendimento. Os critérios e prazos concretos
                  de conservação serão estabelecidos após auditoria técnica às configurações de
                  produção e aprovação institucional antes da publicação final desta Política.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  7.3. Medidas de Segurança Técnica e Operacional
                </h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    <strong>Cifragem em trânsito (HTTPS/TLS e WebRTC):</strong> As comunicações entre o
                    teu navegador/aplicação e as plataformas tecnológicas utilizam ligações seguras e
                    cifradas.
                  </li>
                  <li>
                    <strong>Protecção de chaves privadas:</strong> As credenciais privadas de acesso à
                    Vapi, Voiceflow, Airtable e n8n são mantidas fora do código público do navegador.
                  </li>
                  <li>
                    <strong>Acesso restrito aos sistemas operacionais:</strong> O acesso às bases de
                    dados operacionais e consolas técnicas é restrito às equipas autorizadas no âmbito
                    do projecto, embora as gravações e dados alojados nos fornecedores tecnológicos
                    sejam processados nas respectivas infraestruturas de serviço.
                  </li>
                </ul>
              </div>

              {isReviewMode && (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-1.5 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold text-amber-950">
                      Item 05 da Entrevista — Prazos de Retenção Não Verificados em Produção:
                    </span>
                    <ReviewBadge show={true} />
                  </div>
                  <p className="text-amber-900/90">
                    O administrador confirmou que os prazos de retenção configurados em (1)
                    Voiceflow/ConvoCore, (2) Vapi, (3) Cal.com, (4) Airtable e (5) n8n são actualmente
                    desconhecidos. Nenhum prazo fictício (30, 60, 90 dias ou 1 ano) foi inventado. É
                    obrigatória uma auditoria técnica em produção e a definição institucional dos
                    prazos antes da aprovação final.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 8: USER DATA RIGHTS */}
          <section
            id="direitos-utilizador"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-blue-50 text-tonito-600 border border-blue-100">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-tonito-600">
                    Secção 08
                  </span>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                    Os Teus Direitos e Como São Tratados os Pedidos
                  </h2>
                </div>
              </div>
              <ReviewBadge show={isReviewMode} />
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Podes contactar as entidades responsáveis pelo serviço para apresentar pedidos
                relativos aos teus dados pessoais, nomeadamente:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Pedido de acesso:</strong> saber que informações pessoais associadas à tua
                  interacção ou marcação se encontram registadas;
                </li>
                <li>
                  <strong>Pedido de correcção:</strong> solicitar a rectificação de dados inexactos ou
                  incompletos;
                </li>
                <li>
                  <strong>Pedido de eliminação (quando aplicável):</strong> solicitar o apagamento de
                  dados pessoais registados, sujeito às possibilidades técnicas de cada sistema e às
                  obrigações aplicáveis ao serviço;
                </li>
                <li>
                  <strong>Pedido de esclarecimento:</strong> obter informações adicionais sobre a forma
                  como os teus dados são processados.
                </li>
              </ul>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <h3 className="text-xs font-semibold text-slate-900">
                    1. Limpeza local no teu telemóvel ou navegador
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    No separador <strong>Mais</strong> da aplicação, podes utilizar{" "}
                    <strong>&ldquo;Limpar conversas&rdquo;</strong> ou{" "}
                    <strong>&ldquo;Limpar dados deste dispositivo&rdquo;</strong> para apagar o estado
                    guardado localmente no teu dispositivo. Esta acção local não elimina os registos já
                    armazenados na Vapi, Airtable, Voiceflow/ConvoCore ou Cal.com.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <h3 className="text-xs font-semibold text-slate-900">
                    2. Tratamento manual dos pedidos nos sistemas do serviço
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Não existe um sistema automatizado de eliminação imediata em todas as plataformas
                    externas. Actualmente, os pedidos relativos a dados conservados nos sistemas do
                    serviço são analisados e executados <strong>manualmente</strong> pela equipa
                    técnica (<strong>NCAI Consultorias e Serviços, EI</strong>) mediante instrução e
                    supervisão institucional do <strong>MISAU</strong> e da{" "}
                    <strong>Pathfinder International</strong>.
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                Como a localização de um registo depende dos dados que tiveres fornecido na interacção
                (por exemplo, número de telefone ou data/hora da chamada ou marcação), e como cada
                fornecedor externo possui capacidades técnicas próprias, a eliminação em todos os
                sistemas de terceiros não pode ser garantida de forma automática ou imediata, nem se
                encontra ainda fixado um prazo oficial de resposta.
              </p>

              {isReviewMode && (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-2 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold text-amber-950">
                      Itens 06 e 11 da Entrevista — Procedimento Manual Actual e Fluxo Formal Recomendado:
                    </span>
                    <ReviewBadge show={true} />
                  </div>
                  <p className="text-amber-900/90">
                    <strong>Prática actual confirmada:</strong> Tratamento manual pela NCAI sob
                    supervisão proposta de MISAU e Pathfinder, ainda sem procedimento formal
                    documentado nem prazo oficial de resposta.
                  </p>
                  <p className="text-amber-900/90 font-medium">
                    Requisito operacional futuro (a formalizar antes da publicação):
                  </p>
                  <ol className="list-decimal pl-5 space-y-0.5 text-amber-900/90">
                    <li>Recepção oficial dos pedidos através dos canais aprovados;</li>
                    <li>Verificação adequada e proporcional da identidade do requerente;</li>
                    <li>Identificação e localização dos registos nos sistemas relevantes (Airtable, Vapi, Cal.com, Voiceflow/ConvoCore);</li>
                    <li>Avaliação institucional do pedido e de eventuais obrigações legais ou clínicas aplicáveis;</li>
                    <li>Execução técnica das correcções ou eliminações autorizadas;</li>
                    <li>Registo de conclusão e comunicação da resposta ao utilizador.</li>
                  </ol>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 9: ADOLESCENTS, MINORS, CONSENT AND SAFEGUARDING */}
          <section
            id="menores-consentimento"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-rose-50 text-manuela-600 border border-rose-100">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-manuela-600">
                    Secção 09
                  </span>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                    Adolescentes, Menores (10–24 Anos), Consentimento e Salvaguarda
                  </h2>
                </div>
              </div>
              <ReviewBadge show={isReviewMode} label="Requisito Crítico Pré-Publicação (Jurídico e Clínico)" />
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                O SAAJ Virtual destina-se a <strong>adolescentes e jovens dos 10 aos 24 anos</strong>{" "}
                em Moçambique, incluindo adolescentes menores de 18 anos (10–17 anos) e jovens adultos
                (18–24 anos).
              </p>

              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Como funciona actualmente a utilização da aplicação:</strong> A aplicação
                  permite escolher a localização e conversar com os assistentes virtuais{" "}
                  <strong>Tonito</strong> e <strong>Manuela</strong> ou solicitar marcação de consulta
                  sem criação de conta. Actualmente, a plataforma <strong>não implementa um mecanismo técnico específico de recolha de consentimento diferenciado para utilizadores dos 10 aos 17 anos</strong>{" "}
                  nem de verificação de consentimento parental ou de encarregado de educação.
                </li>
                <li>
                  <strong>Recolha e conservação de dados durante o atendimento:</strong> Mesmo quando
                  utilizada por adolescentes menores de 18 anos, a realização de chamadas de voz ou a
                  partilha de dados para agendamento implica o processamento e armazenamento de dados
                  nos sistemas do serviço (incluindo gravações áudio e transcrições na Vapi e dados
                  extraídos e resumos no Airtable), conforme descrito nas Secções 04 e 06.
                </li>
                <li>
                  <strong>Distinção entre orientação informativa e cuidados clínicos:</strong> A
                  orientação prestada pelos assistentes virtuais na aplicação é exclusivamente
                  informativa e de apoio ao encaminhamento. A prestação de cuidados clínicos de saúde
                  sexual e reprodutiva ocorre presencialmente nas unidades sanitárias SAAJ, segundo as
                  normas clínicas do Ministério da Saúde (MISAU).
                </li>
                <li>
                  <strong>Situações de urgência ou risco:</strong> O SAAJ Virtual não é um serviço de
                  emergência médica ou protecção imediata. Em caso de urgência médica, violência ou
                  risco iminente, deves dirigir-te imediatamente à unidade sanitária ou serviço de
                  protecção mais próximo.
                </li>
                <li>
                  <strong>Enquadramento de consentimento e salvaguarda em revisão:</strong> As regras
                  específicas relativas ao consentimento para tratamento de dados pessoais e dados
                  sensíveis de saúde sexual e reprodutiva de adolescentes dos 10 aos 17 anos, bem como
                  os protocolos formais de salvaguarda e encaminhamento de alto risco, encontram-se
                  pendentes de aprovação jurídica e clínica pelas entidades parceiras (MISAU e
                  Pathfinder International).
                </li>
              </ul>

              {isReviewMode && (
                <div className="p-4 rounded-2xl bg-rose-50/90 border border-rose-200 space-y-2 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold text-rose-950">
                      Item 07 da Entrevista (Achado Crítico) — Revisão Jurídica e Clínica Obrigatória (10–17 anos):
                    </span>
                    <ReviewBadge show={true} label="Bloqueia Publicação Final" />
                  </div>
                  <p className="text-rose-900/90">
                    <strong>Estado actual confirmado pelo administrador:</strong> Não existe mecanismo
                    específico de consentimento implementado para utilizadores dos 10 aos 17 anos; o
                    tema foi discutido informalmente, sem aprovação formal jurídica ou clínica.
                  </p>
                  <p className="text-rose-950 font-medium">
                    Antes da publicação final, as equipas jurídicas e clínicas do MISAU e da Pathfinder
                    International devem deliberar e aprovar formalmente:
                  </p>
                  <ol className="list-decimal pl-5 space-y-1 text-rose-900/90">
                    <li>Os requisitos de consentimento aplicáveis a adolescentes dos 10 aos 17 anos;</li>
                    <li>A distinção entre consentimento para serviços de saúde e consentimento para tratamento de dados pessoais;</li>
                    <li>Os requisitos específicos para o tratamento de dados sensíveis de saúde sexual e reprodutiva;</li>
                    <li>Avisos adequados à idade e opções de escolha para o utilizador jovem;</li>
                    <li>Procedimentos formais de salvaguarda (<em>safeguarding</em>) e encaminhamento de situações de alto risco;</li>
                    <li>A necessidade de aviso prévio explícito e/ou consentimento específico para gravação de chamadas de voz;</li>
                    <li>A conformidade com as directrizes do MISAU e a legislação moçambicana aplicável.</li>
                  </ol>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 10: CONTACT DETAILS AND EFFECTIVE DATE */}
          <section
            id="contactos-vigencia"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                    Secção 10
                  </span>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                    Contactos Institucionais, Gestão de Pedidos e Entrada em Vigor
                  </h2>
                </div>
              </div>
              <ReviewBadge show={isReviewMode} />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-semibold text-slate-900">
                  Data de entrada em vigor: 20 de Outubro de 2026
                </span>
                <span className="text-xs text-slate-600">
                  Data prevista de entrada em vigor (sujeita a reconfirmação na data de aprovação
                  institucional final)
                </span>
              </div>

              <p>
                Para apresentar pedidos de acesso, correcção, eliminação ou esclarecimento sobre dados
                pessoais, o modelo operacional proposto pelo projecto prevê a supervisão institucional
                conjunta pelo <strong>Ministério da Saúde (MISAU)</strong> e pela{" "}
                <strong>Pathfinder International</strong>, com o suporte técnico operacional da{" "}
                <strong>NCAI Consultorias e Serviços, EI</strong> quando instruída e autorizada (arranjo
                sujeito a aprovação institucional formal).
              </p>

              <p>
                Os canais de contacto oficiais e os endereços físicos para correspondência de
                privacidade encontram-se em fase de aprovação e activação institucional:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Supervisão Institucional e Apoio Técnico (Item 11)
                  </span>
                  <span className="font-medium text-slate-800 block">
                    Proposta de supervisão conjunta: <strong>MISAU</strong> e{" "}
                    <strong>Pathfinder International</strong>, com suporte técnico operacional da{" "}
                    <strong>NCAI Consultorias e Serviços, EI</strong> (aguarda aprovação institucional
                    formal).
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    E-mail Institucional de Privacidade (Item 08)
                  </span>
                  <span className="font-medium text-slate-800 block">
                    Será utilizado um endereço institucional oficial pertencente à{" "}
                    <strong>Pathfinder International</strong> ou ao <strong>MISAU</strong> (endereço
                    específico pendente de aprovação e fornecimento institucional).
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Linha Telefónica / WhatsApp de Privacidade (Item 09)
                  </span>
                  <span className="font-medium text-slate-800 block">
                    Está prevista a criação de um número dedicado de telefone/WhatsApp para apoio em
                    matéria de privacidade (canal ainda não criado; pendente de implementação).
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Endereços Físicos Institucionais (Item 10)
                  </span>
                  <span className="font-medium text-slate-800 block">
                    Deverão constar os endereços físicos oficiais da{" "}
                    <strong>Pathfinder International em Moçambique</strong> e do{" "}
                    <strong>Ministério da Saúde (MISAU)</strong> (endereços exactos pendentes de
                    fornecimento e aprovação para correspondência de privacidade).
                  </span>
                </div>
              </div>

              {isReviewMode && (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-1.5 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold text-amber-950">
                      Itens 08, 09, 10 e 11 da Entrevista — Contactos e Endereços Pendentes:
                    </span>
                    <ReviewBadge show={true} />
                  </div>
                  <p className="text-amber-900/90">
                    Nenhum endereço de e-mail, número de telefone ou morada física foi inventado, nem
                    foi atribuído um e-mail da NCAI ou uma linha clínica como contacto oficial de
                    privacidade. A publicação final requer o preenchimento dos contactos aprovados pelo
                    MISAU e pela Pathfinder International.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* INTERNAL APPROVAL CHECKLIST / VERIFICATION MATRIX SECTION (Visible in Internal Review Mode) */}
        {isReviewMode && hasPendingConfirmations && (
          <section
            id="checklist-revisao"
            className="scroll-mt-20 rounded-3xl p-6 sm:p-8 bg-white border-2 border-amber-300/90 shadow-elevated space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-800">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">
                    Controlo Interno Pós-Entrevista (11 Pontos)
                  </span>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                    Matriz de Verificação e Plano de Acção Pré-Publicação
                  </h2>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200 text-xs font-semibold">
                Publicação Final Bloqueada
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Este painel resume o estado de cada um dos 11 pontos da entrevista institucional e
              técnica. Nenhum destes pontos deve ser dado como juridicamente ou tecnicamente encerrado
              sem a respectiva evidência documental ou auditoria de produção.
            </p>

            <div className="space-y-3.5">
              {OUTSTANDING_CONFIRMATIONS.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white text-[11px] font-semibold">
                        Ponto {item.itemNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-800 text-[11px] font-semibold">
                        {item.section}
                      </span>
                      <h3 className="text-xs sm:text-sm font-semibold text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    {item.blocksPublication && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200 text-[11px] font-semibold shrink-0">
                        <AlertTriangle className="w-3 h-3 text-rose-700" />
                        <span>Bloqueia Publicação</span>
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {item.statuses.map((st) => (
                      <span
                        key={st}
                        className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                          st.startsWith("Confirmado") || st.startsWith("Verificado")
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-amber-50 text-amber-900 border-amber-200"
                        }`}
                      >
                        {st}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>Resultado da entrevista:</strong> {item.interviewResult}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Acção necessária:</strong> {item.actionRequired}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    <strong>Responsável:</strong> {item.responsibleParty}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Return Action & Attribution */}
        <footer className="pt-4 pb-8 text-center space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-md transition-all active-press"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao SAAJ Virtual</span>
          </Link>

          <div className="text-xs text-slate-400 space-y-0.5">
            <p className="font-semibold text-slate-600">
              SAAJ Virtual V1.0 • Projecto Futuros com Escolha
            </p>
            <p>Desenvolvido por NCAI Consultorias e Serviços, EI</p>
          </div>
        </footer>
      </main>
    </div>
  );
};
