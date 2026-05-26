"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { SafeImage } from "@/components/ui/SafeImage";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart";
import { createCheckoutSession } from "@/lib/checkout";
import { formatPrice } from "@/lib/utils";

export function CartContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    shippingEstimate,
    total,
  } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    if (searchParams.get("checkout") === "1" && items.length > 0) {
      setCheckoutOpen(true);
      router.replace("/cart/", { scroll: false });
    }
  }, [searchParams, items.length, router]);

  const handleCheckout = async () => {
    setCheckingOut(true);
    const result = await createCheckoutSession(items);
    setCheckingOut(false);

    if (result.ok) {
      window.location.href = result.url;
      return;
    }
    setCheckoutOpen(true);
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-2xl font-light text-charcoal md:text-3xl">
          Your cart is quiet.
        </p>
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-stone">
          Explore rainwear and bespoke pieces for your companion.
        </p>
        <div className="mt-10">
          <Button href="/shop/" variant="outline">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {items.map((item) => (
            <motion.div
              key={`${item.productId}-${item.size}`}
              layout
              className="flex flex-col gap-4 border-b border-sand/50 pb-10 sm:flex-row sm:gap-6"
            >
              <Link
                href={`/product/${item.slug}/`}
                className="relative h-36 w-full shrink-0 overflow-hidden border border-sand/40 bg-sand/25 sm:h-32 sm:w-28"
              >
                <SafeImage src={item.image} alt={item.name} fill className="!object-cover" />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    href={`/product/${item.slug}/`}
                    className="font-display text-lg font-light text-charcoal hover:text-espresso"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-xs text-stone">
                    Size {item.size} · {formatPrice(item.price)} each
                  </p>
                  {item.limited && (
                    <p className="mt-1 text-[10px] tracking-[0.12em] text-stone uppercase">
                      Limited piece
                    </p>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                      className="text-stone hover:text-charcoal"
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                      className="text-stone hover:text-charcoal"
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm font-medium text-charcoal">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId, item.size)}
                  className="mt-3 self-start text-[10px] tracking-[0.15em] text-stone uppercase hover:text-charcoal"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <div id="checkout" className="glass border border-sand/60 p-8">
            <p className="text-[10px] tracking-[0.25em] text-stone uppercase">
              Order Summary
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-warm">
                <span>Subtotal</span>
                <span className="text-charcoal">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-warm">
                <span>Shipping estimate</span>
                <span className="text-charcoal">
                  {shippingEstimate === 0 ? "Complimentary" : formatPrice(shippingEstimate)}
                </span>
              </div>
              <div className="flex justify-between border-t border-sand/50 pt-4 text-charcoal">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-stone">
              Free US shipping on orders over $75.
            </p>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={checkingOut}
              className="mt-8 w-full border border-charcoal bg-charcoal py-4 text-[11px] tracking-[0.25em] text-ivory uppercase transition-colors hover:bg-transparent hover:text-charcoal disabled:opacity-50"
            >
              {checkingOut ? "Processing…" : "Checkout"}
            </button>
            <button
              type="button"
              onClick={clearCart}
              className="mt-4 w-full text-[10px] tracking-[0.15em] text-stone uppercase hover:text-charcoal"
            >
              Clear cart
            </button>
          </div>
        </div>
      </div>

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}
