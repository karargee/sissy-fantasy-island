import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { getSession } from "@/lib/auth";

export async function POST(req) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const { bio, sissyName } = await req.json();
    const sql = neon(process.env.DATABASE_URL);
    await sql`UPDATE users SET bio = ${bio}, sissy_name = ${sissyName} WHERE id = ${session.id}`;
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
