"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ChatWidget from "./components/ChatWidget";
import { QRCodeSVG } from "qrcode.react";

const BTC_WALLET = "bc1q6k7lmj5jruuk0tq28c03pc5ae2jv0wnthdpxpn";

const TICKETS = [
  {
    name: "Sub Entry",
    emoji: "🔗",
    price: 500,
    color: "#5bcefa",
    initialSlots: 20,
    perks: [
      "Entry to the main dungeon floor",
      "Complimentary collar & tag",
      "Access to all play areas",
      "1 welcome drink",
      "Consent & safety workshop included",
    ],
  },
  {
    name: "Dom Pass",
    emoji: "⛓️",
    price: 1000,
    color: "#d63384",
    popular: true,
    initialSlots: 20,
    perks: [
      "Everything in Sub Entry",
      "VIP throne lounge with open bar",
      "Private play rooms access",
      "Exclusive leather swag bag",
      "Priority entry — skip the line",
      "Meet & greet with performers",
    ],
  },
  {
    name: "Dungeon Master",
    emoji: "👑",
    price: 1500,
    color: "#6f42c1",
    initialSlots: 20,
    perks: [
      "Everything in Dom Pass",
      "Private backstage dungeon access",
      "Champagne & bottle service all night",
      "Professional kink-themed photo shoot",
      "Exclusive after-party (50 people only)",
      "Custom engraved leather cuff",
      "Limo pickup within city limits",
    ],
  },
  {
    name: "Masked Session",
    emoji: "🎭",
    price: 750,
    color: "#1a1a2e",
    masked: true,
    initialSlots: 15,
    perks: [
      "Complimentary venetian mask at entry",
      "Access to the masked-only dungeon wing",
      "No names, no IDs on the floor — full anonymity",
      "Separate discreet entrance & exit",
      "Private masked play rooms",
      "Dedicated masked lounge with open bar",
      "All staff in masks — total discretion guaranteed",
    ],
  },
];

const LINEUP = [
  { name: "Mistress Voltage", role: "Headliner — Domme Performance", time: "11:00 PM" },
  { name: "The Velvet Collective", role: "Rope & Aerial Show", time: "8:30 PM" },
  { name: "Mx. Prism", role: "Host & Dungeon Emcee", time: "All Night" },
];

const TESTIMONIALS = [
  { name: "Alexa V.", text: "Best night of my life. The energy, the people, the music — absolutely unmatched. Already bought my ticket for next year.", role: "Sub" },
  { name: "Domme Kira", text: "Impeccable consent culture. I felt safe, powerful, and free. The VIP throne lounge was *chef's kiss*.", role: "Dom" },
  { name: "Jordan M.", text: "I came alone and left with a whole community. The dungeon monitors were amazing and the vibe was electric.", role: "Switch" },
  { name: "Mx. Raven", text: "The rope show literally made me cry. So beautiful. And the after-party? Legendary. 10/10 will return.", role: "Sub" },
];

const VENUE_AREAS = [
  { name: "Main Dungeon Floor", icon: "⛓️", desc: "Central dance floor with DJ booth, lighting rigs, and open play stations" },
  { name: "VIP Throne Lounge", icon: "👑", desc: "Elevated lounge with bottle service, plush seating, and private bar" },
  { name: "Play Rooms", icon: "🔐", desc: "6 private rooms equipped with crosses, benches, and suspension points" },
  { name: "Rope & Aerial Stage", icon: "🪢", desc: "Dedicated performance stage for shibari and aerial acts" },
  { name: "Chill Zone", icon: "💜", desc: "Quiet space with couches, water, snacks, and support staff" },
  { name: "Photo Booth", icon: "📸", desc: "Neon-lit kink photo booth with props and a glitter station" },
  { name: "Masked Wing", icon: "🎭", desc: "Separate anonymous dungeon wing with its own entrance, play rooms, and lounge" },
];

const FAQS = [
  { q: "Where is the event?", a: "San Francisco, CA. The exact venue address is private and only shared with confirmed ticket holders 24 hours after payment is verified. This is for the safety and privacy of all attendees." },
  { q: "Is this event 21+?", a: "Yes. Valid government ID required at the door. No exceptions." },
  { q: "What's the dress code?", a: "Leather, latex, harnesses, lingerie, or creative kink wear encouraged. No streetwear on the dungeon floor." },
  { q: "Is the venue accessible?", a: "Fully wheelchair accessible with gender-neutral restrooms and private changing areas." },
  { q: "How is consent handled?", a: "Strict consent culture enforced. All attendees must attend a brief consent orientation at entry. Trained dungeon monitors on every floor." },
  { q: "Will there be safe spaces?", a: "Yes — a dedicated chill-out lounge with support staff, water, and snacks available all night." },
  { q: "Can I come alone?", a: "Absolutely. Many attendees come solo. Our community is welcoming and our staff will make sure you feel comfortable." },
  { q: "How anonymous is the Masked Session?", a: "Completely. Separate entrance, no name tags, no IDs checked on the floor. All masked wing staff wear masks too. We don't track who enters the masked wing — your privacy is absolute." },
];

/* Age Gate */
function AgeGate({ onConfirm }) {
  return (
    <div className="age-gate-overlay">
      <div className="age-gate-box">
        <div className="age-gate-emoji">🔞</div>
        <h2>Are you 21 or older?</h2>
        <p>This event contains adult content. You must be 21+ to enter this site and attend the event.</p>
        <div className="age-gate-buttons">
          <button className="age-btn age-btn-yes" onClick={() => onConfirm(true)}>Yes, I'm 21+</button>
          <button className="age-btn age-btn-no" onClick={() => onConfirm(false)}>No, take me back</button>
        </div>
      </div>
    </div>
  );
}

/* Countdown */
function Countdown() {
  const target = new Date("2026-04-18T19:00:00");
  const [diff, setDiff] = useState(null);

  useEffect(() => {
    function calc() {
      const now = new Date();
      const ms = target - now;
      if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(ms / 86400000),
        hours: Math.floor((ms % 86400000) / 3600000),
        minutes: Math.floor((ms % 3600000) / 60000),
        seconds: Math.floor((ms % 60000) / 1000),
      };
    }
    setDiff(calc());
    const id = setInterval(() => setDiff(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!diff) return null;

  return (
    <div className="countdown">
      {Object.entries(diff).map(([label, val]) => (
        <div key={label} className="countdown-item">
          <span className="countdown-num">{String(val).padStart(2, "0")}</span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

/* BTC Confirmation Form */
function BtcConfirmForm() {
  const [form, setForm] = useState({ email: "", tier: "Sub Entry", txid: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="btc-confirm-card">
        <div className="email-success">✅ Payment confirmation received! We'll verify your transaction and send your ticket/link within 1 hour.</div>
      </div>
    );
  }

  return (
    <form className="btc-confirm-card" onSubmit={handleSubmit}>
      <h3>Confirm Your BTC Payment</h3>
      <input
        type="email"
        placeholder="Your email"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="form-input"
      />
      <select
        value={form.tier}
        onChange={(e) => setForm({ ...form, tier: e.target.value })}
        className="form-input form-select"
      >
        <option value="Sub Entry">🔗 Sub Entry — $500</option>
        <option value="Dom Pass">⛓️ Dom Pass — $1,000</option>
        <option value="Dungeon Master">👑 Dungeon Master — $1,500</option>
        <option value="Masked Session">🎭 Masked Session — $750</option>
        <option value="Gift Card">🎁 Gift Card — $500</option>
        <option value="Livestream">🎥 Livestream Donation</option>
      </select>
      <input
        type="text"
        placeholder="BTC Transaction ID (optional)"
        value={form.txid}
        onChange={(e) => setForm({ ...form, txid: e.target.value })}
        className="form-input"
      />
      <button type="submit" className="buy-btn donate-btn">Confirm BTC Payment</button>
      <p className="donate-note">We’ll verify on-chain and send your ticket within 1 hour</p>
    </form>
  );
}

/* Donate Form */
function DonateForm() {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const presets = [25, 50, 100, 250, 500];

  async function handleDonate(e) {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val < 5) return alert("Minimum donation is $5");
    setLoading(true);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: val, email }),
      });
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form className="donate-form" onSubmit={handleDonate}>
      <div className="donate-presets">
        {presets.map((p) => (
          <button
            key={p}
            type="button"
            className={`donate-preset ${parseFloat(amount) === p ? "donate-preset-active" : ""}`}
            onClick={() => setAmount(String(p))}
          >
            ${p}
          </button>
        ))}
      </div>
      <div className="donate-custom">
        <span className="donate-dollar">$</span>
        <input
          type="number"
          min="5"
          step="1"
          placeholder="Custom amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="donate-amount-input"
          required
        />
      </div>
      <input
        type="email"
        placeholder="Your email (for livestream link)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-input"
        required
      />
      <button type="submit" className="buy-btn donate-btn" disabled={loading}>
        {loading ? "Redirecting..." : `Donate${amount ? ` $${amount}` : ""} & Get Livestream`}
      </button>
      <p className="donate-note">Minimum $5 · Secure payment via Stripe · Livestream link sent to your email</p>
    </form>
  );
}

/* Animated Slot Counter */
function SlotCounter({ initial }) {
  const [slots, setSlots] = useState(initial);

  useEffect(() => {
    const id = setInterval(() => {
      setSlots((s) => {
        if (s <= 3) return s;
        if (Math.random() < 0.3) return s - 1;
        return s;
      });
    }, 4000 + Math.random() * 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`slots ${slots <= 5 ? "slots-critical" : ""}`}>
      🔥 {slots <= 5 ? "ALMOST GONE — " : ""}Only {slots} slots left
    </div>
  );
}

export default function Home() {
  const [verified, setVerified] = useState(false);
  const [denied, setDenied] = useState(false);
  const [loading, setLoading] = useState(null);
  const [quantities, setQuantities] = useState({ "Sub Entry": 1, "Dom Pass": 1, "Dungeon Master": 1, "Masked Session": 1 });
  const [payModal, setPayModal] = useState(null); // { tier, qty, price, mode: 'buy'|'donate' }
  const [payMethod, setPayMethod] = useState(null); // 'card'|'btc'|'gift'
  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const ticketsRef = useRef(null);

  useEffect(() => {
    const v = sessionStorage.getItem("age_verified");
    if (v === "true") setVerified(true);
  }, []);

  function handleAgeConfirm(isOldEnough) {
    if (isOldEnough) {
      setVerified(true);
      sessionStorage.setItem("age_verified", "true");
    } else {
      setDenied(true);
    }
  }

  function updateQty(tier, delta) {
    setQuantities((q) => ({
      ...q,
      [tier]: Math.max(1, Math.min(10, q[tier] + delta)),
    }));
  }

  function openPayModal(tier) {
    const t = TICKETS.find((x) => x.name === tier);
    setPayModal({ tier, qty: quantities[tier], price: t.price, mode: "buy" });
    setPayMethod(null);
  }

  function openDonateModal() {
    setPayModal({ mode: "donate" });
    setPayMethod(null);
  }


  const [giftCode, setGiftCode] = useState("");
  const [giftImage, setGiftImage] = useState(null);
  const [giftSubmitted, setGiftSubmitted] = useState(false);

  function handleGiftSubmit(e) {
    e.preventDefault();
    if (!giftCode && !giftImage) return alert("Please enter a gift card code or upload an image.");
    setGiftSubmitted(true);
  }

  function handleEmail(e) {
    e.preventDefault();
    if (email) setEmailSent(true);
  }

  function scrollToTickets() {
    ticketsRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  if (!verified) {
    if (denied) {
      return (
        <div className="age-gate-overlay">
          <div className="age-gate-box">
            <h2>Sorry, you must be 21+ to access this site.</h2>
            <p style={{ marginTop: "1rem", opacity: 0.6 }}>See you when you're older 💜</p>
          </div>
        </div>
      );
    }
    return <AgeGate onConfirm={handleAgeConfirm} />;
  }

  return (
    <div className="container">
      {/* Hero */}
      <section className="hero">
        <div className="hero-img-wrap">
          <img src="/hero.jpg" alt="Trans Party" className="hero-img" />
        </div>
        <h1>TRANS PARTY</h1>
        <p className="tagline">Subs. Doms. No limits. One unforgettable night.</p>
        <div className="event-details">
          <span>📅 April 18, 2026</span>
          <span>📍 San Francisco, CA — Private Location</span>
          <span>🕖 7 PM — 4 AM</span>
        </div>
        <Countdown />
      </section>

      {/* Masked Session Banner */}
      <section className="section">
        <div className="masked-banner">
          <div className="masked-banner-emoji">🎭</div>
          <h2>Masked Sessions — Total Anonymity</h2>
          <p>Not ready to show your face? We got you. Our masked sessions offer a completely anonymous experience — separate entrance, no names, no IDs on the floor. Every attendee and staff member wears a mask. What happens behind the mask, stays behind the mask.</p>
          <div className="masked-price">$750 <span>per person</span></div>
          <button className="buy-btn masked-buy-btn" onClick={scrollToTickets}>Get Masked Tickets</button>
        </div>
      </section>

      {/* What To Expect */}
      <section className="section">
        <h2>⛓️ What To Expect</h2>
        <div className="expect-grid">
          {[
            ["🖤", "Dungeon Play Areas", "Fully equipped play spaces with St. Andrew's crosses, spanking benches, and suspension rigs"],
            ["🎵", "Dark & Heavy Beats", "Industrial and bass-heavy music across 2 stages all night long"],
            ["🪢", "Live Rope & Aerial", "Breathtaking shibari and aerial performances from world-class riggers"],
            ["👗", "Fetish Fashion", "Leather, latex, harnesses — dress to dominate or submit in style"],
            ["🔥", "Wax & Sensation Play", "Guided wax play stations, sensation wheels, and temperature play with trained facilitators"],
            ["⚡", "Impact & Edge Play", "Flogging demos, paddle stations, and electro-play zones with safety monitors"],
            ["🪞", "Mirror & Worship Rooms", "Intimate mirrored rooms for body worship, foot play, and power exchange scenes"],
            ["🛡️", "Consent First", "Dungeon monitors, consent workshops, and a zero-tolerance policy for boundary violations"],
            ["🍸", "Dark Bar & Lounge", "Craft cocktails, mocktails, and a moody VIP throne lounge for Doms"],
          ].map(([emoji, title, desc]) => (
            <div key={title} className="expect-card">
              <div className="expect-emoji">{emoji}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Venue Map */}
      <section className="section">
        <h2>🗺️ Venue Layout</h2>
        <div className="venue-grid">
          {VENUE_AREAS.map((area) => (
            <div key={area.name} className="venue-card">
              <div className="venue-icon">{area.icon}</div>
              <h3>{area.name}</h3>
              <p>{area.desc}</p>
            </div>
          ))}
        </div>
      </section>



      {/* Testimonials */}
      <section className="section">
        <h2>💬 What People Say</h2>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card">
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <strong>{t.name}</strong>
                <span className="testimonial-role">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tickets */}
      <section className="section" ref={ticketsRef}>
        <h2>🎟️ Get Your Tickets</h2>
        <div className="tickets-grid">
          {TICKETS.map((t) => (
            <div key={t.name} className={`ticket-card ${t.masked ? "ticket-card-masked" : ""}`} style={{ borderTop: `4px solid ${t.color}` }}>
              {t.popular && <div className="popular-badge">🔥 MOST POPULAR</div>}
              {t.masked && <div className="popular-badge" style={{ background: "linear-gradient(135deg, #1a1a2e, #4a4a6a)" }}>🎭 DISCREET</div>}
              {t.giftCard && <div className="popular-badge" style={{ background: "linear-gradient(135deg, #f5a9b8, #d63384)" }}>🎁 GIFT</div>}
              <div className="ticket-emoji">{t.emoji}</div>
              <h3>{t.name}</h3>
              <div className="price" style={{ color: t.color }}>
                ${t.price.toLocaleString()}
              </div>
              <SlotCounter initial={t.initialSlots} />
              <ul className="perks">
                {t.perks.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="qty-selector">
                <button className="qty-btn" onClick={() => updateQty(t.name, -1)}>−</button>
                <span className="qty-num">{quantities[t.name]}</span>
                <button className="qty-btn" onClick={() => updateQty(t.name, 1)}>+</button>
              </div>
              <div className="ticket-total">
                Total: ${(t.price * quantities[t.name]).toLocaleString()}
              </div>
              <button
                className="buy-btn"
                style={{ background: `linear-gradient(135deg, ${t.color}, #6f42c1)` }}
                onClick={() => openPayModal(t.name)}
              >
                {`Buy ${quantities[t.name]} Ticket${quantities[t.name] > 1 ? "s" : ""}`}
              </button>
              <div className="payment-icons">
                <span className="btc-badge">₿ Bitcoin</span><span className="btc-badge" style={{background:"rgba(245,169,184,0.15)",borderColor:"rgba(245,169,184,0.3)",color:"#f5a9b8"}}>🎁 Gift Card</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rules */}
      <section className="section">
        <h2>📜 House Rules</h2>
        <div className="rules-card">
          <div className="rules-grid">
            {[
              ["🤝", "Consent is mandatory", "Ask before touching anyone. \"No\" means no. Violators are removed immediately."],
              ["👗", "Dress code enforced", "Leather, latex, harnesses, lingerie, or creative kink wear. No streetwear on the dungeon floor."],
              ["📵", "No phones in play areas", "Photography only in designated zones. Respect everyone's privacy."],
              ["🚫", "Zero tolerance for hate", "Racism, transphobia, homophobia, or any discrimination = instant removal. No refund."],
              ["🍸", "Drink responsibly", "Free water stations everywhere. Staff will check on you. No means no — even if someone's been drinking."],
              ["🛡️", "Dungeon monitors", "Trained staff on every floor. Use your safeword. If you see something, say something."],
            ].map(([icon, title, desc]) => (
              <div key={title} className="rule-item">
                <span className="rule-icon">{icon}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/rules" className="rules-link">Read full rules & etiquette guide →</Link>
        </div>
      </section>

      {/* Donate + Livestream */}
      <section className="section" id="donate">
        <div className="donate-section">
          <div className="donate-left">
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💜🎥</div>
            <h2>Can't Make It? Donate & Watch Live</h2>
            <p>Support the Trans Party community and get <strong>full livestream access</strong> to the entire event — all performances, backstage moments, and live viewer chat.</p>
            <ul className="donate-perks">
              <li>🎥 HD livestream of all main stage acts</li>
              <li>🎤 Exclusive backstage interviews</li>
              <li>💬 Live chat with other viewers</li>
              <li>🔁 48-hour replay access after the event</li>
              <li>💌 Private link sent to your email</li>
            </ul>
          </div>
          <div className="donate-right">
            <button className="buy-btn donate-btn" onClick={openDonateModal}>Donate & Get Livestream</button>
          </div>
        </div>
      </section>

      {/* Contact & Socials */}
      <section className="section">
        <h2>📬 Get In Touch</h2>
        <div className="social-bar">
          <a href="mailto:comeandsee@gmail.com" className="social-link">
            <span>📧</span> comeandsee@gmail.com
          </a>
          <a href="https://wa.me/19853686907" target="_blank" rel="noopener" className="social-link">
            <span>💬</span> WhatsApp
          </a>
          <a href="https://t.me/tshungkathy10" target="_blank" rel="noopener" className="social-link">
            <span>✈️</span> Telegram
          </a>

        </div>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link href="/contact" className="rules-link">Send us a message →</Link>
        </div>
      </section>

      {/* Email Signup */}
      <section className="section">
        <div className="email-section">
          <h2>📧 Stay In The Loop</h2>
          <p>Get notified about ticket drops, lineup reveals, and exclusive pre-sale access.</p>
          {emailSent ? (
            <div className="email-success">✅ You're on the list! Check your inbox.</div>
          ) : (
            <form className="email-form" onSubmit={handleEmail}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="email-input"
              />
              <button type="submit" className="email-btn">Notify Me</button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <h2>❓ FAQ</h2>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div key={i} className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="faq-q">
                {f.q}
                <span>{openFaq === i ? "−" : "+"}</span>
              </div>
              {openFaq === i && <div className="faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>🏳️⚧️ Trans Party 2025 — Your body, your rules 🏳️⚧️</p>
        <p>Secure payments by Stripe · All sales final · 21+ only</p>
      </footer>

      {/* Sticky Buy Button (mobile) */}
      <div className="sticky-buy" onClick={scrollToTickets}>
        🎟️ Buy Tickets
      </div>

      {/* Payment Modal */}
      {payModal && (
        <div className="age-gate-overlay" onClick={() => setPayModal(null)}>
          <div className="pay-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pay-modal-close" onClick={() => setPayModal(null)}>✕</button>
            <h2>{payModal.mode === "buy" ? `${payModal.tier} × ${payModal.qty}` : "Donate & Watch Live"}</h2>
            {payModal.mode === "buy" && (
              <div className="pay-modal-total">Total: ${(payModal.price * payModal.qty).toLocaleString()}</div>
            )}

            {!payMethod && (
              <div className="pay-options">
                <button className="pay-option" onClick={() => setPayMethod("btc")}>
                  <span>₿</span> Pay with Bitcoin
                </button>
                {payModal.mode === "buy" && (
                  <button className="pay-option" onClick={() => setPayMethod("gift")}>
                    <span>🎁</span> Redeem Gift Card
                  </button>
                )}
              </div>
            )}



            {payMethod === "gift" && (
              <div className="pay-btc-content">
                {giftSubmitted ? (
                  <div className="email-success" style={{ textAlign: "center", padding: "1.5rem 0" }}>
                    ✅ Gift card submitted! We'll verify and send your ticket confirmation within 1 hour.
                  </div>
                ) : (
                  <form onSubmit={handleGiftSubmit} className="gift-form">
                    <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>Redeem Gift Card</h3>
                    <p style={{ opacity: 0.6, textAlign: "center", fontSize: "0.9rem", marginBottom: "1rem" }}>Enter your code or upload a photo of your gift card</p>
                    <input
                      type="text"
                      placeholder="Gift card code"
                      value={giftCode}
                      onChange={(e) => setGiftCode(e.target.value)}
                      className="form-input"
                    />
                    <div className="gift-upload">
                      <label className="gift-upload-label">
                        <span>{giftImage ? `📎 ${giftImage.name}` : "📷 Upload gift card image"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setGiftImage(e.target.files[0] || null)}
                          style={{ display: "none" }}
                        />
                      </label>
                    </div>
                    <button type="submit" className="buy-btn donate-btn">Submit for Verification</button>
                    <p className="donate-note">We'll verify your gift card and confirm within 1 hour</p>
                  </form>
                )}
                <button className="pay-back" onClick={() => { setPayMethod(null); setGiftSubmitted(false); setGiftCode(""); setGiftImage(null); }}>← Back</button>
              </div>
            )}

            {payMethod === "btc" && (
              <div className="pay-btc-content">
                <div className="btc-qr-card">
                  <div className="btc-qr-wrap">
                    <QRCodeSVG value={`bitcoin:${BTC_WALLET}`} size={160} bgColor="#ffffff" fgColor="#0a0a0f" level="H" />
                  </div>
                  <p className="btc-label">Scan to send BTC</p>
                  <div className="btc-address">
                    <code>{BTC_WALLET}</code>
                    <button className="btc-copy" onClick={() => navigator.clipboard.writeText(BTC_WALLET)}>Copy</button>
                  </div>
                </div>
                <BtcConfirmForm />
                <button className="pay-back" onClick={() => setPayMethod(null)}>← Back</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}
