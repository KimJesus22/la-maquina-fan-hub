import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import { getSquadPlayers } from "@/actions/players";
import SquadClient from "./SquadClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Primer Equipo",
  description:
    "Conoce a la plantilla oficial de Cruz Azul para la presente temporada. Porteros, Defensas, Medios y Delanteros.",
};

export const revalidate = 3600;

export default async function SquadPage() {
  const players = await getSquadPlayers();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 flex-grow w-full">
        <SquadClient players={players} />
      </main>
      <Footer />
    </div>
  );
}
