import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function GET(req, { params }) {
  try {
    const { id } = params;

    // Find user by id
    const keys = await redis.keys("user:*");
    let member = null;
    for (const k of keys) {
      const raw = await redis.get(k);
      const u = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (u?.id === id) { member = u; break; }
    }

    if (!member) return NextResponse.json({ error: "Member not found" }, { status: 404 });

    // Get their posts
    const postIds = await redis.lrange("posts", 0, 99);
    const allPosts = await Promise.all(postIds.map(pid => redis.get(`post:${pid}`)));
    const posts = allPosts
      .filter(Boolean)
      .map(p => typeof p === "string" ? JSON.parse(p) : p)
      .filter(p => p.authorId === id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return NextResponse.json({
      member: { id: member.id, sissyName: member.sissyName, tier: member.tier, bio: member.bio, memberSince: member.memberSince },
      posts,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
