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
    const likes = post.likes || [];
    const idx = likes.indexOf(session.id);
    const liked = idx === -1;
    if (liked) likes.push(session.id);
    else likes.splice(idx, 1);

    post.likes = likes;
    await redis.set(`post:${postId}`, JSON.stringify(post));

    // Send notification to post author (not self)
    if (liked && post.authorId !== session.id) {
      const notif = { id: `${Date.now()}`, type: "like", fromName: session.sissyName, postId, read: false, createdAt: new Date().toISOString() };
      await redis.lpush(`notifs:${post.authorId}`, JSON.stringify(notif));
      await redis.ltrim(`notifs:${post.authorId}`, 0, 49);
    }

    return NextResponse.json({ likes });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
