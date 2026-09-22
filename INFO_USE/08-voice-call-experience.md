Next is **`08-voice-call-experience.md`**. This locks the four Vapi routes and the full call lifecycle while keeping the experience entirely inside SAAJ Virtual.

````markdown id="4i0o8k"
# SAAJ Virtual — Voice Call Experience

## 1. Purpose

This document defines the voice-call experience between a SAAJ Virtual user and Tonito or Manuela.

Voice calling is available only in the enhanced service areas:

- Maxixe;
- Massinga.

The experience uses Vapi as the underlying voice infrastructure, but the user interacts entirely with the SAAJ Virtual interface.

This specification defines:

- call availability;
- assistant routing;
- Vapi integration boundaries;
- call initiation;
- microphone permissions;
- connecting states;
- active-call interface;
- call controls;
- call duration;
- call termination;
- failures and recovery;
- privacy;
- Quick Exit;
- post-call behaviour;
- responsive behaviour.

---

# 2. Fundamental Architecture

The voice architecture is:

```text
USER
  │
  ▼
SAAJ CALL INTERFACE
  │
  ▼
VAPI CLIENT / INTEGRATION
  │
  ▼
CORRECT VAPI ASSISTANT
````

Vapi provides the voice infrastructure.

SAAJ Virtual owns the visible user experience.

---

# 3. Vapi Must Remain Invisible as a Product Brand

Users should not see:

```text
Vapi
Vapi Assistant
Powered by Vapi
Vapi Call
Assistant ID
```

as part of the normal call experience.

They should see:

```text
Tonito
SAAJ Virtual
```

or:

```text
Manuela
SAAJ Virtual
```

The provider is implementation infrastructure, not the product identity.

---

# 4. Voice Availability

Voice calls are available for:

```text
Tonito + Maxixe
Tonito + Massinga
Manuela + Maxixe
Manuela + Massinga
```

Voice calls are not available in V1 for:

```text
Tonito + Geral
Manuela + Geral
```

---

# 5. Four Vapi Assistants

The V1 voice architecture therefore contains four Vapi assistant configurations:

```text
Tonito
├── Maxixe
└── Massinga

Manuela
├── Maxixe
└── Massinga
```

These technical distinctions are invisible to users.

---

# 6. Environment Configuration

Relevant configuration:

```bash
VAPI_PRIVATE_API_KEY=
NEXT_PUBLIC_VAPI_PUBLIC_KEY=

VAPI_TONITO_MAXIXE_ASSISTANT_ID=
VAPI_TONITO_MASSINGA_ASSISTANT_ID=

VAPI_MANUELA_MAXIXE_ASSISTANT_ID=
VAPI_MANUELA_MASSINGA_ASSISTANT_ID=
```

Do not create Geral assistant IDs unless voice calling is genuinely introduced there later.

---

# 7. Public vs Private Vapi Credentials

`NEXT_PUBLIC_VAPI_PUBLIC_KEY` is intentionally available to the browser where required by the Vapi client integration.

`VAPI_PRIVATE_API_KEY` must remain server-side.

Never expose:

```text
VAPI_PRIVATE_API_KEY
```

through client-side source or a `NEXT_PUBLIC_` environment variable.

---

# 8. Centralised Voice Routing

Assistant resolution must be centralised.

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

Do not scatter assistant IDs throughout UI components.

---

# 9. Resolve Assistant Deterministically

Conceptually:

```ts
function resolveVapiAssistant(
  assistant: "tonito" | "manuela",
  serviceArea: "maxixe" | "massinga"
) {
  return vapiAssistants[assistant][serviceArea];
}
```

Invalid combinations should fail safely.

Example:

```text
assistant = manuela
serviceArea = geral
```

must not fall back to:

```text
Manuela Maxixe
```

or another arbitrary assistant.

---

# 10. Entry Point

The primary call entry point is the Assistant Contact Profile.

Flow:

```text
Assistant Contact Profile
        ↓
      Ligar
        ↓
SAAJ Call Experience
```

A structured call CTA may also appear inside an approved chat flow.

Both entry points must use the same call architecture.

---

# 11. No Call Button in Geral

If:

```ts
serviceArea === "geral"
```

the Assistant Contact Profile should not expose `Ligar`.

Therefore users should normally never reach an invalid Geral call state.

Backend/routing validation must still exist.

---

# 12. Call Initiation

Example:

```text
Manuela Contact Profile
serviceArea = maxixe

        ↓

User taps Ligar

        ↓

Resolve:
assistant = manuela
serviceArea = maxixe

        ↓

VAPI_MANUELA_MAXIXE_ASSISTANT_ID

        ↓

Open SAAJ Call Screen

        ↓

Request microphone if required

        ↓

Connect
```

---

# 13. Call Screen Visual Direction

The call screen should feel more immersive than ordinary application screens.

Use:

* large assistant portrait;
* assistant-specific atmospheric background;
* strong whitespace;
* minimal text;
* glass call controls;
* clear call status.

The user should immediately understand:

> I am speaking with Tonito.

or:

> I am speaking with Manuela.

---

# 14. Recommended Call Layout

Example:

```text
┌──────────────────────────────────┐
│ ←                         [Exit] │
│                                  │
│                                  │
│         [ LARGE PORTRAIT ]       │
│                                  │
│              Manuela             │
│            SAAJ Virtual          │
│                                  │
│            A ligar...            │
│                                  │
│                                  │
│      ╭────╮  ╭────╮  ╭────╮     │
│      │Mic │  │Spkr│  │End │     │
│      ╰────╯  ╰────╯  ╰────╯     │
│                                  │
│          Conversa privada        │
│                                  │
└──────────────────────────────────┘
```

Once connected:

```text
              Manuela
            SAAJ Virtual

               02:14
```

---

# 15. Tonito Call Theme

Use:

* soft ice/powder-blue atmosphere;
* restrained blue glow;
* Tonito portrait;
* neutral glass controls;
* blue contextual accents.

Do not use an entirely saturated blue background.

---

# 16. Manuela Call Theme

Use:

* soft blush/rose atmosphere;
* restrained berry glow;
* Manuela portrait;
* neutral glass controls;
* berry contextual accents.

Do not use an entirely saturated pink background.

---

# 17. Call States

At minimum support:

```text
idle
requesting_permission
connecting
connected
reconnecting
ending
ended
failed
```

The user-facing UI should use human-readable labels rather than technical state names.

---

# 18. Initial State

Immediately after `Ligar`, show the call interface.

Avoid leaving the user on the Contact Profile while invisible connection work happens.

Example:

```text
Manuela

A preparar chamada...
```

This gives immediate feedback.

---

# 19. Microphone Permission

Voice calling requires microphone access.

If permission has not already been granted:

```text
Ligar
  ↓
Call screen
  ↓
Browser/device microphone request
```

Where possible, the permission request should occur directly after the user's explicit `Ligar` action.

This makes the reason for the permission clear.

---

# 20. Permission Explanation

If additional explanation is required:

```text
Para falares com Manuela,
precisamos de acesso ao microfone.

[ Permitir microfone ]
```

Keep the wording simple.

Do not request unrelated permissions.

---

# 21. Permission Granted

After permission is granted:

```text
Microphone available
        ↓
Connecting
        ↓
Active call
```

Avoid asking for permission repeatedly if the browser has already granted it.

---

# 22. Permission Denied

If microphone permission is denied:

```text
Não conseguimos aceder ao microfone.

Para fazer a chamada, permite o acesso
ao microfone nas definições do navegador.

[ Tentar novamente ]

[ Voltar ]
```

Do not leave the user in a fake active-call state.

---

# 23. Permission Denied — Alternative Channel

Where appropriate, also provide:

```text
[ Enviar mensagem ]
```

This allows the user to continue accessing support without voice.

The alternative must preserve the same assistant identity.

Example:

```text
Manuela call permission denied
        ↓
Enviar mensagem
        ↓
Manuela chat
```

---

# 24. Connecting State

While connecting:

```text
[portrait]

Manuela
SAAJ Virtual

A ligar...
```

Use subtle animation.

Possible visual cues:

* soft portrait glow;
* gentle pulse;
* restrained waveform.

Do not use aggressive ringing animations.

---

# 25. Do Not Fake Telephone Ringing

The assistant is a digital voice service.

Do not simulate unnecessary traditional telephone behaviour such as:

```text
ring...
ring...
ring...
```

unless it corresponds to actual system behaviour.

Use:

```text
A ligar...
```

or:

```text
A estabelecer ligação...
```

---

# 26. Connected State

Once the call is genuinely connected:

```text
[portrait]

Manuela
SAAJ Virtual

00:01
```

The timer starts only after successful connection.

Do not count connection time as conversation duration.

---

# 27. Call Timer

Display:

```text
00:42
02:18
15:07
```

The timer is informational.

It should not dominate the screen.

---

# 28. Primary Call Controls

V1 should support at minimum:

```text
Microphone mute/unmute
Speaker/output where technically supported
End call
```

Avoid unnecessary controls.

Do not add:

* video;
* screen sharing;
* recording button;
* keypad;

unless genuinely required.

---

# 29. Microphone Control

Default connected state:

```text
Microphone ON
```

User can mute:

```text
Tap microphone
      ↓
Microphone muted
```

The visual state must be unmistakable.

Example:

```text
[ microphone-off icon ]
Sem som
```

or an accessible equivalent.

---

# 30. Unmute

Tapping again:

```text
Muted
 ↓
Unmuted
```

Do not require reconnection.

---

# 31. Speaker Control

Where supported reliably by the browser/device:

```text
Speaker
```

may control or represent audio output behaviour.

Browser audio-output control varies across platforms.

Do not expose a speaker-routing control that does nothing.

If direct speaker switching cannot be reliably supported, omit or adapt the control.

---

# 32. End Call

The End Call control must be visually distinct.

Example:

```text
        [ phone-off ]
```

It should:

* be easy to reach;
* require one intentional tap;
* terminate the active Vapi call;
* update the UI immediately.

Do not hide the end-call action in a menu.

---

# 33. End Call Behaviour

Flow:

```text
User taps End
      ↓
UI immediately enters ending state
      ↓
Terminate Vapi call
      ↓
Confirm termination
      ↓
Post-call screen
```

Prevent repeated end-call requests.

---

# 34. Ending State

Brief state:

```text
A terminar chamada...
```

This should normally be short.

If the provider takes longer to acknowledge termination, the UI should still protect against continued accidental interaction.

---

# 35. Remote/System Call End

The call may also terminate because:

* assistant ends;
* connection fails;
* browser closes audio session;
* provider ends the call.

The UI must detect this and transition out of the active-call state.

Do not leave the timer running after the call has ended.

---

# 36. Post-Call Screen

After a normal call ends, provide a calm completion state.

Example:

```text
[portrait]

Chamada terminada

Falaste com Manuela durante 04:32.


[ Enviar mensagem ]

[ Voltar ]
```

Do not over-celebrate a sensitive health interaction.

---

# 37. Post-Call Actions

Useful actions may include:

```text
Enviar mensagem
Voltar
```

For Maxixe/Massinga, where relevant:

```text
Marcar um encontro
```

may also be available.

Keep the number of actions restrained.

---

# 38. Message After Call

If the user selects:

```text
Enviar mensagem
```

route to the same assistant.

Example:

```text
Manuela call
    ↓
Enviar mensagem
    ↓
Manuela chat
```

The current service area should remain consistent.

---

# 39. Appointment After Call

For Maxixe/Massinga:

```text
Call ended
    ↓
Marcar um encontro
    ↓
Correct district scheduler
```

Example:

```text
Tonito Massinga call
        ↓
Marcar um encontro
        ↓
Massinga Cal.com
```

Appointment location depends on service area, not assistant.

---

# 40. Call Does Not Automatically Create a Text Thread

A voice call should not automatically create a fake text conversation merely so it appears in `Conversas`.

Text conversations and voice calls are different interaction types.

If future product requirements introduce a unified interaction history, that must be explicitly designed.

---

# 41. Call Analytics vs Conversation Inbox

Operational call information may be recorded for analytics where approved.

That does not mean the call must appear as a text conversation.

Keep:

```text
user-facing conversation history
```

separate from:

```text
operational interaction analytics
```

---

# 42. Vapi Call ID

Where available, the Vapi Call ID may be used internally as the call/session identifier.

Conceptually:

```ts
{
  callId: "vapi-call-id",
  assistant: "manuela",
  serviceArea: "maxixe"
}
```

Do not display this ID to the user.

---

# 43. User Identity for Operational Data

If an anonymous/pseudonymous user identifier is required for operational analytics, use the approved user-state/data architecture.

Do not ask the user to create an account merely to make a voice call.

---

# 44. Phone Number

The web-based voice call itself should not require the user to provide a telephone number unless a specific workflow genuinely requires it.

Do not collect a phone number simply because Vapi is being used.

Appointment workflows may independently require contact information.

---

# 45. Call Transcript

Do not assume that the complete call transcript should automatically be exposed in the user-facing application.

Call transcript storage and use must follow the approved privacy/data architecture.

The frontend call screen does not require transcript display in V1.

---

# 46. Recording Disclosure

If calls are technically recorded or stored by any provider/workflow, the user-facing privacy experience must accurately disclose that behaviour where required.

Do not state:

```text
This call is not recorded
```

unless the entire technical architecture guarantees it.

Likewise, do not state that calls are recorded unless that is actually the configured behaviour.

The final disclosure must reflect the production Vapi configuration and applicable privacy requirements.

---

# 47. Structured Outputs

Vapi may generate approved structured operational outputs after calls.

These may support:

* analytics;
* topic classification;
* risk classification;
* referral tracking;
* appointment outcomes;
* satisfaction where legitimately collected.

These structured outputs are backend concerns.

They should not be displayed as technical JSON in the call UI.

---

# 48. Existing Operational Model

Where implemented, call interaction data may feed the existing SAAJ operational workflow.

Conceptually:

```text
Vapi Call
   ↓
Structured Output
   ↓
n8n
   ↓
Airtable
```

This workflow is separate from the visible call interface.

---

# 49. Interações

Voice calls may be recorded operationally in the `Interações` data structure according to the approved analytics/data specification.

A voice call should not be incorrectly counted as:

```text
Acesso à Plataforma
```

simply because it occurred.

The detailed data mapping belongs in the analytics specification.

---

# 50. Appointment Data from Call

If a call genuinely results in an appointment:

```text
Voice Call
    ↓
Appointment created
    ↓
Interação
    +
Marcação
```

where required by the approved backend workflow.

Do not create a `Marcação` merely because an appointment was discussed.

There must be an actual booking outcome.

---

# 51. Call Failure Before Connection

Example:

```text
Não foi possível iniciar a chamada.

Verifica a tua ligação e tenta novamente.

[ Tentar novamente ]

[ Enviar mensagem ]
```

Do not start the duration timer.

---

# 52. Call Failure During Conversation

If connectivity is lost:

```text
Ligação interrompida.

Estamos a tentar restabelecer a chamada...
```

Only show a reconnecting state if automatic reconnection is genuinely being attempted.

---

# 53. Reconnection

If supported:

```text
Connected
   ↓
Temporary connection loss
   ↓
Reconnecting
   ↓
Connected
```

The interface should make this understandable without exposing WebRTC/provider terminology.

---

# 54. Reconnection Failure

If recovery fails:

```text
A chamada foi interrompida.

[ Ligar novamente ]

[ Enviar mensagem ]
```

Do not leave the user indefinitely in:

```text
A reconectar...
```

---

# 55. Call Retry

Retry must resolve the same intended assistant/service combination.

Example:

```text
Failed:
Manuela + Maxixe

Retry:
Manuela + Maxixe
```

Do not re-resolve from stale or changed UI state incorrectly.

---

# 56. Browser Compatibility

The voice experience depends on browser audio/WebRTC capabilities.

The implementation should detect unsupported environments gracefully.

Example:

```text
As chamadas não estão disponíveis
neste navegador.

Podes continuar por mensagem.

[ Enviar mensagem ]
```

Do not expose technical browser capability errors.

---

# 57. Headphones

No special headphone mode is required.

The call should use the browser/device's normal audio behaviour.

Where the operating system routes audio to Bluetooth/headphones, SAAJ should not interfere unless explicitly supported.

---

# 58. Background Behaviour

Mobile browsers may suspend audio when:

* the screen locks;
* the tab is backgrounded;
* the browser changes;
* the operating system limits activity.

Do not promise telephone-like background reliability unless verified across supported environments.

The call UI should recover gracefully when the application returns to foreground.

---

# 59. Screen Lock

Do not assume a web-based call will behave identically to a native phone call while the device is locked.

This should be considered during testing.

No false promise should be made in the UI.

---

# 60. Incoming Calls

V1 does not include incoming calls from Tonito or Manuela.

The model is:

```text
User initiates call
        ↓
SAAJ voice assistant
```

Do not build:

* incoming call screen;
* missed calls;
* call notifications;

unless explicitly added later.

---

# 61. Call History

A dedicated call-history screen is not required in V1.

Do not add:

```text
Recent Calls
Missed Calls
```

merely because conventional phone applications contain them.

---

# 62. Quick Exit During Call

The call experience is a sensitive context.

Quick Exit must be available.

However, an active voice connection creates an important distinction:

```text
Leave visual screen
```

vs:

```text
Terminate active audio connection
```

The implementation must not leave a sensitive call running unintentionally after Quick Exit.

---

# 63. Quick Exit During Active Call

For an active voice call, Quick Exit should:

1. immediately terminate the voice call;
2. remove the sensitive call interface;
3. route to the approved safe destination.

This differs from text chat, where Quick Exit does not need to delete or terminate the conversation.

---

# 64. Quick Exit vs Normal End Call

### End Call

```text
Terminate call
↓
Post-call SAAJ screen
```

### Quick Exit

```text
Terminate call
↓
Immediately leave sensitive context
↓
Safe destination
```

Do not show the normal post-call summary after Quick Exit.

---

# 65. Browser Close / Navigation

If the user closes/navigates away from an active call, the implementation should terminate/clean up the Vapi session where technically possible.

Avoid orphaned calls.

---

# 66. Component Cleanup

On call-screen unmount:

* remove event listeners;
* release microphone/audio resources;
* stop timers;
* clean up Vapi client state where appropriate.

Do not leave microphone capture active after the call interface has ended.

---

# 67. Privacy Signal

A subtle indicator may appear:

```text
[lock icon] Conversa privada
```

Do not make unsupported claims such as:

```text
End-to-end encrypted
```

unless the technical architecture genuinely provides and verifies that property.

---

# 68. Audio Visualisation

A subtle waveform or reactive glow may indicate active audio.

It should:

* reinforce that the call is active;
* remain visually calm;
* not distract from controls.

Avoid large decorative equalizers.

---

# 69. Assistant Speaking State

Where Vapi provides reliable speaking-state events, the portrait/glow may react subtly when the assistant speaks.

Example:

```text
Assistant silent
→ normal glow

Assistant speaking
→ slightly stronger glow
```

This is optional polish.

Do not fake speaking state if reliable events are unavailable.

---

# 70. User Speaking State

Likewise, microphone activity may be reflected subtly where useful.

Do not show raw audio levels or technical decibel measurements.

---

# 71. Interruptions

If the Vapi assistant supports natural interruption/barge-in, the UI should not prevent the user from speaking while the assistant is talking.

Conversational behaviour itself remains controlled by the Vapi assistant configuration.

---

# 72. Call Content Ownership

The frontend controls:

* visual presentation;
* call controls;
* state labels;
* transitions;
* error presentation.

The Vapi assistant configuration controls:

* spoken assistant behaviour;
* conversational instructions;
* health information;
* Knowledge Base use;
* data collection;
* referral logic;
* appointment conversational logic.

Do not duplicate clinical/health logic in the call UI.

---

# 73. Knowledge Base

Where the voice assistant needs sexual and reproductive health information, it must follow the approved Vapi/Knowledge Base configuration.

The frontend must not generate independent medical answers during a call.

---

# 74. Health Safety

If the voice assistant identifies a situation requiring referral or urgent action, that decision must originate from the approved assistant logic.

The frontend may subsequently present an appropriate CTA if structured data supports it.

Example:

```text
Call ends
↓
Approved referral/appointment state
↓
[ Marcar um encontro ]
```

The frontend must not independently diagnose urgency from the transcript.

---

# 75. No Automatic Medical Summary to User

Do not automatically display:

```text
Your diagnosis:
...
```

after a call.

Tonito and Manuela are not to be presented as producing diagnoses unless a future approved clinical model explicitly provides that functionality.

---

# 76. Post-Call Satisfaction

If satisfaction is collected, it should be lightweight.

Example:

```text
Esta conversa foi útil?

[ Sim ]   [ Não ]
```

or an approved equivalent.

Do not force satisfaction feedback before allowing the user to leave.

---

# 77. Satisfaction Data Type

If the backend expects numeric satisfaction values, the UI/data mapping must match that schema.

Do not send arbitrary text if the Airtable/backend field expects a numeric type.

Final mapping belongs in the analytics/data specification.

---

# 78. Mobile Layout

Voice calls should use nearly the full mobile viewport.

Priorities:

1. assistant identity;
2. connection/call state;
3. primary controls;
4. privacy/exit.

Avoid bottom navigation during the active call.

---

# 79. No Bottom Navigation During Active Call

Do not display:

```text
Início | Conversas | Mais
```

during the active call.

The call is an immersive state.

Navigation occurs through:

* End Call;
* Back where safe;
* Quick Exit.

---

# 80. Back During Active Call

Normal Back during an active call must not silently leave audio running.

Preferred behaviour:

```text
Back
 ↓
Confirm:
"Terminar a chamada?"
```

with:

```text
[ Continuar chamada ]
[ Terminar ]
```

Do not require confirmation for the dedicated End Call button.

---

# 81. Quick Exit Requires No Confirmation

Quick Exit must remain quick.

Do not show:

```text
Are you sure?
```

before Quick Exit.

For active calls:

```text
Quick Exit
↓
terminate immediately
↓
safe destination
```

---

# 82. Desktop Layout

Desktop may centre the call experience inside a constrained immersive panel.

Example:

```text
┌──────────────────────────────────────────┐
│                                          │
│              [ Portrait ]                │
│                                          │
│                Tonito                    │
│              SAAJ Virtual                │
│                                          │
│                 04:12                    │
│                                          │
│        [Mic]   [Speaker]   [End]         │
│                                          │
└──────────────────────────────────────────┘
```

Do not turn the call screen into an administrative dashboard on desktop.

---

# 83. Accessibility

Call controls must provide:

* accessible names;
* keyboard operation where relevant;
* visible focus states;
* adequate contrast;
* large tap targets;
* non-colour state indicators.

For example, muted state should not be represented only by a colour change.

---

# 84. Reduced Motion

Respect reduced-motion preferences.

Disable or reduce:

* portrait pulsing;
* large glow animation;
* waveform movement;

where appropriate.

Call state must remain understandable without animation.

---

# 85. Performance

The call screen should load quickly.

Portrait/background assets should be appropriately optimised.

Do not delay microphone connection while loading unnecessarily heavy visual assets.

Functionality has priority over visual polish.

---

# 86. Analytics Events

Potential privacy-conscious events:

```text
voice_call_selected
voice_permission_requested
voice_permission_granted
voice_permission_denied
voice_call_connecting
voice_call_connected
voice_call_ended
voice_call_failed
voice_call_retried
voice_call_quick_exit
```

Potential properties:

```ts
{
  assistant: "manuela",
  serviceArea: "maxixe"
}
```

Do not attach raw call transcripts to generic product analytics.

---

# 87. Call Duration Analytics

Duration may be recorded where approved:

```ts
{
  callDurationSeconds: 272
}
```

Measure actual connected duration rather than time spent on the connecting screen.

---

# 88. Operational Data

Operational call records may conceptually contain:

```ts
{
  callId: "...",
  anonymousUserId: "...",
  assistant: "manuela",
  serviceArea: "maxixe",
  startedAt: "...",
  connectedAt: "...",
  endedAt: "...",
  durationSeconds: 272,
  status: "completed"
}
```

Actual fields and privacy requirements are defined in the data/analytics specification.

---

# 89. Do Not Expose Operational Data

The user-facing call screen should not display:

* anonymous user ID;
* structured-output IDs;
* risk category;
* Airtable record ID;
* webhook status;
* n8n execution ID.

These are implementation details.

---

# 90. Error Logging

Technical logs may capture:

* call ID;
* assistant;
* service area;
* connection status;
* error type;
* timing;
* non-sensitive diagnostic information.

Avoid logging sensitive call content unnecessarily.

---

# 91. Required Call States

The implementation must test at minimum:

```text
Tonito + Maxixe
Tonito + Massinga
Manuela + Maxixe
Manuela + Massinga

Permission not requested
Permission granted
Permission denied

Connecting
Connected
Muted
Unmuted
Ending
Ended

Connection failure
Mid-call interruption
Retry
Quick Exit
Unsupported browser
```

---

# 92. Acceptance Behaviour

The voice experience is correct when:

* voice is available only for Maxixe and Massinga;
* Geral does not expose a call action;
* four Vapi assistant routes exist;
* assistant + service area resolves the correct route;
* Manuela never accidentally routes to Tonito;
* Maxixe never accidentally routes to Massinga;
* no arbitrary fallback occurs for invalid routing;
* Vapi branding is not exposed as the product identity;
* microphone permission is requested only when needed;
* permission denial provides a useful recovery path;
* the call timer begins only after connection;
* mute state is clear;
* unsupported speaker controls are not falsely exposed;
* End Call is always reachable;
* failed calls can be retried;
* users can move to text messaging when voice fails;
* Quick Exit terminates active audio immediately;
* normal call ending can show a post-call state;
* voice calls do not automatically become fake text conversations;
* private credentials remain server-side;
* operational analytics remain separate from visible UI;
* call resources are cleaned up when the call ends;
* the experience remains mobile-first, accessible and privacy-conscious.

---

# 93. Final Voice Architecture

```text
                     ASSISTANT PROFILE
                            │
                          LIGAR
                            │
                    Validate capability
                            │
              ┌─────────────┴─────────────┐
              │                           │
            TONITO                     MANUELA
              │                           │
        ┌─────┴─────┐               ┌─────┴─────┐
        │           │               │           │
      Maxixe     Massinga         Maxixe     Massinga
        │           │               │           │
        ▼           ▼               ▼           ▼
      VAPI         VAPI            VAPI         VAPI
        │           │               │           │
        └───────────┴───────┬───────┴───────────┘
                            │
                            ▼
                    SAAJ CALL INTERFACE
                            │
             ┌──────────────┼──────────────┐
             │              │              │
           Mute          Speaker          End
                            │
                            ▼
                       POST-CALL
                     /          \
               Message        Appointment
                            where available
```

The governing principle is:

```text
VAPI PROVIDES THE VOICE INFRASTRUCTURE.

SAAJ VIRTUAL PROVIDES THE EXPERIENCE.

TONITO OR MANUELA IS WHO THE USER EXPERIENCES.
```

```

Next is **`09-appointments.md`**, where we can lock the Maxixe/Massinga Cal.com implementation, the exact two scheduler routes, embedded experience, entry from Início/contact profile/chat/call, confirmation and one-day SMS reminder logic, data handling, failure states, and ensure **Geral can never accidentally reach a Maxixe or Massinga booking calendar**.
```
