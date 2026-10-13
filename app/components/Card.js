"use client";
import { motion } from "framer-motion";
import { colors, radius, gradients } from "../../lib/design-tokens";

const variants = {
  default: {
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
  },
  solid: {
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
  },
  glow: {
    background: colors.surfaceAlt,
    border: `1px solid rgba(214,51,132,0.25)`,
    borderRadius: radius.lg,
  },
};

export default function Card({
  children,
  variant = "default",
  padding = "1.8rem",
  hover = true,
  accent = null,
  style = {},
  className = "",
  as = "div",
  ...rest
}) {
  const MotionTag = motion[as] || motion.div;
  const v = variants[variant] || variants.default;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { y: -5, borderColor: colors.borderHover } : undefined}
      style={{
        ...v,
        padding,
        position: "relative",
        overflow: "hidden",
        cursor: hover ? "pointer" : "default",
        ...(accent ? { borderTop: `4px solid ${accent}` } : {}),
        ...style,
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
