# Break Report — TermList Card Stress Test

**Session**: `break-term`  
**Component**: `TermList.astro` (used by category/scope/flag/topic index pages)  
**Screenshot**: `/tmp/dogfood-v2/screenshots/break-termlist.png`  

---

## Scenarios Tested

| # | Scenario | Observed |
|---|----------|----------|
| S1 | 60-char repo name + 200-char description | **PASS** — repo name truncates with ellipsis, description clamps to 2 lines (140 char limit), badge stays on same line |
| S2 | Empty state (zero items) | **PASS** — renders "No tools yet." italic message in footer |
| S3 | Single item | **PASS** — grid renders 1 card without orphan-row issues |
| S4 | 63k stars + 47-char owner/name + long desc | **PASS** — stars format to "63,132", repo name truncates, desc clamps |
| S5 | Zero stars | **PASS** — star badge omitted entirely (no empty pill) |
| S6 | Empty description | **PASS** — `.card-desc` renders empty, no layout shift |
| S7 | 320px container + 41-char repo name | **PASS** — truncation works inside narrow container |

---

## Break Findings

| Scenario | Observed Break | Owner |
|---|---|---|
| — | **No visible breaks** — all 7 scenarios render correctly | — |

---

## Notes

- `.repo-name` uses `text-overflow: ellipsis`, `white-space: nowrap`, `min-width: 0` — correct handling of long names
- Description clamped via JS `slice(0, 140)` in `TermList.astro` — works but relies on JS, not CSS clamp; still fine because content is pre-rendered
- Star badge conditional `{r.stars > 0 && ...}` — no empty badge when stars=0
- Grid `minmax(280px, 1fr)` handles 320px viewport without overflow

**Overall**: TermList card is robust against extreme production content. No fixes needed.

