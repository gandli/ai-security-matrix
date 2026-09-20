const { chromium } = require('playwright');
const fs = require('fs');

async function auditColors() {
  const browser = await chromium.launch({ headless: true });
  
  // Test key pages
  const urls = [
    '/ai-security-matrix/',
    '/ai-security-matrix/tools/usestrix-strix/',
    '/ai-security-matrix/zh/tools/usestrix-strix/',
    '/ai-security-matrix/category/agent/',
    '/ai-security-matrix/scope/webapp/',
    '/ai-security-matrix/flag/privilege/',
  ];

  console.log("=== Visual Audit Report ===\n");
  
  for (const url of urls) {
    const page = await browser.newPage();
    await page.goto(`http://localhost:3000${url}`);
    
    // Get computed styles of key elements
    const results = await page.evaluate(() => {
      const checks = [];
      
      // Check title/headline contrast
      document.querySelectorAll('.term-headline, h1, h2').forEach(el => {
        const style = getComputedStyle(el);
        const bgColor = style.backgroundColor;
        if (bgColor.includes('#') || bgColor.includes('rgb')) {
          checks.push({
            type: 'heading',
            element: el.tagName.toLowerCase(),
            foreground: style.color,
            background: bgColor,
            text: el.textContent.trim().slice(0, 50),
          });
        }
      });
      
      // Check pill badges
      document.querySelectorAll('.pill').forEach(el => {
        const style = getComputedStyle(el);
        checks.push({
          type: 'pill',
          pillClass: el.className.split(' ').find(c => c.startsWith('pill-')),
          foreground: style.color,
          background: style.backgroundColor,
        });
      });
      
      // Check term-list cards
      document.querySelectorAll('.tool-card-link a').forEach(el => {
        const style = getComputedStyle(el);
        checks.push({
          type: 'card',
          repo: el.querySelector('.repo-name')?.textContent || 'N/A',
          foreground: style.color,
          background: style.backgroundColor,
        });
      });
      
      return checks;
    });
    
    console.log(`\n📄 Page: ${url}`);
    console.log("-".repeat(70));
    
    if (results.length === 0) {
      console.log("  No color-checked elements found");
    } else {
      for (const r of results.slice(0, 8)) { // Limit to first 8 items per page
        console.log(`  • ${r.type}: ${JSON.stringify(r, null, 2)}`);
      }
    }
    
    await page.close();
    await new Promise(res => setTimeout(res, 500));
  }
  
  await browser.close();
}

auditColors().catch(console.error);
