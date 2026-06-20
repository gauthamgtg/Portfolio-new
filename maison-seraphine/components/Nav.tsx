"use client";

import { useEffect, useState } from "react";
import MenuOverlay from "./MenuOverlay";
import MagneticButton from "./ui/MagneticButton";
import Magnetic from "./ui/Magnetic";
import { brand, nav } from "@/lib/content";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/**
 * Nav — sticky top bar. Transparent over the dark hero, then solidifies into a
 * frosted bone bar once scrolled. Sits above the overlay menu (z-90) so the
 * monogram and the toggle (which morphs into a close button) stay reachable.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Light treatment over the hero or while the dark overlay is open.
  const light = !scrolled || open;

  const goTop = () => scrollToSection("body");

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[90] transition-all duration-500 ease-lux",
          scrolled && !open
            ? "border-b border-gold/15 bg-bone/80 backdrop-blur-md"
            : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-[var(--header-h)] max-w-[1500px] items-center justify-between px-6 md:px-12">
          {/* Monogram + wordmark */}
          <button
            onClick={goTop}
            data-cursor="link"
            className="group flex items-center gap-3"
            aria-label={`${brand.fullName} — home`}
          >
            <span
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border font-display text-lg transition-colors duration-500",
                light ? "border-bone/40 text-bone" : "border-gold/50 text-espresso",
              )}
            >
              {brand.monogram}
            </span>
            <span
              className={cn(
                "font-display text-lg tracking-wide transition-colors duration-500",
                light ? "text-bone" : "text-espresso",
              )}
            >
              {brand.name}
            </span>
          </button>

          {/* Inline links (desktop) */}
          <nav className="hidden items-center gap-9 lg:flex">
            {nav.links.slice(0, 5).map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                data-cursor="link"
                className={cn(
                  "group relative text-[0.7rem] uppercase tracking-widest2 transition-colors duration-500",
                  light ? "text-bone/80 hover:text-bone" : "text-espresso/70 hover:text-espresso",
                )}
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-lux group-hover:scale-x-100" />
              </button>
            ))}
          </nav>

          {/* CTA + menu toggle */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden sm:block">
              <MagneticButton
                onClick={() => scrollToSection(nav.cta.href)}
                className={cn(
                  "!px-7 !py-3",
                  light && "!bg-transparent !border !border-gold/60 !text-bone",
                )}
                cursorLabel="Book"
              >
                {nav.cta.label}
              </MagneticButton>
            </div>

            <Magnetic strength={0.3}>
              <button
                onClick={() => setOpen((v) => !v)}
                data-cursor="button"
                data-cursor-label={open ? "Close" : "Menu"}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="flex h-11 w-11 flex-col items-center justify-center gap-[5px]"
              >
                <span
                  className={cn(
                    "block h-px w-6 transition-all duration-500 ease-lux",
                    light ? "bg-bone" : "bg-espresso",
                    open && "translate-y-[3px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "block h-px w-6 transition-all duration-500 ease-lux",
                    light ? "bg-bone" : "bg-espresso",
                    open && "-translate-y-[3px] -rotate-45",
                  )}
                />
              </button>
            </Magnetic>
          </div>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
