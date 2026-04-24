import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[819px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          alt="Wide shot of a crowded soccer stadium at night under bright floodlights with passionate fans cheering and waving flags in a sea of blue"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFNIuD_JR32k5nxEiv76ibNV6Zp-0h7-1ahSj0A2qO6zIryx2Fva9n5eR9nrzanm9jpSD3-TZiOvupvYj1pCQcUG9A9XfIJ6B4QoKU9QD4PojFKX_Wlxv_QDiAbEHPc6HqNFyNba2DxFFhe14cbqmGDFPzd0ru_m6vQ8JpP74t2JbEECQHtNYgNihmQZ_E6x5yWcds58jWz2hNpKAGl-YJaGjywEDc32CwKE3OULC9-irlzRYfNFLH-r5ytgfeJMJptCJj1IEgH8bR"
          fill
          className="object-cover object-center opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
      </div>
      <div className="relative z-10 text-center px-margin-mobile md:px-0 max-w-container-max mx-auto flex flex-col items-center gap-gutter">
        <h1 className="font-display-2xl text-display-2xl text-on-primary uppercase tracking-tighter drop-shadow-lg font-lexend font-black">
          La Pasión Nos Une
        </h1>
        <p className="font-body-lg text-body-lg text-inverse-on-surface max-w-2xl mx-auto">
          Bienvenido al portal oficial de La Máquina. Obtén actualizaciones en tiempo real,
          contenido exclusivo y conéctate con millones de aficionados en todo el mundo.
        </p>
        <Link
          href="?auth=login"
          scroll={false}
          className="mt-element-gap bg-on-primary text-primary font-label-md text-label-md px-8 py-4 rounded-lg border-r-4 border-tertiary hover:bg-surface-container-highest transition-all transform hover:-translate-y-1 shadow-lg"
        >
          Únete a la Comunidad
        </Link>
      </div>
    </section>
  );
}
