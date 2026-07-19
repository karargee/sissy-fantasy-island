import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { getSession } from "@/lib/auth";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const keys = await redis.keys("user:*");
    if (!keys.length) return NextResponse.json([]);

    const users = await Promise.all(keys.map(k => redis.get(k)));
    return NextResponse.json(
      users
        .filter(Boolean)
        .map(u => typeof u === "string" ? JSON.parse(u) : u)
        .filter(u => u.id !== session.id)
        .map(u => ({ id: u.id, sissyName: u.sissyName, tier: u.tier }))
    );
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
