"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/shop/", label: "Shop" },
  { href: "/contact/", label: "Contact" },
  { href: "/cart/", label: "Cart" },
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
          ? "glass border-b border-ink/5 shadow-soft"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[1400px] items-center justify-between px-6 md:h-20 md:px-12 lg:px-16">
        <Logo size="md" />

        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative font-display text-[10px] font-medium tracking-[0.22em] text-muted uppercase transition-colors hover:text-ink"
            >
              {item.label}
              {item.href === "/cart/" && count > 0 && (
                <span className="absolute -right-5 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[9px] text-ivory-warm">
                  {count}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex items-center gap-2 font-display text-[10px] tracking-[0.2em] text-muted uppercase md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <Logo size="sm" showWordmark={false} href={undefined} />
          Menu
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden glass border-t border-ink/5 md:hidden"
          >
            <nav className="flex flex-col gap-6 px-6 py-8">
              <Logo size="md" />
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-[11px] tracking-[0.25em] text-ink uppercase"
                >
                  {item.label}
                  {item.href === "/cart/" && count > 0 ? ` (${count})` : ""}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
