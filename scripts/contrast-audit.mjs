import { chromium } from 'playwright';

// WCAG contrast
function lum([r, g, b]) {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v/12.92 : ((v+0.055)/1.055)**2.4; };
  return 0.2126*f(r) + 0.7152*f(g) + 0.0722*f(b);
}
function contrast(fg, bg) {
  const l1 = lum(fg), l2 = lum(bg);
  const hi = Math.max(l1,l2), lo = Math.min(l1,l2);
  return (hi + 0.05) / (lo + 0.05);
}
function parseRGB(s) {
  const m = s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  return m ? [+m[1], +m[2], +m[3]] : null;
}

const pages = [
  ['home',            '/ai-security-matrix/'],
  ['tool-detail',     '/ai-security-matrix/tools/usestrix-strix/'],
  ['category-agent',  '/ai-security-matrix/category/agent/'],
  ['flag-privilege',  '/ai-security-matrix/flag/privilege/'],
  ['topic-agents',    '/ai-security-matrix/topic/agents/'],
  ['zh-flag',         '/ai-security-matrix/zh/flag/privilege/'],
];

const browser = await chromium.launch({ headless: true });

for (const theme of ['dark', 'light']) {
  console.log(`\n${'='.repeat(72)}`);
  console.log(`  ${theme.toUpperCase()} THEME`);
  console.log('='.repeat(72));

  for (const [name, url] of pages) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(`http://localhost:3000${url}`, { waitUntil: 'networkidle' });
    await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
    await page.waitForTimeout(400);

    const findings = await page.evaluate(() => {
      const out = [];
      const els = document.querySelectorAll('p, span, a, td, th, h1, h2, h3, li, div, code, figcaption, em');
      for (const el of els) {
        // Only leaf-ish elements with direct text
        const direct = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1);
        if (!direct) continue;
        const text = el.textContent.trim();
        if (text.length < 2 || text.length > 200) continue;

        const st = getComputedStyle(el);
        if (st.display === 'none' || st.visibility === 'hidden' || +st.opacity === 0) continue;
        const fg = st.color;

        // Walk up to find first non-transparent background
        let bg = null, node = el;
        while (node) {
          const b = getComputedStyle(node).backgroundColor;
          const rgba = b.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);
          if (rgba && (rgba[4] === undefined || +rgba[4] > 0.5)) { bg = b; break; }
          node = node.parentElement;
        }
        if (!bg) bg = 'rgb(255,255,255)';

        out.push({
          text: text.slice(0, 40),
          tag: el.tagName.toLowerCase(),
          cls: (el.className || '').toString().split(' ').filter(c => c && !c.startsWith('data-')).slice(0,2).join('.'),
          fg, bg,
          size: parseFloat(st.fontSize),
          weight: st.fontWeight,
        });
      }
      return out;
    });

    const fails = [];
    for (const f of findings) {
      const fgRGB = parseRGB(f.fg), bgRGB = parseRGB(f.bg);
      if (!fgRGB || !bgRGB) continue;
      const ratio = contrast(fgRGB, bgRGB);
      // Large text: >=24px, or >=18.66px && bold
      const isLarge = f.size >= 24 || (f.size >= 18.66 && +f.weight >= 700);
      const threshold = isLarge ? 3.0 : 4.5;
      if (ratio < threshold) {
        fails.push({ ...f, ratio, threshold });
      }
    }

    if (fails.length) {
      console.log(`\n  ⚠️  ${name} (${url}) — ${fails.length} failures`);
      const seen = new Set();
      for (const f of fails.slice(0, 5)) {
        const key = `${f.fg}|${f.bg}|${f.size}`;
        if (seen.has(key)) continue;
        seen.add(key);
        console.log(`      "${f.text}" <${f.tag}${f.cls ? '.' + f.cls : ''}>`);
        console.log(`        ${f.fg} on ${f.bg} = ${f.ratio.toFixed(2)}:1 (need ${f.threshold}:1, size ${f.size}px)`);
      }
    } else {
      console.log(`  ✅ ${name} — all text passes`);
    }
    await page.close();
  }
}

await browser.close();
console.log('\n' + '='.repeat(72));
