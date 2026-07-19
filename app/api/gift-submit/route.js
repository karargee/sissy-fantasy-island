import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const tier = formData.get("tier") || "Unknown";
    const price = formData.get("price") || "Unknown";
    const code = formData.get("code") || "";
    const image = formData.get("image");

    // Always save to Redis first so nothing is lost
    const submission = {
      id: Date.now(),
      tier,
      price,
      code: code || "No code",
      hasImage: !!(image && image.size > 0),
      imageName: image?.name || null,
      status: "pending",
      date: new Date().toISOString(),
    };
    await redis.lpush("gift_submissions", JSON.stringify(submission));
    await redis.ltrim("gift_submissions", 0, 499);

    // Try email if configured
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        const nodemailer = (await import("nodemailer")).default;
        const attachments = [];
        if (image && image.size > 0) {
          const buffer = Buffer.from(await image.arrayBuffer());
          attachments.push({ filename: image.name || "gift-card.jpg", content: buffer });
        }
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
        });
        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: process.env.GMAIL_USER,
          subject: `🎁 New Gift Card Submission — ${tier} ($${price})`,
          html: `<h2>New Gift Card Payment</h2><p><strong>Tier:</strong> ${tier}</p><p><strong>Price:</strong> $${price}</p><p><strong>Code:</strong> ${code || "None"}</p><p><strong>Image:</strong> ${attachments.length > 0 ? "Yes" : "No"}</p><p><em>${new Date().toISOString()}</em></p>`,
          attachments,
        });
      } catch (emailErr) {
        console.error("Email failed (submission saved to Redis):", emailErr.message);
      }
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Gift submit error:", e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
