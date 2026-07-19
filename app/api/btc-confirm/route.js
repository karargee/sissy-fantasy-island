import { NextResponse } from "next/server";
import redis from "@/lib/redis";

const ADMIN_PASS = "transparty2026";

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
