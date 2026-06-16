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
    <section className="luxury-section bg-luxury-cream py-20 md:py-44">
      <div className="container mx-auto grid max-w-[1400px] gap-12 px-6 md:px-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading eyebrow="05 · Stakla" title="Teško čistite" muted="stakla?" />
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-xl text-base leading-8 text-body md:text-lg">
              Crizal stakla imaju specijalni premaz koji odbija prašinu, vodu i otiske
              prstiju. Idealna su za sve kojima je čišćenje naočara svakodnevna borba.
              Dostupna u Optici Kosović, uz stručnu preporuku za vašu dioptriju.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <div className="luxury-card p-6 md:p-8">
            <div className="space-y-4">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="flex items-center gap-4 border border-charcoal/10 bg-white/80 p-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-accent/10 text-accent">
                      <Icon size={20} strokeWidth={1.7} />
                    </div>
                    <div className="font-serif text-xl italic tracking-[-0.03em] md:text-2xl">{feature.title}</div>
                  </div>
                );
              })}
            </div>
            <a
              href="#kontakt"
              className="luxury-btn mt-8 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em]"
            >
              Pitajte nas o Crizal staklima
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
