"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamic imports for heavy components
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });
const Loader = dynamic(() => import("@/components/Loader"), { ssr: false });
const Navigation = dynamic(() => import("@/components/Navigation"), { ssr: false });

import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Services from "@/components/Services";
import Barbers from "@/components/Barbers";
import Lookbook from "@/components/Lookbook";
import Ritual from "@/components/Ritual";
import Membership from "@/components/Membership";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import BookingCTA from "@/components/BookingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Check if already visited in this session
    const hasVisited = sessionStorage.getItem("obsidian-visited");
    if (hasVisited) {
      setShowLoader(false);
      setLoaded(true);
    }
  }, []);

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setLoaded(true);
    sessionStorage.setItem("obsidian-visited", "1");
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showLoader]);

  return (
    <>
      {/* Film grain overlay — always present */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Loader */}
      {showLoader && <Loader onComplete={handleLoaderComplete} />}

      {/* Custom cursor */}
      <CustomCursor />

      {/* Main site */}
      <SmoothScroll>
        <main
          className="relative"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          {/* Navigation */}
          <Navigation />

          {/* Sections */}
          <Hero />
          <Manifesto />
          <Services />
          <Barbers />
          <Lookbook />
          <Ritual />
          <Membership />
          <Testimonials />
          <Stats />
          <BookingCTA />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
