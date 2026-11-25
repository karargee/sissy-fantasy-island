import { NextResponse } from "next/server";
import getSupabase from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { ticketConfirmationHtml } from "@/lib/event";

export const dynamic = "force-dynamic";

// Stripe calls this after a successful checkout.
// Setup: Stripe Dashboard → Developers → Webhooks → add endpoint
//   URL:    https://<your-domain>/api/stripe-webhook
//   Events: checkout.session.completed
// then copy the signing secret into STRIPE_WEBHOOK_SECRET.
export async function POST(req) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!process.env.STRIPE_SECRET_KEY || !secret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let event;
  try {
    const raw = await req.text();
    event = stripe.webhooks.constructEvent(raw, req.headers.get("stripe-signature"), secret);
  } catch (err) {
    console.error("Webhook signature check failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object;
  if (session.payment_status !== "paid") return NextResponse.json({ received: true });

  const tier = session.metadata?.tier || "Ticket";
  const quantity = parseInt(session.metadata?.quantity, 10) || 1;
  const email = session.customer_details?.email || session.customer_email || null;
  const name = session.customer_details?.name || null;
  const amount = (session.amount_total || 0) / 100;

  // Stripe retries webhooks, so the unique session id keeps this idempotent.
  const supabase = getSupabase();
  const { data: inserted, error } = await supabase
    .from("card_payments")
    .upsert(
      {
        stripe_session_id: session.id,
        email,
        name,
        tier,
        quantity,
        amount_cents: session.amount_total || 0,
        currency: session.currency || "usd",
        status: "paid",
      },
      { onConflict: "stripe_session_id", ignoreDuplicates: true }
    )
    .select("id");

  if (error) {
    console.error("card_payments insert failed:", error.message);
    // Return 500 so Stripe retries once the table exists.
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  // Already processed on an earlier delivery: don't email twice.
  if (!inserted || inserted.length === 0) return NextResponse.json({ received: true });

  await sendEmail(
    `New ticket sale — ${tier}${quantity > 1 ? ` × ${quantity}` : ""} ($${amount.toFixed(2)})`,
    `<h2>New card payment</h2>
     <p><strong>Tier:</strong> ${tier} × ${quantity}</p>
     <p><strong>Amount:</strong> $${amount.toFixed(2)}</p>
     <p><strong>Name:</strong> ${name || "—"}</p>
     <p><strong>Email:</strong> ${email || "—"}</p>
     <p><strong>Stripe session:</strong> ${session.id}</p>`
  );

  if (email) {
    await sendEmail("Your LA Trans Party ticket is confirmed", ticketConfirmationHtml({ tier, quantity }), email);
  }

  return NextResponse.json({ received: true });
}
