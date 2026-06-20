"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import Eyebrow from "../ui/Eyebrow";
import ToneImage from "../ui/ToneImage";
import { lookbook } from "@/lib/content";

// The lightbox pulls in Three.js — load it only when a plate is opened so it
// never weighs on the initial page load.
const LookbookLightbox = dynamic(() => import("../LookbookLightbox"), {
  ssr: false,
});

/**
 * Lookbook — a pinned, horizontally-scrubbed gallery. The page locks while the
 * track translates sideways; oversized indices parallax behind each plate.
 * Clicking a plate opens a WebGL RGB-shift lightbox.
 *
 * Accessible fallback: under reduced-motion the section becomes a native
 * horizontal scroll-snap strip (no pinning), preserving the editorial layout
 * without scroll-hijacking.
 */
export default function Lookbook() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);

  useIsoLayoutEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(isReduced);
    if (isReduced) return; // native horizontal scroll fallback

    const ctx = gsap.context(() => {
      const getDistance = () => tr.scrollWidth - window.innerWidth;

      gsap.to(tr, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Parallax the giant index numerals as the track moves.
      gsap.utils.toArray<HTMLElement>(".lb-index").forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: 18 },
          {
            xPercent: -18,
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              start: "top top",
              end: () => `+=${getDistance()}`,
              scrub: true,
            },
          },
        );
      });
    }, sec);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={section}
        id="lookbook"
        className="relative overflow-hidden bg-ink py-0 text-bone"
      >
        <div className="light-bloom pointer-events-none absolute inset-0 opacity-40" />

        <div
          ref={track}
          className={
            reduced
              ? "flex snap-x snap-mandatory items-center gap-6 overflow-x-auto px-6 py-24 md:px-12"
              : "flex h-[100svh] items-center gap-8 px-6 will-change-transform md:gap-16 md:px-12"
          }
        >
          {/* Lead / title panel */}
          <div className="flex h-full shrink-0 snap-start flex-col justify-center pr-6 md:w-[34vw] md:pr-0">
            <Eyebrow dark>
              <span className="text-gold">04</span> — Lookbook
            </Eyebrow>
            <h2 className="mt-7 font-display text-[clamp(2.8rem,7vw,6rem)] font-light leading-[0.92] tracking-tight">
              The
              <br />
              <span className="italic text-gold">Lookbook</span>
            </h2>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-bone/60">
              A season of commissions, photographed in our suites. Each look,
              composed for one woman alone.
            </p>
            <p className="mt-10 flex items-center gap-3 text-[0.65rem] uppercase tracking-widest2 text-bone/50">
              <span className="inline-block h-px w-10 bg-gold/60" />
              {reduced ? "Scroll sideways" : "Scroll to explore"}
            </p>
          </div>

          {/* Look plates */}
          {lookbook.map((look, i) => (
            <button
              key={look.index}
              onClick={() => setLightbox(i)}
              data-cursor="view"
              className="group relative h-[62vh] w-[78vw] shrink-0 snap-center overflow-hidden rounded-xl text-left md:h-[72vh] md:w-[34vw]"
            >
              <div className="absolute inset-0 transition-transform duration-700 ease-lux group-hover:scale-[1.05]">
                <ToneImage tone={look.tone} className="h-full w-full" />
              </div>

              {/* Giant parallax index */}
              <span className="lb-index pointer-events-none absolute -right-2 top-2 font-display text-[7rem] font-light leading-none text-bone/10 md:text-[9rem]">
                {look.index}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="text-[0.6rem] uppercase tracking-widest2 text-gold-light">
                  {look.subtitle}
                </p>
                <h3 className="mt-2 font-display text-3xl font-light md:text-4xl">
                  {look.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-bone/70">
                  {look.caption}
                </p>
              </div>
            </button>
          ))}

          {/* Trailing spacer for the last plate's breathing room */}
          <div className="h-1 w-6 shrink-0 md:w-24" aria-hidden />
        </div>
      </section>

      <LookbookLightbox
        looks={lookbook}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={(i) => setLightbox(i)}
      />
    </>
  );
}
