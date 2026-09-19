import { defineConfig, devices } from 'playwright/test';

const PORT = Number(process.env.PORT || 4321);
const BASE = `http://localhost:${PORT}`;

/**
 * The site is an Astro project deployed to a GitHub Pages *project* page, so
 * every route lives under `/ai-security-matrix/`. In production the same
 * prefix is produced by `base` in astro.config.mjs.
 *
 * Tests run against the **production build** (`astro preview`), not the dev
 * server. The dev server's injected toolbar pollutes the DOM (extra h1s, etc.)
 * which breaks structural assertions like `h1.last()`.
 */
export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 7_500 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [['github'], ['list'], ['html', { open: 'never' }]]
    : [['list']],
  use: {
    baseURL: BASE,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    launchOptions: {
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-s', use: { viewport: { width: 320, height: 568 } } },
    { name: 'mobile-m', use: { viewport: { width: 375, height: 667 } } },
    { name: 'tablet', use: { viewport: { width: 768, height: 1024 } } },
  ],
  webServer: {
    command: `npm run build && npx astro preview --host 0.0.0.0 --port ${PORT}`,
    url: `${BASE}/ai-security-matrix/`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});