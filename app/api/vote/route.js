import { NextResponse } from "next/server";
import getSupabase from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("votes")
      .select("contestant_id");
    if (error) return NextResponse.json({ counts: {} });
    const counts = {};
    for (const row of data || []) {
      counts[row.contestant_id] = (counts[row.contestant_id] || 0) + 1;
    }
    return NextResponse.json({ counts });
  } catch {
    return NextResponse.json({ counts: {} });
  }
}

export async function POST(req) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const supabase = getSupabase();
    await supabase.from("votes").insert({ contestant_id: id });
    const { count } = await supabase
      .from("votes")
      .select("*", { count: "exact", head: true })
      .eq("contestant_id", id);
    return NextResponse.json({ id, count: count || 0 });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
