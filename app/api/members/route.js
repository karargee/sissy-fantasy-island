import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import getSupabase from "@/lib/supabase";

export async function GET() {
  try {
    const session = await getSession();
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("users")
      .select("id, sissy_name, tier");
    if (error) throw error;
    return NextResponse.json(
      (data || [])
        .filter(u => !session || u.id !== session.id)
        .map(u => ({ id: u.id, sissyName: u.sissy_name, tier: u.tier }))
    );
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
