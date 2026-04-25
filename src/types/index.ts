/* ── Interfaces de la base de datos InsForge ────────────── */

export interface Player {
  id: number;
  name: string;
  number: number;
  position: string;
  goals: number;
  assists: number;
  matches_played: number;
  image_url: string | null;
  created_at: string;
}

export interface Match {
  id: number;
  equipo_local: string;
  equipo_visitante: string;
  goles_local: number;
  goles_visitante: number;
  fecha: string;
  estatus: "programado" | "en_curso" | "finalizado";
  jornada: number | null;
  created_at: string;
}
