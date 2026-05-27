import type { CartItem } from "./cart";
import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  STRIPE_PAYMENT_LINK,
} from "./constants";
import { formatPrice } from "./utils";

export type OrderTotals = {
  subtotal: number;
  shipping: number;
  total: number;
};

function formatShipping(shipping: number): string {
  return shipping === 0 ? "Complimentary" : formatPrice(shipping);
}

export function buildOrderSummary(
  items: CartItem[],
  { subtotal, shipping, total }: OrderTotals
): string {
  const lines = ["HC Pet Fashion Order Inquiry", "", "Items:"];

  items.forEach((item, i) => {
    lines.push(
      `${i + 1}. ${item.name}`,
      `   Size: ${item.size}`,
      `   Quantity: ${item.quantity}`,
      `   Price: ${formatPrice(item.price * item.quantity)}`,
      ""
    );
  });

  lines.push(
    `Subtotal: ${formatPrice(subtotal)}`,
    `Shipping: ${formatShipping(shipping)}`,
    `Estimated Total: ${formatPrice(total)}`,
    "",
    `Please enter this amount on Stripe: ${formatPrice(total)}`,
    "",
    `Email: ${CONTACT_EMAIL}`,
    `Instagram: ${INSTAGRAM_URL}`,
    `Stripe: ${STRIPE_PAYMENT_LINK}`
  );

  return lines.join("\n");
}

/** Plain-text body for mailto: order inquiry */
export function buildOrderMailtoBody(
  items: CartItem[],
  { subtotal, shipping, total }: OrderTotals
): string {
  return buildOrderSummary(items, { subtotal, shipping, total });
}
