# AI Security Matrix — Agent 协作与代码开发规范

本文档为 AI Agent（Claude Code、Codex、Pi 等）及人类开发者协同维护本仓库提供**强制性行为准则**与**工程规范**。

---

## 1. 项目概况与原则

- **定位**：`https://aisecuritymatrix.com` 的开源双语（中/英）社区镜像与增强呈现层。
- **技术栈**：Astro 5 (Static Output) + 原生 CSS（设计令牌）+ Tailwind 工具类 + Playwright E2E。
- **关键约束**：
  1. **永不手动编辑 `tools.json`**：该文件由 `scripts/scrape.py` 每日全权生成。
  2. **中文翻译在 `translations.json`**：增补或修正翻译只改动该文件的 `tools` 或 `static` 节点。
  3. **单写者原则**：同一工作区同一时间仅允许一个 Agent 进行文件修改。
  4. **全绿门禁**：任何提交前必须保证 `npm run build` 和 `npx playwright test` 零报错。

---

## 2. 语言与沟通准则

- **思考与回复语言**：无论用户使用何种语言提问，**思考过程与最终输出均强制使用中文**。
- **代码与提交信息**：
  - Git Commit Message 使用遵循 Conventional Commits 的英文规范（`feat:`, `fix:`, `refactor:`, `chore:` 等）。
  - 标识符、变量名、CSS 类名一律使用英文。
  - 用户界面文本必须严格保持**中英双语对齐**。

---

## 3. 分支与部署规范

- **分支角色**：
  - `astro-site`：主开发与部署分支，所有特性、修复均向此分支提交并推送。
  - `gh-pages`：GitHub Actions 自动构建生成的孤立发布分支，由 CI 全权管理，严禁手动提交。
  - `main`：旧版纯 Markdown 根目录归档分支。
- **Base 路径**：
  - 本项目部署于 GitHub Pages 项目页，Base 路径必须保持为 `/ai-security-matrix/`。
  - 内部跳转及资源引用必须通过 `@/lib/url.ts` 中的 `url()`、`home()` 或 `asset()` 构造，严禁手写硬编码绝对路径。

---

## 4. UI / UX 与样式规范

- **设计权威**：以根目录 `DESIGN.md` 与 `aisecuritymatrix.com` 原始视觉语言为准绳。
- **色彩与主题**：
  - 遵循 `better-colors` 规范：禁止随意在组件内写死 Hex 颜色。
  - 必须使用 `:root` 与 `[data-theme="dark"]` 派生的语义 CSS 变量（`--alive`, `--stale`, `--dead`, `--rule`, `--name-ink` 等）。
  - 所有前景色与背景色组合必须满足 **WCAG 2.2 AA 标准（对比度 ≥ 4.5:1，重要元素要求 AAA ≥ 7:1）**。
- **排版与间距**：
  - 字阶固定收敛至 8 档（12 / 14 / 16 / 18 / 20 / 28 / 32 / 36 px），禁止随意创建奇数像素字号。
  - 间距吸附 micro-scale（2 / 6 / 10 / 14 px 及其倍数）。
  - 移动端触控目标必须保持 **≥ 44×44 px**。
- **无障碍（A11y）底线**：
  - 交互元素严禁使用 `outline: none` 而不提供 `:focus-visible` 替代态。
  - 遵守 `prefers-reduced-motion: reduce`，对动效提供瞬时降级。
  - 图标必须标明 `aria-label` 或 `aria-hidden="true"`。

---

## 5. 提交前检查清单（Pre-flight Checklist）

每次执行提交前，Agent 必须在本地容器内跑通以下流水线：

```bash
# 1. 验证静态构建通过，无 TS / Astro 语法错误
npm run build

# 2. 跑通全量端到端测试（目前 208 个用例）
npx playwright test

# 3. 运行 axe-core 无障碍合规扫描
node scripts/a11y-audit.mjs

# 4. 运行对比度精确计算脚本
node scripts/contrast-audit.mjs
```
