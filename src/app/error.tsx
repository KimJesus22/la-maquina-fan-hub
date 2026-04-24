"use client"; // Error boundaries en App Router DEBEN ser componentes de cliente

import { useEffect } from "react";
import EmptyState from "@/components/EmptyState";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Aquí es donde típicamente enviarías el error a Sentry o DataDog
    console.error("Next.js Error Boundary atrapó un error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 flex-grow w-full flex items-center justify-center">
        <EmptyState
          icon="cloud_off"
          title="Falla de Conexión"
          description="Tuvimos un problema al comunicarnos con InsForge o el contenido no está disponible temporalmente."
          action={
            <button
              onClick={() => reset()}
              className="bg-primary hover:bg-primary-container text-on-primary font-label-md px-6 py-3 rounded-lg shadow-sm transition-all border-b-4 border-tertiary-container hover:-translate-y-1 active:translate-y-0"
            >
              Intentar de Nuevo
            </button>
          }
        />
      </main>
      <Footer />
    </div>
  );
}
