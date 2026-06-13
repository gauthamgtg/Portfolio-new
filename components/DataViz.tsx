"use client";

import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import CohortHeatmap from "./charts/CohortHeatmap";
import MrrWaterfall from "./charts/MrrWaterfall";
import ConversionFunnel from "./charts/ConversionFunnel";
import SpendTrend from "./charts/SpendTrend";

const panels = [
  {
    title: "Retention cohorts",
    insight: "Apr cohort retains 61% by M5 — the activation flow is working.",
    chart: <CohortHeatmap />,
  },
  {
    title: "MRR movement",
    insight: "New + expansion outpace churn: $120K → $145K net.",
    chart: <MrrWaterfall />,
  },
  {
    title: "Conversion funnel",
    insight: "Biggest leak is mid-signup; fixes lifted paid conversion +4%.",
    chart: <ConversionFunnel />,
  },
  {
    title: "Ad spend & ROAS",
    insight: "Scaled spend to $4M+/mo while ROAS climbed to 3.1×.",
    chart: <SpendTrend />,
  },
];

export default function DataViz() {
  return (
    <section id="analytics" className="section-pad">
      <SectionHeading
        eyebrow="Analytics in action"
        title="The kind of analysis I build"
        subtitle="Illustrative dashboards showing how I read retention, revenue, funnels, and spend — the views teams actually make decisions from."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {panels.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.08}>
            <div className="flex h-full flex-col rounded-2xl glass p-6 transition-colors hover:border-white/20">
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-neon-cyan" />
                <h3 className="font-display text-base font-semibold text-white">{p.title}</h3>
              </div>
              <p className="mb-5 text-xs text-white/45">{p.insight}</p>
              <div className="mt-auto">{p.chart}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-6 text-center text-xs text-white/35">
          Figures are representative samples for illustration, not client data.
        </p>
      </Reveal>
    </section>
  );
}
