import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import getSupabase from "@/lib/supabase";

export async function POST() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const supabase = getSupabase();
    await supabase.from("users").update({ last_seen: new Date().toISOString() }).eq("id", session.id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = getSupabase();
    const cutoff = new Date(Date.now() - 2 * 60 * 1000).toISOString();
    const { data, error } = await supabase
      .from("users")
      .select("id, sissy_name")
      .gte("last_seen", cutoff);
    if (error) throw error;
    return NextResponse.json((data || []).map(u => ({ id: u.id, name: u.sissy_name })));
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
