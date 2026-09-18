import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://gandli.github.io/ai-security-matrix/',
  output: 'static',
  integrations: [tailwind({ applyBaseStyles: false })],
});
