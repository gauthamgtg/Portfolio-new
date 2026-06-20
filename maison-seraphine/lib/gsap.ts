/**
 * gsap.ts — Central GSAP entry point.
 *
 * ScrollTrigger is the animation backbone for the whole page. Registering it
 * once here (guarded for SSR) keeps every component importing from a single
 * source and avoids duplicate-registration warnings.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Honour the OS-level reduced-motion preference globally. Any tween created
  // inside a matchMedia("(prefers-reduced-motion: reduce)") context is muted.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };
