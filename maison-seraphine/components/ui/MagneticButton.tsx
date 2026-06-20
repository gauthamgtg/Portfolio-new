"use client";

import Magnetic from "./Magnetic";
import { cn } from "@/lib/utils";

/**
 * MagneticButton — the brand CTA. A gold-outlined pill whose interior fills
 * from the bottom on hover while the label flips to ink. Magnetic on precise
 * pointers and flagged for the custom cursor.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "solid",
  className,
  cursorLabel = "Book",
  target,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "ghost";
  className?: string;
  cursorLabel?: string;
  target?: "_blank";
}) {
  const base =
    "group/btn relative inline-flex items-center justify-center overflow-hidden rounded-full px-9 py-4 text-[0.7rem] font-medium uppercase tracking-widest2 transition-colors duration-500 ease-lux";
  const skin =
    variant === "solid"
      ? "bg-gold text-ink hover:text-ink"
      : "border border-gold/60 text-espresso hover:text-bone";

  const inner = (
    <>
      {/* Sweeping fill */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-lux group-hover/btn:scale-y-100",
          variant === "solid" ? "bg-espresso" : "bg-espresso",
        )}
      />
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </>
  );

  return (
    <Magnetic strength={0.4}>
      {href ? (
        <a
          href={href}
          onClick={onClick}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          data-cursor="button"
          data-cursor-label={cursorLabel}
          className={cn(base, skin, className)}
        >
          {inner}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          data-cursor="button"
          data-cursor-label={cursorLabel}
          className={cn(base, skin, className)}
        >
          {inner}
        </button>
      )}
    </Magnetic>
  );
}
