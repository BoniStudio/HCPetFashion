"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import { Button } from "@/components/ui/Button";
import { LimitedBadge } from "@/components/ui/LimitedBadge";
import { Reveal } from "@/components/ui/Reveal";
import { useCart } from "@/lib/cart";
import { INSTAGRAM_URL } from "@/lib/constants";
import type { Product } from "@/lib/products";
import { formatCategories } from "@/lib/product-utils";
import { cn, formatPrice } from "@/lib/utils";

type ProductDetailClientProps = {
  product: Product;
};

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[1] || product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const maxQty = product.limited ? product.stock : 5;

  const notify = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2200);
  };

  const handleAdd = () => {
    const result = addItem(product, size, quantity);
    if (result.ok) notify("Added to cart");
    else notify(result.message ?? "Could not add");
  };

  const handleBuyNow = () => {
    const result = addItem(product, size, quantity);
    if (result.ok) router.push("/cart/?checkout=1");
    else notify(result.message ?? "Could not add");
  };

  return (
    <div className="pt-20">
      <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-12 lg:px-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="relative aspect-[3/4] overflow-hidden border border-sand/50 bg-sand/25">
              <SafeImage
                src={product.images[activeImage]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="!object-contain p-6 md:p-10"
              />
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "relative aspect-square overflow-hidden border bg-sand/20 transition-colors",
                      activeImage === i
                        ? "border-charcoal"
                        : "border-sand/60 hover:border-stone"
                    )}
                  >
                    <SafeImage src={img} alt="" fill className="!object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <div className="flex flex-col">
            <Reveal>
              <p className="text-[10px] tracking-[0.35em] text-stone uppercase">
                {formatCategories(product)}
              </p>
              <h1 className="mt-4 font-display text-3xl font-light text-charcoal md:text-4xl">
                {product.name}
              </h1>
              <p className="mt-6 text-2xl text-charcoal">{formatPrice(product.price)}</p>
              {product.limited && (
                <div className="mt-4">
                  <LimitedBadge />
                </div>
              )}
              <p className="mt-8 max-w-md text-sm leading-relaxed text-warm">
                {product.description}
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-10">
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

            <Reveal delay={0.1} className="mt-8">
              <p className="text-[10px] tracking-[0.2em] text-stone uppercase">Quantity</p>
              <div className="mt-4 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-stone hover:text-charcoal"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="min-w-[2rem] text-center text-sm">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                  className="text-stone hover:text-charcoal"
                  aria-label="Increase quantity"
                >
                  +
                </button>
                {product.limited && (
                  <span className="text-xs text-stone">Max {maxQty}</span>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.12} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button onClick={handleAdd} variant="primary" className="w-full sm:w-auto">
                {feedback ?? "Add to Cart"}
              </Button>
              <Button onClick={handleBuyNow} variant="outline" className="w-full sm:w-auto">
                Buy Now
              </Button>
              <Button href={INSTAGRAM_URL} external variant="ghost" className="w-full sm:w-auto">
                Instagram Inquiry
              </Button>
            </Reveal>

            <Link
              href="/cart/"
              className="mt-4 inline-block text-[11px] tracking-[0.15em] text-stone uppercase hover:text-charcoal"
            >
              View cart
            </Link>
          </div>
        </div>

        <section className="mt-24 border-t border-sand/60 pt-16 md:mt-32">
          <Reveal>
            <h2 className="font-display text-2xl font-light text-charcoal">Details</h2>
          </Reveal>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Material", value: product.details.material },
              { label: "Water resistance", value: product.details.waterResistance },
              { label: "Best for", value: product.details.bestFor },
              { label: "Care", value: product.details.care },
              { label: "Shipping", value: product.details.shipping },
              {
                label: "Fabric notes",
                value: product.details.fabric,
              },
            ].map((row, i) => (
              <Reveal key={row.label} delay={i * 0.05}>
                <h3 className="text-[10px] tracking-[0.25em] text-stone uppercase">
                  {row.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-warm">{row.value}</p>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
