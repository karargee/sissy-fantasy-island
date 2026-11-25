import { NextResponse } from "next/server";
import getSupabase from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { ticketConfirmationHtml } from "@/lib/event";
import { findProduct } from "@/lib/shop";

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

  if (session.metadata?.type === "shop") return handleShopOrder(session);

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

const esc = (v) => String(v ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

async function handleShopOrder(session) {
  const email = session.customer_details?.email || null;
  const ship = session.collected_information?.shipping_details || session.shipping_details || null;
  const addr = ship?.address || {};
  const items = (session.metadata?.items || "")
    .split(",")
    .filter(Boolean)
    .map((part) => {
      const i = part.lastIndexOf("x");
      const id = part.slice(0, i);
      return { id, name: findProduct(id)?.name || id, qty: parseInt(part.slice(i + 1), 10) || 1 };
    });
  const amount = (session.amount_total || 0) / 100;
  const addressLines = [
    ship?.name,
    addr.line1,
    addr.line2,
    [addr.city, addr.state, addr.postal_code].filter(Boolean).join(" "),
    addr.country,
  ].filter(Boolean);

  const supabase = getSupabase();
  const { data: inserted, error } = await supabase
    .from("shop_orders")
    .upsert(
      {
        stripe_session_id: session.id,
        email,
        name: ship?.name || session.customer_details?.name || null,
        items,
        amount_cents: session.amount_total || 0,
        shipping_address: addressLines.join(", "),
        status: "paid",
      },
      { onConflict: "stripe_session_id", ignoreDuplicates: true }
    )
    .select("id");

  if (error) {
    console.error("shop_orders insert failed:", error.message);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
  if (!inserted || inserted.length === 0) return NextResponse.json({ received: true });

  const itemList = items.map((i) => `<li>${esc(i.name)} × ${i.qty}</li>`).join("");
  await sendEmail(
    `New boutique order — $${amount.toFixed(2)}`,
    `<h2>New boutique order</h2>
     <ul>${itemList}</ul>
     <p><strong>Total:</strong> $${amount.toFixed(2)}</p>
     <p><strong>Ship to:</strong><br>${addressLines.map(esc).join("<br>")}</p>
     <p><strong>Email:</strong> ${esc(email || "—")}</p>
     <p><strong>Stripe session:</strong> ${session.id}</p>`
  );

  if (email) {
    await sendEmail(
      "Your LA Trans Party boutique order",
      `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0c0b0d;color:#ece6df;padding:32px;border-radius:8px">
        <h1 style="font-family:Georgia,serif;font-weight:400;font-size:28px;margin:0 0 16px">Thank you for your order.</h1>
        <ul style="padding-left:18px;margin:0 0 16px">${itemList}</ul>
        <p style="margin:0 0 8px"><strong>Total:</strong> $${amount.toFixed(2)}</p>
        <p style="margin:0 0 16px;color:#a8a19a">Orders ship in plain packaging within 2 business days. We'll email tracking when it leaves us.</p>
      </div>`,
      email
    );
  }
  return NextResponse.json({ received: true });
}
