"use client";

import Image, { type ImageProps } from "next/image";
import { withBasePath } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Static export + GitHub Pages: next/image does NOT prepend basePath
 * to /public assets in the built HTML. We apply withBasePath manually.
 */
export function SafeImage({
  src,
  alt,
  className,
  fill,
  priority,
  sizes,
  ...rest
}: ImageProps) {
  let imageSrc: ImageProps["src"] = "/products/placeholder.svg";

  if (typeof src === "string" && src.length > 0) {
    imageSrc = src.startsWith("http") ? src : withBasePath(src);
  } else if (src) {
    imageSrc = src;
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes={sizes}
      unoptimized
      className={cn("img-editorial", className)}
      {...rest}
    />
  );
}
