"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

function ProjectCard({ p, index }: { p: (typeof projects)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 6, ry: px * 6 });
  };

  return (
    <Reveal delay={(index % 2) * 0.08}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: "spring", stiffness: 150, damping: 18 }}
        style={{ transformStyle: "preserve-3d", transformPerspective: 1000 }}
        className="group relative h-full overflow-hidden rounded-3xl glass p-7 transition-colors hover:border-white/25"
      >
        <div
          className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${p.accent} opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40`}
        />
        <div className="relative">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
            {p.tagline}
          </span>
          <h3 className="mt-3 font-display text-2xl font-bold text-white">{p.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/60">{p.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <ArrowUpRight
          size={20}
          className="absolute right-6 top-6 text-white/30 transition-all duration-300 group-hover:text-neon-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </motion.div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-pad">
      <SectionHeading
        eyebrow="Selected Work"
        title="Projects built to close a real gap"
        subtitle="Each started from a problem worth solving — then turned into something shippable."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}
