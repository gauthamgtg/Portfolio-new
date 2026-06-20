"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import AnimatedName from "./ui/AnimatedName";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect, useWebGLSupport } from "@/lib/hooks";
import { brand, hero } from "@/lib/content";
import { scrollToSection } from "@/lib/scroll";

// WebGL is heavy + browser-only: load it lazily, never on the server.
const HeroCanvas = dynamic(() => import("./hero/HeroCanvas"), { ssr: false });

/**
 * Hero — full-screen silk field + per-character wordmark reveal.
 * Renders a rich CSS gradient as both an instant placeholder and the graceful
 * fallback when WebGL is unavailable. `ready` (from the loader) gates the name
 * reveal so the two are perfectly in sync. The canvas pauses off-screen.
 */
export default function Hero({ ready }: { ready: boolean }) {
  const section = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const webgl = useWebGLSupport();
  const [active, setActive] = useState(true);

  const showCanvas = webgl !== false;

  // Pause the render loop when the hero leaves the viewport.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Parallax + fade of the hero copy as the visitor scrolls away.
  useIsoLayoutEffect(() => {
    const el = section.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.to(content.current, {
        yPercent: -18,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-bone"
    >
      {/* Instant + fallback gradient (always present, behind the canvas). */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 30% 20%, #5a4126 0%, #2a1c12 38%, #160d08 72%)",
        }}
      />

      {showCanvas && <HeroCanvas intro={ready} active={active} />}

      {/* Vignette + grain handled globally; add a soft bottom fade into page. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink/70" />

      {/* Copy */}
      <div
        ref={content}
        className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col justify-end px-6 pb-[16vh] md:px-12"
      >
        <p className="mb-6 flex items-center gap-3 text-[0.65rem] uppercase tracking-widest2 text-gold/90">
          <span className="inline-block h-px w-10 bg-gold/60" />
          {hero.eyebrow}
        </p>

        <h1 className="display-hero text-[clamp(3.5rem,15vw,15rem)] leading-[0.85]">
          <AnimatedName text={hero.word} play={ready} />
        </h1>

        <p className="mt-8 max-w-md text-pretty text-base leading-relaxed text-bone/70 md:text-lg">
          {hero.subhead}
        </p>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scrollToSection("#manifesto")}
        data-cursor="link"
        className="group absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        aria-label={hero.scrollCue}
      >
        <span className="text-[0.6rem] uppercase tracking-widest2 text-bone/55 transition-colors group-hover:text-gold">
          {hero.scrollCue}
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-bone/20">
          <span className="absolute inset-0 h-1/2 w-full animate-[scrollcue_2s_ease-in-out_infinite] bg-gold" />
        </span>
      </button>
    </section>
  );
}
