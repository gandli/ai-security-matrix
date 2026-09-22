# AI Security Matrix — 待办事项与路线图

---

## 状态总览

| 维度 | 状态 | 说明 |
|:---|:---:|:---|
| **核心功能** | ✅ 完成 | 65 工具全量收录、双语镜像、多维筛选与排序 |
| **视觉呈现** | ✅ 完成 | 近黑蓝绿设计语言、OKLCH 色相统一、两套主题完备 |
| **端到端测试** | ✅ 完成 | 208 个用例（Playwright），4 视口全绿 |
| **无障碍 (A11y)** | ✅ 完成 | axe-core 4.13.0 零违规，符合 WCAG 2.2 AA 标准 |
| **自动同步** | ✅ 完成 | 每日 GitHub Actions 抓取与派生 |
| **移动端适配** | ✅ 完成 | 极窄视口 (320px) 验证通过，Header 压缩 63% |

---

## 已完成里程碑 (Done)

- [x] **数据抓取管线**：`scripts/scrape.py` 自动化提取上游站点，自动生成 `tools.json`。
- [x] **双语字典系统**：`translations.json` 覆盖 65 个工具中文译名与描述、4 个静态页。
- [x] **Astro 静态站**：构建 688 个纯静态页面，全站零客户端框架运行时。
- [x] **四层索引体系**：
  - [x] 分类索引页：`/category/[cat]/`（4 个类别）
  - [x] 范围索引页：`/scope/[scope]/`（15 个范围）
  - [x] 风险标记索引页：`/flag/[flag]/`（6 项标记）
  - [x] 标签索引页：`/topic/[topic]/`（249 个细分标签）
- [x] **四大静态说明页**：
  - [x] `about.astro`（关于）：明确社区镜像定位、说明上游原创关系、详述六项风险检查标准。
  - [x] `guide.astro`（指南）：构建时动态派生分类与范围计数，提供风险标记指南。
  - [x] `contribute.astro`（贡献）：三套纯前端交互式表单，自动预填 GitHub Issue URL。
  - [x] `commercial.astro`（商业）：说明仅收录开源项目的考量、阐明商业产品收录资质标准。
- [x] **Web Audio 音效系统**：纯合成（0 静态资源引用），提供默认开启的柔和微交互音效。
- [x] **无障碍与色彩体系**：
  - [x] axe-core 全量页面 30 次扫描零违规。
  - [x] 修复暗色与亮色下全部四类 Risk Flag Pill 文字对比度（达 AAA ≥ 7:1）。
  - [x] 新增 `--name-ink` 语义变量，修复提交按钮在亮色下的对比度失效缺陷。
  - [x] 添加页面级 Skip Link、表格头键盘排序（Enter/Space 支持）。
  - [x] 全局接入 `prefers-reduced-motion: reduce`。
- [x] **移动端紧凑化**：
  - [x] Header 从 310px 降至 116px（小屏隐藏重复口号、导航改为紧凑单行）。
  - [x] 修复 `TermList` 卡片标题在小屏下的换行与星级徽章被挤压溢出缺陷。
- [x] **CI/CD 与部署**：
  - [x] `deploy-pages.yml` 自动发布至 GitHub Pages。
  - [x] `e2e.yml` 跑通 208 个 Playwright 用例并归档 HTML 测试报告。

---

## 进行中与待办事项 (Backlog)

### P1：近期改进
- [ ] **ISSUE-002 桌面端文案恢复**：在桌面断点（≥768px）使用 CSS 或条件渲染将导航文案还原为完整的 "Contribute"、"Commercial tools"、"使用指南"，仅在 ≤480px 启用单字/短词缩写。
- [ ] **搜索增强**：在首页 `MatrixApp.astro` 中引入简单的拼音首字母检索，提升中文用户搜索体验。
- [ ] **工具详情页分享图 (OG)**：为生成的 130 张工具 OG 图像引入更细致的项目语言（如显示主要编程语言、许可证标识）。

### P2：中期演进
- [ ] **PWA / 离线支持**：通过 Astro service worker 缓存基础框架与 `tools.json`，实现断网离线查阅。
- [ ] **RSS / Atom 更新源**：在每日同步后自动生成新收录工具与重大更新的动态 Feed。
- [ ] **自动化截图流水线**：将 `scripts/capture-screenshots.mjs` 接入 GitHub Actions，在数据更新时自动刷新 README 配图。

### P3：长期愿景
- [ ] **社区推荐自动化**：让通过 Contribute 表单提交的 GitHub Issue 能够经审核后一键合并至 `translations.json`。
- [ ] **本地执行沙箱指引**：为带有 `root`、`credentials` 标记的高危工具提供基于 Docker / Firecracker 的一键安全试用配置模板。
