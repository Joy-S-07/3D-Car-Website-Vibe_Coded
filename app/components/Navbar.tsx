"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fenomenoData } from "@/data/carData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("STORY");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (link: string) => {
    setActiveLink(link);
    const sectionMap: Record<string, string> = {
      STORY: "story",
      SPECS: "specs",
      FEATURES: "features",
      CONTACT: "contact",
    };
    const el = document.getElementById(sectionMap[link] || "");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-studio-blue/80 backdrop-blur-xl border-b border-border-dark"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Left: Logo mark */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-lambo-red flex items-center justify-center">
            <span
              style={{ fontFamily: "var(--font-orbitron)" }}
              className="text-lambo-red text-sm font-bold"
            >
              L
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              style={{ fontFamily: "var(--font-orbitron)" }}
              className="text-near-black text-xs tracking-[0.2em] font-semibold hidden sm:inline"
            >
              LAMBORGHINI
            </span>
            <span
              style={{ fontFamily: "var(--font-rajdhani)" }}
              className="text-lambo-red text-xs tracking-[0.15em] font-medium hidden sm:inline"
            >
              FENOMENO
            </span>
          </div>
        </div>

        {/* Center: Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {fenomenoData.navLinks.map((link) => (
            <button
              key={link}
              onClick={() => handleNavClick(link)}
              className="relative group"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              <span
                className={`text-[11px] tracking-[0.15em] transition-colors duration-300 ${
                  activeLink === link
                    ? "text-lambo-red"
                    : "text-near-black hover:text-lambo-red"
                }`}
              >
                {link}
              </span>
              {/* Active / hover underline */}
              <motion.span
                className="absolute -bottom-1 left-0 h-[1px] bg-lambo-red"
                initial={false}
                animate={{
                  width: activeLink === link ? "100%" : "0%",
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
              {activeLink !== link && (
                <span className="absolute -bottom-1 left-0 h-[1px] bg-lambo-red w-0 group-hover:w-full transition-all duration-300" />
              )}
            </button>
          ))}
        </div>

        {/* Right: CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-lambo-red hover:bg-lambo-red-bright text-pure-white px-5 py-2 transition-colors duration-300"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          <span className="text-[10px] tracking-[0.15em] font-semibold">
            INQUIRE
          </span>
        </motion.button>
      </div>
    </motion.nav>
  );
}
