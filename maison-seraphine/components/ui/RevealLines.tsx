"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * RevealLines — renders an array of lines, each clipped in an overflow-hidden
 * row, then wipes them up line-by-line as the block scrolls into view.
 * SSR markup is fully visible (accessible / indexable); the hidden start state
 * is applied before paint via a layout effect, so there is no flash.
 */
export default function RevealLines({
  lines,
  className,
  lineClassName,
  stagger = 0.12,
  start = "top 82%",
}: {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const targets = el.querySelectorAll<HTMLElement>(".rl-inner");
    const ctx = gsap.context(() => {
      gsap.set(targets, { yPercent: 115 });
      gsap.to(targets, {
        yPercent: 0,
        duration: 1.15,
        ease: "expo.out",
        stagger,
        scrollTrigger: { trigger: el, start },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, start]);

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span className={cn("rl-inner block will-change-transform", lineClassName)}>
            {line}
          </span>
        </span>
      ))}
    </div>
  );
}
