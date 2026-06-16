"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { cancelFrame, frame } from "motion-dom";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
      autoRaf: false,
    });

    lenisRef.current = instance;
    setLenis(instance);

    function update(data: { timestamp: number }) {
      instance.raf(data.timestamp);
    }

    frame.update(update, true);

    return () => {
      cancelFrame(update);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
