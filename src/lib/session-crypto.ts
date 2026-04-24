import { SignJWT, jwtVerify, JWTPayload } from "jose";

/**
 * Payload almacenado dentro del JWT de sesión.
 *
 * Este módulo NO depende de `server-only` para que pueda
 * importarse tanto desde Server Components como desde proxy.ts.
 */
export interface SessionPayload extends JWTPayload {
  userId: string;
  email: string;
  accessToken: string;
  expiresAt: string;
}

const secretKey = process.env.SESSION_SECRET!;
const encodedKey = new TextEncoder().encode(secretKey);

/* ── Cifrado ───────────────────────────────────────────── */

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

/* ── Descifrado ────────────────────────────────────────── */

export async function decrypt(
  token: string | undefined = ""
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch {
    return null;
  }
}
