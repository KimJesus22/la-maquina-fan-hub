import { cn } from "@/lib/cn";
import type { Match } from "@/lib/types";

/* ── Resultado helpers ─────────────────────────────────── */

interface MatchResult {
  className: string;
  label: string;
}

function getMatchResult(match: Match, time: string): MatchResult {
  if (match.estatus === "en_curso") {
    return { className: "bg-blue-500/20 text-blue-300 animate-pulse", label: "EN VIVO" };
  }

  if (match.estatus !== "finalizado") {
    return { className: "bg-zinc-700/50 text-zinc-300", label: time };
  }

  const isCruzAzulLocal = match.equipo_local === "Cruz Azul";
  const cruzAzulGoals = isCruzAzulLocal ? match.goles_local : match.goles_visitante;
  const opponentGoals = isCruzAzulLocal ? match.goles_visitante : match.goles_local;
  const scoreLabel = `${match.goles_local} - ${match.goles_visitante}`;

  if (cruzAzulGoals > opponentGoals) {
    return { className: "bg-emerald-500/20 text-emerald-300", label: scoreLabel };
  }
  if (cruzAzulGoals < opponentGoals) {
    return { className: "bg-red-500/20 text-red-300", label: scoreLabel };
  }
  return { className: "bg-amber-500/20 text-amber-300", label: scoreLabel };
}

/* ── Componente ────────────────────────────────────────── */

interface MatchTimelineProps {
  matches: Match[];
}

export default function MatchTimeline({ matches }: MatchTimelineProps) {
  if (matches.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-zinc-500">
        No hay partidos para mostrar.
      </p>
    );
  }

  return (
    <div className="relative space-y-4" id="match-timeline">
      {/* Línea vertical */}
      <div className="absolute bottom-0 left-6 top-0 w-px bg-gradient-to-b from-blue-500/40 via-blue-500/20 to-transparent" />

      {matches.map((match, i) => {
        const isCruzAzulLocal = match.equipo_local === "Cruz Azul";
        const isFinished = match.estatus === "finalizado";
        const isLive = match.estatus === "en_curso";

        const dateObj = new Date(match.fecha);
        const day = dateObj.toLocaleDateString("es-MX", { day: "numeric", month: "short" });
        const time = dateObj.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });

        const result = getMatchResult(match, time);
        const opponent = isCruzAzulLocal ? match.equipo_visitante : match.equipo_local;
        const venueLabel = isCruzAzulLocal ? "Local" : "Visitante";

        return (
          <div
            key={match.id}
            className="group relative flex items-start gap-4 pl-3"
            id={`match-${match.id}`}
          >
            {/* Punto en la línea */}
            <div
              className={cn(
                "relative z-10 mt-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2",
                isFinished && "border-blue-500/50 bg-blue-500/20",
                isLive && "border-blue-400 bg-blue-500/40",
                !isFinished && !isLive && "border-zinc-600 bg-zinc-800"
              )}
            >
              <span className="text-[0.6rem] font-bold text-zinc-300">
                J{match.jornada ?? i + 1}
              </span>
            </div>

            {/* Card */}
            <div
              className={cn(
                "flex-1 rounded-xl border border-white/[0.06] bg-zinc-900/60 p-4",
                "transition-all duration-200 hover:border-blue-500/20 hover:bg-zinc-900/80"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="truncate text-sm font-semibold text-white">
                      vs {opponent}
                    </h4>
                    <span className="shrink-0 rounded-md bg-zinc-800 px-1.5 py-0.5 text-[0.6rem] font-medium text-zinc-400">
                      {venueLabel}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-zinc-500">{day}</p>
                </div>

                {/* Resultado / Hora */}
                <span
                  className={cn(
                    "shrink-0 rounded-lg px-3 py-1.5 text-sm font-bold",
                    result.className
                  )}
                >
                  {result.label}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
