"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const brands = ["ESSILOR", "CRIZAL", "INVU", "DESPADA", "ESSILOR", "CRIZAL", "INVU", "DESPADA"];
const EASE = [0.16, 1, 0.3, 1] as const;

export default function Brands() {
  return (
    <section id="brendovi" className="bg-background py-28 md:py-44">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeading eyebrow="06 · Brendovi" title="Proverena imena." muted="Bez buke." />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative mt-16 overflow-hidden border-y border-white/8 py-8"
      >
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent" />
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex w-max gap-8"
        >
          {[...brands, ...brands].map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              className="font-mono text-4xl uppercase tracking-[0.25em] text-white/18 md:text-7xl"
            >
              {brand}
              <span className="mx-8 text-accent/50">·</span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
