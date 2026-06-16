import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const DATA_FILE = join(process.cwd(), "data", "btc-payments.json");

async function getPayments() {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function savePayments(payments) {
  await writeFile(DATA_FILE, JSON.stringify(payments, null, 2));
}

export async function GET() {
  const payments = await getPayments();
  return NextResponse.json({ payments });
}

export async function POST(req) {
  const { email, tier, txid } = await req.json();

  if (!email || !tier) {
    return NextResponse.json({ error: "Email and tier are required" }, { status: 400 });
  }

  const payments = await getPayments();
  payments.push({
    id: Date.now(),
    email,
    tier,
    txid: txid || "",
    status: "pending",
    date: new Date().toISOString(),
  });
  await savePayments(payments);

  return NextResponse.json({ message: "Payment confirmation received" });
}
