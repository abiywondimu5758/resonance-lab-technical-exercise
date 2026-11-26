# RESONANCE Lab website technical exercise

**Abiy Wondimu Hailemariam**

A website assessment and locally runnable redesign for the [RESONANCE AI4D Lab at Addis Ababa University](https://sites.google.com/aait.edu.et/resonance-lab). The homepage is the primary deliverable; eight supporting pages provide local navigation destinations.

## Setup and run

Requires Node.js 20 or newer. There are no third-party packages to install, environment variables to configure or credentials to supply.

```sh
git clone https://github.com/abiywondimu5758/resonance-lab-technical-exercise.git
cd resonance-lab-technical-exercise
npm run dev
```

Open **http://127.0.0.1:5173/**. Stop with Ctrl+C.

```sh
npm test
npm run build
npm run preview
```

Stop the development server before running preview; both use port 5173. While either server is running, use `npm run test:http` to check HTTP delivery. Build output is `dist/`. Deployment is not required and has not been configured.

## Assessment and priorities

The highest priorities are clipped mobile embed content, dated recruitment presented as current, publication templates, repeated navigation and an unclear opening. The redesign uses ordinary HTML flow, an existing-source purpose statement, clear student/collaborator routes, one primary navigation, meaningful headings and a keyboard-accessible menu.

The lab's academic identity, four research themes, existing team and partners, public email and postal address are retained. The 2025/26 call is historical. No papers, achievements, people or partners are invented; publication templates and the placeholder telephone are omitted.

## Prototype

The homepage includes the hero, image placeholders, research themes, participation routes, previous-cycle notice, partners and contact details. Supporting pages include About, Research, Team, News & Events, Publications, Get Involved, Application 2025/26 and Contact. All navigation stays within the redesign. Long introductions use Read more disclosures.

The site uses HTML, CSS and minimal JavaScript, one system sans-serif family and local assets. Marked image and portrait areas remain placeholders in this checkout. See the limitations before production use.

## Submission documents

| Requirement | File |
| --- | --- |
| Assessment and prioritized recommendations | [Website assessment PDF](RESONANCE_Website_Assessment.pdf) |
| Homepage prototype | [Homepage source](public/index.html) |
| Design and technical decisions | [Decisions](docs/DECISIONS.md) |
| Known limitations | [Limitations](docs/LIMITATIONS.md) |
| Approximate time spent | [Work log](docs/WORK_LOG.md) |
| AI and development-tool disclosure | [Disclosure](docs/AI_DISCLOSURE.md) |
| Tests and verification results | [Verification](docs/VERIFICATION.md) |
| Content sources | [Sources](docs/SOURCES.md) |
| Desktop/mobile wireframes and SVGs | [Wireframes](design/wireframes/) |
| Desktop/mobile visual designs and SVGs | [Visual designs](design/visual-designs/) |

## Verification

Nine repository tests and nineteen HTTP checks passed. The static build and JavaScript syntax checks passed. Browser observations and unperformed checks are distinguished in the verification document; no full accessibility certification or measured production performance improvement is claimed.

## Project structure

- `public/`: nine static pages, shared stylesheet, menu script and local assets.
- `scripts/`: local server, build and HTTP smoke checks.
- `test/`: source, content, navigation and contrast tests.
- `docs/`: decisions, limitations, sources, disclosure and verification.
- `design/`: wireframe and visual-design deliverables.

## AI and development-tool disclosure

I used Codex for research, design, coding, documentation, and testing, plus Claude for feedback.
