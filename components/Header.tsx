"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const navItems = [
  { label: "Usluge", href: "#usluge" },
  { label: "Brendovi", href: "#brendovi" },
  { label: "Utisci", href: "#utisci" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > window.innerHeight * 2.8);
  });

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE }}
      className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-brand-deep/85 text-white backdrop-blur-md"
          : "bg-transparent text-neutral-950"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12">
        <a href="#" aria-label="Optika Kosović početna">
          <div className="font-serif text-2xl italic leading-none tracking-[-0.04em]">
            OPTIKA KOSOVIĆ
          </div>
          <div
            className={`mt-1 font-mono text-[9px] uppercase tracking-[0.35em] ${
              scrolled ? "text-white/40" : "text-neutral-950/45"
            }`}
          >
            NOVI BANOVCI
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`group relative font-mono text-[10px] uppercase tracking-[0.25em] transition-colors ${
                scrolled ? "text-white/70 hover:text-white" : "text-neutral-950/65 hover:text-neutral-950"
              }`}
            >
              {item.label}
              <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
          <a
            href="#kontakt"
            className="rounded-full border border-accent/40 bg-accent px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-black transition-transform duration-300 hover:-translate-y-0.5"
          >
            Zakažite pregled
          </a>
        </nav>

        <a
          href="#kontakt"
          className="rounded-full border border-accent/40 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-accent md:hidden"
        >
          Kontakt
        </a>
      </div>
    </motion.header>
  );
}
