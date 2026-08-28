import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

const TO_EMAIL = "sissyfantasyisland70@gmail.com";

async function sendEmail(subject, html) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) return;
  try {
    const nodemailer = (await import("nodemailer")).default;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    });
    await transporter.sendMail({ from: process.env.GMAIL_USER, to: TO_EMAIL, subject, html });
  } catch (e) {
    console.error("Email error:", e.message);
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ messages: data });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, message, phone, location, pkg, date, notes } = body;
    const isDungeon = subject === "Dungeon Booking Request";

    if (!isDungeon && (!name || !email || !subject || !message))
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });

    const { error } = await supabase.from("contact_messages").insert({
      name: name || "N/A",
      email: email || "N/A",
      subject: subject || "Contact",
      message: message || notes || "N/A",
      phone: phone || "",
      location: location || "",
      pkg: pkg || "",
      date: date || "",
      notes: notes || "",
      read: false,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    if (isDungeon) {
      await sendEmail(
        `🚚 New Dungeon Booking — ${pkg}`,
        `<h2>New Dungeon Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Package:</strong> ${pkg}</p>
        <p><strong>Date:</strong> ${date || "Not specified"}</p>
        <p><strong>Notes:</strong> ${notes || "None"}</p>`
      );
    } else {
      await sendEmail(
        `📬 New Contact Message — ${subject}`,
        `<h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p><p>${message}</p>`
      );
    }

    return NextResponse.json({ message: "Sent successfully" });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
