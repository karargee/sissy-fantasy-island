import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import redis from "@/lib/redis";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ user: null });

  const raw = await redis.get(`user:${session.email}`);
  if (!raw) return NextResponse.json({ user: null });

  const user = typeof raw === "string" ? JSON.parse(raw) : raw;
  const { password, ...safe } = user;
  return NextResponse.json({ user: safe });
}
