/**
 * content.ts — Single source of truth for all copy, pricing and brand data.
 *
 * Rebranding the atelier is a matter of editing this file: the salon name,
 * city, palette references, services, stylists, prices and contact details
 * all flow from here into the components.
 */

export const brand = {
  name: "Séraphine",
  fullName: "Maison Séraphine",
  monogram: "S",
  tagline: "Couture Hair Atelier",
  city: "Beverly Hills",
  established: "2009",
  // The promise, distilled.
  oneLiner:
    "An atelier for women who understand that hair is the first thing the world reads.",
  email: "concierge@maisonseraphine.com",
  phone: "+1 (310) 555-0177",
  phoneHref: "tel:+13105550177",
  address: {
    line1: "9200 Camden Drive, Suite 700",
    line2: "Beverly Hills, California 90210",
  },
  // External booking platform (Boulevard / Vagaro style deep-link).
  bookingUrl: "https://dashboard.boulevard.io/booking/maison-seraphine",
  social: {
    instagram: "https://instagram.com/maisonseraphine",
    instagramHandle: "@maisonseraphine",
    pinterest: "https://pinterest.com/maisonseraphine",
    tiktok: "https://tiktok.com/@maisonseraphine",
  },
} as const;

export const nav = {
  links: [
    { label: "The Atelier", href: "#manifesto", index: "01" },
    { label: "Services", href: "#services", index: "02" },
    { label: "The Masters", href: "#stylists", index: "03" },
    { label: "Lookbook", href: "#lookbook", index: "04" },
    { label: "The Ritual", href: "#ritual", index: "05" },
    { label: "Journal", href: "#testimonials", index: "06" },
  ],
  cta: { label: "Book Your Experience", href: "#booking" },
} as const;

export const hero = {
  eyebrow: "Beverly Hills · Est. 2009",
  // The name is rendered per-character; keep it a single word for the mask reveal.
  word: "Séraphine",
  subhead:
    "Couture color and master craftsmanship, in private suites above the Boulevard.",
  scrollCue: "Begin the experience",
} as const;

export const manifesto = {
  eyebrow: "The Philosophy",
  // Rendered line-by-line with a scroll-driven mask wipe.
  lines: [
    "We do not chase trends.",
    "We compose them — strand by strand,",
    "in light, in tone, in the quiet",
    "confidence of a woman who knows",
    "exactly how she wishes to be seen.",
  ],
  body: "Maison Séraphine is not a salon. It is an atelier — a workshop of color, light and architecture, where six master stylists practise a discipline closer to couture than to hairdressing. Every appointment is a private commission. Every result, unrepeatable.",
} as const;

export interface Service {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  priceNote: string;
  details: string[];
  // Hue used for the WebGL / gradient reveal on hover.
  tone: [string, string];
}

export const services: Service[] = [
  {
    index: "01",
    title: "Couture Color",
    subtitle: "Bespoke, hand-painted dimension",
    description:
      "A colour commission composed entirely for you — read in natural light, mixed by hand, layered to move the way you move. Nothing from a chart.",
    price: "from $480",
    priceNote: "consultation included",
    details: ["Custom formulation", "Glaze & gloss finish", "90–180 min"],
    tone: ["#C2A14D", "#7A5A2E"],
  },
  {
    index: "02",
    title: "Balayage & Highlights",
    subtitle: "Sunlit, lived-in luminosity",
    description:
      "Freehand painting that mimics the way the sun would have found you — soft at the root, luminous through the ends, grown out with grace.",
    price: "from $390",
    priceNote: "per session",
    details: ["Freehand technique", "Lived-in regrowth", "Toner included"],
    tone: ["#E7CD8E", "#B08A4E"],
  },
  {
    index: "03",
    title: "Cut & Style",
    subtitle: "Architecture for the individual",
    description:
      "A cut drafted to your bones, your hair's nature and the life you lead — precision engineering that looks effortless on the seventh day.",
    price: "from $185",
    priceNote: "with master stylist",
    details: ["Dry-cut precision", "Bespoke styling", "60–90 min"],
    tone: ["#C8A8A0", "#6E4A40"],
  },
  {
    index: "04",
    title: "Luxury Extensions",
    subtitle: "Length, density, undetectable",
    description:
      "Ethically sourced, hand-matched lengths applied strand-by-strand and colour-blended into your own — weightless, seamless, entirely yours.",
    price: "from $1,200",
    priceNote: "incl. hair & fitting",
    details: ["Hand-tied & tape methods", "Colour-matched", "Half-day commission"],
    tone: ["#9C8791", "#3A2A30"],
  },
  {
    index: "05",
    title: "Bridal & Events",
    subtitle: "The most photographed day",
    description:
      "A private rehearsal followed by day-of artistry, on location or in-suite — engineered to last from first light to the final dance.",
    price: "from $650",
    priceNote: "trial + event day",
    details: ["In-suite or on-location", "Trial appointment", "Touch-up kit"],
    tone: ["#E8D4B8", "#A07E4E"],
  },
  {
    index: "06",
    title: "Treatments & Keratin",
    subtitle: "Repair, gloss, longevity",
    description:
      "Restorative rituals and smoothing therapies that rebuild the hair from the cortex out — leaving a mirror finish that lasts for months.",
    price: "from $220",
    priceNote: "per treatment",
    details: ["Bond-building therapy", "Smoothing keratin", "Scalp ritual"],
    tone: ["#BFA15F", "#4A352A"],
  },
];

export interface Stylist {
  name: string;
  role: string;
  specialty: string;
  bio: string;
  instagram: string;
  tone: [string, string];
}

export const stylists: Stylist[] = [
  {
    name: "Séraphine Aubert",
    role: "Founder · Creative Director",
    specialty: "Couture Color",
    bio: "Trained in Paris and Milan, Séraphine founded the maison to practise colour as a fine art. Her clients fly in for a single appointment.",
    instagram: "@seraphine.aubert",
    tone: ["#C2A14D", "#2A1C12"],
  },
  {
    name: "Mara Delacroix",
    role: "Master Colorist",
    specialty: "Balayage & Dimension",
    bio: "A freehand virtuoso whose sunlit balayage has defined the look of a generation of editorial covers and red carpets.",
    instagram: "@mara.delacroix",
    tone: ["#E7CD8E", "#3A2A18"],
  },
  {
    name: "Iris Voss",
    role: "Director of Cutting",
    specialty: "Precision & Architecture",
    bio: "Iris drafts each cut like an architect — structure first, softness second. Her bobs have their own waiting list.",
    instagram: "@iris.voss",
    tone: ["#C8A8A0", "#3A2630"],
  },
  {
    name: "Noor Hassan",
    role: "Texture & Extension Artist",
    specialty: "Luxury Extensions",
    bio: "An authority on density and movement, Noor builds undetectable length that behaves exactly like the hair it joins.",
    instagram: "@noor.atelier",
    tone: ["#9C8791", "#241A20"],
  },
];

export interface Look {
  index: string;
  title: string;
  subtitle: string;
  caption: string;
  tone: [string, string];
}

export const lookbook: Look[] = [
  {
    index: "01",
    title: "Liquid Bronze",
    subtitle: "Couture Color",
    caption: "A molten, hand-painted brunette that catches light like poured metal.",
    tone: ["#7A5A2E", "#1E140C"],
  },
  {
    index: "02",
    title: "Champagne Veil",
    subtitle: "Balayage",
    caption: "Cool-warm blonde, soft at the root, dissolving into candlelight.",
    tone: ["#E8D4B8", "#9A7A48"],
  },
  {
    index: "03",
    title: "Noir Velvet",
    subtitle: "Gloss & Cut",
    caption: "A glass-finish raven with a precision blunt line. Pure architecture.",
    tone: ["#2A2024", "#0C0808"],
  },
  {
    index: "04",
    title: "Rosewood",
    subtitle: "Dimensional Color",
    caption: "Dusty rose woven through cocoa — quiet, knowing, unmistakably couture.",
    tone: ["#C8A8A0", "#5A3A38"],
  },
  {
    index: "05",
    title: "Gilded Wave",
    subtitle: "Extensions & Styling",
    caption: "Floor-skimming movement, colour-blended to vanish into the source.",
    tone: ["#BFA15F", "#3A2A14"],
  },
];

export interface RitualStep {
  index: string;
  time: string;
  title: string;
  description: string;
}

export const ritual = {
  eyebrow: "The Experience",
  heading: "An afternoon, not an appointment",
  steps: [
    {
      index: "01",
      time: "On arrival",
      title: "The Welcome",
      description:
        "A glass of vintage champagne, a private consultation in natural light, and a colour brief composed for you alone.",
    },
    {
      index: "02",
      time: "The ritual",
      title: "The Scalp Ceremony",
      description:
        "A fifteen-minute pressure-point ritual with warm botanical oils — the nervous system exhales before a single strand is touched.",
    },
    {
      index: "03",
      time: "The work",
      title: "The Private Suite",
      description:
        "Your own light-filled suite, your master stylist, no rushing and no audience. Time, in this house, is never the constraint.",
    },
    {
      index: "04",
      time: "The reveal",
      title: "The Unveiling",
      description:
        "A styled finish, a take-home regimen prescribed to your hair, and a standing appointment held in your name.",
    },
  ] as RitualStep[],
} as const;

export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "I have sat in chairs in Paris, London and New York. No one reads colour in light the way Séraphine does. I will not go anywhere else.",
    name: "Eleanor V.",
    detail: "Client since 2014",
  },
  {
    quote:
      "It is the only three hours of my month that belong entirely to me. I leave looking like the most rested version of myself.",
    name: "Priya M.",
    detail: "Couture Color · Beverly Hills",
  },
  {
    quote:
      "The extensions are undetectable. My own mother could not find the join. That is the whole point, and they nailed it.",
    name: "Daniela R.",
    detail: "Luxury Extensions",
  },
  {
    quote:
      "They did my wedding hair after a single trial and it survived a beach, a downpour and a ten-hour party. Flawless.",
    name: "Charlotte B.",
    detail: "Bridal & Events",
  },
];

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 16, suffix: "+", label: "Years as an atelier" },
  { value: 6, suffix: "", label: "Master stylists" },
  { value: 11, suffix: "", label: "Industry awards" },
  { value: 4200, suffix: "+", label: "Commissions a year" },
];

export const booking = {
  eyebrow: "Reservations",
  heading: "Your chair is waiting",
  body: "New commissions are accepted by appointment only. Reserve a private consultation and let us compose something that is unmistakably yours.",
  cta: "Book Your Experience",
  secondary: "Or call the concierge",
} as const;

export const footer = {
  hours: [
    { day: "Tuesday – Friday", time: "9:00 — 19:00" },
    { day: "Saturday", time: "9:00 — 17:00" },
    { day: "Sunday – Monday", time: "By private appointment" },
  ],
  newsletter: {
    heading: "The Maison Letter",
    body: "Seasonal colour notes, chair openings and private events. Quarterly, never more.",
    placeholder: "Your email address",
    cta: "Subscribe",
  },
  legal: `© ${new Date().getFullYear()} Maison Séraphine. All rights reserved.`,
} as const;
