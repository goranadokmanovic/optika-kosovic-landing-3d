"use client";

import { useEffect, useState } from "react";
import { faqItems } from "@/lib/faq-data";

const SCROLL_OFFSET = 130;

export default function FaqSidebar() {
  const [activeId, setActiveId] = useState(faqItems[0]?.id ?? "");

  useEffect(() => {
    const updateActive = () => {
      const hash = window.location.hash.slice(1);
      if (hash && faqItems.some((item) => item.id === hash)) {
        setActiveId(hash);
        return;
      }

      let current = faqItems[0]?.id ?? "";

      for (const item of faqItems) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= SCROLL_OFFSET) {
          current = item.id;
        }
      }

      setActiveId(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("hashchange", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("hashchange", updateActive);
    };
  }, []);

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <nav className="luxury-card p-4 md:p-5">
        <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.25em] text-label">Teme</p>
        <ul className="space-y-1">
          {faqItems.map((item) => {
            const isActive = activeId === item.id;

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={[
                    "block rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-accent/10 text-accent ring-1 ring-accent/30"
                      : "text-body hover:bg-accent/5 hover:text-accent",
                  ].join(" ")}
                >
                  {item.shortTitle}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
