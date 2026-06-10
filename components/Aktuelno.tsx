import { CalendarDays, CreditCard, Glasses, Percent } from "lucide-react";
import Reveal from "@/components/effects/Reveal";
import SectionHeading from "@/components/SectionHeading";

const paymentOptions = [
  "Odloženo do 3 meseca čekovima građana, u zavisnosti od sume.",
  "Odloženo do 6 meseci preko administrativne zabrane za penzionere i zaposlene u javnom sektoru, u zavisnosti od sume.",
];

export default function Aktuelno() {
  return (
    <section
      id="aktuelno"
      className="bg-[#f5f5f5] bg-[radial-gradient(circle_at_15%_30%,var(--color-brand-soft),transparent_42%)] py-20 md:py-44"
    >
      <div className="container mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
          <SectionHeading
            eyebrow="02 · Aktuelno"
            title="Essilor Varilux"
            muted="progresivi."
          />

          <Reveal delay={0.12}>
            <article className="relative overflow-hidden rounded-[2rem] border border-accent/30 bg-white/80 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.07)] md:p-10">
              <div className="absolute -right-8 -top-12 font-serif text-[180px] italic leading-none text-neutral-950/[0.035]">
                %
              </div>

              <div className="relative z-10">
                <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                  <Percent size={16} strokeWidth={1.8} />
                  Aktuelna ponuda
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-black/10 bg-white/75 p-6">
                    <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-accent">
                      <Glasses size={22} strokeWidth={1.7} />
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-950/45">
                      Essilor Varilux progresivi
                    </p>
                    <h3 className="mt-4 font-serif text-3xl italic leading-tight tracking-[-0.04em] text-neutral-950 md:text-5xl">
                      Platiš 1 par, dobiješ 2 para.
                    </h3>
                  </div>

                  <div className="rounded-3xl border border-black/10 bg-white/75 p-6">
                    <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-accent">
                      <CalendarDays size={22} strokeWidth={1.7} />
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-950/45">
                      Trajanje popusta
                    </p>
                    <p className="mt-4 font-serif text-3xl italic leading-tight tracking-[-0.04em] text-neutral-950 md:text-5xl">
                      Do isteka zaliha.
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-3xl border border-black/10 bg-white/75 p-6 md:p-7">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start">
                    <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <CreditCard size={22} strokeWidth={1.7} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                        Mogućnost plaćanja na rate
                      </p>
                      <div className="mt-5 grid gap-3 text-base leading-7 text-neutral-950/70 md:grid-cols-2">
                        {paymentOptions.map((option) => (
                          <p key={option} className="rounded-2xl bg-black/[0.04] p-4">
                            {option}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="#kontakt"
                  className="mt-8 inline-flex rounded-full border border-accent/50 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-accent transition-colors hover:bg-accent hover:text-black"
                >
                  Kontakt za ponudu
                </a>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
