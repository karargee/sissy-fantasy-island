import { NextResponse } from "next/server";
import { isAdmin, unauthorized } from "@/lib/admin";
import getSupabase from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req) {
  if (!isAdmin(req)) return unauthorized();
  const { data, error } = await getSupabase()
    .from("card_payments")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ payments: data });
}
