"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_QR,
  INSTAGRAM_URL,
} from "@/lib/constants";

export function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-20">
      <div className="mx-auto max-w-[1100px] px-6 py-16 md:px-12 lg:py-24">
        <Reveal>
          <p className="text-[10px] tracking-[0.35em] text-stone uppercase">Contact</p>
          <h1 className="mt-4 font-display text-4xl font-light text-charcoal md:text-5xl">
            Let&apos;s find the right piece for your pet.
          </h1>
          <ul className="mt-8 space-y-2 text-sm text-warm">
            <li>— Custom sizing</li>
            <li>— Rainwear questions</li>
            <li>— Limited piece availability</li>
            <li>— Styling help</li>
          </ul>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <Reveal delay={0.08}>
            <div className="border border-sand/60 bg-cream/40 p-8">
              <p className="text-[10px] tracking-[0.2em] text-stone uppercase">
                Instagram
              </p>
              <p className="mt-4 text-sm text-warm">{INSTAGRAM_HANDLE}</p>
              <div className="mt-8 flex justify-center">
                <Image
                  src={INSTAGRAM_QR}
                  alt="Instagram QR code"
                  width={200}
                  height={200}
                  className="border border-sand/50"
                  unoptimized
                />
              </div>
              <div className="mt-8">
                <Button href={INSTAGRAM_URL} external variant="primary" className="w-full">
                  Open Instagram
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            {submitted ? (
              <div className="border border-sand/60 bg-ivory p-10">
                <p className="font-display text-xl font-light text-charcoal">
                  Thank you
                </p>
                <p className="mt-4 text-sm leading-relaxed text-warm">
                  Please also message us on Instagram for the fastest response —
                  especially for custom sizing and limited pieces.
                </p>
                <div className="mt-8">
                  <Button href={INSTAGRAM_URL} external variant="outline">
                    Message on Instagram
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {[
                  { name: "name", label: "Name", type: "text" },
                  { name: "email", label: "Email", type: "email" },
                  { name: "petType", label: "Pet type", type: "text" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="text-[10px] tracking-[0.2em] text-stone uppercase">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      required={field.name !== "petType"}
                      className="mt-2 w-full border-b border-sand bg-transparent py-3 text-charcoal outline-none focus:border-charcoal"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-[10px] tracking-[0.2em] text-stone uppercase">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="mt-2 w-full resize-none border-b border-sand bg-transparent py-3 text-charcoal outline-none focus:border-charcoal"
                  />
                </div>
                <Button type="submit" variant="outline">
                  Send message
                </Button>
              </form>
            )}
          </Reveal>
        </div>

        <section id="shipping" className="mt-24 border-t border-sand/60 pt-16">
          <Reveal>
            <h2 className="font-display text-xl font-light text-charcoal">Shipping</h2>
            <p className="mt-4 text-sm leading-relaxed text-warm">
              Complimentary standard shipping on US orders over $75. Most orders
              ship within 3–5 business days.
            </p>
          </Reveal>
        </section>

        <section id="returns" className="mt-16 border-t border-sand/60 pt-16">
          <Reveal>
            <h2 className="font-display text-xl font-light text-charcoal">
              Return policy
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-warm">
              Unworn items may be returned within 14 days. Custom and limited
              pieces are final sale — reach out on Instagram before ordering.
            </p>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
