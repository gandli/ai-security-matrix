# Registry — AI Security Matrix

数据抓取、校验与翻译分发的完整说明。

---

## 1. 数据抓取（`scripts/scrape.py`）

每日 GitHub Actions（`sync-aisecuritymatrix.yml`）自动运行：

### 流程

1. **Sitemap 解析**：从 `aisecuritymatrix.com/sitemap.xml` 提取全部工具页面 URL。
2. **索引页解析**：抓取首页 HTML，提取分类、测试范围、星级、风险标记。
3. **详情页解析**：逐页抓取每个工具的描述、许可证、维护者、内置工具、安全检查清单。
4. **翻译合并**：从 `translations.json` 注入中文描述（若无则回退英文）。
5. **结构化输出**：写入 `tools.json`（排序后的完整数据集）。
6. **静态页面镜像**：生成 `tools/agents/*.md`、`tools/agents/*.zh.md` 等分类目录。
7. **README 生成**：调用 `directory_readme()` 生成 `README.md` 与 `README.zh.md`。
8. **Git 提交**：`git add -A && git commit`（如有变化）。

### 安全守门

```yaml
# Guard against a broken scrape
NEW=$(echo ${{ steps.scrape.outputs.after }})
OLD=${{ steps.scrape.outputs.before }}
# 如果工具数量骤减超过 30%，CI 将拒绝合并
```

---

## 2. 数据结构

### `tools.json`（顶层字段）

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| `slug` | string | 工具标识（URL 段） |
| `repo` | string | GitHub 仓库路径 (`owner/name`) |
| `category` | string | 分类：`agent` / `scanner` / `mcp` / `skill` |
| `stars` | string | 格式化星级（如 `63k`） |
| `freshness` | string | 最后推送（如 `today`, `7d`, `1.2y`） |
| `description` | string | 英文描述（来自 GitHub API 或 README） |
| `description_zh` | string | 中文描述（来自 translations.json） |
| `licence` | string | 许可证标识 |
| `bundled_tools` | string[] | 内嵌/捆绑的第三方工具列表 |
| `checklist` | object | 六项安全检查结果（yes/no） |
| `scopes` | string[] | 测试范围（如 `webapp`, `api`, `network`） |
| `access` | string[] | Access 风险标记（`root`, `credentials`） |
| `host` | string[] | Host 风险标记（`installs`, `binaries`） |
| `unseen` | string[] | Unseen 风险标记（`calls out`, `opaque`） |

### `translations.json`

| Key | 用途 |
|:---|:---|
| `_comment` | 注释说明 |
| `tools` | `{slug: 中文描述}` 映射，65 个条目 |
| `static` | 静态页整段翻译（`about` / `guide` / `contribute` / `commercial`） |

---

## 3. 校验规则

### 数据完整性

- 工具总数不得低于 30（防上游站点结构变更导致解析全空）。
- 每个工具必须有 `repo` 和 `category` 字段。
- `checklist` 六项检查必须存在（可为 `not checked`）。

### 对比度合规

- 全部前景/背景色对必须通过 `scripts/contrast-audit.mjs`（WCAG AA ≥ 4.5:1）。
- 修改任何 token 后必须重跑该脚本，并确认两套主题均通过。

### 无障碍合规

- 全部页面必须通过 `scripts/a11y-audit.mjs`（axe-core WCAG 2.2 AA + BP 零违规）。

---

## 4. 翻译分发

### 翻译来源优先级

1. `translations.json` 中 `tools[slug]` 的人工维护翻译（最高优先）
2. `translations.json` 中 `static[slug]` 的整段翻译
3. 无翻译时回退到英文原文（不阻塞同步）

### 翻译流程

```
1. 贡献者编辑 translations.json（或通过贡献页表单提交 Issue）
2. 人工审核 PR
3. 合并至 astro-site 分支
4. 次日同步自动保留翻译（不覆盖 translations.json）
5. npm run build → 全站 688 页重新生成
```
