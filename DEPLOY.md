# GitHub Pages 部署检查清单

## 为什么线上显示 README？

常见原因（与本地 `docs/index.html` 无关）：

1. **Pages 源选错** — 选了 `main` 根目录 / README，而不是 `/docs`
2. **`docs/` 未 push** — 远程仓库没有构建后的 `docs/index.html`
3. **用了 GitHub Actions** — 旧 workflow 失败，回退显示 README

## 正确设置

**Settings → Pages → Build and deployment**

| 选项 | 值 |
|------|-----|
| Source | Deploy from a branch |
| Branch | main |
| Folder | **/docs** |

不要选 GitHub Actions。

## 发布命令

```bash
npm run build
git add docs/ scripts/ next.config.ts package.json package-lock.json README.md DEPLOY.md
git commit -m "fix: deploy pet store site to docs for GitHub Pages"
git push origin main
```

推送后等待 2–5 分钟，访问：https://bonistudio.github.io/HCPetFashion/

## 本地预览（模拟 GitHub Pages 路径）

```bash
npm run serve:docs
# 打开 http://localhost:5080/HCPetFashion/
```

不要用 `npx serve docs`（根路径不对，资源会 404）。
