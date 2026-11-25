import { NextResponse } from "next/server";
import { findProduct, SHIPPING } from "@/lib/shop";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    if (process.env.SHOP_OPEN !== "true") {
      return NextResponse.json({ error: "Online ordering isn't open yet." }, { status: 403 });
    }
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Card payments are not configured yet." }, { status: 503 });
    }

    const { items } = await req.json();
    if (!Array.isArray(items) || items.length === 0 || items.length > 30) {
      return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
    }

    const lines = [];
    for (const it of items) {
      const p = findProduct(it?.id);
      const qty = Math.min(Math.max(parseInt(it?.qty, 10) || 0, 0), 10);
      if (!p || qty === 0) return NextResponse.json({ error: "One of the items is no longer available." }, { status: 400 });
      lines.push({ p, qty });
    }

    const subtotal = lines.reduce((n, l) => n + l.p.price * l.qty, 0);
    const shippingCents = subtotal >= SHIPPING.freeOver ? 0 : SHIPPING.flat * 100;

    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const origin = process.env.NEXT_PUBLIC_URL || req.headers.get("origin") || "";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lines.map(({ p, qty }) => ({
        quantity: qty,
        price_data: {
          currency: "usd",
          unit_amount: p.price * 100,
          product_data: { name: p.name, images: [p.image] },
        },
      })),
      shipping_address_collection: { allowed_countries: ["US"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: shippingCents, currency: "usd" },
            display_name: shippingCents === 0 ? "Free discreet shipping" : "Discreet shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      metadata: {
        type: "shop",
        items: lines.map(({ p, qty }) => `${p.id}x${qty}`).join(",").slice(0, 490),
      },
      success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Shop checkout error:", err.message);
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 500 });
  }
}
