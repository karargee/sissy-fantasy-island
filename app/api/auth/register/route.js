import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { signToken } from "@/lib/auth";

const DB = join(process.cwd(), "data", "users.json");

function getUsers() {
  try { return JSON.parse(readFileSync(DB, "utf8")); } catch { return []; }
}
function saveUsers(users) {
  writeFileSync(DB, JSON.stringify(users, null, 2));
}

export async function POST(req) {
  try {
    const { email, password, sissyName } = await req.json();

    if (!email || !password || !sissyName)
      return NextResponse.json({ error: "All fields required" }, { status: 400 });

    const users = getUsers();
    if (users.find((u) => u.email === email.toLowerCase()))
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });

    const hashed = await bcrypt.hash(password, 12);
    const id = `SFI-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    const user = {
      id,
      email: email.toLowerCase(),
      password: hashed,
      sissyName,
      tier: "Free",
      memberSince: new Date().toISOString(),
      avatar: "",
      bio: "",
    };

    users.push(user);
    saveUsers(users);

    const token = await signToken({ id: user.id, email: user.email, sissyName: user.sissyName });
    const res = NextResponse.json({ success: true, user: { id, email: user.email, sissyName, tier: user.tier } });
    res.cookies.set("sfi_session", token, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30, path: "/" });
    return res;
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
