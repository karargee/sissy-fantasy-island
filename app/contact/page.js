"use client";
import { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="container" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
      <Link href="/" className="rules-link" style={{ display: "inline-block", marginBottom: "2rem" }}>
        ← Back to Home
      </Link>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📬 Contact Us</h1>
      <p style={{ opacity: 0.6, marginBottom: "3rem", lineHeight: 1.6 }}>
        Got questions? We're here to help. Reach out through any of the channels below.
      </p>

      {/* Contact Methods */}
      <div className="contact-methods">
        <a href="mailto:comeandsee@gmail.com" className="contact-card">
          <span className="contact-icon">📧</span>
          <div>
            <strong>Email</strong>
            <p>comeandsee@gmail.com</p>
          </div>
        </a>
        <a href="https://wa.me/19853686907" target="_blank" rel="noopener" className="contact-card">
          <span className="contact-icon">💬</span>
          <div>
            <strong>WhatsApp</strong>
            <p>Message us directly</p>
          </div>
        </a>
        <a href="https://t.me/tshungkathy10" target="_blank" rel="noopener" className="contact-card">
          <span className="contact-icon">✈️</span>
          <div>
            <strong>Telegram</strong>
            <p>@tshungkathy10</p>
          </div>
        </a>
      </div>

      {/* Contact Form */}
      <div className="contact-form-wrap">
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Send us a message</h2>
        {sent ? (
          <div className="email-success" style={{ fontSize: "1.2rem", padding: "2rem" }}>
            ✅ Message sent! We'll get back to you within 24 hours.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <input
                type="text"
                placeholder="Your name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="form-input"
              />
              <input
                type="email"
                placeholder="Your email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="form-input"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="form-input"
            />
            <textarea
              placeholder="Your message..."
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="form-input form-textarea"
            />
            <button type="submit" className="buy-btn" style={{ background: "linear-gradient(135deg, #d63384, #6f42c1)", maxWidth: "300px" }}>
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
