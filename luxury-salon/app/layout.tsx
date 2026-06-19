import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/data";

// Dramatic high-contrast display serif (Fraunces / Canela / Ogg energy).
// Loaded as a true variable font (no fixed weights) so weight + optical-size
// can be animated/tuned via CSS `font-variation-settings`.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

// Refined neo-grotesque for body
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maisondoree.com"),
  title: {
    default: `${brand.name} — Couture Hair Atelier · ${brand.city}`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Maison Dorée is an elite women's hair atelier on Madison Avenue. Couture colour, master stylists, private suites — the quietest kind of luxury.",
  keywords: [
    "luxury hair salon",
    "couture hair color",
    "balayage Manhattan",
    "bridal hair NYC",
    "master stylist",
    "hair atelier",
  ],
  openGraph: {
    title: `${brand.name} — Couture Hair Atelier`,
    description:
      "Couture colour, master stylists, private suites. An elite women's hair atelier on Madison Avenue.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#1A1410",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
