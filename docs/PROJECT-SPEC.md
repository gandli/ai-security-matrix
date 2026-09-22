# Project Spec — AI Security Matrix

## Positioning

AI Security Matrix is an open-source bilingual community mirror of [aisecuritymatrix.com](https://aisecuritymatrix.com).
Upstream handles curation, categorisation decisions, and risk-audit criteria. This repository owns Chinese translations, the searchable interface, per-tool detail pages, and the interactive contribution workflow.

**In one sentence**: A curated directory of AI security testing tools — not only "what's out there," but "what it does to your machine" before you `git clone`.

---

## Target audience

| Role | Core need | Page |
|:---|:---|:---|
| Pentester / red-team operator | Filter by attack surface, evaluate runtime risk | Home (filter + sort) |
| Bug-bounty hunter | Discover new tools, verify risk flags match their scenario | Category / Scope / Flag index pages |
| Defender (blue team) | Understand what tools attackers might deploy | About / Guide |
| Developer / contributor | Fix translations, improve pages, suggest new tools | Contribute |
| Security decision-maker | Survey the AI security ecosystem, identify commercial gaps | Commercial |

---

## Feature scope

### Core (delivered)

| Feature | Description |
|:---|:---|
| **65 tools indexed** | Each with slug, repo URL, description, stars, licence, bundled tools, risk flags, safety checklist |
| **Bilingual** | English and Chinese across all routes; language switch preserves current path |
| **Multi-dimensional filter** | Real-time search by text, scope, risk flag; one-click category tab filter |
| **Multi-column sort** | Last updated, category, tool name, stars, risk flag count |
| **Dual view** | List view (data table) + Coverage view (scope × category heatmap) |
| **Four-layer index** | Category (4), Scope (15), Flag (6), Topic (249) — each with dedicated index pages |
| **Tool detail page** | Badges, GitHub social preview, safety checklist, clickable Scope/Flag/Topics |
| **Four static content pages** | About / Guide / Contribute / Commercial, bilingual |
| **Contribution forms** | Fix translations, suggest tools, report data — client-side pre-filled GitHub Issue URLs |
| **Web Audio sound** | Hover / click / focus micro-interaction cues, default on, pure synthesis |
| **Dark / light themes** | Dual themes, localStorage persistence |

### Explicitly out of scope

- Tool ranking or scoring systems
- Automated testing of the tools themselves
- Commercial / paid product listings (clear criteria defined at `/commercial/`)
- Features requiring a backend API (static output only)

---

## Non-functional metrics

| Metric | Current value | Source |
|:---|:---|:---|
| Static pages | 688 | `npm run build` |
| E2E tests | 208 passed / 0 failed | Playwright, 4 viewports |
| axe-core violations | 0 | WCAG 2.2 AA + BP, 15 pages × 2 themes |
| Contrast | 12/12 pass | 6 pages × 2 themes, Playwright measured |
| Data sync frequency | Daily | `sync-aisecuritymatrix.yml` |
