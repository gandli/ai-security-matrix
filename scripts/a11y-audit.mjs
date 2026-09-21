import { chromium } from 'playwright';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');

const PAGES = [
  ['home',           ''],
  ['tool-detail',    'tools/usestrix-strix/'],
  ['category',       'category/agent/'],
  ['scope',          'scope/webapp/'],
  ['flag',           'flag/privilege/'],
  ['topic',          'topic/agents/'],
  ['about',          'about/'],
  ['guide',          'guide/'],
  ['commercial',     'commercial/'],
  ['zh-commercial',  'zh/commercial/'],
  ['zh-guide',       'zh/guide/'],
  ['contribute',     'contribute/'],
  ['zh-contribute',  'zh/contribute/'],
  ['zh-home',        'zh/'],
  ['zh-tool-detail', 'zh/tools/usestrix-strix/'],
];

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
const all = new Map();

for (const theme of ['dark', 'light']) {
  for (const [name, path] of PAGES) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(`http://localhost:3000/ai-security-matrix/${path}`, { waitUntil: 'networkidle' });
    await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
    await page.waitForTimeout(300);
    await page.addScriptTag({ path: axePath });
    const res = await page.evaluate(async () => {
      return await window.axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice'] },
      });
    });
    for (const v of res.violations) {
      const key = `${v.id}|${v.impact}`;
      if (!all.has(key)) all.set(key, { id: v.id, impact: v.impact, help: v.help, nodes: [], pages: new Set() });
      const e = all.get(key);
      e.pages.add(`${theme}/${name}`);
      if (e.nodes.length < 3) {
        for (const n of v.nodes.slice(0, 3)) {
          e.nodes.push({ target: n.target.join(' '), summary: (n.failureSummary || '').split('\n').slice(0,3).join(' | ') });
        }
      }
    }
    await page.close();
  }
}

await browser.close();

console.log('='.repeat(74));
console.log('  无障碍审计 (axe-core 4.13, WCAG 2.2 AA + best-practice)');
console.log('='.repeat(74));

if (all.size === 0) {
  console.log('\n✅ 零违规');
} else {
  const order = { critical: 0, serious: 1, moderate: 2, minor: 3 };
  const sorted = [...all.values()].sort((a,b) => order[a.impact] - order[b.impact]);
  for (const v of sorted) {
    console.log(`\n[${v.impact.toUpperCase()}] ${v.id}`);
    console.log(`  ${v.help}`);
    console.log(`  影响页面 (${v.pages.size}): ${[...v.pages].slice(0,4).join(', ')}`);
    for (const n of v.nodes.slice(0,2)) {
      console.log(`  → ${n.target}`);
      if (n.summary) console.log(`    ${n.summary.slice(0,150)}`);
    }
  }
  console.log(`\n共 ${all.size} 类违规`);
}
