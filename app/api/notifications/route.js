import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import redis from "@/lib/redis";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const notifs = await redis.lrange(`notifs:${session.id}`, 0, 29);
    return NextResponse.json(notifs.map(n => typeof n === "string" ? JSON.parse(n) : n));
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { toId, type, fromName, postId } = await req.json();
    if (!toId || !type) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const notif = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
      type,
      fromName,
      postId,
      read: false,
      createdAt: new Date().toISOString(),
    };

    await redis.lpush(`notifs:${toId}`, JSON.stringify(notif));
    await redis.ltrim(`notifs:${toId}`, 0, 49);
    return NextResponse.json(notif);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    // Mark all as read
    const notifs = await redis.lrange(`notifs:${session.id}`, 0, 49);
    const updated = notifs.map(n => {
      const obj = typeof n === "string" ? JSON.parse(n) : n;
      return JSON.stringify({ ...obj, read: true });
    });
    if (updated.length) {
      await redis.del(`notifs:${session.id}`);
      for (const n of updated.reverse()) await redis.rpush(`notifs:${session.id}`, n);
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
