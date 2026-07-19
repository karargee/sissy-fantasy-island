import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function GET() {
  try {
    const msgs = await redis.lrange("contact_messages", 0, 99);
    return NextResponse.json({ messages: msgs.map(m => typeof m === "string" ? JSON.parse(m) : m) });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();
    if (!name || !email || !subject || !message)
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });

    const msg = { id: Date.now(), name, email, subject, message, date: new Date().toISOString(), read: false };
    await redis.lpush("contact_messages", JSON.stringify(msg));
    await redis.ltrim("contact_messages", 0, 199);
    return NextResponse.json({ message: "Message sent successfully" });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
