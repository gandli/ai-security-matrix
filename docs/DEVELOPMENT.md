# Development — AI Security Matrix

---

## 1. 前置依赖

| 依赖 | 版本 | 安装 |
|:---|:---|:---|
| Node.js | ≥ 22 | [nodejs.org](https://nodejs.org) |
| npm | ≥ 10 | 随 Node.js |
| Python | ≥ 3.11 | [python.org](https://python.org) |
| Chromium | any | `apt install chromium`（仅 Playwright / agent-browser 需要） |
| 字体 | fonts-noto-cjk | `apt install fonts-noto-cjk`（仅截图与 Linux 中文渲染需要） |

---

## 2. 快速开始

```bash
git clone https://github.com/gandli/ai-security-matrix.git
cd ai-security-matrix
npm install

# 启动开发服务器 (默认 http://localhost:4321/ai-security-matrix/)
npm run dev

# 启动构建并预览
npm run build && npm run preview

# 运行全量 E2E 测试
npx playwright test
```

---

## 3. npm 脚本

| 脚本 | 命令 | 说明 |
|:---|:---|:---|
| `npm run dev` | `astro dev` | 开发服务器，Vite HMR 热更新 |
| `npm run build` | `node scripts/gen-tool-og.mjs && astro build` | 生成 OG 图 + 构建静态站点 |
| `npm run preview` | `astro preview` | 本地预览构建产物（生产模式） |
| `npx playwright test` | Playwright E2E | 4 视口 × 8 spec 文件 |

---

## 4. 项目脚本说明

| 脚本 | 说明 |
|:---|:---|
| `scripts/scrape.py` | 抓取 aisecuritymatrix.com，生成 `tools.json` / `src/data/site.json` / README / Markdown 镜像 |
| `scripts/gen-tool-og.mjs` | 从 `site.json` 生成 130 张（65 × 2 语言）工具 OG 图（sharp SVG→PNG） |
| `scripts/a11y-audit.mjs` | axe-core WCAG 2.2 AA 全站无障碍合规扫描 |
| `scripts/contrast-audit.mjs` | Playwright 实测对比度（WCAG AA/AAA 阈值） |
| `scripts/capture-screenshots.mjs` | Playwright 自动采集全站截图（EN/ZH × Dark/Light） |
| `scripts/measure-header.mjs` | 量测移动端 Header 在各视口下的实际高度 |

---

## 5. 开发工作流

### 场景 A：修改一个组件的样式

```bash
# 1. 在 dev 模式下编辑
vim src/styles/global.css
# 浏览器自动热更新，无需手动刷新

# 2. 验证构建与测试
npm run build
npx playwright test

# 3. 运行无障碍与对比度检查
node scripts/a11y-audit.mjs
node scripts/contrast-audit.mjs

# 4. 提交
git add -A
git commit -m "refine(style): <describe change>"
git push origin astro-site
```

### 场景 B：新增一个功能特性

```bash
# 1. 在开发分支上工作
git checkout -b feat/your-feature

# 2. 修改对应的 .astro 文件或创建新组件
vim src/components/YourComponent.astro

# 3. 确认双语：如果涉及文案，同时修改 ZH 版本

# 4. 确认移动端：使用 Chrome DevTools 或 agent-browser 在 320px 测试

# 5. 跑通全部检查
npm run build && npx playwright test

# 6. 提交并推送
git add -A && git commit -m "feat: <description>"
git push origin feat/your-feature
# 向 astro-site 分支发 PR
```

### 场景 C：更新工具数据

```bash
# 手动触发每日同步
python3 scripts/scrape.py

# 或通过 GitHub Actions
gh workflow run sync-aisecuritymatrix.yml
```

---

## 6. 调试技巧

### Playwright 交互调试

```bash
# 只跑一个 spec 文件
npx playwright test e2e/contribute.spec.ts

# 使用 headed 模式（有浏览器窗口）
npx playwright test --headed

# 显示 trace
npx playwright test --trace on

# 查看最近失败截图
ls test-results/*/test-failed-1.png
```

### 无障碍审计

```bash
# axe-core 全量扫描（15 页 × 2 主题）
node scripts/a11y-audit.mjs

# 只跑对比度
node scripts/contrast-audit.mjs
```

### 移动端 Header 量测

```bash
node scripts/measure-header.mjs
# 输出各视口宽度下的 header 高度与 nav 行数
```
