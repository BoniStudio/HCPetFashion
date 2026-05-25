/**
 * GitHub Pages site configuration
 * https://bonistudio.github.io/HCPetFashion
 */
export const REPO_NAME = "HCPetFashion";
export const GITHUB_PAGES_BASE_PATH = `/${REPO_NAME}`;
export const GITHUB_PAGES_URL = `https://bonistudio.github.io${GITHUB_PAGES_BASE_PATH}`;

/** Set at build time via NEXT_PUBLIC_BASE_PATH (empty for local dev) */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (basePath ? GITHUB_PAGES_URL : "http://localhost:3000");

/**
 * Prefix paths for static assets & fetch.
 * Required for next/image on static export (GitHub Pages).
 * next/link applies basePath automatically — do not use on Link href.
 */
export function withBasePath(path: string): string {
  if (!path) return basePath || "/";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
