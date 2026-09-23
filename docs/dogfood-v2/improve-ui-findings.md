# Improve-UI Audit Report

Date: 2026-09-21 · Read-only audit · Strict proof gate (contract + runtime + correction)

## Design language
- Audited surface: global chrome (header nav) + shared components (.pill) across EN/ZH pages
- Design sources: DESIGN.md (repo root), src/styles/global.css, src/layouts/Layout.astro
- Documented decisions: 8-step type scale (11→12px accepted), nav label shortening for 320px single-row (accepted), color tokens, micro-scale spacing
- Governing owners: DESIGN.md (contract), global.css / Layout.astro (implementation)
- Explicit exceptions: None documented

## Findings
| # | Problem | Evidence | Proposed change | Scope | Confidence |
| --- | --- | --- | --- | --- | --- |
| 1 | DESIGN.md pill spec stale: documents font `0.6875rem` but implementation is `0.75rem` | Contract: DESIGN.md:75 "Pills ... 0.6875rem font" · Runtime: global.css:549 `font-size: 0.75rem` inside `.pill` · Correction: accepted 8-step type-scale decision removed 11px (11→12) | Update DESIGN.md:75 pill font value `0.6875rem` → `0.75rem` (doc aligns to accepted decision; UI unchanged) | docs/DESIGN.md | High |
| 2 | DESIGN.md header nav spec stale: documents "About / Definitions / Contribute / Commercial" but UI ships "About / Guide / Submit / Vendors" | Contract: DESIGN.md:66 nav label list · Runtime: Layout.astro:138-141 ships Guide/Submit/Vendors · Correction: accepted nav-shortening decision (ISSUE-002, 320px fit) | Update DESIGN.md:66 nav list to "About / Guide / Submit / Vendors" (doc aligns to accepted decision; UI unchanged) | docs/DESIGN.md | High |
| — | ~~td padding mismatch~~ (candidate rejected: evidence supports both "change CSS to 0.625rem 0.75rem" and "update doc to 1rem 1.5rem 1rem 0"; no accepted decision found → gate: multiple corrections) | — | — | — | — |

## Improve first
Finding 2 — header nav labels appear on every page of both languages; a stale contract on the most-visible component misleads every future UI change more than any other doc drift.

(Both findings are documentation-drift corrections, recorded here for the executor per improve-ui boundaries; this audit did not modify product source.)
