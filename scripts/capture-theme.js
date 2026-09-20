const { chromium } = require('playwright');

async function capturePages() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  // Test dark theme (default)
  console.log("Capturing DARK theme...");
  await page.goto('http://localhost:3000/ai-security-matrix/zh/flag/privilege/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/tmp/flag-privilege-dark.png' });
  
  // Switch to light theme
  console.log("Switching to LIGHT theme...");
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  });
  await new Promise(res => setTimeout(res, 500));
  await page.screenshot({ path: '/tmp/flag-privilege-light.png' });
  
  // Capture other key pages for comparison
  const urls = [
    ['home-dark', '/ai-security-matrix/'],
    ['term-list-dark', '/ai-security-matrix/category/agent/'],
    ['detail-dark', '/ai-security-matrix/tools/usestrix-strix/'],
  ];
  
  for (const [name, url] of urls) {
    console.log(`Capturing ${name}...`);
    await page.goto(`http://localhost:3000${url}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `/tmp/${name}.png` });
    
    // Then light version
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await new Promise(res => setTimeout(res, 500));
    await page.screenshot({ path: `/tmp/${name}-light.png` });
  }
  
  await browser.close();
  console.log("\n✅ Screenshots saved to /tmp/*.png");
  console.log("Upload these images to the visual model for analysis!");
}

capturePages().catch(console.error);
