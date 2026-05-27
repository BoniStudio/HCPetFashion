import { Suspense } from "react";
import { CartContent } from "@/components/cart/CartContent";
import { Reveal } from "@/components/ui/Reveal";
import { STRIPE_PAYMENT_LINK } from "@/lib/constants";

export default function CartPage() {
  return (
    <div className="pt-[4.5rem] md:pt-20">
      <a href={STRIPE_PAYMENT_LINK} className="sr-only">
        Proceed to Stripe Checkout
      </a>
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 lg:px-16 lg:py-24">
        <Reveal>
          <p className="font-display text-[10px] tracking-[0.38em] text-muted uppercase">
            Cart
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-[-0.03em] text-ink md:text-5xl">
            Your Selection
          </h1>
        </Reveal>
        <div className="mt-16">
          <Suspense fallback={<div className="min-h-[40vh]" />}>
            <CartContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
