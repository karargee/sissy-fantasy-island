"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const TIER_COLORS = { Free: "#888", "Starter Sissy Card": "#f5a9b8", "Standard Sissy Card": "#ff6b9d", "Gold Sissy Card": "#d63384", "Platinum Sissy Card": "#8b5cf6", "Diamond Sissy Card": "#6f42c1" };
const TIER_EMOJIS = { Free: "🆓", "Starter Sissy Card": "🌸", "Standard Sissy Card": "💳", "Gold Sissy Card": "👑", "Platinum Sissy Card": "✨", "Diamond Sissy Card": "💎" };

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso);
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followStats, setFollowStats] = useState({ followers: 0, following: 0 });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [sissyName, setSissyName] = useState("");
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.json())
      .then(async data => {
        if (!data.user) { router.push("/login"); return; }
        setUser(data.user);
        setBio(data.user.bio || "");
        setSissyName(data.user.sissyName || "");

        // Load posts
        const postsRes = await fetch("/api/posts");
        const allPosts = await postsRes.json();
        setPosts(Array.isArray(allPosts) ? allPosts.filter(p => p.authorId === data.user.id) : []);

        // Load follow stats
        const followRes = await fetch(`/api/follow?targetId=${data.user.id}`);
        const followData = await followRes.json();
        setFollowStats({ followers: followData.followers || 0, following: followData.following || 0 });

        setLoading(false);
      });
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  async function handleSave() {
    const res = await fetch("/api/auth/update", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ bio, sissyName }) });
    const data = await res.json();
    if (data.success) {
      setUser({ ...user, bio, sissyName });
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: "2rem" }}>💕</div>
    </div>
  );

  const tierColor = TIER_COLORS[user.tier] || "#888";
  const tierEmoji = TIER_EMOJIS[user.tier] || "🆓";
  const memberDate = new Date(user.memberSince).toLocaleDateString("en-US", { year: "numeric", month: "long" });

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#f0f0f0", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <Link href="/" style={{ color: "#f5a9b8", textDecoration: "none", fontSize: "0.9rem" }}>← Back to site</Link>
          <button onClick={handleLogout} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", padding: "0.5rem 1.2rem", borderRadius: 50, cursor: "pointer", fontSize: "0.85rem" }}>Sign Out</button>
        </div>

        {/* Profile Card */}
        <div style={{ background: "#151520", border: `1px solid ${tierColor}44`, borderRadius: 20, padding: "2rem", marginBottom: "1rem", textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${tierColor}, #6f42c1)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto 1rem" }}>{tierEmoji}</div>
          {editing ? (
            <input value={sissyName} onChange={e => setSissyName(e.target.value)} style={{ fontSize: "1.5rem", fontWeight: 800, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, color: "white", padding: "0.3rem 0.8rem", textAlign: "center", width: "100%", maxWidth: 300, outline: "none" }} />
          ) : (
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.3rem" }}>{user.sissyName}</h1>
          )}
          <div style={{ display: "inline-block", padding: "0.3rem 1rem", borderRadius: 20, background: `${tierColor}22`, border: `1px solid ${tierColor}44`, color: tierColor, fontSize: "0.85rem", fontWeight: 600, margin: "0.5rem 0" }}>{tierEmoji} {user.tier}</div>
          <p style={{ opacity: 0.4, fontSize: "0.8rem", marginTop: "0.3rem" }}>Member since {memberDate}</p>
        </div>

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, overflow: "hidden", marginBottom: "1rem" }}>
          {[
            { label: "Posts", value: posts.length },
            { label: "Followers", value: followStats.followers },
            { label: "Following", value: followStats.following },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center", padding: "1.2rem", background: "#151520" }}>
              <strong style={{ display: "block", fontSize: "1.6rem", fontWeight: 900, letterSpacing: -1 }}>{s.value}</strong>
              <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          {[
            { label: "💬 Community", href: "/community" },
            { label: "✉️ Messages", href: "/messages" },
            { label: "🔔 Notifications", href: "/notifications" },
          ].map(l => (
            <Link key={l.href} href={l.href} style={{ padding: "0.5rem 1rem", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.82rem", fontWeight: 600, transition: "border-color 0.2s" }}>{l.label}</Link>
          ))}
        </div>

        {/* Member ID Card */}
        <div style={{ background: "linear-gradient(135deg, #1a1a2e, #2d1b4e)", border: `1px solid ${tierColor}44`, borderRadius: 16, padding: "1.5rem", marginBottom: "1rem" }}>
          <div style={{ fontSize: "0.7rem", opacity: 0.5, letterSpacing: 2, textTransform: "uppercase", marginBottom: "0.8rem" }}>Member ID</div>
          <div style={{ fontFamily: "monospace", fontSize: "1rem", letterSpacing: 2, color: tierColor }}>{user.id}</div>
          <div style={{ display: "flex", gap: "2rem", marginTop: "1rem", flexWrap: "wrap" }}>
            <div><div style={{ fontSize: "0.6rem", opacity: 0.4, textTransform: "uppercase", letterSpacing: 1 }}>Name</div><div style={{ fontSize: "0.9rem" }}>{user.sissyName}</div></div>
            <div><div style={{ fontSize: "0.6rem", opacity: 0.4, textTransform: "uppercase", letterSpacing: 1 }}>Tier</div><div style={{ fontSize: "0.9rem" }}>{user.tier}</div></div>
            <div><div style={{ fontSize: "0.6rem", opacity: 0.4, textTransform: "uppercase", letterSpacing: 1 }}>Valid</div><div style={{ fontSize: "0.9rem" }}>Lifetime</div></div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1rem" }}>
          {["posts", "about"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "0.5rem 1.2rem", borderRadius: 6, border: `1px solid ${activeTab === tab ? "rgba(214,51,132,0.4)" : "rgba(255,255,255,0.08)"}`, background: activeTab === tab ? "rgba(214,51,132,0.12)" : "transparent", color: activeTab === tab ? "#f5a9b8" : "rgba(255,255,255,0.4)", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}>{tab}</button>
          ))}
        </div>

        {/* Posts Tab */}
        {activeTab === "posts" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "1.5rem" }}>
            {posts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "rgba(255,255,255,0.3)", background: "#151520", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📝</div>
                <p>No posts yet. <Link href="/community" style={{ color: "#f5a9b8", textDecoration: "none" }}>Share something →</Link></p>
              </div>
            ) : posts.map(post => (
              <div key={post.id} style={{ background: "#151520", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "1.2rem" }}>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "rgba(255,255,255,0.8)", marginBottom: "0.8rem", whiteSpace: "pre-wrap" }}>{post.content}</p>
                <div style={{ display: "flex", gap: "1rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
                  <span>❤️ {post.likes?.length || 0}</span>
                  <span>💬 {post.comments?.length || 0}</span>
                  <span>{timeAgo(post.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* About Tab */}
        {activeTab === "about" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
            {/* Bio */}
            <div style={{ background: "#151520", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "1rem" }}>About Me</h3>
                {!editing && <button onClick={() => setEditing(true)} style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "white", padding: "0.3rem 0.8rem", borderRadius: 8, cursor: "pointer", fontSize: "0.8rem" }}>Edit</button>}
              </div>
              {editing ? (
                <>
                  <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell the community about yourself..." rows={4} style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, color: "white", padding: "0.8rem", fontSize: "0.9rem", outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
                  <div style={{ display: "flex", gap: "0.8rem", marginTop: "0.8rem" }}>
                    <button onClick={handleSave} style={{ padding: "0.6rem 1.5rem", borderRadius: 50, border: "none", background: "linear-gradient(135deg, #d63384, #6f42c1)", color: "white", fontWeight: 600, cursor: "pointer" }}>Save</button>
                    <button onClick={() => setEditing(false)} style={{ padding: "0.6rem 1.2rem", borderRadius: 50, border: "1px solid rgba(255,255,255,0.15)", background: "none", color: "white", cursor: "pointer" }}>Cancel</button>
                  </div>
                </>
              ) : (
                <p style={{ opacity: bio ? 0.7 : 0.3, lineHeight: 1.6, fontSize: "0.9rem" }}>{bio || "No bio yet. Click Edit to add one."}</p>
              )}
              {saved && <div style={{ color: "#5bcefa", fontSize: "0.85rem", marginTop: "0.5rem" }}>✅ Profile updated!</div>}
            </div>

            {/* Account Info */}
            <div style={{ background: "#151520", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: "1rem" }}>Account Info</h3>
              {[
                { label: "Email", value: user.email },
                { label: "Membership", value: user.tier, color: tierColor },
                { label: "Member Since", value: memberDate },
              ].map((row, i, arr) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.7rem 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <span style={{ opacity: 0.5, fontSize: "0.9rem" }}>{row.label}</span>
                  <span style={{ fontSize: "0.9rem", color: row.color || "inherit" }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upgrade CTA */}
        {user.tier === "Free" && (
          <div style={{ background: "linear-gradient(135deg, rgba(214,51,132,0.1), rgba(111,66,193,0.1))", border: "1px solid rgba(214,51,132,0.2)", borderRadius: 16, padding: "1.5rem", textAlign: "center" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>💳</div>
            <h3 style={{ marginBottom: "0.5rem" }}>Get Your Sissy Card</h3>
            <p style={{ opacity: 0.6, fontSize: "0.9rem", marginBottom: "1rem" }}>Upgrade to unlock events, community access, and your official card starting at $50.</p>
            <Link href="/#cards" style={{ display: "inline-block", padding: "0.8rem 2rem", borderRadius: 50, background: "linear-gradient(135deg, #d63384, #6f42c1)", color: "white", textDecoration: "none", fontWeight: 700 }}>View Cards →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
