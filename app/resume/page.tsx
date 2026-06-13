import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import {
  profile,
  experience,
  skillGroups,
  analyticalTechniques,
  education,
} from "@/lib/data";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Gautham M — Résumé",
  description: "Résumé of Gautham M, Data Analyst.",
};

function cleanUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "");
}

export default function ResumePage() {
  const allSkills = [...skillGroups, ...analyticalTechniques];

  return (
    <main className="min-h-screen bg-neutral-200 py-8 text-black print:bg-white print:py-0">
      {/* Toolbar — screen only */}
      <div className="no-print mx-auto mb-6 flex max-w-[820px] items-center justify-between px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-black"
        >
          <ArrowLeft size={16} />
          Back to portfolio
        </Link>
        <PrintButton />
      </div>

      {/* The sheet */}
      <article className="resume-sheet mx-auto max-w-[820px] bg-white px-12 py-12 shadow-xl print:shadow-none">
        {/* Header */}
        <header className="border-b-2 border-neutral-900 pb-5">
          <h1 className="font-display text-4xl font-bold tracking-tight text-neutral-900">
            {profile.name}
          </h1>
          <p className="mt-1 text-lg font-medium text-neutral-700">{profile.role}</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-neutral-600">
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5">
              <Mail size={13} /> {profile.email}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <Phone size={13} /> {profile.phone}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} /> {profile.location}
            </span>
            <a href={profile.linkedin} className="inline-flex items-center gap-1.5">
              <Linkedin size={13} /> {cleanUrl(profile.linkedin)}
            </a>
            <a href={profile.github} className="inline-flex items-center gap-1.5">
              <Github size={13} /> {cleanUrl(profile.github)}
            </a>
          </div>
        </header>

        {/* Summary */}
        <section className="mt-5">
          <h2 className="mb-1.5 text-xs font-bold uppercase tracking-widest text-neutral-500">
            Summary
          </h2>
          <p className="text-[13.5px] leading-relaxed text-neutral-800">{profile.summary}</p>
        </section>

        {/* Experience */}
        <section className="mt-6">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-neutral-500">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((e, i) => (
              <div key={`${e.company}-${i}`} className="resume-avoid-break">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-[15px] font-bold text-neutral-900">
                    {e.role} <span className="font-semibold text-neutral-600">· {e.company}</span>
                  </h3>
                  <span className="shrink-0 text-[12px] font-medium text-neutral-500">
                    {e.period}
                  </span>
                </div>
                <p className="text-[12px] italic text-neutral-500">{e.context}</p>
                <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[12.5px] leading-snug text-neutral-800 marker:text-neutral-400">
                  {e.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mt-6 resume-avoid-break">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-neutral-500">
            Skills &amp; Techniques
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {allSkills.map((g) => (
              <p key={g.title} className="text-[12.5px] leading-snug text-neutral-800">
                <span className="font-semibold text-neutral-900">{g.title}: </span>
                {g.items.join(", ")}
              </p>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mt-6 resume-avoid-break">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-neutral-500">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((ed, i) => (
              <div key={i} className="flex items-baseline justify-between gap-4">
                <p className="text-[13px] text-neutral-800">
                  <span className="font-semibold text-neutral-900">{ed.degree}</span>, {ed.field}
                  <span className="text-neutral-600"> · {ed.school}</span>
                </p>
                <span className="shrink-0 text-[12px] font-medium text-neutral-500">
                  {ed.period}
                </span>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
