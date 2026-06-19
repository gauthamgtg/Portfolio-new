"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BookingCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const bg = bgRef.current;
    if (bg) {
      gsap.to(bg, {
        backgroundPositionY: "60%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    const content = contentRef.current;
    if (content) {
      gsap.fromTo(
        content.querySelectorAll(".booking-line"),
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: content,
            start: "top 75%",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="relative py-48 md:py-64 overflow-hidden flex items-center justify-center"
      style={{ minHeight: "70vh" }}
    >
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #0a0806 0%, #1a1208 30%, #0e0c08 60%, #0a0806 100%)",
          backgroundPositionY: "40%",
        }}
      />

      {/* Brass atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(184,149,42,0.12) 0%, transparent 65%)",
        }}
      />

      {/* Corner decorations */}
      {[
        "top-8 left-8",
        "top-8 right-8",
        "bottom-8 left-8",
        "bottom-8 right-8",
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} pointer-events-none`}
          style={{ opacity: 0.3 }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            {i === 0 && <path d="M0 40 L0 0 L40 0" stroke="rgba(184,149,42,0.8)" strokeWidth="1" fill="none" />}
            {i === 1 && <path d="M40 40 L40 0 L0 0" stroke="rgba(184,149,42,0.8)" strokeWidth="1" fill="none" />}
            {i === 2 && <path d="M0 0 L0 40 L40 40" stroke="rgba(184,149,42,0.8)" strokeWidth="1" fill="none" />}
            {i === 3 && <path d="M40 0 L40 40 L0 40" stroke="rgba(184,149,42,0.8)" strokeWidth="1" fill="none" />}
          </svg>
        </div>
      ))}

      {/* Horizontal brass lines */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(184,149,42,0.4), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(184,149,42,0.4), transparent)" }} />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center px-8 max-w-4xl mx-auto">
        <div className="overflow-hidden mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px opacity-50" style={{ backgroundColor: "var(--brass)" }} />
            <span
              className="booking-line label-text"
              style={{ color: "var(--brass)", opacity: 0 }}
            >
              RESERVE YOUR APPOINTMENT
            </span>
            <div className="w-12 h-px opacity-50" style={{ backgroundColor: "var(--brass)" }} />
          </div>
        </div>

        <div className="overflow-hidden mb-4">
          <h2
            className="booking-line display-text"
            style={{
              fontSize: "clamp(3rem, 10vw, 12rem)",
              color: "var(--cream)",
              fontFamily: "var(--font-display)",
              lineHeight: "0.88",
              opacity: 0,
            }}
          >
            Your Chair
          </h2>
        </div>

        <div className="overflow-hidden mb-12">
          <h2
            className="booking-line display-text"
            style={{
              fontSize: "clamp(3rem, 10vw, 12rem)",
              color: "var(--brass)",
              fontFamily: "var(--font-display)",
              lineHeight: "0.88",
              fontStyle: "italic",
              opacity: 0,
            }}
          >
            Awaits.
          </h2>
        </div>

        <div className="overflow-hidden mb-16">
          <p
            className="booking-line leading-relaxed max-w-lg mx-auto"
            style={{
              color: "rgba(245,240,232,0.5)",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "1.05rem",
              lineHeight: "1.8",
              opacity: 0,
            }}
          >
            Select your barber, choose your service, and lock in a time. Most appointments available within 48 hours. Members have priority access.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="booking-line flex flex-col sm:flex-row items-center justify-center gap-6" style={{ opacity: 0 }}>
          <a
            href="https://squire.com"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn group relative flex items-center gap-4 px-12 py-5 overflow-hidden border w-full sm:w-auto justify-center"
            style={{ borderColor: "var(--brass)", minWidth: "220px" }}
            data-cursor="BOOK"
          >
            <span
              className="relative z-10 label-text transition-colors duration-400 group-hover:text-obsidian"
              style={{ color: "var(--brass)" }}
            >
              Book Now
            </span>
            <span
              className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              style={{ backgroundColor: "var(--brass)" }}
            />
          </a>

          <a
            href="tel:+12125550142"
            className="group flex items-center gap-3 py-5 px-6"
            style={{ color: "rgba(245,240,232,0.5)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.87 9.88 19.79 19.79 0 01.79 1.18 2 2 0 012.77 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l.91-.91a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 15.27v1.65z" />
            </svg>
            <span className="label-text transition-colors duration-300 group-hover:text-cream" style={{ color: "rgba(245,240,232,0.5)" }}>
              +1 (212) 555–0142
            </span>
          </a>
        </div>

        {/* Hours note */}
        <div className="booking-line mt-16 pt-12 border-t" style={{ borderColor: "rgba(184,149,42,0.1)", opacity: 0 }}>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { day: "Mon – Fri", hours: "9:00 AM – 8:00 PM" },
              { day: "Saturday", hours: "9:00 AM – 7:00 PM" },
              { day: "Sunday", hours: "10:00 AM – 6:00 PM" },
            ].map((h) => (
              <div key={h.day} className="text-center">
                <p className="label-text mb-1" style={{ color: "rgba(184,149,42,0.5)" }}>
                  {h.day}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "rgba(245,240,232,0.4)", fontFamily: "var(--font-serif)" }}
                >
                  {h.hours}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
