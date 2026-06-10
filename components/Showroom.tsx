import Reveal from "@/components/effects/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ShowroomViewerLoader from "@/components/ShowroomViewerLoader";

export default function Showroom() {
  return (
    <section className="bg-[#f5f5f5] py-20 md:py-44">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <SectionHeading
            eyebrow="04 · Izbliza"
            title="Zavrtite ih."
            muted="Kao u radnji."
          />

          <Reveal delay={0.12}>
            <div className="relative h-[52vh] min-h-[320px] overflow-hidden rounded-2xl border border-black/10 bg-[#f5f5f5] md:h-[60vh] md:min-h-[420px]">
              <div className="absolute left-4 top-4 z-10 rounded-full border border-black/10 bg-white/55 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.24em] text-neutral-950/60 backdrop-blur-md md:left-5 md:top-5 md:px-4 md:text-[10px] md:tracking-[0.3em]">
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
