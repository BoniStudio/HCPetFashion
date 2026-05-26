"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/toast";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type AddToCartButtonProps = {
  product: Product;
  size?: string;
  className?: string;
  label?: string;
};

export function AddToCartButton({
  product,
  size,
  className,
  label = "Add to Cart",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);
  const chosenSize = size ?? product.sizes[1] ?? product.sizes[0];

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (busy) return;
    setBusy(true);
    const result = addItem(product, chosenSize, 1);
    if (result.ok) {
      toast("Added to cart");
    } else {
      toast(result.message ?? "Unavailable");
    }
    setTimeout(() => setBusy(false), 400);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "border border-ink/80 bg-ink/90 px-4 py-2.5 font-display text-[9px] tracking-[0.18em] text-ivory-warm uppercase backdrop-blur-sm transition-all duration-300 hover:bg-ink hover:shadow-glow-sm",
        className
      )}
    >
      {label}
    </button>
  );
}
