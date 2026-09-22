# Changelog

All notable changes to this project are documented in this file.

## [3.0.0] — 2026-09-22

### Added

- **Interactive contribute forms**: Three client-side forms (translation fix, suggest a tool, report data) that generate pre-filled GitHub Issue URLs — no backend required.
- **Four static pages completed**: About (mirror statement, six risk flags), Guide (build-time dynamic counts, risk flag glossary), Contribute (interactive forms + manual PR guide), Commercial (open-source scope rationale, listing criteria).
- **agent-browser dogfood report**: Systematic exploratory testing with 18 annotated screenshots and structured repro steps.
- **Skip link** for keyboard users ("跳到主要内容" / "Skip to main content").
- **Keyboard sortable table headers**: `tabindex="0"`, `role="columnheader"`, Enter/Space key handlers.
- **`prefers-reduced-motion: reduce`** global support.
- **E2E coverage for new pages**: 44 additional test runs covering contribute form interactions, guide dynamic tables, and commercial copy (total: 208 passed).
- **agent-browser skill** installed for browser automation dogfooding.
- **14 design/UI skills** from ui-skills.com (oklch-skill, typeset, layout, critique, fixing-accessibility, web-perf, smooth-shadow-ring, transitions-dev, refactoring-ui, wcag-audit-patterns, tailwind-token-consolidation, svg-animation, fixing-motion-performance, find-skills).

### Changed

- **Type scale consolidated**: 11 sizes → 8 sizes (12/14/16/18/20/28/32/36 px), all adjacent gaps ≥ 11%.
- **Spacing snapped to micro-scale** (2/6/10/14 px); removed 1px, 2.4px, 5.6px, 6.4px outliers.
- **`.cat-tab:not(.is-active)`**: Replaced `opacity: 0.6` with explicit colour de-emphasis so the inner count badge keeps its measured contrast (was 2.96:1 → now passes).
- **`--name-ink` token**: Theme-aware ink colour for `--name` fills (dark: #001615 on #ff9e37 = 9:1; light: #f2f4f5 on #824800 = 6.6:1).
- **Nav labels shortened**: 使用指南→指南, 商业工具→商业, Definitions→Guide, Contribute→Submit, Commercial→Vendors.
- **README redesigned**: Pre-run risk audit table (root/credentials/installs/calls out/opaque/binaries with counts), bilingual screenshots, entry-point table.
- **Contrast optimisation**: All 4 risk-flag pill texts upgraded from AA to AAA (7–10:1) in both themes.
- **Star badge**: Semantic fill removed, replaced with `border` outline (`--rule`) + `--stale` text.

### Fixed

- **Playwright CJK rendering**: Installed `fonts-noto-cjk`; added `"Noto Sans CJK SC"` to the font stack before PingFang SC/Microsoft YaHei (macOS/Windows only).
- **Screenshot script bugs**: Navigate-then-set-theme order (was setting on about:blank); detail-page URL missing base prefix.
- **Mobile header**: 310px → 116px (63% reduction) via tagline hiding, single-row nav, icon-only controls ≤480px, tightened gaps.
- **Card title wrapping**: `.repo-name` text-overflow ellipsis + `.star-badge` white-space nowrap.
- **`--dead` contrast**: #7c8787 → #8a9797 on `--paper-raised` (4.40:1 → 5.40:1).
- **Topic bilingual mismatch**: EN showed 'tools', ZH showed '款工具'.
- **Dead SoundToggle component** removed; audio restored to default-on without localStorage gate.

## [2.0.0] — 2026-09-19

### Added

- **Bilingual Astro replica**: 100% Chinese tool descriptions, 688 static pages.
- **Category/Scope/Flag/Topic index pages** with clickable pills linking to per-term listings.
- **Per-tool self-generated OG images** (130 PNGs, 65 tools × 2 languages) via sharp.
- **GitHub social-preview card** as illustration on tool detail pages.
- **WebAudio sound engine** (hover, click, focus) — zero assets, synthetic.
- **ToolBadges component**: GitHub stars, DeepWiki, Zread, CodeWiki badges.
- **Playwright E2E suite**: 164 tests × 4 viewports (desktop, mobile-s, mobile-m, tablet).
- **CI pipeline**: GitHub Actions with build + E2E + artifact upload.
- **Design system**: IBM Plex Sans/Mono, near-black teal palette, category accents (agent=blue, scanner=yellow, mcp=teal, skill=magenta), risk flag families (host=red, access=amber, unseen=cyan).
- **Browser surface theming**: `::selection`, scrollbar, `caret-color`.

### Fixed

- Astro `base='/ai-security-matrix/'` for GitHub Pages project-page deployment.
- Double-slash in tool paths.
- Orphan gh-pages branch handling in deploy workflow.

## [1.0.0] — 2026-09-18

### Added

- **Markdown mirror**: 65 tool pages (EN/ZH) in per-category directories (agents/, scanners/, mcp-servers/, skills/).
- **`tools.json`**: Complete structured dataset with stars, bundled tools, pre-run safety checklist, risk flags.
- **`translations.json`**: Curated bilingual translation dictionary (65 tool descriptions + 4 static pages).
- **GitHub Actions auto-sync**: Daily scrape from aisecuritymatrix.com sitemap + index.html.
- **SVG hero and category banner** generated with design tokens.
- **Per-category index READMEs** with tool tables.

### Structure

- Tools grouped into `agents/`, `scanners/`, `mcp-servers/`, `skills/`.
- Each tool has `<slug>.md` and `<slug>.zh.md`.
- Root `README.md` and `README.zh.md` serve as bilingual directory index.
