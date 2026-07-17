import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const DB = join(process.cwd(), "data", "users.json");
const ADMIN_PASSWORD = "transparty2026";

function getUsers() {
  try { return JSON.parse(readFileSync(DB, "utf8")); } catch { return []; }
}
function saveUsers(users) {
  writeFileSync(DB, JSON.stringify(users, null, 2));
}

export async function GET(req) {
  const pass = req.headers.get("x-admin-pass");
  if (pass !== ADMIN_PASSWORD) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const users = getUsers().map(({ password, ...u }) => u);
  return NextResponse.json({ users });
}

export async function POST(req) {
  const pass = req.headers.get("x-admin-pass");
  if (pass !== ADMIN_PASSWORD) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { userId, tier } = await req.json();
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return NextResponse.json({ error: "User not found" }, { status: 404 });

  users[idx].tier = tier;
  saveUsers(users);

  return NextResponse.json({ success: true });
}
