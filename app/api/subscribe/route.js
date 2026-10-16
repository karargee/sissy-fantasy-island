import { NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/store";

export async function GET() {
  return NextResponse.json({ subscribers: readStore("subscribers", []) });
}

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@"))
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });

    const clean = email.toLowerCase().trim();
    const subs = readStore("subscribers", []);
    if (!subs.find(s => s.email === clean)) {
      subs.unshift({ email: clean, created_at: new Date().toISOString() });
      writeStore("subscribers", subs);
    }
    return NextResponse.json({ message: "Subscribed successfully" });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
