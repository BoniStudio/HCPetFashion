"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { Button } from "@/components/ui/Button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useMemo } from "react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

type HeroProps = {
  heroProducts: Product[];
};

const floatingTags = [
  { label: "Limited Drop", pos: "top-[12%] left-[4%] md:left-[8%]" },
  { label: "Rain Ready", pos: "top-[18%] right-[6%] md:right-[12%]" },
  { label: "Bespoke", pos: "bottom-[28%] left-[6%] md:left-[10%]" },
  { label: "Curated in Asia", pos: "bottom-[22%] right-[4%] md:right-[8%]" },
];

export function Hero({ heroProducts }: HeroProps) {
  const hero = useMemo(
    () =>
      heroProducts.find((p) => p.slug === "dino-rain-shell") ??
      heroProducts.find((p) => p.categories.includes("raincoat")) ??
      heroProducts[0],
    [heroProducts]
  );
  const heroImage = hero?.images[0] ?? "/products/placeholder.svg";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  return (
    <section
      className="relative min-h-screen overflow-hidden pt-[4.5rem] md:pt-20"
      onMouseMove={onMouseMove}
    >
      {/* Background — atmosphere only, no logo */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-mist/25 via-ivory to-accent/10" />
        <div className="glow-orb absolute -right-24 top-24 h-80 w-80 rounded-full bg-mist/40 blur-3xl md:h-[420px] md:w-[420px]" />
        <div className="absolute bottom-16 left-8 h-48 w-48 rounded-full bg-accent/15 blur-3xl md:h-64 md:w-64" />
        <div className="absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-silver/20 blur-[80px]" />
      </div>

      {/* Mid-layer — small floating tags, edges only */}
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        {floatingTags.map((tag, i) => (
          <motion.span
            key={tag.label}
            className={`absolute hidden rounded-full border border-white/30 bg-white/20 px-3 py-1.5 font-display text-[8px] tracking-[0.22em] text-ink/70 uppercase backdrop-blur-md md:inline-block ${tag.pos}`}
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 5 + i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {tag.label}
          </motion.span>
        ))}
      </div>

      {/* Foreground — typography + product */}
      <div className="relative z-[2] mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-[1400px] grid-cols-1 items-center gap-10 px-6 py-14 md:min-h-[calc(100vh-5rem)] md:grid-cols-2 md:gap-12 md:px-12 lg:gap-16 lg:px-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 flex flex-col justify-center md:order-1"
        >
          <p className="font-display text-[10px] tracking-[0.38em] text-muted uppercase">
            HC Pet Fashion / Cyber Boutique
          </p>
          <h1 className="mt-8 font-display font-medium text-ink">
            <span className="block text-[2.5rem] leading-[1.05] tracking-[-0.03em] md:text-[3.25rem] lg:text-[3.75rem]">
              Rainwear
            </span>
            <span className="mt-2 block text-[2rem] leading-[1.1] tracking-[-0.02em] text-muted md:mt-3 md:text-[2.5rem] lg:text-[2.75rem]">
              for
            </span>
            <span className="mt-2 block text-[2.5rem] leading-[1.05] tracking-[-0.03em] md:mt-3 md:text-[3.25rem] lg:text-[3.75rem]">
              Little Storms.
            </span>
          </h1>
          <p className="mt-10 max-w-md text-[15px] leading-relaxed text-muted md:text-base">
            Curated Asian pet fashion for modern companions — limited rainwear,
            soft silhouettes, and bespoke pieces.
          </p>
          <div className="mt-12 flex flex-wrap gap-3 md:gap-4">
            <Button href="/shop/" variant="primary">
              Explore Collection
            </Button>
            <Button href="/shop/?category=raincoat" variant="glass">
              Rainwear Edit
            </Button>
          </div>
        </motion.div>

        <motion.div
          style={{ rotateX, rotateY, perspective: 1200 }}
          className="relative order-1 md:order-2"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-ink/5 bg-gradient-to-b from-white/40 to-mist/20 shadow-editorial md:aspect-[3/4]">
            <SafeImage
              src={heroImage}
              alt={hero?.name ?? "Pet rainwear"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
              className="!object-cover object-center"
            />
            {hero && (
              <Link
                href={`/product/${hero.slug}/`}
                className="absolute bottom-3 right-3 max-w-[200px] rounded-sm border border-white/40 bg-white/45 px-3 py-2.5 backdrop-blur-md transition-colors hover:bg-white/55 md:bottom-4 md:right-4 md:px-4 md:py-3"
              >
                <p className="font-display text-[9px] tracking-[0.18em] text-muted uppercase">
                  {hero.name}
                </p>
                <p className="price-display mt-0.5 text-sm font-medium text-ink">
                  {formatPrice(hero.price)}
                </p>
                <p className="mt-1 text-[9px] leading-snug text-muted/90">
                  One curated piece available
                </p>
              </Link>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-8"
      >
        <span className="font-display text-[8px] tracking-[0.35em] text-muted/80 uppercase">
          Scroll
        </span>
        <motion.span
          className="h-8 w-px bg-ink/15"
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
