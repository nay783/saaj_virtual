Absolutely. Next is **`05-conversas-dashboard.md`**. This locks the unified inbox model and prevents the implementation from accidentally creating separate Tonito and Manuela chat areas.

````markdown
# SAAJ Virtual — Conversas Dashboard

## 1. Purpose

`Conversas` is the central conversation-management screen of SAAJ Virtual.

It allows users to:

- view previous conversations;
- resume an existing conversation;
- filter conversations by assistant;
- distinguish Tonito and Manuela threads;
- start a new conversation with either assistant.

The screen should behave like a modern messaging inbox.

It must not behave like:

- an administrative dashboard;
- a health record;
- two separate chatbot applications;
- a list of Voiceflow sessions;
- a technical interaction log.

---

# 2. Core Product Model

Tonito and Manuela behave like two contacts inside the same SAAJ Virtual communication environment.

Therefore there is:

**one Conversas screen**

with three filters:

```text
Todas | Tonito | Manuela
````

There must not be:

```text
Tonito Conversations page
+
Manuela Conversations page
```

as independent product areas.

---

# 3. Main Mobile Structure

Recommended structure:

```text
Conversas


[ Todas ]   [ Tonito ]   [ Manuela ]


[avatar]
Saúde menstrual
Manuela · última mensagem...       10:42

[avatar]
Métodos contraceptivos
Tonito · última mensagem...        Ontem

[avatar]
Marcação de consulta
Manuela · última mensagem...       18 Set


                              [ + ]


      Início   Conversas   Mais
                  ●
```

The interface should remain visually lightweight.

---

# 4. Screen Header

Primary title:

**Conversas**

Optional supporting text should only be added if genuinely useful.

Avoid:

```text
Gestão de conversas
Histórico de interações
Sessões do utilizador
```

The familiar term `Conversas` is sufficient.

---

# 5. Bottom Navigation

The shared floating navigation remains available:

```text
Início      Conversas      Mais
                ●
```

`Conversas` is the active destination.

The dock remains primarily neutral because it belongs to SAAJ Virtual rather than either assistant.

---

# 6. Conversation Filters

Immediately below the screen header, provide:

```text
[ Todas ]   [ Tonito ]   [ Manuela ]
```

These filters change which conversation threads are visible.

They do not:

* create conversations;
* change conversation ownership;
* permanently change assistant preference;
* modify location;
* switch existing Voiceflow sessions.

They are simply inbox filters.

---

# 7. Todas Filter

`Todas` displays conversations with both assistants.

Example:

```text
Todas

[M] Saúde menstrual
    Manuela · há 2 horas

[T] Métodos contraceptivos
    Tonito · Ontem

[M] Marcação de consulta
    Manuela · 18 Set
```

Sort by most recent activity.

---

# 8. Tonito Filter

Selecting:

`Tonito`

displays only Tonito conversations.

Example:

```text
Tonito

[T] Métodos contraceptivos
    Ontem

[T] Prevenção de ITS
    14 Set
```

The filter may introduce subtle Tonito blue styling.

The overall application remains SAAJ Virtual.

---

# 9. Manuela Filter

Selecting:

`Manuela`

displays only Manuela conversations.

Example:

```text
Manuela

[M] Saúde menstrual
    há 2 horas

[M] Marcação de consulta
    18 Set
```

The filter may introduce subtle Manuela berry/blush styling.

---

# 10. Filter Visual States

Suggested selected states:

### Todas

Neutral:

```text
dark / pearl / near-black
```

### Tonito

```text
soft blue background
blue accent
```

### Manuela

```text
soft blush background
berry accent
```

Unselected filters remain neutral.

The colour change should be subtle.

---

# 11. Filter Transition

Changing filters should happen instantly or with a lightweight transition.

Preferred:

```text
Todas
  ↓ tap
Tonito

conversation rows fade/reposition smoothly
```

Avoid:

* full-page reload;
* large transition;
* navigation spinner;
* route change where unnecessary.

Filtering should feel like manipulating the current inbox.

---

# 12. Filter State

The application may remember the last selected filter during the current session.

However, the filter is not a permanent user preference.

It must never determine which assistant owns a conversation.

Example:

```text
Current filter = Tonito
```

does not mean:

```text
Current assistant = Tonito everywhere
```

These concepts must remain separate.

---

# 13. Conversation Data Model

Each conversation requires enough information to restore its correct context.

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

Additional fields may be added where implementation requires them.

Provider-specific IDs should not be exposed directly in the UI.

---

# 14. Conversation Ownership

Every thread permanently belongs to the assistant with whom it was created.

Example:

```ts
{
  conversationId: "conversation-123",
  assistant: "manuela"
}
```

Opening this conversation must route to Manuela.

It must never route to Tonito simply because:

* Tonito filter was previously active;
* Tonito was last used;
* Tonito appears first on Home.

---

# 15. Service Context Ownership

Every thread should also preserve the service context under which it was created.

Example:

```ts
{
  assistant: "manuela",
  serviceArea: "maxixe"
}
```

If the user later changes location:

```text
Maxixe → Maputo
```

the historical thread remains:

```text
Manuela Maxixe
```

It must not silently become:

```text
Manuela Geral
```

New conversations use the current location/service area.

---

# 16. Opening an Existing Conversation

Tapping an existing row performs:

```text
Conversation selected
        ↓
Read conversation metadata
        ↓
Resolve original assistant
        ↓
Resolve original session
        ↓
Open chat
        ↓
Resume conversation
```

It does not create a new Voiceflow session.

---

# 17. Existing Conversation vs New Conversation

This distinction is fundamental.

### Existing conversation

```text
Tap conversation row
        ↓
Resume existing session
```

### New conversation

```text
Tap +
        ↓
Choose assistant
        ↓
Create new session
```

These flows must remain technically distinct.

---

# 18. Conversation Row

Each row should provide enough information for recognition without exposing unnecessary detail.

Recommended structure:

```text
[avatar]  Saúde menstrual                 10:42
          Manuela · Posso explicar...
```

or:

```text
[avatar]  Métodos contraceptivos          Ontem
          Tonito · Existem diferentes...
```

Hierarchy:

1. topic/title;
2. assistant identity;
3. short preview;
4. timestamp.

---

# 19. Assistant Recognition

The assistant should be identifiable through:

* portrait/avatar;
* name;
* subtle contextual accent.

Do not rely only on blue vs pink.

This supports accessibility and reduces ambiguity.

---

# 20. Conversation Titles

Conversation titles should help users distinguish multiple threads.

Examples:

```text
Saúde menstrual
Métodos contraceptivos
Prevenção de ITS
Marcação de consulta
Relacionamentos
```

Avoid generic titles such as:

```text
Conversa 1
Conversa 2
Nova conversa
```

where meaningful titles are technically available.

---

# 21. Title Generation

Conversation titles may eventually be:

* generated from controlled topic classification;
* derived from approved conversation categories;
* created from safe metadata.

Do not expose a raw sensitive user message as the title.

Do not allow title generation to become an uncontrolled health-summary system.

---

# 22. Sensitive Title Principle

Titles must balance:

```text
Recognition
     +
Privacy
```

For example, prefer:

```text
Contracepção
```

over:

```text
Tive relação sexual sem preservativo ontem
```

Prefer:

```text
Saúde menstrual
```

over a detailed description of symptoms.

The inbox may be visible when another person is near the user's device.

---

# 23. Message Preview

The preview should be short.

Recommended:

* one line;
* truncated where necessary;
* no large health summaries.

If privacy requirements later justify it, previews may be reduced or hidden.

The architecture should not depend on full message text being displayed in the inbox.

---

# 24. Timestamp

Use familiar human-readable timestamps.

Examples:

```text
10:42
Ontem
18 Set
```

Avoid raw technical timestamps:

```text
2026-09-18T13:22:04.000Z
```

Time display should respect the application's local timezone handling.

---

# 25. Sort Order

Default order:

**most recently active first**

Conceptually:

```ts
conversations.sort(
  (a, b) =>
    new Date(b.updatedAt).getTime() -
    new Date(a.updatedAt).getTime()
);
```

Where possible, the data layer should already return the correct ordering.

---

# 26. Floating New Conversation Button

Provide a floating `+` action.

Example:

```text
                              ╭─────╮
                              │  +  │
                              ╰─────╯
```

The button should:

* remain easily reachable;
* float above bottom navigation;
* respect safe areas;
* not obscure conversation rows.

---

# 27. Meaning of the + Button

The `+` button means:

**Start a new conversation**

It does not mean:

* add contact;
* add appointment;
* create account;
* change assistant.

---

# 28. New Conversation Bottom Sheet

Tapping `+` opens a bottom sheet.

Example:

```text
╭─────────────────────────────────╮
│                                 │
│ Nova conversa                   │
│                                 │
│ Com quem queres falar?          │
│                                 │
│ [Tonito]   Tonito            →  │
│                                 │
│ [Manuela]  Manuela           →  │
│                                 │
╰─────────────────────────────────╯
```

Use the shared glass/bottom-sheet design system.

---

# 29. New Conversation from Todas

If the current filter is:

`Todas`

the user chooses Tonito or Manuela.

Example:

```text
+
↓
Nova conversa
↓
Manuela
↓
Create Manuela session
↓
Open Manuela chat
```

---

# 30. New Conversation from Tonito Filter

Even if the current filter is `Tonito`, the safest consistent behaviour is for `+` to still open:

```text
Com quem queres falar?

Tonito
Manuela
```

The current filter may visually emphasise Tonito, but it must not silently remove user choice.

This keeps the meaning of `+` consistent throughout the screen.

---

# 31. New Conversation from Manuela Filter

Likewise:

```text
Current filter = Manuela
        ↓
Tap +
        ↓
Tonito or Manuela
```

Do not assume that the user necessarily wants another Manuela thread merely because they are currently viewing that filter.

---

# 32. Assistant Choice Creates Fresh Session

After assistant selection:

```text
assistant selected
       ↓
resolve current serviceArea
       ↓
resolve correct Voiceflow project
       ↓
create fresh session ID
       ↓
create conversation record
       ↓
open chat
```

This must be a new conversation.

---

# 33. Current Location Determines New Conversation Routing

Example:

```text
Current location:
Inhambane · Maxixe

Current serviceArea:
maxixe

User:
+ → Manuela

Result:
Manuela Maxixe Voiceflow
```

Example:

```text
Current location:
Maputo Cidade

serviceArea:
geral

User:
+ → Tonito

Result:
Tonito Geral Voiceflow
```

The user does not choose the technical agent manually.

---

# 34. No Service-Area Choice in New Conversation Sheet

Do not display:

```text
Choose:

Tonito Maxixe
Tonito Massinga
Tonito Geral
Manuela Maxixe
Manuela Massinga
Manuela Geral
```

This is internal architecture.

The application already knows the current service area.

---

# 35. Empty State — No Conversations at All

If there are no conversations:

```text
Conversas


[ Todas ] [ Tonito ] [ Manuela ]


          [assistant visual]

Ainda não tens conversas.

Fala com Tonito ou Manuela
quando quiseres.


      [ Nova conversa ]


                              [ + ]
```

Avoid technical empty-state copy such as:

`0 sessions found`.

---

# 36. Empty State — Tonito Filter

If conversations exist but none belong to Tonito:

```text
Tonito


        [Tonito portrait]

Ainda não falaste com Tonito.

Começa uma conversa quando quiseres.

[ Falar com Tonito ]
```

The CTA may directly create/start a Tonito conversation after an intentional tap, since the action is explicit.

Alternatively it may reuse the standard new-conversation flow.

Keep implementation consistent.

---

# 37. Empty State — Manuela Filter

Equivalent behaviour:

```text
Manuela


       [Manuela portrait]

Ainda não falaste com Manuela.

Começa uma conversa quando quiseres.

[ Falar com Manuela ]
```

---

# 38. Empty State Visual Identity

`Todas` empty state:

* neutral.

Tonito empty state:

* subtle blue atmosphere.

Manuela empty state:

* subtle blush atmosphere.

Avoid large illustrations unrelated to the assistants.

---

# 39. Conversation Loading State

Use lightweight skeleton rows.

Example:

```text
○  ██████████████          ███
   █████████████████

○  ███████████             ███
   ███████████████
```

Filters and navigation should remain visible where possible.

---

# 40. Conversation Load Failure

If history cannot load:

```text
Não foi possível carregar
as tuas conversas.

[ Tentar novamente ]
```

The `+` new-conversation action should remain available where technically possible.

Failure to load history should not automatically prevent a user from seeking new support.

---

# 41. Starting Conversation Failure

If a new Voiceflow session cannot be created:

```text
Não foi possível iniciar
a conversa agora.

Verifica a tua ligação e
tenta novamente.

[ Tentar novamente ]
```

Do not display:

```text
Voiceflow API 500
Project ID invalid
Session initialization failed
```

to the user.

Log technical information separately.

---

# 42. Conversation Resume Failure

If an existing session cannot be resumed, do not silently create a replacement and pretend it is the same conversation.

Instead:

1. attempt the approved recovery strategy;
2. preserve the conversation reference where possible;
3. communicate a human-readable error if recovery fails.

Detailed session recovery belongs to the chat/integration specifications.

---

# 43. Conversation Deletion

Conversation deletion is not a primary action on the main inbox row in V1.

Avoid highly visible delete icons beside every thread.

If individual deletion is later supported, it should use a deliberate interaction such as:

* contextual menu;
* long press;
* conversation settings.

Bulk/local clearing belongs primarily to privacy/data controls.

---

# 44. No Swipe-to-Delete Requirement

Do not implement swipe-to-delete by default.

Sensitive conversations could be removed accidentally.

Deletion behaviour should be intentional.

---

# 45. Search

Conversation search is not required for the initial V1 unless explicitly added later.

With a relatively small conversation history, the combination of:

```text
Todas
Tonito
Manuela
```

is sufficient initially.

The architecture should not prevent future search.

---

# 46. Unread State

Unread indicators may be supported if reliable message-state information exists.

Potential treatment:

```text
[M] Saúde menstrual             10:42
    Manuela · Nova mensagem          ●
```

Do not fabricate unread state if the underlying integration cannot reliably determine it.

---

# 47. Assistant Availability

The conversation dashboard should not repeatedly display:

```text
Tonito online
Manuela online
```

unless availability represents a meaningful real system state.

Assistant availability belongs more naturally on the Contact Profile.

Avoid creating false human-presence expectations.

---

# 48. Appointment Conversations

If a conversation involves appointment scheduling, it remains a normal assistant conversation.

Example:

```text
Marcação de consulta
Manuela
```

Do not create a separate appointment-message inbox.

The actual appointment itself belongs to the appointment workflow.

---

# 49. Voice Calls and Conversation History

Voice calls should not automatically appear as fake text conversations unless there is a deliberate product model for call history.

For V1, `Conversas` is primarily the text-conversation inbox.

If call history is added later, it must be clearly distinguished from chat threads.

---

# 50. Conversation Filters and Home

The Home screen may display recent threads.

`Conversas` remains the authoritative full conversation view.

If a thread is resumed from Home:

```text
Home
↓
Latest conversation
↓
Chat
```

Returning to `Conversas` should show the updated timestamp/order.

---

# 51. Assistant Profile Access from Conversation Rows

The row itself opens the conversation.

Do not make the entire row open the Contact Profile.

Within chat, tapping the assistant avatar/name can open the Contact Profile.

If avatar-only profile access is later added to inbox rows, it must not make row behaviour confusing.

Default:

```text
Conversation row → conversation
```

---

# 52. Privacy

The inbox is potentially sensitive.

Do not display:

* risk classification;
* health assessment;
* referral status;
* clinical notes;
* full conversation summaries;
* personal data collected during appointments.

The dashboard exists for navigation, not clinical review.

---

# 53. Screenshots / App Switching

Where technically feasible in future, additional privacy protections may be considered.

However, V1 must at minimum avoid unnecessarily exposing sensitive information in the inbox itself.

Do not claim operating-system screenshot prevention unless it is actually implemented.

---

# 54. Bottom Navigation Interaction

Switching away from Conversas should not destroy conversation history/filter state unnecessarily.

Example:

```text
Conversas
filter = Manuela

↓ Início
↓ Conversas

filter may remain Manuela
```

This is acceptable within the current application session.

On a new application launch, defaulting to `Todas` is also acceptable.

---

# 55. Mobile Layout

Mobile is the primary experience.

Priorities:

* readable rows;
* large touch targets;
* sticky/accessible filters where useful;
* reachable `+`;
* safe bottom spacing;
* smooth scrolling.

Do not make conversation cards unnecessarily tall.

---

# 56. Desktop Layout

Desktop may use a two-pane messaging layout if appropriate.

Example:

```text
┌─────────────────────────────────────────────────────────────┐
│ Conversas                                                   │
│                                                             │
│ ┌──────────────────────┐  ┌───────────────────────────────┐ │
│ │ Todas Tonito Manuela │  │                               │ │
│ │                      │  │      Selected conversation    │ │
│ │ Saúde menstrual      │  │                               │ │
│ │ Métodos...           │  │                               │ │
│ │ Marcação...          │  │                               │ │
│ │                      │  │                               │ │
│ └──────────────────────┘  └───────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

However, this must not fundamentally change the mobile mental model.

The left pane remains the same unified inbox.

---

# 57. Tablet Layout

Tablet may use:

* wider rows;
* two-pane layout where enough space exists;
* more visible message preview.

Avoid excessive empty width.

---

# 58. Performance

Conversation summaries should be lightweight.

Do not load entire conversation transcripts merely to render the inbox.

The dashboard should require only summary metadata necessary for:

* title;
* assistant;
* preview;
* timestamp;
* conversation/session reference.

Full conversation data should load when the thread is opened.

---

# 59. Local Persistence

Where conversation references are stored locally, the dashboard should reconstruct the available conversation list from those references and the approved data architecture.

Do not assume localStorage is an unlimited conversation database.

Detailed persistence rules belong to:

`12-user-state-and-persistence.md`

---

# 60. Analytics

Potential privacy-conscious events:

```text
conversations_viewed
conversation_filter_selected
conversation_opened
new_conversation_clicked
new_conversation_assistant_selected
```

Potential properties:

```ts
{
  assistant: "manuela",
  serviceArea: "maxixe"
}
```

Do not send:

* message text;
* sensitive conversation title;
* health details;

as generic UI analytics.

---

# 61. Component Architecture

Prefer reusable components such as:

```text
ConversationDashboard
ConversationFilters
ConversationList
ConversationRow
ConversationEmptyState
NewConversationButton
NewConversationSheet
```

Example:

```tsx
<ConversationFilters
  value={filter}
  onChange={setFilter}
/>

<ConversationList
  conversations={filteredConversations}
/>

<NewConversationButton
  onClick={openNewConversationSheet}
/>
```

Do not create independent duplicated dashboards for Tonito and Manuela.

---

# 62. Filtering Logic

Conceptually:

```ts
const filteredConversations =
  filter === "all"
    ? conversations
    : conversations.filter(
        conversation =>
          conversation.assistant === filter
      );
```

The actual implementation may differ depending on data architecture.

The important rule is that filtering changes visibility only.

---

# 63. New Conversation Routing

Conceptually:

```ts
function startNewConversation(
  assistant: "tonito" | "manuela",
  serviceArea: "maxixe" | "massinga" | "geral"
) {
  const agent = resolveVoiceflowAgent(
    assistant,
    serviceArea
  );

  return createConversation({
    assistant,
    serviceArea,
    agent
  });
}
```

The UI must not contain six separate routing branches scattered throughout components.

Agent resolution should be centralised.

---

# 64. Required Conversation States

The screen must support:

```text
No conversations
Mixed conversations
Tonito-only conversations
Manuela-only conversations
Todas selected
Tonito selected
Manuela selected
Loading
Load failure
New conversation sheet open
Creating conversation
Conversation creation failure
```

---

# 65. Acceptance Behaviour

The Conversas dashboard is correct when:

* there is one unified conversation screen;
* filters are `Todas`, `Tonito`, `Manuela`;
* Todas displays both assistants;
* Tonito displays only Tonito threads;
* Manuela displays only Manuela threads;
* filtering does not alter conversation ownership;
* rows are sorted by recent activity;
* conversation titles are concise and privacy-conscious;
* tapping a row resumes the exact existing session;
* tapping `+` starts the new-conversation flow;
* `+` allows selection of Tonito or Manuela;
* choosing an assistant through `+` creates a fresh session;
* the current service area determines which Voiceflow agent is used;
* users never choose between six technical Voiceflow agents;
* old conversations retain their original service context;
* changing current location does not rewrite old conversations;
* empty states provide a useful next action;
* errors do not expose technical provider information;
* full transcripts are not required to render the inbox;
* the interface remains consistent with the SAAJ design system.

---

# 66. Final Conversas Model

```text
┌──────────────────────────────────┐
│ Conversas                        │
│                                  │
│ [Todas] [Tonito] [Manuela]       │
│                                  │
│ [M] Saúde menstrual       10:42  │
│     Manuela · preview...         │
│                                  │
│ [T] Contracepção          Ontem  │
│     Tonito · preview...          │
│                                  │
│ [M] Marcação              18 Set │
│     Manuela · preview...         │
│                                  │
│                          ╭────╮  │
│                          │ +  │  │
│                          ╰────╯  │
│                                  │
│ ┌──────────────────────────────┐ │
│ │ Início  Conversas     Mais   │ │
│ │           ●                  │ │
│ └──────────────────────────────┘ │
└──────────────────────────────────┘
```

And the central behavioural model is:

```text
                   CONVERSAS
                       │
            ┌──────────┼──────────┐
            │          │          │
          Todas      Tonito     Manuela
            │          │          │
            └──── Filter only ────┘
                       │
                 Existing thread
                       │
                  Resume session


                       +

                       │
              Nova conversa
                       │
                ┌──────┴──────┐
                │             │
              Tonito        Manuela
                │             │
                └──────┬──────┘
                       │
              Current service area
                       │
             Correct Voiceflow agent
                       │
                Fresh session
```

This distinction — **filters control what the user sees; conversations control which assistant/session actually runs** — must remain intact throughout the implementation.

```

Next is **`06-chat-experience.md`**, which is one of the most important technical/UX documents. It will define the custom SAAJ chat interface over Voiceflow, session handling, message bubbles, composer, microphone/transcription behaviour, typing states, Quick Exit, opening the assistant profile from the header, Tonito/Manuela themes, and exactly where Voiceflow ends and our own frontend begins.
```
