import Reveal from "@/components/effects/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ShowroomViewerLoader from "@/components/ShowroomViewerLoader";

export default function Showroom() {
  return (
    <section className="bg-background py-28 md:py-44">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <SectionHeading
            eyebrow="04 · Izbliza"
            title="Zavrtite ih."
            muted="Kao u radnji."
          />

          <Reveal delay={0.12}>
            <div className="relative h-[60vh] min-h-[420px] overflow-hidden rounded-2xl border border-black/10 bg-[#f5f5f5]">
              <div className="absolute left-5 top-5 z-10 rounded-full border border-black/10 bg-white/55 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-950/60 backdrop-blur-md">
                PREVUCITE ZA ROTACIJU
              </div>
              <ShowroomViewerLoader />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
