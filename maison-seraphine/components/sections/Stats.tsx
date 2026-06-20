"use client";

import Eyebrow from "../ui/Eyebrow";
import CountUp from "../ui/CountUp";
import Reveal from "../ui/Reveal";
import { stats } from "@/lib/content";

/**
 * Stats — quiet proof. Animated count-ups on an espresso band, gilded numerals
 * over restrained labels. Trust without shouting.
 */
export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-espresso py-[10vh] text-bone md:py-[14vh]">
      <div className="light-bloom pointer-events-none absolute inset-0 opacity-30" />
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Eyebrow dark>
          <span className="text-gold">—</span> A House of Record
        </Eyebrow>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="border-t border-gold/20 pt-6">
                <p className="font-display text-[clamp(3rem,7vw,6rem)] font-light leading-none text-gold-light">
                  <CountUp value={s.value} suffix={s.suffix} prefix={s.prefix} />
                </p>
                <p className="mt-4 text-[0.68rem] uppercase tracking-widest2 text-bone/55">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
