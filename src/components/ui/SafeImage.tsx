"use client";

import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/**
 * Static export: use root paths (/products/...) for custom domain.
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
  const imageSrc =
    typeof src === "string" && src.length > 0
      ? src.startsWith("http")
        ? src
        : src
      : "/products/placeholder.svg";

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
