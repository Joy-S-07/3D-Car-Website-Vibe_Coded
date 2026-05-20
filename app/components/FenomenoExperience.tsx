"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  MotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { fenomenoData } from "@/data/carData";

interface FenomenoExperienceProps {
  scrollYProgress: MotionValue<number>;
}

/* ── Animation Variants ────────────────────────────── */

const transition = {
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1] as const,
};

const exitTransition = {
  duration: 0.4,
  ease: [0.16, 1, 0.3, 1] as const,
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const staggerChild = {
  initial: { y: 30, opacity: 0, filter: "blur(8px)" },
  animate: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition,
  },
  exit: {
    y: -20,
    opacity: 0,
    filter: "blur(4px)",
    transition: exitTransition,
  },
};

/* ── Main Component ────────────────────────────────── */

export default function FenomenoExperience({
  scrollYProgress,
}: FenomenoExperienceProps) {
  const [activePhase, setActivePhase] = useState(0);
  const [progress, setProgress] = useState(0);

  // Subscribe to scroll progress to determine active phase
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
    const phases = fenomenoData.phases;
    for (let i = phases.length - 1; i >= 0; i--) {
      if (latest >= phases[i].scrollRange[0]) {
        setActivePhase(i);
        return;
      }
    }
    setActivePhase(0);
  });

  const currentPhase = fenomenoData.phases[activePhase];

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* ── Scroll progress bar at top ─────────────── */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-50">
        <motion.div
          className="h-full bg-lambo-red origin-left"
          style={{ scaleX: progress, transformOrigin: "left" }}
        />
      </div>

      {/* ── Persistent: Top-left logo (below navbar) ── */}
      <div className="absolute top-20 left-6 md:left-12 flex items-center gap-3">
        <div className="w-7 h-7 border border-lambo-red flex items-center justify-center">
          <span
            style={{ fontFamily: "var(--font-orbitron)" }}
            className="text-lambo-red text-[10px] font-bold"
          >
            L
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            style={{ fontFamily: "var(--font-orbitron)" }}
            className="text-near-black text-[9px] tracking-[0.15em] font-medium"
          >
            LAMBORGHINI
          </span>
          <span className="text-near-black/30 text-[9px]">/</span>
          <span
            style={{ fontFamily: "var(--font-orbitron)" }}
            className="text-lambo-red text-[9px] tracking-[0.15em] font-medium"
          >
            FENOMENO
          </span>
        </div>
      </div>

      {/* ── Persistent: Phase dots — top right ──────── */}
      <div className="absolute top-20 right-6 md:right-12 flex items-center gap-3">
        {fenomenoData.phases.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full border transition-all duration-500 ${
              i === activePhase
                ? "bg-lambo-red border-lambo-red scale-110"
                : "bg-transparent border-near-black/40"
            }`}
          />
        ))}
      </div>

      {/* ── Persistent: Bottom-right location ──────── */}
      <div className="absolute bottom-6 right-6 md:right-12">
        <span
          style={{ fontFamily: "var(--font-rajdhani)" }}
          className="text-pure-white text-[11px] tracking-[0.12em] font-medium"
        >
          SANT&apos;AGATA BOLOGNESE, ITALY · 2026
        </span>
      </div>

      {/* ── Phase content with AnimatePresence ──────── */}
      <AnimatePresence mode="wait">
        {activePhase === 0 && (
          <HeroPhase key="hero" phase={currentPhase} progress={progress} />
        )}
        {activePhase === 1 && (
          <ExteriorPhase key="exterior" phase={currentPhase} />
        )}
        {activePhase === 2 && (
          <DoorsPhase key="doors" phase={currentPhase} progress={progress} />
        )}
        {activePhase === 3 && (
          <EnginePhase key="engine" phase={currentPhase} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PHASE 1 — HERO (0% – 25%)
   ═══════════════════════════════════════════════════════ */

interface PhaseProps {
  phase: (typeof fenomenoData.phases)[number];
  progress?: number;
}

function HeroPhase({ phase, progress = 0 }: PhaseProps) {
  const showScrollHint = progress < 0.05;

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-start pt-32 md:pt-36 px-6 md:px-12"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Main title group */}
      <div className="max-w-4xl">
        {/* Top label — in flow, not absolute */}
        <motion.div variants={staggerChild} className="mb-4">
          <span
            style={{ fontFamily: "var(--font-orbitron)" }}
            className="text-lambo-red text-[10px] tracking-[0.3em] font-semibold"
          >
            {phase.label}
          </span>
        </motion.div>

        {/* Red decorator line */}
        <motion.div variants={staggerChild} className="mb-1">
          <div className="w-12 h-[2px] bg-lambo-red mb-4" />
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={staggerChild}
          style={{ fontFamily: "var(--font-orbitron)" }}
          className="text-near-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight"
        >
          {phase.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={staggerChild}
          style={{ fontFamily: "var(--font-rajdhani)" }}
          className="text-lambo-red text-lg sm:text-xl md:text-2xl tracking-[0.3em] font-semibold mt-2"
        >
          {phase.subtitle}
        </motion.p>

        {/* Description */}
        <motion.p
          variants={staggerChild}
          style={{ fontFamily: "var(--font-rajdhani)" }}
          className="text-pure-white text-sm md:text-base max-w-md mt-4 leading-relaxed font-medium"
        >
          {phase.description}
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={staggerChild}
          className="flex flex-wrap gap-4 mt-6 pointer-events-auto"
        >
          <button
            className="bg-lambo-red hover:bg-lambo-red-bright text-pure-white px-6 py-3 transition-colors duration-300"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span className="text-[10px] tracking-[0.15em] font-semibold">
              SCROLL TO EXPLORE
            </span>
          </button>
          <button
            className="border border-near-black text-near-black hover:border-lambo-red hover:text-lambo-red px-6 py-3 transition-colors duration-300"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span className="text-[10px] tracking-[0.15em] font-semibold">
              SPECIFICATIONS
            </span>
          </button>
        </motion.div>
      </div>

      {/* Right side: Price */}
      <motion.div
        variants={staggerChild}
        className="absolute bottom-28 md:bottom-36 right-6 md:right-12 text-right hidden md:block"
      >
        <p
          style={{ fontFamily: "var(--font-orbitron)" }}
          className="text-near-black text-2xl lg:text-3xl font-bold"
        >
          {fenomenoData.price}
        </p>
        <p
          style={{ fontFamily: "var(--font-orbitron)" }}
          className="text-lambo-red text-[10px] tracking-[0.2em] font-semibold mt-1"
        >
          {fenomenoData.units} UNITS ONLY
        </p>
      </motion.div>

      {/* Bottom center: Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ opacity: showScrollHint ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-[1px] h-8 bg-lambo-red animate-scroll-pulse" />
        <span
          style={{ fontFamily: "var(--font-orbitron)" }}
          className="text-lambo-red text-[9px] tracking-[0.3em]"
        >
          SCROLL
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   PHASE 2 — EXTERIOR (25% – 50%)
   ═══════════════════════════════════════════════════════ */

function ExteriorPhase({ phase }: PhaseProps) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center px-6 md:px-12"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-2xl">
        <motion.div variants={staggerChild}>
          <span
            style={{ fontFamily: "var(--font-orbitron)" }}
            className="text-lambo-red text-[10px] tracking-[0.3em] font-semibold"
          >
            {phase.label}
          </span>
        </motion.div>

        <motion.div variants={staggerChild} className="mt-3">
          <div className="w-12 h-[2px] bg-lambo-red mb-4" />
        </motion.div>

        <motion.h2
          variants={staggerChild}
          style={{ fontFamily: "var(--font-orbitron)" }}
          className="text-near-black text-4xl sm:text-5xl md:text-6xl font-black leading-tight"
        >
          {phase.title}
        </motion.h2>

        <motion.p
          variants={staggerChild}
          style={{ fontFamily: "var(--font-rajdhani)" }}
          className="text-lambo-red text-base md:text-lg tracking-[0.25em] font-semibold mt-2"
        >
          {phase.subtitle}
        </motion.p>

        <motion.p
          variants={staggerChild}
          style={{ fontFamily: "var(--font-rajdhani)" }}
          className="text-pure-white text-sm md:text-base max-w-lg mt-4 leading-relaxed font-medium"
        >
          {phase.description}
        </motion.p>
      </div>

      {/* Right side: Forged Composite badge */}
      <motion.div
        variants={staggerChild}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden md:block"
      >
        <div className="border border-near-black/30 px-6 py-4 corner-bracket">
          <span
            style={{ fontFamily: "var(--font-orbitron)" }}
            className="text-near-black text-[11px] tracking-[0.2em] font-semibold"
          >
            FORGED COMPOSITE™
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   PHASE 3 — DOORS (50% – 75%)
   ═══════════════════════════════════════════════════════ */

function DoorsPhase({ phase, progress = 0 }: PhaseProps) {
  // Calculate door angle based on phase-local progress
  const phaseProgress = Math.min(1, Math.max(0, (progress - 0.5) / 0.25));
  const doorAngle = Math.round(phaseProgress * 85);

  return (
    <motion.div
      className="absolute inset-0 flex items-center px-6 md:px-12"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-2xl">
        <motion.div variants={staggerChild}>
          <span
            style={{ fontFamily: "var(--font-orbitron)" }}
            className="text-lambo-red text-[10px] tracking-[0.3em] font-semibold"
          >
            {phase.label}
          </span>
        </motion.div>

        <motion.div variants={staggerChild} className="mt-3">
          <div className="w-12 h-[2px] bg-lambo-red mb-4" />
        </motion.div>

        <motion.h2
          variants={staggerChild}
          style={{ fontFamily: "var(--font-orbitron)" }}
          className="text-near-black text-4xl sm:text-5xl md:text-6xl font-black leading-tight"
        >
          {phase.title}
        </motion.h2>

        <motion.p
          variants={staggerChild}
          style={{ fontFamily: "var(--font-rajdhani)" }}
          className="text-lambo-red text-base md:text-lg tracking-[0.25em] font-semibold mt-2"
        >
          {phase.subtitle}
        </motion.p>

        <motion.p
          variants={staggerChild}
          style={{ fontFamily: "var(--font-rajdhani)" }}
          className="text-pure-white text-sm md:text-base max-w-lg mt-4 leading-relaxed font-medium"
        >
          {phase.description}
        </motion.p>
      </div>

      {/* Right side: Door angle visualization */}
      <motion.div
        variants={staggerChild}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3"
      >
        <div className="w-24 h-24 border border-near-black/20 relative flex items-end justify-center overflow-hidden">
          {/* Base line (horizontal) */}
          <div className="absolute bottom-4 left-4 w-[calc(100%-32px)] h-[1px] bg-near-black/30" />
          {/* Rotating door line */}
          <div
            className="absolute bottom-4 left-4 w-14 h-[2px] bg-lambo-red origin-left"
            style={{
              transform: `rotate(-${doorAngle}deg)`,
              transition: "transform 0.15s ease-out",
            }}
          />
        </div>

        {/* Angle readout */}
        <span
          style={{ fontFamily: "var(--font-orbitron)" }}
          className="text-lambo-red text-xl font-bold"
        >
          {doorAngle}°
        </span>
        <span
          style={{ fontFamily: "var(--font-rajdhani)" }}
          className="text-pure-white text-[10px] tracking-[0.2em] font-medium"
        >
          DOOR ANGLE
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   PHASE 4 — ENGINE (75% – 100%)
   ═══════════════════════════════════════════════════════ */

function EnginePhase({ phase }: PhaseProps) {
  const engineSpecs = [
    { label: "POWER", value: "829", unit: "HP" },
    { label: "TORQUE", value: "725", unit: "NM" },
    { label: "0-100", value: "2.7", unit: "SEC" },
  ];

  return (
    <motion.div
      className="absolute inset-0 flex items-center px-6 md:px-12"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-2xl">
        <motion.div variants={staggerChild}>
          <span
            style={{ fontFamily: "var(--font-orbitron)" }}
            className="text-lambo-red text-[10px] tracking-[0.3em] font-semibold"
          >
            {phase.label}
          </span>
        </motion.div>

        <motion.div variants={staggerChild} className="mt-3">
          <div className="w-12 h-[2px] bg-lambo-red mb-4" />
        </motion.div>

        <motion.h2
          variants={staggerChild}
          style={{ fontFamily: "var(--font-orbitron)" }}
          className="text-near-black text-3xl sm:text-4xl md:text-5xl font-black leading-tight"
        >
          {phase.title}
        </motion.h2>

        {/* Huge subtitle — most important number */}
        <motion.p
          variants={staggerChild}
          style={{ fontFamily: "var(--font-orbitron)" }}
          className="text-lambo-red text-3xl sm:text-4xl md:text-5xl tracking-tight font-bold mt-2 glow-red"
        >
          {phase.subtitle}
        </motion.p>

        <motion.p
          variants={staggerChild}
          style={{ fontFamily: "var(--font-rajdhani)" }}
          className="text-pure-white text-sm md:text-base max-w-lg mt-4 leading-relaxed font-medium"
        >
          {phase.description}
        </motion.p>
      </div>

      {/* Right side: Engine specs stack */}
      <motion.div
        variants={staggerChild}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-6"
      >
        {engineSpecs.map((spec) => (
          <div key={spec.label} className="text-right">
            <p
              style={{ fontFamily: "var(--font-rajdhani)" }}
              className="text-pure-white text-[10px] tracking-[0.2em] font-medium mb-1"
            >
              {spec.label}
            </p>
            <div className="flex items-baseline gap-2 justify-end">
              <span
                style={{ fontFamily: "var(--font-orbitron)" }}
                className="text-near-black text-2xl font-bold"
              >
                {spec.value}
              </span>
              <span
                style={{ fontFamily: "var(--font-orbitron)" }}
                className="text-lambo-red text-xs font-semibold"
              >
                {spec.unit}
              </span>
            </div>
            <div className="w-full h-[1px] bg-lambo-red mt-2" />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
