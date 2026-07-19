import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import redis from "@/lib/redis";

export async function GET() {
  try {
    const session = await getSession();
    const keys = await redis.keys("user:*");
    if (!keys.length) return NextResponse.json([]);

    const users = await Promise.all(keys.map(k => redis.get(k)));
    return NextResponse.json(
      users
        .filter(Boolean)
        .map(u => typeof u === "string" ? JSON.parse(u) : u)
        .filter(u => !session || u.id !== session.id)
        .map(u => ({ id: u.id, sissyName: u.sissyName, tier: u.tier }))
    );
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
