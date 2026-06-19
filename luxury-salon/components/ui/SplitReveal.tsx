"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks";

type Props = {
  children: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  /** Animate per "word" (default) or per "char". */
  by?: "word" | "char";
  /** Stagger in seconds between units. */
  stagger?: number;
  delay?: number;
};

/**
 * Splits a string into masked words/characters and reveals them line-by-line
 * on scroll — the editorial "type wipes up from behind a hairline" effect.
 * Honours reduced-motion by rendering the text statically.
 */
export default function SplitReveal({
  children,
  as: Tag = "span",
  className = "",
  by = "word",
  stagger = 0.06,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const units = ref.current.querySelectorAll(".su-inner");

    const tween = gsap.fromTo(
      units,
      { yPercent: 115, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        delay,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced, stagger, delay]);

  const tokens =
    by === "char" ? Array.from(children) : children.split(/(\s+)/);

  return (
    // @ts-expect-error — dynamic intrinsic tag
    <Tag ref={ref} className={className} aria-label={children}>
      {tokens.map((tok, i) => {
        if (tok.trim() === "") return <span key={i}>{tok}</span>;
        return (
          <span
            key={i}
            className="mask-line"
            style={{ display: "inline-block", verticalAlign: "top" }}
            aria-hidden
          >
            <span className="su-inner" style={{ display: "inline-block" }}>
              {tok}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
