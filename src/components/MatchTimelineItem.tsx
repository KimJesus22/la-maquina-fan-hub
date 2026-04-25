import Image from "next/image";
import type { Match } from "@/types";
import { cn } from "@/lib/cn";

/* ── Mapa de escudos oficiales (Wikimedia SVG) ──────────── */

const CREST_MAP: Record<string, string> = {
  "Cruz Azul":
    "https://scontent.fbjx1-1.fna.fbcdn.net/v/t39.30808-6/571369455_1370776874413739_8912045498660818695_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=1&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=Kr3WTWq3l0oQ7kNvwEGzAr1&_nc_oc=AdrnVaJbo0VEDQnLIpJDbbADf9q4YP9BKwBjgQs27xMMM7sm5NUXXZSY39-8HfvGEzM&_nc_zt=23&_nc_ht=scontent.fbjx1-1.fna&_nc_gid=7q9qB0Ak6MoubBv7R93fbg&_nc_ss=7b2a8&oh=00_Af3f9VmTHW5tAl4DwK2cKX204-doZ_swsDisvZQhxUed8w&oe=69F210D3",
  Monterrey:
    "https://scontent.fbjx1-1.fna.fbcdn.net/v/t39.30808-6/574368496_1353105809543081_3362316597560996232_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=LnbsL6XNOyMQ7kNvwHzr_yl&_nc_oc=AdrjGpsY0qKlEO7IM-wj7VnU0OWWYCspx1TOpZxGTKNJdErkJUkyODUxqQLxW4njulA&_nc_zt=23&_nc_ht=scontent.fbjx1-1.fna&_nc_gid=ejcYorFJhF-4H1WgIrhy4g&_nc_ss=7b2a8&oh=00_Af06U8VgQ5vsOs2Kd458ek38vQHeQMb7eFzhK_6MgjW4fQ&oe=69F22495",
  Guadalajara:
    "https://scontent.fbjx1-3.fna.fbcdn.net/v/t39.30808-6/612842911_1433531751477498_3799906550598248999_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=b0mWwquOUGsQ7kNvwFpJGa_&_nc_oc=Adq4stSJDUwQnbAaSrmgtr66x3Wt0fpc4G-8B_Ewh9sO1FEOLatQQT9hORe2lYXXDXw&_nc_zt=23&_nc_ht=scontent.fbjx1-3.fna&_nc_gid=UxQLW6eT_bAfHgFmjjnYMA&oh=00_Af0mGJeLHPuOspHru4uvvyvQmLEWHb827msGVIUhgzJnSA&oe=69F2193F",
  "Tigres UANL":
    "https://scontent.fbjx1-3.fna.fbcdn.net/v/t39.30808-6/506726816_1260420468778476_8916816679598568069_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=9kfRXa970A8Q7kNvwFNXEXn&_nc_oc=AdoGqbpnU7a2zMXyv02cLdbaT6xQqaQg_NX3ycznkpAO6lOa32zilvYjQwlhEDsAGSE&_nc_zt=23&_nc_ht=scontent.fbjx1-3.fna&_nc_gid=k4U4ZxL6onwbqC1_HfuX1A&oh=00_Af2arFvRAV6XK-Oghx1YLhp9cwIu4LLylM2_PW_-zXgdYA&oe=69F1FD05",
  "Santos Laguna":
    "https://scontent.fbjx1-3.fna.fbcdn.net/v/t39.30808-6/514364899_1561309162026521_2973734745223616602_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=8IkLh1JOQvQQ7kNvwGtzcc4&_nc_oc=Adpt8YFR_t1e76-ak6Y1GPem1_d1vQsDe14FYUCMbERJ70kA4NzqDKj1qLgmb7idY8c&_nc_zt=23&_nc_ht=scontent.fbjx1-3.fna&_nc_gid=wSYLOq3U11nKfy-mokvGQw&_nc_ss=7b2a8&oh=00_Af2LR6MIhr_cDqexxsDz24JQkMoETZnQvc58XCEO9aFlcQ&oe=69F21E1F",
  Toluca:
    "https://scontent.fbjx1-1.fna.fbcdn.net/v/t39.30808-6/600987178_1382658760107580_4905220894174587811_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=JMesmGf1BgoQ7kNvwE6tG7W&_nc_oc=AdqneQvtc6ylvguVfFThWqLDPysX6Ol3CUjg3JC59SyStEooicvnxYYcb7J_P6ZfX2I&_nc_zt=23&_nc_ht=scontent.fbjx1-1.fna&_nc_gid=daYDqUuzo1_uXd2EgSY5qQ&_nc_ss=7b2a8&oh=00_Af0JReC7vemO4BQNZ4iFGkWZ-_xIUOElY1u4RhNumTocfA&oe=69F1F73C",
  "Pumas UNAM":
    "https://scontent.fbjx1-1.fna.fbcdn.net/v/t39.30808-6/659138790_1528625728628300_3233544013898695550_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=Ns939i2Ti88Q7kNvwFLZlO9&_nc_oc=Adp7F9FrzXMQ9hU6UQDdPeNNwzcT5b5aL73UfIfwiscPZrb8D0fXdSTO7paGE9TbOpY&_nc_zt=23&_nc_ht=scontent.fbjx1-1.fna&_nc_gid=jrX4hjpl-SfRbke3HLXFbg&oh=00_Af3hemjh4BAfkokC2ORyRuijGJeWMiHfa4pi27ZDvEKPiQ&oe=69F21850",
};

/** Busca la URL del escudo normalizando el nombre del equipo. */
function getCrestUrl(teamName: string): string | null {
  // Búsqueda directa
  if (CREST_MAP[teamName]) return CREST_MAP[teamName];

  // Búsqueda flexible (contiene)
  const lower = teamName.toLowerCase();
  for (const [key, url] of Object.entries(CREST_MAP)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return url;
    }
  }
  return null;
}

/* ── Componente de Escudo ───────────────────────────────── */

function TeamCrest({ teamName }: { teamName: string }) {
  const crestUrl = getCrestUrl(teamName);

  if (!crestUrl) {
    // Fallback: ícono genérico sólo si no hay escudo mapeado
    return (
      <div className="w-16 h-16 rounded-full flex items-center justify-center border border-surface-variant overflow-hidden">
        <span className="material-symbols-outlined text-2xl text-slate-400">
          sports_soccer
        </span>
      </div>
    );
  }

  return (
    <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden">
      <Image
        src={crestUrl}
        alt={`Escudo de ${teamName}`}
        width={48}
        height={48}
        className="w-12 h-12 object-contain bg-transparent"
        unoptimized
      />
    </div>
  );
}

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
              <TeamCrest teamName={match.equipo_local} />
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
              <TeamCrest teamName={match.equipo_visitante} />
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
