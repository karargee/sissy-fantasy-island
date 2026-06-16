import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const DATA_FILE = join(process.cwd(), "data", "messages.json");

async function getMessages() {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveMessages(msgs) {
  await writeFile(DATA_FILE, JSON.stringify(msgs, null, 2));
}

export async function GET() {
  const msgs = await getMessages();
  return NextResponse.json({ messages: msgs });
}

export async function POST(req) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const msgs = await getMessages();
  msgs.push({
    id: Date.now(),
    name,
    email,
    subject,
    message,
    date: new Date().toISOString(),
    read: false,
  });
  await saveMessages(msgs);

  return NextResponse.json({ message: "Message sent successfully" });
}
