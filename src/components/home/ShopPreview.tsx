"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { Reveal } from "@/components/ui/Reveal";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { LimitedBadge } from "@/components/ui/LimitedBadge";
import type { Product } from "@/lib/products";
import { formatCategories } from "@/lib/product-utils";
import { formatPrice } from "@/lib/utils";

type ShopPreviewProps = {
  products: Product[];
};

export function ShopPreview({ products }: ShopPreviewProps) {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] tracking-[0.35em] text-stone uppercase">
              Curated Edit
            </p>
            <h2 className="mt-4 font-display text-3xl font-light text-charcoal">
              Limited pieces for everyday companions.
            </h2>
          </div>
          <Link
            href="/shop/"
            className="text-[11px] tracking-[0.2em] text-warm uppercase border-b border-stone/40 pb-1 hover:text-charcoal"
          >
            View all
          </Link>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.05}>
              <article className="group flex flex-col border border-sand/50 bg-ivory transition-shadow duration-500 hover:shadow-soft">
                <Link
                  href={`/product/${product.slug}/`}
                  className="relative aspect-[3/4] overflow-hidden bg-sand/25"
                >
                  <SafeImage
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/product/${product.slug}/`}>
                        <h3 className="font-display text-base font-light text-charcoal">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="mt-1 text-[10px] tracking-[0.08em] text-stone">
                        {formatCategories(product)}
                      </p>
                    </div>
                    <p className="text-sm text-charcoal shrink-0">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  {product.limited && (
                    <div className="mt-3">
                      <LimitedBadge />
                    </div>
                  )}
                  <p className="mt-4 line-clamp-2 text-xs leading-relaxed text-warm">
                    {product.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/product/${product.slug}/`}
                      className="text-[10px] tracking-[0.18em] text-stone uppercase border-b border-stone/30 pb-0.5 hover:text-charcoal"
                    >
                      View Details
                    </Link>
                    <AddToCartButton product={product} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
