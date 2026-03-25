"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const ADMIN_PASSWORD = "transparty2026";

const MOCK_TICKETS = [
  { id: 1, email: "alex@example.com", tier: "Dom Pass", qty: 2, method: "btc", status: "verified", date: "2025-06-01", total: 2000 },
  { id: 2, email: "jordan@example.com", tier: "Sub Entry", qty: 1, method: "btc", status: "pending", date: "2025-06-02", total: 500 },
  { id: 3, email: "kira@example.com", tier: "Masked Session", qty: 1, method: "gift", status: "pending", date: "2025-06-02", total: 750 },
  { id: 4, email: "raven@example.com", tier: "Dungeon Master", qty: 1, method: "btc", status: "verified", date: "2025-06-03", total: 1500 },
  { id: 5, email: "mx.nova@example.com", tier: "Sub Entry", qty: 3, method: "gift", status: "rejected", date: "2025-06-03", total: 1500 },
];

const MOCK_GIFT_CARDS = [
  { id: 1, email: "jordan@example.com", code: "GC-8832-XKPL", image: null, tier: "Sub Entry", status: "pending", date: "2025-06-02" },
  { id: 2, email: "kira@example.com", code: "", image: "giftcard_photo.jpg", tier: "Masked Session", status: "pending", date: "2025-06-02" },
  { id: 3, email: "mx.nova@example.com", code: "GC-1100-FAKE", image: null, tier: "Sub Entry", status: "rejected", date: "2025-06-03" },
];

const MOCK_BTC = [
  { id: 1, email: "alex@example.com", tier: "Dom Pass", txid: "a1b2c3d4e5f6...", status: "verified", date: "2025-06-01" },
  { id: 2, email: "jordan@example.com", tier: "Sub Entry", txid: "", status: "pending", date: "2025-06-02" },
  { id: 3, email: "raven@example.com", tier: "Dungeon Master", txid: "f6e5d4c3b2a1...", status: "verified", date: "2025-06-03" },
];

const MOCK_MESSAGES = [
  { id: 1, name: "Sam K.", email: "sam@example.com", subject: "Accessibility question", message: "Is there wheelchair access to the masked wing?", date: "2025-06-01", read: false },
  { id: 2, name: "Domme Lux", email: "lux@example.com", subject: "Performer inquiry", message: "I'd love to perform at the event. Who do I contact?", date: "2025-06-02", read: true },
  { id: 3, name: "Anonymous", email: "anon@example.com", subject: "Refund request", message: "I can't make it anymore. Can I transfer my ticket?", date: "2025-06-03", read: false },
];

const MOCK_SUBSCRIBERS = [
  { id: 1, email: "fan1@example.com", date: "2025-05-20" },
  { id: 2, email: "fan2@example.com", date: "2025-05-22" },
  { id: 3, email: "fan3@example.com", date: "2025-05-25" },
  { id: 4, email: "fan4@example.com", date: "2025-06-01" },
  { id: 5, email: "fan5@example.com", date: "2025-06-03" },
];

const TABS = [
  { key: "overview", label: "📊 Overview" },
  { key: "livechat", label: "💬 Live Chat" },
  { key: "tickets", label: "🎟️ Tickets" },
  { key: "attendees", label: "👥 Attendees" },
  { key: "giftcards", label: "🎁 Gift Cards" },
  { key: "btc", label: "₿ BTC Payments" },
  { key: "messages", label: "📬 Messages" },
  { key: "subscribers", label: "📧 Subscribers" },
  { key: "settings", label: "⚙️ Settings" },
];

function StatusBadge({ status }) {
  const colors = {
    verified: { bg: "rgba(40,167,69,0.15)", color: "#28a745" },
    pending: { bg: "rgba(255,193,7,0.15)", color: "#ffc107" },
    rejected: { bg: "rgba(220,53,69,0.15)", color: "#dc3545" },
    approved: { bg: "rgba(40,167,69,0.15)", color: "#28a745" },
  };
  const c = colors[status] || colors.pending;
  return (
    <span style={{ background: c.bg, color: c.color, padding: "0.2rem 0.7rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase" }}>
      {status}
    </span>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [tab, setTab] = useState("overview");
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [giftCards, setGiftCards] = useState(MOCK_GIFT_CARDS);
  const [btcPayments, setBtcPayments] = useState(MOCK_BTC);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [settings, setSettings] = useState({
    eventDate: "2026-03-30",
    eventTime: "19:00",
    location: "San Francisco, CA — Private",
    subPrice: 500,
    domPrice: 1000,
    dmPrice: 1500,
    maskedPrice: 750,
    subSlots: 20,
    domSlots: 20,
    dmSlots: 20,
    maskedSlots: 15,
  });

  // Live Chat state
  const [allChats, setAllChats] = useState({});
  const [activeChat, setActiveChat] = useState(null);
  const [adminReply, setAdminReply] = useState("");
  const chatBottomRef = useRef(null);
  const chatPollRef = useRef(null);

  // Poll all chats when on livechat tab
  useEffect(() => {
    if (!authed || tab !== "livechat") return;
    async function fetchChats() {
      try {
        const res = await fetch("/api/chat?admin=true");
        const data = await res.json();
        setAllChats(data.chats || {});
      } catch {}
    }
    fetchChats();
    chatPollRef.current = setInterval(fetchChats, 2000);
    return () => clearInterval(chatPollRef.current);
  }, [authed, tab]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allChats, activeChat]);

  async function sendAdminReply(e) {
    e.preventDefault();
    if (!adminReply.trim() || !activeChat) return;
    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: activeChat, text: adminReply.trim(), from: "admin" }),
      });
      setAdminReply("");
    } catch {}
  }

  const totalUnreadChats = Object.values(allChats).filter((c) => c.unreadAdmin > 0).length;

  function handleLogin(e) {
    e.preventDefault();
    if (pass === ADMIN_PASSWORD) setAuthed(true);
    else alert("Wrong password");
  }

  function updateTicketStatus(id, status) {
    setTickets((t) => t.map((x) => (x.id === id ? { ...x, status } : x)));
  }

  function updateGiftStatus(id, status) {
    setGiftCards((g) => g.map((x) => (x.id === id ? { ...x, status } : x)));
  }

  function updateBtcStatus(id, status) {
    setBtcPayments((b) => b.map((x) => (x.id === id ? { ...x, status } : x)));
  }

  function toggleRead(id) {
    setMessages((m) => m.map((x) => (x.id === id ? { ...x, read: !x.read } : x)));
  }

  if (!authed) {
    return (
      <div className="age-gate-overlay">
        <div className="age-gate-box">
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔐</div>
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin} style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="form-input"
              style={{ textAlign: "center" }}
            />
            <button type="submit" className="buy-btn donate-btn">Login</button>
          </form>
        </div>
      </div>
    );
  }

  const totalRevenue = tickets.filter((t) => t.status === "verified").reduce((s, t) => s + t.total, 0);
  const totalSold = tickets.filter((t) => t.status === "verified").reduce((s, t) => s + t.qty, 0);
  const pendingCount = tickets.filter((t) => t.status === "pending").length;
  const unreadMessages = messages.filter((m) => !m.read).length;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-logo">🏳️⚧️ Admin</div>
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`admin-tab ${tab === t.key ? "admin-tab-active" : ""}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
            {t.key === "livechat" && totalUnreadChats > 0 && (
              <span className="admin-badge">{totalUnreadChats}</span>
            )}
            {t.key === "messages" && unreadMessages > 0 && (
              <span className="admin-badge">{unreadMessages}</span>
            )}
            {t.key === "tickets" && pendingCount > 0 && (
              <span className="admin-badge">{pendingCount}</span>
            )}
          </button>
        ))}
        <Link href="/" className="admin-tab" style={{ marginTop: "auto", opacity: 0.5 }}>← Back to Site</Link>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        {/* Overview */}
        {tab === "overview" && (
          <div>
            <h1 className="admin-title">Dashboard Overview</h1>
            <div className="admin-stats">
              <div className="admin-stat-card">
                <div className="admin-stat-num">${totalRevenue.toLocaleString()}</div>
                <div className="admin-stat-label">Total Revenue</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-num">{totalSold}</div>
                <div className="admin-stat-label">Tickets Sold</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-num">{pendingCount}</div>
                <div className="admin-stat-label">Pending Payments</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-num">{MOCK_SUBSCRIBERS.length}</div>
                <div className="admin-stat-label">Subscribers</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-num">{unreadMessages}</div>
                <div className="admin-stat-label">Unread Messages</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-num">{giftCards.filter((g) => g.status === "pending").length}</div>
                <div className="admin-stat-label">Pending Gift Cards</div>
              </div>
            </div>
            <h2 style={{ fontSize: "1.3rem", margin: "2rem 0 1rem" }}>Sales by Tier</h2>
            <div className="admin-stats">
              {["Sub Entry", "Dom Pass", "Dungeon Master", "Masked Session"].map((tier) => {
                const count = tickets.filter((t) => t.tier === tier && t.status === "verified").reduce((s, t) => s + t.qty, 0);
                const rev = tickets.filter((t) => t.tier === tier && t.status === "verified").reduce((s, t) => s + t.total, 0);
                return (
                  <div key={tier} className="admin-stat-card">
                    <div className="admin-stat-num">{count}</div>
                    <div className="admin-stat-label">{tier}</div>
                    <div style={{ fontSize: "0.85rem", opacity: 0.5, marginTop: "0.3rem" }}>${rev.toLocaleString()}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Live Chat */}
        {tab === "livechat" && (
          <div>
            <h1 className="admin-title">Live Chat</h1>
            <div className="admin-chat-layout">
              {/* Chat list */}
              <div className="admin-chat-list">
                {Object.keys(allChats).length === 0 && (
                  <p style={{ opacity: 0.4, padding: "1rem", textAlign: "center" }}>No active chats yet</p>
                )}
                {Object.entries(allChats).map(([sid, chat]) => (
                  <button
                    key={sid}
                    className={`admin-chat-item ${activeChat === sid ? "admin-chat-item-active" : ""}`}
                    onClick={() => setActiveChat(sid)}
                  >
                    <div className="admin-chat-item-top">
                      <span className="admin-chat-item-name">{sid.slice(0, 15)}...</span>
                      {chat.unreadAdmin > 0 && <span className="admin-badge">{chat.unreadAdmin}</span>}
                    </div>
                    <span className="admin-chat-item-preview">
                      {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text.slice(0, 40) + "..." : "No messages"}
                    </span>
                  </button>
                ))}
              </div>

              {/* Chat conversation */}
              <div className="admin-chat-convo">
                {!activeChat ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", opacity: 0.3 }}>
                    Select a conversation
                  </div>
                ) : (
                  <>
                    <div className="admin-chat-messages">
                      {(allChats[activeChat]?.messages || []).map((m) => (
                        <div key={m.id} className={`admin-chat-bubble ${m.from === "admin" ? "admin-chat-bubble-admin" : "admin-chat-bubble-user"}`}>
                          <div className="admin-chat-bubble-from">{m.from === "admin" ? "You" : "User"}</div>
                          {m.text}
                          <div className="admin-chat-bubble-time">{new Date(m.time).toLocaleTimeString()}</div>
                        </div>
                      ))}
                      <div ref={chatBottomRef} />
                    </div>
                    <form className="admin-chat-input" onSubmit={sendAdminReply}>
                      <input
                        type="text"
                        value={adminReply}
                        onChange={(e) => setAdminReply(e.target.value)}
                        placeholder="Type a reply..."
                        className="chat-input"
                      />
                      <button type="submit" className="chat-send">→</button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tickets */}
        {tab === "tickets" && (
          <div>
            <h1 className="admin-title">Ticket Sales</h1>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>ID</th><th>Email</th><th>Tier</th><th>Qty</th><th>Total</th><th>Method</th><th>Status</th><th>Date</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {tickets.map((t) => (
                    <tr key={t.id}>
                      <td>#{t.id}</td>
                      <td>{t.email}</td>
                      <td>{t.tier}</td>
                      <td>{t.qty}</td>
                      <td>${t.total.toLocaleString()}</td>
                      <td>{t.method === "btc" ? "₿ BTC" : "🎁 Gift"}</td>
                      <td><StatusBadge status={t.status} /></td>
                      <td>{t.date}</td>
                      <td className="admin-actions">
                        {t.status === "pending" && (
                          <>
                            <button className="admin-btn-approve" onClick={() => updateTicketStatus(t.id, "verified")}>✓</button>
                            <button className="admin-btn-reject" onClick={() => updateTicketStatus(t.id, "rejected")}>✕</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Attendees */}
        {tab === "attendees" && (
          <div>
            <h1 className="admin-title">Confirmed Attendees</h1>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Email</th><th>Tier</th><th>Qty</th><th>Location Sent</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {tickets.filter((t) => t.status === "verified").map((t) => (
                    <tr key={t.id}>
                      <td>{t.email}</td>
                      <td>{t.tier}</td>
                      <td>{t.qty}</td>
                      <td><StatusBadge status={t.locationSent ? "verified" : "pending"} /></td>
                      <td>
                        <button
                          className="admin-btn-approve"
                          onClick={() => setTickets((ts) => ts.map((x) => x.id === t.id ? { ...x, locationSent: true } : x))}
                          style={{ fontSize: "0.75rem", padding: "0.3rem 0.8rem", borderRadius: "6px" }}
                        >
                          📍 Send Location
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Gift Cards */}
        {tab === "giftcards" && (
          <div>
            <h1 className="admin-title">Gift Card Submissions</h1>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>ID</th><th>Email</th><th>Code</th><th>Image</th><th>Tier</th><th>Status</th><th>Date</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {giftCards.map((g) => (
                    <tr key={g.id}>
                      <td>#{g.id}</td>
                      <td>{g.email}</td>
                      <td>{g.code || "—"}</td>
                      <td>{g.image ? `📎 ${g.image}` : "—"}</td>
                      <td>{g.tier}</td>
                      <td><StatusBadge status={g.status} /></td>
                      <td>{g.date}</td>
                      <td className="admin-actions">
                        {g.status === "pending" && (
                          <>
                            <button className="admin-btn-approve" onClick={() => updateGiftStatus(g.id, "approved")}>✓</button>
                            <button className="admin-btn-reject" onClick={() => updateGiftStatus(g.id, "rejected")}>✕</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BTC Payments */}
        {tab === "btc" && (
          <div>
            <h1 className="admin-title">Bitcoin Payments</h1>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>ID</th><th>Email</th><th>Tier</th><th>TX ID</th><th>Status</th><th>Date</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {btcPayments.map((b) => (
                    <tr key={b.id}>
                      <td>#{b.id}</td>
                      <td>{b.email}</td>
                      <td>{b.tier}</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.8rem" }}>{b.txid || "—"}</td>
                      <td><StatusBadge status={b.status} /></td>
                      <td>{b.date}</td>
                      <td className="admin-actions">
                        {b.status === "pending" && (
                          <>
                            <button className="admin-btn-approve" onClick={() => updateBtcStatus(b.id, "verified")}>✓</button>
                            <button className="admin-btn-reject" onClick={() => updateBtcStatus(b.id, "rejected")}>✕</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Messages */}
        {tab === "messages" && (
          <div>
            <h1 className="admin-title">Contact Messages</h1>
            <div className="admin-messages">
              {messages.map((m) => (
                <div key={m.id} className={`admin-msg-card ${!m.read ? "admin-msg-unread" : ""}`}>
                  <div className="admin-msg-header">
                    <div>
                      <strong>{m.name}</strong>
                      <span style={{ opacity: 0.5, marginLeft: "0.5rem", fontSize: "0.85rem" }}>{m.email}</span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span style={{ fontSize: "0.8rem", opacity: 0.4 }}>{m.date}</span>
                      <button
                        className="admin-btn-approve"
                        style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem" }}
                        onClick={() => toggleRead(m.id)}
                      >
                        {m.read ? "Mark Unread" : "Mark Read"}
                      </button>
                    </div>
                  </div>
                  <div style={{ fontWeight: 600, margin: "0.5rem 0 0.3rem" }}>{m.subject}</div>
                  <p style={{ opacity: 0.7, lineHeight: 1.6, fontSize: "0.95rem" }}>{m.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subscribers */}
        {tab === "subscribers" && (
          <div>
            <h1 className="admin-title">Email Subscribers ({MOCK_SUBSCRIBERS.length})</h1>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>#</th><th>Email</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {MOCK_SUBSCRIBERS.map((s, i) => (
                    <tr key={s.id}>
                      <td>{i + 1}</td>
                      <td>{s.email}</td>
                      <td>{s.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings */}
        {tab === "settings" && (
          <div>
            <h1 className="admin-title">Event Settings</h1>
            <div className="admin-settings">
              <div className="admin-settings-group">
                <h3>Event Details</h3>
                <label>Date</label>
                <input type="date" value={settings.eventDate} onChange={(e) => setSettings({ ...settings, eventDate: e.target.value })} className="form-input" />
                <label>Time</label>
                <input type="time" value={settings.eventTime} onChange={(e) => setSettings({ ...settings, eventTime: e.target.value })} className="form-input" />
                <label>Location</label>
                <input type="text" value={settings.location} onChange={(e) => setSettings({ ...settings, location: e.target.value })} className="form-input" />
              </div>
              <div className="admin-settings-group">
                <h3>Ticket Prices ($)</h3>
                <label>Sub Entry</label>
                <input type="number" value={settings.subPrice} onChange={(e) => setSettings({ ...settings, subPrice: +e.target.value })} className="form-input" />
                <label>Dom Pass</label>
                <input type="number" value={settings.domPrice} onChange={(e) => setSettings({ ...settings, domPrice: +e.target.value })} className="form-input" />
                <label>Dungeon Master</label>
                <input type="number" value={settings.dmPrice} onChange={(e) => setSettings({ ...settings, dmPrice: +e.target.value })} className="form-input" />
                <label>Masked Session</label>
                <input type="number" value={settings.maskedPrice} onChange={(e) => setSettings({ ...settings, maskedPrice: +e.target.value })} className="form-input" />
              </div>
              <div className="admin-settings-group">
                <h3>Available Slots</h3>
                <label>Sub Entry</label>
                <input type="number" value={settings.subSlots} onChange={(e) => setSettings({ ...settings, subSlots: +e.target.value })} className="form-input" />
                <label>Dom Pass</label>
                <input type="number" value={settings.domSlots} onChange={(e) => setSettings({ ...settings, domSlots: +e.target.value })} className="form-input" />
                <label>Dungeon Master</label>
                <input type="number" value={settings.dmSlots} onChange={(e) => setSettings({ ...settings, dmSlots: +e.target.value })} className="form-input" />
                <label>Masked Session</label>
                <input type="number" value={settings.maskedSlots} onChange={(e) => setSettings({ ...settings, maskedSlots: +e.target.value })} className="form-input" />
              </div>
            </div>
            <button className="buy-btn donate-btn" style={{ maxWidth: "300px", marginTop: "1.5rem" }} onClick={() => alert("Settings saved!")}>
              Save Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
