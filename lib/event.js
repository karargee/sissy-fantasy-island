// Single source of truth for event details and ticket tiers.
// Prices are read server-side by /api/checkout, so the client can't change them.

export const EVENT = {
  name: "LA Trans Party",
  edition: "Winter 2026",
  city: "Los Angeles, CA",
  dateLabel: "Sunday, December 13, 2026",
  shortDate: "Dec 13, 2026",
  doors: "9:00 PM",
  ends: "4:00 AM",
  startISO: "2026-12-13T21:00:00-08:00",
  endISO: "2026-12-14T04:00:00-08:00",
  contactEmail: "sissyfantasyisland70@gmail.com",
  phone: "+14153053689",
  phoneLabel: "(415) 305-3689",
};

export const TIERS = [
  {
    id: "ga",
    name: "General Admission",
    price: 150,
    summary: "Full access to the main floor and themed rooms.",
    perks: [
      "Entry from 9:00 PM",
      "Main floor and all themed rooms",
      "Welcome drink on arrival",
      "Resident DJs all night",
      "Coat check",
    ],
  },
  {
    id: "vip",
    name: "VIP",
    price: 250,
    featured: true,
    summary: "Priority entry, a private lounge and drinks included.",
    perks: [
      "Everything in General Admission",
      "Priority entry — skip the line",
      "Private VIP lounge and reserved seating",
      "Three premium drinks included",
      "Meet the hosts and performers",
      "VIP gift bag",
    ],
  },
  {
    id: "ultra",
    name: "Ultra VIP",
    price: 500,
    summary: "A private suite, open bar and a personal host.",
    perks: [
      "Everything in VIP",
      "Private suite for the night",
      "Personal host",
      "Premium open bar",
      "Early entry at 8:00 PM",
      "Portrait session with our photographer",
      "Car pickup within the LA area",
    ],
  },
];

export const VIRTUAL_TIER = {
  id: "virtual",
  name: "Virtual Access",
  price: 75,
  summary: "Live stream of the main-stage performances, plus replay for 48 hours.",
  perks: [
    "HD stream of main-stage performances",
    "48-hour replay",
    "Live chat during the event",
    "Members-only photo gallery",
  ],
};

export const ALL_TIERS = [...TIERS, VIRTUAL_TIER];

export function findTier(id) {
  return ALL_TIERS.find((t) => t.id === id) || null;
}

// Email sent to a buyer once their payment is confirmed (card, BTC or legacy gift card).
export function ticketConfirmationHtml({ tier, quantity = 1 } = {}) {
  const venue = process.env.VENUE_ADDRESS || "Private venue in Los Angeles — the address will be emailed 48 hours before doors.";
  const ticketLine = tier ? `<p style="margin:0 0 8px"><strong>Ticket:</strong> ${tier}${quantity > 1 ? ` × ${quantity}` : ""}</p>` : "";
  return `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0c0b0d;color:#ece6df;padding:32px;border-radius:8px">
  <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#8a837d;margin:0 0 8px">${EVENT.name}</p>
  <h1 style="font-family:Georgia,serif;font-weight:400;font-size:28px;margin:0 0 16px">Your ticket is confirmed.</h1>
  ${ticketLine}
  <p style="margin:0 0 8px"><strong>Date:</strong> ${EVENT.dateLabel}</p>
  <p style="margin:0 0 8px"><strong>Doors:</strong> ${EVENT.doors} – ${EVENT.ends}</p>
  <p style="margin:0 0 16px"><strong>Venue:</strong> ${venue}</p>
  <p style="margin:0 0 16px;color:#a8a19a">Strictly 18+. Bring photo ID matching the name on your ticket.</p>
  <p style="font-size:12px;color:#8a837d;margin:0">Questions? Write to ${EVENT.contactEmail}</p>
</div>`;
}
