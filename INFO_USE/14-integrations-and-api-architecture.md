Next is **`14-integrations-and-api-architecture.md`**. This should be the technical source of truth for how the SAAJ frontend communicates with Voiceflow, Vapi, Cal.com, n8n and Airtable without exposing infrastructure or private credentials to users.

````markdown
# SAAJ Virtual — Integrations & API Architecture

## 1. Purpose

This document defines the integration architecture of SAAJ Virtual.

It establishes how the application communicates with:

- Voiceflow;
- Vapi;
- Cal.com;
- n8n;
- Airtable;
- future supporting services.

It also defines:

- browser vs server responsibilities;
- API boundaries;
- environment variables;
- provider routing;
- webhooks;
- authentication;
- retries;
- idempotency;
- error handling;
- provider abstraction;
- security boundaries.

The central principle is:

```text
USER
  ↓
SAAJ VIRTUAL
  ↓
SAAJ APPLICATION LOGIC
  ↓
APPROVED EXTERNAL SERVICES
```

Users interact with **SAAJ Virtual**, not with a collection of provider interfaces.

---

# 2. Architectural Principle

The frontend should understand SAAJ concepts:

```text
assistant
service area
conversation
call
appointment
```

It should not need to understand unnecessary provider implementation details.

Prefer:

```ts
{
  assistant: "manuela",
  serviceArea: "maxixe"
}
```

over:

```ts
{
  voiceflowProjectId: "...",
  vapiAssistantId: "...",
  calUrl: "..."
}
```

Provider configuration should be resolved centrally.

---

# 3. High-Level Architecture

```text
                         USER
                           │
                           ▼
                  ┌────────────────┐
                  │  SAAJ VIRTUAL  │
                  │    Next.js     │
                  └───────┬────────┘
                          │
        ┌─────────────────┼──────────────────┐
        │                 │                  │
        ▼                 ▼                  ▼
      TEXT              VOICE            APPOINTMENT
        │                 │                  │
        ▼                 ▼                  ▼
    Voiceflow            Vapi              Cal.com
        │                 │                  │
        └────────┬────────┴─────────┬────────┘
                 │                  │
                 ▼                  ▼
                n8n             operational
                 │                 events
                 ▼
              Airtable
                 │
                 ▼
             Dashboard
```

This is a logical model.

Not every interaction needs to pass through n8n.

---

# 4. Technology Responsibilities

## Next.js

Responsible for:

- user-facing application;
- routing;
- onboarding;
- location state;
- assistant profiles;
- chat interface;
- voice-call interface;
- appointment shell;
- local user state;
- server API routes;
- provider configuration resolution;
- secure server-side provider requests where appropriate.

---

## Voiceflow

Responsible for:

- Tonito and Manuela conversational intelligence;
- approved assistant instructions;
- health knowledge;
- conversation logic;
- knowledge-base access;
- variables;
- referral logic;
- approved data collection;
- health-related response generation.

Voiceflow does **not** own the SAAJ product UI.

---

## Vapi

Responsible for:

- real-time voice infrastructure;
- voice assistant execution;
- call lifecycle;
- speech/audio transport;
- voice-agent integration;
- call events and outputs.

Vapi does **not** own the visual SAAJ call experience.

---

## Cal.com

Responsible for:

- appointment availability;
- scheduling;
- booking;
- booking confirmation;
- appointment lifecycle where configured.

Cal.com should appear within a SAAJ-controlled experience where technically appropriate.

---

## n8n

Responsible for asynchronous workflows such as:

- post-call processing;
- data transformation;
- validation;
- Airtable writes;
- booking workflows;
- reminders;
- integrations;
- operational automation;
- knowledge-base synchronisation.

n8n should not sit unnecessarily inside every real-time user interaction.

---

## Airtable

Responsible for current V1 operational/programme data such as:

- platform access records;
- interaction records;
- appointment records;
- consultation records;
- operational summaries;
- journey metrics.

Airtable should not be directly exposed to the browser.

---

# 5. Browser vs Server Boundary

The browser is an untrusted environment.

Anything delivered to browser JavaScript should be considered visible to the user.

Therefore private credentials must remain server-side.

---

# 6. Private Credentials

Examples that must remain private include:

```text
VOICEFLOW_ACCESS_TOKEN

VAPI_PRIVATE_API_KEY

CALCOM_API_KEY

AIRTABLE_ACCESS_TOKEN

n8n authentication secrets

webhook verification secrets

hashing salts
```

Never expose these through:

```text
NEXT_PUBLIC_*
```

---

# 7. Public Configuration

Some SDKs intentionally require a public browser credential.

Current example:

```bash
NEXT_PUBLIC_VAPI_PUBLIC_KEY=
```

This is intentionally different from:

```bash
VAPI_PRIVATE_API_KEY=
```

The public key may reach the browser.

The private key must not.

---

# 8. Environment Variable Naming

In Next.js:

```text
NEXT_PUBLIC_*
```

means the value may be bundled into client-side code.

Therefore never create:

```bash
NEXT_PUBLIC_VOICEFLOW_ACCESS_TOKEN=
NEXT_PUBLIC_VAPI_PRIVATE_API_KEY=
NEXT_PUBLIC_AIRTABLE_TOKEN=
```

---

# 9. Current Environment Structure

Conceptually:

```bash
# -----------------------------
# VOICEFLOW
# -----------------------------

VOICEFLOW_ACCESS_TOKEN=

VOICEFLOW_TONITO_MAXIXE_PROJECT_ID=
VOICEFLOW_TONITO_MASSINGA_PROJECT_ID=
VOICEFLOW_TONITO_GERAL_PROJECT_ID=

VOICEFLOW_MANUELA_MAXIXE_PROJECT_ID=
VOICEFLOW_MANUELA_MASSINGA_PROJECT_ID=
VOICEFLOW_MANUELA_GERAL_PROJECT_ID=


# -----------------------------
# VAPI
# -----------------------------

VAPI_PRIVATE_API_KEY=
NEXT_PUBLIC_VAPI_PUBLIC_KEY=

VAPI_TONITO_MAXIXE_ASSISTANT_ID=
VAPI_TONITO_MASSINGA_ASSISTANT_ID=

VAPI_MANUELA_MAXIXE_ASSISTANT_ID=
VAPI_MANUELA_MASSINGA_ASSISTANT_ID=


# -----------------------------
# CAL.COM
# -----------------------------

CALCOM_API_KEY=

CALCOM_MAXIXE_EVENT_TYPE_ID=
CALCOM_MASSINGA_EVENT_TYPE_ID=


# -----------------------------
# OPTIONAL FUTURE TRANSCRIPTION
# -----------------------------

# DEEPGRAM_API_KEY=
# DEEPGRAM_MODEL=nova-3
# DEEPGRAM_LANGUAGE=pt
```

Only variables actually required by the implementation should be added.

---

# 10. Do Not Add Credentials Speculatively

Do not create environment variables merely because a provider offers an API.

Example:

If SAAJ only uses the Cal.com embed and does not make authenticated Cal.com API requests, then:

```text
CALCOM_API_KEY
```

may not be required for that implementation.

Environment configuration should reflect actual architecture.

---

# 11. Central Provider Configuration

Create one server-side configuration layer.

Conceptually:

```ts
type Assistant =
  | "tonito"
  | "manuela";

type ServiceArea =
  | "maxixe"
  | "massinga"
  | "geral";
```

Provider configuration should be resolved from these semantic values.

---

# 12. Voiceflow Configuration

Conceptually:

```ts
const voiceflowConfig = {
  tonito: {
    maxixe:
      process.env
        .VOICEFLOW_TONITO_MAXIXE_PROJECT_ID,

    massinga:
      process.env
        .VOICEFLOW_TONITO_MASSINGA_PROJECT_ID,

    geral:
      process.env
        .VOICEFLOW_TONITO_GERAL_PROJECT_ID,
  },

  manuela: {
    maxixe:
      process.env
        .VOICEFLOW_MANUELA_MAXIXE_PROJECT_ID,

    massinga:
      process.env
        .VOICEFLOW_MANUELA_MASSINGA_PROJECT_ID,

    geral:
      process.env
        .VOICEFLOW_MANUELA_GERAL_PROJECT_ID,
  },
};
```

---

# 13. Vapi Configuration

Conceptually:

```ts
const vapiConfig = {
  tonito: {
    maxixe:
      process.env
        .VAPI_TONITO_MAXIXE_ASSISTANT_ID,

    massinga:
      process.env
        .VAPI_TONITO_MASSINGA_ASSISTANT_ID,
  },

  manuela: {
    maxixe:
      process.env
        .VAPI_MANUELA_MAXIXE_ASSISTANT_ID,

    massinga:
      process.env
        .VAPI_MANUELA_MASSINGA_ASSISTANT_ID,
  },
};
```

There is intentionally no:

```text
tonito.geral
manuela.geral
```

Vapi configuration in V1.

---

# 14. Appointment Configuration

Conceptually:

```ts
const appointmentConfig = {
  maxixe: {
    calLink:
      "saaj-maxixe-8w8m61/saaj-virtual-marcacao-de-consulta",
  },

  massinga: {
    calLink:
      "saaj-massinga-0cr1s3/saaj-virtual-marcacao-de-consulta",
  },
};
```

No Geral appointment configuration exists in V1.

---

# 15. Provider Resolver

Conceptually:

```ts
function resolveProviderConfig({
  assistant,
  serviceArea,
}: {
  assistant: Assistant;
  serviceArea: ServiceArea;
}) {
  return {
    voiceflow:
      resolveVoiceflow(
        assistant,
        serviceArea
      ),

    vapi:
      serviceArea === "geral"
        ? null
        : resolveVapi(
            assistant,
            serviceArea
          ),

    appointment:
      serviceArea === "geral"
        ? null
        : resolveAppointment(
            serviceArea
          ),
  };
}
```

---

# 16. Server-Side Semantic Routing

The browser should request:

```json
{
  "assistant": "manuela",
  "serviceArea": "maxixe"
}
```

The server determines:

```text
Voiceflow Project ID
Vapi Assistant ID
approved provider configuration
```

Do not make arbitrary provider IDs user-controlled.

---

# 17. Voiceflow Architecture

SAAJ uses six logical Voiceflow experiences:

```text
Tonito Maxixe
Tonito Massinga
Tonito Geral

Manuela Maxixe
Manuela Massinga
Manuela Geral
```

The user never chooses between these six technical configurations.

They choose:

```text
location
+
Tonito or Manuela
```

SAAJ resolves the correct project.

---

# 18. Voiceflow Access Token

Current architecture uses:

```text
one Voiceflow Access Token
+
six Voiceflow Project IDs
```

It does not require six separate Voiceflow API keys.

---

# 19. Voiceflow Client Boundary

Recommended architecture:

```text
SAAJ Chat UI
      ↓
SAAJ server/API boundary
      ↓
Voiceflow Runtime API
```

This keeps the Voiceflow access token off the client.

---

# 20. Conceptual Chat Endpoint

Example:

```text
POST /api/chat/message
```

Request:

```json
{
  "conversationId": "opaque-id",
  "assistant": "manuela",
  "serviceArea": "maxixe",
  "message": "..."
}
```

The actual contract should be refined during implementation.

---

# 21. Server Chat Logic

Conceptually:

```text
Receive request
     ↓
Validate request
     ↓
Resolve conversation
     ↓
Validate assistant
     ↓
Validate historical service area
     ↓
Resolve Voiceflow project
     ↓
Send turn to Voiceflow
     ↓
Normalise provider response
     ↓
Return SAAJ response
```

---

# 22. Existing Conversation Authority

For an existing conversation, do not trust the browser to change:

```text
assistant
serviceArea
```

The server should use the stored conversation metadata where available.

Example:

```text
conversationId = ABC
```

stored as:

```text
assistant = Manuela
serviceArea = Maxixe
```

A browser request claiming:

```text
assistant = Tonito
serviceArea = Massinga
```

must not rewrite the conversation.

---

# 23. Voiceflow Session ID

Each SAAJ text conversation has a corresponding Voiceflow session reference.

Conceptually:

```text
conversationId
      ↓
voiceflowSessionId
```

The application uses this relationship to continue the correct conversational context.

---

# 24. New Conversation

Conceptually:

```text
User starts new conversation
        ↓
SAAJ generates conversation ID
        ↓
SAAJ assigns fresh Voiceflow session
        ↓
assistant + current service area locked
        ↓
conversation begins
```

---

# 25. Existing Conversation

Conceptually:

```text
User opens conversation
        ↓
load conversation record
        ↓
assistant
serviceArea
voiceflowSessionId
        ↓
resume correct Voiceflow session
```

Do not create a new session simply because the page was reopened.

---

# 26. Voiceflow Response Normalisation

Voiceflow may return provider-specific response structures.

The frontend should preferably consume a SAAJ-normalised format.

Conceptually:

```ts
type SaajChatResponse = {
  messages: Array<{
    type: "text";
    content: string;
  }>;

  actions?: Array<{
    type:
      | "appointment"
      | "call"
      | "other";

    label: string;
  }>;
};
```

This reduces provider coupling.

---

# 27. Structured Actions

If Voiceflow indicates:

```text
appointment recommended
```

SAAJ may render an approved appointment CTA.

But the frontend must still validate:

```text
serviceArea supports appointment
```

before rendering a functional booking action.

Voiceflow does not override product capability rules.

---

# 28. Health Logic Boundary

Voiceflow controls:

```text
health response
follow-up question
risk logic
referral logic
appointment recommendation
assistant personality
knowledge-base use
```

Next.js controls:

```text
visual rendering
navigation
provider routing
capability enforcement
```

Do not duplicate health decision logic in frontend code.

---

# 29. Voiceflow Failure

If Voiceflow is unavailable:

```text
do not invent an answer
```

The application should return a human-readable state such as:

```text
Não foi possível obter uma resposta agora.
Tenta novamente.
```

Exact copy may be refined.

---

# 30. Retry Safety

A retry must avoid creating duplicate conversational turns where possible.

Use:

```text
message/request ID
```

or another idempotency mechanism when supported by the architecture.

---

# 31. Voiceflow Knowledge Base

Health knowledge should remain governed through the approved Voiceflow knowledge architecture.

The frontend must not maintain an independent uncontrolled medical-answer database.

---

# 32. Current Vapi Knowledge Tool

The current Vapi knowledge tool is:

```text
Knowledge_base
```

Current tool ID:

```text
a4c67b13-953e-4ed6-8f26-661d35fe3311
```

Current type:

```text
query
```

Current version context:

```text
v3
```

Provider identifiers should remain implementation configuration rather than user-facing information.

---

# 33. Current Vapi Knowledge Bases

Current logical knowledge collections include:

```text
Guia_calao

Guias_facilitacao

postos_de_saude
```

Google Drive health/support documentation currently feeds:

```text
Guias_facilitacao
```

through the approved synchronisation workflow.

---

# 34. Knowledge Synchronisation

Current conceptual workflow:

```text
Google Drive
     ↓
n8n trigger
     ↓
download document
     ↓
upload file to Vapi
     ↓
retrieve knowledge tool
     ↓
update knowledge-base resources
```

This is an asynchronous administrative workflow.

It does not belong in the user-facing request path.

---

# 35. Knowledge Sync Failure

If knowledge synchronisation fails:

- log operational failure;
- preserve existing valid knowledge configuration where possible;
- do not destroy the existing knowledge base;
- allow administrators to retry.

Do not expose technical sync errors to SAAJ users.

---

# 36. Vapi Architecture

Voice is available only in:

```text
Maxixe
Massinga
```

for:

```text
Tonito
Manuela
```

giving four Vapi assistant configurations.

---

# 37. Voice Start Flow

Conceptually:

```text
User taps Ligar
      ↓
SAAJ validates capability
      ↓
assistant + serviceArea resolved
      ↓
request microphone permission
      ↓
initialise Vapi
      ↓
start correct assistant
      ↓
SAAJ call UI becomes active
```

---

# 38. Vapi Public Key

Where the Vapi browser SDK requires it:

```text
NEXT_PUBLIC_VAPI_PUBLIC_KEY
```

may initialise the client.

This does not authorise arbitrary private server operations.

---

# 39. Vapi Private Key

```text
VAPI_PRIVATE_API_KEY
```

must remain server-side.

Use it only for approved server-to-server Vapi operations.

---

# 40. Do Not Send Private Vapi Key to Browser

Never:

```ts
return Response.json({
  vapiPrivateKey:
    process.env.VAPI_PRIVATE_API_KEY
});
```

No UI feature justifies exposing the private key.

---

# 41. Vapi Assistant IDs

Even if an assistant identifier is not equivalent to a secret, SAAJ should resolve routing centrally rather than allowing arbitrary assistant selection from client input.

The product should reason in:

```text
Tonito + Maxixe
```

not arbitrary Vapi IDs.

---

# 42. No Geral Call

A request for:

```text
assistant = Manuela
serviceArea = Geral
channel = voice
```

must return:

```text
capability unavailable
```

It must not fallback to Manuela Maxixe.

---

# 43. Real-Time Audio Path

Do not route every real-time voice audio packet through n8n.

Preferred conceptual path:

```text
Browser
   ↕
Vapi realtime infrastructure
```

with SAAJ controlling the interface and lifecycle.

n8n belongs primarily after/beside the real-time call.

---

# 44. Post-Call Flow

Conceptually:

```text
Vapi call
   ↓
call completed
   ↓
provider event / structured output
   ↓
n8n
   ↓
validate
   ↓
transform
   ↓
Interações
   ↓
if real appointment
   ↓
Marcações
```

---

# 45. Vapi Webhooks

Where Vapi sends server events, use a dedicated server/webhook endpoint.

Conceptually:

```text
POST /api/webhooks/vapi
```

The exact route may differ.

---

# 46. Webhook Security

Webhook endpoints should:

- validate provider authenticity where supported;
- validate payload shape;
- reject malformed events;
- avoid trusting arbitrary public requests;
- log failures safely.

If the provider supports signatures, verify them.

---

# 47. Webhook Idempotency

Providers may retry events.

Therefore:

```text
same call completed event
```

must not create:

```text
three interaction records
```

Use stable identifiers such as:

```text
Vapi Call ID
provider event ID
```

to deduplicate.

---

# 48. Voice Session ID

Current convention:

```text
Session ID = Vapi Call ID
```

This should remain consistent through:

```text
Vapi
→ n8n
→ Airtable
```

---

# 49. Structured Outputs

Current Vapi structured outputs include logical outputs such as:

```text
saaj_interacao
saaj_marcacao
```

These should produce controlled analytical/operational fields.

They should not require downstream workflows to infer everything from raw transcripts.

---

# 50. Current Structured Output IDs

Current configuration references include:

```text
saaj_interacao
6f1c3cde-68c4-4585-b96c-7f7e3d9050d7
```

and:

```text
saaj_marcacao
cb4e7042-795b-418a-a001-170cb17b9036
```

Provider IDs are implementation references and must not appear in the youth-facing interface.

---

# 51. Structured Output Validation

Before sending data downstream:

```text
validate
normalise
map types
handle nulls
```

Do not blindly insert provider output into Airtable.

---

# 52. Null Handling

If a field may be null, the schema must genuinely permit null.

Incorrect conceptual approach:

```json
{
  "type": "string",
  "description": "nullable"
}
```

The description does not make the field nullable.

Use a schema that actually accepts the intended value types.

---

# 53. Satisfaction Type

The structured output and Airtable field must agree.

If satisfaction is numeric:

```text
1–5
```

then downstream workflows should send a number.

Do not alternate between:

```text
5
```

and:

```text
"Muito satisfeito"
```

without an explicit transformation.

---

# 54. n8n Boundary

n8n should handle workflow orchestration.

Examples:

```text
Vapi event
→ transform
→ Airtable

Cal event
→ transform
→ Airtable

Drive change
→ Vapi KB sync

appointment
→ reminder workflow
```

It should not become a replacement for all application backend logic.

---

# 55. Why Not Route Everything Through n8n?

Real-time user interactions require:

- low latency;
- predictable state;
- responsive errors;
- session continuity.

Adding unnecessary workflow hops can increase:

- latency;
- failure points;
- debugging complexity.

Use n8n where automation adds value.

---

# 56. Airtable Architecture

The browser should never directly call Airtable with a private token.

Preferred:

```text
Browser
   ↓
SAAJ / provider event
   ↓
server or n8n
   ↓
Airtable
```

---

# 57. Airtable Tables

Current base:

```text
Recolha de dados SAAJ
```

Current tables include:

```text
Acessos à Plataforma
Interações
Marcações
Consultas
RESUMOS_OPERACIONAIS
JORNADA_METRICAS
```

---

# 58. Airtable Writes

Writes should:

- validate required fields;
- use controlled values;
- preserve stable IDs;
- avoid duplicate records;
- distinguish test/production where required;
- log operational failure.

---

# 59. Interaction Write

Conceptually:

```text
Vapi/Voiceflow interaction
        ↓
structured data
        ↓
validation
        ↓
Interações
```

Do not send raw provider objects directly as Airtable rows.

---

# 60. Appointment Write

Only create a `Marcações` record if:

```text
appointment actually exists
```

Do not create one merely because:

```text
assistant discussed booking
```

---

# 61. Interaction First, Appointment Second

For a voice interaction that creates a real appointment:

```text
Call
 ↓
Interação
 ↓
create/update Interações record
 ↓
obtain Interação Record ID
 ↓
create Marcações record
 ↓
link Interação Record ID
```

This preserves the relationship.

---

# 62. Direct Booking Exception

A direct booking from Home may have:

```text
Interação Record ID = null
```

This is valid.

Do not fabricate an interaction simply to satisfy the relationship.

---

# 63. Cal.com Architecture

Appointments are available only for:

```text
Maxixe
Massinga
```

The appointment destination depends on service area.

It does not depend on whether the user chose Tonito or Manuela.

---

# 64. Current Cal.com Links

Maxixe:

```text
saaj-maxixe-8w8m61/saaj-virtual-marcacao-de-consulta
```

Massinga:

```text
saaj-massinga-0cr1s3/saaj-virtual-marcacao-de-consulta
```

---

# 65. Cal.com Embed

Current configuration concept:

```text
namespace:
saaj-virtual-marcacao-de-consulta

element ID:
my-cal-inline-saaj-virtual-marcacao-de-consulta

origin:
https://app.cal.com

layout:
month_view

useSlotsViewOnSmallScreen:
true

hideEventTypeDetails:
true

forwardQueryParams:
true
```

Only one scheduler should be mounted at a time.

---

# 66. Appointment Routing

Conceptually:

```ts
switch (serviceArea) {
  case "maxixe":
    return maxixeScheduler;

  case "massinga":
    return massingaScheduler;

  case "geral":
    return null;
}
```

---

# 67. No Appointment Fallback

If the Maxixe scheduler is unavailable:

```text
do not send the user to Massinga
```

unless a future approved operational policy explicitly allows it.

Likewise:

```text
Geral
```

must not automatically route to an arbitrary scheduler.

---

# 68. Appointment UI Boundary

The user should experience:

```text
SAAJ Virtual
→ Marcar encontro
```

not:

```text
External scheduling product
→ unexplained provider experience
```

Keep:

- SAAJ page shell;
- SAAJ navigation;
- context;
- privacy language;
- correct service-area routing.

---

# 69. Appointment Confirmation

After confirmed booking:

```text
SAAJ may show confirmation
```

only when booking success is genuinely known.

Do not show:

```text
Marcação confirmada
```

merely because the Cal.com screen opened.

---

# 70. Appointment Events

Where required, Cal.com booking events may feed:

```text
Cal.com
   ↓
webhook / integration
   ↓
n8n
   ↓
Marcações
```

Use stable booking identifiers for deduplication.

---

# 71. Appointment SMS

The current product intention includes:

```text
booking confirmation
+
reminder approximately one day before
```

SMS workflows should be driven by confirmed booking information.

Do not use the generic youth-facing notification system for this.

---

# 72. Reminder Idempotency

A workflow retry must not send multiple identical reminders.

Store/derive sufficient state to determine whether the reminder has already been sent.

---

# 73. Date and Time

All user-facing scheduling logic should respect:

```text
Africa/Maputo
UTC+2
```

Do not present UTC directly to users.

---

# 74. Appointment Date Parsing

Where conversational workflows accept dates, normalise them deliberately.

The current workflow supports formats such as:

```text
DD/MM/YYYY
DD-MM-YYYY
```

with time.

Current parser concept:

```js
/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})\s+(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i
```

Parsing must ultimately produce a valid Africa/Maputo appointment time.

---

# 75. Never Guess Ambiguous Dates

If user input cannot be safely resolved:

```text
ask for clarification
```

rather than booking an unintended date.

---

# 76. Server API Structure

A possible Next.js API structure is:

```text
/app/api/

├── chat/
│   ├── start/
│   └── message/
│
├── conversations/
│   └── ...
│
├── calls/
│   └── ...
│
├── appointments/
│   └── ...
│
└── webhooks/
    ├── vapi/
    └── cal/
```

This is conceptual, not a requirement to create endpoints that are unnecessary.

---

# 77. Do Not Build Empty APIs

If a provider's secure client integration already handles a requirement appropriately, do not create a server endpoint merely for architectural symmetry.

Every API route should have a defined purpose.

---

# 78. API Response Normalisation

The frontend should preferably receive application-level errors.

Example:

```json
{
  "error": {
    "code": "ASSISTANT_UNAVAILABLE",
    "message": "..."
  }
}
```

rather than raw provider stack traces.

---

# 79. Internal Error Codes

Potential internal codes:

```text
INVALID_LOCATION
INVALID_ASSISTANT
CAPABILITY_UNAVAILABLE
VOICEFLOW_UNAVAILABLE
VOICE_SESSION_UNAVAILABLE
BOOKING_UNAVAILABLE
INVALID_CONVERSATION
NETWORK_ERROR
PROVIDER_CONFIGURATION_ERROR
```

These help the application map technical problems to safe user messages.

---

# 80. Never Show Provider Stack Traces

Do not display:

```text
401 Voiceflow authorization failed
Vapi SDK exception
Cal.com iframe error
Airtable 422
n8n node execution failed
```

to the youth-facing user.

Log technical detail internally.

Show human-readable recovery.

---

# 81. Error Logging

Internal logs may include:

```text
timestamp
provider
operation
semantic assistant
service area
internal request ID
error code
```

Avoid logging:

```text
full health conversation
phone number
appointment concern
entire application state
```

unless explicitly required and protected.

---

# 82. Correlation ID

A server request may generate an opaque correlation ID.

Example:

```text
requestId = random UUID
```

This helps trace:

```text
frontend request
→ backend
→ provider
→ automation
```

without using personal information as the tracing key.

---

# 83. Timeouts

External provider calls must have reasonable timeouts.

Do not allow the UI to remain indefinitely in:

```text
A responder...
```

or:

```text
A ligar...
```

A timeout should transition to a recoverable state.

---

# 84. Retry Policy

Retries should depend on operation type.

Safe candidates may include:

```text
read operations
idempotent writes
provider calls with request IDs
```

Use caution with:

```text
appointment creation
message submission
SMS sending
```

because blind retries may duplicate real-world actions.

---

# 85. Exponential Backoff

Background workflows may use controlled backoff:

```text
attempt 1
↓
wait
↓
attempt 2
↓
longer wait
↓
attempt 3
```

Do not create uncontrolled infinite retry loops.

---

# 86. Idempotency

Operations that can be retried should use stable identifiers.

Examples:

```text
messageId
interactionId
Vapi Call ID
Cal booking ID
provider event ID
```

This allows:

```text
same event
→ same logical record
```

rather than duplication.

---

# 87. Real-Time vs Asynchronous Operations

Separate:

### Real-time

```text
chat
voice call
opening appointment UI
```

from:

### Asynchronous

```text
analytics writes
post-call processing
reminders
knowledge sync
summary generation
```

Do not make the user wait for asynchronous analytics work before receiving support.

---

# 88. Example Chat Flow

```text
USER
 ↓
SAAJ Chat UI
 ↓
POST /api/chat/message
 ↓
validate conversation
 ↓
resolve Voiceflow project
 ↓
Voiceflow
 ↓
normalise response
 ↓
SAAJ Chat UI
```

Separately:

```text
interaction event
 ↓
approved analytics pipeline
 ↓
Interações
```

The analytics write should not unnecessarily delay the response.

---

# 89. Example Voice Flow

```text
USER
 ↓
Assistant Contact Profile
 ↓
Ligar
 ↓
capability check
 ↓
SAAJ Call UI
 ↓
Vapi realtime call
 ↓
call ends
```

Then asynchronously:

```text
Vapi event
 ↓
n8n
 ↓
structured output validation
 ↓
Interações
 ↓
optional Marcações
```

---

# 90. Example Appointment Flow

```text
USER
 ↓
Marcar encontro
 ↓
serviceArea check
 ↓
Maxixe or Massinga scheduler
 ↓
Cal.com
 ↓
confirmed booking
```

Then:

```text
booking event
 ↓
n8n
 ↓
Marcações
 ↓
confirmation/reminder workflow
```

---

# 91. Example Knowledge Flow

```text
ADMINISTRATIVE DOCUMENT
        ↓
Google Drive
        ↓
n8n
        ↓
download
        ↓
Vapi file upload
        ↓
update approved KB resources
```

This process is independent from the live youth-facing application.

---

# 92. Integration Ownership

Every integration should have a clear owner.

Conceptually:

| Integration | Primary owner |
|---|---|
| SAAJ UI | Next.js |
| Text intelligence | Voiceflow |
| Voice | Vapi |
| Appointment availability | Cal.com |
| Automation | n8n |
| Operational data | Airtable |
| Geographic routing | SAAJ |
| Capability routing | SAAJ |
| Health conversation logic | Voiceflow/Vapi assistant configuration |
| Product analytics definitions | SAAJ data architecture |

---

# 93. Provider Branding

Provider names should generally not appear in the youth-facing experience.

Users should see:

```text
SAAJ Virtual
Tonito
Manuela
Mensagem
Ligar
Marcar encontro
```

not:

```text
Powered by Voiceflow
Vapi Assistant
Cal.com Scheduler
n8n Workflow
Airtable Record
```

unless a legal requirement specifically requires attribution.

---

# 94. Provider Independence

Application code should minimise unnecessary provider coupling.

For example:

```tsx
startVoiceCall({
  assistant: "manuela",
  serviceArea: "maxixe",
});
```

is preferable at the product layer to:

```tsx
vapi.start(
  "hard-coded-provider-id"
);
```

scattered throughout UI components.

---

# 95. Integration Adapters

A useful architecture may include:

```text
/lib/integrations/

voiceflow.ts
vapi.ts
cal.ts
analytics.ts
```

These adapters translate SAAJ concepts into provider-specific operations.

---

# 96. Example Project Structure

Conceptually:

```text
src/
├── app/
│   ├── api/
│   └── ...
│
├── components/
│   ├── chat/
│   ├── call/
│   ├── appointments/
│   └── ...
│
├── lib/
│   ├── routing/
│   │   ├── location.ts
│   │   └── capabilities.ts
│   │
│   ├── integrations/
│   │   ├── voiceflow.ts
│   │   ├── vapi.ts
│   │   ├── cal.ts
│   │   └── analytics.ts
│   │
│   ├── conversations/
│   └── state/
│
└── config/
    ├── assistants.ts
    └── services.ts
```

Exact structure may evolve.

---

# 97. Avoid Provider Logic in Components

Avoid:

```tsx
if (
  assistant === "manuela" &&
  district === "Maxixe"
) {
  vapi.start("hard-coded-id");
}
```

inside visual components.

Prefer:

```tsx
startCall({
  assistant,
  serviceArea,
});
```

with routing handled centrally.

---

# 98. Configuration Validation

Before production deployment, validate that required configuration exists.

Example:

```text
Maxixe requires:

Tonito Voiceflow
Manuela Voiceflow
Tonito Vapi
Manuela Vapi
Maxixe scheduler
```

Massinga requires the equivalent set.

Geral requires:

```text
Tonito Voiceflow
Manuela Voiceflow
```

---

# 99. Fail Deployment Where Appropriate

Missing critical production configuration should preferably be detected during:

```text
build
deployment
startup health check
```

rather than first discovered by a young person seeking support.

---

# 100. No Cross-Fallback

This is a strict architectural rule.

Never silently substitute:

```text
Manuela → Tonito
Maxixe → Massinga
Massinga → Maxixe
Geral → enhanced district
```

because a provider configuration failed.

Fail safely.

---

# 101. Provider Outage

If one provider is temporarily unavailable, other capabilities may remain available.

Example:

```text
Vapi unavailable
```

does not necessarily mean:

```text
Voiceflow text unavailable
```

The application should isolate failures where possible.

---

# 102. Partial Degradation

Example:

```text
Maxixe

Text        ✓
Voice       temporarily unavailable
Appointment ✓
```

The application may preserve working capabilities.

Do not unnecessarily take the whole application offline.

---

# 103. Dynamic Capability Status

The static product capability model says:

```text
Maxixe supports voice
```

Operational availability may temporarily say:

```text
voice service unavailable
```

These are different concepts.

The product should handle both.

---

# 104. Health Checks

Operational monitoring may check:

```text
Voiceflow reachable
Vapi configuration valid
Cal scheduler reachable
n8n workflows healthy
Airtable writes succeeding
```

Health checks should not expose credentials.

---

# 105. Development vs Production

Use separate configuration where possible for:

```text
development
testing
production
```

Avoid sending developer tests into production Airtable/dashboard data.

---

# 106. Test Flag

Where test and production infrastructure must temporarily overlap, events should be clearly identifiable as test data and excluded from production reporting.

A dedicated test environment is preferable where feasible.

---

# 107. CORS

Server endpoints should only permit origins required by the application.

Do not use unrestricted CORS for sensitive authenticated operations without a deliberate reason.

---

# 108. Rate Limiting

Public-facing API routes may require rate limiting to reduce:

- abuse;
- accidental loops;
- provider cost spikes;
- automated spam.

Rate limits must not unnecessarily block legitimate youth access.

---

# 109. Input Validation

Every public API endpoint should validate its input.

Examples:

```text
assistant
serviceArea
conversationId
message
booking context
```

Do not assume browser requests are trustworthy because they originated from the SAAJ frontend.

---

# 110. Message Length

Set reasonable input limits for chat messages to prevent abuse and accidental oversized requests.

Limits should still allow users to explain sensitive concerns naturally.

---

# 111. Output Validation

Provider responses should also be handled defensively.

Do not assume every external API response contains every expected field.

Handle:

```text
missing field
null field
unexpected response
timeout
malformed response
```

gracefully.

---

# 112. Content Rendering Safety

Assistant text should be rendered safely.

Do not execute arbitrary HTML/JavaScript returned by an external provider.

If rich content is supported, use a controlled rendering format.

---

# 113. URLs From Providers

Links returned by assistant systems should be validated/handled according to approved content rules.

Do not automatically make arbitrary generated URLs privileged application actions.

---

# 114. Appointment CTA Security

A conversational response saying:

```text
book appointment
```

does not itself determine the destination URL.

The SAAJ application resolves the approved scheduler from:

```text
serviceArea
```

---

# 115. Call CTA Security

Likewise:

```text
call
```

must resolve through:

```text
assistant
+
serviceArea
+
capability configuration
```

not a generated Vapi ID.

---

# 116. Webhook Routes Are Publicly Reachable

Webhook endpoints must be designed with the assumption that anyone on the internet may attempt to call them.

Therefore provider validation and idempotency are essential.

---

# 117. Webhook Response

Webhook handlers should acknowledge valid events promptly.

Heavy processing can be delegated asynchronously where architecture permits.

Do not make providers wait for unnecessary downstream dashboard calculations.

---

# 118. Webhook Failure Logging

Record enough information to retry or diagnose failures without logging unnecessary sensitive payloads.

---

# 119. Dead-Letter / Recovery Strategy

For important operational events, consider a recovery mechanism for failed processing.

Example:

```text
valid Vapi completion event
↓
Airtable temporarily unavailable
↓
event retained/retriable
↓
write succeeds later
```

Do not silently lose important operational events.

The exact mechanism may be implemented through n8n or another approved infrastructure layer.

---

# 120. Integration Observability

At minimum, operations teams should be able to identify:

```text
provider
workflow
timestamp
success/failure
request/event ID
retry state
```

without opening individual health conversations.

---

# 121. Secrets in Logs

Never log:

```text
Authorization headers
API keys
access tokens
private webhook secrets
```

Ensure provider error objects do not accidentally serialize credentials.

---

# 122. Secrets in Git

Never commit:

```text
.env.local
production keys
private provider tokens
```

to the source repository.

Use:

```text
.env.example
```

with empty placeholders where useful.

---

# 123. Example `.env.example`

```bash
VOICEFLOW_ACCESS_TOKEN=

VOICEFLOW_TONITO_MAXIXE_PROJECT_ID=
VOICEFLOW_TONITO_MASSINGA_PROJECT_ID=
VOICEFLOW_TONITO_GERAL_PROJECT_ID=

VOICEFLOW_MANUELA_MAXIXE_PROJECT_ID=
VOICEFLOW_MANUELA_MASSINGA_PROJECT_ID=
VOICEFLOW_MANUELA_GERAL_PROJECT_ID=

VAPI_PRIVATE_API_KEY=
NEXT_PUBLIC_VAPI_PUBLIC_KEY=

VAPI_TONITO_MAXIXE_ASSISTANT_ID=
VAPI_TONITO_MASSINGA_ASSISTANT_ID=
VAPI_MANUELA_MAXIXE_ASSISTANT_ID=
VAPI_MANUELA_MASSINGA_ASSISTANT_ID=

CALCOM_API_KEY=
CALCOM_MAXIXE_EVENT_TYPE_ID=
CALCOM_MASSINGA_EVENT_TYPE_ID=
```

Do not place real values in the example file.

---

# 124. Credential Rotation

The architecture should allow provider credentials to be rotated without rewriting application UI code.

Central configuration enables:

```text
old credential
↓
replace environment variable
↓
redeploy/restart as required
```

---

# 125. Integration Documentation

For each provider maintain:

```text
purpose
authentication method
required environment variables
routes/workflows
webhook events
failure behaviour
data exchanged
owner
```

This reduces dependence on undocumented implementation knowledge.

---

# 126. Privacy Review

Every new integration should answer:

```text
What data leaves SAAJ?

Why?

To which provider?

For how long?

Is identifiable data required?

What happens if the provider fails?

Can the same goal be achieved with less data?
```

before implementation.

---

# 127. New Providers

Future providers such as transcription services should be added through the same architecture.

Example:

```text
SAAJ mic
↓
approved transcription adapter
↓
editable composer text
```

Do not tightly couple the chat composer directly to a provider-specific API.

---

# 128. Deepgram

Deepgram remains optional.

First determine whether the existing Voiceflow/SAAJ implementation provides acceptable transcription behaviour.

Only introduce Deepgram if there is a defined need.

If introduced:

```text
DEEPGRAM_API_KEY
```

must remain server-side.

---

# 129. No Automatic Voice Submission

Regardless of transcription provider:

```text
speech
↓
transcription
↓
editable composer
↓
user reviews
↓
user sends
```

is the preferred text-chat microphone flow.

Do not automatically send sensitive transcribed speech without review.

---

# 130. Future Provider Replacement

The architecture should make it possible to replace:

```text
Voiceflow
Vapi
Cal.com
Airtable
```

in the future without redesigning the whole SAAJ interface.

This does not require building a complex generic abstraction now.

It requires avoiding unnecessary provider coupling.

---

# 131. Acceptance Behaviour

The integration architecture is correct when:

- SAAJ remains the user-facing product identity;
- Next.js owns the application experience;
- Voiceflow owns text conversational intelligence;
- Vapi owns realtime voice infrastructure;
- Cal.com owns appointment scheduling;
- n8n owns appropriate asynchronous automation;
- Airtable is not directly exposed to the browser;
- private provider credentials remain server-side;
- only intentionally public keys use `NEXT_PUBLIC_*`;
- provider IDs are centrally configured;
- semantic SAAJ values determine provider routing;
- six Voiceflow configurations are supported;
- four Vapi configurations are supported;
- two appointment configurations are supported;
- Geral cannot start a Vapi call;
- Geral cannot start an appointment;
- no assistant or district silently falls back to another;
- historical conversations use their stored assistant and service area;
- new conversations use current service area;
- Voiceflow responses are rendered through SAAJ-owned UI;
- health logic is not duplicated in frontend code;
- Vapi calls use SAAJ-owned call UI;
- realtime audio is not unnecessarily routed through n8n;
- post-call events can flow through n8n;
- Vapi Call ID can be used consistently as voice Session ID;
- structured outputs are validated before Airtable writes;
- real appointments are distinguished from appointment recommendations;
- direct bookings do not require fake interaction records;
- Cal.com scheduling is selected by service area;
- only one relevant scheduler is mounted;
- appointment confirmation is shown only after genuine success;
- provider webhook retries do not create duplicate records;
- public webhook endpoints validate provider events where supported;
- asynchronous analytics failures do not unnecessarily block health support;
- provider errors are translated into human-readable SAAJ states;
- stack traces and provider errors are not shown to users;
- logs avoid sensitive conversation content and credentials;
- integration failures can be monitored;
- test data can be separated from production;
- configuration can be rotated without rewriting UI components;
- optional future providers can be introduced through controlled integration boundaries.

---

# 132. Final Architecture

```text
                              USER
                               │
                               ▼
                    ┌─────────────────────┐
                    │    SAAJ VIRTUAL     │
                    │      Next.js        │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼──────────────────┐
             │                 │                  │
             ▼                 ▼                  ▼
        TEXT SUPPORT       VOICE CALL        APPOINTMENT
             │                 │                  │
             ▼                 ▼                  ▼
        SAAJ API           SAAJ CALL          SAAJ BOOKING
             │                 │                  │
             ▼                 ▼                  ▼
         Voiceflow            Vapi              Cal.com
             │                 │                  │
             │                 │                  │
             │                 ▼                  ▼
             │            Call events       Booking events
             │                 │                  │
             │                 └────────┬─────────┘
             │                          │
             │                          ▼
             │                         n8n
             │                          │
             │                    validate/transform
             │                          │
             └──────────────┬───────────┘
                            │
                            ▼
                         Airtable
                            │
                            ▼
                    Operational Analytics
                            │
                            ▼
                         Dashboard


ADMINISTRATIVE KNOWLEDGE FLOW

Google Drive
     │
     ▼
    n8n
     │
     ▼
Vapi Knowledge Base


SECURITY BOUNDARY

BROWSER
──────────────────────────────────────────
✓ SAAJ UI
✓ anonymous application state
✓ intentionally public Vapi SDK key

✗ Voiceflow access token
✗ Vapi private key
✗ Airtable token
✗ private Cal.com credentials
✗ n8n secrets
✗ hashing salts
──────────────────────────────────────────
SERVER / APPROVED INFRASTRUCTURE
```

The governing rule is:

```text
USERS SHOULD EXPERIENCE
ONE COHERENT SAAJ VIRTUAL SERVICE.

THEY SHOULD NOT NEED TO KNOW
WHETHER A CAPABILITY IS POWERED BY
VOICEFLOW,
VAPI,
CAL.COM,
N8N
OR AIRTABLE.

SAAJ OWNS THE EXPERIENCE.

PROVIDERS SUPPLY CAPABILITIES
BEHIND CONTROLLED,
SECURE BOUNDARIES.
```
````

Next is **`15-privacy-safety-and-security.md`**. This is one of the most important documents in the set because it will lock the exact behaviour for **Quick Exit, confidentiality language, sensitive chat data, local clearing vs remote deletion, microphone permissions, appointment personal data, minors/youth privacy, provider data boundaries, security, logging, and what SAAJ must never falsely promise about confidentiality or deletion.**
