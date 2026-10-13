export const colors = {
  bg: "#060608",
  surface: "#0d0d12",
  surfaceAlt: "#0e0e14",
  border: "rgba(255,255,255,0.07)",
  borderHover: "rgba(214,51,132,0.25)",
  text: "#f0f0f0",
  textMuted: "rgba(255,255,255,0.55)",
  textSubtle: "rgba(255,255,255,0.4)",
  textFaint: "rgba(255,255,255,0.25)",
  pink: "#d63384",
  pinkSoft: "#f5a9b8",
  purple: "#7c3aed",
  purpleDeep: "#6f42c1",
  blue: "#5bcefa",
  green: "#4ade80",
  orange: "#f7931a",
  red: "#ff6b6b",
};

export const gradients = {
  brand: "linear-gradient(135deg, #d63384, #7c3aed)",
  brandText: "linear-gradient(90deg, #f5a9b8, #d63384, #a855f7)",
  night: "linear-gradient(135deg, rgba(18,8,28,0.92) 0%, rgba(10,6,20,0.95) 50%, rgba(20,6,18,0.92) 100%)",
};

export const radius = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  pill: "50px",
};

export const typography = {
  display: "clamp(2.8rem, 8vw, 6rem)",
  h2: "clamp(1.8rem, 3vw, 2.6rem)",
  h3: "1.1rem",
  body: "0.92rem",
  small: "0.82rem",
  label: "0.7rem",
};

export const motion = {
  fast: 0.2,
  base: 0.3,
  slow: 0.7,
  spring: { type: "spring", stiffness: 260, damping: 24 },
};

export const TIER_META = {
  "General Admission": { color: "#f5a9b8", emoji: "🎟️" },
  "VIP Access": { color: "#d63384", emoji: "👑" },
  "Ultra VIP": { color: "#8b5cf6", emoji: "💎" },
  "Virtual Access": { color: "#5bcefa", emoji: "📺" },
};

export function tierColor(name) {
  return TIER_META[name]?.color || colors.pink;
}

export function tierEmoji(name) {
  return TIER_META[name]?.emoji || "🎟️";
}
