import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test('toggles dark to light', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');
    await page.locator('#theme-btn').click();
    await expect(html).toHaveAttribute('data-theme', 'light');
  });

  test('toggles light back to dark', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    const html = page.locator('html');
    await page.locator('#theme-btn').click();
    await expect(html).toHaveAttribute('data-theme', 'light');
    await page.locator('#theme-btn').click();
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('theme persists after reload', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    await page.locator('#theme-btn').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('icon toggles visibility per theme', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    await expect(page.locator('.theme-icon-moon')).toBeVisible();
    await page.locator('#theme-btn').click();
    await expect(page.locator('.theme-icon-sun')).toBeVisible();
  });

  test('light theme on ZH page', async ({ page }) => {
    await page.goto('/ai-security-matrix/zh/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.locator('#theme-btn').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });
});