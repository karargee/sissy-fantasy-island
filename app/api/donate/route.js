import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { amount, email } = await req.json();
  const cents = Math.round(amount * 100);

  if (cents < 500 || cents > 10000000) {
    return NextResponse.json({ error: "Amount must be between $5 and $100,000" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email || undefined,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Trans Party Donation 🏳️⚧️ + Livestream Access",
            description: "Thank you for your support! You'll receive a private livestream link via email.",
          },
          unit_amount: cents,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/donate/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/#donate`,
  });

  return NextResponse.json({ url: session.url });
}
