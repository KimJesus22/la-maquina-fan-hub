"use server";

import { insforge } from "@/lib/insforge";
import type { Player, Match } from "@/types";

/* ── Players ───────────────────────────────────────────── */

export async function getPlayers(): Promise<Player[]> {
  const { data, error } = await insforge.database
    .from("players")
    .select()
    .order("number", { ascending: true });

  if (error) {
    console.error("Error fetching players:", error);
    return [];
  }

  return (data as Player[]) ?? [];
}

export async function getPlayerById(id: number): Promise<Player | null> {
  const { data, error } = await insforge.database
    .from("players")
    .select()
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching player:", error);
    return null;
  }

  return (data as Player) ?? null;
}

/* ── Matches ───────────────────────────────────────────── */

export async function getMatches(): Promise<Match[]> {
  const { data, error } = await insforge.database
    .from("matches")
    .select()
    .order("fecha", { ascending: false });

  if (error) {
    console.error("Error fetching matches:", error);
    return [];
  }

  return (data as Match[]) ?? [];
}

export async function getUpcomingMatches(): Promise<Match[]> {
  const { data, error } = await insforge.database
    .from("matches")
    .select()
    .eq("estatus", "programado")
    .order("fecha", { ascending: true });

  if (error) {
    console.error("Error fetching upcoming matches:", error);
    return [];
  }

  return (data as Match[]) ?? [];
}

export async function getFinishedMatches(): Promise<Match[]> {
  const { data, error } = await insforge.database
    .from("matches")
    .select()
    .eq("estatus", "finalizado")
    .order("fecha", { ascending: false });

  if (error) {
    console.error("Error fetching finished matches:", error);
    return [];
  }

  return (data as Match[]) ?? [];
}
