Let's do **`06-chat-experience.md`**. This is the document that locks the decision we made earlier: **Voiceflow powers the conversational logic; it does not dictate what the SAAJ chat interface looks like.**

````markdown
# SAAJ Virtual — Chat Experience

## 1. Purpose

This document defines the text-conversation experience between a SAAJ Virtual user and Tonito or Manuela.

It establishes:

- ownership of the chat interface;
- Voiceflow integration boundaries;
- conversation/session behaviour;
- assistant routing;
- message presentation;
- composer behaviour;
- microphone and transcription behaviour;
- loading and typing states;
- assistant profile access;
- privacy and Quick Exit;
- error handling;
- responsive behaviour.

The objective is to create a premium SAAJ messaging experience while using Voiceflow as the conversational engine behind it.

---

# 2. Fundamental Architecture Decision

**SAAJ Virtual owns the chat interface.**

Voiceflow provides:

- conversational intelligence;
- agent instructions;
- conversation logic;
- Knowledge Base access;
- variables;
- health-information behaviour;
- referral logic;
- data-collection logic;
- agent responses.

The SAAJ frontend provides:

- chat layout;
- assistant portrait;
- header;
- message bubbles;
- composer;
- microphone controls;
- typing/loading indicators;
- animations;
- Quick Exit;
- conversation navigation;
- Tonito/Manuela visual themes.

Conceptually:

```text
USER
  │
  ▼
SAAJ CHAT INTERFACE
  │
  ▼
SAAJ SERVER / INTEGRATION LAYER
  │
  ▼
VOICEFLOW
  │
  ▼
CORRECT TONITO / MANUELA AGENT
````

Voiceflow should behave as the conversational engine rather than the visible product shell.

---

# 3. Do Not Build Six Different Chat Interfaces

There are six logical Voiceflow agent experiences:

```text
Tonito
├── Maxixe
├── Massinga
└── Geral

Manuela
├── Maxixe
├── Massinga
└── Geral
```

There must not be six separately designed frontend chat experiences.

Instead, build one reusable SAAJ chat system.

Conceptually:

```tsx
<SaajChat
  assistant="manuela"
  serviceArea="maxixe"
  conversationId="..."
/>
```

The component receives context and resolves the correct conversational backend.

---

# 4. Assistant Routing

Routing depends on:

```text
Assistant
    +
Service Area
```

Result:

| Assistant | Service Area | Voiceflow Experience |
| --------- | ------------ | -------------------- |
| Tonito    | Maxixe       | Tonito Maxixe        |
| Tonito    | Massinga     | Tonito Massinga      |
| Tonito    | Geral        | Tonito Geral         |
| Manuela   | Maxixe       | Manuela Maxixe       |
| Manuela   | Massinga     | Manuela Massinga     |
| Manuela   | Geral        | Manuela Geral        |

Users must never see or select these technical configurations.

---

# 5. Centralised Agent Resolution

Voiceflow project selection must be centralised.

Conceptually:

```ts
const voiceflowAgents = {
  tonito: {
    maxixe: process.env.VOICEFLOW_TONITO_MAXIXE_PROJECT_ID,
    massinga: process.env.VOICEFLOW_TONITO_MASSINGA_PROJECT_ID,
    geral: process.env.VOICEFLOW_TONITO_GERAL_PROJECT_ID,
  },

  manuela: {
    maxixe: process.env.VOICEFLOW_MANUELA_MAXIXE_PROJECT_ID,
    massinga: process.env.VOICEFLOW_MANUELA_MASSINGA_PROJECT_ID,
    geral: process.env.VOICEFLOW_MANUELA_GERAL_PROJECT_ID,
  },
};
```

Do not scatter project IDs throughout UI components.

---

# 6. Voiceflow Authentication

The application uses:

```text
VOICEFLOW_ACCESS_TOKEN
```

as the shared Voiceflow access credential.

The six Voiceflow experiences are identified through their respective project IDs.

The Voiceflow access token must remain server-side.

Never expose it through:

```text
NEXT_PUBLIC_
```

or client-side JavaScript.

---

# 7. Server Boundary

The browser should communicate with a SAAJ-controlled server endpoint rather than directly exposing private Voiceflow credentials.

Conceptually:

```text
Browser
   ↓
/api/chat/*
   ↓
Voiceflow API
```

The exact route structure may evolve, but the security boundary must remain.

---

# 8. New Conversation

A new conversation is created when the user explicitly starts a fresh chat.

Entry points may include:

* `Mensagem` from an assistant Contact Profile;
* `+` from Conversas;
* an explicit assistant-specific empty-state CTA.

Flow:

```text
User chooses new conversation
        ↓
Resolve assistant
        ↓
Resolve current serviceArea
        ↓
Generate fresh conversation/session identity
        ↓
Resolve Voiceflow agent
        ↓
Initialise conversation
        ↓
Open chat
```

---

# 9. Existing Conversation

When the user selects an existing conversation:

```text
Conversation selected
        ↓
Read stored conversation metadata
        ↓
Read original assistant
        ↓
Read original serviceArea
        ↓
Read original Voiceflow session
        ↓
Open chat
        ↓
Resume existing session
```

Do not generate a fresh session.

---

# 10. Conversation Identity

Conceptually:

```ts
type Conversation = {
  conversationId: string;

  assistant:
    | "tonito"
    | "manuela";

  serviceArea:
    | "maxixe"
    | "massinga"
    | "geral";

  voiceflowSessionId: string;

  title?: string;

  createdAt: string;
  updatedAt: string;
};
```

The implementation may contain additional internal metadata.

---

# 11. Conversation Ownership Is Immutable

Once created:

```ts
conversation.assistant
```

and:

```ts
conversation.serviceArea
```

must not silently change.

Example:

```text
Conversation created:
Manuela + Maxixe

User later moves to:
Maputo

Historical conversation:
still Manuela + Maxixe
```

New conversations use the current service area.

---

# 12. Chat Screen Structure

Recommended mobile structure:

```text
┌─────────────────────────────────┐
│ ←   [portrait] Manuela      Exit│
│                SAAJ Virtual     │
│─────────────────────────────────│
│                                 │
│       assistant message         │
│                                 │
│                 user message    │
│                                 │
│       assistant message         │
│                                 │
│                                 │
│                                 │
│ ╭─────────────────────────────╮ │
│ │ Escreve...          🎙   ↑ │ │
│ ╰─────────────────────────────╯ │
└─────────────────────────────────┘
```

The chat should feel like a dedicated communication space.

---

# 13. Chat Header

The header should include:

* back navigation;
* assistant portrait;
* assistant name;
* SAAJ Virtual identity or appropriate status;
* Quick Exit.

Example:

```text
←   [portrait]  Manuela        [exit icon]
                SAAJ Virtual
```

Avoid cluttering the header with technical information.

---

# 14. Assistant Header Is Interactive

The assistant portrait/name should be tappable.

Flow:

```text
Chat
 ↓
Tap Manuela name/avatar
 ↓
Manuela Contact Profile
```

Likewise for Tonito.

This mirrors familiar messaging behaviour.

---

# 15. Contact Profile from Chat

Opening the Contact Profile from an existing chat must not destroy or replace the active conversation.

Returning should restore the chat state.

Conceptually:

```text
Chat
 ↓
Contact Profile
 ↓ back
Same Chat
```

---

# 16. Header Status

A simple contextual status may be shown.

Examples:

```text
SAAJ Virtual
```

or, where meaningful:

```text
Disponível
```

Do not falsely simulate human online presence.

Avoid fake states such as:

```text
Online now
Last seen 10:42
```

unless they represent actual system behaviour.

---

# 17. Tonito Chat Theme

Tonito chat uses:

* warm/clean white;
* subtle ice/powder-blue atmosphere;
* cobalt/electric blue accent;
* near-black text.

Colour should primarily affect:

* background glow;
* selected controls;
* typing indicator;
* contextual UI accents;
* user/assistant bubble treatment where appropriate.

Do not saturate the entire chat blue.

---

# 18. Manuela Chat Theme

Manuela chat uses:

* warm/clean white;
* subtle blush/rose atmosphere;
* berry/raspberry accent;
* near-black text.

Colour should affect the same component categories as Tonito.

Do not saturate the entire chat pink.

---

# 19. Shared Chat Structure

Tonito and Manuela must use the same structural components.

Example:

```tsx
<ChatHeader assistant={assistant} />
<MessageList messages={messages} />
<ChatComposer assistant={assistant} />
```

Assistant identity is expressed through data and design tokens.

Avoid maintaining separate duplicated implementations such as:

```text
TonitoChat.tsx
ManuelaChat.tsx
```

unless a future genuine behavioural requirement makes this necessary.

---

# 20. Message Types

At minimum, the frontend should support:

```text
user message
assistant message
system/loading state
error/retry state
```

The architecture should remain extensible for structured messages such as:

* appointment CTA;
* referral CTA;
* informational cards;
* safe external resources;

when explicitly produced by the approved conversation logic.

---

# 21. Assistant Message Bubble

Assistant messages should use a light surface.

Example:

```text
╭────────────────────────────╮
│ Posso ajudar-te com isso.  │
│                            │
│ Existem diferentes...      │
╰────────────────────────────╯
```

Characteristics:

* readable;
* light;
* comfortable padding;
* assistant-context accent where appropriate;
* not excessively wide.

---

# 22. User Message Bubble

User messages should be clearly distinguishable.

Example:

```text
             ╭──────────────────────╮
             │ Queria saber mais    │
             │ sobre contracepção.  │
             ╰──────────────────────╯
```

Use stronger contextual contrast while maintaining readability.

Do not rely exclusively on colour to distinguish speaker.

Alignment and geometry should also communicate ownership.

---

# 23. Message Width

Recommended maximum bubble width:

```text
approximately 75–82% of mobile content width
```

Very short messages should not unnecessarily stretch.

Long responses should remain comfortably readable.

---

# 24. Long Assistant Responses

The frontend must handle long Voiceflow responses gracefully.

Do not:

* shrink text;
* overflow the viewport;
* force horizontal scrolling.

Long messages should wrap naturally.

Where Voiceflow returns multiple structured text blocks, preserve sensible separation.

---

# 25. Lists in Assistant Messages

Where the assistant returns a list, render it readably.

Example:

```text
Podes considerar:

• opção A
• opção B
• opção C
```

Do not collapse structured health information into unreadable paragraphs.

---

# 26. Links

Links returned through approved assistant content should:

* be visually recognisable;
* use safe link behaviour;
* preserve SAAJ context where possible;
* avoid displaying long raw URLs.

External destinations should be clearly identifiable when necessary.

---

# 27. Message Composer

The composer is the primary interaction control.

Recommended:

```text
╭──────────────────────────────────╮
│ Escreve uma mensagem...    🎙  ↑│
╰──────────────────────────────────╯
```

Components:

* editable text field;
* microphone;
* send action.

---

# 28. Composer Behaviour

When empty:

* microphone may be prominent;
* send may be disabled/subtle.

When text exists:

* send becomes active.

The composer should expand vertically for longer text up to a reasonable maximum.

After that, internal scrolling may be used.

---

# 29. Send Behaviour

On send:

```text
User writes
    ↓
Tap Send
    ↓
Message appears immediately
    ↓
Composer clears
    ↓
Request sent
    ↓
Assistant processing state
    ↓
Response appears
```

Where technically safe, use optimistic UI for the user's own message.

If delivery fails, the failed state must be recoverable.

---

# 30. Prevent Accidental Duplicate Sends

While the same message request is being submitted:

* prevent rapid duplicate sends;
* maintain responsive feedback.

Do not make the entire composer unusable for unnecessarily long periods.

---

# 31. Sending State

A user message being transmitted may temporarily show a subtle state.

Do not expose technical request terminology.

If successful, the state disappears naturally.

If unsuccessful, provide retry.

---

# 32. Failed Message

Example:

```text
             ╭──────────────────────╮
             │ Queria saber...      │
             ╰──────────────────────╯
                    Não enviado

                    [ Tentar novamente ]
```

The user should not need to retype the message.

---

# 33. Assistant Processing State

After sending, show a contextual indicator.

Tonito:

```text
Tonito está a responder...
```

Manuela:

```text
Manuela está a responder...
```

A minimal animated typing indicator may be used.

---

# 34. Do Not Fake Human Typing

Typing animation exists to communicate system processing.

Do not deliberately add long artificial delays to make the AI appear human.

The response should appear as soon as it is reasonably available.

---

# 35. Streaming

If the chosen Voiceflow/API integration supports reliable response streaming, the frontend may progressively render responses.

If not, use a typing/loading state until the response is available.

Do not fake token streaming purely for visual effect.

---

# 36. Microphone

The composer may include microphone functionality.

The preferred experience is:

```text
Tap microphone
      ↓
Speak
      ↓
Transcribe
      ↓
Text appears in composer
      ↓
User reviews/edits
      ↓
User sends
```

Voice transcription must not automatically submit health-related content without user review.

---

# 37. Voiceflow Native Microphone First

Before implementing an additional transcription provider, test whether the selected Voiceflow integration can provide the required experience:

```text
speech
  ↓
transcription
  ↓
editable composer
  ↓
manual send
```

If Voiceflow supports this satisfactorily, do not introduce another provider unnecessarily.

---

# 38. Deepgram Is Optional, Not a V1 Dependency

Deepgram may later be used if Voiceflow's available speech-to-text experience cannot satisfy the required UX.

Potential future environment variables:

```bash
# DEEPGRAM_API_KEY=
# DEEPGRAM_MODEL=nova-3
# DEEPGRAM_LANGUAGE=pt
```

Do not configure or depend on these variables until required.

---

# 39. Custom Transcription Architecture

If Deepgram or another provider is introduced later:

```text
Browser microphone
      ↓
audio
      ↓
SAAJ server endpoint
      ↓
transcription provider
      ↓
text
      ↓
composer
      ↓
user review
      ↓
Voiceflow
```

Private transcription credentials must remain server-side.

---

# 40. Recording State

When microphone recording is active, make the state unmistakable.

Possible UI:

```text
[ ■ Parar ]     00:07
```

or a clear waveform/state indicator.

The user must understand:

* recording has started;
* recording can be stopped;
* the recording has not automatically been sent as a message.

---

# 41. Microphone Permission Failure

If browser/device permission is denied:

```text
Não foi possível usar o microfone.

Podes continuar a escrever a tua mensagem.
```

Do not block text chat.

---

# 42. Unsupported Microphone

If microphone input is unavailable:

* hide or disable the microphone gracefully;
* preserve text messaging.

The entire conversation must not depend on speech input.

---

# 43. Keyboard Behaviour

On mobile:

* composer remains visible above the keyboard;
* messages remain scrollable;
* bottom controls must not become trapped behind keyboard UI;
* safe-area insets must be respected.

Test on both iOS and Android browser behaviour.

---

# 44. Auto-Scroll

When the user sends a message:

* keep their message visible;
* reveal the assistant processing state;
* reveal the new response naturally.

However, if the user has deliberately scrolled upward to read older messages, do not aggressively force them to the bottom every time state changes.

A `jump to latest` control may appear where useful.

---

# 45. Conversation History Rendering

Opening an existing thread should restore available prior messages.

Do not show only the latest Voiceflow response if previous conversation content is available through the approved persistence architecture.

The implementation must distinguish:

```text
Voiceflow conversational context
```

from:

```text
UI transcript/history persistence
```

These may require different mechanisms.

---

# 46. Do Not Assume Voiceflow Is the UI Transcript Database

A Voiceflow session maintaining conversational context does not automatically guarantee that the SAAJ frontend can reconstruct a full historical message interface indefinitely.

Therefore the final implementation must explicitly define how the transcript required by the UI is persisted/retrieved.

This is covered further in:

`12-user-state-and-persistence.md`

Do not overpromise conversation history until that architecture is implemented.

---

# 47. Conversation Start

A new conversation may begin with an assistant welcome message generated by the approved Voiceflow experience.

The frontend should not independently invent medical or conversational opening content if Voiceflow owns that behaviour.

The frontend may display purely interface-level copy where necessary.

---

# 48. Voiceflow Controls Health Behaviour

The following must remain controlled by the approved Voiceflow assistant configuration:

* health answers;
* follow-up questions;
* risk assessment;
* referral decisions;
* appointment recommendations;
* safety escalation;
* conversational personality;
* knowledge-base use;
* data collection during conversation.

Do not duplicate this health logic in React components.

---

# 49. Frontend Controls Presentation

The frontend may determine:

* bubble style;
* line breaks;
* CTA component rendering;
* visual grouping;
* loading indicators;
* transitions;
* navigation.

Presentation must not change the substantive meaning of Voiceflow's health response.

---

# 50. Structured Actions

The architecture should allow Voiceflow/backend responses to trigger approved structured UI actions.

For example:

```text
Assistant determines appointment is appropriate
        ↓
Structured appointment action
        ↓
Frontend renders:
[ Marcar um encontro ]
```

rather than relying solely on the assistant writing:

> Go click somewhere else to book.

---

# 51. Appointment CTA

For Maxixe/Massinga, an approved conversation may expose:

```text
[ Marcar um encontro ]
```

Tapping it opens the same SAAJ appointment experience used elsewhere.

Do not create a second scheduling implementation inside chat.

---

# 52. Appointment CTA — Geral

The frontend must respect service availability.

A Geral conversation must not render a functional Maxixe/Massinga appointment CTA merely because generic text resembles an appointment suggestion.

Service routing remains authoritative.

---

# 53. Voice Call CTA

Where appropriate, Maxixe/Massinga may expose:

```text
[ Ligar ]
```

which opens the relevant assistant's Vapi call experience.

This should use the same assistant and service context.

Example:

```text
Manuela Maxixe chat
      ↓
Ligar
      ↓
Manuela Maxixe Vapi
```

---

# 54. Quick Exit

Chat is a sensitive context.

A discreet Quick Exit control must be available.

It should:

* be reachable quickly;
* leave the sensitive chat view;
* avoid displaying sensitive content on the destination;
* not delete the conversation merely because the user exits.

Exact destination/behaviour is defined in the privacy specification.

---

# 55. Quick Exit Is Not Delete

These are different actions.

```text
Quick Exit
→ hide/leave sensitive context
```

```text
Delete/Clear
→ remove stored information
```

Never combine them into one ambiguous control.

---

# 56. Back Navigation

Normal Back:

```text
Chat
 ↓
previous SAAJ screen
```

Possible destinations include:

* Conversas;
* assistant Contact Profile;
* Início.

Back navigation must preserve the conversation.

---

# 57. Browser Back

Browser/device back behaviour should be handled so users do not accidentally lose unsent text or break application state.

Where practical:

* preserve draft during normal internal navigation;
* restore the conversation correctly.

Do not trap users by disabling normal back navigation unnecessarily.

---

# 58. Draft Messages

Where feasible, unsent text may be preserved temporarily when navigating to the assistant profile and back.

Drafts do not need to be synchronised across devices in V1.

Do not treat drafts as sent health information.

---

# 59. Privacy Badge

A subtle indicator may appear near the conversation beginning or header:

```text
[lock icon] Conversa privada
```

Do not repeat the message after every assistant response.

---

# 60. No Provider Branding

Do not show:

```text
Powered by Voiceflow
Voiceflow Agent
Voiceflow Session
```

as the primary chat identity.

Users are talking to:

**Tonito**

or:

**Manuela**

within:

**SAAJ Virtual**

---

# 61. No Technical Metadata

Do not display:

* Voiceflow Project ID;
* session ID;
* API status;
* model name;
* token count;
* request latency;
* internal risk JSON.

Technical information belongs in logs/administrative tooling.

---

# 62. Error Handling — Voiceflow Unavailable

Example:

```text
Não foi possível obter uma resposta agora.

A tua mensagem não se perdeu.

[ Tentar novamente ]
```

Only state that the message was preserved if it actually was.

Otherwise use:

```text
Não foi possível enviar a mensagem agora.

[ Tentar novamente ]
```

---

# 63. Network Loss

If connectivity disappears during conversation:

```text
Sem ligação à internet.

Podes continuar aqui e tentar enviar
quando a ligação voltar.
```

Only support queued sending if it is actually implemented.

Do not imply offline health-assistant capability where none exists.

---

# 64. Retry Behaviour

Retrying a failed user message should not create multiple copies of the same message or multiple duplicate Voiceflow turns.

Use appropriate request-state/idempotency handling where possible.

---

# 65. Session Failure

If the Voiceflow session becomes invalid:

1. attempt approved technical recovery;
2. preserve UI history where possible;
3. do not silently route the conversation to another assistant;
4. do not silently change service area.

If a genuinely new session is required, handle this explicitly in the data architecture.

---

# 66. Health Safety Presentation

If the assistant produces urgent or safety-related guidance, the frontend may visually emphasise it.

However, the frontend must not independently decide medical urgency.

The urgency classification must originate from the approved conversational/safety logic.

Presentation may use:

* clear hierarchy;
* appropriate system-state colour;
* relevant CTA.

Do not use Tonito blue or Manuela berry as substitutes for danger/urgent-state semantics.

---

# 67. Message Actions

V1 does not require social messaging actions such as:

* reactions;
* forwarding;
* public sharing;
* stickers;
* GIFs.

Keep the communication environment focused.

Copying text may remain available through normal platform behaviour where appropriate.

---

# 68. Attachments

File/image attachment should not be assumed as part of V1 unless explicitly implemented and supported safely by the assistant architecture.

Do not add a decorative paperclip button that has no functional backend.

---

# 69. Conversation Menu

If a conversation menu is required, keep it minimal.

Potential future actions:

```text
Ver perfil
Limpar conversa
Ajuda
```

Do not add generic messenger features merely because other messaging applications have them.

---

# 70. Bottom Navigation During Chat

The persistent three-item bottom navigation does not need to remain visible inside the active chat.

The chat composer requires the bottom interaction area.

Preferred immersive hierarchy:

```text
Chat Header
Messages
Composer
```

Navigation back to the application occurs through the chat header/back action.

This avoids competition between:

```text
Composer
```

and:

```text
Início | Conversas | Mais
```

---

# 71. Mobile Chat

Mobile is the primary chat experience.

The screen should use nearly the full viewport.

Priorities:

* clear assistant identity;
* maximum readable conversation area;
* reachable composer;
* stable keyboard behaviour;
* Quick Exit;
* smooth scrolling.

---

# 72. Desktop Chat

Desktop may use a messaging layout with the conversation list beside the active thread.

Example:

```text
┌─────────────────────────────────────────────────────────┐
│ Conversas              │ Manuela                        │
│                        │────────────────────────────────│
│ Saúde menstrual        │                                │
│ Contracepção           │     assistant message          │
│ Marcação               │                                │
│                        │                 user message    │
│                        │                                │
│                        │ [ Escreve...             ↑ ]   │
└─────────────────────────────────────────────────────────┘
```

The active conversation remains the same component architecture.

---

# 73. Tablet Chat

Tablet may transition between:

* immersive single-thread view;
* two-pane view;

depending on available width.

Do not force desktop density onto small tablets.

---

# 74. Accessibility

Chat must support:

* semantic message grouping;
* keyboard navigation;
* screen readers;
* accessible labels for icon buttons;
* adequate contrast;
* sufficient tap targets;
* logical focus behaviour.

New assistant messages should be announced accessibly without repeatedly interrupting the user.

---

# 75. Reduced Motion

Respect reduced-motion settings.

Typing indicators may remain functional but should not rely on aggressive animation.

Message appearance should remain understandable without sliding/bouncing transitions.

---

# 76. Performance

The chat should avoid rendering an unlimited transcript into the DOM.

For long conversations, consider:

* pagination;
* incremental history loading;
* virtualisation where justified.

Do not prematurely introduce complex virtualisation for small histories.

---

# 77. Scroll History

If older messages are not loaded initially:

```text
User scrolls upward
       ↓
Load earlier messages
       ↓
Preserve scroll position
```

Avoid jumping the viewport when older content appears.

---

# 78. Analytics

Potential privacy-conscious UI events:

```text
chat_opened
message_send_attempted
message_sent
message_send_failed
microphone_started
microphone_transcription_completed
assistant_profile_opened
quick_exit_used
```

Possible properties:

```ts
{
  assistant: "manuela",
  serviceArea: "maxixe"
}
```

Do not send actual message text as generic product analytics.

Health/content analytics must follow the separately approved data architecture.

---

# 79. Assistant Configuration Must Not Be Hard-Coded into UI

Do not create logic such as:

```ts
if (assistant === "manuela") {
  // medical behaviour here
}
```

Assistant health behaviour belongs in Voiceflow.

Frontend assistant differences should primarily concern:

* visual theme;
* portrait;
* display name;
* technical routing configuration.

---

# 80. Environment Variables

Relevant Voiceflow configuration:

```bash
VOICEFLOW_ACCESS_TOKEN=

VOICEFLOW_TONITO_MAXIXE_PROJECT_ID=
VOICEFLOW_TONITO_MASSINGA_PROJECT_ID=
VOICEFLOW_TONITO_GERAL_PROJECT_ID=

VOICEFLOW_MANUELA_MAXIXE_PROJECT_ID=
VOICEFLOW_MANUELA_MASSINGA_PROJECT_ID=
VOICEFLOW_MANUELA_GERAL_PROJECT_ID=
```

Do not create six separate access tokens unless the actual Voiceflow architecture later requires them.

---

# 81. Security

Never expose:

```text
VOICEFLOW_ACCESS_TOKEN
```

to browser source.

Do not:

```ts
process.env.NEXT_PUBLIC_VOICEFLOW_ACCESS_TOKEN
```

Private Voiceflow requests must occur through an appropriate server-side boundary.

---

# 82. Logging

Technical logs may include:

* request ID;
* conversation ID;
* assistant;
* service area;
* response status;
* latency;
* non-sensitive error information.

Avoid logging raw sensitive conversation content unless explicitly required and governed by the approved privacy/data policy.

---

# 83. Chat Component Architecture

Suggested conceptual components:

```text
SaajChat
├── ChatHeader
│   ├── AssistantAvatar
│   ├── AssistantIdentity
│   └── QuickExit
│
├── MessageList
│   ├── AssistantMessage
│   ├── UserMessage
│   ├── StructuredAction
│   └── TypingIndicator
│
└── ChatComposer
    ├── TextInput
    ├── MicrophoneButton
    └── SendButton
```

Keep integration/network logic outside purely presentational components.

---

# 84. Chat State

Conceptually:

```ts
type ChatState = {
  conversationId: string;
  assistant: "tonito" | "manuela";
  serviceArea: "maxixe" | "massinga" | "geral";

  messages: ChatMessage[];

  draft: string;

  status:
    | "idle"
    | "sending"
    | "waiting"
    | "error";

  microphoneState:
    | "idle"
    | "recording"
    | "transcribing";
};
```

Exact implementation may differ.

---

# 85. Message Model

Conceptually:

```ts
type ChatMessage = {
  id: string;

  role:
    | "user"
    | "assistant";

  content: string;

  createdAt: string;

  status?:
    | "sending"
    | "sent"
    | "failed";
};
```

Structured message/action types may extend this model.

---

# 86. Custom UI vs Voiceflow Widget

The implementation should first evaluate the appropriate Voiceflow API/runtime integration for the custom SAAJ interface.

The desired final architecture is:

```text
CUSTOM SAAJ UI
      +
VOICEFLOW CONVERSATIONAL ENGINE
```

rather than:

```text
Six separately customised
Voiceflow web-chat widgets
```

Do not sacrifice the required SAAJ product experience merely because a default widget is faster to embed.

---

# 87. Voiceflow Agent Changes

Changes involving conversational behaviour should be made in Voiceflow.

Examples:

```text
Change how Tonito greets users
Change referral logic
Change health-response instructions
Change Knowledge Base usage
Change data collection
Change appointment recommendation behaviour
```

These are Voiceflow responsibilities.

---

# 88. Application Changes

Changes involving presentation should be made in the SAAJ application.

Examples:

```text
Change bubble radius
Change chat background
Move microphone button
Change Tonito blue
Change Manuela berry
Change portrait size
Change typing animation
Change header layout
Change Quick Exit placement
```

These should not require manually restyling six Voiceflow agents.

---

# 89. Shared Behaviour Across Voiceflow Agents

Where the same conversational behaviour is required across all six Voiceflow agents, avoid unnecessary manual divergence.

Maintain common instructions/knowledge architecture wherever Voiceflow's configuration model permits it.

However, do not attempt to move health logic into the frontend merely to avoid maintaining Voiceflow agents.

The frontend should remain presentation-focused.

---

# 90. Required Chat States

The implementation must support:

```text
New conversation
Existing conversation
History loading
History loaded
Sending message
Waiting for assistant
Assistant responding
Send failure
Retry
Connection failure
Microphone idle
Microphone recording
Transcribing
Microphone permission failure
Structured CTA
Quick Exit
```

---

# 91. Acceptance Behaviour

The chat implementation is correct when:

* SAAJ owns the visible chat interface;
* Voiceflow powers conversational behaviour;
* one reusable chat architecture serves Tonito and Manuela;
* the correct Voiceflow agent is selected from assistant + service area;
* private Voiceflow credentials remain server-side;
* new conversations create fresh sessions;
* existing conversations resume their original sessions;
* conversation ownership does not change;
* historical service area does not silently change;
* the assistant portrait/name opens the Contact Profile;
* user and assistant messages are visually distinct;
* the composer supports normal text entry;
* microphone input, if supported, produces editable text before sending;
* microphone failure does not prevent text chat;
* processing states are clearly communicated;
* failed messages can be retried;
* provider errors are not exposed;
* Quick Exit is available;
* health logic is not duplicated in the frontend;
* structured appointment/call actions respect service availability;
* Voiceflow/Vapi/provider branding does not replace SAAJ identity;
* mobile keyboard and safe areas are handled correctly;
* chat remains accessible and responsive.

---

# 92. Final Architecture

```text
                         SAAJ VIRTUAL
                              │
                              ▼
                     CUSTOM CHAT UI
                              │
               ┌──────────────┴──────────────┐
               │                             │
             Tonito                       Manuela
               │                             │
       ┌───────┼───────┐             ┌───────┼───────┐
       │       │       │             │       │       │
    Maxixe  Massinga  Geral       Maxixe  Massinga  Geral
       │       │       │             │       │       │
       └───────┴───────┴─────┬───────┴───────┴───────┘
                              │
                         VOICEFLOW
                              │
                  Conversational logic
                  Knowledge Base
                  Health guidance
                  Referral logic
                  Data collection
```

The most important architectural boundary is:

```text
WHAT THE ASSISTANT SAYS
          ↓
      VOICEFLOW

HOW THE CONVERSATION LOOKS
AND FEELS
          ↓
     SAAJ FRONTEND
```

This boundary should remain consistent throughout Version 1.

```

This also answers the earlier question in a way the eventual coding agent cannot misunderstand: **we should not manually redesign six Voiceflow chat widgets.** We configure the six agents' intelligence in Voiceflow, while the SAAJ application provides one shared premium chat interface.

Next is **`07-assistant-contact-profile.md`** — the screen at the centre of our Option C approach. It will lock Tonito/Manuela's WhatsApp-inspired profiles, Message/Call/Appointment logic, `Geral` behaviour, privacy/Quick Exit, and how the same profile works whether entered from onboarding, Início, or a chat header.
```
