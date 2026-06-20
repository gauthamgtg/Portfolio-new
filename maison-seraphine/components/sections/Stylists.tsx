"use client";

import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import RevealWords from "../ui/RevealWords";
import ToneImage from "../ui/ToneImage";
import { cn } from "@/lib/utils";
import { stylists } from "@/lib/content";

/**
 * Stylists — "The Masters". Editorial portrait cards in a magazine-asymmetric
 * grid (alternating vertical offsets). Portraits gently scale and reveal a bio
 * + Instagram link on hover.
 */
export default function Stylists() {
  return (
    <section id="stylists" className="relative bg-bone py-[12vh] md:py-[18vh]">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>
              <span className="text-gold">03</span> — The Masters
            </Eyebrow>
            <h2 className="mt-7 font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-[0.95] tracking-tight text-espresso">
              <RevealWords text="Hands that compose" highlight={[2]} />
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-cocoa/70">
            Six masters, each a specialist. You are matched to the artist whose
            discipline your hair deserves — never simply the next available chair.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-8">
          {stylists.map((s, i) => (
            <Reveal
              key={s.name}
              delay={(i % 4) * 0.08}
              className={cn(i % 2 === 1 && "md:mt-16")}
            >
              <article className="group">
                <div
                  className="relative aspect-[3/4] overflow-hidden rounded-lg"
                  data-cursor="view"
                >
                  <div className="absolute inset-0 transition-transform duration-700 ease-lux group-hover:scale-[1.06]">
                    <ToneImage tone={s.tone} className="h-full w-full" />
                  </div>

                  {/* Specialty tag */}
                  <span className="absolute left-4 top-4 rounded-full border border-bone/40 bg-ink/20 px-3 py-1 text-[0.55rem] uppercase tracking-widest2 text-bone backdrop-blur-sm">
                    {s.specialty}
                  </span>

                  {/* Hover bio */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 ease-lux group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-xs leading-relaxed text-bone/85">{s.bio}</p>
                    <a
                      href={`https://instagram.com/${s.instagram.replace("@", "")}`}
                      data-cursor="link"
                      className="mt-3 inline-block text-[0.65rem] uppercase tracking-widest2 text-gold-light hover:text-bone"
                    >
                      {s.instagram} ↗
                    </a>
                  </div>
                </div>

                <h3 className="mt-5 font-display text-xl text-espresso">{s.name}</h3>
                <p className="mt-1 text-[0.65rem] uppercase tracking-widest2 text-cocoa/55">
                  {s.role}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
