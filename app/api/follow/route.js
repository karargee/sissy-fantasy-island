import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import redis from "@/lib/redis";

export async function POST(req) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const { targetId } = await req.json();
    if (targetId === session.id) return NextResponse.json({ error: "Cannot follow yourself" }, { status: 400 });

    const isFollowing = await redis.sismember(`following:${session.id}`, targetId);
    if (isFollowing) {
      await redis.srem(`following:${session.id}`, targetId);
      await redis.srem(`followers:${targetId}`, session.id);
      return NextResponse.json({ following: false });
    } else {
      await redis.sadd(`following:${session.id}`, targetId);
      await redis.sadd(`followers:${targetId}`, session.id);
      // Notify
      const notif = { id: `${Date.now()}`, type: "follow", fromName: session.sissyName, read: false, createdAt: new Date().toISOString() };
      await redis.lpush(`notifs:${targetId}`, JSON.stringify(notif));
      await redis.ltrim(`notifs:${targetId}`, 0, 49);
      return NextResponse.json({ following: true });
    }
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const session = await getSession();
    const { searchParams } = new URL(req.url);
    const targetId = searchParams.get("targetId");

    const followers = await redis.scard(`followers:${targetId}`);
    const following = await redis.scard(`following:${targetId}`);
    const isFollowing = session ? await redis.sismember(`following:${session.id}`, targetId) : false;

    return NextResponse.json({ followers, following, isFollowing: !!isFollowing });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
