"use client";

import { cn } from "@/lib/utils";

/**
 * Marquee — seamless infinite ticker (two duplicated rows translated -50%).
 * Pauses for reduced-motion via the global CSS rule.
 */
export default function Marquee({
  items,
  className,
  speed = 30,
}: {
  items: string[];
  className?: string;
  speed?: number;
}) {
  const Row = () => (
    <div className="flex shrink-0 items-center">
      {items.map((it, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span>{it}</span>
          <span className="mx-8 text-gold md:mx-12">✶</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("flex w-full overflow-hidden", className)}>
      <div
        className="flex will-change-transform"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        <Row />
        <Row />
      </div>
    </div>
  );
}
