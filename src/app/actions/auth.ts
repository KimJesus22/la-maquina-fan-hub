"use server";

import { insforge } from "@/lib/insforge";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

/* ── Tipos compartidos para estado del formulario ──────── */

export interface AuthState {
  error?: string;
  success?: boolean;
}

/* ── Sign Up ───────────────────────────────────────────── */

export async function signUp(
  _prev: AuthState | undefined,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string | null;

  if (!email || !password) {
    return { error: "El correo y la contraseña son obligatorios." };
  }

  const { data, error } = await insforge.auth.signUp({
    email,
    password,
    ...(name ? { name } : {}),
  });

  if (error) {
    let msg = error.message ?? "Error al crear la cuenta.";
    if (error.message.includes("User already registered") || error.message.includes("already exists")) {
      msg = "Este correo ya pertenece a la comunidad, intenta iniciar sesión.";
    }
    return { error: msg };
  }

  if (data?.requireEmailVerification) {
    return {
      success: true,
      error: "Revisa tu correo para verificar tu cuenta antes de iniciar sesión.",
    };
  }

  // Si no se requiere verificación, el usuario ya tiene token
  if (data?.accessToken && data.user) {
    await createSession(data.user.id, data.user.email, data.accessToken);
    redirect("/comunidad");
  }

  return { success: true };
}

/* ── Sign In ───────────────────────────────────────────── */

export async function signIn(
  _prev: AuthState | undefined,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "El correo y la contraseña son obligatorios." };
  }

  const { data, error } = await insforge.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Mapear errores comunes a español
    let msg = error.message ?? "Error al iniciar sesión.";
    if (error.message === "Invalid login credentials") {
      msg = "El correo o la contraseña son incorrectos.";
    }
    return { error: msg };
  }

  if (data?.accessToken && data.user) {
    await createSession(data.user.id, data.user.email, data.accessToken);
    redirect("/comunidad");
  }

  return { error: "No se pudo iniciar sesión." };
}

/* ── Sign Out ──────────────────────────────────────────── */

export async function signOut() {
  await insforge.auth.signOut();
  await deleteSession();
}
