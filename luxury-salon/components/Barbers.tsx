"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const barbers = [
  {
    name: "James Harrington",
    title: "Head Master Barber · Founder",
    years: "18 yrs",
    specialty: "Precision Cuts, Classic Shaves",
    bio: "Trained under Geo F. Trumper in London. Brought the heritage straight-razor tradition to Manhattan in 2009. Known for his immaculate fades and a consultation style that borders on therapy.",
    instagram: "@harrington.cuts",
    signature: "The Harrington Fade",
    accentBg: "linear-gradient(135deg, #1a1208 0%, #2d1f00 60%, #111 100%)",
    glowColor: "rgba(184,149,42,0.3)",
  },
  {
    name: "Marcus Del Rey",
    title: "Senior Barber",
    years: "12 yrs",
    specialty: "Skin Fades, Beard Architecture",
    bio: "Self-taught in Medellín, refined in Brooklyn. Marcus brings old-world patience and new-world precision to every appointment. His beard lines are considered geometric art.",
    instagram: "@mdelrey.barbier",
    signature: "The Del Rey Zero",
    accentBg: "linear-gradient(135deg, #0d0a0d 0%, #1a1020 60%, #111 100%)",
    glowColor: "rgba(107,26,26,0.3)",
  },
  {
    name: "Eli St. James",
    title: "Color & Texture Specialist",
    years: "9 yrs",
    specialty: "Grey Blending, Color, Texture",
    bio: "A colorist who thinks like a painter. Eli's grey blending work is indistinguishable from nature. Brings a fine-arts background to every color consultation — the result is always extraordinary.",
    instagram: "@eli.stjames",
    signature: "The Natural Transition",
    accentBg: "linear-gradient(135deg, #0a0d0e 0%, #101820 60%, #111 100%)",
    glowColor: "rgba(138,146,153,0.3)",
  },
  {
    name: "Theo Vance",
    title: "Master Barber",
    years: "14 yrs",
    specialty: "Executive Cuts, Hot-Towel Shaves",
    bio: "The choice of Manhattan's C-suite clientele. Theo understands that a man's cut is his first impression in the boardroom. Meticulous, confident, fast when needed, never when it isn't.",
    instagram: "@theovance.obsidian",
    signature: "The Executive",
    accentBg: "linear-gradient(135deg, #0e0a08 0%, #1a1510 60%, #111 100%)",
    glowColor: "rgba(196,122,58,0.3)",
  },
];

export default function Barbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cards = cardsRef.current?.querySelectorAll(".barber-card");
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="barbers"
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ backgroundColor: "var(--charcoal)" }}
    >
      {/* Background grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(184,149,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(184,149,42,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-7xl mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px" style={{ backgroundColor: "var(--brass)" }} />
            <span className="label-text" style={{ color: "var(--brass)" }}>
              THE CRAFTSMEN
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="display-text"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 8rem)",
                color: "var(--cream)",
                fontFamily: "var(--font-display)",
                lineHeight: "0.9",
              }}
            >
              The
              <br />
              <em style={{ color: "var(--brass)" }}>Masters</em>
            </h2>
            <p
              className="max-w-sm text-sm leading-relaxed"
              style={{ color: "rgba(245,240,232,0.45)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}
            >
              Combined, our barbers carry over 50 years of craft. Each one was hand-selected not just for skill, but for character.
            </p>
          </div>
        </div>

        {/* Barber cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {barbers.map((barber) => (
            <div
              key={barber.name}
              className="barber-card group relative cursor-none overflow-hidden"
              style={{
                backgroundColor: "var(--charcoal-mid)",
                border: "1px solid rgba(184,149,42,0.1)",
                opacity: 0,
              }}
              data-cursor="VIEW"
            >
              {/* Portrait area */}
              <div
                className="relative aspect-[3/4] overflow-hidden"
                style={{ background: barber.accentBg }}
              >
                {/* Atmospheric glow */}
                <div
                  className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(ellipse at 50% 30%, ${barber.glowColor} 0%, transparent 65%)`,
                  }}
                />

                {/* Decorative barber silhouette */}
                <div className="absolute inset-0 flex items-center justify-center opacity-15 group-hover:opacity-25 transition-opacity duration-500">
                  <svg width="100" height="180" viewBox="0 0 100 180" fill="none">
                    {/* Head */}
                    <circle cx="50" cy="30" r="22" fill="rgba(184,149,42,0.6)" />
                    {/* Body/shirt */}
                    <path d="M20 80 Q30 60 50 58 Q70 60 80 80 L85 180 L15 180 Z" fill="rgba(184,149,42,0.4)" />
                    {/* Scissors */}
                    <path d="M55 100 L80 140 M70 100 L45 140" stroke="rgba(184,149,42,0.8)" strokeWidth="2" />
                    <circle cx="80" cy="140" r="5" fill="rgba(184,149,42,0.6)" />
                    <circle cx="45" cy="140" r="5" fill="rgba(184,149,42,0.6)" />
                  </svg>
                </div>

                {/* Brass corner accent */}
                <div className="absolute top-4 right-4">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M20 0 L20 20 L0 20" stroke="rgba(184,149,42,0.5)" strokeWidth="1" fill="none" />
                  </svg>
                </div>
                <div className="absolute bottom-4 left-4">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M0 20 L0 0 L20 0" stroke="rgba(184,149,42,0.5)" strokeWidth="1" fill="none" />
                  </svg>
                </div>

                {/* Years badge */}
                <div
                  className="absolute bottom-4 right-4 w-12 h-12 flex flex-col items-center justify-center"
                  style={{ border: "1px solid rgba(184,149,42,0.4)" }}
                >
                  <span
                    className="display-text"
                    style={{ fontSize: "0.8rem", color: "var(--brass)", lineHeight: "1", fontFamily: "var(--font-display)" }}
                  >
                    {barber.years}
                  </span>
                  <span className="label-text" style={{ color: "rgba(184,149,42,0.5)", fontSize: "0.4rem" }}>
                    CRAFT
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <p className="label-text mb-1" style={{ color: "rgba(184,149,42,0.5)", fontSize: "0.5rem" }}>
                  {barber.title}
                </p>
                <h3
                  className="font-bold mb-2"
                  style={{ fontSize: "1.1rem", color: "var(--cream)", fontFamily: "var(--font-display)" }}
                >
                  {barber.name}
                </h3>
                <p
                  className="text-sm mb-4 leading-relaxed"
                  style={{
                    color: "rgba(245,240,232,0.4)",
                    fontFamily: "var(--font-serif)",
                    fontSize: "0.8rem",
                    lineHeight: "1.6",
                  }}
                >
                  {barber.bio}
                </p>

                <div className="pt-4 border-t" style={{ borderColor: "rgba(184,149,42,0.1)" }}>
                  <p className="label-text mb-1" style={{ color: "rgba(184,149,42,0.4)", fontSize: "0.45rem" }}>
                    SIGNATURE
                  </p>
                  <p
                    className="text-sm italic"
                    style={{ color: "var(--brass-light)", fontFamily: "var(--font-serif)", fontSize: "0.85rem" }}
                  >
                    {barber.signature}
                  </p>
                </div>

                <a
                  href="#"
                  className="mt-4 flex items-center gap-2 group/ig"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(184,149,42,0.5)" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="rgba(184,149,42,0.5)" stroke="none" />
                  </svg>
                  <span
                    className="label-text transition-colors duration-300 group-hover/ig:text-brass-light"
                    style={{ color: "rgba(184,149,42,0.4)", fontSize: "0.5rem" }}
                  >
                    {barber.instagram}
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
