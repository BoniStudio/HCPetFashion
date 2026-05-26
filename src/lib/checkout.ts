import type { CartItem } from "./cart";

export type CheckoutResult =
  | { ok: true; url: string }
  | { ok: false; reason: "static_hosting" | "not_configured" | "empty_cart" };

/**
 * Stripe Checkout session — server-side only.
 *
 * TODO (Vercel Serverless): app/api/checkout/route.ts
 *   import Stripe from "stripe";
 *   export async function POST(req) { ... stripe.checkout.sessions.create(...) }
 *
 * TODO (Netlify Function): netlify/functions/create-checkout.ts
 *
 * TODO (Cloudflare Worker): workers/checkout.ts — proxy to Stripe API with secret in env
 *
 * Never expose STRIPE_SECRET_KEY in this file or any client bundle.
 */
export async function createCheckoutSession(
  cartItems: CartItem[]
): Promise<CheckoutResult> {
  if (!cartItems.length) {
    return { ok: false, reason: "empty_cart" };
  }

  const apiUrl = process.env.NEXT_PUBLIC_CHECKOUT_API_URL;

  if (apiUrl) {
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });
      if (res.ok) {
        const data = (await res.json()) as { url?: string };
        if (data.url) return { ok: true, url: data.url };
      }
    } catch {
      /* fall through */
    }
  }

  return { ok: false, reason: "static_hosting" };
}

export const CHECKOUT_PREP_MESSAGE =
  "Secure checkout is being finalized. Email us your selection or message us on Instagram for the fastest confirmation.";
