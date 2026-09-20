#!/usr/bin/env node
/**
 * scripts/gen-tool-og.mjs
 * 
 * Generate per-tool OG images (1200×630) for all 65 tools × 2 languages.
 * Output: public/og/{slug}.png + public/og/{slug}-zh.png
 * 
 * Style matches site design: near-black teal bg + category accent bar.
 * Content: tool title, short description snippet, category pill, footer.
 */
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dataPath = join(root, "src/data/site.json");
const outDir = join(root, "public/og");

if (!existsSync(dataPath)) {
  console.error("❌ site.json missing — run npm run scrape first");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const data = JSON.parse(readFileSync(dataPath, "utf8"));

const fontSans = "IBM Plex Sans, Arial, sans-serif";
const fontMono = "IBM Plex Mono, monospace";

const catColors = {
  agent: "#2c85ff",
  scanner: "#8f8b00", 
  mcp: "#009798",
  skill: "#ff10a3",
};

/** Escape XML special chars for SVG text */
function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Wrap long description into 3 lines at ~60 chars per line */
function wrapDesc(desc, maxChars = 60, maxLines = 3) {
  const words = desc.split(/\s+/);
  const lines = [];
  let current = "";
  for (const w of words) {
    if ((current + " " + w).trim().length > maxChars) {
      lines.push(current.trim());
      current = w;
    } else {
      current = current ? current + " " + w : w;
    }
  }
  if (current.trim()) lines.push(current.trim());
  if (lines.length > maxLines) {
    const last = lines[maxLines - 1];
    lines[maxLines - 1] = last.substring(0, maxChars - 3) + "…";
    lines.length = maxLines;
  }
  return lines;
}

function genToolOgEN({ owner, name, category, desc, stars, added }) {
  const catColor = catColors[category] || "#8f8b00";
  const descLines = wrapDesc(desc || "", 70, 2);
  const descY = descLines.length > 0 ? 350 : 320;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#00201e"/>
      <stop offset="1" stop-color="#001615"/>
    </linearGradient>
  </defs>
  
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="8" height="630" fill="${catColor}"/>
  
  <!-- Matrix dot pattern -->
  <g fill="#1c4f4c" opacity="0.65" transform="translate(1020,80)">
    ${Array.from({length:5}, (_,c) => Array.from({length:4}, (_,r) => 
      `<rect x="${c*20}" y="${r*20}" width="10" height="10" rx="1.5"/>`
    ).join("")).join("")}
  </g>
  
  <!-- Brand -->
  <text x="80" y="140" font-family="${fontSans}" font-size="20" fill="#a3b8b7">AI Security Matrix</text>
  
  <!-- Title -->
  <text x="80" y="240" font-family="${fontSans}" font-size="56" font-weight="700" fill="#ebf7f7">${esc(owner)}<tspan fill="${catColor}">/</tspan><tspan fill="#ebf7f7">${esc(name)}</tspan></text>
  
  <!-- Category pill -->
  <g transform="translate(80,290)">
    <rect width="120" height="44" rx="22" fill="${catColor}" opacity="0.2"/>
    <text x="60" y="28" font-family="${fontSans}" font-size="18" font-weight="600" fill="${catColor}" text-anchor="middle">${category}</text>
  </g>
  
  <!-- Stars badge -->
  <g transform="translate(220,290)">
    <rect width="80" height="44" rx="22" fill="#002523" stroke="#123a38"/>
    <text x="40" y="28" font-family="${fontSans}" font-size="16" fill="#ff9e37">★ ${stars >= 1000 ? (stars/1000).toFixed(1)+"k" : stars}</text>
  </g>
  
  <!-- Description lines -->
  ${descLines.map((line, i) => 
    `<text x="80" y="${descY + i*36}" font-family="${fontSans}" font-size="22" fill="#8da4a3">${esc(line)}</text>`
  ).join("\n  ")}
  
  <!-- Footer -->
  <text x="80" y="540" font-family="${fontMono}" font-size="14" fill="#5f6d72">Added ${added} · Verified daily · github.com/${owner}/${name}</text>
</svg>`;
}

function genToolOgZH({ owner, name, category, descZh, stars, added }) {
  const catColor = catColors[category] || "#8f8b00";
  const descLines = wrapDesc(descZh || "", 40, 2);
  const descY = descLines.length > 0 ? 350 : 320;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#00201e"/>
      <stop offset="1" stop-color="#001615"/>
    </linearGradient>
  </defs>
  
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="8" height="630" fill="${catColor}"/>
  
  <text x="80" y="140" font-family="${fontSans}" font-size="20" fill="#a3b8b7">AI 安全矩阵</text>
  
  <text x="80" y="240" font-family="${fontSans}" font-size="52" font-weight="700" fill="#ebf7f7">${esc(owner)}<tspan fill="${catColor}">/</tspan><tspan fill="#ebf7f7">${esc(name)}</tspan></text>
  
  <g transform="translate(80,290)">
    <rect width="120" height="44" rx="22" fill="${catColor}" opacity="0.2"/>
    <text x="60" y="28" font-family="${fontSans}" font-size="18" font-weight="600" fill="${catColor}" text-anchor="middle">${category}</text>
  </g>
  
  <g transform="translate(220,290)">
    <rect width="80" height="44" rx="22" fill="#002523" stroke="#123a38"/>
    <text x="40" y="28" font-family="${fontSans}" font-size="16" fill="#ff9e37">★ ${stars >= 1000 ? (stars/1000).toFixed(1)+"k" : stars}</text>
  </g>
  
  ${descLines.map((line, i) => 
    `<text x="80" y="${descY + i*32}" font-family="${fontSans}" font-size="20" fill="#8da4a3">${esc(line)}</text>`
  ).join("\n  ")}
  
  <text x="80" y="540" font-family="${fontMono}" font-size="14" fill="#5f6d72">收录 ${added} · 每日核验 · gandli.github.io/ai-security-matrix/zh/</text>
</svg>`;
}

async function generate() {
  const promises = [];
  for (const item of data) {
    const [owner, name] = item.entry.repo.split("/");
    const slug = item.entry.repo.replace("/", "-");
    const stars = item.derived?.identity?.stars ?? 0;
    const added = item.entry.added || "—";
    const descEn = item.derived?.identity?.description || "";
    const descZh = item.entry.description_zh || descEn;
    const category = item.entry.category || "scanner";

    // English version
    const svgEn = genToolOgEN({ owner, name, category, desc: descEn, stars, added });
    const bufEn = Buffer.from(svgEn);
    promises.push(
      sharp(bufEn, { density: 144 }).png().toFile(join(outDir, `${slug}.png`))
        .then(() => console.log(`✓ ${slug}.png (EN)`))
        .catch(e => console.error(`✗ ${slug}.png`, e.message))
    );

    // Chinese version
    const svgZh = genToolOgZH({ owner, name, category, descZh, stars, added });
    const bufZh = Buffer.from(svgZh);
    promises.push(
      sharp(bufZh, { density: 144 }).png().toFile(join(outDir, `${slug}-zh.png`))
        .then(() => console.log(`✓ ${slug}-zh.png (ZH)`))
        .catch(e => console.error(`✗ ${slug}-zh.png`, e.message))
    );
  }

  await Promise.all(promises);
  console.log(`\n✅ Generated ${data.length * 2} OG images (${data.length} tools × 2 langs)`);
}

await generate();
