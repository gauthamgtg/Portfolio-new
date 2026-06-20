"use client";

import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import RevealLines from "../ui/RevealLines";
import Marquee from "../ui/Marquee";
import { brand, manifesto } from "@/lib/content";

/**
 * Manifesto — the philosophy statement. Oversized display type wipes in line by
 * line; the final line is gilded for editorial emphasis. A quiet marquee of the
 * house's pillars anchors the section.
 */
export default function Manifesto() {
  return (
    <section id="manifesto" className="relative bg-bone py-[14vh] md:py-[20vh]">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Eyebrow>
          <span className="text-gold">01</span> — {manifesto.eyebrow}
        </Eyebrow>

        <div className="mt-12 grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-9">
            <RevealLines
              lines={manifesto.lines}
              className="font-display text-[clamp(1.85rem,5.2vw,4.4rem)] font-light leading-[1.08] tracking-tight text-espresso [&>span:last-child_.rl-inner]:italic [&>span:last-child_.rl-inner]:text-gold"
            />
          </div>

          <div className="lg:col-span-3 lg:pt-3">
            <Reveal>
              <p className="text-pretty text-sm leading-relaxed text-cocoa/80">
                {manifesto.body}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 font-display text-xl italic text-gold">
                — {brand.fullName}
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mt-[12vh] border-y border-gold/15 py-5 text-[0.7rem] uppercase tracking-widest2 text-cocoa/60">
        <Marquee
          items={[
            "Couture Color",
            "Master Craftsmanship",
            "Private Suites",
            "By Appointment Only",
            "Beverly Hills",
          ]}
        />
      </div>
    </section>
  );
}
