# Component Guidelines — AI Security Matrix

---

## 1. 设计令牌（Design Tokens）

所有色彩、字号与间距必须通过 CSS 自定义属性引用，**严禁在组件内硬编码 Hex / RGB / HSL 值**。

### 色彩令牌

| Token | Light | Dark | 语义 |
|:---|:---|:---|:---|
| `--paper` | `#f2f4f5` | `#001615` | 页面背景 |
| `--paper-raised` | `#fbfcfc` | `#002523` | 组件背景 |
| `--rule` | `#dde2e4` | `#123a38` | 分隔线 |
| `--rule-strong` | `#c6ced1` | `#1c4f4c` | 强调边框 |
| `--alive` | `#101b1f` | `#ebf7f7` | 主要文本 |
| `--stale` | `#4a585d` | `#9ca6a7` | 次要文本 |
| `--dead` | `#5f6d72` | `#8a9797` | 辅助/元数据文本 |
| `--name` | `#824800` | `#ff9e37` | 工具名强调 |
| `--name-ink` | `#f2f4f5` | `#001615` | 放在 `--name` 底色上的文本 |
| `--star` | `#665000` | `#ffd400` | 星级 |
| `--cat-agent` | `#0061d4` | `#2c85ff` | Agent 类别强调 |
| `--cat-scanner` | `#6c6a00` | `#8f8b00` | Scanner 类别强调 |
| `--cat-mcp` | `#007374` | `#009798` | MCP 类别强调 |
| `--cat-skill` | `#c4007c` | `#ff10a3` | Skill 类别强调 |
| `--scope-ink` / `--scope-pill` | `#005240` / `#d2f2e6` | `#45e0ad` / `#002016` | Scope pill |
| `--host-ink` / `--host-pill` | `#990015` / `#ffe2df` | `#ff8078` / `#2b100f` | Host pill |
| `--access-ink` / `--access-pill` | `#4d4000` / `#f1eace` | `#e0c420` / `#201900` | Access pill |
| `--unseen-ink` / `--unseen-pill` | `#00485a` / `#cef1fa` | `#3cd4ed` / `#001e25` | Unseen pill |

### 字号刻度（Type Scale）

仅允许使用以下 8 档，相邻间隔 ≥ 11%：

```
12px (0.75rem) │ 14px (0.875rem) │ 16px (1rem) │ 18px (1.125rem)
20px (1.25rem) │ 28px (1.75rem)  │ 32px (2rem) │ 36px (2.25rem)
```

### 间距刻度（Spacing Scale）

- 常规间距：`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96` px
- 组件内微间距：`2 / 6 / 10 / 14` px（4n+2 模式，用于 pill padding、小 gap）

---

## 2. 组件开发规范

### 文件结构

- **单文件组件**：每个 `.astro` 文件在 `<style>` 标签内使用 Astro scoped CSS。
- **共享样式**：仅用于跨组件复用的 token 定义、重置与工具类，写在 `src/styles/global.css`。
- **命名**：CSS 类名使用语义化 BEM 风格，不使用 Tailwind 类作为唯一样式来源。

### 无障碍（A11y）强制要求

| 要求 | 说明 |
|:---|:---|
| 对比度 ≥ 4.5:1 (AA) / ≥ 7:1 (AAA) | 所有文本 / UI 组件对 |
| `:focus-visible` 替代态 | 严禁裸 `outline: none` |
| 触控目标 ≥ 44×44 px | 全部交互元素（移动端） |
| `aria-label` / `aria-hidden` | 图标按钮必须有可读标签 |
| `prefers-reduced-motion` | 动效必须可降级为瞬时切换 |
| 语义 HTML | `<button>` 用于动作，`<a>` 用于导航，`<table>` 用于数据 |
| 图片 | 必须提供 `alt`（装饰性设空）和 `width` / `height`（防 CLS） |

### 响应式断点

| 断点 | CSS 查询 | 行为 |
|:---|:---|:---|
| **极窄** | `≤ 320px` | 基础保底布局 |
| **小屏** | `≤ 480px` | 图标化按钮、字阶降至 12px |
| **中屏** | `≤ 640px` | Header 压缩、导航单行、表格横滚 |
| **大屏** | `≤ 768px` | Hero 字号缩小、图片响应式 |
| **桌面** | `≥ 64rem` | 完整布局、侧边留白 |
| **宽屏** | `≥ 80rem` | 容器最大宽 76rem |

---

## 3. 依赖与工具链

| 依赖 | 版本 | 用途 |
|:---|:---|:---|
| `astro` | ^5.x | 静态站点生成框架 |
| `sharp` | ^0.x | SVG → PNG（OG 图像生成） |
| `@astrojs/tailwind` | ^6.x | Tailwind 集成（`applyBaseStyles: false`） |
| `playwright` | ^1.x | 端到端测试 |
| `axe-core` | ^4.13 | 无障碍合规扫描 |

---

## 4. 测试与验证

每次修改 UI 组件后，必须通过以下全部检查：

```bash
npm run build                   # 静态生成通过
npx playwright test             # 208 个用例全部通过
node scripts/a11y-audit.mjs     # axe-core 零违规
node scripts/contrast-audit.mjs # 对比度全绿
```
