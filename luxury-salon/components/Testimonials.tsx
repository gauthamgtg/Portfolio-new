"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "I've been to barbers on three continents. James at Obsidian is the only one I've ever rescheduled a flight for.",
    client: "Alexander R.",
    position: "Managing Director, Blackstone",
    city: "Upper East Side",
  },
  {
    quote: "Every man has a place that makes him feel like himself. For me, it's been Obsidian for eleven years. I walked out of my first appointment and canceled every other barber's number.",
    client: "Marcus W.",
    position: "Partner, Sullivan & Cromwell",
    city: "Tribeca",
  },
  {
    quote: "Theo understands my hair better than I do. I stopped trying to explain what I want — I just sit down and it's right. Every single time.",
    client: "Daniel K.",
    position: "Creative Director",
    city: "SoHo",
  },
  {
    quote: "The hot-towel shave is the closest thing I've found to an hour of actual silence in Manhattan. The result is secondary to the experience. Both are exceptional.",
    client: "James O.",
    position: "Surgeon, NYP-Columbia",
    city: "Riverside Drive",
  },
  {
    quote: "I've referred four colleagues to Obsidian. All four are now members. That says more than any review.",
    client: "William T.",
    position: "Senior VP, Goldman Sachs",
    city: "Financial District",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const interval = setInterval(() => {
      const next = (active + 1) % testimonials.length;
      animateTransition(next);
    }, 5000);

    return () => clearInterval(interval);
  }, [active]);

  const animateTransition = (next: number) => {
    const q = quoteRef.current;
    const c = clientRef.current;
    if (!q || !c) return;

    gsap.to([q, c], {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setActive(next);
        gsap.fromTo(
          [q, c],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );
      },
    });
  };

  const current = testimonials[active];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ backgroundColor: "var(--charcoal)" }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(184,149,42,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-8 md:px-16 text-center">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-20">
          <div className="w-12 h-px opacity-40" style={{ backgroundColor: "var(--brass)" }} />
          <span className="label-text" style={{ color: "var(--brass)" }}>
            THE WORD
          </span>
          <div className="w-12 h-px opacity-40" style={{ backgroundColor: "var(--brass)" }} />
        </div>

        {/* Quote mark */}
        <div
          className="quote-mark mb-8 select-none"
          style={{ fontSize: "8rem", lineHeight: 1, color: "var(--brass)", opacity: 0.15 }}
        >
          "
        </div>

        {/* Quote */}
        <div ref={quoteRef}>
          <blockquote
            className="mb-10"
            style={{
              fontSize: "clamp(1.2rem, 3vw, 2rem)",
              color: "var(--cream)",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              lineHeight: "1.6",
              fontWeight: 300,
            }}
          >
            {current.quote}
          </blockquote>
        </div>

        {/* Client info */}
        <div ref={clientRef}>
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="w-8 h-px opacity-40" style={{ backgroundColor: "var(--brass)" }} />
            <span
              className="label-text"
              style={{ color: "var(--brass)", letterSpacing: "0.2em" }}
            >
              {current.client}
            </span>
            <div className="w-8 h-px opacity-40" style={{ backgroundColor: "var(--brass)" }} />
          </div>
          <p
            className="text-sm"
            style={{ color: "rgba(245,240,232,0.35)", fontFamily: "var(--font-body)" }}
          >
            {current.position} · {current.city}
          </p>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-3 mt-16">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => animateTransition(i)}
              className="w-6 h-px transition-all duration-400 cursor-none"
              style={{
                backgroundColor: i === active ? "var(--brass)" : "rgba(184,149,42,0.25)",
                height: "1px",
                width: i === active ? "32px" : "16px",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
