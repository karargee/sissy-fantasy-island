"use client";
import { useState } from "react";
import Link from "next/link";

const PACKAGES = [
  {
    name: "The Tease", tag: "STARTER", duration: "2 Hours", price: 500, accent: "#c9a96e",
    desc: "Your introduction to the dungeon experience. Intimate, intense, and unforgettable.",
    includes: ["Full dungeon setup at your location","Restraint system â€” cuffs, rope, spreader bar","Blindfold & sensory deprivation kit","Paddle, crop & flogger selection","Discreet unmarked vehicle","Setup & teardown included","1 professional Dom/Mistress"],
  },
  {
    name: "The Session", tag: "MOST POPULAR", duration: "4 Hours", price: 900, accent: "#d63384", popular: true,
    desc: "The full experience. Everything you need for a complete, deeply satisfying session.",
    includes: ["Everything in The Tease","St. Andrew's Cross","Bondage bench","Chastity & denial play equipment","Strap-on & pegging kit","Sissy transformation station","2 professional attendants","Refreshments included"],
  },
  {
    name: "The Takeover", tag: "PREMIUM", duration: "Full Day â€” 8 Hours", price: 1500, accent: "#7c3aed",
    desc: "Total immersion. A full day of complete surrender with our most elite setup.",
    includes: ["Everything in The Session","Full dungeon furniture suite","Suspension rig (where permitted)","Medical play kit","Electro-stimulation devices","Full sissy makeover service","Private photographer (optional)","Dedicated personal concierge","Overnight extension available"],
  },
];

const EQUIPMENT = [
  { icon: "â›“", name: "Restraints", desc: "Leather cuffs, rope, spreader bars, hog-tie kits" },
  { icon: "ðŸª‘", name: "Furniture", desc: "Bondage bench, St. Andrew's Cross, spanking horse" },
  { icon: "ðŸŽ­", name: "Sensory", desc: "Blindfolds, hoods, gags, sensory deprivation gear" },
  { icon: "ðŸ¹", name: "Impact Play", desc: "Paddles, crops, floggers, canes, single-tail whips" },
  { icon: "ðŸ”’", name: "Chastity", desc: "Cages, locks, denial devices for all levels" },
  { icon: "ðŸ’„", name: "Sissy Station", desc: "Wigs, makeup, outfits, heels, corsets, accessories" },
  { icon: "âš¡", name: "Electro Play", desc: "TENS units, violet wands â€” Takeover only" },
  { icon: "ðŸ©º", name: "Medical Kit", desc: "Speculums, gloves, clinical roleplay gear â€” Takeover only" },
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
  { name: "Anonymous", location: "New York, NY", pkg: "The Tease", text: "First time trying anything like this. They made me feel completely at ease from the first call. The discretion is real â€” nobody knew a thing." },
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

const IMGS = [
  "/dungeon-1.jpeg",
  "/dungeon-2.jpeg",
  "/dungeon-3.jpg",
  "/dungeon-4.png",
  "/dungeon-5.jpg",
  "/dungeon-6.jpg",
  "/dungeon-7.jpg",
  "/dungeon-8.jpg",
];

function BookingForm({ pkg: initPkg }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", location: "", pkg: initPkg || "The Session", date: "", notes: "" });
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
      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>âœ…</div>
      <div style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Request Received</div>
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", lineHeight: 1.7 }}>We'll contact you within 2 hours to confirm your session.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
        <input className="form-input" placeholder="Your name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="form-input" type="email" placeholder="Email address" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
        <input className="form-input" placeholder="Phone / WhatsApp" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <input className="form-input" placeholder="City / Location" required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
        <select className="form-input form-select" value={form.pkg} onChange={e => setForm({ ...form, pkg: e.target.value })}>
          <option value="The Tease">The Tease â€” $500 (2hrs)</option>
          <option value="The Session">The Session â€” $900 (4hrs)</option>
          <option value="The Takeover">The Takeover â€” $1,500 (Full Day)</option>
        </select>
        <input className="form-input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
      </div>
      <textarea className="form-input" placeholder="Special requests, limits, experience level..." rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ resize: "none" }} />
      <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", lineHeight: 1.6 }}>ðŸ”’ All information is strictly confidential. NDAs available on request.</p>
      <button type="submit" disabled={sending} style={{ padding: "1rem", border: "none", background: "linear-gradient(135deg, #d63384, #7c3aed)", color: "white", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", letterSpacing: 1, textTransform: "uppercase", opacity: sending ? 0.7 : 1, borderRadius: 4 }}>
        {sending ? "Sending..." : "Request Booking"}
      </button>
    </form>
  );
}

export default function DungeonPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedPkg, setSelectedPkg] = useState("The Session");

  const gold = "#c9a96e";
  const label = { fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 4, color: gold, marginBottom: "1rem", display: "block" };

  return (
    <div style={{ minHeight: "100vh", background: "#080608", color: "#f0f0f0" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.1rem 2rem", background: "rgba(8,6,8,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Link href="/" style={{ color: "#f5a9b8", textDecoration: "none", fontWeight: 900, fontSize: "0.9rem", letterSpacing: 3, textTransform: "uppercase" }}>SFI ðŸ’•</Link>
        <div style={{ display: "flex", gap: "1.8rem", alignItems: "center" }}>
          {[["#packages","Packages"],["#equipment","Equipment"],["#faq","FAQ"]].map(([href,label]) => (
            <a key={href} href={href} style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.8rem", letterSpacing: 1, textTransform: "uppercase" }}>{label}</a>
          ))}
          <a href="#book" style={{ padding: "0.55rem 1.4rem", background: "linear-gradient(135deg, #d63384, #7c3aed)", color: "white", textDecoration: "none", fontSize: "0.78rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 4 }}>Book Now</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: 60 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/dungeon-9.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,6,8,0.5) 0%, rgba(8,6,8,0.75) 60%, rgba(8,6,8,1) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 40%, rgba(214,51,132,0.1) 0%, transparent 65%)" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 1.5rem", maxWidth: 860 }}>
          <div style={{ display: "inline-block", fontSize: "0.62rem", fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: gold, borderBottom: `1px solid ${gold}55`, paddingBottom: "0.4rem", marginBottom: "2rem" }}>
            Mobile BDSM Dungeon â€” Las Vegas & Nationwide
          </div>
          <h1 style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", fontWeight: 900, letterSpacing: -3, lineHeight: 0.95, marginBottom: "2rem", color: "#fff" }}>
            THE DUNGEON<br />
            <span style={{ background: `linear-gradient(90deg, ${gold}, #d63384, #7c3aed)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>COMES TO YOU</span>
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.9, maxWidth: 560, margin: "0 auto 3rem", fontWeight: 300 }}>
            A fully equipped, professional BDSM dungeon delivered and set up at your hotel, home, or private venue. Discreet. Safe. Unforgettable.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "4rem" }}>
            <a href="#book" style={{ padding: "1.1rem 3rem", background: "linear-gradient(135deg, #d63384, #7c3aed)", color: "white", textDecoration: "none", fontWeight: 700, fontSize: "0.88rem", textTransform: "uppercase", letterSpacing: 2, borderRadius: 4 }}>Book a Session</a>
            <a href="#packages" style={{ padding: "1.1rem 3rem", border: `1px solid ${gold}55`, color: gold, textDecoration: "none", fontWeight: 600, fontSize: "0.88rem", textTransform: "uppercase", letterSpacing: 1, borderRadius: 4 }}>View Packages</a>
          </div>
          <div style={{ display: "flex", gap: "3rem", justifyContent: "center", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2.5rem" }}>
            {[["100%","Discreet"],["60min","Setup Time"],["7 Days","Available"],["50+","Equipment Pieces"]].map(([v,l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: gold, letterSpacing: -1 }}>{v}</div>
                <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.3)", marginTop: "0.3rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <div style={{ background: "#0d0a0d", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0" }}>
          {["ðŸ”’ NDA Available","ðŸš‘ First-Aid Trained Staff","ðŸ§¼ Sanitized Between Sessions","ðŸ“µ No Photos Without Consent","ðŸšš Unmarked Vehicle"].map((t, i) => (
            <div key={t} style={{ padding: "1.3rem 2rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", borderRight: i < 4 ? "1px solid rgba(255,255,255,0.05)" : "none", whiteSpace: "nowrap" }}>{t}</div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "7rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={label}>The Process</span>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: -2 }}>How It Works</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden" }}>
          {STEPS.map((s, i) => (
            <div key={s.n} style={{ padding: "2.5rem 2rem", background: "#0a080a", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <div style={{ fontSize: "3rem", fontWeight: 900, color: "rgba(201,169,110,0.12)", letterSpacing: -2, lineHeight: 1, marginBottom: "1rem" }}>{s.n}</div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: gold, marginBottom: "0.7rem" }}>{s.title}</h3>
              <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PACKAGES */}
      <div id="packages" style={{ background: "#0a080a", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "7rem 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={label}>Pricing</span>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: -2, marginBottom: "0.8rem" }}>Session Packages</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7, fontSize: "0.9rem" }}>All packages include full setup, teardown, and a pre-session consultation. No hidden fees.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", alignItems: "start" }}>
            {PACKAGES.map(pkg => (
              <div key={pkg.name} style={{ background: pkg.popular ? "linear-gradient(160deg,#1a0d1a,#120812)" : "#0d0a0d", border: `1px solid ${pkg.popular ? "rgba(214,51,132,0.3)" : "rgba(255,255,255,0.07)"}`, borderRadius: 4, overflow: "hidden", position: "relative" }}>
                {pkg.popular && <div style={{ height: 3, background: "linear-gradient(90deg,#d63384,#7c3aed)" }} />}
                <div style={{ padding: "2.5rem 2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                    <div>
                      <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: pkg.accent, border: `1px solid ${pkg.accent}44`, padding: "0.2rem 0.6rem", borderRadius: 2, display: "inline-block", marginBottom: "0.6rem" }}>{pkg.tag}</div>
                      <h3 style={{ fontSize: "1.6rem", fontWeight: 900, letterSpacing: -1 }}>{pkg.name}</h3>
                      <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1, marginTop: "0.2rem" }}>{pkg.duration}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "2.5rem", fontWeight: 900, color: pkg.accent, letterSpacing: -2, lineHeight: 1 }}>${pkg.price.toLocaleString()}</div>
                      <div style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: 1 }}>starting from</div>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontStyle: "italic", marginBottom: "1.5rem" }}>{pkg.desc}</p>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem", marginBottom: "2rem" }}>
                    {pkg.includes.map(item => (
                      <div key={item} style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start", marginBottom: "0.65rem" }}>
                        <div style={{ width: 14, height: 14, borderRadius: "50%", background: `${pkg.accent}22`, border: `1px solid ${pkg.accent}55`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 3 }}>
                          <div style={{ width: 5, height: 5, borderRadius: "50%", background: pkg.accent }} />
                        </div>
                        <span style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#book" onClick={() => setSelectedPkg(pkg.name)} style={{ display: "block", textAlign: "center", padding: "1rem", background: pkg.popular ? "linear-gradient(135deg,#d63384,#7c3aed)" : "transparent", border: pkg.popular ? "none" : `1px solid ${pkg.accent}55`, color: pkg.popular ? "white" : pkg.accent, textDecoration: "none", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: 2, borderRadius: 4 }}>
                    Book This Package
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EQUIPMENT + PHOTOS */}
      <div id="equipment" style={{ maxWidth: 1100, margin: "0 auto", padding: "7rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <span style={label}>The Arsenal</span>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: -2, marginBottom: "1.2rem", lineHeight: 1.1 }}>What We Bring</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.9, marginBottom: "2rem", fontSize: "0.92rem" }}>
              Over 50 pieces of professional-grade equipment, sanitized between every session and transported in unmarked padded cases.
            </p>
            {EQUIPMENT.map((item, i) => (
              <div key={item.name} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1rem 0", borderBottom: i < EQUIPMENT.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <div style={{ width: 38, height: 38, borderRadius: 8, background: "rgba(214,51,132,0.08)", border: "1px solid rgba(214,51,132,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.88rem", marginBottom: "0.15rem" }}>{item.name}</div>
                  <div style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
            {IMGS.map((src, i) => (
              <div key={i} style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "1", background: "#0d0d12", border: "1px solid rgba(255,255,255,0.06)" }}>
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.65, filter: "grayscale(20%) contrast(1.1)" }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOOKING + TESTIMONIALS */}
      <div id="book" style={{ background: "#0a080a", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "7rem 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
          <div>
            <span style={label}>Reserve Your Date</span>
            <h2 style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 900, letterSpacing: -2, marginBottom: "1rem", lineHeight: 1.1 }}>Book Your Session</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "2rem" }}>Fill out the form and we'll confirm within 2 hours. All details are strictly confidential.</p>
            <div style={{ background: "#0d0a0d", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, padding: "2rem" }}>
              <BookingForm pkg={selectedPkg} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem", marginTop: "1.5rem" }}>
              {[
                { href: "mailto:sissyfantasyisland70@gmail.com", icon: "âœ‰", text: "sissyfantasyisland70@gmail.com" },
                { href: "tel:+14153053689", icon: "ðŸ“ž", text: "(415) 305-3689" },
                { href: "https://wa.me/14153053689", icon: "ðŸ’¬", text: "WhatsApp", target: "_blank" },
              ].map(c => (
                <a key={c.text} href={c.href} target={c.target} rel={c.target ? "noopener" : undefined} style={{ display: "flex", alignItems: "center", gap: "0.7rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.82rem" }}>
                  <span style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>{c.icon}</span>
                  {c.text}
                </a>
              ))}
            </div>
          </div>
          <div>
            <span style={label}>Client Experiences</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 900, letterSpacing: -2, marginBottom: "2.5rem", lineHeight: 1.1 }}>What They Say</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{ padding: "1.8rem", background: "#0d0a0d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 4 }}>
                  <div style={{ fontSize: "2rem", color: gold, lineHeight: 1, marginBottom: "0.8rem" }}>"</div>
                  <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, fontStyle: "italic", marginBottom: "1.2rem" }}>{t.text}</p>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{t.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", marginTop: "0.1rem" }}>{t.location}</div>
                    </div>
                    <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: 1.5, color: gold, background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.2)", padding: "0.25rem 0.7rem", borderRadius: 2 }}>{t.pkg}</div>
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
          <span style={label}>Questions</span>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: -2 }}>Frequently Asked</h2>
        </div>
        {FAQS.map((f, i) => (
          <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", cursor: "pointer" }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.4rem 0", gap: "1rem" }}>
              <span style={{ fontWeight: 600, fontSize: "0.92rem", color: openFaq === i ? "#fff" : "rgba(255,255,255,0.7)" }}>{f.q}</span>
              <span style={{ color: gold, fontSize: "1.3rem", flexShrink: 0, fontWeight: 300 }}>{openFaq === i ? "âˆ’" : "+"}</span>
            </div>
            {openFaq === i && <div style={{ paddingBottom: "1.4rem", fontSize: "0.86rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.9 }}>{f.a}</div>}
          </div>
        ))}
      </div>

      {/* BOTTOM CTA */}
      <div style={{ position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/dungeon-10.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1 }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(214,51,132,0.12) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "8rem 1.5rem" }}>
          <span style={{ ...label, display: "block", marginBottom: "1.5rem" }}>Available 7 Days a Week</span>
          <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900, letterSpacing: -3, lineHeight: 1, marginBottom: "1.5rem" }}>
            READY TO<br />
            <span style={{ background: `linear-gradient(90deg, ${gold}, #d63384)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SURRENDER?</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: 480, margin: "0 auto 3rem", lineHeight: 1.9, fontSize: "0.95rem" }}>
            Diamond card holders receive one complimentary session. Sessions available nationwide. Availability is limited.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#book" style={{ padding: "1.1rem 3rem", background: "linear-gradient(135deg,#d63384,#7c3aed)", color: "white", textDecoration: "none", fontWeight: 700, fontSize: "0.88rem", textTransform: "uppercase", letterSpacing: 2, borderRadius: 4 }}>Book Now</a>
            <Link href="/#cards" style={{ padding: "1.1rem 3rem", border: `1px solid ${gold}55`, color: gold, textDecoration: "none", fontWeight: 600, fontSize: "0.88rem", textTransform: "uppercase", letterSpacing: 1, borderRadius: 4 }}>Get Diamond Card</Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#060406", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "2rem 1.5rem", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.72rem" }}>
          Â© 2026 Sissy Fantasy Island Â· <a href="mailto:sissyfantasyisland70@gmail.com" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>sissyfantasyisland70@gmail.com</a> Â· All sessions are private and confidential. 18+ only.
        </p>
      </div>

    </div>
  );
}
