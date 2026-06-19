"use client";

import { stylists } from "@/lib/data";
import SplitReveal from "./ui/SplitReveal";

/**
 * The Masters — editorial portrait grid. Portraits are art-directed duotone
 * gradient panels (drop real photography into the `tone` slot's container to
 * upgrade). Hover lifts a chromatic sheen and reveals the Instagram link.
 */
export default function Stylists() {
  return (
    <section id="stylists" className="relative bg-bone py-28 text-espresso md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-5 text-cocoa/60">The Masters</p>
            <h2 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-none text-espresso">
              <SplitReveal>Hands you trust.</SplitReveal>
            </h2>
          </div>
          <p className="max-w-sm font-sans text-sm leading-relaxed text-cocoa">
            Every artist at Maison Dorée has trained a decade or more. We do not
            hire for technique alone — we hire for the eye.
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {stylists.map((p) => (
            <article key={p.name} className="group">
              <a
                href={p.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                data-cursor-label="Instagram"
                className="relative block aspect-[3/4] overflow-hidden rounded-sm"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${p.tone} transition-transform duration-[1.2s] ease-luxe group-hover:scale-105`}
                />
                {/* Chromatic sheen on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
                <div className="absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100 bg-[linear-gradient(110deg,transparent_40%,rgba(228,199,126,0.25)_50%,transparent_60%)]" />

                {/* Initials watermark */}
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-7xl font-light text-bone/15">
                  {p.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>

                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                  <span className="font-sans text-[0.7rem] uppercase tracking-luxe text-bone/80">
                    {p.specialty}
                  </span>
                  <span className="translate-y-2 font-sans text-[0.7rem] uppercase tracking-luxe text-gold-light opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    Instagram ↗
                  </span>
                </div>
              </a>

              <div className="mt-5">
                <h3 className="font-serif text-2xl font-light text-espresso">
                  {p.name}
                </h3>
                <p className="mt-1 font-sans text-xs uppercase tracking-luxe text-gold-deep">
                  {p.title}
                </p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-cocoa">
                  {p.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
