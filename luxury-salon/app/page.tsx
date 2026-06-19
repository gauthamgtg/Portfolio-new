"use client";

import { useCallback, useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

import SmoothScroll from "@/components/SmoothScroll";
import Grain from "@/components/Grain";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Services from "@/components/Services";
import Stylists from "@/components/Stylists";
import Lookbook from "@/components/Lookbook";
import Ritual from "@/components/Ritual";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import BookingCTA from "@/components/BookingCTA";
import Footer from "@/components/Footer";

export default function Page() {
  const [started, setStarted] = useState(false);

  const handleLoaderDone = useCallback(() => {
    setStarted(true);
    // Pinned/scrubbed triggers measure correctly once layout has settled.
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  // Recalculate triggers after fonts/images settle.
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => clearTimeout(id);
  }, [started]);

  return (
    <SmoothScroll>
      <Cursor />
      <Grain />
      <Loader onDone={handleLoaderDone} />

      <Navbar />

      <main>
        <Hero started={started} />
        <Manifesto />
        <Services />
        <Stylists />
        <Lookbook />
        <Ritual />
        <Testimonials />
        <Stats />
        <BookingCTA />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
