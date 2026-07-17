import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { getSession } from "@/lib/auth";

const DB = join(process.cwd(), "data", "users.json");

function getUsers() {
  try { return JSON.parse(readFileSync(DB, "utf8")); } catch { return []; }
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ user: null });

  const users = getUsers();
  const user = users.find((u) => u.id === session.id);
  if (!user) return NextResponse.json({ user: null });

  const { password, ...safe } = user;
  return NextResponse.json({ user: safe });
}
