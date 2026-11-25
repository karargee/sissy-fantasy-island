import { NextResponse } from "next/server";
import { isAdmin, unauthorized } from "@/lib/admin";
import getSupabase from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { ticketConfirmationHtml } from "@/lib/event";


export async function GET(req) {
  if (!isAdmin(req)) return unauthorized();
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("btc_payments")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ payments: data });
}

export async function POST(req) {
  try {
    const { email, tier, txid, delivery } = await req.json();
    if (!tier) return NextResponse.json({ error: "Tier required" }, { status: 400 });

    const supabase = getSupabase();
    const { error } = await supabase.from("btc_payments").insert({
      email: email || "anonymous", tier, txid: txid || "", delivery: delivery || "email", status: "pending",
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

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
  if (!isAdmin(req)) return unauthorized();
  try {
    const { id, status } = await req.json();
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("btc_payments")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    if (status === "verified" && data.email && data.email !== "anonymous") {
      await sendEmail(`✅ Your ${data.tier} ticket is confirmed — Venue Details Inside`, ticketConfirmationHtml({ tier: data.tier }), data.email);
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
