# Component Guidelines — AI Security Matrix

---

## 1. Design Tokens

All colour, type, and spacing values must reference CSS custom properties. **Never hardcode hex, RGB, or HSL values in component code.**

### Colour Tokens

| Token | Light | Dark | Semantics |
|:---|:---|:---|:---|
| `--paper` | `#f2f4f5` | `#001615` | Page background |
| `--paper-raised` | `#fbfcfc` | `#002523` | Component background |
| `--rule` | `#dde2e4` | `#123a38` | Divider |
| `--rule-strong` | `#c6ced1` | `#1c4f4c` | Emphasis border |
| `--alive` | `#101b1f` | `#ebf7f7` | Primary text |
| `--stale` | `#4a585d` | `#9ca6a7` | Secondary text |
| `--dead` | `#5f6d72` | `#8a9797` | Tertiary / metadata text |
| `--name` | `#824800` | `#ff9e37` | Tool name accent |
| `--name-ink` | `#f2f4f5` | `#001615` | Text on `--name` fills |
| `--star` | `#665000` | `#ffd400` | Star rating |
| `--cat-agent` | `#0061d4` | `#2c85ff` | Agent category accent |
| `--cat-scanner` | `#6c6a00` | `#8f8b00` | Scanner category accent |
| `--cat-mcp` | `#007374` | `#009798` | MCP category accent |
| `--cat-skill` | `#c4007c` | `#ff10a3` | Skill category accent |
| `--scope-ink` / `--scope-pill` | `#005240` / `#d2f2e6` | `#45e0ad` / `#002016` | Scope pill |
| `--host-ink` / `--host-pill` | `#990015` / `#ffe2df` | `#ff8078` / `#2b100f` | Host pill |
| `--access-ink` / `--access-pill` | `#4d4000` / `#f1eace` | `#e0c420` / `#201900` | Access pill |
| `--unseen-ink` / `--unseen-pill` | `#00485a` / `#cef1fa` | `#3cd4ed` / `#001e25` | Unseen pill |

### Type Scale

Only the following 8 steps are allowed, with adjacent gaps ≥ 11%:

```
12px (0.75rem) │ 14px (0.875rem) │ 16px (1rem) │ 18px (1.125rem)
20px (1.25rem) │ 28px (1.75rem)  │ 32px (2rem) │ 36px (2.25rem)
```

### Spacing Scale

- General spacing: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96` px
- Component micro-spacing: `2 / 6 / 10 / 14` px (4n+2 pattern, for pill padding, small gaps)

---

## 2. Component Development Rules

### File Structure

- **Single-file components**: Each `.astro` file uses scoped CSS in its `<style>` tag.
- **Shared styles**: Only design token definitions, resets, and utility classes go in `src/styles/global.css`.
- **Naming**: Semantic BEM-style class names. Do not use Tailwind classes as the sole styling mechanism.

### Accessibility (A11y) Mandatory Requirements

| Requirement | Details |
|:---|:---|
| Contrast ≥ 4.5:1 (AA) / ≥ 7:1 (AAA) | All text / UI component pairs |
| `:focus-visible` fallback | Never bare `outline: none` |
| Touch targets ≥ 44×44 px | All interactive elements (mobile) |
| `aria-label` / `aria-hidden` | Icon buttons must have readable labels |
| `prefers-reduced-motion` | Motion must degrade to instantaneous transitions |
| Semantic HTML | `<button>` for actions, `<a>` for navigation, `<table>` for data |
| Images | Must have `alt` (decorative: empty) and `width` / `height` (prevent CLS) |

### Responsive Breakpoints

| Breakpoint | CSS query | Behaviour |
|:---|:---|:---|
| **Narrowest** | `≤ 320px` | Minimum viable layout |
| **Small** | `≤ 480px` | Icon-only buttons, type scale drops to 12px |
| **Medium** | `≤ 640px` | Header compact, nav single-row, table horizontal scroll |
| **Large** | `≤ 768px` | Hero font size reduced, images responsive |
| **Desktop** | `≥ 64rem` | Full layout, side margins |
| **Wide** | `≥ 80rem` | Container max-width 76rem |

---

## 3. Dependencies & Toolchain

| Dependency | Version | Purpose |
|:---|:---|:---|
| `astro` | ^5.x | Static site generation framework |
| `sharp` | ^0.x | SVG → PNG (OG image generation) |
| `@astrojs/tailwind` | ^6.x | Tailwind integration (`applyBaseStyles: false`) |
| `playwright` | ^1.x | End-to-end testing |
| `axe-core` | ^4.13 | Accessibility compliance scanning |

---

## 4. Testing & Verification

After modifying any UI component, all of the following must pass:

```bash
npm run build                   # Static generation passes
npx playwright test             # 208 test runs pass
node scripts/a11y-audit.mjs     # axe-core zero violations
node scripts/contrast-audit.mjs # Contrast all green
```
