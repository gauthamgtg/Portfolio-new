import AnimatedBackground from "@/components/AnimatedBackground";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import DataViz from "@/components/DataViz";
import Experience from "@/components/Experience";
import CaseStudy from "@/components/CaseStudy";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import GitHubRepos from "@/components/GitHubRepos";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <DataViz />
        <Experience />
        <CaseStudy />
        <Skills />
        <Projects />
        <GitHubRepos />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
