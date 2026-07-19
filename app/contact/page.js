"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {}
    setSent(true);
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#060608", color: "#f0f0f0" }}>
      {/* Nav */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "1.2rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(6,6,8,0.92)", backdropFilter: "blur(20px)", zIndex: 100 }}>
        <Link href="/" style={{ color: "#f5a9b8", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem" }}>← SFI 💕</Link>
        <span style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: 1 }}>📬 Contact</span>
        <Link href="/register" style={{ background: "linear-gradient(135deg, #d63384, #7c3aed)", padding: "0.45rem 1rem", borderRadius: 6, color: "white", textDecoration: "none", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>Join</Link>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1.5rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, padding: "0.3rem 1rem", borderRadius: 50, background: "rgba(214,51,132,0.12)", border: "1px solid rgba(214,51,132,0.25)", color: "#f5a9b8", marginBottom: "1rem" }}>Get In Touch</div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, letterSpacing: -1, marginBottom: "0.8rem" }}>Contact Us</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7, fontSize: "0.95rem" }}>We respond within 24 hours. All messages are private and confidential.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem", alignItems: "start" }}>
          {/* Contact Methods */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Reach Us Directly</h2>

            {[
              { icon: "📧", label: "Email", value: "comeandsee@gmail.com", href: "mailto:comeandsee@gmail.com", note: "Best for orders & card delivery" },
              { icon: "📞", label: "Phone / WhatsApp", value: "(415) 305-3689", href: "https://wa.me/14153053689", note: "WhatsApp preferred — fastest response" },
              { icon: "✈️", label: "Telegram", value: "@tshungkathy10", href: "https://t.me/tshungkathy10", note: "For community & event questions" },
            ].map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "1.2rem 1.4rem", display: "flex", gap: "1rem", alignItems: "flex-start", transition: "border-color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(214,51,132,0.3)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
                >
                  <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: 1.5, color: "rgba(255,255,255,0.3)", fontWeight: 700, marginBottom: "0.2rem" }}>{c.label}</div>
                    <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "#f5a9b8", marginBottom: "0.2rem" }}>{c.value}</div>
                    <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>{c.note}</div>
                  </div>
                </div>
              </a>
            ))}

            {/* Response times */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: "1.2rem" }}>
              <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.3)", fontWeight: 700, marginBottom: "0.8rem" }}>Response Times</div>
              {[
                { label: "Card delivery questions", time: "Within 1 hour" },
                { label: "General inquiries", time: "Within 24 hours" },
                { label: "Event bookings", time: "Within 48 hours" },
                { label: "Mobile Dungeon bookings", time: "Within 2 hours" },
              ].map(r => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: "0.82rem" }}>
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>{r.label}</span>
                  <span style={{ color: "#4ade80", fontWeight: 600 }}>{r.time}</span>
                </div>
              ))}
            </div>

            {/* Privacy note */}
            <div style={{ background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.12)", borderRadius: 12, padding: "1rem 1.2rem", fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
              🔒 All messages are private and confidential. We never share your contact information with anyone.
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ background: "#0d0d12", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "2rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.5rem" }}>Send a Message</h2>
            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ marginBottom: "0.5rem" }}>Message Sent!</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.88rem", lineHeight: 1.6 }}>We&apos;ll get back to you within 24 hours. Check your email for a confirmation.</p>
                <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }} style={{ marginTop: "1.5rem", padding: "0.6rem 1.5rem", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", background: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontFamily: "inherit", fontSize: "0.85rem" }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <label style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>Your Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Sissy name or real name" required className="form-input" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <label style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" required className="form-input" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <label style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>Subject</label>
                  <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required className="form-input form-select">
                    <option value="">Select a topic...</option>
                    <option>Card Order / Delivery</option>
                    <option>Event Tickets</option>
                    <option>Mobile Dungeon Booking</option>
                    <option>Community Access</option>
                    <option>Technical Support</option>
                    <option>Refund Request</option>
                    <option>Other</option>
                  </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <label style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>Message</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us how we can help..." required rows={5} style={{ padding: "0.85rem 1rem", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "white", fontSize: "0.92rem", outline: "none", fontFamily: "inherit", resize: "vertical", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = "#d63384"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                </div>
                <button type="submit" disabled={loading} className="buy-btn donate-btn" style={{ marginTop: "0.5rem" }}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
                <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", textAlign: "center" }}>Your message is private and confidential</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
