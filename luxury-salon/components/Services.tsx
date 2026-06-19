"use client";

import { useState } from "react";
import { services, type Service } from "@/lib/data";
import SplitReveal from "./ui/SplitReveal";

/**
 * Services as an editorial index. Hovering a row reveals an image-style
 * gradient panel that warps in, plus the evocative long-form copy — a
 * magazine table-of-contents that comes alive.
 */
export default function Services() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-espresso py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-none text-bone">
            <SplitReveal>The Services</SplitReveal>
          </h2>
          <p className="max-w-sm font-sans text-sm leading-relaxed text-bone/60">
            Six disciplines, one standard. Each begins with a private
            consultation and ends with a result composed entirely for you.
          </p>
        </div>

        <div className="relative grid lg:grid-cols-[1fr_auto]">
          {/* Index list */}
          <ul
            className="border-t border-gold/15"
            onMouseLeave={() => setActive(null)}
          >
            {services.map((s) => (
              <li
                key={s.index}
                onMouseEnter={() => setActive(s)}
                data-cursor="hover"
                data-cursor-label="View"
                className="group relative border-b border-gold/15"
              >
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 py-7 transition-all duration-500 ease-luxe group-hover:px-4 md:py-9">
                  <span className="font-sans text-xs text-gold/60">{s.index}</span>
                  <div className="min-w-0">
                    <h3 className="font-serif text-[clamp(1.75rem,4vw,3.25rem)] font-light leading-tight text-bone transition-colors duration-500 group-hover:text-gold-light">
                      {s.title}
                    </h3>
                    <p className="mt-1 font-sans text-sm text-bone/50">{s.blurb}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-sans text-sm text-gold-light">
                      from ${s.priceFrom.toLocaleString()}
                    </p>
                    <p className="font-sans text-xs text-bone/40">{s.duration}</p>
                  </div>
                </div>

                {/* Mobile detail */}
                <p className="mb-7 max-w-2xl font-sans text-sm leading-relaxed text-bone/55 lg:hidden">
                  {s.detail}
                </p>
              </li>
            ))}
          </ul>

          {/* Hover preview panel (desktop) */}
          <div className="pointer-events-none relative hidden w-[34vw] max-w-[480px] pl-12 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
                {services.map((s) => (
                  <div
                    key={s.index}
                    className={`absolute inset-0 bg-gradient-to-br ${s.tone} transition-all duration-700 ease-luxe ${
                      active?.index === s.index
                        ? "scale-100 opacity-100"
                        : "scale-110 opacity-0"
                    }`}
                  >
                    <div className="grain absolute inset-0 opacity-[0.07]" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <span className="font-serif text-7xl font-light text-bone/15">
                        {s.index}
                      </span>
                      <h4 className="mt-2 font-serif text-2xl text-bone">
                        {s.title}
                      </h4>
                      <p className="mt-3 font-sans text-sm leading-relaxed text-bone/80">
                        {s.detail}
                      </p>
                    </div>
                  </div>
                ))}
                {!active && (
                  <div className="absolute inset-0 grid place-items-center bg-espresso-soft">
                    <p className="eyebrow text-gold/40">Hover to preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
