import { NextResponse } from "next/server";
import redis from "@/lib/redis";

const ADMIN_PASS = "transparty2026";

export async function GET(req) {
  if (req.headers.get("x-admin-pass") !== ADMIN_PASS)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const keys = await redis.keys("user:*");
    if (!keys.length) return NextResponse.json({ users: [] });
    const raw = await Promise.all(keys.map(k => redis.get(k)));
    const users = raw
      .filter(Boolean)
      .map(u => typeof u === "string" ? JSON.parse(u) : u)
      .map(u => ({ id: u.id, email: u.email, sissyName: u.sissyName, tier: u.tier, memberSince: u.memberSince, bio: u.bio }));
    return NextResponse.json({ users });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  if (req.headers.get("x-admin-pass") !== ADMIN_PASS)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { userId, tier } = await req.json();
    const keys = await redis.keys("user:*");
    for (const k of keys) {
      const raw = await redis.get(k);
      const user = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (user?.id === userId) {
        await redis.set(k, JSON.stringify({ ...user, tier }));
        return NextResponse.json({ success: true });
      }
    }
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
