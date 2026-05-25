"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import { Reveal } from "@/components/ui/Reveal";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";

type ProductDetailClientProps = {
  product: Product;
};

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[1] || product.sizes[0]);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, size, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pt-20">
      <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-12 lg:px-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative aspect-[3/4] overflow-hidden bg-sand/25 lg:sticky lg:top-28 lg:self-start"
          >
            <SafeImage
              src={product.images[activeImage]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          <div className="flex flex-col justify-center">
            <Reveal>
              <p className="text-[10px] tracking-[0.35em] text-stone uppercase">
                {product.categories.map((c) => c.replace("-", " ")).join(" · ")}
              </p>
              <h1 className="mt-4 font-display text-3xl font-light text-charcoal md:text-4xl">
                {product.name}
              </h1>
              <p className="mt-6 text-xl text-charcoal">{formatPrice(product.price)}</p>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-warm">
                {product.description}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <p className="text-[10px] tracking-[0.2em] text-stone uppercase">Size</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={cn(
                      "min-w-[3rem] border px-5 py-3 text-[11px] tracking-[0.15em] uppercase transition-all",
                      size === s
                        ? "border-charcoal bg-charcoal text-ivory"
                        : "border-sand text-warm hover:border-charcoal"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full border border-charcoal bg-charcoal py-4 text-[11px] tracking-[0.25em] text-ivory uppercase transition-all hover:bg-transparent hover:text-charcoal md:w-auto md:px-16"
              >
                {added ? "Added to Cart" : "Add to Cart"}
              </button>
              <Link
                href="/cart/"
                className="mt-4 inline-block text-[11px] tracking-[0.15em] text-stone uppercase hover:text-charcoal"
              >
                View Cart
              </Link>
            </Reveal>

            <Reveal delay={0.2} className="mt-12 space-y-3 border-t border-sand/60 pt-10">
              {product.tags.map((tag) => (
                <p key={tag} className="text-xs text-stone">
                  — {tag}
                </p>
              ))}
            </Reveal>
          </div>
        </div>

        <section className="mt-24 border-t border-sand/60 pt-20 md:mt-32">
          <Reveal>
            <h2 className="font-display text-2xl font-light text-charcoal">
              Details
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {product.images.slice(1).map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveImage(i + 1)}
                className="relative aspect-square overflow-hidden bg-sand/20"
              >
                <SafeImage
                  src={img}
                  alt={`${product.name} detail ${i + 1}`}
                  fill
                  className="opacity-90 transition-opacity hover:opacity-100"
                />
              </button>
            ))}
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-3">
            <Reveal>
              <h3 className="text-[10px] tracking-[0.25em] text-stone uppercase">
                Fabric
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-warm">
                {product.details.fabric}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="text-[10px] tracking-[0.25em] text-stone uppercase">
                Care
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-warm">
                {product.details.care}
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <h3 className="text-[10px] tracking-[0.25em] text-stone uppercase">
                Waterproof
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-warm">
                {product.details.waterproof
                  ? "Fully water-resistant construction for rainy day protection."
                  : "Designed for style and comfort in dry to light drizzle conditions."}
              </p>
            </Reveal>
          </div>
        </section>
      </div>
    </div>
  );
}
