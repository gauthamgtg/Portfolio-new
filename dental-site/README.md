# Lumière Dental Studio — Website

A premium, conversion-focused marketing website for a luxury dental practice.
Hand-built with **zero build step** — pure HTML, modern CSS, and vanilla JS — so
it runs instantly anywhere and loads in milliseconds.

## ✨ Highlights

- **Editorial luxury design** — Fraunces serif display + Inter, a calming
  teal/gold/cream palette, and generous whitespace.
- **Fully responsive** — fluid layouts from 320px phones to ultrawide desktops,
  with a dedicated mobile menu and floating "Book" button.
- **Delightful motion** — scroll-reveal animations, animated count-up stats,
  marquee trust bar, hover micro-interactions, and a subtle hero parallax.
- **Accessible & fast** — semantic HTML, ARIA labels, keyboard-friendly,
  `prefers-reduced-motion` support, lazy-loaded imagery.
- **SEO-ready** — meta + Open Graph tags and `Dentist` JSON-LD structured data
  for rich search results.
- **Working booking form** with inline validation and a success state (wire the
  submit handler in `js/main.js` to your CRM / endpoint).

## 🗂 Structure

```
dental-site/
├── index.html        # All sections / content
├── css/styles.css    # Design system + responsive styles
├── js/main.js        # Loader, reveal, count-up, menu, form
└── assets/           # (place local images here if replacing Unsplash)
```

## ▶️ Run it

It's static — just open `index.html`, or serve the folder:

```bash
cd dental-site
python3 -m http.server 8000   # then visit http://localhost:8000
```

## 🎨 Customizing

- **Colors / spacing / radius** — edit the CSS variables in `:root`
  (`css/styles.css`).
- **Content** — all copy lives in `index.html`. Replace practice name, address,
  phone, doctors, services, and reviews.
- **Images** — currently hot-linked from Unsplash for instant preview. Swap the
  `src` URLs for your own photos (drop them in `assets/` and reference locally).
- **Booking** — connect the form's submit handler in `js/main.js` to your
  scheduling provider (e.g. NexHealth, LocalMed) or an email/API endpoint.

## Sections

Announcement bar · Sticky header · Hero · Trust marquee · Stats · Services ·
About · Technology · Doctors · Reviews · Booking form · Footer.
