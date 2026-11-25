import { NextResponse } from "next/server";
import { isAdmin, unauthorized } from "@/lib/admin";
import getSupabase from "@/lib/supabase";

export async function GET() {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("site_settings").select("key, value");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const settings = Object.fromEntries((data || []).map(r => [r.key, r.value]));
  return NextResponse.json({ settings });
}

export async function POST(req) {
  if (!isAdmin(req)) return unauthorized();
  try {
    const { key, value } = await req.json();
    const supabase = getSupabase();
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key, value }, { onConflict: "key" });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
