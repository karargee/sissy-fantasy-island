import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET(req) {
  const pass = req.headers.get("x-admin-pass");
  if (pass !== "transparty2026")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sql = neon(process.env.DATABASE_URL);
  const rows = await sql`SELECT id, email, sissy_name, tier, member_since, bio FROM users ORDER BY member_since DESC`;
  return NextResponse.json(rows.map(u => ({ ...u, sissyName: u.sissy_name })));
}

export async function POST(req) {
  const pass = req.headers.get("x-admin-pass");
  if (pass !== "transparty2026")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { userId, tier } = await req.json();
  const sql = neon(process.env.DATABASE_URL);
  await sql`UPDATE users SET tier = ${tier} WHERE id = ${userId}`;
  return NextResponse.json({ success: true });
}
