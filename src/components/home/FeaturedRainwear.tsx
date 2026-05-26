"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { Reveal } from "@/components/ui/Reveal";
import type { Product } from "@/lib/products";

const perks = [
  {
    title: "Water-repellent finish",
    text: "A light shell that sheds drizzle — made for little storms, not heavy downpours.",
  },
  {
    title: "Lightweight comfort",
    text: "Soft structure that moves with your companion, never stiff or bulky.",
  },
  {
    title: "Limited boutique pieces",
    text: "Small-batch rainwear with quiet silhouettes — many styles are one-of-one.",
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
    <section className="relative border-t border-ink/5 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
        <Reveal>
          <p className="font-display text-[10px] tracking-[0.38em] text-muted uppercase">
            Rainwear Tech
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] text-ink md:text-4xl lg:text-5xl">
            Designed for Rain, Styled for the City.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {image && (
            <Reveal className="lg:col-span-7">
              <Link
                href={
                  featured
                    ? `/product/${featured.slug}/`
                    : "/shop/?category=raincoat"
                }
                className="group glass-panel relative block aspect-[4/5] overflow-hidden md:aspect-[5/6]"
              >
                <SafeImage
                  src={image}
                  alt="Featured rainwear"
                  fill
                  className="!object-contain p-10 transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </Link>
            </Reveal>
          )}

          <div className="flex flex-col gap-5 lg:col-span-5 lg:justify-center">
            {perks.map((perk, i) => (
              <Reveal key={perk.title} delay={0.08 * i}>
                <div className="glass group p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-sm">
                  <h3 className="font-display text-lg font-medium text-ink">
                    {perk.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
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
