# HC Pet Fashion

轻奢宠物时尚独立站 — Next.js 15 · Tailwind CSS · Framer Motion · GitHub Pages

**线上地址：** https://bonistudio.github.io/HCPetFashion/

**仓库：** https://github.com/BoniStudio/HCPetFashion

## 快速开始

```bash
npm install
npm run generate-products   # 扫描 Website Image/ → public/products/
npm run dev                 # http://localhost:3000
```

## GitHub Pages 部署

### 1. 开启 Pages

仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。

### 2. 推送代码

推送到 `main` 分支后，`.github/workflows/deploy.yml` 自动执行：

| 环境变量 | 值 |
|----------|-----|
| `NEXT_PUBLIC_BASE_PATH` | `/HCPetFashion` |
| `NEXT_PUBLIC_SITE_URL` | `https://bonistudio.github.io/HCPetFashion` |

### 3. 本地模拟 Pages 构建

```bash
npm run build:pages
# 输出: out/
npx serve out   # 预览（注意根路径需带 /HCPetFashion）
```

### 4. 验证资源路径

```bash
node scripts/check-paths.mjs
# Missing basePath count 应为 0
```

## 资源路径规则

| 类型 | 用法 |
|------|------|
| 图片 | `<SafeImage src="/products/..." />` — 内部自动 `withBasePath` |
| 链接 | `<Link href="/shop/" />` — Next.js 自动加 basePath |
| fetch | `withBasePath('/api/checkout')` |

**不要**对 `SafeImage` 手动拼接 `/HCPetFashion`，会由 `src/lib/site.ts` 统一处理。

## 配置一览

```
next.config.ts          output: 'export', basePath, images.unoptimized
.github/workflows/      GitHub Actions 自动部署
src/lib/site.ts         BASE_PATH / withBasePath
src/components/ui/      SafeImage 组件
public/.nojekyll        禁用 Jekyll
```

## Stripe（后期）

静态 Pages 不支持 API Route。参考 `src/lib/checkout-api.example.ts`，部署到 Vercel 后启用。

## 商品数据

```bash
npm run generate-products
```

编辑 `scripts/generate-products.mjs` 中的 `FOLDER_META` 可调整分类与英文名。
