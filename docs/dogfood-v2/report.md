# Dogfood Report — AI Security Matrix v3.0 (回退后版本)

**Date**: 2026-09-21  
**Session**: `df-v2` (local dev server, chromium via CDP)  
**Total Screenshots**: 21  
**Output Directory**: `/tmp/dogfood-v2/screenshots/`  

---

## Summary

| Severity | Count | Description |
|:--------:|:-----:|:------------|
| ✨ UX Polish | 1 | Search empty state could improve UX with aria-live announcement |
| ⚠️ Visual | 1 | Shields.io badge load delay causes alt-text flicker (acceptable) |
| ✅ Verified | ✓ | Badge alignment perfect, search/Nav work correctly |

**Total issues found**: 2 (both minor/no-severity)

---

## Detailed Findings

### #1. Search Empty State Accessibility Enhancement

**Type**: UX / Accessibility  
**Location**: `/ai-security-matrix/tools/` page, search box  

**Steps to Reproduce**:
1. Go to home page (`/`)
2. Fill search box with `"zzznotfound12345"` (non-existent term)
3. Observe result table
4. See "No matching tools found. Clear filters" message

**Current Behavior**: 
- Message renders at row position
- No explicit screen reader announcement

**Suggested Fix**: Add `role="status" aria-live="polite"` to the "No matching tools..." message for automatic screen reader announcement when results are cleared.

**Evidence**: `/tmp/dogfood-v2/screenshots/04-search-empty.png`

**Priority**: Low (works correctly for keyboard/mouse users)

---

### #2. Shield.io Loading Artifact (Verified as Expected Behavior)

**Type**: Visual / Performance  
**Location**: `/tools/usestrix-strix/`, ToolBadges component  

**Observation**: Shields.io badges show their alt text ("Read X on DeepWiki") while images load, before rendering shield graphics.

**Root Cause**: `loading="lazy"` causes deferment until scroll or timeout; shields.io is external API call requiring additional HTTP request.

**Verification**: Badge alignment test (`badge2.json`) shows perfect vertical centering:
- All badges: top=283px, height=44px, image height=20px, image top=295px
- Perfectly centered in container ((44−20)/2 = 12px padding)

**Assessment**: This is expected behavior for lazy-loaded third-party images. The artifact is short-lived and doesn't impact core functionality. Alternative solution: render native HTML badges (already done in previous commit, then reverted).

**Evidence**: `/tmp/badge2.json` alignment data, `/tmp/dogfood-v2/screenshots/05-detail-direct.png`

---

## Features Tested Successfully

| Feature | Status | Details |
|:--------|:-------|:--------|
| Category Tabs | ✅ Pass | agent/scanner/mcp/skill tabs filter works |
| Search Box | ✅ Pass | Filters by text, clears filters button present |
| Empty State | ✅ Pass | Shows "No matching tools" with clear button |
| Sort Headers | ✅ Pass | Keyboard accessible (tabindex), clickable |
| Tool Detail Page | ✅ Pass | All sections rendered correctly |
| Badges | ✅ Pass | All 4 badges visible, perfectly aligned |
| Static Pages | ✅ Pass | About/Guide/Contribute/Commercial all render |
| Links | ✅ Pass | All internal links navigate correctly |
| Responsive Preview | ✅ Pass | Screenshots taken successfully |
| Console Errors | ✅ None | Zero errors logged across all pages |

---

## Conclusion

The site functions correctly with no functional bugs detected during this round of testing. The only issues identified are minor UX improvements that don't block core functionality. The badge loading artifact is confirmed as expected behavior from lazy-loading strategy.

**Recommendation**: Accept current version for production. Consider adding aria-live to search empty state as low-priority enhancement.

**Signed**: Dogfood QA Session df-v2
