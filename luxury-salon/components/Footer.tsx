"use client";

import { useRef } from "react";

const socials = [
  { name: "Instagram", href: "#", icon: "IG" },
  { name: "Twitter / X", href: "#", icon: "TW" },
  { name: "Facebook", href: "#", icon: "FB" },
];

const links = {
  "The House": [
    { label: "Our Story", href: "#manifesto" },
    { label: "The Barbers", href: "#barbers" },
    { label: "The Ritual", href: "#ritual" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  "Services": [
    { label: "Signature Cut", href: "#services" },
    { label: "Hot-Towel Shave", href: "#services" },
    { label: "Beard Sculpting", href: "#services" },
    { label: "Hair Treatment", href: "#services" },
    { label: "Event Grooming", href: "#services" },
  ],
  "Members": [
    { label: "The Club", href: "#membership" },
    { label: "Book Online", href: "#booking" },
    { label: "Gift Cards", href: "#" },
    { label: "Grooming Products", href: "#" },
  ],
};

export default function Footer() {
  const emailRef = useRef<HTMLInputElement>(null);

  return (
    <footer
      className="relative pt-24 overflow-hidden"
      style={{ backgroundColor: "var(--charcoal-mid)", borderTop: "1px solid rgba(184,149,42,0.15)" }}
    >
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <svg width="40" height="40" viewBox="0 0 120 120" fill="none">
                <path d="M60 8 A52 52 0 1 1 59.99 8 Z" stroke="rgba(184,149,42,0.4)" strokeWidth="1" fill="none" />
                <path d="M38 40 C38 28 48 22 60 22 C72 22 82 28 82 40 L82 80 C82 92 72 98 60 98 C48 98 38 92 38 80 Z" stroke="rgba(184,149,42,0.9)" strokeWidth="2" fill="none" />
                <path d="M48 42 C48 34 53 30 60 30 C67 30 72 34 72 42 L72 78 C72 86 67 90 60 90 C53 90 48 86 48 78 Z" stroke="rgba(184,149,42,0.5)" strokeWidth="1" fill="none" />
              </svg>
              <div>
                <p
                  className="font-bold tracking-widest uppercase"
                  style={{ color: "var(--cream)", letterSpacing: "0.25em", fontFamily: "var(--font-display)", fontSize: "1.1rem" }}
                >
                  OBSIDIAN
                </p>
                <p className="label-text" style={{ color: "rgba(184,149,42,0.5)", fontSize: "0.5rem" }}>
                  ELITE MEN'S GROOMING HOUSE
                </p>
              </div>
            </div>

            <p
              className="mb-8 leading-relaxed max-w-xs"
              style={{
                color: "rgba(245,240,232,0.4)",
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "0.9rem",
                lineHeight: "1.8",
              }}
            >
              New York's most deliberate grooming house. Where precision is the standard, not the exception.
            </p>

            {/* Address */}
            <div className="mb-8">
              <p className="label-text mb-2" style={{ color: "rgba(184,149,42,0.5)" }}>
                FIND US
              </p>
              <p className="text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>
                142 West 57th Street
              </p>
              <p className="text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>
                Manhattan, New York 10019
              </p>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="group w-9 h-9 flex items-center justify-center border transition-colors duration-300"
                  style={{ borderColor: "rgba(184,149,42,0.2)" }}
                  aria-label={s.name}
                >
                  <span
                    className="label-text transition-colors duration-300 group-hover:text-brass"
                    style={{ color: "rgba(184,149,42,0.4)", fontSize: "0.45rem" }}
                  >
                    {s.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="label-text mb-6" style={{ color: "var(--brass)" }}>
                {category.toUpperCase()}
              </p>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm nav-link transition-colors duration-300 hover:text-brass"
                      style={{ color: "rgba(245,240,232,0.4)", fontFamily: "var(--font-body)", fontSize: "0.85rem" }}
                      onClick={(e) => {
                        if (item.href.startsWith("#")) {
                          e.preventDefault();
                          document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="py-12 border-y mb-12"
          style={{ borderColor: "rgba(184,149,42,0.1)" }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="label-text mb-2" style={{ color: "var(--brass)" }}>
                THE DISPATCH
              </p>
              <p
                className="text-sm leading-relaxed max-w-xs"
                style={{ color: "rgba(245,240,232,0.4)", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.85rem" }}
              >
                Seasonal grooming intelligence. Appointment windows. Rare products. Sent infrequently, always worth reading.
              </p>
            </div>

            <div className="flex items-stretch w-full md:w-auto max-w-sm gap-0">
              <input
                ref={emailRef}
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-4 py-3 text-sm outline-none border-y border-l"
                style={{
                  borderColor: "rgba(184,149,42,0.3)",
                  color: "var(--cream)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  caretColor: "var(--brass)",
                }}
              />
              <button
                className="magnetic-btn group relative px-6 py-3 overflow-hidden border"
                style={{
                  borderColor: "rgba(184,149,42,0.3)",
                  backgroundColor: "transparent",
                }}
                onClick={() => {
                  const email = emailRef.current?.value;
                  if (email) {
                    if (emailRef.current) emailRef.current.value = "✓ Subscribed";
                  }
                }}
              >
                <span
                  className="relative z-10 label-text transition-colors duration-400 group-hover:text-obsidian"
                  style={{ color: "var(--brass)" }}
                >
                  JOIN
                </span>
                <span
                  className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ backgroundColor: "var(--brass)" }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div
          className="w-full h-48 mb-12 relative overflow-hidden"
          style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(184,149,42,0.1)" }}
        >
          {/* Dark stylized map representation */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #0a0a0a 0%, #111008 100%)",
            }}
          />
          {/* Grid lines simulating map */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(184,149,42,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(184,149,42,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Location marker */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "var(--brass)" }}
              />
              <div className="w-px h-6" style={{ backgroundColor: "var(--brass)", opacity: 0.6 }} />
              <p className="label-text" style={{ color: "rgba(184,149,42,0.7)" }}>
                142 W 57TH · MANHATTAN
              </p>
            </div>
          </div>
          {/* Street names */}
          <p className="absolute bottom-3 right-4 label-text" style={{ color: "rgba(184,149,42,0.2)", fontSize: "0.4rem" }}>
            WEST 57TH STREET · MIDTOWN MANHATTAN
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="py-6 border-t"
        style={{ borderColor: "rgba(184,149,42,0.1)" }}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="label-text" style={{ color: "rgba(245,240,232,0.2)", fontSize: "0.5rem" }}>
            © {new Date().getFullYear()} OBSIDIAN GROOMING HOUSE LLC · ALL RIGHTS RESERVED
          </p>

          <div className="flex items-center gap-1">
            <div className="w-4 h-px" style={{ backgroundColor: "rgba(184,149,42,0.3)" }} />
            <p className="label-text" style={{ color: "rgba(184,149,42,0.3)", fontSize: "0.5rem", letterSpacing: "0.2em" }}>
              CRAFTED WITH OBSESSION
            </p>
            <div className="w-4 h-px" style={{ backgroundColor: "rgba(184,149,42,0.3)" }} />
          </div>

          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms", "Accessibility"].map((item) => (
              <a
                key={item}
                href="#"
                className="label-text hover:text-brass transition-colors duration-300"
                style={{ color: "rgba(245,240,232,0.2)", fontSize: "0.5rem" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
