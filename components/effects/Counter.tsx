"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function easeOut(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export default function Counter({
  to,
  suffix = "",
  duration = 1200,
  className,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(to * easeOut(progress)));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [duration, isInView, to]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
