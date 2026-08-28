import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import getSupabase from "@/lib/supabase";

export async function GET(req) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const withUser = searchParams.get("with");
    const supabase = getSupabase();

    if (withUser) {
      const { data, error } = await supabase
        .from("direct_messages")
        .select("*")
        .or(`and(from_id.eq.${session.id},to_id.eq.${withUser}),and(from_id.eq.${withUser},to_id.eq.${session.id})`)
        .order("created_at", { ascending: true })
        .limit(100);
      if (error) throw error;
      return NextResponse.json(data || []);
    }

    // Get all conversations
    const { data: msgs, error } = await supabase
      .from("direct_messages")
      .select("*")
      .or(`from_id.eq.${session.id},to_id.eq.${session.id}`)
      .order("created_at", { ascending: false });
    if (error) throw error;

    const seen = new Set();
    const convos = [];
    for (const m of msgs || []) {
      const otherId = m.from_id === session.id ? m.to_id : m.from_id;
      if (seen.has(otherId)) continue;
      seen.add(otherId);
      const { data: other } = await supabase.from("users").select("sissy_name, tier").eq("id", otherId).single();
      convos.push({
        userId: otherId,
        userName: other?.sissy_name || "Unknown",
        userTier: other?.tier || "Free",
        lastMessage: { content: m.content, createdAt: m.created_at },
      });
    }
    return NextResponse.json(convos);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const { toId, content } = await req.json();
    if (!content?.trim()) return NextResponse.json({ error: "Message cannot be empty" }, { status: 400 });
    if (!toId) return NextResponse.json({ error: "Recipient required" }, { status: 400 });

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("direct_messages")
      .insert({ from_id: session.id, to_id: toId, content: content.trim() })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
