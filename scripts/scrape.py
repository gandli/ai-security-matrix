#!/usr/bin/env python3
"""Scrape aisecuritymatrix.com and regenerate repo content.

Stdlib-only so it runs unchanged in GitHub Actions.
Generates: README.md, README.zh.md, tools/<slug>.md + <slug>.zh.md,
about/guide/contribute/commercial (both langs), and tools.json.
"""
from __future__ import annotations

import json, re, time, html as htmllib, urllib.request
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

    return {
        "slug": slug,
        "repo": repo,
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
                "de": "Autonomous / multi-step AI orchestration",
                "dz": "自主运行或多步骤编排的 AI 工具"},
    "scanner": {"en": "Scanners",    "zh": "扫描器",
                "de": "Rule / LLM-assisted detection & evaluation",
                "dz": "基于规则或 LLM 的检测与评估工具"},
    "mcp":     {"en": "MCP Servers", "zh": "MCP 服务器",
                "de": "Model Context Protocol tool servers",
                "dz": "模型上下文协议（MCP）工具服务器"},
    "skill":   {"en": "Skills",      "zh": "技能集",
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
        o = [f"# {t['repo']}", "", f"> {t['description']}", "",
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


def directory_readme(data: list[dict], lang: str, generated_at: str) -> str:
    zh = lang == "zh"
    by_cat = {c: [t for t in data if t["category"] == c] for c in ORDER}
    for c in by_cat:
        by_cat[c].sort(key=lambda x: -stars_num(x["stars"]))
    extras = sorted({t["category"] for t in data} - set(ORDER))
    for c in extras:
        by_cat[c] = sorted([t for t in data if t["category"] == c], key=lambda x: -stars_num(x["stars"]))

    if zh:
        o = [
            "# AI 安全矩阵（AI Security Matrix）",
            "",
            "[![数据来源](https://img.shields.io/badge/数据来源-aisecuritymatrix.com-blue)](https://aisecuritymatrix.com)",
            f"![项目数](https://img.shields.io/badge/收录项目-{len(data)}-informational)",
            f"[![English](https://img.shields.io/badge/lang-English-lightgrey)](README.md)",
            "",
            "> 一份精选的开源 AI 安全测试工具清单，涵盖 LLM 红队平台、智能体化渗透测试系统，以及面向安全的模型上下文协议（MCP）服务器。",
            ">",
            "> 本 README 仅作为目录索引；每个工具的详细信息见 `tools/<slug>.zh.md`。",
            ">",
            f"_最近更新：{generated_at} UTC（由 GitHub Actions 自动同步）_",
            "",
            f"共收录 **{len(data)}** 个开源项目：",
            "",
        ]
        for c in list(ORDER) + extras:
            if not by_cat.get(c):
                continue
            cat_zh = CATS.get(c, {"zh": c, "dz": ""})["zh"]
            cat_dz = CATS.get(c, {"dz": ""})["dz"]
            o.append(f"- [{cat_zh}](#{c}) — {len(by_cat[c])}（{cat_dz}）")
        o += [
            "",
            "## 静态页面",
            "",
            "| 页面 | 说明 |",
            "|---|---|",
            "| [关于 (about.zh.md)](about.zh.md) | 站点背景与收录标准 |",
            "| [使用指南 (guide.zh.md)](guide.zh.md) | 维度、范围与图例说明 |",
            "| [贡献 (contribute.zh.md)](contribute.zh.md) | 提交与贡献指引 |",
            "| [商业方案 (commercial.zh.md)](commercial.zh.md) | 商业化相关信息 |",
            "",
            "## 分类目录",
            "",
        ]
        for c in list(ORDER) + extras:
            if not by_cat.get(c):
                continue
            cat_zh = CATS.get(c, {"zh": c})["zh"]
            cat_dz = CATS.get(c, {"dz": ""})["dz"]
            o += [
                f"### {c} · {cat_zh}",
                "",
                f"_{cat_dz}_ · {len(by_cat[c])} 个" if cat_dz else f"_{len(by_cat[c])} 个",
                "",
            ]
            for t in by_cat[c]:
                proj = f"- [{t['name']}](tools/{t['slug']}.zh.md) — {t['stars'] or '—'}"
                o.append(proj)
            o.append("")
        o += [
            "---",
            "",
            "## 数据文件",
            "",
            "- [`tools.json`](tools.json) — 包含所有 65+ 工具的完整结构化 JSON 数据集",
            "",
            "原始分类目录由 [aisecuritymatrix.com](https://aisecuritymatrix.com) 维护。本仓库为独立的社区镜像。",
        ]
        return "\n".join(o)

    o = [
        "# AI Security Matrix",
        "",
        "[![source](https://img.shields.io/badge/source-aisecuritymatrix.com-blue)](https://aisecuritymatrix.com)",
        f"![projects](https://img.shields.io/badge/projects-{len(data)}-informational)",
        f"[![中文文档](https://img.shields.io/badge/lang-中文-lightgrey)](README.zh.md)",
        "",
        "> A curated directory of open-source AI-enabled security testing tools, LLM red-teaming platforms, agentic pentesting systems, and security-focused Model Context Protocol (MCP) servers.",
        ">",
        "> Full mirror of [aisecuritymatrix.com](https://aisecuritymatrix.com). This README serves as a directory index only; each tool's detail page lives in `tools/<slug>.md`.",
        ">",
        f"_Last updated: {generated_at} UTC (automatically synced via GitHub Actions)_",
        "",
        f"**{len(data)}** open-source projects, grouped by category:",
        "",
    ]
    for c in list(ORDER) + extras:
        if not by_cat.get(c):
            continue
        cat_en = CATS.get(c, {"en": c, "de": ""})["en"]
        cat_de = CATS.get(c, {"de": ""})["de"]
        o.append(f"- [{cat_en}](#{c}) — {len(by_cat[c])} ({cat_de})")
    o += [
        "",
        "## Static Pages",
        "",
        "| Page | Description |",
        "|---|---|",
        "| [About](about.md) | Background and criteria |",
        "| [Guide](guide.md) | Dimensions, scopes, and taxonomy |",
        "| [Contribute](contribute.md) | Submissions instructions |",
        "| [Commercial](commercial.md) | Commercial solutions |",
        "",
        "## Categories",
        "",
    ]
    for c in list(ORDER) + extras:
        if not by_cat.get(c):
            continue
        cat_en = CATS.get(c, {"en": c})["en"]
        cat_de = CATS.get(c, {"de": ""})["de"]
        o += [
            f"### {c} · {cat_en}",
            "",
            f"_{cat_de}_ · {len(by_cat[c])} tools" if cat_de else f"_{len(by_cat[c])} tools",
            "",
        ]
        for t in by_cat[c]:
            proj = f"- [{t['name']}](tools/{t['slug']}.md) — {t['stars'] or '—'}"
            o.append(proj)
        o.append("")
    o += [
        "---",
        "",
        "## Data Files",
        "",
        "- [`tools.json`](tools.json) — Full structured JSON dataset",
        "",
        "Original catalogue maintained at [aisecuritymatrix.com](https://aisecuritymatrix.com). This repository is an independent community mirror.",
    ]
    return "\n".join(o)


def main() -> None:
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
            h = fetch(f"{BASE}/{slug}.html")
            (ROOT / f"{slug}.md").write_text(static_to_md(h, slug), encoding="utf-8")
            (ROOT / f"{slug}.zh.md").write_text(static_to_md(h, slug), encoding="utf-8")
            print(f"  wrote {slug}.md, {slug}.zh.md")
        except Exception as e:
            print(f"  warn: {slug} failed: {e}")

    # 4. Tool pages
    tools_dir = ROOT / "tools"
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
            tool = {
                "slug": slug,
                "repo": repo,
                "name": name,
                "owner": owner,
                "url": base["url"],
                "category": base["category"],
                "stars": base["stars"],
                "freshness": base["freshness"],
                "description": base["description"],
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
            (tools_dir / f"{slug}.md").write_text(tool_md(tool, "en"), encoding="utf-8")
            (tools_dir / f"{slug}.zh.md").write_text(tool_md(tool, "zh"), encoding="utf-8")
        except Exception as e:
            print(f"  warn: failed {u}: {e}")

    # 5. tools.json
    tools.sort(key=lambda x: -stars_num(x["stars"]))
    (ROOT / "tools.json").write_text(json.dumps(tools, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote tools.json ({len(tools)} tools)")

    # 6. READMEs
    (ROOT / "README.md").write_text(directory_readme(tools, "en", now_str), encoding="utf-8")
    (ROOT / "README.zh.md").write_text(directory_readme(tools, "zh", now_str), encoding="utf-8")
    print(f"Wrote README.md and README.zh.md")


if __name__ == "__main__":
    main()
