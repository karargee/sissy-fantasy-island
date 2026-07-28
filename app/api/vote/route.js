import redis from "@/lib/redis";
import { NextResponse } from "next/server";

// GET /api/vote — returns all vote counts
export async function GET() {
  try {
    const keys = await redis.keys("vote:*");
    const counts = {};
    if (keys.length) {
      const vals = await Promise.all(keys.map((k) => redis.get(k)));
      keys.forEach((k, i) => {
        counts[k.replace("vote:", "")] = parseInt(vals[i] || 0);
      });
    }
    return NextResponse.json({ counts });
  } catch {
    return NextResponse.json({ counts: {} });
  }
}

// POST /api/vote — body: { id }
export async function POST(req) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const count = await redis.incr(`vote:${id}`);
    return NextResponse.json({ id, count });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
