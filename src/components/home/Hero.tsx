"use client";

import { SafeImage } from "@/components/ui/SafeImage";
import { Button } from "@/components/ui/Button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import type { Product } from "@/lib/products";

type HeroProps = {
  heroProducts: Product[];
};

export function Hero({ heroProducts }: HeroProps) {
  const images =
    heroProducts.length > 0
      ? heroProducts.flatMap((p) => p.images.slice(0, 2)).slice(0, 5)
      : ["/products/placeholder.svg"];

  const [index, setIndex] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const imageX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const imageY = useTransform(springY, [-0.5, 0.5], [-6, 6]);

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
            Premium rainwear and bespoke pet fashion for stylish companions.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/shop/" variant="outline">
              Explore Collection
            </Button>
            <Button href="/shop/?category=raincoat" variant="ghost">
              Raincoat Series
            </Button>
          </div>
        </motion.div>

        <motion.div
          style={{ x: imageX, y: imageY }}
          className="relative order-1 aspect-[4/5] w-full md:order-2 md:aspect-[3/4] lg:aspect-[4/5]"
        >
          <div className="absolute inset-0 rounded-sm bg-sand/40 shadow-editorial">
            {images.map((src, i) => (
              <motion.div
                key={src + i}
                className="absolute inset-0 overflow-hidden"
                initial={false}
                animate={{
                  opacity: i === index ? 1 : 0,
                  scale: i === index ? 1 : 1.02,
                }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <SafeImage
                  src={src}
                  alt="HC Pet Fashion rainwear"
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="!object-contain p-6 md:p-10"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
