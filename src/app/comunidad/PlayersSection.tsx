import { getSquadPlayers } from "@/actions/players";
import PlayerCard from "@/components/PlayerCard";

export default async function PlayersSection() {
  const players = await getSquadPlayers();

  if (players.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-zinc-500">
        No hay jugadores registrados.
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3" id="players-grid">
      {players.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  );
}
