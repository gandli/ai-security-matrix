# Registry — AI Security Matrix

---

## 1. Data Scraping (`scripts/scrape.py`)

Runs daily via GitHub Actions (`sync-aisecuritymatrix.yml`):

### Pipeline

1. **Sitemap parsing**: Extract all tool page URLs from `aisecuritymatrix.com/sitemap.xml`.
2. **Index page parsing**: Fetch homepage HTML to extract category, scope, stars, and risk flags per tool.
3. **Detail page parsing**: Scrape each tool page for description, licence, maintainers, bundled tools, and safety checklist.
4. **Translation injection**: Inject Chinese descriptions from `translations.json` (fallback to English if missing).
5. **Structured output**: Write `tools.json` (sorted complete dataset).
6. **Static page mirror**: Generate `tools/agents/*.md`, `tools/agents/*.zh.md`, etc. by category directory.
7. **README generation**: Call `directory_readme()` to generate `README.md` and `README.zh.md`.
8. **Git commit**: `git add -A && git commit` (only if changed).

### Safety gate

```yaml
# Guard against a broken scrape
NEW=$(echo ${{ steps.scrape.outputs.after }})
OLD=${{ steps.scrape.outputs.before }}
# CI rejects merge if tool count drops by more than 30%
```

---

## 2. Data Schema

### `tools.json` (top-level fields)

| Field | Type | Description |
|:---|:---|:---|
| `slug` | string | Tool identifier (URL segment) |
| `repo` | string | GitHub repo path (`owner/name`) |
| `category` | string | Category: `agent` / `scanner` / `mcp` / `skill` |
| `stars` | string | Formatted star count (e.g. `63k`) |
| `freshness` | string | Last push (e.g. `today`, `7d`, `1.2y`) |
| `description` | string | English description |
| `description_zh` | string | Chinese description (from translations.json) |
| `licence` | string | Licence identifier |
| `bundled_tools` | string[] | Bundled third-party tool list |
| `checklist` | object | Six safety check results (yes / no) |
| `scopes` | string[] | Testing scopes (e.g. `webapp`, `api`, `network`) |
| `access` | string[] | Access risk flags (`root`, `credentials`) |
| `host` | string[] | Host risk flags (`installs`, `binaries`) |
| `unseen` | string[] | Unseen risk flags (`calls out`, `opaque`) |

### `translations.json`

| Key | Purpose |
|:---|:---|
| `_comment` | Documentation note |
| `tools` | `{slug: Chinese description}` mapping, 65 entries |
| `static` | Full static page translations (`about`, `guide`, `contribute`, `commercial`) |

---

## 3. Validation Rules

### Data integrity

- Total tool count must not drop below 30 (guards against upstream site restructuring).
- Every tool must have a `repo` and `category` field.
- `checklist` must contain all six checks (may be `not checked`).

### Contrast compliance

- All foreground/background pairs must pass `scripts/contrast-audit.mjs` (WCAG AA ≥ 4.5:1).
- After any token change, rerun the audit and confirm both themes pass.

### Accessibility compliance

- All pages must pass `scripts/a11y-audit.mjs` (axe-core WCAG 2.2 AA + BP zero violations).

---

## 4. Translation Distribution

### Translation source priority

1. Curated translation from `translations.json` → `tools[slug]` (highest priority)
2. Static page translation from `translations.json` → `static[slug]`
3. Fallback to English original if no translation exists (never blocks sync)

### Translation workflow

```
1. Contributor edits translations.json (or submits via contribute form → GitHub Issue)
2. Manual review of pull request
3. Merged into astro-site branch
4. Daily sync preserves the translation (does not overwrite translations.json)
5. npm run build → all 688 pages regenerated
```
