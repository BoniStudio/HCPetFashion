/**
 * Custom domain: https://hcpetfashion.red
 * Static export via docs/ — all assets at root paths (/products, /_next)
 */
export const CUSTOM_DOMAIN = "hcpetfashion.red";
export const SITE_URL = "https://hcpetfashion.red";

/** Always empty — custom domain serves from site root */
export const basePath = "";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production"
    ? SITE_URL
    : "http://localhost:3000");

/**
 * Asset path helper for static export.
 * Custom domain: paths stay as /products/... (no subpath prefix).
 */
export function withBasePath(path: string): string {
  if (!path) return "/";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return path.startsWith("/") ? path : `/${path}`;
}
