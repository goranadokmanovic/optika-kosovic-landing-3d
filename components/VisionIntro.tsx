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
    <section id="dobrodosli" className="luxury-section bg-luxury-cream py-20 md:py-44">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <SectionHeading eyebrow="01 · Dobrodošli" title="Vidite svet" muted="jasnije." />
          <Reveal delay={0.12}>
            <p className="max-w-2xl text-lg leading-8 text-body md:text-xl">
              Dioptrijske naočare, kontaktna sočiva, provera dioptrije i servis — sve na
              jednom mestu u Novim Banovcima. Stručan pristup, kvalitetni materijali i
              cene koje ne zamagljuju pogled.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <Reveal>
            <div className="luxury-card relative h-full min-h-[260px] overflow-hidden md:min-h-[320px]">
              <Image
                src="/images/o-nama-optika-kosovic.png"
                alt="Optika Kosović radnja u Novim Banovcima"
                width={960}
                height={420}
                className="h-full w-full object-cover opacity-85"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="inline-flex bg-white/75 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-label backdrop-blur-sm">
                  Novi Banovci
                </p>
                <p className="mt-2 rounded-2xl bg-white/75 px-4 py-3 font-serif text-3xl italic tracking-[-0.04em] text-neutral-950 backdrop-blur-sm">
                  Porodična optika sa iskustvom.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="luxury-card flex h-full flex-col justify-center p-6 md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-label">
                O optici Kosović
              </p>
              <div className="mt-6 space-y-5 text-base leading-8 text-body md:text-lg">
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
                <div className="luxury-card p-6">
                  <div className="mb-8 inline-flex h-11 w-11 items-center justify-center bg-brand-soft text-accent">
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-body/65">
                    {stat.label}
                  </div>
                  <div className="mt-3 font-serif text-4xl italic tracking-[-0.04em] text-neutral-950">{stat.value}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
