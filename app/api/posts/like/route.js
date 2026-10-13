import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import getSupabase from "@/lib/supabase";

export async function POST(req) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const { postId } = await req.json();
    const supabase = getSupabase();

    const { data: post, error: postError } = await supabase
      .from("posts")
      .select("id, user_id")
      .eq("id", postId)
      .single();
    if (postError || !post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    const { data: existing } = await supabase
      .from("post_likes")
      .select("user_id")
      .eq("user_id", session.id)
      .eq("post_id", postId)
      .maybeSingle();

    const liked = !existing;
    if (existing) {
      const { error: delError } = await supabase
        .from("post_likes")
        .delete()
        .eq("user_id", session.id)
        .eq("post_id", postId);
      if (delError) throw delError;
    } else {
      const { error: insError } = await supabase
        .from("post_likes")
        .insert({ user_id: session.id, post_id: postId });
      if (insError) throw insError;
    }

    const { count } = await supabase
      .from("post_likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", postId);

    await supabase.from("posts").update({ likes: count || 0 }).eq("id", postId);

    // Send notification to post author (not self)
    if (liked && post.user_id !== session.id) {
      await supabase.from("notifications").insert({
        user_id: post.user_id,
        type: "like",
        message: `${session.sissyName} liked your post`,
        read: false,
      });
    }

    return NextResponse.json({ likes: count || 0 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
