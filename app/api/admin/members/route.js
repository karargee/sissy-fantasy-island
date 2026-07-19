import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function GET(req) {
  const pass = req.headers.get("x-admin-pass");
  if (pass !== "transparty2026")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const keys = await redis.keys("user:*");
  if (!keys.length) return NextResponse.json([]);
  const users = await Promise.all(keys.map(k => redis.get(k)));
  return NextResponse.json(users.map(u => {
    const user = typeof u === "string" ? JSON.parse(u) : u;
    return { id: user.id, email: user.email, sissyName: user.sissyName, tier: user.tier, memberSince: user.memberSince, bio: user.bio };
  }));
}

export async function POST(req) {
  const pass = req.headers.get("x-admin-pass");
  if (pass !== "transparty2026")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { userId, tier } = await req.json();
  const keys = await redis.keys("user:*");
  for (const k of keys) {
    const raw = await redis.get(k);
    const user = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (user.id === userId) {
      await redis.set(k, JSON.stringify({ ...user, tier }));
      break;
    }
  }
  return NextResponse.json({ success: true });
}
