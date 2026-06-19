"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { testimonials } from "@/lib/data";
import { useReducedMotion } from "@/lib/hooks";

/**
 * An elegant rotating quote sequence. Quotes cross-fade on a timer (and on
 * manual selection), with a gold progress hairline marking the cadence.
 */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Auto-advance
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      6500
    );
    return () => clearInterval(id);
  }, []);

  // Animate on change
  useEffect(() => {
    if (reduced || !quoteRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" }
      );
    }, quoteRef);
    return () => ctx.revert();
  }, [index, reduced]);

  const t = testimonials[index];

  return (
    <section className="relative overflow-hidden bg-bone py-28 text-espresso md:py-44">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
        <p className="eyebrow mb-12 text-cocoa/60">In Their Words</p>

        <div ref={quoteRef}>
          <blockquote className="font-serif text-[clamp(1.75rem,4.5vw,3.5rem)] font-light italic leading-[1.15] text-espresso">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <div className="mt-10">
            <p className="font-sans text-sm uppercase tracking-luxe text-gold-deep">
              {t.name}
            </p>
            <p className="mt-1 font-sans text-xs text-cocoa/70">{t.context}</p>
          </div>
        </div>

        {/* Selectors */}
        <div className="mt-14 flex items-center justify-center gap-3">
          {testimonials.map((item, i) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setIndex(i)}
              data-cursor="hover"
              aria-label={`View testimonial from ${item.name}`}
              className="group relative h-1 w-12 overflow-hidden rounded-full bg-cocoa/20"
            >
              <span
                className={`absolute inset-0 origin-left bg-gold-deep transition-transform duration-500 ${
                  i === index ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
