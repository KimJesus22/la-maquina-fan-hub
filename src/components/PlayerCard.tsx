import Image from "next/image";
import type { Player } from "@/lib/types";

export default function PlayerCard({ player }: { player: Player }) {
  // Manejo seguro para separar nombre y apellido en dos líneas
  const nameParts = player.name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

  return (
    <article className="bg-surface border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_4px_20px_-4px_rgba(0,48,99,0.15)] group relative overflow-hidden flex flex-col h-full">
      <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full -z-0"></div>
      
      {/* Top Section */}
      <div className="p-6 pb-0 flex-grow relative z-10 text-center flex flex-col items-center">
        <div className="w-32 h-32 rounded-full border-4 border-surface overflow-hidden mb-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] relative group-hover:scale-105 transition-transform duration-300 bg-zinc-100 dark:bg-zinc-800">
          {player.image_url ? (
            <Image 
              src={player.image_url} 
              alt={player.name}
              width={128}
              height={128}
              className="w-full h-full object-cover object-top"
              unoptimized={player.image_url.startsWith("http")}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-400">
              <span className="material-symbols-outlined text-4xl">person</span>
            </div>
          )}
        </div>
        
        <div className="absolute top-4 left-4 font-stat-lg text-stat-lg text-primary opacity-20 group-hover:opacity-100 transition-opacity duration-300 select-none">
          #{player.number}
        </div>
        
        <h3 className="font-headline-md text-headline-md text-primary mb-1 uppercase leading-tight font-lexend font-bold">
          {firstName} {lastName && <br />} {lastName}
        </h3>
        
        <p className="font-body-md text-body-md text-on-surface-variant mb-4">
          {player.position}
        </p>
      </div>

      {/* Stats Section */}
      <div className="bg-surface-container-low border-t border-outline-variant/30 p-4 mt-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5 flex-1 justify-center border-r border-outline-variant/30" title="Goles">
            <span className="material-symbols-outlined text-[18px] text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>sports_score</span>
            <span className="font-label-md text-label-md text-on-surface">{player.goals || 0}</span>
          </div>
          <div className="flex items-center gap-1.5 flex-1 justify-center border-r border-outline-variant/30" title="Asistencias">
            <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>assist_walker</span>
            <span className="font-label-md text-label-md text-on-surface">{player.assists || 0}</span>
          </div>
          <div className="flex items-center gap-1.5 flex-1 justify-center" title="Partidos Jugados">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 1" }}>directions_run</span>
            <span className="font-label-md text-label-md text-on-surface">{player.matches_played || 0}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
