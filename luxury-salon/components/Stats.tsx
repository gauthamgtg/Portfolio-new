"use client";

import { stats } from "@/lib/data";
import CountUp from "./ui/CountUp";

/** Trust band — animated count-ups over a quiet espresso field. */
export default function Stats() {
  return (
    <section className="relative bg-espresso-soft py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="border-l border-gold/20 pl-6 first:border-l-0 lg:pl-8"
            >
              <CountUp
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                className="font-serif text-[clamp(3rem,7vw,6rem)] font-light leading-none text-gold-gradient"
              />
              <p className="mt-4 max-w-[14ch] font-sans text-sm leading-snug text-bone/60">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
