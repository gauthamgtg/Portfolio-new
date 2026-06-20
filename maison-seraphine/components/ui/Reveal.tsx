"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";

/**
 * Reveal — generic fade + rise on scroll. The workhorse for paragraphs,
 * images, captions and cards. Honours reduced motion (renders at rest).
 */
export default function Reveal({
  children,
  className,
  y = 36,
  delay = 0,
  duration = 1,
  start = "top 88%",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  start?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [y, delay, duration, start]);

  const Component = Tag as React.ElementType;
  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
