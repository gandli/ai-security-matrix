import { chromium } from 'playwright';

const b = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });

for (const w of [320, 375, 390]) {
  const p = await b.newPage({ viewport: { width: w, height: 800 } });
  await p.goto('http://localhost:3000/ai-security-matrix/zh/', { waitUntil: 'networkidle' });
  const d = await p.evaluate(() => {
    const nav = document.querySelector('.site-nav');
    const links = document.querySelector('.nav-links');
    const actions = document.querySelector('.nav-actions');
    const rect = (e) => {
      const r = e.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height) };
    };
    return {
      nav: rect(nav),
      links: rect(links),
      actions: rect(actions),
      linkRows: new Set([...links.querySelectorAll('a')].map(a => Math.round(a.getBoundingClientRect().top))).size,
      linkWidths: [...links.querySelectorAll('a')].map(a => Math.round(a.getBoundingClientRect().width)),
      iconLabelDisplay: getComputedStyle(document.querySelector('.icon-btn .icon-label')).display,
    };
  });
  console.log(`${w}px → nav ${d.nav.w}x${d.nav.h} | links ${d.links.w}x${d.links.h} (${d.linkRows} 行) | actions ${d.actions.w}x${d.actions.h} | label=${d.iconLabelDisplay}`);
  console.log(`       链接宽: ${d.linkWidths.join(', ')}`);
  await p.close();
}

await b.close();
