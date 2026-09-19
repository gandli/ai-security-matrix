import { test, expect } from '@playwright/test';

test.describe('Search & Filter', () => {
  test('search filters tools by name', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    const searchInput = page.locator('#search-input');
    await searchInput.fill('garak');
    await expect(page.locator('.matrix tbody tr')).toHaveCount(1);
    await expect(page.locator('.matrix tbody tr').first()).toContainText('garak');
  });

  test('search filters by scope', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    await page.locator('#search-input').fill('webapp');
    const visibleRows = page.locator('.matrix tbody tr');
    const count = await visibleRows.count();
    for (let i = 0; i < count; i++) {
      const row = visibleRows.nth(i);
      const scopeCell = row.locator('td:nth-child(4)');
      await expect(scopeCell).toContainText('webapp');
    }
  });

  test('search shows no results message', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    await page.locator('#search-input').fill('zzzznonexistenttool');
    await expect(page.locator('.matrix-empty')).toBeVisible();
    await expect(page.locator('.matrix-empty')).toContainText('No matching tools found');
  });

  test('clear filters button resets search', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    await page.locator('#search-input').fill('zzzznonexistenttool');
    await expect(page.locator('.matrix-empty')).toBeVisible();
    await page.locator('#clear-filters').click();
    await expect(page.locator('.matrix-empty')).not.toBeVisible();
    await expect(page.locator('#search-input')).toHaveValue('');
  });

  test('match counter updates on search', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    await expect(page.locator('#match-count')).toHaveText('65 / 65');
    await page.locator('#search-input').fill('garak');
    await expect(page.locator('#match-count')).toHaveText('1 / 65');
  });

  test('category tabs filter tools', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    await page.locator('.cat-tab[data-cat="agent"]').click();
    await expect(page.locator('#match-count')).toContainText('/ 65');
    const visibleRows = page.locator('.matrix tbody tr');
    const count = await visibleRows.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < Math.min(count, 3); i++) {
      await expect(visibleRows.nth(i).locator('.col-cat')).toContainText('agent');
    }
  });

  test('category "all" shows all tools', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    await page.locator('.cat-tab[data-cat="scanner"]').click();
    await page.locator('.cat-tab[data-cat="all"]').click();
    await expect(page.locator('#match-count')).toHaveText('65 / 65');
  });
});
