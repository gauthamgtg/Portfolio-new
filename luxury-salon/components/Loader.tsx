"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<SVGSVGElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const tl = gsap.timeline();
    const progressEl = progressRef.current;
    const monogram = monogramRef.current;
    const counter = counterRef.current;
    const tagline = taglineRef.current;
    const loader = loaderRef.current;

    if (!loader) return;

    // Animate SVG monogram paths
    const paths = monogram?.querySelectorAll("path");
    if (paths) {
      paths.forEach((path) => {
        const length = (path as SVGPathElement).getTotalLength?.() ?? 200;
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          fill: "transparent",
        });
      });
    }

    // Count up
    let currentCount = 0;
    const countInterval = setInterval(() => {
      currentCount += Math.floor(Math.random() * 8) + 1;
      if (currentCount >= 100) {
        currentCount = 100;
        clearInterval(countInterval);
      }
      setCount(currentCount);
    }, 40);

    tl.to(
      paths ?? [],
      {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.inOut",
        stagger: 0.15,
      },
      0
    )
      .to(
        paths ?? [],
        {
          fill: "rgba(184, 149, 42, 0.9)",
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
        },
        1.2
      )
      .to(
        progressEl,
        {
          scaleX: 1,
          duration: 2.0,
          ease: "power2.inOut",
          transformOrigin: "left",
        },
        0
      )
      .to(
        tagline,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        0.6
      )
      .to(
        loader,
        {
          yPercent: -100,
          duration: 1.0,
          ease: "power3.inOut",
          delay: 0.4,
          onComplete: () => {
            onComplete();
          },
        },
        2.4
      );

    return () => {
      clearInterval(countInterval);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--obsidian)" }}
    >
      {/* Monogram SVG */}
      <div className="relative mb-12">
        <svg
          ref={monogramRef}
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-2"
        >
          {/* Outer circle */}
          <path
            d="M60 8 A52 52 0 1 1 59.99 8 Z"
            stroke="rgba(184,149,42,0.4)"
            strokeWidth="0.5"
            fill="none"
          />
          {/* Inner decorative ring */}
          <path
            d="M60 16 A44 44 0 1 1 59.99 16 Z"
            stroke="rgba(184,149,42,0.2)"
            strokeWidth="0.5"
            fill="none"
          />
          {/* O letterform */}
          <path
            d="M38 40 C38 28 48 22 60 22 C72 22 82 28 82 40 L82 80 C82 92 72 98 60 98 C48 98 38 92 38 80 Z"
            stroke="rgba(184,149,42,0.9)"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Inner O cut */}
          <path
            d="M48 42 C48 34 53 30 60 30 C67 30 72 34 72 42 L72 78 C72 86 67 90 60 90 C53 90 48 86 48 78 Z"
            stroke="rgba(184,149,42,0.9)"
            strokeWidth="1"
            fill="none"
          />
          {/* Horizontal accent lines */}
          <path
            d="M42 56 L78 56"
            stroke="rgba(184,149,42,0.6)"
            strokeWidth="0.8"
          />
          <path
            d="M42 64 L78 64"
            stroke="rgba(184,149,42,0.6)"
            strokeWidth="0.8"
          />
          {/* Corner flourishes */}
          <path
            d="M20 20 L30 20 L30 30"
            stroke="rgba(184,149,42,0.3)"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M100 20 L90 20 L90 30"
            stroke="rgba(184,149,42,0.3)"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M20 100 L30 100 L30 90"
            stroke="rgba(184,149,42,0.3)"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M100 100 L90 100 L90 90"
            stroke="rgba(184,149,42,0.3)"
            strokeWidth="0.8"
            fill="none"
          />
        </svg>
      </div>

      {/* Brand name */}
      <p
        className="label-text mb-8"
        style={{ color: "rgba(184, 149, 42, 0.6)", letterSpacing: "0.5em" }}
      >
        OBSIDIAN
      </p>

      {/* Progress bar */}
      <div className="loader-progress mb-4">
        <div
          ref={progressRef}
          className="loader-progress-fill"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Counter */}
      <div className="flex items-center gap-3">
        <span
          ref={counterRef}
          className="text-xs tabular-nums"
          style={{ color: "rgba(184, 149, 42, 0.5)", fontFamily: "var(--font-body)", letterSpacing: "0.15em" }}
        >
          {String(count).padStart(3, "0")}
        </span>
      </div>

      {/* Tagline */}
      <p
        ref={taglineRef}
        className="absolute bottom-10 label-text opacity-0"
        style={{
          color: "rgba(184, 149, 42, 0.3)",
          transform: "translateY(10px)",
          letterSpacing: "0.3em",
        }}
      >
        THE CRAFT OF THE HOUSE
      </p>
    </div>
  );
}
