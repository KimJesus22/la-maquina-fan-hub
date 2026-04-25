import type { Match } from "@/types";
import { cn } from "@/lib/cn";

export default function MatchTimelineItem({ match }: { match: Match }) {
  // Determinamos el rol de Cruz Azul en el partido
  const isCruzAzulLocal = match.equipo_local.toLowerCase().includes("cruz azul");
  const isFinished = match.estatus === "finalizado";

  // Formateamos la fecha al estilo: "sáb, 21 oct - 19:00"
  const dateObj = new Date(match.fecha);
  const formattedDate = new Intl.DateTimeFormat("es-MX", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(dateObj)
    .replace(".", ""); // Remueve posibles puntos de abreviación

  return (
    <article
      className={cn(
        "relative border border-outline-variant rounded-lg p-element-gap transition-colors shadow-none",
        isFinished ? "bg-surface-container-low opacity-80" : "bg-surface-container-lowest"
      )}
    >
      {/* Timeline Dot (Rojo para local a futuro, Gris suave para visitante, Gris oscuro si finalizó) */}
      <div
        className={cn(
          "absolute -left-[35px] md:-left-[51px] top-6 w-4 h-4 rounded-full border-4 border-surface-container-lowest z-10",
          isFinished ? "bg-outline" : isCruzAzulLocal ? "bg-tertiary" : "bg-outline-variant"
        )}
      ></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-element-gap">
        <div className="flex-1 w-full">
          {/* Etiquetas */}
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="font-label-md text-label-md text-on-surface-variant bg-surface-container px-2 py-1 rounded capitalize">
              {formattedDate}
            </span>
            <span
              className={cn(
                "font-label-md text-label-md px-2 py-1 rounded",
                isCruzAzulLocal
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-lowest text-primary border border-primary"
              )}
            >
              {isCruzAzulLocal ? "Local" : "Visitante"}
            </span>
            {isFinished && (
              <span className="font-label-md text-label-md text-outline border border-outline px-2 py-1 rounded">
                Finalizado
              </span>
            )}
          </div>

          {/* Equipos */}
          <div className="flex items-center justify-start gap-4">
            {/* Local */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center border border-surface-variant overflow-hidden">
                <span className="material-symbols-outlined text-2xl text-slate-400">
                  sports_soccer
                </span>
              </div>
              <span
                className={cn(
                  "font-label-md text-label-md mt-2",
                  isCruzAzulLocal ? "text-primary" : "text-on-surface"
                )}
              >
                {match.equipo_local}
              </span>
            </div>

            {/* Score o VS */}
            {isFinished ? (
              <div className="flex flex-col items-center px-4">
                <span className="font-stat-lg text-stat-lg text-on-surface">
                  {match.goles_local} - {match.goles_visitante}
                </span>
              </div>
            ) : (
              <span className="font-headline-md text-headline-md text-outline-variant px-4">
                VS
              </span>
            )}

            {/* Visitante */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center border border-surface-variant overflow-hidden">
                <span className="material-symbols-outlined text-2xl text-slate-400">
                  sports_soccer
                </span>
              </div>
              <span
                className={cn(
                  "font-label-md text-label-md mt-2",
                  !isCruzAzulLocal ? "text-primary" : "text-on-surface"
                )}
              >
                {match.equipo_visitante}
              </span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="w-full md:w-auto flex justify-end mt-4 md:mt-0">
          {isFinished ? (
            <button className="w-full md:w-auto bg-surface-container-lowest text-primary border border-primary font-label-md text-label-md px-6 py-3 rounded-lg hover:bg-surface-container transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">play_circle</span>
              Ver Resumen
            </button>
          ) : isCruzAzulLocal ? (
            <button className="w-full md:w-auto bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg hover:border-r-2 hover:border-r-tertiary transition-all">
              Comprar Boletos
            </button>
          ) : (
            <button className="w-full md:w-auto bg-surface-container-lowest text-primary border border-primary font-label-md text-label-md px-6 py-3 rounded-lg hover:bg-surface-container transition-all">
              Información
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
