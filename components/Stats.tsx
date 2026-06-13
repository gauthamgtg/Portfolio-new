"use client";

import { metrics } from "@/lib/data";
import CountUp from "./ui/CountUp";
import Reveal from "./ui/Reveal";

export default function Stats() {
  return (
    <section className="section-pad !py-16">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {metrics.map((m, i) => {
          const decimals = m.value % 1 !== 0 ? 1 : 0;
          return (
            <Reveal key={m.label} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl glass p-6 transition-all hover:border-white/20">
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-neon-violet/20 blur-2xl transition-opacity group-hover:opacity-80" />
                <div className="font-display text-4xl font-bold text-white md:text-5xl">
                  {m.prefix}
                  <CountUp value={m.value} decimals={decimals} />
                  {m.suffix}
                </div>
                <p className="mt-2 text-sm text-white/55">{m.label}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
