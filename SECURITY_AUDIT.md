# HC Pet Fashion — Security Audit

**Date:** 2026-05-24  
**Site:** https://hcpetfashion.red  
**Deployment:** GitHub Pages (`docs/` static export)

---

## Executive summary

This audit addressed Chrome “Not secure” / mixed-content risks by ensuring all **loadable site resources and metadata** use HTTPS or root-relative paths. Build-time verification (`scripts/verify-security.mjs`) now fails if insecure URLs appear in HTML, CSS, JS, or config source.

---

## Issues found (before)

| Area | Problem | Risk |
|------|---------|------|
| `next.config.ts` | `NEXT_PUBLIC_SITE_URL` set to `http://localhost:3000` in non-prod env block | Could leak into metadata if mis-built |
| `src/lib/site.ts` | `siteUrl` fallback to `http://localhost:3000` | Canonical / OG URLs could be HTTP |
| `src/app/layout.tsx` | Metadata used dynamic `siteUrl` | Same as above |
| `src/styles/globals.css` | SVG data-URI used `http://www.w3.org/2000/svg` xmlns | Minor; upgraded to HTTPS |
| Missing | No `robots.txt` / `sitemap.xml` with HTTPS URLs | SEO / crawler inconsistency |
| Missing | No CSP `upgrade-insecure-requests` | No browser-level HTTP upgrade |
| Missing | No build security scan | Regressions undetected |
| GitHub Pages | No server-side security headers from Next.js | HSTS not sent by static host |

**Not a mixed-content issue (informational):** JPEG/PNG EXIF metadata contains `http://ns.adobe.com/...` namespace strings inside binary files. Browsers do **not** fetch these as network resources.

---

## Fixes applied

| File | Change |
|------|--------|
| `src/lib/site.ts` | `siteUrl` always `https://hcpetfashion.red`; added `absoluteUrl()` with HTTP→HTTPS upgrade |
| `next.config.ts` | `NEXT_PUBLIC_SITE_URL` locked to HTTPS; security headers defined (HSTS, nosniff, referrer-policy, etc.) |
| `src/app/layout.tsx` | `metadataBase`, canonical, OG, Twitter, icons use `https://hcpetfashion.red`; CSP meta `upgrade-insecure-requests` |
| `src/app/product/[slug]/page.tsx` | Canonical / OG via `absoluteUrl()` |
| `src/components/seo/*.tsx` | JSON-LD URLs via HTTPS helpers |
| `src/styles/globals.css` | Grain SVG xmlns → HTTPS |
| `public/robots.txt` | Added with HTTPS sitemap reference |
| `public/sitemap.xml` | All `<loc>` entries use `https://hcpetfashion.red` |
| `scripts/verify-security.mjs` | New build gate: scans src/public/docs text assets |
| `package.json` | `npm run build` runs security verification |

### External links verified (HTTPS)

- Stripe: `https://buy.stripe.com/fZufZa2KpfOS6t1efGbAs03`
- Instagram: `https://www.instagram.com/hcpetfashion?...`
- Email: `mailto:hc.pet.fashion@outlook.com` (no HTTP)

### Build output (`docs/`)

After `npm run build`:

- No `http://localhost` in HTML
- No `http://hcpetfashion.red` in HTML
- All asset paths root-relative (`/_next/...`, `/products/...`, `/brand/...`)
- `docs/CNAME` = `hcpetfashion.red`

---

## Remaining risks

| Risk | Mitigation |
|------|------------|
| **GitHub Pages does not apply Next.js `headers()`** | Enable **Enforce HTTPS** in repo Settings → Pages. Optional: Cloudflare in front for HSTS. |
| **Stripe Payment Link** | Third-party checkout on `buy.stripe.com` (HTTPS). Amount entered manually by customer. |
| **Image EXIF metadata** | Embedded XML namespaces only; not loaded over network. Strip with `optimize-images.mjs` if desired. |
| **No CSP beyond upgrade-insecure-requests** | Acceptable for static marketing site; tighten if adding third-party scripts. |

---

## Verification commands

```bash
npm run build
node scripts/verify-security.mjs
node scripts/verify-docs.mjs
```

Expected: all pass ✅

---

## Checklist for “fully secure” in Chrome

1. ✅ Site served over **HTTPS** (custom domain + GitHub Pages Enforce HTTPS)
2. ✅ No active mixed-content URLs in page HTML/CSS/JS
3. ✅ Canonical & social metadata use `https://hcpetfashion.red`
4. ✅ CSP `upgrade-insecure-requests` in `<head>`
5. ⚠️ HSTS header requires CDN/proxy or GitHub HTTPS enforcement (not from static files alone)
