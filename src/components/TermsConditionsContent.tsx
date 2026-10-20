"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  MessageSquare,
  PhoneCall,
  Calendar,
  Users,
  Mail,
  CheckCircle2,
  FileText,
  Building2,
  Scale,
  MapPin,
  Sparkles,
  BookOpen,
  AlertTriangle,
  HeartPulse,
  Wifi,
  UserCheck,
  Server,
  RefreshCw,
} from "lucide-react";

/**
 * Publication control milestone flag.
 * Remains false until formal institutional, legal, clinical, and technical
 * approvals are completed and production publication is explicitly authorized.
 */
export const IS_PUBLICATION_APPROVED = false;

interface TermsSection {
  id: string;
  number: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TERMS_SECTIONS: TermsSection[] = [
  { id: "introducao", number: "01", title: "Introdução e Enquadramento Institucional", icon: Building2 },
  { id: "aceitacao", number: "02", title: "Aceitação e Utilização da Plataforma", icon: CheckCircle2 },
  { id: "destinatarios-geografia", number: "03", title: "Destinatários e Disponibilidade Geográfica", icon: MapPin },
  { id: "assistentes-virtuais", number: "04", title: "Assistentes Virtuais Tonito e Manuela", icon: Sparkles },
  { id: "natureza-educativa", number: "05", title: "Natureza Educativa e Informativa do Serviço", icon: BookOpen },
  { id: "limitacoes-automacao", number: "06", title: "Limitações da Assistência Automatizada", icon: AlertTriangle },
  { id: "urgencias-medicas", number: "07", title: "Urgências Médicas e Atenção Profissional Imediata", icon: HeartPulse },
  { id: "conversas-texto", number: "08", title: "Disponibilidade das Conversas por Texto", icon: MessageSquare },
  { id: "interaccoes-voz", number: "09", title: "Disponibilidade das Chamadas de Voz (Maxixe e Massinga)", icon: PhoneCall },
  { id: "marcacoes-encaminhamentos", number: "10", title: "Marcação de Consultas e Encaminhamentos", icon: Calendar },
  { id: "gratuitidade-custos", number: "11", title: "Gratuitidade do Serviço e Custos de Telecomunicações", icon: Wifi },
  { id: "utilizacao-responsavel", number: "12", title: "Utilização Responsável da Plataforma", icon: UserCheck },
  { id: "privacidade-dados", number: "13", title: "Privacidade e Tratamento de Dados Pessoais", icon: ShieldCheck },
  { id: "disponibilidade-tecnica", number: "14", title: "Disponibilidade Técnica e Interrupções", icon: Server },
  { id: "responsabilidades-institucionais", number: "15", title: "Responsabilidades Institucionais Aplicáveis", icon: Scale },
  { id: "alteracoes-termos", number: "16", title: "Alterações aos Termos e Condições", icon: RefreshCw },
  { id: "contactos", number: "17", title: "Canais de Contacto e Data de Entrada em Vigor", icon: Mail },
];

export const TermsConditionsContent: React.FC = () => {
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
              href="/privacy"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 text-xs font-semibold border border-slate-900/[0.06] shadow-2xs transition-all active-press"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Política de Privacidade</span>
            </Link>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-[11px] font-medium">
              <Scale className="w-3.5 h-3.5 text-tonito-400 shrink-0" />
              <span>Termos e Condições</span>
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
              <span>Termos e Condições de Utilização • SAAJ Virtual</span>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Data de entrada em vigor:{" "}
              <strong className="text-slate-800">20 de Outubro de 2026</strong>
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
              Termos e Condições de Utilização do SAAJ Virtual
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              Estes Termos e Condições explicam como funciona o <strong>SAAJ Virtual</strong>{" "}
              (Serviço Amigo dos Adolescentes e Jovens — Virtual), o que podes esperar dos
              assistentes virtuais <strong>Tonito</strong> e <strong>Manuela</strong>, quais as
              funcionalidades disponíveis na tua região em Moçambique e quais os limites importantes
              entre orientação informativa digital e cuidados clínicos presenciais.
            </p>
          </div>

          {/* Core Summary Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-900/[0.05] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                <BookOpen className="w-4 h-4 text-tonito-600 shrink-0" />
                <span>Orientação educativa</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                O SAAJ Virtual oferece informação e orientação sobre saúde sexual e reprodutiva,
                mas não substitui uma consulta médica nem realiza diagnósticos clínicos.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-900/[0.05] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                <HeartPulse className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Não é serviço de urgência</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Em caso de urgência médica, dor aguda, violência ou perigo imediato, dirige-te de
                imediato à unidade sanitária ou serviço de protecção mais próximo.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-900/[0.05] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Acesso gratuito</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                O serviço SAAJ Virtual é gratuito para os jovens, podendo apenas existir custos
                normais de dados móveis ou internet cobrados pela tua operadora.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Navigation Index */}
        <nav
          aria-label="Índice dos Termos e Condições"
          className="glass-card rounded-3xl p-5 sm:p-6 border border-slate-900/[0.06] shadow-soft space-y-3"
        >
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
            Índice dos Termos e Condições (17 Secções)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {TERMS_SECTIONS.map((sec) => {
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

        {/* 17 Sections */}
        <div className="space-y-6">
          {/* SECTION 01 */}
          <section
            id="introducao"
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
                  Introdução e Enquadramento Institucional
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/50 border border-blue-100/90 text-slate-800 font-medium leading-relaxed">
                O SAAJ Virtual é uma iniciativa implementada no âmbito do projecto{" "}
                <strong>Futuros com Escolha</strong>, em colaboração com o{" "}
                <strong>Ministério da Saúde da República de Moçambique (MISAU)</strong> e a{" "}
                <strong>Pathfinder International</strong>, com o apoio financeiro da{" "}
                <strong>Cooperação Irlandesa (Irish Aid)</strong>. O desenvolvimento tecnológico da
                plataforma foi realizado pela <strong>NCAI Consultorias e Serviços, EI</strong>.
              </div>
              <p>
                A plataforma tem por objectivo aproximar adolescentes e jovens de informação de
                confiança sobre saúde sexual e reprodutiva e facilitar o encaminhamento e a marcação
                de consultas presenciais nos Serviços Amigos dos Adolescentes e Jovens (SAAJ)
                participantes.
              </p>
            </div>
          </section>

          {/* SECTION 02 */}
          <section
            id="aceitacao"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                  Secção 02
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Aceitação e Utilização da Plataforma
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Estes Termos e Condições estabelecem as regras de funcionamento e utilização do SAAJ
                Virtual. Ao acederes à plataforma e utilizares as conversas por texto, chamadas de
                voz ou marcações de consulta, deves fazê-lo em conformidade com as condições aqui
                descritas e com a{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-tonito-600 hover:text-tonito-700 underline underline-offset-2"
                >
                  Política de Privacidade do SAAJ Virtual
                </Link>
                .
              </p>
              <p>
                No caso de utilizadores menores de 18 anos (adolescentes dos 10 aos 17 anos), a
                utilização do serviço e a aplicação destas condições estão sujeitas ao enquadramento
                legal moçambicano aplicável e às normas e orientações clínicas e de protecção do
                Ministério da Saúde (MISAU) para os Serviços Amigos dos Adolescentes e Jovens.
              </p>
            </div>
          </section>

          {/* SECTION 03 */}
          <section
            id="destinatarios-geografia"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-50 text-tonito-600 border border-blue-100">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-tonito-600">
                  Secção 03
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Destinatários e Disponibilidade Geográfica
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                O SAAJ Virtual foi concebido para <strong>adolescentes e jovens dos 10 aos 24 anos</strong>{" "}
                na República de Moçambique (abrangendo as faixas etárias dos <code>10–14</code>,{" "}
                <code>15–19</code> e <code>20–24</code> anos).
              </p>
              <p>
                A disponibilidade das funcionalidades varia de acordo com a localização seleccionada
                na plataforma:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Cobertura Geral (Todas as Províncias de Moçambique):</strong> Acesso a
                  orientação informativa e conversas por texto com o Tonito e a Manuela.
                </li>
                <li>
                  <strong>Áreas de Serviço de Maxixe e Massinga (Província de Inhambane):</strong>{" "}
                  Além das conversas por texto, estão disponíveis as funcionalidades de chamadas de
                  voz e de agendamento digital de consultas presenciais para as unidades SAAJ
                  participantes nestes dois distritos.
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 04 */}
          <section
            id="assistentes-virtuais"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-700">
                  Secção 04
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Assistentes Virtuais Tonito e Manuela
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                O <strong>Tonito</strong> e a <strong>Manuela</strong> são assistentes virtuais
                automatizados criados para o SAAJ Virtual. Quando conversas com o Tonito ou com a
                Manuela por texto ou por voz, estás a interagir com um sistema automatizado de
                orientação conversacional, e não directamente em tempo real com um médico ou
                enfermeiro humano.
              </p>
              <p>
                Podes alternar livremente entre o Tonito e a Manuela consoante a tua preferência
                pessoal. Ambos seguem as mesmas directrizes informativas e de encaminhamento do
                projecto.
              </p>
            </div>
          </section>

          {/* SECTION 05 */}
          <section
            id="natureza-educativa"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-50 text-tonito-600 border border-blue-100">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-tonito-600">
                  Secção 05
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Natureza Educativa e Informativa do Serviço
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Toda a informação disponibilizada no SAAJ Virtual tem finalidade{" "}
                <strong>educativa, informativa e de apoio ao encaminhamento</strong> no domínio da
                saúde sexual e reprodutiva (incluindo temas como métodos contraceptivos, saúde
                menstrual, gravidez, prevenção de infecções de transmissão sexual, relacionamentos
                saudáveis e bem-estar).
              </p>
              <p>
                O serviço visa esclarecer dúvidas de forma acessível e sem julgamentos e ajudar-te a
                saber quando e como procurar atendimento presencial numa unidade sanitária SAAJ.
              </p>
            </div>
          </section>

          {/* SECTION 06 */}
          <section
            id="limitacoes-automacao"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">
                  Secção 06
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Limitações da Assistência Automatizada
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Por utilizar sistemas conversacionais automatizados, o SAAJ Virtual possui limitações
                importantes que deves ter sempre presentes:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Não realiza diagnósticos médicos:</strong> Os assistentes virtuais não
                  realizam exames físicos, análises laboratoriais nem diagnósticos clínicos de
                  doenças ou gravidez.
                </li>
                <li>
                  <strong>Não prescreve medicamentos:</strong> As informações sobre métodos
                  contraceptivos ou tratamentos são gerais e não substituem a prescrição ou
                  aconselhamento clínico individualizado por um profissional de saúde.
                </li>
                <li>
                  <strong>Dependência das informações fornecidas:</strong> As respostas automatizadas
                  baseiam-se apenas no texto ou áudio que partilhas durante a sessão e podem não
                  captar todos os detalhes da tua situação clínica pessoal.
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 07 */}
          <section
            id="urgencias-medicas"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-rose-200/90 bg-rose-50/30 shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-rose-100 text-rose-700 border border-rose-200">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-700">
                  Secção 07 • Aviso Importante
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Urgências Médicas e Situações que Exigem Atenção Profissional Imediata
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p className="font-semibold text-rose-950">
                O SAAJ Virtual não é um serviço de atendimento médico de urgência nem de intervenção
                imediata em situações de perigo.
              </p>
              <p>
                Se estiveres a enfrentar sintomas graves ou súbitos (como hemorragia intensa, dor
                severa, febre alta, complicações na gravidez), situações de violência física ou
                sexual, abuso, coacção ou sofrimento emocional agudo com risco para a tua integridade,{" "}
                <strong>não aguardes por uma resposta na plataforma nem por uma marcação futura</strong>:
                dirige-te imediatamente ao centro de saúde, hospital ou serviço de apoio e protecção
                mais próximo, ou pede ajuda imediata a um adulto ou profissional de confiança.
              </p>
            </div>
          </section>

          {/* SECTION 08 */}
          <section
            id="conversas-texto"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-rose-50 text-manuela-600 border border-rose-100">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-manuela-600">
                  Secção 08
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Disponibilidade das Conversas por Texto
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                A funcionalidade de conversa por texto está disponível em todas as áreas de serviço
                do SAAJ Virtual (<strong>Maxixe</strong>, <strong>Massinga</strong> e{" "}
                <strong>Geral</strong>) através da interface <strong>ConvoCore</strong> ligada ao
                motor conversacional <strong>Voiceflow</strong>.
              </p>
              <p>
                O funcionamento das conversas por texto requer ligação activa à internet. Podes
                limpar a qualquer momento o histórico local de conversas guardado no teu dispositivo
                através da área <strong>Mais</strong>.
              </p>
            </div>
          </section>

          {/* SECTION 09 */}
          <section
            id="interaccoes-voz"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-50 text-tonito-600 border border-blue-100">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-tonito-600">
                  Secção 09
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Disponibilidade das Interacções por Voz em Maxixe e Massinga
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                As chamadas de voz estão disponíveis exclusivamente para utilizadores que seleccionem
                os distritos de <strong>Maxixe</strong> ou <strong>Massinga</strong> (Província de
                Inhambane), através de quatro assistentes de produção na plataforma{" "}
                <strong>Vapi</strong>: <code>Tonito Maxixe</code>, <code>Tonito Massinga</code>,{" "}
                <code>Manuela Maxixe</code> e <code>Manuela Massinga</code>.
              </p>
              <p>
                Para realizar uma chamada de voz, precisas de autorizar o acesso ao microfone do teu
                telemóvel ou navegador e dispor de uma ligação de internet estável. Conforme
                detalhado na{" "}
                <Link
                  href="/privacy#chamadas-voz"
                  className="font-semibold text-tonito-600 hover:text-tonito-700 underline underline-offset-2"
                >
                  Secção 04 da Política de Privacidade
                </Link>
                , as chamadas de voz são gravadas e geram transcrições integrais conservadas na Vapi,
                sendo determinados dados estruturados e resumos transferidos via n8n para o Airtable
                para funcionamento e monitoria do serviço.
              </p>
            </div>
          </section>

          {/* SECTION 10 */}
          <section
            id="marcacoes-encaminhamentos"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                  Secção 10
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Marcação de Consultas e Encaminhamentos para Unidades SAAJ Participantes
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                A funcionalidade de agendamento digital de consultas e encaminhamento assistido na
                plataforma está disponível para as unidades SAAJ participantes nos distritos de{" "}
                <strong>Maxixe</strong> e <strong>Massinga</strong>, utilizando o sistema{" "}
                <strong>Cal.com</strong> e os fluxos operacionais integrados.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Sujeição à disponibilidade real da unidade sanitária:</strong> A realização
                  de um pedido de agendamento está sujeita aos horários e vagas efectivamente
                  disponíveis na unidade sanitária SAAJ. O SAAJ Virtual não garante disponibilidade
                  imediata em qualquer horário pretendido.
                </li>
                <li>
                  <strong>Exactidão dos dados de marcação:</strong> Para que a unidade SAAJ possa
                  receber a tua marcação e enviar eventuais confirmações ou lembretes, deves fornecer
                  dados verdadeiros e actualizados (como o teu nome e número de telefone).
                </li>
                <li>
                  <strong>Outras localizações em Moçambique:</strong> Caso te encontres fora de Maxixe
                  ou Massinga, podes procurar atendimento directamente na unidade sanitária ou SAAJ
                  presencial mais próximo da tua área de residência.
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 11 */}
          <section
            id="gratuitidade-custos"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-50 text-tonito-600 border border-blue-100">
                <Wifi className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-tonito-600">
                  Secção 11
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Utilização Gratuita do Serviço e Custos de Dados Móveis ou Telecomunicações
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                O acesso e a utilização do <strong>SAAJ Virtual</strong> (incluindo conversas por
                texto, chamadas de voz na aplicação e agendamento de consultas SAAJ) são{" "}
                <strong>totalmente gratuitos</strong> para os utilizadores. Nenhum assistente ou
                elemento da plataforma solicitará pagamentos para prestar orientação ou marcar uma
                consulta SAAJ.
              </p>
              <p>
                Contudo, como o SAAJ Virtual funciona através da internet, o acesso à página web ou à
                aplicação móvel (especialmente durante chamadas de voz em tempo real) consome tráfego
                de dados de internet, podendo estar sujeito aos custos normais de dados móveis ou
                telecomunicações aplicados pela tua operadora telefónica.
              </p>
            </div>
          </section>

          {/* SECTION 12 */}
          <section
            id="utilizacao-responsavel"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 border border-slate-200">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Secção 12
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Utilização Responsável da Plataforma
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Para que o SAAJ Virtual continue disponível e seguro para todos os adolescentes e
                jovens, comprometes-te a utilizar a plataforma de forma responsável, abstendo-te de:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  Efectuar marcações de consultas falsas ou repetidas que ocupem indevidamente vagas
                  destinadas a outros jovens nas unidades sanitárias;
                </li>
                <li>
                  Introduzir números de telefone ou dados pessoais de terceiros sem o seu
                  conhecimento ou autorização;
                </li>
                <li>
                  Tentar comprometer a segurança informática, interferir com as APIs e serviços de
                  voz/chat ou utilizar sistemas automatizados para sobrecarregar a plataforma.
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 13 */}
          <section
            id="privacidade-dados"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                  Secção 13
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Privacidade e Tratamento de Informações Pessoais
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                A recolha, conservação e utilização de dados pessoais e informações relacionadas com
                a saúde no SAAJ Virtual — incluindo o funcionamento das conversas por texto
                (ConvoCore e Voiceflow), a gravação de áudio e retenção de transcrições integrais nas
                chamadas de voz (Vapi), a transferência de dados estruturados e resumos para o
                Airtable (via n8n), as marcações no Cal.com e o exercício dos teus direitos —
                encontram-se descritas em detalhe na nossa Política de Privacidade.
              </p>
              <div className="pt-1">
                <Link
                  href="/privacy"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100/80 text-tonito-700 border border-blue-100 font-semibold text-xs transition-colors active-press"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Consultar a Política de Privacidade do SAAJ Virtual (/privacy)</span>
                </Link>
              </div>
            </div>
          </section>

          {/* SECTION 14 */}
          <section
            id="disponibilidade-tecnica"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-700">
                  Secção 14
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Disponibilidade Técnica, Interrupções e Limitações do Serviço
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                O funcionamento do SAAJ Virtual depende da qualidade da ligação à internet do
                utilizador e da disponibilidade técnica de serviços externos de conversação, voz e
                agendamento (incluindo ConvoCore, Voiceflow, Vapi, Cal.com, n8n, Airtable e Vercel).
              </p>
              <p>
                Podem ocorrer interrupções temporárias para manutenção técnica, actualizações de
                conteúdos ou falhas de rede. Quando uma funcionalidade digital (como chamadas de voz
                ou agendamento online) estiver temporariamente indisponível, recomendamos tentar
                novamente mais tarde ou procurar directamente a unidade sanitária SAAJ mais próxima.
              </p>
            </div>
          </section>

          {/* SECTION 15 */}
          <section
            id="responsabilidades-institucionais"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-50 text-tonito-600 border border-blue-100">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-tonito-600">
                  Secção 15
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Responsabilidades Institucionais Aplicáveis
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                No âmbito do projecto <em>Futuros com Escolha</em>, as entidades participantes actuam
                segundo as respectivas atribuições:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Ministério da Saúde (MISAU):</strong> enquadramento institucional de saúde
                  pública e normas aplicáveis aos Serviços Amigos dos Adolescentes e Jovens nas
                  unidades sanitárias;
                </li>
                <li>
                  <strong>Pathfinder International:</strong> parceria de implementação e coordenação
                  operacional do projecto;
                </li>
                <li>
                  <strong>Cooperação Irlandesa (Irish Aid):</strong> apoio financeiro ao projecto;
                </li>
                <li>
                  <strong>NCAI Consultorias e Serviços, EI:</strong> desenvolvimento tecnológico e
                  suporte técnico da plataforma digital, não sendo proprietária institucional do
                  projecto nem prestadora de cuidados clínicos de saúde.
                </li>
              </ul>
              <p>
                As responsabilidades formais de cada instituição regem-se pelos acordos
                institucionais aplicáveis ao projecto e pelas normas legais vigentes na República de
                Moçambique.
              </p>
            </div>
          </section>

          {/* SECTION 16 */}
          <section
            id="alteracoes-termos"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 border border-slate-200">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Secção 16
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Alterações aos Termos e Condições
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Estes Termos e Condições podem ser actualizados para reflectir melhorias no serviço,
                alargamento a novos distritos ou unidades sanitárias, alterações técnicas ou
                orientações institucionais aprovadas pelos parceiros do projecto. Sempre que o
                documento for actualizado, a nova versão será publicada nesta página (`/terms`) com a
                respectiva data de entrada em vigor actualizada.
              </p>
            </div>
          </section>

          {/* SECTION 17 */}
          <section
            id="contactos"
            className="scroll-mt-20 glass-card rounded-3xl p-6 sm:p-8 border border-slate-900/[0.06] shadow-soft space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                  Secção 17
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Canais de Contacto Aprovados e Data de Entrada em Vigor
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
                Para pedidos de esclarecimento sobre estes Termos e Condições ou sobre o
                funcionamento do SAAJ Virtual, deverão ser utilizados os canais institucionais
                aprovados no âmbito do projecto:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Coordenação Institucional
                  </span>
                  <span className="font-medium text-slate-800 block">
                    Ministério da Saúde (MISAU) e Pathfinder International — Projecto{" "}
                    <em>Futuros com Escolha</em> (com suporte técnico da NCAI Consultorias e
                    Serviços, EI)
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Correio Electrónico Oficial
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
                    Linha dedicada de apoio ao utilizador e questões de privacidade do SAAJ Virtual,
                    disponibilizada após activação operacional oficial.
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
              href="/privacy"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-200 shadow-2xs transition-all active-press"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Ler Política de Privacidade</span>
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
