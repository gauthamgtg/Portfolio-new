"use client";

import { useState } from "react";
import { brand, nav } from "@/lib/data";

/** Footer — hours, stylized map plate, socials, newsletter, fine gold detail. */
export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail("");
  };

  return (
    <footer id="footer" className="relative overflow-hidden bg-espresso pt-24">
      {/* Oversized monogram marquee */}
      <div className="pointer-events-none select-none overflow-hidden border-y border-gold/15 py-8">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex">
              {Array.from({ length: 6 }).map((__, i) => (
                <span
                  key={i}
                  className="mx-8 font-serif text-[clamp(2.5rem,7vw,6rem)] font-light italic text-bone/10"
                >
                  {brand.name} —
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand + newsletter */}
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 font-serif text-gold-light">
                {brand.monogram}
              </span>
              <span className="font-serif text-2xl text-bone">{brand.name}</span>
            </div>
            <p className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-bone/55">
              {brand.tagline} Join the house list for seasonal openings, private
              previews, and the occasional secret.
            </p>

            <form onSubmit={subscribe} className="mt-7 max-w-sm">
              <div className="flex items-center gap-3 border-b border-gold/30 pb-2 focus-within:border-gold-light">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full bg-transparent font-sans text-sm text-bone placeholder:text-bone/35 focus:outline-none"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  data-cursor="hover"
                  className="font-sans text-xs uppercase tracking-luxe text-gold-light"
                >
                  Join
                </button>
              </div>
              {done && (
                <p className="mt-3 font-sans text-xs text-gold-light">
                  Welcome to the house. Watch your inbox.
                </p>
              )}
            </form>
          </div>

          {/* Visit + hours */}
          <div>
            <p className="eyebrow mb-5 text-gold/60">Visit</p>
            <address className="not-italic">
              {brand.address.map((l) => (
                <p key={l} className="font-sans text-sm text-bone/65">
                  {l}
                </p>
              ))}
            </address>

            {/* Stylized map plate */}
            <div className="relative mt-5 h-28 w-full overflow-hidden rounded-sm border border-gold/15">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#241B14,#1A1410)]" />
              <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden>
                <defs>
                  <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
                    <path d="M28 0H0V28" fill="none" stroke="#C9A24B" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-light shadow-[0_0_0_6px_rgba(228,199,126,0.18)]" />
              <span className="absolute bottom-2 right-3 font-sans text-[0.6rem] uppercase tracking-luxe text-bone/50">
                Madison Ave
              </span>
            </div>

            <div className="mt-6 space-y-1">
              {brand.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4">
                  <span className="font-sans text-xs text-bone/50">{h.day}</span>
                  <span className="font-sans text-xs text-bone/70">{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Explore + contact */}
          <div>
            <p className="eyebrow mb-5 text-gold/60">Explore</p>
            <ul className="space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    data-cursor="hover"
                    className="link-underline font-sans text-sm text-bone/65"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="eyebrow mb-3 mt-8 text-gold/60">Reserve</p>
            <a
              href={brand.phoneHref}
              data-cursor="hover"
              className="link-underline block font-sans text-sm text-bone/65"
            >
              {brand.phone}
            </a>
            <a
              href={`mailto:${brand.email}`}
              data-cursor="hover"
              className="link-underline block font-sans text-sm text-bone/65"
            >
              {brand.email}
            </a>

            <div className="mt-6 flex gap-4">
              {brand.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  data-cursor="hover"
                  className="link-underline font-sans text-xs uppercase tracking-luxe text-bone/55"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Base line */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gold/15 pt-8 md:flex-row">
          <p className="font-sans text-xs text-bone/40">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p className="font-sans text-xs text-bone/40">
            Couture hair atelier · {brand.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
