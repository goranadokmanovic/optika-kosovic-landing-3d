import type { Metadata } from "next";
import Link from "next/link";
import FaqContent from "@/components/faq/FaqContent";
import FaqSidebar from "@/components/faq/FaqSidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
export const metadata: Metadata = {
  title: "Česta pitanja — Optika Kosović",
  description:
    "Odgovori na najčešća pitanja o naočarima, staklima, kratkovidosti, katarakti, prizmama i pravilnom održavanju naočara.",
};

export default function CestaPitanjaPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] bg-[radial-gradient(circle_at_15%_30%,var(--color-brand-soft),transparent_42%)] text-neutral-950 selection:bg-accent/30">
      <Header solid />
      <div className="container mx-auto max-w-[1400px] px-6 pb-20 pt-28 md:px-12 md:pt-36">
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-accent md:text-[10px] md:tracking-[0.3em]">
              Informacije
            </span>
            <div className="h-px max-w-[180px] flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
          </div>
          <h1 className="font-serif text-4xl italic leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-7xl">
            Česta
            <span className="block text-neutral-950/40">pitanja</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-950/70 md:text-lg">
            Odgovori na pitanja koja nam klijenti najčešće postavljaju — od pravilnog korišćenja naočara do izbora
            kvalitetnih stakala i zdravlja očiju.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full border border-accent/50 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-accent transition-colors hover:bg-accent hover:text-black"
          >
            Nazad na početnu
          </Link>
        </div>

        <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
          <FaqSidebar />

          <div className="min-w-0">
            <FaqContent />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
