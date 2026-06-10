import { Droplets, Fingerprint, Sparkles } from "lucide-react";
import Reveal from "@/components/effects/Reveal";
import SectionHeading from "@/components/SectionHeading";

const features = [
  {
    icon: Droplets,
    title: "Odbija vodu i prašinu",
  },
  {
    icon: Fingerprint,
    title: "Bez otisaka",
  },
  {
    icon: Sparkles,
    title: "Jasniji pogled, duži vek stakala",
  },
];

export default function CrizalBlock() {
  return (
    <section className="bg-[#f5f5f5] py-20 md:py-44">
      <div className="container mx-auto grid max-w-[1400px] gap-12 px-6 md:px-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading eyebrow="05 · Stakla" title="Teško čistite" muted="stakla?" />
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-xl text-base leading-8 text-neutral-950/70 md:text-lg">
              Crizal stakla imaju specijalni premaz koji odbija prašinu, vodu i otiske
              prstiju. Idealna su za sve kojima je čišćenje naočara svakodnevna borba.
              Dostupna u Optici Kosović, uz stručnu preporuku za vašu dioptriju.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <div className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.06)] md:p-8">
            <div className="space-y-4">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="flex items-center gap-4 rounded-2xl border border-black/10 bg-white/75 p-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Icon size={20} strokeWidth={1.7} />
                    </div>
                    <div className="font-serif text-xl italic tracking-[-0.03em] md:text-2xl">
                      {feature.title}
                    </div>
                  </div>
                );
              })}
            </div>
            <a
              href="#kontakt"
              className="mt-8 inline-flex rounded-full border border-accent/50 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-accent transition-colors hover:bg-accent hover:text-black"
            >
              Pitajte nas o Crizal staklima
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
