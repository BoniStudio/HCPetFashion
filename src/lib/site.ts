/**
 * Custom domain: https://hcpetfashion.red
 * Static export via docs/ — all assets at root paths (/products, /_next)
 */
export const CUSTOM_DOMAIN = "hcpetfashion.red";
export const SITE_URL = "https://hcpetfashion.red";

/** Always HTTPS — used for metadata, canonical, JSON-LD, and static export. */
export const siteUrl = SITE_URL;

/** Always empty — custom domain serves from site root */
export const basePath = "";

/**
 * Build absolute HTTPS URL for metadata and structured data.
 */
export function absoluteUrl(path: string): string {
  if (!path) return `${SITE_URL}/`;
  if (path.startsWith("https://")) return path;
  if (path.startsWith("http://")) {
    return path.replace(/^http:\/\//i, "https://");
  }
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Asset path helper for static export.
 * Custom domain: paths stay as /products/... (no subpath prefix).
 */
export function withBasePath(path: string): string {
  if (!path) return "/";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path.replace(/^http:\/\//i, "https://");
  }
  return path.startsWith("/") ? path : `/${path}`;
}
