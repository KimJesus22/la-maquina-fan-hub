"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { SessionPayload } from "@/lib/session";
import { insforge } from "@/lib/insforge";

interface AuthContextType {
  user: SessionPayload | null;
}

const AuthContext = createContext<AuthContextType>({ user: null });

export function AuthProvider({ 
  children, 
  initialSession 
}: { 
  children: ReactNode;
  initialSession: SessionPayload | null;
}) {
  const [user, setUser] = useState<SessionPayload | null>(initialSession);

  useEffect(() => {
    // 1. Sincroniza con el estado del Server Component (Layout)
    setUser(initialSession);

    // 2. Si el SDK de InsForge expone un listener estilo Supabase (onAuthStateChange),
    // nos suscribimos para actualizaciones en tiempo real entre pestañas.
    let unsubscribe: (() => void) | undefined;
    
    if (typeof (insforge.auth as any).onAuthStateChange === 'function') {
      const { data } = (insforge.auth as any).onAuthStateChange((event: string, session: any) => {
        if (event === 'SIGNED_OUT') setUser(null);
        // Nota: Para SIGNED_IN, dependemos de que el Server Action recargue la página o actualice la cookie
      });
      unsubscribe = data?.subscription?.unsubscribe;
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [initialSession]);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}
