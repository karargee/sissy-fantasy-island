"use client";
import { useState } from "react";
import Link from "next/link";

const TIER_COLORS = {
  Free: "#888", "Starter Sissy Card": "#f5a9b8", "Standard Sissy Card": "#ff6b9d",
  "Gold Sissy Card": "#d63384", "Platinum Sissy Card": "#8b5cf6", "Diamond Sissy Card": "#6f42c1",
};

function timeAgo(date) {
  const s = Math.floor((new Date() - new Date(date)) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("members");
  const [results, setResults] = useState({ members: [], posts: [] });
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);

    const [membersRes, postsRes] = await Promise.all([
      fetch("/api/members").then(r => r.json()),
      fetch("/api/posts").then(r => r.json()),
    ]);

    const q = query.toLowerCase();
    const members = Array.isArray(membersRes) ? membersRes.filter(m => m.sissyName?.toLowerCase().includes(q)) : [];
    const posts = Array.isArray(postsRes) ? postsRes.filter(p => p.content?.toLowerCase().includes(q)) : [];

    setResults({ members, posts });
    setLoading(false);
  }

  return (
    <div className="community-page">
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Link href="/community" className="auth-back">← Back to Community</Link>
        <h1 className="community-title" style={{ margin: "1rem 0 1.5rem" }}>Search</h1>

        <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
          <input
            className="comment-input"
            style={{ flex: 1, padding: "0.9rem 1rem", fontSize: "1rem" }}
            placeholder="Search members or posts..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit" className="post-submit-btn" style={{ padding: "0.9rem 1.5rem" }}>Search</button>
        </form>

        {searched && (
          <>
            <div className="search-tabs">
              <button className={`search-tab ${tab === "members" ? "active" : ""}`} onClick={() => setTab("members")}>
                Members ({results.members.length})
              </button>
              <button className={`search-tab ${tab === "posts" ? "active" : ""}`} onClick={() => setTab("posts")}>
                Posts ({results.posts.length})
              </button>
            </div>

            {loading ? (
              <div className="community-loading">Searching...</div>
            ) : tab === "members" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {results.members.length === 0 ? (
                  <div className="community-empty"><p>No members found</p></div>
                ) : results.members.map(m => (
                  <Link key={m.id} href={`/members/${m.id}`} style={{ textDecoration: "none" }}>
                    <div className="search-member-item">
                      <div className="post-avatar" style={{ width: 42, height: 42, background: `linear-gradient(135deg, ${TIER_COLORS[m.tier] || "#888"}, #6f42c1)` }}>
                        {m.sissyName?.[0]}
                      </div>
                      <div>
                        <strong style={{ display: "block", fontSize: "0.95rem" }}>{m.sissyName}</strong>
                        <span style={{ fontSize: "0.75rem", color: TIER_COLORS[m.tier] || "#888" }}>{m.tier}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {results.posts.length === 0 ? (
                  <div className="community-empty"><p>No posts found</p></div>
                ) : results.posts.map(p => (
                  <div key={p.id} className="post-card">
                    <div className="post-header">
                      <div className="post-avatar" style={{ width: 34, height: 34, fontSize: "0.85rem", background: `linear-gradient(135deg, ${TIER_COLORS[p.authorTier] || "#888"}, #6f42c1)` }}>
                        {p.authorName?.[0]}
                      </div>
                      <div className="post-meta">
                        <Link href={`/members/${p.authorId}`} style={{ textDecoration: "none", color: "white" }}><strong>{p.authorName}</strong></Link>
                        <span className="post-time">{timeAgo(p.createdAt)}</span>
                      </div>
                    </div>
                    <p className="post-content">{p.content}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
