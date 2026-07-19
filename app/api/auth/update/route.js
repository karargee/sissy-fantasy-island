import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
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
    await redis.set(key, JSON.stringify({ ...user, bio, sissyName }));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
