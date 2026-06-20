import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/content";

/**
 * Display face — Fraunces. A high-contrast, "old-style" variable serif with
 * optical sizing and a SOFT/WONK personality close to Canela / Ogg. Used
 * oversized as a design element.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

/** Body face — Manrope. A refined, low-contrast neo-grotesque. */
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: `${brand.fullName} — ${brand.tagline}, ${brand.city}`,
    template: `%s · ${brand.fullName}`,
  },
  description: brand.oneLiner,
  keywords: [
    "luxury hair salon",
    "Beverly Hills colorist",
    "couture color",
    "balayage",
    "luxury extensions",
    "bridal hair",
    brand.fullName,
  ],
  openGraph: {
    title: `${brand.fullName} — ${brand.tagline}`,
    description: brand.oneLiner,
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#221610",
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
      <body>
        {children}
        {/* Film grain sits above content, below the cursor + loader. */}
        <div className="film-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
