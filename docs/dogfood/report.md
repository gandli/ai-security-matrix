# Dogfood Report — AI Security Matrix

- **Date**: 2026-09-22
- **Target**: http://localhost:3000/ai-security-matrix/
- **Session**: ai-matrix → ai-mobile (320×800)
- **Tool**: agent-browser (Rust CLI via CDP, `/usr/bin/chromium`)
- **Screenshots**: 18 (numbered `NN-description.png`)

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 2 |
| **Total** | **2** |

No JS console errors, no network failures, no broken functionality found.
The application works correctly across all pages, both themes, and mobile viewport.

---

### ISSUE-001 (Low) — Console shows empty error entries on every navigation

**Type:** console
**Repro Video:** N/A (no visible impact)

**Steps:**
1. Open any page
2. Run `agent-browser errors`

**Observed:** Each page navigation logs a blank `✗` error entry in the console output. No actual JS error is thrown — the entries have no message text.

**Analysis:** The `✗` entries are agent-browser CLI status markers for Vite HMR reconnections (multiple `[vite] connecting...` → `[vite] connected.` cycles), not real errors. This only occurs because the dev server is being used for testing; the production build (GitHub Pages) would not produce these.

**Impact:** None on users. Cosmetic only for dev-server testing.

**Screenshot:** N/A (console-only)

---

### ISSUE-002 (Low) — Nav label "Guide" lost its Chinese translation parity

**Type:** copy
**Repro Video:** N/A

**Steps:**
1. Open the site in English at 1280px
2. Observe the nav labels: About, Guide, Submit, Vendors
3. Switch to Chinese: 关于, 指南, 贡献, 商业

**Observed:** The English "Submit" and "Vendors" labels were shortened from "Contribute" and "Commercial tools" to fit the single-row nav at 320px. However, this change also affects desktop view where the full-width labels would fit fine. The semantic match is also loose — "Submit" suggests submitting a form, while the page is about contributing improvements.

**Impact:** Minor copy quality issue. Desktop users see abbreviated labels when full labels would fit.

**Screenshot:** `00-initial.png` (EN header), `06-zh-mode.png` (ZH header)

**Recommendation:** Use CSS `@media (max-width: 480px)` to apply short labels via `content` on a `<span>` swap, keeping full labels on desktop.

---

## What was tested

### Desktop (1280×900, dark + light themes)
- ✅ Home page loads with all 65 tools
- ✅ Category tabs filter correctly (agent 22, scanner 20, mcp 14, skill 9)
- ✅ Search filters to matching results (searched "nmap")
- ✅ Search returns empty state (searched "zzzznonexistent")
- ✅ Sort headers work (idle/desc toggle)
- ✅ Coverage view renders
- ✅ Theme toggle (dark ↔ light) works
- ✅ Language toggle (EN ↔ ZH) works
- ✅ Tool detail page: badges, OG image, scope pills, safety checklist, risk flags, topics
- ✅ Flag link navigates to `/flag/privilege/` index
- ✅ Guide page: 3 definition tables with dynamic counts and links
- ✅ Contribute page: 3-tab form with tool select (65 options), textarea, checkbox scopes
- ✅ New tool form: repo URL input, category select, scope checkboxes
- ✅ Commercial page: tool count, licence count, upstream link
- ✅ About page: mirror relationship statement, six risk flag explanations
- ✅ Zero JS console errors on all pages
- ✅ Zero network failures

### Mobile (320×800, ZH)
- ✅ Header renders at ~128px (16% of viewport, down from 310px / 39%)
- ✅ Single-row nav fits at 320px
- ✅ Category tabs visible and touchable
- ✅ Search box accessible
- ✅ Matrix table scrolls horizontally
- ✅ Coverage view renders on mobile
- ✅ Chinese text renders correctly (Noto Sans CJK SC)

### Screenshots inventory
| # | File | What it shows |
|---|------|---------------|
| 00 | initial.png | Desktop home, dark theme |
| 01 | tab-agent.png | Agent tab active (22 tools) |
| 02 | search-nmap.png | Search filter for "nmap" |
| 03 | sort-idle.png | Sort by "Last updated" clicked |
| 04 | coverage.png | Coverage view |
| 05 | light-mode.png | Theme toggled to light |
| 06 | zh-mode.png | Language toggled to Chinese |
| 07 | zh-contribute.png | ZH contribute page |
| 08 | form-filled.png | New tool form filled with repo + scopes |
| 09 | tool-detail.png | Tool detail page (strix) |
| 10 | flag-privilege.png | Flag index for "privilege" |
| 11 | guide.png | Guide page with dynamic tables |
| 12 | commercial.png | Commercial page |
| 13 | about.png | About page |
| 14 | mobile-320.png | Mobile 320px viewport |
| 15 | mobile-coverage.png | Coverage view on mobile |
| 16 | search-empty.png | Empty search results |
| 17 | sort-desc.png | Sort descending on "Last updated" |
