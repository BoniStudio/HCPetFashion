# HC Pet Fashion

轻奢宠物时尚独立站 — Next.js 15 · Tailwind CSS · Framer Motion · GitHub Pages 静态部署。

## 功能

- **Home** — 全屏 Editorial Hero、雨衣画册区、精选横向滑动、品牌理念
- **Shop** — 分类筛选（Raincoat / Custom / Small Dogs / Fashion Style）
- **Product** — 详情页、尺码、Add to Cart
- **Cart** — localStorage 持久化，预留 Stripe Checkout
- **Contact** — 联系表单、Shipping、Return Policy

## 技术栈

- Next.js 15 (App Router, Static Export)
- Tailwind CSS 3
- Framer Motion 11
- TypeScript

## 快速开始

```bash
npm install
npm run generate-products   # 扫描 Website Image/ → public/products/ + src/lib/products.ts
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 商品图片

原始图片目录：`Website Image/`（按中文文件夹分类）

运行 `npm run generate-products` 会：

1. 复制图片到 `public/products/{slug}/`
2. 自动生成 `src/lib/products.ts`（slug、分类、价格、封面）

修改分类或英文名：编辑 `scripts/generate-products.mjs` 中的 `FOLDER_META`。

## 构建与部署（GitHub Pages）

```bash
# 本地静态构建
npm run build
# 输出目录: out/
```

### 自动部署

推送至 `main` / `master` 分支后，`.github/workflows/deploy.yml` 会：

1. 生成商品数据
2. 以 `GITHUB_PAGES=true` 构建
3. 部署 `out/` 到 GitHub Pages

### 手动配置 Pages

1. 仓库 **Settings → Pages → Source**: GitHub Actions
2. 确保仓库名为 `HCPetFashion`（或修改 workflow 中的 `NEXT_PUBLIC_BASE_PATH`）

站点地址：`https://<username>.github.io/HCPetFashion/`

## Stripe Checkout（后期）

静态站点 **不支持** `/api/checkout`。可选方案：

1. **Vercel**：移除 `output: 'export'`，将 `src/lib/checkout-api.example.ts` 复制为 `src/app/api/checkout/route.ts`，安装 `stripe`
2. **外部 API**：购物车 Checkout 按钮指向独立 Serverless URL

示例代码：`src/lib/checkout-api.example.ts`

## 项目结构

```
src/
  app/           # 页面路由
  components/    # UI 组件
  lib/           # products, cart, utils
  styles/        # globals.css
public/
  products/      # 生成的商品图片
scripts/
  generate-products.mjs
Website Image/   # 原始图片（勿删）
```

## 设计说明

- 奶油白 / 米白 / 浅卡其配色
- Inter + Manrope 字体
- 图片 `object-cover` 统一比例，不拉伸
- Grain overlay、glass blur、scroll reveal 动画

## License

Private — HC Pet Fashion © 2025
