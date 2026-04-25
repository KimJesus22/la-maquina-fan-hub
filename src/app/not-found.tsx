import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 flex flex-col items-center justify-center px-4 relative overflow-hidden transition-colors duration-300">
      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 z-0 bg-primary/5 dark:bg-slate-900/50">
        <div className="absolute inset-0 bg-[radial-gradient(#003063_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] opacity-[0.15] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Ícono de silbato/árbitro */}
        <div className="w-24 h-24 bg-error-container/20 dark:bg-error-container/10 rounded-full flex items-center justify-center mb-6 shadow-sm border border-error/20">
          <span
            className="material-symbols-outlined text-6xl text-error animate-pulse"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            sports
          </span>
        </div>

        {/* Texto principal 404 */}
        <h1 className="font-display-2xl text-[120px] leading-none text-primary dark:text-slate-100 font-lexend font-black drop-shadow-md mb-2">
          404
        </h1>
        <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-white uppercase tracking-wider font-lexend font-bold mb-4">
          ¡Fuera de lugar!
        </h2>
        
        <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-400 mb-8">
          El árbitro ha pitado. La página que buscas no existe o ha sido movida a otro estadio. Regresemos al terreno de juego oficial.
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="bg-primary hover:bg-primary-container text-on-primary font-label-md px-8 py-3 rounded-lg shadow-md transition-all border-b-4 border-tertiary-container hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">home</span>
            Ir al Inicio
          </Link>
          <Link
            href="/"
            className="bg-surface dark:bg-slate-900 hover:bg-surface-container dark:hover:bg-slate-800 text-primary dark:text-slate-300 border border-primary/20 dark:border-slate-700 font-label-md px-8 py-3 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">newspaper</span>
            Últimas Noticias
          </Link>
        </div>
      </div>
    </div>
  );
}
