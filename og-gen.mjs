import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync } from "fs";

const data = JSON.parse(readFileSync("src/data/site.json", "utf8"));
const total = data.length;
const cats = [...new Set(data.map(d => d.entry.category))].filter(Boolean);
const scopes = new Set(data.flatMap(d => d.entry.scope || []));

const catColors = {
  agent: "#2c85ff",
  scanner: "#8f8b00",
  mcp: "#009798",
  skill: "#ff10a3",
};

const fontSans = "IBM Plex Sans, Arial, sans-serif";
const fontMono = "IBM Plex Mono, Arial, sans-serif";

function svgOg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#00201e"/>
      <stop offset="1" stop-color="#001615"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Left color bar -->
  <rect x="0" y="0" width="8" height="630" fill="${catColors.agent}"/>

  <!-- Matrix dots pattern -->
  <g fill="#1c4f4c" opacity="0.65">
    ${[0,1,2].map(row => [0,1,2,3,4].map(col => {
      const x = 1080 + col * 24;
      const y = 60 + row * 24;
      return `<rect x="${x}" y="${y}" width="12" height="12" rx="2"/>`;
    }).join("")).join("")}
  </g>

  <!-- Title -->
  <text x="80" y="210" font-family="${fontSans}" font-size="68" font-weight="700" fill="#ebf7f7" letter-spacing="-1">AI Security</text>
  <text x="80" y="290" font-family="${fontSans}" font-size="68" font-weight="700" fill="#ff9e37" letter-spacing="-1">Matrix</text>

  <!-- Subtitle -->
  <text x="80" y="360" font-family="${fontSans}" font-size="28" fill="#9ca6a7">
    <tspan>A curated, flagged, and continuously checked directory</tspan>
  </text>
  <text x="80" y="400" font-family="${fontSans}" font-size="28" fill="#9ca6a7">
    <tspan>of AI-enabled security testing tools.</tspan>
  </text>

  <!-- Stats bar -->
  <g transform="translate(80,480)">
    <rect x="0" y="0" width="220" height="54" rx="6" fill="#002523" stroke="#123a38"/>
    <text x="12" y="24" font-family="${fontMono}" font-size="12" fill="#7c8787" letter-spacing="0.5">TOOL ENTRIES</text>
    <text x="12" y="44" font-family="${fontSans}" font-size="22" font-weight="700" fill="#2fe3a0">${total} tools</text>

    <rect x="240" y="0" width="220" height="54" rx="6" fill="#002523" stroke="#123a38"/>
    <text x="252" y="24" font-family="${fontMono}" font-size="12" fill="#7c8787" letter-spacing="0.5">CATEGORIES</text>
    <text x="252" y="44" font-family="${fontSans}" font-size="22" font-weight="700" fill="${catColors.agent}">${cats.length} (agent/scanner/mcp/skill)</text>

    <rect x="480" y="0" width="220" height="54" rx="6" fill="#002523" stroke="#123a38"/>
    <text x="492" y="24" font-family="${fontMono}" font-size="12" fill="#7c8787" letter-spacing="0.5">TESTING SCOPES</text>
    <text x="492" y="44" font-family="${fontSans}" font-size="22" font-weight="700" fill="${catColors.scanner}">${scopes.size} (webapp/llm/ad/network…)</text>

    <rect x="720" y="0" width="220" height="54" rx="6" fill="#002523" stroke="#123a38"/>
    <text x="732" y="24" font-family="${fontMono}" font-size="12" fill="#7c8787" letter-spacing="0.5">FRESHNESS</text>
    <text x="732" y="44" font-family="${fontSans}" font-size="22" font-weight="700" fill="${catColors.skill}">daily check</text>
  </g>

  <!-- Footer -->
  <text x="80" y="580" font-family="${fontMono}" font-size="13" fill="#5f6d72">github.com/gandli/ai-security-matrix</text>
</svg>`;
}

const svg = svgOg();
writeFileSync("public/og-image.svg", svg);
console.log("✓ public/og-image.svg");

// Rasterize to PNG with sharp
const buf = Buffer.from(svg);
try {
  await sharp(buf, { density: 144 }).png().toFile("public/og-image.png");
  console.log("✓ public/og-image.png");
} catch (e) {
  console.error("PNG gen failed:", e.message);
}

// Also make a zh version
const svgZh = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#00201e"/>
      <stop offset="1" stop-color="#001615"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="8" height="630" fill="${catColors.agent}"/>
  <text x="80" y="220" font-family="${fontSans}" font-size="72" font-weight="700" fill="#ebf7f7" letter-spacing="-1">AI 安全矩阵</text>
  <text x="80" y="300" font-family="${fontSans}" font-size="30" fill="#9ca6a7">AI 赋能安全测试工具目录</text>
  <text x="80" y="345" font-family="${fontSans}" font-size="28" fill="#5f6d72">${total} 款工具 · ${cats.length} 个类别 · ${scopes.size} 个测试范围 · 每日核验</text>
  <g transform="translate(80,480)">
    <rect x="0" y="0" width="220" height="54" rx="6" fill="#002523" stroke="#123a38"/>
    <text x="12" y="44" font-family="${fontSans}" font-size="22" font-weight="700" fill="#2fe3a0">${total} 款工具</text>
    <rect x="240" y="0" width="220" height="54" rx="6" fill="#002523" stroke="#123a38"/>
    <text x="252" y="44" font-family="${fontSans}" font-size="22" font-weight="700" fill="${catColors.agent}">${cats.length} 个类别</text>
    <rect x="480" y="0" width="220" height="54" rx="6" fill="#002523" stroke="#123a38"/>
    <text x="492" y="44" font-family="${fontSans}" font-size="22" font-weight="700" fill="${catColors.scanner}">${scopes.size} 个测试范围</text>
    <rect x="720" y="0" width="220" height="54" rx="6" fill="#002523" stroke="#123a38"/>
    <text x="732" y="44" font-family="${fontSans}" font-size="22" font-weight="700" fill="${catColors.skill}">每日更新</text>
  </g>
  <text x="80" y="580" font-family="${fontMono}" font-size="13" fill="#5f6d72">gandli.github.io/ai-security-matrix/zh/</text>
</svg>`;

writeFileSync("public/og-image.zh.svg", svgZh);
console.log("✓ public/og-image.zh.svg");
try {
  await sharp(Buffer.from(svgZh), { density: 144 }).png().toFile("public/og-image.zh.png");
  console.log("✓ public/og-image.zh.png");
} catch (e) {
  console.error("PNG gen failed:", e.message);
}
