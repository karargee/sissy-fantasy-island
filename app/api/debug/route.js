import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    DATABASE_URL: !!process.env.DATABASE_URL,
    POSTGRES_URL: !!process.env.POSTGRES_URL,
    DATABASE_URL_UNPOOLED: !!process.env.DATABASE_URL_UNPOOLED,
    PGHOST: !!process.env.PGHOST,
    PGDATABASE: !!process.env.PGDATABASE,
  });
}
