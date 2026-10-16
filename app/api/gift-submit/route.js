import { NextResponse } from "next/server";
import { readStore, appendStore, writeStore } from "@/lib/store";

const ADMIN_PASS = process.env.ADMIN_PASSWORD;
const TO_EMAIL = "sissyfantasyisland70@gmail.com";

const VENUE_HTML = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0f;color:#fff;padding:2rem;border-radius:12px">
  <h1 style="color:#f5a9b8;text-align:center">🏳️⚧️ LA Trans Party 2026</h1>
  <p style="text-align:center;color:rgba(255,255,255,0.5)">Oct 23–24, 2026 · Venue Details</p>
  <div style="background:rgba(214,51,132,0.1);border:1px solid rgba(214,51,132,0.3);border-radius:10px;padding:1.5rem;margin:1.5rem 0">
    <h2 style="color:#f5a9b8;margin:0 0 1rem">📍 Venue Details</h2>
    <p><strong>Address:</strong> 1234 Sunset Blvd, West Hollywood, CA 90028</p>
    <p><strong>Doors Open:</strong> 9PM both nights</p>
  </div>
  <p style="text-align:center;color:rgba(255,255,255,0.3);font-size:0.8rem">Questions? Email sissyfantasyisland70@gmail.com</p>
</div>`;

export async function GET() {
  return NextResponse.json({ submissions: readStore("gift_submissions", []) });
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const tier = formData.get("tier") || "Unknown";
    const price = formData.get("price") || "Unknown";
    const code = formData.get("code") || "";
    const email = formData.get("email") || null;
    const image = formData.get("image");
    const hasImage = !!(image && image.size > 0);
    const imageName = image?.name || null;

    appendStore("gift_submissions", { tier, price, code: code || "No code", has_image: hasImage, image_name: imageName, status: "pending", email });

    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        const nodemailer = (await import("nodemailer")).default;
        const attachments = [];
        if (hasImage) {
          const buffer = Buffer.from(await image.arrayBuffer());
          attachments.push({ filename: imageName || "gift-card.jpg", content: buffer });
        }
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
        });
        await transporter.sendMail({
          from: process.env.GMAIL_USER, to: TO_EMAIL,
          subject: `🎁 New Gift Card — ${tier} ($${price})`,
          html: `<h2>New Gift Card Payment</h2><p><strong>Tier:</strong> ${tier}</p><p><strong>Price:</strong> $${price}</p><p><strong>Code:</strong> ${code || "None"}</p>`,
          attachments,
        });
      } catch (e) { console.error("Email error:", e.message); }
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  if (req.headers.get("x-admin-pass") !== ADMIN_PASS)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id, status } = await req.json();
    const subs = readStore("gift_submissions", []);
    const idx = subs.findIndex(s => s.id === id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    subs[idx].status = status;
    writeStore("gift_submissions", subs);

    if (status === "approved" && subs[idx].email && process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        const nodemailer = (await import("nodemailer")).default;
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
        });
        await transporter.sendMail({
          from: process.env.GMAIL_USER, to: subs[idx].email,
          subject: `✅ Your ${subs[idx].tier} ticket is confirmed — Venue Details Inside`,
          html: VENUE_HTML,
        });
      } catch (e) { console.error("Email error:", e.message); }
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
