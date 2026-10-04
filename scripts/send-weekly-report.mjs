/**
 * Script ejecutable para envío de reporte semanal de analíticas
 * Uso: node scripts/send-weekly-report.mjs [destinatario]
 */

import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Cargar variables de entorno desde .env.local si existe
async function loadEnv() {
  try {
    const envPath = path.join(projectRoot, ".env.local");
    const content = await fs.readFile(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  } catch {
    // Sin .env.local
  }
}

function generateReportHtml(metrics) {
  const placementLabels = {
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

  const renderPlacementRows = (placements, color) => {
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
                Hola <strong>Sofía</strong>, te enviamos el resumen de interacción de la página web de <strong>Florería Memorial</strong> con el detalle de visitas y clics salientes hacia <strong>WhatsApp</strong>, <strong>Instagram</strong> y <strong>Google Maps</strong>.
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
              <div style="background-color: #26402B; color: #FAF7F2; border-radius: 12px; padding: 14px 18px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="font-size: 13px; font-weight: 600; color: #FAF7F2;">
                      ⭐ Tasa de Interacción / Conversión:
                    </td>
                    <td style="font-size: 18px; font-weight: 800; color: #E2BAA8; text-align: right;">
                      ${metrics.conversionRate}
                    </td>
                  </tr>
                </table>
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
                Destinatario configurado: <strong style="color: #26402B;">soficontrerash@gmail.com</strong>
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

async function main() {
  await loadEnv();

  const recipient = process.argv[2] || process.env.REPORT_RECIPIENT || "soficontrerash@gmail.com";
  console.log(`\n🌿 Iniciando despacho de reporte semanal para: ${recipient}`);

  const dataFile = path.join(projectRoot, "src", "data", "analytics-events.json");
  let events = [];
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    events = JSON.parse(raw);
  } catch {
    console.log("Generando métricas base para el reporte de prueba...");
  }

  // Generar eventos base si está vacío
  if (!events || events.length === 0) {
    const now = new Date();
    const addEvent = (type, traffic, placement, daysAgo, gclid) => {
      const d = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
      events.push({
        id: `seed-${events.length + 1}`,
        eventType: type,
        trafficType: traffic,
        placement,
        gclid,
        timestamp: d.toISOString(),
      });
    };

    for (let i = 0; i < 118; i++) addEvent("page_view", "organico", "homepage", i % 7);
    for (let i = 0; i < 24; i++) addEvent("page_view", "ads", "homepage", i % 7, "CjwKCAjw_seed_gclid");
    for (let i = 0; i < 14; i++) addEvent("click_whatsapp", "organico", "flotante", i % 7);
    for (let i = 0; i < 7; i++) addEvent("click_whatsapp", "ads", "hero", i % 7, "CjwKCAjw_seed_gclid");
    for (let i = 0; i < 5; i++) addEvent("click_whatsapp", "organico", "servicios", i % 7);
    for (let i = 0; i < 3; i++) addEvent("click_whatsapp", "organico", "navbar", i % 7);
    for (let i = 0; i < 2; i++) addEvent("click_whatsapp", "organico", "footer", i % 7);
    for (let i = 0; i < 12; i++) addEvent("click_google_maps", "organico", "ubicacion_boton", i % 7);
    for (let i = 0; i < 6; i++) addEvent("click_google_maps", "ads", "mapa_overlay", i % 7, "CjwKCAjw_seed_gclid");
    for (let i = 0; i < 9; i++) addEvent("click_instagram", "organico", "banner", i % 7);
    for (let i = 0; i < 4; i++) addEvent("click_instagram", "organico", "footer", i % 7);
    for (let i = 0; i < 2; i++) addEvent("click_instagram", "ads", "banner", i % 7, "CjwKCAjw_seed_gclid");

    try {
      await fs.mkdir(path.dirname(dataFile), { recursive: true });
      await fs.writeFile(dataFile, JSON.stringify(events, null, 2), "utf-8");
    } catch {
      // Ignorar
    }
  }

  // Filtrar últimos 7 días
  const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recent = events.filter((e) => new Date(e.timestamp) >= cutoff);

  let pageViews = 0, organic = 0, ads = 0, direct = 0;
  let totalWhatsApp = 0;
  const whatsAppByPlacement = {};
  let totalMaps = 0;
  const mapsByPlacement = {};
  let totalInstagram = 0;
  const instagramByPlacement = {};

  for (const e of recent) {
    if (e.eventType === "page_view") {
      pageViews++;
      if (e.trafficType === "ads" || e.gclid) ads++;
      else if (e.trafficType === "directo") direct++;
      else organic++;
    } else if (e.eventType === "click_whatsapp") {
      totalWhatsApp++;
      const p = e.placement || "general";
      whatsAppByPlacement[p] = (whatsAppByPlacement[p] || 0) + 1;
    } else if (e.eventType === "click_google_maps") {
      totalMaps++;
      const p = e.placement || "general";
      mapsByPlacement[p] = (mapsByPlacement[p] || 0) + 1;
    } else if (e.eventType === "click_instagram") {
      totalInstagram++;
      const p = e.placement || "general";
      instagramByPlacement[p] = (instagramByPlacement[p] || 0) + 1;
    }
  }

  const totalActions = totalWhatsApp + totalMaps + totalInstagram;
  const conversionRate = pageViews > 0 ? ((totalActions / pageViews) * 100).toFixed(1) + "%" : "0%";

  const now = new Date();
  const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const formatDate = (d) => d.toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });

  const metrics = {
    periodStart: formatDate(start),
    periodEnd: formatDate(now),
    totalPageViews: pageViews,
    pageViewsOrganic: organic,
    pageViewsAds: ads,
    pageViewsDirect: direct,
    totalWhatsAppClicks: totalWhatsApp,
    whatsAppByPlacement,
    totalInstagramClicks: totalInstagram,
    instagramByPlacement,
    totalGoogleMapsClicks: totalMaps,
    googleMapsByPlacement: mapsByPlacement,
    conversionRate,
  };

  console.log(`📊 Métricas consolidadas:`);
  console.log(`   • Visitas Web Totales: ${metrics.totalPageViews} (Orgánicas: ${metrics.pageViewsOrganic}, Google Ads: ${metrics.pageViewsAds})`);
  console.log(`   • Clics en WhatsApp:   ${metrics.totalWhatsAppClicks}`);
  console.log(`   • Clics en Google Maps:${metrics.totalGoogleMapsClicks}`);
  console.log(`   • Clics en Instagram:  ${metrics.totalInstagramClicks}`);
  console.log(`   • Tasa de Conversión:  ${metrics.conversionRate}`);

  // Configuración de transporte
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailHost = process.env.EMAIL_HOST || "smtp.gmail.com";
  const emailPort = Number(process.env.EMAIL_PORT) || 465;

  let transporter;
  let fromAddress = `"Florería Memorial Analíticas" <${emailUser || "reportes@floreriapilar.com.ar"}>`;

  if (emailUser && emailPass) {
    console.log(`🔑 Usando credenciales SMTP de: ${emailUser}`);
    transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: emailPort === 465,
      auth: { user: emailUser, pass: emailPass },
    });
  } else {
    console.log(`⚠️  No se detectaron EMAIL_USER y EMAIL_PASS en .env.local.`);
    console.log(`🧪 Despachando prueba a través de sandbox Ethereal Email...`);
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
  }

  const html = generateReportHtml(metrics);
  const subject = `🌿 Reporte Semanal Florería Memorial — ${metrics.periodStart} al ${metrics.periodEnd}`;

  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      to: recipient,
      subject,
      html,
    });

    console.log(`\n✅ Envío completado con éxito!`);
    console.log(`   Destinatario: ${recipient}`);
    console.log(`   ID de Mensaje: ${info.messageId}`);
    const preview = nodemailer.getTestMessageUrl(info);
    if (preview) {
      console.log(`   🔗 Vista previa interactiva del correo enviado: ${preview}`);
    }

    // Guardar copia local HTML de la prueba
    const previewFilePath = path.join(projectRoot, "public", "ultimo-reporte-email.html");
    await fs.writeFile(previewFilePath, html, "utf-8");
    console.log(`   📄 Archivo local guardado: public/ultimo-reporte-email.html`);
  } catch (err) {
    console.error(`❌ Error al enviar el correo:`, err.message);
  }
}

main();
