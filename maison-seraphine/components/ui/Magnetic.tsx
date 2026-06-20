"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Magnetic — wraps a child and pulls it toward the cursor while hovered,
 * releasing with an elastic settle. Uses gsap.quickTo so pointermove stays on
 * the GPU-friendly fast path. No-op for reduced-motion / touch.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    const xTo = gsap.quickTo(el, "x", {
      duration: 0.9,
      ease: "elastic.out(1, 0.45)",
    });
    const yTo = gsap.quickTo(el, "y", {
      duration: 0.9,
      ease: "elastic.out(1, 0.45)",
    });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
}
