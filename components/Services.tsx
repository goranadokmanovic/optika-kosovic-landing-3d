import { Contact, Eye, Glasses, ScanEye, Settings } from "lucide-react";
import Reveal from "@/components/effects/Reveal";
import SectionHeading from "@/components/SectionHeading";

const services = [
  {
    icon: ScanEye,
    title: "Provera dioptrije",
    description:
      "Brza i precizna provera vida uz savremenu opremu. Besplatan savet uz svaku proveru.",
  },
  {
    icon: Glasses,
    title: "Dioptrijske naočare",
    description:
      "Ženski, muški i dečiji okviri za svaki stil i budžet. Izrada po vašoj meri.",
  },
  {
    icon: Eye,
    title: "Dioptrijska stakla",
    description:
      "Essilor plastična stakla sa premazima protiv ogrebotina, odsjaja i prljanja.",
  },
  {
    icon: Contact,
    title: "Kontaktna sočiva",
    description:
      "Saveti za izbor i pravilno korišćenje sočiva, uz proveru dioptrije.",
  },
  {
    icon: Settings,
    title: "Servis naočara",
    description:
      "Zamena vijaka, podešavanje drški, sitne popravke — često dok čekate.",
  },
];

export default function Services() {
  return (
    <section id="usluge" className="bg-background py-28 md:py-44">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeading
          eyebrow="02 · Usluge"
          title="Sve za vaš vid."
          muted="Na jednom mestu."
        />

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal key={service.title} delay={index * 0.07}>
                <article className="group relative min-h-72 overflow-hidden rounded-3xl border border-brand/25 bg-surface p-7">
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="h-full w-full bg-gradient-to-br from-brand-soft via-accent/10 to-transparent" />
                  </div>
                  <div className="relative z-10">
                    <div className="mb-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-accent">
                      <Icon size={21} strokeWidth={1.7} />
                    </div>
                    <h3 className="font-serif text-3xl italic tracking-[-0.04em] text-white">
                      {service.title}
                    </h3>
                    <p className="mt-5 max-w-sm text-base leading-7 text-text-secondary">
                      {service.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
