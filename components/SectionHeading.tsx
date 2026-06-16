import Reveal from "@/components/effects/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  muted,
  className = "",
}: {
  eyebrow: string;
  title: string;
  muted: string;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold md:text-[10px]">
          {eyebrow}
        </span>
        <div className="h-px max-w-[180px] flex-1 bg-gradient-to-r from-[#c9a84c]/60 to-transparent" />
      </div>
      <h2 className="font-serif text-4xl italic leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-7xl">
        {title}
        <span className="block text-neutral-950/40">{muted}</span>
      </h2>
    </Reveal>
  );
}
