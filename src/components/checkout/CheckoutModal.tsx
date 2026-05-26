"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart";
import { buildOrderSummary } from "@/lib/order-summary";
import { CHECKOUT_PREP_MESSAGE } from "@/lib/checkout";
import { INSTAGRAM_URL } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

type CheckoutModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { items, total } = useCart();
  const [copied, setCopied] = useState(false);
  const summary = buildOrderSummary(items, total);

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
              Checkout Inquiry
            </p>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              {CHECKOUT_PREP_MESSAGE}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-muted/90">
              Because many pieces are limited to one item, we confirm
              availability before payment.
            </p>

            {items.length > 0 && (
              <div className="mt-8 rounded-sm border border-ink/10 bg-white/30 p-4">
                <p className="font-display text-[9px] tracking-[0.2em] text-muted uppercase">
                  Order summary
                </p>
                <pre className="mt-3 max-h-40 overflow-auto whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-ink">
                  {summary}
                </pre>
                <p className="price-display mt-3 text-sm font-medium text-ink">
                  Total {formatPrice(total)}
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3">
              <Button onClick={handleCopy} variant="glass">
                {copied ? "Copied" : "Copy order summary"}
              </Button>
              <Button href={INSTAGRAM_URL} external variant="primary">
                Open Instagram
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
