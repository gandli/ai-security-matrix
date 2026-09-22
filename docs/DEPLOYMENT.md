# Deployment — AI Security Matrix

---

## 1. Architecture Overview

```
git push origin astro-site
       │
       ▼
GitHub Actions
  ├── e2e.yml            (Playwright: 208 tests, 4 viewports)
  └── deploy-pages.yml   (Build 688 pages → push to gh-pages branch)
                                │
                                ▼
                       GitHub Pages CDN
                                │
                                ▼
              https://gandli.github.io/ai-security-matrix/
```

---

## 2. GitHub Pages Deployment Pipeline

### Workflow: `.github/workflows/deploy-pages.yml`

Automatically triggered on every push to `astro-site`:

```yaml
name: Deploy Astro Site to GitHub Pages

on:
  push:
    branches:
      - astro-site
  workflow_dispatch: {}

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      # 1. Checkout code
      - uses: actions/checkout@v4

      # 2. Node environment
      - uses: actions/setup-node@v4
        with:
          node-version: 22

      # 3. Install dependencies
      - run: npm ci

      # 4. Build site (includes OG image generation)
      - run: npm run build

      # 5. Deploy to gh-pages orphan branch
      - name: Deploy to GitHub Pages
        run: |
          cp -r dist /tmp/dist_backup
          git fetch origin gh-pages:gh-pages || git checkout --orphan gh-pages
          git checkout gh-pages
          git rm -rf . || true
          cp -r /tmp/dist_backup/* .
          touch .nojekyll
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add -A -f
          git commit -m "deploy: ${GITHUB_SHA} via GitHub Actions" || exit 0
          git push origin gh-pages
```

### GitHub repo settings

- **Pages Source**: `Deploy from a branch`
- **Branch**: `gh-pages` / `/ (root)`
- **Custom domain** (optional): Configure CNAME in Pages settings

---

## 3. Cloudflare Tunnel (Dev / Preview Mode)

Used to access the VPS dev server from mainland China without opening any ports, with built-in HTTPS.

### Install cloudflared (Linux ARM64)

```bash
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64 -O /usr/local/bin/cloudflared
chmod +x /usr/local/bin/cloudflared
cloudflared --version
```

### Start persistent development session

```bash
# 1. Start Astro dev server (Screen background session)
screen -dmS astro-dev bash -c 'cd /tmp/repo && exec npx astro dev --host 0.0.0.0 --port 3000'

# 2. Start Cloudflare Quick Tunnel
screen -dmS cf-tunnel bash -c 'cloudflared tunnel --url http://localhost:3000 > /tmp/tunnel.log 2>&1'

# 3. Extract the tunnel URL
grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' /tmp/tunnel.log | tail -1
```

### Access paths

```
https://<random-subdomain>.trycloudflare.com/ai-security-matrix/
https://<random-subdomain>.trycloudflare.com/ai-security-matrix/zh/tools/usestrix-strix/
```

### Required Astro configuration

`astro.config.mjs` must include the following, or Vite will block cross-origin Host requests:

```js
export default defineConfig({
  // ...
  security: {
    checkOrigin: false,
  },
  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
```

---

## 4. Production vs Preview Comparison

| Dimension | GitHub Pages | Cloudflare Tunnel |
|:---|:---|:---|
| **Purpose** | Production release | Dev / preview / testing |
| **Stability** | Permanent fixed domain | New domain on restart |
| **Content** | Static build output (688 pages) | Live hot-reload (Vite HMR) |
| **Network** | GitHub global CDN | Cloudflare Anycast edge |
| **Mainland China** | Fast, reliable | Fastest direct connection |
| **Port requirements** | Zero open ports | Zero open ports |
| **Maintenance cost** | Zero (CI automated) | Requires VPS running process |
