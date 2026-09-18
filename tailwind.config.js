/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        raised: 'var(--raised)',
        rule: 'var(--rule)',
        'rule-strong': 'var(--rule-strong)',
        ink: 'var(--ink)',
        'ink-dim': 'var(--ink-dim)',
        alive: 'var(--alive)',
        stale: 'var(--stale)',
        dead: 'var(--dead)',
        name: 'var(--name)',
        star: 'var(--star)',
        cat: {
          agent: 'var(--cat-agent)',
          scanner: 'var(--cat-scanner)',
          mcp: 'var(--cat-mcp)',
          skill: 'var(--cat-skill)',
        },
        scope: {
          bg: 'var(--scope-pill)',
          ink: 'var(--scope-ink)',
        },
        access: {
          bg: 'var(--access-pill)',
          ink: 'var(--access-ink)',
        },
        unseen: {
          bg: 'var(--unseen-pill)',
          ink: 'var(--unseen-ink)',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
