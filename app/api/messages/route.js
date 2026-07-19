import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import redis from "@/lib/redis";

function convoKey(a, b) {
  return [a, b].sort().join(":");
}

export async function GET(req) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const withUser = searchParams.get("with");

    if (withUser) {
      // Get conversation messages
      const key = `convo:${convoKey(session.id, withUser)}`;
      const msgs = await redis.lrange(key, 0, 99);
      return NextResponse.json(msgs.map(m => typeof m === "string" ? JSON.parse(m) : m));
    }

    // Get all conversations for this user
    const convos = await redis.smembers(`convos:${session.id}`);
    if (!convos.length) return NextResponse.json([]);

    const results = await Promise.all(convos.map(async (otherId) => {
      const key = `convo:${convoKey(session.id, otherId)}`;
      const last = await redis.lindex(key, -1);
      const otherRaw = await redis.get(`user:${otherId}`);
      const other = otherRaw ? (typeof otherRaw === "string" ? JSON.parse(otherRaw) : otherRaw) : null;
      return {
        userId: otherId,
        userName: other?.sissyName || "Unknown",
        userTier: other?.tier || "Free",
        lastMessage: last ? (typeof last === "string" ? JSON.parse(last) : last) : null,
      };
    }));

    return NextResponse.json(results.filter(r => r.lastMessage).sort((a, b) =>
      new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)
    ));
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const { toId, content } = await req.json();
    if (!content?.trim()) return NextResponse.json({ error: "Message cannot be empty" }, { status: 400 });
    if (!toId) return NextResponse.json({ error: "Recipient required" }, { status: 400 });

    const msg = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
      fromId: session.id,
      fromName: session.sissyName,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    const key = `convo:${convoKey(session.id, toId)}`;
    await redis.rpush(key, JSON.stringify(msg));
    await redis.sadd(`convos:${session.id}`, toId);
    await redis.sadd(`convos:${toId}`, session.id);

    return NextResponse.json(msg);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
