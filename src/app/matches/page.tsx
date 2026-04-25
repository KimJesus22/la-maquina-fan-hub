import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import MatchTimelineItem from "@/components/MatchTimelineItem";
import EmptyState from "@/components/EmptyState";
import { getMatches } from "@/app/actions/data";

export const revalidate = 3600;

export default async function MatchesPage() {
  const matches = await getMatches();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />
      <main className="flex-grow pt-12 pb-section-gap px-4 md:px-8 max-w-[1280px] mx-auto w-full">
        <header className="mb-12 text-center md:text-left">
          <h1 className="font-headline-xl text-headline-xl text-primary mb-2 uppercase font-lexend font-bold tracking-tight">
            Calendario de Partidos
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Sigue la ruta de La Máquina en la temporada 2026.
          </p>
        </header>

        {matches.length === 0 ? (
          <EmptyState
            icon="calendar_month"
            title="Calendario Vacío"
            description="Aún no hay partidos programados para esta temporada. Mantente atento a los próximos anuncios oficiales."
          />
        ) : (
          <div className="relative border-l-2 border-surface-variant dark:border-slate-800 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
            {matches.map((match) => (
              <MatchTimelineItem key={match.id} match={match} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
