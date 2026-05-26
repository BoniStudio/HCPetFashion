"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
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
  const [feedback, setFeedback] = useState<string | null>(null);
  const chosenSize = size ?? product.sizes[1] ?? product.sizes[0];

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = addItem(product, chosenSize, 1);
    if (result.ok) {
      setFeedback("Added");
      setTimeout(() => setFeedback(null), 1800);
    } else {
      setFeedback(result.message ?? "Unavailable");
      setTimeout(() => setFeedback(null), 2500);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "border border-charcoal/80 px-4 py-2.5 text-[10px] tracking-[0.18em] text-charcoal uppercase transition-all duration-300 hover:bg-charcoal hover:text-ivory",
        className
      )}
    >
      {feedback ?? label}
    </button>
  );
}
