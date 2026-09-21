import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
for (const w of [320, 375, 390, 414]) {
  const page = await browser.newPage({ viewport: { width: w, height: 800 } });
  await page.goto('http://localhost:3000/ai-security-matrix/zh/', { waitUntil: 'networkidle' });
  const m = await page.evaluate(() => {
    const h = document.querySelector('.site-header');
    const hero = document.querySelector('.hero');
    const nav = document.querySelector('.site-nav');
    const hr = h.getBoundingClientRect();
    const nr = nav.getBoundingClientRect();
    const er = hero ? hero.getBoundingClientRect() : null;
    // 逐个子元素高度
    const parts = [...h.querySelectorAll(':scope > *')].map(e => {
      const r = e.getBoundingClientRect();
      return { tag: e.tagName.toLowerCase() + (e.className ? '.' + String(e.className).split(' ')[0] : ''), h: Math.round(r.height), y: Math.round(r.top) };
    });
    return {
      headerH: Math.round(hr.height),
      headerBottom: Math.round(hr.bottom),
      navH: Math.round(nr.height),
      heroTop: er ? Math.round(er.top) : null,
      viewportH: window.innerHeight,
      parts,
      navLinks: [...document.querySelectorAll('.nav-links a')].map(a => ({ t: a.textContent.trim(), w: Math.round(a.getBoundingClientRect().width), h: Math.round(a.getBoundingClientRect().height) })),
    };
  });
  console.log(`\n── ${w}px (视口高 ${m.viewportH}) ──`);
  console.log(`  header 高: ${m.headerH}px  (占视口 ${(m.headerH/m.viewportH*100).toFixed(0)}%)`);
  console.log(`  header 底部: ${m.headerBottom}px  |  hero 顶部: ${m.heroTop}px`);
  console.log(`  nav 高: ${m.navH}px`);
  console.log(`  子元素:`);
  for (const p of m.parts) console.log(`    ${p.tag.padEnd(22)} 高 ${String(p.h).padStart(3)}px  top ${p.y}`);
  console.log(`  导航链接: ${m.navLinks.map(l => `${l.t}(${l.w}×${l.h})`).join(' ')}`);
  await page.close();
}
await browser.close();
