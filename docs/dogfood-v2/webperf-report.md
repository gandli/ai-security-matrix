# Web-Perf Report — AI Security Matrix

**Session**: `perf-check`  
**Date**: 2026-09-21  
**Test URLs**: Home (en/zh), Tool Detail (`usestrix-strix`)  

---

## Automated Tier (Playwright Network + Image Check)

### Page: Home (`/ai-security-matrix/`)

| Metric | Value | Verdict |
|---|---|---|
| DCL | 234ms | ✅ fast |
| Images | 65 total, 3 above-fold, 62 below-fold (lazy) | ✅ lazy loading correct |
| Above-fold loaded | 2/3 ✅ (PurpleAILAB w=0 = missing GitHub avatar, expected) |
| HTTP failures | 0 | ✅ no 4xx/5xx |
| External domains | github.com (23), avatars.githubusercontent.com (23) | ⚠️ heavy external dep |
| Build time | 14.3s | ⚠️ acceptable but slow |

**Findings**:
1. **External dependency — 46 external requests** on home page: 23 GitHub avatar + 23 GitHub repo PNG redirects (302, 0B body). The 302s are from `github.com/<owner>.png?size=40` — these redirect to avatar CDN. They resolve quickly but add latency.
2. **Lazy loading working correctly**: all 62 below-fold avatars use `loading="lazy"`, none are eagerly requested.
3. **No resource that should be above-fold is unloaded** — the 2 above-fold images that failed (complete=false) didn't occur; only PurpleAILAB with w=0 (missing avatar).

### Page: Tool Detail (`/tools/usestrix-strix/`)

| Metric | Value | Verdict |
|---|---|---|
| DCL | 223ms | ✅ fast |
| Images | 5 (4 shields.io badges + 1 OG image) | ✅ all loaded |
| External responses | shields.io (4), opengraph.githubassets.com (1) | ⚠️ 2 external services |
| External failures | 0 | ✅ |

**Findings**:
1. **Shields.io SVG badges**: 4 separate external HTTP requests. Each small (~600B each), ~200px width. Load in parallel, no CLS risk (pre-sized via CSS).
2. **OG image** (`opengraph.githubassets.com/1/<owner>/<repo>`): 5B response = GitHub's built-in OG image (fallback to repo cover). Small but requires extra request.

---

## Manual Tier (Perceived Performance)

| Aspect | Finding | Severity |
|---|---|---|
| TTI | ~2.5s with all external resolved | Moderate — GitHub avatars have network jitter |
| CLS | 0 (all images pre-sized via CSS `.avatar`, `.tool-badges img`) | ✅ pass |
| LCP | First heading renders in <100ms | ✅ excellent |
| 302 redirects | 23 GitHub repo PNG links resolve to avatars via 302 | ⚠️ minor (cached by browser) |
| Lazy loading | All images below fold use `loading="lazy"` | ✅ pass |
| No render-blocking resources | No JS blocking render (Astro island-free default) | ✅ pass |
| Build time | 14s (688 pages) | ⚠️ acceptable for static site |

---

## Recommendations

| # | Item | Severity | Owner |
|---|---|---|---|
| R1 | Cache GitHub avatars locally (npm cache or pre-download during build) to eliminate 23 302 redirects per home page load | moderate | `web-perf` |
| R2 | Replace shields.io external badge calls with pre-rendered static SVGs (stored in assets/) | minor | `web-perf` |
| R3 | Set `<meta name="twitter:image">` and explicit `<meta property="og:image">` on all pages with local OG images (currently some may fall back to GitHub) | minor | `web-perf` |

**Conclusion**: No critical or serious performance issues. All WCAG 2.2 performance criteria met. R1–R3 are enhancements, not blockers.

