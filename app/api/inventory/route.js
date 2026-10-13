import { NextResponse } from "next/server";
import getSupabase from "@/lib/supabase";

export const revalidate = 60;

const DEFAULT_CAPS = {
  "General Admission": 200,
  "VIP Access": 100,
  "Ultra VIP": 50,
  "Virtual Access": 500,
};

export async function GET() {
  const tiers = Object.keys(DEFAULT_CAPS);

  try {
    const supabase = getSupabase();

    const { data: settingsRows } = await supabase.from("site_settings").select("key, value");
    const settings = {};
    for (const row of settingsRows || []) settings[row.key] = row.value;
    const caps = { ...DEFAULT_CAPS, ...(settings.ticket_caps || {}) };

    const { data: payments } = await supabase
      .from("btc_payments")
      .select("tier, status")
      .in("tier", tiers);

    const sold = {};
    for (const t of tiers) sold[t] = 0;
    for (const p of payments || []) {
      if (p.status === "rejected") continue;
      if (tiers.includes(p.tier)) sold[p.tier] += 1;
    }

    const inventory = tiers.map((tier) => ({
      tier,
      cap: caps[tier],
      sold: sold[tier],
      remaining: Math.max(0, caps[tier] - sold[tier]),
      percentage: Math.min(100, Math.round((sold[tier] / caps[tier]) * 100)),
    }));

    return NextResponse.json({ inventory }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } });
  } catch (e) {
    const inventory = tiers.map((tier) => ({
      tier,
      cap: DEFAULT_CAPS[tier],
      sold: 0,
      remaining: DEFAULT_CAPS[tier],
      percentage: 0,
    }));
    return NextResponse.json({ inventory });
  }
}
