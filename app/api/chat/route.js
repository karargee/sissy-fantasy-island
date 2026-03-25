import { NextResponse } from "next/server";

// In-memory chat store (resets on server restart)
const chats = {};

// GET: fetch messages for a session
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  const admin = searchParams.get("admin");

  // Admin: return all chats
  if (admin === "true") {
    return NextResponse.json({ chats });
  }

  // User: return their chat
  if (!sessionId) return NextResponse.json({ messages: [] });
  const chat = chats[sessionId] || { messages: [], unreadAdmin: 0 };
  // Mark admin messages as read by user
  chat.messages = chat.messages.map((m) =>
    m.from === "admin" ? { ...m, readByUser: true } : m
  );
  return NextResponse.json({ messages: chat.messages });
}

// POST: send a message
export async function POST(req) {
  const { sessionId, text, from, replyTo } = await req.json();

  if (!sessionId || !text || !from) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!chats[sessionId]) {
    chats[sessionId] = { messages: [], startedAt: new Date().toISOString(), unreadAdmin: 0 };
  }

  const msg = {
    id: Date.now(),
    from, // "user" or "admin"
    text,
    time: new Date().toISOString(),
    readByUser: from === "admin" ? false : true,
    readByAdmin: from === "user" ? false : true,
  };

  chats[sessionId].messages.push(msg);

  if (from === "user") {
    chats[sessionId].unreadAdmin = (chats[sessionId].unreadAdmin || 0) + 1;
  }

  // If admin replies, clear unread count
  if (from === "admin") {
    chats[sessionId].unreadAdmin = 0;
    chats[sessionId].messages = chats[sessionId].messages.map((m) =>
      m.from === "user" ? { ...m, readByAdmin: true } : m
    );
  }

  return NextResponse.json({ ok: true, msg });
}
