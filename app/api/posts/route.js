import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import getSupabase from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("posts")
      .select("*, users(sissy_name, tier)")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw error;
    return NextResponse.json(
      (data || []).map(p => ({
        id: p.id,
        content: p.content,
        authorId: p.user_id,
        authorName: p.users?.sissy_name || "Unknown",
        authorTier: p.users?.tier || "Free",
        likes: p.likes || 0,
        createdAt: p.created_at,
        comments: [],
      }))
    );
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const { content } = await req.json();
    if (!content?.trim()) return NextResponse.json({ error: "Post cannot be empty" }, { status: 400 });
    if (content.length > 500) return NextResponse.json({ error: "Max 500 characters" }, { status: 400 });

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("posts")
      .insert({ user_id: session.id, content: content.trim() })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({
      id: data.id,
      content: data.content,
      authorId: session.id,
      authorName: session.sissyName,
      authorTier: session.tier,
      likes: 0,
      createdAt: data.created_at,
      comments: [],
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const { id } = await req.json();
    const supabase = getSupabase();
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id)
      .eq("user_id", session.id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
