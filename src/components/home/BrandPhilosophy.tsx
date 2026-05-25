"use client";

import { Reveal } from "@/components/ui/Reveal";

export function BrandPhilosophy() {
  return (
    <section className="bg-ivory py-32 md:py-48">
      <div className="mx-auto max-w-[900px] px-6 text-center md:px-12">
        <Reveal>
          <p className="font-display text-2xl font-light leading-relaxed tracking-tight text-charcoal md:text-4xl md:leading-snug">
            Functional luxury for modern pets.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-10 max-w-lg text-sm leading-relaxed text-stone">
            Every piece is designed with editorial restraint — premium materials,
            thoughtful tailoring, and quiet confidence for companions who
            deserve the exceptional.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
