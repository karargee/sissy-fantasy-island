import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  const admin = searchParams.get("admin");

  try {
    if (admin === "true") {
      const { data: sessions } = await supabase
        .from("chat_sessions")
        .select("session_id, unread_admin, started_at")
        .order("started_at", { ascending: false });

      const chats = {};
      await Promise.all((sessions || []).map(async (s) => {
        const { data: msgs } = await supabase
          .from("chat_messages")
          .select("*")
          .eq("session_id", s.session_id)
          .order("created_at", { ascending: true })
          .limit(100);
        chats[s.session_id] = {
          messages: msgs || [],
          unreadAdmin: s.unread_admin || 0,
          startedAt: s.started_at,
        };
      }));
      return NextResponse.json({ chats });
    }

    if (!sessionId) return NextResponse.json({ messages: [] });
    const { data: msgs } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })
      .limit(100);
    return NextResponse.json({ messages: msgs || [] });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { sessionId, text, from } = await req.json();
    if (!sessionId || !text || !from)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    // Upsert session
    await supabase.from("chat_sessions").upsert(
      { session_id: sessionId, started_at: new Date().toISOString() },
      { onConflict: "session_id" }
    );

    // Insert message
    const { data: msg } = await supabase.from("chat_messages").insert({
      session_id: sessionId,
      from_role: from,
      text,
    }).select().single();

    // Update unread count
    if (from === "user") {
      await supabase.rpc("increment_unread", { sid: sessionId });
    } else if (from === "admin") {
      await supabase.from("chat_sessions").update({ unread_admin: 0 }).eq("session_id", sessionId);
    }

    return NextResponse.json({ ok: true, msg });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
