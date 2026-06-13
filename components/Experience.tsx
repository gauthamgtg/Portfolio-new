"use client";

import { experience } from "@/lib/data";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

export default function Experience() {
  return (
    <section id="experience" className="section-pad">
      <SectionHeading
        eyebrow="Experience"
        title="5.5+ years building analytics teams rely on"
      />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-neon-cyan/60 via-neon-violet/40 to-transparent md:left-[9px]" />

        <div className="flex flex-col gap-10">
          {experience.map((exp, i) => (
            <Reveal key={`${exp.company}-${exp.period}`} delay={i * 0.05}>
              <div className="relative pl-10 md:pl-14">
                {/* Node */}
                <span className="absolute left-0 top-1.5 grid h-[18px] w-[18px] place-items-center rounded-full bg-ink ring-1 ring-white/15">
                  <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-neon-cyan to-neon-violet" />
                </span>

                <div className="rounded-2xl glass p-6 transition-colors hover:border-white/20 md:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-xl font-bold text-white">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-medium text-white/45">{exp.period}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-semibold text-neon-cyan">{exp.company}</span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/50">{exp.context}</span>
                  </div>

                  <ul className="mt-4 space-y-2.5">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed text-white/65">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-violet/70" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
