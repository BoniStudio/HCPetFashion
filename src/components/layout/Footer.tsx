import Link from "next/link";

const links = [
  { href: "https://instagram.com", label: "Instagram", external: true },
  { href: "/contact/", label: "Contact", external: false },
  { href: "/contact/#shipping", label: "Shipping", external: false },
  { href: "/contact/#returns", label: "Return Policy", external: false },
];

export function Footer() {
  return (
    <footer className="border-t border-sand/60 bg-cream">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 lg:px-16">
        <div className="flex flex-col gap-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-xs tracking-[0.35em] text-charcoal uppercase">
              HC Pet Fashion
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone">
              Functional luxury for modern pets.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-10 gap-y-4">
            {links.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] tracking-[0.15em] text-warm uppercase transition-colors hover:text-charcoal"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[11px] tracking-[0.15em] text-warm uppercase transition-colors hover:text-charcoal"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>

        <p className="mt-20 text-[10px] tracking-[0.12em] text-stone/80 uppercase">
          © {new Date().getFullYear()} HC Pet Fashion. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
