import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICES = {
  "Sub Entry": 50000,
  "Dom Pass": 100000,
  "Dungeon Master": 150000,
  "Masked Session": 75000,
};

export async function POST(req) {
  const { tier, quantity = 1 } = await req.json();
  const amount = PRICES[tier];

  if (!amount || quantity < 1 || quantity > 10) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: `Trans Party — ${tier} 🏳️⚧️` },
          unit_amount: amount,
        },
        quantity,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
  });

  return NextResponse.json({ url: session.url });
}
