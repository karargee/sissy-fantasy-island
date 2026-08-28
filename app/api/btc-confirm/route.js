import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

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
    const { error } = await supabase.from("btc_payments").update({ status }).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
