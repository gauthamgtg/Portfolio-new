"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * SmoothScroll — inertia smooth-scroll via Lenis, wired into the GSAP ticker so
 * that ScrollTrigger reads positions from the same clock (no jitter, no double
 * RAF loop). Reduced-motion users get native scrolling untouched.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      // expo-out: a long, luxurious glide that settles softly.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    // Drive ScrollTrigger from Lenis' scroll event.
    lenis.on("scroll", ScrollTrigger.update);

    // Single RAF: GSAP's ticker advances Lenis (ticker time is in seconds).
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
