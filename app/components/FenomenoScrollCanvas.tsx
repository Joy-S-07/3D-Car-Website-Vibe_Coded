"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { MotionValue, useTransform, useMotionValueEvent } from "framer-motion";

interface FenomenoScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  imageFolderPath: string;
}

export default function FenomenoScrollCanvas({
  scrollYProgress,
  totalFrames,
  imageFolderPath,
}: FenomenoScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  // Preload ALL images before showing anything
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `${imageFolderPath}/ezgif-frame-${paddedIndex}.jpg`;

      img.onload = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / totalFrames) * 100));
        if (loaded === totalFrames) {
          imagesRef.current = images;
          setIsLoading(false);
        }
      };

      img.onerror = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / totalFrames) * 100));
        if (loaded === totalFrames) {
          imagesRef.current = images;
          setIsLoading(false);
        }
      };

      images.push(img);
    }
  }, [totalFrames, imageFolderPath]);

  // Draw a frame on the canvas with High-DPI support and object-fit: contain
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || !img.naturalWidth) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const cssWidth = rect.width;
    const cssHeight = rect.height;

    // CRITICAL High-DPI fix — ensures 4K/Retina sharpness
    if (canvas.width !== Math.round(cssWidth * dpr) || canvas.height !== Math.round(cssHeight * dpr)) {
      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      ctx.scale(dpr, dpr);
    }

    // Clear canvas and fill background with studio blue
    ctx.clearRect(0, 0, cssWidth, cssHeight);
    ctx.fillStyle = "#7CA4D6";
    ctx.fillRect(0, 0, cssWidth, cssHeight);

    // Object-fit: cover — fill entire viewport, crop overflow, center vertically
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = cssWidth / cssHeight;
    let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

    if (imgAspect > canvasAspect) {
      // Image is wider than canvas — fit to height, crop sides
      drawHeight = cssHeight;
      drawWidth = cssHeight * imgAspect;
      drawX = (cssWidth - drawWidth) / 2;
      drawY = 0;
    } else {
      // Image is taller than canvas — fit to width, crop top/bottom
      drawWidth = cssWidth;
      drawHeight = cssWidth / imgAspect;
      drawX = 0;
      drawY = (cssHeight - drawHeight) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, []);

  // Subscribe to frameIndex changes — only redraw when frame actually changes
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.round(latest);
    if (idx !== currentFrameRef.current && !isLoading) {
      currentFrameRef.current = idx;
      drawFrame(idx);
    }
  });

  // ResizeObserver to handle window resize and redraw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver(() => {
      if (!isLoading) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const rect = canvas.getBoundingClientRect();
          const dpr = window.devicePixelRatio || 1;
          canvas.width = Math.round(rect.width * dpr);
          canvas.height = Math.round(rect.height * dpr);
          ctx.scale(dpr, dpr);
          drawFrame(currentFrameRef.current);
        }
      }
    });

    observer.observe(canvas);
    return () => observer.disconnect();
  }, [drawFrame, isLoading]);

  // Initial draw when loading completes
  useEffect(() => {
    if (!isLoading) {
      drawFrame(0);
    }
  }, [isLoading, drawFrame]);

  return (
    <div className="relative w-full h-full">
      {/* Loading overlay */}
      {isLoading && (
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center"
          style={{ backgroundColor: "#7CA4D6" }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Loading text */}
            <span
              style={{ fontFamily: "var(--font-orbitron)" }}
              className="text-near-black text-sm tracking-[0.3em] font-semibold"
            >
              LOADING
            </span>

            {/* Progress bar */}
            <div className="w-48 h-[2px] bg-near-black/10 overflow-hidden relative">
              <div
                className="h-full bg-lambo-red transition-all duration-300 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>

            {/* Percentage */}
            <span
              style={{ fontFamily: "var(--font-orbitron)" }}
              className="text-lambo-red text-xs tracking-[0.2em]"
            >
              {loadProgress}%
            </span>

            {/* Animated red sweep line */}
            <div className="w-48 h-[1px] bg-near-black/5 overflow-hidden relative">
              <div className="w-12 h-full bg-lambo-red animate-loading-sweep absolute" />
            </div>
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
