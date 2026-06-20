"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import Eyebrow from "../ui/Eyebrow";
import ToneImage from "../ui/ToneImage";
import RevealWords from "../ui/RevealWords";
import { cn } from "@/lib/utils";
import { services } from "@/lib/content";

/**
 * Services — an editorial index of commissions. On precise pointers a framed
 * preview tracks the cursor and cross-fades to the hovered service; on touch
 * each row carries its own inline plate. The whole thing reads like a couture
 * price list, not a service menu.
 */
export default function Services() {
  const section = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useIsoLayoutEffect(() => {
    const el = preview.current;
    const host = section.current;
    if (!el || !host) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3" });
    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    return () => host.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section
      ref={section}
      id="services"
      className="relative bg-cream py-[12vh] md:py-[18vh]"
      onMouseLeave={() => setActive(null)}
    >
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>
              <span className="text-gold">02</span> — Services
            </Eyebrow>
            <h2 className="mt-7 font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-[0.95] tracking-tight text-espresso">
              <RevealWords text="The Commissions" highlight={[1]} />
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-cocoa/70">
            Every appointment begins with a consultation in natural light. Prices
            are a starting point; each commission is quoted to the individual.
          </p>
        </div>

        {/* List */}
        <ul className="mt-14 border-t border-espresso/15">
          {services.map((s, i) => (
            <li key={s.index} className="border-b border-espresso/15">
              <button
                onMouseEnter={() => setActive(i)}
                data-cursor="view"
                className="group flex w-full items-center gap-5 py-7 text-left md:py-9"
              >
                <span className="w-10 shrink-0 font-body text-xs text-gold/80">
                  {s.index}
                </span>

                {/* Mobile inline plate */}
                <ToneImage
                  tone={s.tone}
                  className="h-14 w-14 shrink-0 rounded-md md:hidden"
                />

                <span className="flex-1">
                  <span className="block font-display text-[clamp(1.7rem,4.4vw,3.4rem)] font-light leading-tight tracking-tight text-espresso transition-all duration-500 ease-lux group-hover:translate-x-3 group-hover:text-gold">
                    {s.title}
                  </span>
                  <span className="mt-1 block text-xs uppercase tracking-widest2 text-cocoa/55">
                    {s.subtitle}
                  </span>
                </span>

                <span className="hidden text-right md:block">
                  <span className="block font-display text-xl text-espresso">
                    {s.price}
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-widest2 text-cocoa/50">
                    {s.priceNote}
                  </span>
                </span>

                <span className="ml-4 hidden text-gold transition-transform duration-500 ease-lux group-hover:translate-x-2 lg:block">
                  →
                </span>
              </button>

              {/* Mobile detail */}
              <p className="-mt-2 mb-6 pl-[3.75rem] pr-2 text-sm leading-relaxed text-cocoa/70 md:hidden">
                {s.description}
                <span className="mt-1 block font-display text-base text-espresso">
                  {s.price}{" "}
                  <span className="text-xs text-cocoa/50">· {s.priceNote}</span>
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Cursor-following preview (desktop) */}
      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[clamp(320px,40vh,460px)] w-[clamp(260px,24vw,360px)] overflow-hidden rounded-lg md:block"
        style={{
          opacity: active !== null ? 1 : 0,
          transform: "translate(-50%,-50%)",
          transition: "opacity 0.45s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {services.map((s, i) => (
          <div
            key={s.index}
            className={cn(
              "absolute inset-0 transition-all duration-500 ease-lux",
              active === i ? "scale-100 opacity-100" : "scale-105 opacity-0",
            )}
          >
            <ToneImage tone={s.tone} className="h-full w-full">
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[0.6rem] uppercase tracking-widest2 text-bone/70">
                  {s.subtitle}
                </p>
                <p className="mt-1 font-display text-2xl text-bone">{s.title}</p>
                <p className="mt-3 text-xs leading-relaxed text-bone/75">
                  {s.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.details.map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-bone/30 px-3 py-1 text-[0.6rem] uppercase tracking-wider text-bone/80"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </ToneImage>
          </div>
        ))}
      </div>
    </section>
  );
}
