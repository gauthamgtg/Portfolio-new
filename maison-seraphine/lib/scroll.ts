/**
 * scroll.ts — Smooth-scroll bridge.
 *
 * The Lenis instance is created in <SmoothScroll/> and parked on `window` so
 * that anchor navigation (nav links, scroll cue, CTA) can drive it from
 * anywhere without prop-drilling. Falls back to native scrolling when Lenis is
 * absent (reduced-motion users, or before hydration).
 */
import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function scrollToSection(href: string) {
  if (typeof window === "undefined") return;
  const target = document.querySelector(href);
  if (!target) return;

  if (window.__lenis) {
    window.__lenis.scrollTo(target as HTMLElement, {
      offset: 0,
      duration: 1.4,
    });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function stopScroll() {
  window.__lenis?.stop();
}

export function startScroll() {
  window.__lenis?.start();
}
