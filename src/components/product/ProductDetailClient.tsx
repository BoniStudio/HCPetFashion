"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import { Button } from "@/components/ui/Button";
import { LimitedBadge } from "@/components/ui/LimitedBadge";
import { Reveal } from "@/components/ui/Reveal";
import { useCart } from "@/lib/cart";
import { INSTAGRAM_URL } from "@/lib/constants";
import type { Product } from "@/lib/products";
import { formatCategories } from "@/lib/product-utils";
import { useToast } from "@/lib/toast";
import { cn, formatPrice } from "@/lib/utils";

type ProductDetailClientProps = {
  product: Product;
};

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [size, setSize] = useState(product.sizes[1] || product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const maxQty = product.limited ? product.stock : 5;

  const handleAdd = () => {
    const result = addItem(product, size, quantity);
    if (result.ok) toast("Added to cart");
    else toast(result.message ?? "Could not add");
  };

  const handleReserve = () => {
    const result = addItem(product, size, quantity);
    if (result.ok) {
      router.push("/cart/?checkout=1");
    } else {
      toast(result.message ?? "Could not add");
    }
  };

  const detailRows = [
    { label: "Materials", value: product.details.material },
    { label: "Fit notes", value: product.details.fitNotes ?? product.details.bestFor },
    { label: "Weather use", value: product.details.weatherUse ?? product.details.waterResistance },
    { label: "Care", value: product.details.care },
    { label: "Shipping", value: product.details.shipping },
  ].filter((row) => row.value);

  return (
    <div className="pt-[4.5rem] md:pt-20">
        <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-12 lg:px-16 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="glass-panel relative aspect-[3/4] overflow-hidden">
                <SafeImage
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="!object-contain p-8 md:p-12"
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
                        "relative aspect-square overflow-hidden border bg-mist/20 transition-colors",
                        activeImage === i
                          ? "border-ink shadow-glow-sm"
                          : "border-ink/10 hover:border-ink/30"
                      )}
                    >
                      <SafeImage src={img} alt="" fill className="!object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="font-display text-[10px] tracking-[0.35em] text-muted uppercase">
                  {formatCategories(product)}
                </p>
                <h1 className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] text-ink md:text-4xl lg:text-5xl">
                  {product.name}
                </h1>
                <p className="price-display mt-6 text-2xl text-ink">
                  {formatPrice(product.price)}
                </p>
                {product.limited && (
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <LimitedBadge />
                    <span className="font-display text-[9px] tracking-[0.18em] text-muted uppercase">
                      One available
                    </span>
                  </div>
                )}
                <p className="mt-8 max-w-md text-sm leading-relaxed text-muted">
                  {product.description}
                </p>
              </Reveal>

              <Reveal delay={0.08} className="mt-10">
                <p className="font-display text-[10px] tracking-[0.2em] text-muted uppercase">
                  Size
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={cn(
                        "min-w-[3rem] border px-5 py-3 font-display text-[10px] tracking-[0.15em] uppercase transition-all",
                        size === s
                          ? "border-ink bg-ink text-ivory-warm"
                          : "border-ink/15 text-muted hover:border-ink"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.1} className="mt-8">
                <p className="font-display text-[10px] tracking-[0.2em] text-muted uppercase">
                  Quantity
                </p>
                <div className="mt-4 flex items-center gap-4 text-ink">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-muted hover:text-ink"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="min-w-[2rem] text-center text-sm">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                    className="text-muted hover:text-ink"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  {product.limited && (
                    <span className="text-xs text-muted">Max {maxQty}</span>
                  )}
                </div>
              </Reveal>

              <Reveal delay={0.12} className="mt-10 flex flex-col gap-3">
                <Button onClick={handleAdd} variant="primary" className="w-full">
                  Add to Cart
                </Button>
                <Button onClick={handleReserve} variant="glass" className="w-full">
                  Reserve / Checkout Inquiry
                </Button>
                <Button href={INSTAGRAM_URL} external variant="ghost" className="w-full">
                  Inquire on Instagram
                </Button>
              </Reveal>

              <p className="mt-6 text-xs leading-relaxed text-muted">
                Checkout is confirmed via Instagram DM while secure payment is
                finalized. Many pieces are limited to one item.
              </p>

              <Link
                href="/cart/"
                className="mt-4 inline-block font-display text-[10px] tracking-[0.15em] text-muted uppercase hover:text-ink"
              >
                View cart
              </Link>
            </div>
          </div>

          <section className="mt-24 border-t border-ink/10 pt-16 md:mt-32">
            <Reveal>
              <h2 className="font-display text-2xl font-medium text-ink">
                Details
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {detailRows.map((row, i) => (
                <Reveal key={row.label} delay={i * 0.05}>
                  <h3 className="font-display text-[10px] tracking-[0.25em] text-muted uppercase">
                    {row.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {row.value}
                  </p>
                </Reveal>
              ))}
            </div>
          </section>
        </div>
    </div>
  );
}
