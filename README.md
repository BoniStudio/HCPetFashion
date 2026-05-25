# HC Pet Fashion

轻奢宠物时尚独立站 — Next.js 15 · GitHub Pages（`docs/` 静态部署）

| 地址 | URL |
|------|-----|
| GitHub Pages | https://bonistudio.github.io/HCPetFashion/ |
| 自定义域名 | https://hcpetfashion.red |

## 开发

```bash
npm install
npm run generate-products
npm run dev
```

## 发布到 GitHub Pages

```bash
npm run build
```

此命令会：生成商品数据 → 静态导出到 `out/` → 复制到 `docs/` → 写入 `.nojekyll` 与 `CNAME`。

### GitHub 设置（一次性）

**Settings → Pages → Build and deployment**

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/docs**

不要使用 GitHub Actions 部署；不要选 README 作为来源。

## 项目结构

- `docs/` — 构建产物（提交到 Git），Pages 从此目录发布
- `src/` — Next.js 源码
- `Website Image/` — 原始商品图
