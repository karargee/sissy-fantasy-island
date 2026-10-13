import { NextResponse } from "next/server";
import getSupabase from "@/lib/supabase";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const supabase = getSupabase();

    const { data: member, error: memberError } = await supabase
      .from("users")
      .select("id, sissy_name, tier, bio, member_since")
      .eq("id", id)
      .single();

    if (memberError || !member) return NextResponse.json({ error: "Member not found" }, { status: 404 });

    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .select("id, content, likes, created_at")
      .eq("user_id", id)
      .order("created_at", { ascending: false });
    if (postsError) throw postsError;

    return NextResponse.json({
      member: {
        id: member.id,
        sissyName: member.sissy_name,
        tier: member.tier,
        bio: member.bio,
        memberSince: member.member_since,
      },
      posts: (posts || []).map((p) => ({
        id: p.id,
        content: p.content,
        likes: p.likes || 0,
        createdAt: p.created_at,
        comments: [],
      })),
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
