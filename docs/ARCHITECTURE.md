# Architecture — AI Security Matrix

## 系统拓扑

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

## 目录结构

```
.
├── .github/workflows/
│   ├── deploy-pages.yml          # GitHub Pages 构建与发布
│   ├── e2e.yml                   # Playwright E2E 测试流水线
│   └── sync-aisecuritymatrix.yml # 每日上游数据同步
├── assets/readme/                # README 嵌入的截图像册 (3.2 MB)
├── docs/                         # 项目技术文档
│   ├── PROJECT-SPEC.md
│   ├── ARCHITECTURE.md
│   ├── COMPONENT-GUIDELINES.md
│   ├── PAGE-STRUCTURE.md
│   ├── DEVELOPMENT.md
│   ├── REGISTRY.md
│   └── DEPLOYMENT.md
├── e2e/                          # Playwright 测试套件 (8 个 spec 文件)
├── public/                       # 静态静态资源 (favicon, og-image)
│   └── og/                       # 构建时生成的 130 张工具 OG 图
├── scripts/                      # 核心脚本
│   ├── scrape.py                 # 上游抓取 + 数据生成
│   ├── gen-tool-og.mjs           # 每工具 OG 图批量生成 (sharp)
│   ├── a11y-audit.mjs            # axe-core 无障碍合规扫描
│   ├── contrast-audit.mjs        # Playwright 真实对比度测量
│   └── capture-screenshots.mjs   # 自动化全站截图采集
├── src/
│   ├── components/
│   │   ├── Hero.astro            # 首页 Hero 区域
│   │   ├── MatrixApp.astro       # 核心应用：筛选/排序/表格/覆盖面
│   │   ├── TermList.astro        # 索引页通用卡片网格
│   │   └── ToolBadges.astro      # 工具详情页外部徽章行
│   ├── data/
│   │   └── site.json             # 构建期消费的数据集
│   ├── layouts/
│   │   └── Layout.astro          # 全站通用布局（header/nav/footer/a11y/audio）
│   ├── lib/
│   │   ├── audio/sounds.ts       # Web Audio 纯合成音效引擎
│   │   ├── taxonomy.ts           # 双语术语字典
│   │   └── url.ts                # Base 路径感知的 URL 构建器
│   ├── pages/                    # 静态路由与动态路由
│   └── styles/
│       └── global.css            # 全局样式：设计令牌 + 重置 + 组件 + 响应式
├── AGENTS.md                     # Agent 协作与开发规范
├── CHANGELOG.md                  # 版本变更日志
├── DESIGN.md                     # 设计系统与视觉规范
├── PRODUCT.md                    # 产品上下文与受众定义
├── README.md                     # 英文主页索引
├── README.zh.md                  # 中文主页索引
├── TODO.md                       # 开发计划与待办事项
├── astro.config.mjs              # Astro 配置文件
├── package.json                  # 依赖与脚本
├── playwright.config.ts          # Playwright E2E 配置
├── tailwind.config.js            # Tailwind 配置
├── tools.json                    # 爬虫输出的原始数据
└── translations.json             # 人工维护的双语翻译库
```

---

## 数据流与派生管线

```
1. 抓取 (scripts/scrape.py)
   aisecuritymatrix.com/sitemap.xml
   ├── 解析 65 个工具页面 HTML
   ├── 提取元数据、内置工具、checklist
   └── 写入 tools.json

2. 翻译合并 (translations.json)
   tools.json + translations.json (tools + static 字典)
   └── 派生 src/data/site.json

3. 视觉资产预生成 (scripts/gen-tool-og.mjs)
   site.json → sharp (SVG 模板 → 144 DPI PNG)
   └── 输出 public/og/{slug}.png + {slug}-zh.png (130 张)

4. 静态生成 (astro build)
   site.json + 路由模板 → 688 个 HTML 文件 (dist/)

5. 部署 (deploy-pages.yml)
   dist/ → 孤立分支 gh-pages → GitHub Pages CDN
```
