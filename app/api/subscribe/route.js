import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function GET() {
  try {
    const subs = await redis.smembers("subscribers");
    return NextResponse.json({ subscribers: [...subs].map(e => ({ email: e })) });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@"))
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });

    const added = await redis.sadd("subscribers", email.toLowerCase().trim());
    if (!added) return NextResponse.json({ message: "Already subscribed" });
    return NextResponse.json({ message: "Subscribed successfully" });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
