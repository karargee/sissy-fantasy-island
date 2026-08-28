import { NextResponse } from "next/server";
import getSupabase from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("chatroom_messages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(100);
    if (error) throw error;
    return NextResponse.json({ messages: data || [] });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { nickname, text, color } = await req.json();
    if (!nickname?.trim() || !text?.trim())
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    if (text.length > 500)
      return NextResponse.json({ error: "Too long" }, { status: 400 });

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("chatroom_messages")
      .insert({ nickname: nickname.trim().slice(0, 30), text: text.trim(), color: color || "#f5a9b8" })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ ok: true, message: data });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
