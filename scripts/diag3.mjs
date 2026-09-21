import { chromium } from 'playwright';
const b = await chromium.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
const p = await b.newPage({ viewport: { width: 320, height: 800 } });
await p.goto('http://localhost:3000/ai-security-matrix/', { waitUntil: 'networkidle' });
const d = await p.evaluate(() => {
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.site-nav');
  const links = document.querySelector('.nav-links');
  const actions = document.querySelector('.nav-actions');
  const r = (e) => { const x = e.getBoundingClientRect(); return { x: Math.round(x.left), w: Math.round(x.width), h: Math.round(x.height), top: Math.round(x.top) }; };
  return {
    header: r(header),
    headerPadding: getComputedStyle(header).padding,
    nav: r(nav),
    navFlexDir: getComputedStyle(nav).flexDirection,
    navWrap: getComputedStyle(nav).flexWrap,
    links: r(links),
    linksFlex: getComputedStyle(links).flex,
    linksMinW: getComputedStyle(links).minWidth,
    actions: r(actions),
    actionsFlexShrink: getComputedStyle(actions).flexShrink,
    linkTops: [...links.querySelectorAll('a')].map(a => Math.round(a.getBoundingClientRect().top)),
  };
});
console.log(JSON.stringify(d, null, 1));
await b.close();
