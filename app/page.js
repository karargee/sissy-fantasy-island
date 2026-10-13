"use client";
import React, { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import Link from "next/link";
import ChatWidget from "./components/ChatWidget";

const BTC_WALLET = "bc1q6k7lmj5jruuk0tq28c03pc5ae2jv0wnthdpxpn";

const VIRTUAL_TIER = {
  name: "Virtual Access",
  emoji: "📺",
  price: 25,
  color: "#5bcefa",
  night: "Both Nights — Remote",
  perks: [
    "Live stream access both nights",
    "Exclusive party content & photos",
    "Private members-only gallery",
    "Behind-the-scenes footage",
    "Chat with attendees in real time",
    "Can't make it to LA? We got you",
  ],
};

const TICKETS = [
  {
    name: "General Admission",
    emoji: "🎟️",
    price: 80,
    color: "#f5a9b8",
    night: "Both Nights",
    perks: [
      "Entry both nights — Oct 23 & 24",
      "Access to main party floor",
      "Welcome drink on arrival",
      "Themed dress code encouraged",
      "Safe, consent-first environment",
      "Trans & subs welcome",
    ],
  },
  {
    name: "VIP Access",
    emoji: "👑",
    price: 150,
    color: "#d63384",
    popular: true,
    night: "Both Nights",
    perks: [
      "Everything in General Admission",
      "VIP lounge access both nights",
      "Priority entry — skip the line",
      "2 complimentary drinks per night",
      "Reserved seating area",
      "Meet & greet with hosts",
      "Exclusive VIP gift bag",
    ],
  },
  {
    name: "Ultra VIP",
    emoji: "💎",
    price: 300,
    color: "#8b5cf6",
    night: "Both Nights",
    perks: [
      "Everything in VIP",
      "Private room access",
      "Dedicated host for the evening",
      "Unlimited drinks both nights",
      "Backstage & performer access",
      "Professional photo session",
      "Luxury gift package",
      "Limo pickup available (LA area)",
    ],
  },
];

const FAQS = [
  { q: "Where is the venue?", a: "The venue is private and disclosed only to ticket holders 48 hours before the event via email. It is located in Los Angeles, CA." },
  { q: "What is the dress code?", a: "Glamorous, fetish-friendly, or formal. Trans-affirming attire celebrated. Lingerie, latex, leather, gowns, suits — all welcome. Come as your most authentic self." },
  { q: "Is this event safe?", a: "Absolutely. We have strict consent policies, trained staff, and a zero-tolerance policy for harassment. Safe words are enforced. Everyone is here to have a good time respectfully." },
  { q: "Can I attend just one night?", a: "All tickets cover both nights. Single-night tickets may be available closer to the date — join the waitlist to be notified." },
  { q: "Is this 18+ only?", a: "Yes. This is a strictly 18+ adult event. Valid ID required at the door." },
  { q: "How do I pay?", a: "We accept Bitcoin and gift cards for maximum privacy. All transactions are discreet." },
  { q: "Can I watch remotely if I can't attend?", a: "Yes! Purchase Virtual Access ($25) to get live stream access, exclusive party content, photos, and behind-the-scenes footage delivered to your email. Perfect if you're outside LA or can't make it in person." },
  { q: "Can I bring a guest?", a: "Yes. Each ticket is for one person. Purchase separate tickets for guests. Group discounts available — contact us." },
  { q: "What happens at the party?", a: "Music, dancing, themed rooms, performances, socializing, and a fully inclusive atmosphere for trans women, sissies, subs, doms, and admirers." },
];

const LIVE_ACTIVITY = [
  { name: "Valentina R.", action: "just grabbed a VIP ticket", time: "2m ago", emoji: "👑" },
  { name: "Anonymous", action: "purchased Ultra VIP from New York", time: "5m ago", emoji: "💎" },
  { name: "Mistress Lace", action: "joined the waitlist", time: "8m ago", emoji: "🌸" },
  { name: "Baby Celestine", action: "got her General ticket", time: "11m ago", emoji: "🎟️" },
  { name: "Princess Aurora", action: "upgraded to Ultra VIP", time: "14m ago", emoji: "💎" },
  { name: "Anonymous", action: "purchased VIP from London", time: "18m ago", emoji: "🇬🇧" },
  { name: "Candy Moon", action: "just grabbed a VIP ticket", time: "22m ago", emoji: "👑" },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function CountdownTimer() {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date("2026-10-23T20:00:00") - new Date();
      if (diff <= 0) return;
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
      {[[time.days, "Days"], [time.hours, "Hours"], [time.mins, "Mins"], [time.secs, "Secs"]].map(([v, l]) => (
        <div key={l} style={{ textAlign: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(214,51,132,0.2)", borderRadius: 16, padding: "1.2rem 1.8rem", minWidth: 80 }}>
          <div style={{ fontSize: "2.5rem", fontWeight: 900, background: "linear-gradient(135deg, #f5a9b8, #d63384)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: -2 }}>{String(v).padStart(2, "0")}</div>
          <div style={{ fontSize: "0.65rem", opacity: 0.4, textTransform: "uppercase", letterSpacing: 2, marginTop: 4 }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

function LiveActivityFeed() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % LIVE_ACTIVITY.length), 3000);
    return () => clearInterval(id);
  }, []);
  const item = LIVE_ACTIVITY[idx];
  return (
    <div style={{ background: "rgba(40,167,69,0.08)", border: "1px solid rgba(40,167,69,0.2)", borderRadius: 50, padding: "0.6rem 1.2rem", display: "inline-flex", alignItems: "center", gap: "0.6rem", fontSize: "0.85rem", maxWidth: "100%" }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#28a745", display: "inline-block", animation: "pulse 1.5s ease-in-out infinite", flexShrink: 0 }}></span>
      <span style={{ opacity: 0.9 }}>{item.emoji} <strong>{item.name}</strong> {item.action}</span>
      <span style={{ opacity: 0.4, fontSize: "0.75rem", flexShrink: 0 }}>{item.time}</span>
    </div>
  );
}

function BtcConfirmForm({ wallet }) {
  const w = wallet || BTC_WALLET;
  const [form, setForm] = useState({ email: "", tier: "General Admission", txid: "", delivery: "email" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/btc-confirm", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, wallet: w }) });
    } catch {}
    setSending(false);
    setSent(true);
  }
  if (sent) return <div className="btc-confirm-card"><div className="email-success">✅ Payment confirmed! Your ticket will be sent within 1 hour.</div></div>;
  return (
    <form className="btc-confirm-card" onSubmit={handleSubmit}>
      <h3>Confirm Your BTC Payment</h3>
      <select value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} className="form-input form-select">
        <option value="General Admission">🎟️ General Admission — $80</option>
        <option value="VIP Access">👑 VIP Access — $150</option>
        <option value="Ultra VIP">💎 Ultra VIP — $300</option>
        <option value="Virtual Access">📺 Virtual Access — $25</option>
      </select>
      <input type="email" placeholder="Your email for ticket delivery" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="form-input" />
      <input type="text" placeholder="BTC Transaction ID (optional)" value={form.txid} onChange={(e) => setForm({ ...form, txid: e.target.value })} className="form-input" />
      <button type="submit" className="buy-btn donate-btn" disabled={sending}>{sending ? "Submitting..." : "Confirm Payment"}</button>
      <p className="donate-note">We&apos;ll verify on-chain and send your ticket within 1 hour</p>
    </form>
  );
}

function SocialProofBar() {
  const [visible, setVisible] = useState(true);
  const [viewers, setViewers] = useState(34);
  const [actIdx, setActIdx] = useState(0);
  const activity = [
    "Valentina just grabbed a VIP ticket 👑",
    "Anonymous purchased Ultra VIP from NYC 💎",
    "34 people viewing this page right now 🔥",
    "Only 12 Ultra VIP tickets remaining ⚠️",
    "Baby Celestine just registered for the waitlist 🌸",
    "Tickets selling fast — don't miss out 🎟️",
  ];
  useEffect(() => {
    const v = setInterval(() => setViewers((n) => Math.max(20, n + Math.floor(Math.random() * 3) - 1)), 5000);
    const a = setInterval(() => setActIdx((i) => (i + 1) % activity.length), 4000);
    return () => { clearInterval(v); clearInterval(a); };
  }, []);
  if (!visible) return null;
  return (
    <div className="social-proof-bar">
      <div className="social-proof-viewers"><span className="social-proof-dot"></span>{viewers} viewing now</div>
      <div className="social-proof-activity">🔥 {activity[actIdx]}</div>
      <button className="social-proof-close" onClick={() => setVisible(false)}>✕</button>
    </div>
  );
}

function NewsletterPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("nl_dismissed")) return;
    const t = setTimeout(() => setShow(true), 10000);
    return () => clearTimeout(t);
  }, []);
  function dismiss() { setShow(false); sessionStorage.setItem("nl_dismissed", "1"); }
  async function submit(e) {
    e.preventDefault();
    try { await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }); } catch {}
    setDone(true);
    setTimeout(dismiss, 2000);
  }
  if (!show) return null;
  return (
    <div className="newsletter-popup-overlay" onClick={dismiss}>
      <div className="newsletter-popup" onClick={(e) => e.stopPropagation()}>
        <button className="newsletter-popup-close" onClick={dismiss}>✕</button>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🎉</div>
        <h3>Get Early Access</h3>
        <p>Join the waitlist for early bird pricing and venue reveal 48hrs before everyone else.</p>
        <div className="newsletter-discount">OCT 23–24 · LA</div>
        {done ? <div className="email-success">✅ You&apos;re on the list!</div> : (
          <form className="newsletter-popup-form" onSubmit={submit}>
            <input type="email" placeholder="your@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
            <button type="submit" className="buy-btn donate-btn">Get Early Access</button>
            <button type="button" onClick={dismiss} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: "0.8rem" }}>No thanks</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [verified, setVerified] = useState(false);
  const [splash, setSplash] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  const [payModal, setPayModal] = useState(null);
  const [payMethod, setPayMethod] = useState(null);
  const [giftCode, setGiftCode] = useState("");
  const [giftImage, setGiftImage] = useState(null);
  const [giftSubmitted, setGiftSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [cmsBtcWallet, setCmsBtcWallet] = useState(BTC_WALLET);
  const [cmsBanner, setCmsBanner] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem("age_verified") === "true") setVerified(true);
    const t = setTimeout(() => setSplash(false), 2000);
    fetch("/api/settings").then(r => r.json()).then(d => {
      const s = d.settings || {};
      if (s.btcWallet) setCmsBtcWallet(s.btcWallet);
      if (s.banner) setCmsBanner(s.banner);
    }).catch(() => {});
    return () => clearTimeout(t);
  }, []);

  function openPayModal(name, price) { setPayModal({ tier: name, price }); setPayMethod(null); setGiftSubmitted(false); setGiftCode(""); setGiftImage(null); }

  function handleGiftSubmit(e) {
    e.preventDefault();
    if (!giftCode && !giftImage) return;
    const fd = new FormData();
    fd.append("tier", payModal?.tier || ""); fd.append("price", payModal?.price || ""); fd.append("code", giftCode);
    if (giftImage) fd.append("image", giftImage);
    fetch("/api/gift-submit", { method: "POST", body: fd }).catch(() => {});
    setGiftSubmitted(true);
  }

  if (splash) return (
    <div style={{ position: "fixed", inset: 0, background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99999, flexDirection: "column", gap: "1rem" }}>
      <div style={{ fontSize: "3rem", animation: "pulse 1.5s ease-in-out infinite" }}>🏳️⚧️</div>
      <div style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: 4, background: "linear-gradient(90deg, #f5a9b8, #d63384, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LA TRANS PARTY</div>
      <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)", letterSpacing: 3 }}>OCT 23–24 · 2026 · LOS ANGELES</div>
      <div style={{ width: 40, height: 3, borderRadius: 2, background: "linear-gradient(90deg, #d63384, #8b5cf6)", animation: "loading 1.5s ease-in-out infinite", marginTop: 8 }}></div>
    </div>
  );

  if (!verified) return (
    <div className="age-gate-overlay">
      <div className="age-gate-box">
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔞</div>
        <h2>Are you 18 or older?</h2>
        <p>This is an adult event. You must be 18+ to enter this site.</p>
        <div className="age-gate-buttons">
          <button className="age-btn age-btn-yes" onClick={() => { setVerified(true); sessionStorage.setItem("age_verified", "true"); }}>Yes, I&apos;m 18+</button>
          <button className="age-btn age-btn-no" onClick={() => window.location.href = "https://google.com"}>No</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-wrap">
      <div className="bg-animation">
        <div className="bg-orb bg-orb-1"></div><div className="bg-orb bg-orb-2"></div><div className="bg-orb bg-orb-3"></div>
      </div>

      <div className="container" style={{ paddingBottom: "4rem" }}>
        {/* Banner */}
        {(cmsBanner ? cmsBanner.active : true) && (
          <div style={{ background: "linear-gradient(90deg, #d63384, #8b5cf6)", padding: "0.75rem 1.5rem", borderRadius: 10, textAlign: "center", marginBottom: "1.5rem" }}>
            <span style={{ fontWeight: 700, fontSize: "0.92rem" }}>{cmsBanner ? cmsBanner.text : "🔥 LIMITED TICKETS — Oct 23 & 24, 2026 · Los Angeles · Get yours before they sell out"}</span>
          </div>
        )}

        {/* Nav */}
        <nav className="nav">
          <div className="nav-logo">LA TRANS PARTY 🏳️⚧️</div>
          <div className={`nav-links ${mobileNav ? "nav-links-open" : ""}`}>
            <a href="#tickets" onClick={() => setMobileNav(false)}>Tickets</a>
            <a href="#about" onClick={() => setMobileNav(false)}>About</a>
            <a href="#dresscode" onClick={() => setMobileNav(false)}>Dress Code</a>
            <a href="#faq" onClick={() => setMobileNav(false)}>FAQ</a>
            <a href="#contact" onClick={() => setMobileNav(false)}>Contact</a>
            <Link href="/chat" onClick={() => setMobileNav(false)} style={{ color: "#5bcefa", fontWeight: 600 }}>💬 Chat</Link>
            <Link href="/gallery" onClick={() => setMobileNav(false)}>Gallery</Link>
            <Link href="/community" onClick={() => setMobileNav(false)} style={{ color: "#f5a9b8" }}>Community</Link>
          </div>
          <button className="nav-toggle" onClick={() => setMobileNav(!mobileNav)}>{mobileNav ? "✕" : "☰"}</button>
        </nav>

        {/* Hero */}
        <section className="hero">
          <Image src="/hero.jpg" alt="" fill className="hero-bg-img" priority />
          <div className="hero-overlay"></div>
          <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <div style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, padding: "0.35rem 1.2rem", borderRadius: 50, background: "rgba(214,51,132,0.15)", border: "1px solid rgba(214,51,132,0.35)", color: "#f5a9b8", marginBottom: "1.5rem" }}>
              🏳️⚧️ Los Angeles · October 23–24, 2026
            </div>
            <h1 style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.05, color: "#fff", marginBottom: "1.2rem" }}>
              LA <span style={{ background: "linear-gradient(90deg, #f5a9b8, #d63384, #8b5cf6)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Trans</span> Party
            </h1>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: "0 auto 2rem", lineHeight: 1.8 }}>
              Two nights of music, freedom, and unapologetic self-expression. The most exclusive trans & subs party in Los Angeles.
            </p>
            <div style={{ margin: "1.5rem 0" }}><LiveActivityFeed /></div>
            <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" }}>
              <button className="buy-btn donate-btn" style={{ maxWidth: 220 }} onClick={() => document.getElementById("tickets").scrollIntoView({ behavior: "smooth" })}>🎟️ Get Tickets</button>
              <a href="#about" className="buy-btn" style={{ maxWidth: 180, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Learn More →</a>
            </div>
          </div>
        </section>

        {/* Countdown */}
        <Reveal><section className="section">
          <h2>⏳ Event Starts In</h2>
          <p className="section-subtitle">October 23, 2026 · Doors open 9PM · Private venue, Los Angeles</p>
          <CountdownTimer />
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" }}>
            {["📅 Oct 23 & 24, 2026", "📍 Los Angeles, CA", "🔒 Private Venue", "🔞 18+ Only"].map(b => (
              <span key={b} style={{ padding: "0.4rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 50, fontSize: "0.8rem", color: "rgba(255,255,255,0.55)" }}>{b}</span>
            ))}
          </div>
        </section></Reveal>

        {/* About */}
        <Reveal><section className="section" id="about">
          <h2>💜 About The Party</h2>
          <p className="section-subtitle">Two nights. One unforgettable experience.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.2rem" }}>
            {[
              { icon: "🎵", title: "Night 1 — Oct 23", desc: "Opening night. Live DJ sets, themed rooms, welcome cocktails, and a night of pure liberation. Dress to impress." },
              { icon: "🔥", title: "Night 2 — Oct 24", desc: "The main event. Full performances, VIP experiences, and an atmosphere you won't find anywhere else in LA." },
              { icon: "🏳️⚧️", title: "Trans & Subs Welcome", desc: "A fully inclusive space for trans women, sissies, subs, doms, and admirers. Everyone belongs here." },
              { icon: "🔒", title: "Private & Discreet", desc: "Venue revealed 48hrs before. No photos without consent. What happens at the party stays at the party." },
              { icon: "🛡️", title: "Consent First", desc: "Trained staff, strict consent policies, safe words enforced. Zero tolerance for harassment." },
              { icon: "✨", title: "Luxury Experience", desc: "Premium venue, professional lighting, top-tier sound system, and an atmosphere dripping in glamour." },
            ].map(f => (
              <div key={f.title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "1.8rem" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{f.icon}</div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section></Reveal>

        {/* Tickets */}
        <Reveal><section className="section" id="tickets">
          <h2>🎟️ Get Your Tickets</h2>
          <p className="section-subtitle">Limited capacity. Once they&apos;re gone, they&apos;re gone.</p>
          <div className="tickets-grid">
            {TICKETS.map(t => (
              <div key={t.name} className="ticket-card" style={{ borderTop: `4px solid ${t.color}` }}>
                {t.popular && <div className="popular-badge">🔥 MOST POPULAR</div>}
                <div className="ticket-emoji">{t.emoji}</div>
                <h3>{t.name}</h3>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: 1 }}>{t.night}</div>
                <div className="price" style={{ color: t.color }}>${t.price}<span className="price-period"> per person</span></div>
                <ul className="perks">{t.perks.map(p => <li key={p}>{p}</li>)}</ul>
                <button className="buy-btn" style={{ background: `linear-gradient(135deg, ${t.color}, #6f42c1)` }} onClick={() => openPayModal(t.name, t.price)}>
                  Get {t.name} — ${t.price}
                </button>
                <div className="payment-icons">
                  <span className="btc-badge">₿ Bitcoin</span>
                  <span className="btc-badge" style={{ background: "rgba(245,169,184,0.15)", borderColor: "rgba(245,169,184,0.3)", color: "#f5a9b8" }}>🎁 Gift Card</span>
                </div>
              </div>
            ))}
          </div>

          {/* Virtual Access */}
          <div style={{ marginTop: "2rem", background: "rgba(91,206,250,0.05)", border: "1px solid rgba(91,206,250,0.2)", borderRadius: 20, padding: "2rem", display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: "#5bcefa", marginBottom: "0.5rem" }}>📺 Can&apos;t Make It to LA?</div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 900, marginBottom: "0.5rem" }}>Virtual Access — <span style={{ color: "#5bcefa" }}>$25</span></h3>
              <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "1rem" }}>Tip to get full remote access — live stream both nights, exclusive party content, photos, behind-the-scenes footage, and private gallery. Delivered to your email.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {VIRTUAL_TIER.perks.map(p => (
                  <li key={p} style={{ fontSize: "0.78rem", background: "rgba(91,206,250,0.08)", border: "1px solid rgba(91,206,250,0.15)", borderRadius: 50, padding: "0.3rem 0.8rem", color: "rgba(255,255,255,0.7)" }}>✓ {p}</li>
                ))}
              </ul>
              <button className="buy-btn" style={{ background: "linear-gradient(135deg, #5bcefa, #0077b6)", maxWidth: 260 }} onClick={() => openPayModal(VIRTUAL_TIER.name, VIRTUAL_TIER.price)}>
                📺 Get Virtual Access — $25
              </button>
              <div style={{ marginTop: "0.8rem", display: "flex", gap: "0.5rem" }}>
                <span className="btc-badge">₿ Bitcoin</span>
                <span className="btc-badge" style={{ background: "rgba(245,169,184,0.15)", borderColor: "rgba(245,169,184,0.3)", color: "#f5a9b8" }}>🎁 Gift Card</span>
              </div>
            </div>
            <div style={{ textAlign: "center", opacity: 0.15, fontSize: "8rem", lineHeight: 1, userSelect: "none" }}>📺</div>
          </div>
        </section></Reveal>

        {/* Dress Code */}
        <Reveal><section className="section" id="dresscode">
          <h2>👗 Dress Code</h2>
          <p className="section-subtitle">Come as your most glamorous, authentic self. There are no wrong answers.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { icon: "👠", label: "Heels & Lingerie", desc: "Always welcome. Always celebrated." },
              { icon: "🥻", label: "Gowns & Dresses", desc: "Formal femme energy encouraged." },
              { icon: "🖤", label: "Latex & Leather", desc: "Fetish-friendly attire welcome." },
              { icon: "💼", label: "Suits & Formal", desc: "Doms and admirers — dress sharp." },
              { icon: "🎭", label: "Themed Costumes", desc: "Get creative. Stand out." },
              { icon: "✨", label: "Anything Glam", desc: "If it sparkles, wear it." },
            ].map(d => (
              <div key={d.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "1.5rem", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{d.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.3rem" }}>{d.label}</div>
                <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)" }}>{d.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.5rem", background: "rgba(214,51,132,0.06)", border: "1px solid rgba(214,51,132,0.15)", borderRadius: 12, padding: "1.2rem 1.5rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.55)" }}>⚠️ No street clothes. Dress code is enforced at the door. When in doubt — overdress.</p>
          </div>
        </section></Reveal>

        {/* FAQ */}
        <Reveal><section className="section" id="faq">
          <h2>❓ FAQ</h2>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="faq-q">{f.q}<span>{openFaq === i ? "−" : "+"}</span></div>
                {openFaq === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </section></Reveal>

        {/* Email Signup */}
        <Reveal><section className="section">
          <div className="email-section">
            <h2>📧 Join the Waitlist</h2>
            <p>Be first to know about ticket drops, venue reveal, and exclusive pre-party info.</p>
            {emailSent ? <div className="email-success">✅ You&apos;re on the list!</div> : (
              <form className="email-form" onSubmit={async (e) => { e.preventDefault(); if (!email) return; try { await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }); } catch {} setEmailSent(true); }}>
                <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="email-input" />
                <button type="submit" className="email-btn">Join Waitlist</button>
              </form>
            )}
          </div>
        </section></Reveal>

        {/* Contact */}
        <Reveal><section className="section" id="contact">
          <h2>📬 Contact</h2>
          <p className="section-subtitle">Questions? Group bookings? Reach out.</p>
          <div className="social-bar">
            <a href="mailto:sissyfantasyisland70@gmail.com" className="social-link"><span>📧</span> Email Us</a>
            <a href="https://wa.me/14153053689" target="_blank" rel="noopener" className="social-link"><span>💬</span> WhatsApp</a>
            <a href="tel:+14153053689" className="social-link"><span>📞</span> (415) 305-3689</a>
            <a href="https://t.me/tshungkathy10" target="_blank" rel="noopener" className="social-link"><span>✈️</span> Telegram</a>
          </div>
        </section></Reveal>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="nav-logo">LA TRANS PARTY 🏳️⚧️</div>
              <p>The most exclusive trans & subs party in Los Angeles. October 23–24, 2026. Private venue. Limited tickets.</p>
            </div>
            <div className="footer-col">
              <h4>Event</h4>
              <a href="#tickets">Get Tickets</a>
              <a href="#about">About</a>
              <a href="#dresscode">Dress Code</a>
            </div>
            <div className="footer-col">
              <h4>Community</h4>
              <Link href="/community">Community</Link>
              <Link href="/chat">Chat</Link>
              <Link href="/gallery">Gallery</Link>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <Link href="/terms">Terms of Service</Link>
              <a href="#contact">Privacy Policy</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 LA Trans Party. All rights reserved. 18+ only.</p>
            <div className="trust-badges">
              <span>🔒 Private & Discreet</span>
              <span>🛡️ Consent First</span>
              <span>🏳️⚧️ Trans Inclusive</span>
            </div>
          </div>
        </footer>
      </div>

      <SocialProofBar />
      <NewsletterPopup />
      <ChatWidget />

      {/* Payment Modal */}
      {payModal && (
        <div className="age-gate-overlay" onClick={() => setPayModal(null)}>
          <div className="pay-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pay-modal-close" onClick={() => setPayModal(null)}>✕</button>
            <h2>{payModal.tier}</h2>
            <div className="pay-modal-total">${payModal.price} · {payModal.tier === "Virtual Access" ? "Remote Access — Both Nights" : "Oct 23–24, 2026 · Los Angeles"}</div>
            {!payMethod && (
              <div className="pay-options">
                <button className="pay-option" onClick={() => setPayMethod("btc")}><span>₿</span> Pay with Bitcoin</button>
                <button className="pay-option" onClick={() => setPayMethod("gift")}><span>🎁</span> Redeem Gift Card</button>
              </div>
            )}
            {payMethod === "gift" && (
              <div className="pay-btc-content">
                {giftSubmitted ? (
                  <div className="email-success" style={{ textAlign: "center", padding: "1.5rem 0" }}>✅ Gift card submitted! Your ticket will be sent within 1 hour.</div>
                ) : (
                  <form onSubmit={handleGiftSubmit} className="gift-form">
                    <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>Redeem Gift Card</h3>
                    <input type="text" placeholder="Gift card code" value={giftCode} onChange={(e) => setGiftCode(e.target.value)} className="form-input" />
                    <label className="gift-upload-label">
                      <span>{giftImage ? `📎 ${giftImage.name}` : "📷 Upload gift card image"}</span>
                      <input type="file" accept="image/*" onChange={(e) => setGiftImage(e.target.files[0] || null)} style={{ display: "none" }} />
                    </label>
                    <button type="submit" className="buy-btn donate-btn">Submit for Verification</button>
                    <p className="donate-note">We&apos;ll verify and send your ticket within 1 hour</p>
                  </form>
                )}
                <button className="pay-back" onClick={() => { setPayMethod(null); setGiftSubmitted(false); }}>← Back</button>
              </div>
            )}
            {payMethod === "btc" && (
              <div className="pay-btc-content">
                <div className="btc-qr-card">
                  <div className="btc-qr-wrap">
                    <QRCodeSVG value={`bitcoin:${cmsBtcWallet}`} size={160} bgColor="#ffffff" fgColor="#0a0a0f" level="H" />
                  </div>
                  <p className="btc-label">Scan to send BTC</p>
                  <div className="btc-address">
                    <code>{cmsBtcWallet}</code>
                    <button className="btc-copy" onClick={() => navigator.clipboard.writeText(cmsBtcWallet)}>Copy</button>
                  </div>
                </div>
                <BtcConfirmForm wallet={cmsBtcWallet} />
                <button className="pay-back" onClick={() => setPayMethod(null)}>← Back</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
