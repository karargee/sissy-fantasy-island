"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", sissyName: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) return setError(data.error);
    router.push("/profile");
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <Link href="/" className="auth-back">← Back to site</Link>
        <div className="auth-logo">SFI 💕</div>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-sub">Join Sissy Fantasy Island</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Sissy Name</label>
            <input type="text" placeholder="e.g. Princess Sparkle" value={form.sissyName} onChange={(e) => setForm({ ...form, sissyName: e.target.value })} required />
          </div>
          <div className="auth-field">
            <label>Email</label>
            <input type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input type="password" placeholder="Min 8 characters" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={8} />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">Already have an account? <Link href="/login">Sign In</Link></p>
      </div>
    </div>
  );
}
