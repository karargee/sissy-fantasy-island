import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import getSupabase from "@/lib/supabase";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", session.id)
      .order("created_at", { ascending: false })
      .limit(30);
    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { toId, type, fromName, postId } = await req.json();
    if (!toId || !type) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("notifications")
      .insert({ user_id: toId, type, message: `${fromName} ${type === "like" ? "liked your post" : type === "comment" ? "commented on your post" : "followed you"}`, read: false })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PATCH() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const supabase = getSupabase();
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", session.id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
