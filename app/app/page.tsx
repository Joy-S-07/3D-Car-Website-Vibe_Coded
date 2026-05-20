"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/Navbar";
import FenomenoScrollCanvas from "@/components/FenomenoScrollCanvas";
import FenomenoExperience from "@/components/FenomenoExperience";
import SpecsGrid from "@/components/SpecsGrid";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Master scroll — attached to the 600vh container, NOT window
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Lenis smooth scroll initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      <Navbar />

      {/* ── SCROLL SEQUENCE — locked for 600vh ──────── */}
      <div
        ref={containerRef}
        id="story"
        style={{ height: "600vh" }}
        className="relative"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Canvas: scroll-controlled image sequence */}
          <FenomenoScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={240}
            imageFolderPath="/frames"
          />
          {/* HUD: scroll-controlled text overlay */}
          <FenomenoExperience scrollYProgress={scrollYProgress} />
        </div>
      </div>

      {/* ── REST OF SITE — scrolls naturally ─────────── */}
      <SpecsGrid />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
