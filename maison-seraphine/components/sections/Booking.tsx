"use client";

import Eyebrow from "../ui/Eyebrow";
import RevealWords from "../ui/RevealWords";
import Reveal from "../ui/Reveal";
import MagneticButton from "../ui/MagneticButton";
import Marquee from "../ui/Marquee";
import { booking, brand } from "@/lib/content";

/**
 * Booking — the immersive gold close. A warm gilded field with a faint
 * oversized monogram, the invitation, and the magnetic CTA out to the booking
 * platform. The emotional crescendo before the footer.
 */
export default function Booking() {
  return (
    <section
      id="booking"
      className="relative overflow-hidden py-[16vh] text-espresso md:py-[22vh]"
      style={{
        background:
          "linear-gradient(135deg, #efd9a4 0%, #d8b673 38%, #bf9d52 70%, #9a7836 100%)",
      }}
    >
      {/* Faint oversized monogram */}
      <span className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 font-display text-[40vw] font-light leading-none text-espresso/[0.06] md:text-[34vw]">
        {brand.monogram}
      </span>
      <div className="light-bloom pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-[1500px] px-6 text-center md:px-12">
        <Eyebrow className="justify-center !text-espresso/70">
          {booking.eyebrow}
        </Eyebrow>

        <h2 className="mx-auto mt-8 max-w-4xl font-display text-[clamp(2.8rem,8vw,7rem)] font-light leading-[0.92] tracking-tight">
          <RevealWords text={booking.heading} highlight={[2]} />
        </h2>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-cocoa/80 md:text-lg">
            {booking.body}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <MagneticButton
              href={brand.bookingUrl}
              target="_blank"
              cursorLabel="Book"
              className="!px-12 !py-5"
            >
              {booking.cta}
            </MagneticButton>
            <a
              href={brand.phoneHref}
              data-cursor="link"
              className="group text-sm uppercase tracking-widest2 text-espresso/80"
            >
              <span className="block text-[0.6rem] text-espresso/50">
                {booking.secondary}
              </span>
              <span className="relative">
                {brand.phone}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-espresso transition-transform duration-500 ease-lux group-hover:scale-x-100" />
              </span>
            </a>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-[12vh] border-y border-espresso/20 py-4 font-display text-2xl italic text-espresso/70 md:text-3xl">
        <Marquee
          items={["Book Your Experience", "By Appointment Only", "Beverly Hills"]}
          speed={26}
        />
      </div>
    </section>
  );
}
