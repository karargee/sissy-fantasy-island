import { NextResponse } from "next/server";
import { isAdmin, unauthorized } from "@/lib/admin";
import getSupabase from "@/lib/supabase";

export async function GET(req) {
  if (!isAdmin(req)) return unauthorized();

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("users")
    .select("id, email, sissy_name, tier, member_since, bio")
    .order("member_since", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    users: data.map(u => ({
      id: u.id,
      email: u.email,
      sissyName: u.sissy_name,
      tier: u.tier,
      memberSince: u.member_since,
      bio: u.bio,
    })),
  });
}

export async function POST(req) {
  if (!isAdmin(req)) return unauthorized();

  try {
    const { userId, tier } = await req.json();
    const supabase = getSupabase();
    const { error } = await supabase.from("users").update({ tier }).eq("id", userId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
