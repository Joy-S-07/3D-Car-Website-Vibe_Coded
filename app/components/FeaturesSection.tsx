"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fenomenoData } from "@/data/carData";

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="features"
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
            ENGINEERING EXCELLENCE
          </p>
          <h2
            style={{ fontFamily: "var(--font-orbitron)" }}
            className="text-near-black text-3xl md:text-4xl font-black"
          >
            DEFINING <span className="text-lambo-red">FEATURES</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fenomenoData.features.map((feature, i) => (
            <motion.div
              key={feature.number}
              initial={{
                x: i % 2 === 0 ? -60 : 60,
                opacity: 0,
              }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group border-l-2 border-lambo-red pl-6 py-4 hover:bg-near-black/5 transition-all duration-300"
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span
                  style={{ fontFamily: "var(--font-orbitron)" }}
                  className="text-lambo-red text-[10px] tracking-[0.2em] font-semibold"
                >
                  {feature.number}
                </span>
                <h3
                  style={{ fontFamily: "var(--font-orbitron)" }}
                  className="text-near-black group-hover:text-lambo-red text-base md:text-lg font-bold transition-colors duration-300"
                >
                  {feature.title}
                </h3>
              </div>
              <p
                style={{ fontFamily: "var(--font-rajdhani)" }}
                className="text-pure-white text-sm leading-relaxed font-medium"
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
