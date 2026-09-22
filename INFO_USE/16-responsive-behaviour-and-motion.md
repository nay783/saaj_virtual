Next is **`16-responsive-behaviour-and-motion.md`**. This should make sure the polished mobile-first concept survives implementation instead of becoming a desktop layout squeezed onto a phone.

````markdown
# SAAJ Virtual — Responsive Behaviour & Motion

## 1. Purpose

This document defines how SAAJ Virtual adapts across:

- mobile phones;
- tablets;
- laptops;
- desktop screens;
- different viewport heights;
- touch and pointer input;
- virtual keyboards;
- browser safe areas;
- reduced-motion preferences.

It also defines the motion language used for:

- navigation;
- onboarding;
- assistant selection;
- conversations;
- chat;
- assistant profiles;
- voice calls;
- appointments;
- sheets;
- loading states.

The governing principle is:

```text
MOBILE FIRST
     ↓
RESPONSIVE BY DESIGN
     ↓
LARGER SCREENS ADD SPACE AND CONTEXT
     ↓
THEY DO NOT CREATE A DIFFERENT PRODUCT
```

---

# 2. Mobile Is the Primary Experience

SAAJ Virtual should be designed first for a young person using a phone.

The mobile experience is not a reduced desktop version.

It is the primary product.

Design decisions should therefore begin with:

```text
small screen
touch interaction
one-handed use
mobile keyboard
variable connectivity
shared-device privacy
```

and progressively enhance larger screens.

---

# 3. Supported Layout Classes

Use responsive behaviour rather than device-specific layouts.

Conceptually:

```text
Mobile
0–639px

Tablet
640–1023px

Desktop
1024px+
```

These are implementation guidance rather than rigid device definitions.

Content should respond naturally between breakpoints.

---

# 4. Breakpoint Philosophy

Do not design only for:

```text
375px
768px
1440px
```

and assume everything between them works.

Components should use:

- flexible width;
- `min()`;
- `max()`;
- `clamp()`;
- CSS Grid;
- Flexbox;
- sensible maximum widths.

---

# 5. Mobile Content Width

On mobile:

```text
width: 100%
```

with page padding approximately:

```text
20–24px
```

depending on component.

Important interactive content should not touch the physical screen edges.

---

# 6. Desktop Content Width

Large screens should not stretch conversations and settings across the entire viewport.

Use constrained content widths.

Conceptually:

```css
.page-content {
  width: min(100%, 1200px);
  margin-inline: auto;
}
```

Individual reading surfaces may be narrower.

---

# 7. Reading Width

Long text should remain comfortably readable.

For informational/legal/help pages:

```text
~640–760px
```

is generally preferable to full desktop width.

---

# 8. Vertical Viewport

Do not assume:

```css
height: 100vh;
```

behaves correctly on every mobile browser.

Prefer modern dynamic viewport units where supported:

```css
min-height: 100dvh;
```

with appropriate fallbacks.

---

# 9. Safe Areas

Support devices with:

- notches;
- rounded screens;
- home indicators.

Use safe-area insets where appropriate:

```css
env(safe-area-inset-top)
env(safe-area-inset-bottom)
```

especially for:

- chat composer;
- floating navigation;
- call controls;
- bottom sheets.

---

# 10. Touch Targets

Primary interactive controls should generally provide at least approximately:

```text
44–48px
```

of usable touch area.

This applies to:

- buttons;
- icon buttons;
- filters;
- navigation;
- microphone;
- call controls;
- Quick Exit.

---

# 11. Hover Is Enhancement Only

No important feature may depend on hover.

Mobile users must be able to understand and activate every control without hover.

Desktop hover may provide:

- subtle elevation;
- tint;
- cursor feedback;
- tooltip where useful.

---

# 12. Focus States

Keyboard focus must remain visible on desktop and keyboard-capable devices.

Do not remove:

```css
outline
```

without replacing it with an accessible focus indicator.

---

# 13. Responsive Typography

Typography should scale gently.

Example:

```css
font-size: clamp(1.75rem, 4vw, 2.25rem);
```

for major headings.

Avoid extreme desktop heading sizes that overwhelm the calm product language.

---

# 14. Mobile Hierarchy

On mobile, each screen should have one dominant task.

Examples:

```text
Onboarding
→ choose location

Assistant Profile
→ choose communication method

Conversas
→ choose/resume conversation

Chat
→ communicate

Call
→ speak/end call

Appointment
→ choose booking
```

Avoid competing panels.

---

# 15. Desktop Philosophy

Desktop should feel intentionally designed.

Do not simply place the narrow mobile interface in the middle of a huge empty screen.

Use additional width for:

- stronger composition;
- contextual panels;
- two-column layouts where useful;
- larger portraits;
- better spatial balance.

But preserve the same information architecture.

---

# 16. Bottom Navigation

Primary application navigation remains:

```text
Início
Conversas
Mais
```

On mobile, use the floating glass dock defined by the design system.

---

# 17. Mobile Navigation Dock

Recommended approximate dimensions:

```text
width: 88–92vw
height: 64–70px
```

with:

```text
rounded glass surface
subtle border
soft shadow
backdrop blur
```

Position near the bottom while respecting safe areas.

---

# 18. Navigation Position

Conceptually:

```css
bottom:
  calc(
    12px +
    env(safe-area-inset-bottom)
  );
```

Exact spacing may be tuned visually.

---

# 19. Navigation Must Not Cover Content

Pages with the dock must reserve sufficient bottom space.

Example:

```text
content padding-bottom
=
dock height
+
dock offset
+
safe area
+
additional breathing room
```

Users must be able to scroll the last item fully above the dock.

---

# 20. Desktop Navigation

On larger screens, the navigation may remain a floating horizontal dock.

It does not need to become a conventional enterprise sidebar.

The SAAJ identity should remain lightweight and consumer-oriented.

---

# 21. Immersive Screens

The bottom navigation should generally be hidden during:

```text
active chat
voice call
appointment flow
assistant profile where appropriate
nested privacy/settings screens
```

These screens use their own Back navigation.

---

# 22. Onboarding Layout

Onboarding remains sequential at all sizes.

Do not expose every onboarding step simultaneously on desktop.

The sequence remains:

```text
Welcome
↓
Province
↓
District if required
↓
Assistant
↓
Contact Profile
```

---

# 23. Welcome Screen

Mobile:

```text
centered vertical composition
large breathing room
primary CTA near lower-middle area
```

Desktop:

```text
larger controlled composition
optional atmospheric visual area
content remains focused
```

Do not turn the welcome screen into a marketing website.

---

# 24. Mozambique Map

The map must be responsive SVG.

Mobile:

```text
map fills most available width
```

Desktop:

```text
larger map
but constrained to readable interactive scale
```

Do not stretch geographic geometry disproportionately.

---

# 25. Map Interaction

Each selectable region needs a sufficiently usable interaction area.

For small geographic shapes, the interaction hit area may be larger than the visible path where technically feasible.

---

# 26. Map Fallback

A map is not the only interaction method.

Provide:

```text
Escolher da lista
```

or an equivalent accessible alternative.

The list must produce the same routing state.

---

# 27. Map Labels

Labels should remain legible without excessive overlap.

Responsive strategies may include:

- repositioning labels;
- reducing secondary labels;
- external leader lines;
- accessible list alternative.

Do not make users pinch-zoom simply to identify a province/district.

---

# 28. Assistant Selection

Mobile:

```text
Tonito card
Manuela card
```

may appear vertically stacked where width is limited.

If two cards remain side-by-side, each must retain adequate portrait and text space.

---

# 29. Assistant Selection on Larger Screens

Tablet/desktop may use:

```text
[ Tonito ]    [ Manuela ]
```

with equal width and equal visual importance.

Neither assistant should appear recommended through size.

---

# 30. Assistant Card Motion

On selection:

```text
tap
↓
subtle scale/elevation
↓
contextual atmosphere strengthens
↓
transition to Contact Profile
```

Avoid dramatic spinning/flipping effects.

---

# 31. Assistant Contact Profile

Mobile:

```text
portrait
name
service identity
actions
privacy cue
```

in a vertically focused composition.

Desktop may use:

```text
portrait/context panel
+
actions/information panel
```

while preserving simplicity.

---

# 32. Contact Profile Portrait

Approximate mobile portrait:

```text
140–180px
```

Desktop may increase the portrait proportionally.

Do not allow it to become a full-screen decorative photograph.

---

# 33. Profile Actions

Mobile Maxixe/Massinga:

```text
[ Mensagem ] [ Ligar ]

[ Marcar um encontro ]
```

If width becomes too narrow:

```text
stack controls
```

rather than shrinking labels/touch targets excessively.

---

# 34. Geral Profile

For Geral:

```text
[ Mensagem ]
```

may occupy the primary full-width action position.

Do not preserve empty visual spaces where call/appointment buttons would have existed.

---

# 35. Início Layout

Mobile order:

```text
Greeting

Assistant access

Continue conversation

Recent conversations

Appointment shortcut
where available

Navigation
```

---

# 36. Início Tablet/Desktop

Additional width may allow:

```text
Assistant cards side by side

Continue/recent conversation panel
beside service shortcut
```

but the hierarchy remains assistant-first.

---

# 37. Avoid Dashboard Transformation

Desktop Home must not become:

```text
analytics dashboard
admin dashboard
12-card feature grid
```

It remains a youth-facing service home.

---

# 38. Conversas Mobile

Mobile Conversas structure:

```text
Header

[ Todas ] [ Tonito ] [ Manuela ]

Conversation rows

                 [+ FAB]

Bottom navigation
```

---

# 39. Conversation Filters

Filters should remain horizontally visible where possible.

On very narrow screens:

```text
reduce internal padding carefully
```

before allowing awkward wrapping.

If necessary, use horizontal scrolling without hiding selected state.

---

# 40. Conversation Rows

Mobile rows use the full content width.

Recommended structure:

```text
avatar
title + preview
timestamp
```

Avoid multi-column table behaviour.

---

# 41. Conversas Desktop

Desktop may use a two-pane experience:

```text
┌─────────────────────┬──────────────────────────┐
│ Conversation list   │ Selected conversation    │
│                     │                          │
│ Todas Tonito ...    │ Chat                     │
│                     │                          │
└─────────────────────┴──────────────────────────┘
```

This is allowed but not required for initial V1.

---

# 42. Desktop Two-Pane Rule

If implemented:

- URL/state must remain coherent;
- mobile still uses full-screen chat;
- selected conversation remains the same logical thread;
- no duplicate Voiceflow session is created;
- resizing must not restart the conversation.

---

# 43. Conversation FAB

Mobile:

```text
floating +
```

positioned above:

```text
bottom navigation
+
safe area
```

It must not collide with the navigation dock.

---

# 44. Desktop New Conversation

Desktop may keep the FAB or use a compact:

```text
Nova conversa
```

button near the conversation header.

The underlying behaviour remains identical.

---

# 45. Bottom Sheets

Mobile uses bottom sheets for lightweight decisions such as:

```text
Nova conversa
→ Tonito / Manuela
```

Bottom sheets should:

- animate from bottom;
- respect safe area;
- trap focus appropriately;
- support Escape on keyboard devices;
- have clear dismissal.

---

# 46. Desktop Dialog Adaptation

On larger screens, the same interaction may become a centered compact dialog.

Do not render a 500px-high bottom sheet across a large desktop screen merely for consistency.

Behaviour should be equivalent, not mechanically identical.

---

# 47. Chat Mobile

The mobile chat layout is:

```text
Header
──────────────
Messages
Messages
Messages
──────────────
Composer
```

The composer remains reachable above the mobile keyboard.

---

# 48. Chat Height

Use the available dynamic viewport rather than fixed pixel heights.

Conceptually:

```css
.chat {
  min-height: 100dvh;
  display: grid;
  grid-template-rows:
    auto
    minmax(0, 1fr)
    auto;
}
```

---

# 49. Chat Header

The chat header remains visible while messages scroll.

It may use:

```text
solid/translucent surface
subtle backdrop blur
```

but message readability takes priority.

---

# 50. Chat Message Area

Only the message region should scroll during active chat.

Avoid:

```text
page scroll
+
nested message scroll
+
composer movement
```

creating conflicting scroll behaviour.

---

# 51. Mobile Keyboard

When the keyboard opens:

- composer remains visible;
- latest relevant message remains accessible;
- layout should not jump excessively;
- bottom navigation is already hidden;
- safe-area calculations should update appropriately.

---

# 52. Keyboard Resize Testing

Test on:

```text
Android Chrome
iOS Safari
desktop browser with resized viewport
```

where available.

Virtual keyboard behaviour differs between browsers.

---

# 53. Composer

The composer begins compact and expands vertically for longer text.

Set a maximum height before internal composer scrolling begins.

Do not allow a long draft to push the entire conversation off screen.

---

# 54. Composer Controls

Keep:

```text
microphone
text input
send
```

reachable with one hand where possible.

Send should not become too small when the input grows.

---

# 55. Message Width

Mobile bubbles should generally remain within approximately:

```text
75–82%
```

of message area width.

Desktop bubbles should not expand indefinitely.

Use a sensible maximum bubble width.

---

# 56. Long Messages

Long assistant messages should:

- wrap naturally;
- support paragraphs;
- support lists;
- avoid horizontal scrolling;
- maintain readable line length.

---

# 57. Scroll Behaviour

When a new message arrives:

### If user is already near bottom

```text
smoothly reveal new message
```

### If user is reading older content

```text
do not force-scroll them to bottom
```

Optionally show:

```text
↓ Novas mensagens
```

or a jump-to-latest control.

---

# 58. Initial Chat Opening

When opening an existing conversation:

```text
position near latest message
```

without playing entrance animations for the entire historical transcript.

---

# 59. Chat Motion

New messages may use:

```text
opacity 0 → 1
translateY 4–8px → 0
```

over a short duration.

Avoid bouncing bubbles.

---

# 60. Typing Indicator

Typing/loading animation should be subtle.

For example:

```text
three soft dots
```

or gentle pulse.

It must respect reduced-motion preferences.

---

# 61. Assistant Theme Transitions

Entering Tonito:

```text
neutral
→ subtle cool blue atmosphere
```

Entering Manuela:

```text
neutral
→ subtle blush/berry atmosphere
```

Transition should feel environmental rather than like a full page recolour.

---

# 62. Voice Call Screen

The call experience should occupy the full available viewport.

Structure:

```text
assistant portrait

assistant name

call state

timer when connected


call controls
```

---

# 63. Mobile Call Layout

Controls remain within easy thumb reach near the lower portion of the screen.

Respect:

```text
safe-area-inset-bottom
```

especially for the End Call control.

---

# 64. Desktop Call Layout

Desktop may use a centered call stage:

```text
large portrait
controlled atmospheric background
horizontal control cluster
```

Do not stretch the portrait or controls across the full monitor.

---

# 65. Call Background

Use subtle atmospheric gradients/glows associated with the assistant.

Do not use distracting animated backgrounds that compete with conversation.

---

# 66. Call Portrait Motion

During connecting/connected states, optional motion may include:

```text
gentle scale
soft halo
subtle audio-reactive glow
```

only if technically tied to real state.

Do not simulate speaking when no audio event exists.

---

# 67. Call State Transitions

Example:

```text
Idle
↓
Requesting permission
↓
Connecting
↓
Connected
↓
Ending
↓
Ended
```

Each transition should be visually understandable.

Avoid abrupt layout replacement.

---

# 68. End Call Motion

When a call ends:

```text
active controls fade/settle
↓
portrait reduces slightly
↓
post-call actions appear
```

The transition should communicate completion.

---

# 69. Quick Exit Motion

Quick Exit is a safety action.

It should not wait for decorative animation.

On activation:

```text
perform required cleanup
↓
navigate immediately
```

Do not add long fades or cinematic exits.

---

# 70. Appointment Mobile Layout

The appointment flow should use the full practical content width.

Structure:

```text
SAAJ header

service location

Cal.com embed

safe bottom spacing
```

---

# 71. Appointment Embed Height

Avoid tiny embedded scrolling windows.

The scheduler should receive sufficient vertical space to behave naturally.

Where technically appropriate, let the appointment content determine/adapt its height.

---

# 72. Avoid Double Scrolling

The ideal appointment experience should avoid:

```text
page scroll
+
small iframe scroll
```

where possible.

Test the Cal.com embed specifically on mobile.

---

# 73. Appointment Desktop

Desktop may place the scheduler inside a centered panel with a controlled maximum width.

Example:

```text
~760–960px
```

depending on Cal.com's responsive behaviour.

---

# 74. Appointment Context

The SAAJ shell should remain visible enough that the user understands:

```text
where they are
which district/service they are booking
how to go back
```

---

# 75. Mais Mobile

Root Mais screen uses:

```text
page title
settings sections
settings rows
bottom navigation
```

Rows should remain large enough for touch.

---

# 76. Mais Desktop

Settings should remain in a constrained column rather than stretching full width.

Example:

```text
~640–760px
```

with comfortable surrounding whitespace.

---

# 77. Nested Settings Screens

Screens such as:

```text
Privacidade
Sobre
Ajuda
Termos
Localização
```

should generally use:

```text
Back
page title
content
```

and hide the floating bottom navigation where appropriate.

---

# 78. Location Change

Location-change maps reuse onboarding geographic components.

They should adapt responsively in exactly the same way as initial onboarding.

Do not create a second map implementation for settings.

---

# 79. Public Information Pages

SEO/public health pages have different reading needs from the app.

Mobile:

```text
single reading column
```

Desktop:

```text
main article column
+
optional navigation/context
```

Maintain strong readable line length.

---

# 80. Public-to-App CTA

Public health pages may contain:

```text
Falar com Tonito
Falar com Manuela
Abrir SAAJ Virtual
```

On mobile, these CTAs should be touch-friendly.

On desktop, they should remain visually clear without becoming oversized marketing banners.

---

# 81. Motion Philosophy

Motion should communicate:

```text
continuity
hierarchy
state
direction
feedback
```

not decoration for its own sake.

---

# 82. Motion Character

SAAJ motion should feel:

```text
soft
calm
precise
lightweight
human
```

Avoid:

```text
bouncy
game-like
hyperactive
dramatic
```

motion.

---

# 83. Motion Duration

Recommended ranges:

```text
Micro interaction
120–200ms

Standard transition
200–350ms

Major contextual transition
350–550ms
```

Longer animation should be rare.

---

# 84. Motion Easing

Prefer smooth natural easing.

Conceptually:

```css
cubic-bezier(0.2, 0.8, 0.2, 1)
```

or equivalent.

Avoid exaggerated elastic/spring motion unless extremely subtle.

---

# 85. Press Feedback

Buttons/cards may respond to press with:

```text
scale: ~0.98
```

or slight surface compression.

Keep the effect restrained.

---

# 86. Hover Feedback

Desktop pointer hover may use:

```text
slight elevation
small background shift
subtle border emphasis
```

Do not move elements significantly.

---

# 87. Navigation Motion

Changing primary tabs may use:

```text
short fade
+
small directional translate
```

while keeping the navigation dock stable.

The dock itself should not disappear/re-enter on every primary navigation change.

---

# 88. Shared Element Motion

Where technically practical, use shared visual continuity.

Example:

```text
Manuela Home portrait
        ↓
Manuela Contact Profile portrait
```

The portrait may smoothly enlarge/reposition.

This is enhancement, not a release blocker.

---

# 89. Onboarding Motion

Onboarding should feel like one continuous flow.

Conceptually:

```text
Welcome
↓
map enters
↓
selected geography receives focus
↓
assistant choices appear
↓
selected portrait transitions to profile
```

Avoid unrelated page transitions between every step.

---

# 90. Map Motion

Selecting a geographic region may use:

```text
subtle fill change
soft glow
very small scale/elevation
```

Do not distort the geography.

---

# 91. Bottom Sheet Motion

Opening:

```text
backdrop fade
+
sheet translate upward
```

Closing:

```text
sheet translate downward
+
backdrop fade
```

Keep it quick.

---

# 92. Modal Motion

Desktop dialogs may use:

```text
opacity
+
small scale from ~0.98
```

Avoid large zoom effects.

---

# 93. Loading Motion

Loading states should communicate activity without creating anxiety.

Prefer:

```text
skeleton
soft pulse
small spinner
typing dots
```

depending on context.

---

# 94. Skeletons

Skeletons should approximate the final layout.

Examples:

```text
conversation rows
assistant cards
appointment container
```

Do not use skeletons for instant local content.

---

# 95. Avoid Fake Loading

Do not intentionally delay fast operations merely to display polished animation.

If content is ready:

```text
show it
```

---

# 96. Reduced Motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Users requesting reduced motion should receive a functional, calm experience.

---

# 97. Reduced-Motion Behaviour

When reduced motion is enabled:

- remove large translations;
- remove parallax;
- remove unnecessary scale;
- disable decorative continuous animation;
- minimise shared-element motion;
- retain essential state changes.

---

# 98. Reduced Motion Does Not Mean No Feedback

Controls still need clear feedback.

Use:

```text
instant state change
small opacity change
border/background change
```

where appropriate.

---

# 99. Continuous Animation

Avoid continuous animation unless it communicates a live state.

Acceptable examples may include:

```text
active call audio response
connecting indicator
typing/loading
```

Avoid decorative endlessly moving gradients.

---

# 100. Parallax

Parallax is generally unnecessary in the application experience.

If used on public/marketing surfaces:

```text
very subtle
desktop enhancement only
reduced-motion disabled
```

It should never interfere with health-service usability.

---

# 101. Performance

Motion must remain smooth on ordinary mobile hardware.

Prefer:

```text
transform
opacity
```

for animation.

Avoid repeatedly animating expensive layout properties.

---

# 102. Blur Performance

Glassmorphism can be expensive.

Use:

```text
backdrop-filter
```

selectively.

Do not layer multiple large blurred surfaces over each other.

---

# 103. Low-Power Devices

The product should remain usable if:

```text
blur is reduced
animation is simplified
```

Performance matters more than decorative fidelity.

---

# 104. Image Performance

Assistant portraits should:

- use appropriate responsive dimensions;
- avoid oversized source files;
- reserve layout space;
- load efficiently;
- avoid visible layout shift.

---

# 105. Map Performance

SVG maps should be optimised.

Avoid enormous path complexity if it provides no visible benefit.

The map should become interactive quickly.

---

# 106. Chat Performance

Long conversation histories should not require rendering thousands of message nodes simultaneously.

Use:

```text
pagination
windowing where necessary
progressive history loading
```

without breaking reading continuity.

---

# 107. Appointment Performance

Load Cal.com only when the user enters the appointment experience.

Do not load appointment infrastructure on every Home page view.

---

# 108. Voice Performance

Load/initialise voice functionality when appropriate.

Do not request microphone access or begin expensive call setup merely because the Contact Profile opened.

---

# 109. Layout Shift

Reserve space for:

```text
portraits
navigation
conversation avatars
loading content
```

to reduce cumulative layout shift.

---

# 110. Orientation

SAAJ should work in:

```text
portrait
landscape
```

where browser/device permits.

Portrait remains the primary mobile orientation.

---

# 111. Landscape Mobile

Landscape may have very limited vertical space.

Prioritise:

```text
core content
controls
composer
call termination
```

over decorative spacing.

---

# 112. Small Screens

Test narrow devices around:

```text
320px
```

where practical.

Do not allow:

- clipped labels;
- inaccessible actions;
- horizontal page scrolling;
- overlapping navigation.

---

# 113. Large Screens

On very large desktop displays:

```text
content max-width
```

should prevent interfaces from becoming excessively spread out.

Atmospheric background can occupy excess space.

---

# 114. Zoom

The interface should remain usable at browser zoom levels.

Do not disable user zoom on mobile.

Avoid:

```html
user-scalable=no
```

---

# 115. Text Scaling

Layouts should tolerate increased system/browser text sizes.

Avoid fixed-height containers around important text.

---

# 116. Portuguese Labels

Responsive testing must use actual Portuguese labels.

Do not test only short English placeholders.

For example:

```text
Marcar um encontro
```

requires more width than:

```text
Book
```

---

# 117. Dynamic Content

Assistant responses are unpredictable in length.

Components must not assume fixed message sizes.

Likewise, appointment/service/error text should wrap naturally.

---

# 118. Empty States

Empty states should adapt without excessive vertical blank space.

Mobile may center within the available content region.

Desktop may use a constrained central illustration/message area.

---

# 119. Error States

Error actions must remain visible at all viewport sizes.

Do not place:

```text
Tentar novamente
```

below an inaccessible fixed-height panel.

---

# 120. Offline Banner

If an offline indicator is used, it should:

- remain compact;
- not permanently cover the header;
- not cover chat messages;
- disappear when connectivity returns.

---

# 121. Z-Index System

Use a controlled stacking hierarchy.

Conceptually:

```text
page
sticky header
floating navigation
FAB
backdrop
bottom sheet/dialog
critical overlay
```

Avoid arbitrary values such as:

```css
z-index: 999999;
```

throughout components.

---

# 122. Example Layer Tokens

Conceptually:

```css
--z-base: 0;
--z-sticky: 20;
--z-nav: 30;
--z-fab: 40;
--z-overlay: 50;
--z-modal: 60;
--z-critical: 70;
```

Exact values may vary.

---

# 123. Motion Tokens

Centralise motion.

Conceptually:

```css
--motion-fast: 160ms;
--motion-standard: 280ms;
--motion-slow: 450ms;

--ease-standard:
  cubic-bezier(0.2, 0.8, 0.2, 1);
```

Do not define random durations in every component.

---

# 124. Responsive Tokens

Useful layout tokens may include:

```css
--page-padding-mobile: 20px;
--page-padding-tablet: 28px;
--page-padding-desktop: 32px;

--content-max: 1200px;
--reading-max: 720px;
```

Exact values should align with visual implementation.

---

# 125. Component Responsiveness

Components should own their responsive behaviour where practical.

Example:

```text
AssistantCard
```

knows how its internal portrait/text/actions adapt.

Avoid large page files containing dozens of one-off media queries.

---

# 126. Container Queries

Container queries may be used where they improve reusable component behaviour.

They are particularly useful when the same component appears in:

```text
full page
two-column desktop panel
compact Home section
```

---

# 127. Route Transitions

Do not block navigation waiting for large animations to complete.

Navigation should remain responsive.

Motion follows state rather than delaying state unnecessarily.

---

# 128. Back Navigation

Back should feel immediate.

Do not replay entire entrance animations backwards if that makes navigation slow.

A short contextual transition is sufficient.

---

# 129. Browser Back

Browser Back should produce the same logical navigation state as visible Back controls where possible.

It must not:

- duplicate conversations;
- create new sessions;
- restart calls;
- accidentally submit bookings.

---

# 130. Resize Behaviour

Changing viewport size should not reset application state.

For example:

```text
desktop chat
↓
resize to mobile
```

must retain:

```text
same conversation
same draft
same session
```

where technically feasible.

---

# 131. Hydration

Responsive server/client rendering should avoid major visual changes after hydration.

Do not render one entirely different interface server-side and abruptly replace it after measuring the browser.

Use CSS responsiveness where possible.

---

# 132. Accessibility and Motion

Never communicate critical information solely through movement.

Example:

```text
appointment confirmed
```

must have visible textual confirmation.

Animation may reinforce it.

---

# 133. Accessibility and Colour

Responsive states must preserve the design-system rule:

```text
colour is not the only signal
```

Examples:

Tonito/Manuela filters should include text/selection state.

Call mute should include icon/state, not only colour.

---

# 134. Accessibility and Orientation

Do not lock the application to portrait orientation through web APIs.

Users may rely on landscape for accessibility reasons.

---

# 135. Screen Reader Order

Visual rearrangement at desktop breakpoints must preserve logical reading order.

Do not use CSS ordering that causes screen-reader navigation to become confusing.

---

# 136. Appointment Accessibility

Embedding Cal.com does not remove SAAJ's responsibility to test the overall booking journey.

Verify:

- keyboard access;
- mobile scrolling;
- focus movement;
- screen-reader labels where possible;
- readable contrast;
- successful return to SAAJ.

---

# 137. Motion Acceptance Behaviour

Motion is correctly implemented when:

- it explains state changes;
- it does not delay urgent actions;
- Quick Exit remains immediate;
- call termination remains immediate;
- reduced-motion preferences are respected;
- no critical action depends on animation;
- continuous decorative motion is avoided;
- ordinary mobile hardware remains smooth.

---

# 138. Responsive Acceptance Behaviour

Responsive behaviour is correct when:

- mobile is treated as the primary product experience;
- screens work around 320px width where practical;
- no important content requires horizontal page scrolling;
- tap targets remain usable;
- Portuguese labels do not clip;
- safe areas are respected;
- floating navigation never covers the final page content;
- FAB does not collide with navigation;
- keyboard does not hide the chat composer;
- message history remains usable while the keyboard is open;
- map interaction remains usable on small screens;
- an accessible list alternative exists for maps;
- assistant cards remain equal in importance;
- Contact Profile actions adapt without becoming tiny;
- Home remains a service home rather than a dashboard;
- conversation filters remain usable;
- conversation rows remain readable;
- desktop may use a two-pane inbox without creating duplicate sessions;
- chat bubbles maintain readable line lengths;
- opening historical chats does not animate the full history;
- call controls remain reachable;
- End Call remains prominent;
- appointment embed avoids unusably small nested scrolling;
- settings remain constrained and readable on desktop;
- public information pages have readable line lengths;
- browser zoom remains enabled;
- increased text size does not break important controls;
- viewport resizing does not reset conversation state;
- device orientation changes do not destroy application state;
- large screens do not excessively stretch the interface.

---

# 139. Screen Behaviour Summary

```text
                     MOBILE
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
     TOUCH         ONE TASK       FULL-WIDTH
   PRIORITY       PER SCREEN       CONTENT
        │              │              │
        └──────────────┼──────────────┘
                       │
                       ▼
                 SAAJ EXPERIENCE
                       │
                       ▼
                    TABLET
                       │
                       ▼
                MORE BREATHING
                   ROOM
                       │
                       ▼
                    DESKTOP
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
       MORE CONTEXT        BETTER SPATIAL
                            COMPOSITION
             │                   │
             └─────────┬─────────┘
                       │
                       ▼
              SAME PRODUCT MODEL
```

---

# 140. Motion Summary

```text
USER ACTION
     │
     ▼
IMMEDIATE FEEDBACK
     │
     ▼
STATE TRANSITION
     │
     ▼
SHORT, CALM MOTION
     │
     ▼
NEW STATE


MOTION SHOULD COMMUNICATE:

WHERE DID I GO?
WHAT CHANGED?
WHAT IS ACTIVE?
WHAT IS HAPPENING?


MOTION SHOULD NOT ASK:

DID THE APP FINISH
SHOWING OFF YET?
```

---

# 141. Final Principle

```text
SAAJ VIRTUAL SHOULD FEEL
NATIVE TO THE SCREEN
ON WHICH IT IS BEING USED.

MOBILE IS THE PRIMARY EXPERIENCE.

TABLET AND DESKTOP SHOULD USE
ADDITIONAL SPACE INTELLIGENTLY
WITHOUT CHANGING THE PRODUCT MODEL.

MOTION SHOULD MAKE THE EXPERIENCE
EASIER TO UNDERSTAND,
NOT HARDER TO USE.

CLARITY
BEATS ANIMATION.

RESPONSIVENESS
BEATS FIXED LAYOUTS.

PERFORMANCE
BEATS DECORATION.

AND SAFETY ACTIONS
ALWAYS BEAT MOTION.
```
````

That completes **`16-responsive-behaviour-and-motion.md`**.

The next file is **`17-future-features.md`**. It will be important to clearly separate **V1 from the roadmap**, especially the two features we already agreed not to build now: **`Mensagens para Mim`** (opt-in personalised wellbeing/SRH messages) and **telemedicine with real health professionals**, while ensuring today's architecture doesn't block either one.
