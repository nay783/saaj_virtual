Next is the exact file we reserved: **`19-seo-ai-discoverability.md`**. The key distinction here is that **the private SAAJ application is not the SEO surface**. We create a public, authoritative health-information layer that can be indexed and cited, and use it to lead users naturally into SAAJ Virtual.

````markdown id="saaj19seo"
# SAAJ Virtual — SEO & AI Discoverability

## 1. Purpose

This document defines how SAAJ Virtual should be discoverable through:

- Google and other search engines;
- AI-powered search experiences;
- generative AI assistants;
- answer engines;
- social/link previews;
- direct searches for sexual and reproductive health information in Mozambique.

The objective is not simply to make the application technically indexable.

The objective is to create a useful, trustworthy and publicly accessible information layer around SAAJ Virtual that helps adolescents and young people find reliable sexual and reproductive health information and then access SAAJ support when appropriate.

The governing principle is:

```text
PUBLIC HEALTH INFORMATION
        ↓
SEARCHABLE
        ↓
UNDERSTANDABLE
        ↓
TRUSTWORTHY
        ↓
CONNECTED TO SAAJ
        ↓
PRIVATE SUPPORT
```

---

# 2. Search Visibility and Private Support Are Different Layers

SAAJ Virtual contains two fundamentally different environments.

## Public layer

Designed to be:

```text
discoverable
indexable
shareable
crawlable
informational
```

## Private application layer

Designed for:

```text
personal conversations
assistant interactions
voice calls
appointments
conversation history
user-specific state
```

These layers must not be treated identically.

---

# 3. Core Rule

```text
PUBLIC HEALTH INFORMATION
CAN BE INDEXED.

PRIVATE USER INTERACTIONS
MUST NOT BE INDEXED.
```

Search visibility must never come at the cost of conversation privacy.

---

# 4. Recommended Information Architecture

A possible public structure is:

```text
/
├── /saude-sexual/
├── /contracepcao/
├── /menstruacao/
├── /gravidez/
├── /ist/
├── /relacionamentos/
├── /onde-procurar-ajuda/
├── /sobre/
└── /app/
```

The exact final Portuguese slugs may be refined before launch.

---

# 5. Role of `/`

The root page should introduce:

```text
SAAJ Virtual
```

and explain in clear language:

- what SAAJ is;
- who it is for;
- what kind of support is available;
- that users can talk privately with Tonito or Manuela;
- that no account is required for the basic support journey;
- that some services depend on location.

It should also provide access to public health-information topics.

---

# 6. Public Homepage Is Not the App Home

Do not confuse:

```text
/
```

with:

```text
/app/
```

Conceptually:

```text
/
=
public discoverable entry point
```

```text
/app/
=
interactive SAAJ Virtual experience
```

---

# 7. Direct App Access

Users who already know SAAJ should be able to enter the application directly.

For example:

```text
/app/
```

should start or resume the SAAJ application journey.

Users should not be forced through the public informational homepage every time.

---

# 8. Public Health Topics

Initial public content should focus on high-value sexual and reproductive health topics relevant to SAAJ's purpose.

Core topic areas may include:

```text
Saúde sexual e reprodutiva

Contracepção

Menstruação

Gravidez

Infecções sexualmente transmissíveis

Relacionamentos saudáveis

Onde procurar ajuda
```

---

# 9. Content Expansion

These hub pages can later support more specific articles.

Example:

```text
/contracepcao/
├── metodos-contraceptivos/
├── preservativo/
├── pilula/
├── implante/
├── diu/
└── contracepcao-de-emergencia/
```

This is illustrative.

Pages should be created because they answer genuine user questions, not simply to increase page count.

---

# 10. Search Intent

Content should be written around questions young people may genuinely search.

Examples may include:

```text
Que métodos contraceptivos existem?

Como funciona o preservativo?

Posso engravidar na primeira vez?

O que fazer se a menstruação estiver atrasada?

Como saber se tenho uma ITS?

Onde posso procurar ajuda?

Como marcar uma consulta de saúde sexual?

Onde encontrar serviços de saúde para adolescentes?
```

The final content must follow approved health-information governance.

---

# 11. Mozambique Context

Generic global health content is insufficient.

Where appropriate, public information should clearly establish the Mozambican context.

Useful contextual language may include:

```text
em Moçambique
para adolescentes e jovens em Moçambique
serviços de saúde sexual e reprodutiva
SAAJ
serviços amigos dos adolescentes e jovens
```

Use such wording naturally.

Do not keyword-stuff.

---

# 12. Geographic Search Intent

Where reliable service information exists, SAAJ may support location-oriented discovery.

Examples:

```text
saúde sexual para jovens em Maxixe

SAAJ em Maxixe

serviços para adolescentes em Massinga

consulta de saúde sexual em Inhambane
```

Location pages should only be created where there is enough accurate, useful information to justify them.

---

# 13. Do Not Create Thin Location Pages

Avoid automatically generating hundreds of pages such as:

```text
/saaj/maputo/
/saaj/gaza/
/saaj/sofala/
...
```

with nearly identical content.

A location page should provide meaningful local value.

---

# 14. Maxixe and Massinga

Because Maxixe and Massinga have enhanced SAAJ Virtual capabilities, dedicated public information may eventually explain available services.

For example:

```text
SAAJ Virtual em Maxixe
```

could explain that eligible users can access:

```text
text support
voice support
appointment booking
```

if those services remain operational.

---

# 15. Other Locations

For locations currently using the Geral service model, public copy should not imply that voice calls or appointment booking are available.

The public site and application capability model must agree.

---

# 16. Content-to-Service Journey

Public content should provide a natural path into private support.

Example:

```text
SEARCH

"métodos contraceptivos"
        ↓
SAAJ PUBLIC ARTICLE
        ↓
useful answer
        ↓
"Queres falar sobre isto?"
        ↓
[ Falar com Tonito ]
[ Falar com Manuela ]
        ↓
SAAJ APP
```

---

# 17. Do Not Force Conversion

Public pages must provide useful information even if the user does not open the chat.

Avoid pages that contain only:

```text
Talk to our assistant to find out.
```

Search users should receive genuine value directly from the page.

---

# 18. Public-to-App CTAs

Potential calls to action include:

```text
Falar com Tonito

Falar com Manuela

Abrir o SAAJ Virtual

Procurar apoio
```

The exact CTA depends on context.

---

# 19. CTA Privacy

Do not embed the user's sensitive search question into the application URL.

Avoid:

```text
/app?topic=possible-pregnancy-after-unprotected-sex
```

unless a specific privacy-reviewed architecture explicitly supports it.

---

# 20. Assistant Deep Links

Public pages may deep-link to an assistant selection.

Example conceptually:

```text
/app?assistant=tonito
```

only if the parameter contains no sensitive health information.

The app must still resolve location before offering location-dependent services.

---

# 21. Health Content Ownership

Public health content must be governed.

It should not be generated dynamically by the frontend from an unrestricted AI model.

The published content should have an approved source and review process.

---

# 22. Content Quality

Every important public health page should aim to be:

- accurate;
- understandable;
- concise;
- non-judgemental;
- youth-friendly;
- contextually relevant;
- useful without requiring registration;
- clear about limitations;
- appropriately referenced.

---

# 23. Health Content Structure

A strong page may use:

```text
Clear title

Short direct answer

Explanation

What the person can do

When to seek professional support

Related questions

Reliable references

SAAJ support CTA
```

Not every page requires every section.

---

# 24. Answer First

Where appropriate, pages should answer the main question early.

Avoid forcing users to read a long introduction before receiving basic information.

Example structure:

```text
H1:
A menstruação está atrasada. O que pode significar?

Direct answer
↓
Possible explanations
↓
When pregnancy may be relevant
↓
When to seek care
↓
Talk to SAAJ
```

---

# 25. Plain Language

Prefer language understandable to adolescents and young people.

Avoid unnecessary medical jargon.

Where technical terminology is necessary:

```text
term
+
simple explanation
```

---

# 26. Portuguese Language

The primary public language should follow the approved Portuguese style used by SAAJ.

Health terminology should be:

- correct;
- locally understandable;
- consistent across public content and assistants.

---

# 27. Search Keywords Are Not the Copy Strategy

Do not produce unnatural sentences such as:

```text
SAAJ saúde sexual adolescente Moçambique
contracepção jovem Maxixe melhor saúde sexual
```

Search optimisation should emerge from useful content and clear information architecture.

---

# 28. Page Titles

Every public page should have a unique descriptive `<title>`.

Examples:

```text
Métodos contraceptivos | SAAJ Virtual

Menstruação e ciclo menstrual | SAAJ Virtual

Infecções sexualmente transmissíveis | SAAJ Virtual

Onde procurar apoio | SAAJ Virtual
```

Exact wording should reflect final content.

---

# 29. Meta Descriptions

Important public pages should have useful meta descriptions.

Example:

```text
Conhece os principais métodos contraceptivos,
como funcionam e onde procurar apoio com o
SAAJ Virtual.
```

Meta descriptions should be written for humans, not stuffed with keywords.

---

# 30. Heading Structure

Use semantic heading hierarchy:

```text
H1
 ├── H2
 │    ├── H3
 │    └── H3
 └── H2
```

Avoid using heading elements merely for visual size.

---

# 31. One Primary Page Topic

Each page should have a clear primary purpose.

Do not create one enormous page attempting to rank simultaneously for every sexual and reproductive health topic.

---

# 32. Internal Linking

Public pages should link naturally to related information.

Example:

```text
Menstruação
    ↓
Gravidez

Contracepção
    ↓
Preservativo
    ↓
ITS

Relacionamentos
    ↓
Saúde sexual
```

Internal linking helps users and search systems understand topic relationships.

---

# 33. Breadcrumbs

Deeper informational content may use breadcrumbs.

Example:

```text
Início
>
Contracepção
>
Implante contraceptivo
```

Breadcrumbs should be semantic and may support structured data.

---

# 34. Canonical URLs

Every indexable page should define the intended canonical URL.

Avoid accidental duplicate versions caused by:

```text
query parameters
tracking parameters
trailing variations
duplicate routes
```

---

# 35. Sitemap

Generate a public XML sitemap containing indexable public pages.

Conceptually:

```text
/sitemap.xml
```

Include:

```text
public homepage
topic hubs
approved articles
About
relevant public service pages
```

Do not include private user-state URLs.

---

# 36. Robots

Provide:

```text
/robots.txt
```

with appropriate crawler instructions.

Do not rely on `robots.txt` alone to protect private information.

Private content should not be publicly accessible in the first place.

---

# 37. Noindex

User-specific application surfaces should use appropriate indexing controls.

Examples include:

```text
chat
conversation history
appointment state
settings
private interaction routes
```

where applicable.

---

# 38. Private Content Must Not Depend Only on `noindex`

`noindex` is not access control.

Sensitive data should never become publicly retrievable merely because a page contains:

```html
<meta name="robots" content="noindex" />
```

---

# 39. Server Rendering

Important public information should be available in initial HTML.

For Next.js, use appropriate:

```text
server rendering
static generation
```

rather than requiring a crawler to execute a complex client-side application before discovering the article.

---

# 40. JavaScript Independence

A user or crawler should be able to obtain the main informational content without depending on Voiceflow, Vapi or Cal.com.

These integrations belong to the service layer, not public article rendering.

---

# 41. Next.js Metadata

Use the Next.js metadata architecture centrally.

Conceptually:

```ts
export const metadata = {
  title: "...",
  description: "...",
  alternates: {
    canonical: "..."
  }
};
```

Dynamic pages should generate appropriate metadata from approved content.

---

# 42. Social Metadata

Public pages should include appropriate:

```text
Open Graph
social preview
```

metadata.

This improves sharing through messaging and social platforms.

---

# 43. Social Preview Privacy

Public health articles may use descriptive previews.

Private SAAJ routes should not generate previews containing sensitive user-specific information.

---

# 44. Structured Data

Structured data may help search and AI systems understand the public site.

Potentially relevant schema types include, depending on actual page content:

```text
Organization
WebSite
WebPage
Article
BreadcrumbList
FAQPage
```

Use schema only when the visible page genuinely supports it.

---

# 45. Do Not Abuse Structured Data

Do not add:

```text
MedicalOrganization
Physician
Hospital
```

unless SAAJ or the referenced entity genuinely qualifies.

Do not misrepresent Tonito or Manuela as healthcare professionals.

---

# 46. Organization Schema

Where appropriate, public pages may describe the organisation/service responsible for SAAJ.

The final organisation schema must reflect the actual programme ownership and governance.

Do not infer ownership solely from the software developer.

---

# 47. Developer Attribution

The About page may contain:

```text
Desenvolvido por
NCAI Consultorias e Serviços, EI
```

This does not automatically mean NCAI should be represented as the healthcare provider.

---

# 48. FAQ Content

FAQ sections can be useful when they answer genuine user questions.

Example:

```text
Preciso criar uma conta?

Posso falar com Tonito e Manuela?

Posso marcar uma consulta?

O SAAJ Virtual funciona em todo Moçambique?
```

Answers must reflect actual product capability.

---

# 49. FAQ Structured Data

If FAQ structured data is used, the structured answers must match visible page content.

Do not create hidden SEO-only FAQ text.

---

# 50. AI Discoverability

AI systems increasingly retrieve and summarise information from public web sources.

SAAJ content should therefore be designed not only for traditional keyword ranking but also for clear machine understanding.

---

# 51. AI-Friendly Content Is Human-Friendly Content

Useful characteristics include:

```text
clear page topic
direct answers
strong headings
explicit definitions
consistent terminology
references
clear organisational identity
stable URLs
fresh content
```

These benefit both people and machine retrieval.

---

# 52. Generative Engine Optimisation

SAAJ may consider:

```text
GEO
Generative Engine Optimisation
```

as part of the content strategy.

This does not mean manipulating AI systems.

It means making authoritative information easier to:

```text
find
understand
verify
cite
```

---

# 53. Citation-Friendly Writing

Important factual claims should be clearly expressed and supported by reliable references.

Avoid vague claims such as:

```text
Experts say...
```

Prefer identifiable authoritative sources where appropriate.

---

# 54. Primary Sources

Health content should preferentially reference authoritative sources relevant to the subject.

Depending on the content, these may include appropriate:

```text
Mozambique health authorities
WHO
UN agencies
recognised clinical/public-health guidance
approved programme materials
```

The final reference set must be reviewed for each content area.

---

# 55. Local Authority Signals

Where official Mozambican guidance exists, it should be prioritised for local service and policy information.

International references can supplement local guidance.

---

# 56. Reference Visibility

References should not exist only in hidden metadata.

Users should be able to understand where important health information comes from.

---

# 57. Last Reviewed

Health-information pages should support a visible review indicator where appropriate.

Example:

```text
Revisto em: Setembro de 2026
```

This is particularly useful for information that may change.

---

# 58. Content Review Workflow

A future content workflow should support:

```text
Draft
↓
Health/content review
↓
Approved
↓
Published
↓
Periodic review
↓
Updated or retired
```

---

# 59. Content Freshness

Do not change publication dates merely to make old content appear new.

Update the page date when meaningful review/update actually occurs.

---

# 60. Author/Reviewer Information

Where programme governance permits, public health content may identify:

```text
reviewing organisation
clinical/public-health review process
```

rather than inventing individual medical authors.

---

# 61. Trust Page

The public site should make it easy to understand:

```text
what SAAJ Virtual is
who it serves
what it can do
what it cannot do
how privacy works
how the digital assistants work
where services are available
```

This information can live across:

```text
Sobre
Privacidade
Ajuda
```

---

# 62. Explain Tonito and Manuela

Public information should clearly describe Tonito and Manuela as digital assistants.

Do not allow search snippets or AI summaries to reasonably infer that they are human doctors or nurses.

---

# 63. AI Limitations

Where appropriate, explain that digital support does not replace professional care in situations requiring a health professional.

The exact health/safety wording should follow approved programme guidance.

---

# 64. Search Snippet Safety

Titles and descriptions should avoid exposing unnecessary sensitive assumptions.

For example, a generic service page should not imply that a visitor personally:

```text
has an STI
is pregnant
uses contraception
```

---

# 65. Public URLs

URLs should be:

```text
short
descriptive
stable
lowercase
human-readable
```

Example:

```text
/contracepcao/metodos-contraceptivos/
```

rather than:

```text
/page?id=4829&cat=7
```

---

# 66. Accents in URLs

Prefer stable ASCII slugs where practical.

Example:

```text
/contracepcao/
```

rather than relying on accented URL forms.

Visible Portuguese text retains correct accents.

---

# 67. URL Stability

Once important pages gain external links/search visibility, avoid changing URLs unnecessarily.

If a URL must change, use an appropriate permanent redirect.

---

# 68. Redirects

Use redirects for:

```text
renamed public pages
consolidated articles
changed slugs
```

Do not leave valuable links pointing to avoidable 404 pages.

---

# 69. 404 Page

The public 404 page should:

- explain the page was not found;
- provide a path to public health topics;
- provide access to SAAJ Virtual.

Do not expose technical framework errors.

---

# 70. Search Within SAAJ Content

A public content search may be considered later if the information library becomes large.

It is not required merely for SEO.

---

# 71. Performance

Search discoverability depends partly on technical quality.

Public pages should prioritise:

```text
fast initial render
optimised images
minimal blocking JavaScript
stable layout
efficient fonts
responsive design
```

---

# 72. Core Web Vitals

Monitor important performance indicators such as:

```text
Largest Contentful Paint
Interaction to Next Paint
Cumulative Layout Shift
```

Targets should follow current web-quality guidance.

---

# 73. Avoid Heavy App Dependencies on Public Pages

A user reading:

```text
/menstruacao/
```

should not need to download the complete:

```text
Voiceflow
Vapi
Cal.com
```

application stack before reading the article.

Load interactive service dependencies when needed.

---

# 74. Images

Public health pages may use supportive imagery/illustration where appropriate.

Images should have:

```text
appropriate dimensions
compression
alt text where meaningful
```

Decorative images should not receive misleading keyword-heavy alt text.

---

# 75. Assistant Portrait Alt Text

Where portraits are meaningful, use straightforward labels such as:

```text
Tonito, assistente digital do SAAJ Virtual
```

and:

```text
Manuela, assistente digital do SAAJ Virtual
```

Do not stuff keywords into alt text.

---

# 76. Accessibility

SEO and accessibility reinforce each other.

Public pages should support:

```text
semantic HTML
keyboard navigation
clear headings
sufficient contrast
meaningful link text
accessible images
responsive text
```

---

# 77. Link Text

Prefer:

```text
Conhecer os métodos contraceptivos
```

over repeated:

```text
Clique aqui
```

where context permits.

---

# 78. Mobile Search Experience

Because many users will arrive through mobile search:

- pages must load quickly;
- content must be readable immediately;
- cookie/privacy controls must not obscure the entire page unnecessarily;
- SAAJ CTA must remain accessible;
- there must be no horizontal scrolling.

---

# 79. Public Page Design

Public information pages should visually belong to SAAJ Virtual.

Use the same:

```text
typography
colour system
spacing
assistant identity
visual quality
```

while allowing a more editorial reading layout.

---

# 80. Public vs Private Navigation

Public navigation may differ from the app's:

```text
Início
Conversas
Mais
```

The public layer may instead use:

```text
Temas
Sobre
Ajuda
Abrir SAAJ
```

or an equivalent simple structure.

Do not expose private-app navigation to users who are simply reading an article unless it improves the journey.

---

# 81. Search Console

After production launch, configure the relevant search-engine webmaster tooling, including Google Search Console.

Use it to monitor:

```text
indexing
crawl errors
search queries
page performance
sitemap status
```

---

# 82. Sitemap Submission

Submit the production sitemap through the relevant search tooling after the public domain is ready.

Do not submit staging environments.

---

# 83. Staging

Staging/test deployments should not compete with production in search results.

Use appropriate protection/indexing controls for:

```text
preview deployments
development environments
staging
```

---

# 84. Production Domain

Canonical metadata, sitemap and structured data must use the final production domain.

Do not ship production pages containing:

```text
localhost
vercel preview URLs
staging domains
```

as canonical URLs.

---

# 85. Measurement

Track public discoverability separately from private health interactions.

Useful public metrics may include:

```text
organic landing page
topic page views
search query/category
public-to-app CTA click
assistant-entry click
```

---

# 86. Analytics Boundary

Do not automatically carry a sensitive search query into the private application analytics profile.

Public content analytics and private health-interaction analytics should follow appropriate data-minimisation boundaries.

---

# 87. Search Query Privacy

Search queries can themselves reveal health concerns.

Do not unnecessarily store or propagate:

```text
exact external search query
+
persistent user identifier
+
private chat history
```

as one behavioural profile.

---

# 88. Public-to-App Measurement

A privacy-conscious conversion event might record:

```text
sourcePageCategory = "contracepcao"
action = "open_saaj"
```

rather than copying the full user's search query.

---

# 89. AI Referral Measurement

If technically identifiable through normal referral data, future analytics may distinguish traffic categories such as:

```text
search
direct
social
AI/referral
```

Do not attempt invasive fingerprinting to identify AI users.

---

# 90. AI Recommendation Expectations

No implementation can guarantee that:

```text
Google ranks SAAJ first
Gemini recommends SAAJ
ChatGPT cites SAAJ
another AI system selects SAAJ
```

Those systems independently determine results.

The goal is to maximise legitimate discoverability and authority.

---

# 91. Do Not Build for Rankings Alone

Do not publish:

```text
hundreds of thin AI-generated pages
keyword-stuffed pages
duplicated location pages
fake testimonials
fake medical experts
fake statistics
```

to manipulate ranking.

This conflicts with SAAJ's trust requirements.

---

# 92. Content Authority

Long-term discoverability should come from:

```text
accurate content
clear programme identity
useful answers
authoritative references
local relevance
consistent maintenance
good technical implementation
external recognition
```

---

# 93. External Links and Mentions

Where appropriate, legitimate references to SAAJ from:

```text
health organisations
programme partners
public institutions
youth-health resources
relevant organisations
```

can strengthen discoverability.

Do not purchase or manufacture deceptive backlinks.

---

# 94. Programme Consistency

Descriptions of SAAJ on external partner websites should use consistent basic information:

```text
name
purpose
target users
service geography
available channels
official website
```

This reduces contradictory search/AI interpretations.

---

# 95. Entity Consistency

Use:

```text
SAAJ Virtual
```

consistently as the product name.

Avoid unnecessary variations such as:

```text
SAAJ AI
SmartHealth
SAAJ Bot
SAAJ Chatbot Mozambique
```

unless formally adopted.

---

# 96. End-User Naming Rule

The public product identity is:

```text
SAAJ Virtual
```

Do not expose internal/project/provider naming to users.

---

# 97. Assistant Entity Consistency

Use consistent descriptions such as:

```text
Tonito
Assistente digital do SAAJ Virtual
```

and:

```text
Manuela
Assistente digital do SAAJ Virtual
```

across public surfaces.

---

# 98. Search Appearance

Search snippets should ideally make the relationship understandable.

Example concept:

```text
Métodos contraceptivos | SAAJ Virtual

Informação simples sobre métodos contraceptivos
para adolescentes e jovens e acesso ao apoio
do SAAJ Virtual.
```

---

# 99. AI-Readable About Content

The About page should clearly answer:

```text
What is SAAJ Virtual?

Who is it for?

Where does it operate?

What services does it provide?

Who are Tonito and Manuela?

Does it require an account?

How does location affect services?

Who is responsible for the service?

How can users access it?
```

This improves both human trust and machine interpretation.

---

# 100. Public Capability Accuracy

Public pages must reflect current product capability.

If voice or appointment availability changes:

```text
public content
+
application capability configuration
+
service information
```

should be reviewed together.

---

# 101. No False Nationwide Capability

SAAJ may be digitally reachable more broadly while some service capabilities are geographically limited.

Public copy must distinguish:

```text
information/text support availability
```

from:

```text
voice
appointment
physical service availability
```

where relevant.

---

# 102. Health Topic URLs and Conversation History

Opening an article does not create a conversation.

Reading:

```text
/gravidez/
```

must not automatically create:

```text
conversation title = Gravidez
```

in Conversas.

Only actual conversation behaviour creates conversation history.

---

# 103. Sensitive Topic Persistence

Public article reading history should not automatically become part of the user's SAAJ health profile.

---

# 104. Public Search History

SAAJ should not build an unnecessary local history such as:

```text
Recently viewed:
Possible pregnancy
HIV symptoms
Emergency contraception
```

unless there is a strong user need and privacy review.

---

# 105. Robots for App Routes

Private/application route strategy should explicitly review routes such as:

```text
/app/chat/*
/app/conversas/*
/app/marcacoes/*
/app/mais/*
```

Exact routes depend on implementation.

They should not become public search landing pages.

---

# 106. Server Responses

Sensitive application routes should not accidentally render private cached content to another user.

User-specific content must not be placed in a shared public cache.

---

# 107. Error Indexing

Technical error pages should not become useful search-index targets.

Use appropriate HTTP responses and indexing behaviour.

---

# 108. Duplicate Content

Avoid publishing the same health article at multiple URLs simply for different assistants.

Do not create:

```text
/tonito/contracepcao/
/manuela/contracepcao/
```

with identical health content solely for SEO.

The health information belongs to SAAJ.

---

# 109. Assistant-Specific Public Pages

Tonito and Manuela may have dedicated public introductory pages if useful.

These should describe:

```text
who the assistant is
what users can discuss
how to start
```

rather than duplicating the full health-information library.

---

# 110. Public Content and Voiceflow Knowledge

Public pages and Voiceflow knowledge may draw from common approved information.

However:

```text
public article
```

and:

```text
conversational answer
```

serve different formats.

Do not automatically dump raw Voiceflow knowledge documents onto public URLs.

---

# 111. Public Content and AI Answers

If public content is reused to support AI responses, maintain:

```text
source traceability
version awareness
approval status
```

where feasible.

---

# 112. Content Maintenance Ownership

Every published health-content area should eventually have an identified maintenance owner.

Without ownership, information becomes stale.

---

# 113. Content Inventory

Maintain an internal inventory such as:

```text
URL
topic
status
owner
source
last reviewed
next review
```

This may be managed outside the application.

---

# 114. Retiring Content

If a page becomes inaccurate or obsolete:

```text
update it
```

or:

```text
retire and redirect it
```

where appropriate.

Do not leave known outdated health guidance indexed.

---

# 115. Search Launch Minimum

Before actively promoting/indexing the public layer, SAAJ should have at minimum:

```text
[ ] Public homepage
[ ] About page
[ ] Privacy information
[ ] Help information
[ ] Core health topic pages
[ ] Public-to-app CTA
[ ] Correct metadata
[ ] Canonical URLs
[ ] Sitemap
[ ] robots.txt
[ ] Structured data where appropriate
[ ] Production-domain configuration
[ ] Mobile optimisation
[ ] Accessible page structure
[ ] Health-content review
[ ] Search Console setup
```

---

# 116. Technical SEO Acceptance

The implementation passes technical SEO acceptance when:

- indexable pages return usable content;
- each major page has a unique title;
- each major page has an appropriate description;
- canonical URLs are correct;
- production domain is used;
- sitemap contains intended public URLs;
- private routes are excluded from public discovery;
- staging is not indexed;
- heading hierarchy is semantic;
- internal links are crawlable;
- important content is available in server-rendered/static HTML;
- broken public links are resolved;
- redirects work correctly;
- pages are mobile responsive;
- Core Web Vitals are monitored;
- structured data contains no fabricated entities;
- social previews work;
- private user content never appears in public metadata.

---

# 117. Content Acceptance

Public content passes acceptance when:

- it answers a genuine user need;
- the primary question is clear;
- important answers appear early;
- language is understandable;
- content is non-judgemental;
- health claims are governed;
- important claims have appropriate sources;
- local context is used where relevant;
- capabilities match the actual SAAJ service;
- no fictional health professionals are created;
- no fake statistics are used;
- no keyword stuffing is present;
- related content is linked naturally;
- a useful SAAJ support path exists where appropriate.

---

# 118. AI Discoverability Acceptance

The public layer is prepared for AI discovery when:

- SAAJ Virtual is consistently named;
- Tonito and Manuela are consistently identified as digital assistants;
- the About page clearly defines the service;
- important health concepts are directly explained;
- authoritative sources are visible;
- page structure is semantic;
- URLs are stable;
- content has meaningful review/maintenance processes;
- public service availability is explicit;
- machine-readable structured data is truthful;
- important content does not depend on client-only widgets;
- no deceptive AI-targeted content is generated.

---

# 119. Search-to-SAAJ Scenario

A successful discovery journey may look like:

```text
USER SEARCHES

"métodos contraceptivos para jovens"
             │
             ▼
        SEARCH ENGINE
             │
             ▼
     SAAJ PUBLIC CONTENT
             │
             ▼
       USER GETS ANSWER
             │
             ▼
       WANTS MORE HELP
             │
      ┌──────┴──────┐
      │             │
      ▼             ▼
   TONITO        MANUELA
      │             │
      └──────┬──────┘
             │
             ▼
       SAAJ APP LAYER
             │
             ▼
      LOCATION ROUTING
             │
             ▼
      PRIVATE SUPPORT
```

The public health question does not need to become part of the private conversation unless the user chooses to discuss it.

---

# 120. Information Architecture Summary

```text
                     SAAJ VIRTUAL
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
        PUBLIC LAYER             PRIVATE APP
              │                       │
       INDEXABLE                    PRIVATE
              │                       │
     ┌────────┼────────┐      ┌───────┼────────┐
     │        │        │      │       │        │
     ▼        ▼        ▼      ▼       ▼        ▼
  HEALTH    ABOUT     HELP    CHAT   VOICE   BOOKING
  CONTENT
     │
     ▼
SEARCH / AI DISCOVERY
     │
     ▼
USEFUL INFORMATION
     │
     ▼
OPTIONAL SAAJ CTA
     │
     ▼
PRIVATE APP
```

---

# 121. Discoverability Strategy

```text
TECHNICAL SEO
       +
USEFUL HEALTH CONTENT
       +
MOZAMBIQUE RELEVANCE
       +
CLEAR SERVICE IDENTITY
       +
AUTHORITATIVE SOURCES
       +
GOOD PERFORMANCE
       +
ACCESSIBILITY
       +
CONTENT GOVERNANCE
       +
CONSISTENT EXTERNAL PRESENCE
       ↓
STRONGER DISCOVERABILITY
```

There is no legitimate shortcut that guarantees ranking or AI recommendation.

---

# 122. Final Principle

```text
SAAJ VIRTUAL SHOULD BE
EASY TO DISCOVER
WITHOUT MAKING
PRIVATE SUPPORT PUBLIC.

SEARCH ENGINES AND AI SYSTEMS
SHOULD DISCOVER:

WHAT SAAJ IS

WHO IT HELPS

WHAT INFORMATION IT PROVIDES

WHAT SERVICES ARE AVAILABLE

AND HOW TO ACCESS SUPPORT.


THEY SHOULD NEVER DISCOVER:

A USER'S CONVERSATIONS

A USER'S APPOINTMENT DETAILS

A USER'S HEALTH HISTORY

OR PRIVATE INTERACTION STATE.


PUBLIC INFORMATION
BUILDS DISCOVERABILITY.

AUTHORITATIVE CONTENT
BUILDS TRUST.

SAAJ THEN PROVIDES
THE PRIVATE SPACE
FOR THE CONVERSATION
THAT FOLLOWS.
```
````

That completes **`19-seo-ai-discoverability.md`**.

With this, the numbered specification set **`00` through `19` is complete**. The remaining file is **`MASTER-PROMPT.md`**—the implementation handoff. It should be different from the specifications: instead of redefining the product, it will tell the coding agent exactly how to read these 20 documents, their order of authority, what to build for V1, what **not** to build, how to structure the Next.js implementation, and how to verify the finished system against `18-acceptance-criteria.md`.
