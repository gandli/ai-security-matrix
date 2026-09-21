import { chromium } from 'playwright';

const baseUrls = [
  '/ai-security-matrix/',                          // Home
  '/ai-security-matrix/about/',                    // About
  '/ai-security-matrix/guide/',                    // Guide
  '/ai-security-matrix/contribute/',               // Contribute
  '/ai-security-matrix/commercial/',               // Commercial
  '/ai-security-matrix/category/agent/',           // Category: agent
  '/ai-security-matrix/category/scanner/',         // Category: scanner
  '/ai-security-matrix/category/mcp/',             // Category: mcp
  '/ai-security-matrix/category/skill/',           // Category: skill
  '/ai-security-matrix/scope/webapp/',             // Scope: webapp
  '/ai-security-matrix/scope/api/',                // Scope: api
  '/ai-security-matrix/flag/privilege/',           // Flag: privilege
  '/ai-security-matrix/flag/credentials/',         // Flag: credentials
  '/ai-security-matrix/topic/ai-security/',        // Topic: ai-security
];

// ZH pages (first half of EN list)
const zhUrls = [
  '/ai-security-matrix/zh/',
  '/ai-security-matrix/zh/category/agent/',
  '/ai-security-matrix/zh/scope/webapp/',
  '/ai-security-matrix/zh/flag/privilege/',
];

async function capturePage(page, url, filename) {
  try {
    await page.goto(`http://localhost:3000${url}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `/tmp/${filename}.png`, fullPage: true });
    console.log(`✓ ${filename}`);
  } catch (e) {
    console.error(`✗ Error capturing ${filename}:`, e.message);
  }
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  
  // Dark theme (default)
  for (const url of baseUrls) {
    const page = await browser.newPage();
    await capturePage(page, url, `dark-${url.replace(/[^a-z0-9]/g, '-')}`);
    await page.close();
  }
  
  // Switch to light theme
  console.log("\nSwitching to LIGHT theme...");
  for (const url of baseUrls.slice(0, 5)) {
    const page = await browser.newPage();
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    await new Promise(res => setTimeout(res, 800));
    await capturePage(page, url, `light-${url.replace(/[^a-z0-9]/g, '-')}`);
    await page.close();
  }
  
  // Light theme key pages
  console.log("Capturing remaining light themes...");
  for (const url of baseUrls.slice(5)) {
    const page = await browser.newPage();
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    await new Promise(res => setTimeout(res, 800));
    await capturePage(page, url, `light-${url.replace(/[^a-z0-9]/g, '-')}`);
    await page.close();
  }
  
  // Chinese pages (both themes)
  for (const url of zhUrls) {
    const darkName = `zh-dark-${url.replace(/[^a-z0-9]/g, '-')}`;
    const lightName = `zh-light-${url.replace(/[^a-z0-9]/g, '-')}`;
    
    let page = await browser.newPage();
    await capturePage(page, url, darkName);
    await page.close();
    
    page = await browser.newPage();
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    await new Promise(res => setTimeout(res, 800));
    await capturePage(page, url, lightName);
    await page.close();
  }
  
  // Detail pages (EN & ZH)
  const toolSlugs = ['usestrix-strix'];
  for (const slug of toolSlugs) {
    const enPages = [
      ['/tools/usestrix-strix/', `en-detail-${slug}-dark`],
      ['/tools/usestrix-strix/', `en-detail-${slug}-light`],
      ['/zh/tools/usestrix-strix/', `zh-detail-${slug}-dark`],
      ['/zh/tools/usestrix-strix/', `zh-detail-${slug}-light`],
    ];
    
    for (const [path, name] of enPages) {
      let page = await browser.newPage();
      const theme = name.includes('light') ? 'light' : 'dark';
      
      if (theme === 'light') {
        await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
        await new Promise(res => setTimeout(res, 800));
      }
      
      await capturePage(page, path, name);
      await page.close();
    }
  }
  
  await browser.close();
  console.log("\n✅ All screenshots completed!");
  console.log(`📁 Check /tmp/*.png files and upload them to the visual model for analysis!`);
}

run().catch(console.error);
