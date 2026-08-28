import { NextResponse } from "next/server";
import redis from "@/lib/redis";

const ADMIN_PASS = "transparty2026";
const TO_EMAIL = "sissyfantasyisland70@gmail.com";

async function sendEmail(subject, html) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) return;
  try {
    const nodemailer = (await import("nodemailer")).default;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    });
    await transporter.sendMail({ from: process.env.GMAIL_USER, to: TO_EMAIL, subject, html });
  } catch (e) {
    console.error("Email error:", e.message);
  }
}

export async function GET() {
  try {
    const payments = await redis.lrange("btc_payments", 0, 199);
    return NextResponse.json({ payments: payments.map(p => typeof p === "string" ? JSON.parse(p) : p) });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { email, tier, txid, delivery } = await req.json();
    if (!tier) return NextResponse.json({ error: "Tier is required" }, { status: 400 });

    const payment = {
      id: Date.now(),
      email: email || "anonymous",
      tier,
      txid: txid || "",
      delivery: delivery || "email",
      status: "pending",
      date: new Date().toISOString(),
    };
    await redis.lpush("btc_payments", JSON.stringify(payment));
    await redis.ltrim("btc_payments", 0, 499);

    await sendEmail(
      `₿ New BTC Payment — ${tier}`,
      `<h2>New Bitcoin Payment Confirmation</h2>
      <p><strong>Tier:</strong> ${tier}</p>
      <p><strong>Email:</strong> ${email || "Anonymous"}</p>
      <p><strong>Transaction ID:</strong> ${txid || "Not provided"}</p>
      <p><strong>Delivery:</strong> ${delivery || "email"}</p>
      <p><strong>Status:</strong> Pending verification</p>
      <p><em>Submitted: ${new Date().toLocaleString()}</em></p>`
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
    const payments = await redis.lrange("btc_payments", 0, 499);
    const updated = payments.map(p => {
      const obj = typeof p === "string" ? JSON.parse(p) : p;
      return obj.id === id ? JSON.stringify({ ...obj, status }) : (typeof p === "string" ? p : JSON.stringify(p));
    });
    await redis.del("btc_payments");
    for (const p of updated.reverse()) await redis.rpush("btc_payments", p);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
