# Maison Séraphine — Couture Hair Atelier

An award-tier, single-page digital flagship for a fictional elite women's hair
atelier in Beverly Hills. Built to feel like a couture fashion house's digital
wing: a procedural WebGL silk hero, GSAP-choreographed scroll, inertia smooth
scroll, a bespoke loader, a custom cursor and a pinned horizontal lookbook with
a WebGL image-transition lightbox.

> **Brand is data.** The salon name, city, services, pricing, stylists, copy and
> contact details all live in [`lib/content.ts`](./lib/content.ts). Rebrand the
> entire site by editing that one file.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Three.js** + **@react-three/fiber** with **custom GLSL shaders** (hero silk
  field, RGB-shift/displacement lightbox)
- **GSAP** + **ScrollTrigger** — the animation backbone (pins, parallax,
  scrubbed timelines, masked text reveals)
- **Lenis** — inertia smooth scroll, wired into the GSAP ticker
- **Tailwind CSS** for layout + **bespoke CSS** for signature moments
- Variable fonts via `next/font`: **Fraunces** (display) / **Manrope** (body)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm run start   # production
```

## Signature moments → where they live

| Moment | File(s) |
| --- | --- |
| Bespoke loader (monogram scribe + gold progress + curtain wipe) | `components/Loader.tsx` |
| WebGL silk hero + cursor-reactive fluid/displacement | `components/hero/HeroCanvas.tsx`, `components/hero/heroShaders.ts` |
| Per-character name reveal + gold shimmer sweep | `components/ui/AnimatedName.tsx` |
| Custom magnetic / morphing cursor with comet trail | `components/Cursor.tsx` |
| Smooth scroll (Lenis ↔ GSAP) | `components/SmoothScroll.tsx`, `lib/scroll.ts` |
| Scroll choreography (mask wipes, parallax, count-ups) | `components/ui/*`, section files |
| Pinned horizontal lookbook + kinetic type | `components/sections/Lookbook.tsx` |
| WebGL RGB-shift / displacement image transition | `components/LookbookLightbox.tsx` |
| Full-screen overlay menu (curtain) | `components/MenuOverlay.tsx` |
| Magnetic buttons / animated underlines / marquee | `components/ui/*` |

## Project structure

```
app/            # App Router entry, root layout, global CSS (design tokens)
components/
  ├─ hero/      # R3F canvas + GLSL
  ├─ sections/  # Manifesto, Services, Stylists, Lookbook, Ritual,
  │             # Testimonials, Stats, Booking, Footer
  ├─ ui/        # Reusable primitives (reveals, magnetic, count-up, tone image…)
  ├─ Site.tsx   # Experience shell (loader hand-off, scroll lock)
  ├─ Loader / Cursor / Nav / MenuOverlay / SmoothScroll / LookbookLightbox
lib/
  ├─ content.ts # ← all copy, pricing & brand data
  ├─ gsap.ts    # GSAP + ScrollTrigger registration
  ├─ hooks.ts   # reduced-motion, WebGL support, touch, iso-layout-effect
  ├─ scroll.ts  # Lenis bridge / anchor navigation
  └─ utils.ts
```

## Imagery

The site ships **self-contained**: every editorial surface (service previews,
stylist portraits, lookbook plates) is rendered as an art-directed gradient
(`components/ui/ToneImage.tsx`) evoking light on silk — zero external assets,
instant load. To use real photography, replace `<ToneImage>` with an
`<img>` / `next/image`; the layouts are identical. The lightbox texture
generator lives in `components/LookbookLightbox.tsx` (`makeToneCanvas`).

## Performance

- **Lazy WebGL**: Three.js is code-split — the hero canvas and the lightbox are
  `dynamic(..., { ssr: false })`, keeping it out of the initial bundle
  (first-load JS ≈ 156 kB).
- **GPU-friendly**: the hero render loop **pauses** (`frameloop="never"`) when
  scrolled off-screen; cursor + magnetic motion use `gsap.quickTo`.
- **Single RAF**: Lenis is advanced by the GSAP ticker (no competing loops).
- Statically prerendered (`○ Static`).

## Accessibility & graceful degradation

- **`prefers-reduced-motion`** is honoured everywhere: smooth scroll, the
  cursor, grain and all reveals disable; content renders at rest; the lookbook
  becomes a native horizontal scroll strip.
- **WebGL fallback**: if WebGL is unavailable the hero shows a rich CSS gradient
  and the lightbox uses a CSS crossfade.
- **Touch**: the custom cursor is disabled on coarse pointers.
- Keyboard support in the lightbox (Esc / ← / →), gold focus-visible rings,
  semantic landmarks and `aria-label`s, and SSR-rendered text for indexing.

---

_Maison Séraphine is a fictional brand created for this demonstration. All copy,
pricing and people are invented._
