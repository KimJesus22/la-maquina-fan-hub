import "server-only";
import { cookies } from "next/headers";
import { encrypt, decrypt } from "@/lib/session-crypto";
import type { SessionPayload } from "@/lib/session-crypto";

export type { SessionPayload };
export { decrypt };

const SESSION_COOKIE = "session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 días

/* ── Crear sesión ──────────────────────────────────────── */

export async function createSession(userId: string, email: string, accessToken: string) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  const session = await encrypt({
    userId,
    email,
    accessToken,
    expiresAt: expiresAt.toISOString(),
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

/* ── Obtener sesión actual ─────────────────────────────── */

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return decrypt(token);
}

/* ── Eliminar sesión ───────────────────────────────────── */

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
