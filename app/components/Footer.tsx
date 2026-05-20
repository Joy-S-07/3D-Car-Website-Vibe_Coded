"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-lambo-red py-16 px-6 md:px-12"
      style={{ backgroundColor: "#7CA4D6" }}
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Red gradient divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-lambo-red to-transparent mb-12" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left: Branding */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 border-lambo-red flex items-center justify-center">
                <span
                  style={{ fontFamily: "var(--font-orbitron)" }}
                  className="text-lambo-red text-sm font-bold"
                >
                  L
                </span>
              </div>
              <span
                style={{ fontFamily: "var(--font-orbitron)" }}
                className="text-near-black text-xs tracking-[0.2em] font-semibold"
              >
                AUTOMOBILI LAMBORGHINI S.P.A.
              </span>
            </div>
            <p
              style={{ fontFamily: "var(--font-rajdhani)" }}
              className="text-pure-white text-sm tracking-wide font-medium"
            >
              The Unstoppable Force — Since 1963
            </p>
          </div>

          {/* Right: CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-lambo-red hover:bg-lambo-red-bright text-pure-white px-8 py-3 transition-colors duration-300"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span className="text-[10px] tracking-[0.15em] font-semibold">
              CONTACT THE ATELIER
            </span>
          </motion.button>
        </div>

        {/* Bottom credits */}
        <div className="mt-12 pt-6 border-t border-near-black/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            style={{ fontFamily: "var(--font-rajdhani)" }}
            className="text-near-black/50 text-xs tracking-wide font-medium"
          >
            © 2026 Lamborghini Fenomeno Roadster — Portfolio Project
          </p>
          <p
            style={{ fontFamily: "var(--font-rajdhani)" }}
            className="text-near-black/40 text-[10px] tracking-wider font-medium"
          >
            BUILT WITH NEXT.JS · TAILWIND CSS · FRAMER MOTION · LENIS
          </p>
        </div>
      </div>
    </footer>
  );
}
