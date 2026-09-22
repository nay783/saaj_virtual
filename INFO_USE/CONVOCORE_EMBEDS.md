Yes. Replace the **entire current `CONVOCORE_EMBEDS.md`** with the version below. This incorporates the six authoritative embeds, the final SAAJ architecture, responsive behaviour for mobile/tablet/desktop, the Manuela Maxixe fix requirements, lifecycle handling, the simplified `Conversas` architecture, and the final **Mensagem/Ligar** capability model. It also corrects the older document's references to direct `Marcar`, which are now obsolete. 

````markdown
# SAAJ Virtual — ConvoCore Integration & Embeds

## 1. Purpose

This document is the authoritative technical reference for the ConvoCore
integration used by SAAJ Virtual.

If another project document conflicts with this document regarding the
user-facing messaging implementation, this document takes precedence for
ConvoCore integration.

ConvoCore replaces the previous custom SAAJ / direct Voiceflow chat interface.

The final responsibility model is:

```text
SAAJ Virtual
→ application shell
→ onboarding
→ location
→ service-area resolution
→ assistant selection
→ assistant profiles
→ navigation
→ safety controls

ConvoCore
→ messaging interface
→ conversation history
→ conversation navigation
→ appointment access where configured

Voiceflow
→ conversational intelligence behind ConvoCore

Vapi
→ direct voice conversations
```

The user-facing architecture is:

```text
                     SAAJ VIRTUAL
                          │
              ┌───────────┴───────────┐
              │                       │
           TONITO                  MANUELA
              │                       │
        Contact Profile         Contact Profile
              │                       │
       ┌──────┴──────┐         ┌──────┴──────┐
       │             │         │             │
   Mensagem        Ligar   Mensagem        Ligar
       │             │         │             │
       ▼             ▼         ▼             ▼
   ConvoCore        Vapi    ConvoCore       Vapi
       │                       │
       ▼                       ▼
   Voiceflow               Voiceflow
```

For `geral`, only `Mensagem` is available.

---

# 2. Messaging Ownership

After this migration:

```text
SAAJ does NOT render chat bubbles.

SAAJ does NOT maintain its own user-facing conversation history.

SAAJ does NOT recreate the ConvoCore inbox.

SAAJ does NOT create a second messaging interface around Voiceflow.

SAAJ does NOT maintain a competing transcript UI.

ConvoCore owns the user-facing messaging experience.
```

Voiceflow remains responsible for the conversational intelligence configured
behind each ConvoCore agent.

The correct architecture is:

```text
SAAJ
  ↓
ConvoCore
  ↓
Voiceflow
```

NOT:

```text
SAAJ custom chat
  ↓
ConvoCore
  ↓
Voiceflow
```

There must be only one user-facing chat interface.

---

# 3. Assistants and Service Areas

SAAJ Virtual has two user-facing assistants:

- Tonito
- Manuela

SAAJ has three internal service areas:

```ts
type ServiceArea = "maxixe" | "massinga" | "geral";
```

The two assistants combined with the three service areas produce six
ConvoCore messaging configurations:

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

The user must NEVER manually choose between these six configurations.

SAAJ automatically resolves the correct ConvoCore agent from:

```text
assistant + serviceArea
```

---

# 4. Service-Area Resolution

Preserve the existing SAAJ location logic.

```ts
function resolveServiceArea(
  province: string,
  district?: string | null
): ServiceArea {

  if (province === "Inhambane" && district === "Maxixe") {
    return "maxixe";
  }

  if (province === "Inhambane" && district === "Massinga") {
    return "massinga";
  }

  return "geral";
}
```

Therefore:

```text
Inhambane + Maxixe
→ maxixe

Inhambane + Massinga
→ massinga

All other locations
→ geral
```

ConvoCore consumes this resolved `serviceArea`.

ConvoCore does NOT replace SAAJ's location-routing system.

---

# 5. Final Capability Model

The assistant profiles no longer expose a standalone `Marcar` action.

Use:

```ts
const serviceCapabilities = {
  maxixe: {
    message: true,
    call: true,
  },

  massinga: {
    message: true,
    call: true,
  },

  geral: {
    message: true,
    call: false,
  },
};
```

Therefore:

## Maxixe

```text
Mensagem
Ligar
```

## Massinga

```text
Mensagem
Ligar
```

## Geral

```text
Mensagem
```

For Geral, the single `Mensagem` action must be centred horizontally.

Do not display unavailable actions as disabled placeholders.

---

# 6. Appointment Responsibility

There is no longer a standalone `Marcar` action on the SAAJ assistant profile.

For supported service areas, appointment functionality is accessed from within
the configured ConvoCore experience.

Therefore:

```text
Maxixe / Massinga

Mensagem
   ↓
ConvoCore
   ├── Voiceflow conversation
   ├── conversation history
   └── appointment experience/embed where configured
```

Do not mount a second appointment scheduler from the assistant profile.

Do not create a duplicate SAAJ appointment entry point.

Geral must not receive an appointment fallback.

---

# 7. Authoritative ConvoCore Agent Matrix

The following Agent IDs are authoritative.

| Assistant | Service Area | ConvoCore Agent ID |
|---|---|---|
| Tonito | Maxixe | `vRRTsmjoE6RtEmxET3Lf` |
| Tonito | Massinga | `BeBRQjZOtKYYrmCjQmbQ` |
| Tonito | Geral | `pfaITnBkpZFjnfbvH6eL` |
| Manuela | Maxixe | `PAwlOrU45uhtDn3TRzD2` |
| Manuela | Massinga | `4q90z4k2CIhxu3UdxzEC` |
| Manuela | Geral | `vYaK48jkWjnsMiP4LtlA` |

Shared region:

```text
na
```

Shared render mode:

```text
full-width
```

Shared stylesheet:

```text
https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css
```

Shared bundle:

```text
https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js
```

Do not substitute another Agent ID.

---

# 8. Environment Variables

Agent IDs should be available through `.env.local`.

Recommended configuration:

```bash
# ============================================================
# CONVOCORE — SAAJ VIRTUAL
# ============================================================

# TONITO

NEXT_PUBLIC_CONVOCORE_TONITO_MAXIXE_AGENT_ID=vRRTsmjoE6RtEmxET3Lf
NEXT_PUBLIC_CONVOCORE_TONITO_MASSINGA_AGENT_ID=BeBRQjZOtKYYrmCjQmbQ
NEXT_PUBLIC_CONVOCORE_TONITO_GERAL_AGENT_ID=pfaITnBkpZFjnfbvH6eL


# MANUELA

NEXT_PUBLIC_CONVOCORE_MANUELA_MAXIXE_AGENT_ID=PAwlOrU45uhtDn3TRzD2
NEXT_PUBLIC_CONVOCORE_MANUELA_MASSINGA_AGENT_ID=4q90z4k2CIhxu3UdxzEC
NEXT_PUBLIC_CONVOCORE_MANUELA_GERAL_AGENT_ID=vYaK48jkWjnsMiP4LtlA


# SHARED CONVOCORE CONFIGURATION

NEXT_PUBLIC_CONVOCORE_REGION=na
NEXT_PUBLIC_CONVOCORE_SCRIPT_URL=https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js
NEXT_PUBLIC_CONVOCORE_STYLESHEET_URL=https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css
```

If private API keys are required elsewhere, use server-only variables:

```bash
# ============================================================
# CONVOCORE PRIVATE API KEYS
# ============================================================

CONVOCORE_TONITO_MAXIXE_API_KEY=
CONVOCORE_TONITO_MASSINGA_API_KEY=
CONVOCORE_TONITO_GERAL_API_KEY=

CONVOCORE_MANUELA_MAXIXE_API_KEY=
CONVOCORE_MANUELA_MASSINGA_API_KEY=
CONVOCORE_MANUELA_GERAL_API_KEY=
```

IMPORTANT:

Private API keys must NOT use `NEXT_PUBLIC_`.

Private API keys must never be:

- bundled into client JavaScript;
- passed to the browser unnecessarily;
- printed in logs;
- committed to Git;
- stored in localStorage;
- placed in URLs.

The ConvoCore browser embeds supplied for this project use Agent IDs rather
than private API keys.

---

# 9. Original Embed — Tonito Maxixe

The following is the authoritative original ConvoCore embed.

```html
<div style="width: 500px; height: 500px;" id="VG_OVERLAY_CONTAINER">
    <!-- Here is where renders the widget. -->
    <!-- Set width, height for 500px as an example after changing render to 'full-width' -->
</div>

<!-- Remove 'defer' if you want widget to load faster (Will affect website loading) -->
<script defer>
    (function() {
        window.VG_CONFIG = {
            ID: "vRRTsmjoE6RtEmxET3Lf",
            region: 'na',
            render: 'full-width',
            stylesheets: [
                "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css"
            ],
            // user: {
            //     name: 'John Doe',
            //     email: 'johndoe@gmail.com',
            //     phone: '+1234567890',
            // }
            // userID: 'USER_ID',
            // autostart: true,
        }

        var VG_SCRIPT = document.createElement("script");
        VG_SCRIPT.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
        VG_SCRIPT.defer = true;
        document.body.appendChild(VG_SCRIPT);
    })()
</script>
```

---

# 10. Original Embed — Tonito Massinga

```html
<div style="width: 500px; height: 500px;" id="VG_OVERLAY_CONTAINER">
    <!-- Here is where renders the widget. -->
    <!-- Set width, height for 500px as an example after changing render to 'full-width' -->
</div>

<!-- Remove 'defer' if you want widget to load faster (Will affect website loading) -->
<script defer>
    (function() {
        window.VG_CONFIG = {
            ID: "BeBRQjZOtKYYrmCjQmbQ",
            region: 'na',
            render: 'full-width',
            stylesheets: [
                "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css"
            ],
            // user: {
            //     name: 'John Doe',
            //     email: 'johndoe@gmail.com',
            //     phone: '+1234567890',
            // }
            // userID: 'USER_ID',
            // autostart: true,
        }

        var VG_SCRIPT = document.createElement("script");
        VG_SCRIPT.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
        VG_SCRIPT.defer = true;
        document.body.appendChild(VG_SCRIPT);
    })()
</script>
```

---

# 11. Original Embed — Tonito Geral

```html
<div style="width: 500px; height: 500px;" id="VG_OVERLAY_CONTAINER">
    <!-- Here is where renders the widget. -->
    <!-- Set width, height for 500px as an example after changing render to 'full-width' -->
</div>

<!-- Remove 'defer' if you want widget to load faster (Will affect website loading) -->
<script defer>
    (function() {
        window.VG_CONFIG = {
            ID: "pfaITnBkpZFjnfbvH6eL",
            region: 'na',
            render: 'full-width',
            stylesheets: [
                "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css"
            ],
            // user: {
            //     name: 'John Doe',
            //     email: 'johndoe@gmail.com',
            //     phone: '+1234567890',
            // }
            // userID: 'USER_ID',
            // autostart: true,
        }

        var VG_SCRIPT = document.createElement("script");
        VG_SCRIPT.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
        VG_SCRIPT.defer = true;
        document.body.appendChild(VG_SCRIPT);
    })()
</script>
```

---

# 12. Original Embed — Manuela Maxixe

THIS CONFIGURATION IS AUTHORITATIVE.

Manuela Maxixe Agent ID:

```text
PAwlOrU45uhtDn3TRzD2
```

Original embed:

```html
<div style="width: 500px; height: 500px;" id="VG_OVERLAY_CONTAINER">
    <!-- Here is where renders the widget. -->
    <!-- Set width, height for 500px as an example after changing render to 'full-width' -->
</div>

<!-- Remove 'defer' if you want widget to load faster (Will affect website loading) -->
<script defer>
    (function() {
        window.VG_CONFIG = {
            ID: "PAwlOrU45uhtDn3TRzD2",
            region: 'na',
            render: 'full-width',
            stylesheets: [
                "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css"
            ],
            // THIS IS SUPPOSED TO BE CHANGED OR REMOVED.
            // user: {
            //     name: 'John Doe',
            //     email: 'johndoe@gmail.com',
            //     phone: '+1234567890',
            // }
            // Optional user data -- end
            // **
            // userID: 'USER_ID',
            // autostart: true,
        }

        var VG_SCRIPT = document.createElement("script");
        VG_SCRIPT.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
        VG_SCRIPT.defer = true;
        document.body.appendChild(VG_SCRIPT);
    })()
</script>
```

Do not change this Agent ID.

---

# 13. Original Embed — Manuela Massinga

THIS CONFIGURATION IS AUTHORITATIVE.

Manuela Massinga Agent ID:

```text
4q90z4k2CIhxu3UdxzEC
```

Original embed:

```html
<div style="width: 500px; height: 500px;" id="VG_OVERLAY_CONTAINER">
    <!-- Here is where renders the widget. -->
    <!-- Set width, height for 500px as an example after changing render to 'full-width' -->
</div>

<!-- Remove 'defer' if you want widget to load faster (Will affect website loading) -->
<script defer>
    (function() {
        window.VG_CONFIG = {
            ID: "4q90z4k2CIhxu3UdxzEC",
            region: 'na',
            render: 'full-width',
            stylesheets: [
                "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css"
            ],
            // THIS IS SUPPOSED TO BE CHANGED OR REMOVED.
            // user: {
            //     name: 'John Doe',
            //     email: 'johndoe@gmail.com',
            //     phone: '+1234567890',
            // }
            // Optional user data -- end
            // **
            // userID: 'USER_ID',
            // autostart: true,
        }

        var VG_SCRIPT = document.createElement("script");
        VG_SCRIPT.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
        VG_SCRIPT.defer = true;
        document.body.appendChild(VG_SCRIPT);
    })()
</script>
```

Do not change this Agent ID.

---

# 14. Original Embed — Manuela Geral

THIS CONFIGURATION IS AUTHORITATIVE.

Manuela Geral Agent ID:

```text
vYaK48jkWjnsMiP4LtlA
```

Original embed:

```html
<div style="width: 500px; height: 500px;" id="VG_OVERLAY_CONTAINER">
    <!-- Here is where renders the widget. -->
    <!-- Set width, height for 500px as an example after changing render to 'full-width' -->
</div>

<!-- Remove 'defer' if you want widget to load faster (Will affect website loading) -->
<script defer>
    (function() {
        window.VG_CONFIG = {
            ID: "vYaK48jkWjnsMiP4LtlA",
            region: 'na',
            render: 'full-width',
            stylesheets: [
                "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css"
            ],
            // THIS IS SUPPOSED TO BE CHANGED OR REMOVED.
            // user: {
            //     name: 'John Doe',
            //     email: 'johndoe@gmail.com',
            //     phone: '+1234567890',
            // }
            // Optional user data -- end
            // **
            // userID: 'USER_ID',
            // autostart: true,
        }

        var VG_SCRIPT = document.createElement("script");
        VG_SCRIPT.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
        VG_SCRIPT.defer = true;
        document.body.appendChild(VG_SCRIPT);
    })()
</script>
```

Do not change this Agent ID.

---

# 15. Original Embed vs Production Implementation

The six original snippets use:

```html
style="width: 500px; height: 500px;"
```

This is NOT a production requirement.

It is an example supplied by ConvoCore.

The SAAJ implementation must preserve the ConvoCore configuration while
replacing the fixed dimensions with responsive host-container behaviour.

Preserve:

```text
Agent ID
region = na
render = full-width
stylesheet URL
bundle URL
```

Do NOT preserve:

```text
fixed 500px width
fixed 500px height
```

The production embed must adapt to the device being used.

---

# 16. Central ConvoCore Resolver

Do not scatter Agent IDs throughout React components.

Create one central configuration.

Conceptually:

```ts
type Assistant = "tonito" | "manuela";
type ServiceArea = "maxixe" | "massinga" | "geral";

const convoCoreAgents = {
  tonito: {
    maxixe:
      process.env.NEXT_PUBLIC_CONVOCORE_TONITO_MAXIXE_AGENT_ID,

    massinga:
      process.env.NEXT_PUBLIC_CONVOCORE_TONITO_MASSINGA_AGENT_ID,

    geral:
      process.env.NEXT_PUBLIC_CONVOCORE_TONITO_GERAL_AGENT_ID,
  },

  manuela: {
    maxixe:
      process.env.NEXT_PUBLIC_CONVOCORE_MANUELA_MAXIXE_AGENT_ID,

    massinga:
      process.env.NEXT_PUBLIC_CONVOCORE_MANUELA_MASSINGA_AGENT_ID,

    geral:
      process.env.NEXT_PUBLIC_CONVOCORE_MANUELA_GERAL_AGENT_ID,
  },
} as const;
```

Resolver:

```ts
function resolveConvoCoreAgent(
  assistant: Assistant,
  serviceArea: ServiceArea
) {
  return convoCoreAgents[assistant][serviceArea];
}
```

The rest of the application should work with:

```text
assistant
+
serviceArea
```

rather than raw Agent IDs.

---

# 17. Reusable ConvoCore Component

Use ONE reusable integration component.

Conceptually:

```tsx
<ConvoCoreChat
  assistant="manuela"
  serviceArea="maxixe"
  anonymousUserId={anonymousUserId}
/>
```

Do not create six unrelated implementations.

The component must:

1. resolve the correct ConvoCore Agent ID;
2. configure `window.VG_CONFIG`;
3. create the embed target;
4. ensure the target exists before initialization;
5. load the stylesheet;
6. load the ConvoCore bundle;
7. prevent duplicate scripts;
8. prevent duplicate widget instances;
9. clean up when leaving messaging;
10. handle assistant switching;
11. handle service-area switching;
12. support responsive dimensions;
13. expose loading state;
14. expose recoverable error state;
15. preserve SAAJ safety controls.

---

# 18. SAAJ Anonymous User ID

The ConvoCore embed supports:

```javascript
userID: "USER_ID"
```

SAAJ already maintains an anonymous persistent user identifier.

Where supported, pass the existing SAAJ `anonymousUserId`.

Conceptually:

```javascript
window.VG_CONFIG = {
    ID: resolvedAgentId,
    region: "na",
    render: "full-width",
    userID: anonymousUserId,
    stylesheets: [
        "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css"
    ]
};
```

Do not generate a new user ID every time messaging opens.

Do not pass by default:

- name;
- email;
- phone number.

The anonymous identifier must not encode personal information.

Do not claim undocumented ConvoCore behaviour regarding cross-agent history.

ConvoCore remains responsible for its own conversation-history semantics.

---

# 19. Responsive Design — Global Requirement

ALL SIX ConvoCore experiences must adapt to the device being used.

The implementation must support:

```text
Mobile
Tablet
Laptop
Desktop
Large desktop
```

There must NOT be separate hardcoded versions of the widget.

Use one responsive host implementation.

The ConvoCore UI should naturally respond to the available dimensions.

---

# 20. Responsive Page Structure

Recommended structure:

```text
ConvoCore page
│
├── SAAJ safety header
│     ├── Back
│     └── Saída Rápida
│
└── ConvoCore host
      └── VG_OVERLAY_CONTAINER
```

Conceptual CSS:

```css
.convo-core-page {
    width: 100%;
    height: 100dvh;
    min-height: 0;

    display: flex;
    flex-direction: column;

    overflow: hidden;
}

.convo-core-safety-header {
    flex: 0 0 auto;
}

.convo-core-shell {
    flex: 1 1 auto;

    width: 100%;
    min-width: 0;
    min-height: 0;

    overflow: hidden;
}

#VG_OVERLAY_CONTAINER {
    width: 100% !important;
    height: 100% !important;

    min-width: 0;
    min-height: 0;
}
```

Do not use:

```css
width: 500px;
height: 500px;
```

in production.

---

# 21. Mobile Behaviour

Primary mobile range:

```text
320px–767px
```

ConvoCore should behave like a mobile application.

Requirements:

- width = available viewport width;
- messaging experience fills available height;
- no horizontal scrolling;
- no fixed 500px dimensions;
- no unnecessary SAAJ outer card;
- no large side margins;
- composer remains accessible;
- ConvoCore bottom navigation remains accessible;
- Back remains accessible;
- Saída Rápida remains accessible;
- virtual keyboard must not permanently break layout.

On mobile, the messaging experience should feel effectively full-screen.

Recommended:

```css
@media (max-width: 767px) {
    .convo-core-page {
        width: 100%;
        height: 100dvh;
    }

    .convo-core-shell {
        width: 100%;
        max-width: none;
        margin: 0;
    }

    #VG_OVERLAY_CONTAINER {
        width: 100% !important;
        height: 100% !important;
    }
}
```

---

# 22. Tablet Behaviour

Tablet range:

```text
768px–1023px
```

Use the available screen naturally.

Do not constrain the interface to phone dimensions.

Conceptually:

```css
@media (min-width: 768px) and (max-width: 1023px) {
    .convo-core-shell {
        width: 100%;
        max-width: 900px;
        height: 100%;
        margin-inline: auto;
    }
}
```

The widget should remain comfortable in both:

```text
portrait
landscape
```

orientation.

Do not use a fixed height.

---

# 23. Desktop Behaviour

Desktop:

```text
1024px+
```

The ConvoCore experience should remain large and useful.

Do not:

- stretch it infinitely across ultrawide displays;
- constrain it to a tiny 500 × 500 square;
- make it look like a phone mockup floating in empty space.

Conceptually:

```css
@media (min-width: 1024px) {
    .convo-core-shell {
        width: min(100%, 1200px);
        height: 100%;
        margin-inline: auto;
    }
}
```

The surrounding SAAJ background may occupy remaining horizontal space.

The ConvoCore application should remain the visual focus.

---

# 24. Responsive Validation Matrix

Test EVERY ConvoCore configuration at representative device sizes.

## Mobile

```text
320 × 568
360 × 800
390 × 844
430 × 932
```

## Tablet

```text
768 × 1024
820 × 1180
1024 × 1366
```

## Desktop

```text
1280 × 720
1366 × 768
1440 × 900
1920 × 1080
```

For every viewport verify:

```text
[ ] ConvoCore is visible

[ ] no horizontal scrolling

[ ] no clipping

[ ] container has non-zero dimensions

[ ] widget fills intended messaging area

[ ] composer/input is reachable

[ ] ConvoCore navigation is reachable

[ ] Back is reachable

[ ] Saída Rápida is reachable

[ ] virtual keyboard does not permanently break layout

[ ] resizing the browser updates layout correctly

[ ] orientation changes do not break layout
```

---

# 25. ConvoCore Script Lifecycle

The ConvoCore integration uses global configuration:

```javascript
window.VG_CONFIG
```

This makes lifecycle management critical.

Do NOT blindly append:

```text
vg_bundle.js
```

on every React render.

The implementation must:

1. determine the required assistant;
2. determine the required service area;
3. resolve the correct Agent ID;
4. ensure `VG_OVERLAY_CONTAINER` exists;
5. ensure the container has dimensions;
6. set the correct `window.VG_CONFIG`;
7. load the ConvoCore bundle safely;
8. prevent duplicate script tags;
9. initialize the correct agent;
10. clean up when leaving;
11. correctly initialize another agent when switching.

---

# 26. Agent Switching

The following must work without refreshing the browser:

```text
Tonito Maxixe
      ↓
Back
      ↓
Manuela Maxixe
```

The result must be:

```javascript
window.VG_CONFIG.ID === "PAwlOrU45uhtDn3TRzD2"
```

and Manuela Maxixe must render.

Likewise:

```text
Manuela Maxixe
      ↓
Back
      ↓
Tonito Massinga
```

must render:

```text
BeBRQjZOtKYYrmCjQmbQ
```

Do not assume that changing:

```javascript
window.VG_CONFIG
```

automatically reinitializes an already-mounted ConvoCore widget.

The integration must explicitly handle the lifecycle.

---

# 27. Do Not Create Duplicate Scripts

There must not be multiple identical ConvoCore bundle scripts in the DOM.

Do not create:

```html
<script src="...vg_bundle.js"></script>
<script src="...vg_bundle.js"></script>
<script src="...vg_bundle.js"></script>
```

because the user switched assistants.

Create a lifecycle-aware loader.

The loader must distinguish between:

```text
bundle available
widget initialized
agent currently mounted
agent being changed
widget being destroyed/reset
```

Do not fix initialization problems using arbitrary delays.

---

# 28. Manuela Maxixe — Current Critical Issue

Manuela Maxixe currently fails to appear correctly in the SAAJ application.

The authoritative configuration is:

```text
Assistant:
manuela

Service Area:
maxixe

Agent ID:
PAwlOrU45uhtDn3TRzD2

Region:
na

Render:
full-width

Stylesheet:
https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css

Bundle:
https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js
```

DO NOT change the Agent ID to solve the problem.

The supplied Manuela Maxixe embed is valid project configuration.

Investigate the SAAJ implementation.

---

# 29. Manuela Maxixe Debugging Checklist

Verify each of the following.

### 1. Service area

Ensure SAAJ actually resolves:

```text
serviceArea = maxixe
```

when the user selected:

```text
Province = Inhambane
District/City = Maxixe
```

---

### 2. Resolver

Ensure:

```ts
resolveConvoCoreAgent("manuela", "maxixe")
```

returns exactly:

```text
PAwlOrU45uhtDn3TRzD2
```

---

### 3. Environment variable

Verify:

```bash
NEXT_PUBLIC_CONVOCORE_MANUELA_MAXIXE_AGENT_ID=PAwlOrU45uhtDn3TRzD2
```

There must be no accidental:

- spaces;
- extra quotes;
- line breaks;
- wrong capitalization.

Restart the development server after `.env.local` changes.

---

### 4. Runtime configuration

Immediately before ConvoCore initialization verify:

```javascript
window.VG_CONFIG.ID
```

equals:

```text
PAwlOrU45uhtDn3TRzD2
```

---

### 5. Target container

Verify:

```html
<div id="VG_OVERLAY_CONTAINER"></div>
```

exists before the bundle initializes.

---

### 6. Container dimensions

Verify the container has:

```text
width > 0
height > 0
```

A valid ConvoCore configuration cannot display inside a zero-height container.

---

### 7. Duplicate IDs

There must be only ONE:

```text
VG_OVERLAY_CONTAINER
```

in the active DOM.

---

### 8. Previous widget

Ensure a previously mounted:

```text
Tonito
Manuela Massinga
Manuela Geral
```

widget is not still occupying ConvoCore's global state.

---

### 9. Script

Ensure the ConvoCore bundle is not repeatedly appended.

---

### 10. CSS

Check that no ancestor accidentally applies:

```css
display: none;
visibility: hidden;
height: 0;
width: 0;
opacity: 0;
```

to the widget/container.

Check `overflow: hidden` carefully to ensure it is only controlling layout and
not clipping a wrongly sized child.

---

### 11. Browser console

Inspect runtime errors.

Do not suppress them merely to make the UI appear clean.

---

### 12. Network

Verify successful loading of:

```text
https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js
```

and:

```text
https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css
```

---

# 30. Loading State

ConvoCore is an external integration and may require time to initialize.

Never show a blank white screen while waiting.

Immediately display:

```text
A preparar a conversa...
```

Use subtle assistant context:

```text
Tonito
→ soft blue

Manuela
→ soft blush / berry
```

Do not display fake progress percentages.

Remove the loading state once ConvoCore is ready.

---

# 31. Failure State

If ConvoCore cannot initialize, show a recoverable state:

```text
Não foi possível abrir a conversa.
```

Actions:

```text
Tentar novamente

Voltar
```

Do not silently open the old Voiceflow interface.

Do not generate hardcoded medical responses as fallback.

Do not automatically switch to another ConvoCore agent.

---

# 32. Assistant Profile → Mensagem

From a Tonito or Manuela profile:

```text
Mensagem
```

must:

1. identify the selected assistant;
2. read current `serviceArea`;
3. resolve the correct ConvoCore Agent ID;
4. open the ConvoCore messaging experience.

Example:

```text
Assistant:
Manuela

Service Area:
Maxixe

Mensagem
      ↓
PAwlOrU45uhtDn3TRzD2
```

No additional assistant selection is required.

---

# 33. Assistant Profile → Ligar

For:

```text
maxixe
massinga
```

`Ligar` remains independent from ConvoCore.

Architecture:

```text
SAAJ
  ↓
Ligar
  ↓
Vapi
```

Do not route direct SAAJ voice calls through ConvoCore.

For:

```text
geral
```

do not display `Ligar`.

---

# 34. Assistant Profile Visual Layout

## Maxixe / Massinga

Display exactly two balanced actions:

```text
┌────────────────┐   ┌────────────────┐
│                │   │                │
│       💬       │   │       ☎        │
│    Mensagem    │   │     Ligar      │
│                │   │                │
└────────────────┘   └────────────────┘
```

Preserve the existing premium SAAJ design.

Do not leave an empty third column where `Marcar` previously existed.

---

## Geral

Display one centred action:

```text
           ┌────────────────┐
           │                │
           │       💬       │
           │    Mensagem    │
           │                │
           └────────────────┘
```

Do not left-align it inside an obsolete multi-column layout.

---

# 35. Active ConvoCore Screen

When ConvoCore opens, ConvoCore should visually dominate the messaging screen.

Do NOT duplicate:

- Tonito/Manuela portrait;
- assistant name;
- SAAJ location;
- assistant description;
- another messaging header.

ConvoCore already provides its own interface.

The SAAJ shell should be minimal.

Conceptually:

```text
┌─────────────────────────────────────┐
│ ←                       Saída Rápida│
├─────────────────────────────────────┤
│                                     │
│                                     │
│             CONVOCORE               │
│                                     │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

---

# 36. Quick Exit

`Saída Rápida` remains owned by SAAJ.

It must remain accessible while ConvoCore is active.

It must not depend on ConvoCore.

When activated:

```text
immediately leave the sensitive experience
→ navigate to configured neutral destination
```

Do not display a confirmation dialog.

Do not claim Quick Exit deletes:

- ConvoCore history;
- Voiceflow history;
- browser history;
- server data.

---

# 37. Conversas — Final Architecture

The SAAJ `Conversas` tab does NOT reproduce ConvoCore's conversation-history
screen.

Instead, it acts as a messaging gateway.

Use:

```text
Conversas

Escolhe com quem queres conversar.
```

Then show:

```text
┌───────────────────────────────────┐
│                                   │
│ [Tonito portrait]                 │
│                                   │
│ Tonito                        →   │
│ Guia SAAJ Virtual                 │
│ Conversar                         │
│                                   │
└───────────────────────────────────┘


┌───────────────────────────────────┐
│                                   │
│ [Manuela portrait]                │
│                                   │
│ Manuela                       →   │
│ Guia SAAJ Virtual                 │
│ Conversar                         │
│                                   │
└───────────────────────────────────┘
```

Use:

```text
Tonito
→ subtle blue atmosphere

Manuela
→ subtle blush / berry atmosphere
```

The cards should feel like premium communication/contact cards.

Do not make them generic settings rows.

---

# 38. Conversas Card Behaviour

The cards are direct messaging shortcuts.

Therefore:

```text
Conversas
→ Tonito
→ ConvoCore
```

NOT:

```text
Conversas
→ Tonito
→ Contact Profile
→ Mensagem
→ ConvoCore
```

Likewise:

```text
Conversas
→ Manuela
→ ConvoCore
```

The current `serviceArea` automatically determines which ConvoCore agent is
opened.

---

# 39. Conversas Routing Examples

User:

```text
Inhambane
Massinga
```

Therefore:

```text
serviceArea = massinga
```

Then:

```text
Conversas
→ Tonito
→ BeBRQjZOtKYYrmCjQmbQ
```

and:

```text
Conversas
→ Manuela
→ 4q90z4k2CIhxu3UdxzEC
```

For a user outside Maxixe/Massinga:

```text
serviceArea = geral
```

Then:

```text
Conversas
→ Tonito
→ pfaITnBkpZFjnfbvH6eL
```

and:

```text
Conversas
→ Manuela
→ vYaK48jkWjnsMiP4LtlA
```

---

# 40. Conversation History

The distinction is:

```text
SAAJ Conversas
→ select assistant

ConvoCore
→ actual conversation/history interface
```

Do not maintain:

```text
SAAJ conversation history
+
ConvoCore conversation history
```

as two competing user-facing systems.

Remove/deactivate obsolete SAAJ UI such as:

- Todas / Tonito / Manuela history filters;
- locally reconstructed conversation rows;
- custom transcript previews;
- custom chat history;
- old `+` new-conversation FAB;
- custom conversation-creation UI.

Starting and continuing conversations happens inside ConvoCore.

---

# 41. Início Behaviour

Preserve the current distinction between `Início` and `Conversas`.

From `Início`:

```text
Tonito
→ Tonito Contact Profile
→ Mensagem / Ligar
```

and:

```text
Manuela
→ Manuela Contact Profile
→ Mensagem / Ligar
```

Do NOT make the Início assistant cards automatically open ConvoCore.

`Início` remains the assistant/contact hub.

`Conversas` is the direct messaging gateway.

---

# 42. Location Changes

Changing location changes the ConvoCore agent used for subsequent messaging
entry.

Example:

```text
Current:

Manuela + Massinga
→ 4q90z4k2CIhxu3UdxzEC
```

After changing location:

```text
Maxixe
```

new messaging entry becomes:

```text
Manuela + Maxixe
→ PAwlOrU45uhtDn3TRzD2
```

Do not assume conversation history automatically transfers between separate
ConvoCore agents.

Do not attempt to merge histories unless ConvoCore explicitly provides a
supported mechanism for this.

---

# 43. Privacy

Pass only the minimum required data into ConvoCore.

Default integration data:

```text
Agent ID
region
render mode
anonymousUserId
```

Do not automatically pass:

- name;
- email;
- phone;
- health topic;
- conversation preview;
- appointment details.

Do not put sensitive health information in query parameters.

---

# 44. Performance

Do not initialize all six ConvoCore agents when SAAJ starts.

Load only the required agent.

ConvoCore should not unnecessarily block:

- splash screen;
- onboarding;
- Início;
- location selection.

The external resources may be loaded when messaging is needed.

Safe preconnect/preload optimisations may be used if they improve perceived
performance without initializing unwanted agents.

---

# 45. All-Six-Agent Functional Validation

Before considering the integration complete, validate all six configurations.

## Tonito Maxixe

```text
Assistant:
tonito

Service Area:
maxixe

Agent:
vRRTsmjoE6RtEmxET3Lf
```

Expected:

```text
PASS
```

---

## Tonito Massinga

```text
Assistant:
tonito

Service Area:
massinga

Agent:
BeBRQjZOtKYYrmCjQmbQ
```

Expected:

```text
PASS
```

---

## Tonito Geral

```text
Assistant:
tonito

Service Area:
geral

Agent:
pfaITnBkpZFjnfbvH6eL
```

Expected:

```text
PASS
```

---

## Manuela Maxixe

```text
Assistant:
manuela

Service Area:
maxixe

Agent:
PAwlOrU45uhtDn3TRzD2
```

Expected:

```text
PASS
```

---

## Manuela Massinga

```text
Assistant:
manuela

Service Area:
massinga

Agent:
4q90z4k2CIhxu3UdxzEC
```

Expected:

```text
PASS
```

---

## Manuela Geral

```text
Assistant:
manuela

Service Area:
geral

Agent:
vYaK48jkWjnsMiP4LtlA
```

Expected:

```text
PASS
```

---

# 46. Switching Validation

Initial rendering is not sufficient.

Test:

```text
Tonito Maxixe
→ Back
→ Manuela Maxixe
```

Then:

```text
Manuela Maxixe
→ Back
→ Tonito Maxixe
```

Then:

```text
Tonito Massinga
→ Back
→ Manuela Massinga
```

Then:

```text
Manuela Massinga
→ Back
→ Tonito Geral
```

Then:

```text
Tonito Geral
→ Back
→ Manuela Geral
```

Verify:

```text
[ ] correct agent each time
[ ] no browser refresh required
[ ] no stale previous assistant
[ ] no duplicate widget
[ ] no duplicate script
[ ] no zero-height container
[ ] no mixed assistant state
```

---

# 47. Device Validation

For EACH of the six agents verify:

## Mobile

```text
320 × 568
360 × 800
390 × 844
430 × 932
```

## Tablet

```text
768 × 1024
820 × 1180
1024 × 1366
```

## Desktop

```text
1280 × 720
1366 × 768
1440 × 900
1920 × 1080
```

Each must:

```text
render correctly
fit available width
fit available height
avoid horizontal overflow
preserve ConvoCore controls
preserve SAAJ safety controls
remain usable after resize/orientation change
```

---

# 48. Development Diagnostics

Development-only diagnostics may log:

```text
[ConvoCore] assistant=manuela
[ConvoCore] serviceArea=maxixe
[ConvoCore] agent=PAwlOrU45uhtDn3TRzD2
[ConvoCore] container ready
[ConvoCore] loading bundle
[ConvoCore] widget initialized
```

Do not log:

```text
API keys
Voiceflow secrets
Vapi private keys
personal user data
health information
```

For missing configuration, fail clearly in development.

Do not silently route to another agent.

---

# 49. Security Rules

Never expose private:

- ConvoCore API keys;
- Voiceflow API keys;
- Vapi private keys;
- Airtable credentials;
- n8n credentials.

Never store them in:

- client-side JavaScript;
- localStorage;
- sessionStorage;
- URLs;
- Git repositories.

Agent IDs are different because they are already included in ConvoCore's
browser embed configuration.

---

# 50. Final Production Rules

The final production architecture is:

```text
                         SAAJ VIRTUAL
                              │
                   assistant + serviceArea
                              │
                    ConvoCore resolver
                              │
          ┌───────────────────┴──────────────────┐
          │                                      │
        TONITO                                MANUELA
          │                                      │
   ┌──────┼──────┐                        ┌──────┼──────┐
   │      │      │                        │      │      │
Maxixe Massinga Geral                  Maxixe Massinga Geral
   │      │      │                        │      │      │
   └──────┴──────┴────── ConvoCore ───────┴──────┴──────┘
                              │
                          Voiceflow
```

Direct voice remains:

```text
SAAJ
→ Ligar
→ Vapi
```

for:

```text
Maxixe
Massinga
```

Geral remains:

```text
Mensagem only
```

---

# 51. Final Responsibility Rule

Remember:

```text
SAAJ owns the journey.

ConvoCore owns messaging and user-facing messaging history.

Voiceflow owns conversational intelligence behind ConvoCore.

Vapi owns direct voice calling.

Appointment functionality for supported service areas is accessed through
the configured ConvoCore experience.
```

Do not duplicate these responsibilities.

---

# 52. Definition of Done

The ConvoCore integration is complete only when:

```text
[ ] Tonito Maxixe renders

[ ] Tonito Massinga renders

[ ] Tonito Geral renders

[ ] Manuela Maxixe renders

[ ] Manuela Massinga renders

[ ] Manuela Geral renders

[ ] Manuela Maxixe uses exactly PAwlOrU45uhtDn3TRzD2

[ ] all six experiences are responsive

[ ] mobile works

[ ] tablet works

[ ] desktop works

[ ] no fixed 500 × 500 production container remains

[ ] agent switching works without refresh

[ ] no duplicate ConvoCore scripts exist

[ ] no duplicate VG_OVERLAY_CONTAINER exists

[ ] anonymousUserId remains stable

[ ] private API keys remain server-side

[ ] Conversas is the Tonito/Manuela gateway

[ ] ConvoCore owns individual conversation history

[ ] Maxixe/Massinga profiles show Mensagem + Ligar

[ ] Geral profiles show centred Mensagem only

[ ] direct Marcar action has been removed

[ ] Vapi remains independent

[ ] Quick Exit remains accessible

[ ] loading state works

[ ] retry/failure state works
```

Only after all items pass should the ConvoCore migration be considered
production-ready.
````

This version should **replace**, rather than be appended to, the old file, because the previous version still describes `Marcar → Cal.com` as a direct SAAJ responsibility. The new document reflects the architecture we have now settled on.
