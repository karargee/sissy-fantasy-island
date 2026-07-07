"use client";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const BTC_WALLET = "bc1q6k7lmj5jruuk0tq28c03pc5ae2jv0wnthdpxpn";

const MEMBERSHIPS = [
  {
    name: "Sissy Basic",
    emoji: "💕",
    price: 29,
    color: "#f5a9b8",
    period: "/month",
    perks: [
      "Official digital Sissy Card",
      "Access to the community chat",
      "Monthly sissy tips & guides",
      "Member badge on profile",
    ],
  },
  {
    name: "Sissy Premium",
    emoji: "👑",
    price: 59,
    color: "#d63384",
    popular: true,
    period: "/month",
    perks: [
      "Everything in Basic",
      "Exclusive training content",
      "Private group access",
      "Custom sissy name on your card",
      "Priority support & mentorship",
      "Monthly surprise gift box",
    ],
  },
  {
    name: "Sissy VIP",
    emoji: "💎",
    price: 99,
    color: "#6f42c1",
    period: "/month",
    perks: [
      "Everything in Premium",
      "Holographic digital Sissy Card",
      "1-on-1 coaching sessions",
      "VIP-only events & meetups",
      "Exclusive merch drops",
      "Lifetime member archive access",
      "Featured on the community wall",
    ],
  },
];

const SHOP_ITEMS = [
  { name: "Sissy Starter Kit", emoji: "🎀", price: 49, desc: "Panties, lip gloss, and a beginner guide" },
  { name: "Maid Outfit Set", emoji: "🖤", price: 79, desc: "Full maid costume with accessories" },
  { name: "Sissy Card (Physical)", emoji: "💳", price: 19, desc: "Printed holographic membership card shipped to you" },
  { name: "Training Journal", emoji: "📓", price: 25, desc: "Guided sissy journal with daily prompts" },
  { name: "Chastity Starter", emoji: "🔒", price: 45, desc: "Beginner-friendly cage with guide" },
  { name: "Femme Fragrance", emoji: "🌸", price: 35, desc: "Signature sissy perfume — floral & sweet" },
];

const FAQS = [
  { q: "What is a Sissy Card?", a: "Your official digital membership card that proves you're part of the Sissy Fantasy Island community. It includes your sissy name, tier, and unique member ID." },
  { q: "Is this discreet?", a: "100%. All billing shows as 'SFI Digital'. No explicit descriptions on any statements. Your privacy is our priority." },
  { q: "Can I upgrade my membership?", a: "Yes! You can upgrade anytime and only pay the difference for the current billing period." },
  { q: "Do you ship internationally?", a: "Yes, we ship physical cards and shop items worldwide. Discreet packaging guaranteed." },
  { q: "How do I pay with Bitcoin?", a: "Select BTC at checkout, send to our wallet address, and confirm with your email. Card is activated within 1 hour." },
  { q: "Is there a community?", a: "Yes! All members get access to our private community chat. Premium and VIP members get access to exclusive groups." },
];

function BtcConfirmForm() {
  const [form, setForm] = useState({ email: "", tier: "Sissy Basic", txid: "" });
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="btc-confirm-card">
        <div className="email-success">✅ Payment received! Your Sissy Card will be activated within 1 hour.</div>
      </div>
    );
  }

  return (
    <form className="btc-confirm-card" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <h3>Confirm Your BTC Payment</h3>
      <input type="email" placeholder="Your email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="form-input" />
      <select value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} className="form-input form-select">
        <option value="Sissy Basic">💕 Sissy Basic — $29/mo</option>
        <option value="Sissy Premium">👑 Sissy Premium — $59/mo</option>
        <option value="Sissy VIP">💎 Sissy VIP — $99/mo</option>
      </select>
      <input type="text" placeholder="BTC Transaction ID (optional)" value={form.txid} onChange={(e) => setForm({ ...form, txid: e.target.value })} className="form-input" />
      <button type="submit" className="buy-btn donate-btn">Confirm Payment</button>
      <p className="donate-note">We'll verify on-chain and activate your card within 1 hour</p>
    </form>
  );
}

export default function Home() {
  const [payModal, setPayModal] = useState(null);
  const [payMethod, setPayMethod] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [giftCode, setGiftCode] = useState("");
  const [giftImage, setGiftImage] = useState(null);
  const [giftSubmitted, setGiftSubmitted] = useState(false);

  function openPayModal(tier) {
    const t = MEMBERSHIPS.find((x) => x.name === tier);
    setPayModal({ tier, price: t.price, period: t.period });
    setPayMethod(null);
  }

  function handleGiftSubmit(e) {
    e.preventDefault();
    if (!giftCode && !giftImage) return alert("Please enter a gift card code or upload an image.");
    setGiftSubmitted(true);
  }

  return (
    <div className="container">
      {/* Hero */}
      <section className="hero">
        <h1>SISSY FANTASY ISLAND</h1>
        <p className="tagline">Your official home for all things sissy. Get your card. Join the community. Embrace who you are.</p>
        <div className="hero-badges">
          <span className="hero-badge">💳 Official Sissy Cards</span>
          <span className="hero-badge">👗 Sissy Shop</span>
          <span className="hero-badge">💬 Private Community</span>
        </div>
      </section>

      {/* What You Get */}
      <section className="section">
        <h2>✨ What Is Sissy Fantasy Island?</h2>
        <div className="expect-grid">
          {[
            ["💳", "Official Sissy Card", "Your digital (or physical) membership card with your sissy name, tier, and unique ID"],
            ["👗", "Sissy Shop", "Outfits, accessories, training tools, and everything you need for your journey"],
            ["💬", "Private Community", "Connect with other sissies in our safe, discreet, and supportive space"],
            ["📚", "Training & Guides", "Step-by-step feminization guides, tips, and daily challenges"],
            ["🔒", "100% Discreet", "Anonymous billing, private profiles, and encrypted communications"],
            ["🌍", "Worldwide", "Members from every corner of the globe. Ship anywhere, connect everywhere"],
          ].map(([emoji, title, desc]) => (
            <div key={title} className="expect-card">
              <div className="expect-emoji">{emoji}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Membership Cards */}
      <section className="section" id="cards">
        <h2>💳 Get Your Sissy Card</h2>
        <p style={{ textAlign: "center", opacity: 0.6, marginBottom: "2rem" }}>Choose your tier. Get your card. Join the community.</p>
        <div className="tickets-grid">
          {MEMBERSHIPS.map((t) => (
            <div key={t.name} className="ticket-card" style={{ borderTop: `4px solid ${t.color}` }}>
              {t.popular && <div className="popular-badge">🔥 MOST POPULAR</div>}
              <div className="ticket-emoji">{t.emoji}</div>
              <h3>{t.name}</h3>
              <div className="price" style={{ color: t.color }}>
                ${t.price}<span className="price-period">{t.period}</span>
              </div>
              <ul className="perks">
                {t.perks.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <button
                className="buy-btn"
                style={{ background: `linear-gradient(135deg, ${t.color}, #6f42c1)` }}
                onClick={() => openPayModal(t.name)}
              >
                Get {t.name} Card
              </button>
              <div className="payment-icons">
                <span className="btc-badge">₿ Bitcoin</span>
                <span className="btc-badge" style={{ background: "rgba(245,169,184,0.15)", borderColor: "rgba(245,169,184,0.3)", color: "#f5a9b8" }}>🎁 Gift Card</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop */}
      <section className="section">
        <h2>🛍️ Sissy Shop</h2>
        <div className="shop-grid">
          {SHOP_ITEMS.map((item) => (
            <div key={item.name} className="shop-card">
              <div className="shop-emoji">{item.emoji}</div>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <div className="shop-price">${item.price}</div>
              <button className="buy-btn shop-btn" onClick={() => { setPayModal({ tier: item.name, price: item.price, period: "" }); setPayMethod(null); }}>
                Buy Now
              </button>
            </div>
          ))}
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

      {/* Email Signup */}
      <section className="section">
        <div className="email-section">
          <h2>📧 Join The List</h2>
          <p>Get notified about new drops, exclusive content, and community updates.</p>
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
          <a href="https://wa.me/19853686907" target="_blank" rel="noopener" className="social-link">
            <span>💬</span> WhatsApp
          </a>
          <a href="https://t.me/tshungkathy10" target="_blank" rel="noopener" className="social-link">
            <span>✈️</span> Telegram
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>💕 Sissy Fantasy Island 2026 — Be who you really are 💕</p>
        <p>Discreet billing · Worldwide shipping · All sales final</p>
      </footer>

      {/* Payment Modal */}
      {payModal && (
        <div className="age-gate-overlay" onClick={() => setPayModal(null)}>
          <div className="pay-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pay-modal-close" onClick={() => setPayModal(null)}>✕</button>
            <h2>{payModal.tier}</h2>
            <div className="pay-modal-total">${payModal.price}{payModal.period}</div>

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
                    ✅ Gift card submitted! We'll verify and activate your card within 1 hour.
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
    </div>
  );
}
