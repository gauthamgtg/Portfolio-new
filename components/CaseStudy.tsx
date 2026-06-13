"use client";

import { caseStudy } from "@/lib/data";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const tagColor: Record<string, string> = {
  Problem: "text-neon-fuchsia border-neon-fuchsia/30 bg-neon-fuchsia/10",
  Investigation: "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10",
  Insight: "text-neon-violet border-neon-violet/30 bg-neon-violet/10",
  Action: "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10",
  Result: "text-neon-mint border-neon-mint/30 bg-neon-mint/10",
};

export default function CaseStudy() {
  return (
    <section id="case-study" className="section-pad">
      <SectionHeading
        eyebrow={caseStudy.eyebrow}
        title={caseStudy.title}
        subtitle={caseStudy.context}
      />

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Narrative steps */}
        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-neon-fuchsia/50 via-neon-violet/40 to-neon-mint/50" />
          <div className="flex flex-col gap-6">
            {caseStudy.steps.map((s, i) => (
              <Reveal key={s.tag} delay={i * 0.06}>
                <div className="relative pl-10">
                  <span className="absolute left-0 top-1 grid h-[18px] w-[18px] place-items-center rounded-full bg-ink ring-1 ring-white/15">
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-neon-cyan to-neon-violet" />
                  </span>
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${tagColor[s.tag]}`}
                  >
                    {s.tag}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-white">
                    {s.heading}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Outcomes panel */}
        <Reveal delay={0.1}>
          <div className="sticky top-28 flex flex-col gap-4 rounded-3xl glass-strong p-7">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white/50">
              Outcome
            </h4>
            {caseStudy.outcomes.map((o) => (
              <div key={o.label} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                <div className="font-display text-4xl font-bold gradient-text">{o.value}</div>
                <div className="mt-1 text-sm text-white/55">{o.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
