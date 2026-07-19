"use client";
import { useState, useEffect, useCallback } from "react";
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

function PostCard({ post, session, onLike, onComment, onDelete }) {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const liked = session && post.likes?.includes(session.id);
  const isOwner = session && post.authorId === session.id;
  const tierColor = TIER_COLORS[post.authorTier] || "#888";

  async function submitComment(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmitting(true);
    await onComment(post.id, comment);
    setComment("");
    setSubmitting(false);
  }

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-avatar" style={{ background: `linear-gradient(135deg, ${tierColor}, #6f42c1)` }}>
          {post.authorName?.[0] || "?"}
        </div>
        <div className="post-meta">
          <Link href={`/members/${post.authorId}`} style={{ textDecoration: "none", color: "white" }}><strong>{post.authorName}</strong></Link>
          <div className="post-meta-row">
            <span className="post-tier" style={{ color: tierColor }}>{TIER_BADGES[post.authorTier] || "Free"}</span>
            <span className="post-time">{timeAgo(post.createdAt)}</span>
          </div>
        </div>
        {isOwner && (
          <button className="post-delete-btn" onClick={() => onDelete(post.id)} title="Delete post">🗑</button>
        )}
      </div>

      <p className="post-content">{post.content}</p>

      <div className="post-actions">
        <button className={`post-action-btn ${liked ? "liked" : ""}`} onClick={() => onLike(post.id)}>
          {liked ? "❤️" : "🤍"} {post.likes?.length || 0}
        </button>
        <button className="post-action-btn" onClick={() => setShowComments(!showComments)}>
          💬 {post.comments?.length || 0}
        </button>
      </div>

      {showComments && (
        <div className="post-comments">
          {post.comments?.map((c) => (
            <div key={c.id} className="comment">
              <div className="comment-avatar" style={{ background: `linear-gradient(135deg, ${TIER_COLORS[c.authorTier] || "#888"}, #6f42c1)` }}>
                {c.authorName?.[0] || "?"}
              </div>
              <div className="comment-body">
                <div className="comment-author">
                  <Link href={`/members/${c.authorId}`} style={{ textDecoration: "none", color: "white" }}><strong>{c.authorName}</strong></Link>
                  <span>{timeAgo(c.createdAt)}</span>
                </div>
                <p>{c.content}</p>
              </div>
            </div>
          ))}
          {session ? (
            <form className="comment-form" onSubmit={submitComment}>
              <input placeholder="Write a comment..." value={comment} onChange={(e) => setComment(e.target.value)} className="comment-input" />
              <button type="submit" disabled={submitting} className="comment-submit">{submitting ? "..." : "Post"}</button>
            </form>
          ) : (
            <p className="comment-login"><Link href="/login">Sign in</Link> to comment</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [session, setSession] = useState(null);
  const [online, setOnline] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  const pingOnline = useCallback(() => {
    fetch("/api/online", { method: "POST" });
  }, []);

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(d => {
      setSession(d.user || null);
      if (d.user) pingOnline();
    });
    fetch("/api/posts").then(r => r.json()).then(d => { setPosts(Array.isArray(d) ? d : []); setLoading(false); });
    fetch("/api/online").then(r => r.json()).then(d => setOnline(Array.isArray(d) ? d : []));

    const interval = setInterval(() => {
      pingOnline();
      fetch("/api/posts").then(r => r.json()).then(d => { if (Array.isArray(d)) setPosts(d); });
      fetch("/api/online").then(r => r.json()).then(d => setOnline(Array.isArray(d) ? d : []));
    }, 30000);
    return () => clearInterval(interval);
  }, [pingOnline]);

  async function handlePost(e) {
    e.preventDefault();
    if (!content.trim()) return;
    setPosting(true); setError("");
    const res = await fetch("/api/posts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content }) });
    const data = await res.json();
    setPosting(false);
    if (data.error) return setError(data.error);
    setPosts([data, ...posts]);
    setContent("");
  }

  async function handleLike(postId) {
    if (!session) return;
    const res = await fetch("/api/posts/like", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ postId }) });
    const data = await res.json();
    if (data.likes) setPosts(posts.map(p => p.id === postId ? { ...p, likes: data.likes } : p));
  }

  async function handleComment(postId, content) {
    const res = await fetch("/api/posts/comment", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ postId, content }) });
    const comment = await res.json();
    if (comment.id) setPosts(posts.map(p => p.id === postId ? { ...p, comments: [...(p.comments || []), comment] } : p));
  }

  async function handleDelete(postId) {
    if (!confirm("Delete this post?")) return;
    const res = await fetch("/api/posts/delete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ postId }) });
    const data = await res.json();
    if (data.success) setPosts(posts.filter(p => p.id !== postId));
  }

  return (
    <div className="community-page">
      <div className="community-container">
        <div className="community-header">
          <Link href="/" className="auth-back">← Back to site</Link>
          <div className="community-header-row">
            <div>
              <h1 className="community-title">Community Feed</h1>
              <p className="community-sub">Connect with sissies worldwide 🌸</p>
            </div>
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
              <Link href="/search" className="community-profile-btn">🔍 Search</Link>
              {session ? (
                <Link href="/profile" className="community-profile-btn">
                  <div className="community-profile-avatar">{session.sissyName?.[0]}</div>
                  <span>{session.sissyName}</span>
                </Link>
              ) : (
                <Link href="/login" className="auth-btn" style={{ width: "auto", padding: "0.6rem 1.5rem" }}>Sign In</Link>
              )}
            </div>
          </div>
        </div>

        <div className="community-layout">
          <div className="community-feed">
            {session ? (
              <div className="post-composer">
                <div className="post-composer-header">
                  <div className="post-avatar" style={{ background: "linear-gradient(135deg, #d63384, #6f42c1)" }}>{session.sissyName?.[0]}</div>
                  <span>What&apos;s on your mind, {session.sissyName}?</span>
                </div>
                <form onSubmit={handlePost}>
                  <textarea className="post-textarea" placeholder="Share something with the community..." value={content} onChange={(e) => setContent(e.target.value)} rows={3} maxLength={500} />
                  <div className="post-composer-footer">
                    <span className="post-char-count">{content.length}/500</span>
                    {error && <span className="post-error">{error}</span>}
                    <button type="submit" disabled={posting || !content.trim()} className="post-submit-btn">{posting ? "Posting..." : "Post"}</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="post-login-prompt">
                <p>Join the conversation — <Link href="/register">Create an account</Link> or <Link href="/login">Sign in</Link></p>
              </div>
            )}

            {loading ? (
              <div className="community-loading">Loading posts...</div>
            ) : posts.length === 0 ? (
              <div className="community-empty">
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌸</div>
                <p>No posts yet. Be the first to share!</p>
              </div>
            ) : (
              posts.map(post => (
                <PostCard key={post.id} post={post} session={session} onLike={handleLike} onComment={handleComment} onDelete={handleDelete} />
              ))
            )}
          </div>

          <div className="community-sidebar">
            <div className="sidebar-card">
              <h3>Community Rules</h3>
              <ul className="sidebar-rules">
                <li>🤝 Be respectful always</li>
                <li>🔒 No sharing personal info</li>
                <li>💕 Support each other</li>
                <li>🚫 No harassment or hate</li>
                <li>✨ Keep it positive</li>
              </ul>
            </div>
            <div className="sidebar-card">
              <h3>Members Online</h3>
              {online.length === 0 ? (
                <div className="sidebar-online"><span className="online-dot"></span><span>No one online yet</span></div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {online.slice(0, 8).map(u => (
                    <div key={u.id} className="sidebar-online">
                      <span className="online-dot"></span>
                      <span style={{ fontSize: "0.82rem" }}>{u.name}</span>
                    </div>
                  ))}
                  {online.length > 8 && <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)" }}>+{online.length - 8} more</span>}
                </div>
              )}
            </div>
            {!session && (
              <div className="sidebar-card sidebar-cta">
                <h3>Join the Community</h3>
                <p>Create a free account to post, like, and connect.</p>
                <Link href="/register" className="auth-btn" style={{ display: "block", textAlign: "center", textDecoration: "none", marginTop: "1rem" }}>Create Account</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
