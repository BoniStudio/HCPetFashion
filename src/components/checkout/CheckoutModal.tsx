"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
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
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-ink/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="glass fixed left-1/2 top-1/2 z-[201] max-h-[90vh] w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto p-8 md:p-10"
          >
            <p className="font-display text-[10px] tracking-[0.32em] text-muted uppercase">
              Stripe Checkout
            </p>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              {CHECKOUT_PREP_MESSAGE}
            </p>

            {items.length > 0 && (
              <>
                <div className="mt-8 rounded-sm border border-accent/40 bg-accent/15 p-5 text-center">
                  <p className="font-display text-[9px] tracking-[0.22em] text-muted uppercase">
                    Estimated Total
                  </p>
                  <p className="price-display mt-2 text-3xl font-medium text-ink">
                    {formatPrice(total)}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-muted">
                    {STRIPE_AMOUNT_REMINDER}
                  </p>
                </div>

                <div className="mt-6 rounded-sm border border-ink/10 bg-white/30 p-4">
                  <p className="font-display text-[9px] tracking-[0.2em] text-muted uppercase">
                    Your selection
                  </p>
                  <ul className="mt-4 space-y-4">
                    {items.map((item) => (
                      <li
                        key={`${item.productId}-${item.size}`}
                        className="border-b border-ink/5 pb-4 last:border-0 last:pb-0"
                      >
                        <p className="text-sm font-medium text-ink">{item.name}</p>
                        <p className="mt-1 text-xs text-muted">
                          Size {item.size} · Qty {item.quantity} ·{" "}
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 space-y-2 border-t border-ink/10 pt-4 text-sm">
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

            <p className="mt-6 text-xs leading-relaxed text-muted">
              {NO_ACCOUNT_MESSAGE}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted/90">
              {LIMITED_PIECES_MESSAGE}
            </p>

            <div className="mt-8 flex flex-col gap-3">
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
