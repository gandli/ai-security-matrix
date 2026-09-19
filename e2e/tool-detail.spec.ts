import { test, expect } from '@playwright/test';

test.describe('Tool Detail', () => {
  test('loads all sections', async ({ page }) => {
    await page.goto('/ai-security-matrix/tools/usestrix-strix/');
    await expect(page.locator('.tool-detail-grid')).toBeVisible();
    await expect(page.locator('.checklist-table')).toBeVisible();
  });

  test('h1 contains tool name', async ({ page }) => {
    await page.goto('/ai-security-matrix/tools/usestrix-strix/');
    await expect(page.locator('h1').last()).toContainText('usestrix/strix');
  });

  test('back to matrix link returns home', async ({ page }) => {
    await page.goto('/ai-security-matrix/tools/usestrix-strix/');
    await page.locator('a:has-text("back to matrix")').click();
    await expect(page).toHaveURL(/localhost:\d+\/ai-security-matrix\/?$/);
  });

  test('shows stats grid', async ({ page }) => {
    await page.goto('/ai-security-matrix/tools/usestrix-strix/');
    const stats = page.locator('.tool-detail-grid .stat-item');
    const count = await stats.count();
    expect(count).toBeGreaterThanOrEqual(4);
    await expect(stats.first()).toBeVisible();
  });

  test('shows safety checklist with rows', async ({ page }) => {
    await page.goto('/ai-security-matrix/tools/usestrix-strix/');
    const checklist = page.locator('.checklist-table');
    await expect(checklist).toBeVisible();
    const rows = checklist.locator('tr');
    expect(await rows.count()).toBeGreaterThan(0);
  });

  test('links to GitHub repo', async ({ page }) => {
    await page.goto('/ai-security-matrix/tools/usestrix-strix/');
    const link = page.locator('a[href*="github.com/usestrix"]');
    await expect(link.first()).toBeVisible();
  });

  test('different tools load', async ({ page }) => {
    await page.goto('/ai-security-matrix/tools/NVIDIA-garak/');
    await expect(page.locator('h1').last()).toContainText('NVIDIA/garak');
    await page.goto('/ai-security-matrix/tools/LaurieWired-GhidraMCP/');
    await expect(page.locator('h1').last()).toContainText('LaurieWired/GhidraMCP');
  });

  test('ZH tool page shows Chinese content', async ({ page }) => {
    await page.goto('/ai-security-matrix/zh/tools/usestrix-strix/');
    await expect(page.locator('a:has-text("返回矩阵")')).toBeVisible();
  });
});