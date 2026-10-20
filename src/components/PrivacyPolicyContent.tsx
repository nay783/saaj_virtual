"use client";

import React from "react";
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
  Smartphone,
  CheckCircle2,
  FileText,
  ArrowRight,
  Building2,
  Workflow,
  Scale,
} from "lucide-react";

/**
 * Publication control milestone flag.
 * Remains false until formal institutional, legal, clinical, and technical
 * approvals are completed and production publication is explicitly authorized.
 */
export const IS_PUBLICATION_APPROVED = false;

interface PolicySection {
  id: string;
  number: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const POLICY_SECTIONS: PolicySection[] = [
  { id: "operador", number: "01", title: "Enquadramento Institucional", icon: Building2 },
  { id: "dados-recolhidos", number: "02", title: "Dados Recolhidos e Finalidades", icon: Database },
  { id: "conversas-saude", number: "03", title: "Informação de Saúde e Conversas por Texto", icon: MessageSquare },
  { id: "chamadas-voz", number: "04", title: "Chamadas de Voz, Gravações e Transcrições", icon: PhoneCall },
  { id: "consultas-referencias", number: "05", title: "Marcação de Consultas e Encaminhamentos", icon: Calendar },
  { id: "prestadores-terceiros", number: "06", title: "Prestadores de Serviços Tecnológicos", icon: Server },
  { id: "retencao-seguranca", number: "07", title: "Conservação, Segurança e Processamento", icon: Lock },
  { id: "direitos-utilizador", number: "08", title: "Direitos de Privacidade e Pedidos", icon: UserCheck },
  { id: "menores-consentimento", number: "09", title: "Adolescentes, Consentimento e Salvaguarda", icon: Users },
  { id: "contactos-vigencia", number: "10", title: "Contactos Institucionais e Entrada em Vigor", icon: Mail },
];

const AIRTABLE_OPERATIONAL_FIELDS = [
  { number: "01", field: "Nome", context: "Identificação fornecida durante a interacção ou marcação de consulta" },
  { number: "02", field: "Idade", context: "Idade declarada pelo utilizador (público-alvo dos 10 aos 24 anos)" },
  { number: "03", field: "Género", context: "Género informado no contexto do atendimento ou agendamento" },
  { number: "04", field: "Bairro", context: "Bairro ou zona de residência para orientação e referência local" },
  { number: "05", field: "Motivo da consulta ou interacção", context: "Tema ou necessidade de orientação/atendimento apresentada" },
  { number: "06", field: "Distrito (Maxixe/Massinga)", context: "Distrito ou área de serviço SAAJ associada ao atendimento" },
  { number: "07", field: "Resumo da conversa", context: "Síntese operacional gerada a partir da interacção (não a transcrição integral)" },
  { number: "08", field: "Número de telefone", context: "Contacto telefónico associado à chamada, marcação ou lembrete" },
  { number: "09", field: "Data e hora da interacção", context: "Registo temporal da interacção ou da marcação" },
  { number: "10", field: "Estado da marcação ou encaminhamento", context: "Indicação sobre encaminhamento ou situação da consulta agendada" },
];

export const PrivacyPolicyContent: React.FC = () => {
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
            <Link
              href="/terms"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 text-xs font-semibold border border-slate-900/[0.06] shadow-2xs transition-all active-press"
            >
              <Scale className="w-3.5 h-3.5 text-tonito-600 shrink-0" />
              <span>Termos e Condições</span>
            </Link>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-[11px] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Política de Privacidade</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Hero Card */}
        <section className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-tonito-700 border border-blue-100 text-xs font-semibold">
              <FileText className="w-3.5 h-3.5" />
              <span>Política de Privacidade • SAAJ Virtual (Moçambique)</span>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Data de entrada em vigor:{" "}
              <strong className="text-slate-800">20 de Outubro de 2026</strong>
            </span>
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
              Sabemos que as tuas dúvidas sobre saúde sexual e reprodutiva são pessoais e sensíveis.
              Esta Política de Privacidade explica, em linguagem clara e acessível, quem participa na
              iniciativa, que informações são recolhidas quando utilizas a plataforma, o que acontece
              durante as conversas por texto e chamadas de voz, como funcionam as marcações de
              consultas e como podes apresentar pedidos relacionados com os teus dados pessoais.
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
                Não precisas de criar conta nem palavra-passe para aceder à plataforma. Quando
                conversas por texto, realizas chamadas de voz ou agendas uma consulta, os dados
                necessários ao funcionamento e monitoria do serviço são processados.
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
                bairro quando necessário para atendimento.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-900/[0.05] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                <Workflow className="w-4 h-4 text-manuela-600 shrink-0" />
                <span>Transparência nas chamadas e dados</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                As chamadas de voz são processadas através da Vapi (que conserva gravações áudio e
                transcrições integrais), e dados estruturados e resumos são transferidos via n8n para o
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
                As entidades que colaboram no projecto <em>Futuros com Escolha</em> desempenham as
                seguintes funções institucionais e técnicas:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <h3 className="text-xs font-semibold text-slate-900">
                    Ministério da Saúde (MISAU)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Parceiro institucional governamental e de saúde pública, responsável pelo
                    enquadramento sectorial dos Serviços Amigos dos Adolescentes e Jovens (SAAJ) e pela
                    coordenação institucional no sector público de saúde, nos termos dos acordos
                    aplicáveis ao projecto.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <h3 className="text-xs font-semibold text-slate-900">
                    Pathfinder International
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Parceiro de implementação do projecto <em>Futuros com Escolha</em>, participando na
                    implementação programática, coordenação operacional e acompanhamento do SAAJ
                    Virtual em colaboração com o MISAU.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <h3 className="text-xs font-semibold text-slate-900">
                    Cooperação Irlandesa (Irish Aid / Governo da Irlanda)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Parceiro de financiamento e cooperação para o desenvolvimento que presta apoio
                    financeiro ao projecto <em>Futuros com Escolha</em>. O apoio financeiro não implica,
                    por si só, responsabilidade pela gestão ou controlo do tratamento de dados pessoais
                    da plataforma.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <h3 className="text-xs font-semibold text-slate-900">
                    NCAI Consultorias e Serviços, EI
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Entidade responsável pelo desenvolvimento tecnológico, implementação técnica e
                    suporte operacional da plataforma SAAJ Virtual. A NCAI presta serviços tecnológicos
                    ao projecto e não é a proprietária institucional da iniciativa.
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600">
                No funcionamento do projecto, a supervisão institucional sobre a governação de dados e
                o acompanhamento do serviço desenvolve-se em articulação entre o{" "}
                <strong>Ministério da Saúde (MISAU)</strong> e a{" "}
                <strong>Pathfinder International</strong>, cabendo à{" "}
                <strong>NCAI Consultorias e Serviços, EI</strong> a operação e manutenção técnica dos
                sistemas, em conformidade com os acordos institucionais aplicáveis.
              </p>
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
                As informações recolhidas e processadas pelo SAAJ Virtual dependem das funcionalidades
                que utilizas na plataforma:
              </p>

              <div className="space-y-2.5">
                <h3 className="text-sm font-semibold text-slate-900">
                  2.1. Dados guardados localmente no teu dispositivo ou navegador
                </h3>
                <p>
                  Para que não precises de escolher novamente a tua localização sempre que abres a
                  aplicação, o SAAJ Virtual guarda localmente no teu telemóvel ou navegador (
                  <code>localStorage</code>, sob a chave <code>saaj_virtual_user_state_v1</code>):
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    <strong>Identificador pseudónimo do dispositivo (<code>anonymousUserId</code>):</strong>{" "}
                    código aleatório gerado automaticamente (UUID) para manter a continuidade das
                    sessões no mesmo dispositivo;
                  </li>
                  <li>
                    <strong>Localização seleccionada manualmente:</strong> a província escolhida em
                    Moçambique e, na Província de Inhambane, o distrito seleccionado (por exemplo,{" "}
                    <strong>Maxixe</strong> ou <strong>Massinga</strong>), determinando a área de
                    serviço (<code>maxixe</code>, <code>massinga</code> ou <code>geral</code>).{" "}
                    <strong>A aplicação não solicita nem recolhe coordenadas GPS do dispositivo;</strong>
                  </li>
                  <li>
                    <strong>Preferências da sessão:</strong> indicação de conclusão da configuração
                    inicial (<code>onboardingCompleted</code>) e o último assistente seleccionado (
                    <code>tonito</code> ou <code>manuela</code>).
                  </li>
                </ul>
              </div>

              <div className="space-y-2.5">
                <h3 className="text-sm font-semibold text-slate-900">
                  2.2. Dados processados durante conversas, chamadas de voz e marcações
                </h3>
                <p>
                  Quando interages com os assistentes virtuais <strong>Tonito</strong> ou{" "}
                  <strong>Manuela</strong> (por texto ou por chamada de voz) ou quando solicitas o
                  agendamento de uma consulta presencial ou encaminhamento, podem ser recolhidos e
                  processados:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    <strong>Dados pessoais e demográficos:</strong> nome, idade (e faixa etária
                    correspondente: <code>10–14</code>, <code>15–19</code> ou <code>20–24</code> anos),
                    género, número de telefone, província, distrito (Maxixe ou Massinga) e bairro;
                  </li>
                  <li>
                    <strong>Dados relativos à interacção e saúde sexual e reprodutiva:</strong>{" "}
                    mensagens escritas, áudio gravado e transcrição das chamadas de voz, motivo da
                    consulta ou interacção, tema principal e subtema de saúde, resumo da conversa,
                    avaliação de risco, estado da marcação ou encaminhamento e nível de satisfação;
                  </li>
                  <li>
                    <strong>Dados técnicos e de ligação:</strong> endereço IP, tipo de dispositivo e
                    navegador, identificadores de sessão (incluindo <code>Session ID</code> e{" "}
                    <code>Vapi Call ID</code>) e data e hora da interacção.
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  2.3. Finalidades do tratamento dos dados
                </h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    Prestar informação e orientação sobre saúde sexual e reprodutiva adequada à tua
                    idade e localização;
                  </li>
                  <li>
                    Facilitar encaminhamentos e gerir marcações de consultas presenciais nas unidades
                    SAAJ participantes (incluindo envio de confirmações e lembretes);
                  </li>
                  <li>
                    Assegurar o funcionamento operacional, o acompanhamento dos serviços e a monitoria
                    do projecto <em>Futuros com Escolha</em>.
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
                As conversas realizadas no SAAJ Virtual podem abordar temas sensíveis de saúde sexual e
                reprodutiva, tais como contracepção, ciclo menstrual, gravidez, infecções de
                transmissão sexual (ITS), relacionamentos, segurança e prevenção de violência.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Orientação informativa através de assistentes virtuais:</strong> O{" "}
                  <strong>Tonito</strong> e a <strong>Manuela</strong> são assistentes virtuais
                  automatizados. As respostas disponibilizadas têm carácter informativo, educativo e de
                  apoio ao encaminhamento, <strong>não constituindo diagnóstico médico nem consulta clínica presencial</strong>.
                </li>
                <li>
                  <strong>Funcionamento das conversas por texto (ConvoCore e Voiceflow):</strong> O
                  chat de texto é disponibilizado através da interface <strong>ConvoCore</strong>, que
                  comunica com os fluxos conversacionais alojados na plataforma{" "}
                  <strong>Voiceflow</strong> (configurados para <code>Tonito Maxixe</code>,{" "}
                  <code>Tonito Massinga</code>, <code>Tonito Geral</code>,{" "}
                  <code>Manuela Maxixe</code>, <code>Manuela Massinga</code> e{" "}
                  <code>Manuela Geral</code>). As mensagens enviadas e o identificador de sessão são
                  processados para gerar respostas adequadas ao teu contexto.
                </li>
                <li>
                  <strong>Protecção contra fins comerciais:</strong> Os dados partilhados nas tuas
                  conversas não são vendidos nem utilizados para publicidade comercial ou marketing de
                  terceiros.
                </li>
                <li>
                  <strong>Utilização em telemóveis partilhados:</strong> Se utilizares um telemóvel ou
                  computador partilhado com outras pessoas, podes apagar a qualquer momento o histórico
                  guardado localmente no navegador através dos botões{" "}
                  <strong>&ldquo;Limpar conversas&rdquo;</strong> ou{" "}
                  <strong>&ldquo;Limpar dados deste dispositivo&rdquo;</strong> na área{" "}
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

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 text-slate-800">
                <p>
                  Quando utilizas a funcionalidade de chamadas de voz do SAAJ Virtual, a tua conversa é
                  processada, gravada e armazenada através da plataforma <strong>Vapi</strong>. Estas
                  gravações são utilizadas no contexto do funcionamento e acompanhamento do serviço, de
                  acordo com os procedimentos operacionais aplicáveis.
                </p>
                <p>
                  As chamadas de voz geram <strong>gravações áudio</strong> e{" "}
                  <strong>transcrições integrais</strong>, que são conservadas na plataforma{" "}
                  <strong>Vapi</strong>. Determinadas informações extraídas dessas interacções,
                  incluindo dados estruturados e resumos da conversa, são posteriormente processadas
                  através de fluxos automatizados no <strong>n8n</strong> e armazenadas no{" "}
                  <strong>Airtable</strong> para fins de funcionamento, acompanhamento e monitoria do
                  serviço.
                </p>
              </div>

              <div className="space-y-2.5">
                <h3 className="text-sm font-semibold text-slate-900">
                  4.1. Assistentes de Voz Disponíveis e Utilização do Microfone
                </h3>
                <p>
                  As chamadas de voz estão disponíveis para utilizadores nas áreas de serviço de{" "}
                  <strong>Maxixe</strong> e <strong>Massinga</strong>, através de quatro assistentes de
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
                  O microfone do teu telemóvel ou computador só é activado quando inicias uma chamada
                  tocando em <strong>&ldquo;Ligar&rdquo;</strong> e autorizas a permissão do microfone.
                  Durante a chamada, podes silenciar o microfone ou terminar a ligação a qualquer
                  momento.
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <h3 className="text-sm font-semibold text-slate-900">
                  4.2. Como Funciona o Fluxo Técnico (Vapi → n8n → Airtable)
                </h3>
                <p>
                  Para que compreendas o que cada tecnologia faz com a informação de uma chamada de
                  voz:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-1">
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      <span>Passo 1</span>
                      <ArrowRight className="w-3.5 h-3.5 hidden sm:inline text-slate-300" />
                    </div>
                    <p className="text-xs font-semibold text-slate-900">Chamada de Voz</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Conversas por voz com o Tonito ou a Manuela (em Maxixe ou Massinga).
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
                      <strong>gravação de áudio</strong>, a <strong>transcrição integral</strong> e os
                      dados da sessão (<code>Vapi Call ID</code>).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-purple-600">
                      <span>Passo 3 • n8n</span>
                      <ArrowRight className="w-3.5 h-3.5 hidden sm:inline text-slate-300" />
                    </div>
                    <p className="text-xs font-semibold text-slate-900">Integração Automatizada</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      O <strong>n8n</strong> processa e transfere automaticamente as informações
                      estruturadas extraídas e o resumo da interacção.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                      <span>Passo 4 • Airtable</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-900">Registo Operacional</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      O <strong>Airtable</strong> guarda os dados extraídos e o{" "}
                      <strong>resumo da conversa</strong>, não recebendo a transcrição integral através
                      deste fluxo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  4.3. Dados Extraídos e Armazenados no Airtable
                </h3>
                <p>
                  No âmbito do funcionamento operacional, acompanhamento de encaminhamentos e monitoria
                  do serviço, os fluxos de integração registam na base operacional do{" "}
                  <strong>Airtable</strong> (<em>Recolha de dados SAAJ</em>) as seguintes categorias de
                  informação quando disponíveis na interacção ou marcação:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {AIRTABLE_OPERATIONAL_FIELDS.map((item) => (
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
              </div>
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
                  Marcação de Consultas e Encaminhamentos
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Quando uma conversa ou chamada identifica a necessidade de cuidados presenciais, ou
                quando escolhes directamente a opção de agendamento nos distritos suportados (
                <strong>Maxixe</strong> e <strong>Massinga</strong>), o SAAJ Virtual permite marcar uma
                consulta para a unidade sanitária SAAJ participante.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Processamento através do Cal.com e fluxos integrados:</strong> O agendamento
                  utiliza a plataforma <strong>Cal.com</strong> configurada para Maxixe e Massinga
                  e/ou os fluxos automatizados integrados via <strong>n8n</strong> e{" "}
                  <strong>Airtable</strong>.
                </li>
                <li>
                  <strong>Dados necessários para a marcação:</strong> Nome, idade, género, bairro,
                  distrito (Maxixe ou Massinga), número de telefone, motivo geral da consulta, data e
                  hora pretendida e estado da marcação ou encaminhamento.
                </li>
                <li>
                  <strong>Confirmações e lembretes:</strong> O número de telefone indicado pode ser
                  utilizado para envio de mensagens de confirmação e lembrete da consulta agendada.
                </li>
                <li>
                  <strong>Independência face aos dados locais:</strong> Apagar as conversas locais no
                  teu telemóvel ou navegador não cancela uma consulta que já tenha sido agendada.
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 6: THIRD-PARTY SERVICE PROVIDERS */}
          <section
            id="prestadores-terceiros"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-700">
                  Secção 06
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Prestadores de Serviços Tecnológicos
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Para disponibilizar conversas por texto, chamadas de voz, marcação de consultas e
                monitoria operacional, o SAAJ Virtual utiliza os seguintes serviços tecnológicos:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100/90 text-slate-800 border-b border-slate-200/80">
                      <th className="py-3 px-4 font-semibold">Serviço / Tecnologia</th>
                      <th className="py-3 px-4 font-semibold">Função no SAAJ Virtual</th>
                      <th className="py-3 px-4 font-semibold">Dados Processados / Conservados</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 bg-white/80">
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        ConvoCore (e Bunny CDN)
                      </td>
                      <td className="py-3 px-4">
                        Interface de mensagens de texto e entrega do widget conversacional.
                      </td>
                      <td className="py-3 px-4">
                        Identificador pseudónimo (<code>anonymousUserId</code>), mensagens de texto,
                        configuração do agente e dados técnicos de ligação.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Voiceflow</td>
                      <td className="py-3 px-4">
                        Motor conversacional e fluxos de diálogo de saúde sexual e reprodutiva dos
                        assistentes Tonito e Manuela.
                      </td>
                      <td className="py-3 px-4">
                        Mensagens de texto, identificadores de sessão e variáveis do diálogo.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        Vapi (e Daily.co WebRTC)
                      </td>
                      <td className="py-3 px-4">
                        Infraestrutura de chamadas de voz para os assistentes de Maxixe e Massinga.
                      </td>
                      <td className="py-3 px-4">
                        <strong>Gravações de áudio das chamadas</strong>,{" "}
                        <strong>transcrições integrais</strong>, metadados da chamada (
                        <code>Vapi Call ID</code>) e dados estruturados extraídos.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">n8n</td>
                      <td className="py-3 px-4">
                        Automação de fluxos pós-interacção e transferência de dados seleccionados para
                        o Airtable.
                      </td>
                      <td className="py-3 px-4">
                        Dados estruturados extraídos, resumos de interacção, eventos de agendamento e
                        registos técnicos de execução dos fluxos.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Airtable</td>
                      <td className="py-3 px-4">
                        Armazenamento operacional, acompanhamento de encaminhamentos e monitoria do
                        projecto (base <em>Recolha de dados SAAJ</em>).
                      </td>
                      <td className="py-3 px-4">
                        Dados extraídos e resumos da conversa (Nome, Idade, Género, Bairro, Motivo,
                        Distrito, Resumo da conversa, Telefone, Data/hora e Estado da
                        marcação/encaminhamento), sem transcrições integrais.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Cal.com</td>
                      <td className="py-3 px-4">
                        Sistema de agendamento de consultas presenciais para Maxixe e Massinga.
                      </td>
                      <td className="py-3 px-4">
                        Dados submetidos na marcação (nome, telefone, data/hora escolhida e motivo da
                        consulta).
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Vercel</td>
                      <td className="py-3 px-4">
                        Alojamento web da aplicação pública <code>saajvirtual.vercel.app</code>.
                      </td>
                      <td className="py-3 px-4">
                        Pedidos HTTPS, endereço IP, cabeçalhos técnicos do navegador e registos de
                        execução do servidor.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* SECTION 7: DATA RETENTION, SECURITY AND INTERNATIONAL PROCESSING */}
          <section
            id="retencao-seguranca"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 border border-slate-200">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Secção 07
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Conservação, Segurança e Processamento Internacional de Dados
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  7.1. Conservação de Dados por Sistema
                </h3>
                <p>
                  Os dados processados no âmbito do SAAJ Virtual são conservados em diferentes camadas
                  tecnológicas:
                </p>

                <ol className="list-decimal pl-5 space-y-2 pt-1">
                  <li>
                    <strong>Voiceflow / ConvoCore:</strong> mensagens trocadas por texto e estado de
                    sessão conversacional;
                  </li>
                  <li>
                    <strong>Vapi:</strong> gravações de áudio das chamadas de voz, transcrições
                    integrais e metadados associados às chamadas;
                  </li>
                  <li>
                    <strong>Cal.com:</strong> registos de marcações de consultas presenciais;
                  </li>
                  <li>
                    <strong>Airtable:</strong> registos operacionais, resumos de conversas, marcações e
                    indicadores de monitoria do projecto;
                  </li>
                  <li>
                    <strong>n8n:</strong> registos técnicos de execução dos fluxos automatizados de
                    integração.
                  </li>
                </ol>

                <p className="pt-1">
                  Os dados guardados localmente no teu telemóvel ou navegador (
                  <code>localStorage</code>) permanecem no dispositivo até utilizares as opções de
                  limpeza na área <strong>Mais</strong> ou nas definições do navegador. Quanto aos
                  sistemas externos e operacionais acima indicados, a plataforma não efectua a
                  eliminação automática imediata das gravações, transcrições ou registos operacionais
                  após cada interacção, dependendo a duração da conservação das regras técnicas e
                  operacionais aplicáveis a cada sistema no âmbito do projecto.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  7.2. Medidas de Segurança e Processamento Internacional
                </h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    <strong>Comunicações cifradas (HTTPS/TLS e WebRTC):</strong> A transmissão de dados
                    entre o teu dispositivo e os sistemas utilizados pelo SAAJ Virtual realiza-se
                    através de ligações cifradas.
                  </li>
                  <li>
                    <strong>Protecção de credenciais técnicas:</strong> As chaves privadas de acesso às
                    plataformas e bases de dados operacionais são mantidas no servidor e nos fluxos de
                    integração, fora do código público do navegador.
                  </li>
                  <li>
                    <strong>Controlo de acesso operacional:</strong> O acesso aos registos operacionais
                    no Airtable e às ferramentas de gestão técnica é restrito às equipas autorizadas no
                    âmbito do projecto.
                  </li>
                  <li>
                    <strong>Processamento em infraestruturas internacionais:</strong> Os prestadores
                    tecnológicos referidos na Secção 06 operam infraestruturas de nuvem internacionais,
                    pelo que os dados tratados através dessas plataformas podem ser processados e
                    armazenados fora da República de Moçambique.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 8: USER DATA RIGHTS */}
          <section
            id="direitos-utilizador"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-50 text-tonito-600 border border-blue-100">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-tonito-600">
                  Secção 08
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Direitos de Privacidade e Apresentação de Pedidos
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Podes apresentar pedidos relativos às tuas informações pessoais tratadas no âmbito do
                SAAJ Virtual, nomeadamente para:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Solicitar acesso:</strong> confirmar e conhecer os dados pessoais registados
                  associados à tua interacção ou marcação;
                </li>
                <li>
                  <strong>Solicitar correcção:</strong> pedir a rectificação de dados inexactos ou
                  incompletos;
                </li>
                <li>
                  <strong>Solicitar eliminação (quando aplicável):</strong> pedir o apagamento de dados
                  pessoais registados, sujeito às condições técnicas dos sistemas envolvidos e às
                  obrigações aplicáveis ao serviço;
                </li>
                <li>
                  <strong>Pedir esclarecimentos:</strong> obter informações sobre a forma como os teus
                  dados são processados.
                </li>
              </ul>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <h3 className="text-xs font-semibold text-slate-900">
                    1. Limpeza imediata no teu dispositivo
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    No separador <strong>Mais</strong> da aplicação, podes utilizar{" "}
                    <strong>&ldquo;Limpar conversas&rdquo;</strong> ou{" "}
                    <strong>&ldquo;Limpar dados deste dispositivo&rdquo;</strong> para apagar os dados
                    guardados localmente no teu telemóvel ou navegador. Esta limpeza local não apaga os
                    registos armazenados na Vapi, Airtable, Voiceflow/ConvoCore ou Cal.com.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <h3 className="text-xs font-semibold text-slate-900">
                    2. Pedidos sobre dados nos sistemas do serviço
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Os pedidos relativos a dados conservados nos sistemas do serviço são analisados e
                    tratados de forma <strong>manual</strong>, sob supervisão institucional do{" "}
                    <strong>MISAU</strong> e da <strong>Pathfinder International</strong>, com o apoio
                    técnico da <strong>NCAI Consultorias e Serviços, EI</strong> para localização,
                    correcção ou eliminação de registos quando autorizada.
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                Para permitir localizar um registo nos sistemas operacionais, poderá ser necessário
                indicares dados que tenhas fornecido na interacção ou marcação (como o número de
                telefone ou a data e hora aproximada do contacto).
              </p>
            </div>
          </section>

          {/* SECTION 9: ADOLESCENTS, MINORS, CONSENT AND SAFEGUARDING */}
          <section
            id="menores-consentimento"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
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

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                O SAAJ Virtual destina-se a <strong>adolescentes e jovens dos 10 aos 24 anos</strong>{" "}
                em Moçambique, abrangendo adolescentes dos 10 aos 17 anos e jovens adultos dos 18 aos
                24 anos:
              </p>

              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Clareza sobre a recolha e conservação de dados:</strong> Podes abrir a
                  aplicação sem criar conta pessoal. Quando conversas com os assistentes virtuais{" "}
                  <strong>Tonito</strong> e <strong>Manuela</strong>, fazes chamadas de voz ou agendas
                  uma consulta, os dados associados à interacção (incluindo gravações de áudio e
                  transcrições na Vapi e dados estruturados e resumos no Airtable) são processados e
                  armazenados conforme explicado nesta Política.
                </li>
                <li>
                  <strong>Distinção entre orientação informativa e cuidados clínicos:</strong> A
                  orientação disponibilizada pelos assistentes virtuais na aplicação tem carácter
                  exclusivamente informativo, educativo e de encaminhamento. Os cuidados clínicos,
                  exames, diagnósticos e tratamentos de saúde sexual e reprodutiva são prestados
                  presencialmente por profissionais de saúde qualificados nas unidades sanitárias SAAJ,
                  de acordo com as normas do Ministério da Saúde (MISAU).
                </li>
                <li>
                  <strong>Situações de urgência, violência ou risco:</strong> O SAAJ Virtual não é um
                  serviço de urgência médica nem de intervenção imediata de emergência. Se estiveres
                  perante uma urgência médica, situação de violência, abuso ou risco imediato para a
                  tua segurança, deves procurar apoio presencial imediato na unidade sanitária,
                  hospital ou serviço de protecção mais próximo.
                </li>
                <li>
                  <strong>Consentimento e protecção de adolescentes:</strong> A utilização do serviço e
                  o acesso ao atendimento presencial nos Serviços Amigos dos Adolescentes e Jovens
                  enquadram-se nas directrizes aplicáveis do Ministério da Saúde (MISAU) e nas normas
                  legais e de protecção vigentes na República de Moçambique.
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 10: CONTACT DETAILS AND EFFECTIVE DATE */}
          <section
            id="contactos-vigencia"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                  Secção 10
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Contactos Institucionais e Data de Entrada em Vigor
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-semibold text-slate-900">
                  Data de entrada em vigor: 20 de Outubro de 2026
                </span>
                <span className="text-xs text-slate-600">
                  Projecto Futuros com Escolha • SAAJ Virtual
                </span>
              </div>

              <p>
                Para apresentar pedidos de acesso, correcção, eliminação ou esclarecimento sobre o
                tratamento de dados pessoais no SAAJ Virtual, os pedidos são coordenados sob a
                supervisão institucional do <strong>Ministério da Saúde (MISAU)</strong> e da{" "}
                <strong>Pathfinder International</strong>, com suporte técnico operacional da{" "}
                <strong>NCAI Consultorias e Serviços, EI</strong>:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Coordenação Institucional de Privacidade
                  </span>
                  <span className="font-medium text-slate-800 block">
                    Ministério da Saúde (MISAU) e Pathfinder International — Projecto{" "}
                    <em>Futuros com Escolha</em> (com suporte técnico da NCAI Consultorias e Serviços,
                    EI)
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Correio Electrónico Institucional
                  </span>
                  <span className="font-medium text-slate-800 block">
                    Canal de correio electrónico institucional do projecto (MISAU / Pathfinder
                    International), disponibilizado após activação institucional oficial.
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Linha de Apoio (Telefone / WhatsApp)
                  </span>
                  <span className="font-medium text-slate-800 block">
                    Linha dedicada de apoio a questões de privacidade do SAAJ Virtual, disponibilizada
                    após activação operacional oficial.
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Endereços Institucionais em Moçambique
                  </span>
                  <span className="font-medium text-slate-800 block">
                    Ministério da Saúde (MISAU) e Pathfinder International em Moçambique, conforme
                    endereços institucionais designados para correspondência oficial do projecto.
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Cross-Navigation & Footer */}
        <footer className="pt-4 pb-8 text-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-md transition-all active-press"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao SAAJ Virtual</span>
            </Link>

            <Link
              href="/terms"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-200 shadow-2xs transition-all active-press"
            >
              <Scale className="w-4 h-4 text-tonito-600" />
              <span>Ler Termos e Condições de Utilização</span>
            </Link>
          </div>

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
