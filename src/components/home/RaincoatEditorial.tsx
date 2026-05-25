"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { Reveal } from "@/components/ui/Reveal";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

type RaincoatEditorialProps = {
  products: Product[];
};

export function RaincoatEditorial({ products }: RaincoatEditorialProps) {
  const featured = products[0];
  if (!featured) return null;

  const secondary = products.slice(1, 4);

  return (
    <section className="bg-ivory py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
        <Reveal>
          <div className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] tracking-[0.35em] text-stone uppercase">
                Signature Series
              </p>
              <h2 className="mt-4 font-display text-3xl font-light tracking-tight text-charcoal md:text-4xl lg:text-5xl">
                Raincoat Collection
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-warm">
              Waterproof. Premium materials. Real outdoor presence — engineered
              for companions who refuse to stay indoors.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          <Reveal className="md:col-span-8" delay={0.1}>
            <Link
              href={`/product/${featured.slug}/`}
              className="group relative block aspect-[4/5] overflow-hidden bg-sand/20 md:aspect-[5/6]"
            >
              <SafeImage
                src={featured.images[0]}
                alt={featured.name}
                fill
                className="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <p className="text-[10px] tracking-[0.3em] text-ivory/90 uppercase">
                  Featured
                </p>
                <h3 className="mt-2 font-display text-2xl font-light text-ivory md:text-3xl">
                  {featured.name}
                </h3>
                <p className="mt-2 text-sm text-ivory/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {formatPrice(featured.price)}
                </p>
              </div>
            </Link>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 md:col-span-4 md:grid-cols-1 md:gap-5">
            {secondary.map((product, i) => (
              <Reveal key={product.slug} delay={0.15 + i * 0.08}>
                <Link
                  href={`/product/${product.slug}/`}
                  className="group relative block aspect-square overflow-hidden bg-sand/20 md:aspect-[4/3]"
                >
                  <SafeImage
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="transition-transform duration-[1s] ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/25 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div>
                      <p className="text-xs text-ivory">{product.name}</p>
                      <p className="text-[11px] text-ivory/70">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.3} className="mt-16 text-center md:mt-20">
          <Link
            href="/shop/?category=raincoat"
            className="inline-block text-[11px] tracking-[0.25em] text-warm uppercase border-b border-stone/40 pb-1 transition-colors hover:text-charcoal hover:border-charcoal"
          >
            View All Raincoats
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
