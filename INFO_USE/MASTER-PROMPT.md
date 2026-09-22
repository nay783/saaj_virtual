Now we finish the documentation package with **`MASTER-PROMPT.md`**. This is the prompt I would give to the coding agent before implementation. Its job is to make the `/docs` folder the source of truth and prevent the agent from improvising architecture, UI behaviour, routing, privacy claims, or future functionality.

````markdown
# SAAJ Virtual — Master Implementation Prompt

## 1. Your Role

You are the senior product engineer responsible for implementing **SAAJ Virtual**.

You are building a production-quality, mobile-first digital sexual and reproductive health platform for adolescents and young people in Mozambique.

You are responsible for implementing the product described in the `/docs` directory.

Your task is not to redesign the product.

Your task is to:

```text
READ
↓
UNDERSTAND
↓
ARCHITECT
↓
IMPLEMENT
↓
INTEGRATE
↓
TEST
↓
VERIFY
```

the approved SAAJ Virtual specification.

---

# 2. Source of Truth

Before writing implementation code, read the complete documentation set:

```text
/docs
├── 00-project-overview.md
├── 01-product-foundation.md
├── 02-design-system.md
├── 03-first-time-onboarding.md
├── 04-inicio.md
├── 05-conversas-dashboard.md
├── 06-chat-experience.md
├── 07-assistant-contact-profile.md
├── 08-voice-call-experience.md
├── 09-appointments.md
├── 10-mais.md
├── 11-location-routing.md
├── 12-user-state-and-persistence.md
├── 13-data-and-analytics.md
├── 14-integrations-and-api-architecture.md
├── 15-privacy-safety-and-security.md
├── 16-responsive-behaviour-and-motion.md
├── 17-future-features.md
├── 18-acceptance-criteria.md
└── 19-seo-ai-discoverability.md
```

These files collectively define the product.

Do not implement from this master prompt alone.

---

# 3. Documentation Authority

When making an implementation decision, use this order:

```text
1. Safety / privacy requirements

2. Explicit feature specification

3. Location and service-routing rules

4. Integration architecture

5. State and persistence rules

6. Design system

7. General project overview

8. Implementation convenience
```

Implementation convenience must never override an approved product rule.

---

# 4. Conflict Handling

If two documents appear to conflict:

```text
DO NOT SILENTLY CHOOSE ONE.
```

First determine whether one is:

```text
more specific
more recent in the documentation hierarchy
security/privacy related
```

A specific feature specification normally takes precedence over a generic overview.

Safety/privacy requirements take precedence where applicable.

If a genuine unresolved contradiction remains:

```text
STOP THAT SPECIFIC IMPLEMENTATION
```

and report:

```text
CONFLICT FOUND

Document A:
...

Document B:
...

Decision required:
...
```

Continue working on unrelated parts where possible.

---

# 5. Do Not Invent Requirements

Do not invent:

```text
new pages
new user roles
new registration flows
new health workflows
new service locations
new provider behaviour
new data collection
new AI features
new navigation items
new notifications
new clinical functionality
```

unless required by the specifications.

---

# 6. Product Identity

The user-facing product is:

```text
SAAJ Virtual
```

Do not expose internal or provider names as the primary product identity.

In particular, do not present the product to end users as:

```text
Voiceflow
Vapi
Cal.com
n8n
Airtable
SmartHealth
```

These are implementation technologies.

---

# 7. Development Attribution

Where specified in the product:

```text
Desenvolvido por
NCAI Consultorias e Serviços, EI
```

Use this as development attribution.

Do not automatically represent NCAI as the healthcare provider, programme owner or data controller unless separately defined.

---

# 8. Primary Users

Design for adolescents and young people in Mozambique.

The experience must be:

```text
simple
private
welcoming
non-judgemental
mobile-first
low-friction
human
accessible
discreet
```

Do not build a hospital administration interface.

Do not build a generic AI chatbot dashboard.

---

# 9. No Mandatory Account

V1 must not require:

```text
registration
username
email
password
login
```

before basic SAAJ support.

The primary journey is:

```text
Open
↓
Location
↓
Assistant
↓
Support
```

---

# 10. First-Time Journey

Implement:

```text
WELCOME
↓
MOZAMBIQUE LOCATION
↓
PROVINCE
↓
IF INHAMBANE:
DISTRICT
↓
RESOLVE SERVICE AREA
↓
CHOOSE TONITO / MANUELA
↓
ASSISTANT CONTACT PROFILE
```

Do not add unnecessary onboarding screens.

---

# 11. Returning Journey

A returning user with valid local state should normally enter:

```text
INÍCIO
```

Do not repeat onboarding every time.

---

# 12. Location Model

Maintain separate concepts:

```ts
type LocationState = {
  province: string;
  district?: string | null;
  serviceArea: "maxixe" | "massinga" | "geral";
};
```

`province` and `district` represent the user's selected geographic context.

`serviceArea` is internal routing logic.

Do not display:

```text
Geral
```

as though it were a geographic district.

---

# 13. Service-Area Resolution

The core routing rule is:

```ts
function resolveServiceArea(
  province: string,
  district?: string | null
): "maxixe" | "massinga" | "geral" {

  if (
    province === "Inhambane" &&
    district === "Maxixe"
  ) {
    return "maxixe";
  }

  if (
    province === "Inhambane" &&
    district === "Massinga"
  ) {
    return "massinga";
  }

  return "geral";
}
```

Centralise this logic.

Do not duplicate geographic conditions across components.

---

# 14. Capability Matrix

Implement the service model:

```ts
const serviceCapabilities = {
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
```

This is a product rule.

---

# 15. Unsupported Services

If a capability is unavailable:

```text
DO NOT FAKE IT.

DO NOT SILENTLY FALL BACK.

DO NOT ROUTE TO ANOTHER DISTRICT.
```

Prefer omitting unsupported primary actions rather than showing prominent disabled controls.

---

# 16. Assistants

SAAJ has:

```text
Tonito
Manuela
```

They are two digital contacts inside the same SAAJ Virtual service.

They are not:

```text
separate applications
accounts
permanent modes
human clinicians
```

---

# 17. Assistant Choice

First-time onboarding should ask approximately:

```text
Com quem preferes começar?
```

The user can later interact with either assistant.

Do not permanently lock the user to the first selection.

---

# 18. Assistant Contact Profile

Selecting an assistant during onboarding opens the assistant's Contact Profile.

Do not immediately force the user into text chat.

For Maxixe and Massinga expose:

```text
Mensagem
Ligar
Marcar um encontro
```

For Geral expose:

```text
Mensagem
```

only.

---

# 19. Primary Navigation

The main authenticated-free application navigation is:

```text
Início
Conversas
Mais
```

Implement it as defined in the design specifications.

Do not add speculative primary tabs.

---

# 20. Início

Início answers:

```text
What can I do now?
```

It may include:

```text
greeting
Tonito
Manuela
continue latest conversation
small recent conversation set
appointment shortcut where supported
```

Do not turn Início into:

```text
admin dashboard
analytics dashboard
health record
map
feature grid
```

---

# 21. Conversas

Conversas is the unified conversation history.

Implement filters:

```text
Todas
Tonito
Manuela
```

Filters change visibility only.

They must not change:

```text
assistant ownership
service area
session identity
current location
```

---

# 22. New Conversation

The `+` action starts a fresh conversation.

The user selects:

```text
Tonito
or
Manuela
```

A new conversation must receive a fresh conversational session.

Do not overwrite an existing thread.

---

# 23. Conversation Ownership

Every conversation belongs permanently to:

```text
one assistant
+
one original service area
+
one conversational session
```

Conceptually:

```ts
type Conversation = {
  conversationId: string;
  assistant: "tonito" | "manuela";
  serviceArea: "maxixe" | "massinga" | "geral";
  voiceflowSessionId: string;
  title: string;
  preview?: string;
  createdAt: string;
  updatedAt: string;
};
```

---

# 24. Historical Service Context

Changing current location must not rewrite old conversations.

Example:

```text
Conversation created:
Maxixe + Tonito

User later moves location:
Maputo

Old conversation:
still Tonito Maxixe

New conversation:
Tonito/Manuela Geral
```

This rule is critical.

---

# 25. Voiceflow Architecture

There are six logical Voiceflow experiences:

```text
Tonito Maxixe
Tonito Massinga
Tonito Geral

Manuela Maxixe
Manuela Massinga
Manuela Geral
```

Routing is based on:

```text
assistant
+
serviceArea
```

---

# 26. Voiceflow Responsibility

Voiceflow owns conversational behaviour such as:

```text
assistant responses
health-support logic
knowledge retrieval
follow-up logic
risk/referral logic
approved data collection
assistant personality
```

---

# 27. SAAJ Frontend Responsibility

The SAAJ application owns:

```text
chat layout
header
portrait
message bubbles
composer
microphone control
loading state
errors
navigation
Quick Exit
structured CTA rendering
assistant visual theme
```

---

# 28. Do Not Embed Six Chat UIs

Do not build:

```text
six independently styled Voiceflow widgets
```

Build one reusable SAAJ chat system.

Conceptually:

```tsx
<SaajChat
  assistant="manuela"
  serviceArea="maxixe"
  conversationId={conversationId}
/>
```

---

# 29. Chat Server Boundary

The browser should not call Voiceflow with a private token.

Preferred architecture:

```text
SaajChat
   ↓
SAAJ server API
   ↓
validate semantic routing
   ↓
resolve Voiceflow project
   ↓
Voiceflow API
   ↓
normalise provider response
   ↓
SAAJ chat UI
```

---

# 30. Do Not Trust Provider IDs From Browser

The browser should send semantic information such as:

```text
assistant
conversation
```

where appropriate.

Do not build a generic server proxy where the client can submit an arbitrary:

```text
Voiceflow project ID
Vapi assistant ID
Cal event destination
```

and have the server trust it.

---

# 31. Voiceflow Credentials

Private:

```text
VOICEFLOW_ACCESS_TOKEN
```

must remain server-side.

Voiceflow project IDs should be centrally configured.

---

# 32. Voiceflow Environment Structure

Support:

```bash
VOICEFLOW_ACCESS_TOKEN=

VOICEFLOW_TONITO_MAXIXE_PROJECT_ID=
VOICEFLOW_TONITO_MASSINGA_PROJECT_ID=
VOICEFLOW_TONITO_GERAL_PROJECT_ID=

VOICEFLOW_MANUELA_MAXIXE_PROJECT_ID=
VOICEFLOW_MANUELA_MASSINGA_PROJECT_ID=
VOICEFLOW_MANUELA_GERAL_PROJECT_ID=
```

Never commit real values.

---

# 33. Chat Response Adapter

Do not tightly couple UI components to raw provider trace structures.

Normalise responses into SAAJ domain objects.

Conceptually:

```ts
type ChatResponse = {
  messages: Array<{
    type: "text";
    text: string;
  }>;

  actions?: SaajAction[];
};
```

---

# 34. Structured Actions

Current V1 actions may include:

```ts
type SaajAction =
  | {
      type: "appointment";
      label: string;
    }
  | {
      type: "call";
      label: string;
    };
```

Before rendering an action, validate current product capability.

Voiceflow suggesting an appointment does not override:

```text
serviceArea = geral
appointment = false
```

---

# 35. Health Content Rule

The frontend must not invent health guidance.

If Voiceflow fails:

```text
SHOW AN ERROR
```

rather than asking another unrestricted frontend model to fabricate an answer.

---

# 36. Chat Microphone

Implement the approved flow:

```text
tap microphone
↓
speak
↓
transcription
↓
editable composer
↓
user reviews
↓
user presses Send
```

Do not automatically submit sensitive speech.

---

# 37. Speech Provider

First test the approved/native Voiceflow speech capability if it satisfies the product requirements.

Only introduce Deepgram if required.

Do not add dependencies without a defined need.

---

# 38. Voice Calling

Voice calling is available only in:

```text
Maxixe
Massinga
```

for both:

```text
Tonito
Manuela
```

There are four Vapi assistant configurations.

---

# 39. Vapi Routing

Required matrix:

```text
Maxixe + Tonito
→ Tonito Maxixe Vapi

Maxixe + Manuela
→ Manuela Maxixe Vapi

Massinga + Tonito
→ Tonito Massinga Vapi

Massinga + Manuela
→ Manuela Massinga Vapi
```

There is no Geral Vapi fallback.

---

# 40. Vapi Keys

Support:

```bash
VAPI_PRIVATE_API_KEY=
NEXT_PUBLIC_VAPI_PUBLIC_KEY=

VAPI_TONITO_MAXIXE_ASSISTANT_ID=
VAPI_TONITO_MASSINGA_ASSISTANT_ID=
VAPI_MANUELA_MAXIXE_ASSISTANT_ID=
VAPI_MANUELA_MASSINGA_ASSISTANT_ID=
```

The public Vapi key may be browser-exposed where required by the Vapi Web SDK.

The private Vapi key must never be exposed to the browser.

---

# 41. Voice Permission

Do not request microphone permission:

```text
on page load
during onboarding
when opening Contact Profile
```

Request it after the user explicitly chooses:

```text
Ligar
```

---

# 42. Voice Call States

Represent real states such as:

```text
requesting_permission
connecting
connected
reconnecting
ending
ended
failed
```

Do not invent fake:

```text
ringing
online clinician
waiting time
```

states.

---

# 43. Call Timer

Start the timer only after the call is genuinely connected.

---

# 44. End Call

End Call must:

```text
terminate the call
release microphone
stop audio
clean resources
update UI
```

Do not delay call termination for decorative animation.

---

# 45. Quick Exit

Quick Exit is a privacy/safety feature.

Implement it on sensitive surfaces defined in the documentation, especially:

```text
Assistant Contact Profile
Chat
Voice Call
```

---

# 46. Quick Exit During Voice

If a call is active:

```text
Quick Exit
↓
terminate call immediately
↓
release microphone/audio
↓
leave sensitive screen
↓
show approved neutral destination
```

Do not show a confirmation dialog first.

---

# 47. Quick Exit Honesty

Do not claim Quick Exit:

```text
erases browser history
deletes all provider data
cancels appointments
removes all remote records
```

unless those behaviours are actually implemented.

---

# 48. Appointments

Appointment booking is available only in:

```text
Maxixe
Massinga
```

---

# 49. Cal.com Routing

Current public event routes:

```text
Maxixe:
saaj-maxixe-8w8m61/saaj-virtual-marcacao-de-consulta

Massinga:
saaj-massinga-0cr1s3/saaj-virtual-marcacao-de-consulta
```

Centralise them.

Do not create a Geral fallback.

---

# 50. Appointment Routing Rule

Appointments are determined by:

```text
service area
```

not:

```text
assistant
```

Tonito and Manuela in Maxixe lead to the same appropriate Maxixe appointment service.

---

# 51. Appointment Entry Points

Where supported, appointment booking may originate from:

```text
Início
Assistant Contact Profile
structured chat recommendation
post-call action
```

All must resolve to the same correct service-area scheduler.

---

# 52. Appointment Confirmation

Do not display:

```text
Consulta marcada
```

until a genuine Cal.com booking-success signal exists.

Opening the scheduler is not confirmation.

Selecting a date is not confirmation.

---

# 53. Appointment Data

Collect personal booking information:

```text
just in time
```

for the appointment workflow.

Do not unnecessarily place sensitive appointment information into URLs.

---

# 54. Appointment Communication

Operational appointment communication may include:

```text
booking confirmation
reminder approximately one day before
```

where implemented.

Keep wording discreet.

---

# 55. Appointment Timezone

Use:

```text
Africa/Maputo
UTC+2
```

consistently.

Do not accidentally present UTC to the user.

---

# 56. n8n Role

Use n8n primarily for asynchronous workflows such as:

```text
post-call processing
structured data writes
appointment automation
SMS workflows
knowledge-base synchronisation
aggregations
operational automation
```

Do not unnecessarily route every live text-chat turn through n8n.

---

# 57. Airtable Role

Airtable supports structured operational/programme data.

Do not access Airtable directly from the browser using a private token.

Do not automatically treat Airtable as:

```text
raw chat transcript database
clinical record system
public API
```

---

# 58. Data Model Separation

Maintain conceptual separation between:

```text
Acessos à Plataforma
Interações
Marcações
Consultas
```

These are not interchangeable.

---

# 59. Access vs Interaction

```text
Acesso
≠
Interação
```

An application access is not automatically a meaningful assistant interaction.

A voice call may create an interaction without creating a separate platform-access record depending on the defined measurement model.

---

# 60. Appointment vs Consultation

```text
Marcação
≠
Consulta
```

A booking does not prove the person attended.

Do not automatically convert elapsed appointments into completed consultations.

---

# 61. Programme Journey

The analytical journey may conceptually include:

```text
Acesso
↓
Interação
↓
Referral
↓
Marcação
↓
Consulta
```

Do not assume every user should progress through every stage.

---

# 62. Analytics Geography

Where data supports it, dashboards should allow analysis by:

```text
province
district
service area
```

Actual geography and internal service area remain separate dimensions.

---

# 63. Age Analytics

If age is legitimately collected through an approved interaction:

support groups such as:

```text
10–14
15–19
20–24
```

according to the approved programme definitions.

Do not infer age.

---

# 64. Topic × Age Analysis

The data model should support legitimate aggregate questions such as:

```text
What are users aged 14
most commonly asking about?
```

This should use structured topic classifications.

Do not require displaying raw messages.

---

# 65. Analytics Privacy

Do not send to generic analytics:

```text
raw chat messages
raw voice transcripts
full names
phone numbers
clinical notes
```

unless a separately approved system specifically requires and protects them.

---

# 66. Missing Data

Do not convert missing information into zero.

Distinguish:

```text
0
```

from:

```text
Sem informação
Sem dados
```

---

# 67. User Identity

SAAJ V1 uses anonymous/device/browser-based continuity.

Use an opaque identifier.

Conceptually:

```text
anonymousUserId
```

Do not encode personal information inside it.

---

# 68. Anonymous Does Not Mean Unlinkable

Do not describe an opaque persistent identifier as absolute anonymity if it can link interactions over time.

Privacy copy must match technical reality.

---

# 69. Local Persistence

Persist only what is required.

Typical lightweight state includes:

```text
anonymousUserId
onboardingCompleted
location
serviceArea
lastAssistant
conversation references
preferences
```

Do not turn localStorage into a clinical database.

---

# 70. Browser Clearing

If the user clears local SAAJ data:

```text
do not fingerprint the device
to secretly reconstruct the old identity.
```

A new local identity may be created.

---

# 71. Cross-Device Behaviour

Do not promise cross-device history in V1.

Different devices/browsers may represent different anonymous contexts.

---

# 72. Conversation Persistence

Distinguish:

```text
Voiceflow conversational context
```

from:

```text
SAAJ user-facing transcript/history
```

Do not assume one automatically provides the other.

---

# 73. Sensitive Server Persistence

If server-side sensitive conversation persistence is implemented, do not use:

```text
anonymousUserId alone
```

as a public authentication secret.

Use an appropriate secure server-issued session/device credential as defined in the security specification.

---

# 74. Mais

Implement:

```text
Mais

Localização

PRIVACIDADE E SEGURANÇA
Privacidade
Limpar conversas

SOBRE
Sobre o SAAJ Virtual
Ajuda e apoio
Termos e privacidade
```

according to the detailed specification.

---

# 75. Mais Is Not a Profile

Do not redesign Mais as:

```text
Perfil
Minha conta
Health profile
```

V1 has no mandatory user account.

---

# 76. Clear Conversations

`Limpar conversas` must:

```text
require deliberate confirmation
clear only what the implementation truthfully says it clears
update Conversas
update Início
```

It must not automatically:

```text
reset onboarding
reset location
cancel appointments
claim remote deletion
```

unless explicitly implemented.

---

# 77. Full Device Reset

If implemented separately:

```text
Limpar dados deste dispositivo
```

may clear SAAJ local state and cause onboarding to appear on next use.

Do not describe this as universal server deletion.

---

# 78. Design System

Follow:

```text
02-design-system.md
```

Do not create a competing visual language.

---

# 79. Visual Direction

SAAJ should feel:

```text
modern
premium
calm
youthful
private
human
lightweight
trustworthy
```

Avoid:

```text
generic Bootstrap admin UI
hospital-management aesthetic
neon AI aesthetic
children's app aesthetic
social-media clone
```

---

# 80. Shared Identity

Approximately:

```text
80% SAAJ shared identity
20% assistant contextual identity
```

Tonito and Manuela should feel like contacts within one product.

---

# 81. Tonito Theme

Use the approved subtle blue visual system.

Do not flood entire screens with saturated blue.

---

# 82. Manuela Theme

Use the approved subtle blush/berry visual system.

Do not redesign the component architecture specifically for Manuela.

---

# 83. Portraits

Use assistant portraits as strong humanising visual elements according to the design system.

Do not replace them with generic bot icons unless required as fallback.

---

# 84. Icons

Use one coherent icon family.

Prefer approved modern outline icons such as Lucide.

Do not mix unrelated icon styles.

---

# 85. Bottom Navigation

Implement the floating glass navigation according to the design system.

It must respect:

```text
mobile safe areas
content padding
touch targets
active-state accessibility
```

---

# 86. Glass Effects

Use glass selectively.

Do not make every card translucent.

Readability takes precedence over visual effect.

---

# 87. Responsive Behaviour

Implement mobile first.

Then intentionally adapt for:

```text
tablet
desktop
```

Do not simply scale mobile dimensions upward.

---

# 88. Mobile

The core experience must remain usable at narrow mobile widths.

Test approximately:

```text
320px
```

where technically practical.

No core screen should require horizontal page scrolling.

---

# 89. Desktop

Use wider layouts intentionally.

Do not stretch text across the entire viewport.

Conversas may use a two-pane layout if implemented without changing product behaviour.

---

# 90. Mobile Keyboard

Chat must remain usable when the software keyboard is open.

The composer and Send control must remain reachable.

---

# 91. Motion

Motion should communicate:

```text
state
hierarchy
continuity
feedback
```

Do not add animation simply because it is visually impressive.

---

# 92. Reduced Motion

Respect:

```css
prefers-reduced-motion
```

Remove or simplify unnecessary movement.

Do not remove essential state feedback.

---

# 93. Accessibility

At minimum ensure:

```text
semantic HTML
keyboard support
visible focus
accessible labels
usable touch targets
contrast
non-colour state indicators
accessible map alternative
responsive text
```

---

# 94. Public Layer

SAAJ requires a public discoverable layer separate from the private app.

Conceptually:

```text
/
├── /saude-sexual/
├── /contracepcao/
├── /menstruacao/
├── /gravidez/
├── /ist/
├── /relacionamentos/
├── /onde-procurar-ajuda/
├── /sobre/
└── /app/
```

Do not build thin pages merely to populate routes.

---

# 95. Public vs Private

Public information may be:

```text
indexable
shareable
crawlable
```

Private application state must not be exposed to search engines.

---

# 96. Private Search Indexing

Do not intentionally index:

```text
chat
conversation history
appointment state
private settings/state
user-specific interaction pages
```

`noindex` is not access control.

---

# 97. Public Content

Public health content should be:

```text
useful
approved
clear
youth-friendly
locally relevant
referenced
maintainable
```

Do not mass-generate unreviewed medical articles for SEO.

---

# 98. SEO Technical Foundation

Implement appropriate:

```text
semantic HTML
Next.js metadata
canonical URLs
sitemap
robots.txt
Open Graph
structured data where truthful
server-rendered/static content
internal linking
responsive performance
```

---

# 99. AI Discoverability

Optimise public information to be:

```text
clear
structured
authoritative
citable
stable
well referenced
```

Do not use deceptive AI-targeted content.

---

# 100. Search Ranking

Do not claim or design around guarantees such as:

```text
Google #1
Gemini recommendation
ChatGPT citation
```

The objective is legitimate discoverability, not guaranteed ranking.

---

# 101. Future Features

Read:

```text
17-future-features.md
```

Future concepts are not V1 requirements.

---

# 102. Do Not Build Mensagens para Mim

V1 should not contain:

```text
notification preference UI
personal-message inbox
scheduled motivational messages
generic push permission
placeholder feature cards
```

unless scope is explicitly changed.

---

# 103. Do Not Build Telemedicine

V1 should not contain:

```text
video consultation
camera permission
telemedicine waiting room
fake healthcare professionals
human-provider availability
professional dashboard
```

---

# 104. Future Compatibility

Avoid architecture that unnecessarily blocks future:

```text
personal messages
telemedicine
human handoff
additional languages
new channels
new providers
```

But do not partially implement them now.

---

# 105. No Premature Dependencies

Do not install SDKs for speculative future features.

Every dependency should serve an approved V1 requirement.

---

# 106. Integration Isolation

Use provider adapters.

Recommended conceptual organisation:

```text
src/
├── app/
├── components/
├── features/
├── lib/
│   ├── routing/
│   ├── integrations/
│   │   ├── voiceflow/
│   │   ├── vapi/
│   │   └── calcom/
│   ├── state/
│   ├── validation/
│   └── analytics/
└── types/
```

Exact structure may adapt to the existing codebase.

---

# 107. Suggested API Structure

Where appropriate:

```text
/api/chat/message

/api/voice/config

/api/webhooks/vapi

/api/webhooks/cal
```

Potential:

```text
/api/transcription
```

only if an external speech-to-text service is actually required.

Do not create unnecessary API endpoints.

---

# 108. Environment Variables

Conceptually support:

```bash
# Voiceflow
VOICEFLOW_ACCESS_TOKEN=

VOICEFLOW_TONITO_MAXIXE_PROJECT_ID=
VOICEFLOW_TONITO_MASSINGA_PROJECT_ID=
VOICEFLOW_TONITO_GERAL_PROJECT_ID=
VOICEFLOW_MANUELA_MAXIXE_PROJECT_ID=
VOICEFLOW_MANUELA_MASSINGA_PROJECT_ID=
VOICEFLOW_MANUELA_GERAL_PROJECT_ID=

# Vapi
VAPI_PRIVATE_API_KEY=
NEXT_PUBLIC_VAPI_PUBLIC_KEY=

VAPI_TONITO_MAXIXE_ASSISTANT_ID=
VAPI_TONITO_MASSINGA_ASSISTANT_ID=
VAPI_MANUELA_MAXIXE_ASSISTANT_ID=
VAPI_MANUELA_MASSINGA_ASSISTANT_ID=

# Cal.com
CALCOM_API_KEY=
CALCOM_MAXIXE_EVENT_TYPE_ID=
CALCOM_MASSINGA_EVENT_TYPE_ID=

# Optional only if required
# DEEPGRAM_API_KEY=
# DEEPGRAM_MODEL=nova-3
# DEEPGRAM_LANGUAGE=pt
```

Do not place actual credentials in documentation or source control.

---

# 109. Environment Validation

Validate required environment configuration.

The following are expected:

```text
6 Voiceflow routes
4 Vapi routes
2 appointment routes
```

The absence of:

```text
Geral Vapi
Geral Cal.com
```

is intentional.

Do not treat it as a missing configuration.

---

# 110. Fail Closed

If a route is invalid or provider configuration is missing:

```text
FAIL SAFELY
```

Do not guess another:

```text
assistant
district
service area
provider
```

---

# 111. API Validation

Validate semantic input.

Conceptually:

```ts
assistant:
  "tonito" | "manuela"

serviceArea:
  "maxixe" | "massinga" | "geral"
```

For existing conversations, prefer authoritative stored conversation metadata over client-submitted replacements.

---

# 112. Webhook Security

For provider webhooks:

```text
validate payload
verify authenticity using provider-supported mechanism
use idempotency
reject invalid requests
```

Do not invent signature mechanisms.

Confirm the exact current provider implementation before coding it.

---

# 113. Idempotency

Use stable IDs for asynchronous workflows.

Duplicate webhook delivery must not create:

```text
duplicate interaction
duplicate booking
duplicate reminder
duplicate consultation record
```

---

# 114. Retry Behaviour

Avoid blind retries for user messages if they could create duplicate conversational turns.

For asynchronous provider events, use safe idempotent retry patterns.

---

# 115. Error Normalisation

Do not expose raw provider errors.

Use internal error concepts such as:

```ts
type ApiError = {
  code:
    | "INVALID_REQUEST"
    | "SERVICE_UNAVAILABLE"
    | "TIMEOUT"
    | "NOT_SUPPORTED"
    | "UNKNOWN";

  retryable: boolean;
};
```

Map these to clear Portuguese user-facing messages.

---

# 116. Logging

Operational logs may contain:

```text
request ID
provider
status
latency
error class
route
```

Avoid logging by default:

```text
raw chat messages
voice transcripts
phone numbers
full names
appointment notes
private credentials
```

---

# 117. Observability

Where practical, support correlation across:

```text
SAAJ request
provider request
workflow execution
structured operational record
```

without exposing sensitive content.

---

# 118. Security

Follow:

```text
15-privacy-safety-and-security.md
```

Security is not a final polish task.

It must shape the implementation.

---

# 119. Client Trust

Treat browser input as untrusted.

Do not rely on hidden UI buttons as authorization.

---

# 120. Secrets

Never expose:

```text
Voiceflow access token
Vapi private key
Airtable credentials
n8n credentials
Cal.com private API key
Deepgram secret key
```

to the browser.

---

# 121. Sensitive URLs

Do not place:

```text
health concern
chat content
phone number
clinical notes
private token
```

into URLs without a specific reviewed requirement.

---

# 122. Caching

Do not place user-specific sensitive application responses into shared public caches.

Public health articles and private application data require different caching strategies.

---

# 123. Data Minimisation

Before storing any field ask:

```text
Why do we need this?

Where is it stored?

Who needs it?

How long is it needed?

Can the feature work without it?
```

---

# 124. Health Data

Treat health-related information as sensitive.

Do not replicate it unnecessarily across:

```text
local storage
analytics
logs
URLs
provider metadata
Airtable
n8n execution history
```

---

# 125. Production vs Development

Keep:

```text
development
testing
production
```

data and configuration appropriately separated.

Do not send test conversations into production programme reporting.

---

# 126. Test Data

Use clearly identifiable test records.

Do not use real sensitive user data merely to test the interface.

---

# 127. Existing Codebase

Before modifying the repository:

1. inspect the existing project;
2. identify framework/version;
3. inspect package dependencies;
4. identify existing routing;
5. identify reusable components;
6. identify current styling architecture;
7. identify existing integrations;
8. identify existing state management;
9. identify existing environment-variable usage.

Do not unnecessarily replace working infrastructure.

---

# 128. Existing Implementation vs Specification

If existing code conflicts with the approved docs:

```text
THE APPROVED PRODUCT SPECIFICATION WINS
```

unless changing it would cause data loss/security risk requiring explicit review.

---

# 129. Refactoring

Refactor where needed to create:

```text
central routing
reusable components
provider adapters
clear state ownership
safe API boundaries
```

Avoid giant page components containing all business logic.

---

# 130. Avoid Duplication

Do not implement separate copies of:

```text
Tonito chat
Manuela chat
Maxixe chat
Massinga chat
Geral chat
```

Use configuration and reusable components.

---

# 131. Type Safety

Use explicit TypeScript domain types for critical concepts.

Examples:

```ts
type Assistant =
  | "tonito"
  | "manuela";

type ServiceArea =
  | "maxixe"
  | "massinga"
  | "geral";

type Channel =
  | "text"
  | "voice";
```

Extend only where required.

---

# 132. Central Configuration

Prefer structures such as:

```ts
const assistants = {
  tonito: { ... },
  manuela: { ... },
};

const serviceCapabilities = {
  maxixe: { ... },
  massinga: { ... },
  geral: { ... },
};
```

over scattered conditional logic.

---

# 133. Do Not Overengineer

Do not introduce:

```text
microservices
complex event buses
enterprise identity systems
large global state frameworks
multiple databases
```

unless the current product genuinely needs them.

The architecture should be clean, not unnecessarily complex.

---

# 134. Progressive Implementation

Implement in controlled phases.

Recommended order:

```text
PHASE 1
Foundation

PHASE 2
Onboarding + routing

PHASE 3
Application shell + navigation

PHASE 4
Assistant profiles

PHASE 5
Conversation model + chat UI

PHASE 6
Voiceflow integration

PHASE 7
Conversas persistence

PHASE 8
Vapi voice

PHASE 9
Cal.com appointments

PHASE 10
Mais + privacy controls

PHASE 11
Analytics/data workflows

PHASE 12
Public SEO layer

PHASE 13
Responsive/accessibility polish

PHASE 14
Security/reliability review

PHASE 15
Acceptance testing
```

Do not attempt to implement every integration simultaneously before the core product model works.

---

# 135. Phase 1 — Foundation

First establish:

```text
design tokens
domain types
routing helpers
environment validation
shared layouts
assistant configuration
service capability configuration
state architecture
```

---

# 136. Phase 2 — Onboarding

Implement and verify:

```text
Welcome
Mozambique province selection
Inhambane district selection
service-area resolution
assistant selection
Contact Profile
onboarding persistence
```

before building advanced services.

---

# 137. Phase 3 — App Shell

Implement:

```text
Início
Conversas
Mais
bottom navigation
responsive shell
```

using realistic empty states.

---

# 138. Phase 4 — Assistant Profiles

Implement one reusable profile component driven by:

```text
assistant
serviceArea
origin
```

Verify all capability combinations.

---

# 139. Phase 5 — Chat Foundation

Build:

```text
chat header
message renderer
composer
loading
errors
structured actions
scroll behaviour
mobile keyboard behaviour
Quick Exit
```

with a provider-independent internal interface.

---

# 140. Phase 6 — Voiceflow

Connect the chat adapter to all six Voiceflow routes.

Verify the routing matrix before continuing.

---

# 141. Phase 7 — Conversation Continuity

Implement:

```text
conversation creation
fresh session creation
existing session resume
Conversas filters
Home latest/recent
location-change historical preservation
```

---

# 142. Phase 8 — Voice

Implement Vapi only after the four-route configuration is verified.

Test:

```text
permission
connect
connected
mute
end
failure
Quick Exit
cleanup
```

---

# 143. Phase 9 — Appointments

Implement:

```text
Maxixe scheduler
Massinga scheduler
correct routing
confirmation
error handling
responsive embed
```

Never create Geral fallback.

---

# 144. Phase 10 — Mais

Implement:

```text
location change
privacy
conversation clearing
About
Help
Terms/privacy
```

with accurate data-clearing language.

---

# 145. Phase 11 — Data

Connect only approved operational data flows.

Validate:

```text
Acessos
Interações
Marcações
Consultas
```

remain distinct.

---

# 146. Phase 12 — Public Information Layer

Implement approved public routes and technical SEO foundation.

Do not index private application state.

---

# 147. Phase 13 — Responsive and Accessibility

Test real layouts, not just browser desktop resizing.

Fix:

```text
keyboard issues
safe areas
overflow
text scaling
touch targets
focus
reduced motion
map accessibility
```

---

# 148. Phase 14 — Security and Reliability

Perform a dedicated review for:

```text
secret exposure
input validation
webhook authenticity
logging
caching
sensitive URLs
provider failures
idempotency
state corruption
Quick Exit
```

---

# 149. Phase 15 — Acceptance Testing

Use:

```text
18-acceptance-criteria.md
```

as the release checklist.

Do not declare completion before the relevant criteria have been tested.

---

# 150. Acceptance Criteria Are Binding

Each relevant criterion should eventually be classified:

```text
PASS
FAIL
BLOCKED
NOT APPLICABLE
```

Do not mark:

```text
PASS
```

because code exists.

Verify actual behaviour.

---

# 151. Required Geographic Tests

At minimum test:

```text
Maxixe
Massinga
another Inhambane district
province outside Inhambane
```

with both assistants where relevant.

---

# 152. Required Voiceflow Tests

Verify:

```text
Tonito Maxixe
Tonito Massinga
Tonito Geral

Manuela Maxixe
Manuela Massinga
Manuela Geral
```

---

# 153. Required Vapi Tests

Verify exactly:

```text
Tonito Maxixe
Tonito Massinga
Manuela Maxixe
Manuela Massinga
```

and verify that Geral cannot initiate a call.

---

# 154. Required Appointment Tests

Verify:

```text
Maxixe → Maxixe
Massinga → Massinga
Geral → unavailable
```

There must be no cross-district fallback.

---

# 155. Required Persistence Test

Test:

```text
complete onboarding
↓
create conversation
↓
close app
↓
return
↓
Início
↓
resume same conversation
```

according to the implemented persistence model.

---

# 156. Required Location Change Test

Test:

```text
create Maxixe conversation
↓
change current location
↓
open old conversation
↓
still Maxixe context

create new conversation
↓
uses new location context
```

---

# 157. Required Quick Exit Test

Test during:

```text
chat
voice call
```

The active voice call must terminate.

Microphone/audio must be released.

---

# 158. Required Failure Tests

Simulate failures for:

```text
Voiceflow
Vapi
Cal.com
network
analytics/operational writes
```

Verify unrelated functionality degrades gracefully.

---

# 159. Required Responsive Tests

At minimum:

```text
narrow mobile
common smartphone
tablet
desktop
```

Test actual chat with keyboard interaction on mobile.

---

# 160. Required Privacy Tests

Verify:

```text
no secrets in browser bundle
no raw health messages in generic analytics
no sensitive content in URLs
no private pages indexed
no false deletion claims
no provider stack traces shown
```

---

# 161. No Fake Data in Production UX

Do not leave:

```text
demo conversations
fake appointments
placeholder clinicians
fake analytics values
fake service availability
```

in production.

Empty states are preferable to false information.

---

# 162. Loading States

Use intentional loading states.

Do not use fake data merely to avoid an empty/loading screen.

---

# 163. Empty States

Empty states should help users proceed.

Examples:

```text
No conversations yet
→ Start a conversation

No recent conversation
→ Talk to Tonito / Manuela
```

---

# 164. Error States

Errors should answer:

```text
What happened?

Can I try again?

What can I do instead?
```

without exposing technical internals.

---

# 165. Copy

Use approved Portuguese product language.

Do not casually rewrite sensitive health/service copy.

Maintain:

```text
short
clear
warm
non-judgemental
```

language.

---

# 166. Provider Documentation

Before implementing provider-specific behaviour that is not fully specified, verify the current official provider documentation.

This is especially important for:

```text
Voiceflow API shapes
Vapi SDK behaviour
Vapi webhook verification
Cal.com embed events
Cal.com webhook events
Deepgram if introduced
```

Do not invent current API behaviour.

---

# 167. Existing Provider Configurations

Do not overwrite existing production provider configurations merely to make frontend development easier.

Treat:

```text
Voiceflow agents
Vapi assistants
Cal.com event types
n8n workflows
Airtable structures
```

as external systems requiring deliberate changes.

---

# 168. Database/Workflow Changes

If implementation requires changing an existing operational schema:

```text
identify the change
explain why
describe migration impact
```

before destructive modifications.

---

# 169. Destructive Actions

Do not:

```text
delete production data
drop tables
replace provider agents
remove workflows
rotate credentials
```

without explicit approval.

---

# 170. Code Quality

Prefer:

```text
small focused components
typed domain models
central configuration
provider adapters
clear server/client boundaries
predictable state transitions
testable functions
```

---

# 171. Comments

Comment:

```text
why
```

when the reason is not obvious.

Do not fill the codebase with comments explaining trivial syntax.

---

# 172. Naming

Use product-domain names.

Prefer:

```text
serviceArea
assistant
conversationId
appointmentOrigin
anonymousUserId
```

over vague names such as:

```text
mode
thing
data2
botTypeX
```

---

# 173. Tests

Where the codebase supports automated testing, prioritise tests for:

```text
service routing
capability resolution
conversation immutability
provider resolution
location changes
state validation
API input validation
```

These rules are high-value because routing errors can send users to the wrong service.

---

# 174. Routing Unit Tests

At minimum:

```ts
resolveServiceArea("Inhambane", "Maxixe")
// maxixe

resolveServiceArea("Inhambane", "Massinga")
// massinga

resolveServiceArea("Inhambane", "Vilankulo")
// geral

resolveServiceArea("Maputo Cidade", null)
// geral
```

Use the actual canonical province/district naming selected by the application.

---

# 175. Capability Tests

At minimum:

```text
maxixe.message = true
maxixe.call = true
maxixe.appointment = true

massinga.message = true
massinga.call = true
massinga.appointment = true

geral.message = true
geral.call = false
geral.appointment = false
```

---

# 176. Conversation Tests

Verify:

```text
new thread → fresh session

existing thread → same session

location change → historical serviceArea unchanged

assistant filter → conversation unchanged
```

---

# 177. Build Health

Before reporting completion:

```text
typecheck
lint
test
production build
```

should succeed according to the repository's tooling.

Do not disable important checks merely to obtain a successful build.

---

# 178. Dependency Health

Do not introduce known unnecessary duplicate libraries.

Before adding a package, check whether the existing codebase already provides the capability.

---

# 179. Performance

Avoid loading:

```text
Vapi
Cal.com
large maps
large assistant imagery
```

before needed.

Use appropriate lazy loading/code splitting where beneficial.

---

# 180. Public Content Performance

Public SEO pages should not require downloading the full interactive SAAJ application stack before displaying useful content.

---

# 181. Image Optimisation

Optimise assistant portraits and public imagery appropriately.

Avoid layout shifts.

Maintain sufficient quality for the premium visual design.

---

# 182. Production Readiness

A feature is not complete merely because:

```text
it works on localhost
```

Review:

```text
environment configuration
production domain
HTTPS
mobile behaviour
provider production configuration
webhook URLs
privacy
logging
failure states
```

---

# 183. Do Not Hide Known Problems

If a requirement cannot be completed because of:

```text
missing provider access
missing API capability
missing content
missing legal/privacy decision
missing production configuration
```

mark it clearly:

```text
BLOCKED
```

Do not fake completion.

---

# 184. Implementation Reporting

After each major implementation phase, report:

```text
COMPLETED
- ...

FILES CHANGED
- ...

VERIFIED
- ...

BLOCKED
- ...

NEXT
- ...
```

Keep reports concise and factual.

---

# 185. Do Not Repeatedly Ask for Confirmation

For ordinary implementation decisions already covered by the docs:

```text
proceed.
```

Ask for clarification only when:

```text
a genuine specification conflict exists
a destructive action is required
a missing external credential/access blocks progress
a product decision is genuinely undefined
```

---

# 186. Never Request Secrets in Chat

If a credential is required, ask the developer to configure the corresponding environment variable.

Example:

```text
Please configure:
VOICEFLOW_ACCESS_TOKEN
```

Do not ask:

```text
Paste your Voiceflow token here.
```

---

# 187. `.env.example`

Create/update an example environment file containing variable names only.

Example:

```bash
VOICEFLOW_ACCESS_TOKEN=
VOICEFLOW_TONITO_MAXIXE_PROJECT_ID=
...
```

Never include real values.

---

# 188. Documentation During Implementation

If implementation reveals an approved architecture detail that should be documented:

```text
propose the documentation change
```

Do not silently rewrite product rules.

---

# 189. V1 Scope Protection

If an idea is attractive but belongs to:

```text
17-future-features.md
```

do not implement it.

A polished V1 is preferable to an unfinished larger product.

---

# 190. Release Definition

SAAJ Virtual V1 is ready when:

```text
the right user
+
the right location
+
the right assistant
+
the right service capability
+
the right provider
+
the right conversation context
```

work together reliably.

---

# 191. Critical Non-Negotiables

The following are non-negotiable:

```text
NO mandatory account.

NO repeated onboarding for valid returning users.

NO permanent assistant lock.

NO incorrect district fallback.

NO Geral voice fallback.

NO Geral appointment fallback.

NO cross-assistant conversation mutation.

NO historical service-area mutation.

NO exposed private credentials.

NO automatic sending of speech transcription.

NO fake appointment confirmation.

NO fake clinician availability.

NO frontend-invented health advice.

NO raw health conversations in generic analytics.

NO misleading privacy claims.

NO private conversation indexing.

NO future-feature placeholders pretending to be services.
```

---

# 192. Final Implementation Instruction

Build SAAJ Virtual as one coherent product.

Do not think of it as:

```text
six Voiceflow bots
+
four Vapi assistants
+
two Cal calendars
+
some pages
```

Think of it as:

```text
ONE SAAJ VIRTUAL EXPERIENCE
```

with:

```text
one product identity
one navigation model
one design system
one conversation model
one privacy model
one location-routing model
one capability model
```

connected to different technical services behind the scenes.

The user should never need to understand the infrastructure.

---

# 193. Final Product Model

```text
                       SAAJ VIRTUAL
                            │
                     USER LOCATION
                            │
                            ▼
                    SERVICE ROUTING
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
             TONITO                  MANUELA
                │                       │
                └───────────┬───────────┘
                            │
                 AVAILABLE CAPABILITIES
                            │
           ┌────────────────┼────────────────┐
           │                │                │
           ▼                ▼                ▼
         MESSAGE           CALL         APPOINTMENT
           │                │                │
           ▼                ▼                ▼
       VOICEFLOW           VAPI           CAL.COM
           │                │                │
           └────────────────┼────────────────┘
                            │
                            ▼
                      SAAJ EXPERIENCE
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
           INÍCIO       CONVERSAS        MAIS
                            │
                            ▼
                   SAFE CONTINUITY
```

For Geral:

```text
LOCATION
   ↓
GERAL
   ↓
TONITO / MANUELA
   ↓
MESSAGE
   ↓
VOICEFLOW
```

For Maxixe and Massinga:

```text
LOCATION
   ↓
MAXIXE / MASSINGA
   ↓
TONITO / MANUELA
   ↓
┌─────────┬─────────┬─────────────┐
│         │         │
MESSAGE   CALL      APPOINTMENT
│         │         │
▼         ▼         ▼
VOICEFLOW VAPI      CAL.COM
```

---

# 194. Final Engineering Principle

```text
DO NOT MAKE THE USER
UNDERSTAND THE ARCHITECTURE.

THE ARCHITECTURE EXISTS
TO MAKE THE USER'S EXPERIENCE
SIMPLE.


LOCATION SHOULD FEEL SIMPLE.

CHOOSING TONITO OR MANUELA
SHOULD FEEL SIMPLE.

ASKING A SENSITIVE QUESTION
SHOULD FEEL SIMPLE.

CALLING SHOULD FEEL SIMPLE.

BOOKING SHOULD FEEL SIMPLE.

RETURNING LATER
SHOULD FEEL SIMPLE.


THE COMPLEXITY BELONGS
BEHIND THE INTERFACE.


BUILD EXACTLY THAT.
```

---

# 195. Start

Before writing code:

```text
1. Read all files in /docs.

2. Inspect the existing repository.

3. Produce a short implementation audit:
   - what already exists;
   - what can be reused;
   - what conflicts with the specifications;
   - what is missing;
   - what integrations are already configured;
   - what is blocked.

4. Produce the proposed implementation sequence.

5. Begin with the highest-leverage foundational work.

6. Do not rebuild working components without a reason.

7. Do not change external production systems destructively.

8. Continuously test against 18-acceptance-criteria.md.

9. Keep V1 within the approved scope.

10. Build SAAJ Virtual.
```
````

That completes **`MASTER-PROMPT.md`** and, with it, the full specification package.

The folder is now conceptually complete:

```text
/docs
├── 00-project-overview.md
├── 01-product-foundation.md
├── 02-design-system.md
├── 03-first-time-onboarding.md
├── 04-inicio.md
├── 05-conversas-dashboard.md
├── 06-chat-experience.md
├── 07-assistant-contact-profile.md
├── 08-voice-call-experience.md
├── 09-appointments.md
├── 10-mais.md
├── 11-location-routing.md
├── 12-user-state-and-persistence.md
├── 13-data-and-analytics.md
├── 14-integrations-and-api-architecture.md
├── 15-privacy-safety-and-security.md
├── 16-responsive-behaviour-and-motion.md
├── 17-future-features.md
├── 18-acceptance-criteria.md
├── 19-seo-ai-discoverability.md
└── MASTER-PROMPT.md
```

At this point I would **stop adding product specifications**. The next stage should be implementation: give the coding agent the `/docs` folder plus `MASTER-PROMPT.md`, let it audit the existing repository first, and only then start changing the application.
