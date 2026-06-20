"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import { brand, nav } from "@/lib/content";
import { scrollToSection, startScroll, stopScroll } from "@/lib/scroll";

/**
 * MenuOverlay — full-screen navigation.
 * An espresso curtain wipes down (clip-path), oversized links rise on a
 * stagger, and a contact column fades in. Closing reverses the choreography.
 * Scroll is locked while open.
 */
export default function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const links = el.querySelectorAll<HTMLElement>(".mo-link-inner");
      const side = el.querySelectorAll<HTMLElement>(".mo-fade");

      if (reduced) {
        tl.current = gsap
          .timeline({ paused: true })
          .set(el, { autoAlpha: 1 })
          .set([links, side], { autoAlpha: 1, yPercent: 0 });
        return;
      }

      gsap.set(el, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(links, { yPercent: 120 });
      gsap.set(side, { autoAlpha: 0, y: 20 });

      tl.current = gsap
        .timeline({ paused: true })
        .set(el, { pointerEvents: "auto" })
        .to(el, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "expo.inOut" })
        .to(
          links,
          { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.07 },
          "-=0.45",
        )
        .to(side, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.08 }, "-=0.7");
    }, el);

    return () => ctx.revert();
  }, []);

  useIsoLayoutEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (open) {
      stopScroll();
      t.play();
    } else {
      t.reverse();
      startScroll();
    }
  }, [open]);

  const go = (href: string) => {
    onClose();
    // Let the curtain start closing before we glide to the section.
    setTimeout(() => scrollToSection(href), 250);
  };

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[80] flex flex-col bg-ink text-bone [clip-path:inset(0_0_100%_0)]"
      style={{ pointerEvents: open ? "auto" : "none" }}
    >
      <div className="light-bloom pointer-events-none absolute inset-0 opacity-50" />

      <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col px-6 pb-12 pt-32 md:px-12 lg:flex-row lg:items-center lg:gap-24">
        {/* Primary links */}
        <nav className="flex-1">
          <ul>
            {nav.links.map((link) => (
              <li key={link.href} className="overflow-hidden">
                <button
                  onClick={() => go(link.href)}
                  data-cursor="link"
                  className="mo-link group flex w-full items-baseline gap-5 py-1 text-left"
                >
                  <span className="mo-link-inner flex w-full items-baseline gap-5">
                    <span className="font-body text-xs text-gold/70">{link.index}</span>
                    <span className="font-display text-[clamp(2.6rem,8vw,6.5rem)] font-light leading-[0.95] tracking-tight text-bone/90 transition-all duration-500 ease-lux group-hover:translate-x-4 group-hover:text-gold">
                      {link.label}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact column */}
        <div className="mt-14 w-full max-w-xs lg:mt-0">
          <div className="mo-fade">
            <p className="text-[0.6rem] uppercase tracking-widest2 text-bone/45">
              Reservations
            </p>
            <a
              href={brand.phoneHref}
              data-cursor="link"
              className="mt-3 block font-display text-2xl text-bone/90 transition-colors hover:text-gold"
            >
              {brand.phone}
            </a>
            <a
              href={`mailto:${brand.email}`}
              data-cursor="link"
              className="mt-1 block text-sm text-bone/60 transition-colors hover:text-gold"
            >
              {brand.email}
            </a>
          </div>

          <div className="mo-fade mt-10">
            <p className="text-[0.6rem] uppercase tracking-widest2 text-bone/45">
              The Atelier
            </p>
            <p className="mt-3 text-sm leading-relaxed text-bone/60">
              {brand.address.line1}
              <br />
              {brand.address.line2}
            </p>
          </div>

          <div className="mo-fade mt-10 flex gap-6 text-[0.65rem] uppercase tracking-widest2 text-bone/55">
            <a href={brand.social.instagram} data-cursor="link" className="hover:text-gold">
              Instagram
            </a>
            <a href={brand.social.pinterest} data-cursor="link" className="hover:text-gold">
              Pinterest
            </a>
            <a href={brand.social.tiktok} data-cursor="link" className="hover:text-gold">
              TikTok
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
