"use client";

import { SafeImage } from "@/components/ui/SafeImage";
import { Button } from "@/components/ui/Button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback } from "react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

type HeroProps = {
  heroProducts: Product[];
};

const floatingTags = ["Limited", "Rain-ready", "Bespoke"];

export function Hero({ heroProducts }: HeroProps) {
  const hero = heroProducts[0];
  const heroImage = hero?.images[0] ?? "/products/placeholder.svg";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

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
      <div
        className="glow-orb pointer-events-none absolute -right-20 top-32 h-[420px] w-[420px] rounded-full bg-mist/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-20 left-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
        aria-hidden
      />

      <div className="mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-[1400px] grid-cols-1 items-center gap-12 px-6 py-16 md:min-h-[calc(100vh-5rem)] md:grid-cols-2 md:gap-8 md:px-12 lg:px-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 flex flex-col justify-center md:order-1"
        >
          <p className="font-display text-[10px] tracking-[0.42em] text-muted uppercase">
            HC Pet Fashion / Cyber Boutique
          </p>
          <h1 className="mt-6 font-display text-[2.75rem] font-medium leading-[0.95] tracking-[-0.03em] text-ink md:text-6xl lg:text-7xl">
            Rainwear for
            <br />
            Little Storms.
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted">
            Curated Asian pet fashion for modern companions — limited rainwear,
            soft silhouettes, and bespoke pieces.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
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
          <div className="glass-panel relative aspect-[4/5] w-full overflow-hidden shadow-editorial md:aspect-[3/4]">
            <SafeImage
              src={heroImage}
              alt={hero?.name ?? "HC Pet Fashion rainwear"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="!object-contain p-8 md:p-12"
            />
            {hero && (
              <div className="glass absolute bottom-6 left-6 px-4 py-3">
                <p className="font-display text-[10px] tracking-[0.2em] text-muted uppercase">
                  {hero.name}
                </p>
                <p className="price-display mt-1 text-sm text-ink">
                  {formatPrice(hero.price)}
                </p>
              </div>
            )}
          </div>

          {floatingTags.map((tag, i) => (
            <motion.span
              key={tag}
              className="glass absolute rounded-full px-4 py-2 font-display text-[9px] tracking-[0.25em] text-ink uppercase"
              style={{
                top: `${18 + i * 22}%`,
                right: i % 2 === 0 ? "-4%" : "8%",
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {tag}
            </motion.span>
          ))}

          <div
            className="glass-accent absolute -left-4 top-1/4 hidden h-24 w-12 rounded-full md:block"
            aria-hidden
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-display text-[9px] tracking-[0.35em] text-muted uppercase">
          Scroll
        </span>
        <motion.span
          className="h-10 w-px bg-ink/20"
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
