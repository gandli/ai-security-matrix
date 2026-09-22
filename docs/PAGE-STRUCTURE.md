# Page Structure — AI Security Matrix

---

## 1. Route Architecture

All pages are Astro static routes deployed under the base path `/ai-security-matrix/`.

| Route (EN) | Route (ZH) | Type | Description | Count |
|:---|:---|:---:|:---|:---:|
| `/` | `/zh/` | Static | Matrix home (filter, sort, dual views) | 2 |
| `/about/` | `/zh/about/` | Static | About (mirror positioning, risk criteria) | 2 |
| `/guide/` | `/zh/guide/` | Static | Guide (category, scope, flag dictionary) | 2 |
| `/contribute/` | `/zh/contribute/` | Static | Contribute (3 interactive submission forms) | 2 |
| `/commercial/` | `/zh/commercial/` | Static | Commercial (open-source scope, listing criteria) | 2 |
| `/tools/[slug]/` | `/zh/tools/[slug]/` | Dynamic | Tool detail (by repo slug) | 130 |
| `/category/[cat]/` | `/zh/category/[cat]/` | Dynamic | Category index (4 categories) | 8 |
| `/scope/[scope]/` | `/zh/scope/[scope]/` | Dynamic | Scope index (15 scopes) | 30 |
| `/flag/[flag]/` | `/zh/flag/[flag]/` | Dynamic | Risk flag index (6 flags) | 12 |
| `/topic/[topic]/` | `/zh/topic/[topic]/` | Dynamic | Topic index (249 tags) | 498 |

**Total static pages**: 688 HTML files.

---

## 2. Page & Component Structure

### Universal Layout (`src/layouts/Layout.astro`)

```html
<!doctype html>
<html lang="{lang}" data-theme="dark">
  <head>
    <!-- meta, title, og/twitter tags, canonical -->
    <!-- inline theme init script (DOMContentLoaded) -->
  </head>
  <body>
    <a href="#main" class="skip-link">Skip to main content</a>
    <div class="wrap">
      <header class="site-header">
        <h1 class="brand">AI Security Matrix</h1>
        <nav class="site-nav">
          <div class="nav-links">About · Guide · Submit · Vendors</div>
          <div class="nav-actions">
            <!-- language toggle (globe icon) -->
            <!-- theme toggle (sun/moon icon) -->
          </div>
        </nav>
      </header>
      <main id="main" tabindex="-1">
        <slot />
      </main>
      <footer class="site-footer">
        <nav>About · Guide · Submit · Vendors · GitHub</nav>
        <p>© 2026 AI Security Matrix</p>
      </footer>
    </div>
    <!-- inline Web Audio init script -->
  </body>
</html>
```

### Matrix Home (`src/pages/index.astro` / `zh/index.astro`)

```
Layout
├── Hero.astro
│   ├── hero-headline: "AI security tooling, sorted by what it does to your machine."
│   └── hero-stats: "65 tools across 4 categories and 15 testing scopes"
└── MatrixApp.astro
    ├── Toolbar
    │   ├── Category tabs: all(65) · agent(22) · scanner(20) · mcp(14) · skill(9)
    │   ├── View toggle: list · coverage
    │   └── Search box + match count ("X / 65")
    ├── List View: <table> with 6 sortable columns
    │   └── Rows: [Stars, Last updated, Category, Tool (avatar+name+desc), Scope pills, Flag pills]
    └── Coverage View: matrix table (Category × Scope heatmap)
```

### Tool Detail (`src/pages/tools/[slug].astro` / `zh/tools/[slug].astro`)

```
Layout (with ogImage = self-generated PNG)
└── article.static-doc
    ├── crumb: "← back to matrix"
    ├── h1: owner/name
    ├── description (EN / ZH)
    ├── ToolBadges.astro (GitHub stars, DeepWiki, Zread, CodeWiki)
    ├── figure.gh-og: GitHub social preview (opengraph.githubassets.com)
    ├── tool-detail-grid: Category, Stars, Last updated, Licence, Contributors, Size, Forks
    ├── Scope pills: clickable → /scope/[scope]/
    ├── Bundled tools list
    ├── Safety checklist table: 6 checks (yes / no / not checked)
    ├── Risk flags: clickable → /flag/[flag]/
    └── Topics: clickable → /topic/[topic]/
```

### Index List Pages (`src/components/TermList.astro`)

Used for `/category/`, `/scope/`, `/flag/`, `/topic/` pages:

```
Layout
└── TermList.astro
    ├── header: h2.term-headline + p.term-sub ("N tools · Back to matrix")
    └── ul.tool-card-grid
        └── li.tool-card-link (cards: repo name, star badge, description)
```

### Contribute Page (`src/pages/contribute.astro` / `zh/contribute.astro`)

```
Layout
└── article.static-doc
    ├── crumb: "← Back to matrix"
    ├── h1: "Contribute"
    ├── lede: mirror statement
    ├── Form section (role="tablist" + 3 role="tabpanel" sections)
    │   ├── Tab 1: Translation fix (tool select, textarea, optional reason)
    │   ├── Tab 2: Suggest a tool (repo URL, category select, 15 scope checkboxes, why)
    │   └── Tab 3: Report data (tool select, field select, expected value)
    │   └── Submit buttons: open pre-filled GitHub Issue URLs
    └── Manual guide: PR workflow, local run, pre-flight checklist, upstream notes
```
