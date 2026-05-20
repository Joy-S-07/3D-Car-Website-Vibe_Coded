"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fenomenoData } from "@/data/carData";

export default function SpecsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="specs"
      className="py-24 md:py-32 px-6 md:px-12"
      style={{ backgroundColor: "#7CA4D6" }}
    >
      <div className="max-w-[1440px] mx-auto" ref={ref}>
        {/* Header */}
        <div className="mb-16">
          <div className="w-12 h-[1px] bg-lambo-red mb-4" />
          <p
            style={{ fontFamily: "var(--font-orbitron)" }}
            className="text-lambo-red text-[10px] tracking-[0.3em] font-semibold mb-3"
          >
            TECHNICAL DATA
          </p>
          <h2
            style={{ fontFamily: "var(--font-orbitron)" }}
            className="text-near-black text-3xl md:text-4xl font-black"
          >
            PERFORMANCE{" "}
            <span className="text-lambo-red">SPECIFICATIONS</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {fenomenoData.specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ y: 40, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group border border-border-dark hover:border-lambo-red p-6 transition-colors duration-300 relative overflow-hidden"
              style={{ backgroundColor: "#7CA4D6" }}
            >
              <p
                style={{ fontFamily: "var(--font-orbitron)" }}
                className="text-near-black group-hover:text-lambo-red text-3xl md:text-4xl font-bold transition-colors duration-300"
              >
                {spec.value}
              </p>
              <p
                style={{ fontFamily: "var(--font-orbitron)" }}
                className="text-lambo-red text-[10px] tracking-[0.15em] font-semibold mt-1"
              >
                {spec.unit}
              </p>
              <p
                style={{ fontFamily: "var(--font-rajdhani)" }}
                className="text-pure-white text-sm tracking-[0.1em] font-medium mt-3"
              >
                {spec.label}
              </p>

              {/* Bottom red line on hover */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-lambo-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
