Let's continue with **`12-user-state-and-persistence.md`**. This one locks what the app remembers without requiring an account, while avoiding promises about persistence that the final backend may not support.

````markdown id="7psa4k"
# SAAJ Virtual — User State & Persistence

## 1. Purpose

This document defines how SAAJ Virtual remembers a user's experience without requiring a conventional account.

It covers:

- anonymous identity;
- onboarding state;
- location state;
- assistant state;
- conversation references;
- Voiceflow session continuity;
- local browser/device persistence;
- server-side persistence boundaries;
- refresh and return behaviour;
- clearing local data;
- browser/device changes;
- cross-device limitations;
- privacy implications.

The central principle is:

```text
NO REQUIRED ACCOUNT
        +
LIGHTWEIGHT ANONYMOUS STATE
        +
APPROPRIATE CONVERSATION CONTINUITY
````

---

# 2. No Mandatory Account

Version 1 does not require users to create:

* username;
* password;
* email account;
* profile;
* SAAJ login.

The normal journey remains:

```text
Open SAAJ
   ↓
Choose location
   ↓
Choose assistant
   ↓
Access support
```

No registration wall should appear before this journey.

---

# 3. Anonymous Does Not Mean Stateless

The absence of an account does not mean the application should forget everything after every page refresh.

SAAJ may remember lightweight state on the user's device/browser to provide continuity.

For example:

```text
First visit:
Onboarding
↓
Location
↓
Assistant
↓
Support

Later visit:
Open
↓
Início
```

---

# 4. Anonymous User Identifier

On first use, the application may generate an anonymous identifier.

Conceptually:

```ts
const anonymousUserId =
  crypto.randomUUID();
```

Example:

```text
anonymousUserId =
"f462...anonymous-generated-id..."
```

The identifier itself must not encode personal information.

---

# 5. Anonymous ID Must Not Contain Personal Data

Do not generate IDs such as:

```text
manuela-maxixe-17-female-josefa
```

or:

```text
25884xxxxxxx-maxixe
```

The identifier should be opaque.

Correct:

```text
UUID / random opaque identifier
```

---

# 6. Anonymous ID Purpose

The anonymous ID may support legitimate functions such as:

* associating lightweight device state;
* conversation continuity;
* operational analytics;
* linking interactions where approved;
* avoiding unnecessary duplicate anonymous identities on the same browser.

It must not be presented to the user as an account number.

---

# 7. Initial Local State

A conceptual initial state may be:

```ts
type SaajLocalState = {
  version: number;

  anonymousUserId: string;

  onboardingCompleted: boolean;

  location?: {
    province: string;
    district?: string | null;
    serviceArea:
      | "maxixe"
      | "massinga"
      | "geral";
  };

  lastAssistant?:
    | "tonito"
    | "manuela"
    | null;
};
```

The exact implementation may evolve.

---

# 8. Persist Only What Is Needed

Do not treat localStorage as a general-purpose medical database.

Persist only information required for defined product behaviour.

Good candidates include:

```text
anonymous user ID
onboarding completion
province
district
service area
last assistant
lightweight UI preferences
conversation references where appropriate
```

Avoid casually persisting:

```text
full health history
risk assessments
clinical notes
appointment form details
phone number
full name
sensitive free-text transcripts
```

without a specific reviewed architecture.

---

# 9. Persistence Layers

SAAJ may eventually use several persistence layers.

Conceptually:

```text
USER EXPERIENCE
      │
      ├── Browser/device state
      │
      ├── SAAJ backend state
      │
      ├── Voiceflow session state
      │
      ├── Vapi operational state
      │
      ├── Cal.com booking state
      │
      └── Airtable / analytics state
```

These systems have different purposes.

Do not treat them as one database.

---

# 10. Browser / Device State

Browser storage is appropriate for lightweight experience state such as:

```text
onboardingCompleted
location
anonymousUserId
lastAssistant
conversation references
```

where the final privacy architecture permits it.

---

# 11. localStorage

`localStorage` may be used for small persistent client-side state.

Example:

```ts
localStorage.setItem(
  "saaj_state",
  JSON.stringify(state)
);
```

However, localStorage must not become the application's unrestricted store for sensitive information.

---

# 12. Do Not Store Secrets Locally

Never place:

* Voiceflow access token;
* Vapi private API key;
* Cal.com private API key;
* backend credentials;
* n8n secrets;

inside localStorage.

---

# 13. Do Not Store Sensitive Appointment Data by Default

Avoid:

```ts
localStorage.setItem(
  "appointment",
  JSON.stringify({
    fullName,
    phone,
    healthConcern,
  })
);
```

unless a reviewed requirement explicitly needs local persistence.

Appointment data should flow through the approved booking architecture.

---

# 14. Storage Key Versioning

Use a versioned state model.

Conceptually:

```ts
{
  version: 1,
  ...
}
```

This allows future application releases to migrate or safely reset incompatible state.

---

# 15. Suggested Storage Namespace

Use clearly namespaced keys.

For example:

```text
saaj:v1:state
saaj:v1:conversations
saaj:v1:preferences
```

Exact naming may differ.

Avoid generic keys such as:

```text
user
data
settings
```

that can conflict with unrelated application code.

---

# 16. Onboarding State

The application should persist:

```ts
onboardingCompleted: true
```

only after the onboarding requirements are valid.

These include:

* valid province;
* district where required;
* resolved service area;
* initial assistant selected;
* arrival at the Assistant Contact Profile.

---

# 17. Returning User Behaviour

If valid persisted state contains:

```ts
onboardingCompleted === true
```

then:

```text
Open SAAJ
   ↓
Validate local state
   ↓
Início
```

Do not replay:

```text
Welcome
Mozambique map
Assistant selection
```

on every visit.

---

# 18. Do Not Trust the Completion Flag Alone

This state is invalid:

```ts
{
  onboardingCompleted: true,
  location: null
}
```

Likewise:

```ts
{
  onboardingCompleted: true,
  location: {
    province: "Inhambane",
    district: null,
    serviceArea: "maxixe"
  }
}
```

The application must validate persisted state.

---

# 19. State Validation

Conceptually:

```ts
function isValidOnboardingState(
  state: SaajLocalState
) {
  if (!state.onboardingCompleted) {
    return false;
  }

  if (!state.location?.province) {
    return false;
  }

  if (
    state.location.province === "Inhambane" &&
    !state.location.district
  ) {
    return false;
  }

  return true;
}
```

Service area should also be revalidated through the central location resolver.

---

# 20. Derive Service Area from Location

Where practical:

```ts
const resolvedServiceArea =
  resolveServiceArea(
    province,
    district
  );
```

If stored `serviceArea` conflicts with the geographic state, the geographic resolver is authoritative.

Example:

```ts
{
  province: "Inhambane",
  district: "Vilankulo",
  serviceArea: "maxixe"
}
```

must be corrected to:

```ts
serviceArea = "geral";
```

---

# 21. Location Persistence

Persist:

```text
province
district where applicable
serviceArea
```

so returning users do not need to select location repeatedly.

Changing location through `Mais` updates the current location state.

---

# 22. Last Assistant

The application may remember:

```ts
lastAssistant:
  "tonito" | "manuela"
```

for convenience.

This may influence:

* Home assistant ordering;
* subtle continuity.

It must not become a permanent assignment.

---

# 23. Last Assistant Is Not Preferred Assistant

Do not interpret:

```ts
lastAssistant = "manuela";
```

as:

```text
The user must always use Manuela.
```

The user remains free to choose Tonito at any time.

---

# 24. Assistant Selection Does Not Delete Other State

Switching from:

```text
Manuela
```

to:

```text
Tonito
```

must not:

* delete Manuela conversations;
* overwrite conversation ownership;
* restart onboarding;
* alter location.

---

# 25. Conversation Persistence Has Two Different Problems

Conversation continuity requires distinguishing:

### Conversational context

What Voiceflow needs to continue understanding the interaction.

### User-facing transcript

What SAAJ needs to display previous messages.

These are related but not necessarily the same storage mechanism.

---

# 26. Voiceflow Session Identity

Each text conversation should have its own Voiceflow session identity.

Conceptually:

```ts
{
  conversationId: "conversation-123",
  voiceflowSessionId: "vf-session-456"
}
```

The session belongs to that conversation.

---

# 27. One Conversation, One Session Context

A new conversation creates a fresh session.

```text
+ New conversation
      ↓
new conversationId
      ↓
new voiceflowSessionId
```

Opening an existing conversation reuses:

```text
existing voiceflowSessionId
```

Do not silently generate a fresh session when resuming a thread.

---

# 28. Conversation Metadata

Conceptually:

```ts
type ConversationReference = {
  conversationId: string;

  assistant:
    | "tonito"
    | "manuela";

  serviceArea:
    | "maxixe"
    | "massinga"
    | "geral";

  voiceflowSessionId: string;

  title: string;

  preview?: string;

  createdAt: string;
  updatedAt: string;
};
```

This metadata supports:

* Conversas;
* Início recent conversations;
* correct routing;
* session resumption.

---

# 29. Conversation Metadata vs Transcript

Conversation metadata such as:

```text
assistant
serviceArea
session ID
title
updated time
```

is not equivalent to the full transcript.

The application must not assume:

```text
conversation reference exists
=
full transcript can always be reconstructed
```

---

# 30. Transcript Persistence Must Be Explicit

Before promising persistent historical transcripts, the final implementation must define where messages are stored and retrieved.

Possible architectures include:

```text
A. approved SAAJ backend
B. provider-supported retrieval
C. controlled local transcript storage
D. hybrid architecture
```

The final choice belongs to the implementation/data architecture.

---

# 31. Do Not Overpromise Voiceflow History

A Voiceflow session may preserve conversational context.

That does not automatically mean SAAJ can always retrieve every historical message for the visual inbox/chat interface.

Therefore:

```text
Voiceflow session continuity
```

and:

```text
full visual transcript persistence
```

must be validated separately.

---

# 32. Recommended Architectural Direction

For a reliable messaging-style product, the preferred long-term architecture is:

```text
SAAJ conversation record
        +
SAAJ message/transcript persistence
        +
Voiceflow session reference
```

rather than relying on the conversational provider as the only user-facing history store.

This provides greater control over:

* inbox rendering;
* conversation titles;
* previews;
* message history;
* provider independence.

The exact backend implementation should be defined before production.

---

# 33. V1 Can Be Incremental

If full server-side transcript persistence is not ready during early development, the application may initially support more limited same-device persistence.

However, the UI and product copy must reflect the actual capability.

Do not claim:

```text
Your conversations are always available.
```

unless that is true.

---

# 34. Message Model

Conceptually:

```ts
type PersistedMessage = {
  id: string;

  conversationId: string;

  role:
    | "user"
    | "assistant";

  content: string;

  createdAt: string;

  status?:
    | "sent"
    | "failed";
};
```

If persisted, message content must be handled according to the privacy/security specification.

---

# 35. Sensitive Nature of Transcripts

Sexual and reproductive health conversations may contain sensitive information.

Therefore full transcript persistence requires deliberate decisions around:

* necessity;
* storage location;
* retention;
* access;
* security;
* deletion;
* provider processing;
* analytics separation.

Do not persist transcripts merely because it is technically convenient.

---

# 36. Inbox Without Full Transcript

If only conversation metadata is locally available, `Conversas` may still render:

```text
title
assistant
timestamp
safe preview if available
```

but opening the thread must only claim to restore history that can genuinely be retrieved.

---

# 37. Conversation Titles

Titles should be privacy-conscious.

Potential examples:

```text
Saúde menstrual
Métodos contraceptivos
Prevenção de ITS
Relacionamentos
Marcação de consulta
```

Avoid storing an unnecessarily detailed sensitive summary as the title.

---

# 38. Conversation Preview

Preview text is potentially sensitive.

If stored locally or displayed on Home/Conversas:

* keep it short;
* avoid unnecessary detail;
* consider whether a neutral preview is preferable.

Detailed privacy behaviour is defined in the privacy specification.

---

# 39. Page Refresh

During an active conversation, a normal browser refresh should ideally:

```text
reload application
↓
restore conversation reference
↓
restore available transcript
↓
continue same session
```

where technically supported.

A refresh must not intentionally create a new conversation.

---

# 40. Browser Close and Return

On the same browser/device:

```text
Close SAAJ
↓
Return later
↓
Load local state
↓
Início
```

The user should not repeat onboarding if local state still exists.

Available conversation continuity depends on the implemented persistence architecture.

---

# 41. New Tab

Opening SAAJ in another tab of the same browser may share localStorage.

The application should avoid generating a second anonymous ID unnecessarily.

Concurrency issues should be handled carefully if the same conversation is opened in multiple tabs.

---

# 42. Multiple Tabs

Do not assume simultaneous message sending from multiple tabs is harmless.

Potential protections include:

* message request IDs;
* state synchronisation;
* duplicate-send prevention.

A complex real-time multi-tab system is not required for V1, but obvious duplication should be avoided.

---

# 43. Browser Data Cleared

If the user clears browser/site data:

```text
local SAAJ state
↓
removed
```

the application may no longer recognise the previous anonymous device state.

On next visit:

```text
Welcome
↓
Onboarding
```

This is expected for a no-account local-state model.

---

# 44. Do Not Promise Recovery After Browser Data Is Cleared

Without an account or separate recovery mechanism, SAAJ may not be able to reconnect the browser automatically to previous local state.

Do not promise:

```text
Your history can always be restored.
```

---

# 45. Different Browser

Example:

```text
Chrome
→ SAAJ used

Safari
→ SAAJ opened
```

These should be treated as separate browser contexts unless a server-side identity/recovery mechanism exists.

---

# 46. Different Device

Example:

```text
Phone A
→ conversations

Phone B
→ SAAJ
```

V1 should not automatically promise that Phone B will know the anonymous state from Phone A.

Cross-device continuity requires an identity/recovery architecture.

---

# 47. Cross-Device Is Not a V1 Requirement

Do not build a hidden pseudo-account merely to provide cross-device sync.

A future version may introduce optional recovery/synchronisation if justified.

V1 prioritises:

```text
low friction
+
privacy
+
same-device continuity
```

---

# 48. Installation / PWA Considerations

If SAAJ is later installable as a PWA, storage behaviour may differ from ordinary browser use.

The application should still follow the same logical state model.

Do not assume installation automatically creates a cross-device identity.

---

# 49. Private / Incognito Browsing

Private browsing may:

* isolate storage;
* clear storage after session;
* restrict persistence.

SAAJ should remain usable.

Do not guarantee persistent history in private browsing.

---

# 50. Storage Availability Failure

Browser storage may be unavailable or fail.

The application should degrade gracefully.

Example:

```text
SAAJ can still provide support
```

even if:

```text
persistent return state cannot be saved
```

Where necessary, communicate this without technical jargon.

---

# 51. Storage Failure Must Not Block Health Support

Do not implement:

```text
localStorage unavailable
↓
application unusable
```

The user should still be able to access core support where possible.

Persistence is important, but access to support has higher priority.

---

# 52. Clearing Conversations

`Mais → Limpar conversas` should clear only the conversation data defined by the final persistence architecture.

Conceptually:

```text
conversation references
+
locally persisted transcripts where applicable
```

It should not automatically clear:

```text
location
onboardingCompleted
anonymousUserId
```

unless specifically designed otherwise.

---

# 53. Clearing Conversations Updates Home

After clearing:

```text
Conversas
→ empty
```

and:

```text
Início
→ no Continuar conversa
→ no Recentes
```

Assistant access remains available.

---

# 54. Clearing Conversations Does Not Cancel Appointments

A confirmed Cal.com appointment remains a separate operational record.

Do not interpret:

```text
clear conversations
```

as:

```text
cancel appointments
```

---

# 55. Full Local Reset

A separate action may support:

```text
Limpar dados deste dispositivo
```

This is broader than clearing conversations.

---

# 56. Full Local Reset May Remove

Depending on final architecture:

```text
anonymousUserId
onboardingCompleted
location
serviceArea
lastAssistant
conversation references
local transcripts
preferences
```

---

# 57. Full Local Reset Does Not Automatically Delete Remote Data

This distinction must remain explicit.

```text
Clear device data
```

means:

```text
remove SAAJ data stored on this browser/device
```

It does not automatically mean:

```text
delete Voiceflow records
delete Vapi records
delete Cal.com bookings
delete Airtable records
```

unless a separately implemented server-side deletion workflow performs those actions.

---

# 58. New Anonymous Identity After Full Reset

If the local anonymous ID is cleared, the next fresh onboarding may generate a new anonymous ID.

Conceptually:

```text
old anonymousUserId
↓ cleared

next use
↓
new anonymousUserId
```

Do not attempt to secretly reconstruct the old identity through fingerprinting.

---

# 59. No Device Fingerprinting

Do not use invasive fingerprinting techniques to recreate anonymous identity after the user has cleared local state.

Examples to avoid:

* browser fingerprinting;
* canvas fingerprinting;
* hidden device identification;
* unrelated tracking identifiers.

User privacy takes priority over forced continuity.

---

# 60. Anonymous ID and Analytics

Analytics may use the anonymous ID where legitimately required.

However:

```text
anonymous ID
```

does not make all attached information non-sensitive.

A pseudonymous record containing sensitive health data still requires appropriate protection.

---

# 61. Voice Calls

Voice calls have their own operational session/call identity.

Example:

```ts
{
  callId: "vapi-call-id",
  anonymousUserId: "...",
  assistant: "manuela",
  serviceArea: "maxixe"
}
```

This does not need to become a text conversation record.

---

# 62. Voice Call Persistence

The application does not require a persistent user-facing call history in V1.

Operational call records may exist separately according to the approved data architecture.

---

# 63. Appointments

Appointments have their own booking identity.

They should not depend on local conversation storage to remain valid.

Example:

```text
User books appointment
↓
booking confirmed externally/backend
↓
user clears local conversations
↓
appointment remains confirmed
```

---

# 64. Appointment Information in Local State

Do not persist detailed appointment personal data locally by default.

If Home eventually displays a reliable upcoming appointment summary, store/retrieve only the minimum data required through an approved architecture.

---

# 65. User State vs Operational Data

Keep these concepts separate.

### User experience state

Examples:

```text
onboarding completed
current location
last assistant
conversation references
```

### Operational data

Examples:

```text
call interaction record
appointment booking
referral record
analytics event
```

One should not automatically be treated as the other.

---

# 66. User State vs Health Data

Likewise:

```text
serviceArea = maxixe
```

is product-routing state.

A user's:

```text
health concern
risk assessment
sexual-health history
```

is sensitive health-related content.

Do not combine them casually in a single frontend state object.

---

# 67. Separate Stores Where Appropriate

Conceptually:

```text
AppState
├── onboarding
├── location
├── preferences
└── navigation

ConversationState
├── references
├── active conversation
└── messages

Sensitive Operational Systems
├── appointments
├── calls
├── referrals
└── analytics/data workflows
```

Exact technical implementation may vary.

---

# 68. Active Conversation State

During a chat session, transient state may include:

```ts
type ActiveConversationState = {
  conversationId: string;
  draft: string;
  messages: ChatMessage[];
  sending: boolean;
  waitingForAssistant: boolean;
};
```

Not all transient UI state needs permanent storage.

---

# 69. Draft Persistence

Draft messages may optionally survive normal internal navigation.

Example:

```text
write draft
↓
open assistant profile
↓
Back
↓
draft remains
```

This improves usability.

---

# 70. Drafts Need Not Survive Everything

V1 does not need to guarantee draft recovery after:

* browser storage clearing;
* another device;
* application reinstall;
* private-session termination.

Do not over-engineer draft synchronisation.

---

# 71. Failed Messages

If a message fails to send, preserve enough state to allow:

```text
Tentar novamente
```

without forcing the user to retype it.

Avoid marking a failed message as successfully persisted to Voiceflow.

---

# 72. Pending Message IDs

Use unique message/request IDs where appropriate to reduce duplicate sends.

Conceptually:

```ts
{
  messageId: crypto.randomUUID(),
  status: "sending"
}
```

This can help retries remain idempotent.

---

# 73. Conversation Creation Must Be Atomic Enough

Avoid states where:

```text
Voiceflow session created
but conversation reference lost
```

or:

```text
conversation appears in inbox
but no usable session exists
```

Creation should be handled as one coherent workflow with recoverable failure states.

---

# 74. Conversation Creation Flow

Conceptually:

```text
Start new conversation
        ↓
Generate conversationId
        ↓
Generate/assign Voiceflow session ID
        ↓
Persist conversation reference
        ↓
Open chat
```

If initialization fails, do not leave a broken permanent row in `Conversas`.

---

# 75. Conversation Update

When messages are successfully exchanged:

```text
updatedAt
```

should update.

Where safe and appropriate:

```text
title
preview
```

may also update.

This allows Home and Conversas to order threads correctly.

---

# 76. Recent Conversation Ordering

Use:

```text
updatedAt descending
```

for:

* latest conversation;
* recent conversations;
* Conversas ordering.

Do not use creation time alone.

---

# 77. Last Assistant Update

After a meaningful interaction with an assistant:

```ts
lastAssistant = assistant;
```

may be updated.

This can influence Home ordering.

It must not alter existing conversation ownership.

---

# 78. Location Update

When location changes:

```text
current location
↓ updated

current service area
↓ updated
```

Historical conversations remain untouched.

---

# 79. State Migration

Future releases may change local-state structure.

Example:

```text
v1 state
↓
application update
↓
v2 state
```

Provide a controlled migration where reasonable.

If migration cannot be safely performed, reset only the minimum necessary state.

---

# 80. Do Not Break the App on Unknown State

If malformed/old state is found:

* validate;
* recover what is safe;
* discard invalid fields;
* request minimal user input where required.

Do not crash the entire application.

---

# 81. State Corruption

Example:

```text
invalid JSON in localStorage
```

should result in safe recovery.

Conceptually:

```ts
try {
  loadState();
} catch {
  recoverSafeState();
}
```

Do not expose stack traces to the user.

---

# 82. State Expiration

V1 does not require arbitrary automatic expiration of onboarding/location state after a short period.

Do not force users through onboarding every few days.

Sensitive conversation retention may follow separate retention rules defined in the privacy/data architecture.

---

# 83. Session Expiration Is Different

A provider session may expire even if:

```text
SAAJ local conversation reference
```

still exists.

The application must handle this explicitly.

Do not equate:

```text
provider session expired
```

with:

```text
delete user's entire local SAAJ state
```

---

# 84. Voiceflow Session Recovery

If a stored Voiceflow session cannot be resumed:

1. attempt only approved recovery;
2. preserve the SAAJ conversation reference/history where possible;
3. do not silently route to another assistant;
4. do not silently route to another service area;
5. provide a human-readable recovery path if continuity cannot be restored.

---

# 85. Do Not Pretend a New Session Is the Same Session

If a new Voiceflow session must genuinely be created after unrecoverable expiration, the implementation must not falsely imply perfect conversational continuity if previous context is unavailable.

The user-facing handling should reflect what the architecture can actually restore.

---

# 86. Server-Side Persistence

If SAAJ introduces a dedicated backend persistence layer, it should use the anonymous SAAJ identity/conversation IDs rather than requiring an account by default.

Conceptually:

```text
anonymousUserId
     ↓
conversation records
     ↓
message records
```

This could provide stronger same-device and potentially recoverable history while preserving low-friction access.

---

# 87. Server-Side Persistence Requires Privacy Design

Introducing server persistence also introduces responsibilities around:

* authentication/authorisation model;
* data access;
* retention;
* deletion;
* encryption;
* backups;
* provider access;
* breach protection.

Do not introduce a database simply to make the inbox easier without reviewing these consequences.

---

# 88. Anonymous Server Records Need Access Protection

An anonymous user ID alone should not automatically act as an unrestricted public password to sensitive conversation history.

If server-side transcript retrieval is implemented, use an appropriate secure access mechanism.

Do not expose endpoints such as:

```text
GET /conversations/{anonymousUserId}
```

with no additional protection if that would reveal sensitive information.

---

# 89. Do Not Put Sensitive IDs in Public URLs

Avoid routes such as:

```text
/chat?phone=25884xxxxxxx
```

or URLs containing health topics.

Prefer opaque identifiers.

---

# 90. URL State

Navigation may use:

```text
conversationId
```

where appropriate.

Example:

```text
/conversas/{opaqueConversationId}
```

The ID should not itself reveal sensitive information.

---

# 91. Browser History

Sensitive conversation content should not be encoded into browser URLs.

Do not place:

```text
?topic=possible-pregnancy-after-unprotected-sex
```

in the address bar.

---

# 92. Analytics Separation

Product analytics should record behavioural events without automatically ingesting message text.

Example:

```ts
{
  event: "conversation_opened",
  assistant: "manuela",
  serviceArea: "maxixe"
}
```

not:

```ts
{
  event: "conversation_opened",
  messageHistory: [...]
}
```

---

# 93. Logging Separation

Application error logs should not automatically serialize entire application state if that state can contain conversation content.

Be careful with:

```ts
console.error(error, state);
```

in production.

---

# 94. Hydration / Initial Render

In a Next.js application, client-persisted state may not be available during the initial server render.

Avoid visual flashes such as:

```text
Welcome
↓ 100ms later
Início
```

for returning users.

Use an appropriate state-hydration/loading strategy.

---

# 95. Initial State Loading

Conceptually:

```text
Application opens
       ↓
Read/validate persisted state
       ↓
Decision:
 onboarding OR Início
       ↓
Render destination
```

A short neutral loading state is preferable to rendering the wrong screen first.

---

# 96. Loading Screen

If needed:

```text
SAAJ Virtual
```

with a restrained loading state.

Do not expose technical text such as:

```text
Hydrating localStorage...
```

---

# 97. Offline Start

If local state exists but the device is offline:

```text
Open
↓
Load local state
↓
Início can render
```

External services may remain unavailable.

Do not unnecessarily discard local state because the network cannot be reached.

---

# 98. Offline Conversation History

Locally persisted conversation metadata may remain visible offline.

Full transcript availability depends on where transcripts are stored.

Do not promise offline transcript access unless implemented.

---

# 99. Offline New Message

If offline sending/queueing is not implemented:

```text
User attempts message
↓
show connection error
↓
preserve draft/message for retry
```

Do not falsely mark it as delivered.

---

# 100. Privacy Copy Must Match Persistence

The eventual privacy screen must accurately state:

* what SAAJ stores locally;
* what may be sent to service providers;
* what may be stored remotely;
* what clearing local data does;
* what it does not do.

Documentation and implementation must remain aligned.

---

# 101. Recommended V1 Persistence Baseline

At minimum, V1 should reliably preserve on the same browser/device:

```text
anonymousUserId
onboardingCompleted
province
district where applicable
serviceArea
lastAssistant
conversation references required for the inbox
```

This is the baseline.

---

# 102. Transcript Decision Before Production

Before production release, explicitly decide:

```text
Where are text transcripts stored?
How are they retrieved?
How long are they retained?
How does clearing conversations work?
Can they be recovered after provider session loss?
```

Do not leave these as accidental consequences of whichever provider is easiest.

---

# 103. Cross-Device Decision

For V1:

```text
Cross-device conversation synchronisation
= not guaranteed
```

If later introduced, it should be an explicit product/privacy feature rather than an invisible tracking mechanism.

---

# 104. Required Persistence States

The implementation must handle:

```text
First visit
Returning visit
Valid persisted state
Invalid persisted state
State migration
Refresh
Browser close and reopen
New tab
Storage unavailable
Storage cleared
Full local reset
Conversation creation
Conversation resume
Conversation session failure
Location change
Offline start
```

---

# 105. Acceptance Behaviour

User state and persistence are correctly implemented when:

* no mandatory account is required;
* an opaque anonymous ID can be generated;
* the anonymous ID contains no personal information;
* valid onboarding state survives normal return on the same browser/device;
* returning users go to Início;
* invalid persisted state is not blindly trusted;
* service area is validated from geographic state;
* location survives normal return;
* last assistant may be remembered without becoming a permanent preference;
* new conversations receive fresh conversation/session identities;
* existing conversations preserve their original session reference;
* conversation assistant ownership is immutable;
* historical service area is immutable;
* current location affects only future interactions;
* conversation metadata and full transcript are treated as different concerns;
* Voiceflow context is not incorrectly assumed to equal retrievable UI history;
* transcript persistence is explicitly designed before being promised;
* sensitive appointment data is not casually stored locally;
* private credentials are never stored in browser persistence;
* clearing conversations does not clear location by default;
* clearing conversations does not cancel appointments;
* full local reset is a separate deliberate action;
* local reset is not misrepresented as remote deletion;
* clearing local identity does not trigger device fingerprinting;
* different browsers/devices are not falsely promised automatic continuity;
* cross-device synchronisation is not assumed in V1;
* storage failure does not prevent access to support where possible;
* provider session failure does not erase all SAAJ state;
* URLs do not expose sensitive conversation content;
* generic analytics do not collect raw message text;
* the initial application render avoids flashing the wrong first-time/returning screen.

---

# 106. Final Persistence Model

```text
                         SAAJ USER
                             │
                             ▼
                   ANONYMOUS LOCAL ID
                             │
            ┌────────────────┼────────────────┐
            │                │                │
            ▼                ▼                ▼
       ONBOARDING         LOCATION        PREFERENCES
            │                │                │
            └────────────────┼────────────────┘
                             │
                             ▼
                     SAAJ APP STATE
                             │
                             ▼
                    CONVERSATION INDEX
                             │
            ┌────────────────┼────────────────┐
            │                │                │
            ▼                ▼                ▼
       Conversation A   Conversation B   Conversation C
            │
            ▼
      assistant
      serviceArea
      session reference
      safe metadata
            │
            ▼
     TRANSCRIPT STORAGE
     must be explicitly
     defined and secured
            │
            ▼
        VOICEFLOW
     conversation engine


Separate operational systems:

VAPI CALLS ────────→ approved operational data

CAL.COM BOOKINGS ──→ approved appointment data

ANALYTICS ─────────→ privacy-conscious product data
```

The governing rule is:

```text
SAAJ SHOULD REMEMBER ENOUGH
TO MAKE RETURNING EASY,

BUT IT SHOULD NOT TURN
ANONYMOUS ACCESS INTO
INVISIBLE OVER-COLLECTION.

PERSISTENCE MUST BE DELIBERATE,
MINIMAL AND HONEST.
```

```

Next is **`13-data-and-analytics.md`**. That will connect the product to the dashboard architecture you have already been developing: **Acessos à Plataforma, Interações, Marcações, Consultas, geographic access/interactions by province and district, age-group/topic analysis, risk, referrals, appointment/no-show metrics, satisfaction, session/user IDs, and the privacy boundary between operational health data and ordinary product analytics.**
```
