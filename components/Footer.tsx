export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#f5f5f5]">
      <div className="container mx-auto grid max-w-[1200px] gap-10 px-6 py-12 text-center text-accent md:grid-cols-2 md:px-12">
        <div className="space-y-4 text-base font-semibold md:text-lg">
          <a href="tel:+381123456789" className="block transition-colors hover:text-neutral-950">
            +381 12 345 6789
          </a>
          <a
            href="mailto:kontakt@primer-optika.rs"
            className="block transition-colors hover:text-neutral-950"
          >
            kontakt@primer-optika.rs
          </a>
          <div>Grad Primer</div>
          <div>PIB: 000000000</div>
        </div>

        <div className="flex flex-col items-center justify-center gap-6">
          <div className="text-base font-semibold md:text-lg">
            Posetite nas i na društvenoj mreži
          </div>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1455d9] text-4xl font-bold leading-none text-white transition-transform hover:-translate-y-1"
          >
            f
          </a>
          <div className="text-sm font-semibold">
            Copyright © 2023 | Sva prava zadržana
          </div>
        </div>
      </div>
    </footer>
  );
}
