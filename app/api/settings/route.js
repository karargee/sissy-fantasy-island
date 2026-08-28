import { NextResponse } from "next/server";
import getSupabase from "@/lib/supabase";

const ADMIN_PASS = "transparty2026";

export async function GET() {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("site_settings").select("key, value");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const settings = {};
  for (const row of data || []) settings[row.key] = row.value;
  return NextResponse.json({ settings });
}

export async function POST(req) {
  if (req.headers.get("x-admin-pass") !== ADMIN_PASS)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
