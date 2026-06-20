"use client";

import { useState } from "react";
import RevealWords from "../ui/RevealWords";
import { brand, footer, nav } from "@/lib/content";
import { scrollToSection } from "@/lib/scroll";

/** A small, abstract gold-line map plate — decorative, on-brand, asset-free. */
function StylizedMap() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-gold/20 bg-[#1b120c]">
      <svg viewBox="0 0 320 200" className="absolute inset-0 h-full w-full">
        <g stroke="rgba(191,157,82,0.28)" strokeWidth="1" fill="none">
          <path d="M0 60 H320 M0 130 H320 M70 0 V200 M180 0 V200 M250 0 V200" />
          <path d="M0 0 L320 200 M320 0 L0 200" strokeWidth="0.5" opacity="0.5" />
        </g>
        <circle cx="180" cy="130" r="34" fill="rgba(191,157,82,0.06)" />
        {/* Pin */}
        <g transform="translate(180 130)">
          <circle r="5" fill="var(--c-gold)" />
          <circle r="11" fill="none" stroke="var(--c-gold)" strokeWidth="1">
            <animate
              attributeName="r"
              values="6;18;6"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.9;0;0.9"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
      <span className="absolute bottom-3 left-3 text-[0.6rem] uppercase tracking-widest2 text-bone/50">
        {brand.city}
      </span>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-ink pt-[12vh] text-bone">
      <div className="light-bloom pointer-events-none absolute inset-x-0 top-0 h-1/2 opacity-30" />

      <div className="relative mx-auto max-w-[1500px] px-6 md:px-12">
        {/* Oversized wordmark */}
        <div className="border-b border-gold/15 pb-12">
          <h2 className="font-display text-[clamp(3.2rem,13vw,13rem)] font-light leading-[0.85] tracking-tight">
            <RevealWords text={brand.fullName} highlight={[1]} />
          </h2>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 md:grid-cols-4 md:gap-x-12">
          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-[0.6rem] uppercase tracking-widest2 text-gold/80">
              {footer.newsletter.heading}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone/60">
              {footer.newsletter.body}
            </p>
            {sent ? (
              <p className="mt-5 font-display text-lg italic text-gold">
                With pleasure — welcome to the maison.
              </p>
            ) : (
              <form onSubmit={subscribe} className="mt-5 flex items-center gap-3 border-b border-bone/25 pb-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={footer.newsletter.placeholder}
                  aria-label={footer.newsletter.placeholder}
                  className="w-full bg-transparent text-sm text-bone placeholder:text-bone/40 focus:outline-none"
                />
                <button
                  type="submit"
                  data-cursor="link"
                  className="shrink-0 text-[0.65rem] uppercase tracking-widest2 text-gold transition-colors hover:text-bone"
                >
                  {footer.newsletter.cta}
                </button>
              </form>
            )}
          </div>

          {/* Explore */}
          <nav>
            <p className="text-[0.6rem] uppercase tracking-widest2 text-bone/45">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollToSection(l.href)}
                    data-cursor="link"
                    className="text-sm text-bone/70 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hours */}
          <div>
            <p className="text-[0.6rem] uppercase tracking-widest2 text-bone/45">
              Hours
            </p>
            <ul className="mt-5 space-y-3">
              {footer.hours.map((h) => (
                <li key={h.day} className="text-sm text-bone/70">
                  <span className="block text-bone/90">{h.day}</span>
                  <span className="text-bone/50">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div>
            <p className="text-[0.6rem] uppercase tracking-widest2 text-bone/45">
              Visit
            </p>
            <p className="mt-5 text-sm leading-relaxed text-bone/70">
              {brand.address.line1}
              <br />
              {brand.address.line2}
            </p>
            <a
              href={brand.phoneHref}
              data-cursor="link"
              className="mt-3 block text-sm text-bone/70 transition-colors hover:text-gold"
            >
              {brand.phone}
            </a>
            <a
              href={`mailto:${brand.email}`}
              data-cursor="link"
              className="block text-sm text-bone/70 transition-colors hover:text-gold"
            >
              {brand.email}
            </a>
            <div className="mt-5">
              <StylizedMap />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-gold/15 py-8 md:flex-row">
          <p className="text-[0.62rem] uppercase tracking-widest2 text-bone/40">
            {footer.legal}
          </p>
          <div className="flex items-center gap-6 text-[0.62rem] uppercase tracking-widest2 text-bone/55">
            <a href={brand.social.instagram} data-cursor="link" className="hover:text-gold">
              Instagram
            </a>
            <a href={brand.social.pinterest} data-cursor="link" className="hover:text-gold">
              Pinterest
            </a>
            <a href={brand.social.tiktok} data-cursor="link" className="hover:text-gold">
              TikTok
            </a>
          </div>
          <button
            onClick={() => scrollToSection("body")}
            data-cursor="link"
            className="group flex items-center gap-2 text-[0.62rem] uppercase tracking-widest2 text-bone/55 hover:text-gold"
          >
            Back to top
            <span className="transition-transform duration-500 group-hover:-translate-y-1">
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
