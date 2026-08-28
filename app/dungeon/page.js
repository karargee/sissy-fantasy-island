"use client";
import { useState } from "react";
import Link from "next/link";

const PACKAGES = [
  {
    name: "The Tease",
    tag: "STARTER",
    duration: "2 Hours",
    price: 500,
    accent: "#c9a96e",
    desc: "Your introduction to the dungeon experience. Intimate, intense, and unforgettable.",
    includes: [
      "Full dungeon setup at your location",
      "Restraint system — cuffs, rope, spreader bar",
      "Blindfold & sensory deprivation kit",
      "Paddle, crop & flogger selection",
      "Discreet unmarked vehicle",
      "Setup & teardown included",
      "1 professional Dom/Mistress",
    ],
  },
  {
    name: "The Session",
    tag: "MOST POPULAR",
    duration: "4 Hours",
    price: 900,
    accent: "#d63384",
    popular: true,
    desc: "The full experience. Everything you need for a complete, deeply satisfying session.",
    includes: [
      "Everything in The Tease",
      "St. Andrew's Cross",
      "Bondage bench",
      "Chastity & denial play equipment",
      "Strap-on & pegging kit",
      "Sissy transformation station",
      "2 professional attendants",
      "Refreshments included",
    ],
  },
  {
    name: "The Takeover",
    tag: "PREMIUM",
    duration: "Full Day — 8 Hours",
    price: 1500,
    accent: "#7c3aed",
    desc: "Total immersion. A full day of complete surrender with our most elite setup.",
    includes: [
      "Everything in The Session",
      "Full dungeon furniture suite",
      "Suspension rig (where permitted)",
      "Medical play kit",
      "Electro-stimulation devices",
      "Full sissy makeover service",
      "Private photographer (optional)",
      "Dedicated personal concierge",
      "Overnight extension available",
    ],
  },
];

const EQUIPMENT = [
  { icon: "⛓", name: "Restraints", desc: "Leather cuffs, rope, spreader bars, hog-tie kits, suspension hardware" },
  { icon: "🪑", name: "Furniture", desc: "Bondage bench, St. Andrew's Cross, spanking horse, queening chair" },
  { icon: "🎭", name: "Sensory", desc: "Blindfolds, hoods, gags, earplugs, sensory deprivation gear" },
  { icon: "🏹", name: "Impact Play", desc: "Paddles, crops, floggers, canes, single-tail whips" },
  { icon: "🔒", name: "Chastity", desc: "Cages, locks, denial devices for all experience levels" },
  { icon: "💄", name: "Sissy Station", desc: "Wigs, full makeup kit, outfits, heels, corsets, accessories" },
  { icon: "⚡", name: "Electro Play", desc: "TENS units, violet wands — Takeover package only" },
  { icon: "🩺", name: "Medical Kit", desc: "Speculums, gloves, clinical roleplay gear — Takeover only" },
];

const STEPS = [
  { n: "01", title: "Enquire", desc: "Reach out via the booking form, email, or WhatsApp. Tell us your date, location, and desired package." },
  { n: "02", title: "Consult", desc: "We schedule a private call to discuss your desires, limits, and any special requests. Fully confidential." },
  { n: "03", title: "Confirm", desc: "Pay your 50% deposit to lock in your date. We handle all logistics from here." },
  { n: "04", title: "We Arrive", desc: "Our team arrives in an unmarked vehicle and sets up the full dungeon at your location in under 60 minutes." },
  { n: "05", title: "Your Session", desc: "Surrender to the experience. Our professionals ensure your safety, comfort, and complete satisfaction." },
  { n: "06", title: "Discreet Exit", desc: "We pack everything and leave without a trace. No branding, no evidence, total discretion guaranteed." },
];

const TESTIMONIALS = [
  { name: "Anonymous", location: "Las Vegas, NV", pkg: "The Session", text: "I've visited professional dungeons across three countries. This was the most seamless, discreet, and professional experience I've ever had. The setup was immaculate." },
  { name: "M.K.", location: "Los Angeles, CA", pkg: "The Takeover", text: "The full day package was worth every penny. The team was professional, respectful of my limits, and the sissy makeover was absolutely stunning. I felt completely safe." },
  { name: "Anonymous", location: "New York, NY", pkg: "The Tease", text: "First time trying anything like this. They made me feel completely at ease from the first call. The discretion is real — nobody knew a thing." },
];

const FAQS = [
  { q: "Where do you set up?", a: "We come to your hotel room, private residence, Airbnb, or any private space. We've set up in penthouses, suburban homes, and everything in between. As long as it's private, we're there." },
  { q: "How discreet is the service?", a: "Completely. Our vehicle has no branding. Our team arrives in plain clothes. Equipment is carried in unmarked cases. Billing appears as a generic services company. We sign NDAs on request." },
  { q: "What cities do you cover?", a: "We're based in Las Vegas and cover the greater Nevada area. We also travel nationwide for The Takeover package. Contact us to check availability in your city." },
  { q: "Do I need experience?", a: "Not at all. We cater to complete beginners through experienced players. During your pre-session consult we'll tailor everything to your experience level and comfort." },
  { q: "What are your safety protocols?", a: "All sessions use a safe word system. Our attendants are trained in first aid and BDSM safety. Equipment is sanitized between every session. We never push past agreed limits." },
  { q: "Can I request specific attendants?", a: "Yes. We have male, female, and non-binary Doms/Mistresses available. Specify your preference when booking and we'll do our best to accommodate." },
  { q: "How do I pay?", a: "We accept Bitcoin, cash, and bank transfer. A 50% deposit is required to confirm your booking. The balance is due on the day of the session." },
  { q: "Can I add extras on the day?", a: "Yes. Additional time, extra attendants, and add-on services can be arranged on the day subject to availability. Prices vary." },
];

function BookingForm({ selectedPkg }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", location: "", pkg: selectedPkg || "The Session", date: "", notes: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: "Dungeon Booking Request" }),
      });
    } catch {}
    setSending(false);
    setSent(true);
  }

  if (sent) return (
    <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
      <div style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Request Received</div>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.88rem", lineHeight: 1.7 }}>We'll contact you within 2 hours to confirm your session. Check your email or phone.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
      <input className="form-input" placeholder="Your name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input className="form-input" type="email" placeholder="Email address" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="form-input" placeholder="Phone / WhatsApp" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
      <input className="form-input" placeholder="City / Location" required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
      <select className="form-input form-select" value={form.pkg} onChange={e => setForm({ ...form, pkg: e.target.value })}>
        <option value="The Tease">The Tease — $500 (2hrs)</option>
        <option value="The Session">The Session — $900 (4hrs)</option>
        <option value="The Takeover">The Takeover — $1,500 (Full Day)</option>
      </select>
      <input className="form-input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
      <textarea className="form-input" placeholder="Special requests, limits, experience level..." rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ resize: "none" }} />
      <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", lineHeight: 1.6 }}>🔒 All information is strictly confidential. NDAs available on request.</p>
      <button type="submit" disabled={sending} style={{ padding: "1rem", borderRadius: 8, border: "none", background: "linear-gradient(135deg, #d63384, #7c3aed)", color: "white", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", letterSpacing: "0.5px", textTransform: "uppercase", opacity: sending ? 0.7 : 1 }}>
        {sending ? "Sending..." : "Request Booking"}
      </button>
    </form>
  );
}

export default function DungeonPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedPkg, setSelectedPkg] = useState("The Session");

  const S = {
    page: { minHeight: "100vh", background: "#080809", color: "#f0f0f0", fontFamily: "inherit" },
    nav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.2rem 2rem", position: "sticky", top: 0, zIndex: 100, background: "rgba(8,8,9,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" },
    label: { display: "inline-block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, padding: "0.35rem 1rem", borderRadius: 2, background: "rgba(214,51,132,0.1)", border: "1px solid rgba(214,51,132,0.3)", color: "#d63384", marginBottom: "1.2rem" },
  };

  return (
    <div style={S.page}>

      {/* NAV */}
      <nav style={S.nav}>
        <Link href="/" style={{ color: "#f5a9b8", textDecoration: "none", fontWeight: 900, fontSize: "0.95rem", letterSpacing: 3, textTransform: "uppercase" }}>SFI 💕</Link>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <a href="#packages" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.82rem", letterSpacing: 1 }}>Packages</a>
          <a href="#equipment" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.82rem", letterSpacing: 1 }}>Equipment</a>
          <a href="#faq" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.82rem", letterSpacing: 1 }}>FAQ</a>
          <a href="#book" style={{ padding: "0.55rem 1.4rem", borderRadius: 4, background: "linear-gradient(135deg, #d63384, #7c3aed)", color: "white", textDecoration: "none", fontSize: "0.78rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Book Now</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80') center/cover no-repeat", opacity: 0.12 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(8,8,9,0.97) 0%, rgba(40,5,25,0.92) 50%, rgba(8,8,9,0.97) 100%)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(214,51,132,0.6), transparent)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "1fr 420px", gap: "4rem", alignItems: "center", width: "100%" }}>
          <div>
            <div style={S.label}>Mobile BDSM Dungeon — Las Vegas & Nationwide</div>
            <h1 style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 900, letterSpacing: -3, lineHeight: 1, marginBottom: "1.5rem", color: "#fff" }}>
              The Dungeon<br />
              <span style={{ background: "linear-gradient(90deg, #f5a9b8, #d63384, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Comes To You.</span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 520, marginBottom: "2.5rem" }}>
              A fully equipped, professional BDSM dungeon delivered and set up at your hotel, home, or private venue. Discreet. Safe. Unforgettable.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
              <a href="#book" style={{ padding: "1rem 2.5rem", borderRadius: 4, background: "linear-gradient(135deg, #d63384, #7c3aed)", color: "white", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem", letterSpacing: 1, textTransform: "uppercase" }}>Book a Session</a>
              <a href="#packages" style={{ padding: "1rem 2.5rem", borderRadius: 4, border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" }}>View Packages</a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2rem" }}>
              {[["100%", "Discreet"], ["60min", "Setup Time"], ["7 Days", "Available"], ["50+", "Cities Covered"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#d63384", letterSpacing: -1 }}>{val}</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1.5, marginTop: "0.2rem" }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* STICKY BOOKING FORM */}
          <div id="book" style={{ background: "#0e0e14", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "2rem", boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: "#d63384", marginBottom: "0.5rem" }}>Request a Session</div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "1.5rem", letterSpacing: -0.5 }}>Book Your Dungeon</h3>
            <BookingForm selectedPkg={selectedPkg} />
            <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <a href="mailto:sissyfantasyisland70@gmail.com" style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.8rem" }}>
                <span style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem" }}>✉</span>
                sissyfantasyisland70@gmail.com
              </a>
              <a href="tel:+14153053689" style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.8rem" }}>
                <span style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem" }}>📞</span>
                (415) 305-3689
              </a>
              <a href="https://wa.me/14153053689" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.8rem" }}>
                <span style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem" }}>💬</span>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "#0a0a0c" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { icon: "🔒", title: "NDA Available", desc: "Sign on request" },
            { icon: "🚑", title: "Safety First", desc: "First-aid trained staff" },
            { icon: "🧼", title: "Sanitized Gear", desc: "Cleaned between every session" },
            { icon: "📵", title: "No Recording", desc: "Without explicit consent" },
          ].map((t, i) => (
            <div key={t.title} style={{ padding: "1.8rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <span style={{ fontSize: "1.4rem" }}>{t.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.1rem" }}>{t.title}</div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "6rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={S.label}>The Process</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: -2, marginBottom: "0.8rem" }}>How It Works</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>From first enquiry to final teardown — seamless, professional, and completely discreet.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, overflow: "hidden" }}>
          {STEPS.map((s, i) => (
            <div key={s.n} style={{ padding: "2.5rem 2rem", background: "#0a0a0c", position: "relative", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <div style={{ fontSize: "3rem", fontWeight: 900, color: "rgba(214,51,132,0.15)", letterSpacing: -2, lineHeight: 1, marginBottom: "1rem", fontVariantNumeric: "tabular-nums" }}>{s.n}</div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: 0.5 }}>{s.title}</h3>
              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PACKAGES */}
      <div id="packages" style={{ background: "#0a0a0c", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "6rem 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={S.label}>Pricing</div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: -2, marginBottom: "0.8rem" }}>Session Packages</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>All packages include full setup, teardown, and a pre-session consultation.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", alignItems: "start" }}>
            {PACKAGES.map((pkg) => (
              <div key={pkg.name} onClick={() => setSelectedPkg(pkg.name)} style={{ background: pkg.popular ? "linear-gradient(160deg, #140a1e, #1a0d2e)" : "#0e0e14", border: `1px solid ${pkg.popular ? "rgba(214,51,132,0.35)" : "rgba(255,255,255,0.07)"}`, borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", position: "relative" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 24px 60px rgba(0,0,0,0.5)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ height: 4, background: `linear-gradient(90deg, ${pkg.accent}, ${pkg.popular ? "#7c3aed" : pkg.accent}88)` }} />
                {pkg.popular && (
                  <div style={{ position: "absolute", top: "1.2rem", right: "1.2rem", background: "linear-gradient(135deg, #d63384, #7c3aed)", color: "white", fontSize: "0.6rem", fontWeight: 800, letterSpacing: 2, padding: "0.25rem 0.7rem", borderRadius: 2, textTransform: "uppercase" }}>Most Popular</div>
                )}
                <div style={{ padding: "2rem" }}>
                  <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: 3, color: pkg.accent, textTransform: "uppercase", marginBottom: "0.5rem" }}>{pkg.tag}</div>
                  <h3 style={{ fontSize: "1.4rem", fontWeight: 900, letterSpacing: -0.5, marginBottom: "0.3rem" }}>{pkg.name}</h3>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: 1 }}>{pkg.duration}</div>
                  <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: "1.5rem" }}>{pkg.desc}</p>
                  <div style={{ fontSize: "3.5rem", fontWeight: 900, letterSpacing: -3, lineHeight: 1, color: "#fff", marginBottom: "0.3rem" }}>${pkg.price.toLocaleString()}</div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", marginBottom: "2rem" }}>+ 50% deposit to confirm</div>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.7rem", marginBottom: "2rem" }}>
                    {pkg.includes.map(item => (
                      <div key={item} style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start", fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                        <span style={{ color: pkg.accent, flexShrink: 0, marginTop: 2, fontSize: "0.7rem" }}>✓</span>{item}
                      </div>
                    ))}
                  </div>
                  <a href="#book" onClick={() => setSelectedPkg(pkg.name)} style={{ display: "block", textAlign: "center", padding: "0.9rem", borderRadius: 6, background: `linear-gradient(135deg, ${pkg.accent}, ${pkg.popular ? "#7c3aed" : pkg.accent}bb)`, color: "white", textDecoration: "none", fontWeight: 700, fontSize: "0.82rem", letterSpacing: 1, textTransform: "uppercase" }}>
                    Book {pkg.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EQUIPMENT */}
      <div id="equipment" style={{ maxWidth: 1200, margin: "0 auto", padding: "6rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <div style={S.label}>The Arsenal</div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: -2, marginBottom: "1rem" }}>What We Bring</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: "2rem", fontSize: "0.95rem" }}>
              Every piece of equipment is professional-grade, meticulously maintained, and sanitized between every single session. We bring the full dungeon to you.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {EQUIPMENT.map((item, i) => (
                <div key={item.name} style={{ display: "flex", gap: "1.2rem", alignItems: "flex-start", padding: "1.2rem 0", borderBottom: i < EQUIPMENT.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(214,51,132,0.08)", border: "1px solid rgba(214,51,132,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.2rem" }}>{item.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
              "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
              "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80",
              "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&q=80",
            ].map((src, i) => (
              <div key={i} style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "1", background: "#0d0d12", border: "1px solid rgba(255,255,255,0.06)" }}>
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6, filter: "grayscale(30%)" }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ background: "#0a0a0c", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "6rem 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={S.label}>Client Reviews</div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: -2 }}>What Clients Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: "#0e0e14", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "2rem" }}>
                <div style={{ color: "#d63384", fontSize: "0.9rem", marginBottom: "1rem", letterSpacing: 2 }}>★★★★★</div>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontStyle: "italic", marginBottom: "1.5rem" }}>&ldquo;{t.text}&rdquo;</p>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{t.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)" }}>{t.location}</div>
                  </div>
                  <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: 1, color: "#d63384", background: "rgba(214,51,132,0.08)", border: "1px solid rgba(214,51,132,0.2)", padding: "0.2rem 0.6rem", borderRadius: 2, textTransform: "uppercase" }}>{t.pkg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" style={{ maxWidth: 800, margin: "0 auto", padding: "6rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={S.label}>FAQ</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: -2 }}>Common Questions</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", color: "white", padding: "1.4rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: "inherit", textAlign: "left", gap: "1rem" }}>
                <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{f.q}</span>
                <span style={{ color: "#d63384", fontSize: "1.2rem", flexShrink: 0, transition: "transform 0.2s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ paddingBottom: "1.4rem", color: "rgba(255,255,255,0.5)", fontSize: "0.88rem", lineHeight: 1.8 }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{ position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 100%, rgba(214,51,132,0.12) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto", padding: "8rem 2rem", textAlign: "center" }}>
          <div style={S.label}>Ready?</div>
          <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.05, marginBottom: "1.2rem" }}>
            Your Session<br />Awaits.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", maxWidth: 440, margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
            Available 7 days a week. We travel to you anywhere in the US. Diamond card holders receive one complimentary session.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#book" style={{ padding: "1.1rem 3rem", borderRadius: 4, background: "linear-gradient(135deg, #d63384, #7c3aed)", color: "white", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem", letterSpacing: 1, textTransform: "uppercase" }}>Book Now</a>
            <Link href="/#cards" style={{ padding: "1.1rem 3rem", borderRadius: 4, border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" }}>Get Diamond Card</Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "2rem", textAlign: "center", background: "#080809" }}>
        <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.2)" }}>
          © 2026 Sissy Fantasy Island · <a href="mailto:sissyfantasyisland70@gmail.com" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>sissyfantasyisland70@gmail.com</a> · (415) 305-3689 · All sessions are private and confidential.
        </div>
      </div>

    </div>
  );
}

export default function DungeonPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedPkg, setSelectedPkg] = useState("The Session");

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#f0f0f0", fontFamily: "var(--font-inter), Inter, sans-serif" }}>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(8,8,8,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ color: "#f5a9b8", textDecoration: "none", fontWeight: 900, fontSize: "0.95rem", letterSpacing: 3, textTransform: "uppercase" }}>SFI 💕</Link>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <a href="#packages" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.82rem", letterSpacing: 1, textTransform: "uppercase" }}>Packages</a>
          <a href="#equipment" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.82rem", letterSpacing: 1, textTransform: "uppercase" }}>Equipment</a>
          <a href="#faq" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.82rem", letterSpacing: 1, textTransform: "uppercase" }}>FAQ</a>
          <a href="#book" style={{ background: "linear-gradient(135deg, #d63384, #7c3aed)", padding: "0.55rem 1.4rem", borderRadius: 6, color: "white", textDecoration: "none", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Book Now</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80') center/cover no-repeat", opacity: 0.18 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.7) 60%, rgba(8,8,8,1) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "2rem 1.5rem", maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "inline-block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 4, padding: "0.4rem 1.2rem", borderRadius: 2, border: "1px solid rgba(201,169,110,0.4)", color: "#c9a96e", marginBottom: "2rem" }}>
            Mobile BDSM Dungeon — Las Vegas & Nationwide
          </div>
          <h1 style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", fontWeight: 900, letterSpacing: -3, lineHeight: 0.95, marginBottom: "2rem", color: "#fff" }}>
            THE DUNGEON<br />
            <span style={{ background: "linear-gradient(90deg, #c9a96e, #d63384, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>COMES TO YOU</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 560, margin: "0 auto 3rem", lineHeight: 1.9, fontSize: "1.05rem", fontWeight: 300 }}>
            A fully equipped, professional BDSM dungeon delivered and set up at your hotel, home, or private venue. Discreet. Safe. Unforgettable.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "4rem" }}>
            <a href="#book" style={{ display: "inline-block", padding: "1.1rem 3rem", borderRadius: 4, background: "linear-gradient(135deg, #d63384, #7c3aed)", color: "white", textDecoration: "none", fontWeight: 700, fontSize: "0.88rem", textTransform: "uppercase", letterSpacing: 2 }}>Book Your Session</a>
            <a href="#packages" style={{ display: "inline-block", padding: "1.1rem 3rem", borderRadius: 4, border: "1px solid rgba(201,169,110,0.4)", color: "#c9a96e", textDecoration: "none", fontWeight: 600, fontSize: "0.88rem", textTransform: "uppercase", letterSpacing: 2 }}>View Packages</a>
          </div>
          <div style={{ display: "flex", gap: "3rem", justifyContent: "center", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2.5rem" }}>
            {[["100%", "Discreet"], ["60min", "Setup Time"], ["7 Days", "Available"], ["50+", "Cities Covered"]].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#c9a96e", letterSpacing: -1 }}>{val}</div>
                <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.35)", marginTop: "0.3rem" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <div style={{ background: "#0d0d0d", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "1.5rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
          {["🔒 NDA Available", "🚑 First-Aid Trained Staff", "🧼 Sanitized Between Every Session", "📵 Strict No-Photos Policy", "🚚 Unmarked Vehicle"].map(item => (
            <span key={item} style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", letterSpacing: 0.5 }}>{item}</span>
          ))}
        </div>
      </div>

      {/* PACKAGES */}
      <section id="packages" style={{ padding: "7rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 4, color: "#c9a96e", marginBottom: "1rem" }}>Choose Your Experience</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: -2, marginBottom: "1rem" }}>Session Packages</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", maxWidth: 480, margin: "0 auto" }}>All packages include full setup, teardown, and a pre-session consultation.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", alignItems: "start" }}>
          {PACKAGES.map(pkg => (
            <div key={pkg.name} style={{ background: pkg.popular ? "linear-gradient(160deg, #1a0a14, #120818)" : "#0d0d0d", border: `1px solid ${pkg.popular ? "rgba(214,51,132,0.3)" : "rgba(255,255,255,0.07)"}`, borderRadius: 4, overflow: "hidden", position: "relative" }}>
              {pkg.popular && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #d63384, #7c3aed)" }} />}
              <div style={{ padding: "2.5rem 2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                  <div>
                    <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: pkg.accent, marginBottom: "0.5rem" }}>{pkg.tag}</div>
                    <h3 style={{ fontSize: "1.6rem", fontWeight: 900, letterSpacing: -1 }}>{pkg.name}</h3>
                    <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", marginTop: "0.2rem", letterSpacing: 1, textTransform: "uppercase" }}>{pkg.duration}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "2.5rem", fontWeight: 900, color: pkg.accent, letterSpacing: -2, lineHeight: 1 }}>${pkg.price.toLocaleString()}</div>
                    <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1 }}>Starting from</div>
                  </div>
                </div>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "1.5rem", fontStyle: "italic" }}>{pkg.desc}</p>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem", marginBottom: "2rem" }}>
                  {pkg.includes.map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem", marginBottom: "0.7rem" }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: `${pkg.accent}22`, border: `1px solid ${pkg.accent}55`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: pkg.accent }} />
                      </div>
                      <span style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <a href="#book" onClick={() => setSelectedPkg(pkg.name)} style={{ display: "block", textAlign: "center", padding: "1rem", borderRadius: 4, background: pkg.popular ? "linear-gradient(135deg, #d63384, #7c3aed)" : "transparent", border: pkg.popular ? "none" : `1px solid ${pkg.accent}55`, color: pkg.popular ? "white" : pkg.accent, textDecoration: "none", fontWeight: 700, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: 2 }}>
                  Book This Package
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "7rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 4, color: "#c9a96e", marginBottom: "1rem" }}>The Process</div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: -2 }}>How It Works</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0" }}>
            {STEPS.map((s, i) => (
              <div key={s.n} style={{ padding: "2.5rem 2rem", borderRight: i < STEPS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: "3rem", fontWeight: 900, color: "rgba(201,169,110,0.15)", letterSpacing: -2, lineHeight: 1, marginBottom: "1rem" }}>{s.n}</div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: "0.8rem", color: "#c9a96e" }}>{s.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPMENT */}
      <section id="equipment" style={{ padding: "7rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 4, color: "#c9a96e", marginBottom: "1rem" }}>Professional Grade</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: -2, marginBottom: "1rem" }}>What We Bring</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem" }}>All equipment is professionally sanitized between every session.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.05)" }}>
          {EQUIPMENT.map(item => (
            <div key={item.name} style={{ background: "#080808", padding: "2rem 1.8rem", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#0f0f0f"}
              onMouseLeave={e => e.currentTarget.style.background = "#080808"}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: "0.8rem" }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.4rem", letterSpacing: 0.5 }}>{item.name}</div>
              <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "7rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 4, color: "#c9a96e", marginBottom: "1rem" }}>Client Experiences</div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: -2 }}>What They Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 4, padding: "2.5rem 2rem" }}>
                <div style={{ fontSize: "2rem", color: "#c9a96e", marginBottom: "1rem", lineHeight: 1 }}>"</div>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, fontStyle: "italic", marginBottom: "1.5rem" }}>{t.text}</p>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{t.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginTop: "0.2rem" }}>{t.location}</div>
                  </div>
                  <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: 1.5, color: "#c9a96e", background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.2)", padding: "0.3rem 0.8rem", borderRadius: 2 }}>{t.pkg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING + FAQ */}
      <section id="book" style={{ padding: "7rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>

          {/* Booking Form */}
          <div>
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 4, color: "#c9a96e", marginBottom: "1rem" }}>Reserve Your Date</div>
              <h2 style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 900, letterSpacing: -2, marginBottom: "1rem" }}>Book Your Session</h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", lineHeight: 1.7 }}>Fill out the form and we'll confirm within 2 hours. All details are strictly confidential.</p>
            </div>
            <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, padding: "2.5rem" }}>
              <BookingForm selectedPkg={selectedPkg} />
            </div>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
              <a href="mailto:sissyfantasyisland70@gmail.com" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.2rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.8rem" }}>
                📧 sissyfantasyisland70@gmail.com
              </a>
              <a href="https://wa.me/14153053689" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.2rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.8rem" }}>
                💬 WhatsApp
              </a>
              <a href="tel:+14153053689" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.2rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.8rem" }}>
                📞 (415) 305-3689
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div id="faq">
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 4, color: "#c9a96e", marginBottom: "1rem" }}>Got Questions</div>
              <h2 style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 900, letterSpacing: -2 }}>FAQ</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {FAQS.map((f, i) => (
                <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.3rem 0", gap: "1rem" }}>
                    <span style={{ fontSize: "0.9rem", fontWeight: 600, color: openFaq === i ? "#fff" : "rgba(255,255,255,0.7)" }}>{f.q}</span>
                    <span style={{ color: "#c9a96e", fontSize: "1.2rem", flexShrink: 0, fontWeight: 300 }}>{openFaq === i ? "−" : "+"}</span>
                  </div>
                  {openFaq === i && <div style={{ paddingBottom: "1.3rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <div style={{ position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ position: "absolute", inset: 0, background: "url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=80') center/cover no-repeat", opacity: 0.08 }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "8rem 2rem" }}>
          <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 4, color: "#c9a96e", marginBottom: "1.5rem" }}>Available 7 Days a Week</div>
          <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900, letterSpacing: -3, lineHeight: 1, marginBottom: "1.5rem" }}>READY TO<br />SURRENDER?</h2>
          <p style={{ color: "rgba(255,255,255,0.45)", maxWidth: 480, margin: "0 auto 3rem", lineHeight: 1.8, fontSize: "1rem" }}>
            Diamond card holders receive one complimentary session. Sessions available nationwide.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#book" style={{ display: "inline-block", padding: "1.1rem 3rem", borderRadius: 4, background: "linear-gradient(135deg, #d63384, #7c3aed)", color: "white", textDecoration: "none", fontWeight: 700, fontSize: "0.88rem", textTransform: "uppercase", letterSpacing: 2 }}>Book Now</a>
            <Link href="/#cards" style={{ display: "inline-block", padding: "1.1rem 3rem", borderRadius: 4, border: "1px solid rgba(201,169,110,0.4)", color: "#c9a96e", textDecoration: "none", fontWeight: 600, fontSize: "0.88rem", textTransform: "uppercase", letterSpacing: 2 }}>Get Diamond Card</Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "2rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.2)" }}>© 2026 Sissy Fantasy Island. All sessions are private and confidential. 18+ only.</p>
      </div>

    </div>
  );
}

export default function DungeonPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedPkg, setSelectedPkg] = useState("The Session");

  return (
    <div style={{ minHeight: "100vh", background: "#080608", color: "#f0f0f0", fontFamily: "var(--font-inter), Inter, sans-serif" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.2rem 2rem", background: "rgba(8,6,8,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Link href="/" style={{ color: "#f5a9b8", textDecoration: "none", fontWeight: 900, fontSize: "0.95rem", letterSpacing: 3, textTransform: "uppercase" }}>SFI 💕</Link>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <a href="#packages" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.82rem", letterSpacing: 1 }}>Packages</a>
          <a href="#equipment" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.82rem", letterSpacing: 1 }}>Equipment</a>
          <a href="#faq" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.82rem", letterSpacing: 1 }}>FAQ</a>
          <a href="#book" style={{ padding: "0.55rem 1.4rem", borderRadius: 4, background: "linear-gradient(135deg, #d63384, #7c3aed)", color: "white", textDecoration: "none", fontSize: "0.78rem", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Book Now</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80') center/cover no-repeat", opacity: 0.18 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,6,8,0.3) 0%, rgba(8,6,8,0.7) 60%, rgba(8,6,8,1) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 40%, rgba(214,51,132,0.12) 0%, transparent 65%)" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 1.5rem", maxWidth: 800 }}>
          <div style={{ display: "inline-block", fontSize: "0.65rem", fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "#c9a96e", borderBottom: "1px solid rgba(201,169,110,0.4)", paddingBottom: "0.4rem", marginBottom: "2rem" }}>
            Mobile BDSM Dungeon — Las Vegas & Nationwide
          </div>
          <h1 style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", fontWeight: 900, letterSpacing: -3, lineHeight: 0.95, marginBottom: "2rem", color: "#fff" }}>
            The Dungeon<br />
            <span style={{ background: "linear-gradient(90deg, #c9a96e, #d63384, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Comes To You</span>
          </h1>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.5)", lineHeight: 1.9, maxWidth: 560, margin: "0 auto 3rem" }}>
            A fully equipped, professional BDSM dungeon delivered and set up at your hotel, home, or private venue. Discreet. Safe. Unforgettable.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "4rem" }}>
            <a href="#book" style={{ padding: "1.1rem 3rem", borderRadius: 4, background: "linear-gradient(135deg, #d63384, #7c3aed)", color: "white", textDecoration: "none", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 2, textTransform: "uppercase" }}>Book a Session</a>
            <a href="#packages" style={{ padding: "1.1rem 3rem", borderRadius: 4, border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)", textDecoration: "none", fontWeight: 600, fontSize: "0.88rem", letterSpacing: 1 }}>View Packages</a>
          </div>
          <div style={{ display: "flex", gap: "3rem", justifyContent: "center", flexWrap: "wrap" }}>
            {[["100%", "Discreet"], ["60min", "Setup Time"], ["7 Days", "Available"], ["50+", "Equipment Pieces"]].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#c9a96e", letterSpacing: -1 }}>{val}</div>
                <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 2, marginTop: "0.2rem" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", opacity: 0.3 }}>
          <div style={{ width: 1, height: 60, background: "linear-gradient(to bottom, transparent, white)" }} />
          <div style={{ fontSize: "0.6rem", letterSpacing: 3, textTransform: "uppercase" }}>Scroll</div>
        </div>
      </div>

      {/* TRUST BAR */}
      <div style={{ background: "#0d0a0d", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          {[
            { icon: "🔒", label: "NDA Available" },
            { icon: "🚑", label: "Safety Trained Staff" },
            { icon: "🧼", label: "Sanitized Between Sessions" },
            { icon: "📵", label: "No Photos Without Consent" },
            { icon: "🚚", label: "Unmarked Vehicle" },
          ].map((t) => (
            <div key={t.label} style={{ display: "flex", alignItems: "center", gap: "0.8rem", padding: "1.4rem 1rem", borderRight: "1px solid rgba(255,255,255,0.04)" }}>
              <span style={{ fontSize: "1.1rem" }}>{t.icon}</span>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.45)", letterSpacing: 0.5 }}>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "7rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: 4, textTransform: "uppercase", color: "#c9a96e", marginBottom: "1rem" }}>The Process</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: -2, marginBottom: "1rem" }}>How It Works</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: 480, margin: "0 auto", lineHeight: 1.8 }}>From first enquiry to final teardown — a seamless, professional experience every step of the way.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0" }}>
          {STEPS.map((s, i) => (
            <div key={s.n} style={{ padding: "2.5rem 2rem", borderLeft: i % 2 === 0 ? "none" : "1px solid rgba(255,255,255,0.05)", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.05)" : "none", position: "relative" }}>
              <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "rgba(255,255,255,0.04)", letterSpacing: -2, lineHeight: 1, marginBottom: "1rem", fontVariantNumeric: "tabular-nums" }}>{s.n}</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.6rem", color: "#c9a96e" }}>{s.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PACKAGES */}
      <div id="packages" style={{ background: "#0a080a", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "7rem 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: 4, textTransform: "uppercase", color: "#c9a96e", marginBottom: "1rem" }}>Pricing</div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: -2, marginBottom: "1rem" }}>Session Packages</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: 480, margin: "0 auto", lineHeight: 1.8 }}>All packages include full setup, teardown, and a pre-session consultation. No hidden fees.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", alignItems: "start" }}>
            {PACKAGES.map((pkg) => (
              <div key={pkg.name} style={{ background: pkg.popular ? "linear-gradient(160deg, #1a0d1a, #120812)" : "#0d0a0d", border: `1px solid ${pkg.popular ? "rgba(214,51,132,0.3)" : "rgba(255,255,255,0.07)"}`, borderRadius: 2, overflow: "hidden", position: "relative" }}>
                {pkg.popular && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #d63384, #7c3aed)" }} />}
                <div style={{ padding: "2.5rem 2rem 0" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                    <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: pkg.accent, border: `1px solid ${pkg.accent}44`, padding: "0.25rem 0.7rem", borderRadius: 2 }}>{pkg.tag}</span>
                    <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", letterSpacing: 1 }}>{pkg.duration}</span>
                  </div>
                  <h3 style={{ fontSize: "1.8rem", fontWeight: 900, letterSpacing: -1, marginBottom: "0.5rem" }}>{pkg.name}</h3>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: "1.5rem" }}>{pkg.desc}</p>
                  <div style={{ fontSize: "3.5rem", fontWeight: 900, letterSpacing: -2, color: pkg.accent, lineHeight: 1, marginBottom: "0.3rem" }}>${pkg.price.toLocaleString()}</div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", marginBottom: "2rem", letterSpacing: 1 }}>ONE-TIME · NO HIDDEN FEES</div>
                </div>
                <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "0 2rem" }} />
                <div style={{ padding: "1.5rem 2rem" }}>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem", marginBottom: "2rem" }}>
                    {pkg.includes.map((item) => (
                      <li key={item} style={{ display: "flex", gap: "0.8rem", fontSize: "0.83rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                        <span style={{ color: pkg.accent, flexShrink: 0, marginTop: 2 }}>—</span>{item}
                      </li>
                    ))}
                  </ul>
                  <a href="#book" onClick={() => setSelectedPkg(pkg.name)} style={{ display: "block", textAlign: "center", padding: "1rem", background: pkg.popular ? "linear-gradient(135deg, #d63384, #7c3aed)" : "transparent", border: pkg.popular ? "none" : `1px solid ${pkg.accent}66`, color: pkg.popular ? "white" : pkg.accent, textDecoration: "none", fontWeight: 700, fontSize: "0.82rem", letterSpacing: 2, textTransform: "uppercase", borderRadius: 2 }}>
                    Book This Package
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EQUIPMENT */}
      <div id="equipment" style={{ maxWidth: 1100, margin: "0 auto", padding: "7rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "0.65rem", letterSpacing: 4, textTransform: "uppercase", color: "#c9a96e", marginBottom: "1rem" }}>The Arsenal</div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: -2, marginBottom: "1.5rem", lineHeight: 1.1 }}>What We Bring To You</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.9, marginBottom: "2rem", fontSize: "0.95rem" }}>
              Over 50 pieces of professional-grade equipment, sanitized between every session and transported in unmarked, padded cases. Everything you need for a complete dungeon experience — delivered to your door.
            </p>
            <div style={{ display: "flex", gap: "2rem" }}>
              {[["50+", "Equipment Pieces"], ["100%", "Sanitized"], ["0", "Visible Branding"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#c9a96e", letterSpacing: -1 }}>{v}</div>
                  <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1.5, marginTop: "0.2rem" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.05)" }}>
            {EQUIPMENT.map((item) => (
              <div key={item.name} style={{ background: "#0a080a", padding: "1.5rem", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#120d12"}
                onMouseLeave={e => e.currentTarget.style.background = "#0a080a"}
              >
                <div style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "0.88rem", marginBottom: "0.3rem" }}>{item.name}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOOKING + TESTIMONIALS */}
      <div id="book" style={{ background: "#0a080a", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "7rem 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
          <div>
            <div style={{ fontSize: "0.65rem", letterSpacing: 4, textTransform: "uppercase", color: "#c9a96e", marginBottom: "1rem" }}>Reservations</div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900, letterSpacing: -2, marginBottom: "1rem", lineHeight: 1.1 }}>Book Your Session</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: "2.5rem", fontSize: "0.9rem" }}>Fill out the form and we'll confirm within 2 hours. All details are strictly confidential. We sign NDAs on request.</p>
            <div style={{ background: "#0d0a0d", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, padding: "2rem" }}>
              <BookingForm selectedPkg={selectedPkg} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "1.5rem" }}>
              <a href="mailto:sissyfantasyisland70@gmail.com" style={{ display: "flex", alignItems: "center", gap: "0.8rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.82rem" }}>
                <span style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>📧</span>
                sissyfantasyisland70@gmail.com
              </a>
              <a href="tel:+14153053689" style={{ display: "flex", alignItems: "center", gap: "0.8rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.82rem" }}>
                <span style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>📞</span>
                (415) 305-3689
              </a>
              <a href="https://wa.me/14153053689" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: "0.8rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.82rem" }}>
                <span style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>💬</span>
                WhatsApp
              </a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.65rem", letterSpacing: 4, textTransform: "uppercase", color: "#c9a96e", marginBottom: "1rem" }}>Client Reviews</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 900, letterSpacing: -2, marginBottom: "3rem", lineHeight: 1.1 }}>What Our Clients Say</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{ padding: "1.8rem", background: "#0d0a0d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2 }}>
                  <div style={{ display: "flex", gap: "0.3rem", marginBottom: "1rem" }}>
                    {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#c9a96e", fontSize: "0.8rem" }}>★</span>)}
                  </div>
                  <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontStyle: "italic", marginBottom: "1.2rem" }}>&ldquo;{t.text}&rdquo;</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 700 }}>{t.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)" }}>{t.location}</div>
                    </div>
                    <span style={{ fontSize: "0.65rem", color: "#c9a96e", border: "1px solid rgba(201,169,110,0.3)", padding: "0.2rem 0.6rem", borderRadius: 2, letterSpacing: 1 }}>{t.pkg}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" style={{ maxWidth: 760, margin: "0 auto", padding: "7rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: 4, textTransform: "uppercase", color: "#c9a96e", marginBottom: "1rem" }}>Questions</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: -2 }}>Frequently Asked</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", cursor: "pointer" }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 0", gap: "1rem" }}>
                <span style={{ fontWeight: 600, fontSize: "0.95rem", color: openFaq === i ? "#fff" : "rgba(255,255,255,0.75)" }}>{f.q}</span>
                <span style={{ color: "#c9a96e", fontSize: "1.2rem", flexShrink: 0, fontWeight: 300 }}>{openFaq === i ? "−" : "+"}</span>
              </div>
              {openFaq === i && <div style={{ paddingBottom: "1.5rem", fontSize: "0.88rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.9 }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{ position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ position: "absolute", inset: 0, background: "url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=80') center/cover no-repeat", opacity: 0.08 }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(214,51,132,0.15) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "8rem 1.5rem" }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: 4, textTransform: "uppercase", color: "#c9a96e", marginBottom: "1.5rem" }}>Available 7 Days a Week</div>
          <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900, letterSpacing: -3, lineHeight: 1, marginBottom: "1.5rem" }}>
            Ready To<br />
            <span style={{ background: "linear-gradient(90deg, #c9a96e, #d63384)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Surrender?</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: 480, margin: "0 auto 3rem", lineHeight: 1.9 }}>
            Sessions available nationwide. Diamond card holders receive one complimentary session. Book today — availability is limited.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#book" style={{ padding: "1.1rem 3rem", borderRadius: 4, background: "linear-gradient(135deg, #d63384, #7c3aed)", color: "white", textDecoration: "none", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 2, textTransform: "uppercase" }}>Book Now</a>
            <Link href="/#cards" style={{ padding: "1.1rem 3rem", borderRadius: 4, border: "1px solid rgba(201,169,110,0.4)", color: "#c9a96e", textDecoration: "none", fontWeight: 600, fontSize: "0.88rem", letterSpacing: 1 }}>Get Diamond Card</Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#060406", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "2rem 1.5rem", textAlign: "center" }}>
        <Link href="/" style={{ color: "#f5a9b8", textDecoration: "none", fontWeight: 900, fontSize: "0.9rem", letterSpacing: 3 }}>SFI 💕</Link>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.72rem", marginTop: "0.8rem" }}>© 2026 Sissy Fantasy Island. All sessions are private and confidential.</p>
      </div>

    </div>
  );
}
