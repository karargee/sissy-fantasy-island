import { NextResponse } from "next/server";
import getSupabase from "@/lib/supabase";

const ADMIN_PASS = process.env.ADMIN_PASSWORD;
const TO_EMAIL = "sissyfantasyisland70@gmail.com";

async function sendEmail(subject, html, to = TO_EMAIL) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) return;
  try {
    const nodemailer = (await import("nodemailer")).default;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    });
    await transporter.sendMail({ from: process.env.GMAIL_USER, to, subject, html });
  } catch (e) {
    console.error("Email error:", e.message);
  }
}

const VENUE_HTML = `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0f;color:#fff;padding:2rem;border-radius:12px">
  <div style="text-align:center;margin-bottom:1.5rem">
    <div style="font-size:2rem">🏳️⚧️</div>
    <h1 style="color:#f5a9b8;margin:0.5rem 0">LA Trans Party 2026</h1>
    <p style="color:rgba(255,255,255,0.5);margin:0">Oct 23–24, 2026 · Private Venue Details</p>
  </div>
  <div style="background:rgba(214,51,132,0.1);border:1px solid rgba(214,51,132,0.3);border-radius:10px;padding:1.5rem;margin-bottom:1.5rem">
    <h2 style="color:#f5a9b8;margin:0 0 1rem">📍 Venue Details</h2>
    <p style="margin:0.4rem 0"><strong>Venue:</strong> The Majestic Venue</p>
    <p style="margin:0.4rem 0"><strong>Address:</strong> 1234 Sunset Blvd, West Hollywood, CA 90028</p>
    <p style="margin:0.4rem 0"><strong>Doors Open:</strong> 9PM both nights</p>
    <p style="margin:0.4rem 0"><strong>Parking:</strong> Valet available on site</p>
  </div>
  <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:1.2rem;margin-bottom:1.5rem">
    <h3 style="color:#f5a9b8;margin:0 0 0.8rem">⚠️ Important</h3>
    <ul style="color:rgba(255,255,255,0.6);line-height:1.8;padding-left:1.2rem;margin:0">
      <li>Keep this address strictly private — do not share on social media</li>
      <li>Valid ID required at the door — strictly 18+</li>
      <li>Dress code enforced — no street clothes</li>
      <li>No photos without explicit consent</li>
    </ul>
  </div>
  <p style="text-align:center;color:rgba(255,255,255,0.3);font-size:0.8rem">Questions? Email sissyfantasyisland70@gmail.com</p>
</div>
`;

export async function GET() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("btc_payments")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ payments: data });
}

export async function POST(req) {
  try {
    const { email, tier, txid, delivery } = await req.json();
    if (!tier) return NextResponse.json({ error: "Tier required" }, { status: 400 });

    const supabase = getSupabase();
    const { error } = await supabase.from("btc_payments").insert({
      email: email || "anonymous",
      tier,
      txid: txid || "",
      delivery: delivery || "email",
      status: "pending",
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await sendEmail(
      `₿ New BTC Payment — ${tier}`,
      `<h2>New Bitcoin Payment</h2>
      <p><strong>Tier:</strong> ${tier}</p>
      <p><strong>Email:</strong> ${email || "Anonymous"}</p>
      <p><strong>TX ID:</strong> ${txid || "Not provided"}</p>
      <p><strong>Delivery:</strong> ${delivery || "email"}</p>`
    );

    return NextResponse.json({ message: "Payment confirmation received" });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  if (req.headers.get("x-admin-pass") !== ADMIN_PASS)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id, status } = await req.json();
    const supabase = getSupabase();
    const { data: payment, error: fetchErr } = await supabase.from("btc_payments").select("email, tier").eq("id", id).single();
    const { error } = await supabase.from("btc_payments").update({ status }).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    if (status === "verified" && !fetchErr && payment?.email && payment.email !== "anonymous") {
      await sendEmail(
        `✅ Your ${payment.tier} ticket is confirmed — Venue Details Inside`,
        VENUE_HTML,
        payment.email
      );
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
