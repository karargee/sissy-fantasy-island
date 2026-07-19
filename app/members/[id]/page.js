"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const TIER_COLORS = {
  Free: "#888", "Starter Sissy Card": "#f5a9b8", "Standard Sissy Card": "#ff6b9d",
  "Gold Sissy Card": "#d63384", "Platinum Sissy Card": "#8b5cf6", "Diamond Sissy Card": "#6f42c1",
};
const TIER_BADGES = {
  Free: "Free", "Starter Sissy Card": "🌸 Starter", "Standard Sissy Card": "💳 Standard",
  "Gold Sissy Card": "👑 Gold", "Platinum Sissy Card": "✨ Platinum", "Diamond Sissy Card": "💎 Diamond",
};

function timeAgo(date) {
  const s = Math.floor((new Date() - new Date(date)) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export default function MemberProfile() {
  const { id } = useParams();
  const router = useRouter();
  const [member, setMember] = useState(null);
  const [posts, setPosts] = useState([]);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(d => setSession(d.user || null));
    fetch(`/api/members/${id}`).then(r => r.json()).then(d => {
      if (d.error) { router.push("/community"); return; }
      setMember(d.member);
      setPosts(d.posts || []);
      setLoading(false);
    });
  }, [id, router]);

  if (loading) return <div className="community-page"><div className="community-loading">Loading...</div></div>;
  if (!member) return null;

  const tierColor = TIER_COLORS[member.tier] || "#888";
  const memberDate = new Date(member.memberSince).toLocaleDateString("en-US", { year: "numeric", month: "long" });

  return (
    <div className="community-page">
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Link href="/community" className="auth-back">← Back to Community</Link>

        {/* Profile Header */}
        <div className="member-profile-card">
          <div className="member-profile-avatar" style={{ background: `linear-gradient(135deg, ${tierColor}, #6f42c1)` }}>
            {member.sissyName?.[0]}
          </div>
          <div className="member-profile-info">
            <h1>{member.sissyName}</h1>
            <span className="member-profile-tier" style={{ color: tierColor }}>
              {TIER_BADGES[member.tier] || "Free"}
            </span>
            <p className="member-profile-since">Member since {memberDate}</p>
            {member.bio && <p className="member-profile-bio">{member.bio}</p>}
          </div>
          {session && session.id !== member.id && (
            <Link href={`/messages?with=${member.id}`} className="member-msg-btn">
              💬 Message
            </Link>
          )}
        </div>

        {/* Stats */}
        <div className="member-stats">
          <div className="member-stat"><strong>{posts.length}</strong><span>Posts</span></div>
          <div className="member-stat"><strong>{posts.reduce((a, p) => a + (p.likes?.length || 0), 0)}</strong><span>Likes received</span></div>
          <div className="member-stat"><strong>{posts.reduce((a, p) => a + (p.comments?.length || 0), 0)}</strong><span>Comments</span></div>
        </div>

        {/* Posts */}
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1rem" }}>Posts</h2>
        {posts.length === 0 ? (
          <div className="community-empty" style={{ padding: "2rem" }}>
            <p>No posts yet</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {posts.map(post => (
              <div key={post.id} className="post-card">
                <p className="post-content">{post.content}</p>
                <div className="post-actions">
                  <span className="post-action-btn">❤️ {post.likes?.length || 0}</span>
                  <span className="post-action-btn">💬 {post.comments?.length || 0}</span>
                  <span style={{ marginLeft: "auto", fontSize: "0.72rem", color: "rgba(255,255,255,0.3)" }}>{timeAgo(post.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
