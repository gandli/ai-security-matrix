import { test, expect } from '@playwright/test';

test.describe('Page Load', () => {
  test('EN home loads with hero and matrix table', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    await expect(page.locator('.hero-headline')).toBeVisible();
    await expect(page.locator('.matrix')).toBeVisible();
    await expect(page.locator('.cat-tab').first()).toBeVisible();
  });

  test('ZH home loads with Chinese content', async ({ page }) => {
    await page.goto('/ai-security-matrix/zh/');
    await expect(page.locator('.hero-headline')).toContainText('AI 安全工具');
    await expect(page.locator('.matrix')).toBeVisible();
  });

  test('static pages load', async ({ page }) => {
    const pages = [
      '/ai-security-matrix/about/',
      '/ai-security-matrix/guide/',
      '/ai-security-matrix/contribute/',
      '/ai-security-matrix/commercial/',
    ];
    for (const path of pages) {
      await page.goto(path);
      await expect(page.locator('.static-doc')).toBeVisible();
    }
  });

  test('OG image is accessible', async ({ request }) => {
    const res = await request.get('/ai-security-matrix/og-image.png');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('image/png');
  });

  test('favicon is accessible', async ({ request }) => {
    const res = await request.get('/ai-security-matrix/favicon.svg');
    expect(res.status()).toBe(200);
  });
});
