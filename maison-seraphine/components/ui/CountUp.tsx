"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";

/**
 * CountUp — animates a number from 0 to `value` the first time it enters the
 * viewport. Reduced-motion users see the final figure immediately.
 */
export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      return;
    }

    const proxy = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        n: value,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => setDisplay(proxy.n),
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(display).toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
