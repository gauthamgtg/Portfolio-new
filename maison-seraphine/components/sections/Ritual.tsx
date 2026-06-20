"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import Eyebrow from "../ui/Eyebrow";
import ToneImage from "../ui/ToneImage";
import RevealWords from "../ui/RevealWords";
import { cn } from "@/lib/utils";
import { ritual } from "@/lib/content";

const TONES: [string, string][] = [
  ["#E8D4B8", "#9A7A48"],
  ["#C8A8A0", "#5A3A38"],
  ["#BFA15F", "#3A2A14"],
  ["#9C8791", "#241A20"],
];

/**
 * Ritual — "The Experience". A scroll-driven narrative: the steps scroll past a
 * sticky visual that cross-fades to match whichever step is active. This is the
 * section that justifies the price — an afternoon, not an appointment.
 */
export default function Ritual() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useIsoLayoutEffect(() => {
    const el = section.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ritual-step").forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          end: "bottom 60%",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      id="ritual"
      className="relative bg-ink py-[12vh] text-bone md:py-[16vh]"
    >
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Eyebrow dark>
          <span className="text-gold">05</span> — {ritual.eyebrow}
        </Eyebrow>
        <h2 className="mt-7 max-w-3xl font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-[0.98] tracking-tight">
          <RevealWords text={ritual.heading} highlight={[2]} />
        </h2>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-20">
          {/* Sticky visual (desktop) */}
          <div className="hidden md:block">
            <div className="sticky top-[18vh] aspect-[4/5] overflow-hidden rounded-xl">
              {ritual.steps.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "absolute inset-0 transition-all duration-700 ease-lux",
                    active === i ? "scale-100 opacity-100" : "scale-105 opacity-0",
                  )}
                >
                  <ToneImage tone={TONES[i % TONES.length]} className="h-full w-full">
                    <span className="absolute right-5 top-5 font-display text-7xl font-light text-bone/20">
                      {ritual.steps[i].index}
                    </span>
                  </ToneImage>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div>
            {ritual.steps.map((step, i) => (
              <div
                key={step.index}
                className="ritual-step flex min-h-[58vh] flex-col justify-center border-t border-bone/12 py-10 first:border-t-0 md:min-h-[64vh]"
              >
                {/* Mobile visual */}
                <ToneImage
                  tone={TONES[i % TONES.length]}
                  className="mb-7 aspect-[16/10] w-full overflow-hidden rounded-lg md:hidden"
                />
                <p className="text-[0.62rem] uppercase tracking-widest2 text-gold/80">
                  {step.time}
                </p>
                <h3
                  className={cn(
                    "mt-3 font-display text-4xl font-light leading-tight transition-colors duration-500 md:text-5xl",
                    active === i ? "text-bone" : "text-bone/45",
                  )}
                >
                  {step.title}
                </h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-bone/65">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
