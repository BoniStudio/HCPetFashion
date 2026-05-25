"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/shop/", label: "Shop" },
  { href: "/contact/", label: "Contact" },
];

export function Header() {
  const { count } = useCart();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 40);
  });

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-sand/50 bg-ivory/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-12 lg:px-16">
        <Link
          href="/"
          className="font-display text-xs font-medium tracking-[0.35em] text-charcoal uppercase md:text-sm"
        >
          HC Pet Fashion
        </Link>

        <nav className="hidden items-center gap-12 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] font-medium tracking-[0.2em] text-warm uppercase transition-colors hover:text-charcoal"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <button
            type="button"
            className="text-[11px] tracking-[0.2em] text-warm uppercase md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            Menu
          </button>
          <Link
            href="/cart/"
            className={cn(
              "relative text-[11px] font-medium tracking-[0.2em] text-warm uppercase",
              "transition-colors hover:text-charcoal"
            )}
          >
            Cart
            {count > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-4 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-charcoal text-[9px] text-ivory"
              >
                {count}
              </motion.span>
            )}
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-sand/50 bg-ivory/95 backdrop-blur-md md:hidden overflow-hidden"
          >
            <nav className="flex flex-col gap-6 px-6 py-8">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[11px] tracking-[0.25em] text-charcoal uppercase"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
