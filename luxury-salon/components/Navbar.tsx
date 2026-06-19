"use client";

import { useEffect, useState } from "react";
import { brand, nav } from "@/lib/data";
import MagneticButton from "./ui/MagneticButton";
import OverlayMenu from "./OverlayMenu";

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[120] transition-all duration-700 ease-luxe ${
          solid
            ? "bg-espresso/80 py-4 backdrop-blur-md"
            : "bg-transparent py-7"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1600px] items-center justify-between px-6 transition-opacity duration-300 md:px-10 ${
            solid ? "border-b-0" : ""
          }`}
        >
          {/* Monogram */}
          <a
            href="#hero"
            data-cursor="hover"
            className="group flex items-center gap-3"
            aria-label={`${brand.name} home`}
          >
            <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 font-serif text-sm text-gold-light transition-colors duration-500 group-hover:border-gold-light">
              {brand.monogram}
            </span>
            <span className="hidden font-serif text-lg tracking-tight text-bone sm:block">
              {brand.name}
            </span>
          </a>

          {/* Center links (desktop) */}
          <nav className="hidden items-center gap-9 lg:flex">
            {nav.slice(0, 5).map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-cursor="hover"
                className="link-underline font-sans text-[0.8rem] uppercase tracking-luxe text-bone/70 transition-colors hover:text-bone"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA + menu */}
          <div className="flex items-center gap-4">
            <MagneticButton
              href={brand.booking.href}
              cursorLabel="Book"
              className="btn-gold hidden rounded-full px-6 py-3 font-sans text-[0.75rem] font-semibold uppercase tracking-luxe text-espresso md:inline-block"
            >
              {brand.booking.label}
            </MagneticButton>

            <button
              type="button"
              onClick={() => setOpen(true)}
              data-cursor="hover"
              data-cursor-label="Menu"
              aria-label="Open menu"
              className="group flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
            >
              <span className="h-px w-6 bg-bone transition-all duration-500 group-hover:w-7 group-hover:bg-gold-light" />
              <span className="h-px w-6 bg-bone transition-all duration-500 group-hover:w-4 group-hover:bg-gold-light" />
            </button>
          </div>
        </div>
      </header>

      <OverlayMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
