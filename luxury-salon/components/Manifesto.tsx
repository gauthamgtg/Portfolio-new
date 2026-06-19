"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { manifesto } from "@/lib/data";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Large kinetic typographic statement. Each line wipes up from behind a
 * hairline as the section scrolls through, with select words rendered in
 * shimmering gold italic for editorial emphasis.
 */
export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const lines = ref.current.querySelectorAll(".m-line-inner");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { yPercent: 110 },
        {
          yPercent: 0,
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            end: "bottom 75%",
            scrub: 1,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="manifesto"
      className="relative bg-bone py-28 text-espresso md:py-44"
    >
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <p className="eyebrow mb-12 text-cocoa/70">{manifesto.eyebrow}</p>

        <div ref={ref} className="font-serif font-light leading-[0.95]">
          {manifesto.lines.map((line, i) => {
            const accent = i === 2 || i === 5; // "We compose" / "one strand"
            return (
              <div key={i} className="mask-line">
                <span
                  className={`m-line-inner block text-[clamp(2.5rem,8.5vw,8rem)] tracking-tightest ${
                    accent ? "italic text-gold-deep" : "text-espresso"
                  }`}
                >
                  {line}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex justify-end">
          <p className="max-w-md font-sans text-base font-light leading-relaxed text-cocoa md:text-lg">
            {manifesto.body}
          </p>
        </div>
      </div>
    </section>
  );
}
