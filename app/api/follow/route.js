import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import getSupabase from "@/lib/supabase";

export async function POST(req) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const { targetId } = await req.json();
    if (targetId === session.id) return NextResponse.json({ error: "Cannot follow yourself" }, { status: 400 });

    const supabase = getSupabase();
    const { data: existing } = await supabase
      .from("follows")
      .select("follower_id")
      .eq("follower_id", session.id)
      .eq("following_id", targetId)
      .single();

    if (existing) {
      await supabase.from("follows").delete().eq("follower_id", session.id).eq("following_id", targetId);
      return NextResponse.json({ following: false });
    } else {
      await supabase.from("follows").insert({ follower_id: session.id, following_id: targetId });
      await supabase.from("notifications").insert({ user_id: targetId, type: "follow", message: `${session.sissyName} followed you`, read: false });
      return NextResponse.json({ following: true });
    }
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const session = await getSession();
    const { searchParams } = new URL(req.url);
    const targetId = searchParams.get("targetId");
    const supabase = getSupabase();

    const [{ count: followers }, { count: following }] = await Promise.all([
      supabase.from("follows").select("*", { count: "exact", head: true }).eq("following_id", targetId),
      supabase.from("follows").select("*", { count: "exact", head: true }).eq("follower_id", targetId),
    ]);

    let isFollowing = false;
    if (session) {
      const { data } = await supabase.from("follows").select("follower_id").eq("follower_id", session.id).eq("following_id", targetId).single();
      isFollowing = !!data;
    }

    return NextResponse.json({ followers: followers || 0, following: following || 0, isFollowing });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
