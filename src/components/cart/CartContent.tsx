"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { SafeImage } from "@/components/ui/SafeImage";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart";
import {
  LIMITED_PIECES_MESSAGE,
  NO_ACCOUNT_MESSAGE,
  STRIPE_MANUAL_AMOUNT_NOTE,
} from "@/lib/checkout";
import { useToast } from "@/lib/toast";
import { formatPrice } from "@/lib/utils";

export function CartContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
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

  useEffect(() => {
    if (searchParams.get("checkout") === "1" && items.length > 0) {
      setCheckoutOpen(true);
      router.replace("/cart/", { scroll: false });
    }
  }, [searchParams, items.length, router]);

  const handleCheckout = () => {
    if (items.length === 0) {
      toast("Your cart is empty");
      return;
    }
    setCheckoutOpen(true);
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-2xl font-medium text-ink md:text-4xl">
          Your cart is quiet.
        </p>
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
          Find a piece for the next little storm.
        </p>
        <div className="mt-10">
          <Button href="/shop/" variant="primary">
            Explore Collection
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
              className="flex flex-col gap-4 border-b border-ink/10 pb-10 sm:flex-row sm:gap-6"
            >
              <Link
                href={`/product/${item.slug}/`}
                className="relative h-40 w-full shrink-0 overflow-hidden glass-panel sm:h-36 sm:w-32"
              >
                <SafeImage
                  src={item.image}
                  alt={item.name}
                  fill
                  className="!object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    href={`/product/${item.slug}/`}
                    className="font-display text-lg font-medium text-ink hover:text-graphite"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-xs text-muted">
                    Size {item.size} · {formatPrice(item.price)} each
                  </p>
                  {item.limited && (
                    <p className="mt-1 font-display text-[9px] tracking-[0.14em] text-muted uppercase">
                      Limited piece
                    </p>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-ink">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.size,
                          item.quantity - 1
                        )
                      }
                      className="text-muted hover:text-ink"
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.size,
                          item.quantity + 1
                        )
                      }
                      className="text-muted hover:text-ink"
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>
                  <p className="price-display text-sm font-medium text-ink">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId, item.size)}
                  className="mt-3 self-start font-display text-[9px] tracking-[0.15em] text-muted uppercase hover:text-ink"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <div id="checkout" className="glass p-8 shadow-glow-sm">
            <p className="font-display text-[10px] tracking-[0.28em] text-muted uppercase">
              Order Summary
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="price-display text-ink">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span className="price-display text-ink">
                  {shippingEstimate === 0
                    ? "Complimentary"
                    : formatPrice(shippingEstimate)}
                </span>
              </div>
              <div className="flex justify-between border-t border-ink/10 pt-4 text-ink">
                <span className="font-medium">Estimated Total</span>
                <span className="price-display font-medium">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-sm border border-accent/40 bg-accent/15 p-4">
              <p className="font-display text-[9px] tracking-[0.22em] text-muted uppercase">
                Amount to enter on Stripe
              </p>
              <p className="price-display mt-2 text-2xl font-medium text-ink">
                {formatPrice(total)}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {STRIPE_MANUAL_AMOUNT_NOTE}
              </p>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted">
              Free US shipping on orders over $75.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {NO_ACCOUNT_MESSAGE}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted/90">
              {LIMITED_PIECES_MESSAGE}
            </p>

            <button
              type="button"
              onClick={handleCheckout}
              className="mt-8 w-full border border-ink bg-ink py-4 font-display text-[10px] tracking-[0.25em] text-ivory-warm uppercase transition-all hover:bg-transparent hover:text-ink"
            >
              Proceed to Stripe Checkout
            </button>
            <button
              type="button"
              onClick={clearCart}
              className="mt-4 w-full font-display text-[9px] tracking-[0.15em] text-muted uppercase hover:text-ink"
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
