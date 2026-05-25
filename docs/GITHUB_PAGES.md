# GitHub Pages 部署指南

## 目标 URL

https://bonistudio.github.io/HCPetFashion/

## 一次性设置

1. Fork/clone https://github.com/BoniStudio/HCPetFashion
2. **Settings → Pages → Source** → **GitHub Actions**
3. Push 到 `main` 分支

## Workflow 说明

文件：`.github/workflows/deploy.yml`

```yaml
env:
  NEXT_PUBLIC_BASE_PATH: /HCPetFashion
  NEXT_PUBLIC_SITE_URL: https://bonistudio.github.io/HCPetFashion
```

构建步骤：

1. `npm ci`
2. `npm run build`（含 `generate-products`）
3. 上传 `out/` 目录
4. `deploy-pages` 发布

## 常见问题

### 图片 404

静态导出时 `next/image` 不会自动为 `/public` 图片加 basePath。项目使用 `SafeImage` + `withBasePath()` 修复。

### CSS/JS 404

确认 `next.config.ts` 中 `basePath` 与 workflow 环境变量一致（`/HCPetFashion`）。

### 首页空白

确认 Pages 使用的是 **GitHub Actions** 而非旧版 `gh-pages` 分支。

### 自定义域名

Project site 默认不需要 CNAME。若使用自定义域名，在 `public/CNAME` 添加域名并更新 `NEXT_PUBLIC_SITE_URL`。
