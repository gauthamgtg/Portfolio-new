"use client";

import { cn } from "@/lib/utils";

/**
 * ToneImage — an art-directed gradient "photograph".
 *
 * The site ships self-contained: rather than depend on external photo assets,
 * each editorial surface (service previews, stylist portraits, lookbook plates)
 * is rendered as a layered gradient evoking light falling across silk strands —
 * intentional, on-brand and zero-weight. To use real photography instead, drop
 * an <img>/next <Image> in place of this component; the layout is identical.
 */
export default function ToneImage({
  tone,
  className,
  children,
  strands = true,
}: {
  tone: [string, string];
  className?: string;
  children?: React.ReactNode;
  strands?: boolean;
}) {
  const [a, b] = tone;
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ background: `linear-gradient(155deg, ${a} 0%, ${b} 100%)` }}
    >
      {/* Fine strand texture */}
      {strands && (
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(102deg, rgba(255,255,255,0.7) 0px, rgba(255,255,255,0) 2px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0) 6px)",
          }}
        />
      )}
      {/* Soft volumetric light */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 40% at 32% 22%, rgba(255,247,231,0.4), transparent 62%)",
        }}
      />
      {/* Bottom shade for legible captions */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background: "linear-gradient(to top, rgba(15,10,7,0.55), transparent)",
        }}
      />
      {children}
    </div>
  );
}
