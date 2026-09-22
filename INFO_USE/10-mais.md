Next is **`10-mais.md`**. This keeps `Mais` intentionally compact: it is the place for location, privacy/data controls, help and product information—not a dumping ground for unrelated features.

````markdown id="e1wz4q"
# SAAJ Virtual — Mais

## 1. Purpose

`Mais` contains secondary application controls and information that users may need but that should not compete with the primary SAAJ experience.

It provides access to:

- location;
- privacy and security;
- conversation/data controls;
- information about SAAJ Virtual;
- help and support;
- terms and privacy information.

It must remain simple.

`Mais` is not:

- a user account page;
- a conventional profile page;
- an administrative settings dashboard;
- a notification centre;
- a health record.

---

# 2. Navigation Position

`Mais` is the third destination in the primary navigation:

```text
Início      Conversas      Mais
                             ●
````

The shared floating navigation remains neutral and follows the SAAJ Design System.

---

# 3. Recommended Structure

```text
Mais


[location icon] Localização
                Inhambane · Maxixe             >


PRIVACIDADE E SEGURANÇA

[lock icon]     Privacidade                    >

[trash icon]    Limpar conversas               >


SOBRE

[info icon]     Sobre o SAAJ Virtual           >

[help icon]     Ajuda e apoio                  >

[file icon]     Termos e privacidade           >



        Início   Conversas   Mais
                           ●
```

Keep the number of options deliberately restrained.

---

# 4. No Perfil Tab

Do not rename this screen:

```text
Perfil
```

because V1 does not use a conventional user account/profile model.

The user has no required:

* username;
* password;
* profile photo;
* email account;
* account biography.

`Mais` more accurately represents the content.

---

# 5. Location

The first major option is:

```text
Localização
```

It should show the user's currently selected location where available.

Example:

```text
Localização
Inhambane · Maxixe
```

or:

```text
Localização
Maputo Cidade
```

---

# 6. Do Not Display Service-Area Internals

The user should see their actual location.

Correct:

```text
Maputo Cidade
```

Incorrect:

```text
Geral
```

`geral` is an internal service-routing category, not a physical location.

---

# 7. Inhambane Location Display

Where district is known:

```text
Inhambane · Maxixe
```

or:

```text
Inhambane · Massinga
```

or:

```text
Inhambane · Vilankulo
```

The UI may use:

```text
Province · District
```

for compact presentation.

---

# 8. Changing Location

Tapping:

```text
Localização
```

opens the geographic-selection experience.

This reuses the map/location components from onboarding.

It does **not** replay the complete onboarding process.

Flow:

```text
Mais
 ↓
Localização
 ↓
Mozambique map
 ↓
Choose province
 ↓
If Inhambane:
choose district
 ↓
Resolve new serviceArea
 ↓
Save
 ↓
Return
```

---

# 9. No Assistant Reselection After Location Change

Changing location should not automatically force:

```text
Choose Tonito or Manuela again
```

The assistants remain available regardless of location.

Location changes service capability and technical routing for **future interactions**.

---

# 10. Location Change Example

Initial state:

```ts
{
  province: "Inhambane",
  district: "Maxixe",
  serviceArea: "maxixe"
}
```

User changes location to:

```text
Maputo Cidade
```

New state:

```ts
{
  province: "Maputo Cidade",
  district: null,
  serviceArea: "geral"
}
```

The application now exposes Geral capabilities for new interactions.

---

# 11. Location Change to Massinga

Example:

```text
Current:
Maputo Cidade
serviceArea = geral

↓ change location

Inhambane
↓
Massinga

Result:
serviceArea = massinga
```

New interactions can now access:

* text;
* voice;
* appointment.

---

# 12. Location Change Does Not Rewrite History

This is a strict rule.

Example:

```text
Existing conversation:
Manuela + Maxixe
```

User changes current location:

```text
Maxixe → Maputo Cidade
```

The old conversation remains:

```text
Manuela + Maxixe
```

It must not become:

```text
Manuela + Geral
```

---

# 13. New Conversations Use New Location

After the location change:

```text
Current location = Maputo Cidade
serviceArea = geral
```

a new Manuela conversation uses:

```text
Manuela Geral
```

Historical Manuela Maxixe conversations remain unchanged.

---

# 14. Resuming Historical Conversations

If the user resumes an existing Maxixe conversation after changing location, the thread retains its original conversation/service context.

Do not silently switch the underlying Voiceflow agent.

This preserves conversational continuity.

---

# 15. Service Availability Updates

Changing location may immediately change available actions.

Example:

```text
Maxixe
↓
Maputo Cidade
```

New Contact Profiles should change from:

```text
Mensagem
Ligar
Marcar encontro
```

to:

```text
Mensagem
```

Existing history remains intact.

---

# 16. Moving into an Enhanced Area

Example:

```text
Geral
↓
Massinga
```

new Contact Profiles can expose:

```text
Mensagem
Ligar
Marcar encontro
```

No account upgrade or additional onboarding is required.

---

# 17. Location Confirmation

After changing location, use lightweight confirmation.

Example:

```text
Localização atualizada
```

Do not create a large success ceremony.

---

# 18. Privacy and Security Section

Recommended section:

```text
PRIVACIDADE E SEGURANÇA

Privacidade
Limpar conversas
```

Depending on final persistence architecture, an additional explicit data-clearing action may be included.

---

# 19. Privacy Screen

`Privacidade` should explain the SAAJ privacy model in clear language.

It should cover, as applicable:

* no mandatory SAAJ account;
* what information may be remembered on the device;
* how conversations are handled;
* when personal information may be requested;
* appointment information;
* voice interaction information;
* Quick Exit;
* how to clear locally stored information;
* relevant limitations.

The wording must reflect the real production implementation.

---

# 20. Privacy Language

Use simple language.

Avoid turning the first privacy screen into a legal document.

Example structure:

```text
Privacidade

Queremos que te sintas seguro ao usar
o SAAJ Virtual.

Não precisas de criar uma conta para
começar.

Algumas informações podem ser guardadas
para permitir que continues a tua experiência.

[ Saber mais ]
```

The complete legal/privacy notice may live separately under:

`Termos e privacidade`.

---

# 21. Do Not Make False Privacy Claims

Do not state:

```text
Nothing ever leaves your device.
```

if conversations are sent to Voiceflow/Vapi/backend services.

Do not state:

```text
Everything is stored only locally.
```

unless technically true.

Do not state:

```text
End-to-end encrypted.
```

unless independently verified and actually implemented.

Privacy copy must match production architecture.

---

# 22. Local Device Information

Depending on final implementation, the device/browser may remember information such as:

```text
onboarding completed
province
district
service area
anonymous user ID
last assistant
conversation references
lightweight preferences
```

This should be described in user-friendly terms rather than exposing implementation objects.

---

# 23. Personal Information

General application access should not require:

* name;
* email;
* password;
* phone number.

Specific services may request information just in time.

For example:

```text
Appointment
↓
phone number may be needed
for confirmation/reminder
```

The privacy screen should make this distinction understandable.

---

# 24. Limpar Conversas

Provide:

```text
Limpar conversas
```

as a deliberate privacy/data-control action.

This action should not execute immediately after one accidental tap.

---

# 25. Clear Conversations Confirmation

Example:

```text
Limpar conversas?

As conversas guardadas neste dispositivo
deixarão de aparecer aqui.

[ Cancelar ]

[ Limpar conversas ]
```

Final wording must accurately reflect what is actually deleted.

---

# 26. Local Deletion vs Server Deletion

This distinction is critical.

If `Limpar conversas` only removes local conversation references/history, do not claim:

```text
All your data has been permanently deleted.
```

Instead use wording such as:

```text
As conversas guardadas neste dispositivo
serão removidas.
```

Server/provider data deletion must only be claimed when an actual deletion workflow exists.

---

# 27. Clear Conversations Must Not Change Location

If the user clears conversation history:

```text
conversation history → cleared
```

it should not automatically reset:

```text
province
district
serviceArea
onboardingCompleted
```

unless the user explicitly chooses a broader data reset.

---

# 28. Clear Conversations Must Not Cancel Appointments

Clearing conversations must not:

* cancel confirmed appointments;
* delete a Cal.com booking;
* cancel an SMS reminder;

unless an explicit appointment-cancellation action exists.

Conversation history and appointment state are different concerns.

---

# 29. Limpar Dados Deste Dispositivo

If the final persistence implementation warrants a broader reset, add a separate option:

```text
Limpar dados deste dispositivo
```

This must remain distinct from:

```text
Limpar conversas
```

---

# 30. Device Data Reset

A broader device reset may remove:

```text
onboardingCompleted
location
serviceArea
anonymous local ID
conversation references
preferences
```

depending on final architecture.

It should not claim to delete server/provider data unless that is genuinely implemented.

---

# 31. Device Reset Confirmation

Example:

```text
Limpar dados deste dispositivo?

As informações guardadas neste navegador,
incluindo localização e preferências, serão
removidas.

Na próxima vez, terás de configurar novamente
o SAAJ Virtual.

[ Cancelar ]

[ Limpar dados ]
```

---

# 32. Consequence of Full Local Reset

After a successful complete local reset:

```text
local state cleared
       ↓
onboardingCompleted = false
       ↓
next application start
       ↓
Welcome
```

This is one legitimate way onboarding can appear again.

---

# 33. Do Not Clear Data Silently

Never reset local SAAJ state because:

* a request failed;
* Voiceflow session expired;
* a location changed;
* the user logged out, because there is no V1 login;
* a provider integration failed.

Data clearing must be intentional.

---

# 34. About Section

Recommended:

```text
SOBRE

Sobre o SAAJ Virtual
Ajuda e apoio
Termos e privacidade
```

---

# 35. Sobre o SAAJ Virtual

Suggested structure:

```text
Sobre o SAAJ Virtual

Um espaço digital seguro e confidencial
para adolescentes e jovens encontrarem
informação e apoio sobre saúde sexual
e reprodutiva.

SOBRE O SERVIÇO

O SAAJ Virtual permite conversar com
Tonito ou Manuela, obter informação e
orientação e, onde disponível, marcar
um encontro com um profissional de saúde.

DESENVOLVIMENTO

Desenvolvido por
NCAI Consultorias e Serviços, EI

Versão 1.0
```

Exact final programme/institutional attribution may be added when approved.

---

# 36. Development Attribution

The development attribution should appear as:

```text
Desenvolvido por
NCAI Consultorias e Serviços, EI
```

Keep it professional and secondary to the SAAJ Virtual identity.

---

# 37. Do Not Replace SAAJ Branding

The About screen hierarchy should remain:

```text
SAAJ Virtual
     ↓
service information
     ↓
development attribution
```

not:

```text
NCAI product
     ↓
SAAJ
```

The user-facing service remains SAAJ Virtual.

---

# 38. Provider Attribution

Do not turn About into a list such as:

```text
Built with Voiceflow
Voice by Vapi
Scheduling by Cal.com
Automation by n8n
Database by Airtable
```

unless contractual/legal attribution specifically requires it.

Infrastructure should remain implementation detail.

---

# 39. Version

A simple version may appear:

```text
Versão 1.0
```

This can help support/debugging without exposing technical build information.

---

# 40. Help and Support

`Ajuda e apoio` should provide practical assistance with using SAAJ Virtual.

Potential topics:

```text
Como começar uma conversa?
Como mudar a localização?
Como fazer uma chamada?
Como marcar um encontro?
Como limpar as minhas conversas?
O que fazer se algo não funcionar?
```

Keep help task-oriented.

---

# 41. Help Is Not Medical Advice

The `Ajuda e apoio` screen is primarily product/service help.

Health questions should be directed toward:

```text
Tonito
```

or:

```text
Manuela
```

rather than duplicated in static technical help content.

Public health-information content may exist separately as part of the discoverability architecture.

---

# 42. Contacting Support

If a real support channel is approved later, Help may expose it.

Do not invent:

* phone numbers;
* email addresses;
* WhatsApp contacts;
* emergency lines.

Only show verified operational contact information.

---

# 43. Emergency Information

If emergency/safeguarding contact information is eventually included, it must be based on approved, verified service information.

Do not use generic or fabricated emergency numbers.

This belongs to the safety/service-content architecture rather than ordinary UI guesswork.

---

# 44. Terms and Privacy

`Termos e privacidade` provides access to the complete applicable:

* terms of use;
* privacy information;
* data-processing information;
* relevant notices.

These pages should be readable without requiring an account.

---

# 45. Public Accessibility

Where appropriate, legal/privacy information should also be available through public web routes.

A user should not have to complete onboarding merely to understand how SAAJ Virtual handles data.

---

# 46. No Notifications Setting in V1

Do not add:

```text
Notificações
```

to `Mais` in V1.

There is currently no general application notification system requiring user preferences.

---

# 47. Appointment SMS Is Separate

Appointment:

```text
confirmation SMS
+
reminder SMS
```

does not justify a generic Notifications settings page.

These messages are operationally tied to an appointment.

---

# 48. Future Mensagens para Mim

The future feature:

```text
Mensagens para mim
```

may eventually require its own preference controls.

Possible future settings could include:

```text
Enable messages
Topics
Frequency
```

Do not build these controls in V1.

---

# 49. No Preferred Assistant Setting

Do not add:

```text
Assistente preferido
[ Tonito / Manuela ]
```

as a formal setting in V1.

The product may remember:

```text
lastAssistant
```

for convenience.

This is different from permanently assigning a preferred assistant.

---

# 50. No Account Settings

Do not add:

```text
Conta
Email
Password
Change password
Sign out
Profile picture
```

because V1 does not use the conventional account model.

---

# 51. No Health Profile

Do not create settings such as:

```text
My medical profile
My conditions
My medications
My sexual-health history
```

SAAJ Virtual V1 is not a patient portal.

---

# 52. No Administrative Controls

Do not expose:

* analytics;
* Voiceflow configuration;
* Vapi settings;
* Cal.com settings;
* Airtable;
* n8n;
* agent IDs;
* debug mode;

inside the user-facing `Mais` screen.

---

# 53. Visual Structure

Use section grouping with whitespace rather than heavy card nesting.

Example:

```text
Localização

────────────

PRIVACIDADE E SEGURANÇA

Privacidade
Limpar conversas

────────────

SOBRE

Sobre o SAAJ Virtual
Ajuda e apoio
Termos e privacidade
```

Avoid placing every row inside a large glass card.

---

# 54. Row Design

A standard settings row may contain:

```text
[icon]  Title
        Optional secondary text        >
```

Example:

```text
[pin]   Localização
        Inhambane · Maxixe             >
```

Rows should have large tap areas.

---

# 55. Iconography

Use the same icon family defined in the Design System.

Potential conceptual icons:

```text
Localização             map-pin
Privacidade             lock
Limpar conversas        trash
Sobre                    info
Ajuda                    circle-help
Termos                   file-text
```

Avoid emoji as production interface icons.

---

# 56. Destructive Actions

Destructive controls should not use assistant colours.

For example:

```text
Limpar conversas
```

should use the system destructive state when confirmation is required.

Tonito blue and Manuela berry represent assistant identity, not danger.

---

# 57. Confirmation UI

On mobile, destructive confirmation may use a bottom sheet.

Example:

```text
╭─────────────────────────────────╮
│                                 │
│ Limpar conversas?               │
│                                 │
│ As conversas guardadas neste    │
│ dispositivo serão removidas.    │
│                                 │
│ [ Cancelar ]                    │
│                                 │
│ [ Limpar conversas ]            │
│                                 │
╰─────────────────────────────────╯
```

Avoid browser-native confirmation dialogs where a consistent SAAJ component can be used reliably.

---

# 58. Privacy Screen Navigation

Privacy/legal screens may use:

```text
← Privacidade
```

with standard internal navigation.

The bottom dock does not need to remain visible on deeper informational screens.

---

# 59. Quick Exit

The main `Mais` screen itself does not require a prominent Quick Exit control.

It contains relatively little sensitive health content.

Quick Exit remains primarily associated with:

* Assistant Contact Profile;
* Chat;
* Voice Call;
* sensitive appointment contexts.

---

# 60. Data Export

User data export is not automatically part of V1.

Do not add:

```text
Exportar meus dados
```

unless an actual backend workflow exists to fulfil it correctly.

Legal rights requests may be described in the final privacy notice where applicable.

---

# 61. Delete My Account

Do not add:

```text
Eliminar conta
```

because there is no conventional SAAJ account in V1.

This is different from clearing local device data or requesting deletion of server-held personal information where applicable.

---

# 62. Server Data Requests

If users have a legal/operational mechanism to request access or deletion of server-held data, that process should be accurately documented in privacy information.

Do not imply that:

```text
Limpar dados deste dispositivo
```

performs that server-side request.

---

# 63. Connectivity

Most informational settings content should remain available even if external integrations are unavailable.

For example:

* About;
* basic privacy explanation;
* current locally stored location;

should not depend on Voiceflow or Vapi being online.

---

# 64. Location Change Connectivity

Location selection itself can largely operate from local application assets if maps/configuration are bundled with the app.

Updating local routing state should not require an unnecessary external API call unless the final architecture specifically requires one.

---

# 65. Analytics

Potential privacy-conscious events:

```text
more_viewed
location_settings_opened
location_changed
privacy_viewed
clear_conversations_started
clear_conversations_completed
local_data_reset_started
local_data_reset_completed
about_viewed
help_viewed
terms_privacy_viewed
```

Do not attach sensitive health information.

---

# 66. Location Analytics

If location is legitimately part of approved product analytics, events may include:

```ts
{
  province: "Inhambane",
  district: "Maxixe",
  serviceArea: "maxixe"
}
```

This must follow the data/privacy specification.

Do not add precise GPS coordinates.

---

# 67. Component Architecture

Suggested reusable components:

```text
MorePage
├── SettingsSection
├── SettingsRow
├── LocationRow
├── DestructiveActionSheet
└── BottomNavigation

LocationSettings
PrivacyPage
AboutPage
HelpPage
TermsPrivacyPage
```

Use shared rows/components rather than custom markup for every setting.

---

# 68. Settings Row Example

Conceptually:

```tsx
<SettingsRow
  icon={MapPin}
  title="Localização"
  description="Inhambane · Maxixe"
  onClick={openLocationSettings}
/>
```

---

# 69. Location State

Conceptually:

```ts
type LocationState = {
  province: string;
  district?: string | null;

  serviceArea:
    | "maxixe"
    | "massinga"
    | "geral";
};
```

The actual geographic selection and service-routing logic remains centralised.

---

# 70. Location Update

Conceptually:

```ts
function updateLocation(
  province: string,
  district?: string
) {
  const serviceArea =
    resolveServiceArea(
      province,
      district
    );

  saveCurrentLocation({
    province,
    district,
    serviceArea,
  });
}
```

Do not modify historical conversation objects when this function runs.

---

# 71. Clear Conversation Logic

Conceptually:

```text
User selects Limpar conversas
        ↓
Confirmation
        ↓
Clear approved local conversation data
        ↓
Update Conversas
        ↓
Update Início recent conversations
        ↓
Location remains
        ↓
Onboarding remains completed
```

Exact storage behaviour is defined later in the persistence specification.

---

# 72. Full Device Reset Logic

If implemented:

```text
User selects Limpar dados deste dispositivo
        ↓
Confirmation
        ↓
Clear approved local SAAJ state
        ↓
Return to safe/reset state
        ↓
Next normal start → onboarding
```

Do not claim remote deletion.

---

# 73. Required States

`Mais` must support at minimum:

```text
Location available
Location changing
Location updated
Privacy page
About page
Help page
Terms/privacy page
Clear-conversation confirmation
Clear-conversation success
Clear-conversation failure
Full-device-reset confirmation, if implemented
Offline informational access where possible
```

---

# 74. Acceptance Behaviour

`Mais` is correctly implemented when:

* the tab is called `Mais`, not `Perfil`;
* current location is visible;
* `geral` is never shown as though it were a physical location;
* location can be changed without replaying complete onboarding;
* changing location does not require choosing an assistant again;
* new interactions use the new service area;
* historical conversations retain their original assistant and service area;
* moving to Maxixe/Massinga enables their appropriate future capabilities;
* moving to Geral removes unsupported future Call/Appointment actions;
* privacy information is accessible;
* privacy copy reflects actual implementation;
* conversations can be deliberately cleared where implemented;
* local deletion is not misrepresented as server deletion;
* clearing conversations does not reset location;
* clearing conversations does not cancel appointments;
* broader device reset, if implemented, is separate;
* About identifies SAAJ Virtual clearly;
* NCAI Consultorias e Serviços, EI receives the approved development attribution;
* Help remains task-oriented;
* legal/privacy information is accessible;
* no notification setting is added unnecessarily;
* no preferred-assistant setting is required;
* no account/password/profile controls appear;
* no provider/admin configuration appears;
* the screen remains simple and mobile-first.

---

# 75. Final Mais Model

```text
┌──────────────────────────────────┐
│ Mais                             │
│                                  │
│ [pin] Localização             >  │
│       Inhambane · Maxixe         │
│                                  │
│ PRIVACIDADE E SEGURANÇA          │
│                                  │
│ [lock] Privacidade            >  │
│                                  │
│ [trash] Limpar conversas      >  │
│                                  │
│ SOBRE                            │
│                                  │
│ [info] Sobre o SAAJ Virtual   >  │
│                                  │
│ [?] Ajuda e apoio             >  │
│                                  │
│ [file] Termos e privacidade   >  │
│                                  │
│ ┌──────────────────────────────┐ │
│ │ Início  Conversas     Mais   │ │
│ │                        ●     │ │
│ └──────────────────────────────┘ │
└──────────────────────────────────┘
```

The governing principle is:

```text
MAIS IS FOR SECONDARY CONTROL
AND TRUST-BUILDING INFORMATION.

IT IS NOT A USER PROFILE,
HEALTH RECORD,
OR ADMINISTRATION PANEL.
```

```

Next is **`11-location-routing.md`**. This will consolidate the geographic logic we've been referencing across every previous document into a single authoritative specification: **Mozambique → Inhambane → district → Maxixe/Massinga/Geral**, actual location versus service area, central capability resolution, the six Voiceflow routes, four Vapi routes and two Cal.com routes.
```
