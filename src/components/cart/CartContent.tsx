"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { CHECKOUT_API_PATH } from "@/lib/checkout-api.example";
import { assetPath, formatPrice } from "@/lib/utils";

export function CartContent() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  const handleCheckout = async () => {
    // Reserved for Stripe — requires server deployment (Vercel/Node)
    // Static GitHub Pages: use external checkout or serverless function URL
    try {
      const res = await fetch(CHECKOUT_API_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) window.location.href = data.url;
      }
    } catch {
      alert(
        "Checkout API is not available on static hosting. Deploy with Stripe server route on Vercel, or configure NEXT_PUBLIC_STRIPE_CHECKOUT_URL."
      );
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <p className="font-display text-2xl font-light text-charcoal">
          Your cart is empty
        </p>
        <Link
          href="/shop/"
          className="mt-8 border-b border-stone/50 pb-1 text-[11px] tracking-[0.2em] text-warm uppercase hover:text-charcoal"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-10">
        {items.map((item) => (
          <motion.div
            key={`${item.productId}-${item.size}`}
            layout
            className="flex gap-6 border-b border-sand/50 pb-10"
          >
            <div className="relative h-32 w-28 shrink-0 overflow-hidden bg-sand/25">
              <Image
                src={assetPath(item.image)}
                alt={item.name}
                fill
                className="img-editorial"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <Link
                  href={`/product/${item.slug}/`}
                  className="font-display text-lg font-light text-charcoal hover:text-espresso"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-xs text-stone">Size {item.size}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.productId, item.size, item.quantity - 1)
                    }
                    className="text-stone hover:text-charcoal"
                  >
                    −
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.productId, item.size, item.quantity + 1)
                    }
                    className="text-stone hover:text-charcoal"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-charcoal">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.productId, item.size)}
                className="mt-2 self-start text-[10px] tracking-[0.15em] text-stone uppercase hover:text-charcoal"
              >
                Remove
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="glass p-8">
          <p className="text-[10px] tracking-[0.25em] text-stone uppercase">
            Order Summary
          </p>
          <div className="mt-6 flex justify-between text-sm">
            <span className="text-warm">Subtotal</span>
            <span className="text-charcoal">{formatPrice(total)}</span>
          </div>
          <p className="mt-4 text-xs text-stone">
            Shipping calculated at checkout.
          </p>
          <button
            type="button"
            onClick={handleCheckout}
            className="mt-8 w-full border border-charcoal bg-charcoal py-4 text-[11px] tracking-[0.25em] text-ivory uppercase transition-colors hover:bg-transparent hover:text-charcoal"
          >
            Checkout
          </button>
          <button
            type="button"
            onClick={clearCart}
            className="mt-4 w-full text-[10px] tracking-[0.15em] text-stone uppercase hover:text-charcoal"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
