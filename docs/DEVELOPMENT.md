# Development — AI Security Matrix

---

## 1. Prerequisites

| Dependency | Version | Install command | Notes |
|:---|:---|:---|:---|
| Node.js | ≥ 22 | [nodejs.org](https://nodejs.org) | Runtime |
| npm | ≥ 10 | Bundled with Node | Package manager |
| Python | ≥ 3.11 | [python.org](https://python.org) | Scraper & data pipeline |
| Chromium | Any | `apt install chromium` | Playwright & agent-browser |
| Fonts | Noto CJK | `apt install fonts-noto-cjk` | Linux CJK screenshot rendering |

---

## 2. Quick Start

```bash
git clone https://github.com/gandli/ai-security-matrix.git
cd ai-security-matrix
npm install

# Start local dev server (default: http://localhost:4321/ai-security-matrix/)
npm run dev

# Build static site and preview locally
npm run build && npm run preview

# Run the full end-to-end test suite
npx playwright test
```

---

## 3. npm Scripts

| Script | Command | Purpose |
|:---|:---|:---|
| `npm run dev` | `astro dev` | Dev server with Vite HMR hot module replacement |
| `npm run build` | `node scripts/gen-tool-og.mjs && astro build` | Generate 130 OG images + compile static site |
| `npm run preview` | `astro preview` | Local preview of production build |
| `npx playwright test` | Playwright CLI | 4 viewports × 8 spec files |

---

## 4. Automation Scripts

| Script | Purpose |
|:---|:---|
| `scripts/scrape.py` | Scrapes aisecuritymatrix.com, generates `tools.json`, `site.json`, READMEs, Markdown mirror |
| `scripts/gen-tool-og.mjs` | Generates 130 per-tool OG images (sharp SVG → PNG) |
| `scripts/a11y-audit.mjs` | axe-core WCAG 2.2 AA full-site accessibility audit |
| `scripts/contrast-audit.mjs` | Playwright-based rendered contrast measurement (WCAG AA/AAA) |
| `scripts/capture-screenshots.mjs` | Automated screenshot capture (EN/ZH × Dark/Light) |
| `scripts/measure-header.mjs` | Measures mobile header height across viewport widths |

---

## 5. Development Workflows

### Workflow A — Modifying Component Styles

```bash
# 1. Edit in dev mode
vim src/styles/global.css
# Browser hot-reloads automatically

# 2. Validate build and tests
npm run build
npx playwright test

# 3. Verify accessibility and contrast
node scripts/a11y-audit.mjs
node scripts/contrast-audit.mjs

# 4. Commit and push
git add -A
git commit -m "refine(style): <describe change>"
git push origin astro-site
```

### Workflow B — Adding a Feature

```bash
# 1. Work on a feature branch
git checkout -b feat/your-feature

# 2. Modify or create .astro components
vim src/components/YourComponent.astro

# 3. Bilingual parity: update both EN and ZH versions if copy changes

# 4. Mobile check: test at 320px width via Chrome DevTools or agent-browser

# 5. Run all checks
npm run build && npx playwright test

# 6. Push and open PR against astro-site
git add -A && git commit -m "feat: <description>"
git push origin feat/your-feature
```

### Workflow C — Refreshing Upstream Data

```bash
# Trigger the scraper manually
python3 scripts/scrape.py

# Or trigger via GitHub Actions
gh workflow run sync-aisecuritymatrix.yml
```

---

## 6. Debugging Tips

### Playwright Interactive Debugging

```bash
# Run a single spec file
npx playwright test e2e/contribute.spec.ts

# Headed mode (visible browser window)
npx playwright test --headed

# Enable trace on failure
npx playwright test --trace on

# View failure screenshots
ls test-results/*/test-failed-1.png
```

### Accessibility Auditing

```bash
# axe-core full-site audit (15 pages × 2 themes)
node scripts/a11y-audit.mjs

# Contrast-only verification
node scripts/contrast-audit.mjs
```

### Mobile Header Height Measurement

```bash
node scripts/measure-header.mjs
# Outputs header pixel height and nav row count for 320, 375, 390, 414px
```
