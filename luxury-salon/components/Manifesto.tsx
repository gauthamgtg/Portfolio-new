"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const manifestoLines = [
  "A great cut",
  "is a negotiation",
  "between the man",
  "and the blade.",
];

const paragraphs = [
  "We don't do walk-ins. We don't rush appointments. We don't believe in mediocrity disguised as efficiency. Every chair at Obsidian is a private dialogue between a master and his craft.",
  "Since 2009, we've sharpened our razors and our standards in equal measure. The result: a grooming house where time slows, detail reigns, and you leave looking exactly as you intended.",
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const headline = headlineRef.current;
    const para = paraRef.current;
    const stats = statsRef.current;
    const img = imgRef.current;

    if (!section) return;

    // Headline lines reveal
    const lines = headline?.querySelectorAll(".manifesto-line");
    if (lines) {
      gsap.fromTo(
        lines,
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: headline,
            start: "top 80%",
            once: true,
          },
        }
      );
    }

    // Paragraphs
    const paras = para?.querySelectorAll("p");
    if (paras) {
      gsap.fromTo(
        paras,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: para,
            start: "top 80%",
            once: true,
          },
        }
      );
    }

    // Image reveal
    if (img) {
      gsap.fromTo(
        img,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: img,
            start: "top 75%",
            once: true,
          },
        }
      );
    }

    // Stats count-up
    const statEls = stats?.querySelectorAll(".stat-number");
    statEls?.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target") || "0");
      const suffix = el.getAttribute("data-suffix") || "";
      let current = 0;
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          const update = () => {
            current += Math.ceil(target / 60);
            if (current >= target) {
              current = target;
              el.textContent = `${target}${suffix}`;
              return;
            }
            el.textContent = `${current}${suffix}`;
            requestAnimationFrame(update);
          };
          requestAnimationFrame(update);
        },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ backgroundColor: "var(--charcoal)" }}
    >
      {/* Top brass rule */}
      <div className="brass-rule mb-0" />

      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(184,149,42,0.2) 40px, rgba(184,149,42,0.2) 41px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-8 md:px-16">
        {/* Label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="w-8 h-px" style={{ backgroundColor: "var(--brass)" }} />
          <span className="label-text" style={{ color: "var(--brass)" }}>
            THE HOUSE PHILOSOPHY
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Big headline */}
          <div ref={headlineRef}>
            {manifestoLines.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <h2
                  className="manifesto-line display-text"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 6rem)",
                    color: i === 1 || i === 3 ? "var(--brass)" : "var(--cream)",
                    fontFamily: "var(--font-display)",
                    lineHeight: "1.05",
                    opacity: 0,
                  }}
                >
                  {line}
                </h2>
              </div>
            ))}

            {/* Stats row */}
            <div ref={statsRef} className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t" style={{ borderColor: "rgba(184,149,42,0.15)" }}>
              {[
                { number: 15, suffix: "+", label: "Master Barbers" },
                { number: 42000, suffix: "", label: "Cuts Delivered" },
                { number: 6, suffix: "", label: "Awwwards Rec." },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="stat-number display-text mb-1"
                    data-target={stat.number}
                    data-suffix={stat.suffix}
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3.5rem)",
                      color: "var(--brass)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    0{stat.suffix}
                  </p>
                  <p className="label-text" style={{ color: "rgba(245,240,232,0.4)" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image + paragraphs */}
          <div className="flex flex-col gap-12">
            {/* Editorial image placeholder */}
            <div
              ref={imgRef}
              className="relative aspect-[4/5] overflow-hidden"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, var(--charcoal-mid) 0%, var(--tobacco) 40%, var(--charcoal) 100%)",
                }}
              />
              {/* Atmospheric layers */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 20%, rgba(184,149,42,0.3) 0%, transparent 60%)",
                }}
              />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background:
                    "radial-gradient(ellipse at 70% 80%, rgba(196,122,58,0.4) 0%, transparent 50%)",
                }}
              />
              {/* Simulated razor/blade shape */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  width="120"
                  height="300"
                  viewBox="0 0 120 300"
                  fill="none"
                  opacity="0.2"
                >
                  <path
                    d="M60 20 L80 60 L75 280 L60 295 L45 280 L40 60 Z"
                    fill="rgba(184,149,42,0.5)"
                    stroke="rgba(184,149,42,0.8)"
                    strokeWidth="1"
                  />
                  <path
                    d="M60 20 L80 60 L60 55 L40 60 Z"
                    fill="rgba(212,175,90,0.8)"
                  />
                  <line
                    x1="60" y1="65" x2="60" y2="285"
                    stroke="rgba(184,149,42,0.4)"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>
              {/* Caption overlay */}
              <div
                className="absolute bottom-6 left-6 right-6"
              >
                <p className="label-text" style={{ color: "rgba(184,149,42,0.8)" }}>
                  The straight razor. The last honest tool.
                </p>
              </div>
            </div>

            {/* Text */}
            <div ref={paraRef} className="flex flex-col gap-6">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="leading-relaxed"
                  style={{
                    color: "rgba(245,240,232,0.65)",
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.05rem",
                    lineHeight: "1.85",
                  }}
                >
                  {p}
                </p>
              ))}

              <div className="flex items-center gap-4 mt-4">
                <div className="w-12 h-px" style={{ backgroundColor: "var(--brass)" }} />
                <span
                  className="label-text"
                  style={{ color: "var(--brass)" }}
                >
                  JAMES HARRINGTON · FOUNDER
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom brass rule */}
      <div className="brass-rule mt-0 absolute bottom-0 left-0 right-0" />
    </section>
  );
}
