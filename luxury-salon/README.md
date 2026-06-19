# Maison Dorée — Couture Hair Atelier

An award-tier, single-page flagship experience for a fictional elite women's
hair atelier on Madison Avenue. Built to the craft standard of Awwwards Site of
the Day: cinematic WebGL, scroll choreography, and quiet-opulence art direction.

This is a **self-contained Next.js project** that lives alongside the existing
portfolio in this repository — it has its own dependencies and build.

## Stack

| Concern            | Tool                                          |
| ------------------ | --------------------------------------------- |
| Framework          | Next.js 14 (App Router) + TypeScript          |
| WebGL              | Three.js via React Three Fiber + custom GLSL  |
| Animation backbone | GSAP + ScrollTrigger (timeline choreography)  |
| Smooth scroll      | Lenis (inertia), wired into the GSAP ticker   |
| Styling            | Tailwind CSS + bespoke CSS for signature moments |
| Type               | Fraunces (display serif) + Manrope (grotesk)  |

## Signature moments

- **Bespoke loader** — the `MD` monogram draws itself in via SVG path animation
  over a gold progress line, then lifts to hand off into the hero.
- **WebGL hero** — a fullscreen domain-warped "flowing silk / hair" fragment
  shader in the house palette that reacts to the cursor. The salon name reveals
  with a per-character mask animation and a gold shimmer sweep.
- **Custom cursor** — a magnetic gold dot + lerping ring that morphs into a
  labelled `VIEW / DRAG` disc over interactive elements.
- **Pinned horizontal lookbook** — the page pins while the lookbook scrolls
  sideways, with parallax numerals and a lightbox.
- **Scroll choreography** — line-by-line type masks, scrubbed manifesto,
  scroll-driven Ritual narrative, animated count-ups, magnetic CTAs.
- **Film grain, vignette, gold hairlines** throughout.

## Accessibility & resilience

- **`prefers-reduced-motion`** is fully respected: Lenis, the WebGL hero, the
  cursor, and every GSAP timeline disable themselves and render static content.
- **WebGL fallback** — if the GPU/context is unavailable, the hero degrades to
  an art-directed CSS gradient scene (`lib/webgl.ts`).
- The custom cursor is disabled on touch / coarse-pointer devices.
- Semantic landmarks, `aria-label`s on split-text, and keyboard-reachable nav.

## Getting started

```bash
cd luxury-salon
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Project structure

```
luxury-salon/
├─ app/
│  ├─ layout.tsx         # fonts + metadata
│  ├─ page.tsx           # loader hand-off + section orchestration
│  └─ globals.css        # bespoke CSS layer (grain, cursor, gold, type)
├─ components/
│  ├─ SmoothScroll.tsx   # Lenis ↔ GSAP ticker
│  ├─ Cursor.tsx         # magnetic morphing cursor
│  ├─ Loader.tsx         # SVG monogram intro
│  ├─ Hero.tsx           # title reveal + lazy WebGL mount
│  ├─ HeroCanvas.tsx     # R3F fullscreen shader plane
│  ├─ Navbar.tsx / OverlayMenu.tsx
│  ├─ Manifesto / Services / Stylists / Lookbook /
│  │  Ritual / Testimonials / Stats / BookingCTA / Footer
│  └─ ui/                # SplitReveal, MagneticButton, CountUp
└─ lib/
   ├─ data.ts            # all editorial copy + USD pricing
   ├─ gsap.ts            # single ScrollTrigger registration
   ├─ hooks.ts           # reduced-motion / touch / mounted
   ├─ webgl.ts           # capability probe
   └─ shaders/heroFlow.ts# commented GLSL vertex + fragment
```

## Production notes

- Drop real photography into the `tone` gradient panels (Services, Stylists,
  Lookbook, Ritual) to upgrade from the art-directed placeholders — the markup
  is already structured for `next/image`.
- Point `brand.booking.href` in `lib/data.ts` at your Boulevard / Vagaro link,
  and update address, hours, phone, and socials in the same file.
