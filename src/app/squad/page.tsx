import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import { getSquadPlayers } from "@/actions/players";
import SquadClient from "./SquadClient";

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
