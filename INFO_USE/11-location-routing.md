Next is **`11-location-routing.md`**. This should become the **single source of truth for geographic and service routing** so that Home, Chat, Contact Profiles, Voice Calls and Appointments do not each implement their own interpretation of location.

````markdown id="4n1ecr"
# SAAJ Virtual — Location & Service Routing

## 1. Purpose

This document defines how SAAJ Virtual converts the user's selected geographic location into the correct service experience.

Location determines:

- the user's current service area;
- which Voiceflow assistant is used;
- whether voice calling is available;
- which Vapi assistant is used;
- whether appointment scheduling is available;
- which Cal.com scheduler is used.

The central principle is:

```text
ACTUAL LOCATION
      ↓
SERVICE AREA
      ↓
AVAILABLE CAPABILITIES
      ↓
CORRECT PROVIDER CONFIGURATION
````

Geographic routing must be centralised.

Individual screens must not independently decide which Voiceflow, Vapi or Cal.com configuration to use.

---

# 2. Two Different Concepts

SAAJ Virtual must distinguish between:

### Actual location

The location selected by the user.

For example:

```ts
{
  province: "Inhambane",
  district: "Vilankulo"
}
```

### Service area

The internal operational category used to determine available SAAJ services.

For example:

```ts
{
  serviceArea: "geral"
}
```

These are not the same thing.

---

# 3. Why the Distinction Matters

A user may be physically located in:

```text
Vilankulo
```

while using:

```text
SAAJ Geral
```

The application must not replace the user's actual location with the internal routing category.

Correct:

```ts
{
  province: "Inhambane",
  district: "Vilankulo",
  serviceArea: "geral"
}
```

Incorrect:

```ts
{
  province: "Geral",
  district: null
}
```

---

# 4. User-Facing vs Internal Terminology

Users may see:

```text
Inhambane · Maxixe
Inhambane · Massinga
Inhambane · Vilankulo
Maputo Cidade
Nampula
```

Users should not normally see:

```text
serviceArea = geral
serviceArea = maxixe
serviceArea = massinga
```

Those are internal routing values.

---

# 5. Current Service Areas

Version 1 has three service-area values:

```ts
type ServiceArea =
  | "maxixe"
  | "massinga"
  | "geral";
```

---

# 6. Enhanced Service Areas

The two enhanced service areas are:

```text
Maxixe
Massinga
```

They provide:

```text
Text
Voice
Appointments
```

---

# 7. Geral Service Area

All other supported geographic locations currently resolve to:

```text
geral
```

Geral provides:

```text
Text
```

It does not provide in V1:

```text
Voice
Appointments
```

---

# 8. Top-Level Geographic Flow

The routing process begins with province selection.

```text
MOZAMBIQUE
    ↓
SELECT PROVINCE
    ↓
Is province Inhambane?
    │
    ├── NO
    │    ↓
    │  GERAL
    │
    └── YES
         ↓
    SELECT DISTRICT
         ↓
    Is district Maxixe?
         │
         ├── YES → MAXIXE
         │
         └── NO
              ↓
    Is district Massinga?
         │
         ├── YES → MASSINGA
         │
         └── NO → GERAL
```

---

# 9. Province Rule

For every province other than Inhambane:

```ts
serviceArea = "geral";
```

No district selection is required during initial onboarding for those provinces.

The selected province must still be preserved.

Example:

```ts
{
  province: "Maputo Cidade",
  district: null,
  serviceArea: "geral"
}
```

---

# 10. Inhambane Rule

If:

```ts
province === "Inhambane"
```

the user must select a district.

The district determines whether enhanced SAAJ services are available.

---

# 11. Maxixe Rule

If:

```ts
province === "Inhambane" &&
district === "Maxixe"
```

then:

```ts
serviceArea = "maxixe";
```

Capabilities:

```text
Text       ✓
Voice      ✓
Appointment ✓
```

---

# 12. Massinga Rule

If:

```ts
province === "Inhambane" &&
district === "Massinga"
```

then:

```ts
serviceArea = "massinga";
```

Capabilities:

```text
Text       ✓
Voice      ✓
Appointment ✓
```

---

# 13. Other Inhambane Districts

If the province is Inhambane but the district is neither Maxixe nor Massinga:

```ts
serviceArea = "geral";
```

Example:

```ts
{
  province: "Inhambane",
  district: "Vilankulo",
  serviceArea: "geral"
}
```

The actual district must still be preserved.

---

# 14. Reference Inhambane Districts

The current working list is:

```text
Mabote
Govuro
Inhassoro
Vilankulo
Massinga
Funhalouro
Morrumbene
Maxixe
Inhambane
Homoíne
Panda
Jangamo
Inharrime
Zavala
```

Before production release, names, spelling and geographic boundaries must be validated against an authoritative source.

Do not invent district boundaries from visual approximations.

---

# 15. Central Resolver

Routing should be implemented in one shared function.

Conceptually:

```ts
function resolveServiceArea(
  province: string,
  district?: string | null
): ServiceArea {
  if (
    province === "Inhambane" &&
    district === "Maxixe"
  ) {
    return "maxixe";
  }

  if (
    province === "Inhambane" &&
    district === "Massinga"
  ) {
    return "massinga";
  }

  return "geral";
}
```

All application areas should use this resolver.

---

# 16. Do Not Duplicate Geographic Logic

Avoid:

```text
Home decides service area
Chat decides service area
Profile decides service area
Call decides service area
Appointments decide service area
```

Instead:

```text
          LOCATION STATE
                │
                ▼
       resolveServiceArea()
                │
                ▼
         SERVICE AREA
                │
       ┌────────┼────────┐
       ▼        ▼        ▼
      Chat     Voice    Booking
```

---

# 17. Location State

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

---

# 18. First-Time Location Selection

During onboarding:

```text
Welcome
   ↓
Mozambique Map
   ↓
Province
   ↓
District if Inhambane
   ↓
Resolve service area
   ↓
Assistant selection
```

Location selection happens before assistant selection because the service area determines which assistant configuration is available behind the scenes.

---

# 19. Returning User

For a returning user:

```text
Open SAAJ
   ↓
Load stored location
   ↓
Validate
   ↓
Use existing serviceArea
   ↓
Início
```

Do not ask for location again on every visit.

---

# 20. Location Change

Location can later be changed through:

```text
Mais
↓
Localização
```

This reuses the geographic-selection components without replaying complete onboarding.

---

# 21. Dependent State Clearing

If the user changes province away from Inhambane, any previous Inhambane district selection must be cleared.

Example:

```text
Before:

province = Inhambane
district = Maxixe
serviceArea = maxixe

↓ user changes province

province = Maputo Cidade
```

Result:

```ts
{
  province: "Maputo Cidade",
  district: null,
  serviceArea: "geral"
}
```

Do not preserve:

```text
district = Maxixe
```

under another province.

---

# 22. Changing Between Inhambane Districts

Example:

```text
Maxixe
↓
Vilankulo
```

Result:

```ts
{
  province: "Inhambane",
  district: "Vilankulo",
  serviceArea: "geral"
}
```

Example:

```text
Vilankulo
↓
Massinga
```

Result:

```ts
{
  province: "Inhambane",
  district: "Massinga",
  serviceArea: "massinga"
}
```

---

# 23. Current Location vs Historical Context

The application maintains:

```text
current location
```

for new interactions.

Existing conversations maintain:

```text
historical service context
```

These must not be confused.

---

# 24. Example

A conversation is created while the user is in Maxixe:

```ts
{
  conversationId: "abc",
  assistant: "manuela",
  serviceArea: "maxixe"
}
```

The user later changes location to Maputo Cidade:

```ts
currentServiceArea = "geral";
```

The historical conversation remains:

```ts
conversation.serviceArea = "maxixe";
```

---

# 25. New Conversation After Location Change

After the location change:

```text
Current service area = Geral
```

the user starts:

```text
+ → Manuela
```

Result:

```text
Manuela Geral Voiceflow
```

The historical Manuela Maxixe thread remains unaffected.

---

# 26. Location Must Not Rewrite Conversations

Never implement:

```ts
conversations.forEach(conversation => {
  conversation.serviceArea =
    currentServiceArea;
});
```

Historical conversation routing must remain stable.

---

# 27. Capability Resolution

Capabilities should also be centralised.

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

---

# 28. Capability Resolver

Conceptually:

```ts
function getCapabilities(
  serviceArea: ServiceArea
) {
  return serviceCapabilities[serviceArea];
}
```

This configuration should drive:

* Assistant Contact Profiles;
* Home shortcuts;
* Chat structured actions;
* Voice-call availability;
* Appointment availability.

---

# 29. Do Not Duplicate Capability Rules

Avoid separate logic such as:

```text
Profile thinks Geral has no call
Home thinks Geral has call
Chat thinks Geral can book
```

One central capability model should determine availability everywhere.

---

# 30. Complete Service Matrix

| Service Area | Voiceflow | Vapi | Cal.com |
| ------------ | --------- | ---- | ------- |
| Maxixe       | Yes       | Yes  | Yes     |
| Massinga     | Yes       | Yes  | Yes     |
| Geral        | Yes       | No   | No      |

---

# 31. Voiceflow Routing

There are six logical Voiceflow experiences.

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

---

# 32. Voiceflow Routing Matrix

| Assistant | Service Area | Route            |
| --------- | ------------ | ---------------- |
| Tonito    | Maxixe       | Tonito Maxixe    |
| Tonito    | Massinga     | Tonito Massinga  |
| Tonito    | Geral        | Tonito Geral     |
| Manuela   | Maxixe       | Manuela Maxixe   |
| Manuela   | Massinga     | Manuela Massinga |
| Manuela   | Geral        | Manuela Geral    |

---

# 33. Voiceflow Environment Configuration

```bash
VOICEFLOW_ACCESS_TOKEN=

VOICEFLOW_TONITO_MAXIXE_PROJECT_ID=
VOICEFLOW_TONITO_MASSINGA_PROJECT_ID=
VOICEFLOW_TONITO_GERAL_PROJECT_ID=

VOICEFLOW_MANUELA_MAXIXE_PROJECT_ID=
VOICEFLOW_MANUELA_MASSINGA_PROJECT_ID=
VOICEFLOW_MANUELA_GERAL_PROJECT_ID=
```

The access token remains server-side.

---

# 34. Voiceflow Resolver

Conceptually:

```ts
const voiceflowAgents = {
  tonito: {
    maxixe:
      process.env.VOICEFLOW_TONITO_MAXIXE_PROJECT_ID,

    massinga:
      process.env.VOICEFLOW_TONITO_MASSINGA_PROJECT_ID,

    geral:
      process.env.VOICEFLOW_TONITO_GERAL_PROJECT_ID,
  },

  manuela: {
    maxixe:
      process.env.VOICEFLOW_MANUELA_MAXIXE_PROJECT_ID,

    massinga:
      process.env.VOICEFLOW_MANUELA_MASSINGA_PROJECT_ID,

    geral:
      process.env.VOICEFLOW_MANUELA_GERAL_PROJECT_ID,
  },
};
```

Then:

```ts
function resolveVoiceflowAgent(
  assistant: "tonito" | "manuela",
  serviceArea: ServiceArea
) {
  return voiceflowAgents[assistant][serviceArea];
}
```

---

# 35. New Text Conversation Routing

Example:

```text
Current location:
Inhambane · Massinga

↓
serviceArea = massinga

↓
User chooses Tonito

↓
Tonito Massinga Voiceflow
```

---

# 36. Historical Text Conversation Routing

Example:

```text
Existing conversation metadata:

assistant = Tonito
serviceArea = Maxixe
voiceflowSessionId = XYZ
```

Opening that conversation must resolve:

```text
Tonito Maxixe
```

regardless of the user's current location.

---

# 37. Vapi Routing

There are four Vapi configurations:

```text
Tonito
├── Maxixe
└── Massinga

Manuela
├── Maxixe
└── Massinga
```

There are no Geral voice assistants in V1.

---

# 38. Vapi Matrix

| Assistant | Service Area | Voice                 |
| --------- | ------------ | --------------------- |
| Tonito    | Maxixe       | Tonito Maxixe Vapi    |
| Tonito    | Massinga     | Tonito Massinga Vapi  |
| Tonito    | Geral        | Not available         |
| Manuela   | Maxixe       | Manuela Maxixe Vapi   |
| Manuela   | Massinga     | Manuela Massinga Vapi |
| Manuela   | Geral        | Not available         |

---

# 39. Vapi Environment Configuration

```bash
VAPI_PRIVATE_API_KEY=
NEXT_PUBLIC_VAPI_PUBLIC_KEY=

VAPI_TONITO_MAXIXE_ASSISTANT_ID=
VAPI_TONITO_MASSINGA_ASSISTANT_ID=

VAPI_MANUELA_MAXIXE_ASSISTANT_ID=
VAPI_MANUELA_MASSINGA_ASSISTANT_ID=
```

---

# 40. Vapi Resolver

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

Invalid combinations return no assistant.

---

# 41. Never Fallback Between Vapi Assistants

This is a strict safety rule.

If:

```text
Manuela + Geral
```

is requested, do not fallback to:

```text
Manuela + Maxixe
```

If:

```text
Tonito + Maxixe
```

configuration is missing, do not fallback to:

```text
Tonito + Massinga
```

Fail safely.

---

# 42. Cal.com Routing

There are two appointment schedulers.

```text
Maxixe
Massinga
```

Appointment routing depends only on service area.

---

# 43. Cal.com Matrix

| Service Area | Scheduler     |
| ------------ | ------------- |
| Maxixe       | Maxixe        |
| Massinga     | Massinga      |
| Geral        | Not available |

Assistant identity does not alter the scheduler.

---

# 44. Current Scheduler Links

### Maxixe

```text
saaj-maxixe-8w8m61/saaj-virtual-marcacao-de-consulta
```

### Massinga

```text
saaj-massinga-0cr1s3/saaj-virtual-marcacao-de-consulta
```

---

# 45. Appointment Resolver

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

For Geral:

```ts
resolveAppointment("geral");
// null
```

---

# 46. Never Fallback Between Schedulers

This is a strict rule.

Do not implement:

```text
Massinga scheduler unavailable
↓
Use Maxixe scheduler
```

or:

```text
Geral
↓
Use nearest available scheduler
```

unless a future approved service-routing policy explicitly introduces that behaviour.

---

# 47. Full Routing Table

| Location Context | Assistant | Text                | Voice                 | Appointment  |
| ---------------- | --------- | ------------------- | --------------------- | ------------ |
| Maxixe           | Tonito    | Tonito Maxixe VF    | Tonito Maxixe Vapi    | Maxixe Cal   |
| Maxixe           | Manuela   | Manuela Maxixe VF   | Manuela Maxixe Vapi   | Maxixe Cal   |
| Massinga         | Tonito    | Tonito Massinga VF  | Tonito Massinga Vapi  | Massinga Cal |
| Massinga         | Manuela   | Manuela Massinga VF | Manuela Massinga Vapi | Massinga Cal |
| Geral            | Tonito    | Tonito Geral VF     | —                     | —            |
| Geral            | Manuela   | Manuela Geral VF    | —                     | —            |

This table is the authoritative V1 service-routing model.

---

# 48. Unified Service Resolver

The application may expose a central service-resolution layer.

Conceptually:

```ts
function resolveServices({
  assistant,
  serviceArea,
}: {
  assistant: "tonito" | "manuela";
  serviceArea: ServiceArea;
}) {
  return {
    capabilities:
      getCapabilities(serviceArea),

    voiceflow:
      resolveVoiceflowAgent(
        assistant,
        serviceArea
      ),

    vapi:
      serviceArea === "geral"
        ? null
        : resolveVapiAssistant(
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

This prevents routing decisions from being distributed across screens.

---

# 49. UI Uses Capabilities, Not Provider Presence

The UI should ask:

```text
Can this user call?
```

rather than:

```text
Does a Vapi ID happen to exist?
```

The capability model is the product rule.

Provider configuration supports that rule.

---

# 50. Configuration Validation

At application/server startup or deployment validation, check that required provider configuration exists.

For example:

```text
Maxixe
message = true
call = true
appointment = true
```

therefore required configuration includes:

```text
Tonito Maxixe Voiceflow
Manuela Maxixe Voiceflow
Tonito Maxixe Vapi
Manuela Maxixe Vapi
Maxixe scheduler
```

Missing configuration should be detected before users encounter it where possible.

---

# 51. Fail Closed

If capability configuration and provider configuration disagree, prefer safe failure.

Example:

```text
call = true
but Vapi assistant ID missing
```

Do not route to another assistant or district.

Return an operational error.

---

# 52. Maps

Location selection should use responsive SVG-based geographic maps where feasible.

Avoid low-resolution raster maps for the production interface.

The map must support:

* responsive scaling;
* touch interaction;
* selected state;
* keyboard/accessibility alternatives.

---

# 53. Mozambique Map

The Mozambique map is used for province selection.

It should:

* clearly represent selectable provinces;
* provide adequate touch areas;
* highlight selection;
* work across mobile/desktop.

Do not require precise GPS.

---

# 54. Inhambane Map

The Inhambane district map appears only after selecting Inhambane.

It should allow selection of the appropriate district.

Maxixe and Massinga may receive subtle indication that additional services are available.

Do not visually imply that other districts are invalid.

---

# 55. Enhanced-Area Visual Treatment

Possible subtle treatment:

```text
Maxixe       • Mais serviços disponíveis
Massinga     • Mais serviços disponíveis
```

or a restrained visual accent.

Avoid wording such as:

```text
Supported district
Unsupported district
Pilot district
```

in the normal user experience.

---

# 56. List Alternative

Maps must not be the only way to select location.

Provide:

```text
Escolher da lista
```

as an accessible alternative.

Province list and district list must produce exactly the same routing state as map selection.

---

# 57. No Automatic GPS Requirement

V1 does not require browser/device precise geolocation.

The user manually selects their location.

Benefits include:

* lower permission friction;
* improved privacy;
* predictable routing;
* easier correction.

A future version may optionally introduce assisted location detection if justified.

---

# 58. Do Not Infer District from GPS Without Consent

If geolocation is introduced later, do not silently override a user's chosen district.

User choice remains authoritative unless the user deliberately updates it.

---

# 59. Location Validation

Before marking onboarding complete, validate that:

```text
province exists
```

and:

```text
if province === Inhambane
district exists
```

and:

```text
serviceArea can be resolved
```

---

# 60. Invalid Persisted State

Example:

```ts
{
  onboardingCompleted: true,
  province: "Inhambane",
  district: null,
  serviceArea: "maxixe"
}
```

This is inconsistent.

Do not blindly trust it.

The application should repair or request the minimum necessary location selection.

---

# 61. Another Invalid State

Example:

```ts
{
  province: "Maputo Cidade",
  district: "Maxixe",
  serviceArea: "maxixe"
}
```

This must not be accepted as valid geographic state.

Dependent location fields should be normalised.

---

# 62. Persisted Service Area Validation

Where possible, service area should be derived from actual geographic fields rather than trusted as an independently editable user value.

Conceptually:

```ts
const resolved =
  resolveServiceArea(
    province,
    district
  );

if (storedServiceArea !== resolved) {
  serviceArea = resolved;
}
```

---

# 63. Do Not Let the User Manually Choose Service Area

Never expose:

```text
Choose service:

Maxixe
Massinga
Geral
```

unless those are genuinely their geographic selections.

The user chooses their location.

The system determines the service area.

---

# 64. No Nearest-District Assumption

A user in another district should not automatically be routed to Maxixe or Massinga merely because one may appear geographically close.

V1 routing is based on the defined service rules.

Any future referral to nearby facilities is a separate service/content decision.

---

# 65. Routing and Assistant Choice

Location and assistant selection are independent user/product dimensions.

```text
LOCATION
determines service area
```

while:

```text
USER CHOICE
determines Tonito or Manuela
```

Together they determine the technical agent.

---

# 66. Routing Example — Maxixe + Manuela

```text
Province: Inhambane
District: Maxixe
        ↓
serviceArea = maxixe
        ↓
Assistant = Manuela
        ↓
Text → Manuela Maxixe Voiceflow
Call → Manuela Maxixe Vapi
Book → Maxixe Cal.com
```

---

# 67. Routing Example — Massinga + Tonito

```text
Province: Inhambane
District: Massinga
        ↓
serviceArea = massinga
        ↓
Assistant = Tonito
        ↓
Text → Tonito Massinga Voiceflow
Call → Tonito Massinga Vapi
Book → Massinga Cal.com
```

---

# 68. Routing Example — Vilankulo + Manuela

```text
Province: Inhambane
District: Vilankulo
        ↓
serviceArea = geral
        ↓
Assistant = Manuela
        ↓
Text → Manuela Geral Voiceflow
Call → unavailable
Book → unavailable
```

---

# 69. Routing Example — Maputo + Tonito

```text
Province: Maputo Cidade
        ↓
No district required
        ↓
serviceArea = geral
        ↓
Assistant = Tonito
        ↓
Text → Tonito Geral Voiceflow
Call → unavailable
Book → unavailable
```

---

# 70. Routing Example — User Moves

Initial:

```text
Inhambane · Maxixe
serviceArea = maxixe
```

Existing conversation:

```text
Manuela + Maxixe
```

Then:

```text
Location changes to Maputo Cidade
serviceArea = geral
```

Result:

```text
Old Manuela conversation
→ still Manuela Maxixe

New Manuela conversation
→ Manuela Geral

New Tonito conversation
→ Tonito Geral

New voice call
→ unavailable

New appointment
→ unavailable
```

---

# 71. Routing Should Not Depend on UI Colour

Never infer technical routing from:

* blue theme;
* pink theme;
* selected tab;
* current filter;
* screen appearance.

Routing must use explicit application state.

---

# 72. Conversation Filter Is Not Routing State

Example:

```text
Conversas filter = Tonito
```

does not mean:

```text
assistant = Tonito
```

for unrelated actions.

Filters only control visible inbox rows.

---

# 73. Last Assistant Is Not Routing Authority

Example:

```text
lastAssistant = Manuela
```

may influence:

* Home ordering.

It must not override an explicit user selection of Tonito.

---

# 74. Service Area Is Not Assistant Preference

Likewise:

```text
serviceArea = maxixe
```

does not determine whether the user gets Tonito or Manuela.

The user still chooses.

---

# 75. Backend Validation

Provider-facing server routes should validate routing context rather than trusting arbitrary client values.

For example, a request to start:

```text
Manuela + Maxixe
```

should resolve through approved configuration.

Do not accept a raw client-supplied Voiceflow Project ID as authoritative.

---

# 76. Never Send Provider IDs from User-Controlled Input

Avoid APIs such as:

```json
{
  "projectId": "whatever-the-browser-sends"
}
```

Prefer:

```json
{
  "assistant": "manuela",
  "serviceArea": "maxixe"
}
```

and resolve the actual provider configuration server-side.

---

# 77. Same Principle for Vapi

Do not allow arbitrary assistant IDs supplied by the browser to determine private routing where server resolution is appropriate.

Use semantic application values:

```text
assistant
serviceArea
```

and resolve approved configuration.

---

# 78. Same Principle for Appointments

Do not allow arbitrary calendar URLs to be generated from user input.

The application should choose from the approved scheduler configuration.

---

# 79. Provider Independence

Central routing also makes future provider changes easier.

Conceptually:

```text
SAAJ semantics:
assistant = Manuela
serviceArea = Maxixe
channel = voice
```

should remain stable even if the underlying voice provider changes in the future.

---

# 80. Analytics

Potential location/routing events:

```text
province_selected
district_selected
service_area_resolved
location_changed
service_capability_resolved
routing_failure
```

Use approved geographic dimensions only.

Do not collect precise GPS coordinates in V1.

---

# 81. Routing Failure Analytics

A technical routing failure may record:

```ts
{
  assistant: "manuela",
  serviceArea: "maxixe",
  channel: "voice",
  errorType: "missing_configuration"
}
```

Do not include sensitive conversation content.

---

# 82. Testing Matrix

Routing tests must cover all six assistant/service combinations:

```text
Tonito + Maxixe
Tonito + Massinga
Tonito + Geral

Manuela + Maxixe
Manuela + Massinga
Manuela + Geral
```

---

# 83. Geographic Tests

At minimum test:

```text
Inhambane + Maxixe
→ maxixe

Inhambane + Massinga
→ massinga

Inhambane + Vilankulo
→ geral

Inhambane + another valid district
→ geral

Maputo Cidade
→ geral

another province
→ geral
```

---

# 84. Capability Tests

Verify:

```text
maxixe
message = true
call = true
appointment = true

massinga
message = true
call = true
appointment = true

geral
message = true
call = false
appointment = false
```

---

# 85. Historical Context Tests

Test:

```text
Create Manuela Maxixe conversation
↓
Change current location to Maputo
↓
Resume old conversation
↓
Must still use Manuela Maxixe
```

Then:

```text
Create new Manuela conversation
↓
Must use Manuela Geral
```

---

# 86. Invalid Routing Tests

Test that:

```text
Geral → Vapi
```

fails safely.

Test that:

```text
Geral → Cal.com
```

fails safely.

Test that missing Maxixe configuration does not route to Massinga.

Test that missing Manuela configuration does not route to Tonito.

---

# 87. Required Routing States

The application must handle:

```text
No location yet
Province selected
Inhambane awaiting district
Location complete
Maxixe
Massinga
Geral
Location changing
Invalid persisted state
Missing provider configuration
Historical conversation context
```

---

# 88. Acceptance Behaviour

Location and routing are correctly implemented when:

* actual location and service area are separate concepts;
* users see actual location rather than internal service-area labels;
* non-Inhambane provinces resolve to Geral;
* Inhambane requires district selection;
* Maxixe resolves to Maxixe;
* Massinga resolves to Massinga;
* other Inhambane districts resolve to Geral;
* geographic routing is centralised;
* capability routing is centralised;
* Maxixe provides text, voice and appointment;
* Massinga provides text, voice and appointment;
* Geral provides text;
* six Voiceflow routes are supported;
* four Vapi routes are supported;
* two Cal.com routes are supported;
* users never manually choose a technical agent;
* users never manually choose a service-area code;
* assistant choice remains independent from location;
* changing location affects future interactions;
* changing location does not rewrite historical conversations;
* old conversations preserve their original service area;
* invalid provider combinations never silently fall back;
* Geral never silently routes to Maxixe/Massinga services;
* server-side integrations resolve provider configuration from semantic application state;
* maps have an accessible list alternative;
* precise GPS is not required;
* persisted geographic state is validated;
* routing failures are handled safely.

---

# 89. Authoritative Routing Model

```text
                         USER LOCATION
                               │
                               ▼
                     ┌───────────────────┐
                     │    INHAMBANE?     │
                     └─────────┬─────────┘
                         YES   │   NO
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
              SELECT DISTRICT           GERAL
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
       MAXIXE    MASSINGA    OTHER
          │         │         │
          ▼         ▼         ▼
       maxixe    massinga    geral
          │         │         │
          └─────────┼─────────┘
                    │
                    ▼
             CHOOSE ASSISTANT
                    │
             ┌──────┴──────┐
             ▼             ▼
          TONITO         MANUELA
             │             │
             └──────┬──────┘
                    │
                    ▼
            RESOLVE SERVICES
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
       TEXT        VOICE       BOOKING
        │           │           │
    Voiceflow      Vapi       Cal.com
```

The governing rule is:

```text
THE USER CHOOSES THEIR LOCATION.

SAAJ RESOLVES THE SERVICE AREA.

THE USER CHOOSES TONITO OR MANUELA.

SAAJ RESOLVES THE CORRECT TECHNICAL SERVICES.

THE USER NEVER NEEDS TO UNDERSTAND
THE ROUTING ARCHITECTURE.
```

```

Next is **`12-user-state-and-persistence.md`**. That one is especially important because we need to be precise about what “return without an account” actually means: the anonymous user ID, onboarding state, location, last assistant, conversation references, Voiceflow session continuity, localStorage vs backend persistence, what survives refresh/browser close, what happens after browser data is cleared, and what we **cannot promise yet** about cross-device conversation history.
```
