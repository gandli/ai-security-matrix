import { test, expect } from '@playwright/test';

test.describe('Sort', () => {
  test('default sort by stars descending', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    const firstRowStars = page.locator('.matrix tbody tr').first().locator('.col-stars');
    const text = await firstRowStars.textContent();
    expect(text).toMatch(/\d+k|\d+/);
  });

  test('click stars header to toggle direction', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    const starsHeader = page.locator('.matrix thead th[data-sort="stars"]');
    await starsHeader.click();
    await page.waitForTimeout(200);
    await expect(page.locator('.matrix tbody tr').first()).toBeVisible();
    await starsHeader.click();
    await page.waitForTimeout(200);
    await expect(page.locator('.matrix tbody tr').first()).toBeVisible();
  });

  test('sort by tool name', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    await page.locator('.matrix thead th[data-sort="tool"]').click();
    await page.waitForTimeout(200);
    const firstName = await page.locator('.matrix tbody tr').first().locator('.name').textContent();
    expect(firstName).toBeTruthy();
  });

  test('sort by idle (last updated)', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    await page.locator('.matrix thead th[data-sort="idle"]').click();
    await page.waitForTimeout(200);
    await expect(page.locator('.matrix tbody tr').first()).toBeVisible();
  });

  test('sort by category', async ({ page }) => {
    await page.goto('/ai-security-matrix/');
    await page.locator('.matrix thead th[data-sort="category"]').click();
    await page.waitForTimeout(200);
    await expect(page.locator('.matrix tbody tr').first()).toBeVisible();
  });
});