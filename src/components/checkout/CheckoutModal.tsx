"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart";
import {
  CHECKOUT_PREP_MESSAGE,
  LIMITED_PIECES_MESSAGE,
  NO_ACCOUNT_MESSAGE,
  STRIPE_AMOUNT_REMINDER,
} from "@/lib/checkout";
import { STRIPE_PAYMENT_LINK } from "@/lib/constants";
import { buildOrderSummary } from "@/lib/order-summary";
import { formatPrice } from "@/lib/utils";

type CheckoutModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { items, subtotal, shippingEstimate, total } = useCart();
  const [copied, setCopied] = useState(false);

  const totals = useMemo(
    () => ({ subtotal, shipping: shippingEstimate, total }),
    [subtotal, shippingEstimate, total]
  );

  const summary = useMemo(
    () => buildOrderSummary(items, totals),
    [items, totals]
  );

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4 backdrop-blur-md md:p-8"
          style={{
            paddingTop: "max(1rem, env(safe-area-inset-top))",
            paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
            paddingLeft: "max(1rem, env(safe-area-inset-left))",
            paddingRight: "max(1rem, env(safe-area-inset-right))",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass flex w-full max-w-lg flex-col overflow-hidden rounded-sm shadow-editorial"
            style={{
              maxHeight:
                "min(32rem, calc(100dvh - 2rem - env(safe-area-inset-top) - env(safe-area-inset-bottom)))",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 md:px-8 md:py-8">
              <p
                id="checkout-modal-title"
                className="font-display text-[10px] tracking-[0.32em] text-muted uppercase"
              >
                Stripe Checkout
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {CHECKOUT_PREP_MESSAGE}
              </p>

              {items.length > 0 && (
                <>
                  <div className="mt-6 rounded-sm border border-accent/40 bg-accent/15 p-4 text-center md:p-5">
                    <p className="font-display text-[9px] tracking-[0.22em] text-muted uppercase">
                      Estimated Total
                    </p>
                    <p className="price-display mt-2 text-2xl font-medium text-ink md:text-3xl">
                      {formatPrice(total)}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      {STRIPE_AMOUNT_REMINDER}
                    </p>
                  </div>

                  <div className="mt-5 rounded-sm border border-ink/10 bg-white/30 p-4">
                    <p className="font-display text-[9px] tracking-[0.2em] text-muted uppercase">
                      Your selection
                    </p>
                    <ul className="mt-3 space-y-3">
                      {items.map((item) => (
                        <li
                          key={`${item.productId}-${item.size}`}
                          className="border-b border-ink/5 pb-3 last:border-0 last:pb-0"
                        >
                          <p className="text-sm font-medium text-ink">
                            {item.name}
                          </p>
                          <p className="mt-0.5 text-xs text-muted">
                            Size {item.size} · Qty {item.quantity} ·{" "}
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 space-y-2 border-t border-ink/10 pt-3 text-sm">
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
                      <div className="flex justify-between font-medium text-ink">
                        <span>Estimated Total</span>
                        <span className="price-display">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <p className="mt-5 text-xs leading-relaxed text-muted">
                {NO_ACCOUNT_MESSAGE}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted/90">
                {LIMITED_PIECES_MESSAGE}
              </p>
            </div>

            <div className="shrink-0 border-t border-ink/10 bg-white/20 px-6 py-4 backdrop-blur-sm md:px-8 md:py-5">
              <div className="flex flex-col gap-2.5">
                <Button href={STRIPE_PAYMENT_LINK} external variant="primary">
                  Open Stripe Checkout
                </Button>
                <Button onClick={handleCopy} variant="glass">
                  {copied ? "Copied" : "Copy Order Summary"}
                </Button>
                <Button onClick={onClose} variant="ghost">
                  Continue browsing
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
