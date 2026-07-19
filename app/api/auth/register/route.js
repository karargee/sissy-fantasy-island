import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Redis } from "@upstash/redis";
import { signToken } from "@/lib/auth";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function POST(req) {
  try {
    const { email, password, sissyName } = await req.json();

    if (!email || !password || !sissyName)
      return NextResponse.json({ error: "All fields required" }, { status: 400 });

    if (password.length < 8)
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });

    const key = `user:${email.toLowerCase()}`;
    const existing = await redis.get(key);
    if (existing)
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });

    const hashed = await bcrypt.hash(password, 10);
    const id = `SFI-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const user = { id, email: email.toLowerCase(), password: hashed, sissyName, tier: "Free", memberSince: new Date().toISOString(), bio: "" };

    await redis.set(key, JSON.stringify(user));

    const token = await signToken({ id, email: user.email, sissyName, tier: "Free" });
    const res = NextResponse.json({ success: true, user: { id, email: user.email, sissyName, tier: "Free" } });
    res.cookies.set("sfi_session", token, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30, path: "/" });
    return res;
  } catch (e) {
    console.error("Register error:", e);
    return NextResponse.json({ error: "Server error: " + e.message }, { status: 500 });
  }
}
