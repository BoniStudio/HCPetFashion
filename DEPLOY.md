# 部署说明 — hcpetfashion.red

## 构建

```bash
npm run build
```

产物在 `docs/`，资源路径为根路径：

- `/_next/static/...`
- `/products/...`

**不要**使用 `/HCPetFashion/` 前缀（仅适用于 github.io 子路径，自定义域名会 404）。

## GitHub Pages

| 设置 | 值 |
|------|-----|
| Source | Deploy from a branch |
| Branch | main |
| Folder | /docs |
| Custom domain | hcpetfashion.red |

`docs/CNAME` 内容为：`hcpetfashion.red`

## DNS（域名注册商）

| 类型 | 名称 | 值 |
|------|------|-----|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | bonistudio.github.io |

（以 GitHub Pages 设置页显示为准）
