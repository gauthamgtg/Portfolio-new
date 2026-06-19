"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const looks = [
  {
    id: "01",
    title: "The Heritage Fade",
    style: "Skin Fade · Classic Taper",
    caption: "Zero to three-guard, blended to perfection. The foundation of masculine grooming.",
    bg: "linear-gradient(160deg, #1a1208 0%, #0e0c08 60%, #0a0806 100%)",
    accent: "rgba(184,149,42,0.6)",
    shape: "fade",
  },
  {
    id: "02",
    title: "The Modern Gentleman",
    style: "Textured Crop · Side Part",
    caption: "Clean lines, controlled texture. Built for boardrooms and dinner tables alike.",
    bg: "linear-gradient(160deg, #0d0a12 0%, #0e0c18 60%, #0a0810 100%)",
    accent: "rgba(138,146,153,0.5)",
    shape: "crop",
  },
  {
    id: "03",
    title: "The Obsidian Shave",
    style: "Straight Razor · Full Ritual",
    caption: "Seventy-five minutes. Three hot-towels. One blade. Zero compromise.",
    bg: "linear-gradient(160deg, #180808 0%, #120606 60%, #0e0404 100%)",
    accent: "rgba(107,26,26,0.7)",
    shape: "razor",
  },
  {
    id: "04",
    title: "The Architect",
    style: "Beard Sculpt · Line Work",
    caption: "A beard is architecture. Every line a decision. Every edge a statement.",
    bg: "linear-gradient(160deg, #0a100e 0%, #08120e 60%, #060e0a 100%)",
    accent: "rgba(196,122,58,0.6)",
    shape: "beard",
  },
  {
    id: "05",
    title: "The Natural Transition",
    style: "Grey Blending · Color",
    caption: "Grey isn't a problem. It's a perspective. We blend it with intent.",
    bg: "linear-gradient(160deg, #10100e 0%, #0e0e0c 60%, #0c0c0a 100%)",
    accent: "rgba(176,184,191,0.5)",
    shape: "color",
  },
  {
    id: "06",
    title: "The Executive",
    style: "Precision Cut · Power Finish",
    caption: "Understated authority. The cut that closes deals before the handshake.",
    bg: "linear-gradient(160deg, #120e08 0%, #0e0c08 60%, #0c0a06 100%)",
    accent: "rgba(184,149,42,0.8)",
    shape: "executive",
  },
];

function LookCard({ look }: { look: typeof looks[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current.querySelector(".look-image-inner"), {
      scale: 1.06,
      duration: 0.8,
      ease: "power2.out",
    });
    gsap.to(cardRef.current.querySelector(".look-overlay"), {
      opacity: 1,
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current.querySelector(".look-image-inner"), {
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    });
    gsap.to(cardRef.current.querySelector(".look-overlay"), {
      opacity: 0,
      duration: 0.4,
    });
  };

  return (
    <div
      ref={cardRef}
      className="relative flex-shrink-0 overflow-hidden cursor-none"
      style={{ width: "420px", height: "560px", border: "1px solid rgba(184,149,42,0.1)" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="DRAG"
    >
      {/* Image area */}
      <div className="look-image-inner absolute inset-0 overflow-hidden" style={{ background: look.bg }}>
        {/* Atmospheric glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 20%, ${look.accent} 0%, transparent 60%)`,
            opacity: 0.7,
          }}
        />

        {/* Look-specific decorative graphic */}
        <div className="absolute inset-0 flex items-center justify-center">
          {look.shape === "fade" && (
            <svg width="160" height="220" viewBox="0 0 160 220" fill="none" opacity="0.25">
              <path d="M40 20 Q80 10 120 20 L130 120 Q80 140 30 120 Z" fill="rgba(184,149,42,0.5)" />
              <path d="M30 120 Q80 145 130 120 L125 180 Q80 195 35 180 Z" fill="rgba(184,149,42,0.2)" />
              <path d="M35 180 Q80 200 125 180 L120 210 Q80 220 40 210 Z" fill="rgba(184,149,42,0.1)" />
            </svg>
          )}
          {look.shape === "razor" && (
            <svg width="60" height="240" viewBox="0 0 60 240" fill="none" opacity="0.3">
              <path d="M30 10 L45 40 L42 220 L30 230 L18 220 L15 40 Z" fill="rgba(212,175,90,0.4)" stroke="rgba(184,149,42,0.8)" strokeWidth="1" />
              <path d="M30 10 L45 40 L30 35 L15 40 Z" fill="rgba(212,175,90,0.9)" />
              <line x1="30" y1="45" x2="30" y2="225" stroke="rgba(184,149,42,0.5)" strokeWidth="0.5" />
            </svg>
          )}
          {(look.shape === "crop" || look.shape === "beard" || look.shape === "color" || look.shape === "executive") && (
            <svg width="120" height="180" viewBox="0 0 120 180" fill="none" opacity="0.2">
              <circle cx="60" cy="50" r="35" fill="rgba(184,149,42,0.5)" />
              <path d="M20 100 Q30 80 60 78 Q90 80 100 100 L105 180 L15 180 Z" fill="rgba(184,149,42,0.3)" />
              {look.shape === "beard" && (
                <path d="M35 75 Q60 110 85 75 Q90 130 60 140 Q30 130 35 75 Z" fill="rgba(196,122,58,0.5)" />
              )}
            </svg>
          )}
        </div>

        {/* ID number */}
        <div
          className="absolute top-6 left-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "6rem",
            color: "rgba(184,149,42,0.08)",
            lineHeight: "1",
            fontWeight: 700,
            userSelect: "none",
          }}
        >
          {look.id}
        </div>
      </div>

      {/* Hover overlay */}
      <div
        className="look-overlay absolute inset-0 flex flex-col justify-end p-8 opacity-0"
        style={{ background: "linear-gradient(0deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.5) 60%, transparent 100%)" }}
      >
        <p className="label-text mb-2" style={{ color: "var(--brass)" }}>
          {look.style}
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(245,240,232,0.7)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}
        >
          {look.caption}
        </p>
      </div>

      {/* Bottom info (always visible) */}
      <div
        className="absolute bottom-0 left-0 right-0 p-8"
        style={{
          background: "linear-gradient(0deg, rgba(10,10,10,0.85) 0%, transparent 100%)",
        }}
      >
        <p className="label-text mb-1" style={{ color: "rgba(184,149,42,0.5)", fontSize: "0.5rem" }}>
          {look.style}
        </p>
        <h3
          className="font-bold"
          style={{ fontSize: "1.1rem", color: "var(--cream)", fontFamily: "var(--font-display)" }}
        >
          {look.title}
        </h3>
      </div>
    </div>
  );
}

export default function Lookbook() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const trackWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollAmount = trackWidth - viewportWidth + 160;

    // Pin the section and scroll horizontally
    gsap.to(track, {
      x: -scrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${scrollAmount}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // Title reveal
    const titleEl = titleRef.current;
    if (titleEl) {
      gsap.fromTo(
        titleEl.querySelectorAll(".lookbook-line"),
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.0,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleEl,
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
      id="lookbook"
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--obsidian)", minHeight: "100vh" }}
    >
      <div className="flex h-screen items-center">
        {/* Fixed left panel */}
        <div
          className="flex-shrink-0 w-80 px-12 flex flex-col justify-center h-full"
          style={{ borderRight: "1px solid rgba(184,149,42,0.1)" }}
        >
          <div ref={titleRef}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-6 h-px" style={{ backgroundColor: "var(--brass)" }} />
              <span className="label-text" style={{ color: "var(--brass)" }}>
                THE WORK
              </span>
            </div>
            <div className="overflow-hidden">
              <h2
                className="lookbook-line display-text"
                style={{
                  fontSize: "clamp(3rem, 5vw, 5rem)",
                  color: "var(--cream)",
                  fontFamily: "var(--font-display)",
                  lineHeight: "0.95",
                }}
              >
                The
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2
                className="lookbook-line display-text"
                style={{
                  fontSize: "clamp(3rem, 5vw, 5rem)",
                  color: "var(--brass)",
                  fontFamily: "var(--font-display)",
                  lineHeight: "0.95",
                  fontStyle: "italic",
                }}
              >
                Lookbook
              </h2>
            </div>
            <div className="overflow-hidden mt-1">
              <h2
                className="lookbook-line display-text"
                style={{
                  fontSize: "clamp(3rem, 5vw, 5rem)",
                  color: "var(--cream)",
                  fontFamily: "var(--font-display)",
                  lineHeight: "0.95",
                }}
              >
                2024
              </h2>
            </div>

            <p
              className="mt-8 text-sm leading-relaxed"
              style={{
                color: "rgba(245,240,232,0.4)",
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "0.85rem",
              }}
            >
              Six looks. Six statements. Each one a conversation between a barber and his craft.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 10 L18 10 M12 4 L18 10 L12 16" stroke="rgba(184,149,42,0.6)" strokeWidth="1.5" />
              </svg>
              <span className="label-text" style={{ color: "rgba(184,149,42,0.4)" }}>
                SCROLL TO EXPLORE
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal scroll track */}
        <div
          ref={trackRef}
          className="flex items-center gap-6 pl-16 pr-20 will-change-transform"
        >
          {looks.map((look) => (
            <LookCard key={look.id} look={look} />
          ))}
        </div>
      </div>
    </section>
  );
}
