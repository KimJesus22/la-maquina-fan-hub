"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { SessionPayload } from "@/lib/session";
import { insforge } from "@/lib/insforge";
import { signOut as serverSignOut } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: SessionPayload | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signOut: async () => {},
});

export function AuthProvider({
  children,
  initialSession,
}: {
  children: ReactNode;
  initialSession: SessionPayload | null;
}) {
  const [user, setUser] = useState<SessionPayload | null>(initialSession);
  const router = useRouter();

  useEffect(() => {
    // 1. Sincroniza con el estado del Server Component (Layout)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(initialSession);

    // 2. Si el SDK de InsForge expone un listener estilo Supabase (onAuthStateChange),
    // nos suscribimos para actualizaciones en tiempo real entre pestañas.
    let unsubscribe: (() => void) | undefined;

    const authService = insforge.auth as unknown as {
      onAuthStateChange?: (cb: (event: string) => void) => { data: { subscription: { unsubscribe: () => void } } };
    };

    if (typeof authService.onAuthStateChange === "function") {
      const { data } = authService.onAuthStateChange((event: string) => {
        if (event === "SIGNED_OUT") setUser(null);
        // Nota: Para SIGNED_IN, dependemos de que el Server Action recargue la página o actualice la cookie
      });
      unsubscribe = data?.subscription?.unsubscribe;
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [initialSession]);

  const handleSignOut = async () => {
    // Limpieza de estado local inmediato para UX optimista
    setUser(null);

    // Llamada al Server Action para destruir token de InsForge y la cookie segura
    await serverSignOut();

    // Redirección forzada al landing page
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, signOut: handleSignOut }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}
