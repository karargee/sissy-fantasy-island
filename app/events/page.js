"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

const BTC_WALLET = "bc1q6k7lmj5jruuk0tq28c03pc5ae2jv0wnthdpxpn";

const EVENTS = [
  {
    name: "Trans & Sex Party — Las Vegas",
    date: "August 15–16, 2026",
    location: "The Venetian Resort, Las Vegas, NV",
    emoji: "🎉",
    img: "https://images.unsplash.com/photo-1605723517503-3cadb5818a0c?w=800&q=80",
    status: "Tickets Available",
    desc: "The biggest trans & sissy party of the year. Two nights of music, dancing, and community in the heart of Las Vegas. Theme: Glam & Glitter.",
    rules: ["18+ only — ID required", "Dress code enforced — femme/glam attire", "Consent is mandatory — zero tolerance policy", "No photography without consent", "Safe word: RED"],
    tickets: [
      { name: "General Admission", price: 300, perks: ["Entry to both nights", "Welcome drink", "Community access"] },
      { name: "VIP", price: 500, perks: ["Priority entry", "VIP lounge access", "Open bar", "Meet & greet with hosts", "Exclusive gift bag"] },
      { name: "Diamond Table", price: 1000, perks: ["Private table for 4", "Bottle service", "All VIP perks", "Personal host", "After-party access"] },
    ],
  },
  {
    name: "Sissy Brunch & Social — Miami",
    date: "October 2026",
    location: "TBA — Private Venue, Miami, FL",
    emoji: "🥂",
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
    status: "Coming Soon",
    desc: "A daytime social brunch for the community. Elegant, intimate, and fabulous. Perfect for first-timers and veterans alike.",
    rules: ["18+ only", "Smart casual to femme attire", "Consent and respect required at all times"],
    tickets: [
      { name: "Brunch Ticket", price: 150, perks: ["3-course brunch", "Welcome mimosa", "Community meetup"] },
      { name: "VIP Brunch", price: 250, perks: ["Premium seating", "Unlimited mimosas", "Gift bag", "Priority entry"] },
    ],
  },
  {
    name: "Masked Gala — New York",
    date: "December 2026",
    location: "TBA — Private Venue, New York, NY",
    emoji: "🎭",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    status: "Coming Soon",
    desc: "An exclusive masked gala for the most glamorous night of the year. Formal attire required. Masks provided at the door.",
    rules: ["18+ only", "Formal/black tie attire required", "Masks must be worn at all times in main hall", "No phones in main event space"],
    tickets: [
      { name: "Gala Entry", price: 400, perks: ["Entry + mask provided", "Champagne reception", "Live entertainment"] },
      { name: "VIP Gala", price: 700, perks: ["Premium mask + outfit consultation", "VIP table", "Champagne & canapés", "Meet the organizers"] },
    ],
  },
];

function CountdownTimer({ targetDate }) {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return;
      setTime({ days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), mins: Math.floor((diff % 3600000) / 60000), secs: Math.floor((diff % 60000) / 1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return (
    <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}>
      {[[time.days, "Days"], [time.hours, "Hours"], [time.mins, "Mins"], [time.secs, "Secs"]].map(([v, l]) => (
        <div key={l} style={{ textAlign: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "0.8rem 1.2rem", minWidth: 60 }}>
          <div style={{ fontSize: "1.6rem", fontWeight: 800, background: "linear-gradient(135deg, #f5a9b8, #d63384)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{v}</div>
          <div style={{ fontSize: "0.62rem", opacity: 0.4, textTransform: "uppercase", letterSpacing: 1 }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

export default function EventsPage() {
  const [modal, setModal] = useState(null); // { event, ticket }
  const [payMethod, setPayMethod] = useState(null);
  const [email, setEmail] = useState("");
  const [giftCode, setGiftCode] = useState("");
  const [giftImage, setGiftImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function openModal(event, ticket) {
    setModal({ event, ticket });
    setPayMethod(null);
    setSubmitted(false);
    setEmail("");
    setGiftCode("");
    setGiftImage(null);
  }

  function closeModal() { setModal(null); setPayMethod(null); }

  return (
    <div style={{ minHeight: "100vh", background: "#060608", color: "#f0f0f0" }}>
      {/* Nav */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "1.2rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(6,6,8,0.92)", backdropFilter: "blur(20px)", zIndex: 100 }}>
        <Link href="/" style={{ color: "#f5a9b8", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem" }}>← SFI 💕</Link>
        <span style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: 1 }}>🎉 Events</span>
        <Link href="/register" style={{ background: "linear-gradient(135deg, #d63384, #7c3aed)", padding: "0.45rem 1rem", borderRadius: 6, color: "white", textDecoration: "none", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>Join</Link>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1.5rem" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, padding: "0.3rem 1rem", borderRadius: 50, background: "rgba(214,51,132,0.12)", border: "1px solid rgba(214,51,132,0.25)", color: "#f5a9b8", marginBottom: "1rem" }}>Exclusive Events</div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, letterSpacing: -1, marginBottom: "0.8rem" }}>Upcoming Events</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7, fontSize: "0.95rem" }}>Private, adults-only events for the trans & sissy community. Card holders get priority access and discounts.</p>
        </div>

        {/* Countdown */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "2rem", textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ opacity: 0.5, fontSize: "0.85rem", marginBottom: "1rem" }}>🎰 Trans & Sex Party Las Vegas — Starts In:</p>
          <CountdownTimer targetDate="2026-08-15T20:00:00" />
        </div>

        {/* Events list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {EVENTS.map((ev) => (
            <div key={ev.name} style={{ background: "#0d0d12", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, overflow: "hidden" }}>
              {/* Banner image */}
              <div style={{ position: "relative", height: 220 }}>
                <Image src={ev.img} alt={ev.name} fill style={{ objectFit: "cover", opacity: 0.45 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(6,6,8,0.92) 40%, transparent)" }} />
                <div style={{ position: "absolute", inset: 0, padding: "1.8rem", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>{ev.emoji}</div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.4rem" }}>{ev.name}</h2>
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.82rem", color: "rgba(255,255,255,0.55)" }}>
                    <span>📅 {ev.date}</span>
                    <span>📍 {ev.location}</span>
                  </div>
                  <div style={{ marginTop: "0.7rem" }}>
                    <span style={{ display: "inline-block", padding: "0.25rem 0.8rem", borderRadius: 50, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.5px", background: ev.status === "Tickets Available" ? "rgba(40,167,69,0.15)" : "rgba(255,255,255,0.06)", border: `1px solid ${ev.status === "Tickets Available" ? "rgba(40,167,69,0.3)" : "rgba(255,255,255,0.1)"}`, color: ev.status === "Tickets Available" ? "#4ade80" : "rgba(255,255,255,0.4)" }}>{ev.status}</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: "2rem" }}>
                <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontSize: "0.9rem", marginBottom: "1.5rem" }}>{ev.desc}</p>

                {/* Rules */}
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: "1rem 1.2rem", marginBottom: "1.5rem" }}>
                  <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.3)", fontWeight: 700, marginBottom: "0.6rem" }}>Event Rules</div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    {ev.rules.map((r, i) => (
                      <li key={i} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", display: "flex", gap: "0.5rem" }}>
                        <span style={{ color: "#d63384", fontWeight: 800, flexShrink: 0 }}>✓</span>{r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ticket options */}
                <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.3)", fontWeight: 700, marginBottom: "1rem" }}>Ticket Options</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                  {ev.tickets.map((t) => (
                    <div key={t.name} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "1.4rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.92rem", marginBottom: "0.2rem" }}>{t.name}</div>
                        <div style={{ fontSize: "1.7rem", fontWeight: 900, background: "linear-gradient(135deg, #f5a9b8, #d63384)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: -1 }}>${t.price}</div>
                      </div>
                      <ul style={{ listStyle: "none", flex: 1, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                        {t.perks.map((p) => (
                          <li key={p} style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", display: "flex", gap: "0.5rem" }}>
                            <span style={{ color: "#d63384", fontWeight: 800, flexShrink: 0 }}>✓</span>{p}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => ev.status === "Tickets Available" && openModal(ev, t)}
                        style={{ padding: "0.65rem", borderRadius: 8, border: "none", background: ev.status === "Tickets Available" ? "linear-gradient(135deg, #d63384, #7c3aed)" : "rgba(255,255,255,0.05)", color: ev.status === "Tickets Available" ? "white" : "rgba(255,255,255,0.25)", fontWeight: 700, fontSize: "0.8rem", cursor: ev.status === "Tickets Available" ? "pointer" : "not-allowed", fontFamily: "inherit", textTransform: "uppercase", letterSpacing: "0.5px" }}
                      >
                        {ev.status === "Tickets Available" ? `Get Ticket — $${t.price}` : "Coming Soon"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Card holder CTA */}
        <div style={{ marginTop: "3rem", background: "rgba(214,51,132,0.04)", border: "1px solid rgba(214,51,132,0.12)", borderRadius: 16, padding: "2rem", textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>💳</div>
          <h3 style={{ marginBottom: "0.5rem" }}>Card Holders Get Priority Access</h3>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1.2rem" }}>Gold, Platinum & Diamond card holders get priority seating, discounts, and early access to all events.</p>
          <Link href="/#cards" style={{ display: "inline-block", padding: "0.7rem 1.8rem", borderRadius: 8, background: "linear-gradient(135deg, #d63384, #7c3aed)", color: "white", textDecoration: "none", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Get Your Card →</Link>
        </div>
      </div>

      {/* Payment Modal */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "1rem" }} onClick={closeModal}>
          <div style={{ background: "#0e0e14", border: "1px solid rgba(214,51,132,0.25)", borderRadius: 20, padding: "2rem", maxWidth: 460, width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative" }} onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} style={{ position: "absolute", top: "1rem", right: "1.2rem", background: "rgba(255,255,255,0.06)", border: "none", color: "white", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: "0.9rem" }}>✕</button>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.2rem" }}>{modal.ticket.name}</h2>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.82rem", marginBottom: "0.3rem" }}>{modal.event.name}</p>
            <div style={{ fontSize: "1.6rem", fontWeight: 900, background: "linear-gradient(135deg, #f5a9b8, #d63384)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1.5rem" }}>${modal.ticket.price} — one-time</div>

            {!payMethod && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <button onClick={() => setPayMethod("btc")} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.1rem 1.4rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, color: "white", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  <span style={{ fontSize: "1.4rem" }}>₿</span> Pay with Bitcoin
                </button>
                <button onClick={() => setPayMethod("gift")} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.1rem 1.4rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, color: "white", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  <span style={{ fontSize: "1.4rem" }}>🎁</span> Redeem Gift Card
                </button>
              </div>
            )}

            {payMethod === "btc" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "1.5rem", textAlign: "center" }}>
                  <div style={{ background: "white", display: "inline-block", padding: "0.8rem", borderRadius: 10, marginBottom: "0.8rem" }}>
                    <QRCodeSVG value={`bitcoin:${BTC_WALLET}`} size={140} bgColor="#ffffff" fgColor="#0a0a0f" level="H" />
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.6rem" }}>Scan to send BTC</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "0.5rem 0.8rem" }}>
                    <code style={{ flex: 1, fontSize: "0.58rem", wordBreak: "break-all", color: "rgba(255,255,255,0.6)", fontFamily: "monospace" }}>{BTC_WALLET}</code>
                    <button onClick={() => navigator.clipboard.writeText(BTC_WALLET)} style={{ padding: "0.3rem 0.7rem", borderRadius: 6, border: "1px solid rgba(247,147,26,0.3)", background: "rgba(247,147,26,0.1)", color: "#f7931a", fontSize: "0.72rem", cursor: "pointer", fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap" }}>Copy</button>
                  </div>
                </div>
                {submitted ? (
                  <div style={{ color: "#4ade80", fontWeight: 600, textAlign: "center", padding: "1rem" }}>✅ Confirmed! Your ticket will be sent within 1 hour.</div>
                ) : (
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    const txid = e.target.querySelector('[placeholder="BTC Transaction ID (optional)"]')?.value || "";
                    try {
                      await fetch("/api/btc-confirm", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, tier: `${modal.ticket.name} — ${modal.event.name}`, txid, delivery: "email" }),
                      });
                    } catch {}
                    setSubmitted(true);
                  }} style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                    <input type="email" placeholder="Your email for ticket delivery" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
                    <input type="text" placeholder="BTC Transaction ID (optional)" className="form-input" />
                    <button type="submit" className="buy-btn donate-btn">Confirm Payment</button>
                    <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", textAlign: "center" }}>We verify on-chain and send your ticket within 1 hour</p>
                  </form>
                )}
                <button onClick={() => setPayMethod(null)} style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", padding: "0.45rem 1rem", borderRadius: 8, cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit", alignSelf: "flex-start" }}>← Back</button>
              </div>
            )}

            {payMethod === "gift" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {submitted ? (
                  <div style={{ color: "#4ade80", fontWeight: 600, textAlign: "center", padding: "1.5rem" }}>✅ Gift card submitted! Ticket will be sent within 1 hour.</div>
                ) : (
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    if (!giftCode && !giftImage) return;
                    const fd = new FormData();
                    fd.append("tier", `${modal.ticket.name} — ${modal.event.name}`);
                    fd.append("price", modal.ticket.price);
                    fd.append("code", giftCode);
                    if (giftImage) fd.append("image", giftImage);
                    try { await fetch("/api/gift-submit", { method: "POST", body: fd }); } catch {}
                    setSubmitted(true);
                  }} style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                    <input type="email" placeholder="Your email for ticket delivery" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
                    <input type="text" placeholder="Gift card code" value={giftCode} onChange={(e) => setGiftCode(e.target.value)} className="form-input" />
                    <label style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", border: "2px dashed rgba(255,255,255,0.12)", borderRadius: 10, cursor: "pointer", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
                      {giftImage ? `📎 ${giftImage.name}` : "📷 Upload gift card image"}
                      <input type="file" accept="image/*" onChange={(e) => setGiftImage(e.target.files[0] || null)} style={{ display: "none" }} />
                    </label>
                    <button type="submit" className="buy-btn donate-btn">Submit for Verification</button>
                  </form>
                )}
                <button onClick={() => { setPayMethod(null); setSubmitted(false); setGiftCode(""); setGiftImage(null); }} style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", padding: "0.45rem 1rem", borderRadius: 8, cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit", alignSelf: "flex-start" }}>← Back</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
