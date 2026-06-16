import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { amount, email } = await req.json();

    if (!amount || amount < 5) {
      return NextResponse.json({ error: "Minimum donation is $5" }, { status: 400 });
    }

    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Trans Party — Livestream Donation",
              description: "HD livestream access + 48hr replay + live chat",
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/donate/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/#donate`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err.message);
    return NextResponse.json({ error: "Payment failed" }, { status: 500 });
  }
}
