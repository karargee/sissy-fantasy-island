import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const DATA_FILE = join(process.cwd(), "data", "subscribers.json");

async function getSubscribers() {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveSubscribers(subs) {
  await writeFile(DATA_FILE, JSON.stringify(subs, null, 2));
}

export async function GET() {
  const subs = await getSubscribers();
  return NextResponse.json({ subscribers: subs });
}

export async function POST(req) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const subs = await getSubscribers();

  if (subs.find((s) => s.email === email)) {
    return NextResponse.json({ message: "Already subscribed" });
  }

  subs.push({ email, date: new Date().toISOString() });
  await saveSubscribers(subs);

  return NextResponse.json({ message: "Subscribed successfully" });
}
