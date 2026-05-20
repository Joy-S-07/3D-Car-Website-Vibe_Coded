import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clampValue(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function getPhaseProgress(
  scrollProgress: number,
  phaseStart: number,
  phaseEnd: number
): number {
  if (scrollProgress <= phaseStart) return 0;
  if (scrollProgress >= phaseEnd) return 1;
  return (scrollProgress - phaseStart) / (phaseEnd - phaseStart);
}
