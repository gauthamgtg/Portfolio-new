/** utils.ts — Tiny, dependency-free helpers shared across the experience. */

/** Conditional className joiner. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Linear interpolation. */
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/** Clamp a value between min and max. */
export const clamp = (v: number, min: number, max: number): number =>
  Math.min(Math.max(v, min), max);

/** Re-map a value from one range to another. */
export const mapRange = (
  v: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number => outMin + ((v - inMin) * (outMax - outMin)) / (inMax - inMin);

/** Split a string into characters while preserving spaces as a flag. */
export const toChars = (str: string): Array<{ char: string; isSpace: boolean }> =>
  Array.from(str).map((char) => ({ char, isSpace: char === " " }));
