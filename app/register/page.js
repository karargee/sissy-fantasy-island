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
    <div style={{ minHeight: "100vh", background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: "#151520", border: "1px solid rgba(214,51,132,0.3)", borderRadius: 20, padding: "2.5rem", width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>💕</div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, background: "linear-gradient(135deg, #f5a9b8, #d63384)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Create Your Account</h1>
          <p style={{ opacity: 0.5, fontSize: "0.9rem", marginTop: "0.3rem" }}>Join Sissy Fantasy Island</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ fontSize: "0.8rem", opacity: 0.6, display: "block", marginBottom: "0.4rem" }}>Sissy Name</label>
            <input
              type="text"
              placeholder="e.g. Princess Sparkle"
              value={form.sissyName}
              onChange={(e) => setForm({ ...form, sissyName: e.target.value })}
              required
              style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "white", fontSize: "1rem", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ fontSize: "0.8rem", opacity: 0.6, display: "block", marginBottom: "0.4rem" }}>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "white", fontSize: "1rem", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ fontSize: "0.8rem", opacity: 0.6, display: "block", marginBottom: "0.4rem" }}>Password</label>
            <input
              type="password"
              placeholder="Min 8 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={8}
              style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "white", fontSize: "1rem", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          {error && <div style={{ background: "rgba(220,53,69,0.1)", border: "1px solid rgba(220,53,69,0.3)", borderRadius: 8, padding: "0.7rem 1rem", fontSize: "0.85rem", color: "#ff6b6b" }}>{error}</div>}

          <button
            type="submit"
            disabled={loading}
            style={{ padding: "0.9rem", borderRadius: 50, border: "none", background: "linear-gradient(135deg, #d63384, #6f42c1)", color: "white", fontSize: "1rem", fontWeight: 700, cursor: "pointer", opacity: loading ? 0.7 : 1, marginTop: "0.5rem" }}
          >
            {loading ? "Creating Account..." : "Create Account 💕"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", opacity: 0.5 }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#f5a9b8", textDecoration: "none", fontWeight: 600 }}>Sign In</Link>
        </p>
        <p style={{ textAlign: "center", marginTop: "0.5rem" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", textDecoration: "none" }}>← Back to site</Link>
        </p>
      </div>
    </div>
  );
}
