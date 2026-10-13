"use client";
import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: "Live Chat Message" }),
      });
    } catch {}
    setSending(false);
    setSent(true);
  }

  return (
    <>
      <button className="chat-toggle" onClick={() => setOpen(!open)}>
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <span>😈 Message Us</span>
            <button className="chat-close" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div style={{ padding: "1rem" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✅</div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.88rem" }}>Message received! We'll get back to you within 2 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                  style={{ marginTop: "1rem", background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.5)", borderRadius: 8, padding: "0.4rem 1rem", cursor: "pointer", fontSize: "0.8rem" }}>
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.2rem" }}>
                  Ask us anything — tickets, kink rooms, dress code. We don't bite... unless you want us to. 😏
                </p>
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="chat-input"
                  style={{ borderRadius: 8, padding: "0.6rem 0.8rem" }}
                />
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="chat-input"
                  style={{ borderRadius: 8, padding: "0.6rem 0.8rem" }}
                />
                <textarea
                  placeholder="Your message... 😈"
                  required
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="chat-input"
                  style={{ borderRadius: 8, padding: "0.6rem 0.8rem", resize: "none" }}
                />
                <button type="submit" className="chat-send" disabled={sending}
                  style={{ borderRadius: 8, padding: "0.7rem", fontSize: "0.88rem", fontWeight: 700 }}>
                  {sending ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
