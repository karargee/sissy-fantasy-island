import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import getSupabase from "@/lib/supabase";

export async function POST(req) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const { postId, content } = await req.json();
    if (!content?.trim()) return NextResponse.json({ error: "Comment cannot be empty" }, { status: 400 });

    const supabase = getSupabase();

    const { data: post, error: postError } = await supabase
      .from("posts")
      .select("id, user_id")
      .eq("id", postId)
      .single();
    if (postError || !post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    const { data: comment, error } = await supabase
      .from("comments")
      .insert({ post_id: postId, user_id: session.id, content: content.trim() })
      .select()
      .single();
    if (error) throw error;

    // Send notification to post author (not self)
    if (post.user_id !== session.id) {
      await supabase.from("notifications").insert({
        user_id: post.user_id,
        type: "comment",
        message: `${session.sissyName} commented on your post`,
        read: false,
      });
    }

    return NextResponse.json({
      id: comment.id,
      authorId: session.id,
      authorName: session.sissyName,
      authorTier: session.tier,
      content: comment.content,
      createdAt: comment.created_at,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
