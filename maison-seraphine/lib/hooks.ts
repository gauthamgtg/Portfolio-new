"use client";

import { useEffect, useLayoutEffect, useState } from "react";

/**
 * useIsoLayoutEffect — useLayoutEffect on the client (so GSAP can set initial
 * states before paint, avoiding a flash), useEffect on the server (no warning).
 */
export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * useReducedMotion — reflects the OS `prefers-reduced-motion` setting and keeps
 * it live (the user can toggle it without reloading). Every motion-heavy
 * component reads this and degrades to a static, accessible presentation.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

/**
 * useWebGLSupport — feature-detects a usable WebGL context so the hero can fall
 * back to a beautiful CSS treatment on unsupported / blocked GPUs.
 * Returns `null` until detection runs, then a boolean.
 */
export function useWebGLSupport(): boolean | null {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setSupported(Boolean(gl));
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}

/** useMounted — guards client-only render branches against hydration mismatch. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** Detect coarse pointers (touch) so we can skip the custom cursor entirely. */
export function useIsTouch(): boolean {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setTouch(mq.matches);
    const handler = (e: MediaQueryListEvent) => setTouch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return touch;
}
