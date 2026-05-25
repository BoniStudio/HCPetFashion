/**
 * GitHub Pages — docs/ folder deployment
 * https://bonistudio.github.io/HCPetFashion
 * https://hcpetfashion.red (custom domain)
 */
export const REPO_NAME = "HCPetFashion";
export const GITHUB_PAGES_BASE_PATH = `/${REPO_NAME}`;
export const CUSTOM_DOMAIN = "hcpetfashion.red";

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (basePath ? `https://${CUSTOM_DOMAIN}` : "http://localhost:3000");

/** Prefix paths for static assets (next/image on static export). */
export function withBasePath(path: string): string {
  if (!path) return basePath || "/";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
