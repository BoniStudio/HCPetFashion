import type { CartItem } from "./cart";
import { STRIPE_PAYMENT_LINK } from "./constants";

export type CheckoutResult =
  | { ok: true; url: string }
  | { ok: false; reason: "empty_cart" | "not_configured" };

/**
 * Static GitHub Pages checkout — Stripe Payment Link (customer-entered amount).
 * No serverless session; cart UI shows estimated total before redirect.
 *
 * TODO: Replace with Stripe Checkout Session via serverless when backend exists.
 * Never expose STRIPE_SECRET_KEY in client bundles.
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
      /* fall through to payment link */
    }
  }

  return { ok: true, url: STRIPE_PAYMENT_LINK };
}

export const CHECKOUT_PREP_MESSAGE =
  "Review your estimated total below, then continue to Stripe to complete payment.";

export const STRIPE_AMOUNT_REMINDER =
  "Please enter this amount on the Stripe checkout page.";

export const NO_ACCOUNT_MESSAGE =
  "No account is needed. Stripe collects your email, phone number, and shipping address securely. We use that information to match your payment with your selected pieces.";

export const LIMITED_PIECES_MESSAGE =
  "Because many pieces are limited, final availability is confirmed manually after payment.";

export const STRIPE_MANUAL_AMOUNT_NOTE =
  "Stripe will ask you to enter the payment amount manually. Please enter the estimated total shown above.";
