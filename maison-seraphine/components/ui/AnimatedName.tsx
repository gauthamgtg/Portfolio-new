"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { toChars } from "@/lib/utils";

/**
 * AnimatedName — the hero wordmark.
 * Per-character mask reveal (each glyph rises out of an overflow-hidden slot)
 * with a metallic champagne→gold→cocoa gradient, plus a gold gleam that sweeps
 * across the word. Reveal is gated on `play` so the loader can hand off to it.
 * Reduced-motion users simply see the finished, static wordmark.
 */
export default function AnimatedName({
  text,
  play,
}: {
  text: string;
  play: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const chars = toChars(text);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const charEls = el.querySelectorAll<HTMLElement>(".hn-char");
    const shimmer = el.querySelector<HTMLElement>(".hn-shimmer");

    // Pre-hide immediately (before paint) to avoid a flash.
    gsap.set(charEls, { yPercent: 125 });
    if (shimmer) gsap.set(shimmer, { opacity: 0 });

    if (!play) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.15 })
        .to(charEls, {
          yPercent: 0,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.055,
        })
        .to(shimmer, { opacity: 1, duration: 0.6 }, "-=0.6")
        .fromTo(
          shimmer,
          { backgroundPositionX: "-160%" },
          {
            backgroundPositionX: "260%",
            duration: 2.6,
            ease: "power2.inOut",
            repeat: -1,
            repeatDelay: 3,
          },
          "<",
        );
    }, el);

    return () => ctx.revert();
  }, [play]);

  return (
    <span ref={ref} className="hn" aria-label={text}>
      <span className="hn-base" aria-hidden="true">
        {chars.map(({ char, isSpace }, i) =>
          isSpace ? (
            <span key={i} className="hn-space">
              &nbsp;
            </span>
          ) : (
            <span key={i} className="hn-mask">
              <span className="hn-char">{char}</span>
            </span>
          ),
        )}
      </span>
      <span className="hn-shimmer" aria-hidden="true">
        {text}
      </span>

      <style jsx>{`
        .hn {
          position: relative;
          display: inline-block;
        }
        .hn-base {
          display: inline-flex;
          align-items: flex-end;
        }
        .hn-mask {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
          padding: 0 0.012em;
        }
        .hn-space {
          display: inline-block;
          width: 0.22em;
        }
        .hn-char {
          display: inline-block;
          will-change: transform;
          background: linear-gradient(
            178deg,
            #f3ece0 0%,
            #e7cd8e 40%,
            #bf9d52 66%,
            #4a352a 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .hn-shimmer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            100deg,
            transparent 40%,
            rgba(255, 248, 231, 0.95) 50%,
            transparent 60%
          );
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </span>
  );
}
