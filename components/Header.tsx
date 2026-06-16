"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { faqHref, faqItems, faqSectionHref } from "@/lib/faq-data";

const EASE = [0.16, 1, 0.3, 1] as const;

type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownType?: "products" | "services" | "faq";
};

const navItems: NavItem[] = [
  { label: "Početna", href: "/" },
  { label: "O nama", href: "#dobrodosli" },
  { label: "Aktuelno", href: "#aktuelno" },
  { label: "Proizvodi", href: "#brendovi", hasDropdown: true, dropdownType: "products" },
  { label: "Usluge", href: "#usluge", hasDropdown: true, dropdownType: "services" },
  { label: "Kontakt", href: "#kontakt" },
  { label: "Česta pitanja", href: faqHref, hasDropdown: true, dropdownType: "faq" },
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

export default function Header({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(solid);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!solid) {
      setScrolled(latest > window.innerHeight * 2.8);
    }
  });

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE }}
      className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-charcoal/10 bg-white/95 text-charcoal backdrop-blur-[10px]"
          : "bg-white/95 text-charcoal backdrop-blur-[10px]"
      }`}
    >
      <div className="flex w-full items-center justify-between px-4 py-3 md:py-4 md:pl-16 md:pr-3">
        <Link href="/" aria-label="Optika Kosović početna" className="flex min-w-0 items-center gap-3">
          <Image
            src="/images/profilna-slika.jpg"
            alt="Optika Kosović logo"
            width={60}
            height={60}
            className="h-11 w-11 rounded-xl object-cover shadow-[0_12px_35px_rgba(0,0,0,0.18)] md:h-[60px] md:w-[60px]"
            priority
          />
          <div className="min-w-0">
            <div className="truncate font-serif text-xl italic leading-none tracking-[-0.04em] md:text-[1.82rem]">
              OPTIKA KOSOVIĆ
            </div>
            <div className="mt-1 truncate font-mono text-[9px] uppercase tracking-[0.25em] text-label md:text-[11px] md:tracking-[0.35em]">
              NOVI BANOVCI
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-3 md:flex lg:gap-7">
          {navItems.map((item) => {
            const dropdownItems =
              item.dropdownType === "products"
                ? productCategories.map((category) => ({ label: category, href: item.href }))
                : item.dropdownType === "services"
                  ? serviceCategories.map((category) => ({ label: category, href: item.href }))
                  : item.dropdownType === "faq"
                    ? faqItems.map((faq) => ({ label: faq.shortTitle, href: faqSectionHref(faq.id) }))
                    : [];

            return (
            <div key={`${item.label}-${item.href}`} className="group/nav relative">
              <a
                href={item.href}
                className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal/80 transition-colors hover:text-accent"
              >
                {item.label}
                {item.hasDropdown ? <ChevronDown size={14} strokeWidth={2} /> : null}
                <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover/nav:scale-x-100" />
              </a>

              {item.dropdownType ? (
                <div className={`invisible absolute left-1/2 top-full mt-4 -translate-x-1/2 translate-y-2 border border-charcoal/10 bg-white/95 p-3 text-charcoal opacity-0 shadow-2xl backdrop-blur-[10px] transition-all duration-200 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100 ${
                  item.dropdownType === "faq" ? "w-96" : "w-72"
                }`}>
                  <div className="space-y-1">
                    {dropdownItems.map((category) => (
                      <a
                        key={category.label}
                        href={category.href}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-body transition-colors hover:bg-accent/5 hover:text-accent"
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center border border-accent/35 text-accent/70">
                          <ChevronDown size={10} strokeWidth={2} />
                        </span>
                        <span className="truncate">{category.label}</span>
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
            className="text-charcoal/80 transition-colors hover:text-accent"
          >
            <Search size={20} strokeWidth={2.2} />
          </button>
        </nav>

        <a
          href="#kontakt"
          className="luxury-btn px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] md:hidden"
        >
          Kontakt
        </a>
      </div>
    </motion.header>
  );
}
