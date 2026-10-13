"use client";
import { colors } from "../../lib/design-tokens";

const shimmerStyle = {
  backgroundImage:
    "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.02) 100%)",
  backgroundSize: "800px 100%",
  animation: "skShimmer 1.4s ease-in-out infinite",
};

export function Skeleton({ width = "100%", height = 16, radius = "12px", style = {} }) {
  return <div aria-hidden="true" style={{ width, height, borderRadius: radius, ...shimmerStyle, ...style }} />;
}

export function SkeletonCard() {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${colors.border}`,
        borderRadius: 16,
        padding: "1.8rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.8rem",
      }}
    >
      <Skeleton width={44} height={44} radius="50%" />
      <Skeleton width="70%" height={18} />
      <Skeleton width="100%" height={12} />
      <Skeleton width="90%" height={12} />
      <Skeleton width="60%" height={12} />
      <div style={{ marginTop: "0.6rem" }}>
        <Skeleton width="100%" height={40} radius="8px" />
      </div>
    </div>
  );
}

export function SkeletonTicketGrid({ count = 3 }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.2rem" }}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonFeed({ count = 3 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            padding: "1.5rem",
            display: "flex",
            gap: "1rem",
          }}
        >
          <Skeleton width={40} height={40} radius="50%" />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <Skeleton width="35%" height={14} />
            <Skeleton width="100%" height={12} />
            <Skeleton width="80%" height={12} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonGallery({ count = 6 }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.8rem" }}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} width="100%" height={220} radius="16px" />
      ))}
    </div>
  );
}

export default Skeleton;
