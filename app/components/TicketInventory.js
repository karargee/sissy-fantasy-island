"use client";
import { useState, useEffect } from "react";
import { tierColor } from "../../lib/design-tokens";

export default function TicketInventory({ tier, compact = false }) {
  const [remaining, setRemaining] = useState(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let alive = true;
    fetch("/api/inventory")
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return;
        const item = (d.inventory || []).find((t) => t.tier === tier);
        if (item) {
          setRemaining(item.remaining);
          setPercentage(item.percentage);
        }
      })
      .catch(() => {});
    return () => { alive = false; };
  }, [tier]);

  if (remaining === null) {
    return (
      <div
        aria-hidden="true"
        style={{
          marginTop: "0.8rem",
          height: 24,
          borderRadius: 50,
          background: "rgba(255,255,255,0.05)",
          width: compact ? 120 : 180,
        }}
      />
    );
  }

  const low = remaining <= 20;
  const color = low ? "#ff6b6b" : tierColor(tier);

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        marginTop: "0.8rem",
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
      }}
    >
      <div
        style={{
          flex: 1,
          height: 5,
          background: "rgba(255,255,255,0.07)",
          borderRadius: 3,
          overflow: "hidden",
          maxWidth: 140,
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${color}, #7c3aed)`,
            borderRadius: 3,
            transition: "width 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>
      <span
        style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          color,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          animation: low ? "pulse 1.5s ease-in-out infinite" : undefined,
        }}
      >
        {remaining === 0 ? "Sold out" : low ? `⚠️ Only ${remaining} left` : `${remaining} tickets left`}
      </span>
    </div>
  );
}
