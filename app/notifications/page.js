"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function timeAgo(date) {
  const s = Math.floor((new Date() - new Date(date)) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

const NOTIF_ICONS = { like: "❤️", comment: "💬", message: "✉️", follow: "👤" };
const NOTIF_TEXT = {
  like: (n) => `${n.fromName} liked your post`,
  comment: (n) => `${n.fromName} commented on your post`,
  message: (n) => `${n.fromName} sent you a message`,
  follow: (n) => `${n.fromName} started following you`,
};

export default function Notifications() {
  const router = useRouter();
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(d => {
      if (!d.user) { router.push("/login"); return; }
      fetch("/api/notifications").then(r => r.json()).then(data => {
        setNotifs(Array.isArray(data) ? data : []);
        setLoading(false);
        // Mark all as read
        fetch("/api/notifications", { method: "PATCH" });
      });
    });
  }, [router]);

  return (
    <div className="community-page">
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/" className="auth-back">← Back to site</Link>
          <h1 className="community-title" style={{ marginTop: "1rem" }}>Notifications</h1>
        </div>

        {loading ? (
          <div className="community-loading">Loading...</div>
        ) : notifs.length === 0 ? (
          <div className="community-empty">
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔔</div>
            <p>No notifications yet</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {notifs.map(n => (
              <div key={n.id} className={`notif-item ${!n.read ? "notif-unread" : ""}`}>
                <span className="notif-icon">{NOTIF_ICONS[n.type] || "🔔"}</span>
                <div className="notif-body">
                  <p>{NOTIF_TEXT[n.type]?.(n) || "New notification"}</p>
                  <span>{timeAgo(n.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
