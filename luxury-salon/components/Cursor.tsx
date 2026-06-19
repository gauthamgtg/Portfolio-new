"use client";

import { useEffect, useRef } from "react";
import { useIsTouch, useReducedMotion } from "@/lib/hooks";

/**
 * Bespoke magnetic cursor: a precise gold dot trailed by a lerping ring that
 * morphs into a labelled "VIEW / DRAG" disc over interactive elements.
 *
 * Interactive targets opt in declaratively via `data-cursor` attributes:
 *   data-cursor="hover"               → enlarge ring
 *   data-cursor-label="View"          → show a label inside the ring
 *
 * Falls back to the native cursor on touch devices or with reduced motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (isTouch || reduced) return;

    document.body.classList.add("has-custom-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    // Target (true pointer) vs eased (ring) positions.
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...target };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;

      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor], a, button"
      );
      if (el && (el.dataset.cursor === "hover" || el.tagName === "A" || el.tagName === "BUTTON")) {
        ring.setAttribute("data-variant", "hover");
        label.textContent = el.dataset.cursorLabel ?? "";
      } else {
        ring.setAttribute("data-variant", "default");
        label.textContent = "";
      }
    };

    const tick = () => {
      ringPos.x += (target.x - ringPos.x) * 0.16;
      ringPos.y += (target.y - ringPos.y) * 0.16;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [isTouch, reduced]);

  if (isTouch || reduced) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" data-variant="default" aria-hidden>
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  );
}
