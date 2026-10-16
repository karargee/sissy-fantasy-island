import { NextResponse } from "next/server";
import { readStore, appendStore, writeStore } from "@/lib/store";

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
  } catch (e) { console.error("Email error:", e.message); }
}

const VENUE_HTML = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0f;color:#fff;padding:2rem;border-radius:12px">
  <h1 style="color:#f5a9b8;text-align:center">🏳️⚧️ LA Trans Party 2026</h1>
  <p style="text-align:center;color:rgba(255,255,255,0.5)">Oct 23–24, 2026 · Venue Details</p>
  <div style="background:rgba(214,51,132,0.1);border:1px solid rgba(214,51,132,0.3);border-radius:10px;padding:1.5rem;margin:1.5rem 0">
    <h2 style="color:#f5a9b8;margin:0 0 1rem">📍 Venue Details</h2>
    <p><strong>Address:</strong> 1234 Sunset Blvd, West Hollywood, CA 90028</p>
    <p><strong>Doors Open:</strong> 9PM both nights</p>
  </div>
  <p style="text-align:center;color:rgba(255,255,255,0.3);font-size:0.8rem">Questions? Email sissyfantasyisland70@gmail.com</p>
</div>`;

export async function GET() {
  return NextResponse.json({ payments: readStore("btc_payments", []) });
}

export async function POST(req) {
  try {
    const { email, tier, txid, delivery } = await req.json();
    if (!tier) return NextResponse.json({ error: "Tier required" }, { status: 400 });

    appendStore("btc_payments", { email: email || "anonymous", tier, txid: txid || "", delivery: delivery || "email", status: "pending" });

    await sendEmail(`₿ New BTC Payment — ${tier}`,
      `<h2>New Bitcoin Payment</h2>
      <p><strong>Tier:</strong> ${tier}</p><p><strong>Email:</strong> ${email || "Anonymous"}</p>
      <p><strong>TX ID:</strong> ${txid || "Not provided"}</p>`);

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
    const payments = readStore("btc_payments", []);
    const idx = payments.findIndex(p => p.id === id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    payments[idx].status = status;
    writeStore("btc_payments", payments);

    if (status === "verified" && payments[idx].email && payments[idx].email !== "anonymous") {
      await sendEmail(`✅ Your ${payments[idx].tier} ticket is confirmed — Venue Details Inside`, VENUE_HTML, payments[idx].email);
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
