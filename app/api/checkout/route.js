import { NextResponse } from "next/server";
import { EVENT, findTier } from "@/lib/event";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { tierId, quantity = 1 } = await req.json();
    const tier = findTier(tierId);
    if (!tier) return NextResponse.json({ error: "Unknown ticket type" }, { status: 400 });

    const qty = Math.min(Math.max(parseInt(quantity, 10) || 1, 1), 10);

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Card payments are not configured yet." }, { status: 503 });
    }

    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const origin = process.env.NEXT_PUBLIC_URL || req.headers.get("origin") || "";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: qty,
          price_data: {
            currency: "usd",
            unit_amount: tier.price * 100,
            product_data: {
              name: `${EVENT.name} — ${tier.name}`,
              description: `${EVENT.dateLabel} · ${EVENT.city}`,
            },
          },
        },
      ],
      metadata: { tier: tier.name, tierId: tier.id, quantity: String(qty) },
      custom_text: {
        submit: { message: "Venue details are emailed to ticket holders 48 hours before doors. 18+ with valid ID." },
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#tickets`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err.message);
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 500 });
  }
}
