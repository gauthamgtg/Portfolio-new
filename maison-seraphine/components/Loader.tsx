"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import { brand } from "@/lib/content";

/**
 * Loader — the intro sequence.
 * A monogram ring scribes itself via SVG stroke-dash animation, the letter
 * settles in with a gold shimmer, a hairline progress bar fills to 100, and the
 * whole curtain wipes upward (clip-path) to hand off to the hero. `onComplete`
 * fires exactly as the wipe begins so the hero reveal plays in sync.
 */
export default function Loader({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const ring = useRef<SVGCircleElement>(null);
  const [count, setCount] = useState(0);
  const done = useRef(false);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    onComplete();
  };

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      // Static: brief hold, fade out, hand off.
      setCount(100);
      const tl = gsap.timeline({ delay: 0.4 });
      tl.to(el, { autoAlpha: 0, duration: 0.4, onStart: finish });
      return () => tl.kill();
    }

    const ctx = gsap.context(() => {
      // Prepare the ring for a stroke-draw.
      const circle = ring.current!;
      const len = circle.getTotalLength();
      gsap.set(circle, { strokeDasharray: len, strokeDashoffset: len });

      const progress = { v: 0 };
      const tl = gsap.timeline();

      tl.to(".ld-mono", { autoAlpha: 1, scale: 1, duration: 1.1, ease: "expo.out" }, 0)
        .to(circle, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" }, 0.1)
        .to(".ld-letter", { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out" }, 0.5)
        .to(".ld-name", { autoAlpha: 1, duration: 1, ease: "power2.out" }, 0.7)
        .to(
          progress,
          {
            v: 100,
            duration: 2.2,
            ease: "power1.inOut",
            onUpdate: () => setCount(Math.round(progress.v)),
          },
          0.2,
        )
        .to(".ld-bar-fill", { scaleX: 1, duration: 2.2, ease: "power1.inOut" }, 0.2)
        // Hand-off: fade the marks, then wipe the curtain up.
        .to([".ld-mono", ".ld-name", ".ld-meta"], {
          autoAlpha: 0,
          y: -18,
          duration: 0.6,
          ease: "power2.in",
        })
        .to(
          el,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.1,
            ease: "expo.inOut",
            onStart: finish,
          },
          "-=0.1",
        )
        .set(el, { pointerEvents: "none" });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-bone"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-hidden="true"
    >
      <div className="light-bloom pointer-events-none absolute inset-0 opacity-60" />

      <div className="ld-mono relative flex flex-col items-center opacity-0 [transform:scale(0.92)]">
        <div className="relative h-[150px] w-[150px]">
          <svg viewBox="0 0 150 150" className="absolute inset-0 h-full w-full">
            <circle
              ref={ring}
              cx="75"
              cy="75"
              r="64"
              fill="none"
              stroke="var(--c-gold)"
              strokeWidth="1"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="ld-letter font-display gold-shimmer translate-y-3 text-7xl opacity-0"
              style={{ fontWeight: 300 }}
            >
              {brand.monogram}
            </span>
          </div>
        </div>
        <span className="ld-name mt-8 text-[0.62rem] uppercase tracking-widest2 text-bone/70 opacity-0">
          {brand.fullName}
        </span>
      </div>

      {/* Progress meta */}
      <div className="ld-meta absolute bottom-10 left-1/2 w-[min(78vw,420px)] -translate-x-1/2">
        <div className="mb-3 flex items-end justify-between text-[0.6rem] uppercase tracking-widest2 text-bone/55">
          <span>{brand.tagline}</span>
          <span>{count}%</span>
        </div>
        <div className="h-px w-full bg-bone/15">
          <div className="ld-bar-fill h-full origin-left scale-x-0 bg-gold" />
        </div>
      </div>
    </div>
  );
}
