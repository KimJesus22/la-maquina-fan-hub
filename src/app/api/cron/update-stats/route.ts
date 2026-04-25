import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as cheerio from "cheerio";
import { insforge } from "@/lib/insforge";

export async function GET(request: NextRequest) {
  // 1. Capa de Seguridad: Verificar el secreto del Cron Job
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse(JSON.stringify({ error: "Acceso denegado: Token CRON inválido" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // 2. Extracción de Datos (Web Scraping)
    // En producción, aquí haríamos: const response = await fetch("https://portal-deportivo-publico.com/stats/cruz-azul"); const html = await response.text();
    // Para esta prueba, simularemos el DOM (HTML) que Cheerio analizaría
    const mockHtml = `
      <table class="sports-stats-table">
        <tbody>
          <tr><td class="player-name">Santiago Giménez</td><td class="stat-goals">14</td><td class="stat-assists">4</td><td class="stat-matches">18</td></tr>
          <tr><td class="player-name">Uriel Antuna</td><td class="stat-goals">7</td><td class="stat-assists">9</td><td class="stat-matches">20</td></tr>
          <tr><td class="player-name">Kevin Mier</td><td class="stat-goals">0</td><td class="stat-assists">1</td><td class="stat-matches">20</td></tr>
        </tbody>
      </table>
    `;

    // Cargamos el HTML en Cheerio (similar a usar jQuery)
    const $ = cheerio.load(mockHtml);
    const scrapedPlayers: Array<{ name: string; goals: number; assists: number; matches: number }> =
      [];

    // Iteramos sobre las filas de la tabla de estadísticas
    $("table.sports-stats-table tbody tr").each((_, element) => {
      const name = $(element).find(".player-name").text().trim();
      const goals = parseInt($(element).find(".stat-goals").text().trim(), 10);
      const assists = parseInt($(element).find(".stat-assists").text().trim(), 10);
      const matches = parseInt($(element).find(".stat-matches").text().trim(), 10);

      if (name) {
        scrapedPlayers.push({ name, goals, assists, matches });
      }
    });

    // 3. Actualización de InsForge
    let updatedCount = 0;

    // Obtenemos los jugadores actuales para hacer el cruce de IDs
    const { data: currentPlayers, error: fetchError } = await insforge.database
      .from("players")
      .select("id, name");

    if (fetchError) throw fetchError;

    if (currentPlayers) {
      for (const scraped of scrapedPlayers) {
        // Encontramos la coincidencia del jugador en la DB
        const playerMatch = currentPlayers.find(
          (p) =>
            p.name.toLowerCase().includes(scraped.name.toLowerCase()) ||
            scraped.name.toLowerCase().includes(p.name.toLowerCase())
        );

        if (playerMatch) {
          // Ejecutamos la actualización
          const { error: updateError } = await insforge.database
            .from("players")
            .update({
              goals: scraped.goals,
              assists: scraped.assists,
              matches_played: scraped.matches,
            })
            .eq("id", playerMatch.id);

          if (!updateError) {
            updatedCount++;
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Scraping completado. ${updatedCount} jugadores actualizados.`,
    });
  } catch (error) {
    console.error("Error crítico durante el Scraping Cron:", error);
    return new NextResponse(JSON.stringify({ error: "Fallo interno en el scraper" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
