import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://gandli.github.io/ai-security-matrix/',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
