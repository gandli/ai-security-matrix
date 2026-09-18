import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Deployed to a GitHub Pages *project* site at /ai-security-matrix/.
// `base` makes Astro prefix every asset + internal link with that path so
// nothing 404s under the repo subdirectory. OpenGraph/twitter image URLs in
// Layout.astro stay absolute (https://gandli.github.io/ai-security-matrix/...)
// which is correct for link unfurling regardless of base.

export default defineConfig({
  site: 'https://gandli.github.io/ai-security-matrix/',
  base: '/ai-security-matrix/',
  output: 'static',
  integrations: [tailwind({ applyBaseStyles: false })],
});
