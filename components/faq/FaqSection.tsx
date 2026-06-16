import Image from "next/image";
import { ReactNode } from "react";

export function FaqSection({
  id,
  title,
  children,
  image,
  imageAlt,
  imageCaption,
}: {
  id: string;
  title: string;
  children: ReactNode;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-charcoal/10 py-14 md:py-20">
      <h2 className="font-serif text-3xl italic leading-tight tracking-[-0.03em] text-accent md:text-5xl">
        {title}
      </h2>
      <div className="mt-8 space-y-6 text-base leading-8 text-body md:text-lg">{children}</div>
      {image ? (
        <figure className="luxury-card mt-10 overflow-hidden">
          <Image
            src={image}
            alt={imageAlt ?? title}
            width={1200}
            height={800}
            className="h-auto w-full object-contain"
          />
          {imageCaption ? (
            <figcaption className="border-t border-charcoal/10 px-5 py-4 text-sm text-body/65">{imageCaption}</figcaption>
          ) : null}
        </figure>
      ) : null}
    </section>
  );
}

export function FaqSubheading({ children }: { children: ReactNode }) {
  return <h3 className="text-xl font-semibold text-accent md:text-2xl">{children}</h3>;
}

export function FaqList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function FaqQa({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="luxury-card p-5 md:p-6">
      <p className="font-semibold text-charcoal">{question}</p>
      <p className="mt-3 text-body">{answer}</p>
    </div>
  );
}

export function FaqNote({ children, variant = "default" }: { children: ReactNode; variant?: "default" | "warning" | "danger" }) {
  const styles =
    variant === "danger"
      ? "border-red-500/30 bg-red-500/10 text-red-700"
      : variant === "warning"
        ? "border-accent/30 bg-accent/10 text-accent"
        : "border-charcoal/10 bg-white/75 text-body";

  return <p className={`rounded-xl border px-4 py-3 text-sm md:text-base ${styles}`}>{children}</p>;
}
