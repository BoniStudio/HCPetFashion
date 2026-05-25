"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { assetPath } from "@/lib/utils";

type HeroProps = {
  heroProducts: Product[];
};

export function Hero({ heroProducts }: HeroProps) {
  const images =
    heroProducts.length > 0
      ? heroProducts.flatMap((p) => p.images.slice(0, 2)).slice(0, 5)
      : ["/products/placeholder.jpg"];

  const [index, setIndex] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const imageX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const imageY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [images.length]);

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
      className="relative min-h-screen overflow-hidden bg-cream pt-20"
      onMouseMove={onMouseMove}
    >
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1400px] grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2 md:gap-8 md:px-12 lg:px-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center order-2 md:order-1"
        >
          <p className="text-[10px] tracking-[0.4em] text-stone uppercase">
            Luxury Pet Fashion
          </p>
          <h1 className="mt-6 font-display text-4xl font-light leading-[1.1] tracking-tight text-charcoal md:text-5xl lg:text-6xl">
            Crafted for
            <br />
            Rainy Days.
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-warm">
            Designed for stylish companions. Premium rainwear and bespoke
            pieces for the modern pet wardrobe.
          </p>
          <div className="mt-12 flex flex-wrap gap-6">
            <Link
              href="/shop/"
              className="inline-flex items-center border border-charcoal px-10 py-4 text-[11px] tracking-[0.25em] text-charcoal uppercase transition-all hover:bg-charcoal hover:text-ivory"
            >
              Explore Collection
            </Link>
            <Link
              href="/shop/?category=raincoat"
              className="inline-flex items-center px-4 py-4 text-[11px] tracking-[0.2em] text-stone uppercase transition-colors hover:text-charcoal"
            >
              Raincoat Series
            </Link>
          </div>
        </motion.div>

        <motion.div
          style={{ x: imageX, y: imageY }}
          className="relative order-1 aspect-[4/5] w-full md:order-2 md:aspect-[3/4] lg:aspect-[4/5]"
        >
          <div className="absolute inset-0 rounded-sm shadow-editorial">
            {images.map((src, i) => (
              <motion.div
                key={src + i}
                className="absolute inset-0 overflow-hidden bg-sand/20"
                initial={false}
                animate={{
                  opacity: i === index ? 1 : 0,
                  scale: i === index ? 1 : 1.04,
                }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={assetPath(src)}
                  alt="HC Pet Fashion editorial"
                  fill
                  priority={i === 0}
                  className="img-editorial"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/10 via-transparent to-transparent" />
              </motion.div>
            ))}
          </div>

          <div className="absolute -bottom-4 -left-4 hidden h-24 w-24 border border-sand/80 md:block" />
          <div className="absolute -right-6 top-1/4 hidden h-32 w-px bg-stone/30 md:block" />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <span className="text-[9px] tracking-[0.3em] text-stone uppercase">
          Scroll
        </span>
        <div className="h-10 w-px bg-stone/40" />
      </motion.div>
    </section>
  );
}
