"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: 15, suffix: "+", label: "Master Barbers", sublabel: "hand-selected" },
  { number: 2009, suffix: "", label: "Year Founded", sublabel: "in Manhattan" },
  { number: 42000, suffix: "+", label: "Cuts Delivered", sublabel: "and counting" },
  { number: 97, suffix: "%", label: "Return Rate", sublabel: "of all clients" },
  { number: 8, suffix: "", label: "Awwwards", sublabel: "industry recognitions" },
  { number: 3, suffix: "K+", label: "Members", sublabel: "in The Club" },
];

const marqueeItems = [
  "PRECISION", "CRAFT", "TRADITION", "MASTERY", "OBSIDIAN",
  "MANHATTAN", "THE RITUAL", "THE BLADE", "THE HOUSE",
  "PRECISION", "CRAFT", "TRADITION", "MASTERY", "OBSIDIAN",
  "MANHATTAN", "THE RITUAL", "THE BLADE", "THE HOUSE",
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const statEls = statsGridRef.current?.querySelectorAll(".stat-item");
    if (statEls) {
      gsap.fromTo(
        statEls,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsGridRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }

    // Count-up animations
    const numbers = statsGridRef.current?.querySelectorAll(".count-num");
    numbers?.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target") || "0");
      const suffix = el.getAttribute("data-suffix") || "";

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          let start = 0;
          const duration = 2000;
          const startTime = Date.now();

          const updateCount = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (target - start) * eased);
            el.textContent = current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(updateCount);
          };

          requestAnimationFrame(updateCount);
        },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--obsidian)" }}
    >
      {/* Marquee strip */}
      <div
        className="py-4 border-y overflow-hidden"
        style={{ borderColor: "rgba(184,149,42,0.15)", backgroundColor: "rgba(184,149,42,0.03)" }}
      >
        <div className="marquee-container">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-6 px-6"
              >
                <span
                  className="label-text"
                  style={{ color: i % 5 === 2 ? "var(--brass)" : "rgba(245,240,232,0.2)" }}
                >
                  {item}
                </span>
                <span style={{ color: "rgba(184,149,42,0.3)", fontSize: "0.4rem" }}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div
            ref={statsGridRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px"
            style={{ border: "1px solid rgba(184,149,42,0.08)" }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="stat-item flex flex-col items-center justify-center text-center p-8 md:p-10 group hover:bg-opacity-50 transition-colors duration-500"
                style={{
                  border: "1px solid rgba(184,149,42,0.08)",
                  backgroundColor: "rgba(10,10,10,1)",
                  opacity: 0,
                }}
              >
                {/* Number */}
                <div className="mb-3">
                  <span
                    className="count-num display-text block"
                    data-target={stat.number}
                    data-suffix={stat.suffix}
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3.5rem)",
                      color: "var(--brass)",
                      fontFamily: "var(--font-display)",
                      lineHeight: "1",
                    }}
                  >
                    0{stat.suffix}
                  </span>
                </div>

                {/* Brass rule */}
                <div
                  className="w-8 h-px mb-3 transition-all duration-400 group-hover:w-12"
                  style={{ backgroundColor: "rgba(184,149,42,0.4)" }}
                />

                <p
                  className="label-text mb-1"
                  style={{ color: "var(--cream)", opacity: 0.7 }}
                >
                  {stat.label}
                </p>
                <p
                  className="label-text"
                  style={{ color: "rgba(184,149,42,0.4)", fontSize: "0.45rem" }}
                >
                  {stat.sublabel}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second marquee - reversed */}
      <div
        className="py-4 border-t overflow-hidden"
        style={{ borderColor: "rgba(184,149,42,0.15)", backgroundColor: "rgba(184,149,42,0.02)" }}
      >
        <div className="marquee-container">
          <div className="marquee-track" style={{ animationDirection: "reverse" }}>
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-6 px-6">
                <span
                  className="label-text"
                  style={{ color: i % 7 === 3 ? "var(--copper)" : "rgba(245,240,232,0.12)" }}
                >
                  {item}
                </span>
                <span style={{ color: "rgba(196,122,58,0.3)", fontSize: "0.4rem" }}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
