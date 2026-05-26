import { Suspense } from "react";
import { CartContent } from "@/components/cart/CartContent";
import { Reveal } from "@/components/ui/Reveal";

export default function CartPage() {
  return (
    <div className="pt-20">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 lg:px-16 lg:py-24">
        <Reveal>
          <h1 className="font-display text-4xl font-light text-charcoal">Cart</h1>
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
