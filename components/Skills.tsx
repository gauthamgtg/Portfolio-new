"use client";

import { skillGroups, analyticalTechniques } from "@/lib/data";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

function Pill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-neon-cyan/40 hover:text-white">
      {label}
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-pad">
      <SectionHeading
        eyebrow="Toolkit"
        title="The stack behind the numbers"
        subtitle="From raw SQL and Python pipelines to dashboards and product-analytics platforms — the full path from data to decision."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={(i % 3) * 0.06}>
            <div className="h-full rounded-2xl glass p-5 transition-colors hover:border-white/20">
              <h3 className="font-display text-base font-semibold text-white">{g.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <Pill key={it} label={it} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-14">
        <Reveal>
          <h3 className="mb-5 font-display text-lg font-semibold text-white/90">
            Analytical techniques
          </h3>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {analyticalTechniques.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5">
                <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-neon-violet">
                  {g.title}
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <Pill key={it} label={it} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
