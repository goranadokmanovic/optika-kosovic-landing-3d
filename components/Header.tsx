"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as const;

type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownType?: "products" | "services" | "faq";
};

const navItems: NavItem[] = [
  { label: "Početna", href: "#" },
  { label: "O nama", href: "#dobrodosli" },
  { label: "Aktuelno", href: "#aktuelno" },
  { label: "Proizvodi", href: "#brendovi", hasDropdown: true, dropdownType: "products" },
  { label: "Usluge", href: "#usluge", hasDropdown: true, dropdownType: "services" },
  { label: "Kontakt", href: "#kontakt" },
  { label: "Česta pitanja", href: "#kontakt", hasDropdown: true, dropdownType: "faq" },
];

const productCategories = [
  "Ženski dioptrijski okviri",
  "Muški dioptrijski okviri",
  "Dečiji dioptrijski okviri",
  "Sunčane naočare",
  "Dioptrijska plastična stakla",
];

const serviceCategories = [
  "Urađene naočare: savršen vid i udobnost",
  "Kako se prave naočare",
  "Servis naočara",
];

const faqCategories = [
  "Nepravilno korišćenje naočara",
  "Kratkovidost - myopia",
  "Naočare za rad",
  "Zašto odabrati kvalitetna stakla",
  "Katarakta - zamućenje očnog sočiva",
  "Oštećeni zaštitni slojevi na naočarima",
  "Prizme i prizma folija",
  "Plastična stakla u boji",
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
      <div className="flex w-full items-center justify-between py-4 pl-16 pr-3">
        <a href="#" aria-label="Optika Kosović početna" className="flex items-center gap-3">
          <Image
            src="/images/profilna-slika.jpg"
            alt="Optika Kosović logo"
            width={60}
            height={60}
            className="h-[60px] w-[60px] rounded-xl object-cover shadow-[0_12px_35px_rgba(0,0,0,0.18)]"
            priority
          />
          <div>
            <div className="font-serif text-[1.82rem] italic leading-none tracking-[-0.04em]">
              OPTIKA KOSOVIĆ
            </div>
            <div
              className={`mt-1 font-mono text-[11px] uppercase tracking-[0.35em] ${
                scrolled ? "text-white/40" : "text-neutral-950/45"
              }`}
            >
              NOVI BANOVCI
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-6 md:flex lg:gap-7">
          {navItems.map((item) => {
            const dropdownItems =
              item.dropdownType === "products"
                ? productCategories
                : item.dropdownType === "services"
                  ? serviceCategories
                  : item.dropdownType === "faq"
                    ? faqCategories
                    : [];

            return (
            <div key={`${item.label}-${item.href}`} className="group/nav relative">
              <a
                href={item.href}
                className={`relative inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                  scrolled
                    ? "text-white/70 hover:text-white"
                    : "text-neutral-950/65 hover:text-neutral-950"
                }`}
              >
                {item.label}
                {item.hasDropdown ? <ChevronDown size={14} strokeWidth={2} /> : null}
                <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover/nav:scale-x-100" />
              </a>

              {item.dropdownType ? (
                <div className={`invisible absolute left-1/2 top-full mt-4 -translate-x-1/2 translate-y-2 rounded-sm border border-black/10 bg-white p-3 text-neutral-950 opacity-0 shadow-2xl transition-all duration-200 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100 ${
                  item.dropdownType === "faq" ? "w-96" : "w-72"
                }`}>
                  <div className="space-y-1">
                    {dropdownItems.map((category) => (
                      <a
                        key={category}
                        href={item.href}
                        className="flex items-center gap-3 rounded-sm px-4 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center border border-neutral-400 text-neutral-500">
                          <ChevronDown size={10} strokeWidth={2} />
                        </span>
                        <span className="truncate">{category}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            );
          })}
          <button
            type="button"
            aria-label="Pretraga"
            className={`transition-colors ${
              scrolled ? "text-white/80 hover:text-white" : "text-neutral-950/70 hover:text-neutral-950"
            }`}
          >
            <Search size={20} strokeWidth={2.2} />
          </button>
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
