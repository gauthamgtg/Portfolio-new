import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maison Atelier | Brooklyn Hair Studio",
  description:
    "Brooklyn's most considered hair studio. Precision cuts, artisan color, and bespoke styling for the design-conscious.",
  keywords: [
    "hair salon",
    "Brooklyn",
    "balayage",
    "color",
    "haircut",
    "luxury salon",
    "bridal hair",
  ],
  openGraph: {
    title: "Maison Atelier | Brooklyn Hair Studio",
    description: "Art applied to hair. Book your appointment.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="font-dm antialiased">{children}</body>
    </html>
  );
}
