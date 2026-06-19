"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { brand } from "@/lib/data";
import { hasWebGL } from "@/lib/webgl";
import { useReducedMotion } from "@/lib/hooks";

// Lazy, client-only WebGL — never ships to SSR, never blocks first paint.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function Hero({ started }: { started: boolean }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const [webgl, setWebgl] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    setWebgl(hasWebGL());
  }, []);

  // Per-character mask reveal of the salon name, fired on loader hand-off.
  useEffect(() => {
    if (!started || !titleRef.current) return;

    if (reduced) {
      gsap.set([titleRef.current, subRef.current], { autoAlpha: 1 });
      return;
    }

    const chars = titleRef.current.querySelectorAll(".hero-char");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.set(titleRef.current, { autoAlpha: 1 })
        .fromTo(
          chars,
          { yPercent: 120, rotate: 4 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1.3,
            ease: "expo.out",
            stagger: 0.045,
          }
        )
        .fromTo(
          subRef.current,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out" },
          "-=0.6"
        );
    });
    return () => ctx.revert();
  }, [started, reduced]);

  const name = brand.name; // "Maison Dorée"

  return (
    <section
      id="hero"
      className="relative h-[100svh] w-full overflow-hidden bg-espresso"
    >
      {/* WebGL flow scene with art-directed CSS fallback */}
      <div className="absolute inset-0">
        {webgl && !reduced ? (
          <HeroCanvas active={started} />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_30%_20%,#3A2C20_0%,#241B14_45%,#120E0A_100%)]" />
        )}
      </div>

      {/* Atmosphere */}
      <div className="vignette pointer-events-none absolute inset-0" />

      {/* Centre composition */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p
          className="eyebrow mb-8 text-gold/70"
          style={{ opacity: started ? 1 : 0, transition: "opacity 1.2s ease 0.4s" }}
        >
          {brand.city} · Est. {brand.established}
        </p>

        <h1
          ref={titleRef}
          className="font-serif display-clamp font-light text-bone"
          style={{ visibility: "hidden" }}
          aria-label={name}
        >
          {Array.from(name).map((ch, i) => (
            <span
              key={i}
              className="mask-line"
              style={{ verticalAlign: "top" }}
              aria-hidden
            >
              <span
                className={`hero-char text-gold-gradient shimmer-sweep ${
                  ch === " " ? "px-1" : ""
                }`}
              >
                {ch === " " ? " " : ch}
              </span>
            </span>
          ))}
        </h1>

        <div ref={subRef} style={{ visibility: "hidden" }}>
          <p className="mx-auto mt-8 max-w-xl font-sans text-base font-light leading-relaxed text-bone/70 md:text-lg">
            {brand.tagline} An atelier of master colourists and stylists for the
            woman who is composed, never finished.
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#manifesto"
        data-cursor="hover"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
        style={{ opacity: started ? 1 : 0, transition: "opacity 1.2s ease 0.8s" }}
        aria-label="Scroll to explore"
      >
        <span className="eyebrow block text-bone/50">Scroll</span>
        <span className="mx-auto mt-3 block h-12 w-px overflow-hidden bg-gold/20">
          <span className="block h-1/2 w-full animate-[scrollcue_2s_ease-in-out_infinite] bg-gold-light" />
        </span>
      </a>

      <style jsx>{`
        @keyframes scrollcue {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(200%);
          }
        }
      `}</style>
    </section>
  );
}
