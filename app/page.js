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
  price: 75,
  color: "#5bcefa",
  night: "Both Nights — Remote",
  perks: [
    "HD live stream — both nights",
    "Full party content & photo sets",
    "Private members-only gallery access",
    "Behind-the-scenes & backstage footage",
    "Live chat with attendees during the event",
    "Downloadable content after the event",
  ],
};

const TICKETS = [
  {
    name: "General Admission",
    emoji: "🎟️",
    price: 150,
    color: "#f5a9b8",
    night: "Both Nights",
    perks: [
      "Entry both nights — Oct 23 & 24",
      "Full access to main party floor & all themed rooms",
      "Welcome cocktail on arrival",
      "Professional DJ both nights",
      "Consent-first environment with trained staff",
      "Trans women, sissies, subs & admirers welcome",
    ],
  },
  {
    name: "VIP Access",
    emoji: "👑",
    price: 250,
    color: "#d63384",
    popular: true,
    night: "Both Nights",
    perks: [
      "Everything in General Admission",
      "Exclusive VIP lounge — both nights",
      "Priority entry, no waiting in line",
      "3 premium drinks per night included",
      "Reserved VIP seating area",
      "Private meet & greet with hosts",
      "Curated VIP gift bag ($80+ value)",
      "Name on the VIP guest list",
    ],
  },
  {
    name: "Ultra VIP",
    emoji: "💎",
    price: 500,
    color: "#8b5cf6",
    night: "Both Nights",
    perks: [
      "Everything in VIP",
      "Private suite access both nights",
      "Personal host assigned for the evening",
      "Unlimited premium open bar both nights",
      "Backstage & performer meet & greet",
      "Professional photo session with photographer",
      "Luxury gift package ($200+ value)",
      "Complimentary limo pickup — LA area",
      "Early venue access — 1hr before doors open",
    ],
  },
];

const FAQS = [
  { q: "Where is the venue?", a: "The venue is private and disclosed only to ticket holders 48 hours before the event via email. It is located in Los Angeles, CA." },
  { q: "What is the dress code?", a: "Glamorous, fetish-friendly, or formal. Trans-affirming attire celebrated. Lingerie, latex, leather, gowns, suits — all welcome. Come as your most authentic self." },
  { q: "Is this event safe?", a: "Absolutely. We have strict consent policies, trained staff, and a zero-tolerance policy for harassment. Safe words are enforced. Everyone is here to have a good time respectfully." },
  { q: "Can I attend just one night?", a: "All tickets cover both nights. Single-night tickets may be available closer to the date — join the waitlist to be notified." },
  { q: "Is this 18+ only?", a: "Yes. This is a strictly 18+ adult event. Valid ID required at the door." },
  { q: "How do I pay?", a: "We accept Bitcoin and gift cards for maximum privacy. All transactions are completely discreet — no event name appears on any statement." },
  { q: "Can I watch remotely if I can't attend?", a: "Yes! Purchase Virtual Access ($75) to get HD live stream access for both nights, exclusive party content, photo sets, behind-the-scenes footage, and private gallery access — all delivered to your email." },
  { q: "What are the ticket prices?", a: "General Admission is $150 per person (both nights). VIP is $250 and includes lounge access, priority entry, drinks, and a gift bag. Ultra VIP is $500 and includes a private suite, open bar, limo pickup, and a personal host. Virtual Access (remote) is $75." },
  { q: "Can I bring a guest?", a: "Yes. Each ticket is for one person. Purchase separate tickets for guests. Group discounts available — contact us." },
  { q: "What happens at the party?", a: "Music, dancing, themed rooms, performances, socializing, and a fully inclusive atmosphere for trans women, sissies, subs, doms, and admirers." },
];

const LIVE_ACTIVITY = [
  { name: "Valentina R.", action: "just purchased VIP — $250", time: "2m ago", emoji: "👑" },
  { name: "Anonymous", action: "bought Ultra VIP from New York — $500", time: "4m ago", emoji: "💎" },
  { name: "Mistress Lace", action: "joined the waitlist", time: "7m ago", emoji: "🌸" },
  { name: "Baby Celestine", action: "got her General Admission — $150", time: "11m ago", emoji: "🎟️" },
  { name: "Princess Aurora", action: "upgraded to Ultra VIP — $500", time: "15m ago", emoji: "💎" },
  { name: "Anonymous", action: "purchased VIP from London — $250", time: "19m ago", emoji: "🇬🇧" },
  { name: "Candy Moon", action: "grabbed Virtual Access — $75", time: "23m ago", emoji: "📺" },
  { name: "Mistress Jade", action: "booked Ultra VIP for 2 — $1,000", time: "27m ago", emoji: "💎" },
];

const TESTIMONIALS = [
  { text: "Absolutely the most magical night of my life. I felt completely safe, seen, and celebrated from the moment I walked in.", author: "Valentina R.", role: "VIP Attendee · 2025", stars: 5 },
  { text: "The level of production, music, and energy was beyond anything I expected. LA's best-kept secret.", author: "Mistress D.", role: "Ultra VIP · 2025", stars: 5 },
  { text: "As a first-timer I was nervous, but the staff were incredible. Zero judgment, all love. Already bought my 2026 ticket.", author: "Anonymous", role: "GA Attendee", stars: 5 },
  { text: "The private suite was worth every cent. Open bar, photographer, limo — they thought of everything.", author: "Princess Aurora", role: "Ultra VIP · 2025", stars: 5 },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms` }}>
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
        <div key={l} className="countdown-unit">
          <div className="countdown-value">{String(v).padStart(2, "0")}</div>
          <div className="countdown-label">{l}</div>
        </div>
      ))}
    </div>
  );
}

function LiveActivityFeed() {
  const [idx, setIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => {
    const id = setInterval(() => { setIdx((i) => (i + 1) % LIVE_ACTIVITY.length); setAnimKey(k => k + 1); }, 3500);
    return () => clearInterval(id);
  }, []);
  const item = LIVE_ACTIVITY[idx];
  return (
    <div className="live-feed-pill" key={animKey}>
      <span className="live-dot"></span>
      <span className="live-text"><strong>{item.name}</strong> {item.action}</span>
      <span className="live-time">{item.time}</span>
    </div>
  );
}

function StarRating({ count }) {
  return <div style={{ color: "#f7c948", fontSize: "0.8rem", letterSpacing: 1, marginBottom: "0.8rem" }}>{"★".repeat(count)}</div>;
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
  if (sent) return <div className="btc-confirm-card"><div className="email-success" style={{ textAlign: "center", padding: "1rem 0" }}>✅ Payment confirmed! Your ticket will be sent within 1 hour.</div></div>;
  return (
    <form className="btc-confirm-card" onSubmit={handleSubmit}>
      <h3 style={{ marginBottom: "0.2rem" }}>Confirm Your BTC Payment</h3>
      <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.8rem" }}>Fill in your details and we'll verify on-chain within 1 hour.</p>
      <select value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} className="form-input form-select">
        <option value="General Admission">🎟️ General Admission — $150</option>
        <option value="VIP Access">👑 VIP Access — $250</option>
        <option value="Ultra VIP">💎 Ultra VIP — $500</option>
        <option value="Virtual Access">📺 Virtual Access — $75</option>
      </select>
      <input type="email" placeholder="Your email for ticket delivery" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="form-input" />
      <input type="text" placeholder="BTC Transaction ID (optional but speeds things up)" value={form.txid} onChange={(e) => setForm({ ...form, txid: e.target.value })} className="form-input" />
      <button type="submit" className="buy-btn donate-btn" disabled={sending}>{sending ? "Submitting..." : "Confirm Payment →"}</button>
      <p className="donate-note">🔒 All info is kept strictly private</p>
    </form>
  );
}

function SocialProofBar() {
  const [visible, setVisible] = useState(true);
  const [viewers, setViewers] = useState(34);
  const [actIdx, setActIdx] = useState(0);
  const activity = [
    "Valentina just purchased VIP — $250 👑",
    "Anonymous bought Ultra VIP from NYC — $500 💎",
    `${viewers} people viewing this page right now 🔥`,
    "Only 8 Ultra VIP tickets remaining ⚠️",
    "Baby Celestine just got her General Admission — $150 🎟️",
    "Mistress Jade booked Ultra VIP for 2 — $1,000 💎",
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
    const t = setTimeout(() => setShow(true), 12000);
    return () => clearTimeout(t);
  }, []);
  function dismiss() { setShow(false); sessionStorage.setItem("nl_dismissed", "1"); }
  async function submit(e) {
    e.preventDefault();
    try { await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }); } catch {}
    setDone(true);
    setTimeout(dismiss, 2500);
  }
  if (!show) return null;
  return (
    <div className="newsletter-popup-overlay" onClick={dismiss}>
      <div className="newsletter-popup" onClick={(e) => e.stopPropagation()}>
        <button className="newsletter-popup-close" onClick={dismiss}>✕</button>
        <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🎉</div>
        <h3>Get Early Access</h3>
        <p>Join the waitlist for early bird pricing and exclusive venue reveal — 48hrs before everyone else.</p>
        <div className="newsletter-discount">OCT 23–24 · LA</div>
        {done ? <div className="email-success" style={{ textAlign: "center" }}>✅ You&apos;re on the list!</div> : (
          <form className="newsletter-popup-form" onSubmit={submit}>
            <input type="email" placeholder="your@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
            <button type="submit" className="buy-btn donate-btn">Get Early Access →</button>
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("age_verified") === "true") setVerified(true);
    const t = setTimeout(() => setSplash(false), 2200);
    fetch("/api/settings").then(r => r.json()).then(d => {
      const s = d.settings || {};
      if (s.btcWallet) setCmsBtcWallet(s.btcWallet);
      if (s.banner) setCmsBanner(s.banner);
    }).catch(() => {});
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
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

  // ── Splash Screen ──
  if (splash) return (
    <div style={{ position: "fixed", inset: 0, background: "#060608", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99999, flexDirection: "column", gap: "1.2rem" }}>
      <div style={{ fontSize: "2.8rem", animation: "pulse 1.8s ease-in-out infinite" }}>🏳️⚧️</div>
      <div style={{ fontSize: "1.1rem", fontWeight: 900, letterSpacing: 6, background: "linear-gradient(90deg, #f5a9b8, #d63384, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textTransform: "uppercase" }}>LA Trans Party</div>
      <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", letterSpacing: 4, textTransform: "uppercase" }}>Oct 23–24 · 2026 · Los Angeles</div>
      <div style={{ marginTop: "0.5rem", width: 48, height: 2, borderRadius: 2, background: "linear-gradient(90deg, #d63384, #8b5cf6)", animation: "loading 1.6s ease-in-out infinite" }}></div>
    </div>
  );

  // ── Age Gate ──
  if (!verified) return (
    <div className="age-gate-overlay">
      <div className="age-gate-box">
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔞</div>
        <h2>Adults Only</h2>
        <p>This site contains content intended for adults 18 and over. Please confirm your age to continue.</p>
        <div className="age-gate-buttons">
          <button className="age-btn age-btn-yes" onClick={() => { setVerified(true); sessionStorage.setItem("age_verified", "true"); }}>I&apos;m 18 or Older</button>
          <button className="age-btn age-btn-no" onClick={() => window.location.href = "https://google.com"}>Exit</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-wrap">
      {/* Ambient background orbs */}
      <div className="bg-animation">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
      </div>

      <div className="container" style={{ paddingBottom: "5rem" }}>

        {/* ── Announcement Ribbon ── */}
        {(cmsBanner ? cmsBanner.active : true) && (
          <div className="ribbon">
            {cmsBanner ? cmsBanner.text : "🔥 LIMITED TICKETS — Oct 23 & 24, 2026 · Los Angeles · Selling fast — secure yours now"}
          </div>
        )}

        {/* ── Navigation ── */}
        <nav className={`nav${scrolled ? " nav-scrolled" : ""}`}>
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
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <button
              className="buy-btn donate-btn"
              style={{ padding: "0.55rem 1.2rem", fontSize: "0.78rem", width: "auto", borderRadius: 8 }}
              onClick={() => document.getElementById("tickets").scrollIntoView({ behavior: "smooth" })}
            >
              🎟️ Get Tickets
            </button>
            <button className="nav-toggle" onClick={() => setMobileNav(!mobileNav)}>{mobileNav ? "✕" : "☰"}</button>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="hero" id="home">
          <Image src="/hero.jpg" alt="LA Trans Party 2026" fill className="hero-bg-img" priority />
          <div className="hero-overlay"></div>
          <div style={{ position: "relative", zIndex: 2, textAlign: "center", width: "100%" }}>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, padding: "0.4rem 1.2rem", borderRadius: 50, background: "rgba(214,51,132,0.12)", border: "1px solid rgba(214,51,132,0.3)", color: "#f5a9b8", marginBottom: "1.8rem" }}>
              🏳️⚧️ Los Angeles · October 23–24, 2026
            </div>

            <h1 style={{ fontSize: "clamp(3rem, 9vw, 7rem)", fontWeight: 900, letterSpacing: -3, lineHeight: 1.0, color: "#fff", marginBottom: "1.5rem", maxWidth: 820, margin: "0 auto 1.5rem" }}>
              LA <span style={{ background: "linear-gradient(90deg, #f5a9b8, #d63384, #8b5cf6)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" }}>Trans</span> Party
            </h1>

            <p style={{ fontSize: "clamp(1rem, 2.2vw, 1.25rem)", color: "rgba(255,255,255,0.5)", maxWidth: 520, margin: "0 auto 2rem", lineHeight: 1.8 }}>
              Two nights of music, freedom & unapologetic self-expression. The most exclusive trans &amp; subs party in Los Angeles.
            </p>

            <div style={{ margin: "0 auto 2.5rem" }}><LiveActivityFeed /></div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                className="glow-btn"
                onClick={() => document.getElementById("tickets").scrollIntoView({ behavior: "smooth" })}
              >
                🎟️ Secure Your Ticket
              </button>
              <a href="#about" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", padding: "1rem 2rem", borderRadius: 12, border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600, transition: "border-color 0.2s, color 0.2s", background: "rgba(255,255,255,0.05)" }}>
                Learn More →
              </a>
            </div>

            {/* Trust strip */}
            <div className="trust-strip" style={{ marginTop: "3rem", maxWidth: 600, margin: "3rem auto 0" }}>
              {["🔒 Private & Discreet", "🛡️ Consent First", "🔞 18+ Only", "🏳️⚧️ Trans Inclusive", "⭐ 500+ Happy Attendees"].map(b => (
                <div key={b} className="trust-item"><span>{b}</span></div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="scroll-indicator" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
            <div className="scroll-indicator-line"></div>
            <span>Scroll</span>
          </div>
        </section>

        {/* ── Countdown ── */}
        <Reveal>
          <section className="section">
            <div style={{ textAlign: "center", marginBottom: "0.8rem" }}><span className="section-pill">⏳ Event Countdown</span></div>
            <h2>Doors Open In</h2>
            <p className="section-subtitle">October 23, 2026 · Doors open 9PM · Private venue revealed 48hrs prior</p>
            <CountdownTimer />
            <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2.5rem" }}>
              {["📅 Oct 23 & 24, 2026", "📍 Los Angeles, CA", "🔒 Private Venue", "🔞 18+ Only", "🎵 2 Full Nights"].map(b => (
                <span key={b} style={{ padding: "0.45rem 1.1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 50, fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{b}</span>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ── Stats Bar ── */}
        <Reveal delay={100}>
          <div className="stats-bar" style={{ marginBottom: "2rem" }}>
            {[
              { num: "500+", label: "Happy Attendees" },
              { num: "2", label: "Epic Nights" },
              { num: "4", label: "Ticket Tiers" },
              { num: "100%", label: "Satisfaction" },
            ].map(s => (
              <div key={s.label} className="stat-item">
                <span className="stat-counter">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── About ── */}
        <Reveal>
          <section className="section" id="about">
            <div style={{ textAlign: "center", marginBottom: "0.8rem" }}><span className="section-pill">💜 The Experience</span></div>
            <h2>About The Party</h2>
            <p className="section-subtitle">Two nights. One unforgettable experience. A space where you can finally be yourself.</p>

            {/* Night Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.2rem", marginBottom: "2.5rem" }}>
              <div className="night-card" style={{ borderTop: "3px solid rgba(245,169,184,0.4)" }}>
                <div className="night-card-night">Night One — Oct 23</div>
                <h3>🎵 Opening Night</h3>
                <p>Live DJ sets, themed rooms, welcome cocktails, and an opening night energy unlike anything you&apos;ve experienced. Dress to impress and come ready to let go.</p>
              </div>
              <div className="night-card" style={{ borderTop: "3px solid rgba(214,51,132,0.5)" }}>
                <div className="night-card-night">Night Two — Oct 24</div>
                <h3>🔥 The Main Event</h3>
                <p>Full performances, VIP experiences, exclusive themed spaces, and an atmosphere you won&apos;t find anywhere else in Los Angeles. The grand finale.</p>
              </div>
            </div>

            {/* Feature Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
              {[
                { icon: "🏳️⚧️", title: "Trans & Subs Welcome", desc: "A fully inclusive space for trans women, sissies, subs, doms, and admirers. Everyone belongs here, no exceptions." },
                { icon: "🔒", title: "Private & Discreet", desc: "Venue revealed 48hrs before. No photos without consent. What happens at the party stays at the party." },
                { icon: "🛡️", title: "Consent First", desc: "Trained staff, strict consent policies, safe words enforced. Zero tolerance for harassment — we take this seriously." },
                { icon: "✨", title: "Luxury Experience", desc: "Premium venue, professional lighting, top-tier sound system, and an atmosphere dripping in glamour and excellence." },
              ].map(f => (
                <div key={f.title} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "1.8rem", transition: "border-color 0.3s, transform 0.3s", cursor: "default" }} className="glass-card">
                  <div className="feature-icon">{f.icon}</div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.6rem" }}>{f.title}</h3>
                  <p style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ── Tickets ── */}
        <Reveal>
          <section className="section" id="tickets">
            <div style={{ textAlign: "center", marginBottom: "0.8rem" }}><span className="section-pill">🎟️ Pricing</span></div>
            <h2>Get Your Tickets</h2>
            <p className="section-subtitle">Limited capacity. Once they&apos;re gone, they&apos;re gone. Don&apos;t wait.</p>

            <div className="tickets-grid">
              {TICKETS.map(t => (
                <div key={t.name} className="ticket-card" style={{ borderTop: `4px solid ${t.color}` }}>
                  {t.popular && <div className="popular-badge">🔥 MOST POPULAR</div>}
                  <div className="ticket-emoji">{t.emoji}</div>
                  <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 2, marginBottom: "0.3rem", fontWeight: 700 }}>{t.night}</div>
                  <h3>{t.name}</h3>
                  <div className="price" style={{ color: t.color }}>${t.price}<span className="price-period"> / person</span></div>
                  <ul className="perks">{t.perks.map(p => <li key={p}>{p}</li>)}</ul>
                  <button className="buy-btn" style={{ background: `linear-gradient(135deg, ${t.color}, #6f42c1)`, borderRadius: 12 }} onClick={() => openPayModal(t.name, t.price)}>
                    Get {t.name} — ${t.price}
                  </button>
                  <div className="payment-icons">
                    <span className="btc-badge">₿ Bitcoin</span>
                    <span className="btc-badge" style={{ background: "rgba(245,169,184,0.1)", borderColor: "rgba(245,169,184,0.25)", color: "#f5a9b8" }}>🎁 Gift Card</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Virtual Access */}
            <div style={{ marginTop: "2rem", background: "rgba(91,206,250,0.04)", border: "1px solid rgba(91,206,250,0.18)", borderRadius: 22, padding: "2.5rem", display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: 3, color: "#5bcefa", marginBottom: "0.6rem" }}>📺 Can&apos;t Make It to LA?</div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 900, marginBottom: "0.6rem" }}>Virtual Access — <span style={{ color: "#5bcefa" }}>$75</span></h3>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "1.2rem" }}>
                  Get full remote access — HD live stream both nights, exclusive party content, photo sets, behind-the-scenes footage, and private gallery. Everything delivered to your inbox within 24hrs.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  {VIRTUAL_TIER.perks.map(p => (
                    <span key={p} style={{ fontSize: "0.75rem", background: "rgba(91,206,250,0.07)", border: "1px solid rgba(91,206,250,0.15)", borderRadius: 50, padding: "0.3rem 0.9rem", color: "rgba(255,255,255,0.65)" }}>✓ {p}</span>
                  ))}
                </div>
                <button className="buy-btn" style={{ background: "linear-gradient(135deg, #5bcefa, #0077b6)", maxWidth: 280, borderRadius: 12 }} onClick={() => openPayModal(VIRTUAL_TIER.name, VIRTUAL_TIER.price)}>
                  📺 Get Virtual Access — $75
                </button>
                <div style={{ marginTop: "0.8rem", display: "flex", gap: "0.5rem" }}>
                  <span className="btc-badge">₿ Bitcoin</span>
                  <span className="btc-badge" style={{ background: "rgba(245,169,184,0.1)", borderColor: "rgba(245,169,184,0.25)", color: "#f5a9b8" }}>🎁 Gift Card</span>
                </div>
              </div>
              <div style={{ textAlign: "center", opacity: 0.1, fontSize: "7rem", lineHeight: 1, userSelect: "none", flexShrink: 0 }}>📺</div>
            </div>
          </section>
        </Reveal>

        {/* ── Testimonials ── */}
        <Reveal>
          <section className="section">
            <div style={{ textAlign: "center", marginBottom: "0.8rem" }}><span className="section-pill">⭐ Reviews</span></div>
            <h2>What Attendees Say</h2>
            <p className="section-subtitle">Don&apos;t just take our word for it. Hear from past attendees.</p>
            <div className="testimonials-grid">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="testimonial-card">
                  <div>
                    <StarRating count={t.stars} />
                    <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
                  </div>
                  <div className="testimonial-author">
                    <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #d63384, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>
                        {t.author[0]}
                      </div>
                      <div>
                        <strong style={{ fontSize: "0.88rem" }}>{t.author}</strong>
                        <span className="testimonial-role">{t.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ── Dress Code ── */}
        <Reveal>
          <section className="section" id="dresscode">
            <div style={{ textAlign: "center", marginBottom: "0.8rem" }}><span className="section-pill">👗 Style Guide</span></div>
            <h2>Dress Code</h2>
            <p className="section-subtitle">Come as your most glamorous, authentic self. There are no wrong answers here.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "1rem" }}>
              {[
                { icon: "👠", label: "Heels & Lingerie", desc: "Always welcome. Always celebrated." },
                { icon: "🥻", label: "Gowns & Dresses", desc: "Formal femme energy encouraged." },
                { icon: "🖤", label: "Latex & Leather", desc: "Fetish-friendly attire welcome." },
                { icon: "💼", label: "Suits & Formal", desc: "Doms and admirers — dress sharp." },
                { icon: "🎭", label: "Themed Costumes", desc: "Get creative. Stand out." },
                { icon: "✨", label: "Anything Glam", desc: "If it sparkles, wear it." },
              ].map(d => (
                <div key={d.label} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "1.5rem", textAlign: "center", transition: "border-color 0.3s, transform 0.3s" }} className="glass-card">
                  <div style={{ fontSize: "2rem", marginBottom: "0.6rem" }}>{d.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: "0.88rem", marginBottom: "0.3rem" }}>{d.label}</div>
                  <div style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{d.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1.5rem", background: "rgba(214,51,132,0.05)", border: "1px solid rgba(214,51,132,0.15)", borderRadius: 14, padding: "1.2rem 1.5rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>⚠️ <strong>No street clothes.</strong> Dress code is enforced at the door. When in doubt — overdress. You&apos;ll thank yourself later.</p>
            </div>
          </section>
        </Reveal>

        {/* ── Venue Reveal Teaser ── */}
        <Reveal delay={100}>
          <div className="venue-teaser" style={{ marginBottom: "2rem" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.8rem" }}>📍</div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem" }}>Venue Reveal</h3>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.88rem", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 1.2rem" }}>
              The venue is a stunning private location in Los Angeles. Full address and entry instructions are sent exclusively to ticket holders <strong>48 hours before the event.</strong> No walk-ins, no exceptions.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1.2rem", background: "rgba(214,51,132,0.1)", border: "1px solid rgba(214,51,132,0.25)", borderRadius: 50, fontSize: "0.78rem", color: "#f5a9b8", fontWeight: 700 }}>
              🔒 Disclosed to ticket holders only
            </div>
          </div>
        </Reveal>

        {/* ── FAQ ── */}
        <Reveal>
          <section className="section" id="faq">
            <div style={{ textAlign: "center", marginBottom: "0.8rem" }}><span className="section-pill">❓ FAQ</span></div>
            <h2>Frequently Asked Questions</h2>
            <p className="section-subtitle">Everything you need to know before you arrive.</p>
            <div className="faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="faq-q">
                    <span>{f.q}</span>
                    <span style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0, color: openFaq === i ? "#f5a9b8" : "rgba(255,255,255,0.4)", transition: "color 0.2s" }}>
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </div>
                  {openFaq === i && <div className="faq-a">{f.a}</div>}
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ── Email Signup ── */}
        <Reveal>
          <section className="section">
            <div className="email-section">
              <div style={{ marginBottom: "0.8rem" }}><span className="section-pill">📧 Waitlist</span></div>
              <h2>Join the Waitlist</h2>
              <p>Be first to know about ticket drops, venue reveal, and exclusive pre-party info. No spam, ever.</p>
              {emailSent ? (
                <div className="email-success" style={{ textAlign: "center" }}>✅ You&apos;re on the list!</div>
              ) : (
                <form className="email-form" onSubmit={async (e) => {
                  e.preventDefault();
                  if (!email) return;
                  try { await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }); } catch {}
                  setEmailSent(true);
                }}>
                  <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="email-input" />
                  <button type="submit" className="email-btn">Join Waitlist →</button>
                </form>
              )}
            </div>
          </section>
        </Reveal>

        {/* ── Contact ── */}
        <Reveal>
          <section className="section" id="contact">
            <div style={{ textAlign: "center", marginBottom: "0.8rem" }}><span className="section-pill">📬 Get In Touch</span></div>
            <h2>Contact Us</h2>
            <p className="section-subtitle">Questions? Group bookings? Special requests? We&apos;re here for you.</p>
            <div className="social-bar">
              <a href="mailto:sissyfantasyisland70@gmail.com" className="social-link"><span>📧</span> Email Us</a>
              <a href="https://wa.me/14153053689" target="_blank" rel="noopener" className="social-link"><span>💬</span> WhatsApp</a>
              <a href="tel:+14153053689" className="social-link"><span>📞</span> (415) 305-3689</a>
              <a href="https://t.me/tshungkathy10" target="_blank" rel="noopener" className="social-link"><span>✈️</span> Telegram</a>
            </div>
            <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.82rem", color: "rgba(255,255,255,0.3)" }}>
              We typically respond within 2 hours. All inquiries are handled with complete discretion.
            </p>
          </section>
        </Reveal>

        {/* ── Footer ── */}
        <footer className="footer">
          <div className="gradient-divider" style={{ marginBottom: "3rem" }}></div>
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="nav-logo" style={{ marginBottom: "0.8rem" }}>LA TRANS PARTY 🏳️⚧️</div>
              <p>The most exclusive trans &amp; subs party in Los Angeles. October 23–24, 2026. Private venue. Limited tickets.</p>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
                {["🔒 Discreet", "🛡️ Consent First", "🏳️⚧️ Inclusive"].map(b => (
                  <span key={b} style={{ padding: "0.2rem 0.7rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{b}</span>
                ))}
              </div>
            </div>
            <div className="footer-col">
              <h4>Event</h4>
              <a href="#tickets">Get Tickets</a>
              <a href="#about">About</a>
              <a href="#dresscode">Dress Code</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="footer-col">
              <h4>Community</h4>
              <Link href="/community">Community</Link>
              <Link href="/chat">Live Chat</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/events">Events</Link>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <Link href="/terms">Terms of Service</Link>
              <a href="#contact">Privacy Policy</a>
              <a href="#contact">Contact Us</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 LA Trans Party. All rights reserved. 18+ only. Adults only content.</p>
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

      {/* ── Payment Modal ── */}
      {payModal && (
        <div className="age-gate-overlay" onClick={() => setPayModal(null)}>
          <div className="pay-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pay-modal-close" onClick={() => setPayModal(null)}>✕</button>
            <div style={{ textAlign: "center", marginBottom: "0.3rem", fontSize: "1.5rem" }}>
              {TICKETS.find(t => t.name === payModal.tier)?.emoji || VIRTUAL_TIER.emoji}
            </div>
            <h2 style={{ textAlign: "center", marginBottom: "0.3rem" }}>{payModal.tier}</h2>
            <div className="pay-modal-total">${payModal.price} · {payModal.tier === "Virtual Access" ? "Remote Access — Both Nights" : "Oct 23–24, 2026 · Los Angeles"}</div>

            {!payMethod && (
              <div className="pay-options">
                <p style={{ textAlign: "center", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>Select a payment method</p>
                <button className="pay-option" onClick={() => setPayMethod("btc")}>
                  <span>₿</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 700 }}>Pay with Bitcoin</div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>Maximum privacy. No traceable payment.</div>
                  </div>
                </button>
                <button className="pay-option" onClick={() => setPayMethod("gift")}>
                  <span>🎁</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 700 }}>Redeem Gift Card</div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>Amazon, Visa, Mastercard gift cards accepted.</div>
                  </div>
                </button>
                <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.72rem", color: "rgba(255,255,255,0.3)" }}>🔒 All payments are 100% private and discreet</span>
                </div>
              </div>
            )}

            {payMethod === "gift" && (
              <div className="pay-btc-content">
                {giftSubmitted ? (
                  <div className="email-success" style={{ textAlign: "center", padding: "1.5rem 0" }}>✅ Gift card submitted! Your ticket will be sent within 1 hour.</div>
                ) : (
                  <form onSubmit={handleGiftSubmit} className="gift-form">
                    <h3 style={{ textAlign: "center", marginBottom: "0.3rem" }}>Redeem Gift Card</h3>
                    <p style={{ textAlign: "center", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>Enter your gift card code or upload an image</p>
                    <input type="text" placeholder="Gift card code" value={giftCode} onChange={(e) => setGiftCode(e.target.value)} className="form-input" />
                    <label className="gift-upload-label">
                      <span>{giftImage ? `📎 ${giftImage.name}` : "📷 Upload gift card image"}</span>
                      <input type="file" accept="image/*" onChange={(e) => setGiftImage(e.target.files[0] || null)} style={{ display: "none" }} />
                    </label>
                    <button type="submit" className="buy-btn donate-btn">Submit for Verification →</button>
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
                  <p className="btc-label">Scan QR code to send Bitcoin</p>
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
