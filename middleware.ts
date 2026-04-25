import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Verificamos si existe la cookie de sesión cifrada de nuestra app
  const session = request.cookies.get("session")?.value;

  // Protegemos todas las rutas que comiencen con /comunidad
  if (request.nextUrl.pathname.startsWith("/comunidad")) {
    if (!session) {
      // Redirigimos al inicio disparando el parámetro ?auth=login para abrir el modal
      const url = request.nextUrl.clone();
      url.pathname = "/";
      url.searchParams.set("auth", "login");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // El middleware solo se ejecutará en estas rutas para optimizar rendimiento
  matcher: ["/comunidad/:path*"],
};
