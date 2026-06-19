"use client";

/**
 * Centralised GSAP + ScrollTrigger registration.
 * Importing from here guarantees the plugin is registered exactly once
 * on the client and never touched during SSR.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
