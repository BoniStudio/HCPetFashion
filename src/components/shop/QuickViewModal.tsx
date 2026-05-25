"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { assetPath, formatPrice } from "@/lib/utils";

type QuickViewModalProps = {
  product: Product | null;
  onClose: () => void;
};

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-[101] w-[92vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 bg-ivory p-6 md:p-10"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 text-[10px] tracking-[0.2em] text-stone uppercase hover:text-charcoal"
            >
              Close
            </button>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="relative aspect-[3/4] bg-sand/20">
                <Image
                  src={assetPath(product.image)}
                  alt={product.name}
                  fill
                  className="img-editorial"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[10px] tracking-[0.3em] text-stone uppercase">
                  Quick View
                </p>
                <h2 className="mt-4 font-display text-2xl font-light text-charcoal">
                  {product.name}
                </h2>
                <p className="mt-4 text-sm text-warm leading-relaxed">
                  {product.description}
                </p>
                <p className="mt-6 text-lg text-charcoal">
                  {formatPrice(product.price)}
                </p>
                <Link
                  href={`/product/${product.slug}/`}
                  onClick={onClose}
                  className="mt-8 inline-flex w-fit border border-charcoal px-8 py-3 text-[11px] tracking-[0.2em] uppercase transition-colors hover:bg-charcoal hover:text-ivory"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
