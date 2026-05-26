import Link from "next/link";
import { INSTAGRAM_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-sand/60 bg-cream">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-xs tracking-[0.35em] text-charcoal uppercase">
              HC Pet Fashion
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone">
              Soft luxury rainwear and bespoke pieces for modern pets.
            </p>
          </div>

          <nav className="flex flex-col gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.15em] text-warm uppercase transition-colors hover:text-charcoal"
            >
              Instagram
            </a>
            <Link
              href="/contact/"
              className="text-[11px] tracking-[0.15em] text-warm uppercase transition-colors hover:text-charcoal"
            >
              Contact
            </Link>
            <Link
              href="/shop/"
              className="text-[11px] tracking-[0.15em] text-warm uppercase transition-colors hover:text-charcoal"
            >
              Shop
            </Link>
          </nav>

          <div className="text-sm leading-relaxed text-stone">
            <p>
              <span className="text-[10px] tracking-[0.2em] uppercase text-warm">
                Shipping
              </span>
              <br />
              Complimentary US shipping on orders over $75. Ships in 3–5 business
              days.
            </p>
            <p className="mt-6">
              <span className="text-[10px] tracking-[0.2em] uppercase text-warm">
                Returns
              </span>
              <br />
              Unworn items within 14 days. Custom pieces are final sale.
            </p>
          </div>
        </div>

        <p className="mt-16 text-[10px] tracking-[0.12em] text-stone/80 uppercase">
          © 2026 HC Pet Fashion. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
