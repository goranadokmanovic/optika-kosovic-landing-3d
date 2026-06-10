import Aktuelno from "@/components/Aktuelno";
import Brands from "@/components/Brands";
import ContactFinal from "@/components/ContactFinal";
import CrizalBlock from "@/components/CrizalBlock";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroCinematicLoader from "@/components/HeroCinematicLoader";
import Services from "@/components/Services";
import Showroom from "@/components/Showroom";
import SmoothScroll from "@/components/SmoothScroll";
import VisionIntro from "@/components/VisionIntro";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-accent/30">
        <Header />
        <HeroCinematicLoader />
        <VisionIntro />
        <Aktuelno />
        <Services />
        <Showroom />
        <CrizalBlock />
        <Brands />
        <Reviews />
        <ContactFinal />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
