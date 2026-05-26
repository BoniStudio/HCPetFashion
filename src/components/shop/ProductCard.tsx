"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/SafeImage";
import { LimitedBadge } from "@/components/ui/LimitedBadge";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import type { Product } from "@/lib/products";
import { formatCategories } from "@/lib/product-utils";
import { formatPrice } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: (index % 6) * 0.05,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group flex flex-col overflow-hidden glass-panel transition-shadow duration-500 hover:shadow-glow-sm"
    >
      <Link
        href={`/product/${product.slug}/`}
        className="relative aspect-[3/4] overflow-hidden bg-mist/20"
      >
        <SafeImage
          src={product.image}
          alt={product.name}
          fill
          className="img-editorial transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-4 opacity-0 transition-all duration-500 group-hover:opacity-100">
          <AddToCartButton product={product} label="Quick Add" />
          <span className="glass px-4 py-2.5 font-display text-[9px] tracking-[0.18em] text-ivory-warm uppercase">
            View Details
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/product/${product.slug}/`}>
              <h3 className="font-display text-base font-medium text-ink transition-colors group-hover:text-graphite md:text-lg">
                {product.name}
              </h3>
            </Link>
            <p className="mt-1 font-display text-[9px] tracking-[0.14em] text-muted uppercase">
              {formatCategories(product)}
            </p>
          </div>
          <p className="price-display shrink-0 text-sm text-ink">
            {formatPrice(product.price)}
          </p>
        </div>

        {product.limited && (
          <div className="mt-3">
            <LimitedBadge />
          </div>
        )}

        <p className="mt-4 line-clamp-2 text-xs leading-relaxed text-muted">
          {product.description}
        </p>
      </div>
    </motion.article>
  );
}
