import { NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/store";

const ADMIN_PASS = process.env.ADMIN_PASSWORD;

export async function GET() {
  return NextResponse.json({ settings: readStore("site_settings", {}) });
}

export async function POST(req) {
  if (req.headers.get("x-admin-pass") !== ADMIN_PASS)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { key, value } = await req.json();
    const settings = readStore("site_settings", {});
    settings[key] = value;
    writeStore("site_settings", settings);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
