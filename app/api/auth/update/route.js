import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { getSession } from "@/lib/auth";

const DB = join(process.cwd(), "data", "users.json");

function getUsers() {
  try { return JSON.parse(readFileSync(DB, "utf8")); } catch { return []; }
}
function saveUsers(users) {
  writeFileSync(DB, JSON.stringify(users, null, 2));
}

export async function POST(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { bio, sissyName } = await req.json();
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === session.id);
  if (idx === -1) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (bio !== undefined) users[idx].bio = bio;
  if (sissyName !== undefined) users[idx].sissyName = sissyName;
  saveUsers(users);

  return NextResponse.json({ success: true });
}
