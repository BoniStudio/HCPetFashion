import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { INSTAGRAM_URL } from "@/lib/constants";

export function BespokeSection() {
  return (
    <section className="relative overflow-hidden border-y border-ink/5 py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-mist/30 via-transparent to-accent/10"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1000px] px-6 md:px-12">
        <Reveal>
          <div className="glass-panel mx-auto max-w-3xl p-10 text-center md:p-16">
            <p className="font-display text-[10px] tracking-[0.38em] text-muted uppercase">
              Bespoke Panel
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] text-ink md:text-4xl">
              Bespoke sizing for pets with personality.
            </h2>
            <ul className="mx-auto mt-8 max-w-md space-y-2 text-sm text-muted">
              <li>Custom fit inquiry</li>
              <li>Limited one-piece inventory</li>
              <li>Instagram — fastest response</li>
            </ul>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href={INSTAGRAM_URL} external variant="primary">
                Start Custom Inquiry
              </Button>
              <Button href="/contact/" variant="glass">
                View Contact
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
