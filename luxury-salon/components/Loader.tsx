"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks";
import { brand } from "@/lib/data";

/**
 * Intro sequence: the Maison Dorée monogram draws itself in via SVG path
 * animation while a gold progress line fills, then the whole curtain lifts to
 * hand off into the hero. `onDone` lets the hero stage its own reveal.
 */
export default function Loader({ onDone }: { onDone?: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const pathRefs = useRef<SVGPathElement[]>([]);
  const [hidden, setHidden] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const finish = () => {
      setHidden(true);
      onDone?.();
    };

    if (reduced) {
      finish();
      return;
    }

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      // Draw the monogram strokes via the dash-offset technique
      // (no premium DrawSVG plugin required).
      pathRefs.current.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });

      tl.to(pathRefs.current, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.inOut",
        stagger: 0.18,
      })
        .to(
          counter,
          {
            v: 100,
            duration: 2.0,
            ease: "power1.inOut",
            onUpdate: () => {
              if (pctRef.current)
                pctRef.current.textContent = `${Math.round(counter.v)}`;
              if (lineRef.current)
                lineRef.current.style.transform = `scaleX(${counter.v / 100})`;
            },
          },
          0
        )
        .to({}, { duration: 0.25 })
        .to(
          [pctRef.current, lineRef.current?.parentElement, "svg"],
          { autoAlpha: 0, y: -10, duration: 0.6 },
          ">-0.1"
        )
        .to(
          root.current,
          {
            yPercent: -100,
            duration: 1.1,
            ease: "expo.inOut",
            onComplete: finish,
          },
          ">-0.2"
        );
    }, root);

    return () => ctx.revert();
  }, [reduced, onDone]);

  if (hidden) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-espresso"
      aria-hidden
    >
      {/* Monogram — two interlocked strokes forming an "MD" mark */}
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        className="mb-10"
      >
        {/* Encircling ring */}
        <path
          ref={(el) => {
            if (el) pathRefs.current[0] = el;
          }}
          d="M60 8 A52 52 0 1 1 59.9 8"
          stroke="#C9A24B"
          strokeWidth="1"
        />
        {/* M */}
        <path
          ref={(el) => {
            if (el) pathRefs.current[1] = el;
          }}
          d="M34 78 L34 44 L48 66 L62 44 L62 78"
          stroke="#E4C77E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* D */}
        <path
          ref={(el) => {
            if (el) pathRefs.current[2] = el;
          }}
          d="M72 44 L72 78 L80 78 A17 17 0 0 0 80 44 Z"
          stroke="#E4C77E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <p className="eyebrow mb-6 text-gold/70">{brand.name}</p>

      <div className="relative h-px w-[min(60vw,360px)] overflow-hidden bg-gold/15">
        <span
          ref={lineRef}
          className="absolute inset-0 origin-left bg-gold-light"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <div className="mt-5 font-sans text-xs tracking-luxe text-bone/50">
        <span ref={pctRef}>0</span>
        <span> — composing your experience</span>
      </div>
    </div>
  );
}
