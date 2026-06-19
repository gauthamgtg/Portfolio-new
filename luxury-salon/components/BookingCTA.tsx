"use client";

import { brand, cta } from "@/lib/data";
import MagneticButton from "./ui/MagneticButton";
import SplitReveal from "./ui/SplitReveal";

/** Immersive gold booking section linking out to the scheduling platform. */
export default function BookingCTA() {
  return (
    <section
      id="book"
      className="relative overflow-hidden bg-gradient-to-br from-gold-deep via-gold to-gold-light py-32 text-espresso md:py-48"
    >
      {/* texture + light */}
      <div className="grain absolute inset-0 opacity-[0.09] mix-blend-multiply" />
      <div className="pointer-events-none absolute -left-40 top-0 h-[120%] w-[60%] rotate-12 bg-[radial-gradient(closest-side,rgba(255,255,255,0.35),transparent)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 text-center md:px-10">
        <p className="eyebrow mb-8 text-espresso/60">{cta.eyebrow}</p>

        <h2 className="font-serif text-[clamp(2.75rem,9vw,8rem)] font-light leading-[0.92] tracking-tightest text-espresso">
          <SplitReveal>{cta.heading}</SplitReveal>
        </h2>

        <p className="mx-auto mt-10 max-w-xl font-sans text-base leading-relaxed text-espresso/75 md:text-lg">
          {cta.body}
        </p>

        <div className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <MagneticButton
            href={brand.booking.href}
            cursorLabel="Book"
            strength={36}
            className="rounded-full bg-espresso px-10 py-5 font-sans text-sm font-semibold uppercase tracking-luxe text-bone transition-colors duration-500 hover:bg-espresso-soft"
          >
            {brand.booking.label}
          </MagneticButton>
          <a
            href={brand.phoneHref}
            data-cursor="hover"
            data-cursor-label="Call"
            className="link-underline font-sans text-sm uppercase tracking-luxe text-espresso/80"
          >
            or call {brand.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
