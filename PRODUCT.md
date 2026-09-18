# Product Context

## Platform
web

## Purpose
AI Security Matrix — curated bilingual directory of AI-enabled security testing tools. Static Astro site, GitHub Pages deployed. Source: aisecuritymatrix.com, daily synced via GitHub Actions.

## Audience
- Primary: security researchers, pentesters, red teamers evaluating AI tools for engagements
- Secondary: developers of AI security tooling checking category placement and competitive context
- Tertiary: enterprise defenders deciding what to allow/ban on their networks

## Use Context
Desktop-first research (24–27" displays), but also tablet + phone for quick lookups. Dark mode default (professional security context). High information density expected (65+ rows, many columns). Users scan fast, compare features, assess risk flags, then click to detail pages for depth.

## Brand & Voice
- **Tone:** factual, direct, security-professional. No hype. Claims grounded in observable repo data (last push, stars, licence, bundled tools, risk flags).
- **Visual world:** technical data table, IBM Plex Sans/Mono, near-black teal background (#001615 dark), subtle rules (#123a38), colored category accents (agent=blue, scanner=yellow, mcp=teal, skill=magenta). Not playful, not corporate — feels like a curated research spreadsheet.
- **Anti-reference:** generic SaaS dashboards, purple/blue gradients, card-nesting, "hero metrics" patterns, playful rounded design.

## Constraints
- 100% static HTML/CSS/JS (no server runtime). Astro 5.x + Tailwind (utility classes available but not primary styling mechanism — hand-written tokens + CSS for design fidelity).
- Bilingual EN/ZH. Switch language preserves the current route. All data embedded in JS for client-side search/sort.
- 140 pages built per sync cycle. Pages deploy from gh-pages branch.
- Data must stay in sync with upstream site daily without regenerating Chinese translations (falls back to English if missing).

## Success Criteria
- **Discoverability:** user can find the right tool within 30 seconds of landing, using category tabs + search + column sort.
- **Trust signals:** last-push date, stars, risk flags, licence, and code-size visible at scan speed on index.
- **Detail completeness:** each tool page answers: what it does, is it still alive, what does it want to run, how risky is it.
- **Bilingual:** Chinese descriptions load on `/zh/*` and don't regress to English (unless explicitly absent).

## Known Technical Debt / Future Plans
- No `/coverage` or matrix heatmap view currently (upstream site has this as "Coverage" toggle — our replica shows only the table view).
- No per-page screenshot / favicon fetch for each repo's GitHub avatar (currently uses `github.com/{owner}.png` — can be flaky).
- `hreflang` alternates not yet emitted on `<link rel="alternate" hreflang="*">`.
- No RSS/Atom feed for new tool additions.
- No search result deep-linking (state not in URL — client-side filter/sort resets on reload).

## Out-of-Scope
- Comments, ratings, user accounts, tool submission forms. Not a wiki; not a review site.
- Live vulnerability data or CVE feeds. This is a directory, not a scanner.
