export default function Footer() {
  return (
    <footer className="border-t border-charcoal/10 bg-luxury-cream">
      <div className="container mx-auto grid max-w-[1200px] gap-10 px-6 py-12 text-center text-accent md:grid-cols-2 md:px-12">
        <div className="space-y-4 text-base font-semibold text-body md:text-lg">
          <a href="tel:+381123456789" className="block transition-colors hover:text-accent">
            +381 12 345 6789
          </a>
          <a
            href="mailto:kontakt@primer-optika.rs"
            className="block transition-colors hover:text-accent"
          >
            kontakt@primer-optika.rs
          </a>
          <div>Grad Primer</div>
          <div>PIB: 000000000</div>
        </div>

        <div className="flex flex-col items-center justify-center gap-6">
          <div className="text-base font-semibold text-charcoal md:text-lg">
            Posetite nas i na društvenoj mreži
          </div>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="flex h-12 w-12 items-center justify-center bg-accent text-4xl font-bold leading-none text-white transition-transform hover:-translate-y-1"
          >
            f
          </a>
          <div className="text-sm font-semibold text-body/65">
            Copyright © 2023 | Sva prava zadržana
          </div>
        </div>
      </div>
    </footer>
  );
}
