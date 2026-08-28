"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const ADMIN_PASSWORD = "transparty2026";

const TABS = [
  { key: "overview", label: "📊 Overview" },
  { key: "members", label: "👥 Members" },
  { key: "dungeon", label: "🚚 Dungeon Bookings" },
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

function SaveBtn({ onClick, saved }) {
  return (
    <button onClick={onClick} className="buy-btn donate-btn" style={{ maxWidth: 200, marginTop: "1rem" }}>
      {saved ? "✅ Saved!" : "Save"}
    </button>
  );
}

function SectionHead({ title }) {
  return <h2 style={{ fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, opacity: 0.5, margin: "2rem 0 1rem", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "0.5rem" }}>{title}</h2>;
}

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [tab, setTab] = useState("overview");

  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const [upgradeMsg, setUpgradeMsg] = useState("");
  const [dungeonBookings, setDungeonBookings] = useState([]);
  const [btcPayments, setBtcPayments] = useState([]);
  const [giftSubs, setGiftSubs] = useState([]);
  const [contactMsgs, setContactMsgs] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  const [allChats, setAllChats] = useState({});
  const [activeChat, setActiveChat] = useState(null);
  const [adminReply, setAdminReply] = useState("");
  const chatBottomRef = useRef(null);
  const chatPollRef = useRef(null);

  // Settings state
  const [savedMsg, setSavedMsg] = useState("");
  const [banner, setBanner] = useState({ text: "🔥 LIMITED TIME: Get 20% off all cards — Use code SISSY20 at checkout", code: "SISSY20", active: true });
  const [btcWallet, setBtcWallet] = useState("bc1q6k7lmj5jruuk0tq28c03pc5ae2jv0wnthdpxpn");
  const [stats, setStats] = useState({ members: "2847", countries: "47", cards: "3200", events: "12" });
  const [events, setEvents] = useState([
    { name: "Trans & Sex Party — Las Vegas", date: "August 15–16, 2026", location: "The Venetian Resort, Las Vegas, NV", price: "From $300", status: "Tickets Available", emoji: "🎉", img: "https://images.unsplash.com/photo-1605723517503-3cadb5818a0c?w=600&q=80" },
    { name: "Sissy Brunch & Social — Miami", date: "October 2026", location: "TBA — Private Venue", price: "From $150", status: "Coming Soon", emoji: "🥂", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80" },
    { name: "Masked Gala — New York", date: "December 2026", location: "TBA — Private Venue", price: "From $400", status: "Coming Soon", emoji: "🎭", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80" },
  ]);
  const [gallery, setGallery] = useState([
    { img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80", caption: "Community Night — Vegas 2025", tag: "Events" },
    { img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80", caption: "Sissy Brunch — Miami", tag: "Events" },
    { img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80", caption: "Masked Gala — NYC", tag: "Events" },
    { img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80", caption: "Member Spotlight — Diamond Tier", tag: "Members" },
    { img: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80", caption: "Glam Night — Los Angeles", tag: "Events" },
    { img: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&q=80", caption: "Inner Circle Meetup — London", tag: "Community" },
  ]);
  const [faqs, setFaqs] = useState([
    { q: "What is a Sissy Card?", a: "Your official membership card for Sissy Fantasy Island." },
    { q: "How do I receive my card?", a: "Email delivery, anonymous code, or physical card." },
    { q: "Is this 100% discreet?", a: "Yes. Billing shows as SFI Digital Services." },
  ]);
  const [testimonials, setTestimonials] = useState([
    { name: "Sissy Bella", tier: "Gold", stars: 5, text: "The card arrived in a plain envelope, totally discreet. The community is amazing." },
    { name: "Anonymous", tier: "Standard", stars: 5, text: "Used the anonymous code option. No email, no trace. Exactly what I needed." },
    { name: "Princess Jade", tier: "Diamond", stars: 5, text: "The concierge service is real. Worth every penny." },
  ]);
  const [blogPosts, setBlogPosts] = useState([
    { title: "Beginner's Guide to Being a Sissy", emoji: "🎀", tag: "Beginner", desc: "Everything you need to know to start your sissy journey.", content: "Starting your sissy journey is exciting and personal..." },
    { title: "How to Build a Feminine Wardrobe", emoji: "👗", tag: "Fashion", desc: "From lingerie to everyday femme outfits.", content: "Building your wardrobe doesn't have to be expensive..." },
  ]);
  const [shopLinks, setShopLinks] = useState([
    { name: "Lovense", emoji: "💜", desc: "Remote-controlled toys, vibrators, and interactive devices", url: "https://www.lovense.com", category: "Toys & Devices" },
    { name: "Amazon — Sissy Costumes", emoji: "👗", desc: "Maid outfits, lingerie, wigs, stockings, and accessories", url: "https://www.amazon.com/s?k=sissy+costume", category: "Costumes & Outfits" },
    { name: "Amazon — Chastity", emoji: "🔒", desc: "Cages, locks, and chastity devices", url: "https://www.amazon.com/s?k=chastity+cage", category: "Chastity" },
  ]);

  useEffect(() => {
    if (!authed) return;
    fetch("/api/settings").then(r => r.json()).then(d => {
      const s = d.settings || {};
      if (s.banner) setBanner(s.banner);
      if (s.btcWallet) setBtcWallet(s.btcWallet);
      if (s.stats) setStats(s.stats);
      if (s.events) setEvents(s.events);
      if (s.gallery) setGallery(s.gallery);
      if (s.faqs) setFaqs(s.faqs);
      if (s.testimonials) setTestimonials(s.testimonials);
      if (s.blogPosts) setBlogPosts(s.blogPosts);
      if (s.shopLinks) setShopLinks(s.shopLinks);
    });
  }, [authed]);

  useEffect(() => {
    if (!authed) return;
    if (tab === "members") {
      setMembersLoading(true);
      fetch("/api/admin/members", { headers: { "x-admin-pass": ADMIN_PASSWORD } })
        .then(r => r.json()).then(d => { setMembers(d.users || []); setMembersLoading(false); })
        .catch(() => setMembersLoading(false));
    }
    if (tab === "dungeon") {
      fetch("/api/contact").then(r => r.json()).then(d => {
        setDungeonBookings((d.messages || []).filter(m => m.subject === "Dungeon Booking Request"));
      });
    }
    if (tab === "btc") {
      fetch("/api/btc-confirm").then(r => r.json()).then(d => setBtcPayments(d.payments || []));
    }
    if (tab === "giftcards") {
      fetch("/api/gift-submit").then(r => r.json()).then(d => setGiftSubs(d.submissions || []));
    }
    if (tab === "contact") {
      fetch("/api/contact").then(r => r.json()).then(d => {
        const all = d.messages || [];
        setContactMsgs(all.filter(m => m.subject !== "Dungeon Booking Request"));
        setDungeonBookings(all.filter(m => m.subject === "Dungeon Booking Request"));
      });
    }
    if (tab === "subscribers") {
      fetch("/api/subscribe").then(r => r.json()).then(d => setSubscribers(d.subscribers || []));
    }
    if (tab === "overview") {
      fetch("/api/admin/members", { headers: { "x-admin-pass": ADMIN_PASSWORD } }).then(r => r.json()).then(d => setMembers(d.users || []));
      fetch("/api/btc-confirm").then(r => r.json()).then(d => setBtcPayments(d.payments || []));
      fetch("/api/gift-submit").then(r => r.json()).then(d => setGiftSubs(d.submissions || []));
      fetch("/api/contact").then(r => r.json()).then(d => {
        const all = d.messages || [];
        setContactMsgs(all.filter(m => m.subject !== "Dungeon Booking Request"));
        setDungeonBookings(all.filter(m => m.subject === "Dungeon Booking Request"));
      });
      fetch("/api/subscribe").then(r => r.json()).then(d => setSubscribers(d.subscribers || []));
    }
  }, [authed, tab]);

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

  async function saveSetting(key, value) {
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-pass": ADMIN_PASSWORD },
      body: JSON.stringify({ key, value }),
    });
    setSavedMsg(key);
    setTimeout(() => setSavedMsg(""), 2000);
  }

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

      <div className="admin-main">

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
              <div className="admin-stat-card"><div className="admin-stat-num">{dungeonBookings.length}</div><div className="admin-stat-label">Dungeon Bookings</div></div>
              <div className="admin-stat-card"><div className="admin-stat-num">{unreadContact}</div><div className="admin-stat-label">Unread Contact</div></div>
            </div>
            <h2 style={{ fontSize: "1.1rem", margin: "2rem 0 1rem", opacity: 0.6, textTransform: "uppercase", letterSpacing: 1 }}>Members by Tier</h2>
            <div className="admin-stats">
              {["Free", "Starter Sissy Card", "Standard Sissy Card", "Gold Sissy Card", "Platinum Sissy Card", "Diamond Sissy Card"].map(tier => (
                <div key={tier} className="admin-stat-card">
                  <div className="admin-stat-num">{members.filter(m => m.tier === tier).length}</div>
                  <div className="admin-stat-label">{tier.replace(" Sissy Card", "")}</div>
                </div>
              ))}
            </div>
          </div>
        )}

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
                        <div key={m.id} className={`admin-chat-bubble ${m.from_role === "admin" ? "admin-chat-bubble-admin" : "admin-chat-bubble-user"}`}>
                          <div className="admin-chat-bubble-from">{m.from_role === "admin" ? "You" : "User"}</div>
                          {m.text}
                          <div className="admin-chat-bubble-time">{new Date(m.created_at).toLocaleTimeString()}</div>
                        </div>
                      ))}
                      <div ref={chatBottomRef} />
                    </div>
                    <form className="admin-chat-input" onSubmit={sendAdminReply}>
                      <input type="text" value={adminReply} onChange={e => setAdminReply(e.target.value)} placeholder="Type a reply..." className="chat-input" />
                      <button type="submit" className="chat-send">↑</button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {tab === "dungeon" && (
          <div>
            <h1 className="admin-title">Dungeon Bookings ({dungeonBookings.length})</h1>
            {dungeonBookings.length === 0 ? <Empty text="No dungeon bookings yet." /> : (
              <div className="admin-messages">
                {dungeonBookings.map(m => (
                  <div key={m.id} className="admin-msg-card">
                    <div className="admin-msg-header">
                      <div><strong>{m.name}</strong><span style={{ opacity: 0.5, marginLeft: "0.5rem", fontSize: "0.85rem" }}>{m.email}</span></div>
                      <span style={{ fontSize: "0.8rem", opacity: 0.4 }}>{new Date(m.created_at).toLocaleDateString()}</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.5rem", margin: "0.8rem 0", fontSize: "0.85rem" }}>
                      <div><span style={{ opacity: 0.4 }}>Package: </span><strong>{m.pkg || "—"}</strong></div>
                      <div><span style={{ opacity: 0.4 }}>Date: </span><strong>{m.date || "—"}</strong></div>
                      <div><span style={{ opacity: 0.4 }}>Phone: </span><strong>{m.phone || "—"}</strong></div>
                      <div><span style={{ opacity: 0.4 }}>Location: </span><strong>{m.location || "—"}</strong></div>
                    </div>
                    {m.notes && <p style={{ opacity: 0.6, fontSize: "0.88rem", lineHeight: 1.6, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.8rem" }}>{m.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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
                        <td style={{ fontSize: "0.8rem" }}>{new Date(b.created_at).toLocaleDateString()}</td>
                        <td className="admin-actions">
                          {b.status === "pending" && (
                            <>
                              <button className="admin-btn-approve" onClick={async () => { setBtcPayments(btcPayments.map(x => x.id === b.id ? { ...x, status: "verified" } : x)); await fetch("/api/btc-confirm", { method: "PATCH", headers: { "Content-Type": "application/json", "x-admin-pass": ADMIN_PASSWORD }, body: JSON.stringify({ id: b.id, status: "verified" }) }); }}>✓</button>
                              <button className="admin-btn-reject" onClick={async () => { setBtcPayments(btcPayments.map(x => x.id === b.id ? { ...x, status: "rejected" } : x)); await fetch("/api/btc-confirm", { method: "PATCH", headers: { "Content-Type": "application/json", "x-admin-pass": ADMIN_PASSWORD }, body: JSON.stringify({ id: b.id, status: "rejected" }) }); }}>✕</button>
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
                        <td>{g.has_image ? `📎 ${g.image_name || "yes"}` : "—"}</td>
                        <td><StatusBadge status={g.status} /></td>
                        <td style={{ fontSize: "0.8rem" }}>{new Date(g.created_at).toLocaleDateString()}</td>
                        <td className="admin-actions">
                          {g.status === "pending" && (
                            <>
                              <button className="admin-btn-approve" onClick={async () => { setGiftSubs(giftSubs.map(x => x.id === g.id ? { ...x, status: "approved" } : x)); await fetch("/api/gift-submit", { method: "PATCH", headers: { "Content-Type": "application/json", "x-admin-pass": ADMIN_PASSWORD }, body: JSON.stringify({ id: g.id, status: "approved" }) }); }}>✓</button>
                              <button className="admin-btn-reject" onClick={async () => { setGiftSubs(giftSubs.map(x => x.id === g.id ? { ...x, status: "rejected" } : x)); await fetch("/api/gift-submit", { method: "PATCH", headers: { "Content-Type": "application/json", "x-admin-pass": ADMIN_PASSWORD }, body: JSON.stringify({ id: g.id, status: "rejected" }) }); }}>✕</button>
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

        {tab === "contact" && (
          <div>
            <h1 className="admin-title">Contact Messages ({contactMsgs.length})</h1>
            {contactMsgs.length === 0 ? <Empty text="No contact messages yet." /> : (
              <div className="admin-messages">
                {contactMsgs.map(m => (
                  <div key={m.id} className="admin-msg-card">
                    <div className="admin-msg-header">
                      <div><strong>{m.name}</strong><span style={{ opacity: 0.5, marginLeft: "0.5rem", fontSize: "0.85rem" }}>{m.email}</span></div>
                      <span style={{ fontSize: "0.8rem", opacity: 0.4 }}>{new Date(m.created_at).toLocaleDateString()}</span>
                    </div>
                    <div style={{ fontWeight: 600, margin: "0.5rem 0 0.3rem" }}>{m.subject}</div>
                    <p style={{ opacity: 0.7, lineHeight: 1.6, fontSize: "0.92rem" }}>{m.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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

        {tab === "settings" && (
          <div>
            <h1 className="admin-title">⚙️ Site Settings</h1>

            {/* Banner */}
            <SectionHead title="Flash Sale Banner" />
            <div className="admin-settings-group">
              <label>Banner Text</label>
              <input className="form-input" value={banner.text} onChange={e => setBanner({ ...banner, text: e.target.value })} />
              <label>Discount Code</label>
              <input className="form-input" value={banner.code} onChange={e => setBanner({ ...banner, code: e.target.value })} />
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                <input type="checkbox" checked={banner.active} onChange={e => setBanner({ ...banner, active: e.target.checked })} />
                Show banner on site
              </label>
              <SaveBtn onClick={() => saveSetting("banner", banner)} saved={savedMsg === "banner"} />
            </div>

            {/* BTC Wallet */}
            <SectionHead title="BTC Wallet Address" />
            <div className="admin-settings-group">
              <label>Wallet Address</label>
              <input className="form-input" value={btcWallet} onChange={e => setBtcWallet(e.target.value)} style={{ fontFamily: "monospace" }} />
              <SaveBtn onClick={() => saveSetting("btcWallet", btcWallet)} saved={savedMsg === "btcWallet"} />
            </div>

            {/* Stats */}
            <SectionHead title="Homepage Stats" />
            <div className="admin-settings-group">
              {[["members", "Active Members"], ["countries", "Countries"], ["cards", "Cards Issued"], ["events", "Events Hosted"]].map(([k, label]) => (
                <div key={k}>
                  <label>{label}</label>
                  <input className="form-input" value={stats[k]} onChange={e => setStats({ ...stats, [k]: e.target.value })} />
                </div>
              ))}
              <SaveBtn onClick={() => saveSetting("stats", stats)} saved={savedMsg === "stats"} />
            </div>

            {/* Events */}
            <SectionHead title="Events" />
            {events.map((ev, i) => (
              <div key={i} className="admin-settings-group" style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong style={{ fontSize: "0.9rem" }}>Event {i + 1}</strong>
                  <button onClick={() => setEvents(events.filter((_, j) => j !== i))} style={{ background: "rgba(220,53,69,0.15)", border: "1px solid rgba(220,53,69,0.3)", color: "#dc3545", borderRadius: 6, padding: "0.2rem 0.6rem", cursor: "pointer", fontSize: "0.8rem" }}>Remove</button>
                </div>
                {[["name", "Event Name"], ["date", "Date"], ["location", "Location"], ["price", "Price"], ["emoji", "Emoji"], ["img", "Image URL"]].map(([k, label]) => (
                  <div key={k}>
                    <label>{label}</label>
                    <input className="form-input" value={ev[k] || ""} onChange={e => setEvents(events.map((x, j) => j === i ? { ...x, [k]: e.target.value } : x))} />
                  </div>
                ))}
                <label>Status</label>
                <select className="form-input" value={ev.status} onChange={e => setEvents(events.map((x, j) => j === i ? { ...x, status: e.target.value } : x))} style={{ background: "#1a1a2e", color: "white" }}>
                  <option>Tickets Available</option>
                  <option>Coming Soon</option>
                  <option>Sold Out</option>
                  <option>Cancelled</option>
                </select>
              </div>
            ))}
            <button onClick={() => setEvents([...events, { name: "", date: "", location: "", price: "", status: "Coming Soon", emoji: "🎉", img: "" }])}
              style={{ background: "rgba(214,51,132,0.1)", border: "1px solid rgba(214,51,132,0.3)", color: "#f5a9b8", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", marginBottom: "0.5rem" }}>
              + Add Event
            </button>
            <br />
            <SaveBtn onClick={() => saveSetting("events", events)} saved={savedMsg === "events"} />

            {/* Gallery */}
            <SectionHead title="Gallery" />
            {gallery.map((item, i) => (
              <div key={i} className="admin-settings-group" style={{ marginBottom: "0.8rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong style={{ fontSize: "0.85rem" }}>Photo {i + 1}</strong>
                  <button onClick={() => setGallery(gallery.filter((_, j) => j !== i))} style={{ background: "rgba(220,53,69,0.15)", border: "1px solid rgba(220,53,69,0.3)", color: "#dc3545", borderRadius: 6, padding: "0.2rem 0.6rem", cursor: "pointer", fontSize: "0.8rem" }}>Remove</button>
                </div>
                <label>Image URL</label>
                <input className="form-input" value={item.img} onChange={e => setGallery(gallery.map((x, j) => j === i ? { ...x, img: e.target.value } : x))} />
                <label>Caption</label>
                <input className="form-input" value={item.caption} onChange={e => setGallery(gallery.map((x, j) => j === i ? { ...x, caption: e.target.value } : x))} />
                <label>Tag</label>
                <select className="form-input" value={item.tag} onChange={e => setGallery(gallery.map((x, j) => j === i ? { ...x, tag: e.target.value } : x))} style={{ background: "#1a1a2e", color: "white" }}>
                  <option>Events</option>
                  <option>Members</option>
                  <option>Community</option>
                </select>
              </div>
            ))}
            <button onClick={() => setGallery([...gallery, { img: "", caption: "", tag: "Events" }])}
              style={{ background: "rgba(214,51,132,0.1)", border: "1px solid rgba(214,51,132,0.3)", color: "#f5a9b8", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", marginBottom: "0.5rem" }}>
              + Add Photo
            </button>
            <br />
            <SaveBtn onClick={() => saveSetting("gallery", gallery)} saved={savedMsg === "gallery"} />

            {/* Shop Links */}
            <SectionHead title="Shop Links" />
            {shopLinks.map((item, i) => (
              <div key={i} className="admin-settings-group" style={{ marginBottom: "0.8rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong style={{ fontSize: "0.85rem" }}>Shop Item {i + 1}</strong>
                  <button onClick={() => setShopLinks(shopLinks.filter((_, j) => j !== i))} style={{ background: "rgba(220,53,69,0.15)", border: "1px solid rgba(220,53,69,0.3)", color: "#dc3545", borderRadius: 6, padding: "0.2rem 0.6rem", cursor: "pointer", fontSize: "0.8rem" }}>Remove</button>
                </div>
                {[["name", "Name"], ["emoji", "Emoji"], ["desc", "Description"], ["url", "URL"], ["category", "Category"]].map(([k, label]) => (
                  <div key={k}>
                    <label>{label}</label>
                    <input className="form-input" value={item[k] || ""} onChange={e => setShopLinks(shopLinks.map((x, j) => j === i ? { ...x, [k]: e.target.value } : x))} />
                  </div>
                ))}
              </div>
            ))}
            <button onClick={() => setShopLinks([...shopLinks, { name: "", emoji: "🛍️", desc: "", url: "", category: "" }])}
              style={{ background: "rgba(214,51,132,0.1)", border: "1px solid rgba(214,51,132,0.3)", color: "#f5a9b8", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", marginBottom: "0.5rem" }}>
              + Add Shop Item
            </button>
            <br />
            <SaveBtn onClick={() => saveSetting("shopLinks", shopLinks)} saved={savedMsg === "shopLinks"} />

            {/* FAQs */}
            <SectionHead title="FAQs" />
            {faqs.map((faq, i) => (
              <div key={i} className="admin-settings-group" style={{ marginBottom: "0.8rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong style={{ fontSize: "0.85rem" }}>FAQ {i + 1}</strong>
                  <button onClick={() => setFaqs(faqs.filter((_, j) => j !== i))} style={{ background: "rgba(220,53,69,0.15)", border: "1px solid rgba(220,53,69,0.3)", color: "#dc3545", borderRadius: 6, padding: "0.2rem 0.6rem", cursor: "pointer", fontSize: "0.8rem" }}>Remove</button>
                </div>
                <label>Question</label>
                <input className="form-input" value={faq.q} onChange={e => setFaqs(faqs.map((x, j) => j === i ? { ...x, q: e.target.value } : x))} />
                <label>Answer</label>
                <textarea className="form-input" rows={3} value={faq.a} onChange={e => setFaqs(faqs.map((x, j) => j === i ? { ...x, a: e.target.value } : x))} style={{ resize: "vertical" }} />
              </div>
            ))}
            <button onClick={() => setFaqs([...faqs, { q: "", a: "" }])}
              style={{ background: "rgba(214,51,132,0.1)", border: "1px solid rgba(214,51,132,0.3)", color: "#f5a9b8", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", marginBottom: "0.5rem" }}>
              + Add FAQ
            </button>
            <br />
            <SaveBtn onClick={() => saveSetting("faqs", faqs)} saved={savedMsg === "faqs"} />

            {/* Testimonials */}
            <SectionHead title="Testimonials" />
            {testimonials.map((t, i) => (
              <div key={i} className="admin-settings-group" style={{ marginBottom: "0.8rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong style={{ fontSize: "0.85rem" }}>Review {i + 1}</strong>
                  <button onClick={() => setTestimonials(testimonials.filter((_, j) => j !== i))} style={{ background: "rgba(220,53,69,0.15)", border: "1px solid rgba(220,53,69,0.3)", color: "#dc3545", borderRadius: 6, padding: "0.2rem 0.6rem", cursor: "pointer", fontSize: "0.8rem" }}>Remove</button>
                </div>
                {[["name", "Name"], ["tier", "Tier"]].map(([k, label]) => (
                  <div key={k}>
                    <label>{label}</label>
                    <input className="form-input" value={t[k] || ""} onChange={e => setTestimonials(testimonials.map((x, j) => j === i ? { ...x, [k]: e.target.value } : x))} />
                  </div>
                ))}
                <label>Review Text</label>
                <textarea className="form-input" rows={2} value={t.text} onChange={e => setTestimonials(testimonials.map((x, j) => j === i ? { ...x, text: e.target.value } : x))} style={{ resize: "vertical" }} />
              </div>
            ))}
            <button onClick={() => setTestimonials([...testimonials, { name: "", tier: "Gold", stars: 5, text: "" }])}
              style={{ background: "rgba(214,51,132,0.1)", border: "1px solid rgba(214,51,132,0.3)", color: "#f5a9b8", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", marginBottom: "0.5rem" }}>
              + Add Testimonial
            </button>
            <br />
            <SaveBtn onClick={() => saveSetting("testimonials", testimonials)} saved={savedMsg === "testimonials"} />

            {/* Blog Posts */}
            <SectionHead title="Blog Posts / Guides" />
            {blogPosts.map((post, i) => (
              <div key={i} className="admin-settings-group" style={{ marginBottom: "0.8rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong style={{ fontSize: "0.85rem" }}>Post {i + 1}</strong>
                  <button onClick={() => setBlogPosts(blogPosts.filter((_, j) => j !== i))} style={{ background: "rgba(220,53,69,0.15)", border: "1px solid rgba(220,53,69,0.3)", color: "#dc3545", borderRadius: 6, padding: "0.2rem 0.6rem", cursor: "pointer", fontSize: "0.8rem" }}>Remove</button>
                </div>
                {[["title", "Title"], ["emoji", "Emoji"], ["tag", "Tag"], ["desc", "Short Description"]].map(([k, label]) => (
                  <div key={k}>
                    <label>{label}</label>
                    <input className="form-input" value={post[k] || ""} onChange={e => setBlogPosts(blogPosts.map((x, j) => j === i ? { ...x, [k]: e.target.value } : x))} />
                  </div>
                ))}
                <label>Full Content</label>
                <textarea className="form-input" rows={5} value={post.content || ""} onChange={e => setBlogPosts(blogPosts.map((x, j) => j === i ? { ...x, content: e.target.value } : x))} style={{ resize: "vertical" }} />
              </div>
            ))}
            <button onClick={() => setBlogPosts([...blogPosts, { title: "", emoji: "📝", tag: "", desc: "", content: "" }])}
              style={{ background: "rgba(214,51,132,0.1)", border: "1px solid rgba(214,51,132,0.3)", color: "#f5a9b8", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", marginBottom: "0.5rem" }}>
              + Add Blog Post
            </button>
            <br />
            <SaveBtn onClick={() => saveSetting("blogPosts", blogPosts)} saved={savedMsg === "blogPosts"} />

          </div>
        )}

      </div>
    </div>
  );
}
