# Design Review — AI Security Matrix

Date: 2026-09-21 · Evidence basis: axe-core (15 pages × 2 themes, 0 violations), contrast audit (all AA, pills AAA), E2E (208 cases, 4 viewports), perf run (DCL ~230ms), break harness (7/7 pass)

## Scores

| Dimension | Weight | Score | Evidence |
| --- | --- | --- | --- |
| Visual Hierarchy | 20% | 8.5 | Hero → toolbar → table flow clear; risk pills color-coded per family; stat grid on detail pages leads with scope |
| Consistency | 20% | 8.0 | 8-step type scale + micro-scale spacing applied; deduct: DESIGN.md drift (nav labels, pill font), inline td padding diverges from CSS rule |
| Accessibility | 20% | 9.0 | axe 0 violations, skip link, keyboard sort, focus-visible, contrast AAA on pills; deduct: <tr onclick> not focusable (inner <a> compensates) |
| Usability | 20% | 8.5 | Instant filter/sort/search, match counter (aria-live), clear-filters in empty state; deduct: URL does not reflect filter/search/sort state |
| Responsiveness | 10% | 9.0 | E2E 4 viewports pass, 320px single-row nav, header -63%, table horizontal scroll ≤768 |
| Performance | 10% | 8.5 | DCL ~230ms, zero CLS (img dims), lazy avatars; deduct: 46 external requests, no preconnect |
| **Overall** | **100%** | **8.55 → 8.5** | Weighted mean |

## Nielsen heuristics flagged
- #4 Consistency: DESIGN.md out of sync with shipped nav labels + pill font (findings 1)
- #7 Flexibility & efficiency: filtered/sorted state lost on reload/share (finding 3)

## Anti-slop (Banned Defaults)
No gradient text · no glass blur · no emoji icons · no card nesting · no system display face — all explicitly banned in DESIGN.md and verified absent. ✓

## Findings

| # | Severity | Finding | Recommendation |
| --- | --- | --- | --- |
| 1 | Major | DESIGN.md stale: pill font 0.6875rem→0.75rem, nav labels outdated | Update both entries (accepted decisions) |
| 2 | Minor | <tr onclick="..."> lacks tabindex/role, row not keyboard-focusable | Add tabindex="0" + keydown or rely on inner <a> (already keyboard path) |
| 3 | Minor | Filters/search/sort not reflected in URL — no shareable/reloadable state | Sync state to query params (?q=&cat=&sort=) |
| 4 | Enhancement | No preconnect for github.com / avatars.githubusercontent.com / img.shields.io | Add <link rel="preconnect"> ×3 in Layout head |
| 5 | Enhancement | Placeholders lack trailing "…" (contribute form ×5) | Append "…" per Web Interface Guidelines |
| 6 | Enhancement | No <meta name="theme-color"> matching active theme | Add theme-color meta (dark #001615 / light per tokens) |

## Verdict
Ship-quality at 8.5/10. One Major (documentation drift, not UI), three Minor, three Enhancement. No Critical.
