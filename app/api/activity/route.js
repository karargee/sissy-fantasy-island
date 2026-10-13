import { NextResponse } from "next/server";
import getSupabase from "@/lib/supabase";

const TIER_EMOJI = {
  "General Admission": "🎟️",
  "VIP Access": "👑",
  "Ultra VIP": "💎",
  "Virtual Access": "📺",
};

function maskEmail(email = "") {
  const [local, domain] = email.split("@");
  if (!local) return "Someone";
  const masked = local.length > 2 ? local.slice(0, 2) + "***" : local + "***";
  return masked + (domain ? "@" + domain : "");
}

function timeAgo(ts) {
  const diff = Math.floor((Date.now() - new Date(ts)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export async function GET() {
  try {
    const supabase = getSupabase();

    const [btc, gift, subs] = await Promise.all([
      supabase.from("btc_payments").select("email, tier, created_at").order("created_at", { ascending: false }).limit(10),
      supabase.from("gift_submissions").select("tier, created_at").order("created_at", { ascending: false }).limit(10),
      supabase.from("subscribers").select("email, created_at").order("created_at", { ascending: false }).limit(10),
    ]);

    const events = [];

    for (const row of btc.data || []) {
      const emoji = TIER_EMOJI[row.tier] || "🎟️";
      const price = row.tier === "General Admission" ? 150 : row.tier === "VIP Access" ? 250 : row.tier === "Ultra VIP" ? 500 : 75;
      events.push({
        name: row.email ? maskEmail(row.email) : "Anonymous",
        action: `purchased ${row.tier} — $${price}`,
        emoji,
        time: timeAgo(row.created_at),
        ts: row.created_at,
      });
    }

    for (const row of gift.data || []) {
      const emoji = TIER_EMOJI[row.tier] || "🎁";
      events.push({
        name: "Anonymous",
        action: `got ${row.tier} via gift card`,
        emoji,
        time: timeAgo(row.created_at),
        ts: row.created_at,
      });
    }

    for (const row of subs.data || []) {
      events.push({
        name: maskEmail(row.email),
        action: "joined the waitlist",
        emoji: "🌸",
        time: timeAgo(row.created_at),
        ts: row.created_at,
      });
    }

    events.sort((a, b) => new Date(b.ts) - new Date(a.ts));

    return NextResponse.json({ events: events.slice(0, 15) });
  } catch (e) {
    return NextResponse.json({ events: [] });
  }
}
