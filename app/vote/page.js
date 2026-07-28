"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const CONTESTANTS = [
  {
    id: "aurora",
    name: "Princess Aurora",
    title: "Miss Glamour 2026",
    location: "Los Angeles, CA",
    emoji: "👑",
    color: "#d63384",
    bio: "Diamond member since 2025. Known for her stunning runway looks and fierce confidence. Aurora brings elegance and fire to every event she attends.",
    tags: ["Runway", "Glam", "Diamond"],
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80",
  },
  {
    id: "valentina",
    name: "Sissy Valentina",
    title: "Miss Fierce 2026",
    location: "London, UK",
    emoji: "🌹",
    color: "#7c3aed",
    bio: "Gold member and community icon. Valentina is the life of every party — her energy is infectious and her style is unmatched across the Atlantic.",
    tags: ["Style", "Energy", "Gold"],
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
  },
  {
    id: "celestine",
    name: "Baby Celestine",
    title: "Miss Sweetness 2026",
    location: "Toronto, Canada",
    emoji: "🌸",
    color: "#f5a9b8",
    bio: "Platinum member and mentorship queen. Celestine helped over 30 new members find their confidence. Her warmth and grace define the SFI spirit.",
    tags: ["Mentor", "Grace", "Platinum"],
    img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&q=80",
  },
  {
    id: "velvet",
    name: "Princess Velvet",
    title: "Miss Elegance 2026",
    location: "Paris, France",
    emoji: "💜",
    color: "#8b5cf6",
    bio: "Standard member with a Diamond heart. Velvet's fashion sense and poise have made her a community favorite. She represents the true spirit of femininity.",
    tags: ["Fashion", "Poise", "Standard"],
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
  },
  {
    id: "jade",
    name: "Sissy Jade",
    title: "Miss Confidence 2026",
    location: "Sydney, Australia",
    emoji: "💚",
    color: "#10b981",
    bio: "Gold member and event superstar. Jade flew from Sydney to Vegas just to be part of the community. Her dedication and confidence inspire everyone around her.",
    tags: ["Confidence", "Events", "Gold"],
    img: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&q=80",
  },
  {
    id: "lace",
    name: "Mistress Lace",
    title: "Miss Power 2026",
    location: "New York, NY",
    emoji: "🖤",
    color: "#6366f1",
    bio: "Diamond member and community pillar. Lace runs the weekly check-ins and has never missed a single one. Her leadership and strength are unparalleled.",
    tags: ["Leadership", "Power", "Diamond"],
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
  },
];

function CountdownTimer({ targetDate }) {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return;
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return (
    <div className="vote-countdown">
      {[[time.days, "Days"], [time.hours, "Hours"], [time.mins, "Mins"], [time.secs, "Secs"]].map(([v, l]) => (
        <div key={l} className="vote-countdown-unit">
          <div className="vote-countdown-num">{String(v).padStart(2, "0")}</div>
          <div className="vote-countdown-label">{l}</div>
        </div>
      ))}
    </div>
  );
}

export default function VotePage() {
  const [votes, setVotes] = useState({});
  const [voted, setVoted] = useState({}); // { id: true } — session voted
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(null);
  const [toast, setToast] = useState(null);
  const toastRef = useRef(null);

  // Load votes + session voted state
  useEffect(() => {
    fetch("/api/vote")
      .then((r) => r.json())
      .then((d) => setVotes(d.counts || {}))
      .catch(() => {})
      .finally(() => setLoading(false));

    try {
      const saved = JSON.parse(sessionStorage.getItem("sfi_votes") || "{}");
      setVoted(saved);
    } catch {}
  }, []);

  async function handleVote(id) {
    if (voted[id] || voting) return;
    setVoting(id);
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      setVotes((prev) => ({ ...prev, [id]: data.count }));
      const newVoted = { ...voted, [id]: true };
      setVoted(newVoted);
      sessionStorage.setItem("sfi_votes", JSON.stringify(newVoted));
      showToast(`💕 Vote cast for ${CONTESTANTS.find((c) => c.id === id)?.name}!`);
    } catch {
      showToast("❌ Vote failed. Try again.");
    }
    setVoting(null);
  }

  function showToast(msg) {
    setToast(msg);
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3000);
  }

  // Sort contestants by votes for leaderboard
  const ranked = [...CONTESTANTS].sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0));
  const totalVotes = Object.values(votes).reduce((s, v) => s + v, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#060608", color: "#f0f0f0" }}>
      {/* Nav */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "1.2rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(6,6,8,0.95)", backdropFilter: "blur(20px)", zIndex: 100 }}>
        <Link href="/" style={{ color: "#f5a9b8", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem" }}>← SFI 💕</Link>
        <span style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: 1 }}>🗳️ Vote for Your Favorite</span>
        <Link href="/register" style={{ background: "linear-gradient(135deg, #d63384, #7c3aed)", padding: "0.45rem 1rem", borderRadius: 6, color: "white", textDecoration: "none", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>Join</Link>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>

        {/* Hero */}
        <div className="vote-hero">
          <div className="vote-hero-label">Community Vote · Las Vegas 2026</div>
          <h1 className="vote-hero-title">Who Will Be <span>Miss SFI 2026?</span></h1>
          <p className="vote-hero-sub">Cast your vote for your favorite contestant. The winner will be crowned at the Trans & Sex Party — Las Vegas on August 15, 2026.</p>
          <div style={{ marginTop: "2rem" }}>
            <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 2, marginBottom: "1rem" }}>Voting closes in</p>
            <CountdownTimer targetDate="2026-08-14T23:59:00" />
          </div>
          <div className="vote-total-badge">
            🗳️ {loading ? "..." : totalVotes.toLocaleString()} total votes cast
          </div>
        </div>

        {/* Leaderboard */}
        <div className="vote-leaderboard">
          <div className="vote-section-label">📊 Live Standings</div>
          <div className="vote-lb-list">
            {ranked.map((c, i) => {
              const count = votes[c.id] || 0;
              const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
              return (
                <div key={c.id} className="vote-lb-item">
                  <div className="vote-lb-rank" style={{ color: i === 0 ? "#f7931a" : i === 1 ? "#aaa" : i === 2 ? "#cd7f32" : "rgba(255,255,255,0.3)" }}>
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                  </div>
                  <div className="vote-lb-avatar" style={{ background: `linear-gradient(135deg, ${c.color}, #0a0a0f)` }}>{c.emoji}</div>
                  <div className="vote-lb-info">
                    <strong>{c.name}</strong>
                    <div className="vote-lb-bar-wrap">
                      <div className="vote-lb-bar">
                        <div className="vote-lb-bar-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${c.color}, #7c3aed)` }} />
                      </div>
                      <span className="vote-lb-pct">{pct}%</span>
                    </div>
                  </div>
                  <div className="vote-lb-count">{count.toLocaleString()} <span>votes</span></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contestant Cards */}
        <div className="vote-section-label" style={{ marginBottom: "1.5rem" }}>🌟 Meet the Contestants</div>
        <div className="vote-grid">
          {CONTESTANTS.map((c) => {
            const count = votes[c.id] || 0;
            const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
            const hasVoted = voted[c.id];
            const isVoting = voting === c.id;
            const rank = ranked.findIndex((r) => r.id === c.id) + 1;

            return (
              <div key={c.id} className={`vote-card ${hasVoted ? "vote-card-voted" : ""}`} style={{ "--accent": c.color }}>
                {rank === 1 && <div className="vote-card-crown">👑 Leading</div>}

                {/* Photo */}
                <div className="vote-card-img-wrap">
                  <img src={c.img} alt={c.name} className="vote-card-img" />
                  <div className="vote-card-img-overlay" style={{ background: `linear-gradient(to top, ${c.color}33, transparent)` }} />
                  <div className="vote-card-rank-badge">#{rank}</div>
                </div>

                {/* Body */}
                <div className="vote-card-body">
                  <div className="vote-card-emoji">{c.emoji}</div>
                  <h3 className="vote-card-name">{c.name}</h3>
                  <div className="vote-card-title" style={{ color: c.color }}>{c.title}</div>
                  <div className="vote-card-location">📍 {c.location}</div>
                  <p className="vote-card-bio">{c.bio}</p>

                  <div className="vote-card-tags">
                    {c.tags.map((t) => (
                      <span key={t} className="vote-card-tag" style={{ borderColor: `${c.color}44`, color: c.color }}>{t}</span>
                    ))}
                  </div>

                  {/* Vote bar */}
                  <div className="vote-card-stats">
                    <div className="vote-card-bar">
                      <div className="vote-card-bar-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${c.color}, #7c3aed)` }} />
                    </div>
                    <div className="vote-card-stat-row">
                      <span className="vote-card-count">{count.toLocaleString()} votes</span>
                      <span className="vote-card-pct">{pct}%</span>
                    </div>
                  </div>

                  {/* Vote button */}
                  <button
                    className={`vote-btn ${hasVoted ? "vote-btn-done" : ""}`}
                    style={hasVoted ? {} : { background: `linear-gradient(135deg, ${c.color}, #7c3aed)` }}
                    onClick={() => handleVote(c.id)}
                    disabled={!!hasVoted || !!voting}
                  >
                    {isVoting ? "Voting..." : hasVoted ? "✅ Voted!" : `💕 Vote for ${c.name.split(" ")[0]}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rules */}
        <div className="vote-rules">
          <div className="vote-section-label">📋 Voting Rules</div>
          <div className="vote-rules-grid">
            {[
              { icon: "1️⃣", text: "One vote per contestant per session" },
              { icon: "📅", text: "Voting closes August 14, 2026 at midnight" },
              { icon: "👑", text: "Winner crowned live at the Las Vegas event" },
              { icon: "🔒", text: "All votes are anonymous and secure" },
              { icon: "💳", text: "Card holders get bonus voting power at the event" },
              { icon: "🎁", text: "Top 3 contestants win exclusive prizes" },
            ].map((r, i) => (
              <div key={i} className="vote-rule-item">
                <span>{r.icon}</span>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Toast */}
      {toast && (
        <div className="vote-toast">{toast}</div>
      )}
    </div>
  );
}
