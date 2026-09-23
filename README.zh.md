<p align="center">
  <img src="./assets/readme/hero.zh.svg" width="100%" alt="AI Security Matrix">
</p>

<div align="center">

[![数据来源](https://img.shields.io/badge/数据来源-aisecuritymatrix.com-00755a?style=flat-square)](https://aisecuritymatrix.com)
![项目数](https://img.shields.io/badge/收录项目-65-2fe3a0?style=flat-square&labelColor=002523)
![自动同步](https://img.shields.io/badge/每日自动同步-GitHub%20Actions-2c85ff?style=flat-square&labelColor=002523)
[![English](https://img.shields.io/badge/Language-English-9ca6a7?style=flat-square&labelColor=002523)](README.md)
[![DeepWiki](https://img.shields.io/badge/DeepWiki-文档-2c85ff?style=flat-square)](https://deepwiki.com/gandli/ai-security-matrix)
[![Zread](https://img.shields.io/badge/Zread-中文解读-009798?style=flat-square)](https://zread.ai/gandli/ai-security-matrix)

</div>

## 这是什么

一份精选的 **AI 安全测试工具**清单：LLM 红队平台、智能体化渗透框架、安全向 MCP 服务器与技能包。

多数清单只写工具能做什么。这份清单更关心它对你的**机器**做什么：要不要 root、读不读 `~/.aws` 和 `~/.ssh`、会不会在你不知情时安装软件、会不会往不属于它的端点发请求。

仓库每日从 [aisecuritymatrix.com](https://aisecuritymatrix.com) 同步，四个维度逐项标注。

| 入口 | 说明 |
|:---|:---|
| **[在线浏览 →](https://gandli.github.io/ai-security-matrix/)** | 可搜索、排序、按类别与测试范围筛选（暗色/亮色主题） |
| **[分类目录 →](#分类导航)** | 按类别进入，浏览全部 65 个项目的详情页 |
| **[结构化数据 →](tools.json)** | `tools.json` 直接消费，含星级、内置工具与安全检查结果 |

## 运行前风险审计

每个条目都回答同一组问题。当前 65 个项目的统计：

| 风险标记 | 含义 | 项目数 |
|:---|:---|:---:|
| `root` | 要求 root / sudo 权限 | `44` |
| `credentials` | 读取凭证路径（`~/.aws`、`~/.ssh` 等） | `28` |
| `installs` | 在你的主机上安装软件 | `34` |
| `calls out` | 请求项目自身不拥有的端点 | `13` |
| `opaque` | 含无法阅读的长编码数据块 | `6` |
| `binaries` | 分发你未编译的二进制文件 | `4` |

> 这四个标记不是判决书。它们只告诉你 `git clone` 之后会发生什么。

## 界面预览

**中文** — 暗色主题

| 首页 | 标签索引 | 工具详情 |
|:---:|:---:|:---:|
| [![首页](assets/readme/home-zh-dark.png)](https://gandli.github.io/ai-security-matrix/) | ![标签](assets/readme/topic-zh-dark.png) | ![详情](assets/readme/detail-zh-dark.png) |

**English** — dark / light

| Home | Category | Tool detail |
|:---:|:---:|:---:|
| ![Home](assets/readme/home-dark.png) | ![Category](assets/readme/category-dark.png) | ![Detail](assets/readme/detail-dark.png) |
| ![Home light](assets/readme/home-light.png) | ![Category light](assets/readme/category-light.png) | ![Detail light](assets/readme/detail-light.png) |

<sub>截图由 Playwright 自动采集，覆盖中英双语与暗色/亮色双主题。</sub>

<p align="center">
  <img src="./assets/readme/categories.zh.svg" width="100%" alt="Tool categories">
</p>

## 分类导航

| 类别 | 数量 | 定位 | 目录入口 |
|:---|:---:|:---|:---|
| **智能体工具** (`agent`) | `22` | 自主运行或多步骤编排的 AI 工具 | [进入目录 →](tools/agents/) |
| **扫描器** (`scanner`) | `20` | 基于规则或 LLM 的检测与评估工具 | [进入目录 →](tools/scanners/) |
| **MCP 服务器** (`mcp`) | `14` | 模型上下文协议（MCP）工具服务器 | [进入目录 →](tools/mcp-servers/) |
| **技能集** (`skill`) | `9` | 智能体技能包、提示词与剧本 | [进入目录 →](tools/skills/) |

## 结构化数据

- [`tools.json`](tools.json) — 全部 65 个项目的星级、内置工具、许可证与运行前安全检查
- [`translations.json`](translations.json) — 人工维护的双语翻译词条库
- [`scripts/scrape.py`](scripts/scrape.py) — 抓取与生成脚本（本 README 由它生成）

---

<p align="center"><sub>原始数据版权归 <a href="https://aisecuritymatrix.com">aisecuritymatrix.com</a> 所有 · 本仓库为社区自主同步的中英双语镜像</sub></p>
