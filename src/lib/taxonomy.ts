/**
 * src/lib/taxonomy.ts — shared bilingual labels for the taxonomy index pages
 * (category / scope / flag). Keeps MatrixApp, detail pages and index pages
 * saying the same words.
 */

export const CAT_ZH: Record<string, string> = {
  agent: "智能体",
  scanner: "扫描器",
  mcp: "MCP",
  skill: "技能",
};

export const SCOPE_ZH: Record<string, string> = {
  webapp: "Web 应用",
  api: "API",
  code: "代码",
  llm: "大模型",
  agent: "智能体",
  agentic: "智能体",
  network: "网络",
  ad: "广告",
  cloud: "云",
  entra: "Entra",
  binary: "二进制",
  logging: "日志",
  modfile: "模型文件",
  recon: "侦察",
  redteam: "红队",
  social: "社工",
};

export const FLAG_ZH: Record<string, string> = {
  binaries: "分发二进制",
  installs: "安装软件",
  install: "安装软件",
  root: "root 权限",
  privilege: "提权",
  credentials: "读取凭证",
  "calls out": "外部调用",
  "calls-out": "外部调用",
  phones_home: "回连上报",
  opaque: "不透明代码块",
};

/** Visual family per flag key (matches MatrixApp pill colors). */
export const FLAG_FAMILY: Record<string, string> = {
  binaries: "host",
  install: "host",
  installs: "host",
  root: "access",
  privilege: "access",
  credentials: "access",
  "calls out": "unseen",
  "calls-out": "unseen",
  phones_home: "unseen",
  opaque: "unseen",
};

export const slugKey = (k: string) => k.replace(/\s+/g, "-").toLowerCase();
export const keyFromSlug = (s: string) => s.replace(/-/g, " ");
