"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ritual } from "@/lib/data";
import { useReducedMotion } from "@/lib/hooks";

/**
 * The Ritual — a scroll-driven narrative of the in-salon journey. A sticky
 * visual column tracks the active step (driven by ScrollTrigger) while the
 * copy steps scroll past, justifying the price with experience.
 */
export default function Ritual() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const steps = ref.current.querySelectorAll<HTMLElement>(".ritual-step");

    const ctx = gsap.context(() => {
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => self.isActive && setActive(i),
        });
        gsap.fromTo(
          step.querySelector(".ritual-copy"),
          { autoAlpha: 0.25, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 75%", once: true },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, [reduced]);

  const tones = [
    "from-espresso-800 to-cocoa",
    "from-cocoa to-gold-deep",
    "from-gold-deep to-gold-brass",
    "from-gold-brass to-champagne",
  ];

  return (
    <section id="ritual" className="relative bg-espresso py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-20 max-w-3xl">
          <p className="eyebrow mb-5 text-gold/60">{ritual.eyebrow}</p>
          <h2 className="font-serif text-[clamp(2.5rem,6.5vw,6rem)] font-light leading-[0.95] text-bone">
            {ritual.heading}
          </h2>
        </div>

        <div ref={ref} className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Sticky visual */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="relative aspect-square w-full overflow-hidden rounded-sm">
                {ritual.steps.map((s, i) => (
                  <div
                    key={s.index}
                    className={`absolute inset-0 bg-gradient-to-br ${tones[i]} transition-opacity duration-700 ease-luxe ${
                      active === i ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="grain absolute inset-0 opacity-[0.07]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif text-[14rem] font-light leading-none text-bone/15">
                        {s.index}
                      </span>
                    </div>
                  </div>
                ))}
                {/* Progress dots */}
                <div className="absolute bottom-6 left-6 flex gap-2">
                  {ritual.steps.map((s, i) => (
                    <span
                      key={s.index}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        active === i ? "w-8 bg-gold-light" : "w-3 bg-bone/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div>
            {ritual.steps.map((s) => (
              <div
                key={s.index}
                className="ritual-step flex min-h-[55vh] flex-col justify-center border-t border-gold/15 py-10 first:border-t-0 lg:min-h-[70vh]"
              >
                <div className="ritual-copy">
                  <div className="mb-5 flex items-center gap-4">
                    <span className="font-sans text-xs text-gold-light">{s.index}</span>
                    <span className="hairline w-16" />
                  </div>
                  <h3 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-tight text-bone">
                    {s.title}
                  </h3>
                  <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-bone/65 md:text-lg">
                    {s.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
