import Image from "next/image";
import Link from "next/link";

export default function NewsGrid() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-6 max-w-container-max mx-auto">
      <div className="flex justify-between items-end mb-gutter">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-primary font-lexend font-bold">
            Últimas Noticias
          </h2>
          <p className="font-body-md text-body-md text-secondary mt-unit">
            Mantente al día con La Máquina.
          </p>
        </div>
        <Link
          href="#"
          className="font-label-md text-label-md text-primary hover:text-tertiary transition-colors items-center gap-1 hidden md:flex"
        >
          Ver todo{" "}
          <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">
            arrow_forward
          </span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-element-gap">
        {/* Featured News Card (Takes up 2 columns on desktop) */}
        <div className="md:col-span-2 group relative overflow-hidden rounded-xl border border-primary/10 dark:border-slate-800 shadow-sm hover:shadow-[0_8px_30px_rgba(0,48,99,0.12)] transition-all duration-300 bg-surface-container-lowest dark:bg-slate-900 flex flex-col justify-end min-h-[400px]">
          <Image
            alt="Professional soccer player in blue uniform kicking a soccer ball dynamically on a green grass field during a match"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcYitcJfUXEEXQaOGPB9hGrXpK5QK4-3qCgzEik1DNn_X3RXWrF0nowwq1VZkBcQmuFond9GLKTfSp7Z8_QjEzafnodjSl4bu50oL8-BD9_y_GSy2foCVEMKh9AfAibnZeqalE_NXMDPoU3LpmqNPNV4IORfam8tuwTnXAtfFOMItZK9jsnxTyilIRu56xjHR7O4TqnG9vqjjjdEaH58J4u4pYoAtfjE5b4CY8dwmT0amMZQTSP4AFzBLMPSNLYgIpjkJENI3crxHc"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 p-gutter">
            <span className="inline-block bg-tertiary text-on-tertiary font-label-md text-label-md px-2 py-1 rounded text-xs mb-3">
              PRIMER EQUIPO
            </span>
            <h3 className="font-headline-lg text-headline-lg text-on-primary mb-2 group-hover:text-primary-fixed-dim transition-colors font-lexend font-bold">
              Preparación intensa de cara al Clásico Joven
            </h3>
            <p className="font-body-md text-body-md text-inverse-on-surface line-clamp-2">
              El equipo entrenó a doble sesión en La Noria, enfocados en conseguir los tres puntos
              este fin de semana en el Estadio Azteca.
            </p>
            <div className="mt-4 flex items-center gap-2 text-primary-fixed-dim font-label-md text-label-md text-xs">
              <span className="material-symbols-outlined text-[16px]" data-icon="schedule">
                schedule
              </span>{" "}
              Hace 2 horas
            </div>
          </div>
        </div>
        {/* Secondary News Card 1 */}
        <div className="group relative overflow-hidden rounded-xl border border-primary/10 dark:border-slate-800 shadow-sm hover:shadow-[0_8px_30px_rgba(0,48,99,0.12)] transition-all duration-300 bg-surface-container-lowest dark:bg-slate-900 flex flex-col h-full">
          <div className="h-48 overflow-hidden relative">
            <Image
              alt="Crowd of cheering sports fans in stadium seating holding scarves up in the air with dramatic lighting"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEDUlqS-UN_wPNJdjcrs-SY09YktysDknVlvqD4-bivNK6ubOl7K96CI05ZhrKnTYHIU9tbsKAYlaypWO6_xylx97xwNFoiAUgBkQ-6uYeYV9okI1k_6o8bLea7Ggm6yXDCPbUe0D92-bONF9u7NliMOC6QgAl-g0BGTfMj_iFv9LneNA5IZJhwxWHzyAi5Dze6BaM6j8XPWsdxQTL5ZHLXkdHMGyqjaXS0faFTxkhBWmdv2HES-3Y9n71lt2iZZFaez2UchvrkNLj"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-primary-container text-on-primary-container font-label-md text-label-md px-2 py-1 rounded text-[10px]">
                AFICIÓN
              </span>
            </div>
          </div>
          <div className="p-gutter flex flex-col flex-grow relative z-10 bg-white dark:bg-slate-900 transition-colors duration-300">
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-slate-100 mb-2 group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors font-lexend font-semibold">
              Venta de boletos exclusiva para Abonados
            </h3>
            <p className="font-body-md text-body-md text-secondary dark:text-slate-400 line-clamp-3 mb-4 flex-grow transition-colors duration-300">
              Inicia la preventa especial para el próximo partido como local. Conoce los horarios y
              zonas disponibles.
            </p>
            <div className="flex items-center gap-2 text-outline font-label-md text-label-md text-xs mt-auto">
              <span className="material-symbols-outlined text-[16px]" data-icon="schedule">
                schedule
              </span>{" "}
              Hace 5 horas
            </div>
          </div>
        </div>
      </div>
      <Link
        href="#"
        className="font-label-md text-label-md text-primary flex items-center justify-center mt-element-gap gap-1 md:hidden py-3 border border-primary/20 rounded"
      >
        Ver todas las noticias{" "}
        <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">
          arrow_forward
        </span>
      </Link>
    </section>
  );
}
