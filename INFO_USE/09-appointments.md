Moving to **`09-appointments.md`**. This one locks scheduling as a **SAAJ experience backed by Cal.com**, rather than sending users into a visibly separate scheduling product.

````markdown
# SAAJ Virtual — Appointments

## 1. Purpose

This document defines appointment scheduling in SAAJ Virtual.

Appointments allow eligible users in supported service areas to arrange an in-person SAAJ service.

Version 1 appointment availability is limited to:

- Maxixe;
- Massinga.

The scheduling infrastructure is provided through Cal.com, while SAAJ Virtual owns the surrounding user experience.

This specification defines:

- appointment availability;
- geographic routing;
- entry points;
- Cal.com integration;
- embedded scheduling;
- user information collection;
- confirmation;
- SMS communication;
- reminders;
- cancellation/rescheduling boundaries;
- error handling;
- privacy;
- analytics.

---

# 2. Core Appointment Principle

The user should experience:

```text
SAAJ Virtual
     ↓
Marcar um encontro
     ↓
Choose available date/time
     ↓
Provide required booking information
     ↓
Confirm
     ↓
Appointment scheduled
````

The user should not need to understand:

* Cal.com;
* event type IDs;
* scheduling namespaces;
* API keys;
* webhook architecture;
* n8n workflows.

---

# 3. Appointment Availability

Appointments are available when:

```ts
serviceArea === "maxixe"
```

or:

```ts
serviceArea === "massinga"
```

Appointments are not available in V1 when:

```ts
serviceArea === "geral"
```

---

# 4. Capability Matrix

| Service Area | Text | Voice | Appointment |
| ------------ | ---: | ----: | ----------: |
| Maxixe       |  Yes |   Yes |         Yes |
| Massinga     |  Yes |   Yes |         Yes |
| Geral        |  Yes |    No |          No |

This capability model must remain consistent across the application.

---

# 5. Appointment Routing

Appointment routing depends on:

**service area**

It does not depend on:

**assistant**

Therefore:

```text
Tonito + Maxixe
Manuela + Maxixe
        ↓
Maxixe scheduler
```

and:

```text
Tonito + Massinga
Manuela + Massinga
        ↓
Massinga scheduler
```

---

# 6. Current Cal.com Routes

### Maxixe

```text
saaj-maxixe-8w8m61/saaj-virtual-marcacao-de-consulta
```

### Massinga

```text
saaj-massinga-0cr1s3/saaj-virtual-marcacao-de-consulta
```

These should be stored centrally in configuration rather than scattered throughout UI components.

---

# 7. Central Appointment Configuration

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

There is intentionally no `geral` booking route in V1.

---

# 8. Invalid Routing Must Fail Safely

Do not implement fallback behaviour such as:

```text
Geral
 ↓
No scheduler found
 ↓
Use Maxixe instead
```

This could result in a user booking a service in the wrong location.

If appointment capability is unavailable, scheduling must not proceed.

---

# 9. Appointment Entry Points

Appointment scheduling may be entered from:

### Início

```text
Início
↓
Marcar um encontro
```

### Assistant Contact Profile

```text
Tonito / Manuela
↓
Marcar encontro
```

### Chat

Where the approved conversational logic provides an appointment CTA:

```text
Conversation
↓
Marcar um encontro
```

### Post-call experience

Where relevant:

```text
Call ended
↓
Marcar um encontro
```

All entry points use the same underlying appointment experience.

---

# 10. Do Not Build Multiple Scheduling Systems

There should not be:

```text
Home Scheduler
Profile Scheduler
Chat Scheduler
Call Scheduler
```

as separate implementations.

All appointment entry points should route into one reusable SAAJ appointment flow.

---

# 11. Recommended Route

Conceptually:

```text
/appointments
```

or another clean internal application route.

The current service area determines which scheduler is loaded.

The URL should not require users to manually specify technical Cal.com information.

---

# 12. Appointment Screen

Recommended structure:

```text
┌──────────────────────────────────┐
│ ←     Marcar um encontro         │
│                                  │
│ Atendimento SAAJ                 │
│ Maxixe                           │
│                                  │
│ ┌──────────────────────────────┐ │
│ │                              │ │
│ │     Cal.com scheduling       │ │
│ │        experience            │ │
│ │                              │ │
│ └──────────────────────────────┘ │
│                                  │
└──────────────────────────────────┘
```

The user remains visually inside SAAJ Virtual.

---

# 13. SAAJ Shell

The appointment page should retain:

* SAAJ visual identity;
* clear page header;
* Back navigation;
* current service location;
* appropriate privacy styling.

Avoid an abrupt visual transition into an unrelated third-party website.

---

# 14. Cal.com Embed

Use the supported Cal.com embed approach.

Current shared namespace:

```text
saaj-virtual-marcacao-de-consulta
```

Current element ID:

```text
my-cal-inline-saaj-virtual-marcacao-de-consulta
```

Origin:

```text
https://app.cal.com
```

---

# 15. Embed Behaviour

Current intended configuration includes:

```text
layout = month_view
useSlotsViewOnSmallScreen = true
hideEventTypeDetails = true
forwardQueryParams = true
```

The implementation should follow the current Cal.com embed requirements rather than inventing unsupported configuration.

---

# 16. One Scheduler at a Time

Only the scheduler for the active service area should be mounted.

Correct:

```text
serviceArea = maxixe
↓
Mount Maxixe scheduler
```

Incorrect:

```text
Mount Maxixe scheduler
Mount Massinga scheduler
Hide one with CSS
```

This creates unnecessary complexity and potential routing mistakes.

---

# 17. Maxixe Appointment Screen

For:

```ts
serviceArea === "maxixe"
```

display:

```text
Marcar um encontro

Atendimento SAAJ
Maxixe

[ Maxixe scheduler ]
```

The user should not be asked to select Maxixe again.

---

# 18. Massinga Appointment Screen

For:

```ts
serviceArea === "massinga"
```

display:

```text
Marcar um encontro

Atendimento SAAJ
Massinga

[ Massinga scheduler ]
```

The user should not be asked to select Massinga again.

---

# 19. Geral

For:

```ts
serviceArea === "geral"
```

the normal UI should not expose appointment entry points.

If an invalid appointment route is nevertheless reached, show a safe state.

Example:

```text
A marcação de encontros ainda não está
disponível na tua zona.

[ Voltar ]
```

Do not silently redirect to Maxixe or Massinga.

---

# 20. No Repeated Location Question

Once location has established:

```text
province = Inhambane
district = Maxixe
serviceArea = maxixe
```

do not ask:

> Em que local queres marcar?

unless a future product requirement explicitly supports cross-location booking.

V1 uses the current service area.

---

# 21. Appointment Location Is Operationally Important

The location shown before/within booking must be clear.

Example:

```text
Atendimento SAAJ
Maxixe
```

or:

```text
Atendimento SAAJ
Massinga
```

This reduces the risk of users misunderstanding where the appointment will occur.

---

# 22. Assistant Identity and Appointments

Appointments are not appointments **with Tonito or Manuela**.

Tonito and Manuela are digital assistant identities.

The appointment is for the appropriate SAAJ/in-person health service.

Avoid wording such as:

```text
Book an appointment with Manuela
```

unless Manuela is genuinely the human provider, which is not the current model.

---

# 23. Human Service Distinction

Where the actual health professional/service location is known and approved, the scheduling experience may identify it appropriately.

The application must maintain a clear conceptual distinction:

```text
Tonito / Manuela
= digital support
```

versus:

```text
Appointment
= in-person service / health professional
```

---

# 24. Booking Information

The scheduler should collect only information legitimately required to manage the appointment.

Depending on the approved operational workflow, this may include:

* name;
* age;
* phone number;
* gender where operationally required;
* neighbourhood/residence;
* reason/service information where appropriate.

Do not collect additional sensitive information simply because a form allows it.

---

# 25. Just-in-Time Data Collection

Personal information required for scheduling is collected at the point where the user chooses to book.

This is intentional.

The application does not need to collect the same information during general onboarding.

Correct:

```text
Open SAAJ
↓
No name required

...

Marcar encontro
↓
Name/contact information requested
because it is needed for the appointment
```

---

# 26. Avoid Duplicate Data Collection

If information has already been legitimately collected during the current approved appointment workflow and can safely be passed into the scheduler, avoid asking for it repeatedly.

However:

* do not silently prefill sensitive information from unrelated conversations;
* do not assume conversation content equals verified booking data.

---

# 27. Query Parameter Prefill

Because:

```text
forwardQueryParams = true
```

is part of the intended embed configuration, approved non-sensitive or explicitly collected values may be forwarded where appropriate.

Only pass fields that:

* are expected by the scheduler;
* have a legitimate purpose;
* comply with the privacy architecture.

Do not place unnecessary sensitive health information in URLs/query strings.

---

# 28. Phone Number

A phone number may be required where needed for:

* appointment coordination;
* confirmation;
* reminder SMS.

The reason should be understandable to the user.

Example:

```text
Número de telefone

Usaremos este número para confirmar
e lembrar-te do encontro.
```

---

# 29. Phone Number Normalisation

Where phone numbers enter backend workflows, normalise them consistently.

For Mozambique numbers, implementation should account for approved local/international formats.

Do not use the display formatting itself as the canonical backend identifier without normalisation.

Detailed mapping belongs in the data/integration specification.

---

# 30. Appointment Confirmation

After a booking is genuinely created, show a clear confirmation.

Example:

```text
✓ Encontro marcado

23 de setembro
14:00

Atendimento SAAJ
Maxixe

Enviaremos uma confirmação para
o número indicado.

[ Concluir ]
```

Only display confirmation after receiving reliable booking success.

---

# 31. Do Not Fake Booking Success

The frontend must not show:

```text
Encontro marcado
```

merely because:

* the user selected a slot;
* the form was submitted locally;
* the embed closed.

A reliable Cal.com booking-success signal must occur.

---

# 32. Confirmation Information

Where available, confirmation should clearly communicate:

* date;
* time;
* location/service;
* next step.

Avoid displaying unnecessary personal health details on the completion screen.

---

# 33. SMS Confirmation

Current intended operational behaviour:

```text
Appointment created
       ↓
SMS confirmation
```

The confirmation message should contain only the information necessary for the appointment.

Avoid unnecessarily sensitive sexual/reproductive health details in SMS content.

---

# 34. SMS Reminder

Current intended behaviour:

```text
Approximately 1 day before appointment
       ↓
SMS reminder
```

This is appointment-specific communication.

It does not require implementing a general notification system in SAAJ Virtual.

---

# 35. SMS Privacy

SMS can appear on lock screens or be viewed by others.

Therefore reminder/confirmation messages should be discreet.

Prefer neutral language such as:

```text
SAAJ Virtual: lembramos o teu encontro
marcado para amanhã às 14:00.
```

Avoid:

```text
Reminder: your contraception/sexual-health
consultation is tomorrow.
```

unless explicit user expectations and privacy design justify that disclosure.

---

# 36. Appointment Notifications Are Not "Mensagens para Mim"

Do not confuse:

```text
Appointment confirmation/reminder
```

with the future feature:

```text
Mensagens para mim
```

Appointment messages are operational communications directly related to a booking.

---

# 37. Reminder Workflow

The implementation may use an automation layer such as n8n where appropriate.

Conceptually:

```text
Cal.com booking
      ↓
booking data
      ↓
approved workflow
      ↓
SMS confirmation

scheduled reminder
      ↓
approximately 1 day before
      ↓
SMS reminder
```

Exact automation implementation belongs in the integration specification.

---

# 38. Booking Record

Where required operationally, a confirmed appointment should create/update the appropriate appointment record.

Current data architecture includes the `Marcações` table.

A booking record should only represent a genuine booking.

---

# 39. Current Marcações Structure

Current operational fields include:

```text
Marcação ID
Session ID
User_ID
Interação Record ID
Data da Marcação
Origem
Província
Nome
Idade
Grupo Etário
Género
Bairro
Tema Principal
Subtema
Risco
Observações Técnicas
Assistente
```

The final mapping and necessity of each field must be governed by the approved data/privacy specification.

Do not automatically expose these fields in the user-facing scheduler.

---

# 40. Assistant Field

If an appointment originated through Tonito or Manuela, the operational system may preserve that origin.

Example:

```text
Assistente = Manuela
```

This does not mean the appointment is with Manuela.

It means Manuela was the digital interaction context that led to the booking.

---

# 41. Direct Home Appointment

If the user books directly from Home:

```text
Início
↓
Marcar encontro
```

there may be no meaningful assistant origin.

Do not invent one.

The data model should support a direct appointment origin where required.

---

# 42. Appointment Origin

Potential origins may include:

```text
home
assistant_profile
chat
voice_call
```

This can support product analytics without changing the booking experience.

---

# 43. Session / Interaction Linkage

Where a booking follows an actual conversation or call, the backend may link it to the relevant interaction.

Where it originates directly from Home, do not fabricate a conversation ID merely to satisfy a schema.

Data models should allow legitimate null/optional relationships.

---

# 44. Appointment Success Event

The frontend should listen for the appropriate Cal.com booking-success event.

Conceptually:

```text
Cal.com
↓
booking successful event
↓
SAAJ handles success
↓
confirmation UI
↓
analytics / backend workflow
```

Do not infer success from arbitrary iframe behaviour.

---

# 45. Appointment Loading

While the scheduler loads:

```text
Marcar um encontro

Atendimento SAAJ
Maxixe

[ scheduling skeleton ]
```

Avoid a blank iframe area.

---

# 46. Scheduler Load Failure

Example:

```text
Não foi possível carregar
os horários disponíveis.

Verifica a tua ligação e tenta novamente.

[ Tentar novamente ]

[ Voltar ]
```

Do not automatically send the user to the other district's scheduler.

---

# 47. No Available Slots

If Cal.com reports no available slots, communicate this clearly.

Example:

```text
Não há horários disponíveis
neste momento.

Tenta novamente mais tarde.

[ Voltar ]
```

If the scheduler itself provides an appropriate no-availability experience, avoid duplicating contradictory UI.

---

# 48. Connection Loss During Booking

If connectivity is lost before booking confirmation:

* do not claim success;
* preserve form state where technically safe;
* allow retry.

Example:

```text
A ligação foi interrompida.

Confirma a ligação à internet antes
de concluir a marcação.
```

---

# 49. Duplicate Booking Protection

Avoid accidentally creating duplicate bookings through:

* double-clicking;
* repeated submission;
* frontend retry;
* webhook retry.

Use Cal.com/backend identifiers and appropriate idempotency logic where available.

---

# 50. Back Before Confirmation

If the user leaves before completing the booking:

```text
Appointment screen
↓
Back
↓
Previous SAAJ context
```

No appointment should be recorded as completed.

---

# 51. Back After Confirmation

After successful booking:

```text
Confirmation
↓
Concluir
↓
appropriate SAAJ destination
```

Recommended default destination:

**Início**

unless the booking flow was entered from an active chat and returning there provides better continuity.

Navigation context may be preserved.

---

# 52. Returning to Chat

If appointment scheduling was opened from an active chat:

```text
Chat
↓
Marcar encontro
↓
Booking
↓
Success
↓
Return to chat
```

may be appropriate.

The existing chat session must remain intact.

---

# 53. Booking from Post-Call

If booking begins from a post-call state, after successful scheduling the user may return to:

* Início;
* assistant Contact Profile;

rather than attempting to restore an already-ended call.

---

# 54. Rescheduling

If Cal.com's approved booking flow supports rescheduling, it may be used.

However, SAAJ should not invent a custom rescheduling system unless required.

Any rescheduling link or mechanism must be privacy-conscious.

---

# 55. Cancellation

Likewise, cancellation should use an approved and reliable mechanism.

Do not expose a `Cancelar` button unless the application can actually cancel the booking.

---

# 56. Appointment Management Screen

A dedicated:

```text
Meus encontros
```

screen is not required in the initial V1 unless explicitly introduced later.

Do not expand the application into a full patient portal.

---

# 57. Home Appointment Status

If reliable appointment data becomes available to the frontend, Home may eventually show:

```text
Próximo encontro

23 Set · 14:00
Maxixe
```

This is optional.

Do not fabricate status from stale local data.

---

# 58. No Account Required

Appointment booking must not force the user to create a SAAJ account.

The scheduling workflow may collect the information necessary for the booking itself.

That is different from requiring application registration.

---

# 59. Age Eligibility

Any age-related appointment eligibility rule must be enforced by the approved service workflow.

Current assistant logic may collect age and apply service-specific eligibility.

Do not create contradictory frontend-only eligibility logic unless it is explicitly defined as a shared product rule.

The final implementation should ensure Voiceflow, Vapi, Cal.com and backend workflows use consistent eligibility rules.

---

# 60. Health Information

The scheduling UI should not independently diagnose, triage or provide medical guidance.

Those responsibilities belong to approved assistant/service logic.

The scheduler's purpose is to:

**schedule the service.**

---

# 61. Privacy

Appointment data is more personally identifying than anonymous browsing/chat state.

Treat booking information accordingly.

Minimise:

* unnecessary local persistence;
* exposure in URLs;
* analytics payloads;
* console logs;
* frontend error logs.

---

# 62. Do Not Store Sensitive Form Data in localStorage by Default

Avoid:

```ts
localStorage.setItem(
  "appointment",
  JSON.stringify({
    name,
    phone,
    reason,
    ...
  })
);
```

unless there is an explicit, reviewed requirement.

Appointment data should flow through the approved scheduling/backend architecture.

---

# 63. Analytics

Potential privacy-conscious product events:

```text
appointment_opened
appointment_scheduler_loaded
appointment_slot_selected
appointment_booking_completed
appointment_booking_failed
appointment_booking_abandoned
```

Potential contextual properties:

```ts
{
  serviceArea: "maxixe",
  origin: "assistant_profile",
  assistant: "manuela"
}
```

Assistant should be omitted/null where no assistant was involved.

---

# 64. Analytics Must Not Include Booking Details

Generic analytics should not include:

* full name;
* phone number;
* detailed health concern;
* clinical notes;
* free-text appointment reason.

Operational booking data and product analytics are separate concerns.

---

# 65. Cal.com Branding

Where technically possible within supported embed configuration, minimise unnecessary third-party visual dominance.

However, do not use unsupported CSS/DOM manipulation that makes the embed fragile.

The surrounding SAAJ shell should provide continuity.

---

# 66. Mobile Behaviour

Scheduling must be fully usable on smartphones.

Priorities:

* readable dates;
* large time-slot targets;
* minimal horizontal scrolling;
* keyboard-safe form fields;
* safe-area handling.

The existing configuration:

```text
useSlotsViewOnSmallScreen = true
```

should support the mobile scheduling experience.

---

# 67. Desktop Behaviour

Desktop should use a constrained scheduling container.

Avoid stretching the calendar across the entire viewport.

Example:

```text
┌───────────────────────────────────────────────┐
│ ← Marcar um encontro                         │
│                                               │
│ Atendimento SAAJ · Maxixe                    │
│                                               │
│     ┌─────────────────────────────────┐       │
│     │                                 │       │
│     │        Scheduler                │       │
│     │                                 │       │
│     └─────────────────────────────────┘       │
│                                               │
└───────────────────────────────────────────────┘
```

---

# 68. Accessibility

The SAAJ appointment shell must support:

* semantic heading structure;
* keyboard navigation;
* accessible Back action;
* adequate contrast;
* screen-reader labels.

The embedded scheduler should use the accessibility capabilities provided by Cal.com.

Do not break them through unnecessary visual manipulation.

---

# 69. Bottom Navigation

The appointment flow should be treated as focused.

The normal:

```text
Início | Conversas | Mais
```

dock does not need to remain visible while scheduling.

Use:

```text
Back
+
Appointment content
```

This prevents accidental navigation during form completion.

---

# 70. Quick Exit

Appointment scheduling contains potentially sensitive information.

A Quick Exit control may therefore be available within the SAAJ appointment shell.

Quick Exit should:

* leave the sensitive scheduling context;
* not falsely cancel an already confirmed appointment;
* not mark an incomplete booking as completed.

Detailed safe-destination behaviour belongs in the privacy specification.

---

# 71. Quick Exit Before Booking Completion

If no booking has been confirmed:

```text
Quick Exit
↓
Leave appointment screen
↓
No completed booking
```

Temporary unsaved scheduler state may be lost.

That is acceptable if required for privacy.

---

# 72. Quick Exit After Booking Confirmation

If the booking has already been successfully created:

```text
Quick Exit
↓
Leave sensitive screen
```

must **not** cancel the booking.

Booking state and screen visibility are separate concepts.

---

# 73. Configuration Security

Do not expose private Cal.com credentials unnecessarily.

If the embed works using public scheduling configuration, a private API key is not automatically required in the frontend.

If server-side Cal.com API operations are later introduced:

```text
CALCOM_API_KEY
```

must remain server-side.

---

# 74. Do Not Add APIs Without Need

Do not introduce Cal.com API complexity merely because an API exists.

For V1:

* use embed functionality where sufficient;
* add server/API integration only when required for defined product behaviour.

---

# 75. Component Architecture

Suggested structure:

```text
AppointmentPage
├── AppointmentHeader
├── ServiceLocation
├── AppointmentEmbed
│   ├── LoadingState
│   ├── CalEmbed
│   └── ErrorState
└── AppointmentConfirmation
```

Routing/configuration should remain outside purely visual components.

---

# 76. Appointment Context

Conceptually:

```ts
type AppointmentContext = {
  serviceArea:
    | "maxixe"
    | "massinga";

  origin:
    | "home"
    | "assistant_profile"
    | "chat"
    | "voice_call";

  assistant?:
    | "tonito"
    | "manuela";

  conversationId?: string;
  callId?: string;
};
```

Only include context that is genuinely required.

---

# 77. Scheduler Resolution

Conceptually:

```ts
function resolveScheduler(
  serviceArea:
    | "maxixe"
    | "massinga"
    | "geral"
) {
  if (serviceArea === "maxixe") {
    return appointmentConfig.maxixe;
  }

  if (serviceArea === "massinga") {
    return appointmentConfig.massinga;
  }

  return null;
}
```

A `null` scheduler must result in a safe unavailable state.

It must not result in an arbitrary fallback.

---

# 78. Required Appointment States

The implementation must support at minimum:

```text
Maxixe scheduler
Massinga scheduler

Loading
Loaded
Slot selection
Form completion
Submitting
Booking success
Booking failure
No slots
Connectivity failure
Invalid service area
Quick Exit
```

---

# 79. Acceptance Behaviour

The appointment implementation is correct when:

* appointment scheduling exists for Maxixe;
* appointment scheduling exists for Massinga;
* Geral does not expose functional scheduling;
* Maxixe always routes to the Maxixe scheduler;
* Massinga always routes to the Massinga scheduler;
* invalid routing never falls back to another district;
* Tonito and Manuela use the same location-based scheduler;
* appointments are not presented as appointments with the digital assistants;
* Home, Contact Profile, Chat and Post-Call can reuse the same scheduling experience;
* only one Cal.com scheduler is mounted at a time;
* the scheduling experience remains inside a SAAJ visual shell;
* users are not asked to select their district again;
* personal information is collected just in time;
* unnecessary sensitive information is not placed in URLs or analytics;
* booking success is shown only after reliable confirmation;
* confirmation SMS can be sent;
* an approximately one-day reminder can be sent;
* SMS wording remains discreet;
* no general notification centre is required;
* incomplete bookings are not recorded as completed;
* confirmed bookings may feed the approved operational workflow;
* a confirmed booking is not cancelled merely because the user leaves the screen;
* no SAAJ account is required;
* private Cal.com credentials remain server-side where used;
* the implementation remains mobile-first and privacy-conscious.

---

# 80. Final Appointment Architecture

```text
                        SAAJ VIRTUAL
                             │
                    MARCAR UM ENCONTRO
                             │
                ┌────────────┴────────────┐
                │                         │
             MAXIXE                    MASSINGA
                │                         │
                ▼                         ▼
        MAXIXE CAL.COM             MASSINGA CAL.COM
                │                         │
                └────────────┬────────────┘
                             │
                      BOOKING SUCCESS
                             │
               ┌─────────────┼─────────────┐
               │             │             │
               ▼             ▼             ▼
        Confirmation      Backend        Analytics
             UI            workflow       event
                             │
                    ┌────────┴────────┐
                    │                 │
                    ▼                 ▼
             SMS confirmation    SMS reminder
                                  ~1 day before
```

The central rule is:

```text
LOCATION DETERMINES THE APPOINTMENT SERVICE.

THE ASSISTANT MAY GUIDE THE USER TO IT,
BUT DOES NOT DETERMINE THE LOCATION.

GERAL MUST NEVER SILENTLY FALL BACK
TO MAXIXE OR MASSINGA.
```

```

Next is **`10-mais.md`**. That will lock the last primary navigation area: **Localização, Privacidade e Segurança, Limpar conversas/dados, Sobre o SAAJ Virtual, Ajuda e apoio, Termos e Privacidade**, including the NCAI development attribution and exactly what happens when someone changes location after already having conversations.
```
