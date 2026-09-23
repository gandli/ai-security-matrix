# Web Design Guidelines Review
Rule source: vercel-labs/web-interface-guidelines/command.md · Date: 2026-09-21

## src/components/MatrixApp.astro
src/components/MatrixApp.astro:119 - literal "... " in Scope tooltip header → should be "…"
src/components/MatrixApp.astro:335 - <tr onclick> row nav without tabindex + role="link" (a11y: row not keyboard-reachable, though inner <a> already handles navigation)
src/components/MatrixApp.astro:345 - avatar img: width/height explicit ✓, loading=lazy ✓, alt="" ✓, onerror fallback ✓
src/components/MatrixApp.astro:66 - match-count aria-live="polite" ✓
No transition: all · No outline:none · No user-scalable · No inline onClick · No icon-button missing aria-label ✓

## src/pages/contribute.astro (and zh/contribute.astro)
src/pages/contribute.astro:59 - placeholder "开源 AI 渗透测试工具..." no trailing "…"
src/pages/contribute.astro:64 - placeholder "e.g. current one mistranslates 'red team'" no trailing "…"
src/pages/contribute.astro:80 - placeholder "https://github.com/owner/repo" valid URL pattern ✓
src/pages/contribute.astro:103 - textarea placeholder no trailing "…"
src/pages/contribute.astro:133 - textarea placeholder no trailing "…"
src/pages/contribute.astro:362 - outline:none WITH focus-visible border-color replacement ✓ (permitted)
src/pages/contribute.astro - no autocomplete attributes on input/textarea (minor enhancement; form is external redirect so password managers irrelevant)

## src/styles/global.css
src/styles/global.css:52 - color-scheme: light ✓ (per dark-mode spec)
src/styles/global.css:83 - color-scheme: dark ✓
src/styles/global.css - no touch-action/tap-highlight/overscroll utilities (desktop-first SPA; touch devices see CSS defaults)

## src/layouts/Layout.astro
src/layouts/Layout.astro - skip-link present ✓ (heading structure h1 then nav)
src/layouts/Layout. astro - no <meta name="theme-color"> (enhancement)
src/layouts/Layout. astro - no <link rel="preconnect" href="https://github.com"> or avatars.githubusercontent.com / img.shields.io (external dep performance)

## src/components/Hero.astro / [slug].astro
✓ Hero heading uses text-wrap:balance absent — headling text not long enough to need it (minor)
✓ Tool detail page: headings hierarchical h1→h2 ✓, no skipped levels
✓ Prefers-reduced-motion honored in global.css ✓

## Summary
Passing rules: accessibility skeleton, focus-visible, image dims, reduced-motion, form labels ✓, semantic HTML ✓, heading hierarchy ✓, no banned anti-patterns ✓
Findings (all minor/enhancement):
  1. Placeholder ellipsis "…" usage (contribute.astro ×5)
  2. Row-as-link pattern (MatrixApp.astro:335) — keyboard reachable via inner <a>, but tabindex/role missing on <tr>
  3. Preconnect for github.com/avatars.githubusercontent.com/img.shields.io (Layout.astro)
  4. theme-color meta tag (Layout.astro)
  5. text-wrap:balance on hero headline (optional polish)