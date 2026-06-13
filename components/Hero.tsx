"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, Github, Linkedin, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/lib/data";
import MagneticButton from "./ui/MagneticButton";

export default function Hero() {
  const reduce = useReducedMotion();
  const [taglineIdx, setTaglineIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setTaglineIdx((i) => (i + 1) % profile.tagline.length),
      2800
    );
    return () => clearInterval(id);
  }, []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center px-6 pt-24">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-4xl text-center"
      >
        <motion.div variants={item} className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/70 backdrop-blur">
            <Sparkles size={14} className="text-neon-cyan" />
            Available for data & analytics roles
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-7 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl md:text-8xl"
        >
          {profile.name.split(" ")[0]}{" "}
          <span className="gradient-text">{profile.name.split(" ").slice(1).join(" ")}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 font-display text-xl font-medium text-white/80 sm:text-2xl"
        >
          {profile.role}
        </motion.p>

        {/* Rotating tagline */}
        <motion.div variants={item} className="relative mt-4 h-7">
          {profile.tagline.map((t, i) => (
            <motion.span
              key={t}
              className="absolute inset-x-0 text-base text-white/55 sm:text-lg"
              initial={false}
              animate={{
                opacity: i === taglineIdx ? 1 : 0,
                y: i === taglineIdx ? 0 : 8,
              }}
              transition={{ duration: 0.5 }}
            >
              {t}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          variants={item}
          className="mt-8 flex items-center justify-center gap-1.5 text-sm text-white/50"
        >
          <MapPin size={15} /> {profile.location}
        </motion.div>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton href="#projects">View my work</MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Get in touch
          </MagneticButton>
        </motion.div>

        <motion.div variants={item} className="mt-8 flex items-center justify-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:border-neon-cyan/50 hover:text-neon-cyan"
          >
            <Github size={19} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:border-neon-violet/50 hover:text-neon-violet"
          >
            <Linkedin size={19} />
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
        animate={reduce ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}
