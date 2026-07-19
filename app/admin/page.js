"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const ADMIN_PASSWORD = "transparty2026";

const TABS = [
  { key: "overview", label: "📊 Overview" },
  { key: "members", label: "👥 Members" },
  { key: "livechat", label: "💬 Live Chat" },
  { key: "btc", label: "₿ BTC Payments" },
  { key: "giftcards", label: "🎁 Gift Cards" },
  { key: "contact", label: "✉️ Contact Forms" },
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

function Empty({ text = "No data yet." }) {
  return <p style={{ opacity: 0.4, padding: "2rem", textAlign: "center" }}>{text}</p>;
}

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [tab, setTab] = useState("overview");

  // Real data
  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const [upgradeMsg, setUpgradeMsg] = useState("");
  const [btcPayments, setBtcPayments] = useState([]);
  const [giftSubs, setGiftSubs] = useState([]);
  const [contactMsgs, setContactMsgs] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  // Live chat
  const [allChats, setAllChats] = useState({});
  const [activeChat, setActiveChat] = useState(null);
  const [adminReply, setAdminReply] = useState("");
  const chatBottomRef = useRef(null);
  const chatPollRef = useRef(null);

  const [settings, setSettings] = useState({
    eventDate: "2026-08-15", eventTime: "20:00",
    location: "The Venetian Resort, Las Vegas, NV",
  });

  // Load data per tab
  useEffect(() => {
    if (!authed) return;
    if (tab === "members") {
      setMembersLoading(true);
      fetch("/api/admin/members", { headers: { "x-admin-pass": ADMIN_PASSWORD } })
        .then(r => r.json()).then(d => { setMembers(d.users || []); setMembersLoading(false); })
        .catch(() => setMembersLoading(false));
    }
    if (tab === "btc") {
      fetch("/api/btc-confirm").then(r => r.json()).then(d => setBtcPayments(d.payments || []));
    }
    if (tab === "giftcards") {
      fetch("/api/gift-submit").then(r => r.json()).then(d => setGiftSubs(d.submissions || []));
    }
    if (tab === "contact") {
      fetch("/api/contact").then(r => r.json()).then(d => setContactMsgs(d.messages || []));
    }
    if (tab === "subscribers") {
      fetch("/api/subscribe").then(r => r.json()).then(d => setSubscribers(d.subscribers || []));
    }
    if (tab === "overview") {
      fetch("/api/admin/members", { headers: { "x-admin-pass": ADMIN_PASSWORD } })
        .then(r => r.json()).then(d => setMembers(d.users || []));
      fetch("/api/btc-confirm").then(r => r.json()).then(d => setBtcPayments(d.payments || []));
      fetch("/api/gift-submit").then(r => r.json()).then(d => setGiftSubs(d.submissions || []));
      fetch("/api/contact").then(r => r.json()).then(d => setContactMsgs(d.messages || []));
      fetch("/api/subscribe").then(r => r.json()).then(d => setSubscribers(d.subscribers || []));
    }
  }, [authed, tab]);

  // Live chat polling
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

  async function upgradeMember(userId, tier) {
    const res = await fetch("/api/admin/members", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-pass": ADMIN_PASSWORD },
      body: JSON.stringify({ userId, tier }),
    });
    const data = await res.json();
    if (data.success) {
      setMembers(m => m.map(u => u.id === userId ? { ...u, tier } : u));
      setUpgradeMsg(`✅ ${tier} assigned!`);
      setTimeout(() => setUpgradeMsg(""), 3000);
    }
  }

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

  function handleLogin(e) {
    e.preventDefault();
    if (pass === ADMIN_PASSWORD) setAuthed(true);
    else alert("Wrong password");
  }

  const totalUnreadChats = Object.values(allChats).filter(c => c.unreadAdmin > 0).length;
  const pendingBtc = btcPayments.filter(p => p.status === "pending").length;
  const pendingGift = giftSubs.filter(g => g.status === "pending").length;
  const unreadContact = contactMsgs.filter(m => !m.read).length;

  if (!authed) {
    return (
      <div className="age-gate-overlay">
        <div className="age-gate-box">
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔐</div>
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin} style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <input type="password" placeholder="Enter admin password" value={pass} onChange={e => setPass(e.target.value)} className="form-input" style={{ textAlign: "center" }} />
            <button type="submit" className="buy-btn donate-btn">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-logo">🏳️‍⚧️ Admin</div>
        {TABS.map(t => (
          <button key={t.key} className={`admin-tab ${tab === t.key ? "admin-tab-active" : ""}`} onClick={() => setTab(t.key)}>
            {t.label}
            {t.key === "livechat" && totalUnreadChats > 0 && <span className="admin-badge">{totalUnreadChats}</span>}
            {t.key === "btc" && pendingBtc > 0 && <span className="admin-badge">{pendingBtc}</span>}
            {t.key === "giftcards" && pendingGift > 0 && <span className="admin-badge">{pendingGift}</span>}
            {t.key === "contact" && unreadContact > 0 && <span className="admin-badge">{unreadContact}</span>}
          </button>
        ))}
        <Link href="/" className="admin-tab" style={{ marginTop: "auto", opacity: 0.5 }}>← Back to Site</Link>
      </div>

      {/* Main */}
      <div className="admin-main">

        {/* Overview */}
        {tab === "overview" && (
          <div>
            <h1 className="admin-title">Dashboard Overview</h1>
            <div className="admin-stats">
              <div className="admin-stat-card"><div className="admin-stat-num">{members.length}</div><div className="admin-stat-label">Registered Members</div></div>
              <div className="admin-stat-card"><div className="admin-stat-num">{btcPayments.length}</div><div className="admin-stat-label">BTC Submissions</div></div>
              <div className="admin-stat-card"><div className="admin-stat-num">{pendingBtc}</div><div className="admin-stat-label">Pending BTC</div></div>
              <div className="admin-stat-card"><div className="admin-stat-num">{giftSubs.length}</div><div className="admin-stat-label">Gift Card Submissions</div></div>
              <div className="admin-stat-card"><div className="admin-stat-num">{pendingGift}</div><div className="admin-stat-label">Pending Gift Cards</div></div>
              <div className="admin-stat-card"><div className="admin-stat-num">{subscribers.length}</div><div className="admin-stat-label">Subscribers</div></div>
              <div className="admin-stat-card"><div className="admin-stat-num">{contactMsgs.length}</div><div className="admin-stat-label">Contact Messages</div></div>
              <div className="admin-stat-card"><div className="admin-stat-num">{unreadContact}</div><div className="admin-stat-label">Unread Contact</div></div>
            </div>

            <h2 style={{ fontSize: "1.1rem", margin: "2rem 0 1rem", opacity: 0.6, textTransform: "uppercase", letterSpacing: 1 }}>Members by Tier</h2>
            <div className="admin-stats">
              {["Free", "Starter Sissy Card", "Standard Sissy Card", "Gold Sissy Card", "Platinum Sissy Card", "Diamond Sissy Card"].map(tier => (
                <div key={tier} className="admin-stat-card">
                  <div className="admin-stat-num">{members.filter(m => m.tier === tier).length}</div>
                  <div className="admin-stat-label">{tier.replace(" Sissy Card", "").replace(" Card", "")}</div>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: "1.1rem", margin: "2rem 0 1rem", opacity: 0.6, textTransform: "uppercase", letterSpacing: 1 }}>Recent BTC Submissions</h2>
            {btcPayments.slice(0, 5).length === 0 ? <Empty text="No BTC submissions yet." /> : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Email</th><th>Tier</th><th>Status</th><th>Date</th></tr></thead>
                  <tbody>
                    {btcPayments.slice(0, 5).map(b => (
                      <tr key={b.id}>
                        <td>{b.email}</td><td>{b.tier}</td>
                        <td><StatusBadge status={b.status} /></td>
                        <td style={{ fontSize: "0.8rem" }}>{new Date(b.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Members */}
        {tab === "members" && (
          <div>
            <h1 className="admin-title">Members ({members.length})</h1>
            {upgradeMsg && <div style={{ background: "rgba(40,167,69,0.15)", border: "1px solid rgba(40,167,69,0.3)", borderRadius: 8, padding: "0.7rem 1rem", marginBottom: "1rem", color: "#28a745", fontWeight: 600 }}>{upgradeMsg}</div>}
            {membersLoading ? <p style={{ opacity: 0.5 }}>Loading members...</p> : members.length === 0 ? <Empty text="No registered members yet." /> : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Sissy Name</th><th>Email</th><th>Tier</th><th>Since</th><th>Assign Tier</th></tr></thead>
                  <tbody>
                    {members.map(u => (
                      <tr key={u.id}>
                        <td><strong>{u.sissyName}</strong></td>
                        <td>{u.email}</td>
                        <td><span style={{ padding: "0.2rem 0.7rem", borderRadius: 20, fontSize: "0.8rem", fontWeight: 600, background: "rgba(214,51,132,0.15)", color: "#f5a9b8" }}>{u.tier}</span></td>
                        <td style={{ fontSize: "0.85rem", opacity: 0.6 }}>{new Date(u.memberSince).toLocaleDateString()}</td>
                        <td>
                          <select defaultValue="" onChange={e => { if (e.target.value) upgradeMember(u.id, e.target.value); }}
                            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "white", padding: "0.4rem 0.6rem", borderRadius: 8, cursor: "pointer", fontSize: "0.85rem" }}>
                            <option value="" disabled>Assign tier...</option>
                            <option value="Free">🆓 Free</option>
                            <option value="Starter Sissy Card">🌸 Starter — $50</option>
                            <option value="Standard Sissy Card">💳 Standard — $75</option>
                            <option value="Gold Sissy Card">👑 Gold — $100</option>
                            <option value="Platinum Sissy Card">✨ Platinum — $150</option>
                            <option value="Diamond Sissy Card">💎 Diamond — $200</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Live Chat */}
        {tab === "livechat" && (
          <div>
            <h1 className="admin-title">Live Chat</h1>
            <div className="admin-chat-layout">
              <div className="admin-chat-list">
                {Object.keys(allChats).length === 0 && <p style={{ opacity: 0.4, padding: "1rem", textAlign: "center" }}>No active chats yet</p>}
                {Object.entries(allChats).map(([sid, chat]) => (
                  <button key={sid} className={`admin-chat-item ${activeChat === sid ? "admin-chat-item-active" : ""}`} onClick={() => setActiveChat(sid)}>
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
              <div className="admin-chat-convo">
                {!activeChat ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", opacity: 0.3 }}>Select a conversation</div>
                ) : (
                  <>
                    <div className="admin-chat-messages">
                      {(allChats[activeChat]?.messages || []).map(m => (
                        <div key={m.id} className={`admin-chat-bubble ${m.from === "admin" ? "admin-chat-bubble-admin" : "admin-chat-bubble-user"}`}>
                          <div className="admin-chat-bubble-from">{m.from === "admin" ? "You" : "User"}</div>
                          {m.text}
                          <div className="admin-chat-bubble-time">{new Date(m.time).toLocaleTimeString()}</div>
                        </div>
                      ))}
                      <div ref={chatBottomRef} />
                    </div>
                    <form className="admin-chat-input" onSubmit={sendAdminReply}>
                      <input type="text" value={adminReply} onChange={e => setAdminReply(e.target.value)} placeholder="Type a reply..." className="chat-input" />
                      <button type="submit" className="chat-send">→</button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* BTC Payments */}
        {tab === "btc" && (
          <div>
            <h1 className="admin-title">BTC Payments ({btcPayments.length})</h1>
            {btcPayments.length === 0 ? <Empty text="No BTC submissions yet." /> : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Email</th><th>Tier</th><th>TX ID</th><th>Delivery</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                  <tbody>
                    {btcPayments.map(b => (
                      <tr key={b.id}>
                        <td>{b.email}</td>
                        <td>{b.tier}</td>
                        <td style={{ fontFamily: "monospace", fontSize: "0.78rem", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis" }}>{b.txid || "—"}</td>
                        <td>{b.delivery || "email"}</td>
                        <td><StatusBadge status={b.status} /></td>
                        <td style={{ fontSize: "0.8rem" }}>{new Date(b.date).toLocaleDateString()}</td>
                        <td className="admin-actions">
                          {b.status === "pending" && (
                            <>
                              <button className="admin-btn-approve" onClick={() => setBtcPayments(prev => prev.map(x => x.id === b.id ? { ...x, status: "verified" } : x))}>✓</button>
                              <button className="admin-btn-reject" onClick={() => setBtcPayments(prev => prev.map(x => x.id === b.id ? { ...x, status: "rejected" } : x))}>✕</button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Gift Cards */}
        {tab === "giftcards" && (
          <div>
            <h1 className="admin-title">Gift Card Submissions ({giftSubs.length})</h1>
            {giftSubs.length === 0 ? <Empty text="No gift card submissions yet." /> : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Tier</th><th>Price</th><th>Code</th><th>Image</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                  <tbody>
                    {giftSubs.map(g => (
                      <tr key={g.id}>
                        <td>{g.tier}</td>
                        <td>${g.price}</td>
                        <td style={{ fontFamily: "monospace", fontSize: "0.82rem" }}>{g.code !== "No code" ? g.code : "—"}</td>
                        <td>{g.hasImage ? `📎 ${g.imageName || "yes"}` : "—"}</td>
                        <td><StatusBadge status={g.status} /></td>
                        <td style={{ fontSize: "0.8rem" }}>{new Date(g.date).toLocaleDateString()}</td>
                        <td className="admin-actions">
                          {g.status === "pending" && (
                            <>
                              <button className="admin-btn-approve" onClick={() => setGiftSubs(prev => prev.map(x => x.id === g.id ? { ...x, status: "approved" } : x))}>✓</button>
                              <button className="admin-btn-reject" onClick={() => setGiftSubs(prev => prev.map(x => x.id === g.id ? { ...x, status: "rejected" } : x))}>✕</button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Contact Forms */}
        {tab === "contact" && (
          <div>
            <h1 className="admin-title">Contact Messages ({contactMsgs.length})</h1>
            {contactMsgs.length === 0 ? <Empty text="No contact messages yet." /> : (
              <div className="admin-messages">
                {contactMsgs.map(m => (
                  <div key={m.id} className="admin-msg-card">
                    <div className="admin-msg-header">
                      <div><strong>{m.name}</strong><span style={{ opacity: 0.5, marginLeft: "0.5rem", fontSize: "0.85rem" }}>{m.email}</span></div>
                      <span style={{ fontSize: "0.8rem", opacity: 0.4 }}>{new Date(m.date).toLocaleDateString()}</span>
                    </div>
                    <div style={{ fontWeight: 600, margin: "0.5rem 0 0.3rem" }}>{m.subject}</div>
                    <p style={{ opacity: 0.7, lineHeight: 1.6, fontSize: "0.92rem" }}>{m.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Subscribers */}
        {tab === "subscribers" && (
          <div>
            <h1 className="admin-title">Email Subscribers ({subscribers.length})</h1>
            {subscribers.length === 0 ? <Empty text="No subscribers yet." /> : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>#</th><th>Email</th></tr></thead>
                  <tbody>
                    {subscribers.map((s, i) => (
                      <tr key={i}><td>{i + 1}</td><td>{s.email}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Settings */}
        {tab === "settings" && (
          <div>
            <h1 className="admin-title">Settings</h1>
            <div className="admin-settings">
              <div className="admin-settings-group">
                <h3>Next Event</h3>
                <label>Date</label>
                <input type="date" value={settings.eventDate} onChange={e => setSettings({ ...settings, eventDate: e.target.value })} className="form-input" />
                <label>Time</label>
                <input type="time" value={settings.eventTime} onChange={e => setSettings({ ...settings, eventTime: e.target.value })} className="form-input" />
                <label>Location</label>
                <input type="text" value={settings.location} onChange={e => setSettings({ ...settings, location: e.target.value })} className="form-input" />
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
