import { Mail, MapPin, Phone } from "lucide-react";
import Reveal from "@/components/effects/Reveal";
import SectionHeading from "@/components/SectionHeading";

const contacts = [
  {
    icon: MapPin,
    label: "Posetite nas",
    value: "Patrijarha Pavla 2",
    sub: "Novi Banovci",
  },
  {
    icon: Phone,
    label: "Pozovite",
    value: "060 686 8054",
    sub: "Besplatan savet",
  },
  {
    icon: Mail,
    label: "Pišite nam",
    value: "optikakosovic@gmail.com",
    sub: "Odgovaramo brzo",
  },
];

export default function ContactFinal() {
  return (
    <section id="kontakt" className="bg-background py-28 md:py-44">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeading eyebrow="07 · Kontakt" title="Zakažite" muted="proveru dioptrije." />

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            {contacts.map((contact, index) => {
              const Icon = contact.icon;

              return (
                <Reveal key={contact.label} delay={index * 0.08}>
                  <div className="flex items-center gap-5 rounded-3xl border border-white/8 bg-surface p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-black">
                      <Icon size={20} strokeWidth={1.7} />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                        {contact.label}
                      </div>
                      <div className="mt-1 font-serif text-3xl italic tracking-[-0.04em]">
                        {contact.value}
                      </div>
                      <div className="mt-1 text-sm text-text-muted">{contact.sub}</div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.16}>
            <div className="h-[420px] overflow-hidden rounded-2xl border border-white/8 bg-surface">
              <iframe
                title="Optika Kosović mapa"
                src="https://www.google.com/maps?q=Optika%20Kosovi%C4%87%2C%20Patrijarha%20Pavla%202%2C%20Novi%20Banovci&output=embed"
                className="h-full w-full grayscale invert"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.22}>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            {/* TODO: potvrditi radno vreme sa vlasnikom */}
            PON–PET 09–20 · SUB 09–15
          </p>
        </Reveal>
      </div>
    </section>
  );
}
