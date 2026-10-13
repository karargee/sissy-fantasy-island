import { NextResponse } from "next/server";
import getSupabase from "@/lib/supabase";

export async function GET() {
  let supabaseTest = "not tested";
  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("site_settings").select("key").limit(1);
    supabaseTest = error ? "error: " + error.message : "connected";
  } catch (e) {
    supabaseTest = "error: " + e.message;
  }

  return NextResponse.json({
    SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    JWT_SECRET: !!process.env.JWT_SECRET,
    GMAIL_USER: !!process.env.GMAIL_USER,
    GMAIL_APP_PASSWORD: !!process.env.GMAIL_APP_PASSWORD,
    STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
    supabaseTest,
  });
}
