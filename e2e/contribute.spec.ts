import { test, expect } from '@playwright/test';

const BASE = '/ai-security-matrix';

test.describe('Contribute page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/contribute/`);
  });

  test('has three submission tabs', async ({ page }) => {
    const tabs = page.locator('.ftab');
    await expect(tabs).toHaveCount(3);
    await expect(tabs.first()).toBeVisible();
  });

  test('only one panel visible at a time', async ({ page }) => {
    // translation panel is default
    await expect(page.locator('#panel-translation')).toBeVisible();
    await expect(page.locator('#panel-new-tool')).toBeHidden();
    await expect(page.locator('#panel-data')).toBeHidden();

    // click new-tool tab
    await page.click('#tab-new-tool');
    await expect(page.locator('#panel-new-tool')).toBeVisible();
    await expect(page.locator('#panel-translation')).toBeHidden();

    // click data tab
    await page.click('#tab-data');
    await expect(page.locator('#panel-data')).toBeVisible();
    await expect(page.locator('#panel-new-tool')).toBeHidden();
  });

  test('translation form: select a tool and submit', async ({ page }) => {
    // The form must generate a pre-filled GitHub issue URL
    await page.evaluate(() => {
      window.__issueUrl = '';
      window.open = (url: string) => { window.__issueUrl = url; return null; };
    });

    // Select a tool from the dropdown
    await page.selectOption('#panel-translation select[name="slug"]', 'usestrix-strix');
    await page.fill('#panel-translation textarea[name="zh"]', '修正后的中文描述');
    await page.fill('#panel-translation input[name="reason"]', 'typo fix');

    await page.click('#panel-translation .submit-btn');

    const url = await page.evaluate(() => window.__issueUrl);
    expect(url).toContain('github.com/gandli/ai-security-matrix/issues/new');
    expect(url).toContain('title=');
    expect(url).toContain('body=');
    expect(decodeURIComponent(url)).toContain('usestrix-strix');
    expect(decodeURIComponent(url)).toContain('修正后的中文描述');
  });

  test('new tool form: repo URL + category + scopes', async ({ page }) => {
    await page.click('#tab-new-tool');
    await page.waitForTimeout(200);

    await page.evaluate(() => {
      window.__issueUrl = '';
      window.open = (url: string) => { window.__issueUrl = url; return null; };
    });

    await page.fill('#panel-new-tool input[name="repo"]', 'https://github.com/test/repo');
    await page.selectOption('#panel-new-tool select[name="category"]', 'agent');
    await page.check('#panel-new-tool input[value="webapp"]');
    await page.check('#panel-new-tool input[value="network"]');

    await page.click('#panel-new-tool .submit-btn');

    const url = await page.evaluate(() => window.__issueUrl);
    expect(url).toContain('issues/new');
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain('test/repo');
    expect(decoded).toContain('agent');
    expect(decoded).toContain('webapp');
    expect(decoded).toContain('network');
  });

  test('data form: select a tool, choose what is wrong, fill expected', async ({ page }) => {
    await page.click('#tab-data');
    await page.waitForTimeout(200);

    await page.evaluate(() => {
      window.__issueUrl = '';
      window.open = (url: string) => { window.__issueUrl = url; return null; };
    });

    await page.selectOption('#panel-data select[name="slug"]', 'usestrix-strix');
    await page.selectOption('#panel-data select[name="field"]', 'flags');
    await page.fill('#panel-data textarea[name="expected"]', 'it should be flagged credentials');

    await page.click('#panel-data .submit-btn');

    const url = await page.evaluate(() => window.__issueUrl);
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain('usestrix-strix');
    expect(decoded).toContain('flags');
    expect(decoded).toContain('credentials');
  });

  test('tool select has 65+ options', async ({ page }) => {
    const count = await page.$eval('#panel-translation select[name="slug"]', (s) => s.options.length);
    expect(count).toBeGreaterThanOrEqual(65); // 65 tools + placeholder
  });

  test('visible form controls are >= 44px tall', async ({ page }) => {
    const heights = await page.$$eval('#panel-translation.is-active input, #panel-translation.is-active select, #panel-translation.is-active textarea', (els) => els.map((e) => e.getBoundingClientRect().height));
    expect(heights.length).toBeGreaterThanOrEqual(3);
    for (const h of heights) {
      expect(h).toBeGreaterThanOrEqual(44);
    }
    // Submit button
    const btnH = await page.$eval('#panel-translation .submit-btn', (e) => e.getBoundingClientRect().height);
    expect(btnH).toBeGreaterThanOrEqual(44);
  });
});

test.describe('Guide page', () => {
  test('guide has three definition tables', async ({ page }) => {
    await page.goto(`${BASE}/guide/`);
    const tables = page.locator('.static-doc .checklist-table');
    await expect(tables).toHaveCount(3); // category + scope + flags

    // Verify dynamic scope counts are rendered
    const rows = page.locator('.static-doc .checklist-table').nth(1).locator('tr');
    const count = await rows.count();
    expect(count).toBeGreaterThanOrEqual(15); // 15 scopes

    // Check that a known scope has a link to its index page
    await expect(rows.locator('a[href*="/scope/webapp/"]')).toBeVisible();
  });

  test('flag names link to flag index pages', async ({ page }) => {
    await page.goto(`${BASE}/guide/`);
    const links = page.locator('a[href*="/flag/"]');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(6); // 6 risk flags
  });
});

test.describe('Commercial page', () => {
  test('shows tool count and licence count', async ({ page }) => {
    await page.goto(`${BASE}/commercial/`);
    const text = await page.textContent('article');
    expect(text).toContain('65');
  });

  test('links to guide and upstream', async ({ page }) => {
    await page.goto(`${BASE}/commercial/`);
    await expect(page.locator('a[href*="/guide/"]').first()).toBeVisible();
    await expect(page.locator('a[href*="aisecuritymatrix.com"]').first()).toBeVisible();
  });
});
