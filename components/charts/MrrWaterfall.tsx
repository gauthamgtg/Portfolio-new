"use client";

import { motion } from "framer-motion";
import { mrrWaterfall } from "@/lib/data";

const W = 360;
const H = 200;
const PAD_B = 28;
const chartH = H - PAD_B;

export default function MrrWaterfall() {
  const max = 175; // headroom above peak
  const scale = chartH / max;
  const n = mrrWaterfall.length;
  const gap = 14;
  const bw = (W - gap * (n + 1)) / n;

  let cum = 0;
  const bars = mrrWaterfall.map((s) => {
    let bottom: number, top: number;
    if (s.type === "total") {
      bottom = 0;
      top = s.value;
      cum = s.value;
    } else {
      const start = cum;
      const end = cum + s.value;
      bottom = Math.min(start, end);
      top = Math.max(start, end);
      cum = end;
    }
    return { ...s, bottom, top };
  });

  const fill = (t: string) =>
    t === "total" ? "url(#wfTotal)" : t === "pos" ? "#34d399" : "#e879f9";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full">
      <defs>
        <linearGradient id="wfTotal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      {bars.map((b, i) => {
        const x = gap + i * (bw + gap);
        const y = chartH - b.top * scale;
        const h = Math.max((b.top - b.bottom) * scale, 2);
        return (
          <g key={b.label}>
            <motion.rect
              x={x}
              width={bw}
              rx={4}
              initial={{ height: 0, y: chartH }}
              whileInView={{ height: h, y }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              fill={fill(b.type)}
            />
            <text
              x={x + bw / 2}
              y={y - 6}
              textAnchor="middle"
              className="fill-white/70"
              fontSize="11"
              fontWeight="600"
            >
              {b.value > 0 && b.type !== "total" ? "+" : ""}
              {b.value}
            </text>
            <text
              x={x + bw / 2}
              y={H - 8}
              textAnchor="middle"
              className="fill-white/40"
              fontSize="10"
            >
              {b.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
