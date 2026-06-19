"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const navLinks = [
  { label: "The House", href: "#manifesto" },
  { label: "Services", href: "#services" },
  { label: "Masters", href: "#barbers" },
  { label: "Lookbook", href: "#lookbook" },
  { label: "The Club", href: "#membership" },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const menuLinks = menuLinksRef.current;
    if (!overlay || !menuLinks) return;

    if (menuOpen) {
      gsap.set(overlay, { display: "flex" });
      gsap.to(overlay, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.8,
        ease: "power3.inOut",
      });
      gsap.fromTo(
        menuLinks.querySelectorAll(".menu-link-item"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    } else {
      gsap.to(overlay, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.7,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
        },
      });
    }
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[9000] flex items-center justify-between px-8 md:px-16 py-6 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(184,149,42,0.1)" : "none",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <svg width="32" height="32" viewBox="0 0 120 120" fill="none">
            <path
              d="M60 8 A52 52 0 1 1 59.99 8 Z"
              stroke="rgba(184,149,42,0.5)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M38 40 C38 28 48 22 60 22 C72 22 82 28 82 40 L82 80 C82 92 72 98 60 98 C48 98 38 92 38 80 Z"
              stroke="rgba(184,149,42,0.9)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M48 42 C48 34 53 30 60 30 C67 30 72 34 72 42 L72 78 C72 86 67 90 60 90 C53 90 48 86 48 78 Z"
              stroke="rgba(184,149,42,0.6)"
              strokeWidth="1"
              fill="none"
            />
          </svg>
          <div>
            <span
              className="block text-sm font-bold tracking-widest uppercase"
              style={{ color: "var(--cream)", letterSpacing: "0.2em", fontFamily: "var(--font-display)" }}
            >
              OBSIDIAN
            </span>
            <span className="label-text block" style={{ color: "rgba(184,149,42,0.6)", fontSize: "0.5rem" }}>
              MANHATTAN · EST. 2009
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link label-text"
              style={{ color: "rgba(245,240,232,0.7)" }}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-6">
          <a
            href="#booking"
            className="hidden md:flex magnetic-btn relative items-center gap-2 px-6 py-2.5 border group overflow-hidden"
            style={{ borderColor: "var(--brass)", color: "var(--obsidian)" }}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#booking");
            }}
          >
            <span
              className="relative z-10 label-text transition-colors duration-300 group-hover:text-obsidian"
              style={{ color: "var(--brass)" }}
            >
              Book Your Chair
            </span>
            <span
              className="absolute inset-0 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100"
              style={{ backgroundColor: "var(--brass)" }}
            />
            <span
              className="relative z-10 label-text text-obsidian opacity-0 absolute group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: "var(--obsidian)" }}
            />
          </a>

          {/* Hamburger */}
          <button
            className="flex flex-col gap-1.5 w-8 cursor-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block h-px w-8 transition-all duration-400"
              style={{
                backgroundColor: "var(--brass)",
                transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
              }}
            />
            <span
              className="block h-px transition-all duration-400"
              style={{
                backgroundColor: "var(--brass)",
                width: menuOpen ? "2rem" : "1.5rem",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-px w-8 transition-all duration-400"
              style={{
                backgroundColor: "var(--brass)",
                transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Full-screen menu overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[8999] flex-col items-start justify-center px-16 md:px-24"
        style={{
          backgroundColor: "var(--obsidian)",
          clipPath: "inset(0 0 100% 0)",
          display: "none",
        }}
      >
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-px h-full opacity-10" style={{ background: "var(--brass)" }} />
        <div className="absolute bottom-0 left-0 w-full h-px opacity-10" style={{ background: "linear-gradient(90deg, var(--brass), transparent)" }} />

        <div ref={menuLinksRef} className="flex flex-col gap-2 mb-20">
          {navLinks.map((link, i) => (
            <div key={link.href} className="overflow-hidden">
              <a
                href={link.href}
                className="menu-link-item flex items-baseline gap-6 group py-2 block"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                <span
                  className="label-text opacity-40"
                  style={{ color: "var(--brass)", fontSize: "0.55rem" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="display-text text-5xl md:text-7xl transition-colors duration-300"
                  style={{
                    color: "var(--cream)",
                    fontFamily: "var(--font-display)",
                    lineHeight: "1.1",
                  }}
                >
                  {link.label}
                </span>
              </a>
            </div>
          ))}
        </div>

        <div className="absolute bottom-12 left-16 md:left-24 flex items-center gap-12">
          <div>
            <p className="label-text mb-1" style={{ color: "rgba(184,149,42,0.5)" }}>Location</p>
            <p className="text-sm" style={{ color: "var(--cream)" }}>142 West 57th Street, Manhattan</p>
          </div>
          <div>
            <p className="label-text mb-1" style={{ color: "rgba(184,149,42,0.5)" }}>Hours</p>
            <p className="text-sm" style={{ color: "var(--cream)" }}>Mon–Sat 9–8, Sun 10–6</p>
          </div>
          <div>
            <p className="label-text mb-1" style={{ color: "rgba(184,149,42,0.5)" }}>Phone</p>
            <p className="text-sm" style={{ color: "var(--cream)" }}>+1 (212) 555-0142</p>
          </div>
        </div>
      </div>
    </>
  );
}
