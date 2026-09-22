Let's do **`02-design-system.md`**. This should be strict enough that when we eventually give everything to the coding agent, it doesn't improvise a completely different aesthetic from screen to screen.

````markdown
# SAAJ Virtual — Design System

## 1. Purpose

This document defines the visual and interaction design system for SAAJ Virtual.

It establishes the shared rules for:

- colour;
- typography;
- spacing;
- surfaces;
- glassmorphism;
- cards;
- buttons;
- icons;
- portraits;
- navigation;
- assistant-specific visual identities;
- responsive behaviour;
- motion principles;
- accessibility.

The objective is to ensure that SAAJ Virtual feels like one coherent premium product across onboarding, Início, Conversas, chat, voice calls, appointments and Mais.

Detailed screen layouts are defined in their respective specification documents.

---

# 2. Design Direction

SAAJ Virtual should feel:

- modern;
- premium;
- calm;
- youthful without being childish;
- welcoming;
- human;
- private;
- lightweight;
- trustworthy;
- technologically advanced without feeling technical.

The visual experience should combine:

**minimal healthcare clarity + premium consumer application + modern messaging experience**

The product must avoid looking like:

- a hospital management system;
- a government database;
- a generic SaaS dashboard;
- a conventional AI chatbot;
- a children's application;
- a highly saturated social-media product.

---

# 3. Core Visual Philosophy

The interface should use a restrained visual hierarchy.

The dominant visual language is:

```text
Warm / clean white
        +
Near-black typography
        +
Soft translucent glass
        +
Human portraits
        +
Subtle atmospheric colour
````

Colour should provide identity and context rather than fill every surface.

Whitespace is an active design element.

---

# 4. Shared vs Assistant-Specific Design

Approximately:

```text
80% Shared SAAJ Design System
20% Contextual Assistant Identity
```

Tonito and Manuela must feel like they belong to the same application.

The interface must not appear to switch into an entirely different product when the user changes assistant.

---

# 5. Neutral SAAJ Identity

Neutral SAAJ styling is used for contexts where neither assistant should dominate.

Examples:

* first welcome;
* location selection;
* Mozambique map;
* Início;
* `Todas` conversation filter;
* Mais;
* general settings;
* privacy screens;
* About SAAJ Virtual.

The neutral palette is based on:

* warm white;
* pearl white;
* near-black;
* soft grey;
* restrained translucent glass.

Accent colours may appear through assistant cards or contextual elements.

---

# 6. Tonito Visual Identity

Tonito's visual identity uses cool blue atmospheric accents.

Suggested design direction:

```text
Ice Blue
Powder Blue
Soft Sky Blue
Cobalt / Electric Blue
Near Black
White
```

Indicative colour tokens:

```css
--tonito-50:  #F2F8FF;
--tonito-100: #E4F1FF;
--tonito-200: #C9E3FF;
--tonito-400: #5AA8FF;
--tonito-500: #247CFF;
--tonito-600: #1264E8;
--tonito-700: #0B4EB8;
```

These values are starting design tokens rather than immutable branding values.

The final implementation should preserve the intended visual relationship even if minor colour calibration is required.

Tonito's colour should appear primarily through:

* atmospheric background glow;
* active filter;
* primary contextual CTA;
* selected states;
* typing indicator;
* subtle message accents;
* call environment;
* assistant profile highlights.

Avoid filling entire screens with saturated blue.

---

# 7. Manuela Visual Identity

Manuela's visual identity uses soft blush and berry accents.

Suggested direction:

```text
Pale Blush
Rose Mist
Soft Pink
Berry
Raspberry
Near Black
White
```

Indicative tokens:

```css
--manuela-50:  #FFF6F8;
--manuela-100: #FFE9EF;
--manuela-200: #FFD2DE;
--manuela-400: #E86A91;
--manuela-500: #CF3F70;
--manuela-600: #B72E5E;
--manuela-700: #8F2149;
```

Manuela's colour should appear through the same contextual mechanisms used for Tonito:

* atmospheric glow;
* selected states;
* active filters;
* contextual CTA;
* chat accents;
* typing indicator;
* profile highlights;
* call environment.

Avoid turning the entire Manuela experience pink.

---

# 8. Neutral Colour Tokens

Indicative shared tokens:

```css
--background: #F8F8F6;
--surface: #FFFFFF;
--surface-soft: #F4F4F2;

--text-primary: #111111;
--text-secondary: #686868;
--text-tertiary: #969696;

--border-soft: rgba(20, 20, 20, 0.08);
--border-medium: rgba(20, 20, 20, 0.12);

--glass-light: rgba(255, 255, 255, 0.68);
--glass-medium: rgba(255, 255, 255, 0.78);
--glass-strong: rgba(255, 255, 255, 0.88);
```

Pure black should generally be avoided for large text areas.

Near-black provides a softer premium appearance.

---

# 9. Atmospheric Backgrounds

SAAJ should avoid flat, sterile white screens.

Backgrounds may contain extremely subtle:

* radial gradients;
* blurred colour fields;
* soft light blooms;
* assistant-coloured atmospheric glows.

Example concept for Tonito:

```css
background:
  radial-gradient(
    circle at 80% 15%,
    rgba(36, 124, 255, 0.12),
    transparent 38%
  ),
  #F8F8F6;
```

Example concept for Manuela:

```css
background:
  radial-gradient(
    circle at 80% 15%,
    rgba(207, 63, 112, 0.10),
    transparent 38%
  ),
  #F8F8F6;
```

These effects must remain subtle.

The content should remain visually dominant.

---

# 10. Glassmorphism Strategy

Glassmorphism is a defining visual element of SAAJ Virtual, but it must be used selectively.

Do not make every card transparent.

Use four surface levels.

## Level 0 — Canvas

Background layer.

Examples:

* page background;
* atmospheric gradient;
* soft glow.

---

## Level 1 — Solid Surface

Mostly opaque content cards.

Examples:

* conversation rows;
* settings groups;
* informational cards;
* appointment information.

Typical appearance:

```text
White / near-white
Soft border
Very subtle shadow
```

---

## Level 2 — Glass Surface

Floating interactive elements.

Examples:

* bottom navigation;
* filter controls;
* map overlays;
* bottom sheets;
* floating toolbars.

Typical characteristics:

```css
background: rgba(255,255,255,0.70);
backdrop-filter: blur(18px);
border: 1px solid rgba(255,255,255,0.55);
```

---

## Level 3 — Focus Glass

High-priority contextual controls.

Examples:

* voice call controls;
* selected assistant control;
* important floating CTA;
* modal actions.

May use slightly stronger blur and contextual assistant tint.

---

# 11. Avoid Over-Glassification

The coding agent must not apply glassmorphism indiscriminately.

Incorrect:

```text
Glass card
 inside glass card
  inside another glass container
   over glass background
```

Preferred:

```text
Soft background
   ↓
Solid readable content
   ↓
Selective floating glass controls
```

Readability takes priority over visual effects.

---

# 12. Typography

Typography should feel modern, human and highly readable.

Preferred font direction:

* Geist;
* Inter;
* Manrope;
* Plus Jakarta Sans;
* similar modern grotesk sans-serif.

A single primary type family should be used consistently unless there is a strong design reason otherwise.

Avoid decorative fonts for core UI.

---

# 13. Typography Hierarchy

Suggested hierarchy:

### Display

```text
32–36px
Medium / Semibold
Tight but comfortable tracking
```

Used for:

* welcome statements;
* major onboarding questions;
* hero messaging.

### Screen Title

```text
24–28px
Semibold
```

Examples:

* Conversas
* Mais
* Privacidade

### Section Heading

```text
18–20px
Semibold
```

### Card Title

```text
16–18px
Semibold
```

### Body

```text
15–16px
Regular
```

### Metadata

```text
12–13px
Medium
```

Examples:

* timestamps;
* availability;
* secondary labels.

---

# 14. Text Hierarchy

Primary information:

```css
color: var(--text-primary);
```

Secondary explanation:

```css
color: var(--text-secondary);
```

Metadata:

```css
color: var(--text-tertiary);
```

Avoid using low-contrast grey for essential information.

---

# 15. Language and UI Copy

Interface language should be:

* short;
* conversational;
* clear;
* respectful;
* natural.

Avoid unnecessarily technical terminology.

Prefer:

`Falar com Manuela`

over:

`Iniciar sessão conversacional com assistente`

Prefer:

`Não foi possível ligar`

over:

`Vapi connection failure`

Prefer:

`Marcar encontro`

over overly institutional scheduling terminology where appropriate.

---

# 16. Spacing System

Use a consistent spacing scale.

Recommended base:

```text
4px
8px
12px
16px
20px
24px
32px
40px
48px
64px
```

Common screen horizontal padding:

```text
Mobile: 20–24px
Tablet/Desktop: responsive
```

Avoid placing content against viewport edges.

---

# 17. Vertical Rhythm

Major sections should have generous separation.

Example:

```text
Page title

32px

Primary content

40px

Secondary section

24px

Cards
```

The application should feel spacious without requiring excessive scrolling for simple tasks.

---

# 18. Border Radius

Rounded geometry is a key part of the SAAJ visual language.

Suggested tokens:

```css
--radius-small: 12px;
--radius-medium: 18px;
--radius-large: 24px;
--radius-xl: 30px;
--radius-pill: 999px;
```

Typical usage:

```text
Buttons → 16–22px / pill where appropriate
Cards → 20–28px
Bottom sheets → 28–32px top corners
Bottom navigation → 22–28px
Portraits → circular or highly rounded
```

Avoid excessive variation.

---

# 19. Shadows

Shadows should be soft and diffused.

Avoid strong dark drop shadows.

Suggested direction:

```css
box-shadow:
  0 12px 40px rgba(0, 0, 0, 0.07);
```

Smaller components should use lighter shadows.

Assistant-coloured shadows should be extremely restrained.

---

# 20. Borders

Use subtle borders to define translucent surfaces.

Example:

```css
border: 1px solid rgba(20, 20, 20, 0.07);
```

Glass surfaces may use light borders:

```css
border: 1px solid rgba(255, 255, 255, 0.55);
```

Avoid heavy outlined-card aesthetics.

---

# 21. Buttons

Buttons should be easy to understand and comfortable to tap.

Minimum recommended interactive height:

```text
48px
```

Primary buttons may use:

* dark neutral background in neutral contexts;
* Tonito blue in Tonito contexts;
* Manuela berry in Manuela contexts.

---

# 22. Primary Button

Neutral example:

```text
╭─────────────────────────────╮
│          Continuar          │
╰─────────────────────────────╯
```

Characteristics:

* strong contrast;
* large tap target;
* clear label;
* restrained shadow;
* rounded corners.

---

# 23. Secondary Button

Secondary actions may use:

* white/solid surface;
* subtle border;
* dark text;
* minimal shadow.

Do not make secondary actions visually compete with the primary CTA.

---

# 24. Icon Buttons

Examples:

* microphone;
* back;
* close;
* speaker;
* call end;
* quick exit;
* new conversation.

Icon buttons should:

* have sufficient tap area;
* use consistent geometry;
* provide accessible labels;
* not rely exclusively on icon meaning when ambiguity is possible.

---

# 25. Iconography

Use one coherent icon family.

Preferred direction:

**Lucide**

Icons should be:

* simple;
* line-based;
* modern;
* visually lightweight.

Avoid mixing:

* emoji;
* filled system icons;
* random SVG styles;
* multiple unrelated icon libraries

within the same interface.

Emoji may appear in conversational content where appropriate but should not substitute for the product's icon system.

---

# 26. Human Portraits

Tonito and Manuela portraits are major identity elements.

Portraits should feel:

* human;
* approachable;
* contemporary;
* natural;
* trustworthy.

Avoid:

* corporate stock-photo appearance;
* exaggerated AI aesthetics;
* overly clinical clothing unless intentionally required;
* cartoon avatars;
* uncanny or hyper-stylised rendering.

Portrait treatment should remain consistent across:

* Início;
* assistant selection;
* contact profile;
* chat header;
* conversation list;
* call experience.

Different crops may be used for different contexts while preserving identity.

---

# 27. Portrait Hierarchy

Suggested sizing:

### Hero/contact profile

Large portrait:

```text
120–180px+
```

### Home assistant card

Medium:

```text
64–96px
```

### Conversation row

Small:

```text
44–52px
```

### Chat header

```text
36–44px
```

Exact sizing should respond to viewport.

---

# 28. Assistant Cards

On neutral screens, Tonito and Manuela cards should share identical component architecture.

Example:

```text
╭────────────────────────────────╮
│                                │
│         [ Portrait ]           │
│                                │
│           Manuela              │
│                                │
│      Falar com Manuela    →    │
│                                │
╰────────────────────────────────╯
```

Differences should come from:

* portrait;
* name;
* subtle atmospheric colour;
* contextual accent.

Do not give one assistant a visually superior card.

---

# 29. Bottom Navigation

Primary navigation:

```text
Início | Conversas | Mais
```

The navigation should appear as a floating glass dock.

Suggested characteristics:

```text
Width: approximately 88–92% of mobile viewport
Height: approximately 64–70px
Radius: 22–28px
Blurred translucent background
Soft border
Soft shadow
```

It should float slightly above the bottom safe area.

---

# 30. Bottom Navigation Active State

The selected destination should be immediately recognisable.

Neutral contexts may use:

* dark active icon/text;
* subtle pearl capsule.

Assistant contexts may use a very restrained contextual tint.

The bottom navigation itself should not completely change colour between Tonito and Manuela.

It belongs to SAAJ, not to an individual assistant.

---

# 31. Filters

Conversation filters use pill-style controls.

Example:

```text
[ Todas ]   [ Tonito ]   [ Manuela ]
```

Selected state:

### Todas

Neutral dark/pearl treatment.

### Tonito

Blue contextual treatment.

### Manuela

Berry contextual treatment.

Transitions between filters should feel smooth rather than causing full-page reloads.

---

# 32. Floating Action Button

The `+` new-conversation action should be visually distinct without becoming oversized.

Suggested characteristics:

```text
Circular or softly rounded
52–60px
Floating above bottom navigation
Context-aware but preferably neutral when viewing Todas
```

The action must remain reachable with one hand on common smartphone sizes.

---

# 33. Bottom Sheets

Use bottom sheets for lightweight decisions such as:

* new conversation assistant selection;
* changing a preference;
* confirming a secondary action.

Bottom sheets should:

* emerge smoothly from the bottom;
* use large top radii;
* use glass or near-solid premium surfaces;
* respect device safe areas;
* be dismissible where appropriate.

---

# 34. Modals

Avoid traditional desktop-style centre modals on mobile unless necessary.

Prefer:

* bottom sheets;
* full-screen focused flows;
* contextual overlays.

Desktop may adapt bottom sheets into appropriately positioned dialogs.

---

# 35. Conversation Rows

Conversation rows should prioritise recognition.

Recommended hierarchy:

```text
[avatar] Assistant / Topic              Time
         Latest message preview
```

Avoid excessive metadata.

Unread state, if implemented, should be clear but restrained.

Conversation lists should feel closer to a modern messaging application than an administrative table.

---

# 36. Chat Bubbles

Chat bubbles should be modern and restrained.

Assistant messages:

* light/white surface;
* subtle contextual assistant accent where appropriate.

User messages:

* stronger contrast;
* visually distinct from assistant messages.

Avoid extremely saturated full-width bubbles.

Maximum bubble width should preserve readable line length.

---

# 37. Chat Composer

The composer is a major interaction component.

It should include:

* text input;
* send action;
* microphone action where available.

Concept:

```text
╭─────────────────────────────────────╮
│ Escreve uma mensagem...      🎙  ↑ │
╰─────────────────────────────────────╯
```

The composer should float comfortably above the device safe area/navigation context.

It should feel integrated into SAAJ rather than like an embedded third-party widget.

---

# 38. Voice Input

If microphone-to-text functionality is available:

1. user activates microphone;
2. speech is transcribed;
3. transcription appears in the composer;
4. user can review/edit;
5. user chooses to send.

Do not automatically send speech without allowing review unless explicitly redesigned later.

---

# 39. Call Experience

Voice calls should be visually immersive.

Use:

* large assistant portrait;
* assistant-specific atmospheric background;
* call state/timer;
* large glass controls.

Typical controls:

```text
Microphone
Speaker
End call
```

The end-call control should be visually distinct.

Do not expose Vapi branding as the primary experience.

---

# 40. Appointment Experience

Cal.com should be visually contained within the SAAJ application shell where technically possible.

Use:

* SAAJ header;
* contextual page background;
* appropriate spacing;
* clear back navigation.

Avoid making the user feel abruptly transported to an unrelated website.

---

# 41. Map Design

The Mozambique and Inhambane maps should use clean responsive SVG geometry.

Do not use low-resolution raster maps as the final implementation.

Map interaction should feel modern and tactile.

Selected region behaviour may include:

* slight elevation;
* contextual fill;
* soft glow;
* scale emphasis.

Non-selected areas may subtly fade.

Labels must remain readable.

---

# 42. Map Motion

Province selection may animate:

```text
Tap province
      ↓
Selected region lifts/emphasises
      ↓
Other regions soften
      ↓
Map recentres/scales
      ↓
Next selection state appears
```

For Inhambane:

```text
Province selected
      ↓
Transition into district map
      ↓
District boundaries emerge
```

Motion should support comprehension rather than spectacle.

---

# 43. Motion Principles

Animations should feel:

* smooth;
* soft;
* responsive;
* deliberate.

Preferred motion includes:

* fade;
* translate;
* gentle scale;
* shared-element style transitions;
* subtle background colour interpolation.

Avoid:

* aggressive bouncing;
* excessive spring effects;
* spinning elements;
* unnecessary parallax;
* long cinematic transitions that slow access to care.

---

# 44. Motion Duration

Indicative ranges:

```text
Micro-interactions: 120–200ms
Standard transitions: 200–350ms
Major contextual transitions: 350–550ms
```

User input should always feel immediate.

---

# 45. Reduced Motion

Respect system-level reduced-motion preferences.

When reduced motion is enabled:

* remove unnecessary scaling;
* minimise large transitions;
* preserve clear state changes without animation dependence.

---

# 46. Loading States

Loading should feel intentional.

Use:

* skeletons;
* subtle pulse;
* contextual typing indicators;
* progress feedback when appropriate.

Avoid blank screens and generic spinning loaders whenever a better contextual state is possible.

---

# 47. Empty States

Empty states should guide the next action.

Example:

```text
[ Tonito portrait ]

Ainda não falaste com Tonito.

Começa uma conversa quando quiseres.

[ + Nova conversa ]
```

Avoid empty screens containing only:

`No data found`

---

# 48. Error States

Errors should maintain the visual system.

Example:

```text
Não foi possível carregar esta conversa.

[ Tentar novamente ]
```

Use clear recovery actions whenever possible.

Do not display technical stack traces or provider error codes.

---

# 49. Success States

Important successful actions should receive lightweight confirmation.

Examples:

* appointment successfully scheduled;
* preference updated;
* local data cleared.

Avoid excessive celebratory animation for sensitive health actions.

---

# 50. Privacy as a Visual Signal

Privacy should feel integrated into the product rather than hidden in legal text.

Subtle indicators may include:

```text
🔒 Conversa privada
```

However, production UI should use the standard icon system rather than emoji where possible.

Privacy signals should be reassuring without making the interface feel alarming.

---

# 51. Quick Exit Visual Treatment

Quick Exit should be discreet but reachable.

It must not resemble a destructive action such as:

`Delete conversation`

Its icon and label should be understandable after first exposure.

Exact placement is defined in the privacy and individual screen specifications.

---

# 52. Mobile-First Design

The application must be designed first for smartphone use.

Prioritise:

* thumb reach;
* vertical layouts;
* large touch targets;
* safe-area handling;
* keyboard behaviour;
* bottom navigation;
* readable line lengths.

Do not design desktop first and simply compress it.

---

# 53. Tablet Behaviour

Tablet layouts may:

* increase content width;
* display assistant cards side-by-side;
* use larger portraits;
* increase whitespace.

Do not stretch text across the entire viewport.

---

# 54. Desktop Behaviour

Desktop should feel intentionally designed.

Use constrained content widths and, where useful:

* centred application shell;
* split layouts;
* conversation list + active conversation;
* richer whitespace.

The desktop version should preserve the same product hierarchy as mobile.

---

# 55. Safe Areas

All fixed/floating controls must respect:

* iOS safe areas;
* Android navigation areas;
* browser chrome;
* virtual keyboard.

Bottom navigation and composers must not be obscured by system UI.

---

# 56. Accessibility

The visual system must support accessibility.

Requirements include:

* adequate colour contrast;
* visible focus states;
* keyboard accessibility where relevant;
* semantic HTML;
* meaningful labels;
* screen-reader support;
* large enough touch targets;
* no critical information communicated only by colour.

---

# 57. Colour and Meaning

Tonito blue and Manuela berry identify context.

They must not independently communicate critical states such as:

* error;
* success;
* danger;
* medical risk.

System-state colours must remain semantically distinct.

---

# 58. Dark Mode

Version 1 is designed primarily around the light visual system.

Do not automatically create a full dark mode unless explicitly included in a later requirement.

The architecture should use design tokens so dark mode could be introduced later without rewriting every component.

---

# 59. Imagery

Visual richness should primarily come from:

* Tonito and Manuela;
* subtle atmospheric backgrounds;
* meaningful health/service imagery where necessary.

Avoid filling screens with:

* generic medical stock photography;
* 3D medical icons;
* floating organs;
* decorative pills;
* unnecessary illustrations.

The application should feel human rather than clinically decorative.

---

# 60. Branding Hierarchy

Primary:

**SAAJ Virtual**

Human interaction identities:

**Tonito**
**Manuela**

Development attribution:

**NCAI Consultorias e Serviços, EI**

Infrastructure providers must not visually compete with these identities.

---

# 61. Component Reuse

The implementation should build reusable design-system components rather than individually styling every screen.

Examples:

```text
Button
IconButton
GlassDock
AssistantCard
AssistantAvatar
ConversationRow
FilterPill
BottomSheet
ChatBubble
ChatComposer
SettingsRow
ServiceCard
PrivacyBadge
PageHeader
EmptyState
```

Assistant-specific styling should be passed through variants/tokens rather than duplicated components.

Example:

```tsx
<AssistantCard assistant="tonito" />
<AssistantCard assistant="manuela" />
```

rather than:

```text
TonitoCard.tsx
ManuelaCard.tsx
```

unless a genuine structural difference later requires it.

---

# 62. Design Tokens

The implementation should centralise design tokens for:

* colours;
* typography;
* spacing;
* radii;
* shadows;
* blur;
* motion;
* breakpoints;
* z-index layers.

Do not scatter arbitrary values throughout components.

This will allow the visual system to be refined globally.

---

# 63. Visual Consistency Rule

Before introducing a new visual pattern, first determine whether an existing component can solve the requirement.

The application should not accumulate:

* multiple button styles;
* multiple card systems;
* inconsistent shadows;
* random radii;
* unrelated modal patterns;
* inconsistent icon sizes.

Consistency is more important than visual novelty.

---

# 64. Restraint Rule

When choosing between:

```text
More decoration
```

and:

```text
More clarity
```

choose clarity.

When choosing between:

```text
More glass
```

and:

```text
Better readability
```

choose readability.

When choosing between:

```text
More animation
```

and:

```text
Faster access
```

choose faster access.

The premium character of SAAJ Virtual should come from precision, spacing, typography, human imagery and subtle detail — not visual excess.

```

This locks the visual language without over-constraining the coding agent to exact pixel values before we see the actual implementation.

Next is **`03-first-time-onboarding.md`**, where we can get very specific about the first-ever experience: Welcome → Mozambique SVG → Inhambane drill-down → Tonito/Manuela selection → **Option C assistant contact profile**, including what happens for every geographic branch.
```
