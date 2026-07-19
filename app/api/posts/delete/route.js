import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import redis from "@/lib/redis";

export async function POST(req) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const { postId } = await req.json();
    const raw = await redis.get(`post:${postId}`);
    if (!raw) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    const post = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (post.authorId !== session.id) return NextResponse.json({ error: "Not your post" }, { status: 403 });

    await redis.del(`post:${postId}`);
    await redis.lrem("posts", 0, postId);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
