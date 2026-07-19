import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { getSession } from "@/lib/auth";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function POST() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    await redis.setex(`online:${session.id}`, 120, session.sissyName);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const keys = await redis.keys("online:*");
    const online = await Promise.all(keys.map(async k => {
      const name = await redis.get(k);
      return { id: k.replace("online:", ""), name };
    }));
    return NextResponse.json(online.filter(o => o.name));
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
