import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

async function capture(name, url, theme = 'dark') {
  await page.goto(`http://localhost:3000${url}`, { waitUntil: 'networkidle' });
  if (theme === 'light') {
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    await new Promise(res => setTimeout(res, 500));
  } else {
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await new Promise(res => setTimeout(res, 500));
  }
  const path = `/tmp/${name}.png`;
  await page.screenshot({ path, fullPage: true });
  console.log(`✓ ${path}`);
}

console.log("=== Capturing key pages ===");
await capture('home-dark', '/ai-security-matrix/', 'dark');
await capture('home-light', '/ai-security-matrix/', 'light');
await capture('flag-dark', '/ai-security-matrix/zh/flag/privilege/', 'dark');
await capture('flag-light', '/ai-security-matrix/zh/flag/privilege/', 'light');
await capture('category-dark', '/ai-security-matrix/category/agent/', 'dark');
await capture('category-light', '/ai-security-matrix/category/agent/', 'light');
await capture('detail-dark', '/ai-security-matrix/tools/usestrix-strix/', 'dark');
await capture('detail-light', '/ai-security-matrix/tools/usestrix-strix/', 'light');

await browser.close();
console.log("\n✅ All screenshots saved!");
