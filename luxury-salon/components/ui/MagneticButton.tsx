"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useIsTouch, useReducedMotion } from "@/lib/hooks";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  /** How far the element drifts toward the cursor (px). */
  strength?: number;
  cursorLabel?: string;
  ariaLabel?: string;
};

/**
 * Magnetic interactive element — drifts toward the cursor and eases back on
 * leave. Renders an anchor when `href` is supplied, otherwise a button.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 28,
  cursorLabel,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    if (isTouch || reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(ref.current, {
      x: (x / r.width) * strength,
      y: (y / r.height) * strength,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const shared = {
    ref,
    onPointerMove: onMove,
    onPointerLeave: onLeave,
    onClick,
    className,
    "data-cursor": "hover",
    "data-cursor-label": cursorLabel,
    "aria-label": ariaLabel,
  } as const;

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        {...shared}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <button {...shared} type="button">
      {children}
    </button>
  );
}
