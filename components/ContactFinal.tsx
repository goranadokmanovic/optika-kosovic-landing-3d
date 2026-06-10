import { Mail, MapPin, Phone } from "lucide-react";
import Reveal from "@/components/effects/Reveal";
import SectionHeading from "@/components/SectionHeading";

const contacts = [
  {
    icon: MapPin,
    label: "Posetite nas",
    value: "Ulica Viziona 12",
    sub: "Grad Primer",
  },
  {
    icon: Phone,
    label: "Pozovite",
    value: "012 345 6789",
    sub: "Besplatan savet",
  },
  {
    icon: Mail,
    label: "Pišite nam",
    value: "kontakt@primer-optika.rs",
    sub: "Odgovaramo brzo",
  },
];

export default function ContactFinal() {
  return (
    <section id="kontakt" className="bg-[#f5f5f5] py-20 md:py-44">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeading eyebrow="07 · Kontakt" title="Zakažite" muted="proveru dioptrije." />

        <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            {contacts.map((contact, index) => {
              const Icon = contact.icon;

              return (
                <Reveal key={contact.label} delay={index * 0.08}>
                  <div className="flex items-center gap-4 rounded-3xl border border-black/10 bg-white/80 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.05)] md:gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-black">
                      <Icon size={20} strokeWidth={1.7} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-950/45">
                        {contact.label}
                      </div>
                      <div className="mt-1 break-words font-serif text-2xl italic tracking-[-0.04em] md:text-3xl">
                        {contact.value}
                      </div>
                      <div className="mt-1 text-sm text-neutral-950/45">{contact.sub}</div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.16}>
            <div className="h-[320px] overflow-hidden rounded-2xl border border-black/10 bg-white/80 shadow-[0_18px_60px_rgba(0,0,0,0.05)] md:h-[420px]">
              <iframe
                title="Mapa — primer lokacije"
                src="https://www.google.com/maps?q=Ulica+Viziona+12%2C+Grad+Primer&output=embed"
                className="h-full w-full grayscale invert"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.22}>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-950/45">
            PON–PET 10–18 · SUB 10–14
          </p>
        </Reveal>
      </div>
    </section>
  );
}
