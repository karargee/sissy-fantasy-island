import { NextResponse } from "next/server";
import { getSession, signToken } from "@/lib/auth";
import getSupabase from "@/lib/supabase";

export async function POST(req) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const { bio, sissyName } = await req.json();
    const supabase = getSupabase();

    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("id, email, sissy_name, tier")
      .eq("email", session.email)
      .single();
    if (fetchError || !user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const updates = {};
    if (bio !== undefined) updates.bio = bio;
    if (sissyName !== undefined) updates.sissy_name = sissyName;

    if (Object.keys(updates).length > 0) {
      const { error: updateError } = await supabase
        .from("users")
        .update(updates)
        .eq("email", session.email);
      if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // Re-issue JWT so sissyName is current in session
    const newName = sissyName !== undefined ? sissyName : user.sissy_name;
    const token = await signToken({ id: user.id, email: user.email, sissyName: newName, tier: user.tier });
    const res = NextResponse.json({ success: true });
    res.cookies.set("sfi_session", token, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30, path: "/" });
    return res;
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
