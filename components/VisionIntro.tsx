import { Eye, Glasses, Wrench } from "lucide-react";
import Image from "next/image";
import Counter from "@/components/effects/Counter";
import Reveal from "@/components/effects/Reveal";
import SectionHeading from "@/components/SectionHeading";

const aboutParagraphs = [
  "Dobrodošli u Optiku Kosović - mesto gde briga o vašem vidu postaje lična. Zavirite u naš prostor i pogledajte kako izgleda moderna optičarska radnja u Novim Banovcima.",
  "Nudimo dioptrijske i sunčane naočare, kontaktna sočiva, proveru dioptrije i servis naočara. Posetite nas već danas.",
  "Mi smo porodično preduzeće i naš tim čine dva optičara-optometriste sa višegodišnjim iskustvom. Vlada je u svetu optike od 2006, a Mira od 2007. godine.",
  "Odlikujemo se preciznom proverom dioptrije, kvalitetno urađenim naočarima, tačnošću i zadovoljnim korisnicima koji nam rado ukazuju poverenje.",
];

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
    <section
      id="dobrodosli"
      className="bg-background bg-[radial-gradient(circle_at_85%_15%,var(--color-brand-soft),transparent_45%)] py-20 md:py-44"
    >
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

        <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <Reveal>
            <div className="relative h-full min-h-[260px] overflow-hidden rounded-[2rem] border border-brand/25 bg-[#121212] md:min-h-[320px]">
              <Image
                src="/images/o-nama-optika-kosovic.png"
                alt="Optika Kosović radnja u Novim Banovcima"
                width={960}
                height={420}
                className="h-full w-full object-cover opacity-85"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  Novi Banovci
                </p>
                <p className="mt-2 font-serif text-3xl italic tracking-[-0.04em] text-white">
                  Porodična optika sa iskustvom.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex h-full flex-col justify-center rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                O optici Kosović
              </p>
              <div className="mt-6 space-y-5 text-base leading-8 text-text-secondary md:text-lg">
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
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
