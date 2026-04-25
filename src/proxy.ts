import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session-crypto";

/**
 * Rutas que requieren autenticación.
 * Cualquier ruta que empiece con alguna de estas cadenas será protegida.
 */
const protectedPrefixes = ["/comunidad"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!isProtected) {
    return NextResponse.next();
  }

  // Leer la cookie de sesión directamente del request (sin await cookies())
  const token = request.cookies.get("session")?.value;
  const session = await decrypt(token);

  if (!session?.userId) {
    // Redirigir a la raíz con un query param para indicar que se necesita login
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("auth", "required");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Ejecutar solo en las rutas relevantes (excluir assets estáticos)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
