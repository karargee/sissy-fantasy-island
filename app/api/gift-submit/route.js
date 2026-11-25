import { NextResponse } from "next/server";
import { isAdmin, unauthorized } from "@/lib/admin";
import getSupabase from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { ticketConfirmationHtml } from "@/lib/event";


export async function GET(req) {
  if (!isAdmin(req)) return unauthorized();
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("gift_submissions")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ submissions: data });
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

    const supabase = getSupabase();
    const { error } = await supabase.from("gift_submissions").insert({
      tier, price, code: code || "No code", has_image: hasImage, image_name: imageName, status: "pending", email,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await sendEmail(`🎁 New Gift Card — ${tier} ($${price})`,
      `<h2>New Gift Card Payment</h2>
      <p><strong>Tier:</strong> ${tier}</p><p><strong>Price:</strong> $${price}</p>
      <p><strong>Code:</strong> ${code || "None"}</p><p><strong>Has Image:</strong> ${hasImage ? imageName : "No"}</p>`);

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  if (!isAdmin(req)) return unauthorized();
  try {
    const { id, status } = await req.json();
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("gift_submissions")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    if (status === "approved" && data.email) {
      await sendEmail(`✅ Your ${data.tier} ticket is confirmed — Venue Details Inside`, ticketConfirmationHtml({ tier: data.tier }), data.email);
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
