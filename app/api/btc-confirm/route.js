import { NextResponse } from "next/server";
import redis from "@/lib/redis";

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
    return NextResponse.json({ message: "Payment confirmation received" });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
