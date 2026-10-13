import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import getSupabase from "@/lib/supabase";

export async function POST(req) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const { postId } = await req.json();
    const supabase = getSupabase();

    const { data: post, error: fetchError } = await supabase
      .from("posts")
      .select("user_id")
      .eq("id", postId)
      .single();
    if (fetchError || !post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    if (post.user_id !== session.id) return NextResponse.json({ error: "Not your post" }, { status: 403 });

    const { error } = await supabase.from("posts").delete().eq("id", postId).eq("user_id", session.id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
