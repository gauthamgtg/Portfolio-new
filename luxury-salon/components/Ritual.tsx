"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "I",
    title: "The Arrival",
    detail: "Warm welcome. Your barber awaits. A glass of single-malt Scotch or a double espresso — your call, no judgment.",
    icon: "●",
  },
  {
    number: "II",
    title: "The Consultation",
    detail: "Not a questionnaire. A conversation. We study your face, your hair's behavior, your lifestyle. Every detail matters.",
    icon: "◈",
  },
  {
    number: "III",
    title: "The Hot-Towel",
    detail: "Eucalyptus-steamed towels open your pores and signal to your skin that what follows is intentional. This is not a shortcut.",
    icon: "◎",
  },
  {
    number: "IV",
    title: "The Cut",
    detail: "Scissors over comb. Or clipper over skin. The technique varies. The precision never does. Time is irrelevant here.",
    icon: "✦",
  },
  {
    number: "V",
    title: "The Finish",
    detail: "Straight-razor neck line. Sandalwood balm. Cold-towel close. A final mirror moment. You'll know it's right.",
    icon: "◆",
  },
  {
    number: "VI",
    title: "The After",
    detail: "Leave unhurried. Your next appointment is already set. Your barber knows you now. That's what returns you.",
    icon: "◇",
  },
];

export default function Ritual() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const steps = stepsRef.current?.querySelectorAll(".ritual-step");
    if (steps) {
      steps.forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              once: true,
            },
          }
        );
      });
    }

    // Vertical progress line
    const progress = progressRef.current;
    if (progress) {
      gsap.fromTo(
        progress,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ritual"
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ backgroundColor: "var(--charcoal-mid)" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(184,149,42,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px" style={{ backgroundColor: "var(--brass)", opacity: 0.4 }} />
            <span className="label-text" style={{ color: "var(--brass)" }}>
              THE EXPERIENCE
            </span>
            <div className="w-12 h-px" style={{ backgroundColor: "var(--brass)", opacity: 0.4 }} />
          </div>
          <h2
            className="display-text mb-6"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 8rem)",
              color: "var(--cream)",
              fontFamily: "var(--font-display)",
              lineHeight: "0.9",
            }}
          >
            The{" "}
            <em style={{ color: "var(--brass)" }}>Ritual</em>
          </h2>
          <p
            className="max-w-lg mx-auto leading-relaxed"
            style={{
              color: "rgba(245,240,232,0.5)",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "1.05rem",
            }}
          >
            Every appointment follows a sequence of intentional steps. Nothing is skipped. Nothing is rushed. Everything is deliberate.
          </p>
        </div>

        {/* Steps with timeline */}
        <div className="relative" ref={stepsRef}>
          {/* Vertical line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: "rgba(184,149,42,0.1)" }}
          >
            <div
              ref={progressRef}
              className="absolute top-0 left-0 w-full"
              style={{
                height: "100%",
                background: "linear-gradient(180deg, var(--brass), rgba(184,149,42,0.3))",
                transformOrigin: "top",
                transform: "scaleY(0)",
              }}
            />
          </div>

          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`ritual-step relative flex items-center gap-8 md:gap-16 py-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
                style={{ opacity: 0 }}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} text-left`}
                >
                  <div
                    className={`flex items-center gap-4 mb-4 ${
                      i % 2 === 0 ? "md:flex-row-reverse" : ""
                    } flex-row`}
                  >
                    <span
                      className="label-text"
                      style={{ color: "rgba(184,149,42,0.5)", fontSize: "0.5rem" }}
                    >
                      STEP {step.number}
                    </span>
                    <div className="w-6 h-px" style={{ backgroundColor: "rgba(184,149,42,0.3)" }} />
                  </div>
                  <h3
                    className="font-bold mb-3"
                    style={{
                      fontSize: "1.4rem",
                      color: "var(--cream)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="leading-relaxed max-w-xs"
                    style={{
                      color: "rgba(245,240,232,0.5)",
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: "0.9rem",
                      lineHeight: "1.75",
                      marginLeft: i % 2 === 0 ? "auto" : 0,
                    }}
                  >
                    {step.detail}
                  </p>
                </div>

                {/* Center node */}
                <div
                  className="hidden md:flex flex-shrink-0 w-14 h-14 items-center justify-center relative z-10"
                  style={{
                    border: "1px solid rgba(184,149,42,0.4)",
                    backgroundColor: "var(--charcoal-mid)",
                  }}
                >
                  <span
                    style={{ color: "var(--brass)", fontSize: "1.2rem", fontFamily: "var(--font-serif)" }}
                  >
                    {step.icon}
                  </span>
                </div>

                {/* Spacer on opposite side */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 pt-16 border-t" style={{ borderColor: "rgba(184,149,42,0.1)" }}>
          <p
            className="mb-8 text-lg"
            style={{
              color: "rgba(245,240,232,0.6)",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
            }}
          >
            Experience it once. You'll never accept less.
          </p>
          <a
            href="#booking"
            className="magnetic-btn group relative inline-flex items-center gap-4 px-12 py-5 overflow-hidden border"
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
              Begin Your Ritual
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
