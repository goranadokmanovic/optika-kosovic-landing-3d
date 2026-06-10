"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Reveal from "@/components/effects/Reveal";
import SectionHeading from "@/components/SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

// TODO: zameniti pravim Google recenzijama
const reviews = [
  {
    quote: "„Profesionalno, brzo i ljubazno. Naočare gotove pre roka.\"",
    author: "M. J., Novi Banovci",
  },
  {
    quote: "„Konačno optika gde dobijete iskren savet, ne najskuplji ram.\"",
    author: "S. P., Stara Pazova",
  },
  {
    quote: "„Servisirali su mi naočare dok sam čekala. Preporuka!\"",
    author: "D. K., Batajnica",
  },
];

export default function Reviews() {
  return (
    <section
      id="utisci"
      className="bg-background bg-[radial-gradient(circle_at_15%_20%,var(--color-brand-soft),transparent_45%)] py-28 md:py-44"
    >
      <div className="container mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeading eyebrow="06 · Utisci" title="Šta kažu" muted="naši korisnici." />

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal key={review.author} delay={index * 0.08}>
              <article className="relative min-h-80 overflow-hidden rounded-3xl border border-brand/25 bg-surface p-7">
                <div className="absolute -right-2 -top-10 font-serif text-[140px] italic leading-none text-white/[0.04]">
                  &quot;
                </div>
                <div className="relative z-10">
                  <div className="mb-10 flex gap-1">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <motion.span
                        key={starIndex}
                        initial={{ opacity: 0, scale: 0.5, y: 8 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 18,
                          delay: index * 0.08 + starIndex * 0.04,
                        }}
                        className="text-accent"
                      >
                        <Star size={16} fill="currentColor" strokeWidth={1.4} />
                      </motion.span>
                    ))}
                  </div>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: EASE, delay: index * 0.08 + 0.12 }}
                    className="font-serif text-3xl italic leading-tight tracking-[-0.04em]"
                  >
                    {review.quote}
                  </motion.p>
                  <div className="mt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                    {review.author}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
