"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
};

export default function Reveal({
  children,
  delay = 0,
  className,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
