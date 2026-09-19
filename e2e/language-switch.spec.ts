import { test, expect } from '@playwright/test';

test.describe('Language Switch', () => {
  test('EN → ZH switch preserves hero content', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    await page.locator('.nav-actions a.icon-btn').click();
    await page.waitForURL(/\/zh\/?$/, { timeout: 5000 }).catch(() => {});
    await expect(page).toHaveURL(/localhost:\d+\/ai-security-matrix\/zh\/?/);
    await expect(page.locator('.hero-headline')).toContainText('AI 安全工具');
  });

  test('ZH → EN switch preserves hero content', async ({ page }) => {
    await page.goto('/ai-security-matrix/zh/');
    await page.locator('.nav-actions a.icon-btn').click();
    await page.waitForURL(/localhost:\d+\/ai-security-matrix\/?$/, { timeout: 5000 }).catch(() => {});
    await expect(page).toHaveURL(/localhost:\d+\/ai-security-matrix\/?$/);
    await expect(page.locator('.hero-headline')).toContainText('AI security tooling');
  });

  test('language toggle button label matches page language', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    await expect(page.locator('.nav-actions a.icon-btn .icon-label')).toHaveText('中');
    await page.goto('/ai-security-matrix/zh/');
    await expect(page.locator('.nav-actions a.icon-btn .icon-label')).toHaveText('EN');
  });

  test('switch preserves tool detail route', async ({ page }) => {
    await page.goto('/ai-security-matrix/tools/usestrix-strix/');
    await page.locator('.nav-actions a.icon-btn').click();
    await expect(page).toHaveURL(/localhost:\d+\/ai-security-matrix\/zh\/tools\/usestrix-strix\/?/);
    await page.locator('.nav-actions a.icon-btn').click();
    await expect(page).toHaveURL(/localhost:\d+\/ai-security-matrix\/tools\/usestrix-strix\/?/);
  });
});