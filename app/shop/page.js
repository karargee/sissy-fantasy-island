"use client";
import { useState } from "react";
import Link from "next/link";

const SHOPS = [
  { name: "Lovense", emoji: "💜", desc: "Remote-controlled toys, vibrators, and interactive devices", url: "https://www.lovense.com", category: "Toys & Devices" },
  { name: "Amazon — Sissy Costumes", emoji: "👗", desc: "Maid outfits, lingerie, wigs, stockings, and accessories", url: "https://www.amazon.com/s?k=sissy+costume", category: "Costumes" },
  { name: "Amazon — Chastity", emoji: "🔒", desc: "Cages, locks, and chastity devices for beginners and advanced", url: "https://www.amazon.com/s?k=chastity+cage", category: "Chastity" },
  { name: "Amazon — Wigs & Makeup", emoji: "💄", desc: "Feminine wigs, makeup kits, and beauty essentials", url: "https://www.amazon.com/s?k=crossdresser+wig", category: "Beauty" },
  { name: "Amazon — Heels & Boots", emoji: "👠", desc: "High heels, thigh-high boots, and platform shoes in all sizes", url: "https://www.amazon.com/s?k=crossdresser+heels", category: "Footwear" },
  { name: "Amazon — Corsets & Shapewear", emoji: "🩱", desc: "Waist trainers, corsets, hip pads, and body shaping", url: "https://www.amazon.com/s?k=crossdresser+shapewear", category: "Shapewear" },
  { name: "Amazon — Lingerie", emoji: "🌸", desc: "Bras, panties, bodysuits, and sexy lingerie sets", url: "https://www.amazon.com/s?k=sissy+lingerie", category: "Costumes" },
  { name: "Amazon — Stockings", emoji: "🦵", desc: "Thigh-highs, fishnet stockings, and hold-ups", url: "https://www.amazon.com/s?k=thigh+high+stockings", category: "Costumes" },
  { name: "Amazon — Dresses", emoji: "💃", desc: "Mini dresses, bodycon, and feminine styles in all sizes", url: "https://www.amazon.com/s?k=crossdresser+dress", category: "Costumes" },
  { name: "Amazon — Accessories", emoji: "💍", desc: "Chokers, earrings, bracelets, and feminine jewelry", url: "https://www.amazon.com/s?k=feminine+accessories", category: "Beauty" },
  { name: "Amazon — Skincare", emoji: "✨", desc: "Moisturizers, exfoliants, and feminine skincare routines", url: "https://www.amazon.com/s?k=feminine+skincare", category: "Beauty" },
  { name: "Amazon — Butt Plugs", emoji: "🍑", desc: "Beginner to advanced anal toys and training kits", url: "https://www.amazon.com/s?k=butt+plug", category: "Toys & Devices" },
];

const CATEGORIES = ["All", "Toys & Devices", "Costumes", "Chastity", "Beauty", "Footwear", "Shapewear"];

const TIPS = [
  { emoji: "📦", title: "Discreet Shipping", desc: "Always select 'gift packaging' on Amazon. Items ship in plain brown boxes with no product description on the label." },
  { emoji: "💳", title: "Private Payment", desc: "Use Amazon gift cards or a prepaid Visa to keep purchases off your main bank statement." },
  { emoji: "📏", title: "Sizing Tips", desc: "Always size up for corsets and shapewear. For heels, go half a size up. Check reviews for sizing notes." },
  { emoji: "🔒", title: "Account Privacy", desc: "Create a separate Amazon account with a private email for all sissy purchases. Use a PO box or Amazon locker for delivery." },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? SHOPS : SHOPS.filter(s => s.category === activeCategory);

  return (
    <div style={{ minHeight: "100vh", background: "#060608", color: "#f0f0f0" }}>
      {/* Nav */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "1.2rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(6,6,8,0.92)", backdropFilter: "blur(20px)", zIndex: 100 }}>
        <Link href="/" style={{ color: "#f5a9b8", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem" }}>← SFI 💕</Link>
        <span style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: 1 }}>🛍️ Shop</span>
        <Link href="/register" style={{ background: "linear-gradient(135deg, #d63384, #7c3aed)", padding: "0.45rem 1rem", borderRadius: 6, color: "white", textDecoration: "none", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>Join</Link>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "3rem 1.5rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, padding: "0.3rem 1rem", borderRadius: 50, background: "rgba(214,51,132,0.12)", border: "1px solid rgba(214,51,132,0.25)", color: "#f5a9b8", marginBottom: "1rem" }}>Curated Picks</div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, letterSpacing: -1, marginBottom: "0.8rem" }}>Sissy Shop</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7, fontSize: "0.95rem" }}>Curated products from trusted retailers. Click any item to shop directly — all links are discreet and safe.</p>
        </div>

        {/* Category Filter */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "2.5rem" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{ padding: "0.5rem 1.2rem", borderRadius: 6, border: `1px solid ${activeCategory === cat ? "rgba(214,51,132,0.4)" : "rgba(255,255,255,0.08)"}`, background: activeCategory === cat ? "rgba(214,51,132,0.12)" : "transparent", color: activeCategory === cat ? "#f5a9b8" : "rgba(255,255,255,0.45)", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.2rem", marginBottom: "4rem" }}>
          {filtered.map(item => (
            <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "1.8rem", textAlign: "center", height: "100%", display: "flex", flexDirection: "column", gap: "0.6rem", transition: "transform 0.25s, border-color 0.25s", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "rgba(245,169,184,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                <div style={{ fontSize: "2.2rem" }}>{item.emoji}</div>
                <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: 1.5, color: "rgba(255,255,255,0.3)", fontWeight: 700 }}>{item.category}</div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700 }}>{item.name}</h3>
                <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.5, flex: 1 }}>{item.desc}</p>
                <div style={{ color: "#f5a9b8", fontWeight: 700, fontSize: "0.85rem", marginTop: "0.5rem" }}>Shop Now →</div>
              </div>
            </a>
          ))}
        </div>

        {/* Privacy Tips */}
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, textAlign: "center", marginBottom: "0.5rem" }}>🔒 Shopping Discreetly</h2>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "0.88rem", marginBottom: "2rem" }}>Tips to keep your purchases private.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {TIPS.map(tip => (
              <div key={tip.title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "1.4rem" }}>
                <div style={{ fontSize: "1.6rem", marginBottom: "0.6rem" }}>{tip.emoji}</div>
                <h3 style={{ fontSize: "0.92rem", fontWeight: 700, marginBottom: "0.4rem" }}>{tip.title}</h3>
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: "rgba(214,51,132,0.04)", border: "1px solid rgba(214,51,132,0.12)", borderRadius: 16, padding: "2rem", textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>💳</div>
          <h3 style={{ marginBottom: "0.5rem" }}>Members Get Exclusive Deals</h3>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1.2rem" }}>Card holders get access to member-only discount codes and early access to new product drops.</p>
          <Link href="/#cards" style={{ display: "inline-block", padding: "0.7rem 1.8rem", borderRadius: 8, background: "linear-gradient(135deg, #d63384, #7c3aed)", color: "white", textDecoration: "none", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Get Your Card →</Link>
        </div>
      </div>
    </div>
  );
}
