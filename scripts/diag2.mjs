import { chromium } from 'playwright';
const b = await chromium.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
for (const w of [320, 375]) {
  const p = await b.newPage({ viewport: { width: w, height: 800 } });
  await p.goto('http://localhost:3000/ai-security-matrix/', { waitUntil: 'networkidle' });
  const d = await p.evaluate(() => {
    const a = document.querySelector('.nav-links a');
    const cs = getComputedStyle(a);
    const links = document.querySelector('.nav-links');
    return {
      fontSize: cs.fontSize,
      pad: cs.paddingLeft,
      linkWs: [...document.querySelectorAll('.nav-links a')].map(x => ({ t: x.textContent.trim(), w: Math.round(x.getBoundingClientRect().width) })),
      linksW: Math.round(links.getBoundingClientRect().width),
      navW: Math.round(document.querySelector('.site-nav').getBoundingClientRect().width),
      actionsW: Math.round(document.querySelector('.nav-actions').getBoundingClientRect().width),
    };
  });
  console.log(`${w}px: font=${d.fontSize} pad=${d.pad}`);
  console.log(`   links容器 ${d.linksW}px | nav ${d.navW}px | actions ${d.actionsW}px`);
  console.log(`   ${d.linkWs.map(l => `${l.t}=${l.w}`).join(' ')}`);
  await p.close();
}
await b.close();
