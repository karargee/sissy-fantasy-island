"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const COLORS = ["#f5a9b8", "#d63384", "#a855f7", "#5bcefa", "#4ade80", "#f7931a", "#60a5fa", "#fb923c"];

function timeAgo(ts) {
  const diff = Math.floor((Date.now() - new Date(ts)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function ChatPage() {
  const [joined, setJoined] = useState(false);
  const [nickname, setNickname] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [onlineCount, setOnlineCount] = useState(1);
  const bottomRef = useRef(null);
  const pollRef = useRef(null);
  const lastIdRef = useRef(0);

  // Restore nickname from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem("chatroom_nick");
    const savedColor = sessionStorage.getItem("chatroom_color");
    if (saved) { setNickname(saved); setColor(savedColor || COLORS[0]); setJoined(true); }
  }, []);

  async function fetchMessages() {
    try {
      const res = await fetch("/api/chatroom");
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
        if (data.messages.length > 0) {
          lastIdRef.current = data.messages[data.messages.length - 1].id;
        }
      }
    } catch {}
  }

  useEffect(() => {
    if (!joined) return;
    fetchMessages();
    // Simulate online count fluctuation
    setOnlineCount(Math.floor(Math.random() * 18) + 4);
    pollRef.current = setInterval(fetchMessages, 3000);
    return () => clearInterval(pollRef.current);
  }, [joined]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleJoin(e) {
    e.preventDefault();
    if (!nickname.trim()) return;
    sessionStorage.setItem("chatroom_nick", nickname.trim());
    sessionStorage.setItem("chatroom_color", color);
    setJoined(true);
  }

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || sending) return;
    setSending(true);
    setError("");
    const text = input.trim();
    setInput("");

    // Optimistic
    const optimistic = { id: "opt_" + Date.now(), nickname, text, color, created_at: new Date().toISOString(), optimistic: true };
    setMessages(m => [...m, optimistic]);

    try {
      const res = await fetch("/api/chatroom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, text, color }),
      });
      const data = await res.json();
      if (!data.ok) setError(data.error || "Failed to send");
      else {
        // Replace optimistic with real
        setMessages(m => m.map(msg => msg.id === optimistic.id ? data.message : msg));
      }
    } catch {
      setError("Network error");
    } finally {
      setSending(false);
    }
  }

  if (!joined) {
    return (
      <div className="chatroom-join-wrap">
        <div className="bg-animation">
          <div className="bg-orb bg-orb-1" /><div className="bg-orb bg-orb-2" /><div className="bg-orb bg-orb-3" />
        </div>
        <div className="chatroom-join-box">
          <Link href="/" className="auth-back">← Back to home</Link>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🏳️‍⚧️</div>
          <h1 className="chatroom-join-title">Community Chat</h1>
          <p className="chatroom-join-sub">Pick a nickname and join the conversation. No account needed.</p>
          <form onSubmit={handleJoin} className="chatroom-join-form">
            <input
              className="form-input"
              placeholder="Your nickname..."
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              maxLength={30}
              autoFocus
            />
            <div className="chatroom-color-row">
              <span className="chatroom-color-label">Pick your color</span>
              <div className="chatroom-colors">
                {COLORS.map(c => (
                  <button
                    key={c}
                    type="button"
                    className={`chatroom-color-dot${color === c ? " chatroom-color-dot-active" : ""}`}
                    style={{ background: c }}
                    onClick={() => setColor(c)}
                  />
                ))}
              </div>
            </div>
            <button type="submit" className="auth-btn" disabled={!nickname.trim()}>
              Join Chat →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="chatroom-page">
      <div className="bg-animation">
        <div className="bg-orb bg-orb-1" /><div className="bg-orb bg-orb-2" /><div className="bg-orb bg-orb-3" />
      </div>

      {/* Header */}
      <div className="chatroom-header">
        <Link href="/" className="chatroom-back">← Home</Link>
        <div className="chatroom-header-center">
          <span style={{ fontSize: "1.2rem" }}>🏳️‍⚧️</span>
          <strong>Community Chat</strong>
        </div>
        <div className="chatroom-online">
          <span className="online-dot" />
          {onlineCount} online
        </div>
      </div>

      {/* Messages */}
      <div className="chatroom-messages">
        {messages.length === 0 && (
          <div className="chatroom-empty">No messages yet — say hi! 👋</div>
        )}
        {messages.map((m, i) => {
          const isMe = m.nickname === nickname;
          const showName = i === 0 || messages[i - 1].nickname !== m.nickname;
          return (
            <div key={m.id} className={`chatroom-msg${isMe ? " chatroom-msg-me" : ""}`}>
              {showName && !isMe && (
                <div className="chatroom-msg-name" style={{ color: m.color }}>{m.nickname}</div>
              )}
              <div className={`chatroom-bubble${isMe ? " chatroom-bubble-me" : ""}`} style={isMe ? {} : { borderColor: m.color + "33" }}>
                {m.text}
              </div>
              {showName && (
                <div className="chatroom-msg-time">{timeAgo(m.created_at)}</div>
              )}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="chatroom-input-wrap">
        {error && <div className="chatroom-error">{error}</div>}
        <form className="chatroom-input-bar" onSubmit={handleSend}>
          <div className="chatroom-nick-dot" style={{ background: color }} title={nickname} />
          <input
            className="chatroom-input"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            maxLength={500}
            autoComplete="off"
          />
          <button type="submit" className="chatroom-send-btn" disabled={!input.trim() || sending}>
            {sending ? "…" : "Send"}
          </button>
        </form>
        <div className="chatroom-input-meta">
          Chatting as <span style={{ color }}>{nickname}</span>
          <button className="chatroom-change-nick" onClick={() => { sessionStorage.removeItem("chatroom_nick"); setJoined(false); }}>
            Change
          </button>
        </div>
      </div>
    </div>
  );
}
