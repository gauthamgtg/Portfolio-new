"use client";

import { motion } from "framer-motion";
import { spendTrend } from "@/lib/data";

const W = 360;
const H = 200;
const PAD = { t: 16, r: 12, b: 26, l: 12 };
const innerW = W - PAD.l - PAD.r;
const innerH = H - PAD.t - PAD.b;

export default function SpendTrend() {
  const maxSpend = 4.5;
  const maxRoas = 4;

  const x = (i: number) => PAD.l + (i / (spendTrend.length - 1)) * innerW;
  const ySpend = (v: number) => PAD.t + innerH - (v / maxSpend) * innerH;
  const yRoas = (v: number) => PAD.t + innerH - (v / maxRoas) * innerH;

  const spendLine = spendTrend.map((d, i) => `${x(i)},${ySpend(d.spend)}`).join(" ");
  const area = `M${x(0)},${PAD.t + innerH} L${spendTrend
    .map((d, i) => `${x(i)},${ySpend(d.spend)}`)
    .join(" L")} L${x(spendTrend.length - 1)},${PAD.t + innerH} Z`;
  const roasLine = spendTrend.map((d, i) => `${x(i)},${yRoas(d.roas)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* gridlines */}
      {[0.25, 0.5, 0.75, 1].map((g) => (
        <line
          key={g}
          x1={PAD.l}
          x2={W - PAD.r}
          y1={PAD.t + innerH - g * innerH}
          y2={PAD.t + innerH - g * innerH}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}

      {/* spend area */}
      <motion.path
        d={area}
        fill="url(#areaFill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />

      {/* spend line ($M) */}
      <motion.polyline
        points={spendLine}
        fill="none"
        stroke="#22d3ee"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      />

      {/* roas line */}
      <motion.polyline
        points={roasLine}
        fill="none"
        stroke="#e879f9"
        strokeWidth="2"
        strokeDasharray="4 4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.3, ease: "easeInOut" }}
      />

      {spendTrend.map((d, i) => (
        <text
          key={d.m}
          x={x(i)}
          y={H - 8}
          textAnchor="middle"
          className="fill-white/40"
          fontSize="10"
        >
          {d.m}
        </text>
      ))}
    </svg>
  );
}
