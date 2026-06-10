"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const interactiveSelector = "button, a, [role='button'], canvas";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 380, damping: 32, mass: 0.6 });
  const ringY = useSpring(dotY, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateEnabled = () => setEnabled(media.matches);

    updateEnabled();
    media.addEventListener("change", updateEnabled);

    return () => {
      media.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let clickTimeout: number | undefined;

    const handlePointerMove = (event: PointerEvent) => {
      dotX.set(event.clientX);
      dotY.set(event.clientY);
      setHovered(Boolean((event.target as Element | null)?.closest(interactiveSelector)));
    };

    const handlePointerDown = () => {
      setClicked(true);
      window.clearTimeout(clickTimeout);
    };

    const handlePointerUp = () => {
      clickTimeout = window.setTimeout(() => setClicked(false), 120);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.clearTimeout(clickTimeout);
    };
  }, [dotX, dotY, enabled]);

  if (!enabled) {
    return null;
  }

  const ringScale = clicked ? 0.85 : hovered ? 1.6 : 1;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[2147483647] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[2147483647] h-9 w-9 rounded-full border bg-white/5 backdrop-blur-[1px]"
        animate={{
          scale: ringScale,
          borderColor: hovered ? "rgba(212, 168, 67, 1)" : "rgba(212, 168, 67, 0.72)",
          boxShadow: hovered
            ? "0 0 26px rgba(212, 168, 67, 0.28), inset 0 0 12px rgba(255, 255, 255, 0.16)"
            : "0 0 16px rgba(212, 168, 67, 0.12), inset 0 0 10px rgba(255, 255, 255, 0.1)",
        }}
        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderWidth: 1.5,
        }}
      />
    </>
  );
}
