"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    name: "The Signature Cut",
    description:
      "A full consultation, precision scissor cut, hot-towel steam, and finish. Our most requested appointment — perfectly calibrated to your face, lifestyle, and hair type.",
    price: "$95",
    duration: "60 min",
    tag: "Most Popular",
    accent: "rgba(184,149,42,0.8)",
  },
  {
    id: "02",
    name: "Skin Fade",
    description:
      "Zero to your chosen length, blended with zero tolerance for imprecision. Our fades are studied, practiced, and never rushed.",
    price: "$75",
    duration: "45 min",
    tag: null,
    accent: "rgba(196,122,58,0.7)",
  },
  {
    id: "03",
    name: "Beard Sculpting",
    description:
      "Hot towel preparation, precision outline work, beard balm finish. A beard is a statement — we help you mean it.",
    price: "$60",
    duration: "40 min",
    tag: null,
    accent: "rgba(184,149,42,0.6)",
  },
  {
    id: "04",
    name: "Hot-Towel Shave",
    description:
      "The full straight-razor ritual. Pre-shave oil, three hot-towel applications, master blade work, cold-towel close, and alum finish. An experience, not a service.",
    price: "$120",
    duration: "75 min",
    tag: "Signature Ritual",
    accent: "rgba(107,26,26,0.8)",
  },
  {
    id: "05",
    name: "Hair & Scalp Treatment",
    description:
      "Deep-cleanse scalp massage, bespoke treatment protocol, premium conditioning. Your scalp is the foundation — treat it accordingly.",
    price: "$85",
    duration: "50 min",
    tag: null,
    accent: "rgba(92,58,30,0.8)",
  },
  {
    id: "06",
    name: "Grey Blending & Color",
    description:
      "Precision grey blending, natural root touch-up, or full color work. Executed with professional OWAY colour and undetectable results.",
    price: "$145+",
    duration: "90 min",
    tag: null,
    accent: "rgba(138,146,153,0.7)",
  },
  {
    id: "07",
    name: "Event Grooming",
    description:
      "Wedding, shoot, or board meeting — we prepare you for the moments that matter. Full grooming suite, private booking available.",
    price: "$200",
    duration: "90 min",
    tag: "Private Available",
    accent: "rgba(184,149,42,0.9)",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cards = gridRef.current?.querySelectorAll(".service-item");
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
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
      id="services"
      className="relative py-32 md:py-48"
      style={{ backgroundColor: "var(--obsidian)" }}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px" style={{ backgroundColor: "var(--brass)" }} />
              <span className="label-text" style={{ color: "var(--brass)" }}>
                THE MENU
              </span>
            </div>
            <h2
              className="display-text"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 7rem)",
                color: "var(--cream)",
                fontFamily: "var(--font-display)",
                lineHeight: "0.9",
              }}
            >
              Craft
              <br />
              <em style={{ color: "var(--brass)" }}>Services</em>
            </h2>
          </div>
          <p
            className="hidden md:block max-w-xs text-sm leading-relaxed"
            style={{ color: "rgba(245,240,232,0.4)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}
          >
            Every service is a ritual. Every barber a craftsman. No shortcuts, no timers, no excuses.
          </p>
        </div>

        {/* Services grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ border: "1px solid rgba(184,149,42,0.1)" }}>
          {services.map((service, i) => (
            <div
              key={service.id}
              className="service-item group relative p-8 md:p-10 cursor-none overflow-hidden transition-colors duration-500"
              style={{
                backgroundColor: "rgba(10,10,10,1)",
                border: "1px solid rgba(184,149,42,0.08)",
                opacity: 0,
              }}
              data-cursor="EXPLORE"
            >
              {/* Hover background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 30% 30%, ${service.accent} 0%, transparent 70%)`,
                }}
              />

              {/* Top row */}
              <div className="flex items-start justify-between mb-6 relative z-10">
                <span
                  className="label-text"
                  style={{ color: "rgba(184,149,42,0.4)" }}
                >
                  {service.id}
                </span>
                {service.tag && (
                  <span
                    className="label-text px-3 py-1 border"
                    style={{
                      color: "var(--brass)",
                      borderColor: "rgba(184,149,42,0.3)",
                      fontSize: "0.55rem",
                    }}
                  >
                    {service.tag}
                  </span>
                )}
              </div>

              {/* Name */}
              <h3
                className="relative z-10 mb-4 font-bold leading-tight"
                style={{
                  fontSize: "1.25rem",
                  color: "var(--cream)",
                  fontFamily: "var(--font-display)",
                  transition: "color 0.4s ease",
                }}
              >
                {service.name}
              </h3>

              {/* Description */}
              <p
                className="relative z-10 text-sm leading-relaxed mb-8"
                style={{
                  color: "rgba(245,240,232,0.45)",
                  fontFamily: "var(--font-serif)",
                  fontSize: "0.9rem",
                  lineHeight: "1.7",
                }}
              >
                {service.description}
              </p>

              {/* Footer */}
              <div className="relative z-10 flex items-end justify-between pt-6 border-t" style={{ borderColor: "rgba(184,149,42,0.12)" }}>
                <div>
                  <p
                    className="label-text mb-1"
                    style={{ color: "rgba(245,240,232,0.3)" }}
                  >
                    FROM
                  </p>
                  <p
                    className="font-bold"
                    style={{
                      fontSize: "1.5rem",
                      color: "var(--brass)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {service.price}
                  </p>
                </div>
                <div className="text-right">
                  <p className="label-text" style={{ color: "rgba(245,240,232,0.3)" }}>
                    {service.duration}
                  </p>
                </div>
              </div>

              {/* Arrow indicator */}
              <div
                className="absolute bottom-8 right-8 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400"
                style={{ transform: "translate(4px, -4px)" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 14L14 2M14 2H6M14 2V10" stroke="rgba(184,149,42,0.8)" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-16">
          <a
            href="#booking"
            className="magnetic-btn group relative flex items-center gap-4 px-10 py-4 overflow-hidden border"
            style={{ borderColor: "var(--brass)" }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span
              className="relative z-10 label-text transition-colors duration-400 group-hover:text-obsidian"
              style={{ color: "var(--brass)" }}
            >
              Book Any Service
            </span>
            <span
              className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              style={{ backgroundColor: "var(--brass)" }}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
