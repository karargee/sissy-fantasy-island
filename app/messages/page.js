"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const TIER_COLORS = {
  Free: "#888", "Starter Sissy Card": "#f5a9b8", "Standard Sissy Card": "#ff6b9d",
  "Gold Sissy Card": "#d63384", "Platinum Sissy Card": "#8b5cf6", "Diamond Sissy Card": "#6f42c1",
};

function timeAgo(date) {
  const s = Math.floor((new Date() - new Date(date)) / 1000);
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}

function MessagesInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeId = searchParams.get("with");

  const [session, setSession] = useState(null);
  const [convos, setConvos] = useState([]);
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState("");
  const [showNew, setShowNew] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(d => {
      if (!d.user) { router.push("/login"); return; }
      setSession(d.user);
    });
  }, [router]);

  useEffect(() => {
    if (!session) return;
    fetch("/api/messages").then(r => r.json()).then(d => setConvos(Array.isArray(d) ? d : []));
    fetch("/api/members").then(r => r.json()).then(d => setMembers(Array.isArray(d) ? d : []));
  }, [session]);

  useEffect(() => {
    if (!activeId || !session) return;
    fetch(`/api/messages?with=${activeId}`).then(r => r.json()).then(d => {
      setMessages(Array.isArray(d) ? d : []);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    });
  }, [activeId, session]);

  async function sendMessage(e) {
    e.preventDefault();
    if (!content.trim() || !activeId) return;
    setSending(true);
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toId: activeId, content }),
    });
    const msg = await res.json();
    setSending(false);
    if (msg.id) {
      setMessages(prev => [...prev, msg]);
      setContent("");
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
      fetch("/api/messages").then(r => r.json()).then(d => setConvos(Array.isArray(d) ? d : []));
    }
  }

  const activeMember = members.find(m => m.id === activeId) || convos.find(c => c.userId === activeId);
  const activeName = activeMember?.sissyName || activeMember?.userName || "Unknown";
  const filtered = members.filter(m => m.sissyName?.toLowerCase().includes(search.toLowerCase()));

  if (!session) return <div className="community-loading">Loading...</div>;

  return (
    <div className="messages-page">
      {/* Sidebar */}
      <div className="messages-sidebar">
        <div className="messages-sidebar-header">
          <Link href="/" className="auth-back" style={{ marginBottom: 0 }}>← Home</Link>
          <h2>Messages</h2>
          <button className="new-msg-btn" onClick={() => setShowNew(!showNew)}>✏️</button>
        </div>

        {showNew && (
          <div className="new-msg-search">
            <input
              placeholder="Search members..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="comment-input"
              style={{ width: "100%", boxSizing: "border-box" }}
            />
            <div className="member-search-results">
              {filtered.slice(0, 8).map(m => (
                <div key={m.id} className="member-search-item" onClick={() => { router.push(`/messages?with=${m.id}`); setShowNew(false); setSearch(""); }}>
                  <div className="post-avatar" style={{ width: 32, height: 32, fontSize: "0.8rem", background: `linear-gradient(135deg, ${TIER_COLORS[m.tier] || "#888"}, #6f42c1)` }}>{m.sissyName?.[0]}</div>
                  <span>{m.sissyName}</span>
                </div>
              ))}
              {filtered.length === 0 && <p style={{ padding: "0.5rem", color: "rgba(255,255,255,0.3)", fontSize: "0.82rem" }}>No members found</p>}
            </div>
          </div>
        )}

        <div className="convo-list">
          {convos.length === 0 && !showNew && (
            <div style={{ padding: "1.5rem", color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", textAlign: "center" }}>
              No conversations yet.<br />Click ✏️ to start one.
            </div>
          )}
          {convos.map(c => (
            <div key={c.userId} className={`convo-item ${activeId === c.userId ? "active" : ""}`} onClick={() => router.push(`/messages?with=${c.userId}`)}>
              <div className="post-avatar" style={{ width: 38, height: 38, fontSize: "0.9rem", flexShrink: 0, background: `linear-gradient(135deg, ${TIER_COLORS[c.userTier] || "#888"}, #6f42c1)` }}>{c.userName?.[0]}</div>
              <div className="convo-info">
                <strong>{c.userName}</strong>
                <span>{c.lastMessage?.content?.slice(0, 30)}{c.lastMessage?.content?.length > 30 ? "..." : ""}</span>
              </div>
              <span className="convo-time">{c.lastMessage ? timeAgo(c.lastMessage.createdAt) : ""}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="messages-chat">
        {activeId ? (
          <>
            <div className="chat-top-bar">
              <div className="post-avatar" style={{ width: 36, height: 36, fontSize: "0.9rem", background: `linear-gradient(135deg, ${TIER_COLORS[activeMember?.tier || activeMember?.userTier] || "#888"}, #6f42c1)` }}>{activeName?.[0]}</div>
              <strong>{activeName}</strong>
            </div>

            <div className="chat-messages-area">
              {messages.map(msg => (
                <div key={msg.id} className={`dm-msg ${msg.fromId === session.id ? "dm-msg-mine" : "dm-msg-theirs"}`}>
                  <div className="dm-bubble">{msg.content}</div>
                  <span className="dm-time">{timeAgo(msg.createdAt)}</span>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <form className="chat-input-form" onSubmit={sendMessage}>
              <input
                className="comment-input"
                style={{ flex: 1 }}
                placeholder={`Message ${activeName}...`}
                value={content}
                onChange={e => setContent(e.target.value)}
              />
              <button type="submit" disabled={sending || !content.trim()} className="comment-submit">
                {sending ? "..." : "Send"}
              </button>
            </form>
          </>
        ) : (
          <div className="chat-empty">
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💬</div>
            <p>Select a conversation or start a new one</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Messages() {
  return (
    <Suspense fallback={<div className="community-loading">Loading...</div>}>
      <MessagesInner />
    </Suspense>
  );
}
