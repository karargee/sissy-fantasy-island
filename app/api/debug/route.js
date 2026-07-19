import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export async function GET() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  let redisTest = "not tested";
  if (url && token) {
    try {
      const redis = new Redis({ url, token });
      await redis.set("debug_ping", "ok");
      const val = await redis.get("debug_ping");
      redisTest = val === "ok" ? "connected" : "unexpected value: " + val;
    } catch (e) {
      redisTest = "error: " + e.message;
    }
  } else {
    redisTest = "missing env vars";
  }

  return NextResponse.json({
    UPSTASH_REDIS_REST_URL: !!url,
    UPSTASH_REDIS_REST_TOKEN: !!token,
    JWT_SECRET: !!process.env.JWT_SECRET,
    redisTest,
  });
}
