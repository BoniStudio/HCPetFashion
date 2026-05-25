/**
 * Stripe Checkout API — deploy on Vercel (not GitHub Pages static export)
 *
 * Copy to: src/app/api/checkout/route.ts
 * Install: npm install stripe
 * Env: STRIPE_SECRET_KEY, NEXT_PUBLIC_SITE_URL
 */

// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// export async function POST(request: Request) {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//     apiVersion: "2024-11-20.acacia",
//   });
//   const { items } = await request.json();
//   const session = await stripe.checkout.sessions.create({
//     mode: "payment",
//     line_items: items.map((item: { name: string; price: number; quantity: number }) => ({
//       price_data: {
//         currency: "usd",
//         product_data: { name: item.name },
//         unit_amount: Math.round(item.price * 100),
//       },
//       quantity: item.quantity,
//     })),
//     success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart/?success=1`,
//     cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart/?canceled=1`,
//   });
//   return NextResponse.json({ url: session.url });
// }

export const CHECKOUT_API_PATH = "/api/checkout";
