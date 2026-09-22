# SAAJ Virtual — Voiceflow Embedded Chat Configuration

## 1. Purpose

This document is the authoritative reference for integrating the existing Voiceflow assistants into SAAJ Virtual.

SAAJ Virtual uses six Voiceflow chatbot experiences:

| Assistant | Service Area | Experience |
|---|---|---|
| Tonito | Maxixe | Tonito — Maxixe |
| Tonito | Massinga | Tonito — Massinga |
| Tonito | Geral | Tonito — Geral |
| Manuela | Maxixe | Manuela — Maxixe |
| Manuela | Massinga | Manuela — Massinga |
| Manuela | Geral | Manuela — Geral |

These are existing Voiceflow projects.

They must be used as the actual text-chat experiences inside SAAJ Virtual.

The application must not replace them with simulated assistant responses or a separate chatbot engine.

---

# 2. Integration Architecture

The intended architecture is:

```text
SAAJ Virtual
      │
      ├── Location routing
      │
      ├── Assistant selection
      │
      ▼
assistant + serviceArea
      │
      ▼
Voiceflow Project Resolver
      │
      ▼
Voiceflow Embedded Widget
      │
      ▼
Real Voiceflow Conversation
```

SAAJ owns the surrounding product experience.

Voiceflow owns the actual chatbot conversation.

---

# 3. Responsibility Boundary

## SAAJ Virtual owns

SAAJ controls:

- onboarding;
- province selection;
- district selection;
- service-area resolution;
- assistant selection;
- application navigation;
- assistant Contact Profile;
- chat-page shell;
- Back navigation;
- Quick Exit;
- capability routing;
- responsive layout;
- application state;
- appointment routing;
- Vapi call routing.

## Voiceflow owns

Voiceflow controls:

- chatbot messages;
- chatbot responses;
- conversational logic;
- knowledge-base retrieval;
- conversational health guidance;
- follow-up questions;
- approved data collection;
- conversational risk/referral logic;
- chatbot composer;
- chatbot speech-input functionality where supported;
- interaction behaviour inside the embedded chatbot.

The SAAJ frontend must not simulate a second conversation on top of Voiceflow.

---

# 4. Embedded Mode

All six Voiceflow experiences must be rendered using Voiceflow's embedded mode.

The intended configuration pattern is:

```js
window.voiceflow.chat.load({
  verify: {
    projectID: resolvedProjectId
  },
  url: "https://general-runtime.voiceflow.com",
  versionID: "production",
  voice: {
    url: "https://runtime-api.voiceflow.com"
  },
  render: {
    mode: "embedded",
    target: targetElement
  }
});
```

The chatbot must appear inside the SAAJ chat page.

Do not use the default floating Voiceflow launcher as the primary chat experience.

---

# 5. Voiceflow Widget SDK

The current Voiceflow widget SDK supplied by Voiceflow is:

```text
https://cdn.voiceflow.com/widget-next/bundle.mjs
```

The SDK should be loaded once and reused.

Do not inject a separate SDK script for every assistant.

---

# 6. Environment Configuration

All Voiceflow project IDs are already configured in:

```text
INFO_USE/.env.local
```

The application must use the existing environment configuration.

Do not duplicate the IDs unnecessarily throughout the application.

Do not overwrite `.env.local`.

Do not print private environment-variable values into:

- logs;
- terminal summaries;
- generated documentation;
- source code;
- screenshots;
- client debugging output.

The Voiceflow project identifier required by the public embedded widget is configuration information and is distinct from private Voiceflow API credentials.

Private credentials such as a Voiceflow access token must remain server-side.

---

# 7. Confirmed Voiceflow Project Matrix

The following IDs are recorded here as the verified reference for the existing Voiceflow projects.

The implementation should nevertheless use the corresponding configuration already present in `.env.local`.

## Tonito

### Maxixe

```text
Project ID:
6a02ea7a8532999d6114892c
```

### Massinga

```text
Project ID:
6a02ea85171482ed6438ff05
```

### Geral

```text
Project ID:
6a02ea6ebc1ce2a5e7d48b4b
```

---

## Manuela

### Maxixe

```text
Project ID:
6ab065f92ea3e7c2c7b0f21a
```

### Massinga

```text
Project ID:
6ab066032ea3e7c2c7b0f220
```

### Geral

```text
Project ID:
6ab0660c2ea3e7c2c7b0f226
```

---

# 8. Complete Routing Matrix

| Assistant | Service Area | Voiceflow Project ID |
|---|---|---|
| Tonito | Maxixe | `6a02ea7a8532999d6114892c` |
| Tonito | Massinga | `6a02ea85171482ed6438ff05` |
| Tonito | Geral | `6a02ea6ebc1ce2a5e7d48b4b` |
| Manuela | Maxixe | `6ab065f92ea3e7c2c7b0f21a` |
| Manuela | Massinga | `6ab066032ea3e7c2c7b0f220` |
| Manuela | Geral | `6ab0660c2ea3e7c2c7b0f226` |

The user must never manually choose a Voiceflow project.

SAAJ resolves it automatically.

---

# 9. Service-Area Routing

The Voiceflow project is selected only after SAAJ resolves the user's service area.

The approved routing remains:

```ts
function resolveServiceArea(
  province: string,
  district?: string | null
): "maxixe" | "massinga" | "geral" {
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

Therefore:

```text
LOCATION
   ↓
SERVICE AREA
   ↓
ASSISTANT
   ↓
VOICEFLOW PROJECT
```

---

# 10. Example Routing

## Example 1 — Tonito in Maxixe

```text
Province:
Inhambane

District:
Maxixe

Service Area:
maxixe

Assistant:
Tonito

Voiceflow:
Tonito Maxixe
```

Project reference:

```text
6a02ea7a8532999d6114892c
```

---

## Example 2 — Tonito in Massinga

```text
Province:
Inhambane

District:
Massinga

Service Area:
massinga

Assistant:
Tonito

Voiceflow:
Tonito Massinga
```

Project reference:

```text
6a02ea85171482ed6438ff05
```

---

## Example 3 — Tonito outside supported districts

Example:

```text
Province:
Maputo Cidade

Service Area:
geral

Assistant:
Tonito

Voiceflow:
Tonito Geral
```

Project reference:

```text
6a02ea6ebc1ce2a5e7d48b4b
```

---

## Example 4 — Manuela in Maxixe

```text
Province:
Inhambane

District:
Maxixe

Service Area:
maxixe

Assistant:
Manuela

Voiceflow:
Manuela Maxixe
```

Project reference:

```text
6ab065f92ea3e7c2c7b0f21a
```

---

## Example 5 — Manuela in Massinga

```text
Province:
Inhambane

District:
Massinga

Service Area:
massinga

Assistant:
Manuela

Voiceflow:
Manuela Massinga
```

Project reference:

```text
6ab066032ea3e7c2c7b0f220
```

---

## Example 6 — Manuela outside supported districts

```text
Service Area:
geral

Assistant:
Manuela

Voiceflow:
Manuela Geral
```

Project reference:

```text
6ab0660c2ea3e7c2c7b0f226
```

---

# 11. Original Tonito — Maxixe Embed

Reference snippet supplied for the existing Voiceflow project:

```html
<script type="text/javascript">
  (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];

      v.onload = function() {
        window.voiceflow.chat.load({
          verify: {
            projectID: '6a02ea7a8532999d6114892c'
          },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: {
            url: "https://runtime-api.voiceflow.com"
          }
        });
      }

      v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      v.type = "text/javascript";

      s.parentNode.insertBefore(v, s);

  })(document, 'script');
</script>
```

For SAAJ Virtual this project must be rendered in embedded mode rather than as the default floating widget.

---

# 12. Tonito — Maxixe Embedded Form

Conceptually:

```js
window.voiceflow.chat.load({
  verify: {
    projectID: "6a02ea7a8532999d6114892c"
  },

  url: "https://general-runtime.voiceflow.com",

  versionID: "production",

  voice: {
    url: "https://runtime-api.voiceflow.com"
  },

  render: {
    mode: "embedded",
    target: targetElement
  }
});
```

---

# 13. Tonito — Massinga Embed

Confirmed supplied configuration:

```html
<script type="text/javascript">
  (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];

      v.onload = function() {
        window.voiceflow.chat.load({
          verify: {
            projectID: '6a02ea85171482ed6438ff05'
          },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: {
            url: "https://runtime-api.voiceflow.com"
          },
          render: {
            mode: 'embedded',
            target: document.getElementById(...)
          }
        });
      }

      v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      v.type = "text/javascript";

      s.parentNode.insertBefore(v, s);

  })(document, 'script');
</script>
```

---

# 14. Tonito — Geral Embed

Reference configuration:

```html
<script type="text/javascript">
  (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];

      v.onload = function() {
        window.voiceflow.chat.load({
          verify: {
            projectID: '6a02ea6ebc1ce2a5e7d48b4b'
          },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: {
            url: "https://runtime-api.voiceflow.com"
          }
        });
      }

      v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      v.type = "text/javascript";

      s.parentNode.insertBefore(v, s);

  })(document, 'script');
</script>
```

For SAAJ Virtual this must be rendered in embedded mode.

---

# 15. Manuela — Maxixe Embed

Reference configuration:

```html
<script type="text/javascript">
  (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];

      v.onload = function() {
        window.voiceflow.chat.load({
          verify: {
            projectID: '6ab065f92ea3e7c2c7b0f21a'
          },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: {
            url: "https://runtime-api.voiceflow.com"
          },
          render: {
            mode: 'embedded',
            target: document.getElementById(...)
          }
        });
      }

      v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      v.type = "text/javascript";

      s.parentNode.insertBefore(v, s);

  })(document, 'script');
</script>
```

---

# 16. Manuela — Massinga Embed

Reference configuration:

```html
<script type="text/javascript">
  (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];

      v.onload = function() {
        window.voiceflow.chat.load({
          verify: {
            projectID: '6ab066032ea3e7c2c7b0f220'
          },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: {
            url: "https://runtime-api.voiceflow.com"
          },
          render: {
            mode: 'embedded',
            target: document.getElementById(...)
          }
        });
      }

      v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      v.type = "text/javascript";

      s.parentNode.insertBefore(v, s);

  })(document, 'script');
</script>
```

---

# 17. Manuela — Geral Embed

Reference configuration:

```html
<script type="text/javascript">
  (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];

      v.onload = function() {
        window.voiceflow.chat.load({
          verify: {
            projectID: '6ab0660c2ea3e7c2c7b0f226'
          },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: {
            url: "https://runtime-api.voiceflow.com"
          },
          render: {
            mode: 'embedded',
            target: document.getElementById(...)
          }
        });
      }

      v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      v.type = "text/javascript";

      s.parentNode.insertBefore(v, s);

  })(document, 'script');
</script>
```

---

# 18. Important Note About the Reference Snippets

The supplied snippets are configuration references.

They must not be copied six times directly into the React/Next.js application.

The production implementation should create a reusable Voiceflow integration.

Conceptually:

```tsx
<VoiceflowEmbeddedChat
  assistant="tonito"
  serviceArea="maxixe"
/>
```

The component resolves the appropriate project configuration.

---

# 19. Recommended Typed Model

Conceptually:

```ts
type Assistant =
  | "tonito"
  | "manuela";

type ServiceArea =
  | "maxixe"
  | "massinga"
  | "geral";
```

A central resolver should provide the appropriate project configuration.

Conceptually:

```ts
resolveVoiceflowProject(
  assistant,
  serviceArea
);
```

---

# 20. Configuration Pattern

Conceptually:

```ts
const voiceflowProjects = {
  tonito: {
    maxixe: /* environment configuration */,
    massinga: /* environment configuration */,
    geral: /* environment configuration */
  },

  manuela: {
    maxixe: /* environment configuration */,
    massinga: /* environment configuration */,
    geral: /* environment configuration */
  }
};
```

Do not hardcode the project IDs throughout page components.

---

# 21. Environment Variables

The actual environment-variable names must be taken from the existing `.env.local`.

Do not rename working environment variables merely to match this document.

If new names are required in the future, the conceptual naming pattern is:

```bash
VOICEFLOW_TONITO_MAXIXE_PROJECT_ID=
VOICEFLOW_TONITO_MASSINGA_PROJECT_ID=
VOICEFLOW_TONITO_GERAL_PROJECT_ID=

VOICEFLOW_MANUELA_MAXIXE_PROJECT_ID=
VOICEFLOW_MANUELA_MASSINGA_PROJECT_ID=
VOICEFLOW_MANUELA_GERAL_PROJECT_ID=
```

These lines are examples of naming only.

Do not overwrite existing values.

---

# 22. Public Embed Configuration vs Private Credentials

The Voiceflow embedded widget requires a project identifier in browser-side configuration.

This is distinct from private API credentials.

Never expose:

```text
VOICEFLOW_ACCESS_TOKEN
```

or equivalent private API credentials to the browser.

Only expose configuration required for the public Voiceflow embed.

---

# 23. React / Next.js Integration

Do not leave:

```js
document.getElementById(...)
```

with `...` in production code.

Prefer a React-safe target.

Conceptually:

```tsx
const containerRef =
  useRef<HTMLDivElement>(null);
```

Then use the real container element when loading the embed, if supported by the current Voiceflow widget API.

Example structure:

```tsx
<div
  ref={containerRef}
  className="voiceflow-chat-container"
/>
```

---

# 24. SDK Lifecycle

The Voiceflow SDK should:

1. load on the client;
2. load only once where possible;
3. provide a loading state;
4. provide an error state;
5. avoid duplicate script injection;
6. avoid duplicate widget instances;
7. correctly switch projects;
8. clean up previous embedded experiences where supported.

The implementation must verify the current Voiceflow widget lifecycle API before relying on a destroy/reset method.

Do not invent unsupported Voiceflow methods.

---

# 25. Chat Page Structure

The intended page structure is:

```text
┌─────────────────────────────────┐
│ ←  Tonito ●       Saída Rápida │
│    SAAJ • MAXIXE                 │
├─────────────────────────────────┤
│                                 │
│                                 │
│     VOICEFLOW EMBEDDED CHAT     │
│                                 │
│                                 │
│                                 │
│     Voiceflow composer          │
└─────────────────────────────────┘
```

For Manuela:

```text
┌─────────────────────────────────┐
│ ←  Manuela ●      Saída Rápida │
│    SAAJ • MASSINGA              │
├─────────────────────────────────┤
│                                 │
│     VOICEFLOW EMBEDDED CHAT     │
│                                 │
└─────────────────────────────────┘
```

The exact visual styling follows the SAAJ design system.

---

# 26. Do Not Duplicate the Conversation UI

When the embedded Voiceflow widget is active, do not also render a second custom SAAJ:

- message list;
- assistant greeting;
- composer;
- microphone;
- send button;
- typing simulation.

There must be one active chatbot conversation interface.

That interface is the real Voiceflow embed.

---

# 27. SAAJ Header

SAAJ may continue to own the outer chat header.

It should contain the approved elements such as:

```text
Back
Assistant portrait/avatar
Assistant name
SAAJ/location context
Quick Exit
```

Avoid duplicating information already rendered prominently by Voiceflow where this creates visual clutter.

---

# 28. Voiceflow Styling

Where the current Voiceflow widget officially supports visual customisation, adapt it to the SAAJ design system.

Shared visual direction:

- light;
- clean;
- premium;
- calm;
- mobile-first;
- readable;
- youth-friendly.

Tonito context:

- subtle blue.

Manuela context:

- subtle blush/berry.

Do not rely on fragile undocumented DOM manipulation to force styling inside Voiceflow.

---

# 29. Mobile-First Requirement

The embedded chatbot must be implemented mobile first.

Primary reference widths:

```text
320px
360px
390px
430px
```

The embedded conversation should use the available chat viewport.

Do not render a tiny desktop chatbot inside the phone interface.

---

# 30. Full-Height Chat

The SAAJ chat route should behave like a mobile messaging screen.

Conceptually:

```css
.chat-page {
  min-height: 100dvh;
  height: 100dvh;

  display: flex;
  flex-direction: column;
}

.voiceflow-chat-container {
  flex: 1;
  min-height: 0;
  width: 100%;
}
```

The actual implementation should follow the project's styling system.

---

# 31. Desktop Behaviour

Desktop is a responsive enhancement of the mobile chat.

Do not stretch individual messages across a full desktop monitor.

Use an appropriate constrained conversation surface.

The exact maximum width should follow:

```text
02-design-system.md
16-responsive-behaviour-and-motion.md
```

---

# 32. Voiceflow Speech Input vs Vapi Calls

These are different capabilities.

## Voiceflow speech input

The supplied Voiceflow configuration includes:

```js
voice: {
  url: "https://runtime-api.voiceflow.com"
}
```

This supports Voiceflow's conversation-level voice functionality where available.

It belongs to the text/chat experience.

## Vapi

Vapi powers the separate:

```text
Ligar
```

experience.

Do not confuse the two.

Conceptually:

```text
Voiceflow microphone
→ speech within chatbot

Vapi
→ dedicated assistant voice call
```

---

# 33. Appointment Routing

Voiceflow may present appointment-related conversational actions.

However, SAAJ's capability rules remain authoritative.

```text
Maxixe
→ appointment supported

Massinga
→ appointment supported

Geral
→ appointment unavailable
```

The final appointment destination must follow SAAJ service-area routing.

Do not create a Geral appointment fallback.

---

# 34. Assistant Switching

When the user changes from one assistant to another:

```text
Tonito
→ Manuela
```

the old Voiceflow experience must not continue responding invisibly.

The application should safely transition to the appropriate Voiceflow project.

Only one active embedded chatbot should exist in the current chat surface.

---

# 35. Service-Area Switching

New conversations should use the user's current validated service area.

Existing conversation behaviour must continue to follow the persistence rules defined in:

```text
12-user-state-and-persistence.md
```

Changing location must not silently rewrite the historical service context of an existing conversation.

---

# 36. Loading State

While the Voiceflow SDK/project is loading, SAAJ should show a lightweight loading state.

Do not fabricate chatbot messages while waiting.

Reserve sufficient layout space to avoid large layout shifts.

---

# 37. Error State

If Voiceflow cannot load, show a SAAJ error state.

Example:

```text
Não foi possível carregar a conversa.

[Tentar novamente]
```

Keep:

- Back;
- Quick Exit.

Do not display raw provider errors to the user.

Do not substitute fabricated health guidance.

---

# 38. Quick Exit

Quick Exit remains controlled by SAAJ.

It must remain available on the chat screen regardless of which Voiceflow project is embedded.

Voiceflow must not obscure or remove this control.

Follow:

```text
15-privacy-safety-and-security.md
```

for exact behaviour.

---

# 39. Bottom Navigation

The main SAAJ bottom navigation should remain hidden during the active chat experience as defined in the product specification.

The embedded Voiceflow composer occupies the bottom interaction area of the conversation.

---

# 40. Conversation History

Voiceflow conversation state and the SAAJ `Conversas` product model are not automatically the same thing.

The application must not assume that embedding the widget alone solves all conversation-history requirements.

Conversation/session continuity must still follow:

```text
05-conversas-dashboard.md
06-chat-experience.md
12-user-state-and-persistence.md
```

If Voiceflow's embedded widget has lifecycle/session limitations that conflict with the approved history model, document the limitation before silently changing product behaviour.

---

# 41. Security

Do not expose private Voiceflow credentials.

Do not put health conversation content into URLs.

Do not send raw conversation text to generic analytics.

Do not log full Voiceflow conversations in production console output.

Do not use the project ID as a substitute for authentication.

---

# 42. Production Validation Matrix

Before considering Voiceflow integration complete, verify all six combinations.

## Tonito

```text
[ ] Maxixe
[ ] Massinga
[ ] Geral
```

## Manuela

```text
[ ] Maxixe
[ ] Massinga
[ ] Geral
```

For each verify:

```text
[ ] Correct project resolves
[ ] Correct Voiceflow experience appears
[ ] Embedded mode is active
[ ] No floating launcher appears
[ ] Real Voiceflow messages are used
[ ] Voiceflow composer works
[ ] No duplicate composer exists
[ ] No fake assistant messages exist
[ ] Mobile layout works
[ ] Quick Exit remains available
[ ] Error state works
```

---

# 43. Final Integration Model

```text
                         SAAJ VIRTUAL
                              │
                       USER LOCATION
                              │
                              ▼
                       SERVICE AREA
                              │
                    ┌─────────┴─────────┐
                    │                   │
                  TONITO              MANUELA
                    │                   │
                    └─────────┬─────────┘
                              │
                              ▼
                   VOICEFLOW RESOLVER
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
        MAXIXE              MASSINGA             GERAL
          │                   │                   │
          ▼                   ▼                   ▼
      VOICEFLOW           VOICEFLOW           VOICEFLOW
       PROJECT             PROJECT             PROJECT
          │                   │                   │
          └───────────────────┼───────────────────┘
                              │
                              ▼
                    EMBEDDED CHAT WIDGET
                              │
                              ▼
                       SAAJ CHAT PAGE
```

---

# 44. Core Rule

The chatbot displayed inside SAAJ Virtual must be the actual configured Voiceflow experience.

Do not build:

```text
SAAJ fake chatbot
+
Voiceflow backend
```

when the approved implementation is using the Voiceflow embedded experience.

Build:

```text
SAAJ PRODUCT SHELL
+
REAL VOICEFLOW EMBED
```

The user should experience one coherent SAAJ Virtual application while the actual conversational experience is powered by the correct Voiceflow project behind the interface.