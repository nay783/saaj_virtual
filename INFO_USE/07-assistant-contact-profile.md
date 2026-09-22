Let's continue with **`07-assistant-contact-profile.md`**. This locks the WhatsApp-inspired “contact” concept and makes the profile the consistent gateway to each assistant's available channels.

````markdown
# SAAJ Virtual — Assistant Contact Profile

## 1. Purpose

The Assistant Contact Profile is the central identity and communication screen for Tonito and Manuela.

It answers three questions:

1. Who am I interacting with?
2. What can I do with this assistant?
3. Which services are available in my current service area?

The profile should feel familiar, human and lightweight, inspired by modern messaging-app contact profiles without copying any specific application.

---

# 2. Role in the Product

The Contact Profile is used from several entry points.

### First-time onboarding

```text
Assistant Selection
        ↓
Contact Profile
````

This is the locked **Option C** onboarding behaviour.

### Início

```text
Início
   ↓
Tonito / Manuela
   ↓
Contact Profile
```

### Chat

```text
Chat
   ↓
Tap assistant portrait/name
   ↓
Contact Profile
```

The same reusable profile architecture should serve all of these contexts.

---

# 3. Core Principle

Tonito and Manuela should feel like contacts within SAAJ Virtual.

The Contact Profile should therefore resemble the mental model:

```text
Person
  ↓
Identity
  ↓
Available ways to interact
```

rather than:

```text
AI model
  ↓
Technical capabilities
  ↓
Provider integrations
```

---

# 4. Recommended Mobile Structure

For Maxixe/Massinga:

```text
┌──────────────────────────────────┐
│ ←                         [Exit] │
│                                  │
│                                  │
│          [ LARGE PORTRAIT ]      │
│                                  │
│              Manuela             │
│            SAAJ Virtual          │
│                                  │
│           ● Disponível           │
│                                  │
│                                  │
│   ╭────────────╮ ╭────────────╮  │
│   │  Message   │ │   Ligar    │  │
│   ╰────────────╯ ╰────────────╯  │
│                                  │
│   ╭──────────────────────────╮   │
│   │   Marcar um encontro     │   │
│   ╰──────────────────────────╯   │
│                                  │
│        🔒 Conversa privada       │
│                                  │
└──────────────────────────────────┘
```

Production UI should use the standard icon system rather than emoji for interface icons.

---

# 5. Geral Structure

For users routed to Geral:

```text
┌──────────────────────────────────┐
│ ←                         [Exit] │
│                                  │
│          [ LARGE PORTRAIT ]      │
│                                  │
│               Tonito             │
│            SAAJ Virtual          │
│                                  │
│           ● Disponível           │
│                                  │
│                                  │
│   ╭──────────────────────────╮   │
│   │        Mensagem          │   │
│   ╰──────────────────────────╯   │
│                                  │
│        🔒 Conversa privada       │
│                                  │
└──────────────────────────────────┘
```

Do not display fake Call or Appointment actions.

---

# 6. Assistant Identity

Each profile must prominently display:

* portrait;
* assistant name;
* SAAJ Virtual identity.

Example:

```text
[portrait]

Manuela
SAAJ Virtual
```

or:

```text
[portrait]

Tonito
SAAJ Virtual
```

SAAJ Virtual remains the service.

Tonito and Manuela are the human-facing assistant identities within that service.

---

# 7. Portrait

The portrait is the dominant visual element.

Recommended mobile size:

```text
approximately 140–180px
```

depending on viewport.

The portrait should:

* remain consistent with other appearances of the assistant;
* use high-quality imagery;
* crop cleanly;
* avoid excessive decoration;
* feel approachable and human.

---

# 8. Tonito Theme

Tonito's Contact Profile uses:

* warm white base;
* ice/powder-blue atmospheric light;
* cobalt/electric-blue contextual accents;
* near-black typography.

Example visual atmosphere:

```text
             soft blue glow

              [TONITO]

               Tonito
            SAAJ Virtual
```

Do not turn the entire screen saturated blue.

---

# 9. Manuela Theme

Manuela's Contact Profile uses:

* warm white base;
* pale blush/rose atmospheric light;
* berry/raspberry contextual accents;
* near-black typography.

Again, the colour is contextual rather than dominant.

---

# 10. Availability Indicator

A subtle status may appear:

```text
● Disponível
```

This means the digital assistant/service can currently be accessed.

It must not falsely imply that:

* a human nurse is currently online;
* a healthcare professional is watching the conversation;
* Manuela or Tonito is a human currently present.

If system availability cannot be reliably determined, use a stable service-oriented label instead of simulated presence.

---

# 11. Primary Actions

Possible actions are:

```text
Mensagem
Ligar
Marcar encontro
```

Their availability is determined by `serviceArea`.

---

# 12. Maxixe Capabilities

For:

```ts
serviceArea === "maxixe"
```

show:

```text
Mensagem
Ligar
Marcar encontro
```

Routing depends on assistant.

---

# 13. Tonito Maxixe Routing

```text
Tonito Contact Profile
        │
        ├── Mensagem
        │      ↓
        │ Tonito Maxixe Voiceflow
        │
        ├── Ligar
        │      ↓
        │ Tonito Maxixe Vapi
        │
        └── Marcar encontro
               ↓
          Maxixe Cal.com
```

---

# 14. Manuela Maxixe Routing

```text
Manuela Contact Profile
        │
        ├── Mensagem
        │      ↓
        │ Manuela Maxixe Voiceflow
        │
        ├── Ligar
        │      ↓
        │ Manuela Maxixe Vapi
        │
        └── Marcar encontro
               ↓
          Maxixe Cal.com
```

---

# 15. Massinga Capabilities

For:

```ts
serviceArea === "massinga"
```

show:

```text
Mensagem
Ligar
Marcar encontro
```

---

# 16. Tonito Massinga Routing

```text
Tonito Contact Profile
        │
        ├── Mensagem
        │      ↓
        │ Tonito Massinga Voiceflow
        │
        ├── Ligar
        │      ↓
        │ Tonito Massinga Vapi
        │
        └── Marcar encontro
               ↓
          Massinga Cal.com
```

---

# 17. Manuela Massinga Routing

```text
Manuela Contact Profile
        │
        ├── Mensagem
        │      ↓
        │ Manuela Massinga Voiceflow
        │
        ├── Ligar
        │      ↓
        │ Manuela Massinga Vapi
        │
        └── Marcar encontro
               ↓
          Massinga Cal.com
```

---

# 18. Geral Capabilities

For:

```ts
serviceArea === "geral"
```

show:

```text
Mensagem
```

Routing:

```text
Tonito → Tonito Geral Voiceflow
Manuela → Manuela Geral Voiceflow
```

Do not display Call or Appointment as functioning actions.

---

# 19. Capability Configuration

Avoid scattering service-availability conditions throughout the UI.

Use a central capability model.

Conceptually:

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

The Contact Profile should render actions from this capability model.

---

# 20. Why Unsupported Actions Are Hidden

For Geral, prefer:

```text
[ Mensagem ]
```

rather than:

```text
[ Mensagem ]
[ Ligar — indisponível ]
[ Marcar — indisponível ]
```

The profile should emphasise what the user **can do**.

Do not repeatedly remind users that their area has fewer capabilities.

---

# 21. Mensagem Action

Tapping:

**Mensagem**

must determine whether the user arrived from an existing conversation context.

### Normal Contact Profile entry

For example:

```text
Início
↓
Manuela
↓
Contact Profile
↓
Mensagem
```

The app should enter the appropriate Manuela messaging experience.

If there is no active conversation being resumed, this action may create a new conversation.

---

# 22. Contact Profile Opened from Existing Chat

If:

```text
Existing chat
↓
Tap assistant profile
↓
Contact Profile
```

then:

`Mensagem`

should return to the existing chat rather than create another conversation.

Context must be preserved.

---

# 23. Contact Profile Opened from Onboarding

During first onboarding:

```text
Assistant selected
↓
Contact Profile
↓
Mensagem
```

there is no existing thread by default.

Therefore:

```text
Create fresh conversation
↓
Correct Voiceflow agent
↓
Open chat
```

---

# 24. Contact Profile Opened from Início

If the user enters:

```text
Início
↓
Tonito
↓
Contact Profile
```

and taps `Mensagem`, the application should use a clear conversation-starting rule.

Recommended V1 behaviour:

**start a new conversation unless the profile was opened from a specific existing thread.**

Previous conversations remain accessible from:

`Conversas`

This prevents ambiguity about which historical conversation should be resumed.

---

# 25. Do Not Automatically Resume an Arbitrary Thread

Do not implement:

```text
Tap Manuela
↓
Automatically resume whichever Manuela conversation happens to be newest
```

without communicating this to the user.

Explicit `Continuar conversa` exists for resuming a specific recent conversation.

Assistant profile `Mensagem` is primarily a communication-start action.

---

# 26. Ligar Action

For Maxixe/Massinga:

```text
Ligar
↓
Correct assistant + serviceArea
↓
SAAJ call screen
↓
Vapi call
```

Example:

```text
assistant = manuela
serviceArea = massinga

↓ Ligar

VAPI_MANUELA_MASSINGA_ASSISTANT_ID
```

---

# 27. Call Must Preserve Assistant Identity

Never route:

```text
Manuela profile
↓
Tonito Vapi assistant
```

or vice versa.

Assistant identity must remain consistent across communication channels.

---

# 28. Call Must Preserve Service Area

Likewise:

```text
Tonito Maxixe profile
↓
Tonito Massinga Vapi
```

must never occur.

Routing must be centralised and deterministic.

---

# 29. Marcar Encontro Action

For Maxixe/Massinga:

```text
Marcar encontro
↓
SAAJ Appointment Screen
↓
Correct Cal.com scheduler
```

The appointment scheduler is determined by location, not assistant.

Therefore:

```text
Tonito Maxixe
```

and:

```text
Manuela Maxixe
```

both route to the Maxixe scheduling experience.

---

# 30. Assistant Does Not Change Appointment Location

The appointment destination depends on:

```text
serviceArea
```

not:

```text
assistant
```

Conceptually:

```ts
appointmentRoute = {
  maxixe: "Maxixe scheduler",
  massinga: "Massinga scheduler"
};
```

---

# 31. Action Hierarchy

For Maxixe/Massinga, `Mensagem` and `Ligar` may appear as two primary communication actions.

`Marcar encontro` may appear immediately beneath them as a wider secondary/service action.

Example:

```text
[ Mensagem ]   [ Ligar ]

[    Marcar um encontro    ]
```

This visually distinguishes:

```text
communicate now
```

from:

```text
arrange in-person service
```

without making appointment access difficult.

---

# 32. Geral Action Hierarchy

For Geral:

```text
[        Mensagem        ]
```

The layout should rebalance naturally.

Do not leave a suspicious empty space where Call used to be.

---

# 33. Icons

Recommended conceptual icons:

```text
Mensagem        message-circle
Ligar           phone
Marcar encontro calendar
Quick Exit      appropriate discreet exit icon
Back            arrow-left
Privacy         lock
```

Use the shared icon family defined in the Design System.

---

# 34. Action Labels

Use clear Portuguese labels.

Preferred:

```text
Mensagem
Ligar
Marcar encontro
```

Avoid technical labels:

```text
Chat
Voice AI
Scheduler
```

The user does not need to understand the infrastructure.

---

# 35. Privacy Signal

The profile should contain a subtle privacy cue:

```text
[lock icon] Conversa privada
```

or approved equivalent wording.

This should reassure without dominating the screen.

---

# 36. Quick Exit

The Contact Profile is considered a sensitive interaction context.

A discreet Quick Exit control should therefore be available.

It must:

* be reachable;
* leave the sensitive SAAJ context quickly;
* not delete conversations automatically;
* not expose the user's current health topic after exit.

Detailed behaviour is defined in the privacy specification.

---

# 37. Quick Exit vs Back

These are distinct.

### Back

```text
Contact Profile
↓
Previous SAAJ screen
```

### Quick Exit

```text
Contact Profile
↓
Leave sensitive context rapidly
```

Do not make Quick Exit behave like ordinary Back.

---

# 38. Profile Information

The profile should remain intentionally concise.

V1 does not need biography-style content such as:

```text
About Manuela
Favourite topics
Interests
Member since...
```

The assistant's purpose becomes clear through SAAJ Virtual and the available actions.

---

# 39. No False Professional Credentials

Do not label Tonito or Manuela as:

* Doctor;
* Nurse;
* Psychologist;
* Clinician;

unless that identity is explicitly true and approved.

They are SAAJ Virtual assistant identities.

Human healthcare professionals involved in actual services must remain distinguishable from digital assistants.

---

# 40. No AI Provider Labels

Do not display:

```text
AI Assistant powered by Voiceflow
Powered by GPT
Powered by Vapi
```

on the Contact Profile unless a legal/transparency requirement later explicitly requires a specific disclosure.

The product identity remains:

```text
Tonito / Manuela
SAAJ Virtual
```

Any required AI transparency should be handled through approved product/privacy language rather than provider marketing.

---

# 41. Location Context

The profile may subtly indicate the current service location if useful.

Example:

```text
[location icon] Maxixe
```

or:

```text
Atendimento disponível em Maxixe
```

However, location should not compete with assistant identity.

---

# 42. Location Context for Geral

Avoid presenting:

```text
Geral
```

as though it were a physical district.

If location is shown, display the actual known location.

Example:

```text
Maputo Cidade
```

not:

```text
Localização: Geral
```

`geral` is an internal service-area classification.

---

# 43. Service Availability Explanation

If useful, Maxixe/Massinga profiles may include concise context such as:

```text
Mensagem, chamada e marcação disponíveis
```

but this is optional.

The visible action buttons already communicate capability.

Avoid explanatory clutter.

---

# 44. Assistant Switching

The Contact Profile does not require a prominent:

`Trocar assistente`

button.

Users can reach the other assistant through:

* Início;
* Conversas;
* new-conversation flow.

The profile should remain focused on the current contact.

---

# 45. Returning to the Other Assistant

Example:

```text
Manuela Profile
↓ back
Início
↓
Tonito
↓
Tonito Profile
```

No assistant history is deleted or replaced.

---

# 46. First-Time Transition

The onboarding transition should feel particularly polished.

Example:

```text
Assistant selection

[Manuela portrait card]
        ↓
portrait gently expands/repositions
        ↓
background develops blush atmosphere
        ↓
Manuela Contact Profile
```

A shared-element style transition is ideal where technically practical.

---

# 47. Tonito Transition

Equivalent:

```text
[TONITO]
   ↓
portrait expands
   ↓
soft blue atmosphere
   ↓
Contact Profile
```

Avoid dramatic animations that delay access.

---

# 48. Profile Entry from Início

Transition may be simpler:

```text
Home assistant card
↓
portrait/profile expansion
↓
Contact Profile
```

Maintain visual continuity.

---

# 49. Profile Entry from Chat

From chat:

```text
Tap header portrait
↓
Contact Profile
```

The transition should preserve the sense that the user is inspecting the contact behind the active conversation.

---

# 50. Back from Chat-Origin Profile

If opened from chat:

```text
Contact Profile
↓ Back
same active conversation
```

Do not route the user to Início.

Navigation origin should be respected.

---

# 51. Bottom Navigation

The Assistant Contact Profile should generally be treated as a focused/immersive screen.

The persistent:

```text
Início | Conversas | Mais
```

dock does not need to remain visible.

Preferred:

```text
Profile Header
Portrait
Actions
Privacy
```

with normal Back navigation.

This gives the profile greater focus and prevents competition with the communication actions.

---

# 52. Call Availability Loading

If call configuration needs validation/loading, avoid briefly showing a button that disappears.

Service capability is known from the local routing model.

Render the expected action immediately and handle operational errors after interaction if necessary.

---

# 53. Call Failure

If a legitimate Maxixe/Massinga user taps `Ligar` but the service fails:

```text
Não foi possível iniciar a chamada agora.

Tenta novamente dentro de alguns instantes.

[ Tentar novamente ]
```

Do not expose:

```text
Vapi error
Assistant ID invalid
WebRTC failure
```

---

# 54. Appointment Failure

If the scheduler fails:

```text
Não foi possível abrir as marcações agora.

Tenta novamente dentro de alguns instantes.

[ Tentar novamente ]
```

Do not silently reroute to the wrong district scheduler.

---

# 55. Message Failure

If a new conversation cannot initialise:

```text
Não foi possível iniciar a conversa agora.

[ Tentar novamente ]
```

Remain on the Contact Profile so the user can recover.

---

# 56. Offline Behaviour

If the device is offline, the profile itself may still render from locally available assets/state.

Actions requiring connectivity should provide clear feedback.

Example:

```text
Sem ligação à internet.

Liga-te à internet para iniciar a conversa.
```

Do not imply that Voiceflow/Vapi functionality works offline when it does not.

---

# 57. Portrait Asset Failure

If a portrait fails to load, provide a graceful fallback.

Possible fallback:

* assistant initials;
* approved local placeholder;
* neutral assistant silhouette.

The profile must remain usable.

Do not use broken-image icons.

---

# 58. Responsive Behaviour

Mobile is primary.

On larger screens, the profile should remain centred and intentionally constrained.

Example:

```text
┌────────────────────────────────────────────┐
│                                            │
│              [Portrait]                    │
│                                            │
│               Manuela                      │
│             SAAJ Virtual                   │
│                                            │
│       [Mensagem]      [Ligar]              │
│                                            │
│          [Marcar encontro]                 │
│                                            │
└────────────────────────────────────────────┘
```

Do not stretch action buttons across an excessively wide desktop viewport.

---

# 59. Accessibility

The profile must support:

* semantic headings;
* assistant portrait alt text;
* accessible button names;
* keyboard navigation;
* visible focus states;
* adequate contrast;
* sufficiently large touch targets.

Do not rely only on portrait or colour to identify the assistant.

The assistant's name must be textual.

---

# 60. Reduced Motion

Shared-element/profile animations must respect reduced-motion preferences.

Reduced-motion behaviour may use:

```text
simple fade
```

instead of:

```text
portrait scale + translation
```

---

# 61. Profile Analytics

Potential privacy-conscious events:

```text
assistant_profile_viewed
assistant_message_selected
assistant_call_selected
assistant_appointment_selected
assistant_profile_quick_exit
```

Potential properties:

```ts
{
  assistant: "manuela",
  serviceArea: "maxixe"
}
```

Do not attach sensitive conversation content.

---

# 62. Reusable Component

Build one reusable component.

Conceptually:

```tsx
<AssistantProfile
  assistant="manuela"
  serviceArea="maxixe"
  origin="home"
/>
```

Possible origins:

```ts
type ProfileOrigin =
  | "onboarding"
  | "home"
  | "chat";
```

Origin may influence Back behaviour and Message behaviour.

---

# 63. Assistant Configuration

Conceptually:

```ts
const assistants = {
  tonito: {
    name: "Tonito",
    theme: "tonito",
    portrait: "...",
  },

  manuela: {
    name: "Manuela",
    theme: "manuela",
    portrait: "...",
  },
};
```

Do not duplicate the entire profile component for each assistant.

---

# 64. Profile Capability Logic

Conceptually:

```ts
const capabilities =
  serviceCapabilities[serviceArea];
```

Then:

```tsx
<MessageAction />

{capabilities.call && (
  <CallAction />
)}

{capabilities.appointment && (
  <AppointmentAction />
)}
```

This keeps service availability consistent throughout the product.

---

# 65. Messaging Context Logic

Conceptually:

```ts
if (origin === "chat" && activeConversation) {
  returnToExistingConversation();
} else {
  startNewConversation({
    assistant,
    serviceArea: currentServiceArea,
  });
}
```

Do not infer an arbitrary historical thread when no active conversation context exists.

---

# 66. Vapi Routing

Conceptually:

```ts
const vapiAssistants = {
  tonito: {
    maxixe:
      process.env.VAPI_TONITO_MAXIXE_ASSISTANT_ID,

    massinga:
      process.env.VAPI_TONITO_MASSINGA_ASSISTANT_ID,
  },

  manuela: {
    maxixe:
      process.env.VAPI_MANUELA_MAXIXE_ASSISTANT_ID,

    massinga:
      process.env.VAPI_MANUELA_MASSINGA_ASSISTANT_ID,
  },
};
```

There is intentionally no Geral Vapi assistant in V1.

---

# 67. Appointment Routing

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

There is intentionally no Geral appointment scheduler in V1.

---

# 68. Security

The Contact Profile itself should not receive or expose:

* Voiceflow access token;
* Vapi private API key;
* Cal.com private API key.

It should work through the approved application integration layers.

Public client configuration may be used only where explicitly safe and required.

---

# 69. Required Profile States

At minimum support:

```text
Tonito + Maxixe
Tonito + Massinga
Tonito + Geral

Manuela + Maxixe
Manuela + Massinga
Manuela + Geral

Message starting
Call starting
Appointment opening
Connectivity failure
Service failure
Portrait fallback
Quick Exit
```

---

# 70. Acceptance Behaviour

The Contact Profile is correctly implemented when:

* Tonito and Manuela use one reusable profile architecture;
* the assistant portrait and name are prominent;
* SAAJ Virtual remains the service identity;
* Maxixe exposes Message, Call and Appointment;
* Massinga exposes Message, Call and Appointment;
* Geral exposes Message;
* unsupported actions are not falsely advertised;
* Message routes to the correct Voiceflow assistant;
* Call routes to the correct Vapi assistant;
* Appointment routes to the correct district scheduler;
* appointment routing depends on service area rather than assistant;
* the profile does not expose provider names or technical IDs;
* opening from an active chat preserves that conversation;
* Message from an active-chat profile returns to that chat;
* Message from a normal standalone profile starts a new conversation;
* the profile provides Quick Exit;
* Back respects the screen of origin;
* assistant visual identity is contextual but remains within the shared SAAJ design system;
* service errors are recoverable and human-readable;
* the interface is mobile-first and accessible.

---

# 71. Final Contact Model

```text
                         SAAJ VIRTUAL
                              │
                    ASSISTANT CONTACT
                              │
                    ┌─────────┴─────────┐
                    │                   │
                 TONITO              MANUELA
                    │                   │
                    └─────────┬─────────┘
                              │
                        SERVICE AREA
                              │
            ┌─────────────────┼─────────────────┐
            │                 │                 │
          MAXIXE           MASSINGA            GERAL
            │                 │                 │
      ┌─────┼─────┐     ┌─────┼─────┐           │
      │     │     │     │     │     │           │
     MSG   CALL  BOOK   MSG   CALL  BOOK        MSG
      │     │     │     │     │     │           │
      ▼     ▼     ▼     ▼     ▼     ▼           ▼
     VF   VAPI   CAL    VF   VAPI   CAL          VF
```

The Contact Profile is therefore not merely an "About Tonito/Manuela" page.

It is the **communication hub for that assistant**, exposing only the channels genuinely available to the user in their current service area.

```

Next is **`08-voice-call-experience.md`**. That will lock the complete Vapi side: how `Ligar` starts the correct one of the four assistants, the cinematic call screen, connecting/active/ending/failed states, microphone and speaker controls, timer, permissions, Quick Exit/end-call distinction, what happens after a call, and importantly ensuring **Vapi is completely invisible as a brand to the user**.
```
