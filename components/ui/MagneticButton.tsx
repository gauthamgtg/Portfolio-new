"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  external?: boolean;
};

export default function MagneticButton({
  children,
  href,
  variant = "primary",
  external,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * 0.25, y: y * 0.25 });
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors";
  const styles =
    variant === "primary"
      ? "text-ink bg-gradient-to-r from-neon-cyan to-neon-violet hover:opacity-95 glow-violet"
      : "text-white border border-white/15 bg-white/5 hover:bg-white/10";

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} ${styles}`}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.3 }}
    >
      {children}
    </motion.a>
  );
}
