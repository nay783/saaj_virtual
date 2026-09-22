Next is **`18-acceptance-criteria.md`**. Unlike the previous specifications, this should be deliberately **test-oriented**: each criterion should be something the team can mark **PASS / FAIL / BLOCKED** before release.

````markdown
# SAAJ Virtual — Acceptance Criteria

## 1. Purpose

This document defines the release acceptance criteria for SAAJ Virtual V1.

It converts the product, UX, privacy, routing and technical specifications into testable requirements.

A production release should not be considered ready simply because:

```text
the pages exist
```

or:

```text
the interface looks correct
```

The complete user journey must work correctly.

The governing principle is:

```text
DESIGNED
    ↓
IMPLEMENTED
    ↓
INTEGRATED
    ↓
TESTED
    ↓
VERIFIED
    ↓
RELEASED
```

---

# 2. Acceptance Status

Each criterion should be recorded as:

```text
PASS
FAIL
BLOCKED
NOT APPLICABLE
```

Where useful, also record:

```text
tester
date
environment
device/browser
evidence
issue reference
```

---

# 3. Severity

Release issues should be classified approximately as:

```text
BLOCKER
Critical service/safety/privacy failure.

HIGH
Major functionality is broken or unreliable.

MEDIUM
Function works but has meaningful UX/reliability issue.

LOW
Minor visual/copy/polish issue.
```

A V1 production release should have:

```text
0 unresolved BLOCKER issues
0 unresolved HIGH issues affecting core journeys
```

Any exception requires an explicit release decision.

---

# 4. Core Journey

The minimum complete V1 journey is:

```text
FIRST USE

Open SAAJ
   ↓
Welcome
   ↓
Select location
   ↓
Choose Tonito / Manuela
   ↓
Assistant Contact Profile
   ↓
Message / Call / Appointment
where available


RETURNING USE

Open SAAJ
   ↓
Início
   ↓
Continue support
```

Both must work.

---

# 5. First Launch

### AC-001

Given no valid SAAJ state exists on the device,

when the user opens the application,

then the Welcome screen is shown.

**Expected:** PASS / FAIL

---

### AC-002

The first launch must not require:

```text
account
email
password
phone number
full name
```

before the user can begin.

---

### AC-003

The Welcome screen displays:

```text
SAAJ Virtual
```

as the product identity.

---

### AC-004

The Welcome screen provides a clear:

```text
Começar
```

action.

---

### AC-005

Primary bottom navigation is not displayed during onboarding.

---

# 6. Onboarding Privacy

### AC-006

General onboarding does not request:

```text
health concern
sexual history
pregnancy status
relationship history
full identity
```

---

### AC-007

Onboarding collects only information required to establish the initial service context.

---

# 7. Province Selection

### AC-008

After Welcome, the user can select a Mozambican province.

---

### AC-009

The Mozambique map works on mobile without requiring horizontal page scrolling.

---

### AC-010

The map has an accessible list-based alternative.

---

### AC-011

Selecting a province outside Inhambane does not unnecessarily request a district during first-time onboarding.

---

### AC-012

Selecting a province outside Inhambane resolves:

```text
serviceArea = geral
```

---

# 8. Inhambane Routing

### AC-013

Selecting:

```text
Inhambane
```

opens the district-selection step.

---

### AC-014

The district map/list allows selection of the supported Inhambane districts defined by the geographic dataset.

---

### AC-015

Selecting:

```text
Maxixe
```

resolves:

```text
province = Inhambane
district = Maxixe
serviceArea = maxixe
```

---

### AC-016

Selecting:

```text
Massinga
```

resolves:

```text
province = Inhambane
district = Massinga
serviceArea = massinga
```

---

### AC-017

Selecting another Inhambane district resolves:

```text
serviceArea = geral
```

while preserving the actual district.

Example:

```text
province = Inhambane
district = Vilankulo
serviceArea = geral
```

---

### AC-018

The UI does not display:

```text
Geral
```

as though it were the user's geographic location.

---

# 9. Location State

### AC-019

Actual geographic location and internal service area are stored separately.

---

### AC-020

The application derives service area centrally.

Individual pages must not implement conflicting geographic routing rules.

---

### AC-021

If stored:

```text
province
district
serviceArea
```

are inconsistent, the application recalculates the service area from the valid geographic state.

---

# 10. Back Navigation During Onboarding

### AC-022

Back navigation preserves valid previous selections.

---

### AC-023

Changing province from:

```text
Inhambane
```

to another province clears the previously selected Inhambane district.

---

### AC-024

Back navigation does not accidentally mark onboarding as complete.

---

# 11. Assistant Selection

### AC-025

After valid location selection, the user sees both:

```text
Tonito
Manuela
```

---

### AC-026

Tonito and Manuela receive equal visual importance.

---

### AC-027

The interface communicates that the user can use both assistants.

---

### AC-028

The initial choice does not permanently lock the user to one assistant.

---

### AC-029

Selecting an assistant opens the:

```text
Assistant Contact Profile
```

rather than immediately forcing the user into chat.

---

# 12. Onboarding Completion

### AC-030

Onboarding is considered complete after:

```text
valid location
+
initial assistant selection
+
entry into Assistant Contact Profile
```

---

### AC-031

Sending a first message is not required to complete onboarding.

---

### AC-032

Starting a call is not required to complete onboarding.

---

### AC-033

Booking an appointment is not required to complete onboarding.

---

# 13. Assistant Contact Profile

### AC-034

The profile displays the selected assistant's:

```text
portrait
name
SAAJ identity
available actions
```

---

### AC-035

The profile does not falsely present Tonito or Manuela as a human clinician.

---

### AC-036

The profile does not assign invented professional credentials.

---

### AC-037

If status text such as:

```text
Disponível
```

is used, it refers to digital-service availability rather than a human professional being online.

---

# 14. Maxixe Contact Profile

### AC-038

For Maxixe, Tonito shows:

```text
Mensagem
Ligar
Marcar um encontro
```

---

### AC-039

For Maxixe, Manuela shows:

```text
Mensagem
Ligar
Marcar um encontro
```

---

# 15. Massinga Contact Profile

### AC-040

For Massinga, Tonito shows:

```text
Mensagem
Ligar
Marcar um encontro
```

---

### AC-041

For Massinga, Manuela shows:

```text
Mensagem
Ligar
Marcar um encontro
```

---

# 16. Geral Contact Profile

### AC-042

For Geral, Tonito shows:

```text
Mensagem
```

---

### AC-043

For Geral, Manuela shows:

```text
Mensagem
```

---

### AC-044

For Geral, the UI does not show unsupported:

```text
Ligar
Marcar um encontro
```

actions as normal available services.

---

### AC-045

The absence of voice/appointment does not leave awkward empty button placeholders.

---

# 17. Capability Enforcement

### AC-046

Capability availability comes from a central service capability model.

---

### AC-047

Hiding an unsupported UI button is not the only protection.

Protected/server operations also validate the requested capability where appropriate.

---

### AC-048

A manipulated Geral request cannot start a Maxixe/Massinga Vapi call.

---

### AC-049

A manipulated Geral request cannot silently open a Maxixe/Massinga appointment flow.

---

# 18. Voiceflow Routing

The following routing matrix must pass:

| Location | Assistant | Expected Voiceflow |
|---|---|---|
| Maxixe | Tonito | Tonito Maxixe |
| Maxixe | Manuela | Manuela Maxixe |
| Massinga | Tonito | Tonito Massinga |
| Massinga | Manuela | Manuela Massinga |
| Geral | Tonito | Tonito Geral |
| Geral | Manuela | Manuela Geral |

---

### AC-050

All six combinations resolve to the correct Voiceflow configuration.

---

### AC-051

No Voiceflow combination silently falls back to another assistant.

---

### AC-052

No Voiceflow combination silently falls back to another service area.

---

# 19. Text Conversation Creation

### AC-053

Starting a new conversation creates a unique:

```text
conversationId
```

---

### AC-054

A new conversation receives a fresh Voiceflow session.

---

### AC-055

The new conversation permanently records its:

```text
assistant
serviceArea
voiceflowSessionId
```

---

### AC-056

Opening the Contact Profile from Home does not itself create a conversation.

---

### AC-057

A Voiceflow session is created only when the conversational flow actually requires one.

---

# 20. Existing Conversation

### AC-058

Opening an existing conversation resumes the same logical conversation.

---

### AC-059

Reopening an existing conversation does not create a new Voiceflow session merely because the page was reloaded.

---

### AC-060

An existing conversation remains bound to its original assistant.

---

### AC-061

An existing conversation remains bound to its original service area.

---

# 21. Location Change and Historical Conversations

### AC-062

Given a conversation was created in:

```text
Maxixe
```

and the user later changes current location to:

```text
Maputo
```

opening the historical conversation still uses:

```text
serviceArea = maxixe
```

for that thread.

---

### AC-063

A new conversation after the location change uses:

```text
serviceArea = geral
```

---

### AC-064

Changing current location does not rewrite historical conversation records.

---

# 22. Chat Interface Ownership

### AC-065

The visible chat interface is owned by SAAJ Virtual.

---

### AC-066

The product does not display six independently styled Voiceflow widgets.

---

### AC-067

The same reusable SAAJ chat architecture supports all six assistant/service-area combinations.

---

### AC-068

The interface displays SAAJ/Tonito/Manuela identity rather than unnecessary Voiceflow branding.

---

# 23. Chat Header

### AC-069

The active chat header includes:

```text
Back
assistant portrait
assistant name
SAAJ/service context
Quick Exit
```

as appropriate.

---

### AC-070

Tapping the assistant identity can open the Contact Profile without creating a new conversation.

---

# 24. Chat Messaging

### AC-071

The user can type a message.

---

### AC-072

The user can edit the message before sending.

---

### AC-073

Sending creates one intended user turn.

---

### AC-074

The assistant response is rendered through the SAAJ chat interface.

---

### AC-075

Provider-generated arbitrary HTML/JavaScript is not executed.

---

# 25. Health Response Ownership

### AC-076

The frontend does not independently generate medical guidance.

---

### AC-077

Health responses originate from the approved assistant logic/knowledge architecture.

---

### AC-078

If Voiceflow fails, the frontend does not invent a substitute health answer.

---

# 26. Chat Error Recovery

### AC-079

If a message fails, the user receives a human-readable error state.

---

### AC-080

A retry does not intentionally duplicate the same user message.

---

### AC-081

Raw provider errors and stack traces are not shown to the user.

---

# 27. Chat Microphone

### AC-082

The chat microphone requires deliberate user interaction.

---

### AC-083

Speech-to-text places transcription into the editable composer.

---

### AC-084

The user can review and modify the transcription.

---

### AC-085

Transcribed health speech is not automatically sent without user confirmation.

---

# 28. Chat Keyboard

### AC-086

Opening the mobile keyboard does not hide the composer.

---

### AC-087

The user can still reach the Send control while the keyboard is open.

---

### AC-088

Chat does not create conflicting nested page/message scrolling.

---

# 29. Chat Scroll

### AC-089

If the user is near the bottom, a new response becomes visible naturally.

---

### AC-090

If the user is reading older messages, arrival of a new message does not forcibly remove them from that position.

---

### AC-091

Opening a historical thread does not replay entrance animation for the complete transcript.

---

# 30. Conversations Dashboard

### AC-092

`Conversas` displays a unified conversation list.

---

### AC-093

The following filters exist:

```text
Todas
Tonito
Manuela
```

---

### AC-094

`Todas` displays conversations from both assistants.

---

### AC-095

`Tonito` displays only Tonito conversations.

---

### AC-096

`Manuela` displays only Manuela conversations.

---

### AC-097

Changing filter does not modify conversation ownership.

---

### AC-098

Changing filter does not modify location.

---

### AC-099

Changing filter does not create a new session.

---

# 31. New Conversation

### AC-100

The `+` action creates a new-conversation flow.

---

### AC-101

The user can choose:

```text
Tonito
Manuela
```

for the new conversation.

---

### AC-102

The currently selected Conversas filter does not force the assistant selection.

Example:

```text
Filter = Tonito
```

must not prevent:

```text
New conversation → Manuela
```

---

### AC-103

A new conversation uses the current service area.

---

### AC-104

A new conversation does not overwrite an old conversation.

---

# 32. Conversation Titles and Previews

### AC-105

Conversation titles are concise.

---

### AC-106

Titles avoid unnecessary highly sensitive detail.

---

### AC-107

Inbox previews do not expose unnecessarily large portions of health conversations.

---

# 33. Empty Conversas

### AC-108

If no conversations exist, the user sees a useful empty state.

---

### AC-109

The empty state provides a path to start support.

---

# 34. Início

### AC-110

Returning users with valid onboarding state land on:

```text
Início
```

---

### AC-111

Returning users are not forced through onboarding again.

---

### AC-112

Início shows both assistants.

---

### AC-113

If a last-used assistant is prioritised visually, the other assistant remains clearly accessible.

---

### AC-114

Tapping an assistant card opens its Contact Profile.

---

### AC-115

Tapping an assistant card does not itself create a Voiceflow conversation.

---

# 35. Continue Conversation

### AC-116

If a latest conversation exists, Início can show:

```text
Continuar conversa
```

---

### AC-117

Selecting it resumes the exact existing thread.

---

### AC-118

It does not create a new session.

---

# 36. Recent Conversations

### AC-119

Home shows only a small useful recent set.

---

### AC-120

The full history remains in Conversas.

---

### AC-121

The latest conversation is not unnecessarily duplicated in the recent list.

---

# 37. Home Appointment Shortcut

### AC-122

Maxixe may show an appointment shortcut.

---

### AC-123

Massinga may show an appointment shortcut.

---

### AC-124

Geral does not show an appointment shortcut.

---

# 38. Home Failure

### AC-125

Failure to load conversation history does not prevent the user from opening Tonito or Manuela.

---

### AC-126

Home does not become unusable because a secondary service fails.

---

# 39. Primary Navigation

### AC-127

The root application navigation contains:

```text
Início
Conversas
Mais
```

---

### AC-128

The active navigation destination is visually identifiable.

---

### AC-129

The navigation works without relying on colour alone.

---

### AC-130

The dock respects mobile safe areas.

---

### AC-131

Page content can scroll fully above the navigation dock.

---

# 40. Mais

### AC-132

`Mais` is presented as secondary controls/information rather than an account profile.

---

### AC-133

Mais displays the user's actual selected location.

---

### AC-134

Mais does not display:

```text
Geral
```

as the user's geographic location.

---

### AC-135

Mais provides access to privacy information.

---

### AC-136

Mais provides access to:

```text
Sobre o SAAJ Virtual
```

---

### AC-137

Mais provides access to help/support information.

---

### AC-138

Mais provides access to terms/privacy information.

---

# 41. Location Change

### AC-139

The user can change location from Mais.

---

### AC-140

Changing location reuses the approved geographic selection components.

---

### AC-141

Changing location does not rerun the complete first-time onboarding.

---

### AC-142

Changing location does not require reselecting a permanent preferred assistant.

---

### AC-143

After changing location, future capabilities update appropriately.

---

# 42. Maxixe → Geral

### AC-144

After changing from Maxixe to a Geral location:

```text
new text conversations remain available
```

---

### AC-145

New voice-call entry points are no longer available.

---

### AC-146

New appointment entry points are no longer available.

---

### AC-147

Old Maxixe conversations remain Maxixe conversations.

---

# 43. Geral → Massinga

### AC-148

After changing from Geral to Massinga:

```text
Message
Call
Appointment
```

become available for new service actions.

---

# 44. Voice Availability

The following matrix must pass:

| Location | Assistant | Voice |
|---|---|---:|
| Maxixe | Tonito | Yes |
| Maxixe | Manuela | Yes |
| Massinga | Tonito | Yes |
| Massinga | Manuela | Yes |
| Geral | Tonito | No |
| Geral | Manuela | No |

---

### AC-149

All four supported combinations resolve to the correct Vapi assistant.

---

### AC-150

No unsupported combination falls back to another Vapi assistant.

---

# 45. Voice Start

### AC-151

Microphone permission is requested only after deliberate call initiation.

---

### AC-152

The application does not request microphone permission on ordinary page load.

---

### AC-153

If permission is granted, the call can progress toward connection.

---

### AC-154

If permission is denied, the user receives a recoverable state.

---

### AC-155

The user can return to text support after microphone denial.

---

# 46. Voice Call States

The interface correctly distinguishes:

```text
requesting permission
connecting
connected
reconnecting where applicable
ending
ended
failed
```

---

### AC-156

The call timer starts only when the call is genuinely connected.

---

### AC-157

The interface does not show fake ringing when the underlying state is merely connecting.

---

### AC-158

The interface does not imply the assistant heard the user when connection failed.

---

# 47. Voice Controls

### AC-159

The user can end the call with one clear action.

---

### AC-160

Mute state is visible.

---

### AC-161

Microphone active/muted state is not communicated only by colour.

---

### AC-162

Any output-device control is shown only if technically supported.

---

# 48. End Call

### AC-163

Ending a call releases microphone/audio resources.

---

### AC-164

The call does not continue in the background after normal termination.

---

### AC-165

The post-call state can provide appropriate next actions.

---

### AC-166

A voice call does not create a fake text conversation thread.

---

# 49. Quick Exit

### AC-167

Quick Exit is available on:

```text
Assistant Contact Profile
Chat
Voice Call
```

as defined by the product.

---

### AC-168

Quick Exit is distinct from Back.

---

### AC-169

Quick Exit leaves the sensitive context immediately.

---

### AC-170

Quick Exit navigates to the centrally approved neutral destination.

---

### AC-171

The neutral destination does not display the sensitive conversation topic.

---

# 50. Quick Exit During Voice

### AC-172

During an active call:

```text
Quick Exit
```

terminates the call.

---

### AC-173

The microphone stops.

---

### AC-174

Call audio stops.

---

### AC-175

The sensitive call screen disappears.

---

### AC-176

Quick Exit does not wait for a decorative exit animation.

---

# 51. Quick Exit Honesty

### AC-177

Quick Exit does not claim to erase browser history unless that behaviour is genuinely implemented.

---

### AC-178

Quick Exit does not claim universal deletion of provider/server data.

---

### AC-179

Quick Exit does not automatically cancel appointments.

---

# 52. Appointment Availability

The following matrix must pass:

| Location | Appointment |
|---|---:|
| Maxixe | Yes |
| Massinga | Yes |
| Geral | No |

---

### AC-180

Maxixe opens the Maxixe scheduler.

---

### AC-181

Massinga opens the Massinga scheduler.

---

### AC-182

Geral cannot open an arbitrary district scheduler.

---

### AC-183

If the Maxixe scheduler fails, the application does not silently route to Massinga.

---

### AC-184

If the Massinga scheduler fails, the application does not silently route to Maxixe.

---

# 53. Appointment Independence From Assistant

### AC-185

Appointment destination is determined by service area.

---

### AC-186

Choosing Manuela instead of Tonito does not change Maxixe into another booking destination.

---

### AC-187

Assistant origin may be stored for analytics where useful but does not determine the facility/service area.

---

# 54. Appointment Entry Points

Where supported, appointment flow can be entered from approved surfaces such as:

```text
Assistant Contact Profile
Início
structured chat action
post-call action
```

---

### AC-188

All entry points resolve to the same correct district scheduler.

---

# 55. Appointment Embed

### AC-189

Only one scheduler is mounted at a time.

---

### AC-190

The embed remains within an understandable SAAJ shell.

---

### AC-191

The user can identify which service location they are booking.

---

### AC-192

The mobile scheduler is usable without an impractically small nested scroll region.

---

# 56. Appointment Confirmation

### AC-193

The application displays:

```text
appointment confirmed
```

only after genuine booking success.

---

### AC-194

Opening the scheduler alone does not create a confirmed appointment state.

---

### AC-195

Leaving before confirmation does not create a fake confirmed booking.

---

# 57. Appointment Data

### AC-196

Personal information is requested only where required for booking/service delivery.

---

### AC-197

Sensitive appointment data is not placed unnecessarily into URLs.

---

### AC-198

The user's entire chat transcript is not automatically sent to Cal.com.

---

# 58. Appointment SMS

### AC-199

If confirmation SMS is enabled, it is triggered only from a genuine booking.

---

### AC-200

If reminder SMS is enabled, it uses confirmed appointment data.

---

### AC-201

SMS wording avoids unnecessary sensitive health-topic details.

---

### AC-202

Workflow retries do not intentionally send duplicate reminders.

---

# 59. Appointment Time

### AC-203

User-facing appointment times use:

```text
Africa/Maputo
UTC+2
```

---

### AC-204

UTC is not accidentally shown as the local appointment time.

---

# 60. Persistence

### AC-205

First valid use generates an opaque random user/device identifier according to the persistence architecture.

---

### AC-206

The identifier itself does not encode:

```text
name
phone
health concern
province
district
age
gender
```

---

### AC-207

Onboarding completion persists on the same browser/device under normal supported storage conditions.

---

### AC-208

Selected location persists.

---

### AC-209

Last assistant may persist as a convenience value.

---

### AC-210

`lastAssistant` does not become a permanent preference that blocks the other assistant.

---

# 61. Returning State

### AC-211

A valid returning user goes directly to Início.

---

### AC-212

Stored state is validated before use.

---

### AC-213

Invalid serviceArea is recalculated from valid geography.

---

### AC-214

A corrupted optional field does not necessarily force deletion of all valid state.

---

# 62. Conversation Persistence

### AC-215

The conversation index can reconstruct the user's same-browser Conversas list according to the approved persistence implementation.

---

### AC-216

The application does not assume that Voiceflow alone can reconstruct the entire SAAJ UI transcript unless this has been explicitly verified and implemented.

---

### AC-217

If local transcript persistence is implemented, reopening the conversation restores the appropriate locally stored transcript.

---

### AC-218

Conversation persistence does not imply cross-device history.

---

# 63. Browser Storage Loss

### AC-219

If the browser/device clears SAAJ local storage, the application does not pretend the previous local state still exists.

---

### AC-220

A user can begin again without requiring account recovery.

---

### AC-221

Private/incognito mode does not receive a false promise of permanent continuity.

---

# 64. Multiple Tabs

### AC-222

Opening SAAJ in multiple tabs does not corrupt the core location/onboarding state.

---

### AC-223

Duplicate message sending is mitigated where feasible.

---

# 65. Local Conversation Clearing

### AC-224

`Limpar conversas` requires deliberate confirmation.

---

### AC-225

After successful local clearing:

```text
Conversas
```

no longer displays the locally cleared history.

---

### AC-226

Início no longer shows cleared local conversation references.

---

### AC-227

Clearing conversations does not reset onboarding.

---

### AC-228

Clearing conversations does not reset location.

---

### AC-229

Clearing conversations does not cancel appointments.

---

### AC-230

The UI does not claim remote/provider deletion unless that deletion actually occurs.

---

# 66. Full Local Reset

### AC-231

If `Limpar dados deste dispositivo` is implemented, it requires confirmation.

---

### AC-232

It clears the SAAJ local namespace according to the documented behaviour.

---

### AC-233

The next use returns to first-time onboarding.

---

### AC-234

A new opaque local identity may be created.

---

### AC-235

The application does not use device fingerprinting to secretly reconstruct the cleared identity.

---

# 67. Privacy Copy

### AC-236

SAAJ does not claim:

```text
100% anonymous
nothing is stored
nothing leaves your phone
nobody can ever see this
```

unless those claims are technically and legally accurate.

---

### AC-237

The application accurately explains that an account is not required.

---

### AC-238

Detailed privacy information is accessible.

---

# 68. Sensitive Data in URLs

### AC-239

Health concerns do not appear in application URLs.

---

### AC-240

Phone numbers do not appear in URLs unless a specific approved provider requirement makes it unavoidable and it has been reviewed.

---

### AC-241

Private API credentials never appear in URLs.

---

# 69. Analytics

### AC-242

Generic analytics do not contain raw chat messages.

---

### AC-243

Generic analytics do not contain raw voice transcripts.

---

### AC-244

Analytics can use structured dimensions such as:

```text
province
district
service area
assistant
channel
age group where legitimately collected
topic category
risk category
referral
appointment
```

according to approved data definitions.

---

### AC-245

Analytics events do not unnecessarily include names or phone numbers.

---

# 70. Dashboard Privacy

### AC-246

Operational dashboards prefer aggregate data.

---

### AC-247

Sensitive small-number combinations are reviewed for re-identification risk.

---

### AC-248

Raw conversation text is not used as ordinary dashboard content.

---

# 71. Provider Credentials

### AC-249

The browser does not receive:

```text
VOICEFLOW_ACCESS_TOKEN
```

---

### AC-250

The browser does not receive:

```text
VAPI_PRIVATE_API_KEY
```

---

### AC-251

The browser does not receive private:

```text
Airtable
n8n
Cal.com
```

credentials.

---

### AC-252

Only intentionally public client credentials use:

```text
NEXT_PUBLIC_*
```

---

# 72. Source Control

### AC-253

Real production secrets are not committed to the repository.

---

### AC-254

`.env.example` contains placeholders rather than real credentials.

---

# 73. API Validation

### AC-255

Public API endpoints validate user-controlled values.

---

### AC-256

Invalid assistant values are rejected.

---

### AC-257

Invalid service areas are rejected/recomputed according to context.

---

### AC-258

Arbitrary provider IDs supplied by the browser are not trusted as authoritative routing instructions.

---

# 74. Provider Errors

### AC-259

Voiceflow errors are translated into SAAJ-readable errors.

---

### AC-260

Vapi errors are translated into SAAJ-readable errors.

---

### AC-261

Cal.com failures do not create fake booking confirmation.

---

### AC-262

Airtable/n8n failures do not expose internal stack traces to the user.

---

# 75. Integration Isolation

### AC-263

A temporary Vapi outage does not unnecessarily disable text chat.

---

### AC-264

An analytics/Airtable write failure does not unnecessarily block a successful health conversation.

---

### AC-265

Failure of a secondary integration is isolated where technically possible.

---

# 76. Webhooks

### AC-266

Webhook payloads are validated.

---

### AC-267

Provider authenticity/signatures are checked where supported and configured.

---

### AC-268

Duplicate webhook delivery does not create duplicate logical records.

---

### AC-269

Invalid public webhook requests are rejected.

---

# 77. Vapi Operational Data

### AC-270

Vapi Call ID is consistently available for the approved voice interaction/session linkage.

---

### AC-271

Structured call outputs are validated before Airtable writes.

---

### AC-272

Nullable fields genuinely support null where required.

---

### AC-273

Satisfaction data type is consistent between provider output, n8n and Airtable.

---

# 78. Interações and Marcações

### AC-274

A completed voice interaction can create the appropriate Interações record.

---

### AC-275

A Marcações record is created only when a real appointment exists.

---

### AC-276

Discussing an appointment does not create a fake booking record.

---

### AC-277

Where an interaction creates an appointment, the approved relationship between interaction and booking is preserved.

---

### AC-278

A direct booking from Home does not require a fabricated interaction record.

---

# 79. n8n

### AC-279

n8n is not unnecessarily inserted into every real-time text-chat turn.

---

### AC-280

n8n can process appropriate asynchronous workflows.

---

### AC-281

n8n credentials are not public.

---

### AC-282

Execution logs are reviewed for unnecessary sensitive payload retention.

---

# 80. Airtable

### AC-283

The browser does not directly connect to Airtable using a private token.

---

### AC-284

Airtable writes use validated field mappings.

---

### AC-285

Stable IDs are used where required to prevent duplicate records.

---

# 81. Knowledge Synchronisation

### AC-286

The approved Google Drive → n8n → Vapi knowledge workflow can update the intended knowledge resources.

---

### AC-287

A failed knowledge sync does not intentionally destroy the previously valid knowledge configuration.

---

### AC-288

Knowledge-sync errors are operational errors and are not displayed to ordinary SAAJ users.

---

# 82. Responsive Mobile

### AC-289

The core application is usable at approximately:

```text
320px width
```

where technically practical.

---

### AC-290

No core screen requires horizontal page scrolling.

---

### AC-291

Portuguese labels do not become unreadably clipped.

---

### AC-292

Touch targets remain usable.

---

### AC-293

Mobile safe areas are respected.

---

# 83. Tablet

### AC-294

Tablet layouts use additional space without changing the product model.

---

### AC-295

Assistant cards remain balanced.

---

### AC-296

Maps remain readable and interactive.

---

# 84. Desktop

### AC-297

Desktop does not simply stretch mobile content across the full viewport.

---

### AC-298

Reading/content widths remain controlled.

---

### AC-299

Home does not transform into an admin dashboard.

---

### AC-300

If two-pane Conversas is implemented, resizing does not create a new conversation session.

---

# 85. Orientation

### AC-301

Core functionality remains usable in portrait.

---

### AC-302

Core functionality remains usable in landscape where browser/device permits.

---

### AC-303

The web application does not force portrait orientation.

---

# 86. Browser Zoom and Text Scaling

### AC-304

Mobile zoom is not disabled.

---

### AC-305

Important content remains usable with increased browser/system text size.

---

### AC-306

Fixed-height containers do not clip essential translated text.

---

# 87. Motion

### AC-307

Motion communicates state rather than acting as decoration only.

---

### AC-308

Quick Exit is not delayed by animation.

---

### AC-309

End Call is not delayed by decorative animation.

---

### AC-310

Major transitions remain within the approved calm motion language.

---

### AC-311

The interface avoids unnecessary bouncing/game-like motion.

---

# 88. Reduced Motion

### AC-312

The application respects:

```text
prefers-reduced-motion
```

---

### AC-313

Reduced motion removes unnecessary large translations/parallax/continuous decorative animation.

---

### AC-314

Essential state feedback remains visible even with animation reduced.

---

# 89. Performance

### AC-315

Assistant images are appropriately sized/optimised.

---

### AC-316

Large assets do not create unnecessary layout shifts.

---

### AC-317

Cal.com infrastructure is not unnecessarily loaded on every Home view.

---

### AC-318

Voice functionality does not request microphone permission simply because the Contact Profile loaded.

---

### AC-319

The interactive onboarding map becomes usable within a reasonable loading period on target mobile connections.

---

# 90. Accessibility

### AC-320

Interactive controls have accessible labels.

---

### AC-321

Icon-only buttons have accessible names.

---

### AC-322

Colour is not the sole indicator of:

```text
selected assistant
active navigation
mute state
filter selection
```

---

### AC-323

Keyboard focus remains visible.

---

### AC-324

Dialogs/bottom sheets manage focus appropriately.

---

### AC-325

Map selection has a non-map accessible alternative.

---

# 91. About

### AC-326

The About screen identifies:

```text
SAAJ Virtual
```

correctly.

---

### AC-327

Development attribution appears as:

```text
Desenvolvido por
NCAI Consultorias e Serviços, EI
```

where approved.

---

### AC-328

Development attribution is not presented as though NCAI were automatically the healthcare provider/data controller unless that role is formally defined.

---

# 92. Provider Branding

### AC-329

Ordinary youth-facing screens do not unnecessarily expose:

```text
Voiceflow
Vapi
n8n
Airtable
```

as product brands.

---

### AC-330

Legal/privacy disclosures can identify relevant service providers where required.

---

# 93. Search Indexing

### AC-331

Private chat routes are not intended for search indexing.

---

### AC-332

Conversation-history routes are not intended for search indexing.

---

### AC-333

Personal appointment-state routes are not intended for search indexing.

---

### AC-334

Public health-information pages remain indexable according to the SEO specification.

---

# 94. Future Features Must Not Leak Into V1

### AC-335

V1 does not show a non-functional:

```text
Mensagens para Mim
```

feature.

---

### AC-336

V1 does not request generic notification permission for a future feature.

---

### AC-337

V1 does not contain fake scheduled wellbeing messages.

---

### AC-338

V1 does not contain telemedicine video functionality.

---

### AC-339

V1 does not request camera permission.

---

### AC-340

V1 does not display fake healthcare professionals.

---

### AC-341

V1 does not contain a fake telemedicine waiting room.

---

### AC-342

V1 does not present speculative features as:

```text
Em breve
```

throughout the core application unless explicitly approved.

---

# 95. Future Compatibility

### AC-343

Current structured-action architecture can be extended later without rewriting the entire chat renderer.

---

### AC-344

Current data concepts are not unnecessarily hard-coded to one provider.

---

### AC-345

Current navigation does not require placeholder future tabs.

---

# 96. Browser/Device Test Matrix

At minimum, test supported/current versions where available of:

```text
Android Chrome
iOS Safari
Desktop Chrome
Desktop Edge
Desktop Safari where available
```

Additional browsers may be included according to usage data.

---

# 97. Connection Test Matrix

Test core journeys under:

```text
normal connection
slow connection
temporary connection loss
reconnection
provider timeout
```

---

# 98. Geographic Test Matrix

Test at minimum:

```text
Maxixe
Massinga
another Inhambane district
province outside Inhambane
```

with:

```text
Tonito
Manuela
```

---

# 99. Required End-to-End Scenario 1

## New Maxixe User — Tonito

```text
Fresh browser
↓
Welcome
↓
Inhambane
↓
Maxixe
↓
Tonito
↓
Contact Profile
↓
Mensagem
↓
new Tonito Maxixe conversation
↓
receive response
↓
leave
↓
reopen SAAJ
↓
Início
↓
Continuar conversa
↓
same conversation
```

**Result:** PASS / FAIL

---

# 100. Required End-to-End Scenario 2

## New Maxixe User — Manuela Voice

```text
Fresh browser
↓
Welcome
↓
Inhambane
↓
Maxixe
↓
Manuela
↓
Contact Profile
↓
Ligar
↓
microphone permission
↓
connect Manuela Maxixe Vapi assistant
↓
conversation
↓
End Call
↓
post-call state
```

**Result:** PASS / FAIL

---

# 101. Required End-to-End Scenario 3

## New Massinga User — Appointment

```text
Fresh browser
↓
Welcome
↓
Inhambane
↓
Massinga
↓
Tonito or Manuela
↓
Contact Profile
↓
Marcar um encontro
↓
Massinga Cal.com scheduler
↓
select slot
↓
provide required details
↓
confirmed booking
↓
confirmation state
```

**Result:** PASS / FAIL

---

# 102. Required End-to-End Scenario 4

## Geral User

```text
Fresh browser
↓
Welcome
↓
province outside Inhambane
↓
choose Manuela
↓
Contact Profile
↓
only Message available
↓
new Manuela Geral conversation
```

Verify:

```text
no Call
no Appointment
```

**Result:** PASS / FAIL

---

# 103. Required End-to-End Scenario 5

## Other Inhambane District

```text
Fresh browser
↓
Inhambane
↓
Vilankulo
↓
Tonito
↓
Contact Profile
```

Verify:

```text
actual location = Vilankulo
serviceArea = geral
Message = available
Call = unavailable
Appointment = unavailable
```

**Result:** PASS / FAIL

---

# 104. Required End-to-End Scenario 6

## Location Change

```text
Create Tonito Maxixe conversation
↓
Mais
↓
change location to Maputo
↓
Home
↓
start Manuela conversation
```

Verify:

```text
old Tonito thread = Maxixe
new Manuela thread = Geral
```

**Result:** PASS / FAIL

---

# 105. Required End-to-End Scenario 7

## Quick Exit During Chat

```text
Open sensitive chat
↓
type unsent draft
↓
Quick Exit
```

Verify:

```text
sensitive screen disappears
neutral destination appears
draft is not visibly exposed
no false deletion claim
```

**Result:** PASS / FAIL

---

# 106. Required End-to-End Scenario 8

## Quick Exit During Voice

```text
Start connected voice call
↓
Quick Exit
```

Verify:

```text
call terminated
microphone released
audio stopped
call screen removed
neutral destination shown
```

**Result:** PASS / FAIL

This scenario is a release blocker if it fails.

---

# 107. Required End-to-End Scenario 9

## Clear Conversations

```text
Create conversations
↓
Mais
↓
Limpar conversas
↓
confirm
```

Verify:

```text
local conversation list cleared
Home references cleared
location preserved
onboarding preserved
appointment unaffected
no false remote deletion claim
```

**Result:** PASS / FAIL

---

# 108. Required End-to-End Scenario 10

## Provider Failure

Simulate:

```text
Voiceflow unavailable
```

Verify:

```text
no invented medical answer
recoverable error
retry possible
other unrelated application surfaces remain usable
```

Repeat appropriate failure testing for:

```text
Vapi
Cal.com
analytics/Airtable
```

**Result:** PASS / FAIL

---

# 109. Required End-to-End Scenario 11

## Returning User

```text
Complete onboarding
↓
close browser/app
↓
return later
```

Verify:

```text
onboarding does not repeat
Início opens
location remains correct
assistant access remains available
same-browser conversation continuity works
according to implemented persistence
```

**Result:** PASS / FAIL

---

# 110. Required End-to-End Scenario 12

## Responsive Chat

Test an active conversation at:

```text
320px mobile
common mobile width
tablet
desktop
```

Verify:

```text
composer visible
keyboard usable
messages readable
Quick Exit accessible
no horizontal overflow
no duplicate session after resize
```

**Result:** PASS / FAIL

---

# 111. Release Blockers

The following should normally block production release:

```text
wrong assistant routing

wrong district routing

Geral users gaining unintended call/appointment access

Maxixe users routed to Massinga appointment service

Massinga users routed to Maxixe appointment service

conversation switching assistant unexpectedly

existing thread losing its Voiceflow session unexpectedly

private API credentials exposed to browser

sensitive health content leaking into generic analytics

appointment confirmation shown without real booking

active voice continuing after Quick Exit

microphone continuing after call termination

frontend inventing health guidance after provider failure

private conversations publicly indexable

critical mobile journey unusable
```

---

# 112. Pre-Release Sign-Off

Before production deployment, confirm:

```text
[ ] Product behaviour approved
[ ] Geographic routing tested
[ ] Six Voiceflow routes tested
[ ] Four Vapi routes tested
[ ] Two appointment routes tested
[ ] Conversation persistence tested
[ ] Returning-user flow tested
[ ] Quick Exit tested
[ ] Privacy copy reviewed
[ ] Local clearing tested
[ ] Analytics mappings tested
[ ] Airtable mappings tested
[ ] Webhook deduplication tested
[ ] Secrets reviewed
[ ] Production logs reviewed
[ ] Mobile responsive testing completed
[ ] Accessibility checks completed
[ ] Reduced-motion behaviour tested
[ ] Provider failure states tested
[ ] Search indexing rules checked
[ ] Production provider configuration reviewed
[ ] Future features absent from V1
```

---

# 113. Release Decision

Final release status:

```text
SAAJ VIRTUAL V1

Environment:
____________________________

Build:
____________________________

Date:
____________________________

Product:
PASS / FAIL

UX:
PASS / FAIL

Voiceflow:
PASS / FAIL

Vapi:
PASS / FAIL

Appointments:
PASS / FAIL

Data:
PASS / FAIL

Privacy:
PASS / FAIL

Security:
PASS / FAIL

Responsive:
PASS / FAIL

Accessibility:
PASS / FAIL

Overall:

READY
/
NOT READY
```

---

# 114. Final Acceptance Principle

```text
SAAJ VIRTUAL IS NOT READY
BECAUSE THE INTERFACE LOOKS FINISHED.

IT IS READY WHEN:

THE RIGHT USER
        ↓
IN THE RIGHT LOCATION
        ↓
REACHES THE RIGHT ASSISTANT
        ↓
THROUGH THE RIGHT CHANNEL
        ↓
WITH THE RIGHT CONTEXT
        ↓
WITHOUT UNNECESSARY DATA COLLECTION
        ↓
WITH PRIVACY AND SAFETY CONTROLS
        ↓
AND CAN RETURN LATER
WITHOUT THE EXPERIENCE BREAKING.


EVERY CRITICAL JOURNEY
MUST WORK END TO END.

NO SILENT FALLBACKS.

NO FAKE CONFIRMATIONS.

NO EXPOSED SECRETS.

NO INVENTED HEALTH GUIDANCE.

NO PRIVACY CLAIMS
THE ARCHITECTURE CANNOT SUPPORT.
```
````

That completes **`18-acceptance-criteria.md`**.

We now have one especially important specification left before assembling everything: **`19-seo-ai-discoverability.md`**. That one will define the public, indexable layer around SAAJ Virtual so people searching in Mozambique for things like **contraception, menstruation, pregnancy, sexually transmitted infections, relationships, or where to get youth-friendly sexual and reproductive health support** can discover SAAJ through search engines and AI systems—without exposing or indexing the private chat/application layer.
