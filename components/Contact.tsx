"use client";

import { Mail, Phone, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";
import Reveal from "./ui/Reveal";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "in/gauthamgtg",
    href: profile.linkedin,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/gauthamgtg",
    href: profile.github,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-pad">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] glass-strong p-10 text-center md:p-16">
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-neon-violet/25 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-neon-cyan/25 blur-3xl" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-neon-cyan">
              Contact
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-bold leading-tight text-white md:text-5xl">
              Let&apos;s turn your data into <span className="gradient-text">decisions</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              Open to data & analytics roles and freelance dashboards. The fastest way
              to reach me is email — I usually reply within a day.
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet px-8 py-4 text-sm font-semibold text-ink transition-opacity hover:opacity-95 glow-violet"
            >
              Say hello <ArrowUpRight size={18} />
            </a>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition-colors hover:border-white/25"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-neon-cyan transition-colors group-hover:text-white">
                    <c.icon size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wider text-white/40">
                      {c.label}
                    </span>
                    <span className="block truncate text-sm text-white/80">{c.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
