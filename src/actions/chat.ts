"use server";

import { insforge } from "@/lib/insforge";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 3000; // 3 segundos de espera mínima

export async function sendFanMessage(formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { error: "No estás autenticado" };
  }

  // Rate Limiting Básico
  const userId = (session.id || session.email) as string;
  const now = Date.now();
  const lastMessageTime = rateLimitMap.get(userId);

  if (lastMessageTime && now - lastMessageTime < RATE_LIMIT_WINDOW) {
    const timeLeft = Math.ceil((RATE_LIMIT_WINDOW - (now - lastMessageTime)) / 1000);
    return { error: `Espera ${timeLeft}s antes de enviar otro mensaje.` };
  }

  // Registrar tiempo del intento
  rateLimitMap.set(userId, now);

  const message = formData.get("message") as string;
  if (!message || message.trim().length === 0) {
    return { error: "El mensaje no puede estar vacío" };
  }

  // Extraer el username a partir del correo electrónico
  const username = session.email.split("@")[0];

  const { error } = await insforge.database.from("fan_messages").insert([
    {
      user_id: session.id || session.email,
      username: username,
      message: message.trim(),
    },
  ]);

  if (error) {
    console.error("Error enviando mensaje:", error);
    return { error: "Error al enviar el mensaje" };
  }

  return { success: true };
}

export async function getRecentMessages() {
  const session = await getSession();

  if (!session?.accessToken) {
    console.error("No hay sesión para leer mensajes (RLS activo).");
    return [];
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_INSFORGE_URL}/rest/v1/fan_messages?select=*&order=created_at.desc&limit=50`,
      {
        method: "GET",
        headers: {
          apikey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store", // Desactivar cacheo para el chat en tiempo real
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error de InsForge REST API:", errorText);
      return [];
    }

    const data = await res.json();
    // Retornar en orden cronológico (los más viejos arriba)
    return (data || []).reverse();
  } catch (error) {
    console.error("Excepción en fetch de mensajes:", error);
    return [];
  }
}
