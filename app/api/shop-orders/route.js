import { NextResponse } from "next/server";
import { isAdmin, unauthorized } from "@/lib/admin";
import getSupabase from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req) {
  if (!isAdmin(req)) return unauthorized();
  const { data, error } = await getSupabase()
    .from("shop_orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ orders: data });
}

export async function PATCH(req) {
  if (!isAdmin(req)) return unauthorized();
  const { id, status } = await req.json();
  if (!["paid", "shipped", "refunded"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const { error } = await getSupabase().from("shop_orders").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
