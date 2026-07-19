import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import redis from "@/lib/redis";

export async function GET() {
  try {
    const ids = await redis.lrange("posts", 0, 49);
    if (!ids.length) return NextResponse.json([]);
    const posts = await Promise.all(ids.map(id => redis.get(`post:${id}`)));
    return NextResponse.json(posts.filter(Boolean).map(p => typeof p === "string" ? JSON.parse(p) : p));
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const { content } = await req.json();
    if (!content?.trim()) return NextResponse.json({ error: "Post cannot be empty" }, { status: 400 });
    if (content.length > 500) return NextResponse.json({ error: "Max 500 characters" }, { status: 400 });

    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const post = {
      id,
      content: content.trim(),
      authorId: session.id,
      authorName: session.sissyName,
      authorTier: session.tier,
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
    };

    await redis.set(`post:${id}`, JSON.stringify(post));
    await redis.lpush("posts", id);
    return NextResponse.json(post);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
