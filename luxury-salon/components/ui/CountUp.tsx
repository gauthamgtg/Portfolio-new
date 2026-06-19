"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/** Number that counts up from zero the first time it scrolls into view. */
export default function CountUp({ value, prefix = "", suffix = "", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduced) {
      node.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
      return;
    }

    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: value,
      duration: 2.2,
      ease: "power2.out",
      onUpdate: () => {
        node.textContent = `${prefix}${Math.round(obj.v).toLocaleString()}${suffix}`;
      },
      scrollTrigger: { trigger: node, start: "top 88%", once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, prefix, suffix, reduced]);

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}
