"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  {
    name: "The Patron",
    price: "$195",
    period: "/ month",
    description: "For the man who visits monthly and expects every appointment to feel like his first.",
    perks: [
      "1 Signature Cut per month",
      "Priority booking (48-hr window)",
      "10% off all additional services",
      "Complimentary hot-towel upgrade",
      "OBSIDIAN grooming kit on enrollment",
    ],
    featured: false,
    cta: "Join The Patron",
  },
  {
    name: "The Member",
    price: "$325",
    period: "/ month",
    description: "For those who understand that premium grooming isn't a luxury — it's maintenance.",
    perks: [
      "2 Signature Cuts per month",
      "Priority booking (24-hr window)",
      "20% off all additional services",
      "Complimentary beard trim between cuts",
      "Private lounge access",
      "Annual hot-towel shave (complimentary)",
      "Dedicated barber reservation",
    ],
    featured: true,
    cta: "Join The Member",
  },
  {
    name: "The House",
    price: "$595",
    period: "/ month",
    description: "Unlimited access. Dedicated barber. The full weight of the house at your disposal.",
    perks: [
      "Unlimited cuts & services",
      "Concierge booking (same-day available)",
      "Dedicated master barber",
      "Private chair reservation anytime",
      "Monthly grooming product selection",
      "Mobile grooming service (2x per year)",
      "Founding member plaque in The House",
    ],
    featured: false,
    cta: "Join The House",
  },
];

export default function Membership() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const headEl = headRef.current;
    if (headEl) {
      gsap.fromTo(
        headEl.querySelectorAll(".mem-line"),
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headEl,
            start: "top 80%",
            once: true,
          },
        }
      );
    }

    const cards = cardsRef.current?.querySelectorAll(".tier-card-wrapper");
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
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
      id="membership"
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ backgroundColor: "var(--obsidian)" }}
    >
      {/* Top atmospheric gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(184,149,42,0.04) 0%, transparent 100%)",
        }}
      />

      {/* Diagonal decorative line */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-5"
        style={{
          backgroundImage: "repeating-linear-gradient(-45deg, rgba(184,149,42,0.3) 0px, rgba(184,149,42,0.3) 1px, transparent 1px, transparent 60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-8 md:px-16">
        {/* Header */}
        <div ref={headRef} className="text-center mb-24">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px opacity-40" style={{ backgroundColor: "var(--brass)" }} />
            <span className="label-text" style={{ color: "var(--brass)" }}>
              THE CLUB
            </span>
            <div className="w-12 h-px opacity-40" style={{ backgroundColor: "var(--brass)" }} />
          </div>

          <div className="overflow-hidden">
            <h2
              className="mem-line display-text"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 8rem)",
                color: "var(--cream)",
                fontFamily: "var(--font-display)",
                lineHeight: "0.9",
                opacity: 0,
              }}
            >
              Membership
            </h2>
          </div>
          <div className="overflow-hidden">
            <p
              className="mem-line label-text mt-4 opacity-0"
              style={{ color: "var(--brass)" }}
            >
              PRIVATE · RECURRING · IRREPLACEABLE
            </p>
          </div>

          <p
            className="max-w-lg mx-auto mt-8 leading-relaxed"
            style={{
              color: "rgba(245,240,232,0.5)",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "1rem",
            }}
          >
            Not a loyalty programme. Not a subscription box. A standing appointment with the city's finest barbers — and the understanding that comes with it.
          </p>
        </div>

        {/* Tier cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`tier-card-wrapper tier-card relative flex flex-col p-8 md:p-10 ${tier.featured ? "featured" : ""}`}
              style={{
                backgroundColor: tier.featured ? "rgba(184,149,42,0.06)" : "rgba(26,26,26,0.6)",
                opacity: 0,
              }}
            >
              {tier.featured && (
                <div
                  className="absolute -top-px left-0 right-0 h-px"
                  style={{ background: "var(--brass)" }}
                />
              )}

              {/* Featured badge */}
              {tier.featured && (
                <div className="absolute top-6 right-6">
                  <span
                    className="label-text px-3 py-1"
                    style={{
                      color: "var(--obsidian)",
                      backgroundColor: "var(--brass)",
                      fontSize: "0.45rem",
                    }}
                  >
                    MOST CHOSEN
                  </span>
                </div>
              )}

              {/* Tier name */}
              <p className="label-text mb-2" style={{ color: "rgba(184,149,42,0.5)" }}>
                {tier.name.toUpperCase()}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-6">
                <span
                  className="display-text"
                  style={{
                    fontSize: "3.5rem",
                    color: tier.featured ? "var(--brass)" : "var(--cream)",
                    fontFamily: "var(--font-display)",
                    lineHeight: "1",
                  }}
                >
                  {tier.price}
                </span>
                <span
                  className="text-sm"
                  style={{ color: "rgba(245,240,232,0.4)", fontFamily: "var(--font-serif)" }}
                >
                  {tier.period}
                </span>
              </div>

              {/* Description */}
              <p
                className="text-sm mb-8 leading-relaxed"
                style={{
                  color: "rgba(245,240,232,0.5)",
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "0.9rem",
                  lineHeight: "1.7",
                }}
              >
                {tier.description}
              </p>

              {/* Perks */}
              <ul className="flex flex-col gap-3 mb-10 flex-1">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3">
                    <span style={{ color: "var(--brass)", flexShrink: 0, marginTop: "2px", fontSize: "0.7rem" }}>
                      ◆
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        color: "rgba(245,240,232,0.6)",
                        fontFamily: "var(--font-serif)",
                        fontSize: "0.85rem",
                        lineHeight: "1.5",
                      }}
                    >
                      {perk}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#booking"
                className="magnetic-btn group relative flex items-center justify-center overflow-hidden py-4 border"
                style={{
                  borderColor: tier.featured ? "var(--brass)" : "rgba(184,149,42,0.3)",
                  backgroundColor: tier.featured ? "transparent" : "transparent",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span
                  className="relative z-10 label-text transition-colors duration-400 group-hover:text-obsidian"
                  style={{ color: tier.featured ? "var(--brass)" : "rgba(245,240,232,0.6)" }}
                >
                  {tier.cta}
                </span>
                <span
                  className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ backgroundColor: "var(--brass)" }}
                />
              </a>
            </div>
          ))}
        </div>

        {/* Fine print */}
        <p
          className="text-center mt-12 label-text"
          style={{ color: "rgba(245,240,232,0.2)", fontSize: "0.5rem" }}
        >
          All memberships are month-to-month. Cancel anytime. No contracts, no conditions — only standards.
        </p>
      </div>
    </section>
  );
}
