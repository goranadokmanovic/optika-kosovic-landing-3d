"use client";

import { useMotionValue, type MotionValue } from "framer-motion";
import { useEffect, useRef, type RefObject } from "react";
import { useLenis } from "@/components/SmoothScroll";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function pinProgress(progress: number) {
  return clamp((progress - 0.25) / 0.5);
}

function measureProgress(section: HTMLElement) {
  const rect = section.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const sectionHeight = section.offsetHeight;
  const scrollYProgress = (viewportHeight - rect.top) / (sectionHeight + viewportHeight);

  return pinProgress(clamp(scrollYProgress, 0, 1));
}

export function useHeroPinProgress(sectionRef: RefObject<HTMLElement | null>): {
  progressRef: RefObject<number>;
  progress: MotionValue<number>;
} {
  const progressRef = useRef(0);
  const progress = useMotionValue(0);
  const lenis = useLenis();

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const next = measureProgress(section);
      progressRef.current = next;
      progress.set(next);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    let rafId = 0;
    const loop = () => {
      update();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    lenis?.on("scroll", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(rafId);
      lenis?.off("scroll", update);
    };
  }, [lenis, progress, sectionRef]);

  return { progressRef, progress };
}
