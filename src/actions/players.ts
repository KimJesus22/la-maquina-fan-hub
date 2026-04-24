"use server";

import { insforge } from "@/lib/insforge";
import type { Player } from "@/lib/types";

/**
 * Obtiene todos los jugadores de la base de datos InsForge.
 * Los datos se ordenan por su posición o dorsal.
 */
export async function getSquadPlayers(): Promise<Player[]> {
  const { data, error } = await insforge.database
    .from("players")
    .select("*")
    .order("number", { ascending: true });

  if (error) {
    console.error("Error fetching squad players:", error);
    return [];
  }

  return data as Player[];
}
