import { Suspense } from "react";
import Image from "next/image";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { signOut } from "@/app/actions/auth";
import PlayersSection from "./PlayersSection";
import MatchesSection from "./MatchesSection";
import Loading from "./loading";
import MuroAficion from "./MuroAficion";
import { getRecentMessages } from "@/actions/chat";

export default async function ComunidadPage() {
  const session = await getSession();
  if (!session) redirect("/");

  const recentMessages = await getRecentMessages();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/escudo.png"
            alt="Escudo Cruz Azul"
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
            priority
          />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Comunidad Cruz Azul
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Bienvenido,{" "}
              <span className="font-medium text-blue-400">{session.email}</span>
            </p>
          </div>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-lg border border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-red-500/50 hover:text-red-400"
            id="sign-out-button"
          >
            Cerrar sesión
          </button>
        </form>
      </header>

      {/* Grid de contenido */}
      <div className="grid gap-10 lg:grid-cols-5">
        {/* Plantilla (3/5) */}
        <section className="lg:col-span-3">
          <h2 className="mb-5 text-lg font-semibold text-white">
            ⚽ Plantilla
          </h2>
          <Suspense fallback={<Loading />}>
            <PlayersSection />
          </Suspense>
        </section>

        {/* Partidos (2/5) */}
        <section className="lg:col-span-2">
          <h2 className="mb-5 text-lg font-semibold text-white">
            📅 Próximos Partidos
          </h2>
          <Suspense fallback={<Loading />}>
            <MatchesSection />
          </Suspense>
        </section>
      </div>

      {/* Fila de Muro de Afición */}
      <section className="mt-4">
        <h2 className="mb-5 text-lg font-semibold text-white flex items-center gap-2">
          <span className="material-symbols-outlined">forum</span> 
          Muro de la Afición
        </h2>
        <MuroAficion initialMessages={recentMessages} currentUserEmail={session.email} />
      </section>
    </main>
  );
}
