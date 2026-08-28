"use client";
import { useState } from "react";
import Link from "next/link";

const PACKAGES = [
  {
    name: "The Tease",
    emoji: "🌸",
    duration: "2 Hours",
    price: 500,
    color: "#f5a9b8",
    popular: false,
    includes: [
      "Full dungeon setup at your location",
      "Restraint system (cuffs, rope, spreader bar)",
      "Blindfold & sensory kit",
      "Paddle, crop & flogger selection",
      "Discreet unmarked vehicle",
      "Setup & teardown included",
      "1 Mistress/Dom attendant",
    ],
  },
  {
    name: "The Session",
    emoji: "🔗",
    duration: "4 Hours",
    price: 900,
    color: "#d63384",
    popular: true,
    includes: [
      "Everything in The Tease",
      "St. Andrew's Cross",
      "Bondage bench",
      "Chastity & denial play equipment",
      "Strap-on & pegging kit",
      "Sissy transformation station (makeup, wigs, outfits)",
      "2 attendants available",
      "Refreshments included",
    ],
  },
  {
    name: "The Takeover",
    emoji: "👑",
    duration: "Full Day (8 Hours)",
    price: 1500,
    color: "#6f42c1",
    popular: false,
    includes: [
      "Everything in The Session",
      "Full dungeon furniture suite",
      "Suspension rig (where permitted)",
      "Medical play kit",
      "Electro-stimulation devices",
      "Full sissy makeover service",
      "Private photographer (optional)",
      "Dedicated concierge",
      "Overnight extension available",
    ],
  },
];

const EQUIPMENT = [
  { emoji: "⛓️", name: "Restraints", desc: "Leather cuffs, rope, spreader bars, hog-tie kits" },
  { emoji: "🪑", name: "Furniture", desc: "Bondage bench, St. Andrew's Cross, spanking horse" },
  { emoji: "🎭", name: "Sensory", desc: "Blindfolds, hoods, gags, sensory deprivation gear" },
  { emoji: "🏹", name: "Impact Play", desc: "Paddles, crops, floggers, canes, whips" },
  { emoji: "🔒", name: "Chastity", desc: "Cages, locks, denial devices for all levels" },
  { emoji: "💄", name: "Sissy Station", desc: "Wigs, makeup, outfits, heels, corsets, accessories" },
  { emoji: "⚡", name: "Electro Play", desc: "TENS units, violet wands (Takeover package)" },
  { emoji: "🩺", name: "Medical Kit", desc: "Speculums, gloves, clinical roleplay gear (Takeover)" },
];

const HOW_IT_WORKS = [
  { step: "1", icon: "📞", title: "Book a Session", desc: "Contact us via email, phone, or WhatsApp. We'll confirm your date, location, and package." },
  { step: "2", icon: "📋", title: "Pre-Session Consult", desc: "We discuss your limits, desires, and any special requests. Everything stays 100% confidential." },
  { step: "3", icon: "🚚", title: "We Come To You", desc: "Our team arrives in an unmarked vehicle and sets up the full dungeon at your location in under 1 hour." },
  { step: "4", icon: "🔥", title: "Your Session", desc: "Enjoy your experience. Our professional attendants ensure safety, consent, and satisfaction throughout." },
  { step: "5", icon: "📦", title: "Discreet Teardown", desc: "We pack everything up and leave. No trace, no evidence, total discretion guaranteed." },
];

const FAQS = [
  { q: "Where do you set up?", a: "We come to your hotel room, private residence, Airbnb, or any private space. We've set up in penthouses, suburban homes, and everything in between. As long as it's private, we're there." },
  { q: "How discreet is the service?", a: "Completely. Our vehicle has no branding. Our team arrives in plain clothes. We carry equipment in unmarked cases. Billing appears as a generic services company. We sign NDAs on request." },
  { q: "What cities do you cover?", a: "We're based in Las Vegas and cover the greater Nevada area. We also travel nationwide for The Takeover package. Contact us to check availability in your city." },
  { q: "Do I need experience?", a: "Not at all. We cater to complete beginners through experienced players. During your pre-session consult we'll tailor everything to your experience level and comfort." },
  { q: "What are your safety protocols?", a: "All sessions use a safe word system. Our attendants are trained in first aid and BDSM safety. Equipment is sanitized between every session. We never push past agreed limits." },
  { q: "Can I request specific attendants?", a: "Yes. We have male, female, and non-binary Doms/Mistresses available. Specify your preference when booking and we'll do our best to accommodate." },
  { q: "How do I pay?", a: "We accept Bitcoin, cash, and bank transfer. A 50% deposit is required to confirm your booking. The balance is due on the day of the session." },
  { q: "Can I add extras on the day?", a: "Yes. Additional time, extra attendants, and add-on services can be arranged on the day subject to availability. Prices vary." },
];

function BookingForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", location: "", pkg: "The Session", date: "", notes: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: "Dungeon Booking Request", to: "sissyfantasyisland70@gmail.com" }),
      });
    } catch {}
    setSending(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div style={{ textAlign: "center", padding: "3rem 2rem", background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 16 }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
        <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>Booking Request Received</h3>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>We'll contact you within 2 hours to confirm your session. Check your email or phone.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <input className="form-input" placeholder="Your name / sissy name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="form-input" type="email" placeholder="Email address" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <input className="form-input" placeholder="Phone / WhatsApp" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <input className="form-input" placeholder="City / Location" required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <select className="form-input form-select" value={form.pkg} onChange={e => setForm({ ...form, pkg: e.target.value })}>
          <option value="The Tease">🌸 The Tease — $500 (2hrs)</option>
          <option value="The Session">🔗 The Session — $900 (4hrs)</option>
          <option value="The Takeover">👑 The Takeover — $1,500 (Full Day)</option>
        </select>
        <input className="form-input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
      </div>
      <textarea className="form-input" placeholder="Special requests, limits, experience level, or anything else we should know..." rows={4} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ resize: "vertical" }} />
      <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>
        🔒 All information is strictly confidential. We sign NDAs on request. Your privacy is our priority.
      </p>
      <button type="submit" className="buy-btn donate-btn" disabled={sending}>
        {sending ? "Sending..." : "Request Booking →"}
      </button>
    </form>
  );
}

export default function DungeonPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#060608", color: "#f0f0f0" }}>

      {/* Nav */}
      <nav className="nav" style={{ padding: "0.9rem 1.5rem" }}>
        <Link href="/" style={{ color: "#f5a9b8", textDecoration: "none", fontWeight: 900, fontSize: "1rem", letterSpacing: 2 }}>SFI 💕</Link>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link href="/#cards" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.82rem" }}>Cards</Link>
          <Link href="/events" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.82rem" }}>Events</Link>
          <Link href="/shop" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.82rem" }}>Shop</Link>
          <a href="#book" style={{ background: "linear-gradient(135deg, #d63384, #7c3aed)", padding: "0.5rem 1.2rem", borderRadius: 6, color: "white", textDecoration: "none", fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>Book Now</a>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "6rem 1.5rem 4rem", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(214,51,132,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, padding: "0.3rem 1rem", borderRadius: 50, background: "rgba(214,51,132,0.12)", border: "1px solid rgba(214,51,132,0.25)", color: "#f5a9b8", marginBottom: "1.5rem" }}>
          Mobile BDSM Dungeon Service
        </div>
        <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.05, marginBottom: "1.5rem" }}>
          We Bring The{" "}
          <span style={{ background: "linear-gradient(90deg, #f5a9b8, #d63384, #6f42c1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Dungeon
          </span>
          <br />To You
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: 560, margin: "0 auto 2.5rem", lineHeight: 1.8, fontSize: "1rem" }}>
          A fully equipped, professional BDSM dungeon delivered and set up at your hotel, home, or private venue. Discreet. Safe. Unforgettable.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
          <a href="#book" style={{ display: "inline-block", padding: "1rem 2.5rem", borderRadius: 8, background: "linear-gradient(135deg, #d63384, #7c3aed)", color: "white", textDecoration: "none", fontWeight: 700, fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Book Your Session</a>
          <a href="#packages" style={{ display: "inline-block", padding: "1rem 2.5rem", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: 600, fontSize: "0.95rem" }}>View Packages</a>
        </div>
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
          {[["🚚", "We Come To You"], ["🔒", "100% Discreet"], ["⚡", "Setup In 1 Hour"], ["🌍", "Nationwide"]].map(([icon, label]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
              <span>{icon}</span><span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem 6rem" }}>

        {/* How It Works */}
        <section style={{ padding: "5rem 0 3rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: -1, marginBottom: "0.5rem" }}>How It Works</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem" }}>Five simple steps from booking to session.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
            {HOW_IT_WORKS.map((s) => (
              <div key={s.step} style={{ textAlign: "center", padding: "2rem 1.2rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #d63384, #6f42c1)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem", marginBottom: "1rem" }}>{s.step}</div>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.6rem" }}>{s.icon}</div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.4rem" }}>{s.title}</h3>
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Packages */}
        <section id="packages" style={{ padding: "3rem 0" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: -1, marginBottom: "0.5rem" }}>Session Packages</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem" }}>Choose your experience. All packages include full setup and teardown.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", alignItems: "start" }}>
            {PACKAGES.map((pkg) => (
              <div key={pkg.name} style={{ background: "#0d0d12", border: `1px solid ${pkg.popular ? pkg.color + "55" : "rgba(255,255,255,0.07)"}`, borderTop: `4px solid ${pkg.color}`, borderRadius: 16, padding: "2.5rem 2rem", position: "relative" }}>
                {pkg.popular && (
                  <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "linear-gradient(135deg, #d63384, #7c3aed)", color: "white", padding: "0.25rem 0.8rem", borderRadius: 4, fontSize: "0.65rem", fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase" }}>Most Popular</div>
                )}
                <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{pkg.emoji}</div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.3rem" }}>{pkg.name}</h3>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: 1 }}>{pkg.duration}</div>
                <div style={{ fontSize: "3rem", fontWeight: 900, color: pkg.color, letterSpacing: -2, lineHeight: 1, marginBottom: "1.5rem" }}>${pkg.price.toLocaleString()}</div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  {pkg.includes.map((item) => (
                    <li key={item} style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", display: "flex", alignItems: "flex-start", gap: "0.6rem", lineHeight: 1.5 }}>
                      <span style={{ color: pkg.color, fontWeight: 800, flexShrink: 0, fontSize: "0.8rem", marginTop: 1 }}>✓</span>{item}
                    </li>
                  ))}
                </ul>
                <a href="#book" style={{ display: "block", textAlign: "center", padding: "0.95rem", borderRadius: 8, background: `linear-gradient(135deg, ${pkg.color}, #6f42c1)`, color: "white", textDecoration: "none", fontWeight: 700, fontSize: "0.88rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Book {pkg.name} — ${pkg.price.toLocaleString()}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Equipment */}
        <section style={{ padding: "3rem 0" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: -1, marginBottom: "0.5rem" }}>What We Bring</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem" }}>Professional-grade equipment, sanitized between every session.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            {EQUIPMENT.map((item) => (
              <div key={item.name} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.2rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(214,51,132,0.25)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
              >
                <span style={{ fontSize: "1.6rem", flexShrink: 0 }}>{item.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.92rem", marginBottom: "0.2rem" }}>{item.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Bar */}
        <section style={{ padding: "2rem 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }}>
            {[
              { icon: "🔒", title: "NDA Available", desc: "We sign non-disclosure agreements on request" },
              { icon: "🚑", title: "Safety First", desc: "First-aid trained staff, safe word protocols always" },
              { icon: "🧼", title: "Sanitized Gear", desc: "All equipment professionally cleaned between sessions" },
              { icon: "📵", title: "No Photos Policy", desc: "We never photograph or record without explicit consent" },
            ].map((t) => (
              <div key={t.title} style={{ padding: "2rem 1.5rem", background: "#0d0d12", textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.6rem" }}>{t.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "0.92rem", marginBottom: "0.3rem" }}>{t.title}</div>
                <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Form */}
        <section id="book" style={{ padding: "4rem 0" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: -1, marginBottom: "0.5rem" }}>Book Your Session</h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem" }}>Fill out the form and we'll confirm within 2 hours. All details are strictly confidential.</p>
            </div>
            <div style={{ background: "#0d0d12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "2.5rem" }}>
              <BookingForm />
            </div>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1.5rem", flexWrap: "wrap" }}>
              <a href="mailto:sissyfantasyisland70@gmail.com" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.4rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 50, color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.85rem" }}>
                📧 sissyfantasyisland70@gmail.com
              </a>
              <a href="tel:+14153053689" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.4rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 50, color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.85rem" }}>
                📞 (415) 305-3689
              </a>
              <a href="https://wa.me/14153053689" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.4rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 50, color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.85rem" }}>
                💬 WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "3rem 0" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: -1, marginBottom: "0.5rem" }}>FAQ</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="faq-q">{f.q}<span>{openFaq === i ? "−" : "+"}</span></div>
                {openFaq === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section style={{ padding: "3rem 0" }}>
          <div style={{ textAlign: "center", background: "linear-gradient(135deg, rgba(214,51,132,0.08), rgba(111,66,193,0.08))", border: "1px solid rgba(214,51,132,0.15)", borderRadius: 20, padding: "4rem 2rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚚</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: -1, marginBottom: "0.8rem" }}>Ready To Experience It?</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "0 auto 2rem", lineHeight: 1.7 }}>
              Sessions available 7 days a week. We travel to you anywhere in the US. Diamond card holders get one complimentary session included.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#book" style={{ display: "inline-block", padding: "1rem 2.5rem", borderRadius: 8, background: "linear-gradient(135deg, #d63384, #7c3aed)", color: "white", textDecoration: "none", fontWeight: 700, fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Book Now</a>
              <Link href="/#cards" style={{ display: "inline-block", padding: "1rem 2.5rem", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: 600, fontSize: "0.95rem" }}>Get Diamond Card</Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
