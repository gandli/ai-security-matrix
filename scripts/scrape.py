#!/usr/bin/env python3
"""Scrape aisecuritymatrix.com and regenerate repo content.

Stdlib-only so it runs unchanged in GitHub Actions.
Generates: README.md, README.zh.md, per-category directories
  tools/agents/ tools/scanners/ tools/mcp-servers/ tools/skills/
each with <slug>.md <slug>.zh.md and a README/README.zh index.
Also about/guide/contribute/commercial (both langs) and tools.json.
"""
from __future__ import annotations

import json, re, time, shutil, html as htmllib, urllib.request
from pathlib import Path
from datetime import datetime, timezone

BASE = "https://aisecuritymatrix.com"
ROOT = Path(__file__).resolve().parent.parent
UA = ("Mozilla/5.0 (compatible; ai-security-matrix-sync/1.0; "
      "+https://github.com/gandli/ai-security-matrix)")


def fetch(url: str, retries: int = 3) -> str:
    last = None
    for i in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read().decode("utf-8", "replace")
        except Exception as e:
            last = e
            time.sleep(2 * (i + 1))
    raise RuntimeError(f"fetch failed {url}: {last}")


def strip(s: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s or "")).replace("\xa0", " ").strip()


def html_to_text(fragment: str) -> list[str]:
    frag = re.sub(r"<(script|style)\b.*?</\1>", "", fragment, flags=re.S | re.I)
    frag = re.sub(r"<[^>]+>", "\n", frag)
    frag = htmllib.unescape(frag)
    return [l.strip() for l in frag.split("\n") if l.strip()]


def pill(block: str, cls: str) -> list[str]:
    return [p.strip() for p in re.findall(rf"bg-{cls}-pill[^>]*>\s*([^<]+?)\s*</span>", block)]


def stars_num(s: str) -> float:
    m = re.match(r"^([\d.]+)\s*([kmKM])?$", (s or "").strip())
    if not m:
        return 0.0
    n = float(m.group(1))
    u = (m.group(2) or "").lower()
    return n * (1000 if u == "k" else 1_000_000 if u == "m" else 1)


def parse_index(idx_html: str) -> dict[str, dict]:
    out = {}
    for repo, block in re.findall(r'<tr[^>]*data-repo="([^"]+)"[^>]*>(.*?)</tr>', idx_html, re.S):
        cat = re.search(r"text-cat-(\w+)", block)
        href = re.search(r'href="(https://github\.com/[^"]+)"', block)
        desc = re.search(r"line-clamp[^>]*>(.*?)</div>", block, re.S)
        stars_td = re.search(r"text-right[^>]*>(.*?)</td>", block, re.S)
        first_td = re.search(r"<td[^>]*>(.*?)</td>", block, re.S)
        raw_first = first_td.group(1) if first_td else ""
        raw_first = re.sub(r"&#\d+;|&[a-z]+;", "", raw_first).strip()
        sm = re.search(r"([\d.]+\s*[kKmM]?)", strip(stars_td.group(1))) if stars_td else None
        out[repo] = {
            "repo": repo,
            "category": cat.group(1) if cat else "",
            "url": href.group(1) if href else f"https://github.com/{repo}",
            "description": strip(desc.group(1)) if desc else "",
            "stars": sm.group(1).replace(" ", "") if sm else "",
            "freshness": strip(raw_first) if raw_first else "",
            "scopes": pill(block, "scope"),
            "access": pill(block, "access"),
            "host": pill(block, "host"),
            "unseen": pill(block, "unseen"),
        }
    return out


CHECK_KEYS = {
    "ships compiled binaries": "ships_compiled_binaries",
    "asks for root or sudo": "asks_root",
    "reads credential paths": "reads_credentials",
    "installs software on host": "installs_on_host",
    "calls an endpoint": "calls_external_endpoint",
    "contains long encoded blobs": "encoded_blobs",
}


def parse_detail(html: str, slug: str) -> dict:
    main = re.search(r"<main\b.*?</main>", html, re.S)
    lines = html_to_text(main.group(0) if main else html)

    def after(key: str) -> str:
        for i, l in enumerate(lines):
            if l.lower() == key.lower():
                return lines[i + 1] if i + 1 < len(lines) else ""
        return ""

    repo = ""
    h1 = re.search(r"<h1\b[^>]*>(.*?)</h1>", html, re.S)
    if h1:
        repo = strip(h1.group(1))
    if "/" not in repo:
        m = re.search(r'data-repo="([^"]+)"', html)
        repo = m.group(1) if m else slug

    size = ""
    if "Size" in lines:
        i = lines.index("Size")
        size = " ".join(lines[i + 1:i + 4]).replace("&middot;", "·").strip()

    checklist: dict[str, str] = {}
    if "Before running it" in lines:
        i = lines.index("Before running it")
        j = i + 1
        while j < len(lines) - 1:
            low = lines[j].lower()
            for pref, k in CHECK_KEYS.items():
                if low.startswith(pref):
                    checklist[k] = lines[j + 1]
            j += 1

    bundled = [x.strip() for x in after("Bundled tools").split(",") if x.strip()]
    shares = after("Shares files with")

    meta = re.search(r'<meta name="description" content="([^"]+)"', html)
    description = htmllib.unescape(meta.group(1)).strip() if meta else ""

    return {
        "slug": slug,
        "repo": repo,
        "description": description,
        "licence": after("Licence"),
        "maintainers": after("Maintainers"),
        "size": size,
        "bundled_tools": [] if bundled in ([], ["none found"]) else bundled,
        "shares_files_with": "" if shares == "no overlap found" else shares,
        "checklist": checklist,
    }


def static_to_md(html: str, slug: str) -> str:
    main = re.search(r"<main\b.*?</main>", html, re.S)
    body = main.group(0) if main else html
    h1 = re.search(r"<h1\b[^>]*>(.*?)</h1>", html, re.S)
    lines = [f"# {strip(h1.group(1))}" if h1 else f"# {slug.title()}", ""]
    for m in re.finditer(r"<(h2|h3|blockquote|p|ul|ol)\b[^>]*>(.*?)</\1>", body, re.S | re.I):
        tag = m.group(1).lower()
        inner = m.group(2)
        if tag in ("h2", "h3"):
            lines.append(f"{'#' * int(tag[1])} {strip(inner)}")
        elif tag == "blockquote":
            lines.append(f"> {strip(inner)}")
        elif tag in ("ul", "ol"):
            for li in re.findall(r"<li\b[^>]*>(.*?)</li>", inner, re.S):
                t = strip(li)
                if t:
                    lines.append(f"- {t}")
        else:
            t = strip(inner)
            if t:
                lines.append(t)
        lines.append("")
    out = "\n".join(lines)
    out = re.sub(r"\n{3,}", "\n\n", out).strip()
    href = f"{BASE}/" if slug == "index" else f"{BASE}/{slug}.html"
    return f"{out}\n\n---\n\n_Source: <{href}>_\n"


CATS = {
    "agent":   {"en": "Agents",      "zh": "智能体工具",
                "dir": "agents",
                "de": "Autonomous / multi-step AI orchestration",
                "dz": "自主运行或多步骤编排的 AI 工具"},
    "scanner": {"en": "Scanners",    "zh": "扫描器",
                "dir": "scanners",
                "de": "Rule / LLM-assisted detection & evaluation",
                "dz": "基于规则或 LLM 的检测与评估工具"},
    "mcp":     {"en": "MCP Servers", "zh": "MCP 服务器",
                "dir": "mcp-servers",
                "de": "Model Context Protocol tool servers",
                "dz": "模型上下文协议（MCP）工具服务器"},
    "skill":   {"en": "Skills",      "zh": "技能集",
                "dir": "skills",
                "de": "Agent skill bundles, prompts & playbooks",
                "dz": "智能体技能包、提示词与剧本"},
}
ORDER = ["agent", "scanner", "mcp", "skill"]
SCOPE_ZH = {
    "webapp": "浏览器应用", "api": "HTTP/RPC 接口", "code": "源代码", "llm": "大模型本身",
    "agentic": "智能体及其循环", "network": "主机/端口/流量", "recon": "信息收集",
    "binary": "二进制/固件", "ad": "Active Directory 域", "entra": "Entra ID 云身份",
    "cloud": "云账号", "modfile": "序列化模型文件", "redteam": "攻击模拟",
    "social": "社会工程", "logging": "测试记录/证据", "container": "容器/镜像",
    "mobile": "iOS/Android 应用",
}


def badges_en(t: dict) -> str:
    parts = ([f"`{s}`" for s in t["scopes"]]
             + [f"*{a}*" for a in t["access"]]
             + [f"_{h}_" for h in t["host"]]
             + [f"~{u}~" for u in t["unseen"]])
    return " ".join(parts) if parts else "—"


def badges_zh(t: dict) -> str:
    parts = ([f"`{s}`（{SCOPE_ZH.get(s, '')}）" for s in t["scopes"]]
             + [f"*{a}*" for a in t["access"]])
    return " / ".join(parts) if parts else "—"


def tool_md(t: dict, lang: str) -> str:
    if lang == "zh":
        desc = t.get("description_zh") or t.get("description") or ""
        o = [f"# {t['repo']}", "", f"> {desc}", "",
             "| | |", "|---|---|",
             f"| **类别** | `{t['category']}` |",
             f"| **Stars** | {t['stars'] or '—'} |",
             f"| **最近更新** | {t['freshness'] or '—'} |",
             f"| **许可证** | {t['licence'] or '—'} |",
             f"| **维护者** | {t['maintainers'] or '—'} |",
             f"| **规模** | {t['size'] or '—'} |",
             f"| **源码** | <{t['url']}> |",
             f"| **作用范围/特征** | {badges_zh(t)} |",
             ""]
        if t["bundled_tools"]:
            o += ["## 内置工具", "", ", ".join(f"`{x}`" for x in t["bundled_tools"]), ""]
        if t["shares_files_with"]:
            o += ["## 与以下项目共享文件", "", t["shares_files_with"], ""]
        if t["checklist"]:
            c = t["checklist"]
            o += ["## 运行前须知", "", "| 检查项 | 结果 |", "|---|---|",
                  f"| 是否包含未自行构建的预编译二进制 | **{c.get('ships_compiled_binaries','—')}** |",
                  f"| 是否要求 root / sudo | **{c.get('asks_root','—')}** |",
                  f"| 是否读取 `~/.aws`、`~/.ssh` 等凭据路径 | **{c.get('reads_credentials','—')}** |",
                  f"| 是否在主机上安装软件 | **{c.get('installs_on_host','—')}** |",
                  f"| 是否调用项目不拥有的外部端点 | **{c.get('calls_external_endpoint','—')}** |",
                  f"| 是否包含无法阅读的超长编码数据 | **{c.get('encoded_blobs','—')}** |", ""]
        o += ["---", "",
              f"_提取自 [aisecuritymatrix.com]({BASE}) · "
              f"[原始页面]({BASE}/tools/{t['slug']}.html)_"]
        return "\n".join(o)

    o = [f"# {t['repo']}", "", f"> {t['description']}", "",
         "| | |", "|---|---|",
         f"| **Category** | `{t['category']}` |",
         f"| **Stars** | {t['stars'] or '—'} |",
         f"| **Last updated** | {t['freshness'] or '—'} |",
         f"| **Licence** | {t['licence'] or '—'} |",
         f"| **Maintainers** | {t['maintainers'] or '—'} |",
         f"| **Size** | {t['size'] or '—'} |",
         f"| **Source** | <{t['url']}> |",
         f"| **Scopes & traits** | {badges_en(t)} |",
         ""]
    if t["bundled_tools"]:
        o += ["## Bundled tools", "", ", ".join(f"`{x}`" for x in t["bundled_tools"]), ""]
    if t["shares_files_with"]:
        o += ["## Shares files with", "", t["shares_files_with"], ""]
    if t["checklist"]:
        c = t["checklist"]
        o += ["## Before running it", "", "| Check | Answer |", "|---|---|",
              f"| Ships compiled binaries you did not build | **{c.get('ships_compiled_binaries','—')}** |",
              f"| Asks for root or sudo | **{c.get('asks_root','—')}** |",
              f"| Reads credential paths such as ~/.aws or ~/.ssh | **{c.get('reads_credentials','—')}** |",
              f"| Installs software on host | **{c.get('installs_on_host','—')}** |",
              f"| Calls an endpoint the project does not own | **{c.get('calls_external_endpoint','—')}** |",
              f"| Contains long encoded blobs you cannot read | **{c.get('encoded_blobs','—')}** |", ""]
    o += ["---", "",
          f"_Extracted from [aisecuritymatrix.com]({BASE}) · "
          f"[original page]({BASE}/tools/{t['slug']}.html)_"]
    return "\n".join(o)


def _accent(c):
    return {"agent": "#2c85ff", "scanner": "#8f8b00", "mcp": "#009798", "skill": "#ff10a3"}.get(c, "#58A6FF")


def _hero_svg(data, lang):
    zh = lang == "zh"
    counts = {c: sum(1 for t in data if t["category"] == c) for c in ORDER}
    total = len(data)
    top_colors = [_accent(c) for c in ORDER]
    labels = [CATS[c]["zh"] if zh else CATS[c]["en"] for c in ORDER]
    top_bar = "\n".join(
        '<rect x="%d" y="0" width="264" height="5" fill="%s"/>' % (48 + i * 312, color)
        for i, color in enumerate(top_colors))
    metrics = "\n".join(
        '<text x="%d" y="96" fill="#ebf7f7" font-size="52" font-weight="600" text-anchor="middle" class="mono">%d</text>\n'
        '<text x="%d" y="128" fill="#8A929C" font-size="16" text-anchor="middle">%s</text>'
        % (48 + i * 312 + 132, counts[c], 48 + i * 312 + 132, labels[i])
        for i, c in enumerate(ORDER))
    sub = ("open-source AI security testing tools - mirrored daily from aisecuritymatrix.com" if zh
           else "Open-source AI security testing tools - mirrored daily from aisecuritymatrix.com")
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="160" viewBox="0 0 1200 160"\n'
        '     role="img" aria-labelledby="title desc">\n'
        '  <title id="title">AI Security Matrix</title>\n'
        '  <desc id="desc">A curated directory of %d open-source AI-enabled security testing tools, mirrored daily.</desc>\n'
        '  <defs>\n'
        '    <style>text { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans","PingFang SC","Microsoft YaHei",sans-serif; } .mono { font-family: ui-monospace,SFMono-Regular,Menlo,monospace; }</style>\n'
        '  </defs>\n'
        '  <rect width="1200" height="160" rx="16" fill="#001615"/>\n'
        '  %s\n'
        '  <text x="80" y="56" fill="#ebf7f7" font-size="44" font-weight="700" letter-spacing="-0.5">AI Security Matrix</text>\n'
        '  <text x="80" y="88" fill="#8A929C" font-size="15" class="mono">%s</text>\n'
        '  %s\n'
        '</svg>\n' % (total, top_bar, sub, metrics)
    )


def _categories_svg(data, lang):
    zh = lang == "zh"
    cards = []
    for i, c in enumerate(ORDER):
        cnt = sum(1 for t in data if t["category"] == c)
        cat = CATS.get(c, {"en": c, "zh": c, "dz": "", "de": ""})
        label = cat["zh"] if zh else cat["en"]
        desc = cat.get("dz", cat.get("de", ""))
        color = _accent(c)
        y = 40 + i * 38
        x_off = 24 + len(label) * 9
        cards.append(
            '<g transform="translate(48,%d)">\n'
            '  <rect width="1104" height="28" rx="6" fill="#002523" stroke="%s" stroke-width="1"/>\n'
            '  <rect x="0" y="5" width="4" height="18" rx="2" fill="%s"/>\n'
            '  <text x="24" y="20" fill="#ebf7f7" font-size="15" font-weight="600">%s</text>\n'
            '  <text x="%d" y="20" fill="#7c8787" font-size="13">%s</text>\n'
            '  <text x="1020" y="20" fill="%s" font-size="15" font-weight="600" text-anchor="end" class="mono">%d</text>\n'
            '</g>' % (y, color + "40", color, label, x_off, desc, color, cnt)
        )
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="192" viewBox="0 0 1200 192"\n'
        '     role="img" aria-labelledby="title desc">\n'
        '  <title id="title">AI Security Matrix - Categories</title>\n'
        '  <desc id="desc">Four categories of AI security tools with live counts.</desc>\n'
        '  <defs>\n'
        '    <style>text { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans","PingFang SC","Microsoft YaHei",sans-serif; } .mono { font-family: ui-monospace,SFMono-Regular,Menlo,monospace; }</style>\n'
        '  </defs>\n'
        '  <rect width="1200" height="192" rx="16" fill="#001615"/>\n'
        '  <text x="80" y="28" fill="#8A929C" font-size="12" font-weight="600" letter-spacing="0.08em">CATEGORIES</text>\n'
        '  %s\n'
        '</svg>\n' % "\n".join(cards)
    )


def flag_stats(data):
    """Count how many tools carry each pre-run risk flag."""
    counts = {"root": 0, "credentials": 0, "installs": 0, "binaries": 0,
              "calls out": 0, "opaque": 0}
    for t in data:
        for field in ("access", "host", "unseen"):
            for v in t.get(field, []):
                if v in counts:
                    counts[v] += 1
    return counts


def directory_readme(data, lang):
    """Build the repository README: pitch -> proof -> screenshots -> index -> data."""

    zh = lang == "zh"
    sfx = ".zh" if zh else ""
    by_cat = {c: [t for t in data if t["category"] == c] for c in ORDER}
    for c in by_cat:
        by_cat[c].sort(key=lambda x: -stars_num(x["stars"]))
    extras = sorted({t["category"] for t in data} - set(ORDER))
    for c in extras:
        by_cat[c] = sorted([t for t in data if t["category"] == c], key=lambda x: -stars_num(x["stars"]))
    ordered = [c for c in list(ORDER) + extras if by_cat.get(c)]

    n = len(data)
    fs = flag_stats(data)
    hero = '<p align="center">\n  <img src="./assets/readme/hero%s.svg" width="100%%" alt="AI Security Matrix">\n</p>' % sfx
    cats_img = '<p align="center">\n  <img src="./assets/readme/categories%s.svg" width="100%%" alt="Tool categories">\n</p>' % sfx

    site = "https://gandli.github.io/ai-security-matrix/"

    if zh:
        o = [
            hero, "",
            '<div align="center">', "",
            "[![数据来源](https://img.shields.io/badge/数据来源-aisecuritymatrix.com-00755a?style=flat-square)](https://aisecuritymatrix.com)",
            "![项目数](https://img.shields.io/badge/收录项目-%d-2fe3a0?style=flat-square&labelColor=002523)" % n,
            "![自动同步](https://img.shields.io/badge/每日自动同步-GitHub%20Actions-2c85ff?style=flat-square&labelColor=002523)",
            "[![English](https://img.shields.io/badge/Language-English-9ca6a7?style=flat-square&labelColor=002523)](README.md)",
            "[![DeepWiki](https://img.shields.io/badge/DeepWiki-文档-2c85ff?style=flat-square)](https://deepwiki.com/gandli/ai-security-matrix)",
            "[![Zread](https://img.shields.io/badge/Zread-中文解读-009798?style=flat-square)](https://zread.ai/gandli/ai-security-matrix)",
            "", "</div>", "",
            "## 这是什么",
            "",
            "一份精选的 **AI 赋能安全测试工具**清单（[aisecuritymatrix.com](https://aisecuritymatrix.com) 的镜像）：LLM 红队平台、智能体化渗透框架、面向安全的 MCP 服务器与技能包。",
            "",
            "大多数清单只写工具能做什么。这份清单更关心它对你的**机器**做什么：要不要 root、读不读 `~/.aws` 和 `~/.ssh`、会不会在你不知情时安装软件、会不会往不属于它的端点发请求。",
            "",
            "仓库每日从 [aisecuritymatrix.com](https://aisecuritymatrix.com) 同步，四个维度逐项标注。",
            "",
            "| 入口 | 说明 |",
            "|:---|:---|",
            "| **[在线浏览 →](%s)** | 可搜索、排序、按类别与测试范围筛选（暗色/亮色主题） |" % site,
            "| **[分类目录 →](#分类导航)** | 按类别进入，浏览全部 %d 个项目的详情页 |" % n,
            "| **[结构化数据 →](tools.json)** | `tools.json` 直接消费，含星级、内置工具与安全检查结果 |",
            "",
            "## 运行前风险审计",
            "",
            "每个条目都回答同一组问题。当前 %d 个项目的统计：" % n,
            "",
            "| 风险标记 | 含义 | 项目数 |",
            "|:---|:---|:---:|",
            "| `root` | 要求 root / sudo 权限 | `%d` |" % fs["root"],
            "| `credentials` | 读取凭证路径（`~/.aws`、`~/.ssh` 等） | `%d` |" % fs["credentials"],
            "| `installs` | 在你的主机上安装软件 | `%d` |" % fs["installs"],
            "| `calls out` | 请求项目自身不拥有的端点 | `%d` |" % fs["calls out"],
            "| `opaque` | 含无法阅读的长编码数据块 | `%d` |" % fs["opaque"],
            "| `binaries` | 分发你未编译的二进制文件 | `%d` |" % fs["binaries"],
            "",
            "> 这些标记不是安全判决，而是让你在 `git clone` 之前就知道该准备什么。",
            "",
            "## 界面预览",
            "",
            "**中文** — 暗色主题",
            "",
            "| 首页 | 标签索引 | 工具详情 |",
            "|:---:|:---:|:---:|",
            "| [![首页](assets/readme/home-zh-dark.png)](%s) | ![标签](assets/readme/topic-zh-dark.png) | ![详情](assets/readme/detail-zh-dark.png) |" % site,
            "",
            "**English** — dark / light",
            "",
            "| Home | Category | Tool detail |",
            "|:---:|:---:|:---:|",
            "| ![Home](assets/readme/home-dark.png) | ![Category](assets/readme/category-dark.png) | ![Detail](assets/readme/detail-dark.png) |",
            "| ![Home light](assets/readme/home-light.png) | ![Category light](assets/readme/category-light.png) | ![Detail light](assets/readme/detail-light.png) |",
            "",
            "<sub>截图由 Playwright 自动采集，覆盖中英双语与暗色/亮色双主题。</sub>",
            "",
            cats_img, "",
            "## 分类导航", "",
            "| 类别 | 数量 | 定位 | 目录入口 |", "|:---|:---:|:---|:---|",
        ]
        for c in ordered:
            cat = CATS.get(c, {"zh": c, "dz": "", "dir": c})
            o.append("| **%s** (`%s`) | `%d` | %s | [进入目录 →](tools/%s/) |"
                     % (cat["zh"], c, len(by_cat[c]), cat["dz"], cat["dir"]))
        o += [
            "",
            "## 结构化数据", "",
            "- [`tools.json`](tools.json) — 全部 %d 个项目的星级、内置工具、许可证与运行前安全检查" % n,
            "- [`translations.json`](translations.json) — 人工维护的双语翻译词条库",
            "- [`scripts/scrape.py`](scripts/scrape.py) — 抓取与生成脚本（本 README 由它生成）",
            "", "---", "",
            '<p align="center"><sub>原始数据版权归 <a href="https://aisecuritymatrix.com">aisecuritymatrix.com</a> 所有 · 本仓库为社区自主同步的中英双语镜像</sub></p>',
        ]
        return "\n".join(o)

    o = [
        hero, "",
        '<div align="center">', "",
        "[![source](https://img.shields.io/badge/source-aisecuritymatrix.com-00755a?style=flat-square)](https://aisecuritymatrix.com)",
        "![tools](https://img.shields.io/badge/tools-%d-2fe3a0?style=flat-square&labelColor=002523)" % n,
        "![auto-sync](https://img.shields.io/badge/daily%20sync-GitHub%20Actions-2c85ff?style=flat-square&labelColor=002523)",
        "[![中文文档](https://img.shields.io/badge/Language-中文-9ca6a7?style=flat-square&labelColor=002523)](README.zh.md)",
        "[![DeepWiki](https://img.shields.io/badge/DeepWiki-docs-2c85ff?style=flat-square)](https://deepwiki.com/gandli/ai-security-matrix)",
        "[![Zread](https://img.shields.io/badge/Zread-walkthrough-009798?style=flat-square)](https://zread.ai/gandli/ai-security-matrix)",
        "", "</div>", "",
        "## What this is",
        "",
        "A curated list of **AI-enabled security testing tools** (mirror of [aisecuritymatrix.com](https://aisecuritymatrix.com)) — LLM red-teaming platforms, agentic pentest frameworks, security-focused MCP servers, and skill packs.",
        "",
        "Most lists tell you what a tool does. This one tells you what it does to *your machine* \u2014 whether it asks for root, reads `~/.aws` or `~/.ssh`, installs software, or calls endpoints it does not own.",
        "",
        "The repository syncs daily from [aisecuritymatrix.com](https://aisecuritymatrix.com) and flags each project on all four counts.",
        "",
        "| Entry point | What you get |",
        "|:---|:---|",
        "| **[Browse online →](%s)** | Search, sort, and filter by category and testing scope (dark / light theme) |" % site,
        "| **[Category index →](#categories)** | Enter by category and read detail pages for all %d tools |" % n,
        "| **[Structured data →](tools.json)** | Consume `tools.json` directly — stars, bundled tools, and safety checks |",
        "",
        "## Pre-run risk audit",
        "",
        "Every entry answers the same set of questions. Across all %d tools:" % n,
        "",
        "| Flag | Meaning | Tools |",
        "|:---|:---|:---:|",
        "| `root` | Asks for root / sudo | `%d` |" % fs["root"],
        "| `credentials` | Reads credential paths (`~/.aws`, `~/.ssh`, …) | `%d` |" % fs["credentials"],
        "| `installs` | Installs software on your host | `%d` |" % fs["installs"],
        "| `calls out` | Calls endpoints the project does not own | `%d` |" % fs["calls out"],
        "| `opaque` | Contains long unreadable encoded blobs | `%d` |" % fs["opaque"],
        "| `binaries` | Ships compiled binaries you did not build | `%d` |" % fs["binaries"],
        "",
        "> These flags are not a verdict. They tell you what to expect before you `git clone`.",
        "",
        "## Screenshots",
        "",
        "**English** — dark / light",
        "",
        "| Home | Category | Tool detail |",
        "|:---:|:---:|:---:|",
        "| [![Home](assets/readme/home-dark.png)](%s) | ![Category](assets/readme/category-dark.png) | ![Detail](assets/readme/detail-dark.png) |" % site,
        "| ![Home light](assets/readme/home-light.png) | ![Category light](assets/readme/category-light.png) | ![Detail light](assets/readme/detail-light.png) |",
        "",
        "**中文** — 暗色主题",
        "",
        "| 首页 | 标签索引 | 工具详情 |",
        "|:---:|:---:|:---:|",
        "| ![首页](assets/readme/home-zh-dark.png) | ![标签](assets/readme/topic-zh-dark.png) | ![详情](assets/readme/detail-zh-dark.png) |",
        "",
        "**风险标记索引**",
        "",
        "| Flag index (dark) | Topic index (dark) |",
        "|:---:|:---:|",
        "| ![Flag](assets/readme/flag-dark.png) | ![Topic](assets/readme/topic-dark.png) |",
        "",
        "<sub>Captured with Playwright across both languages and both themes.</sub>",
        "",
        cats_img, "",
        "## Categories", "",
        "| Category | Count | Purpose | Directory |", "|:---|:---:|:---|:---|",
    ]
    for c in ordered:
        cat = CATS.get(c, {"en": c, "de": "", "dir": c})
        o.append("| **%s** (`%s`) | `%d` | %s | [Browse →](tools/%s/) |"
                 % (cat["en"], c, len(by_cat[c]), cat["de"], cat["dir"]))
    o += [
        "", "## Data files", "",
        "- [`tools.json`](tools.json) — all %d tools with stars, bundled tools, licence, and pre-run safety checks" % n,
        "- [`translations.json`](translations.json) — curated bilingual translation dictionary",
        "- [`scripts/scrape.py`](scripts/scrape.py) — the scraper that generates this README",
        "", "---", "",
        '<p align="center"><sub>Original catalogue maintained at <a href="https://aisecuritymatrix.com">aisecuritymatrix.com</a> · Independent community mirror</sub></p>',
    ]
    return "\n".join(o)


def main() -> None:
    # Load curated Chinese translations
    trans_path = ROOT / "translations.json"
    translations = {}
    if trans_path.exists():
        try:
            translations = json.loads(trans_path.read_text(encoding="utf-8"))
        except Exception:
            translations = {}
    tools_zh = translations.get("tools", {})
    static_zh = translations.get("static", {})

    now_str = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M")
    print(f"[{now_str}] Scraping {BASE}...")

    # 1. Sitemap for tool URLs
    sitemap = fetch(f"{BASE}/sitemap.xml")
    tool_urls = re.findall(r"<loc>(https://aisecuritymatrix\.com/tools/[^<]+)</loc>", sitemap)
    print(f"Found {len(tool_urls)} tool URLs in sitemap")

    # 2. Index page
    idx_html = fetch(f"{BASE}/index.html")
    idx_data = parse_index(idx_html)
    print(f"Parsed {len(idx_data)} canonical tool rows from index.html")

    # 3. Static pages
    for slug in ("about", "guide", "contribute", "commercial"):
        try:
            if slug in static_zh:
                (ROOT / f"{slug}.zh.md").write_text(static_zh[slug], encoding="utf-8")
            else:
                h = fetch(f"{BASE}/{slug}.html")
                (ROOT / f"{slug}.zh.md").write_text(static_to_md(h, slug), encoding="utf-8")
            h = fetch(f"{BASE}/{slug}.html")
            (ROOT / f"{slug}.md").write_text(static_to_md(h, slug), encoding="utf-8")
            print(f"  wrote {slug}.md, {slug}.zh.md")
        except Exception as e:
            print(f"  warn: {slug} failed: {e}")

    # 4. Tool pages (one dir per category)
    tools_dir = ROOT / "tools"
    if tools_dir.exists():
        shutil.rmtree(tools_dir)  # start clean so renamed/removed tools don't linger
    tools_dir.mkdir(exist_ok=True)
    tools = []
    for u in tool_urls:
        slug = u.rsplit("/", 1)[-1].replace(".html", "")
        try:
            h = fetch(u)
            detail = parse_detail(h, slug)
            repo = detail["repo"]
            base = idx_data.get(repo, {
                "repo": repo, "category": "", "url": f"https://github.com/{repo}",
                "description": "", "stars": "", "freshness": "",
                "scopes": [], "access": [], "host": [], "unseen": [],
            })
            owner, name = repo.split("/", 1) if "/" in repo else ("", repo)
            cat = base["category"] or "other"
            cat_dir = CATS.get(cat, {"dir": "other"})["dir"]
            tool = {
                "slug": slug,
                "repo": repo,
                "name": name,
                "owner": owner,
                "url": base["url"],
                "category": cat,
                "stars": base["stars"],
                "freshness": base["freshness"],
                "description": detail["description"] or base["description"],
                "description_zh": tools_zh.get(slug, ""),
                "licence": detail["licence"],
                "maintainers": detail["maintainers"],
                "size": detail["size"],
                "bundled_tools": detail["bundled_tools"],
                "shares_files_with": detail["shares_files_with"],
                "checklist": detail["checklist"],
                "scopes": base["scopes"],
                "access": base["access"],
                "host": base["host"],
                "unseen": base["unseen"],
            }
            tools.append(tool)
            out_dir = ROOT / "tools" / cat_dir
            out_dir.mkdir(parents=True, exist_ok=True)
            (out_dir / f"{slug}.md").write_text(tool_md(tool, "en"), encoding="utf-8")
            (out_dir / f"{slug}.zh.md").write_text(tool_md(tool, "zh"), encoding="utf-8")
        except Exception as e:
            print(f"  warn: failed {u}: {e}")

    # 5. tools.json
    tools.sort(key=lambda x: -stars_num(x["stars"]))
    (ROOT / "tools.json").write_text(json.dumps(tools, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote tools.json ({len(tools)} tools)")

    # 5b. Per-category index READMEs
    for c, meta in CATS.items():
        items = sorted([t for t in tools if t["category"] == c], key=lambda x: -stars_num(x["stars"]))
        if not items:
            continue
        d = ROOT / "tools" / meta["dir"]
        d.mkdir(parents=True, exist_ok=True)
        en = [f"# {meta['en']}", "", f"_{meta['de']} · {len(items)} tools_", ""]
        zh = [f"# {meta['zh']}", "", f"_{meta['dz']} · {len(items)} 个_", ""]
        for t in items:
            en.append(f"- [{t['name']}]({t['slug']}.md) — {t['stars'] or '—'} · {t['description']}")
            zh.append(f"- [{t['name']}]({t['slug']}.zh.md) — {t['stars'] or '—'} · {t.get('description_zh') or t['description']}")
        (d / "README.md").write_text("\n".join(en) + "\n", encoding="utf-8")
        (d / "README.zh.md").write_text("\n".join(zh) + "\n", encoding="utf-8")
    print("Wrote per-category index READMEs")
    # 5c. Data-driven SVGs (counts stay fresh)
    assets_dir = ROOT / "assets" / "readme"
    assets_dir.mkdir(parents=True, exist_ok=True)
    for lang in ("en", "zh"):
        s = ".zh" if lang == "zh" else ""
        (assets_dir / f"hero{s}.svg").write_text(_hero_svg(tools, lang), encoding="utf-8")
        (assets_dir / f"categories{s}.svg").write_text(_categories_svg(tools, lang), encoding="utf-8")
    print("Wrote data-driven SVGs (hero & categories, EN/ZH)")

    # 6. READMEs
    (ROOT / "README.md").write_text(directory_readme(tools, "en"), encoding="utf-8")
    (ROOT / "README.zh.md").write_text(directory_readme(tools, "zh"), encoding="utf-8")
    print(f"Wrote README.md and README.zh.md")


if __name__ == "__main__":
    main()
