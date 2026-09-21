import { chromium } from 'playwright';
const b = await chromium.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
for (const w of [320, 375, 768, 1280]) {
  const p = await b.newPage({ viewport: { width: w, height: 800 } });
  await p.goto('http://localhost:3000/ai-security-matrix/', { waitUntil: 'networkidle' });
  const h = await p.evaluate(() => {
    const hd = document.querySelector('.site-header');
    const nl = document.querySelector('.nav-links');
    return {
      header: Math.round(hd.getBoundingClientRect().height),
      navRows: new Set([...nl.querySelectorAll('a')].map(a => Math.round(a.getBoundingClientRect().top))).size,
      navH: Math.round(document.querySelector('.site-nav').getBoundingClientRect().height),
    };
  });
  console.log(`${w}px: header ${h.header}px | nav ${h.navH}px (${h.navRows} 行)`);
  await p.close();
}
await b.close();
