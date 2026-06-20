"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";
import Cursor from "./Cursor";
import SmoothScroll from "./SmoothScroll";
import Nav from "./Nav";
import Hero from "./Hero";
import Manifesto from "./sections/Manifesto";
import Services from "./sections/Services";
import Stylists from "./sections/Stylists";
import Lookbook from "./sections/Lookbook";
import Ritual from "./sections/Ritual";
import Testimonials from "./sections/Testimonials";
import Stats from "./sections/Stats";
import Booking from "./sections/Booking";
import Footer from "./sections/Footer";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Site — the experience shell. Owns the loader hand-off (`ready`), locks scroll
 * during the intro, and refreshes ScrollTrigger once the curtain lifts and the
 * real layout has settled (pins/parallax measure correctly).
 */
export default function Site() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = ready ? "" : "hidden";
    if (!ready) return;
    // Let the hand-off paint, then recalculate all scroll-driven positions.
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => window.clearTimeout(id);
  }, [ready]);

  return (
    <>
      <Loader onComplete={() => setReady(true)} />
      <Cursor />
      <SmoothScroll>
        <Nav />
        <main>
          <Hero ready={ready} />
          <Manifesto />
          <Services />
          <Stylists />
          <Lookbook />
          <Ritual />
          <Testimonials />
          <Stats />
          <Booking />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
