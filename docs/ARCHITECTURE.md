# Architecture — AI Security Matrix

## System Topology

```
upstream (aisecuritymatrix.com)
   │
   ▼  [scripts/scrape.py — daily GitHub Action]
data files
   ├── tools.json              (raw scraped data, 65 tools)
   ├── src/data/site.json      (Astro-ready dataset with derived flags)
   └── translations.json       (curated bilingual dictionaries)
   │
   ▼  [npm run build — scripts/gen-tool-og.mjs + astro build]
static output (dist/ — 688 pages)
   ├── /                                       (EN home)
   ├── /zh/                                    (ZH home)
   ├── /tools/[slug]/                          (EN tool detail ×65)
   ├── /zh/tools/[slug]/                       (ZH tool detail ×65)
   ├── /category/[cat]/                        (EN category index ×4)
   ├── /zh/category/[cat]/                     (ZH category index ×4)
   ├── /scope/[scope]/                         (EN scope index ×15)
   ├── /zh/scope/[scope]/                      (ZH scope index ×15)
   ├── /flag/[flag]/                           (EN flag index ×6)
   ├── /zh/flag/[flag]/                        (ZH flag index ×6)
   ├── /topic/[topic]/                         (EN topic index ×249)
   ├── /zh/topic/[topic]/                      (ZH topic index ×249)
   ├── /about/ · /zh/about/                    (About pages)
   ├── /guide/ · /zh/guide/                    (Guide pages)
   ├── /contribute/ · /zh/contribute/          (Contribute pages)
   ├── /commercial/ · /zh/commercial/          (Commercial pages)
   └── /og/                                    (130 self-generated PNGs)
   │
   ▼  [deploy-pages.yml]
GitHub Pages (https://gandli.github.io/ai-security-matrix/)
```

---

## Directory Structure

```
.
├── .github/workflows/
│   ├── deploy-pages.yml          # GitHub Pages build & publish
│   ├── e2e.yml                   # Playwright E2E test pipeline
│   └── sync-aisecuritymatrix.yml # Daily upstream scrape & sync
├── assets/readme/                # Screenshots embedded in README (3.2 MB)
├── docs/                         # Technical documentation
│   ├── PROJECT-SPEC.md
│   ├── ARCHITECTURE.md
│   ├── COMPONENT-GUIDELINES.md
│   ├── PAGE-STRUCTURE.md
│   ├── DEVELOPMENT.md
│   ├── REGISTRY.md
│   └── DEPLOYMENT.md
├── e2e/                          # Playwright test suite (8 spec files)
├── public/                       # Static public assets (favicon, og-image)
│   └── og/                       # 130 tool OG images generated at build time
├── scripts/                      # Core automation scripts
│   ├── scrape.py                 # Upstream scraper + data generator
│   ├── gen-tool-og.mjs           # Per-tool OG image generator (sharp)
│   ├── a11y-audit.mjs            # axe-core WCAG 2.2 AA audit
│   ├── contrast-audit.mjs        # Playwright contrast verification
│   └── capture-screenshots.mjs   # Automated full-site screenshot capture
├── src/
│   ├── components/
│   │   ├── Hero.astro            # Home page hero banner
│   │   ├── MatrixApp.astro       # Core app: filter / sort / table / coverage
│   │   ├── TermList.astro        # Reusable card grid for index pages
│   │   └── ToolBadges.astro      # External badge row for tool detail
│   ├── data/
│   │   └── site.json             # Build-time dataset
│   ├── layouts/
│   │   └── Layout.astro          # Universal layout (header/nav/footer/a11y/audio)
│   ├── lib/
│   │   ├── audio/sounds.ts       # Web Audio synthetic sound engine
│   │   ├── taxonomy.ts           # Bilingual taxonomy dictionary
│   │   └── url.ts                # Base-path-aware URL builder
│   ├── pages/                    # Static and dynamic page routes
│   └── styles/
│       └── global.css            # Global tokens, reset, components, responsive
├── AGENTS.md                     # Agent collaboration & development rules
├── CHANGELOG.md                  # Version history
├── DESIGN.md                     # Design system specification
├── PRODUCT.md                    # Product context & audience definition
├── README.md                     # English root index (canonical)
├── README.zh.md                  # Chinese translation index
├── TODO.md                       # Development status & roadmap
├── astro.config.mjs              # Astro configuration
├── package.json                  # Dependencies & scripts
├── playwright.config.ts          # Playwright test configuration
├── tailwind.config.js            # Tailwind integration configuration
├── tools.json                    # Scraped raw dataset
└── translations.json             # Curated bilingual translation dictionary
```

---

## Data Flow & Derivation Pipeline

```
1. Scrape (scripts/scrape.py)
   aisecuritymatrix.com/sitemap.xml
   ├── Parse 65 tool page HTMLs
   ├── Extract metadata, bundled tools, checklist
   └── Write tools.json

2. Merge translations (translations.json)
   tools.json + translations.json (tools + static dictionaries)
   └── Derive src/data/site.json

3. Pre-generate visual assets (scripts/gen-tool-og.mjs)
   site.json → sharp (SVG template → 144 DPI PNG)
   └── Output public/og/{slug}.png + {slug}-zh.png (130 images)

4. Static build (astro build)
   site.json + page templates → 688 HTML files (dist/)

5. Deploy (deploy-pages.yml)
   dist/ → orphan branch gh-pages → GitHub Pages CDN
```
