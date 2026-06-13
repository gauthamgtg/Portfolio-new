"use client";

import { profile } from "@/lib/data";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const focus = [
  { k: "SaaS", v: "MRR, churn, cohorts & investor reporting" },
  { k: "Quick Commerce", v: "A/B testing, attribution & surge pricing" },
  { k: "Fintech", v: "Fraud risk scoring & detection systems" },
];

export default function About() {
  return (
    <section id="about" className="section-pad">
      <SectionHeading eyebrow="About" title="Data into decisions that move the needle" />
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <p className="text-lg leading-relaxed text-white/70">{profile.summary}</p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="flex flex-col gap-3">
            {focus.map((f) => (
              <div
                key={f.k}
                className="rounded-2xl glass p-5 transition-colors hover:border-white/20"
              >
                <div className="font-display text-sm font-semibold uppercase tracking-wider text-neon-cyan">
                  {f.k}
                </div>
                <div className="mt-1 text-sm text-white/65">{f.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
