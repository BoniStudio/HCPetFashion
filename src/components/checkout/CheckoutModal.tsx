"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CHECKOUT_PREP_MESSAGE } from "@/lib/checkout";
import { INSTAGRAM_URL } from "@/lib/constants";

type CheckoutModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-charcoal/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed left-1/2 top-1/2 z-[201] w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 border border-sand/60 bg-ivory p-8 md:p-10"
          >
            <p className="text-[10px] tracking-[0.3em] text-stone uppercase">
              Checkout
            </p>
            <p className="mt-6 text-sm leading-relaxed text-warm">
              {CHECKOUT_PREP_MESSAGE}
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Button href={INSTAGRAM_URL} external variant="primary">
                Message on Instagram
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
