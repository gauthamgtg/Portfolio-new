"use client";

import { motion } from "framer-motion";
import { cohortData } from "@/lib/data";

// Brighter cyan = higher retention.
function cellStyle(v: number) {
  const t = v / 100;
  return {
    backgroundColor: `rgba(34, 211, 238, ${0.08 + t * 0.82})`,
    color: t > 0.55 ? "#04121a" : "rgba(255,255,255,0.85)",
  };
}

export default function CohortHeatmap() {
  const { months, cohorts } = cohortData;
  return (
    <div className="w-full">
      <div
        className="grid gap-1.5 text-center text-[11px]"
        style={{ gridTemplateColumns: `40px repeat(${months.length}, 1fr)` }}
      >
        <div />
        {months.map((m) => (
          <div key={m} className="pb-1 font-medium text-white/40">
            {m}
          </div>
        ))}

        {cohorts.map((c, row) =>
          [
            <div
              key={`${c.label}-label`}
              className="flex items-center justify-end pr-1 font-medium text-white/45"
            >
              {c.label}
            </div>,
            ...c.values.map((v, col) => (
              <motion.div
                key={`${c.label}-${col}`}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (row * months.length + col) * 0.025 }}
                style={cellStyle(v)}
                className="grid aspect-square place-items-center rounded-md font-semibold tabular-nums"
              >
                {v}
              </motion.div>
            )),
          ]
        )}
      </div>
    </div>
  );
}
