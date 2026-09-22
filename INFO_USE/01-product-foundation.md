Locked. Let's move to \*\*`01-product-foundation.md`\*\*. This one establishes the behavioural rules of SAAJ Virtual so that later screen documents don't make conflicting decisions.



````markdown

\# SAAJ Virtual — Product Foundation



\## 1. Purpose



This document defines the core product principles and behavioural rules that must remain consistent throughout SAAJ Virtual.



While `00-project-overview.md` explains what the product is, this document defines \*\*how the product should behave\*\*.



All screens, components, integrations and future features must respect these principles.



\---



\# 2. Product Philosophy



SAAJ Virtual should feel like a private, approachable digital space where adolescents and young people can seek sexual and reproductive health information and support without unnecessary barriers.



The product should optimise for:



\- simplicity;

\- privacy;

\- trust;

\- low friction;

\- user choice;

\- continuity;

\- accessibility;

\- discretion.



The application should never feel like a complicated hospital portal, administrative system or generic AI chatbot.



\---



\# 3. No Mandatory Account



Version 1 must not require users to:



\- register;

\- create a username;

\- provide an email address;

\- create a password;

\- sign in before receiving support.



The basic journey should remain:



`Open → Locate → Choose assistant → Access support`



rather than:



`Open → Register → Verify → Login → Complete profile → Access support`



This is particularly important because users may arrive with:



\- sensitive questions;

\- limited time;

\- limited connectivity;

\- privacy concerns;

\- reluctance to provide identifying information.



Information required for a specific service may still be requested at the appropriate moment.



For example, appointment scheduling may require information necessary to complete the appointment.



That must not become a prerequisite for using SAAJ Virtual generally.



\---



\# 4. Anonymous Device Identity



When a user first completes onboarding, SAAJ Virtual should create an anonymous device/browser identity.



Conceptually:



```ts

{

&#x20; anonymousUserId: "generated-anonymous-id",

&#x20; onboardingCompleted: true,

&#x20; province: "Inhambane",

&#x20; district: "Maxixe",

&#x20; serviceArea: "maxixe"

}

````



This identity allows the application to recognise a returning installation/browser without requiring an account.



The identifier must not itself contain:



\* name;

\* telephone number;

\* email;

\* health condition;

\* conversation topic;

\* province/district;

\* other directly meaningful personal information.



Detailed implementation is defined in the persistence and privacy specifications.



\---



\# 5. First-Time vs Returning Users



The application must distinguish between:



\## First-time user



No valid onboarding state exists.



The user enters:



`Welcome → Location → Assistant selection → Assistant contact profile`



\## Returning user



Valid onboarding state exists.



The user enters:



`Início`



The user must not be forced through onboarding every time they return.



\---



\# 6. Location Is a Service Context



Location is collected primarily to determine what SAAJ Virtual services are available.



It must not feel like unnecessary data collection.



The application uses location to resolve:



```text

Actual location

&#x20;       ↓

Service area

&#x20;       ↓

Available capabilities

```



Examples:



```text

Inhambane → Maxixe

&#x20;       ↓

serviceArea = maxixe

&#x20;       ↓

Message + Call + Appointment

```



```text

Inhambane → Massinga

&#x20;       ↓

serviceArea = massinga

&#x20;       ↓

Message + Call + Appointment

```



```text

Maputo City

&#x20;       ↓

serviceArea = geral

&#x20;       ↓

Message

```



The user's actual selected province/district should remain distinct from the logical service area.



\---



\# 7. Progressive Location Selection



The application should not ask users for more location information than necessary.



\### Outside Inhambane



If the selected province is not Inhambane, the user can be routed to `geral` without requiring district selection during initial onboarding unless a later requirement makes it necessary.



\### Inhambane



If the user selects Inhambane, the application asks for the district because:



\* Maxixe has enhanced services;

\* Massinga has enhanced services;

\* other districts route to Geral.



This keeps onboarding short.



\---



\# 8. Tonito and Manuela Are Contacts



Tonito and Manuela must be treated conceptually as \*\*two contacts within SAAJ Virtual\*\*.



They are not:



\* separate applications;

\* separate user accounts;

\* permanent modes;

\* mutually exclusive choices.



A user can interact with both.



The product should therefore use familiar social/messaging interaction patterns.



\---



\# 9. Assistant Selection Is Not Permanent



When the user selects Tonito or Manuela during onboarding, this should not be interpreted as:



> "I only want to use this assistant forever."



It means:



> "This is who I want to start with."



The user must remain free to access the other assistant later.



No assistant switch may:



\* delete conversations;

\* overwrite another assistant's sessions;

\* hide history permanently;

\* require onboarding again.



\---



\# 10. First Assistant Selection Behaviour



During first-time onboarding, the user reaches:



\*\*Com quem preferes começar?\*\*



Options:



\* Tonito

\* Manuela



Selecting an assistant must open that assistant's \*\*Contact Profile\*\*.



It must not immediately force the user into a text conversation.



This is intentional.



For supported locations, the user may want to:



\* send a message;

\* make a voice call;

\* arrange an appointment.



The Contact Profile therefore becomes the gateway to the available channels.



\---



\# 11. Assistant Contact Model



Conceptually:



```text

&#x20;             TONITO / MANUELA

&#x20;                    │

&#x20;             Contact Profile

&#x20;                    │

&#x20;       ┌────────────┼────────────┐

&#x20;       │            │            │

&#x20;    Message        Call      Appointment

&#x20;       │            │            │

&#x20;  Voiceflow       Vapi        Cal.com

```



Available actions depend on location.



\### Maxixe / Massinga



```text

Message

Call

Book appointment

```



\### Geral



```text

Message

```



Unsupported functionality should normally be omitted rather than presented as a prominent disabled feature.



\---



\# 12. Channel Availability Must Be Honest



The interface must never imply that a service is available when it is not.



For example, a user routed to Geral should not see:



`Ligar`



if there is no actual calling capability for that service area.



Likewise, they should not see:



`Marcar encontro`



if appointment scheduling is unavailable.



The UI should adapt naturally to capability.



\---



\# 13. One Application, Multiple Agent Configurations



The application internally uses six Voiceflow experiences:



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



Users must never see this technical complexity.



They only choose:



1\. where they are;

2\. Tonito or Manuela.



The application performs the routing.



\---



\# 14. SAAJ Owns the Interface



Third-party services provide capabilities, not the product experience.



Therefore:



```text

Voiceflow → conversational intelligence

Vapi      → voice infrastructure

Cal.com   → scheduling infrastructure

n8n       → automation

```



but:



```text

SAAJ Virtual → user experience

```



The UI must not become a collection of visibly disconnected third-party products.



Where technically possible, external functionality should be embedded or wrapped within the SAAJ design system.



\---



\# 15. Conversation Ownership



Every conversation belongs permanently to the assistant with whom it was created.



Conceptually:



```ts

{

&#x20; conversationId: "...",

&#x20; assistant: "manuela",

&#x20; serviceArea: "maxixe",

&#x20; sessionId: "...",

&#x20; createdAt: "...",

&#x20; updatedAt: "..."

}

```



If a conversation started with Manuela, reopening it must continue with Manuela.



If it started with Tonito, reopening it must continue with Tonito.



The currently selected conversation filter must never change conversation ownership.



\---



\# 16. Service-Area Ownership



A conversation should also preserve the service context under which it was created.



For example:



```ts

{

&#x20; assistant: "manuela",

&#x20; serviceArea: "maxixe"

}

```



If the user later changes their location to Maputo, that must not silently transform the historical Manuela Maxixe session into Manuela Geral.



Existing conversations preserve their original routing/session identity.



New conversations use the user's current service area.



\---



\# 17. Conversation Dashboard Model



`Conversas` is one unified inbox.



It must not be implemented as two completely separate conversation systems.



Filters:



```text

Todas | Tonito | Manuela

```



\### Todas



Shows conversations with both assistants.



\### Tonito



Shows only Tonito conversations.



\### Manuela



Shows only Manuela conversations.



This behaves similarly to familiar messaging-app inbox filters.



\---



\# 18. Starting a New Conversation



A persistent/floating `+` action is available from the conversation dashboard.



Tapping it opens the assistant choice:



```text

Nova conversa



Com quem queres falar?



\[ Tonito ]



\[ Manuela ]

```



After selection, the application creates a fresh conversation/session for the selected assistant and current service area.



A new conversation must not overwrite an existing conversation.



\---



\# 19. Resume vs New Conversation



The application must clearly distinguish:



\### Resume



User selects an existing conversation.



Result:



`Resume existing session`



\### New



User presses `+` and selects an assistant.



Result:



`Create new session`



These operations must never be confused.



\---



\# 20. Conversation Titles



Because a user may have multiple conversations with the same assistant, the dashboard should not consist only of repetitive labels such as:



```text

Manuela

Manuela

Manuela

Tonito

```



Threads should have concise contextual titles where technically appropriate.



Examples:



\* Métodos contraceptivos

\* Saúde menstrual

\* Marcação de consulta

\* Relações saudáveis

\* Prevenção de ITS



Titles should help users recognise conversations without exposing excessive sensitive information.



The privacy specification may impose additional rules on where these titles can appear.



\---



\# 21. Início Is Not the Conversation Dashboard



`Início` and `Conversas` have different responsibilities.



\### Início answers:



> What can I do now?



\### Conversas answers:



> What conversations have I had?



Início should therefore remain lightweight.



It may include:



\* Tonito;

\* Manuela;

\* continue latest conversation;

\* a small number of recent interactions;

\* appointment shortcut where available.



The complete conversation history belongs in `Conversas`.



\---



\# 22. Returning Home Behaviour



When a returning user opens the application, Início should adapt to their previous use without becoming over-personalised.



The application may remember the last assistant used and use this to determine ordering or emphasis.



For example:



```text

Last assistant = Manuela



Home:

Manuela first

Tonito second

```



Both assistants must remain clearly accessible.



\---



\# 23. Contextual Visual Identity



The application has a shared visual system.



Assistant identity adds contextual accents.



\### Neutral context



Used for:



\* onboarding;

\* Início;

\* Todas conversations;

\* Mais;

\* general navigation.



Primary character:



`white + near-black + glass`



\### Tonito context



Used for:



\* Tonito contact profile;

\* Tonito-filtered conversation view;

\* Tonito chat;

\* Tonito call.



Accent:



`ice/powder blue + cobalt`



\### Manuela context



Used for:



\* Manuela contact profile;

\* Manuela-filtered conversation view;

\* Manuela chat;

\* Manuela call.



Accent:



`blush/rose + berry`



Colour must support context without making the product feel like two different applications.



\---



\# 24. User Choice Over System Assumption



When a meaningful user choice can be presented simply, SAAJ should prefer explicit choice over hidden assumptions.



Examples:



The user chooses:



\* Tonito or Manuela;

\* their location;

\* whether to message, call or book;

\* whether to start a new conversation;

\* whether to delete local data.



The system should not unnecessarily make sensitive assumptions about the user.



\---



\# 25. Sensitive Information Should Be Collected Just in Time



SAAJ Virtual must avoid collecting personal information simply because it might be useful later.



Information should be requested when required for a defined action.



For example:



\### General browsing/onboarding



Do not require:



\* full name;

\* phone number;

\* email;

\* health history.



\### Appointment



Collect information required to complete the appointment at the appropriate stage.



\### Health conversation



Ask only information required for safe and useful conversational support according to the approved assistant logic.



This is a \*\*just-in-time data collection principle\*\*.



\---



\# 26. Privacy Must Not Depend on User Expertise



Users should not need to understand:



\* cookies;

\* API architecture;

\* Voiceflow;

\* localStorage;

\* Vapi;

\* browser storage;

\* database architecture;



to use SAAJ safely.



Privacy controls and explanations must use understandable language.



Technical detail can exist in formal privacy information where required.



\---



\# 27. Quick Exit



Sensitive interaction screens should provide a discreet quick-exit mechanism.



The primary contexts are:



\* chat;

\* assistant contact/profile;

\* voice-call experience where technically appropriate.



The control should:



\* be easy to reach;

\* not dominate the interface;

\* exit the sensitive view quickly;

\* avoid revealing sensitive context after activation.



Detailed behaviour is defined in the privacy/safety specification.



\---



\# 28. Appointment Communication



Appointment operational messaging is separate from general application engagement.



When an appointment is successfully created, the service may send:



\* appointment confirmation by SMS;

\* reminder approximately one day before the appointment.



This does not require a general push-notification preference system in Version 1.



\---



\# 29. No Motivational Notification System in V1



Version 1 must not implement daily or recurring motivational notifications.



A future feature may provide supportive messages based primarily on interests explicitly selected by the user.



This capability is deferred.



The V1 UI should not contain settings for a feature that does not yet exist.



\---



\# 30. Familiar Interaction Patterns



SAAJ should use interaction models users are likely to recognise.



Examples include:



\* contact profiles;

\* conversation inboxes;

\* filters;

\* floating new-message action;

\* bottom sheets;

\* bottom navigation;

\* message composers.



The goal is not to visually copy WhatsApp or Telegram.



The goal is to reduce the learning curve by using familiar behavioural patterns.



\---



\# 31. Progressive Disclosure



The application should reveal complexity only when needed.



For example:



```text

Home

↓

Choose Manuela

↓

Contact Profile

↓

Choose Message

↓

Chat

```



rather than displaying every possible service, configuration and setting simultaneously.



Likewise:



```text

Choose Inhambane

↓

Now show districts

```



rather than showing every district in Mozambique from the beginning.



\---



\# 32. Minimise Dead Ends



Every major screen should provide an obvious next action.



Examples:



\### Empty Tonito conversations



Show:



`+ Nova conversa`



\### No previous conversations



Provide assistant access.



\### Appointment unavailable



Do not lead the user into an unusable scheduler.



\### Calling unavailable



Do not expose a call action that fails after interaction.



\---



\# 33. Error Behaviour



Errors should be communicated in human language.



Avoid:



```text

VOICEFLOW API ERROR 401

```



Prefer:



```text

Não foi possível iniciar a conversa agora.



Tenta novamente dentro de alguns instantes.

```



Technical errors should be logged separately for diagnosis.



Sensitive technical information must never be exposed to the user.



\---



\# 34. Connectivity Awareness



SAAJ Virtual depends on online services for major Version 1 functionality.



The interface must therefore handle:



\* slow connections;

\* temporary disconnection;

\* failed requests;

\* retries;

\* loading states.



The application should never leave the user staring at an unexplained frozen screen.



Offline-capable functionality may be expanded later but should not be falsely promised in Version 1.



\---



\# 35. Accessibility and Digital Literacy



Interfaces should favour:



\* clear labels;

\* recognisable icons accompanied by text where useful;

\* adequate tap targets;

\* readable text sizes;

\* strong contrast;

\* simple navigation;

\* concise language;

\* limited simultaneous choices.



Important functionality must not depend solely on colour.



\---



\# 36. Health Information Is Not Generic AI Content



SAAJ Virtual operates in a health context.



Health-related responses must follow the approved conversational instructions and knowledge sources.



The product must not encourage the frontend or unrelated generative components to independently invent health guidance.



The conversational health layer remains governed by the approved SAAJ assistant architecture and knowledge base.



\---



\# 37. Product Identity vs Technology



Users interact with:



\* SAAJ Virtual;

\* Tonito;

\* Manuela.



They should not need to know they are interacting with:



\* Voiceflow;

\* Vapi;

\* Cal.com;

\* n8n;

\* Airtable;

\* other infrastructure providers.



Provider branding should only appear where legally or technically unavoidable.



\---



\# 38. Development Attribution



Product attribution belongs primarily in the About experience.



Use:



\*\*Developed by NCAI Consultorias e Serviços, EI\*\*



This should remain secondary to the SAAJ Virtual identity.



\---



\# 39. Future Compatibility



Version 1 should remain deliberately focused.



However, architecture should avoid unnecessarily blocking future additions such as:



\* supportive opt-in messages;

\* telemedicine;

\* additional districts with enhanced services;

\* additional health facilities;

\* additional communication channels;

\* optional cross-device identity;

\* expanded public health content.



Future compatibility does not mean building these capabilities now.



\---



\# 40. Decision Hierarchy



When implementation choices conflict, use the following priority order:



1\. User safety

2\. Privacy and confidentiality

3\. Correct health-service behaviour

4\. Simplicity and accessibility

5\. Reliability

6\. User experience

7\. Visual polish

8\. Technical convenience



Technical convenience must never override user safety, privacy or correct service routing.



\---



\# 41. Product Rule Summary



Every SAAJ Virtual implementation should preserve the following:



\* No mandatory account in V1.

\* First-time onboarding occurs once per valid local installation/browser state.

\* Returning users enter through Início.

\* Location determines service capability.

\* Maxixe and Massinga receive enhanced services.

\* Geral receives text support.

\* Tonito and Manuela are contacts, not separate apps.

\* Users can interact with both assistants.

\* Selecting one assistant never deletes the other's history.

\* Conversations retain their assistant and original service context.

\* Existing conversations resume existing sessions.

\* New conversations create new sessions.

\* Conversas is a unified inbox with `Todas`, `Tonito` and `Manuela` filters.

\* SAAJ owns the interface.

\* Voiceflow, Vapi and Cal.com operate behind the product experience.

\* Sensitive data is collected only when needed.

\* Unsupported services are not falsely presented as available.

\* Privacy is a product feature, not merely a legal document.

\* V1 remains focused while preserving room for future expansion.



```



This gives us the behavioural foundation. \*\*`02-design-system.md`\*\* is next, and that one can finally lock the actual visual language: typography, neutral palette, Tonito/Manuela palettes, glass levels, radii, shadows, buttons, cards, navigation, portraits, iconography, spacing and the rules that prevent the UI from becoming over-glassified.

```



