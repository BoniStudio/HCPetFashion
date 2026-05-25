"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { assetPath, formatPrice } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  index?: number;
  onQuickView?: (product: Product) => void;
};

export function ProductCard({ product, index = 0, onQuickView }: ProductCardProps) {
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
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-sand/25">
        <Link href={`/product/${product.slug}/`}>
          <Image
            src={assetPath(product.image)}
            alt={product.name}
            fill
            className="img-editorial transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 50vw, 33vw"
          />
        </Link>

        <div className="absolute inset-0 flex items-center justify-center gap-4 bg-charcoal/0 opacity-0 transition-all duration-500 group-hover:bg-charcoal/10 group-hover:opacity-100">
          <Link
            href={`/product/${product.slug}/`}
            className="glass px-6 py-3 text-[10px] tracking-[0.2em] text-charcoal uppercase transition-transform hover:scale-105"
          >
            View
          </Link>
          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="glass px-6 py-3 text-[10px] tracking-[0.2em] text-charcoal uppercase transition-transform hover:scale-105"
            >
              Quick View
            </button>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <Link href={`/product/${product.slug}/`}>
            <h3 className="font-display text-base font-light text-charcoal transition-colors group-hover:text-espresso">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-[11px] tracking-[0.1em] text-stone capitalize">
            {product.categories.join(" · ")}
          </p>
        </div>
        <p className="text-sm text-warm">{formatPrice(product.price)}</p>
      </div>
    </motion.article>
  );
}
