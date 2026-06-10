import { Eye, Glasses, Wrench } from "lucide-react";
import Counter from "@/components/effects/Counter";
import Reveal from "@/components/effects/Reveal";
import SectionHeading from "@/components/SectionHeading";

const stats = [
  {
    icon: Eye,
    label: "Besplatna provera dioptrije",
    value: <Counter to={100} suffix="%" />,
  },
  {
    icon: Glasses,
    label: "Modela okvira",
    // TODO: potvrditi broj modela okvira sa vlasnikom
    value: <Counter to={300} suffix="+" />,
  },
  {
    icon: Wrench,
    label: "Servis i sitne popravke",
    value: "Na licu mesta",
  },
];

export default function VisionIntro() {
  return (
    <section className="bg-background bg-[radial-gradient(circle_at_85%_15%,var(--color-brand-soft),transparent_45%)] py-28 md:py-44">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <SectionHeading eyebrow="01 · Dobrodošli" title="Vidite svet" muted="jasnije." />
          <Reveal delay={0.12}>
            <p className="max-w-2xl text-lg leading-8 text-text-secondary md:text-xl">
              Dioptrijske naočare, kontaktna sočiva, provera dioptrije i servis — sve na
              jednom mestu u Novim Banovcima. Stručan pristup, kvalitetni materijali i
              cene koje ne zamagljuju pogled.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <Reveal key={stat.label} delay={index * 0.08}>
                <div className="rounded-2xl border border-brand/25 bg-[#121212] p-6">
                  <div className="mb-8 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-soft text-accent">
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                    {stat.label}
                  </div>
                  <div className="mt-3 font-serif text-4xl italic tracking-[-0.04em] text-white">
                    {stat.value}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
