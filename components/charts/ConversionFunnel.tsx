"use client";

import { motion } from "framer-motion";
import { funnelData } from "@/lib/data";

export default function ConversionFunnel() {
  return (
    <div className="flex w-full flex-col gap-2.5">
      {funnelData.map((s, i) => (
        <div key={s.label} className="flex items-center gap-3">
          <div className="w-28 shrink-0 text-right text-xs text-white/55">{s.label}</div>
          <div className="relative h-9 flex-1 overflow-hidden rounded-lg bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${s.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full items-center justify-end rounded-lg bg-gradient-to-r from-neon-violet to-neon-cyan pr-2.5"
            >
              <span className="text-xs font-semibold text-ink">{s.value}%</span>
            </motion.div>
          </div>
          <div className="w-28 shrink-0 text-[11px] text-neon-fuchsia/80">{s.note}</div>
        </div>
      ))}
    </div>
  );
}
