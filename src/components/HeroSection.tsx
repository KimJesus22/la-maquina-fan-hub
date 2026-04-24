import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[819px] flex items-center justify-center overflow-hidden">
      {/* Fondo Premium y Gradiente */}
      <div className="absolute inset-0 z-0 bg-primary bg-gradient-to-br from-primary via-primary-container to-primary">
        
        {/* Textura Técnica (Malla Deportiva) */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Marca de Agua del Escudo */}
        <img
          alt="Escudo Cruz Azul"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Cruz_Azul_logo_%282022%29.svg"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-5 pointer-events-none"
        />
        
        {/* Sombra inferior para fundirse con la siguiente sección */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 text-center px-margin-mobile md:px-0 max-w-container-max mx-auto flex flex-col items-center gap-gutter">
        <h1 className="font-display-2xl text-display-2xl text-on-primary uppercase tracking-tighter drop-shadow-lg font-lexend font-black">
          La Pasión Nos Une
        </h1>
        <p className="font-body-lg text-body-lg text-inverse-on-surface max-w-2xl mx-auto drop-shadow">
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
