"use server";

import { insforge } from "@/lib/insforge";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function sendFanMessage(formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { error: "No estás autenticado" };
  }

  const message = formData.get("message") as string;
  if (!message || message.trim().length === 0) {
    return { error: "El mensaje no puede estar vacío" };
  }

  // Extraer el username a partir del correo electrónico
  const username = session.email.split("@")[0];

  const { error } = await insforge.database
    .from("fan_messages")
    .insert([{
      user_id: session.id || session.email,
      username: username,
      message: message.trim()
    }]);

  if (error) {
    console.error("Error enviando mensaje:", error);
    return { error: "Error al enviar el mensaje" };
  }
  
  return { success: true };
}

export async function getRecentMessages() {
  const { data, error } = await insforge.database
    .from("fan_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }

  // Retornar en orden cronológico (los más viejos arriba)
  return (data || []).reverse();
}
