Moving to **`13-data-and-analytics.md`**. This should become the authoritative specification for how SAAJ Virtual turns activity into operational and programme intelligence **without mixing product analytics, health-service data, and identifiable information unnecessarily**.

````markdown id="saaj-data-analytics"
# SAAJ Virtual — Data & Analytics

## 1. Purpose

This document defines the data and analytics architecture for SAAJ Virtual.

It establishes:

- what should be measured;
- how access, interactions, appointments and consultations differ;
- geographic analysis;
- assistant and channel analysis;
- age and topic analysis;
- risk and referral indicators;
- appointment indicators;
- satisfaction indicators;
- anonymous identifiers;
- session identifiers;
- operational tables;
- dashboard logic;
- privacy boundaries;
- data-quality requirements.

The objective is to produce useful programme intelligence while minimising unnecessary collection of sensitive information.

The central principle is:

```text
COLLECT WITH PURPOSE
        ↓
STRUCTURE CONSISTENTLY
        ↓
SEPARATE IDENTITIES FROM ANALYTICS
        ↓
AGGREGATE WHERE POSSIBLE
        ↓
USE DATA TO IMPROVE THE SERVICE
````

---

# 2. Data Is Not One Single Category

SAAJ Virtual produces several different kinds of data.

They must not be treated as interchangeable.

```text
SAAJ DATA
   │
   ├── Product usage data
   │
   ├── Conversation/interactions data
   │
   ├── Appointment data
   │
   ├── Consultation/service data
   │
   ├── Operational monitoring data
   │
   └── Aggregated programme indicators
```

---

# 3. Main Analytical Questions

The system should help answer questions such as:

```text
How many people are accessing SAAJ Virtual?

Where are they accessing it from?

Which assistants are being used?

Which channels are being used?

What topics are young people asking about?

How do topics differ by age?

How do topics differ by geography?

How many interactions indicate higher risk?

How many users are referred?

How many appointments are made?

How many appointments result in consultations?

How many appointments are missed?

How long do users wait?

How satisfied are users?

How does service use change over time?
```

---

# 4. Current Core Data Tables

The current operational architecture includes:

```text
Acessos à Plataforma

Interações

Marcações

Consultas

RESUMOS_OPERACIONAIS

JORNADA_METRICAS
```

Each table should have a clearly defined responsibility.

---

# 5. Table Responsibility Model

Recommended conceptual separation:

| Table                | Primary purpose                        |
| -------------------- | -------------------------------------- |
| Acessos à Plataforma | Platform access / reach                |
| Interações           | Meaningful assistant interactions      |
| Marcações            | Confirmed appointments                 |
| Consultas            | Completed/in-person service encounters |
| RESUMOS_OPERACIONAIS | Derived operational summaries          |
| JORNADA_METRICAS     | Funnel/journey indicators              |

Do not duplicate the same event indiscriminately across every table.

---

# 6. Acesso Is Not an Interação

This distinction is fundamental.

An `Acesso à Plataforma` represents use/access of the SAAJ experience.

An `Interação` represents a meaningful interaction with an assistant/channel.

Example:

```text
User opens SAAJ
        ↓
Acesso
```

Then:

```text
User talks to Manuela
        ↓
Interação
```

These should not automatically be counted as the same indicator.

---

# 7. Voice Calls

A voice call is an interaction.

It should normally feed:

```text
Interações
```

rather than being counted as:

```text
Acessos à Plataforma
```

simply because a Vapi call occurred.

A platform access may already have been recorded separately.

---

# 8. Appointment Is Not Automatically a Consultation

A confirmed appointment belongs to:

```text
Marcações
```

A completed service encounter belongs to:

```text
Consultas
```

Therefore:

```text
Marcação
≠
Consulta
```

This distinction is necessary for measuring attendance and no-shows.

---

# 9. Core User Journey

Conceptually:

```text
ACESSO
   ↓
INTERAÇÃO
   ↓
REFERRAL / RECOMMENDATION
   ↓
MARCAÇÃO
   ↓
CONSULTA
```

Not every user will pass through every stage.

For example:

```text
Acesso
↓
Interação
↓
Information received
↓
Journey ends
```

may be a perfectly valid outcome.

---

# 10. Anonymous User ID

Where technically and ethically appropriate, events may use:

```text
User_ID
```

as a pseudonymous identifier.

The frontend's anonymous identifier may support this architecture.

It must not itself contain:

* name;
* phone number;
* age;
* gender;
* health topic;
* location.

---

# 11. User_ID Is Pseudonymous, Not Harmless

An opaque identifier may still connect multiple sensitive interactions.

Therefore:

```text
User_ID
```

must still be treated as protected data where it links health-related activity.

Do not assume:

```text
No name
=
No privacy risk
```

---

# 12. Phone-Based Pseudonymous ID

Where operational workflows originate from voice calls and a phone number is available, a pseudonymous identifier may be derived from a normalised phone number.

Recommended conceptual approach:

```text
normalise phone
      ↓
private server-side transformation
      ↓
pseudonymous User_ID
```

Do not store the raw phone number as the analytical User_ID.

---

# 13. Private Salt / Secret

If a deterministic hash is used:

```text
hash(normalisedPhone + privateSalt)
```

the salt must remain private and server-side.

Do not expose it in:

* frontend JavaScript;
* localStorage;
* public environment variables;
* analytics payloads.

---

# 14. Session ID

`Session ID` identifies a specific interaction/session rather than a person.

For a Vapi voice call:

```text
Session ID = Vapi Call ID
```

is an appropriate current convention.

For text interactions, use the relevant SAAJ/Voiceflow conversation/session reference according to the final architecture.

---

# 15. User ID vs Session ID

These answer different questions.

```text
User_ID
→ who/which pseudonymous user
```

```text
Session ID
→ which interaction/session
```

One user may have:

```text
Session A
Session B
Session C
```

Do not use session count as a direct substitute for unique-user count.

---

# 16. Interaction ID

Each interaction record should have its own stable identifier.

Conceptually:

```text
Interação ID
```

This should be distinct from:

```text
User_ID
Session ID
```

---

# 17. Appointment ID

Each confirmed appointment should have:

```text
Marcação ID
```

This should be traceable to the booking system where appropriate without exposing unnecessary provider details to the user.

---

# 18. Consultation ID

Completed service encounters should have their own identifier where the consultation architecture requires one.

Do not use appointment ID alone to represent both:

```text
appointment
and
completed consultation
```

because an appointment may be missed or cancelled.

---

# 19. Current Interações Fields

The current working structure includes:

```text
Interação ID
Session ID
User_ID
Data da Interação
Origem
Província
Grupo Etário
Idade
Tema Principal
Subtema
Risco
satisfação
Assistente
```

This should be refined consistently rather than creating new parallel versions of the same variables.

---

# 20. Recommended Interações Model

Conceptually:

```ts
type InteractionRecord = {
  interactionId: string;
  sessionId: string;
  userId?: string;

  interactionDate: string;

  origin:
    | "text"
    | "voice";

  province?: string;
  district?: string;
  serviceArea:
    | "maxixe"
    | "massinga"
    | "geral";

  assistant:
    | "tonito"
    | "manuela";

  age?: number;
  ageGroup?: string;

  mainTopic?: string;
  subtopic?: string;

  risk?: string;

  referral?: boolean;

  satisfaction?: number | null;
};
```

The final schema must match approved operational definitions.

---

# 21. Origem / Channel

`Origem` should consistently identify the interaction channel.

Recommended values:

```text
Texto
Voz
```

or stable internal equivalents:

```text
text
voice
```

Do not mix uncontrolled variants such as:

```text
Voice
Vapi
Call
Chamada
Telefone
Audio
```

for the same concept.

---

# 22. Assistant

Use controlled values:

```text
Tonito
Manuela
```

or stable internal equivalents:

```text
tonito
manuela
```

Do not derive assistant identity from theme colour or arbitrary text.

---

# 23. Province

Province should use a controlled geographic vocabulary.

Do not allow variants such as:

```text
Inhambane
inhambane
INHAMBANE
Província de Inhambane
```

to become separate dashboard categories.

Normalise before storage or analysis.

---

# 24. District

Where district is legitimately known, store it separately from province.

Example:

```text
Província = Inhambane
Distrito = Maxixe
```

Do not store:

```text
Província = Inhambane - Maxixe
```

as a single analytical field.

---

# 25. Service Area

The internal service area may also be stored:

```text
maxixe
massinga
geral
```

This allows operational analysis of which SAAJ service configuration handled the interaction.

It does not replace actual province/district.

---

# 26. Geographic Dashboard Requirement

Both major usage dimensions should support geography:

### Acessos

```text
Acessos por província
Acessos por distrito
```

### Interações

```text
Interações por província
Interações por distrito
```

Do not assume these indicators are identical.

---

# 27. Province-Level Access

A useful dashboard visual may answer:

```text
De onde estão a aceder ao SAAJ Virtual?
```

Example structure:

```text
Acessos por Província

Inhambane       1,240
Maputo Cidade     420
Gaza              180
Nampula            95
...
```

This measures reach.

---

# 28. Province-Level Interactions

Separately:

```text
Interações por Província

Inhambane         960
Maputo Cidade     310
Gaza              120
...
```

This measures actual interaction activity.

---

# 29. Access-to-Interaction Conversion

Where definitions permit:

```text
Interaction conversion =
users/sessions with meaningful interaction
÷
platform accesses
```

The denominator and numerator must use compatible units.

Do not divide:

```text
unique users
÷
total page views
```

and label it as a meaningful conversion rate without definition.

---

# 30. District Analysis

District-level charts are especially useful for Inhambane because the service model distinguishes:

```text
Maxixe
Massinga
Other districts
```

The dashboard should allow programme teams to see whether usage is concentrated in enhanced service areas or expanding elsewhere.

---

# 31. Global Filters

Dashboard filters should be applied consistently across relevant pages.

Potential global filters:

```text
Date period
Province
District
Assistant
Channel
Age group
Gender where available
Service area
```

A global filter should update all compatible visuals on the page.

---

# 32. Cascading Geographic Filters

District options should depend on province where appropriate.

Example:

```text
Province = Inhambane
↓
District filter shows Inhambane districts
```

Avoid presenting unrelated districts under the wrong province.

---

# 33. Date Filtering

Support meaningful programme periods.

At minimum:

```text
Custom date range
Month
Quarter where useful
Semester where useful
Year
```

Do not hard-code dashboard calculations to one reporting period.

---

# 34. Age

Where age is legitimately collected during the interaction, it may support analysis.

Do not require age merely to populate a dashboard if the service does not otherwise need it.

---

# 35. Age Groups

Age groups should be derived consistently.

For the SAAJ target population, useful groupings may include:

```text
10–14
15–19
20–24
```

If operational eligibility includes age 25 in a specific workflow, that boundary must be handled explicitly rather than silently added to the standard programme group.

---

# 36. One Age-Group Function

Use one central transformation.

Conceptually:

```ts
function getAgeGroup(age: number) {
  if (age >= 10 && age <= 14) {
    return "10–14";
  }

  if (age >= 15 && age <= 19) {
    return "15–19";
  }

  if (age >= 20 && age <= 24) {
    return "20–24";
  }

  return "other";
}
```

Final boundaries must follow approved programme definitions.

---

# 37. Do Not Store Contradictory Age Data

Avoid:

```text
Idade = 14
Grupo Etário = 20–24
```

If both fields exist, age group should preferably be derived programmatically from age.

---

# 38. Age-by-Topic Analysis

The dashboard should support questions such as:

> What are most 14-year-olds asking about?

This requires analysis by exact age where available.

Conceptually:

```text
Age = 14
        ↓
Topic distribution
        ↓
Menstruation       31%
Relationships      24%
Contraception      18%
STIs               15%
Other              12%
```

Percentages above are illustrative only.

---

# 39. Recommended Age Filter Behaviour

On a topic chart:

```text
Topic distribution
```

allow:

```text
Age
[ All ▼ ]
```

The user can select:

```text
14
```

and the chart recalculates using only interactions where:

```text
Idade = 14
```

---

# 40. Exact Age vs Age Group

These answer different questions.

```text
Age = 14
```

supports precise behavioural analysis.

```text
Age group = 10–14
```

supports programme reporting and broader comparison.

Where legitimately collected, preserve both analytical possibilities.

---

# 41. Topics

Topics should use controlled categories.

Examples may include:

```text
Contraception
Menstruation
STIs
Pregnancy
Relationships
Sexual health
Gender-based violence / safety
General wellbeing
Other
```

The final taxonomy should align with approved SAAJ knowledge/content and programme reporting needs.

---

# 42. Tema Principal

Each interaction should ideally have one primary analytical topic where classification is meaningful.

Example:

```text
Tema Principal = Contracepção
```

---

# 43. Subtema

A more specific secondary classification may be used.

Example:

```text
Tema Principal = Contracepção
Subtema = Preservativo
```

or:

```text
Tema Principal = Menstruação
Subtema = Atraso menstrual
```

Subtopic should not replace the stable top-level taxonomy.

---

# 44. Topic Classification Must Be Controlled

Do not let every conversation generate arbitrary analytical categories such as:

```text
Question about pills
Pill issue
Birth-control pill
Contraceptive pills
Oral contraception question
```

when these represent the same concept.

Use controlled classification.

---

# 45. Free Text vs Analytical Classification

The user's original message and the analytical topic are different.

Example:

```text
User text:
"Esqueci de tomar a pílula ontem..."
```

may classify as:

```text
Tema Principal = Contracepção
Subtema = Pílula
```

Generic dashboard analytics should use the classification rather than exposing the raw message.

---

# 46. Risk

Risk should use an approved controlled framework.

Potential conceptual values:

```text
Baixo
Moderado
Alto
```

or another approved model.

Do not create risk categories solely for dashboard aesthetics.

---

# 47. Risk Is Sensitive

Risk information should not be exposed unnecessarily in:

* public analytics;
* ordinary frontend analytics;
* URLs;
* conversation previews.

Operational access must be appropriately controlled.

---

# 48. Risk Dashboard

Where programme teams legitimately need it, the dashboard may show:

```text
Interações por nível de risco
```

and trends over time.

This should use aggregated data.

---

# 49. Referral

Referral should be explicitly measurable where the assistant/service logic recommends or initiates a referral.

Conceptually:

```ts
referral = true;
```

Additional structured fields may identify approved referral categories where necessary.

---

# 50. Referral Rate

Conceptually:

```text
Referral rate =
interactions resulting in referral
÷
eligible/assessed interactions
× 100
```

The denominator must be explicitly defined.

Do not automatically use all platform accesses as the denominator.

---

# 51. Referral Destination

Where operationally needed, destination may be categorised.

Examples:

```text
SAAJ / health facility
Clinical care
Psychosocial support
Protection service
Other approved referral
```

Only collect the level of detail required for service delivery and reporting.

---

# 52. Current Marcações Fields

The current working appointment table includes:

```text
Marcação ID
Session ID
User_ID
Interação Record ID
Data da Marcação
Origem
Província
Nome
Idade
Grupo Etário
Género
Bairro
Tema Principal
Subtema
Risco
Observações Técnicas
Assistente
```

This table contains more identifiable information than ordinary product analytics and must be treated accordingly.

---

# 53. Appointment Record Creation

Create a `Marcações` record only when a real appointment has been made.

Correct:

```text
booking confirmed
↓
Marcações record
```

Incorrect:

```text
assistant recommends appointment
↓
Marcações record
```

Recommendation and booking are not the same event.

---

# 54. Interaction-to-Appointment Link

Where an appointment follows an interaction:

```text
Interação Record ID
```

may link the two records.

This enables analysis such as:

```text
How many referred interactions became appointments?
```

---

# 55. Direct Appointment

If the user books directly from Home:

```text
Início
↓
Marcar encontro
```

there may be no preceding interaction record.

The data model must allow:

```text
Interação Record ID = null
```

rather than creating a fake interaction.

---

# 56. Appointment Origin

Useful controlled origins may include:

```text
home
assistant_profile
chat
voice_call
```

This supports analysis of which pathways generate appointments.

---

# 57. Appointment Funnel

Useful appointment indicators include:

```text
Appointments created
Appointments completed
Appointments cancelled
Appointments rescheduled
No-shows
```

where reliable source data exists.

Do not calculate a status that cannot actually be observed.

---

# 58. Consultation Completion

A confirmed appointment becomes a completed consultation only when there is reliable evidence that the service occurred.

Do not infer:

```text
appointment date passed
=
consultation completed
```

---

# 59. No-Show

A no-show requires a reliable attendance status.

Conceptually:

```text
Appointment scheduled
+
appointment time passed
+
attendance status = absent
↓
No-show
```

Do not classify all appointments without consultation records as no-shows unless the operational process guarantees that interpretation.

---

# 60. No-Show Rate

Conceptually:

```text
No-show rate =
confirmed appointments classified as no-show
÷
appointments expected to occur
× 100
```

Exclude appointments not yet due.

Handle cancellations/rescheduling according to the approved operational definition.

---

# 61. Waiting Time

Where timestamps are available:

```text
Waiting time =
consultation/service start
-
appointment/request time
```

The exact definition must be agreed.

Possible interpretations include:

```text
booking → scheduled appointment
```

or:

```text
arrival → actual service
```

Do not mix them under one KPI.

---

# 62. Satisfaction

Satisfaction should use one stable data type.

Current architecture has a potential inconsistency between:

```text
string
```

and:

```text
numeric Airtable field
```

This must be resolved.

---

# 63. Recommended Satisfaction Model

If using a numeric scale:

```text
1
2
3
4
5
```

store it as a number.

Do not send:

```text
"Muito satisfeito"
```

into a field expected to be numeric unless an explicit mapping exists.

---

# 64. Satisfaction Mapping

If conversational responses use labels, map them centrally.

Example:

```text
Muito insatisfeito → 1
Insatisfeito       → 2
Neutro             → 3
Satisfeito         → 4
Muito satisfeito   → 5
```

Only use this if it matches the approved satisfaction instrument.

---

# 65. Satisfaction KPI

Potential indicators:

```text
Average satisfaction
Distribution by score
% satisfied
```

The dashboard must state the denominator and scale.

Do not present an average if the underlying field contains inconsistent values.

---

# 66. Gender

Where gender is legitimately collected, it may support equity analysis.

Use controlled values aligned with the approved data-collection instrument.

Do not infer gender from:

* assistant choice;
* name;
* voice;
* conversation topic.

---

# 67. Bairro

Neighbourhood/residence may be operationally useful for appointments/service planning.

It is more granular location information and should not automatically enter every generic analytics event.

Use it only where required.

---

# 68. Province and District Should Come From the Best Legitimate Source

For app interactions, geography may come from the user's selected SAAJ location.

For appointment/service records, operationally confirmed location information may also exist.

Define which source is authoritative for each indicator.

Do not silently combine conflicting geographic meanings.

---

# 69. Acessos à Plataforma

This table should focus on reach/use of the platform.

Potential fields include:

```text
Access ID
Anonymous User ID where appropriate
Date/time
Province
District where available
Service area
Device/category where legitimately useful
```

Do not duplicate health-topic data into access records unless there is a clear need.

---

# 70. Unique Users vs Total Accesses

Dashboard labels must distinguish:

```text
Total accesses
```

from:

```text
Unique users
```

Example:

One user opens SAAJ five times:

```text
Total accesses = 5
Unique users = 1
```

provided the anonymous identity remains available.

---

# 71. Access Definition Must Be Explicit

Decide what creates an access record.

Recommended example:

```text
one meaningful application session
```

rather than every:

```text
page view
component render
route transition
```

Otherwise access metrics become inflated.

---

# 72. Sessionisation

If access sessions are used, define the inactivity rule consistently.

Do not let every frontend reload automatically become a new programme access without considering session behaviour.

Exact sessionisation logic belongs in implementation documentation.

---

# 73. Dashboard — Visão Geral

The overview page should provide a concise programme picture.

Potential structure:

```text
VISÃO GERAL

[KPI] Acessos
[KPI] Interações
[KPI] Marcações
[KPI] Consultas

Acessos por Província
[chart]

Interações por Província
[chart]

Tendência ao longo do tempo
[chart]

Principais temas
[chart]
```

Avoid overloading the overview with every available metric.

---

# 74. Acessos by Province Placement

The geographic access chart should answer:

```text
Where is the platform reaching users?
```

It should sit near the access KPI rather than being buried among clinical indicators.

---

# 75. Interações Page

The interaction page may include:

```text
Total interactions
Unique interacting users
Text vs voice
Tonito vs Manuela
Interactions by province
Interactions by district
Topics
Age/topic analysis
Risk
Referrals
Satisfaction
```

---

# 76. Geographic Interaction Chart

The chart should answer:

```text
Where are conversations/interactions happening?
```

Do not label it simply:

```text
Users by province
```

if the measure is actually interaction records.

Use precise labels.

---

# 77. Recommended Chart Labels

Prefer:

```text
Acessos por Província
```

and:

```text
Interações por Província
```

rather than ambiguous:

```text
Utilização por Província
```

when the underlying measures differ.

---

# 78. Province Chart Design

For comparisons across provinces, a horizontal bar chart is generally appropriate.

Conceptually:

```text
Acessos por Província

Inhambane      █████████████  1,240
Maputo Cidade  █████            420
Gaza           ██               180
Nampula        █                 95
```

Sort descending unless another analytical ordering is required.

---

# 79. District Chart

When province filter is:

```text
Inhambane
```

district analysis can become more prominent.

Example:

```text
Interações por Distrito

Maxixe
Massinga
Vilankulo
Morrumbene
...
```

---

# 80. Map vs Bar Chart

Maps are useful for spatial pattern recognition.

Bar charts are generally better for exact comparison.

The dashboard may use both when they answer different questions.

Do not use decorative maps that make values harder to compare.

---

# 81. Topic Dashboard

Recommended analysis:

```text
Principais temas
```

with:

* count;
* percentage;
* period comparison where useful.

Topic classification should be based on structured categories rather than raw word frequency.

---

# 82. Topic by Age

A particularly useful visual should support:

```text
Topic
×
Age
```

Example question:

```text
Among users aged 14,
what are the most common topics?
```

This can be implemented through:

* exact-age filter;
* age-group filter;
* stacked bars;
* matrix/heatmap where appropriate.

---

# 83. Topic Heatmap

A future/advanced visual could show:

```text
              10 11 12 13 14 15 16 17 18 19 ...
Menstruation
Contraception
STIs
Relationships
Pregnancy
...
```

Intensity represents interaction count or share.

Use only where sample sizes and privacy thresholds make it appropriate.

---

# 84. Small-Number Privacy

Highly granular combinations may identify individuals.

Example:

```text
District
+
Age = 14
+
Rare topic
+
Single interaction
```

could create disclosure risk.

Consider suppressing or grouping very small cells in programme dashboards.

The exact threshold should be defined in the privacy/data-governance policy.

---

# 85. Dashboard Filters and Privacy

A dashboard should not allow unrestricted drilling until one person can effectively be isolated.

Access controls and small-number suppression should be considered for sensitive dimensions.

---

# 86. Risk by Geography

If required operationally:

```text
Risk level by province/district
```

should be aggregated.

Avoid exposing identifiable user-level risk records in a general programme dashboard.

---

# 87. Referral Dashboard

Potential KPIs:

```text
Number referred
% of assessed interactions referred
Referral destination
Referral by district
Referral by age group
Referral by topic
```

Definitions must be stable.

---

# 88. Appointment Dashboard

Potential KPIs:

```text
Appointments made
Appointments by district
Appointments by assistant origin
Appointments by source
Attendance
No-show
Rescheduled
Cancelled
```

Only include statuses reliably captured.

---

# 89. Consultation Dashboard

Potential indicators:

```text
Completed consultations
Consultations by service location
Age group
Gender where available
Reason/service category
Referral origin
```

Avoid duplicating identifiable clinical records into general analytics unnecessarily.

---

# 90. Funnel / Journey Metrics

`JORNADA_METRICAS` may support the service journey.

Conceptually:

```text
Acessos
   ↓
Interações
   ↓
Referidos
   ↓
Marcações
   ↓
Consultas
```

Potential conversion metrics:

```text
Access → Interaction

Interaction → Referral

Referral → Appointment

Appointment → Consultation
```

Each denominator must be defined explicitly.

---

# 91. Funnel Does Not Mean Every User Should Reach Consultation

The purpose of SAAJ is not to maximise appointments at all costs.

Many users may only need reliable information.

Therefore a lower:

```text
Interaction → Appointment
```

rate is not automatically a poor outcome.

Interpretation depends on user need and service logic.

---

# 92. RESUMOS_OPERACIONAIS

`RESUMOS_OPERACIONAIS` may contain pre-calculated or periodically aggregated metrics where useful for performance and reporting.

Avoid making it a second uncontrolled copy of raw tables.

Every summary field should have:

* source;
* formula;
* reporting period;
* refresh rule.

---

# 93. Derived Metrics

Derived metrics should be calculated consistently.

Example:

```text
Referral rate
```

should not use one formula on the overview page and another formula on the interactions page.

Create one metric definition.

---

# 94. Metric Dictionary

Maintain a metric dictionary.

Example:

```text
Metric:
Total Interactions

Definition:
Number of valid interaction records
within selected reporting period.

Source:
Interações

Date field:
Data da Interação

Deduplication:
By Interação ID
```

This reduces dashboard inconsistency.

---

# 95. Example Metric Definition — Unique Users

```text
Metric:
Unique Interacting Users

Definition:
Distinct valid User_ID values among
interaction records in the selected period.

Source:
Interações

Limitation:
Users whose anonymous/device identity changes
may be counted more than once.
```

Limitations should be documented.

---

# 96. Anonymous Identity Limitation

Because SAAJ does not require accounts:

```text
one human
```

may occasionally become:

```text
multiple User_IDs
```

after:

* browser data clearing;
* new browser;
* new device.

Therefore `unique users` should be interpreted as:

```text
unique recognised pseudonymous users
```

rather than guaranteed unique human beings.

---

# 97. Cross-Channel Deduplication

Text and voice interactions should only be linked to the same pseudonymous user where there is a legitimate, privacy-conscious linking mechanism.

Do not probabilistically identify people based on:

* name similarity;
* age;
* district;
* conversation content.

---

# 98. Time

Store event timestamps in a consistent technical format.

For operational display and reporting in Mozambique:

```text
Africa/Maputo
UTC+2
```

must be handled consistently.

---

# 99. Do Not Present UTC to Users

User-facing:

```text
14:00
```

should mean local Mozambique time where that is the relevant service context.

Do not accidentally display:

```text
12:00 UTC
```

to users.

---

# 100. Timestamp Storage

Backend systems may use ISO timestamps.

Example:

```text
2026-09-21T14:00:00+02:00
```

or a consistently documented UTC strategy.

The key requirement is:

```text
store consistently
convert deliberately
display Africa/Maputo correctly
```

---

# 101. Data Validation

Validate controlled fields before inserting them.

Examples:

```text
assistant
origin
serviceArea
age
ageGroup
risk
satisfaction
province
district
```

Do not allow malformed values to silently pollute dashboards.

---

# 102. Missing Data

Missing information should remain explicitly missing.

Do not invent values to make charts complete.

Example:

```text
Age not collected
```

should become:

```text
Unknown / Not available
```

where analytically necessary.

It should not become:

```text
Age = 18
```

or be silently redistributed.

---

# 103. Dashboard Missing Values

Where useful, dashboards may display:

```text
Sem informação
```

as a category.

This helps reveal data-quality problems rather than hiding them.

---

# 104. Current Missing Dashboard Data

During development/testing, some dashboard cards or charts may be empty because the corresponding fields have not yet been populated through simulated or live interactions.

The dashboard must distinguish:

```text
No data available
```

from:

```text
0
```

These are not always the same.

---

# 105. Zero vs Missing

Example:

```text
No appointment records received
```

may mean:

```text
data pipeline not populated
```

not necessarily:

```text
0 appointments occurred
```

The dashboard should avoid misleading interpretation during implementation/testing.

---

# 106. Test Data

Development data should be clearly separable from production data.

Do not allow test calls, simulated bookings or developer interactions to contaminate programme reporting.

Potential mechanisms include:

```text
environment
test flag
separate base
controlled test identifiers
```

---

# 107. Data Deduplication

Automation retries may create duplicate records.

Use stable IDs such as:

```text
Interação ID
Session ID
Marcação ID
provider event ID
```

to support idempotent processing.

---

# 108. Vapi Interaction Flow

Current conceptual flow:

```text
Vapi call ends
      ↓
structured output
      ↓
n8n
      ↓
validate / transform
      ↓
Interações
      ↓
if real appointment created
      ↓
Marcações
```

A voice call should not automatically create an appointment record.

---

# 109. Vapi Session Convention

Current convention:

```text
Session ID = Vapi Call ID
```

This provides a stable reference for the interaction.

---

# 110. Structured Output

Structured outputs should provide analytical fields rather than requiring dashboards to parse free-text call transcripts.

Potential fields include:

```text
age
age group
topic
subtopic
risk
satisfaction
appointment status
referral
```

Only include fields legitimately supported by the conversation/workflow.

---

# 111. Structured Output Schema Consistency

Schema definitions must match destination field types.

For example:

```text
satisfação
```

must not be defined as a free-form string if Airtable expects a number.

Likewise nullable fields must use schema definitions that genuinely permit null values.

---

# 112. Nullability

If a value may legitimately be unavailable:

```text
subtopic = null
```

the structured-output schema must support that.

Do not use:

```text
description: "nullable"
```

while the actual schema only accepts a string.

Description text does not change the data type.

---

# 113. n8n Role

n8n is appropriate for:

* post-interaction processing;
* validation;
* transformations;
* Airtable writes;
* appointment workflows;
* reminders;
* summaries;
* operational integrations.

It should not become the only source of truth for metric definitions.

---

# 114. Airtable Role

Airtable may support V1 operational storage and dashboards.

However, table design should remain structured enough that future migration does not require reconstructing meaning from free text.

Use:

* stable field names;
* controlled categories;
* IDs;
* documented relationships.

---

# 115. Dashboard Source

Every dashboard visual should have an identifiable source.

Example:

```text
Chart:
Interações por Província

Source:
Interações

Measure:
COUNT(Interação ID)

Dimension:
Província
```

---

# 116. Dashboard Calculation Documentation

For every KPI define:

```text
Name
Purpose
Source table
Numerator
Denominator if applicable
Date field
Filters
Deduplication rule
Missing-value handling
```

This should exist outside the visual dashboard itself.

---

# 117. Example — Acessos

```text
Metric:
Acessos à Plataforma

Source:
Acessos à Plataforma

Measure:
Count of valid access sessions

Geographic dimension:
Selected province/district

Date:
Access timestamp
```

---

# 118. Example — Interações

```text
Metric:
Interações

Source:
Interações

Measure:
Count of valid Interação ID

Breakdowns:
Province
District
Assistant
Origin
Age group
Topic
Risk
```

---

# 119. Example — Marcações

```text
Metric:
Marcações

Source:
Marcações

Measure:
Count of confirmed Marcação ID

Do not include:
appointment recommendations that were never booked
```

---

# 120. Example — Consultas

```text
Metric:
Consultas

Source:
Consultas

Measure:
Count of reliably completed service encounters
```

---

# 121. Privacy Boundary — Product Analytics

Generic product analytics may measure:

```text
screen viewed
assistant selected
conversation started
call started
appointment opened
booking completed
location category
```

It should generally not receive:

```text
raw conversation text
full name
phone number
clinical notes
detailed health concern
```

---

# 122. Privacy Boundary — Operational Health Data

Operational systems may require more sensitive information for legitimate service delivery.

Examples:

```text
appointment contact information
risk/referral information
service notes
```

Access to these systems should be more restricted than ordinary product analytics.

---

# 123. Privacy Boundary — Dashboard

The general programme dashboard should prefer:

```text
aggregated data
```

rather than exposing identifiable records.

A programme manager should not need to read individual sexual-health conversations to understand topic trends.

---

# 124. Raw Transcript Analytics

Do not send entire transcripts into generic analytics platforms for convenience.

Topic/risk classification should produce the minimum structured fields required for analysis.

---

# 125. Data Minimisation

For every proposed field ask:

```text
Why do we need this?
Who uses it?
For what decision?
How long is it needed?
Does it need to be identifiable?
```

If there is no clear answer, reconsider collection.

---

# 126. Dashboard Access Control

Operational dashboards may contain sensitive programme information.

Production access should be limited to authorised users.

More sensitive record-level views should have stronger controls than aggregate views.

---

# 127. Export

If dashboard exports are supported:

* respect active filters;
* avoid unnecessary identifiable fields;
* clearly label reporting period;
* protect sensitive exports.

Do not make raw sensitive data export the default.

---

# 128. Dashboard Responsiveness

The operational dashboard should remain usable on desktop and tablet.

Mobile may provide simplified monitoring views, but detailed analytical work is expected primarily on larger screens.

This is separate from the youth-facing SAAJ application, which is mobile-first.

---

# 129. Data Freshness

Dashboard users should know whether data is:

```text
real-time
near-real-time
daily refreshed
periodically aggregated
```

Do not imply real-time monitoring if summaries update only periodically.

---

# 130. Last Updated

Where useful, display:

```text
Última actualização:
21 Set 2026 · 08:30
```

based on the actual data-refresh process.

---

# 131. Operational Alerts

The analytics architecture may later support alerts for operational problems such as:

```text
sudden increase in failed calls
scheduler failures
missing interaction records
data pipeline interruption
```

These are operational monitoring features, not youth-facing notifications.

---

# 132. Heatmaps

Heatmaps may be useful for:

* topic × age;
* topic × district;
* interactions over time;
* service demand patterns.

Use them only when they make patterns clearer.

Do not create heatmaps simply because they look advanced.

---

# 133. Geographic Heatmap

If a geographic heatmap is implemented, use aggregated values at an appropriate geographic level.

Do not map precise individual user coordinates.

V1 does not require precise GPS.

---

# 134. Trend Analysis

Important indicators should support time trends.

Examples:

```text
Acessos over time
Interações over time
Appointments over time
Topics over time
Referral rate over time
Satisfaction over time
```

This helps distinguish one-off spikes from sustained patterns.

---

# 135. Comparison Period

Where useful, dashboards may compare:

```text
current period
vs
previous comparable period
```

The comparison must use equivalent durations.

Do not compare:

```text
7 days
vs
full previous month
```

without clearly stating it.

---

# 136. Percentage Calculations

Every percentage must have a clear denominator.

Example:

```text
% referred
```

must answer:

```text
referred out of what?
```

Do not display percentages without documented denominators.

---

# 137. Percentage and Count Together

Where useful, display:

```text
124 (18%)
```

rather than percentage alone.

This prevents small denominators from appearing disproportionately important.

---

# 138. Low Sample Size

Example:

```text
80% satisfied
```

may sound strong.

But if:

```text
n = 5
```

it needs context.

Show sample size where interpretation could otherwise be misleading.

---

# 139. KPI Cards

KPI cards should prioritise the most important indicators.

Avoid dozens of cards.

Potential Overview cards:

```text
Acessos
Interações
Marcações
Consultas
```

Secondary indicators belong on specialised pages.

---

# 140. KPI Calculation Failures

If a KPI cannot be calculated because required fields are missing, display:

```text
Sem dados
```

or an equivalent state.

Do not silently convert missing data to zero.

---

# 141. Data Quality Indicators

The dashboard may eventually include internal quality monitoring such as:

```text
% interactions with age available
% interactions with topic classified
% records with valid province
% appointment records linked to interactions
```

This helps teams understand whether programme indicators are reliable.

---

# 142. Topic Classification Coverage

Example:

```text
Topic classification coverage =
interactions with valid Tema Principal
÷
all eligible interactions
× 100
```

This is a data-quality metric, not a youth outcome.

---

# 143. Age Completeness

Example:

```text
Age completeness =
interactions with valid age
÷
interactions where age should have been collected
× 100
```

Do not penalise interactions where age was intentionally not required.

---

# 144. Assistant Comparison

The dashboard may compare Tonito and Manuela usage descriptively.

Examples:

```text
Interactions by assistant
Topics by assistant
Age groups by assistant
Channel usage by assistant
```

Do not automatically interpret higher usage as one assistant being "better."

---

# 145. Channel Comparison

Useful:

```text
Text vs Voice
```

Potential measures:

```text
interaction volume
topic distribution
age distribution
referral rate
appointment conversion
satisfaction
```

Interpret differences carefully because voice is only available in Maxixe/Massinga.

---

# 146. Geographic Confounding

Do not compare:

```text
voice vs text
```

as though both channels are equally available nationally.

Voice is currently restricted to:

```text
Maxixe
Massinga
```

Dashboard interpretation must preserve that context.

---

# 147. Assistant Availability Context

Both Tonito and Manuela exist across all three service areas for text.

Voice exists only for:

```text
Tonito Maxixe
Tonito Massinga
Manuela Maxixe
Manuela Massinga
```

Analytics should reflect these product constraints.

---

# 148. Appointment Availability Context

Appointment metrics are only relevant to:

```text
Maxixe
Massinga
```

in V1.

Do not present:

```text
appointment conversion by all provinces
```

without clearly handling areas where appointments are not offered.

---

# 149. Data Dictionary

Maintain a central data dictionary for fields such as:

```text
User_ID
Session ID
Origem
Província
Distrito
Service Area
Assistente
Idade
Grupo Etário
Tema Principal
Subtema
Risco
Referral
Satisfação
```

For each define:

```text
description
type
allowed values
source
required/optional
privacy classification
```

---

# 150. Example Field Definition

```text
Field:
Assistente

Type:
Categorical

Allowed values:
Tonito
Manuela

Source:
Application routing / assistant configuration

Purpose:
Analyse service usage by assistant

Sensitive:
Low by itself; may become sensitive when linked to health interaction data
```

---

# 151. Environment Separation

At minimum distinguish:

```text
development
testing
production
```

Production dashboards should not include development interactions.

---

# 152. Monitoring Pipeline Failures

If:

```text
Voiceflow/Vapi
↓
n8n
↓
Airtable
```

fails, the dashboard should not quietly continue implying complete data.

Operational monitoring should detect missing or failed writes.

---

# 153. Idempotency

Webhook/event retries must not create multiple records for the same event.

Conceptually:

```text
provider event
↓
stable event/session ID
↓
check existing record
↓
create or update
```

rather than:

```text
every retry
↓
new record
```

---

# 154. Reprocessing

If an automation needs to be re-run, stable IDs should allow safe reprocessing.

This is especially important for:

* Vapi call completion;
* Cal.com bookings;
* reminders;
* structured-output extraction.

---

# 155. Source of Truth

For each data type, define the authoritative source.

Example:

```text
Current app location
→ SAAJ application state

Voice call ID
→ Vapi

Confirmed appointment
→ Cal.com / approved booking workflow

Interaction analytical record
→ Interações

Completed consultation
→ approved service/Consultas process
```

Do not allow whichever system was updated last to automatically become authoritative.

---

# 156. Recommended Dashboard Pages

A practical dashboard structure may include:

```text
Visão Geral

Acessos

Interações

Marcações

Consultas

Jornada

Qualidade dos Dados
```

Exact navigation may remain simpler depending on operational need.

---

# 157. Visão Geral

Primary questions:

```text
How much is SAAJ being used?

Where?

Through which channels?

What are the main topics?

How many users proceed to services?
```

Keep it executive and concise.

---

# 158. Acessos

Primary questions:

```text
How many accesses?

How many recognised unique users?

Which provinces?

Which districts?

How is reach changing over time?
```

---

# 159. Interações

Primary questions:

```text
How many meaningful interactions?

Tonito or Manuela?

Text or voice?

Where?

Which ages?

Which topics?

Which risks?

How many referrals?

How satisfied?
```

---

# 160. Marcações

Primary questions:

```text
How many appointments?

Maxixe vs Massinga?

Where did bookings originate?

Which assistant/channel preceded them?

Attendance status?

No-show?
```

---

# 161. Consultas

Primary questions:

```text
How many scheduled users received services?

Which service locations?

Which demographic groups?

Which service categories?

How long did users wait where measurable?
```

---

# 162. Jornada

Primary questions:

```text
How do users move through:

Access
→ Interaction
→ Referral
→ Appointment
→ Consultation?
```

Do not imply that every journey should end in consultation.

---

# 163. Qualidade dos Dados

Primary questions:

```text
Are expected records arriving?

Which fields are missing?

Are classifications valid?

Are duplicates occurring?

Are automation pipelines functioning?
```

This page can be restricted to administrators/programme data teams.

---

# 164. Dashboard Global Filter Example

```text
Período      [ 01 Sep — 30 Sep ▼ ]

Província    [ Todas ▼ ]

Distrito     [ Todos ▼ ]

Assistente   [ Todos ▼ ]

Canal        [ Todos ▼ ]

Grupo Etário [ Todos ▼ ]
```

Only show filters meaningful to the current page.

---

# 165. Filter Consistency

If:

```text
Province = Inhambane
Age = 15–19
```

is selected, all compatible charts should use the same filtered population.

Avoid charts silently ignoring active filters without indication.

---

# 166. Incompatible Filters

Some indicators may not contain every dimension.

For example, an access record may not contain:

```text
health topic
```

Therefore a `Tema Principal` filter should not be falsely applied to access KPIs.

The dashboard should disable or scope incompatible filters clearly.

---

# 167. Privacy Thresholds

Before production, define whether very small values should be:

```text
suppressed
grouped
rounded
```

especially for combinations involving:

```text
age
district
risk
sensitive topic
```

---

# 168. Data Retention

Retention periods must be explicitly defined for:

```text
raw interactions
transcripts
appointment data
voice records/transcripts
analytics
aggregated summaries
```

Do not assume all data should be kept indefinitely.

Detailed retention rules belong in the privacy/security specification.

---

# 169. Data Deletion

Local user deletion controls and operational/server deletion are separate.

Dashboard records must not be silently deleted merely because the user clears browser state unless an approved server-side deletion workflow requires it.

---

# 170. Auditability

Important transformations should be reproducible.

For example, programme teams should be able to understand:

```text
How did the dashboard calculate
Referral Rate = 18.4%?
```

without reverse-engineering UI code.

---

# 171. Analytics Should Support Decisions

Every major dashboard element should answer an operational or programme question.

Examples:

```text
Do we need more appointment capacity in Maxixe?

Which topics are most common among younger adolescents?

Is Massinga voice usage increasing?

Where is platform reach low?

Are users being referred but not booking?

Are no-shows increasing?

Are important fields missing?
```

If a chart does not support a useful decision, reconsider whether it belongs.

---

# 172. Acceptance Behaviour

The data and analytics architecture is correct when:

* platform accesses and interactions are separate concepts;
* interactions and appointments are separate concepts;
* appointments and consultations are separate concepts;
* voice calls feed interaction data appropriately;
* confirmed bookings create appointment records;
* recommendations alone do not create appointment records;
* direct Home bookings can exist without fake interaction records;
* anonymous user IDs contain no personal information;
* User_ID and Session ID remain separate;
* Vapi Call ID can serve as the voice Session ID;
* geographic fields are normalised;
* province and district are separate;
* service area does not replace actual location;
* dashboard supports access by province;
* dashboard supports interaction by province;
* district analysis is available where data exists;
* age and age-group analysis are consistent;
* exact-age topic filtering is supported where age is legitimately collected;
* topic classification uses controlled categories;
* raw conversation text is not required for ordinary dashboard analysis;
* risk and referral data are treated as sensitive;
* appointment indicators use confirmed bookings;
* consultation indicators use reliable service completion;
* no-shows are not inferred merely from missing consultation data;
* satisfaction uses a consistent data type;
* missing data is not automatically converted to zero;
* test data can be separated from production;
* duplicate provider events do not create duplicate records;
* dashboard KPIs have documented definitions;
* percentages have explicit denominators;
* unique-user limitations of anonymous access are documented;
* generic analytics do not receive unnecessary identifiable health information;
* small-number disclosure risk is considered;
* dashboards prefer aggregated programme information;
* provider/channel comparisons retain geographic availability context;
* all timestamps are handled consistently with Africa/Maputo;
* dashboard filters behave consistently;
* pipeline/data-quality failures can be identified.

---

# 173. Final Data Architecture

```text
                           SAAJ VIRTUAL
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
       ACCESS                 TEXT                  VOICE
          │                     │                     │
          ▼                     └──────────┬──────────┘
 Acessos à Plataforma                     │
                                          ▼
                                     Interações
                                          │
                           ┌──────────────┼──────────────┐
                           │              │              │
                           ▼              ▼              ▼
                        Topics          Risk          Referral
                                                          │
                                                          ▼
                                                    Appointment?
                                                          │
                                               ┌──────────┴──────────┐
                                               │                     │
                                              NO                    YES
                                               │                     │
                                               ▼                     ▼
                                         Journey ends           Marcações
                                                                     │
                                                                     ▼
                                                               Attendance
                                                                     │
                                                  ┌──────────────────┼─────────────┐
                                                  ▼                  ▼             ▼
                                             Consultation         No-show      Cancelled
                                                  │
                                                  ▼
                                              Consultas


                         ANALYTICAL LAYER
                                │
              ┌─────────────────┼──────────────────┐
              ▼                 ▼                  ▼
     RESUMOS_OPERACIONAIS  JORNADA_METRICAS    DASHBOARD
                                                   │
                         ┌─────────────────────────┼────────────────────────┐
                         ▼                         ▼                        ▼
                    Visão Geral                Interações               Serviços
                         │
                  ┌──────┴──────┐
                  ▼             ▼
          Acessos por       Interações por
           Província          Província
```

The governing rule is:

```text
DO NOT COLLECT DATA
JUST BECAUSE IT CAN BE COLLECTED.

MEASURE WHAT IS NEEDED
TO UNDERSTAND REACH,
USER NEEDS,
SERVICE QUALITY
AND THE CARE JOURNEY.

KEEP PRODUCT ANALYTICS,
OPERATIONAL HEALTH DATA
AND IDENTIFIABLE INFORMATION
SEPARATED AS FAR AS POSSIBLE.
```

```

Next is **`14-integrations-and-api-architecture.md`**. That is where we should finally bring all the technical pieces together into one architecture: **Next.js → Voiceflow, Vapi, Cal.com, n8n and Airtable**, server/client boundaries, the six Voiceflow projects, four Vapi assistants, Cal.com embeds, API routes, environment variables, webhook flows, error handling, retries, idempotency, and exactly which credentials can and cannot reach the browser.
```
