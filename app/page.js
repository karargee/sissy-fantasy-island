"use client";
import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

import Link from "next/link";

const BTC_WALLET = "bc1q6k7lmj5jruuk0tq28c03pc5ae2jv0wnthdpxpn";

const SISSY_CARDS = [
  {
    name: "Standard Sissy Card",
    emoji: "💳",
    price: 300,
    color: "#f5a9b8",
    delivery: "Digital code via email or anonymous code",
    perks: [
      "Official Sissy Fantasy Island membership card",
      "Unique member ID & QR code",
      "Access to private community group",
      "Lifetime validity — never expires",
      "Delivered via email or anonymous download code",
    ],
    why: "Covers identity verification, card generation, secure delivery, and lifetime community access.",
  },
  {
    name: "Gold Sissy Card",
    emoji: "👑",
    price: 500,
    color: "#d63384",
    popular: true,
    delivery: "Digital + optional physical card (discreet shipping)",
    perks: [
      "Everything in Standard",
      "Custom sissy name printed on card",
      "Priority access to all events",
      "VIP community status & badge",
      "Physical holographic card option (discreet plain envelope)",
      "1-on-1 welcome session with community host",
    ],
    why: "Includes custom design, holographic printing, discreet international shipping, and VIP onboarding.",
  },
  {
    name: "Diamond Sissy Card",
    emoji: "💎",
    price: 800,
    color: "#6f42c1",
    delivery: "Digital + physical + exclusive perks",
    perks: [
      "Everything in Gold",
      "Diamond-tier community status",
      "Free entry to all upcoming events",
      "Exclusive Diamond-only group chat",
      "Personal concierge for event bookings",
      "Featured on the community wall (optional)",
      "Lifetime access to all future perks & drops",
    ],
    why: "Premium tier includes lifetime event access, personal concierge service, and all future community benefits at no extra cost.",
  },
];

const COMMUNITY_TIERS = [
  {
    name: "Community Access",
    price: 150,
    emoji: "💬",
    color: "#5bcefa",
    perks: [
      "Join the private trans & sissy community",
      "Group chat access (Telegram/Discord)",
      "Event announcements & early access",
      "Connect with sissies worldwide",
      "Safe, moderated, and discreet space",
    ],
    why: "One-time fee covers verification, moderation, and maintaining a safe private community.",
  },
  {
    name: "Inner Circle",
    price: 350,
    emoji: "🔐",
    color: "#d63384",
    perks: [
      "Everything in Community Access",
      "Inner Circle private group (limited to 50 members)",
      "Direct access to event organizers",
      "First priority for event tickets",
      "Exclusive meetup invitations",
      "Mentorship from experienced community members",
    ],
    why: "Limited spots ensure quality connections. Includes priority booking and direct organizer access.",
  },
];

const UPCOMING_EVENTS = [
  {
    name: "Trans & Sex Party — Las Vegas",
    date: "August 15–16, 2026",
    location: "The Venetian Resort, Las Vegas, NV",
    price: "From $300",
    status: "Tickets Available",
    emoji: "🎉",
  },
  {
    name: "Sissy Brunch & Social — Miami",
    date: "October 2026",
    location: "TBA — Private Venue",
    price: "From $150",
    status: "Coming Soon",
    emoji: "🥂",
  },
  {
    name: "Masked Gala — New York",
    date: "December 2026",
    location: "TBA — Private Venue",
    price: "From $400",
    status: "Coming Soon",
    emoji: "🎭",
  },
];

const EXTERNAL_SHOPS = [
  {
    name: "Lovense",
    emoji: "💜",
    desc: "Remote-controlled toys, vibrators, and interactive devices",
    url: "https://www.lovense.com",
    category: "Toys & Devices",
  },
  {
    name: "Amazon — Sissy Costumes",
    emoji: "👗",
    desc: "Maid outfits, lingerie, wigs, stockings, and accessories",
    url: "https://www.amazon.com/s?k=sissy+costume",
    category: "Costumes & Outfits",
  },
  {
    name: "Amazon — Chastity",
    emoji: "🔒",
    desc: "Cages, locks, and chastity devices for beginners and advanced",
    url: "https://www.amazon.com/s?k=chastity+cage",
    category: "Chastity",
  },
  {
    name: "Amazon — Wigs & Makeup",
    emoji: "💄",
    desc: "Feminine wigs, makeup kits, and beauty essentials",
    url: "https://www.amazon.com/s?k=crossdresser+wig",
    category: "Beauty",
  },
  {
    name: "Amazon — Heels & Boots",
    emoji: "👠",
    desc: "High heels, thigh-high boots, and platform shoes in all sizes",
    url: "https://www.amazon.com/s?k=crossdresser+heels",
    category: "Footwear",
  },
  {
    name: "Amazon — Corsets & Shapewear",
    emoji: "🩱",
    desc: "Waist trainers, corsets, hip pads, and body shaping",
    url: "https://www.amazon.com/s?k=crossdresser+shapewear",
    category: "Shapewear",
  },
];

const FAQS = [
  { q: "What is a Sissy Card?", a: "Your official membership card for Sissy Fantasy Island. It includes your unique member ID, QR code, and grants you access to our private community and events. It's a one-time purchase — no subscriptions, no recurring charges." },
  { q: "How do I receive my card?", a: "You choose: (1) Email delivery — we send your digital card directly to your inbox. (2) Anonymous code — we give you a download code with no email required. You stay completely anonymous. (3) Physical card — shipped in a plain, unmarked envelope." },
  { q: "Is this 100% discreet?", a: "Yes. Billing shows as 'SFI Digital Services'. No explicit descriptions on any bank statements. Anonymous code option requires zero personal info. Physical cards ship in plain packaging with no branding." },
  { q: "Why are the prices what they are?", a: "Each card is individually generated with unique security features. Pricing covers: identity verification, secure card generation, encrypted delivery, lifetime community access, event priority, and ongoing platform maintenance. There are no hidden fees or recurring charges." },
  { q: "Can I attend events without a card?", a: "Yes, events have separate tickets. However, card holders get priority access and discounted rates on all events." },
  { q: "Is the community safe?", a: "Absolutely. All members are verified. We have active moderation, zero tolerance for harassment, and strict privacy rules. What happens in the community stays in the community." },
  { q: "Do you ship internationally?", a: "Yes. Physical cards ship worldwide in discreet, plain packaging. Delivery takes 5-14 business days depending on location." },
  { q: "Can I upgrade my card later?", a: "Yes. You only pay the difference between your current tier and the new one." },
];

const POLICIES = [
  { title: "Privacy Policy", icon: "🔒", desc: "We never share, sell, or expose member data. All communications are encrypted. Anonymous options available for every purchase." },
  { title: "Refund Policy", icon: "💰", desc: "Digital cards are non-refundable once the code is generated. Physical cards can be refunded if returned unopened within 14 days." },
  { title: "Delivery Policy", icon: "📦", desc: "Digital: Instant to 1 hour. Physical: 5-14 business days. All physical items ship in plain, unmarked packaging." },
  { title: "Community Rules", icon: "📜", desc: "Zero tolerance for harassment, doxxing, or sharing member info. Violations result in permanent ban with no refund." },
];

function BtcConfirmForm() {
  const [form, setForm] = useState({ email: "", tier: "Standard Sissy Card", txid: "", delivery: "email" });
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="btc-confirm-card">
        <div className="email-success">✅ Payment received! Your card will be delivered within 1 hour.</div>
      </div>
    );
  }

  return (
    <form className="btc-confirm-card" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <h3>Confirm Your BTC Payment</h3>
      <select value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} className="form-input form-select">
        <option value="Standard Sissy Card">💳 Standard Sissy Card — $300</option>
        <option value="Gold Sissy Card">👑 Gold Sissy Card — $500</option>
        <option value="Diamond Sissy Card">💎 Diamond Sissy Card — $800</option>
        <option value="Community Access">💬 Community Access — $150</option>
        <option value="Inner Circle">🔐 Inner Circle — $350</option>
      </select>
      <select value={form.delivery} onChange={(e) => setForm({ ...form, delivery: e.target.value })} className="form-input form-select">
        <option value="email">📧 Deliver to my email</option>
        <option value="anonymous">🔒 Anonymous code (no email needed)</option>
      </select>
      {form.delivery === "email" && (
        <input type="email" placeholder="Your email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="form-input" />
      )}
      <input type="text" placeholder="BTC Transaction ID (optional)" value={form.txid} onChange={(e) => setForm({ ...form, txid: e.target.value })} className="form-input" />
      <button type="submit" className="buy-btn donate-btn">Confirm Payment</button>
      <p className="donate-note">We'll verify on-chain and deliver within 1 hour</p>
    </form>
  );
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hey! 💕 Welcome to Sissy Fantasy Island. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    const q = input.toLowerCase();
    setInput("");
    setTimeout(() => {
      let reply = "Thanks for your message! For faster support, reach us at comeandsee@gmail.com or WhatsApp (415) 305-3689.";
      if (q.includes("card")) reply = "Our Sissy Cards start at $300 (Standard), $500 (Gold), and $800 (Diamond). All one-time payments with lifetime access. Want me to help you choose?";
      else if (q.includes("ship") || q.includes("deliver")) reply = "Digital cards are delivered within 1 hour. Physical cards ship in 5-14 business days in plain, unmarked packaging.";
      else if (q.includes("anon") || q.includes("discreet") || q.includes("private")) reply = "We offer anonymous codes — no email needed. Billing shows as 'SFI Digital Services'. Total privacy guaranteed.";
      else if (q.includes("event") || q.includes("party")) reply = "Our next event is the Trans & Sex Party in Las Vegas, August 15-16, 2026. Card holders get priority access!";
      else if (q.includes("refund")) reply = "Digital cards are non-refundable once generated. Physical cards can be returned unopened within 14 days.";
      else if (q.includes("community") || q.includes("join")) reply = "Community Access is $150 (one-time). Inner Circle is $350 for the exclusive group. Both include lifetime access.";
      setMessages((m) => [...m, { from: "bot", text: reply }]);
    }, 800);
  }

  return (
    <>
      <button className="chat-toggle" onClick={() => setOpen(!open)}>{open ? "✕" : "💬"}</button>
      {open && (
        <div className="chat-window">
          <div className="chat-header"><span>💬 Support</span></div>
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg chat-msg-${m.from === "bot" ? "bot" : "user"}`}>{m.text}</div>
            ))}
          </div>
          <form className="chat-input-bar" onSubmit={handleSend}>
            <input className="chat-input" placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} />
            <button type="submit" className="chat-send">➤</button>
          </form>
        </div>
      )}
    </>
  );
}

function ShippingTracker() {
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState(null);

  function handleTrack(e) {
    e.preventDefault();
    if (!orderId.trim()) return;
    setResult({
      id: orderId,
      status: "In Transit",
      shipped: "2 days ago",
      eta: "3-5 business days",
      carrier: "Discreet Express",
    });
  }

  return (
    <div className="checker">
      <form className="checker-form" onSubmit={handleTrack}>
        <input type="text" placeholder="Enter order ID (e.g. ORD-XXXXX)" value={orderId} onChange={(e) => setOrderId(e.target.value)} className="form-input" />
        <button type="submit" className="buy-btn donate-btn" style={{ maxWidth: 200 }}>Track</button>
      </form>
      {result && (
        <div className="tracker-result">
          <div className="tracker-header">
            <span>📦</span>
            <strong>{result.status}</strong>
          </div>
          <div className="tracker-details">
            <div><span>Order:</span><strong>{result.id}</strong></div>
            <div><span>Shipped:</span><strong>{result.shipped}</strong></div>
            <div><span>ETA:</span><strong>{result.eta}</strong></div>
            <div><span>Carrier:</span><strong>{result.carrier}</strong></div>
          </div>
          <div className="tracker-bar"><div className="tracker-progress"></div></div>
        </div>
      )}
    </div>
  );
}

function CardChecker() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);

  function handleCheck(e) {
    e.preventDefault();
    if (!code.trim()) return;
    if (code.startsWith("SFI-")) {
      setResult({ valid: true, tier: code.length > 16 ? "Diamond" : code.length > 12 ? "Gold" : "Standard", status: "Active", since: "2025" });
    } else {
      setResult({ valid: false });
    }
  }

  return (
    <div className="checker">
      <form className="checker-form" onSubmit={handleCheck}>
        <input type="text" placeholder="Enter card code (e.g. SFI-XXXX-XXXX)" value={code} onChange={(e) => setCode(e.target.value)} className="form-input" />
        <button type="submit" className="buy-btn donate-btn" style={{ maxWidth: 200 }}>Verify</button>
      </form>
      {result && (
        <div className={`checker-result ${result.valid ? "checker-valid" : "checker-invalid"}`}>
          {result.valid ? (
            <>
              <span>✅</span>
              <div>
                <strong>Card Active</strong>
                <p>Tier: {result.tier} · Status: {result.status} · Member since {result.since}</p>
              </div>
            </>
          ) : (
            <>
              <span>❌</span>
              <div>
                <strong>Card Not Found</strong>
                <p>This code is not in our system. Check for typos or contact support.</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function SissyNameGenerator() {
  const firsts = ["Princess", "Sissy", "Baby", "Mistress", "Dolly", "Candy", "Velvet", "Cherry", "Bambi", "Pixie", "Honey", "Lola", "Coco", "Bella", "Rosie", "Kitty", "Bunny", "Daisy", "Mimi", "Trixie"];
  const lasts = ["Sparkle", "Blush", "Doll", "Kitten", "Lace", "Silk", "Petal", "Blossom", "Glitter", "Cupcake", "Devine", "Valentine", "Luxe", "Charm", "Frost", "Moon", "Star", "Dream", "Rose", "Honey"];
  const [name, setName] = useState("");

  function generate() {
    const f = firsts[Math.floor(Math.random() * firsts.length)];
    const l = lasts[Math.floor(Math.random() * lasts.length)];
    setName(`${f} ${l}`);
  }

  return (
    <div className="name-gen">
      <div className="name-gen-result">{name || "Click generate to find your name"}</div>
      <button className="buy-btn donate-btn" onClick={generate} style={{ maxWidth: 300, margin: "0 auto" }}>Generate My Sissy Name</button>
    </div>
  );
}

export default function Home() {
  const [verified, setVerified] = useState(false);
  const [payModal, setPayModal] = useState(null);
  const [payMethod, setPayMethod] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [giftCode, setGiftCode] = useState("");
  const [giftImage, setGiftImage] = useState(null);
  const [giftSubmitted, setGiftSubmitted] = useState(false);

  function openPayModal(name, price) {
    setPayModal({ tier: name, price });
    setPayMethod(null);
  }

  function handleGiftSubmit(e) {
    e.preventDefault();
    if (!giftCode && !giftImage) return alert("Please enter a gift card code or upload an image.");
    setGiftSubmitted(true);
  }

  useEffect(() => {
    if (sessionStorage.getItem("age_verified") === "true") setVerified(true);
  }, []);

  function handleAgeConfirm(yes) {
    if (yes) { setVerified(true); sessionStorage.setItem("age_verified", "true"); }
  }

  if (!verified) {
    return (
      <div className="age-gate-overlay">
        <div className="age-gate-box">
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔞</div>
          <h2>Are you 18 or older?</h2>
          <p>This site contains adult content. You must be 18+ to enter.</p>
          <div className="age-gate-buttons">
            <button className="age-btn age-btn-yes" onClick={() => handleAgeConfirm(true)}>Yes, I&apos;m 18+</button>
            <button className="age-btn age-btn-no" onClick={() => window.location.href = "https://google.com"}>No</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      {/* Animated Background */}
      <div className="bg-animation">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
      </div>

      <div className="container">
        {/* Hero */}
        <section className="hero">
          <h1>SISSY FANTASY ISLAND</h1>
          <p className="tagline">The official membership platform for the trans & sissy community. Get your card. Join the community. Live your truth.</p>
          <div className="hero-badges">
            <span className="hero-badge">💳 Official Sissy Cards</span>
            <span className="hero-badge">💬 Private Community</span>
            <span className="hero-badge">🎉 Exclusive Events</span>
            <span className="hero-badge">🔒 100% Discreet</span>
          </div>
        </section>

        {/* Live Stats */}
        <section className="section">
          <div className="stats-bar">
            <div className="stat-item"><span className="stat-num">2,847</span><span className="stat-label">Active Members</span></div>
            <div className="stat-item"><span className="stat-num">47</span><span className="stat-label">Countries</span></div>
            <div className="stat-item"><span className="stat-num">3,200+</span><span className="stat-label">Cards Issued</span></div>
            <div className="stat-item"><span className="stat-num">12</span><span className="stat-label">Events Hosted</span></div>
          </div>
        </section>

        {/* Sissy Name Generator */}
        <section className="section">
          <h2>✨ Sissy Name Generator</h2>
          <p className="section-subtitle">Find your perfect sissy name. Click generate until you find the one.</p>
          <SissyNameGenerator />
        </section>

        {/* Sissy Card Preview */}
        <section className="section">
          <h2>💳 The Official Sissy Card</h2>
          <p className="section-subtitle">Your identity. Your community. One card.</p>
          <div className="card-preview">
            <div className="card-mockup">
              <div className="card-mockup-inner">
                <div className="card-logo">SISSY FANTASY ISLAND</div>
                <div className="card-chip">💎</div>
                <div className="card-number">SFI-XXXX-XXXX-XXXX</div>
                <div className="card-details">
                  <div><span>MEMBER</span><strong>Your Sissy Name</strong></div>
                  <div><span>TIER</span><strong>Gold</strong></div>
                  <div><span>VALID</span><strong>Lifetime</strong></div>
                </div>
              </div>
            </div>
            <div className="card-delivery-info">
              <h3>How You Receive Your Card</h3>
              <div className="delivery-options">
                <div className="delivery-option">
                  <span>📧</span>
                  <div>
                    <strong>Email Delivery</strong>
                    <p>Digital card sent directly to your inbox within 1 hour</p>
                  </div>
                </div>
                <div className="delivery-option">
                  <span>🔒</span>
                  <div>
                    <strong>Anonymous Code</strong>
                    <p>Get a download code — no email, no name, total anonymity</p>
                  </div>
                </div>
                <div className="delivery-option">
                  <span>📦</span>
                  <div>
                    <strong>Physical Card (Gold & Diamond)</strong>
                    <p>Holographic card shipped in plain, unmarked envelope</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sissy Card Tiers */}
        <section className="section" id="cards">
          <h2>Choose Your Card</h2>
          <p className="section-subtitle">One-time payment. Lifetime access. No subscriptions.</p>
          <div className="tickets-grid">
            {SISSY_CARDS.map((t) => (
              <div key={t.name} className="ticket-card" style={{ borderTop: `4px solid ${t.color}` }}>
                {t.popular && <div className="popular-badge">🔥 MOST POPULAR</div>}
                <div className="ticket-emoji">{t.emoji}</div>
                <h3>{t.name}</h3>
                <div className="price" style={{ color: t.color }}>
                  ${t.price}<span className="price-period"> one-time</span>
                </div>
                <ul className="perks">
                  {t.perks.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="why-price">
                  <strong>Why this price?</strong>
                  <p>{t.why}</p>
                </div>
                <button
                  className="buy-btn"
                  style={{ background: `linear-gradient(135deg, ${t.color}, #6f42c1)` }}
                  onClick={() => openPayModal(t.name, t.price)}
                >
                  Get Card — ${t.price}
                </button>
                <div className="payment-icons">
                  <span className="btc-badge">₿ Bitcoin</span>
                  <span className="btc-badge" style={{ background: "rgba(245,169,184,0.15)", borderColor: "rgba(245,169,184,0.3)", color: "#f5a9b8" }}>🎁 Gift Card</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community */}
        <section className="section">
          <h2>💬 Join The Community</h2>
          <p className="section-subtitle">Connect with trans women, sissies, and admirers in a safe, private space.</p>
          <div className="community-grid">
            {COMMUNITY_TIERS.map((t) => (
              <div key={t.name} className="community-card" style={{ borderTop: `4px solid ${t.color}` }}>
                <div className="ticket-emoji">{t.emoji}</div>
                <h3>{t.name}</h3>
                <div className="price" style={{ color: t.color }}>
                  ${t.price}<span className="price-period"> one-time</span>
                </div>
                <ul className="perks">
                  {t.perks.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="why-price">
                  <strong>Why this price?</strong>
                  <p>{t.why}</p>
                </div>
                <button
                  className="buy-btn"
                  style={{ background: `linear-gradient(135deg, ${t.color}, #6f42c1)` }}
                  onClick={() => openPayModal(t.name, t.price)}
                >
                  Join — ${t.price}
                </button>
                <div className="payment-icons">
                  <span className="btc-badge">₿ Bitcoin</span>
                  <span className="btc-badge" style={{ background: "rgba(245,169,184,0.15)", borderColor: "rgba(245,169,184,0.3)", color: "#f5a9b8" }}>🎁 Gift Card</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="section">
          <h2>🎉 Upcoming Events</h2>
          <p className="section-subtitle">Exclusive parties and meetups for our community. Card holders get priority access.</p>
          <div className="events-grid">
            {UPCOMING_EVENTS.map((ev) => (
              <div key={ev.name} className="event-card">
                <div className="event-emoji">{ev.emoji}</div>
                <h3>{ev.name}</h3>
                <div className="event-details-list">
                  <span>📅 {ev.date}</span>
                  <span>📍 {ev.location}</span>
                  <span>💰 {ev.price}</span>
                </div>
                <div className={`event-status ${ev.status === "Tickets Available" ? "event-status-live" : ""}`}>
                  {ev.status}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shop — External Links */}
        <section className="section">
          <h2>🛍️ Shop Costumes & Toys</h2>
          <p className="section-subtitle">We've curated the best products from trusted retailers. Click to shop directly.</p>
          <div className="shop-grid">
            {EXTERNAL_SHOPS.map((item) => (
              <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className="shop-card-link">
                <div className="shop-card">
                  <div className="shop-emoji">{item.emoji}</div>
                  <div className="shop-category">{item.category}</div>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  <div className="shop-cta">Shop Now →</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Blog / Guides */}
        <section className="section">
          <h2>📚 Guides & Tips</h2>
          <p className="section-subtitle">Resources to help you on your journey.</p>
          <div className="blog-grid">
            {[
              { title: "Beginner's Guide to Being a Sissy", emoji: "🎀", desc: "Everything you need to know to start your sissy journey — mindset, wardrobe, and confidence.", tag: "Beginner" },
              { title: "How to Build a Feminine Wardrobe", emoji: "👗", desc: "From lingerie to everyday femme outfits — a complete shopping guide for sissies.", tag: "Fashion" },
              { title: "Staying Discreet: Privacy Tips", emoji: "🔒", desc: "How to explore your sissy side while keeping your privacy intact. Tools, tips, and strategies.", tag: "Privacy" },
              { title: "Feminization Training 101", emoji: "💄", desc: "Voice training, posture, walking in heels, and daily exercises to embrace your feminine self.", tag: "Training" },
              { title: "Finding Your Sissy Community", emoji: "💬", desc: "How to connect with like-minded people safely — online and in person.", tag: "Community" },
              { title: "Event Etiquette: What to Expect", emoji: "🎉", desc: "First time at a sissy event? Here's everything you need to know about dress code, consent, and having fun.", tag: "Events" },
            ].map((post, i) => (
              <div key={i} className="blog-card">
                <div className="blog-emoji">{post.emoji}</div>
                <div className="blog-tag">{post.tag}</div>
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
                <span className="blog-cta">Read More →</span>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="section">
          <h2>💬 Member Reviews</h2>
          <p className="section-subtitle">Real feedback from verified members.</p>
          <div className="testimonials-grid">
            {[
              { name: "Sissy Bella", tier: "Gold", text: "The card arrived in a plain envelope, totally discreet. The community is amazing — I finally found my people." },
              { name: "Anonymous", tier: "Standard", text: "Used the anonymous code option. No email, no trace. Exactly what I needed. The community chat is active 24/7." },
              { name: "Princess Jade", tier: "Diamond", text: "The concierge service is real. They booked my event tickets and even helped me find outfits. Worth every penny." },
              { name: "Sissy Mika", tier: "Gold", text: "I was nervous at first but the verification process made me feel safe. Everyone in the group is respectful and supportive." },
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <strong>{t.name}</strong>
                  <span className="testimonial-role">{t.tier} Member</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Policies */}
        <section className="section">
          <h2>📋 Our Policies</h2>
          <div className="policies-grid">
            {POLICIES.map((p) => (
              <div key={p.title} className="policy-card">
                <span className="policy-icon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Shipping Tracker */}
        <section className="section">
          <h2>📦 Track Your Order</h2>
          <p className="section-subtitle">Enter your order ID to check shipping status.</p>
          <ShippingTracker />
        </section>

        {/* Referral Program */}
        <section className="section">
          <div className="referral-banner">
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎁</div>
            <h2>Refer a Sissy, Get $50 Off</h2>
            <p>Share your referral code with a friend. When they purchase any card, you both get $50 off your next purchase.</p>
            <div className="referral-steps">
              <div className="referral-step"><span>1</span><p>Share your unique referral code</p></div>
              <div className="referral-step"><span>2</span><p>Your friend buys any Sissy Card</p></div>
              <div className="referral-step"><span>3</span><p>You both get $50 off</p></div>
            </div>
            <p className="referral-note">Get your referral code after purchasing any card. Contact us to claim your discount.</p>
          </div>
        </section>

        {/* Card Status Checker */}
        <section className="section">
          <h2>🔍 Check Card Status</h2>
          <p className="section-subtitle">Enter your card code to verify it's active.</p>
          <CardChecker />
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

        {/* Email Signup */}
        <section className="section">
          <div className="email-section">
            <h2>📧 Stay Updated</h2>
            <p>Get notified about new events, community updates, and exclusive drops.</p>
            {emailSent ? (
              <div className="email-success">✅ You're in! Check your inbox.</div>
            ) : (
              <form className="email-form" onSubmit={(e) => { e.preventDefault(); if (email) setEmailSent(true); }}>
                <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="email-input" />
                <button type="submit" className="email-btn">Join</button>
              </form>
            )}
          </div>
        </section>

        {/* Contact */}
        <section className="section">
          <h2>📬 Contact</h2>
          <div className="social-bar">
            <a href="mailto:comeandsee@gmail.com" className="social-link">
              <span>📧</span> comeandsee@gmail.com
            </a>
            <a href="https://wa.me/14153053689" target="_blank" rel="noopener" className="social-link">
              <span>💬</span> WhatsApp
            </a>
            <a href="tel:+14153053689" className="social-link">
              <span>📞</span> (415) 305-3689
            </a>
            <a href="https://t.me/tshungkathy10" target="_blank" rel="noopener" className="social-link">
              <span>✈️</span> Telegram
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="trust-badges">
            <span>🔒 SSL Encrypted</span>
            <span>💳 Discreet Billing</span>
            <span>✅ Verified Platform</span>
            <span>🌍 Worldwide Shipping</span>
          </div>
          <p>💕 Sissy Fantasy Island 2026 — Be who you really are 💕</p>
          <p>Discreet billing · One-time payments · Worldwide · All sales final</p>
          <Link href="/terms" className="terms-link">Terms of Service</Link>
        </footer>
      </div>

      {/* Live Chat Widget */}
      <ChatWidget />

      {/* Payment Modal */}
      {payModal && (
        <div className="age-gate-overlay" onClick={() => setPayModal(null)}>
          <div className="pay-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pay-modal-close" onClick={() => setPayModal(null)}>✕</button>
            <h2>{payModal.tier}</h2>
            <div className="pay-modal-total">${payModal.price} — one-time payment</div>

            {!payMethod && (
              <div className="pay-options">
                <button className="pay-option" onClick={() => setPayMethod("btc")}>
                  <span>₿</span> Pay with Bitcoin
                </button>
                <button className="pay-option" onClick={() => setPayMethod("gift")}>
                  <span>🎁</span> Redeem Gift Card
                </button>
              </div>
            )}

            {payMethod === "gift" && (
              <div className="pay-btc-content">
                {giftSubmitted ? (
                  <div className="email-success" style={{ textAlign: "center", padding: "1.5rem 0" }}>
                    ✅ Gift card submitted! We'll verify and deliver your card within 1 hour.
                  </div>
                ) : (
                  <form onSubmit={handleGiftSubmit} className="gift-form">
                    <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>Redeem Gift Card</h3>
                    <p style={{ opacity: 0.6, textAlign: "center", fontSize: "0.9rem", marginBottom: "1rem" }}>Enter your code or upload a photo of your gift card</p>
                    <input type="text" placeholder="Gift card code" value={giftCode} onChange={(e) => setGiftCode(e.target.value)} className="form-input" />
                    <div className="gift-upload">
                      <label className="gift-upload-label">
                        <span>{giftImage ? `📎 ${giftImage.name}` : "📷 Upload gift card image"}</span>
                        <input type="file" accept="image/*" onChange={(e) => setGiftImage(e.target.files[0] || null)} style={{ display: "none" }} />
                      </label>
                    </div>
                    <button type="submit" className="buy-btn donate-btn">Submit for Verification</button>
                    <p className="donate-note">We'll verify and deliver within 1 hour</p>
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
    </div>
  );
}
