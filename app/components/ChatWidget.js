"use client";
import { useState, useRef, useEffect } from "react";

function getSessionId() {
  if (typeof window === "undefined") return null;
  let id = sessionStorage.getItem("chat_session");
  if (!id) {
    id = "user_" + Math.random().toString(36).slice(2, 10) + "_" + Date.now();
    sessionStorage.setItem("chat_session", id);
  }
  return id;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 0, from: "admin", text: "Hey! 👋 Welcome to Trans Party. Ask us anything — tickets, dress code, consent, masked sessions, and more!" },
  ]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const bottomRef = useRef(null);
  const pollRef = useRef(null);

  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  // Poll for new messages every 3 seconds when chat is open
  useEffect(() => {
    if (!open || !sessionId) return;

    async function poll() {
      try {
        const res = await fetch(`/api/chat?sessionId=${sessionId}`);
        const data = await res.json();
        if (data.messages && data.messages.length > 0) {
          setMessages([
            { id: 0, from: "admin", text: "Hey! 👋 Welcome to Trans Party. Ask us anything — tickets, dress code, consent, masked sessions, and more!" },
            ...data.messages.map((m) => ({ id: m.id, from: m.from === "admin" ? "bot" : "user", text: m.text })),
          ]);
        }
      } catch {}
    }

    poll();
    pollRef.current = setInterval(poll, 3000);
    return () => clearInterval(pollRef.current);
  }, [open, sessionId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(e) {
    e.preventDefault();
    if (!input.trim() || !sessionId) return;
    const userMsg = input.trim();
    setInput("");

    // Optimistic update
    setMessages((m) => [...m, { id: Date.now(), from: "user", text: userMsg }]);

    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, text: userMsg, from: "user" }),
      });
    } catch {}
  }

  return (
    <>
      <button className="chat-toggle" onClick={() => setOpen(!open)}>
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <span>🏳️⚧️ Trans Party Chat</span>
            <button className="chat-close" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="chat-messages">
            {messages.map((m) => (
              <div key={m.id} className={`chat-msg chat-msg-${m.from === "bot" || m.from === "admin" ? "bot" : "user"}`}>
                {m.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <form className="chat-input-bar" onSubmit={send}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="chat-input"
            />
            <button type="submit" className="chat-send">→</button>
          </form>
        </div>
      )}
    </>
  );
}
