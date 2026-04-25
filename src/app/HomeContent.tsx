"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AuthModal from "@/components/AuthModal";

export default function HomeContent() {
  const [showAuth, setShowAuth] = useState(false);
  const searchParams = useSearchParams();

  // Abrir el modal automáticamente si llega ?auth=required (redirigido por proxy)
  useEffect(() => {
    if (searchParams.get("auth") === "required") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowAuth(true);
    }
  }, [searchParams]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Cruz Azul</h1>
      <p className="text-zinc-400">Plataforma de gestión integral</p>

      <button
        type="button"
        onClick={() => setShowAuth(true)}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        id="open-auth-modal"
      >
        Iniciar sesión / Registrarse
      </button>

      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </main>
  );
}
