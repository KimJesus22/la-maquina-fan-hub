"use client";

import { useState } from "react";
import type { Player } from "@/types";
import PlayerCard from "@/components/PlayerCard";
import EmptyState from "@/components/EmptyState";

export default function SquadClient({ players }: { players: Player[] }) {
  const [filter, setFilter] = useState("Todos");

  const filters = ["Todos", "Porteros", "Defensas", "Medios", "Delanteros"];

  // Lógica del cliente para filtrar los jugadores
  const filteredPlayers = players.filter((player) => {
    if (filter === "Todos") return true;

    const pos = player.position.toLowerCase();
    if (filter === "Porteros") return pos.includes("portero") || pos.includes("arquero");
    if (filter === "Defensas")
      return pos.includes("defensa") || pos.includes("lateral") || pos.includes("central");
    if (filter === "Medios")
      return pos.includes("medio") || pos.includes("volante") || pos.includes("contención");
    if (filter === "Delanteros")
      return pos.includes("delantero") || pos.includes("extremo") || pos.includes("punta");

    return true;
  });

  return (
    <>
      <header className="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6 border-b border-surface-variant pb-6">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-primary mb-2 uppercase tracking-tight font-lexend font-bold">
            Primer Equipo
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Temporada 2026</p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center md:justify-end w-full md:w-auto">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 font-label-md text-label-md transition-all rounded ${
                filter === f
                  ? "bg-primary text-on-primary shadow-md"
                  : "bg-surface text-on-surface border border-outline-variant hover:border-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <section className="mb-section-gap">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-6 flex items-center gap-3 font-lexend font-bold">
          <span
            className="material-symbols-outlined text-tertiary-container"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            sports_soccer
          </span>
          {filter === "Todos" ? "Plantilla Completa" : filter}
        </h2>

        {filteredPlayers.length === 0 ? (
          <EmptyState
            icon="group_off"
            title="Sin Jugadores"
            description={`No hay jugadores registrados en la categoría "${filter}".`}
            action={
              <button
                onClick={() => setFilter("Todos")}
                className="bg-primary hover:bg-primary-container text-on-primary font-label-md px-6 py-3 rounded-lg shadow-sm transition-all border-b-4 border-tertiary-container hover:-translate-y-1 active:translate-y-0"
              >
                Ver toda la plantilla
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
