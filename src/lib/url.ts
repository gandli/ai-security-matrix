/**
 * Base-aware URL builder.
 *
 * The site deploys to a GitHub Pages *project* page
 * (`/ai-security-matrix/`), so every internal link and asset path must carry
 * Astro's `base`. Astro rewrites the paths it processes, but not string
 * literals we write by hand — route them through here instead.
 *
 * BASE_URL always ends with a slash (`/ai-security-matrix/` or `/`).
 */
const BASE = import.meta.env.BASE_URL;

export type Lang = "en" | "zh";

export function url(path = "", lang: Lang = "en"): string {
  const clean = path.replace(/^\/+/, "");
  const langPrefix = lang === "zh" ? "zh/" : "";
  return `${BASE}${langPrefix}${clean}`;
}

/** Root of the site for a given language, e.g. `/ai-security-matrix/zh/`. */
export function home(lang: Lang = "en"): string {
  return url("", lang);
}

/** Public asset path (favicon, og images) — never language-prefixed. */
export function asset(path: string): string {
  return `${BASE}${path.replace(/^\/+/, "")}`;
}
