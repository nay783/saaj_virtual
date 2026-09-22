Absolutely. Next is **`15-privacy-safety-and-security.md`**. This one should be strict because SAAJ Virtual handles sensitive sexual and reproductive health conversations, including use by adolescents and young people.

````markdown
# SAAJ Virtual — Privacy, Safety & Security

## 1. Purpose

This document defines the privacy, safety and security requirements for SAAJ Virtual.

It governs:

- privacy by design;
- confidentiality language;
- anonymous access;
- sensitive health information;
- adolescents and young people;
- data minimisation;
- local and remote data;
- conversation history;
- Quick Exit;
- microphones and voice;
- appointments;
- provider integrations;
- logging;
- analytics;
- deletion and clearing;
- permissions;
- security boundaries;
- incident-safe behaviour.

The governing principle is:

```text
ACCESS TO SUPPORT
        +
MINIMUM NECESSARY DATA
        +
CLEAR USER CONTROL
        +
SECURE SYSTEM BOUNDARIES
        +
HONEST PRIVACY LANGUAGE
```

SAAJ Virtual must never create a false sense of privacy by promising protections that the technical architecture does not actually provide.

---

# 2. Privacy Is a Product Feature

Privacy must not exist only inside a legal policy.

It should influence:

- onboarding;
- navigation;
- conversation design;
- notifications;
- storage;
- appointments;
- voice calls;
- analytics;
- error handling;
- screen content;
- provider integrations.

The user should experience privacy through the design.

---

# 3. Sensitive Context

SAAJ Virtual may involve conversations concerning:

```text
sexual health
reproductive health
contraception
menstruation
pregnancy
sexually transmitted infections
relationships
violence or safety concerns
referrals
appointments
other personal health matters
```

These interactions can contain sensitive information.

The system should therefore minimise unnecessary exposure.

---

# 4. No Mandatory Account

SAAJ Virtual V1 does not require users to create:

```text
username
password
email account
public profile
SAAJ account
```

before accessing support.

This reduces friction and unnecessary identity collection.

---

# 5. Anonymous Access

A user may interact through an anonymous device/browser identity.

Conceptually:

```text
random anonymous ID
```

rather than:

```text
full identity
```

for ordinary product continuity.

---

# 6. Anonymous Does Not Mean No Data

SAAJ must not claim:

```text
"We collect no data."
```

if the service actually processes:

- conversation content;
- technical identifiers;
- selected location;
- appointments;
- voice calls;
- analytics;
- provider data.

A more accurate model is:

```text
You do not need to create an account.

Some information is processed when you use
the service so that SAAJ can provide support.
```

Final public wording must be reviewed against the actual production architecture.

---

# 7. Confidentiality Language Must Be Accurate

Avoid absolute claims such as:

```text
100% confidential
Completely anonymous
Nobody can ever see this
Nothing is stored
Your data never leaves your phone
```

unless technically and legally guaranteed.

Prefer carefully reviewed language such as:

```text
A tua privacidade é importante.

Não precisas de criar uma conta para
começar a usar o SAAJ Virtual.
```

Additional disclosure should explain actual data processing.

---

# 8. "Conversa Privada"

The interface may use a concise privacy cue such as:

```text
🔒 Conversa privada
```

This is a product reassurance signal.

It must not be interpreted internally as a claim that:

```text
no provider processes the conversation
```

or:

```text
nothing is stored anywhere
```

Detailed privacy information must remain accessible.

---

# 9. Data Minimisation

Collect only information required for:

```text
service delivery
safety
appointments
referrals
programme monitoring
legitimate operational needs
```

Do not collect information merely because it may be useful someday.

---

# 10. General Onboarding Must Remain Minimal

The onboarding process should not request:

```text
full name
phone number
email
exact date of birth
health history
sexual history
relationship history
appointment information
```

The required onboarding information is primarily:

```text
location
assistant choice
```

---

# 11. Just-in-Time Data Collection

Personal information should be requested only when the service requires it.

Example:

```text
General health question
→ no full identity required
```

but:

```text
Appointment booking
→ appointment information may be required
```

This is preferable to collecting everything at registration.

---

# 12. Explain Why Information Is Needed

Where appropriate, sensitive collection should have a clear purpose.

Example:

```text
Precisamos destes dados para
realizar a marcação.
```

Do not present unnecessary forms without context.

---

# 13. Location Privacy

V1 does not require automatic precise GPS location.

The user manually selects:

```text
province
district where required
```

for service routing.

This is preferable to collecting precise coordinates when they are unnecessary.

---

# 14. Do Not Request Precise Location by Default

Do not request:

```text
GPS coordinates
exact street address
continuous location
background location
```

unless a future feature has a clear, reviewed requirement.

---

# 15. Actual Location vs Service Area

Preserve:

```text
actual selected location
```

separately from:

```text
internal serviceArea
```

Example:

```ts
{
  province: "Inhambane",
  district: "Vilankulo",
  serviceArea: "geral"
}
```

Do not tell the user that their location is:

```text
Geral
```

because `Geral` is a routing category, not a place.

---

# 16. Health Conversation Data

Conversation content should be treated as sensitive.

It must not be casually:

- logged;
- exported;
- copied into generic analytics;
- included in URLs;
- shown in notifications;
- placed into unrelated systems.

---

# 17. Frontend Health Data

Avoid storing sensitive health content in long-lived frontend state unless required.

Do not put conversation text into:

```text
URL query parameters
browser route names
analytics page names
error tracking breadcrumbs
```

---

# 18. Sensitive URLs

Never create:

```text
/chat?topic=possible-pregnancy
```

or:

```text
/user/contraception-problem
```

Prefer opaque identifiers:

```text
/conversas/7f9a...
```

---

# 19. Conversation Titles

Conversation titles displayed on:

```text
Início
Conversas
```

should be privacy-conscious.

Prefer:

```text
Saúde menstrual
Contracepção
Relacionamentos
Marcação
```

over highly revealing summaries.

---

# 20. Conversation Previews

Previews can expose sensitive information to someone looking at the screen.

Therefore:

- keep them short;
- avoid unnecessarily explicit details;
- consider neutral preview text where appropriate.

Do not display large portions of sensitive messages in the inbox.

---

# 21. Lock-Screen Privacy

Future notifications must never reveal sensitive health details on the device lock screen.

Avoid:

```text
A tua pergunta sobre possível gravidez
tem uma nova resposta.
```

Prefer:

```text
SAAJ Virtual
Tens uma nova mensagem.
```

The same principle applies to future `Mensagens para Mim`.

---

# 22. No Sensitive Browser Notifications by Default

V1 does not require a general notification system.

Appointment SMS is a separate operational feature.

Do not add browser push notifications simply to increase engagement.

---

# 23. Appointment SMS

Appointment confirmations and reminders should reveal only the information necessary for the operational purpose.

Avoid unnecessary sensitive health-topic content.

Prefer neutral wording where practical.

---

# 24. Appointment Information

Appointment workflows may legitimately require:

```text
name
phone number
age
gender where required
neighbourhood/residence
service need
appointment date/time
```

Only request fields required by the approved booking workflow.

---

# 25. Appointment Data Is More Identifiable

Appointment information should be treated differently from ordinary anonymous app state.

Example:

```text
anonymous app user
```

may become identifiable during:

```text
appointment booking
```

This does not mean the entire historical product experience should automatically be converted into an identified profile.

---

# 26. Avoid Unnecessary Identity Linking

Do not automatically attach every previous anonymous interaction to an identifiable appointment record unless there is a defined service need and approved architecture.

Link only what is legitimately required.

---

# 27. Voice Calls

Voice interactions may contain sensitive information.

The call interface should clearly communicate when the microphone is active.

The user must have control over:

```text
starting the call
microphone permission
muting
ending the call
Quick Exit
```

---

# 28. Microphone Permission

Microphone access must follow a user action.

Example:

```text
User taps Ligar
      ↓
SAAJ requests microphone permission
```

Do not request microphone access silently during page load.

---

# 29. Microphone Denied

If permission is denied:

```text
do not repeatedly pressure the user
```

Provide a clear explanation and recovery path.

For example:

```text
Não foi possível usar o microfone.

Podes permitir o acesso nas definições
do navegador ou continuar por mensagem.
```

Exact copy may be refined.

---

# 30. Microphone Indicator

During active microphone use, the interface should clearly show:

```text
microphone active
```

or:

```text
microphone muted
```

Do not rely solely on browser-level indicators.

---

# 31. Text-Chat Microphone

For speech-to-text inside text chat:

```text
tap microphone
↓
speak
↓
transcribe
↓
place text in composer
↓
user reviews/edits
↓
user sends
```

Sensitive speech should not be automatically submitted.

---

# 32. Voice Recording Claims

Do not state:

```text
"This call is not recorded."
```

unless the actual Vapi/provider configuration and downstream architecture guarantee that.

Likewise, do not claim recording if it is not happening.

Public privacy language must reflect actual provider configuration.

---

# 33. Transcripts

Voice or text transcripts must not automatically be retained indefinitely.

Before production, define:

```text
whether transcripts are stored
where
why
for how long
who can access them
how deletion works
```

---

# 34. Quick Exit

Quick Exit is a privacy/safety mechanism for sensitive contexts.

It should be available where immediate concealment may matter.

Required contexts include:

```text
Assistant Contact Profile
Chat
Voice Call
```

It does not need to dominate neutral screens such as Início.

---

# 35. Quick Exit Visual Design

Quick Exit should be:

- visible;
- discreet;
- quickly reachable;
- clearly labelled;
- consistent across sensitive screens.

It should not require opening a multi-step menu.

Possible label:

```text
Sair rápido
```

Final Portuguese copy may be refined.

---

# 36. Quick Exit Is Not Normal Back

These actions have different meanings.

```text
Back
→ normal navigation
```

```text
Quick Exit
→ immediately leave sensitive context
```

Do not combine them.

---

# 37. Quick Exit Destination

Quick Exit should immediately navigate to a neutral, non-sensitive destination.

The exact destination should be centrally configured.

Possible strategies include:

```text
neutral SAAJ landing screen
```

or another approved safe destination.

The implementation must use one consistent policy.

---

# 38. Quick Exit Must Not Reveal the Sensitive Context

After Quick Exit, the destination must not display:

```text
conversation topic
assistant message
appointment concern
call transcript
```

on screen.

---

# 39. Quick Exit During Chat

Conceptually:

```text
User taps Quick Exit
        ↓
leave chat immediately
        ↓
navigate to neutral destination
```

The action does not automatically mean:

```text
delete conversation
```

unless explicitly designed that way.

---

# 40. Quick Exit During Voice Call

This requires stricter behaviour.

If an active call exists:

```text
Quick Exit
      ↓
terminate active call
      ↓
stop microphone/audio session
      ↓
leave sensitive call screen
      ↓
navigate to neutral destination
```

Audio must not continue after the user has attempted to leave the sensitive context.

---

# 41. End Call vs Quick Exit

These are different.

### End Call

```text
end active call
↓
remain within SAAJ
↓
show post-call state
```

### Quick Exit

```text
end active call
↓
leave sensitive context immediately
↓
neutral destination
```

---

# 42. Quick Exit Must Not Make False Browser Claims

A web application generally cannot guarantee deletion of:

```text
browser history
browser cache
network records
provider records
operating-system traces
```

Therefore Quick Exit must not claim:

```text
"All traces have been deleted."
```

unless that is genuinely implemented and verifiable.

---

# 43. Quick Exit and Local Data

Quick Exit should not automatically destroy all local SAAJ state.

Otherwise accidental use could erase:

```text
location
onboarding
conversation references
```

Quick Exit and data deletion are separate controls.

---

# 44. Quick Exit and Drafts

A sensitive unsent draft should not remain visibly displayed after Quick Exit.

Whether the draft is:

```text
discarded
```

or:

```text
temporarily preserved but hidden
```

must be decided deliberately.

For V1, the safer default for Quick Exit is to clear the active unsent draft from the visible sensitive session.

---

# 45. Quick Exit and Browser Back

After Quick Exit, browser Back should not trivially reveal the sensitive screen with its previous rendered content.

The implementation should reduce this risk through appropriate navigation/state handling.

However, do not claim that browser history has been erased if it has not.

---

# 46. Local Conversation Clearing

`Mais → Limpar conversas` should provide a deliberate way to remove locally stored conversation history/references according to the implemented architecture.

Require clear confirmation.

Example:

```text
Limpar conversas?

As conversas guardadas neste dispositivo
deixarão de aparecer aqui.

[Cancelar]
[Limpar]
```

Exact copy must match actual storage behaviour.

---

# 47. Clearing Conversations Is Not Remote Deletion

This distinction is mandatory.

If the action only removes local state, do not say:

```text
"All your data has been deleted."
```

Instead say clearly that data stored on this device is being removed.

---

# 48. Full Local Reset

A separate privacy action may be:

```text
Limpar dados deste dispositivo
```

This may remove:

```text
anonymous local ID
onboarding state
location
last assistant
conversation references
local transcripts
local preferences
```

depending on the implemented architecture.

---

# 49. Full Reset Requires Confirmation

Because the action is destructive:

```text
tap
↓
confirmation
↓
clear
```

Do not perform it accidentally from a single ambiguous tap.

---

# 50. Full Reset Does Not Cancel Appointments

Clearing device data must not silently:

```text
cancel a confirmed appointment
```

Appointments are separate operational records.

---

# 51. Full Reset Does Not Automatically Delete Provider Data

Unless a server-side deletion workflow explicitly exists, clearing the browser does not automatically delete:

```text
Voiceflow data
Vapi data
Cal.com bookings
Airtable records
n8n records
server logs
```

Privacy copy must state this accurately where relevant.

---

# 52. Remote Data Requests

If production policy provides a mechanism for users to request access, correction or deletion of remotely stored personal data, the privacy information should explain how.

Do not expose a non-functional:

```text
Delete everything
```

button merely for visual completeness.

---

# 53. No Device Fingerprinting

If local state is cleared:

```text
do not secretly reconstruct the user's identity
```

through:

```text
browser fingerprinting
canvas fingerprinting
device fingerprinting
hidden tracking identifiers
```

A new anonymous identity may be created.

---

# 54. Analytics

Generic product analytics should use the minimum information required.

Acceptable examples:

```text
screen viewed
assistant selected
conversation started
call started
appointment opened
province
service area
channel
```

subject to the approved analytics architecture.

---

# 55. Raw Health Text and Analytics

Do not send:

```text
conversation messages
transcripts
health concerns
appointment notes
```

to generic product analytics platforms.

Use structured categories where programme analysis requires them.

---

# 56. Analytics Event Example

Prefer:

```json
{
  "event": "conversation_started",
  "assistant": "manuela",
  "serviceArea": "maxixe"
}
```

not:

```json
{
  "event": "conversation_started",
  "firstMessage": "..."
}
```

---

# 57. Error Tracking

Error-monitoring tools can accidentally collect sensitive content.

Before adding any error-tracking provider, configure:

- payload scrubbing;
- URL scrubbing;
- form-value exclusion;
- sensitive-field filtering;
- controlled breadcrumbs.

---

# 58. Console Logging

Production code must not use:

```ts
console.log(messages);
console.log(userData);
console.log(appointment);
```

as a debugging habit.

Remove or sanitise sensitive development logging before production.

---

# 59. Server Logging

Server logs should focus on:

```text
request ID
timestamp
operation
provider
assistant
service area
error code
```

where appropriate.

Avoid full request/response payloads when they contain sensitive content.

---

# 60. Provider Credentials

Private credentials must remain server-side.

Examples:

```text
VOICEFLOW_ACCESS_TOKEN
VAPI_PRIVATE_API_KEY
CALCOM_API_KEY
AIRTABLE_ACCESS_TOKEN
n8n secrets
hashing salts
```

---

# 61. Public Keys

A key may reach the browser only when the provider explicitly defines it as a public client credential.

Current example:

```text
NEXT_PUBLIC_VAPI_PUBLIC_KEY
```

This does not make the private Vapi key public.

---

# 62. Secrets Must Not Be Stored Locally

Never put private credentials into:

```text
localStorage
sessionStorage
IndexedDB
cookies readable by JavaScript
frontend source
public Git repository
```

---

# 63. Secrets Must Not Appear in URLs

Never use:

```text
?apiKey=...
?token=...
```

for private provider credentials.

URLs can leak through:

- browser history;
- logs;
- referrers;
- screenshots.

---

# 64. Source Control

Production secret files such as:

```text
.env.local
```

must not be committed to source control.

Use an empty:

```text
.env.example
```

for documentation.

---

# 65. Secret Rotation

The architecture should allow credentials to be rotated without changing UI code.

If a credential is suspected to be exposed:

```text
revoke
↓
replace
↓
redeploy/restart
```

as required.

---

# 66. Browser Is Untrusted

Do not trust values merely because the SAAJ frontend sent them.

Validate server-side:

```text
assistant
serviceArea
conversation ownership
provider route
message shape
booking context
```

---

# 67. Conversation Ownership

An existing conversation must preserve its stored:

```text
assistant
serviceArea
session reference
```

A manipulated browser request must not be able to convert:

```text
Manuela Maxixe
```

into:

```text
Tonito Massinga
```

inside the same thread.

---

# 68. Capability Enforcement

Security and product rules should agree.

For example:

```text
Geral
```

must not be able to access a hidden call endpoint merely because the UI button is absent.

The server/provider layer should enforce the capability too.

---

# 69. Hiding a Button Is Not Security

Do not rely on:

```text
display: none
```

as the only protection against unsupported operations.

Backend validation must exist where the operation crosses a protected boundary.

---

# 70. Input Validation

Validate user-controlled input before using it in:

```text
API requests
database writes
provider requests
rendering
```

This includes:

```text
message content
assistant values
service area
conversation IDs
appointment parameters
```

---

# 71. Output Rendering

Treat provider-generated content as untrusted for rendering purposes.

Do not execute arbitrary:

```text
HTML
JavaScript
script tags
event handlers
```

returned through assistant content.

Use controlled text/rich-content rendering.

---

# 72. Cross-Site Scripting

The chat interface must safely escape or sanitise content according to the rendering architecture.

This applies to:

```text
user messages
assistant messages
conversation titles
appointment labels
provider errors
```

---

# 73. CSRF

State-changing server operations should use appropriate protection based on the application's authentication/session architecture.

Do not assume API routes are safe simply because they belong to the same Next.js project.

---

# 74. CORS

Sensitive server endpoints should accept only required origins.

Do not use unrestricted cross-origin access without a defined need.

---

# 75. Rate Limiting

Public endpoints should be protected against obvious abuse.

Examples:

```text
chat flooding
automated call creation
booking abuse
webhook abuse
```

Controls must remain proportionate so legitimate young users are not unnecessarily blocked.

---

# 76. Message Limits

Reasonable message-size limits may protect the service from abuse and accidental oversized payloads.

Limits should still allow a user to explain a concern naturally.

---

# 77. Webhooks

Webhook routes are public internet endpoints.

They must assume malicious requests are possible.

Where supported:

```text
verify provider signature
validate payload
validate event type
deduplicate event
```

before processing.

---

# 78. Webhook Idempotency

Repeated provider delivery must not produce:

```text
duplicate interactions
duplicate appointments
duplicate SMS reminders
```

Use stable event IDs.

---

# 79. Airtable

Airtable must not be directly exposed to the browser using a private token.

Writes should flow through:

```text
server
or
approved n8n workflow
```

---

# 80. Airtable Permissions

Production credentials should have the minimum permissions required.

Do not use unnecessarily broad workspace access if a narrower scope is available.

---

# 81. n8n

n8n contains operational workflows and potentially sensitive integrations.

Its editor and credentials must not be publicly accessible.

Protect:

```text
workflow editor
credentials
webhook administration
execution logs
```

appropriately.

---

# 82. n8n Execution Logs

Workflow execution history may contain sensitive payloads.

Review retention and payload visibility.

Avoid retaining unnecessary health information in execution logs.

---

# 83. Voiceflow

Voiceflow receives conversation content required to provide text support.

Only send data required for the assistant's function.

Do not inject unrelated user profile data into every conversation automatically.

---

# 84. Vapi

Vapi receives information required to provide the voice experience.

The production privacy notice must accurately reflect actual voice processing, storage and transcription configuration.

Do not infer provider behaviour from assumptions.

---

# 85. Cal.com

Cal.com receives appointment information required for scheduling.

Do not send the user's entire SAAJ conversation to Cal.com.

Pass only appointment-relevant data.

---

# 86. Data Flow Transparency

The privacy documentation should be able to answer:

```text
What information does SAAJ process?

Why?

Where does it go?

Which services help provide SAAJ?

How long is it kept?

What control does the user have?
```

in understandable language.

---

# 87. Third-Party Provider Names

Infrastructure providers do not need to dominate the normal user interface.

However, legally required privacy disclosures should accurately identify relevant processors/providers where required.

Product invisibility is not the same as legal invisibility.

---

# 88. Security in Transit

Production traffic should use:

```text
HTTPS
```

for:

- application access;
- server APIs;
- provider communication;
- webhooks where supported.

Do not transmit sensitive health data over plaintext HTTP.

---

# 89. Data at Rest

Where SAAJ controls a storage system containing sensitive information, appropriate protection at rest should be used.

The exact mechanism depends on the final infrastructure.

Do not claim:

```text
end-to-end encrypted
```

unless the architecture genuinely provides end-to-end encryption.

---

# 90. End-to-End Encryption Claims

Do not use messaging-app language such as:

```text
end-to-end encrypted
```

simply because HTTPS is enabled.

These are different protections.

---

# 91. Access Control

Sensitive operational systems should only be accessible to authorised personnel.

Examples:

```text
Airtable operational records
dashboard record-level data
n8n workflows
provider consoles
appointment records
```

---

# 92. Least Privilege

Staff and service accounts should have only the access required for their responsibilities.

Examples:

```text
dashboard viewer
≠
workflow administrator

programme analyst
≠
provider credential administrator
```

where the infrastructure supports this separation.

---

# 93. Shared Credentials

Avoid shared administrator passwords where individual accounts and access controls are available.

This improves:

- accountability;
- revocation;
- auditability.

---

# 94. Multi-Factor Authentication

Enable strong authentication and multi-factor authentication for administrative provider accounts where available.

This is especially important for:

```text
hosting
Voiceflow
Vapi
Cal.com
n8n
Airtable
source control
cloud infrastructure
```

---

# 95. Administrative Interfaces

Youth-facing users must never be able to reach administrative functionality merely by changing a URL.

Separate public application routes from protected operational/admin routes.

---

# 96. Dashboard Privacy

Programme dashboards should prefer aggregate data.

Avoid exposing:

```text
raw conversation text
full phone numbers
names
detailed clinical notes
```

unless a specific authorised operational workflow genuinely requires them.

---

# 97. Small-Number Disclosure

Combinations such as:

```text
District = small area
Age = 14
Topic = rare sensitive issue
Count = 1
```

can create identification risk.

Consider:

```text
suppression
grouping
minimum cell size
```

for sensitive programme analytics.

---

# 98. Data Exports

Exports can create additional uncontrolled copies of sensitive data.

Therefore:

- limit identifiable exports;
- apply role-based access;
- export only needed fields;
- protect exported files;
- avoid routine raw-data downloads.

---

# 99. Screenshots and Shared Devices

SAAJ cannot fully prevent:

```text
screenshots
someone looking over the user's shoulder
shared-device access
```

Design can reduce exposure but must not claim complete protection.

Quick Exit and privacy-conscious previews help mitigate these risks.

---

# 100. Shared Device Design

Because young users may share devices:

- avoid showing sensitive content unnecessarily on Home;
- keep conversation previews restrained;
- provide easy local clearing;
- provide Quick Exit;
- avoid account names/profile photos tied to identity.

---

# 101. Browser Autofill

Sensitive fields should not unintentionally expose prior entries through browser autofill.

Review autocomplete behaviour for:

```text
health concern
appointment details
phone
name
```

Use appropriate HTML autocomplete semantics.

Do not disable useful password/security behaviour globally without reason.

---

# 102. Clipboard

Do not automatically copy sensitive health information to the clipboard.

If future copy functionality is provided, it must require deliberate user action.

---

# 103. Downloads

Do not automatically download conversation transcripts or sensitive files.

Any future export/download feature should require explicit action and clear privacy consideration.

---

# 104. Caching

Sensitive authenticated or personalised responses should not be accidentally cached in shared public caches.

Review:

```text
Next.js caching
CDN behaviour
API cache headers
browser caching
```

for sensitive routes.

---

# 105. Search Indexing

Private application routes and conversations must not be indexed by search engines.

The SEO architecture applies to the **public information layer**, not private user interactions.

---

# 106. Public vs Private Web Layer

Conceptually:

```text
PUBLIC
├── health information
├── service information
├── about
└── public support pages

PRIVATE / NON-INDEXABLE EXPERIENCE
├── onboarding state
├── chat
├── calls
├── appointments
├── conversation history
└── personal settings
```

---

# 107. Robots and Metadata

Sensitive application routes should use appropriate:

```text
noindex
```

and related controls where necessary.

Do not rely on `robots.txt` as a security mechanism.

A route must still be secure/private even if a crawler ignores robots instructions.

---

# 108. Referrer Leakage

Avoid placing sensitive information in URLs partly because external navigation may expose URLs through referrer information.

Use an appropriate referrer policy for the application.

---

# 109. Content Security Policy

Production should consider an appropriate Content Security Policy.

It should permit only the resources required for:

```text
SAAJ
Voiceflow-related integration
Vapi
Cal.com
approved analytics
approved assets
```

while reducing script-injection risk.

The exact CSP should be based on the final integrations.

---

# 110. Security Headers

Production should consider appropriate headers such as:

```text
Content-Security-Policy
Referrer-Policy
X-Content-Type-Options
Permissions-Policy
Strict-Transport-Security
```

configured according to deployment requirements.

---

# 111. Permissions Policy

Browser capabilities such as:

```text
microphone
camera
geolocation
```

should only be enabled where needed.

V1 does not require:

```text
camera
precise geolocation
```

for normal SAAJ use.

---

# 112. Camera

SAAJ V1 should not request camera permission.

Voice calling is audio-only unless a future approved feature changes the requirement.

---

# 113. Telemedicine Future Boundary

Future telemedicine may introduce:

```text
camera
live professional
waiting room
clinical consultation
additional identity
stronger service records
```

Those requirements need a separate privacy/security review.

Do not pre-enable them in V1.

---

# 114. Minors and Young Users

SAAJ is designed for adolescents and young people.

Privacy design should therefore use:

- understandable language;
- minimal data collection;
- no manipulative consent;
- no unnecessary profiling;
- no behavioural advertising;
- no dark patterns.

---

# 115. No Advertising Profiles

Do not use sensitive SAAJ activity to create advertising or marketing profiles.

Examples to prohibit:

```text
contraception interest → ad targeting

pregnancy concern → marketing audience

STI question → advertising segment
```

---

# 116. No Sale of Sensitive Data

SAAJ health-related data must not be treated as a commercial dataset for sale.

Operational service providers should process data only according to approved purposes and agreements.

---

# 117. Consent Must Be Meaningful

Where consent is required:

- explain what is being requested;
- avoid legal jargon where possible;
- avoid preselected consent;
- do not bundle unrelated permissions.

---

# 118. Permission Is Not Consent for Everything

Example:

```text
microphone permission
```

means:

```text
browser may access microphone for the requested function
```

It does not automatically mean:

```text
user agreed to indefinite audio retention
```

These are separate issues.

---

# 119. Health Data Collection Consent

Where Voiceflow/Vapi workflows require explicit consent before collecting specific personal data, the assistant logic must obtain that consent according to the approved workflow.

The frontend must not bypass that requirement.

---

# 120. One Question at a Time

Sensitive data collection should remain conversational and manageable.

Where the approved assistant logic requires:

```text
Nome
Idade
Género
Bairro
Motivo
```

ask according to the defined workflow rather than presenting an unnecessarily intimidating data wall.

---

# 121. Data Already Provided

Do not repeatedly ask the user for sensitive information already validly collected within the active workflow unless confirmation is necessary.

This reduces frustration and unnecessary re-exposure.

---

# 122. Safety and Health Content

The frontend must not independently invent:

```text
diagnosis
medical treatment
risk classification
emergency guidance
referral recommendation
```

Health and safety behaviour must come from the approved assistant knowledge/instruction architecture.

---

# 123. High-Risk Situations

Where approved assistant logic identifies a situation requiring urgent support:

```text
assistant logic
↓
approved safety guidance
↓
appropriate referral/escalation
```

The frontend may visually emphasise the response.

It must not independently decide clinical urgency.

---

# 124. Frontend Safety Rendering

If Voiceflow returns an approved urgent guidance block, SAAJ may render it using a high-priority component.

Example:

```text
Important
[approved guidance]
```

The UI may improve visibility without changing clinical meaning.

---

# 125. No False Human Monitoring

Do not imply:

```text
A nurse is watching this conversation live.
```

unless a real operational workflow guarantees that.

Likewise, do not imply continuous emergency monitoring if none exists.

---

# 126. Assistant Status

A label such as:

```text
Disponível
```

must mean:

```text
the digital service is accessible
```

not:

```text
a human clinician is currently online
```

---

# 127. Digital Assistant Transparency

Tonito and Manuela must not be falsely represented as real human clinicians.

They may be designed as warm, human-like digital contacts, but product/privacy information should make their digital role appropriately understandable.

---

# 128. Professional Credentials

Do not label Tonito or Manuela:

```text
Dr.
Dra.
Enfermeiro
Enfermeira
Psicólogo
```

unless that identity and role are genuinely true and approved.

---

# 129. Human Referral

When human care is needed, distinguish:

```text
digital assistant
```

from:

```text
health professional
```

clearly.

---

# 130. Failure Safety

If a health assistant provider fails:

```text
do not generate substitute medical guidance
```

from arbitrary frontend fallback text.

Use a safe service-error message and recovery path.

---

# 131. Offline Safety

If the user is offline:

```text
do not show stale/generated content as though it were a new assistant response
```

Preserve drafts where appropriate and clearly indicate connectivity problems.

---

# 132. Appointment Failure

If booking fails:

```text
do not tell the user the appointment is confirmed
```

unless confirmation exists.

This is both a reliability and safety requirement.

---

# 133. Call Failure

If a voice call fails:

```text
do not imply the assistant heard the user
```

when the connection never became active.

Provide alternatives such as returning to the profile or using text.

---

# 134. Data Integrity

Sensitive operational records should use stable IDs and controlled transformations.

Avoid accidental association of:

```text
one user's interaction
```

with:

```text
another user's appointment
```

because of weak matching logic.

---

# 135. Do Not Match Users by Guessing

Do not link records based on probabilistic combinations such as:

```text
same first name
+
same age
+
same district
```

Use approved stable identifiers/relationships.

---

# 136. Pseudonymisation

Where possible, programme analytics should use:

```text
pseudonymous IDs
```

rather than directly identifying information.

Pseudonymisation reduces exposure but does not eliminate privacy obligations.

---

# 137. Hashing Phone Numbers

If a phone-derived User_ID is required:

```text
normalise phone
↓
server-side deterministic transformation
↓
pseudonymous User_ID
```

Use a private secret/salt as defined by the architecture.

Do not expose the transformation secret.

---

# 138. Raw Phone Number

Raw phone numbers should only be stored where needed for:

```text
appointment
service contact
SMS
other approved operational function
```

Do not copy them into every analytics table by default.

---

# 139. Retention

Before production, define retention periods for:

```text
conversation content
conversation metadata
voice transcripts
voice recordings if any
appointments
operational records
analytics
n8n execution data
logs
backups
```

Retention must be intentional.

---

# 140. No Indefinite-by-Default Retention

Do not use:

```text
keep forever
```

as the default merely because a provider allows it.

Retention should correspond to legitimate service, reporting and legal needs.

---

# 141. Backups

If sensitive records are backed up:

- backup access must be controlled;
- retention must be defined;
- deletion policies should account for backup realities;
- recovery should be tested.

Do not claim immediate universal deletion if backups make that impossible.

---

# 142. Data Breach Preparedness

Production operations should define a process for:

```text
suspected credential leak
unauthorised access
provider compromise
data exposure
misdirected records
```

At minimum:

```text
identify
contain
revoke credentials where necessary
investigate
document
follow applicable notification requirements
```

---

# 143. Security Updates

Application dependencies should be maintained.

Regularly review:

```text
Next.js
frontend dependencies
Vapi SDK
Cal.com embed package
server libraries
n8n
```

for security updates.

---

# 144. Dependency Minimisation

Avoid adding unnecessary packages.

Every dependency increases:

```text
maintenance
supply-chain risk
bundle size
attack surface
```

Use established libraries for defined needs.

---

# 145. Production Debugging

Disable development-only debugging interfaces and verbose errors in production.

Users must not see:

```text
stack traces
environment variables
provider payloads
database identifiers
```

---

# 146. Security Testing

Before production, test at minimum:

```text
secret exposure
route manipulation
unsupported capability access
XSS
API input validation
webhook spoofing
duplicate webhook delivery
local data clearing
Quick Exit
browser Back after Quick Exit
microphone permission behaviour
call termination
appointment routing
production logging
private route indexing
```

---

# 147. Quick Exit Testing

Test:

```text
Chat → Quick Exit

Contact Profile → Quick Exit

Active Call → Quick Exit
```

For active calls verify:

```text
call ends
microphone stops
audio stops
sensitive screen disappears
neutral destination appears
```

---

# 148. Shared-Device Testing

Test the application as though:

```text
another person picks up the phone
```

after the user:

- returns Home;
- uses Quick Exit;
- closes/reopens SAAJ;
- views Conversas;
- receives an appointment SMS.

Look for unnecessary exposure.

---

# 149. Provider Review Before Launch

Before production, review actual privacy/security settings for:

```text
Voiceflow
Vapi
Cal.com
n8n
Airtable
hosting provider
analytics provider if any
```

Do not rely only on development assumptions.

---

# 150. Public Privacy Information

The public privacy page should be understandable to a young user.

Recommended structure:

```text
What SAAJ Virtual is

What information we use

Why we use it

When personal information is requested

How conversations work

Voice calls

Appointments

Services that help us operate SAAJ

How long information may be kept

Your choices

How to clear information on this device

How to contact the service about privacy
```

Legal wording may supplement this, but should not replace clear explanations.

---

# 151. Privacy Information Must Match Reality

If architecture changes:

```text
provider
storage
retention
analytics
recording
transcription
```

review privacy copy.

Do not allow product documentation and actual implementation to diverge.

---

# 152. Development Attribution

The About screen may state:

```text
Desenvolvido por
NCAI Consultorias e Serviços, EI
```

This is development attribution.

It must not be confused with privacy/data-controller or healthcare-provider responsibility.

Those roles should be described accurately in formal privacy documentation.

---

# 153. Required Privacy States

The product must handle:

```text
anonymous first use
returning use
shared-device use
microphone permission requested
microphone permission denied
active voice call
Quick Exit during chat
Quick Exit during call
conversation clearing
full local reset
appointment collection
offline state
provider failure
storage unavailable
```

without creating misleading privacy behaviour.

---

# 154. Acceptance Behaviour

Privacy, safety and security are correctly implemented when:

- no account is required for ordinary access;
- anonymous identifiers contain no personal information;
- onboarding does not unnecessarily collect personal data;
- sensitive information is requested just in time;
- precise GPS is not required in V1;
- conversation content is treated as sensitive;
- health content does not appear in URLs;
- conversation titles and previews minimise unnecessary exposure;
- generic analytics do not collect raw conversation text;
- lock-screen notifications do not reveal health topics;
- appointment SMS uses privacy-conscious wording;
- identifiable appointment data is separated from ordinary anonymous state where possible;
- microphone permission follows deliberate user action;
- microphone state is visible;
- denied microphone access has a recoverable path;
- text-chat speech is reviewed before sending;
- the application does not make unsupported recording claims;
- transcript retention is explicitly defined before production;
- Quick Exit exists on sensitive screens;
- Quick Exit differs from ordinary Back;
- Quick Exit during an active call terminates the call and audio;
- Quick Exit does not falsely claim browser-history deletion;
- Quick Exit is separate from data deletion;
- local conversation clearing accurately describes what is removed;
- full local reset is separately confirmed;
- local clearing is not represented as universal server deletion;
- local clearing does not cancel appointments;
- device fingerprinting is not used to reconstruct cleared identity;
- private credentials never reach the browser;
- private credentials are not committed to source control;
- unsupported capabilities are enforced server-side where necessary;
- hiding UI controls is not treated as sufficient security;
- provider-generated content is safely rendered;
- webhook events are validated and deduplicated;
- Airtable is not directly exposed to the browser;
- operational systems have appropriate access controls;
- generic dashboards prefer aggregate data;
- small-number disclosure risk is considered;
- no behavioural advertising profiles are built from health activity;
- sensitive data is not sold;
- user permissions are not treated as blanket consent;
- Tonito and Manuela are not falsely represented as human clinicians;
- the system does not imply continuous human monitoring;
- provider failures do not trigger invented medical guidance;
- appointment success is never claimed without confirmation;
- data retention is explicitly defined;
- production logs avoid unnecessary sensitive content;
- private application routes are not search-indexed;
- security headers and browser permissions are deliberately configured;
- privacy copy accurately reflects the production architecture.

---

# 155. Final Privacy Model

```text
                           YOUNG PERSON
                                │
                                ▼
                         SAAJ VIRTUAL
                                │
                   ┌────────────┼────────────┐
                   │            │            │
                   ▼            ▼            ▼
               LOCATION       MESSAGE       VOICE
                   │            │            │
             minimum data       │       microphone only
                   │            │       when requested
                   │            │            │
                   └────────────┼────────────┘
                                │
                                ▼
                        SERVICE DELIVERY
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
         INFORMATION        REFERRAL         APPOINTMENT
                                                  │
                                                  ▼
                                          identifiable data
                                          only where needed


PRIVACY CONTROLS

┌──────────────────────────────────────────────┐
│ No mandatory account                         │
│ Minimal onboarding                           │
│ Just-in-time data collection                 │
│ Privacy-conscious previews                   │
│ Quick Exit                                   │
│ Clear conversations                          │
│ Clear local device data                      │
│ Transparent privacy information              │
└──────────────────────────────────────────────┘


SECURITY BOUNDARY

BROWSER
──────────────────────────────────────────────
✓ SAAJ interface
✓ minimum anonymous state
✓ approved public client credentials

✗ private API keys
✗ private access tokens
✗ hashing secrets
✗ Airtable credentials
✗ n8n credentials
──────────────────────────────────────────────
SERVER / APPROVED PROVIDERS


DATA PRINCIPLE

IDENTIFIABLE DATA
        │
        ▼
ONLY WHEN NECESSARY

SENSITIVE HEALTH DATA
        │
        ▼
PROTECTED + MINIMISED

PROGRAMME ANALYTICS
        │
        ▼
STRUCTURED + AGGREGATED WHERE POSSIBLE
```

The governing rule is:

```text
PRIVACY MUST NOT BE
A PROMISE CREATED BY THE INTERFACE.

IT MUST BE A PROPERTY
OF THE ARCHITECTURE.

SAAJ VIRTUAL SHOULD COLLECT
THE MINIMUM INFORMATION REQUIRED,
GIVE USERS MEANINGFUL CONTROL,
PROTECT SENSITIVE HEALTH INFORMATION,
AND BE PRECISE ABOUT WHAT
THE SYSTEM CAN — AND CANNOT —
KEEP PRIVATE OR DELETE.
```
````

Next is **`16-responsive-behaviour-and-motion.md`**. That will lock how the entire experience behaves across **mobile, tablet and desktop**, including the floating navigation, onboarding maps, assistant cards, Conversas, chat, contact profiles, call screens, Cal.com embed, safe areas, keyboard behaviour, breakpoints, transitions and reduced-motion accessibility.
