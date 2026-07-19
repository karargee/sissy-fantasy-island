"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const GALLERY = [
  { img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80", caption: "Community Night — Vegas 2025", tag: "Events" },
  { img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80", caption: "Sissy Brunch — Miami", tag: "Events" },
  { img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80", caption: "Masked Gala — NYC", tag: "Events" },
  { img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80", caption: "Member Spotlight — Diamond Tier", tag: "Members" },
  { img: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80", caption: "Glam Night — Los Angeles", tag: "Events" },
  { img: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&q=80", caption: "Inner Circle Meetup — London", tag: "Community" },
  { img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", caption: "Annual Gala — Chicago 2025", tag: "Events" },
  { img: "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=800&q=80", caption: "VIP Lounge — Las Vegas", tag: "Events" },
  { img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80", caption: "Fashion Shoot — NYC", tag: "Members" },
  { img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80", caption: "Style Session — Miami", tag: "Members" },
  { img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80", caption: "Community Portrait", tag: "Community" },
  { img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80", caption: "Glam Portrait — Diamond Member", tag: "Members" },
];

const TAGS = ["All", "Events", "Members", "Community"];

export default function GalleryPage() {
  const [activeTag, setActiveTag] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeTag === "All" ? GALLERY : GALLERY.filter(g => g.tag === activeTag);

  function prev() { setLightbox(i => (i - 1 + filtered.length) % filtered.length); }
  function next() { setLightbox(i => (i + 1) % filtered.length); }

  return (
    <div style={{ minHeight: "100vh", background: "#060608", color: "#f0f0f0" }}>
      {/* Nav */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "1.2rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(6,6,8,0.92)", backdropFilter: "blur(20px)", zIndex: 100 }}>
        <Link href="/" style={{ color: "#f5a9b8", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem" }}>← SFI 💕</Link>
        <span style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: 1 }}>📸 Gallery</span>
        <Link href="/register" style={{ background: "linear-gradient(135deg, #d63384, #7c3aed)", padding: "0.45rem 1rem", borderRadius: 6, color: "white", textDecoration: "none", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>Join</Link>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, padding: "0.3rem 1rem", borderRadius: 50, background: "rgba(214,51,132,0.12)", border: "1px solid rgba(214,51,132,0.25)", color: "#f5a9b8", marginBottom: "1rem" }}>Community Lookbook</div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, letterSpacing: -1, marginBottom: "0.8rem" }}>Photo Gallery</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7, fontSize: "0.95rem" }}>Real moments from our events and community. Click any photo to view full size.</p>
        </div>

        {/* Tag Filter */}
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{ padding: "0.5rem 1.2rem", borderRadius: 6, border: `1px solid ${activeTag === tag ? "rgba(214,51,132,0.4)" : "rgba(255,255,255,0.08)"}`, background: activeTag === tag ? "rgba(214,51,132,0.12)" : "transparent", color: activeTag === tag ? "#f5a9b8" : "rgba(255,255,255,0.45)", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "0.8rem", marginBottom: "3rem" }}>
          {filtered.map((item, i) => (
            <div
              key={i}
              onClick={() => setLightbox(i)}
              style={{ position: "relative", borderRadius: 14, overflow: "hidden", aspectRatio: "1", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.querySelector(".overlay").style.opacity = "1"; e.currentTarget.querySelector("img").style.transform = "scale(1.06)"; }}
              onMouseLeave={e => { e.currentTarget.querySelector(".overlay").style.opacity = "0"; e.currentTarget.querySelector("img").style.transform = "scale(1)"; }}
            >
              <Image src={item.img} alt={item.caption} fill style={{ objectFit: "cover", transition: "transform 0.4s ease" }} />
              <div className="overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,6,8,0.9), transparent)", display: "flex", alignItems: "flex-end", padding: "1rem", opacity: 0, transition: "opacity 0.3s" }}>
                <div>
                  <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: 1.5, color: "#f5a9b8", fontWeight: 700, marginBottom: "0.2rem" }}>{item.tag}</div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "white" }}>{item.caption}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: "rgba(214,51,132,0.04)", border: "1px solid rgba(214,51,132,0.12)", borderRadius: 16, padding: "2rem", textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>📸</div>
          <h3 style={{ marginBottom: "0.5rem" }}>Share Your Look</h3>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1.2rem" }}>Join the community and share your photos with thousands of members. Your story belongs here.</p>
          <Link href="/community" style={{ display: "inline-block", padding: "0.7rem 1.8rem", borderRadius: 8, background: "linear-gradient(135deg, #d63384, #7c3aed)", color: "white", textDecoration: "none", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Join Community →</Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={() => setLightbox(null)}>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} style={{ position: "absolute", left: "1rem", background: "rgba(255,255,255,0.08)", border: "none", color: "white", width: 44, height: 44, borderRadius: "50%", fontSize: "1.2rem", cursor: "pointer", zIndex: 1 }}>‹</button>
          <div style={{ position: "relative", maxWidth: 800, maxHeight: "80vh", width: "100%", aspectRatio: "4/3" }} onClick={e => e.stopPropagation()}>
            <Image src={filtered[lightbox].img} alt={filtered[lightbox].caption} fill style={{ objectFit: "contain", borderRadius: 12 }} />
          </div>
          <button onClick={(e) => { e.stopPropagation(); next(); }} style={{ position: "absolute", right: "1rem", background: "rgba(255,255,255,0.08)", border: "none", color: "white", width: 44, height: 44, borderRadius: "50%", fontSize: "1.2rem", cursor: "pointer", zIndex: 1 }}>›</button>
          <div style={{ position: "absolute", bottom: "2rem", textAlign: "center", width: "100%" }}>
            <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: 1.5, color: "#f5a9b8", fontWeight: 700, marginBottom: "0.2rem" }}>{filtered[lightbox].tag}</div>
            <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>{filtered[lightbox].caption}</div>
            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", marginTop: "0.3rem" }}>{lightbox + 1} / {filtered.length}</div>
          </div>
          <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(255,255,255,0.08)", border: "none", color: "white", width: 36, height: 36, borderRadius: "50%", fontSize: "1rem", cursor: "pointer" }}>✕</button>
        </div>
      )}
    </div>
  );
}
