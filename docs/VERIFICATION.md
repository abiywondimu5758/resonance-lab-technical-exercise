# Verification results

Checked on 26 November 2026 using Node.js 24.11.1 on macOS.

- `npm test`: 9 passed, 0 failed.
- `npm run build`: passed; 218,799 uncompressed bytes in `dist/`.
- JavaScript syntax checks: `public/main.js` and `scripts/serve.mjs` passed.
- HTTP checks against a temporary server serving `dist/`: 19 passed. The server was stopped after testing.

Repository tests check metadata, heading structure, fragment/ARIA references, local runtime assets, the source research themes, historical recruitment dates, specified contrast pairs, local page destinations, retained team names and disclosed image placeholders. The source inventory supplies the original four-theme comparison.

HTTP checks cover all nine pages, the root, stylesheet, JavaScript and the actual AAU crest/favicon, expected missing/private-path responses, HEAD and POST handling. An initial HTTP run referenced an obsolete SVG favicon; the test was corrected to the PNG actually used by the site and all checks were rerun successfully.

Earlier browser inspection covered the desktop hero, 320px and 390px responsive layouts, the mobile menu, Escape focus return and local page navigation. Those observations were made during implementation, not repeated as part of this test-only commit.

These checks are not a full accessibility audit, physical-device test, screen-reader review, production security audit or performance benchmark. Source-pattern tests do not replace a general-purpose HTML validator or browser accessibility engine.
