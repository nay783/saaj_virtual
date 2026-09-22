# SAAJ Virtual — Project Overview

## 1. Purpose of This Document

This document provides the high-level product definition for **SAAJ Virtual**.

It establishes:

- what SAAJ Virtual is;
- who the platform is designed for;
- the main objectives of the application;
- the overall user experience;
- the role of Tonito and Manuela;
- the geographic service model;
- the major features included in Version 1;
- the major technologies supporting the experience;
- the boundaries of the first release.

Detailed behaviour, visual design, routing, integrations, privacy rules and individual screens are defined in the other specification documents.

---

## 2. Product Name

**SAAJ Virtual**

SAAJ Virtual is the identity presented to users throughout the application.

The application must consistently use **SAAJ Virtual** in all user-facing interfaces.

Underlying technology providers, APIs and automation platforms must not become part of the user-facing product identity.

---

## 3. Product Vision

SAAJ Virtual is a digital platform designed to make sexual and reproductive health information, guidance and access to services easier, more private and more approachable for adolescents and young people in Mozambique.

The experience should allow a young person to open the platform and quickly:

1. identify where they are;
2. choose whether they feel more comfortable interacting with **Tonito** or **Manuela**;
3. ask questions through text;
4. access voice support where available;
5. arrange an in-person appointment where available;
6. return later and continue previous conversations without being required to create an account.

The platform should feel like a trusted digital contact rather than a conventional institutional health portal.

---

## 4. Target Users

SAAJ Virtual is primarily designed for **adolescents and young people in Mozambique** seeking information, guidance or access to sexual and reproductive health services.

The application must therefore be:

- mobile-first;
- simple to understand;
- discreet;
- welcoming;
- privacy-conscious;
- low-friction;
- accessible to users with different levels of digital literacy;
- appropriate for sensitive health conversations.

The interface should avoid unnecessary medical or institutional complexity.

A user should be able to reach useful support with very few decisions.

---

## 5. Core Product Principles

SAAJ Virtual should be built around the following principles.

### 5.1 Privacy by Design

Sexual and reproductive health conversations can be highly sensitive.

Privacy must therefore influence:

- interface design;
- notification behaviour;
- conversation handling;
- local data storage;
- analytics;
- quick-exit functionality;
- user-facing language.

The platform should not expose sensitive conversation topics unnecessarily.

---

### 5.2 No Mandatory Account

Version 1 must **not require account registration, login, email address or password** before a young person can use SAAJ Virtual.

A user should be able to access support anonymously.

The application will use a device/browser-based anonymous identity and local persistence where required.

Detailed persistence rules are defined separately.

---

### 5.3 Human and Approachable

SAAJ Virtual should not feel like a generic AI chatbot.

The primary human-facing identities are:

- **Tonito**
- **Manuela**

They should feel like two trusted digital contacts within the same SAAJ Virtual service.

They are not separate applications.

---

## 6. Tonito and Manuela

Tonito and Manuela are the two assistant identities available within SAAJ Virtual.

Users may interact with either assistant.

They should not be permanently locked into one assistant.

A user may:

- speak with Tonito today;
- speak with Manuela later;
- maintain conversations with both;
- filter conversation history by assistant;
- start new conversations with either assistant.

Changing assistant must never delete previous conversations.

### Tonito

Tonito uses the SAAJ Virtual conversational intelligence configured for the Tonito experience.

His visual identity uses subtle:

- ice blue;
- powder blue;
- cobalt/electric blue accents.

### Manuela

Manuela uses the SAAJ Virtual conversational intelligence configured for the Manuela experience.

Her visual identity uses subtle:

- blush;
- pale rose;
- berry/raspberry accents.

The core application remains visually consistent across both assistants.

---

## 7. Geographic Service Model

SAAJ Virtual is intended to be accessible beyond the initial enhanced service locations.

However, the services available to a user depend on their selected location.

The application supports three logical service areas:

- **Maxixe**
- **Massinga**
- **Geral**

### 7.1 Maxixe

Users located in Maxixe may access:

- text conversations;
- voice calls;
- appointment scheduling.

### 7.2 Massinga

Users located in Massinga may access:

- text conversations;
- voice calls;
- appointment scheduling.

### 7.3 Geral

Users outside Maxixe and Massinga are routed to the general SAAJ Virtual experience.

They may access:

- text conversations.

Voice calling and appointment scheduling must not be presented as available where those services are not supported.

The application must preserve the user's actual selected province/district for appropriate routing and analytics even when the service area resolves to `geral`.

---

## 8. First-Time User Journey

The first time someone opens SAAJ Virtual, the application introduces the service before entering the normal application interface.

The intended journey is:

Welcome

→ Mozambique location selection

→ Province selection

→ If Inhambane: district selection

→ Tonito / Manuela selection

→ Selected assistant's contact profile

From the contact profile, available actions depend on the service area.

For Maxixe and Massinga:

- Message
- Call
- Book appointment

For Geral:

- Message

Selecting an assistant during onboarding does not permanently restrict the user to that assistant.

---

## 9. Returning User Journey

Once onboarding has been completed on a device/browser, the application should remember the relevant local state.

A returning user should therefore normally experience:

Open SAAJ Virtual

→ Início

The user should not repeatedly be required to:

- select Mozambique;
- select their province;
- select their district;
- repeat initial onboarding.

Location can later be changed from the appropriate settings area.

---

## 10. Primary Application Navigation

After onboarding, SAAJ Virtual uses three primary navigation destinations:

### Início

The contextual home screen.

Its purpose is to help the user decide what they want to do now.

It provides access to:

- Tonito;
- Manuela;
- continuing a recent conversation;
- relevant service shortcuts where available.

---

### Conversas

The communication history and conversation centre.

Conversation filters:

- **Todas**
- **Tonito**
- **Manuela**

Users can:

- resume an existing conversation;
- filter conversations by assistant;
- start a new conversation.

A floating `+` action starts the new-conversation flow and allows the user to choose Tonito or Manuela.

---

### Mais

The secondary settings and information area.

It contains items such as:

- location;
- privacy and data controls;
- information about SAAJ Virtual;
- help and support;
- terms and privacy information.

Detailed contents are defined in the dedicated `Mais` specification.

---

## 11. Assistant Contact Profiles

Tonito and Manuela each have a contact-style profile inspired by familiar messaging applications.

The profile acts as the gateway to the available communication channels.

For Maxixe and Massinga, it may provide:

- **Mensagem**
- **Ligar**
- **Marcar encontro**

For Geral, unsupported actions must not be offered as if they were available.

The contact profile should present SAAJ Virtual as the service identity while keeping Tonito or Manuela as the immediate conversational identity.

---

## 12. Text Conversations

Text conversations are powered by Voiceflow conversational agents.

There are six logical Voiceflow experiences:

### Tonito

- Tonito Maxixe
- Tonito Massinga
- Tonito Geral

### Manuela

- Manuela Maxixe
- Manuela Massinga
- Manuela Geral

The application determines the correct Voiceflow experience based on:

1. selected assistant;
2. resolved service area.

Users must never be asked to manually choose between these six technical agents.

---

## 13. Chat Interface Ownership

Voiceflow provides conversational intelligence and execution.

**SAAJ Virtual owns the user interface.**

The product should not be designed as six independently styled Voiceflow widgets.

A reusable SAAJ chat interface should control:

- assistant header;
- portrait;
- chat bubbles;
- composer;
- microphone interface;
- typing/loading states;
- conversation navigation;
- quick-exit controls;
- Tonito/Manuela visual themes.

The appropriate Voiceflow agent operates behind this interface.

This allows the SAAJ experience to remain visually consistent regardless of which Voiceflow agent is being used.

---

## 14. Voice Calling

Voice calling is available for supported service areas through Vapi.

Version 1 includes voice experiences for:

- Tonito Maxixe;
- Tonito Massinga;
- Manuela Maxixe;
- Manuela Massinga.

Vapi is an underlying technology provider and must not appear as the service identity in the user interface.

The user-facing action is simply:

**Ligar**

The call experience should visually remain inside SAAJ Virtual.

---

## 15. Appointment Scheduling

Appointment scheduling is available in:

- Maxixe;
- Massinga.

Scheduling is provided through Cal.com embedded within the SAAJ Virtual experience.

Maxixe and Massinga use their respective scheduling configurations.

The user should not feel that they have been unnecessarily redirected to an unrelated external product.

Appointment access may be available through:

- assistant contact profiles;
- relevant shortcuts from Início;
- contextual recommendations arising from conversations.

Appointment confirmation and reminder communication may be handled through SMS.

---

## 16. Conversation Continuity

Tonito and Manuela should behave like two contacts within the same communication ecosystem.

A user may have conversation history such as:

- Manuela — Saúde menstrual
- Tonito — Métodos contraceptivos
- Manuela — Marcação de consulta

Opening a previous Manuela conversation must resume that Manuela conversation.

Opening a previous Tonito conversation must resume that Tonito conversation.

The currently selected assistant or filter must never cause an existing conversation to be transferred to another assistant.

---

## 17. Anonymous Device-Based Experience

Version 1 uses a device/browser-based experience rather than mandatory user accounts.

The application may locally remember information such as:

- onboarding completion;
- anonymous device/user identifier;
- selected province;
- selected district;
- resolved service area;
- last or preferred assistant where applicable;
- local conversation references;
- relevant interface preferences.

This approach reduces barriers to accessing SAAJ Virtual.

Users must be given appropriate control over locally stored information.

---

## 18. Visual Direction

SAAJ Virtual should feel:

- modern;
- premium;
- youthful without appearing childish;
- calm;
- safe;
- private;
- human;
- lightweight.

The general interface uses:

- warm/clean white backgrounds;
- near-black typography;
- translucent glass surfaces;
- soft atmospheric gradients;
- large rounded surfaces;
- subtle shadows;
- generous whitespace;
- consistent modern iconography;
- human portraits as major visual elements.

Glassmorphism should be selective rather than applied to every surface.

The full visual system is defined in the dedicated Design System specification.

---

## 19. Responsive Strategy

SAAJ Virtual is **mobile-first**.

The primary design target is a young person accessing the service from a smartphone.

The experience must nevertheless adapt correctly to:

- mobile;
- tablet;
- desktop;
- installable/PWA-style contexts where applicable.

Desktop layouts should not simply stretch mobile screens across the entire viewport.

---

## 20. Public Discoverability

SAAJ Virtual should ultimately include a public, crawlable information layer in addition to the interactive application.

The objective is to allow useful SAAJ health information to be discoverable through search engines and AI-assisted search experiences.

Potential public information areas may include topics such as:

- sexual and reproductive health;
- contraception;
- menstruation;
- sexually transmitted infections;
- pregnancy;
- healthy relationships;
- where to seek support.

The interactive application and private conversations should not be relied upon as the sole source of public discoverability.

Detailed SEO and AI-discoverability requirements are defined in:

`19-seo-ai-discoverability.md`

---

## 21. Analytics and Service Improvement

SAAJ Virtual should support privacy-conscious measurement of service use.

Relevant dimensions may include:

- province;
- district;
- service area;
- assistant;
- interaction channel;
- age group where legitimately collected;
- conversation topic;
- risk classification;
- referrals;
- appointments;
- service utilisation.

Analytics must not override the privacy principles of the product.

Detailed event and data definitions are specified separately.

---

## 22. Version 1 Scope

Version 1 includes the core experience required to:

- onboard users;
- determine location;
- route users to the appropriate service configuration;
- access Tonito and Manuela;
- send and receive text messages;
- maintain conversation history;
- filter conversations;
- initiate new conversations;
- make supported voice calls;
- schedule supported appointments;
- return to the application without repeating onboarding;
- access privacy, location, help and service information.

---

## 23. Explicitly Deferred Features

The following concepts are recognised but are **not part of the initial Version 1 implementation**.

### 23.1 Mensagens para Mim

A future opt-in engagement feature that may provide supportive or motivational content.

Its primary personalisation source should be interests/topics explicitly selected by the user.

Potential interests include:

- well-being;
- self-care;
- healthy relationships;
- sexual health;
- motivation.

Content should come from an approved SAAJ content framework/library.

Sensitive conversation content must not automatically be exposed through lock-screen notifications.

---

### 23.2 Telemedicine

A future telemedicine capability may extend SAAJ Virtual beyond AI-supported guidance and in-person appointment scheduling.

Potential capabilities may include:

- remote access to a real healthcare professional;
- audio/video consultations;
- provider availability;
- virtual waiting rooms;
- appointment management;
- referral;
- continuity of care.

Version 1 should not implement telemedicine.

However, the architecture should avoid decisions that would make its future introduction unnecessarily difficult.

---

## 24. Development Credit

Where product development attribution is displayed, use:

**Developed by NCAI Consultorias e Serviços, EI**

This attribution should appear in the appropriate About section rather than competing with SAAJ Virtual as the primary user-facing identity.

---

## 25. Technology Overview

The current product architecture includes:

- **Next.js** — application/frontend;
- **Voiceflow** — text conversational agents and conversational logic;
- **Vapi** — supported voice assistant calls;
- **Cal.com** — appointment scheduling;
- **n8n** — automation and supporting workflows where appropriate;
- **Airtable / supporting data infrastructure** — operational and analytics data where applicable.

Additional technologies should only be introduced when they solve a defined product requirement.

Technology provider names should generally remain invisible to end users.

---

## 26. Product Architecture Summary

At the highest level:

SAAJ Virtual
│
├── Public information/discoverability layer
│
└── Interactive application
    │
    ├── First-time onboarding
    │   ├── Welcome
    │   ├── Location
    │   ├── Assistant selection
    │   └── Assistant contact profile
    │
    ├── Início
    │
    ├── Conversas
    │   ├── Todas
    │   ├── Tonito
    │   ├── Manuela
    │   └── Nova conversa
    │
    ├── Assistant experiences
    │   ├── Text
    │   ├── Voice where supported
    │   └── Appointment where supported
    │
    └── Mais
        ├── Location
        ├── Privacy/data controls
        ├── About
        ├── Help
        └── Terms/privacy

---

## 27. Definition of Success

SAAJ Virtual Version 1 succeeds when a young person can:

1. understand the service quickly;
2. enter without creating an account;
3. identify their location easily;
4. choose Tonito or Manuela naturally;
5. reach an appropriate communication channel with minimal friction;
6. receive useful and safe sexual and reproductive health support;
7. access additional services where available;
8. leave and later return without unnecessary repetition;
9. maintain access to previous conversations on the same device where technically supported;
10. feel that the experience is private, approachable and designed for them.

Every subsequent product and technical specification should support these objectives.