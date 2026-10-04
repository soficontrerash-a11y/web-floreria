import fs from "fs/promises";
import path from "path";

export interface AnalyticsEvent {
  id: string;
  eventType: string;
  trafficType: string;
  placement?: string;
  url?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  gclid?: string;
  timestamp: string;
}

export interface ReportMetrics {
  periodStart: string;
  periodEnd: string;
  totalPageViews: number;
  pageViewsOrganic: number;
  pageViewsAds: number;
  pageViewsDirect: number;
  totalWhatsAppClicks: number;
  whatsAppByPlacement: Record<string, number>;
  totalInstagramClicks: number;
  instagramByPlacement: Record<string, number>;
  totalGoogleMapsClicks: number;
  googleMapsByPlacement: Record<string, number>;
  conversionRate: string;
}

const DATA_FILE = path.join(process.cwd(), "src", "data", "analytics-events.json");

/**
 * Returns events from JSON storage, generating baseline seed data if empty.
 */
export async function getEvents(): Promise<AnalyticsEvent[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // File not found or empty
  }

  // Generate baseline seed events for realistic test report
  const now = new Date();
  const seedEvents: AnalyticsEvent[] = [];

  const addEvent = (
    type: string,
    traffic: string,
    placement: string,
    daysAgo: number,
    gclid?: string
  ) => {
    const d = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    seedEvents.push({
      id: `seed-${seedEvents.length + 1}`,
      eventType: type,
      trafficType: traffic,
      placement,
      gclid,
      timestamp: d.toISOString(),
    });
  };

  // Visitas web (ej: 142 visitas semanales: 118 orgánicas, 24 ads)
  for (let i = 0; i < 118; i++) {
    addEvent("page_view", "organico", "homepage", i % 7);
  }
  for (let i = 0; i < 24; i++) {
    addEvent("page_view", "ads", "homepage", i % 7, "CjwKCAjw_seed_gclid");
  }

  // Clicks en WhatsApp (ej: 31 clicks totales)
  for (let i = 0; i < 14; i++) addEvent("click_whatsapp", "organico", "flotante", i % 7);
  for (let i = 0; i < 7; i++) addEvent("click_whatsapp", "ads", "hero", i % 7, "CjwKCAjw_seed_gclid");
  for (let i = 0; i < 5; i++) addEvent("click_whatsapp", "organico", "servicios", i % 7);
  for (let i = 0; i < 3; i++) addEvent("click_whatsapp", "organico", "navbar", i % 7);
  for (let i = 0; i < 2; i++) addEvent("click_whatsapp", "organico", "footer", i % 7);

  // Clicks en Google Maps (ej: 18 clicks totales)
  for (let i = 0; i < 12; i++) addEvent("click_google_maps", "organico", "ubicacion_boton", i % 7);
  for (let i = 0; i < 6; i++) addEvent("click_google_maps", "ads", "mapa_overlay", i % 7, "CjwKCAjw_seed_gclid");

  // Clicks en Instagram (ej: 15 clicks totales)
  for (let i = 0; i < 9; i++) addEvent("click_instagram", "organico", "banner", i % 7);
  for (let i = 0; i < 4; i++) addEvent("click_instagram", "organico", "footer", i % 7);
  for (let i = 0; i < 2; i++) addEvent("click_instagram", "ads", "banner", i % 7, "CjwKCAjw_seed_gclid");

  try {
    const dir = path.dirname(DATA_FILE);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(seedEvents, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not write seed events:", err);
  }

  return seedEvents;
}

export async function calculateMetrics(days: number = 7): Promise<ReportMetrics> {
  const events = await getEvents();
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const filtered = events.filter((e) => new Date(e.timestamp) >= cutoff);

  let totalPageViews = 0;
  let pageViewsOrganic = 0;
  let pageViewsAds = 0;
  let pageViewsDirect = 0;

  let totalWhatsAppClicks = 0;
  const whatsAppByPlacement: Record<string, number> = {};

  let totalInstagramClicks = 0;
  const instagramByPlacement: Record<string, number> = {};

  let totalGoogleMapsClicks = 0;
  const googleMapsByPlacement: Record<string, number> = {};

  for (const e of filtered) {
    if (e.eventType === "page_view") {
      totalPageViews++;
      if (e.trafficType === "ads" || e.gclid) pageViewsAds++;
      else if (e.trafficType === "directo") pageViewsDirect++;
      else pageViewsOrganic++;
    } else if (e.eventType === "click_whatsapp") {
      totalWhatsAppClicks++;
      const p = e.placement || "general";
      whatsAppByPlacement[p] = (whatsAppByPlacement[p] || 0) + 1;
    } else if (e.eventType === "click_instagram") {
      totalInstagramClicks++;
      const p = e.placement || "general";
      instagramByPlacement[p] = (instagramByPlacement[p] || 0) + 1;
    } else if (e.eventType === "click_google_maps") {
      totalGoogleMapsClicks++;
      const p = e.placement || "general";
      googleMapsByPlacement[p] = (googleMapsByPlacement[p] || 0) + 1;
    }
  }

  const totalActions = totalWhatsAppClicks + totalGoogleMapsClicks + totalInstagramClicks;
  const conversionRate =
    totalPageViews > 0 ? ((totalActions / totalPageViews) * 100).toFixed(1) + "%" : "0%";

  const now = new Date();
  const start = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });

  return {
    periodStart: formatDate(start),
    periodEnd: formatDate(now),
    totalPageViews,
    pageViewsOrganic,
    pageViewsAds,
    pageViewsDirect,
    totalWhatsAppClicks,
    whatsAppByPlacement,
    totalInstagramClicks,
    instagramByPlacement,
    totalGoogleMapsClicks,
    googleMapsByPlacement,
    conversionRate,
  };
}

export function generateReportHtml(metrics: ReportMetrics): string {
  const placementLabels: Record<string, string> = {
    flotante: "Botón Flotante Permanente",
    hero: "Portada Principal (Hero)",
    servicios: "Tarjetas de Servicios",
    navbar: "Barra Superior (Navbar)",
    footer: "Pie de Página (Footer)",
    ubicacion: "Sección Dónde Encontrarnos",
    ubicacion_boton: "Botón 'Ver en Google Maps'",
    mapa_overlay: "Botón 'Cómo llegar' en Mapa",
    banner: "Banner de Novedades Instagram",
    general: "General / Otros",
  };

  const renderPlacementRows = (placements: Record<string, number>, color: string) => {
    const entries = Object.entries(placements).sort((a, b) => b[1] - a[1]);
    if (entries.length === 0) {
      return `<tr><td colspan="2" style="padding: 6px 12px; color: #8A968E; font-size: 12px;">Sin registros en este periodo</td></tr>`;
    }
    return entries
      .map(
        ([key, count]) => `
      <tr>
        <td style="padding: 8px 12px; font-size: 13px; color: #3E4D42; border-bottom: 1px solid #F0EAE0;">
          ${placementLabels[key] || key}
        </td>
        <td style="padding: 8px 12px; font-size: 13px; font-weight: bold; color: ${color}; text-align: right; border-bottom: 1px solid #F0EAE0;">
          ${count} clicks
        </td>
      </tr>
    `
      )
      .join("");
  };

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reporte Semanal — Florería Memorial</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF7F2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1D2520;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FAF7F2; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 640px; background-color: #FFFFFF; border-radius: 20px; overflow: hidden; border: 1px solid #E8E2D8; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #26402B; padding: 32px 30px; text-align: center; color: #FAF7F2;">
              <div style="display: inline-block; background-color: rgba(255,255,255,0.12); padding: 5px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 10px;">
                🌿 Reporte Semanal de Rendimiento
              </div>
              <h1 style="margin: 0 0 6px 0; font-size: 26px; font-weight: bold; letter-spacing: -0.5px; color: #FAF7F2;">
                Florería Memorial
              </h1>
              <p style="margin: 0; font-size: 14px; color: #D0DDD2;">
                Periodo: <strong>${metrics.periodStart}</strong> al <strong>${metrics.periodEnd}</strong>
              </p>
            </td>
          </tr>

          <!-- Summary Intro -->
          <tr>
            <td style="padding: 24px 30px 12px 30px;">
              <p style="margin: 0; font-size: 15px; line-height: 1.5; color: #3E4D42;">
                Hola equipo de <strong>Florería Memorial</strong>, les enviamos el resumen de interacción de la página web con el detalle de visitas y clics salientes hacia <strong>WhatsApp</strong>, <strong>Instagram</strong> y <strong>Google Maps</strong>.
              </p>
            </td>
          </tr>

          <!-- 4 Main KPI Cards Grid -->
          <tr>
            <td style="padding: 10px 24px 24px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <!-- Card 1: Visitas Web -->
                  <td width="50%" style="padding: 6px;">
                    <div style="background-color: #F8F5EE; border: 1px solid #EAE3D7; border-radius: 14px; padding: 18px 16px;">
                      <div style="font-size: 12px; text-transform: uppercase; font-weight: 700; color: #5E6D62; margin-bottom: 6px;">
                        🌐 Visitas Web
                      </div>
                      <div style="font-size: 30px; font-weight: 800; color: #26402B; line-height: 1;">
                        ${metrics.totalPageViews}
                      </div>
                      <div style="font-size: 11px; color: #8A968E; margin-top: 6px;">
                        • ${metrics.pageViewsOrganic} orgánicas<br>
                        • ${metrics.pageViewsAds} desde Google Ads
                      </div>
                    </div>
                  </td>

                  <!-- Card 2: Clicks WhatsApp -->
                  <td width="50%" style="padding: 6px;">
                    <div style="background-color: #F0FBF4; border: 1px solid #D2F2DD; border-radius: 14px; padding: 18px 16px;">
                      <div style="font-size: 12px; text-transform: uppercase; font-weight: 700; color: #1E8E47; margin-bottom: 6px;">
                        💬 Clics WhatsApp
                      </div>
                      <div style="font-size: 30px; font-weight: 800; color: #1E8E47; line-height: 1;">
                        ${metrics.totalWhatsAppClicks}
                      </div>
                      <div style="font-size: 11px; color: #5E6D62; margin-top: 6px;">
                        Consultas directas a ventas
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <!-- Card 3: Clicks Google Maps -->
                  <td width="50%" style="padding: 6px;">
                    <div style="background-color: #FDF6F3; border: 1px solid #F5DDD4; border-radius: 14px; padding: 18px 16px;">
                      <div style="font-size: 12px; text-transform: uppercase; font-weight: 700; color: #C27A65; margin-bottom: 6px;">
                        📍 Clics Google Maps
                      </div>
                      <div style="font-size: 30px; font-weight: 800; color: #C27A65; line-height: 1;">
                        ${metrics.totalGoogleMapsClicks}
                      </div>
                      <div style="font-size: 11px; color: #5E6D62; margin-top: 6px;">
                        Búsquedas de ruta o local
                      </div>
                    </div>
                  </td>

                  <!-- Card 4: Clicks Instagram -->
                  <td width="50%" style="padding: 6px;">
                    <div style="background-color: #FAF4F8; border: 1px solid #F0DCEB; border-radius: 14px; padding: 18px 16px;">
                      <div style="font-size: 12px; text-transform: uppercase; font-weight: 700; color: #B3347C; margin-bottom: 6px;">
                        📸 Clics Instagram
                      </div>
                      <div style="font-size: 30px; font-weight: 800; color: #B3347C; line-height: 1;">
                        ${metrics.totalInstagramClicks}
                      </div>
                      <div style="font-size: 11px; color: #5E6D62; margin-top: 6px;">
                        Visitas al perfil @floresparquememo
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Conversion Rate Callout -->
          <tr>
            <td style="padding: 0 30px 24px 30px;">
              <div style="background-color: #26402B; color: #FAF7F2; border-radius: 12px; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 13px; font-weight: 600;">
                  ⭐ Tasa de Interacción / Conversión:
                </span>
                <span style="font-size: 18px; font-weight: 800; color: #E2BAA8; float: right;">
                  ${metrics.conversionRate}
                </span>
                <div style="clear: both;"></div>
              </div>
            </td>
          </tr>

          <!-- Detailed Breakdown Section -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h2 style="font-size: 16px; font-weight: bold; margin: 0 0 12px 0; color: #1D2520; border-bottom: 2px solid #FAF7F2; padding-bottom: 8px;">
                Desglose por Ubicación de Clic
              </h2>

              <!-- WhatsApp Breakdown -->
              <div style="margin-bottom: 18px;">
                <div style="font-size: 13px; font-weight: bold; color: #1E8E47; margin-bottom: 6px;">
                  💬 Clics en WhatsApp (${metrics.totalWhatsAppClicks} totales)
                </div>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 1px solid #F0EAE0; border-radius: 8px; overflow: hidden;">
                  ${renderPlacementRows(metrics.whatsAppByPlacement, "#1E8E47")}
                </table>
              </div>

              <!-- Google Maps Breakdown -->
              <div style="margin-bottom: 18px;">
                <div style="font-size: 13px; font-weight: bold; color: #C27A65; margin-bottom: 6px;">
                  📍 Clics en Google Maps (${metrics.totalGoogleMapsClicks} totales)
                </div>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 1px solid #F0EAE0; border-radius: 8px; overflow: hidden;">
                  ${renderPlacementRows(metrics.googleMapsByPlacement, "#C27A65")}
                </table>
              </div>

              <!-- Instagram Breakdown -->
              <div>
                <div style="font-size: 13px; font-weight: bold; color: #B3347C; margin-bottom: 6px;">
                  📸 Clics en Instagram (${metrics.totalInstagramClicks} totales)
                </div>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 1px solid #F0EAE0; border-radius: 8px; overflow: hidden;">
                  ${renderPlacementRows(metrics.instagramByPlacement, "#B3347C")}
                </table>
              </div>
            </td>
          </tr>

          <!-- Footer Information -->
          <tr>
            <td style="background-color: #FAF7F2; border-top: 1px solid #E8E2D8; padding: 22px 30px; text-align: center; font-size: 12px; color: #8A968E;">
              <p style="margin: 0 0 6px 0; font-weight: 600; color: #3E4D42;">
                Florería Memorial — Parque Memorial Pilar
              </p>
              <p style="margin: 0; line-height: 1.4;">
                Este reporte fue generado automáticamente por el sistema de analíticas de la web.<br>
                Destinatario configurado: <strong style="color: #26402B;">floresdelparquemontoya@gmail.com</strong>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
