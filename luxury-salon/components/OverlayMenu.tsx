"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { brand, nav } from "@/lib/data";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Full-screen overlay menu. Opens with a gold-curtain wipe and staggers the
 * large serif links up from behind a mask. Locks body scroll while open.
 */
export default function OverlayMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = root.current!.querySelectorAll(".menu-item-inner");
      const meta = root.current!.querySelectorAll(".menu-meta");

      tl.current = gsap
        .timeline({ paused: true })
        .set(root.current, { display: "flex" })
        .fromTo(
          root.current,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "expo.inOut" }
        )
        .fromTo(
          items,
          { yPercent: 120 },
          { yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.07 },
          "-=0.35"
        )
        .fromTo(
          meta,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.5"
        );
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (reduced) {
      if (root.current) root.current.style.display = open ? "flex" : "none";
    } else if (tl.current) {
      if (open) tl.current.play();
      else tl.current.reverse();
    }
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, reduced]);

  const handleNav = (href: string) => {
    onClose();
    // Allow the close animation to begin, then scroll.
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 320);
  };

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[130] hidden flex-col bg-espresso-soft"
      style={{ display: "none" }}
    >
      <div className="vignette pointer-events-none absolute inset-0 opacity-60" />

      {/* Top bar */}
      <div className="relative flex items-center justify-between px-6 py-7 md:px-10">
        <span className="font-serif text-lg text-bone">{brand.name}</span>
        <button
          type="button"
          onClick={onClose}
          data-cursor="hover"
          data-cursor-label="Close"
          aria-label="Close menu"
          className="group relative h-10 w-10"
        >
          <span className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-bone transition-colors group-hover:bg-gold-light" />
          <span className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-bone transition-colors group-hover:bg-gold-light" />
        </button>
      </div>

      {/* Links */}
      <nav className="relative flex flex-1 flex-col justify-center gap-1 px-6 md:px-16">
        {nav.map((item) => (
          <div key={item.href} className="mask-line">
            <button
              type="button"
              onClick={() => handleNav(item.href)}
              data-cursor="hover"
              className="menu-item-inner group flex w-full items-baseline gap-5 py-1 text-left"
            >
              <span className="font-sans text-xs text-gold/60">{item.index}</span>
              <span className="font-serif text-[clamp(2.5rem,9vw,7rem)] font-light leading-[0.95] text-bone transition-colors duration-500 group-hover:text-gold-light">
                {item.label}
              </span>
            </button>
          </div>
        ))}
      </nav>

      {/* Footer meta */}
      <div className="relative grid gap-6 border-t border-gold/15 px-6 py-8 md:grid-cols-3 md:px-16">
        <div className="menu-meta">
          <p className="eyebrow mb-2 text-gold/60">Visit</p>
          {brand.address.map((l) => (
            <p key={l} className="text-sm text-bone/70">
              {l}
            </p>
          ))}
        </div>
        <div className="menu-meta">
          <p className="eyebrow mb-2 text-gold/60">Reserve</p>
          <a href={brand.phoneHref} className="link-underline text-sm text-bone/70">
            {brand.phone}
          </a>
          <br />
          <a href={`mailto:${brand.email}`} className="link-underline text-sm text-bone/70">
            {brand.email}
          </a>
        </div>
        <div className="menu-meta">
          <p className="eyebrow mb-2 text-gold/60">Follow</p>
          <div className="flex gap-4">
            {brand.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                data-cursor="hover"
                className="link-underline text-sm text-bone/70"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
