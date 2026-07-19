import { NextResponse } from "next/server";
import redis from "@/lib/redis";

// Per-session keys: chat:msgs:{sessionId} (list), chat:unread:{sessionId} (int)
// Index of all sessions: chat:sessions (set)

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  const admin = searchParams.get("admin");

  try {
    if (admin === "true") {
      const sessions = await redis.smembers("chat:sessions");
      const chats = {};
      await Promise.all(sessions.map(async (sid) => {
        const msgs = await redis.lrange(`chat:msgs:${sid}`, 0, 99);
        const unread = await redis.get(`chat:unread:${sid}`);
        chats[sid] = {
          messages: msgs.map(m => typeof m === "string" ? JSON.parse(m) : m),
          unreadAdmin: parseInt(unread || "0"),
          startedAt: null,
        };
      }));
      return NextResponse.json({ chats });
    }

    if (!sessionId) return NextResponse.json({ messages: [] });
    const msgs = await redis.lrange(`chat:msgs:${sessionId}`, 0, 99);
    return NextResponse.json({
      messages: msgs.map(m => typeof m === "string" ? JSON.parse(m) : m),
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { sessionId, text, from } = await req.json();
    if (!sessionId || !text || !from)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const msg = {
      id: Date.now(),
      from,
      text,
      time: new Date().toISOString(),
    };

    await redis.sadd("chat:sessions", sessionId);
    await redis.rpush(`chat:msgs:${sessionId}`, JSON.stringify(msg));
    // Cap at 100 messages per session
    await redis.ltrim(`chat:msgs:${sessionId}`, -100, -1);

    if (from === "user") {
      await redis.incr(`chat:unread:${sessionId}`);
    } else if (from === "admin") {
      await redis.set(`chat:unread:${sessionId}`, "0");
    }

    return NextResponse.json({ ok: true, msg });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
