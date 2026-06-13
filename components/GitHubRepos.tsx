"use client";

import { Github, ExternalLink } from "lucide-react";
import { repos, profile } from "@/lib/data";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const langColor: Record<string, string> = {
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Shell: "#89e051",
  TypeScript: "#3178c6",
};

export default function GitHubRepos() {
  return (
    <section id="github" className="section-pad">
      <SectionHeading
        eyebrow="Open Source"
        title="Built from scratch on GitHub"
        subtitle="A selection of repositories I created and ship — no forks, just original work."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {repos.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.08}>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl glass p-6 transition-all hover:border-white/25 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <Github size={22} className="text-white/70 transition-colors group-hover:text-white" />
                <ExternalLink
                  size={16}
                  className="text-white/30 transition-colors group-hover:text-neon-cyan"
                />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-white">{r.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
                {r.description}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-white/55">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: langColor[r.language] ?? "#8b5cf6" }}
                  />
                  {r.language}
                </span>
                {r.homepage && (
                  <span className="rounded-full border border-neon-mint/30 bg-neon-mint/10 px-2.5 py-0.5 text-[11px] font-medium text-neon-mint">
                    Live
                  </span>
                )}
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 flex justify-center">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Github size={18} />
            See all on GitHub
          </a>
        </div>
      </Reveal>
    </section>
  );
}
