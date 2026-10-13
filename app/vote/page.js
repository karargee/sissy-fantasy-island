"use client";
import Link from "next/link";

export default function VotePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#060608", color: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1.5rem", textAlign: "center", padding: "2rem" }}>
      <div style={{ fontSize: "3rem" }}>🗳️</div>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: -1 }}>Voting Coming Soon</h1>
      <p style={{ color: "rgba(255,255,255,0.45)", maxWidth: 400, lineHeight: 1.7 }}>
        Community voting will open closer to the event. Stay tuned.
      </p>
      <Link href="/" style={{ marginTop: "1rem", padding: "0.75rem 2rem", borderRadius: 8, background: "linear-gradient(135deg, #d63384, #7c3aed)", color: "white", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem" }}>
        ← Back to Home
      </Link>
    </div>
  );
}
