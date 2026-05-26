import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { INSTAGRAM_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-graphite text-ivory-warm">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <Logo size="md" className="[&_span]:text-ivory-warm" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-silver/90">
              Curated pet fashion for modern companions.
            </p>
            <p className="mt-4 text-[10px] tracking-[0.15em] text-silver/60 uppercase">
              hcpetfashion.red
            </p>
          </div>

          <nav className="flex flex-col gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.18em] text-silver uppercase transition-colors hover:text-accent"
            >
              Instagram
            </a>
            <Link
              href="/shop/"
              className="text-[11px] tracking-[0.18em] text-silver uppercase transition-colors hover:text-accent"
            >
              Shop
            </Link>
            <Link
              href="/contact/"
              className="text-[11px] tracking-[0.18em] text-silver uppercase transition-colors hover:text-accent"
            >
              Contact
            </Link>
            <Link
              href="/contact/#shipping"
              className="text-[11px] tracking-[0.18em] text-silver uppercase transition-colors hover:text-accent"
            >
              Shipping
            </Link>
            <Link
              href="/contact/#returns"
              className="text-[11px] tracking-[0.18em] text-silver uppercase transition-colors hover:text-accent"
            >
              Returns
            </Link>
          </nav>

          <div className="text-sm leading-relaxed text-silver/80">
            <p>
              <span className="text-[10px] tracking-[0.2em] uppercase text-silver/60">
                Shipping
              </span>
              <br />
              Complimentary US shipping on orders over $75. Ships in 3–5 business
              days.
            </p>
            <p className="mt-6">
              <span className="text-[10px] tracking-[0.2em] uppercase text-silver/60">
                Returns
              </span>
              <br />
              Unworn items within 14 days. Custom pieces are final sale.
            </p>
          </div>
        </div>

        <p className="mt-16 text-[10px] tracking-[0.12em] text-silver/50 uppercase">
          © 2026 HC Pet Fashion. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
