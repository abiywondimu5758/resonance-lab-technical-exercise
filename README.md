# RESONANCE Lab website technical exercise

**Abiy Wondimu Hailemariam** · Web Developer technical exercise

Assessment, design documentation and a locally runnable prototype for the [RESONANCE AI4D Lab at Addis Ababa University](https://sites.google.com/aait.edu.et/resonance-lab). The improved homepage is the main deliverable. Eight supporting pages provide local destinations for its navigation.

## Live prototype

[Open the deployed prototype](https://resonance-lab-exercise-abiy.netlify.app/)

Hosted on Netlify as an exercise demonstration; this is not the lab's official website.

## Deliverables and reading guide

| Exercise requirement | Deliverable |
| --- | --- |
| 1. Assess content organization, navigation, visual design, mobile responsiveness, accessibility, clarity and overall experience | [Website assessment PDF — Stage 1](RESONANCE_Website_Assessment.pdf) |
| 2. Identify and prioritize the most important improvements | [Prioritized recommendations PDF — Stage 2](RESONANCE_Website_Assessment.pdf#page=7) |
| Structure and responsive layout planning | [Desktop and mobile wireframes PDF](design/wireframes/RESONANCE_Wireframes.pdf) |
| Visual direction | [Desktop and mobile visual designs PDF](design/visual-designs/RESONANCE_Visual_Designs.pdf) |
| 3. Implement an improved homepage prototype | [Homepage source](public/index.html), runnable using the instructions below |
| 4. Preserve academic identity and factual content | [Content sources](docs/SOURCES.md) and the preservation report below |
| 5. Explain design and technical decisions | [Decision report](docs/DECISIONS.md) and implementation report below |
| Setup and run instructions | Included below |
| Known limitations | [Limitations](docs/LIMITATIONS.md) |
| Approximate time spent | [Work log](docs/WORK_LOG.md) |
| AI and development-tool disclosure | [Disclosure](docs/AI_DISCLOSURE.md) |
| Verification | [Test results and verification boundaries](docs/VERIFICATION.md) |

**Stages 1 and 2 share one assessment PDF.** It contains the seven-area review, annotated desktop/mobile evidence, finding identifiers and prioritized recommendations. The priorities table begins on page 7. If GitHub's PDF viewer ignores the page fragment, open the document and navigate to that page.

The design PDFs cover desktop and mobile layouts across the nine pages. Long detail-page views are cropped and labelled for review; complete drawings are supplied in the [wireframe SVG package](design/wireframes/RESONANCE_Wireframes_SVGs.zip) and [visual-design SVG package](design/visual-designs/RESONANCE_Visual_Designs_SVGs.zip). These imports are vector drawings, not native Figma files with Auto Layout or working interactions. The HTML/CSS is the rendering source of truth.

## Setup and run

Requires **Node.js 20 or newer**. No third-party packages, dependency installation, credentials or environment variables are needed.

```sh
git clone https://github.com/abiywondimu5758/resonance-lab-technical-exercise.git
cd resonance-lab-technical-exercise
npm run dev
```

Open **http://127.0.0.1:5173/**. Stop the server with Ctrl+C.

To build and inspect the static output:

```sh
npm run build
npm run preview
```

Stop the development server before starting preview: both use port 5173. Build output is written to `dist/`. Deployment is optional; a live Netlify demonstration is linked above. The included server is local review tooling, not production hosting infrastructure.

To reproduce the checks:

```sh
npm test
```

With the development or preview server running in another terminal:

```sh
npm run test:http
```

## Stages 1–2: assessment and prioritization

The review examined the original homepage and linked pages, recovered content from Google Sites' embedded HTML, and used desktop/mobile browser evidence. Incomplete text extraction was not treated as proof that a page had no content.

| Review area | Main finding | Response |
| --- | --- | --- |
| Content organization | Useful academic material exists, but purpose and audience routes are difficult to discover. | Introduce the existing purpose first, then research and participation. |
| Navigation | A Home dropdown and a separate section-button row compete, especially on mobile. | One primary navigation and a compact mobile disclosure. |
| Visual design | Outer-page and embedded-section styles use inconsistent typography, spacing and framing. | Shared layout rules, one sans-serif family and restrained green surfaces. |
| Mobile responsiveness | Essential Vision and Focus Areas content clips inside embedded panels in the captured mobile view. | Normal HTML flow and responsive grids instead of fixed-height content embeds. |
| Accessibility | Generic frame contexts, fragmented headings and unnamed partner images make navigation less informative. | Coherent landmarks/headings, useful image alternatives and keyboard-accessible controls. |
| Clarity | The name-led opening explains little about the lab's purpose. | Use the existing motto and purpose in a prominent hero. |
| Overall experience | Visitors must infer how to explore research, participate or contact the lab. | Distinct research, student, collaborator and contact routes. |

The highest priorities are content access on mobile, historical recruitment presented as current, and publication templates presented as records. Navigation, purpose, contact clarity and semantic structure follow. A university-branded address is a later administrative recommendation, not evidence that Google Sites is inherently insecure or unusable.

The PDF records the mobile loading-state caveat and the difference between visible observations, source-confirmed issues and recommendations. No analytics, user study or measured performance comparison is claimed.

## Stage 3: improved homepage implementation

### Homepage structure

| Section | Implemented behavior | Purpose |
| --- | --- | --- |
| Header | AAU crest, lab identity, current-page indication and local navigation. | Establish ownership and make destinations predictable. |
| Hero | Existing motto/purpose, research action, student/collaborator routes and a labelled image area. | Explain the lab and offer useful next steps immediately. |
| Research | Four original theme names with links to matching sections of the local Research page. | Make the research discoverable without clipping or invented projects. |
| Participation | Separate source-backed student and collaborator information. | Support different visitor intentions. |
| Recruitment | Previous-cycle label and the original 2025/26 application destination. | Retain historical facts without implying a current opening. |
| Partners | The three existing partner marks with descriptive alternative text. | Preserve existing recognition. |
| Contact | Public email and full institutional postal address. | Provide a working contact route without the placeholder telephone. |

On narrow screens the hero stacks and grids reflow. Recruitment uses a compact previous-cycle link on mobile; the application page retains the historical dates. Long introductions on supporting pages use native “Read more” disclosures.

### Supporting pages

| Page | Local file | Content treatment |
| --- | --- | --- |
| About | [about.html](public/about.html) | Existing mission, background, objectives and SDG alignment. |
| Research | [research.html](public/research.html) | Original themes and research descriptions; theme anchors match homepage links. |
| Team | [team.html](public/team.html) | Existing names, roles, qualifications and source staff status; portraits remain labelled placeholders. |
| News & Events | [news-events.html](public/news-events.html) | Published events and dated timeline, with historical recruitment context. |
| Publications | [publications.html](public/publications.html) | Transparent record-status message; no fabricated replacement papers. |
| Get Involved | [get-involved.html](public/get-involved.html) | Existing student participation, eligibility and collaboration information. |
| Application 2025/26 | [application-202526.html](public/application-202526.html) | Historical criteria, topics and timeline; no new call is announced. |
| Contact | [contact.html](public/contact.html) | Email and institutional location; placeholder telephone omitted. |

All primary navigation destinations are local. Contact email actions use `mailto:`. No menu link redirects to Google Sites.

## Stage 4: preservation of identity and factual content

The lab name, Addis Ababa University affiliation, source motto/purpose, four research themes, existing team information, three partner identities and contact details are retained. Research topics and aspirations are not represented as completed achievements. No projects, people, partners, publications, testimonials or impact statistics were invented.

Editorial treatments are explicit:

- Keep the original 2025 dates, while identifying their application cycle as historical.
- Do not infer whether another recruitment round is currently open.
- Omit template publication records rather than convert them into apparently real papers.
- Omit the incomplete telephone number.
- Preserve differing source eligibility descriptions without silently combining them into a new rule.
- Label image areas as placeholders rather than manufacture lab photography or portraits.

The AAU crest comes from the official university site. Partner artwork is source-derived reference imagery. Third-party marks and source content remain their owners' property. See [Sources](docs/SOURCES.md) for provenance and boundaries.

## Stage 5: design and technical decisions

**Visual hierarchy.** A two-column hero separates the purpose statement from its image area. Forest-green actions, pale surfaces and generous spacing establish hierarchy. A single Arial/Helvetica sans-serif family keeps the interface consistent. Repeated decorative arrows were removed.

**Readable content.** Core text lives in ordinary HTML. Section heights follow their content; the site does not rely on Google Sites content iframes. Source wording and full research-theme titles remain available.

**Responsive navigation.** The menu collapses below 1200px. Its button exposes `aria-expanded` and `aria-controls`; Escape closes it and returns focus. It is a disclosure, not a modal or focus trap. Without JavaScript the navigation remains visible.

**Focus and semantics.** One main heading per page, section headings, landmarks, a skip link and useful image names support navigation. Whole sections do not receive oversized outlines on mouse clicks. Keyboard links and buttons retain a small visible focus indicator.

**Small technical footprint.** HTML, CSS and a small menu script are sufficient for this content-led prototype. There is no framework, CMS, database, runtime CSS CDN or external font request. Node's built-in modules serve files and copy the static build; there is no compilation or dependency download.

**Maintenance tradeoff.** Pages share CSS and JavaScript, but their header/footer markup is duplicated. This keeps the prototype simple; a static-site generator could centralize templates if ongoing editorial work justifies it.

Further reasoning is recorded in [Design and technical decisions](docs/DECISIONS.md).

## Verification results

| Check | Result |
| --- | --- |
| Repository tests | 9 passed, 0 failed. |
| Built-site HTTP checks | 19 passed. |
| Static build | Passed; 218,799 uncompressed bytes in the checked output. |
| JavaScript syntax | Menu script and local server passed. |

Repository tests cover metadata, references, local assets, source research themes, historical dates, specified contrast pairs, local destinations, retained team names and disclosed placeholders. HTTP checks cover all nine pages, runtime assets, expected missing/private-path responses, HEAD and POST behavior.

Browser inspection during implementation covered the desktop hero, narrow responsive layouts, mobile menu behavior and local page navigation. These observations are distinct from repeatable source/HTTP tests. No physical-device, full screen-reader, WCAG-conformance, production-security or performance certification is claimed. See [Verification](docs/VERIFICATION.md) for the exact scope and limits.

## Known limitations

Image and portrait areas are still explicitly marked placeholders in this checkout. Approved lab photographs, higher-quality partner artwork and verified publication records remain content inputs. Current recruitment, source eligibility differences and staff status require the academic owner's confirmation before production use.

There is no CMS, search, backend or application-processing system. The server is for local review. Physical-device testing, broader browser/assistive-technology coverage and deployed performance measurement remain outside the checked scope. The full list is in [Known limitations](docs/LIMITATIONS.md).

## Approximate time spent

**Approximately 2 hours and 50 minutes**, as estimated by the candidate, including review and revisions. This is a hands-on estimate rather than a duration calculated from commit timestamps. See [Work log](docs/WORK_LOG.md).

## AI and development-tool disclosure

I used Codex for research, design, coding, documentation, and testing, plus Claude for feedback.

The resulting work was checked against original source content, repository tests, HTTP delivery checks and selected browser views. Source comparisons prevented invented records, unverified recruitment claims and incorrect destinations. Suggestions revised or rejected included decorative research imagery, repeated arrow treatments, mixed typography and redirects from local navigation to the original site. Supporting verification details appear in [Verification](docs/VERIFICATION.md); the approved disclosure is also available [separately](docs/AI_DISCLOSURE.md).

## Project structure

```text
RESONANCE_Website_Assessment.pdf
README.md
public/                 Nine static pages, stylesheet, menu script and assets
scripts/                Development server, static build and HTTP checks
test/                   Content, navigation, references and contrast checks
docs/                   Decisions, sources, limitations, time and verification
design/wireframes/      Wireframe PDF and SVG package
design/visual-designs/   Visual-design PDF and SVG package
```
