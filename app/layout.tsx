import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gauthamgtg.vercel.app"),
  title: "Gautham M — Data Analyst",
  description:
    "Data Analyst with 5.5+ years across SaaS, Quick Commerce & Fintech. Turning messy data into decisions that move revenue, retention, and efficiency.",
  keywords: [
    "Data Analyst",
    "Gautham M",
    "SQL",
    "Python",
    "Tableau",
    "Product Analytics",
    "Portfolio",
  ],
  authors: [{ name: "Gautham M" }],
  openGraph: {
    title: "Gautham M — Data Analyst",
    description:
      "Turning messy data into decisions that move revenue, retention, and efficiency.",
    type: "website",
    siteName: "Gautham M — Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gautham M — Data Analyst",
    description:
      "Turning messy data into decisions that move revenue, retention, and efficiency.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
