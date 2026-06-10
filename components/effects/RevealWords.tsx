"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function RevealWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="mr-[0.22em] inline-block overflow-hidden">
          <motion.span
            aria-hidden="true"
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              ease: EASE,
              delay: delay + index * 0.07,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
