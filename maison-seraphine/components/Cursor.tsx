"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsTouch, useReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type CursorState = "default" | "button" | "view" | "drag" | "link";

/**
 * Cursor — bespoke pointer.
 * Three layers: a crisp dot (1:1), a trailing ring that morphs + labels itself
 * over interactive elements, and a soft blurred comet trail. Driven by
 * gsap.quickTo (no React re-render on move). Reads `data-cursor` /
 * `data-cursor-label` from elements via event delegation. Disabled on touch
 * and reduced-motion.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  const isTouch = useIsTouch();
  const reduced = useReducedMotion();
  const enabled = !isTouch && !reduced;

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-hidden");

    gsap.set([dot.current, ring.current, trail.current], {
      xPercent: -50,
      yPercent: -50,
    });

    const dotX = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.4, ease: "power3" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.4, ease: "power3" });
    const trailX = gsap.quickTo(trail.current, "x", { duration: 0.7, ease: "power3" });
    const trailY = gsap.quickTo(trail.current, "y", { duration: 0.7, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      if (!visible) setVisible(true);
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      trailX(e.clientX);
      trailY(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor]",
      );
      if (target) {
        const type = (target.dataset.cursor as CursorState) || "link";
        setState(type);
        setLabel(target.dataset.cursorLabel || "");
      } else {
        setState("default");
        setLabel("");
      }
    };

    const onDown = () => gsap.to(ring.current, { scale: 0.82, duration: 0.25 });
    const onUp = () => gsap.to(ring.current, { scale: 1, duration: 0.25 });
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("cursor-hidden");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, visible]);

  if (!enabled) return null;

  const hasLabel = Boolean(label) || state === "view" || state === "drag";
  const shownLabel =
    label || (state === "view" ? "View" : state === "drag" ? "Drag" : "");

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[200] hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s" }}
      aria-hidden="true"
    >
      {/* Soft comet trail */}
      <div
        ref={trail}
        className="fixed left-0 top-0 h-12 w-12 rounded-full bg-gold/20 blur-xl"
      />

      {/* Morphing ring / label */}
      <div
        ref={ring}
        className={cn(
          "fixed left-0 top-0 flex items-center justify-center rounded-full border border-gold/70 text-[0.55rem] uppercase tracking-widest2 text-bone transition-[width,height,background-color,border-color] duration-300 ease-lux",
          hasLabel
            ? "h-20 w-20 border-transparent bg-espresso"
            : state === "link"
              ? "h-14 w-14 bg-gold/5"
              : "h-9 w-9",
        )}
      >
        <span
          className="transition-opacity duration-200"
          style={{ opacity: hasLabel ? 1 : 0 }}
        >
          {shownLabel}
        </span>
      </div>

      {/* Crisp dot */}
      <div
        ref={dot}
        className={cn(
          "fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-gold transition-opacity duration-200",
          hasLabel && "opacity-0",
        )}
      />
    </div>
  );
}
