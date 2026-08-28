import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

const ADMIN_PASS = "transparty2026";
const TO_EMAIL = "sissyfantasyisland70@gmail.com";

export async function GET() {
  const { data, error } = await supabase
    .from("gift_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ submissions: data });
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const tier = formData.get("tier") || "Unknown";
    const price = formData.get("price") || "Unknown";
    const code = formData.get("code") || "";
    const image = formData.get("image");

    const hasImage = !!(image && image.size > 0);
    const imageName = image?.name || null;

    const { error } = await supabase.from("gift_submissions").insert({
      tier,
      price,
      code: code || "No code",
      has_image: hasImage,
      image_name: imageName,
      status: "pending",
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

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
          from: process.env.GMAIL_USER,
          to: TO_EMAIL,
          subject: `🎁 New Gift Card Submission — ${tier} ($${price})`,
          html: `<h2>New Gift Card Payment</h2>
          <p><strong>Tier:</strong> ${tier}</p>
          <p><strong>Price:</strong> $${price}</p>
          <p><strong>Code:</strong> ${code || "None"}</p>
          <p><strong>Image:</strong> ${hasImage ? "Yes" : "No"}</p>`,
          attachments,
        });
      } catch (e) {
        console.error("Email error:", e.message);
      }
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
    const { error } = await supabase.from("gift_submissions").update({ status }).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
