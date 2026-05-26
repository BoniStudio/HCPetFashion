"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { Reveal } from "@/components/ui/Reveal";
import type { Product } from "@/lib/products";

const perks = [
  {
    title: "Water-repellent finish",
    text: "Light rain rolls off — made for little storms, not heavy downpours.",
  },
  {
    title: "Lightweight comfort",
    text: "Soft structure that moves with your pet, never stiff or bulky.",
  },
  {
    title: "Easy daily wear",
    text: "Quick on, quick off — for city walks and weekend outings.",
  },
];

type FeaturedRainwearProps = {
  products: Product[];
  heroImage?: string;
};

export function FeaturedRainwear({ products, heroImage }: FeaturedRainwearProps) {
  const featured = products[0];
  const image = heroImage ?? featured?.images[0];

  return (
    <section className="border-t border-sand/50 bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
        <Reveal>
          <p className="text-[10px] tracking-[0.35em] text-stone uppercase">
            Signature Rainwear
          </p>
          <h2 className="mt-4 font-display text-3xl font-light text-charcoal md:text-4xl">
            Rainwear made for little storms.
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-warm">
            Designed for small dogs and cats — soft silhouettes with practical
            protection.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {image && (
            <Reveal className="lg:col-span-7">
              <Link
                href={featured ? `/product/${featured.slug}/` : "/shop/?category=raincoat"}
                className="group relative block aspect-[4/5] overflow-hidden border border-sand/60 bg-sand/25 md:aspect-[5/6]"
              >
                <SafeImage
                  src={image}
                  alt="Featured rainwear"
                  fill
                  className="!object-contain p-8 transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </Link>
            </Reveal>
          )}

          <div className="flex flex-col gap-5 lg:col-span-5 lg:justify-center">
            {perks.map((perk, i) => (
              <Reveal key={perk.title} delay={0.08 * i}>
                <div className="border border-sand/60 bg-cream/50 p-8 transition-colors duration-300 hover:border-stone/50">
                  <h3 className="font-display text-lg font-light text-charcoal">
                    {perk.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-warm">
                    {perk.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
