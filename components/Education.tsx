"use client";

import { GraduationCap } from "lucide-react";
import { education } from "@/lib/data";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

export default function Education() {
  return (
    <section id="education" className="section-pad">
      <SectionHeading eyebrow="Education" title="Foundations" />
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((e, i) => (
          <Reveal key={e.degree} delay={i * 0.08}>
            <div className="flex h-full gap-4 rounded-2xl glass p-6 transition-colors hover:border-white/20">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-violet/20 text-neon-cyan">
                <GraduationCap size={22} />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold leading-snug text-white">
                  {e.degree}
                </h3>
                <p className="mt-1 text-sm text-neon-cyan">{e.field}</p>
                <p className="mt-2 text-sm text-white/60">{e.school}</p>
                <p className="mt-0.5 text-xs text-white/40">{e.period}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
