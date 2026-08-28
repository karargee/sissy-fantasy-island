import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import supabase from "@/lib/supabase";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ user: null });

  const { data: user, error } = await supabase
    .from("users")
    .select("id, email, sissy_name, tier, member_since, bio")
    .eq("email", session.email)
    .single();

  if (error || !user) return NextResponse.json({ user: null });

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      sissyName: user.sissy_name,
      tier: user.tier,
      memberSince: user.member_since,
      bio: user.bio,
    },
  });
}
