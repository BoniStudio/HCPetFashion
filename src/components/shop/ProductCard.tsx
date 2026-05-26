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
      className="group flex flex-col border border-sand/50 bg-ivory transition-shadow duration-500 hover:shadow-soft"
    >
      <Link
        href={`/product/${product.slug}/`}
        className="relative aspect-[3/4] overflow-hidden bg-sand/25"
      >
        <SafeImage
          src={product.image}
          alt={product.name}
          fill
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/product/${product.slug}/`}>
              <h3 className="font-display text-base font-light text-charcoal transition-colors group-hover:text-espresso md:text-lg">
                {product.name}
              </h3>
            </Link>
            <p className="mt-1 text-[10px] tracking-[0.08em] text-stone">
              {formatCategories(product)}
            </p>
          </div>
          <p className="shrink-0 text-sm text-charcoal">{formatPrice(product.price)}</p>
        </div>

        {product.limited && (
          <div className="mt-3">
            <LimitedBadge />
          </div>
        )}

        <p className="mt-4 line-clamp-2 text-xs leading-relaxed text-warm">
          {product.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={`/product/${product.slug}/`}
            className="border border-charcoal/70 px-5 py-2.5 text-[10px] tracking-[0.18em] text-charcoal uppercase transition-all hover:bg-charcoal hover:text-ivory"
          >
            View Details
          </Link>
          <AddToCartButton product={product} />
        </div>
      </div>
    </motion.article>
  );
}
