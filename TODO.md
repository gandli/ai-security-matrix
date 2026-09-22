# AI Security Matrix — TODO & Roadmap

---

## Status Overview

| Dimension | Status | Details |
|:---|:---:|:---|
| **Core features** | ✅ Done | 65 tools, bilingual mirror, multi-dimensional filter & sort |
| **Visual design** | ✅ Done | Near-black teal language, OKLCH-consistent hues, dual themes |
| **E2E testing** | ✅ Done | 208 test runs (Playwright), all 4 viewports green |
| **Accessibility** | ✅ Done | axe-core 4.13.0 zero violations, WCAG 2.2 AA compliant |
| **Daily sync** | ✅ Done | GitHub Actions scrape + derivation pipeline |
| **Mobile adaptation** | ✅ Done | Verified at 320px, header compressed 63% |

---

## Completed Milestones

- [x] **Scrape pipeline**: `scripts/scrape.py` automated extraction, outputs `tools.json`.
- [x] **Bilingual dictionary**: `translations.json` covers 65 tool descriptions + 4 static pages.
- [x] **Astro static site**: 688 static pages, zero client-side framework runtime.
- [x] **Four-layer index system**:
  - [x] Category index: `/category/[cat]/` (4 categories)
  - [x] Scope index: `/scope/[scope]/` (15 scopes)
  - [x] Risk flag index: `/flag/[flag]/` (6 flags)
  - [x] Topic index: `/topic/[topic]/` (249 tags)
- [x] **Four static content pages**:
  - [x] `about.astro` — mirror positioning, risk audit criteria, six-check list.
  - [x] `guide.astro` — build-time derived counts, risk flag glossary.
  - [x] `contribute.astro` — three interactive forms, pre-filled GitHub Issue URLs.
  - [x] `commercial.astro` — open-source scope rationale, listing criteria.
- [x] **Web Audio sound system**: Pure synthesis (zero asset references), default-on subtle micro-interactions.
- [x] **Accessibility & colour system**:
  - [x] axe-core: 30 scans, zero violations.
  - [x] Risk flag pill contrast upgraded to AAA (≥ 7:1) in both themes.
  - [x] `--name-ink` semantic token, fixed submit button contrast failure in light mode.
  - [x] Skip link, keyboard sortable table headers (Enter/Space).
  - [x] Global `prefers-reduced-motion: reduce`.
- [x] **Mobile compactness**:
  - [x] Header 310px → 116px (hide redundant tagline, compact single-row nav).
  - [x] Fixed TermList card title wrapping and star badge overflow on narrow viewports.
- [x] **CI/CD & deployment**:
  - [x] `deploy-pages.yml` auto-publishes to GitHub Pages.
  - [x] `e2e.yml` runs 208 Playwright tests and archives HTML reports.

---

## Backlog (Prioritised)

### P1 — Near-term improvements
- [ ] **ISSUE-002 desktop label restoration**: At ≥768px, use CSS `content` swap or conditional rendering to show full nav labels ("Contribute", "Commercial tools", "使用指南") instead of the mobile-optimised short forms.
- [ ] **Search enhancement**: Add pinyin initial search to `MatrixApp.astro` for Chinese users.
- [ ] **Tool detail OG refinement**: Include primary language and licence badge in the 130 generated OG images.

### P2 — Mid-term evolution
- [ ] **PWA / offline support**: Add Astro service worker to cache framework and `tools.json` for offline browsing.
- [ ] **RSS / Atom feed**: Generate a feed of newly added tools and notable updates after each sync.
- [ ] **Automated screenshot pipeline**: Wire `scripts/capture-screenshots.mjs` into GitHub Actions to refresh README images on data updates.

### P3 — Long-term vision
- [ ] **Community translation automation**: Allow accepted GitHub Issues from the contribute form to be merged into `translations.json` with a single click.
- [ ] **Sandbox run guide**: Provide Docker / Firecracker config templates for tools flagged with `root` or `credentials`.
