import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";
import { signToken } from "@/lib/auth";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function POST(req) {
  try {
    const { email, password, sissyName } = await req.json();

    if (!email || !password || !sissyName)
      return NextResponse.json({ error: "All fields required" }, { status: 400 });

    if (password.length < 8)
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });

    const supabase = getSupabase();

    // Check if email exists
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("email", email.toLowerCase())
      .single();

    if (existing)
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });

    const hashed = await bcrypt.hash(password, 10);
    const id = `SFI-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    const { error: insertError } = await supabase.from("users").insert({
      id,
      email: email.toLowerCase(),
      password: hashed,
      sissy_name: sissyName,
      tier: "Free",
      member_since: new Date().toISOString(),
      bio: "",
    });

    if (insertError)
      return NextResponse.json({ error: "Could not create account: " + insertError.message }, { status: 500 });

    const token = await signToken({ id, email: email.toLowerCase(), sissyName, tier: "Free" });
    const res = NextResponse.json({ success: true, user: { id, email: email.toLowerCase(), sissyName, tier: "Free" } });
    res.cookies.set("sfi_session", token, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30, path: "/" });
    return res;
  } catch (e) {
    console.error("Register error:", e);
    return NextResponse.json({ error: "Server error: " + e.message }, { status: 500 });
  }
}
