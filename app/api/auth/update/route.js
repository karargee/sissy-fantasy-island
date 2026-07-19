import { NextResponse } from "next/server";
import { getSession, signToken } from "@/lib/auth";
import redis from "@/lib/redis";

export async function POST(req) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const { bio, sissyName } = await req.json();
    const key = `user:${session.email}`;
    const raw = await redis.get(key);
    if (!raw) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const user = typeof raw === "string" ? JSON.parse(raw) : raw;
    const updated = { ...user, bio, sissyName };
    await redis.set(key, JSON.stringify(updated));

    // Re-issue JWT so sissyName is current in session
    const token = await signToken({ id: updated.id, email: updated.email, sissyName, tier: updated.tier });
    const res = NextResponse.json({ success: true });
    res.cookies.set("sfi_session", token, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30, path: "/" });
    return res;
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
