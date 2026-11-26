# Design and technical decisions

## Content and academic identity

Keep the lab name, AAU crest/affiliation, source purpose, full research themes, team information, partner identities and contact details. All primary navigation now leads to local redesigned pages. Research links target matching local sections. The email remains a mailto link.

The source's 2025/26 recruitment cycle is explicitly historical; original criteria, topic descriptions and dates are retained without announcing a new call. Source publication templates are replaced by a transparent empty state. The placeholder phone is omitted. Eligibility differences between the two source participation pages are not silently combined into a new rule.

## Visual direction and review changes

The design uses one Arial/Helvetica sans-serif family across navigation, headings and body copy. A two-column hero, restrained forest-green palette, pale surfaces and labelled image areas give the page hierarchy. Real lab/portrait imagery is not invented. Long introductions use native Read more disclosures.

Repeated arrow decorations and oversized section-focus outlines were rejected through review. Mouse clicks do not outline whole sections. Keyboard links/buttons retain a small high-contrast focus outline. No decorative animation is required.

Academic layout references included AAU, Makerere AI Health Lab and MIT CSAIL. These informed identity, purpose/research separation and audience routes; none of their projects, people, figures or photographs became RESONANCE facts.

## Implementation

Plain HTML/CSS and one progressively enhanced menu script fit a content-led prototype. There is no framework, database, dependency installation, runtime CSS CDN or external font request. Nine static pages share styling and navigation. Duplication in the page headers/footers is an acceptable prototype tradeoff; a future static-site generator could centralize it.

The header collapses below 1200px. The mobile menu is a disclosure with aria-expanded/aria-controls, Escape-to-close and focus return. Without JavaScript, links remain visible. Hero and content grids reflow; no source embed is required. Image placeholders reserve visual space without claiming to be lab photography.

Node's built-in modules serve and copy the site. The server binds to loopback for local review and is not a production hosting setup. Build output is dist/. Deployment is not required and is not part of this submission.

## Documentation

The assessment and factual source register are distinct from prototype choices. Commits record actual repository changes; timestamps are unmodified.
