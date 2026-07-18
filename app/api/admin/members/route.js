import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function GET(req) {
  const pass = req.headers.get("x-admin-pass");
  if (pass !== "transparty2026")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("users")
    .select("id, email, sissy_name, tier, member_since, bio")
    .order("member_since", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data.map(u => ({ ...u, sissyName: u.sissy_name })));
}

export async function POST(req) {
  const pass = req.headers.get("x-admin-pass");
  if (pass !== "transparty2026")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { userId, tier } = await req.json();
  const supabase = getSupabase();

  const { error } = await supabase
    .from("users")
    .update({ tier })
    .eq("id", userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
