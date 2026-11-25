import { NextResponse } from "next/server";
import { isAdmin, unauthorized } from "@/lib/admin";
import getSupabase from "@/lib/supabase";
import { sendEmail } from "@/lib/email";

export async function GET(req) {
  if (!isAdmin(req)) return unauthorized();
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
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

    const supabase = getSupabase();
    const { error } = await supabase.from("contact_messages").insert({
      name: name || "N/A", email: email || "N/A", subject: subject || "Contact",
      message: message || notes || "N/A", phone: phone || "", location: location || "",
      pkg: pkg || "", date: date || "", notes: notes || "", read: false,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    if (isDungeon) {
      await sendEmail(`🚚 New Dungeon Booking — ${pkg}`,
        `<h2>New Dungeon Booking</h2>
        <p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p><p><strong>Location:</strong> ${location}</p>
        <p><strong>Package:</strong> ${pkg}</p><p><strong>Date:</strong> ${date || "Not specified"}</p>
        <p><strong>Notes:</strong> ${notes || "None"}</p>`);
    } else {
      await sendEmail(`📬 New Message — ${subject}`,
        `<h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong></p><p>${message}</p>`);
    }

    return NextResponse.json({ message: "Sent successfully" });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
