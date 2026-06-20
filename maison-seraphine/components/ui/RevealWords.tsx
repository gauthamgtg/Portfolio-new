"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * RevealWords — kinetic heading. Splits a string into words, each clipped and
 * rising on a stagger as the heading scrolls into view. Optional `highlight`
 * words are painted in gold for editorial emphasis.
 */
export default function RevealWords({
  text,
  className,
  highlight = [],
  start = "top 80%",
  delay = 0,
}: {
  text: string;
  className?: string;
  highlight?: number[];
  start?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const inners = el.querySelectorAll<HTMLElement>(".rw-inner");
    const ctx = gsap.context(() => {
      gsap.set(inners, { yPercent: 120, rotate: 2 });
      gsap.to(inners, {
        yPercent: 0,
        rotate: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.07,
        delay,
        scrollTrigger: { trigger: el, start },
      });
    }, el);

    return () => ctx.revert();
  }, [start, delay]);

  return (
    <span ref={ref} className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span key={i} className="mr-[0.25em] inline-block overflow-hidden py-[0.04em]">
          <span
            className={cn(
              "rw-inner inline-block will-change-transform",
              highlight.includes(i) && "italic text-gold",
            )}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
