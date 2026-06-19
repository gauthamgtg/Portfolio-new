/**
 * Maison Dorée — content layer.
 * All editorial copy and USD pricing for the atelier lives here so the
 * presentation components stay declarative. Swap `image` fields with real
 * photography URLs to drop in production assets; the UI degrades gracefully
 * to art-directed gradient panels when an image is absent.
 */

export const brand = {
  name: "Maison Dorée",
  monogram: "MD",
  tagline: "Couture hair, composed by hand.",
  city: "Madison Avenue, Manhattan",
  established: 2009,
  booking: {
    label: "Book Your Experience",
    // Point this to your Boulevard / Vagaro scheduling link
    href: "https://www.joinblvd.com/",
  },
  phone: "+1 (212) 555-0147",
  phoneHref: "tel:+12125550147",
  email: "atelier@maisondoree.com",
  address: ["741 Madison Avenue, Suite 5", "New York, NY 10065"],
  hours: [
    { day: "Tuesday – Friday", time: "10:00 – 20:00" },
    { day: "Saturday", time: "09:00 – 19:00" },
    { day: "Sunday & Monday", time: "By private appointment" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
    { label: "Journal", href: "#journal" },
  ],
};

export const nav = [
  { label: "Atelier", href: "#manifesto", index: "01" },
  { label: "Services", href: "#services", index: "02" },
  { label: "The Masters", href: "#stylists", index: "03" },
  { label: "Lookbook", href: "#lookbook", index: "04" },
  { label: "The Ritual", href: "#ritual", index: "05" },
  { label: "Contact", href: "#footer", index: "06" },
];

export const manifesto = {
  eyebrow: "The Philosophy",
  lines: [
    "We do not",
    "follow trends.",
    "We compose",
    "a woman's",
    "presence —",
    "one strand",
    "at a time.",
  ],
  body: "Maison Dorée is an atelier in the truest sense: a house of master artisans where colour is mixed by eye, every cut is drafted to the architecture of your face, and time is never rushed. Quiet rooms. Considered hands. A result so natural it reads as inheritance, not effort.",
};

export type Service = {
  index: string;
  title: string;
  blurb: string;
  detail: string;
  priceFrom: number;
  duration: string;
  tone: string; // gradient tone class seed
};

export const services: Service[] = [
  {
    index: "01",
    title: "Cut & Style",
    blurb: "Architecture for the way you actually live.",
    detail:
      "A consultation that begins with how you wake, not how you pose. Precision dry-cutting drafted to your growth patterns, density, and face — finished with a blow-out engineered to last days, not hours.",
    priceFrom: 240,
    duration: "75 min",
    tone: "from-espresso-800 to-cocoa",
  },
  {
    index: "02",
    title: "Couture Colour",
    blurb: "Bespoke tone, mixed by eye, never by formula card.",
    detail:
      "Our colourists compose dimensional, light-catching hues blended for your skin's undertone and the seasons of your year. The result is depth that photographs like fine art and grows out without a line.",
    priceFrom: 480,
    duration: "3 hrs",
    tone: "from-gold-deep to-espresso",
  },
  {
    index: "03",
    title: "Balayage & Highlights",
    blurb: "Hand-painted light, placed where the sun would find you.",
    detail:
      "Freehand luminosity painted strand by strand — soft at the root, molten at the ends. A lived-in radiance calibrated so your six-week return feels like a whim, not a necessity.",
    priceFrom: 420,
    duration: "2.5 hrs",
    tone: "from-champagne to-gold",
  },
  {
    index: "04",
    title: "Luxury Extensions",
    blurb: "Length and density, undetectable to the touch.",
    detail:
      "Ethically sourced, colour-matched extensions applied with the gentlest invisible methods. Fullness that moves like your own — installed, maintained, and removed by hands that protect what's beneath.",
    priceFrom: 1200,
    duration: "Half day",
    tone: "from-cocoa to-espresso-800",
  },
  {
    index: "05",
    title: "Bridal & Events",
    blurb: "Composed for the most photographed day of your life.",
    detail:
      "A private trial, a timeline rehearsed to the minute, and an artist who travels to you. We design hair that holds through vows, tears, and the last dance — and looks effortless in every frame.",
    priceFrom: 650,
    duration: "By design",
    tone: "from-rose to-mauve",
  },
  {
    index: "06",
    title: "Treatments & Keratin",
    blurb: "Restoration as ritual — health you can feel.",
    detail:
      "Bespoke bond-building, scalp, and smoothing therapies prescribed after a strand diagnosis. We treat hair as living material: nourished, strengthened, and left luminous from root to tip.",
    priceFrom: 180,
    duration: "60–120 min",
    tone: "from-gold-light to-champagne",
  },
];

export type Stylist = {
  name: string;
  title: string;
  specialty: string;
  bio: string;
  instagram: string;
  tone: string;
};

export const stylists: Stylist[] = [
  {
    name: "Séraphine Vaux",
    title: "Founder · Creative Director",
    specialty: "Couture Colour",
    bio: "Trained in Paris and London, Séraphine built Maison Dorée on a single belief: colour should look like it was always yours.",
    instagram: "https://instagram.com",
    tone: "from-gold-deep via-cocoa to-espresso",
  },
  {
    name: "Noemi Castellane",
    title: "Master Stylist",
    specialty: "Precision Cutting",
    bio: "A sculptor with shears. Noemi drafts every cut to the bone structure beneath, coaxing movement most stylists only promise.",
    instagram: "https://instagram.com",
    tone: "from-espresso-800 via-cocoa to-gold-brass",
  },
  {
    name: "Ines Marchetti",
    title: "Senior Colourist",
    specialty: "Balayage",
    bio: "Ines paints light. Her freehand work has lifted more than one magazine cover and a great many quiet, powerful women.",
    instagram: "https://instagram.com",
    tone: "from-champagne via-gold to-cocoa",
  },
  {
    name: "Liv Andersen",
    title: "Texture & Extension Artist",
    specialty: "Luxury Extensions",
    bio: "Liv's installations are felt by no one and noticed by everyone — density and length that move as though grown.",
    instagram: "https://instagram.com",
    tone: "from-rose via-mauve to-espresso",
  },
];

export type Look = {
  index: string;
  title: string;
  caption: string;
  tone: string;
};

export const lookbook: Look[] = [
  { index: "01", title: "Liquid Brunette", caption: "Dimensional espresso, glass finish", tone: "from-espresso via-cocoa to-espresso-800" },
  { index: "02", title: "Champagne Balayage", caption: "Hand-painted, sun-soft roots", tone: "from-champagne via-gold-light to-bone-200" },
  { index: "03", title: "Molten Copper", caption: "Couture colour, full saturation", tone: "from-gold-deep via-gold to-rose" },
  { index: "04", title: "Parisian Bob", caption: "Architectural precision cut", tone: "from-espresso-800 via-cocoa to-gold-brass" },
  { index: "05", title: "Bridal Chignon", caption: "Composed for the aisle", tone: "from-bone-200 via-champagne to-mauve" },
  { index: "06", title: "Smoke & Honey", caption: "Lived-in luminous blonde", tone: "from-gold to-cocoa" },
];

export type RitualStep = {
  index: string;
  title: string;
  copy: string;
};

export const ritual = {
  eyebrow: "The Experience",
  heading: "An afternoon, not an appointment.",
  steps: [
    {
      index: "01",
      title: "The Welcome",
      copy: "You are greeted by name and a glass of vintage champagne. Coats taken, phone silenced, the city left at the door. Your artist sits with you — no chair, no rush — to understand the woman before the hair.",
    },
    {
      index: "02",
      title: "The Diagnosis",
      copy: "A strand-by-strand reading of porosity, density, and history. We map the architecture of your face and the light you live in, then compose a plan in pencil before a single tool is lifted.",
    },
    {
      index: "03",
      title: "The Ritual",
      copy: "A warm-stone scalp ceremony and bespoke botanical cleanse in your own private suite. Twelve unhurried minutes that do as much for the mind as the hair.",
    },
    {
      index: "04",
      title: "The Reveal",
      copy: "The chair turns. In natural north light, you meet a version of yourself that feels inevitable. We dress the finish, prescribe your at-home regimen, and pre-compose your next visit.",
    },
  ] as RitualStep[],
};

export type Testimonial = {
  quote: string;
  name: string;
  context: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "I have sat in chairs in Paris, Milan, and Los Angeles. No one reads hair — and a woman — the way this house does.",
    name: "Vivienne L.",
    context: "Editor-in-Chief · Client since 2014",
  },
  {
    quote:
      "My colour grows out like it was painted by the sun. Eight weeks and still no line. I stopped looking for anyone else.",
    name: "Daniela R.",
    context: "Gallerist · Couture Colour",
  },
  {
    quote:
      "They did my hair for my wedding and it held through happy tears and a midnight dance floor. Every photograph is perfect.",
    name: "Amara K.",
    context: "Bride · Bridal & Events",
  },
  {
    quote:
      "It is the one appointment I never move. Two hours that return me to myself.",
    name: "Catherine M.",
    context: "Founder · Client since 2011",
  },
];

export type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 16, suffix: " yrs", label: "Composing couture hair" },
  { value: 9, label: "Master artisans in-house" },
  { value: 27, label: "Editorial & award honours" },
  { value: 4200, prefix: "", suffix: "+", label: "Women in our care" },
];

export const cta = {
  eyebrow: "Reservations",
  heading: "Your chair is waiting.",
  body: "Appointments are limited by design — every artist holds space for only a handful of women each day. Reserve your experience and step into the quietest kind of luxury.",
};
