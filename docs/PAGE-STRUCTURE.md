# Page Structure — AI Security Matrix

---

## 1. 路由体系

全站为 Astro 静态路由，所有页面部署于 Base 路径 `/ai-security-matrix/` 下。

| 路由 (EN) | 路由 (ZH) | 类型 | 页面说明 | 页面数 |
|:---|:---|:---:|:---|:---:|
| `/` | `/zh/` | 静态 | 矩阵主页（筛选、排序、双视图） | 2 |
| `/about/` | `/zh/about/` | 静态 | 关于页面（镜像定位、风险审计标准） | 2 |
| `/guide/` | `/zh/guide/` | 静态 | 使用指南（分类、范围、标记字典） | 2 |
| `/contribute/` | `/zh/contribute/` | 静态 | 贡献页面（三套交互式提交表单） | 2 |
| `/commercial/` | `/zh/commercial/` | 静态 | 商业工具（开源范围说明、收录标准） | 2 |
| `/tools/[slug]/` | `/zh/tools/[slug]/` | 动态 | 工具详情页（按 repo slug） | 130 |
| `/category/[cat]/` | `/zh/category/[cat]/` | 动态 | 分类索引页（4 个分类） | 8 |
| `/scope/[scope]/` | `/zh/scope/[scope]/` | 动态 | 测试范围索引页（15 个范围） | 30 |
| `/flag/[flag]/` | `/zh/flag/[flag]/` | 动态 | 风险标记索引页（6 项标记） | 12 |
| `/topic/[topic]/` | `/zh/topic/[topic]/` | 动态 | 标签索引页（249 个标签） | 498 |

**构建总页面数**：688 个静态 HTML 文件。

---

## 2. 页面与组件结构

### 通用布局 (`src/layouts/Layout.astro`)

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
            <!-- language toggle (globe) -->
            <!-- theme toggle (sun/moon) -->
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

### 矩阵主页 (`src/pages/index.astro` / `zh/index.astro`)

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

### 工具详情页 (`src/pages/tools/[slug].astro` / `zh/tools/[slug].astro`)

```
Layout (with ogImage = self-generated PNG)
└── article.static-doc
    ├── crumb: "← back to matrix"
    ├── h1: owner/name
    ├── description (EN / ZH)
    ├── ToolBadges.astro (GitHub stars, DeepWiki, Zread, CodeWiki)
    ├── figure.gh-og: GitHub social preview illustration (opengraph.githubassets.com)
    ├── tool-detail-grid: Category (chip), Stars, Last updated, Licence, Contributors, Size, Forks
    ├── Scope pills: clickable → /scope/[scope]/
    ├── Bundled tools list
    ├── Safety checklist table: 6 checks (yes / no / not checked)
    ├── Risk flags: clickable → /flag/[flag]/
    └── Topics: clickable → /topic/[topic]/
```

### 索引列表页 (`src/components/TermList.astro`)

用于 `/category/`、`/scope/`、`/flag/`、`/topic/` 页面：

```
Layout
└── TermList.astro
    ├── header: h2.term-headline + p.term-sub ("N tools · Back to matrix")
    └── ul.tool-card-grid
        └── li.tool-card-link (cards with repo name, stars, description)
```

### 贡献页面 (`src/pages/contribute.astro` / `zh/contribute.astro`)

```
Layout
└── article.static-doc
    ├── crumb: "← Back to matrix"
    ├── h1: "Contribute"
    ├── lede: mirror statement
    ├── Form section (tablist + 3 tabpanels)
    │   ├── Tab 1: Translation fix (tool select, textarea, reason)
    │   ├── Tab 2: Suggest a tool (repo URL, category, 15 scope checkboxes, why)
    │   └── Tab 3: Report data (tool select, field, expected value)
    │   └── Submit buttons: open pre-filled GitHub Issue URLs
    └── Manual guide: PR workflow, local run, pre-flight checklist, upstream notes
```
