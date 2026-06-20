"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import Eyebrow from "../ui/Eyebrow";
import { cn } from "@/lib/utils";
import { testimonials } from "@/lib/content";

/**
 * Testimonials — an animated quote sequence. The active quote wipes in by line;
 * it auto-advances on a gentle cadence (paused for reduced-motion and on hover)
 * and can be driven by the index rail. One voice at a time, like a placed ad.
 */
export default function Testimonials() {
  const [i, setI] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  const animateIn = useCallback(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !quoteRef.current) return;
    gsap.fromTo(
      quoteRef.current,
      { autoAlpha: 0, y: 26 },
      { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out" },
    );
  }, []);

  useIsoLayoutEffect(() => {
    animateIn();
  }, [i, animateIn]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = setInterval(() => {
      if (!paused.current) setI((v) => (v + 1) % testimonials.length);
    }, 6500);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[i];

  return (
    <section
      id="testimonials"
      className="relative bg-bone py-[14vh] md:py-[20vh]"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="mx-auto max-w-[1100px] px-6 text-center md:px-12">
        <Eyebrow className="justify-center">
          <span className="text-gold">06</span> — In Her Words
        </Eyebrow>

        <div ref={quoteRef} className="mt-12 min-h-[40vh]">
          <span className="font-display text-6xl leading-none text-gold/40">“</span>
          <blockquote className="mx-auto max-w-4xl text-balance font-display text-[clamp(1.6rem,3.6vw,3.1rem)] font-light leading-[1.18] tracking-tight text-espresso">
            {t.quote}
          </blockquote>
          <div className="mt-10">
            <p className="font-display text-xl text-espresso">{t.name}</p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-widest2 text-cocoa/55">
              {t.detail}
            </p>
          </div>
        </div>

        {/* Index rail */}
        <div className="mt-12 flex items-center justify-center gap-3">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              data-cursor="link"
              aria-label={`Testimonial ${idx + 1}`}
              className="group relative h-8 w-8"
            >
              <span
                className={cn(
                  "absolute left-1/2 top-1/2 h-px -translate-x-1/2 -translate-y-1/2 bg-cocoa/40 transition-all duration-500",
                  i === idx ? "w-8 bg-gold" : "w-4 group-hover:w-6",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
