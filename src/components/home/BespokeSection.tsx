import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { INSTAGRAM_URL } from "@/lib/constants";

export function BespokeSection() {
  return (
    <section className="border-y border-sand/50 bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-[900px] px-6 text-center md:px-12">
        <Reveal>
          <p className="text-[10px] tracking-[0.35em] text-stone uppercase">
            Bespoke
          </p>
          <h2 className="mt-4 font-display text-3xl font-light leading-snug text-charcoal md:text-4xl">
            Bespoke pieces for pets with personality.
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-warm">
            Custom sizing and one-of-one details — share your pet&apos;s measurements
            on Instagram and we&apos;ll guide you through the fit.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact/" variant="outline">
              Contact for Custom Order
            </Button>
            <Button href={INSTAGRAM_URL} external variant="ghost">
              DM on Instagram
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
