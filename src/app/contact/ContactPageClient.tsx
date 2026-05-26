"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import {
  CONTACT_EMAIL,
  CONTACT_MAILTO_HREF,
  INSTAGRAM_HANDLE,
  INSTAGRAM_QR,
  INSTAGRAM_URL,
} from "@/lib/constants";

function buildDraftMessage(form: FormData): string {
  return [
    "HC Pet Fashion — Inquiry Draft",
    "",
    `Name: ${form.get("name")}`,
    `Your email: ${form.get("email")}`,
    `Pet type: ${form.get("petType") || "—"}`,
    "",
    "Message:",
    String(form.get("message") ?? ""),
    "",
    `Send to: ${CONTACT_EMAIL}`,
  ].join("\n");
}

export function ContactPageClient() {
  const [draft, setDraft] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleDraft = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setDraft(buildDraftMessage(form));
  };

  const handleCopy = async () => {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="pt-[4.5rem] md:pt-20">
      <div className="mx-auto max-w-[1100px] px-6 py-16 md:px-12 lg:py-24">
        <Reveal>
          <p className="font-display text-[10px] tracking-[0.38em] text-muted uppercase">
            Contact
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-[-0.03em] text-ink md:text-5xl">
            Fit, sizing, and custom requests.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
            For sizing, custom requests, availability, or order questions, email
            us directly or message us on Instagram.
          </p>

          <a
            href={CONTACT_MAILTO_HREF}
            className="mt-6 inline-block font-display text-base tracking-wide text-ink underline decoration-accent/60 underline-offset-4 transition-colors hover:text-graphite md:text-lg"
          >
            {CONTACT_EMAIL}
          </a>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={CONTACT_MAILTO_HREF} variant="primary">
              Email Us
            </Button>
            <Button href={INSTAGRAM_URL} external variant="glass">
              Message us on Instagram
            </Button>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal delay={0.08}>
            <div className="glass p-8">
              <p className="font-display text-[10px] tracking-[0.2em] text-muted uppercase">
                Email
              </p>
              <a
                href={CONTACT_MAILTO_HREF}
                className="mt-4 block text-sm text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-accent/60"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Best for sizing, custom requests, availability checks, and order
                questions. We reply by email.
              </p>
              <div className="mt-8">
                <Button href={CONTACT_MAILTO_HREF} variant="outline" className="w-full">
                  Email Us
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass p-8">
              <p className="font-display text-[10px] tracking-[0.2em] text-muted uppercase">
                Instagram
              </p>
              <p className="mt-4 text-sm text-ink">{INSTAGRAM_HANDLE}</p>
              <div className="mt-8 flex justify-center">
                <Image
                  src={INSTAGRAM_QR}
                  alt="Instagram QR code"
                  width={200}
                  height={200}
                  className="rounded-sm"
                  unoptimized
                />
              </div>
              <div className="mt-8">
                <Button href={INSTAGRAM_URL} external variant="primary" className="w-full">
                  Message us on Instagram
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-12">
          <div className="glass-panel p-8">
            <p className="font-display text-[10px] tracking-[0.2em] text-muted uppercase">
              Message draft helper
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Optional — compose a draft here, copy it, then paste into your
              email or Instagram message. Nothing is sent from this site.
            </p>

            {draft ? (
              <div className="mt-6">
                <pre className="max-h-48 overflow-auto whitespace-pre-wrap rounded-sm border border-ink/10 bg-white/40 p-4 font-mono text-[11px] leading-relaxed text-ink">
                  {draft}
                </pre>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button onClick={handleCopy} variant="glass">
                    {copied ? "Copied" : "Copy draft"}
                  </Button>
                  <Button href={CONTACT_MAILTO_HREF} variant="primary">
                    Email Us
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setDraft(null)}
                  >
                    Edit draft
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDraft} className="mt-6 space-y-6">
                {[
                  { name: "name", label: "Name", type: "text" },
                  { name: "email", label: "Your email", type: "email" },
                  { name: "petType", label: "Pet type", type: "text" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="font-display text-[10px] tracking-[0.2em] text-muted uppercase">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      required={field.name !== "petType"}
                      className="input-future mt-2 rounded-sm"
                    />
                  </div>
                ))}
                <div>
                  <label className="font-display text-[10px] tracking-[0.2em] text-muted uppercase">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="input-future mt-2 resize-none rounded-sm"
                  />
                </div>
                <Button type="submit" variant="outline">
                  Generate draft
                </Button>
              </form>
            )}
          </div>
        </Reveal>

        <div className="glass-panel mt-8 p-8">
          <h2 className="font-display text-lg font-medium text-ink">Fit help</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Share neck, chest, and back length measurements by email or Instagram.
            We will recommend a size or discuss bespoke adjustments.
          </p>
        </div>

        <section id="shipping" className="mt-24 border-t border-ink/10 pt-16">
          <Reveal>
            <h2 className="font-display text-xl font-medium text-ink">
              Shipping
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Complimentary standard shipping on US orders over $75. Most orders
              ship within 3–5 business days.
            </p>
          </Reveal>
        </section>

        <section id="returns" className="mt-16 border-t border-ink/10 pt-16">
          <Reveal>
            <h2 className="font-display text-xl font-medium text-ink">
              Returns
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Unworn items may be returned within 14 days. Custom and limited
              pieces are final sale — email or message us before ordering.
            </p>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
