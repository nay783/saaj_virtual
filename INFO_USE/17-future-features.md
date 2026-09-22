Next is **`17-future-features.md`**. This document should prevent future ideas from leaking into V1 while ensuring today's architecture can support them later.

````markdown id="saaj17future"
# SAAJ Virtual — Future Features

## 1. Purpose

This document defines product capabilities intentionally considered for future versions of SAAJ Virtual but **not included in V1**.

Its purpose is to:

- protect V1 from scope creep;
- preserve architectural compatibility with future expansion;
- document the intended direction of future capabilities;
- distinguish approved concepts from current functionality;
- prevent placeholder features from being presented as working services.

The central principle is:

```text
DESIGN FOR FUTURE EXPANSION

WITHOUT

BUILDING THE FUTURE
INTO V1.
```

---

# 2. V1 Boundary

The current SAAJ Virtual V1 focuses on:

```text
First-time onboarding
Location routing
Tonito and Manuela
Text conversations
Conversation continuity
Voice calls in Maxixe and Massinga
Appointments in Maxixe and Massinga
Início
Conversas
Mais
Privacy controls
Public health information
Programme analytics
```

Anything described in this document remains outside V1 unless explicitly promoted into the release scope.

---

# 3. Current Future Priorities

Two significant future capabilities have already been identified:

```text
1. Mensagens para Mim

2. Telemedicine
```

They solve different problems.

---

# 4. Mensagens para Mim

`Mensagens para Mim` is a future opt-in feature through which users may receive supportive, educational or wellbeing-oriented messages from SAAJ Virtual.

It is not intended to be:

```text
advertising
spam
generic engagement notifications
automated diagnosis
unsolicited health profiling
```

---

# 5. Product Purpose

The feature should help young people receive useful, discreet content about subjects they deliberately choose.

Potential areas include:

```text
Bem-estar

Relacionamentos

Saúde sexual

Autocuidado

Motivação
```

The final taxonomy should be validated before implementation.

---

# 6. Explicit Opt-In

`Mensagens para Mim` must be optional.

The user actively chooses whether to receive messages.

Do not automatically enable it because the user:

```text
completed onboarding
started a conversation
asked a health question
booked an appointment
```

---

# 7. Primary Personalisation Source

The safest primary source of personalisation is:

```text
explicit user-selected interests
```

Example:

```text
Sobre o que gostarias de receber mensagens?

☐ Bem-estar
☐ Relacionamentos
☐ Saúde sexual
☐ Autocuidado
☐ Motivação
```

This is preferable to silently inferring interests from sensitive conversations.

---

# 8. Conversation-Based Personalisation

A future version may explore personalisation based on conversational context only if:

- the user understands and agrees;
- the privacy model permits it;
- the use is proportionate;
- sensitive profiling is avoided;
- the architecture has been specifically reviewed.

Conversation history should not automatically become a marketing/personalisation profile.

---

# 9. Frequency

Potential future frequency choices may include:

```text
Todos os dias

3 vezes por semana

Uma vez por semana

Não receber
```

The exact options should be tested with users.

---

# 10. User Control

Users should be able to:

```text
enable messages
disable messages
change interests
change frequency
```

without contacting support.

---

# 11. Content Source

Messages should come from an:

```text
approved SAAJ content library
```

or another controlled and reviewed content source.

Do not allow an unrestricted generative model to independently invent health campaigns and send them proactively.

---

# 12. Content Governance

Potential content should be:

- medically appropriate;
- youth-friendly;
- concise;
- culturally appropriate;
- reviewed;
- non-judgemental;
- suitable for the intended age range;
- privacy-conscious.

---

# 13. Content Model

Conceptually:

```ts
type SaajMessage = {
  id: string;

  category:
    | "bem-estar"
    | "relacionamentos"
    | "saude-sexual"
    | "autocuidado"
    | "motivacao";

  title: string;
  content: string;

  ageGroups?: string[];
  serviceAreas?: string[];

  status:
    | "draft"
    | "approved"
    | "retired";
};
```

Exact fields may evolve.

---

# 14. Approved Content Only

Only content with:

```text
status = approved
```

should be eligible for automated delivery.

---

# 15. Message Selection

A future message engine may consider:

```text
selected interests
frequency
age group where legitimately known
location/service context where relevant
previously delivered message IDs
```

It should avoid unnecessary sensitive inference.

---

# 16. Avoid Repetition

The system should remember enough delivery state to avoid repeatedly sending the same message.

Conceptually:

```text
user
+
message ID
+
delivery timestamp
```

---

# 17. Scheduling

n8n could support message scheduling.

Conceptually:

```text
opted-in user
      ↓
selected interests
      ↓
delivery schedule
      ↓
n8n
      ↓
approved content selection
      ↓
delivery
```

The final delivery channel must be defined before implementation.

---

# 18. Delivery Channels

Potential channels may include:

```text
in-app
push notification
SMS
other approved channel
```

No channel should be assumed before privacy, cost and technical review.

---

# 19. Lock-Screen Privacy

Notifications must not expose sensitive topics.

Avoid:

```text
SAAJ Virtual

Hoje vamos falar sobre o método
contraceptivo que pesquisaste.
```

Prefer:

```text
SAAJ Virtual

Uma mensagem para ti 💛
```

The user opens SAAJ to view the actual content.

---

# 20. Notification Permission

If browser/mobile push is eventually used:

```text
explain benefit
↓
user opts in
↓
request system permission
```

Do not request notification permission immediately on first launch.

---

# 21. Messages Are Not Clinical Alerts

`Mensagens para Mim` must not become a mechanism for:

```text
clinical monitoring
emergency warnings
diagnosis
medication instructions
individual treatment plans
```

unless a completely different approved clinical workflow is introduced.

---

# 22. Messages Are Not Appointment Reminders

Keep these systems conceptually separate.

```text
Appointment reminder
=
operational service communication
```

```text
Mensagens para Mim
=
optional educational/support content
```

A user may disable `Mensagens para Mim` without disabling essential appointment communications they separately agreed to receive.

---

# 23. Potential User Experience

A future settings entry could be:

```text
Mais

MENSAGENS

[💛 Mensagens para Mim]
 Escolhe o que gostarias de receber >
```

This should not appear in V1 as a dead feature.

---

# 24. Future Setup Example

Conceptually:

```text
Mensagens para Mim

Recebe mensagens úteis sobre temas
que são importantes para ti.

Sobre o que gostarias de receber mensagens?

[ ] Bem-estar
[ ] Relacionamentos
[ ] Saúde sexual
[ ] Autocuidado
[ ] Motivação

Com que frequência?

( ) Todos os dias
( ) 3 vezes por semana
( ) Uma vez por semana

[ Activar mensagens ]
```

Copy requires user testing before production.

---

# 25. Message Inbox

A future version may provide an in-app area for delivered content.

Example:

```text
Mensagens para Mim

Hoje
Uma mensagem para ti

Ontem
Cuidar de ti também importa

Esta semana
Falar sobre limites numa relação
```

This should remain separate from conversations with Tonito and Manuela unless deliberate product research supports combining them.

---

# 26. Do Not Pollute Conversas

`Conversas` currently represents user conversations with:

```text
Tonito
Manuela
```

Automated campaign messages should not automatically appear as fake assistant conversations.

---

# 27. Persona Relationship

Future messages may use the SAAJ brand or potentially Tonito/Manuela presentation.

This must be decided deliberately.

Do not assume that every automated message should impersonate a live message from an assistant.

---

# 28. Analytics

Future analytics may include:

```text
feature opted in
feature opted out
selected category
delivery success
message opened
```

Avoid collecting unnecessary sensitive behavioural profiles.

---

# 29. Success Measures

Potential programme measures include:

```text
opt-in rate
retention of opt-in
delivery success
open rate
category interest
user-reported usefulness
```

Engagement metrics must not override privacy or health-quality considerations.

---

# 30. Mensagens para Mim — V1 Rule

For V1:

```text
DO NOT BUILD
```

unless scope is explicitly changed.

Do not add:

```text
disabled settings row
Coming soon card
notification permission request
placeholder inbox
fake scheduled messages
```

simply because the architecture anticipates the feature.

---

# 31. Telemedicine

Telemedicine is a separate future capability through which a user could communicate remotely with a **real health professional**.

This is fundamentally different from:

```text
Tonito
Manuela
```

who are digital assistants.

---

# 32. Telemedicine Purpose

Potential telemedicine could allow a young person to:

```text
book remote consultation
join a waiting room
speak to a health professional
use audio or video
receive appropriate professional guidance
continue/referral to in-person services
```

---

# 33. Digital Assistant vs Health Professional

The distinction must remain explicit.

```text
TONITO / MANUELA
Digital assistants
```

versus:

```text
TELEMEDICINE PROVIDER
Real health professional
```

The interface must not blur these roles.

---

# 34. Potential Future Journey

Conceptually:

```text
User
 ↓
Tonito / Manuela
 ↓
Need for professional consultation
 ↓
Telemedicine offered where appropriate
 ↓
Book / Join
 ↓
Waiting room
 ↓
Health professional
 ↓
Audio / Video consultation
 ↓
Follow-up / Referral
```

This is conceptual only.

---

# 35. Telemedicine May Also Be Direct

A future product could potentially offer:

```text
Falar com um profissional
```

without requiring a previous AI conversation.

This should be determined through service design and operational capacity.

---

# 36. Telemedicine Is Not Vapi Assistant Voice

Current Vapi voice calls are:

```text
User
↔
Tonito / Manuela
```

They are AI-assisted voice conversations.

Future telemedicine is:

```text
User
↔
real health professional
```

Do not treat these as the same feature.

---

# 37. Telemedicine Requires New Architecture

Likely requirements include:

```text
provider identity
provider availability
professional scheduling
waiting room
real-time human communication
audio/video infrastructure
consultation status
professional handoff
follow-up
clinical/service records
consent
additional privacy controls
```

These requirements do not belong in V1.

---

# 38. Camera

SAAJ V1 does not require camera access.

Telemedicine may introduce video later.

Only then should camera permission be considered.

---

# 39. Camera Permission

Future flow should be:

```text
user chooses video consultation
↓
clear explanation
↓
request camera permission
```

Do not request camera access globally merely because telemedicine may exist later.

---

# 40. Audio-Only Telemedicine

Future telemedicine should consider an audio-only option.

Reasons may include:

```text
bandwidth
privacy
device limitations
user preference
camera availability
```

Video should not automatically be mandatory unless clinically/operationally necessary.

---

# 41. Low-Bandwidth Design

Mozambique connectivity conditions make bandwidth resilience important.

Future telemedicine should consider:

```text
adaptive video quality
audio fallback
reconnection
low-bandwidth mode
clear connection state
```

---

# 42. Waiting Room

A future waiting room might display:

```text
Consulta pronta em breve

Estás na fila.

[ Testar microfone ]
[ Testar câmara ]

[ Sair ]
```

Do not invent exact waiting times unless reliable provider data exists.

---

# 43. Professional Availability

Telemedicine must not display:

```text
Profissional disponível agora
```

unless operational availability is genuinely known.

---

# 44. Professional Identity

Where a real provider is involved, the user may need appropriate information such as:

```text
name
professional role
service/facility
```

subject to programme policy.

Do not use fictional healthcare-provider profiles.

---

# 45. Scheduling

Telemedicine may reuse parts of the appointment architecture.

However:

```text
in-person appointment
```

and:

```text
remote consultation
```

must remain distinguishable.

---

# 46. Appointment Type

Future booking may require:

```ts
type AppointmentType =
  | "in_person"
  | "telemedicine";
```

This field is not required in V1 unless operationally useful now.

---

# 47. Referral From Assistant

Future Voiceflow/Vapi logic may be able to return a structured action:

```text
telemedicine recommended
```

The frontend would then validate:

```text
service availability
location
operational hours
eligibility
```

before rendering the action.

---

# 48. Frontend Must Not Independently Prescribe Telemedicine

The UI should not infer:

```text
this health concern requires telemedicine
```

from keywords.

Clinical/service recommendation remains governed by approved health logic.

---

# 49. Telemedicine Privacy

A future telemedicine implementation requires a dedicated privacy review covering:

```text
video
audio
identity
professional access
consultation records
recording
transcription
retention
clinical notes
consent
provider platform
```

Existing chat privacy documentation is not sufficient by itself.

---

# 50. Recording

Do not assume telemedicine consultations will be recorded.

Recording, if ever required, needs:

```text
clear purpose
explicit policy
appropriate consent
secure storage
retention rules
access controls
```

---

# 51. Screenshots

SAAJ cannot completely prevent device-level screenshots during a web consultation.

Do not promise otherwise.

---

# 52. Professional Dashboard

Telemedicine may eventually require a professional interface.

Potential capabilities:

```text
availability
waiting users
appointments
consultation context
referral information
consultation completion
follow-up
```

This should be a separate protected operational environment.

---

# 53. Do Not Expose Airtable as Clinical UI

Airtable may support programme operations but should not automatically become the long-term clinician-facing telemedicine application.

A dedicated professional interface may be required.

---

# 54. Clinical Records

If future telemedicine creates formal clinical records, the architecture and governance requirements will be significantly stronger than ordinary anonymous SAAJ conversation history.

This requires separate design and policy work.

---

# 55. Emergency Limitations

Future telemedicine must clearly define:

```text
what it can support
what it cannot support
what happens in emergencies
```

Do not imply that an online waiting room is an emergency service unless it genuinely operates as one.

---

# 56. Provider No-Show

Future telemedicine must handle:

```text
professional unavailable
professional late
connection failed
user missed consultation
```

with clear recovery.

---

# 57. User No-Show

Operational systems may need to track:

```text
scheduled
attended
cancelled
no-show
rescheduled
```

according to programme requirements.

---

# 58. Continuity With In-Person Care

Telemedicine should complement rather than isolate existing health services.

Potential flow:

```text
digital support
↓
telemedicine
↓
in-person referral where needed
```

The exact service model requires programme approval.

---

# 59. Telemedicine — V1 Rule

For V1:

```text
DO NOT BUILD
```

Do not add:

```text
camera permissions
video SDK
waiting-room placeholder
fake doctors
telemedicine booking option
professional availability status
```

until the service is operationally ready.

---

# 60. Architectural Compatibility

Although future features are not built now, V1 should avoid choices that make them unnecessarily difficult later.

---

# 61. Navigation Compatibility

Current navigation:

```text
Início
Conversas
Mais
```

can accommodate future capabilities without adding navigation items prematurely.

For example:

```text
Mensagens para Mim
```

could live inside:

```text
Mais
```

or later become more prominent based on evidence.

Telemedicine may be surfaced contextually.

---

# 62. Assistant Structured Actions

The chat architecture should remain extensible beyond:

```text
text
appointment
call
```

Future structured actions could include:

```text
telemedicine
approved educational content
service referral
```

without rewriting the message renderer.

---

# 63. Extensible Action Type

Conceptually:

```ts
type SaajAction =
  | {
      type: "appointment";
    }
  | {
      type: "call";
    }
  | {
      type: "telemedicine";
    }
  | {
      type: "content";
    };
```

Only currently supported action types should be enabled in V1.

---

# 64. Capability Architecture

Current capability model:

```ts
{
  message: true,
  call: true,
  appointment: true
}
```

may later expand to:

```ts
{
  message: true,
  call: true,
  appointment: true,
  telemedicine: false,
  personalMessages: false
}
```

Do not add these flags until they serve a concrete implementation need.

---

# 65. Data Architecture Compatibility

Use stable concepts such as:

```text
anonymousUserId
interactionId
conversationId
appointmentId
serviceArea
assistant
channel
```

rather than designing data structures around only one current provider.

This improves future extensibility.

---

# 66. Channel Extensibility

Current channels may include:

```text
text
voice
appointment
```

Future architecture may need:

```text
telemedicine_audio
telemedicine_video
personal_message
```

Avoid database schemas that make additional channels impossible.

---

# 67. Provider Independence

Future features may use different providers.

Do not assume:

```text
Vapi must power telemedicine
```

or:

```text
Cal.com must forever power all scheduling
```

Provider selection should follow future requirements.

---

# 68. No Premature SDKs

Do not install:

```text
video SDK
push notification SDK
telemedicine SDK
marketing notification SDK
```

during V1 merely because they might be useful later.

Every dependency adds maintenance and security cost.

---

# 69. No Placeholder Database Fields Without Need

Avoid filling current production tables with dozens of empty future columns.

Add future fields when the feature becomes concrete.

---

# 70. Feature Flags

When a future feature enters controlled testing, feature flags may be useful.

Conceptually:

```ts
{
  personalMessages: false,
  telemedicine: false
}
```

This is useful during actual implementation/testing.

It is not necessary simply to document future ideas.

---

# 71. Geographic Rollout

Future capabilities may not launch everywhere simultaneously.

The service architecture should support:

```text
feature
+
service area
```

availability.

Example:

```text
Telemedicine

Maxixe       ✓
Massinga     ✓
Geral        ✕
```

This is an example only, not an approved rollout decision.

---

# 72. Persona Rollout

Some future features may be:

```text
service-level
```

rather than:

```text
assistant-level
```

Telemedicine, for example, would likely belong to SAAJ services rather than to Tonito or Manuela individually.

---

# 73. Future Human Handoff

A broader future capability may be:

```text
digital assistant
↓
human professional
```

without requiring the user to repeat all relevant information.

Any transfer of conversation context must:

- be purposeful;
- be minimised;
- follow consent/privacy requirements;
- avoid transferring irrelevant sensitive history.

---

# 74. Context Handoff

Do not automatically send an entire chat transcript to a human professional.

A future handoff may use:

```text
approved structured summary
```

or selected information.

The exact model requires clinical and privacy review.

---

# 75. Future Cross-Device Continuity

V1 is primarily anonymous/device-based.

A future version may explore:

```text
optional cross-device recovery
```

without abandoning low-friction anonymous access.

Potential mechanisms require separate privacy analysis.

---

# 76. Do Not Force Accounts Later Without Research

Future cross-device functionality does not automatically mean:

```text
every user must create an account
```

Optional recovery mechanisms may be preferable.

---

# 77. Future Language Support

SAAJ may eventually support additional languages.

Architecture should avoid unnecessary assumptions that every interface string will always be Portuguese.

Use centralised UI strings where practical.

---

# 78. Assistant Language

Future assistant language expansion must also be coordinated with:

```text
Voiceflow
Vapi
knowledge bases
speech recognition
voice models
health-content review
```

Translation of the frontend alone is insufficient.

---

# 79. Accessibility Expansion

Future capabilities must maintain existing accessibility requirements.

Telemedicine, for example, may eventually need consideration for:

```text
captions
transcription
hearing accessibility
low vision
keyboard use
```

depending on the selected platform.

---

# 80. Future Offline Support

A future version may explore improved low-connectivity or partial offline access.

Potential examples:

```text
cached public health information
saved approved educational content
connection-aware retry
```

---

# 81. Offline AI Conversations

Do not assume full Voiceflow/Vapi conversations can operate offline.

True offline conversational support would require a substantially different architecture.

---

# 82. Offline Public Information

Public approved health information is a more realistic candidate for future offline caching.

This should be considered separately from live assistant functionality.

---

# 83. Future PWA

SAAJ may later be evaluated as a:

```text
Progressive Web App
```

for:

- home-screen installation;
- better mobile return experience;
- selected offline assets;
- future notifications where appropriate.

Do not introduce PWA complexity solely for branding.

---

# 84. PWA Privacy

If SAAJ becomes installable:

- app name/icon should remain discreet;
- notifications must remain privacy-conscious;
- cached sensitive data must be reviewed;
- service-worker caching must exclude inappropriate private content.

---

# 85. Future Native Applications

Android/iOS applications may be considered later.

The current architecture should therefore keep:

```text
business logic
provider routing
data contracts
```

reasonably separate from web-only visual code.

This does not require building a mobile API platform prematurely.

---

# 86. Future Dashboard Expansion

Operational analytics may expand as usage grows.

Potential areas:

```text
geographic access
assistant usage
topics
age groups
referrals
appointments
no-shows
waiting time
satisfaction
risk
service journey
```

Expansion must continue to follow privacy principles.

---

# 87. Age-by-Topic Analysis

A future dashboard may support questions such as:

```text
What topics are most common
among users aged 14?
```

This requires appropriate structured data and filtering.

It does not require exposing raw conversations.

---

# 88. Geographic Analytics

Future dashboards may allow:

```text
province
district
service area
```

filters across:

```text
accesses
interactions
appointments
```

while maintaining aggregation/privacy protections.

---

# 89. Future Referral Tracking

Future versions may improve continuity between:

```text
assistant recommendation
referral
appointment
attendance
consultation
```

This should use stable IDs rather than guessing relationships.

---

# 90. Future Satisfaction

Satisfaction collection may become more systematic.

Keep it:

- brief;
- optional where appropriate;
- correctly typed in the data model;
- separate from sensitive clinical content.

---

# 91. Future Content Library

The public SEO information layer and `Mensagens para Mim` may eventually share an approved content-management foundation.

For example:

```text
approved health content
       │
       ├── public website
       ├── assistant knowledge
       └── personal messages
```

However, content formats and approval requirements may differ.

---

# 92. Single Source of Truth

Where practical, future architecture should reduce contradictory health information across:

```text
public pages
Voiceflow
Vapi
personal messages
```

through governed content processes.

Do not automatically assume one technical database must power every channel.

---

# 93. Content Versioning

Future content governance may benefit from:

```text
version
approval status
approved by
approval date
review date
retired status
```

especially for health information.

---

# 94. Future Service Directory

SAAJ may later provide a richer directory of:

```text
health facilities
available services
opening information
referral options
```

This could extend the existing health-post knowledge base.

---

# 95. Service Directory Reliability

Facility information must be maintained.

An outdated service directory can be worse than no directory.

Future implementation therefore needs:

```text
source
owner
update process
last reviewed
```

---

# 96. Future Human Support

SAAJ may later support other forms of human interaction such as:

```text
live chat
callback
counsellor messaging
```

These should not be simulated by AI.

If a human service is unavailable, the UI must say so accurately.

---

# 97. Future Escalation

Future human escalation may introduce states such as:

```text
requested
waiting
accepted
connected
completed
unavailable
```

These should be based on real service state.

---

# 98. Future Appointment Management

A later version may introduce:

```text
Meus encontros
```

with:

```text
upcoming appointment
reschedule
cancel
directions
status
```

only if appointment identity and retrieval can be handled reliably.

---

# 99. Appointment Management Is Not V1

Do not create a fake appointment history merely from local state.

A future appointment-management experience requires authoritative booking data.

---

# 100. Future Service Feedback

Users may later provide feedback about:

```text
digital assistant
voice call
booking process
health service visit
```

These are different experiences and should not be collapsed into one ambiguous rating.

---

# 101. Future Personalisation Principle

Personalisation should primarily increase:

```text
relevance
clarity
continuity
```

not maximise engagement.

SAAJ is a health-support service, not an attention platform.

---

# 102. No Engagement Dark Patterns

Future features must not use:

```text
streaks
fear of missing out
aggressive badges
artificial urgency
guilt-based notifications
```

to drive health-service usage.

---

# 103. Future AI Features

Any new AI capability should answer:

```text
What problem does it solve?

Why does AI improve this?

What data does it require?

Can the result affect health decisions?

How is the content governed?

What happens when it is wrong?
```

before implementation.

---

# 104. Do Not Add AI Because It Is Available

Examples of features requiring strong justification include:

```text
automatic emotion profiling
automatic relationship scoring
pregnancy-risk prediction
sexual-behaviour prediction
personality profiling
```

These should not be added casually.

---

# 105. Future Roadmap Stages

A useful conceptual roadmap is:

```text
V1
│
├── Core SAAJ Virtual
│
├── Text
│
├── Voice where available
│
└── Appointments where available
│
▼
V1.x
│
├── reliability improvements
├── analytics refinement
├── content expansion
└── UX improvements
│
▼
FUTURE
│
├── Mensagens para Mim
├── stronger low-connectivity support
├── appointment management
├── human handoff
└── telemedicine
```

This is a product direction, not a committed release schedule.

---

# 106. Promotion Into Active Scope

A future feature should move into implementation only when the team has defined:

```text
user problem
target users
service owner
operational workflow
privacy requirements
data requirements
technical architecture
success measures
failure behaviour
content/clinical governance
release geography
```

---

# 107. Future Feature Checklist

Before implementation ask:

```text
Is there a validated user need?

Is the service operationally ready?

Who owns it?

What happens when it fails?

What personal data does it require?

Does it affect health decisions?

Does it require new consent?

Does it require new providers?

Does it require staff?

Does it work with low connectivity?

Is it available everywhere?

How will users know its limitations?

How will success be measured?
```

---

# 108. V1 Protection Rule

When implementing V1, developers should not interpret this document as a requirement to create future screens.

Specifically, V1 should not include:

```text
Mensagens para Mim UI
notification preferences
telemedicine UI
camera permissions
waiting rooms
professional dashboards
appointment-history screens
cross-device login
PWA push notifications
future feature placeholders
```

unless another approved specification explicitly changes the release scope.

---

# 109. Avoid "Coming Soon" Clutter

Do not fill SAAJ with:

```text
Em breve
```

cards for speculative capabilities.

Users should primarily see services they can actually use.

---

# 110. Architecture Rule

Future compatibility means:

```text
avoid unnecessary blockers
```

not:

```text
implement half of every future feature now
```

---

# 111. Acceptance Behaviour

The future-feature architecture is correct when:

- V1 remains focused;
- `Mensagens para Mim` is not accidentally implemented as generic notifications;
- personal messages require explicit opt-in;
- user-selected interests are the preferred personalisation source;
- sensitive conversation history is not silently converted into a messaging profile;
- future proactive health content comes from an approved content system;
- lock-screen content remains discreet;
- personal messages remain distinct from appointment reminders;
- automated messages do not create fake conversation threads;
- users can later opt out easily;
- telemedicine remains clearly distinct from Tonito/Manuela AI voice;
- no camera permission is requested in V1;
- no fake healthcare professionals are displayed;
- no fake waiting room is built;
- future professional availability must use real operational state;
- audio-only telemedicine can remain possible;
- low-bandwidth requirements are considered;
- telemedicine receives a dedicated privacy/security review before launch;
- future human handoff does not automatically transfer entire chat histories;
- V1 conversation/action architecture can support new structured actions later;
- data models do not unnecessarily lock SAAJ to current providers;
- future channels can be added without redefining the entire interaction model;
- no unnecessary future SDKs are installed;
- no placeholder database complexity is added without need;
- future feature rollout can vary by geography;
- future cross-device functionality does not automatically force accounts;
- future language expansion remains technically possible;
- future analytics remain structured and privacy-conscious;
- no dark patterns are introduced;
- AI is added only for defined user/service needs;
- future features are promoted into scope only after operational, privacy and technical requirements are defined.

---

# 112. Future Product Model

```text
                         SAAJ VIRTUAL
                              │
                ┌─────────────┼─────────────┐
                │             │             │
                ▼             ▼             ▼
              V1 NOW       FUTURE        FUTURE
                │             │             │
                ▼             ▼             ▼
          TONITO/MANUELA   MENSAGENS    TELEMEDICINE
                │          PARA MIM           │
         ┌──────┼──────┐      │              ▼
         │      │      │      ▼        REAL PROFESSIONAL
         ▼      ▼      ▼   OPT-IN             │
       TEXT   VOICE   BOOK  INTERESTS          │
              │      │       │                ▼
        Maxixe/      │       ▼          AUDIO / VIDEO
        Massinga     │   APPROVED              │
                     │    CONTENT               ▼
                     │       │             FOLLOW-UP /
                     ▼       ▼              REFERRAL
                 Maxixe/  DISCREET
                 Massinga DELIVERY
```

---

# 113. Final Principle

```text
THE FUTURE OF SAAJ VIRTUAL
SHOULD BE EXPANDABLE,
BUT V1 SHOULD REMAIN FOCUSED.

DO NOT BUILD FEATURES
BEFORE THE SERVICE BEHIND THEM EXISTS.

DO NOT CREATE
FAKE AVAILABILITY,
FAKE PROFESSIONALS,
FAKE NOTIFICATIONS
OR PLACEHOLDER HEALTH SERVICES.

BUILD TODAY'S ARCHITECTURE
SO TOMORROW'S CAPABILITIES
CAN BE ADDED CLEANLY.

BUT BUILD TODAY
ONLY WHAT USERS
CAN ACTUALLY USE.
```
````

That completes **`17-future-features.md`**.

The next file is **`18-acceptance-criteria.md`**. This will be the **pre-launch checklist/source of truth** that consolidates the decisions from all the previous documents into testable pass/fail criteria—from first launch → location → Tonito/Manuela → chat/call/booking → returning user → privacy/Quick Exit → responsive behaviour → integrations.
