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

function buildContactMessage(form: FormData): string {
  return [
    "HC Pet Fashion — Contact Inquiry",
    "",
    `Name: ${form.get("name")}`,
    `Email: ${form.get("email")}`,
    `Pet type: ${form.get("petType") || "—"}`,
    "",
    "Message:",
    String(form.get("message") ?? ""),
  ].join("\n");
}

export function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false);
  const [messageCopy, setMessageCopy] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setMessageCopy(buildContactMessage(form));
    setSubmitted(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messageCopy);
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
            Send measurements, rainwear questions, or custom ideas. We respond
            fastest on Instagram.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <Reveal delay={0.08}>
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
                  Open Instagram
                </Button>
              </div>
            </div>

            <div className="glass-panel mt-8 p-8">
              <h2 className="font-display text-lg font-medium text-ink">
                Fit help
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Share neck, chest, and back length measurements in your DM. We
                will recommend a size or discuss bespoke adjustments.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            {submitted ? (
              <div className="glass p-10">
                <p className="font-display text-xl font-medium text-ink">
                  Message saved locally
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Your message is saved locally for now. Please send us a DM on
                  Instagram for the fastest response.
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  <Button onClick={handleCopy} variant="glass">
                    {copied ? "Copied" : "Copy message for Instagram"}
                  </Button>
                  <Button href={INSTAGRAM_URL} external variant="primary">
                    Open Instagram
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass space-y-8 p-8">
                <p className="font-display text-[10px] tracking-[0.2em] text-muted uppercase">
                  Inquiry form
                </p>
                {[
                  { name: "name", label: "Name", type: "text" },
                  { name: "email", label: "Email", type: "email" },
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
                    rows={5}
                    required
                    className="input-future mt-2 resize-none rounded-sm"
                  />
                </div>
                <Button type="submit" variant="primary">
                  Save inquiry
                </Button>
              </form>
            )}
          </Reveal>
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
              pieces are final sale — reach out on Instagram before ordering.
            </p>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
