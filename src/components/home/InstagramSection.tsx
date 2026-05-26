import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { INSTAGRAM_HANDLE, INSTAGRAM_QR, INSTAGRAM_URL } from "@/lib/constants";

export function InstagramSection() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="text-[10px] tracking-[0.35em] text-stone uppercase">
              Stay close
            </p>
            <h2 className="mt-4 font-display text-3xl font-light text-charcoal">
              Follow us on Instagram
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-warm">
              New drops, sizing help, and custom requests — we reply fastest on
              Instagram.
            </p>
            <p className="mt-4 text-sm text-stone">{INSTAGRAM_HANDLE}</p>
            <div className="mt-10">
              <Button href={INSTAGRAM_URL} external variant="primary">
                Open Instagram
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex justify-center md:justify-end">
            <div className="border border-sand/60 bg-ivory p-6 shadow-soft">
              <Image
                src={INSTAGRAM_QR}
                alt="HC Pet Fashion Instagram QR code"
                width={220}
                height={220}
                className="h-auto w-[200px] md:w-[220px]"
                unoptimized
              />
              <p className="mt-4 text-center text-[10px] tracking-[0.15em] text-stone uppercase">
                Scan to follow
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
