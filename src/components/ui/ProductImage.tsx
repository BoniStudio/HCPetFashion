"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { assetPath } from "@/lib/utils";

type ProductImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  aspect?: "square" | "portrait" | "landscape" | "editorial";
};

const aspectMap = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  editorial: "aspect-[4/5] md:aspect-[3/4]",
};

export function ProductImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  aspect = "editorial",
}: ProductImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-sand/30",
        aspectMap[aspect],
        className
      )}
    >
      <Image
        src={assetPath(src)}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="img-editorial transition-transform duration-700 ease-out"
      />
    </div>
  );
}
