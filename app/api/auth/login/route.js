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
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });

    const key = `user:${email.toLowerCase()}`;
    const raw = await redis.get(key);
    if (!raw)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });

    const user = typeof raw === "string" ? JSON.parse(raw) : raw;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });

    const token = await signToken({ id: user.id, email: user.email, sissyName: user.sissyName, tier: user.tier });
    const res = NextResponse.json({ success: true, user: { id: user.id, email: user.email, sissyName: user.sissyName, tier: user.tier } });
    res.cookies.set("sfi_session", token, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30, path: "/" });
    return res;
  } catch (e) {
    console.error("Login error:", e);
    return NextResponse.json({ error: "Server error: " + e.message }, { status: 500 });
  }
}
