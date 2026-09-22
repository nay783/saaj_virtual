Let's lock **`04-inicio.md`**. The key principle here is that Início is a **returning-user launchpad**, not another conversation inbox and not a repeat of onboarding.

````markdown
# SAAJ Virtual — Início

## 1. Purpose

`Início` is the main home screen of SAAJ Virtual after onboarding has been completed.

It answers one simple question:

> What would the user like to do now?

Início should provide fast access to:

- Tonito;
- Manuela;
- the most recent conversation;
- a small amount of recent activity;
- appointment scheduling where available.

It must remain lightweight.

The complete conversation history belongs in `Conversas`.

Location management, privacy controls and application information belong in `Mais`.

---

# 2. When Início Appears

For a returning user with valid local onboarding state:

```text
Open SAAJ Virtual
        ↓
Read local state
        ↓
onboardingCompleted = true
        ↓
INÍCIO
````

The user must not repeatedly see:

* Welcome;
* Mozambique map;
* district selection;
* initial assistant selection.

---

# 3. First Visit vs Returning Visit

The first-ever user journey ends at the selected assistant's Contact Profile.

Therefore:

```text
FIRST VISIT

Welcome
   ↓
Location
   ↓
Assistant selection
   ↓
Contact Profile
```

Início becomes the normal application entry point on subsequent visits.

It is also available through the bottom navigation after onboarding.

---

# 4. Core Home Structure

The recommended mobile structure is:

```text
SAAJ Virtual


Bom dia 👋

Como podemos
ajudar hoje?


[ MANUELA ]       [ TONITO ]
 Falar             Falar


Continuar conversa

[ Latest conversation ]


Recentes

[ Recent conversation ]
[ Recent conversation ]


[ Appointment shortcut ]
Maxixe/Massinga only


      Início   Conversas   Mais
        ●
```

Not every section must appear if there is no relevant content.

---

# 5. Neutral Visual Identity

Início uses the neutral SAAJ visual system.

Primary appearance:

* clean/warm white;
* near-black typography;
* pearl glass;
* subtle atmospheric light;
* generous whitespace.

Neither Tonito nor Manuela should dominate the entire screen.

Their individual cards introduce their respective colours.

---

# 6. Greeting

The top of the page should feel welcoming without becoming excessively personalised.

Example:

```text
Bom dia 👋

Como podemos ajudar hoje?
```

Time-sensitive greetings may include:

* Bom dia
* Boa tarde
* Boa noite

A neutral alternative is acceptable if local time is unavailable.

Do not require the user's name to create a personalised greeting.

---

# 7. No User Name Requirement

Because V1 does not require account creation, Home must not depend on:

```text
Olá, João
```

or similar personalised identity.

Use natural anonymous greetings.

This avoids collecting personal data merely for interface decoration.

---

# 8. Primary Assistant Area

Tonito and Manuela should be the primary human entry points from Início.

Example:

```text
Com quem queres falar?


╭──────────────────╮  ╭──────────────────╮
│     [Manuela]    │  │     [Tonito]     │
│                  │  │                  │
│     Manuela      │  │      Tonito      │
│                  │  │                  │
│      Falar  →    │  │       Falar  →   │
╰──────────────────╯  ╰──────────────────╯
```

Both assistants must remain clearly available.

---

# 9. Assistant Card Ordering

The application may remember the most recently used assistant.

Example:

```ts
lastAssistant = "manuela";
```

In this case, Manuela may appear first.

If:

```ts
lastAssistant = "tonito";
```

Tonito may appear first.

This is a convenience, not a restriction.

The other assistant must remain equally accessible.

---

# 10. No Permanent Assistant

Home must not communicate:

> Manuela is your assistant.

or:

> Tonito is assigned to you.

The intended model is:

> These are the two people you can talk to.

The user can freely move between them.

---

# 11. Assistant Card Interaction

Tapping an assistant card should open that assistant's Contact Profile.

Example:

```text
Início
   ↓
Tap Tonito
   ↓
Tonito Contact Profile
```

and:

```text
Início
   ↓
Tap Manuela
   ↓
Manuela Contact Profile
```

This keeps communication-channel choice consistent.

From the Contact Profile, the user may choose:

* Message;
* Call where supported;
* Appointment where supported.

---

# 12. Do Not Automatically Start a New Conversation from Home

Tapping:

`Falar com Tonito`

should not automatically create a new Voiceflow session simply because the assistant card was touched.

It should open the assistant Contact Profile.

A new text session is created when the user deliberately chooses the appropriate message/new-conversation action.

This prevents unnecessary empty conversations from accumulating.

---

# 13. Assistant Card Visual Treatment

Tonito card:

* subtle ice-blue atmosphere;
* blue accent;
* Tonito portrait.

Manuela card:

* subtle blush atmosphere;
* berry accent;
* Manuela portrait.

The cards should use the same layout and visual hierarchy.

Neither assistant should appear to be recommended over the other.

---

# 14. New User with No Conversations

If onboarding has been completed but no conversation has yet occurred, Home should remain useful.

Example:

```text
Bom dia 👋

Como podemos ajudar hoje?


[ Manuela ]       [ Tonito ]
   Falar             Falar


Ainda não tens conversas.

Quando quiseres, começa com
Tonito ou Manuela.
```

Do not show empty sections such as:

```text
Continuar conversa
No conversations found
```

if there is nothing to continue.

---

# 15. Continue Conversation

Once the user has at least one conversation, Início should provide a prominent shortcut to the most recently active thread.

Example:

```text
Continuar conversa

╭───────────────────────────────────╮
│ [M]                              │
│                                  │
│ Saúde menstrual                  │
│ Manuela · há 2 horas          →  │
╰───────────────────────────────────╯
```

Tapping this card resumes that exact existing conversation.

It must not create a new session.

---

# 16. Determining the Latest Conversation

The `Continuar conversa` card should use the conversation with the latest valid activity timestamp.

Conceptually:

```ts
latestConversation = conversations
  .sort((a, b) => b.updatedAt - a.updatedAt)[0];
```

Actual implementation should avoid unnecessary client-side sorting if conversation data is already returned in the correct order.

---

# 17. Continue Conversation Preserves Ownership

If the latest conversation belongs to Manuela:

```text
Continue
   ↓
Resume Manuela session
```

If it belongs to Tonito:

```text
Continue
   ↓
Resume Tonito session
```

Current Home ordering or assistant preference must not affect this.

---

# 18. Recent Conversations

Below the primary continuation card, Home may display a small number of recent threads.

Recommended maximum:

**2 recent conversations**

These should exclude the conversation already displayed under `Continuar conversa`.

Example:

```text
Recentes

[T] Métodos contraceptivos        Ontem  →
[M] Marcação de consulta         18 Set  →
```

The complete history belongs in `Conversas`.

---

# 19. Do Not Turn Home into an Inbox

Do not display:

* 10+ conversation rows;
* conversation filters;
* unread-management controls;
* full history;
* search across conversations.

Those features belong in `Conversas`.

Início should remain scannable within seconds.

---

# 20. Recent Conversation Privacy

Conversation titles should be concise and useful but should not expose unnecessary sensitive detail.

Prefer:

```text
Saúde menstrual
```

over:

```text
Estou preocupada porque a minha menstruação
está 17 dias atrasada e tive sexo sem proteção
```

Home is a high-visibility screen.

Sensitive details should remain inside the conversation.

---

# 21. Appointment Shortcut

For:

```ts
serviceArea === "maxixe"
```

or:

```ts
serviceArea === "massinga"
```

Home may display a dedicated appointment shortcut.

Example:

```text
Atendimento presencial

╭────────────────────────────────────╮
│ [calendar icon]                   │
│                                   │
│ Marcar um encontro                │
│ Atendimento SAAJ               →  │
╰────────────────────────────────────╯
```

Tapping it opens the appointment experience for the current service area.

---

# 22. Appointment Routing

For Maxixe:

```text
Início
   ↓
Marcar um encontro
   ↓
Maxixe appointment experience
   ↓
Maxixe Cal.com embed
```

For Massinga:

```text
Início
   ↓
Marcar um encontro
   ↓
Massinga appointment experience
   ↓
Massinga Cal.com embed
```

The user should not need to choose the location again.

---

# 23. Appointment Shortcut — Geral

For:

```ts
serviceArea === "geral"
```

the appointment shortcut should not appear.

Do not show a disabled appointment card unless there is a defined product reason to explain future availability.

Prefer removing unavailable functionality from the main Home experience.

---

# 24. Assistant Contact Profile Also Provides Appointment Access

For Maxixe/Massinga, appointment access exists in two useful contexts:

### Direct Home shortcut

For users who already know they want an appointment.

### Assistant Contact Profile

For users interacting through Tonito or Manuela.

This duplication is intentional because the entry points serve different user intentions.

---

# 25. Voice Call Shortcut

Voice calling should primarily remain associated with the assistant Contact Profile.

Home does not need large separate:

```text
Call Tonito
Call Manuela
```

buttons in addition to assistant cards.

This avoids feature clutter.

Flow:

```text
Início
   ↓
Tonito
   ↓
Contact Profile
   ↓
Ligar
```

---

# 26. Conversation Dashboard Shortcut

The bottom navigation provides access to:

`Conversas`

Therefore Home does not require a large:

`Ver todas as conversas`

CTA.

A subtle link may be used beside `Recentes` if testing demonstrates value, but it is not mandatory.

---

# 27. Bottom Navigation

Início uses the shared floating SAAJ navigation:

```text
Início      Conversas      Mais
  ●
```

The active state is:

`Início`

The dock should follow the Design System specification.

---

# 28. Home Scrolling

The screen may scroll naturally if content exceeds the viewport.

However, on common smartphone sizes, the highest-priority content should appear quickly:

1. greeting;
2. assistant access;
3. continue conversation.

Do not push assistant access below large decorative hero sections.

---

# 29. Recommended Mobile Hierarchy

Priority order:

```text
1. Greeting
2. Tonito / Manuela
3. Continue conversation
4. Recent conversations
5. Appointment shortcut
6. Bottom navigation
```

Appointment placement may move slightly higher where usability testing demonstrates that scheduling is a major user intent.

---

# 30. Home State — No History, Geral

Example:

```text
SAAJ Virtual


Bom dia 👋

Como podemos ajudar hoje?


╭──────────────────╮
│    [Manuela]     │
│     Manuela      │
│      Falar →     │
╰──────────────────╯

╭──────────────────╮
│     [Tonito]     │
│      Tonito      │
│      Falar →     │
╰──────────────────╯


Começa uma conversa quando quiseres.


       Início   Conversas   Mais
         ●
```

No appointment card.

---

# 31. Home State — No History, Maxixe/Massinga

Example:

```text
SAAJ Virtual


Bom dia 👋

Como podemos ajudar hoje?


[ Manuela ]      [ Tonito ]


Atendimento presencial

[ Marcar um encontro → ]


       Início   Conversas   Mais
         ●
```

---

# 32. Home State — Returning User with History

Example:

```text
SAAJ Virtual


Bom dia 👋

Como podemos ajudar hoje?


[ Manuela ]      [ Tonito ]


Continuar conversa

╭──────────────────────────────────╮
│ [M] Saúde menstrual             │
│     Manuela · há 2 horas      → │
╰──────────────────────────────────╯


Recentes

[T] Métodos contraceptivos     Ontem →
[M] Marcação de consulta      18 Set →


[ Marcar um encontro → ]


       Início   Conversas   Mais
         ●
```

---

# 33. Loading State

Home may need to load conversation summaries or persisted state.

Do not delay the entire Home screen unnecessarily.

Prefer progressive loading:

```text
Greeting               → immediately
Assistant cards        → immediately
Location-based service → immediately from local state
Conversation history   → skeleton/loading if required
```

This makes the application feel fast.

---

# 34. Conversation Loading Skeleton

Example:

```text
Continuar conversa

╭──────────────────────────────────╮
│  ○  █████████████               │
│     ██████████                  │
╰──────────────────────────────────╯
```

Keep skeleton animation subtle.

---

# 35. Conversation Load Failure

If conversation history fails to load, assistant access should remain functional.

Example:

```text
Não foi possível carregar as
conversas recentes.

[ Tentar novamente ]
```

Do not make the whole application unusable because history retrieval failed.

---

# 36. Appointment Availability Failure

If the appointment service cannot currently load, do not silently remove the capability if the user is legitimately in Maxixe/Massinga.

After the user attempts access, provide a recoverable error:

```text
Não foi possível abrir as marcações agora.

Tenta novamente dentro de alguns instantes.

[ Tentar novamente ]
```

---

# 37. Location Display

Home does not need to prominently display:

```text
Province: Inhambane
District: Maxixe
ServiceArea: maxixe
```

Location is operational context, not the main content.

If a small location indicator is desired, keep it subtle.

Example:

```text
[location icon] Maxixe
```

Tapping it may eventually connect to the location controls defined under `Mais`.

Do not clutter the hero area with location administration.

---

# 38. Changing Location

Location changes should primarily happen through `Mais`.

Início should not repeatedly ask:

> Onde estás?

The application already remembers the user's selection.

---

# 39. Assistant Theme Transition

When the user selects Tonito from Home:

```text
Neutral Home
      ↓
Tonito Contact Profile
      ↓
subtle transition toward blue atmosphere
```

For Manuela:

```text
Neutral Home
      ↓
Manuela Contact Profile
      ↓
subtle transition toward blush/berry atmosphere
```

This should feel like entering that contact's space within the same application.

---

# 40. Returning from Assistant Profile

When the user returns from an assistant Contact Profile to Home:

```text
Assistant theme
      ↓
Neutral SAAJ Home
```

The transition should be smooth rather than abrupt.

---

# 41. Returning from Chat

If the user exits a conversation to Início:

* the conversation should remain saved;
* it may become the new `Continuar conversa`;
* the assistant may become `lastAssistant`.

The Home state should update accordingly.

---

# 42. Returning from Appointment

After successful appointment scheduling, Home may optionally show a concise appointment status card if the application has reliable access to that information.

Example future-compatible state:

```text
Próximo encontro

23 Set · 14:00
CS Maxixe
```

However, do not fabricate appointment status if Cal.com data is not reliably available to the frontend.

The confirmed SMS remains the operational confirmation channel.

---

# 43. Appointment Confirmation SMS

Appointment confirmation/reminders do not require Home to implement a notification centre.

The current operational model is:

```text
Appointment created
       ↓
SMS confirmation

1 day before
       ↓
SMS reminder
```

No general notifications section is required in V1.

---

# 44. No Motivational Feed in V1

Home must not contain:

* daily motivational feed;
* personalised wellness feed;
* notification inbox;
* AI-generated daily advice.

`Mensagens para mim` is a future feature.

Do not prematurely add placeholders for it.

---

# 45. No Telemedicine in V1

Home must not expose:

* Video consultation;
* Talk to doctor now;
* Virtual waiting room;

unless telemedicine has actually been implemented in a future version.

Telemedicine remains part of the future-feature architecture.

---

# 46. No Mozambique Map on Returning Home

This is a strict rule.

The Mozambique map is part of:

* onboarding;
* later deliberate location change.

It is **not** recurring Home content.

Do not present returning users with the map every time they launch SAAJ.

---

# 47. No Dashboard Metrics

Home is a user-facing support experience.

Do not display:

* number of interactions;
* appointments this month;
* analytics;
* risk scores;
* usage statistics;
* administrative KPIs.

Those belong in administrative systems, not the young person's Home screen.

---

# 48. No Generic Feature Grid

Avoid transforming Home into:

```text
[Chat] [Call]
[Book] [Health]
[Profile] [Map]
[Settings] [Help]
```

The assistant-first model should remain dominant.

Users primarily approach:

**Tonito or Manuela**

rather than navigating a software feature catalogue.

---

# 49. Privacy

Home should not reveal excessive sensitive information at a glance.

Particularly avoid:

* long message previews;
* explicit health concern descriptions;
* risk labels;
* appointment reason;
* clinical notes.

Conversation previews should remain short.

---

# 50. Quick Exit

A permanent Quick Exit control is not required on the neutral Home screen.

Quick Exit is primarily required in sensitive interaction contexts such as:

* assistant contact profile;
* chat;
* call.

This prevents Home from becoming visually alarming or cluttered.

---

# 51. Accessibility

Home must support:

* keyboard navigation where relevant;
* screen readers;
* meaningful assistant image alt text;
* adequate contrast;
* large tap areas;
* logical heading structure.

Assistant identity must not depend solely on blue/pink colour.

Use:

* portrait;
* name;
* text label.

---

# 52. Desktop Adaptation

Desktop may use a wider layout.

For example:

```text
┌──────────────────────────────────────────────────────┐
│                                                      │
│  Bom dia 👋                                         │
│  Como podemos ajudar hoje?                          │
│                                                      │
│  ┌────────────────┐    ┌────────────────┐           │
│  │    Manuela     │    │     Tonito     │           │
│  └────────────────┘    └────────────────┘           │
│                                                      │
│  Continuar conversa                                  │
│  ┌────────────────────────────────────────────┐      │
│  │ Saúde menstrual · Manuela              →  │      │
│  └────────────────────────────────────────────┘      │
│                                                      │
└──────────────────────────────────────────────────────┘
```

Use a constrained content width.

Do not stretch cards across an excessively wide viewport.

---

# 53. Home Data Requirements

Conceptually, Home requires:

```ts
type HomeState = {
  onboardingCompleted: boolean;
  province: string;
  district?: string | null;
  serviceArea: "maxixe" | "massinga" | "geral";
  lastAssistant?: "tonito" | "manuela" | null;
  latestConversation?: ConversationSummary | null;
  recentConversations?: ConversationSummary[];
};
```

Do not duplicate conversation content unnecessarily in multiple storage systems solely to render Home.

---

# 54. Conversation Summary

A Home conversation summary may conceptually contain:

```ts
type ConversationSummary = {
  id: string;
  assistant: "tonito" | "manuela";
  title: string;
  preview?: string;
  updatedAt: string;
};
```

Do not expose provider-specific IDs directly to the UI.

---

# 55. Home Analytics

Potential privacy-conscious events:

```text
home_viewed
assistant_card_selected
continue_conversation_selected
recent_conversation_selected
appointment_shortcut_selected
```

Useful contextual properties may include:

```ts
{
  assistant: "manuela",
  serviceArea: "maxixe"
}
```

Do not attach conversation text or sensitive health content to generic UI analytics events.

---

# 56. Início Acceptance Behaviour

Início is correctly implemented when:

* returning users land on Início;
* onboarding is not repeated;
* both Tonito and Manuela are accessible;
* last-used assistant may be placed first without hiding the other;
* tapping an assistant opens their Contact Profile;
* tapping an assistant does not automatically create a conversation;
* the latest conversation can be resumed;
* a small number of recent conversations may be displayed;
* the complete history is not duplicated on Home;
* Maxixe/Massinga show appointment access;
* Geral does not falsely show appointment access;
* voice calls remain associated primarily with assistant profiles;
* no account/name is required for greeting;
* the Mozambique map is not shown;
* no motivational feed exists in V1;
* no telemedicine functionality is falsely exposed;
* Home remains visually neutral and lightweight.

---

# 57. Final Início Model

```text
RETURNING USER
      │
      ▼
┌──────────────────────────────────┐
│ SAAJ Virtual                     │
│                                  │
│ Bom dia 👋                       │
│ Como podemos ajudar hoje?        │
│                                  │
│ [ MANUELA ]       [ TONITO ]     │
│                                  │
│ Continuar conversa               │
│ [ Latest thread              → ] │
│                                  │
│ Recentes                         │
│ [ Thread                     → ] │
│ [ Thread                     → ] │
│                                  │
│ [ Marcar um encontro         → ] │
│  Maxixe/Massinga only            │
│                                  │
│ ┌──────────────────────────────┐ │
│ │ Início  Conversas     Mais   │ │
│ └──────────────────────────────┘ │
└──────────────────────────────────┘
```

Início should feel immediately understandable:

**Who can I talk to?**

**Where did I leave off?**

**What service can I access now?**

Nothing more needs to compete with those three questions in Version 1.

```

Next is **`05-conversas-dashboard.md`**. That's where we'll lock the WhatsApp-inspired model we discussed: **Todas / Tonito / Manuela**, switching filters without losing anything, how the `+` button works, empty states, thread titles, and exactly what happens when the user chooses Tonito or Manuela from the conversation dashboard.
```
