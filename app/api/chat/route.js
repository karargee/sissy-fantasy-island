import { NextResponse } from "next/server";
import redis from "@/lib/redis";

const KEY = "chats";

async function getChats() {
  const raw = await redis.get(KEY);
  if (!raw) return {};
  return typeof raw === "string" ? JSON.parse(raw) : raw;
}

async function saveChats(chats) {
  await redis.set(KEY, JSON.stringify(chats));
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  const admin = searchParams.get("admin");

  try {
    const chats = await getChats();

    if (admin === "true") {
      return NextResponse.json({ chats });
    }

    if (!sessionId) return NextResponse.json({ messages: [] });
    const chat = chats[sessionId] || { messages: [], unreadAdmin: 0 };
    return NextResponse.json({ messages: chat.messages });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { sessionId, text, from } = await req.json();
    if (!sessionId || !text || !from)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const chats = await getChats();
    if (!chats[sessionId]) {
      chats[sessionId] = { messages: [], startedAt: new Date().toISOString(), unreadAdmin: 0 };
    }

    const msg = {
      id: Date.now(),
      from,
      text,
      time: new Date().toISOString(),
    };

    chats[sessionId].messages.push(msg);
    // Keep last 100 messages per session
    if (chats[sessionId].messages.length > 100) {
      chats[sessionId].messages = chats[sessionId].messages.slice(-100);
    }

    if (from === "user") {
      chats[sessionId].unreadAdmin = (chats[sessionId].unreadAdmin || 0) + 1;
    } else if (from === "admin") {
      chats[sessionId].unreadAdmin = 0;
    }

    await saveChats(chats);
    return NextResponse.json({ ok: true, msg });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
