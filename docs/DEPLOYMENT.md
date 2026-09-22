# Deployment — AI Security Matrix

---

## 1. 架构总览

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

## 2. GitHub Pages 部署流程

### 工作流：`.github/workflows/deploy-pages.yml`

每次推送到 `astro-site` 分支时自动触发：

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
      # 1. 检出代码
      - uses: actions/checkout@v4

      # 2. Node 环境
      - uses: actions/setup-node@v4
        with:
          node-version: 22

      # 3. 安装依赖
      - run: npm ci

      # 4. 构建站点（含 OG 图像生成）
      - run: npm run build

      # 5. 部署到 gh-pages 孤立分支
      - name: Deploy to GitHub Pages
        run: |
          # 备份构建产物
          cp -r dist /tmp/dist_backup

          # 切换到 gh-pages 分支
          git fetch origin gh-pages:gh-pages || git checkout --orphan gh-pages
          git checkout gh-pages

          # 保留 .git，删除旧文件
          git rm -rf . || true

          # 还原新产物
          cp -r /tmp/dist_backup/* .
          touch .nojekyll

          # 提交并推送
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add -A -f
          git commit -m "deploy: ${GITHUB_SHA} via GitHub Actions" || exit 0
          git push origin gh-pages
```

### GitHub 仓库设置

- **Pages Source**：选择 `Deploy from a branch`
- **Branch**：`gh-pages` / `/ (root)`
- **自定义域名**（可选）：在 Pages 设置中配置 CNAME

---

## 3. Cloudflare Tunnel 部署（开发/预览模式）

用于从境内直连 VPS 开发服务器，**无需公网开放端口，自带 HTTPS 加密**。

### 安装 cloudflared（Linux ARM64）

```bash
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64 -O /usr/local/bin/cloudflared
chmod +x /usr/local/bin/cloudflared
cloudflared --version
```

### 启动持久化开发会话

```bash
# 1. 启动 Astro dev server（Screen 后台会话）
screen -dmS astro-dev bash -c 'cd /tmp/repo && exec npx astro dev --host 0.0.0.0 --port 3000'

# 2. 启动 Cloudflare Quick Tunnel
screen -dmS cf-tunnel bash -c 'cloudflared tunnel --url http://localhost:3000 > /tmp/tunnel.log 2>&1'

# 3. 获取隧道 URL
grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' /tmp/tunnel.log | tail -1
```

### 访问路径

```
https://<random-subdomain>.trycloudflare.com/ai-security-matrix/
https://<random-subdomain>.trycloudflare.com/ai-security-matrix/zh/tools/usestrix-strix/
```

### 配置注意事项

Astro 的 `astro.config.mjs` 中必须包含以下配置，否则 Vite 会拦截跨域 Host 请求：

```js
export default defineConfig({
  // ...
  security: {
    checkOrigin: false,
  },
  vite: {
    server: {
      allowedHosts: true, // 允许隧道 Host 头
    },
  },
});
```

---

## 4. 生产环境对比

| 维度 | GitHub Pages | Cloudflare Tunnel |
|:---|:---|:---|
| **用途** | 生产正式发布 | 开发/预览/测试 |
| **稳定性** | 永久固定域名 | 每次重启更换域名 |
| **内容** | 静态构建产物（688 页） | 实时热更新（Vite HMR） |
| **网络** | GitHub 全球 CDN | Cloudflare Anycast 边缘 |
| **境内访问** | 速度快，稳定 | 速度极快，直连 |
| **端口要求** | 零开放 | 零开放 |
| **维护成本** | 零（CI 自动化） | 需要 VPS 运行进程 |
