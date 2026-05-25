import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? "/HCPetFashion" : "";
const assetPrefix = isProduction ? "/HCPetFashion/" : undefined;

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
    NEXT_PUBLIC_SITE_URL: isProduction
      ? "https://hcpetfashion.red"
      : "http://localhost:3000",
  },
};

export default nextConfig;
