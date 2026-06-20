import { cn } from "@/lib/utils";

/** Eyebrow — the small gold-ruled section label used throughout. */
export default function Eyebrow({
  children,
  className,
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.65rem] uppercase tracking-widest2",
        dark ? "text-bone/55" : "text-cocoa/70",
        className,
      )}
    >
      <span className="inline-block h-px w-8 bg-gold/70" />
      {children}
    </p>
  );
}
