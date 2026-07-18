import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { readFileSync } from "fs";
import { join } from "path";
import { signToken } from "@/lib/auth";

const DB = join(process.cwd(), "data", "users.json");

function getUsers() {
  try { return JSON.parse(readFileSync(DB, "utf8")); } catch { return []; }
}

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });

    let users = [];
    try { users = getUsers(); } catch {}

    const user = users.find((u) => u.email === email.toLowerCase());
    if (!user) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });

    const token = await signToken({ id: user.id, email: user.email, sissyName: user.sissyName, tier: user.tier });
    const res = NextResponse.json({ success: true, user: { id: user.id, email: user.email, sissyName: user.sissyName, tier: user.tier } });
    res.cookies.set("sfi_session", token, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30, path: "/" });
    return res;
  } catch (e) {
    console.error("Login error:", e);
    return NextResponse.json({ error: "Server error: " + e.message }, { status: 500 });
  }
}
