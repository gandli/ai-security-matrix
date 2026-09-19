import { test, expect } from '@playwright/test';

test.describe('Mobile Responsive', () => {
  test('no horizontal scroll on mobile', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflow).toBe(false);
  });

  test('table scrolls horizontally on narrow viewport', async ({ page }) => {
    test.skip(!/^mobile/.test(test.info().project.name), 'narrow viewport only');
    await page.goto('/ai-security-matrix/');
    const wrap = page.locator('#list-view');
    const { scroll, client } = await wrap.evaluate((el) => ({
      scroll: el.scrollWidth,
      client: el.clientWidth,
    }));
    expect(scroll).toBeGreaterThan(client);
  });

  test('hero headline <= 28px on mobile', async ({ page }) => {
    test.skip(!/^mobile-[sm]/.test(test.info().project.name), 'mobile-s/m viewport only');
    await page.goto('/ai-security-matrix/');
    const fontSize = await page.evaluate(() =>
      parseFloat(getComputedStyle(document.querySelector('.hero-headline')).fontSize)
    );
    expect(fontSize).toBeLessThanOrEqual(28);
  });

  test('nav links have >= 44px touch target', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    const links = await page.$$('.site-nav .nav-links a');
    for (const link of links) {
      const box = await link.boundingBox();
      if (!box) continue;
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('icon buttons have >= 44px touch target', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    const btns = await page.$$('.nav-actions .icon-btn');
    for (const btn of btns) {
      const box = await btn.boundingBox();
      if (!box) continue;
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('category tabs have >= 44px touch target', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    const tabs = await page.$$('.cat-tab');
    for (const tab of tabs) {
      const box = await tab.boundingBox();
      if (!box) continue;
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('search input has >= 44px touch target', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    const input = page.locator('#search-input');
    const box = await input.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  });

  test('view toggle buttons have >= 44px touch target', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    const btns = await page.$$('.view-btn');
    for (const btn of btns) {
      const box = await btn.boundingBox();
      if (!box) continue;
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });
});