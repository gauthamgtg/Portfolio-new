"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { lookbook, type Look } from "@/lib/data";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Cinematic horizontal lookbook. The section pins while the page scroll is
 * translated into sideways movement of the track; each look is introduced
 * with kinetic typography. Clicking a look opens a lightbox.
 *
 * Reduced-motion / no-JS gracefully degrades to a horizontally scrollable
 * row (native overflow) with no pinning.
 */
export default function Lookbook() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [lightbox, setLightbox] = useState<Look | null>(null);

  useEffect(() => {
    if (reduced || !section.current || !track.current) return;

    const ctx = gsap.context(() => {
      const getScrollDistance = () =>
        track.current!.scrollWidth - window.innerWidth;

      const tween = gsap.to(track.current, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Subtle parallax on the index numerals as they pass
      gsap.utils.toArray<HTMLElement>(".look-num").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 12 },
          {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="lookbook" className="relative bg-espresso text-bone">
      {/* Heading band */}
      <div className="mx-auto flex max-w-[1600px] items-end justify-between px-6 pt-28 md:px-10 md:pt-40">
        <div>
          <p className="eyebrow mb-5 text-gold/60">The Lookbook</p>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-none">
            Composed,
            <br />
            <span className="italic text-gold-gradient">not styled.</span>
          </h2>
        </div>
        <p className="hidden max-w-xs font-sans text-sm leading-relaxed text-bone/55 md:block">
          A living archive of recent work. Drag, scroll, and dwell — every look
          left the chair exactly as you see it.
        </p>
      </div>

      {/* Pinned horizontal track */}
      <div ref={section} className="relative mt-16 overflow-hidden md:mt-24">
        <div
          ref={track}
          className={`flex gap-6 px-6 pb-28 md:gap-10 md:px-10 md:pb-40 ${
            reduced ? "overflow-x-auto" : "w-max"
          }`}
        >
          {lookbook.map((look) => (
            <button
              key={look.index}
              type="button"
              onClick={() => setLightbox(look)}
              data-cursor="hover"
              data-cursor-label="View"
              className="group relative h-[62vh] w-[78vw] shrink-0 overflow-hidden rounded-sm text-left sm:w-[58vw] md:w-[38vw] lg:w-[30vw]"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${look.tone} transition-transform duration-[1.4s] ease-luxe group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent" />
              <span className="look-num pointer-events-none absolute right-4 top-2 font-serif text-[7rem] font-light leading-none text-bone/10">
                {look.index}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3 className="font-serif text-3xl font-light text-bone">
                  {look.title}
                </h3>
                <p className="mt-2 font-sans text-sm text-bone/70">
                  {look.caption}
                </p>
                <span className="mt-4 inline-block font-sans text-[0.7rem] uppercase tracking-luxe text-gold-light opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Open ↗
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-espresso/90 p-6 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          data-cursor="hover"
          data-cursor-label="Close"
        >
          <div
            className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${lightbox.tone}`} />
            <div className="grain absolute inset-0 opacity-[0.08]" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/80 to-transparent p-8">
              <p className="eyebrow mb-2 text-gold-light">{lightbox.index}</p>
              <h3 className="font-serif text-4xl font-light text-bone">
                {lightbox.title}
              </h3>
              <p className="mt-2 font-sans text-sm text-bone/75">
                {lightbox.caption}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-bone/30 text-bone transition-colors hover:border-gold-light hover:text-gold-light"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
