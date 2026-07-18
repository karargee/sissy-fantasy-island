import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";
import { signToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });

    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`SELECT * FROM users WHERE email = ${email.toLowerCase()}`;

    if (rows.length === 0)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });

    const token = await signToken({ id: user.id, email: user.email, sissyName: user.sissy_name, tier: user.tier });
    const res = NextResponse.json({ success: true, user: { id: user.id, email: user.email, sissyName: user.sissy_name, tier: user.tier } });
    res.cookies.set("sfi_session", token, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30, path: "/" });
    return res;
  } catch (e) {
    console.error("Login error:", e);
    return NextResponse.json({ error: "Server error: " + e.message }, { status: 500 });
  }
}
