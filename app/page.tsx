import SmoothScroll   from "@/components/salon/SmoothScroll";
import CustomCursor   from "@/components/salon/CustomCursor";
import Navbar         from "@/components/salon/Navbar";
import Hero           from "@/components/salon/Hero";
import MarqueeStrip   from "@/components/salon/MarqueeStrip";
import Services       from "@/components/salon/Services";
import Team           from "@/components/salon/Team";
import Gallery        from "@/components/salon/Gallery";
import Pricing        from "@/components/salon/Pricing";
import Testimonials   from "@/components/salon/Testimonials";
import BookingCTA     from "@/components/salon/BookingCTA";
import Footer         from "@/components/salon/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <Services />
        <Team />
        <Gallery />
        <Pricing />
        <Testimonials />
        <BookingCTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
