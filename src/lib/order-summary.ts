import type { CartItem } from "./cart";
import { formatPrice } from "./utils";
import { SITE_URL } from "./site";

export function buildOrderSummary(items: CartItem[], total: number): string {
  const lines = [
    "HC Pet Fashion Order Inquiry",
    SITE_URL,
    "",
  ];

  items.forEach((item, i) => {
    lines.push(
      `Item ${i + 1}`,
      `Product: ${item.name}`,
      `Size: ${item.size}`,
      `Quantity: ${item.quantity}`,
      `Price: ${formatPrice(item.price * item.quantity)}`,
      `URL: ${SITE_URL}/product/${item.slug}/`,
      ""
    );
  });

  lines.push(`Total: ${formatPrice(total)}`);
  lines.push("");
  lines.push(
    "Because many pieces are limited to one item, we confirm availability before payment."
  );

  return lines.join("\n");
}

/** Plain-text body for mailto: order inquiry */
export function buildOrderMailtoBody(items: CartItem[], total: number): string {
  const lines = ["Order summary:"];

  items.forEach((item) => {
    lines.push(
      `- Product name: ${item.name}`,
      `- Size: ${item.size}`,
      `- Quantity: ${item.quantity}`,
      `- Page URL: ${SITE_URL}/product/${item.slug}/`,
      ""
    );
  });

  lines.push(`- Total: ${formatPrice(total)}`);
  return lines.join("\n");
}
