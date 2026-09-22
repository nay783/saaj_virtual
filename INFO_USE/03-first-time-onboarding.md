Proceeding with **`03-first-time-onboarding.md`**. This document should lock the entire first-use journey and, importantly, prevent the build agent from turning onboarding into registration or a long questionnaire.

````markdown
# SAAJ Virtual — First-Time Onboarding

## 1. Purpose

This document defines the complete first-time onboarding experience for SAAJ Virtual.

Onboarding has three responsibilities:

1. introduce SAAJ Virtual;
2. determine the user's service location;
3. allow the user to choose whether they want to begin with Tonito or Manuela.

It must not become:

- account registration;
- health screening;
- demographic data collection;
- a tutorial carousel;
- a long questionnaire.

The objective is to move the user from opening SAAJ Virtual to useful support with minimal friction.

---

# 2. Core Journey

The first-time journey is:

```text
WELCOME
   ↓
MOZAMBIQUE MAP
   ↓
SELECT PROVINCE
   ↓
Is province Inhambane?
   │
   ├── YES → INHAMBANE DISTRICT MAP
   │              ↓
   │         SELECT DISTRICT
   │              ↓
   │       RESOLVE SERVICE AREA
   │
   └── NO → SERVICE AREA = GERAL
                  ↓
         CHOOSE ASSISTANT
                  ↓
       TONITO OR MANUELA
                  ↓
      ASSISTANT CONTACT PROFILE
````

The Contact Profile marks the end of onboarding.

---

# 3. Onboarding State

On first application load, determine whether valid onboarding state exists.

Conceptually:

```ts
if (!onboardingCompleted) {
  showOnboarding();
} else {
  goToInicio();
}
```

Do not rely only on whether a random localStorage key exists.

The persisted state should be valid enough to determine at least:

* onboarding completion;
* selected province;
* resolved service area;
* district where required.

---

# 4. No Bottom Navigation During Onboarding

The normal application navigation:

```text
Início | Conversas | Mais
```

should not appear throughout the initial onboarding journey.

This keeps the experience focused and prevents users from entering incomplete application states.

The application navigation becomes available once onboarding is complete.

---

# 5. Step 1 — Welcome

The first screen should introduce SAAJ Virtual simply and confidently.

Suggested structure:

```text
              SAAJ Virtual


        O teu espaço para falar,
       perguntar e receber apoio.


              [ Começar ]
```

Optional supporting line:

```text
Informação e apoio em saúde sexual
e reprodutiva para adolescentes
e jovens.
```

Keep the screen visually minimal.

---

# 6. Welcome Visual Direction

Use the neutral SAAJ visual identity:

* warm/clean white;
* near-black typography;
* pearl glass;
* extremely subtle atmospheric light;
* generous whitespace.

Do not introduce strong Tonito blue or Manuela berry yet.

The user has not selected an assistant.

---

# 7. Welcome Screen Must Not Request Data

Do not ask for:

* name;
* phone number;
* age;
* gender;
* email;
* password;
* health concern.

The first action should simply be:

**Começar**

---

# 8. Step 2 — Location Introduction

After `Começar`, introduce location selection.

Suggested copy:

```text
Onde estás?

Escolhe a tua província para encontrarmos
o apoio disponível na tua zona.
```

Avoid language that sounds like GPS surveillance.

The application is asking the user to select their location manually.

---

# 9. No Automatic Precise Geolocation Requirement

Version 1 should not require GPS or precise browser location permission during onboarding.

The user selects their location manually.

Advantages include:

* greater privacy;
* fewer permission prompts;
* predictable routing;
* lower onboarding friction.

Precise geolocation should not be requested unless a future feature establishes a clear need.

---

# 10. Mozambique Map

Display a clean interactive SVG map of Mozambique divided by province.

The map should be:

* responsive;
* touch-friendly;
* visually clean;
* geographically recognisable;
* usable on small mobile screens.

Do not use a low-resolution raster map as the production implementation.

---

# 11. Province Selection

Each province should be selectable.

The interaction should provide clear feedback.

Example:

```text
User taps province
       ↓
Province becomes visually selected
       ↓
Province name is confirmed
       ↓
Continue routing
```

Selection may be confirmed immediately or through a short contextual transition.

Avoid unnecessary extra confirmation screens.

---

# 12. Province Selection Motion

Suggested motion:

```text
Tap province
      ↓
Selected province gently lifts/emphasises
      ↓
Other provinces soften slightly
      ↓
Selected region recentres where appropriate
      ↓
Next step appears
```

Motion should remain approximately within 350–550ms and must not delay access unnecessarily.

Respect reduced-motion preferences.

---

# 13. Province Data

The implementation should use a central geographic configuration rather than hard-coding behaviour into map components.

Conceptually:

```ts
type Province = {
  id: string;
  name: string;
};
```

Location labels should use official/approved geographic names.

---

# 14. Inhambane Branch

If:

```ts
province === "Inhambane"
```

the application continues to district selection.

This is required because service capability differs within Inhambane.

Transition:

```text
Mozambique
    ↓
Inhambane selected
    ↓
Map focuses/transitions
    ↓
Inhambane district map
```

---

# 15. Other Provinces Branch

If the selected province is not Inhambane:

```ts
serviceArea = "geral";
```

Do not require district selection during initial onboarding unless later product requirements change.

The journey becomes:

```text
Province
   ↓
serviceArea = geral
   ↓
Choose assistant
```

The selected province must still be retained for appropriate analytics and future service expansion.

---

# 16. Step 3 — Inhambane District Selection

Suggested heading:

```text
Onde estás em Inhambane?

Escolhe o teu distrito.
```

Display a responsive SVG representation of Inhambane with district boundaries.

---

# 17. Inhambane Districts

The district map should support the approved current district list used by the product.

Current working reference includes:

* Mabote
* Govuro
* Inhassoro
* Vilankulo
* Massinga
* Funhalouro
* Morrumbene
* Maxixe
* Inhambane
* Homoíne
* Panda
* Jangamo
* Inharrime
* Zavala

Geographic names and boundaries must be validated against the authoritative geographic source used for production before final release.

Do not manually invent geographic boundaries.

---

# 18. Enhanced Service Locations

Maxixe and Massinga provide enhanced SAAJ Virtual capabilities.

They may receive a subtle visual distinction on the district map.

For example:

```text
● Maxixe
● Massinga
```

The distinction should communicate:

> more services are available here

without making users in other districts feel excluded.

Avoid prominent user-facing language such as:

* pilot district;
* unsupported district;
* limited district.

---

# 19. District Routing

Routing rules:

```ts
if (province === "Inhambane" && district === "Maxixe") {
  serviceArea = "maxixe";
}

if (province === "Inhambane" && district === "Massinga") {
  serviceArea = "massinga";
}

if (
  province === "Inhambane" &&
  district !== "Maxixe" &&
  district !== "Massinga"
) {
  serviceArea = "geral";
}
```

Actual location and logical service area remain separate values.

Example:

```ts
{
  province: "Inhambane",
  district: "Vilankulo",
  serviceArea: "geral"
}
```

---

# 20. Location State

After location resolution, the application should have a state conceptually similar to:

```ts
{
  province: "Inhambane",
  district: "Maxixe",
  serviceArea: "maxixe"
}
```

or:

```ts
{
  province: "Maputo Cidade",
  district: null,
  serviceArea: "geral"
}
```

The exact technical implementation is defined in the persistence/routing specifications.

---

# 21. Step 4 — Assistant Selection

Once service area has been resolved, present Tonito and Manuela.

Suggested heading:

```text
Com quem preferes começar?
```

Supporting copy may be:

```text
Podes falar com os dois quando quiseres.
```

This sentence is useful because it immediately communicates that the choice is not permanent.

---

# 22. Assistant Selection Layout

Both assistants must receive equal visual importance.

Example:

```text
Com quem preferes começar?

Podes falar com os dois quando quiseres.


╭──────────────────╮  ╭──────────────────╮
│                  │  │                  │
│     [Tonito]     │  │    [Manuela]     │
│                  │  │                  │
│      Tonito      │  │     Manuela      │
│                  │  │                  │
╰──────────────────╯  ╰──────────────────╯
```

On narrower devices, cards may stack vertically if necessary.

Neither assistant should visually appear to be the recommended/default choice.

---

# 23. Assistant Selection Visual State

Before selection:

* neutral page background;
* Tonito card receives subtle blue atmosphere;
* Manuela card receives subtle blush atmosphere.

On Tonito selection:

```text
Tonito card emphasises
↓
Blue atmospheric glow increases subtly
↓
Transition to Tonito Contact Profile
```

On Manuela selection:

```text
Manuela card emphasises
↓
Berry/blush atmospheric glow increases subtly
↓
Transition to Manuela Contact Profile
```

---

# 24. Assistant Selection Is Not Registration

Do not create wording such as:

* Your assistant
* Assigned assistant
* Account assistant
* Permanent assistant

The selection means:

> Who would you like to start with?

The user can access the other assistant later.

---

# 25. Step 5 — Contact Profile

Selecting an assistant does **not** immediately open chat.

This is a locked product decision.

It opens that assistant's Contact Profile.

This is referred to as the **Option C onboarding behaviour**.

Example:

```text
Select Manuela
      ↓

        [Large portrait]

           Manuela
        SAAJ Virtual

         ● Disponível


     Mensagem       Ligar

       Marcar encontro


       Conversa privada
```

Exact Contact Profile design is defined in its dedicated specification.

---

# 26. Why Contact Profile Comes First

The assistant selection answers:

> Who do I want to approach?

It does not necessarily answer:

> Which communication channel do I want?

For Maxixe and Massinga, users can choose:

* text;
* voice;
* appointment.

The Contact Profile provides that choice without adding another abstract onboarding question.

---

# 27. Contact Profile — Maxixe

For:

```ts
serviceArea === "maxixe"
```

show:

* `Mensagem`
* `Ligar`
* `Marcar encontro`

Routing:

```text
Mensagem
   ↓
Tonito/Manuela Maxixe Voiceflow

Ligar
   ↓
Tonito/Manuela Maxixe Vapi

Marcar encontro
   ↓
Maxixe Cal.com scheduling
```

---

# 28. Contact Profile — Massinga

For:

```ts
serviceArea === "massinga"
```

show:

* `Mensagem`
* `Ligar`
* `Marcar encontro`

Routing:

```text
Mensagem
   ↓
Tonito/Manuela Massinga Voiceflow

Ligar
   ↓
Tonito/Manuela Massinga Vapi

Marcar encontro
   ↓
Massinga Cal.com scheduling
```

---

# 29. Contact Profile — Geral

For:

```ts
serviceArea === "geral"
```

show:

* `Mensagem`

Do not show Call or Appointment as though they are currently available.

Concept:

```text
        [Portrait]

          Tonito
       SAAJ Virtual

       ● Disponível


       [ Mensagem ]


     Conversa privada
```

---

# 30. Completing Onboarding

Onboarding should be considered complete once:

* valid location has been resolved;
* assistant selection has occurred;
* the user has entered the selected assistant Contact Profile.

Persist:

```ts
{
  onboardingCompleted: true,
  province,
  district,
  serviceArea,
  lastAssistant: selectedAssistant
}
```

Do not require the user to actually send a message before onboarding can be completed.

---

# 31. Normal Navigation Becomes Available

After onboarding completion, the normal application architecture becomes available:

```text
Início | Conversas | Mais
```

However, the Contact Profile should remain visually focused.

The exact handling of the bottom navigation on immersive screens is defined in the relevant screen specification.

---

# 32. First Message Behaviour

If the user chooses:

`Mensagem`

from the first Contact Profile and has never spoken with that assistant in the current service context:

```text
Create new conversation
       ↓
Create fresh Voiceflow session
       ↓
Open Chat
```

Do not send the user through:

```text
Contact Profile
→ Conversas
→ Empty State
→ +
→ Choose same assistant again
→ Chat
```

That would add unnecessary friction.

---

# 33. First Call Behaviour

If the user chooses:

`Ligar`

from Maxixe or Massinga:

```text
Contact Profile
       ↓
Call initiation state
       ↓
Vapi assistant
       ↓
Active call interface
```

Do not require a text conversation first.

---

# 34. First Appointment Behaviour

If the user chooses:

`Marcar encontro`

from Maxixe or Massinga:

```text
Contact Profile
       ↓
SAAJ appointment screen
       ↓
Correct Cal.com embed
```

Use the service area's scheduler automatically.

The user must never be asked:

```text
Maxixe or Massinga?
```

again after location has already established the answer.

---

# 35. Back Navigation

Users should be able to move backward during onboarding without losing already selected state unnecessarily.

Example:

```text
Assistant Selection
      ↓ back
District Selection
```

The previously selected district may remain highlighted.

Similarly:

```text
District Selection
      ↓ back
Province Selection
```

The selected province may remain highlighted.

---

# 36. Changing Province During Onboarding

If the user goes back and selects another province, dependent state must be recalculated.

Example:

```text
Inhambane
district = Maxixe
serviceArea = maxixe

        ↓ user goes back

Maputo Cidade

        ↓

district = null
serviceArea = geral
```

Do not leave stale `Maxixe` routing in application state.

---

# 37. Reload During Onboarding

If the page reloads before onboarding completion, implementation may preserve temporary progress where practical.

However, incomplete onboarding state must not accidentally be interpreted as completed onboarding.

Only a valid completed state should send the user directly to Início on future launches.

---

# 38. Returning User

Once:

```ts
onboardingCompleted === true
```

normal launch becomes:

```text
Open SAAJ
   ↓
Read local state
   ↓
Validate
   ↓
Início
```

Do not display:

* Welcome;
* Mozambique map;
* district selection;
* initial assistant choice

again unless:

* local state has been cleared;
* local state is invalid;
* user deliberately restarts/changes relevant setup.

---

# 39. Changing Location Later

The Mozambique map remains accessible later through the location controls defined under `Mais`.

Changing location is **not the same as onboarding again**.

It should reuse the geographic selection interface without replaying:

* Welcome;
* initial explanation;
* first assistant selection.

Detailed behaviour belongs to the `Mais` and location-routing specifications.

---

# 40. Conversation History After Location Change

Changing location later must not automatically delete old conversations.

Example:

```text
Previous:
Maxixe
Manuela conversation A

Current:
Maputo
serviceArea = geral

Conversation A remains in history.
```

New conversations use the new location/service area.

Historical conversations preserve their original session context.

---

# 41. No Health Questions During Onboarding

The onboarding flow must not ask:

```text
Why are you here?
Are you sexually active?
Are you pregnant?
What health problem do you have?
What is your age?
```

unless a later approved product requirement explicitly changes this.

Health context belongs inside the appropriate conversational/service experience.

---

# 42. No Forced Personal Details

Do not request:

* name;
* phone;
* email;
* national ID;
* date of birth;
* gender;

as a prerequisite for entering SAAJ Virtual.

Data required for a specific downstream service should be collected just in time.

---

# 43. Privacy Communication

The onboarding experience should communicate privacy without overwhelming the user with legal language.

A discreet signal may appear where appropriate:

```text
[lock icon] Privado e confidencial
```

Detailed privacy information remains accessible separately.

Do not force the user through multiple pages of privacy copy before allowing access unless legally required.

---

# 44. Connectivity Failure

If location assets or the next screen fail to load, provide a human-readable recovery state.

Example:

```text
Não conseguimos carregar esta etapa.

Verifica a tua ligação e tenta novamente.

[ Tentar novamente ]
```

Avoid leaving the user on a blank map.

---

# 45. Map Accessibility

The SVG map cannot be the only method of location selection.

Provide an accessible alternative such as:

```text
Escolher da lista
```

This is important for:

* screen-reader users;
* motor accessibility;
* very small screens;
* map interaction difficulties.

The list and map must update the same location state.

---

# 46. Province List Alternative

The province selection screen may provide:

```text
[ Mozambique Map ]

Escolher da lista ↓
```

Opening a bottom sheet/list with province names.

Selecting from the list behaves exactly like selecting from the map.

---

# 47. District List Alternative

The same pattern applies to Inhambane districts.

```text
[ Inhambane Map ]

Escolher da lista ↓
```

This should not be treated as a secondary/inferior experience.

---

# 48. Mobile Behaviour

Mobile is the primary onboarding target.

Priorities:

* one clear task per screen;
* thumb-friendly selection;
* large assistant portraits;
* readable maps;
* clear CTA;
* minimal scrolling.

Avoid attempting to show the entire onboarding process on one screen.

---

# 49. Desktop Behaviour

Desktop may use more space but should preserve the same sequence.

For example:

```text
┌────────────────────────────────────────────┐
│                                            │
│  Where are you?        [Mozambique Map]    │
│                                            │
│  Supporting text                           │
│                                            │
└────────────────────────────────────────────┘
```

Do not expose future steps simply because desktop has more space.

Progressive disclosure remains intact.

---

# 50. Onboarding Motion Sequence

The journey should feel continuous rather than like unrelated forms.

Conceptually:

```text
Welcome
   ↓ fade/translate

Mozambique
   ↓ map focus

Inhambane
   ↓ geographic transition

Assistant Selection
   ↓ portrait/shared-element emphasis

Contact Profile
```

Transitions should reinforce the feeling of moving progressively closer to the appropriate support.

---

# 51. No Conventional Progress Bar Required

Avoid:

```text
Step 1 of 5
████░░░░
```

unless usability testing later indicates a need.

The onboarding is short enough to feel conversational rather than administrative.

---

# 52. Analytics Events

Onboarding should support privacy-conscious event measurement.

Potential events:

```text
onboarding_started
province_selected
district_selected
service_area_resolved
assistant_selected
onboarding_completed
```

Do not include sensitive health information in these events.

Potential properties:

```ts
{
  province: "Inhambane",
  district: "Maxixe",
  serviceArea: "maxixe",
  assistant: "manuela"
}
```

Final analytics definitions belong in the analytics specification.

---

# 53. Required States

The onboarding implementation must support at minimum:

```text
Welcome
Province selection
Province selected
Inhambane district selection
District selected
Assistant selection
Tonito selected
Manuela selected
Contact Profile transition
Loading
Connectivity error
Invalid saved state
```

---

# 54. Core Acceptance Behaviour

The onboarding implementation is correct when:

* a new user sees Welcome;
* no registration is requested;
* `Começar` opens location selection;
* Mozambique provinces can be selected;
* province selection is possible without relying solely on the map;
* Inhambane opens district selection;
* Maxixe resolves to `maxixe`;
* Massinga resolves to `massinga`;
* another Inhambane district resolves to `geral`;
* another province resolves to `geral`;
* the user can select Tonito or Manuela;
* neither assistant appears mandatory or permanent;
* assistant selection opens the Contact Profile;
* Maxixe/Massinga Contact Profiles expose Message, Call and Appointment;
* Geral exposes Message without falsely advertising unavailable services;
* onboarding completion is persisted;
* returning users skip onboarding;
* changing selections correctly clears stale dependent state;
* no unnecessary personal or health data is collected.

---

# 55. Final First-Time Journey

The intended experience can be summarised as:

```text
FIRST OPEN
    │
    ▼
SAAJ VIRTUAL
"Começar"
    │
    ▼
ONDE ESTÁS?
[Mozambique SVG]
    │
    ├── Other province
    │       │
    │       └── Geral
    │
    └── Inhambane
            │
            ▼
      [District SVG]
            │
       ┌────┼─────────────┐
       │    │             │
    Maxixe Massinga   Other district
       │    │             │
       ▼    ▼             ▼
    Maxixe Massinga      Geral
       └────┬─────────────┘
            │
            ▼
COM QUEM PREFERES COMEÇAR?

   [Tonito]     [Manuela]

            │
            ▼
ASSISTANT CONTACT PROFILE
            │
      ┌─────┼─────────┐
      │     │         │
  Mensagem Ligar  Marcar encontro
      │     │         │
 Voiceflow Vapi    Cal.com

Call + Appointment:
Maxixe / Massinga only
```

This is the complete onboarding model for Version 1.

```

The next specification is **`04-inicio.md`**. That's an important one because we'll lock exactly what a returning user sees when they reopen SAAJ: assistant cards, last conversation, recent conversations, Maxixe/Massinga appointment access, what happens when Tonito/Manuela are tapped, and what must **not** creep onto Home.
```
