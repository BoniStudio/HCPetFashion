import { Reveal } from "@/components/ui/Reveal";

export default function ContactPage() {
  return (
    <div className="pt-20">
      <div className="mx-auto max-w-[900px] px-6 py-16 md:px-12 lg:py-24">
        <Reveal>
          <p className="text-[10px] tracking-[0.35em] text-stone uppercase">
            Get in Touch
          </p>
          <h1 className="mt-4 font-display text-4xl font-light text-charcoal">
            Contact
          </h1>
          <p className="mt-8 text-sm leading-relaxed text-warm">
            For bespoke orders, sizing guidance, or wholesale inquiries — we
            respond within 1–2 business days.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          <form className="space-y-8" action="mailto:hello@hcpetfashion.com">
            <div>
              <label className="text-[10px] tracking-[0.2em] text-stone uppercase">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="mt-2 w-full border-b border-sand bg-transparent py-3 text-charcoal outline-none focus:border-charcoal"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.2em] text-stone uppercase">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="mt-2 w-full border-b border-sand bg-transparent py-3 text-charcoal outline-none focus:border-charcoal"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.2em] text-stone uppercase">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                className="mt-2 w-full resize-none border-b border-sand bg-transparent py-3 text-charcoal outline-none focus:border-charcoal"
              />
            </div>
            <button
              type="submit"
              className="border border-charcoal px-12 py-4 text-[11px] tracking-[0.25em] text-charcoal uppercase transition-colors hover:bg-charcoal hover:text-ivory"
            >
              Send
            </button>
          </form>
        </Reveal>

        <section id="shipping" className="mt-24 border-t border-sand/60 pt-16">
          <Reveal>
            <h2 className="font-display text-xl font-light text-charcoal">
              Shipping
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-warm">
              Complimentary standard shipping on orders over $75 within the
              continental United States. International shipping available at
              calculated rates.
            </p>
          </Reveal>
        </section>

        <section id="returns" className="mt-16 border-t border-sand/60 pt-16">
          <Reveal>
            <h2 className="font-display text-xl font-light text-charcoal">
              Return Policy
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-warm">
              Unworn items may be returned within 14 days of delivery. Custom
              pieces are final sale. Contact us for a return authorization.
            </p>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
