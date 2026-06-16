export default function SiteBackground() {
  return (
    <div aria-hidden="true" className="site-background pointer-events-none fixed inset-0 z-0">
      <picture>
        <source srcSet="/pozadina.webp" type="image/webp" />
        <img
          src="/pozadina.png"
          alt=""
          className="h-full w-full object-cover opacity-20"
        />
      </picture>
    </div>
  );
}
