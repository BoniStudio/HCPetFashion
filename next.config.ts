import type { NextConfig } from "next";

const isProd =
  process.env.NODE_ENV === "production" ||
  process.env.NEXT_PUBLIC_BASE_PATH === "/HCPetFashion";

const basePath = isProd ? "/HCPetFashion" : "";
const assetPrefix = isProd ? "/HCPetFashion/" : undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: isProd
      ? "https://hcpetfashion.red"
      : "http://localhost:3000",
  },
};

export default nextConfig;
