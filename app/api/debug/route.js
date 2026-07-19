import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function GET() {
  let redisTest = "not tested";
  try {
    await redis.set("debug_ping", "ok");
    const val = await redis.get("debug_ping");
    redisTest = val === "ok" ? "connected" : "unexpected: " + val;
  } catch (e) {
    redisTest = "error: " + e.message;
  }

  return NextResponse.json({
    UPSTASH_REDIS_REST_URL: !!process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: !!process.env.UPSTASH_REDIS_REST_TOKEN,
    JWT_SECRET: !!process.env.JWT_SECRET,
    redisTest,
  });
}
