import { chromium } from 'playwright';

const BASE = '/ai-security-matrix/';
const SITE = 'http://localhost:3000';

// 页面清单（都带 base 前缀）
const PAGES = [
  ['home',           ''],
  ['about',          'about/'],
  ['guide',          'guide/'],
  ['contribute',     'contribute/'],
  ['commercial',     'commercial/'],
  ['category-agent',   'category/agent/'],
  ['category-scanner', 'category/scanner/'],
  ['category-mcp',     'category/mcp/'],
  ['category-skill',   'category/skill/'],
  ['scope-webapp',   'scope/webapp/'],
  ['scope-api',      'scope/api/'],
  ['flag-privilege',   'flag/privilege/'],
  ['flag-credentials', 'flag/credentials/'],
  ['topic-ai-security', 'topic/ai-security/'],
  ['topic-llm',         'topic/llm/'],
];

const TOOL = 'tools/usestrix-strix/';

async function shot(browser, { path, theme, lang, name }) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  try {
    // 1. 先导航（必须在 evaluate 之前，否则主题设置会被导航重置）
    await page.goto(`${SITE}${BASE}${lang === 'zh' ? 'zh/' : ''}${path}`, { waitUntil: 'networkidle' });
    // 2. 再设置主题
    await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
    await page.waitForTimeout(350);
    await page.screenshot({ path: `/tmp/${name}.png`, fullPage: true });
    console.log(`✓ ${name}`);
  } catch (e) {
    console.error(`✗ ${name}: ${e.message}`);
  } finally {
    await page.close();
  }
}

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });

// EN 页面 × 双主题
for (const [name, path] of PAGES) {
  for (const theme of ['dark', 'light']) {
    await shot(browser, { path, theme, lang: 'en', name: `en-${name}-${theme}` });
  }
}

// ZH 页面 × 双主题
for (const [name, path] of PAGES) {
  for (const theme of ['dark', 'light']) {
    await shot(browser, { path, theme, lang: 'zh', name: `zh-${name}-${theme}` });
  }
}

// 工具详情页 × 双主题 × 双语
for (const lang of ['en', 'zh']) {
  for (const theme of ['dark', 'light']) {
    await shot(browser, { path: TOOL, theme, lang, name: `${lang}-detail-${theme}` });
  }
}

await browser.close();
console.log('\n✅ 全部截图完成');
