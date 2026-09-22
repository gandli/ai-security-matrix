# AGENTS.md — Project Collaboration & Development Guidelines

This document specifies the **mandatory rules and engineering standards** for AI agents (Claude Code, Codex, Pi, etc.) and human developers working on this repository.

---

## 1. Project Overview & Core Principles

- **Positioning**: Open-source community mirror and enhanced presentation layer for [aisecuritymatrix.com](https://aisecuritymatrix.com).
- **Stack**: Astro 5 (static output) + native CSS (design tokens) + Tailwind utility classes + Playwright E2E.
- **Hard constraints**:
  1. **Never edit `tools.json` manually**: It is generated daily by `scripts/scrape.py`.
  2. **Chinese translations belong in `translations.json`**: Only edit the `tools` or `static` keys.
  3. **Single-writer principle**: Only one agent or process may modify files in a working tree at any time.
  4. **All-green gate**: Every commit must pass `npm run build` (688 pages, 0 errors) and `npx playwright test` (208 passed, 0 failed).

---

## 2. Language & Communication Standards

- **Primary language**: **English is the canonical language** for all code, technical documentation, commit messages, and issue templates.
- **Agent reasoning & chat response**: When interacting with the user, **think and reply in Chinese** per user preference. Code identifiers, file paths, commands, and git commits remain in English.
- **Commit messages**: Follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `refactor:`, `chore:`, etc.).
- **User-facing copy**: Must maintain strict bilingual parity between English and Chinese across all routes (`/` vs `/zh/`).

---

## 3. Branching & Deployment Rules

- **Branch roles**:
  - `astro-site`: Primary development and deployment branch. All features, fixes, and documentation updates are committed and pushed here.
  - `gh-pages`: Orphan release branch managed exclusively by GitHub Actions. Never push to it manually.
  - `main`: Legacy archive branch.
- **Base path**:
  - The site is deployed to a GitHub Pages *project* site under `/ai-security-matrix/`.
  - All internal links and asset references must use `url()`, `home()`, or `asset()` from `@/lib/url.ts`. Never hardcode absolute root paths like `href="/tools/..."`.

---

## 4. UI / UX & Styling Rules

- **Visual authority**: Grounded in `DESIGN.md` and the near-black teal aesthetic of `aisecuritymatrix.com`.
- **Colors**:
  - Grounded in `better-colors`: Never introduce arbitrary hex colors in component code.
  - Use semantic CSS tokens defined in `:root` and `[data-theme="dark"]` (`--alive`, `--stale`, `--dead`, `--rule`, `--name-ink`, etc.).
  - Every foreground/background pair must meet **WCAG 2.2 AA (contrast ≥ 4.5:1, critical elements AAA ≥ 7:1)**.
- **Typography & spacing**:
  - Use the 8-step type scale (12 / 14 / 16 / 18 / 20 / 28 / 32 / 36 px).
  - Snap component spacing to the micro-scale (2 / 6 / 10 / 14 px).
  - Mobile touch targets must measure **≥ 44×44 px**.
- **Accessibility floor**:
  - Never use `outline: none` without providing an explicit `:focus-visible` ring.
  - Honor `prefers-reduced-motion: reduce` with instantaneous transitions.
  - Every icon button must carry an `aria-label` or `aria-hidden="true"`.

---

## 5. Pre-flight Checklist

Before pushing any commit, the following checks must pass in the local environment:

```bash
# 1. Static build: generates 688 pages without errors
npm run build

# 2. End-to-end tests: 208 passed, 0 failed across 4 viewports
npx playwright test

# 3. Accessibility audit: zero axe-core violations
node scripts/a11y-audit.mjs

# 4. Color contrast audit: 12/12 page-theme pairs pass
node scripts/contrast-audit.mjs
```
