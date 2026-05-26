"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/SafeImage";
import { Reveal } from "@/components/ui/Reveal";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { LimitedBadge } from "@/components/ui/LimitedBadge";
import type { Product } from "@/lib/products";
import { formatCategories } from "@/lib/product-utils";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

type ShopPreviewProps = {
  products: Product[];
};

function EditorialCard({
  product,
  size,
  className,
}: {
  product: Product;
  size: "hero" | "medium" | "small";
  className?: string;
}) {
  const aspect =
    size === "hero"
      ? "aspect-[4/5] md:aspect-auto md:min-h-[520px]"
      : size === "medium"
        ? "aspect-[3/4]"
        : "aspect-square";

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "group relative overflow-hidden glass-panel",
        className
      )}
    >
      <Link
        href={`/product/${product.slug}/`}
        className={cn("relative block overflow-hidden", aspect)}
      >
        <SafeImage
          src={product.image}
          alt={product.name}
          fill
          sizes={
            size === "hero"
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, 25vw"
          }
          className="img-editorial transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 flex translate-y-4 flex-wrap gap-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <AddToCartButton product={product} label="Quick Add" />
          <Link
            href={`/product/${product.slug}/`}
            className="glass px-4 py-2.5 font-display text-[9px] tracking-[0.18em] text-ivory-warm uppercase"
          >
            View Details
          </Link>
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/product/${product.slug}/`}>
              <h3
                className={cn(
                  "font-display font-medium text-ink",
                  size === "hero" ? "text-xl md:text-2xl" : "text-base"
                )}
              >
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
      </div>
    </motion.article>
  );
}

export function ShopPreview({ products }: ShopPreviewProps) {
  const [hero, ...rest] = products.slice(0, 7);
  const medium = rest.slice(0, 2);
  const small = rest.slice(2, 6);

  if (!hero) return null;

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-[10px] tracking-[0.38em] text-muted uppercase">
              Editorial Edit
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] text-ink md:text-4xl">
              Future pet wardrobe.
            </h2>
          </div>
          <Link
            href="/shop/"
            className="font-display text-[10px] tracking-[0.2em] text-muted uppercase transition-colors hover:text-ink"
          >
            View all →
          </Link>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-5">
          <Reveal className="md:col-span-7">
            <EditorialCard product={hero} size="hero" />
          </Reveal>
          <div className="grid gap-5 md:col-span-5">
            {medium.map((p, i) => (
              <Reveal key={p.slug} delay={0.06 * (i + 1)}>
                <EditorialCard product={p} size="medium" />
              </Reveal>
            ))}
          </div>
        </div>

        {small.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {small.map((p, i) => (
              <Reveal key={p.slug} delay={0.04 * i}>
                <EditorialCard product={p} size="small" />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
