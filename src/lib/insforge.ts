import { createClient } from "@insforge/sdk";

/**
 * Cliente singleton de InsForge.
 *
 * Utiliza las variables de entorno públicas de Next.js para conectar
 * con el backend. Estas variables deben definirse en `.env.local`:
 *
 *   NEXT_PUBLIC_INSFORGE_URL=https://ea895pss.us-east.insforge.app
 *   NEXT_PUBLIC_INSFORGE_ANON_KEY=<tu-anon-key>
 */
export const insforge = createClient({
  baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL!,
  anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
});
