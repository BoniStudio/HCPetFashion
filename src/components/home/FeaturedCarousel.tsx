"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import type { Product } from "@/lib/products";
import { assetPath, formatPrice } from "@/lib/utils";

type FeaturedCarouselProps = {
  products: Product[];
};

export function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="overflow-hidden bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
        <Reveal>
          <p className="text-[10px] tracking-[0.35em] text-stone uppercase">
            Curated Selection
          </p>
          <h2 className="mt-4 font-display text-3xl font-light text-charcoal md:text-4xl">
            Editor&apos;s Picks
          </h2>
        </Reveal>
      </div>

      <div
        ref={scrollRef}
        className="no-scrollbar mt-14 flex gap-6 overflow-x-auto px-6 pb-4 md:mt-20 md:gap-8 md:px-12 lg:px-16"
      >
        {products.map((product, i) => (
          <motion.div
            key={product.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-[72vw] shrink-0 sm:w-[320px] md:w-[360px] lg:w-[400px]"
          >
            <Link
              href={`/product/${product.slug}/`}
              className="group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-sand/25 shadow-soft transition-shadow duration-500 group-hover:shadow-hover">
                <Image
                  src={assetPath(product.image)}
                  alt={product.name}
                  fill
                  className="img-editorial transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  sizes="400px"
                />
                <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/5" />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 translate-y-4 bg-ivory/80 p-6 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <p className="font-display text-lg font-light text-charcoal">
                    {product.name}
                  </p>
                  <p className="mt-1 text-sm text-stone">
                    {formatPrice(product.price)}
                  </p>
                </motion.div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
