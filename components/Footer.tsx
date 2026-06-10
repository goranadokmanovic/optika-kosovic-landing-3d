import { Globe } from "lucide-react";

const links = [
  { label: "Usluge", href: "#usluge" },
  { label: "Brendovi", href: "#brendovi" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-white/10 bg-brand-deep">
      <div
        aria-hidden="true"
        className="bg-gradient-to-b from-white/8 to-white/[0.02] bg-clip-text px-4 pt-10 text-center font-serif text-[14vw] italic leading-none tracking-[-0.05em] text-transparent"
      >
        KOSOVIĆ
      </div>

      <div className="container mx-auto flex max-w-[1400px] flex-col gap-10 px-6 pb-10 pt-6 md:px-12 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="font-serif text-3xl italic tracking-[-0.04em]">
            Optika Kosović
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            Novi Banovci
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-accent"
          >
            <Globe size={14} />
            Facebook
          </a>
        </div>
      </div>

      <div className="container mx-auto flex max-w-[1400px] flex-col gap-3 border-t border-white/10 px-6 py-5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/35 md:flex-row md:items-center md:justify-between md:px-12">
        <span>© 2026 Optika Kosović · Sva prava zadržana</span>
        <span>Sajt: MyNestOf4</span>
      </div>
    </footer>
  );
}
