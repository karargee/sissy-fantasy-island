import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";
import { signToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, password, sissyName } = await req.json();

    if (!email || !password || !sissyName)
      return NextResponse.json({ error: "All fields required" }, { status: 400 });

    if (password.length < 8)
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });

    const connStr = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL_UNPOOLED;
    if (!connStr)
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });

    const sql = neon(connStr);

    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        sissy_name TEXT,
        tier TEXT DEFAULT 'Free',
        member_since TIMESTAMPTZ DEFAULT NOW(),
        bio TEXT DEFAULT ''
      )
    `;

    const existing = await sql`SELECT id FROM users WHERE email = ${email.toLowerCase()}`;
    if (existing.length > 0)
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });

    const hashed = await bcrypt.hash(password, 10);
    const id = `SFI-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    await sql`
      INSERT INTO users (id, email, password, sissy_name, tier, member_since, bio)
      VALUES (${id}, ${email.toLowerCase()}, ${hashed}, ${sissyName}, 'Free', NOW(), '')
    `;

    const token = await signToken({ id, email: email.toLowerCase(), sissyName, tier: "Free" });
    const res = NextResponse.json({ success: true, user: { id, email: email.toLowerCase(), sissyName, tier: "Free" } });
    res.cookies.set("sfi_session", token, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30, path: "/" });
    return res;
  } catch (e) {
    console.error("Register error:", e);
    return NextResponse.json({ error: "Server error: " + e.message }, { status: 500 });
  }
}
