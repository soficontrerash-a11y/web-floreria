import { calculateMetrics } from "@/lib/report-generator";
import { ArrowLeft, ExternalLink, MessageCircle, MapPin, Globe, CheckCircle2 } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ReportePage() {
  const metrics = await calculateMetrics(7);

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

  const whatsappShareText = encodeURIComponent(
    `🌿 Reporte Semanal Florería Memorial (${metrics.periodStart} - ${metrics.periodEnd})\n\n` +
      `🌐 Visitas Web: ${metrics.totalPageViews} (Orgánicas: ${metrics.pageViewsOrganic}, Ads: ${metrics.pageViewsAds})\n` +
      `💬 Clics WhatsApp: ${metrics.totalWhatsAppClicks}\n` +
      `📍 Clics Google Maps: ${metrics.totalGoogleMapsClicks}\n` +
      `📸 Clics Instagram: ${metrics.totalInstagramClicks}\n` +
      `⭐ Tasa de Interacción: ${metrics.conversionRate}`
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1D2520] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#5E6D62] hover:text-[#26402B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la web</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EFE9] text-[#26402B] text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>Panel en Vivo • Sin Claves</span>
          </div>
        </div>

        {/* Header Hero */}
        <div className="bg-[#26402B] text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#E2BAA8] font-bold">
              Analíticas Semanales
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF7F2]">
              Florería Memorial
            </h1>
            <p className="text-sm sm:text-base text-[#D0DDD2] max-w-xl">
              Rendimiento semanal del <strong>{metrics.periodStart}</strong> al{" "}
              <strong>{metrics.periodEnd}</strong>. Medición de visitas a la página y clics en
              WhatsApp, Instagram y Google Maps.
            </p>
          </div>
        </div>

        {/* 4 KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Visitas Web */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8E2D8] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5E6D62]">
                  Visitas Web
                </span>
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] flex items-center justify-center text-[#26402B]">
                  <Globe className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-[#26402B] leading-none mb-2">
                {metrics.totalPageViews}
              </div>
            </div>
            <div className="pt-3 border-t border-[#F0EAE0] text-xs text-[#8A968E] space-y-1">
              <div>• {metrics.pageViewsOrganic} orgánicas</div>
              <div>• {metrics.pageViewsAds} desde Google Ads</div>
            </div>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="bg-white p-6 rounded-2xl border border-[#D2F2DD] bg-gradient-to-b from-white to-[#F0FBF4] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E8E47]">
                  Clics WhatsApp
                </span>
                <div className="w-8 h-8 rounded-full bg-[#E6F9ED] flex items-center justify-center text-[#1E8E47]">
                  <MessageCircle className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-[#1E8E47] leading-none mb-2">
                {metrics.totalWhatsAppClicks}
              </div>
            </div>
            <div className="pt-3 border-t border-[#D2F2DD] text-xs text-[#5E6D62]">
              Consultas directas a ventas
            </div>
          </div>

          {/* Card 3: Google Maps */}
          <div className="bg-white p-6 rounded-2xl border border-[#F5DDD4] bg-gradient-to-b from-white to-[#FDF6F3] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C27A65]">
                  Google Maps
                </span>
                <div className="w-8 h-8 rounded-full bg-[#FCECE6] flex items-center justify-center text-[#C27A65]">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-[#C27A65] leading-none mb-2">
                {metrics.totalGoogleMapsClicks}
              </div>
            </div>
            <div className="pt-3 border-t border-[#F5DDD4] text-xs text-[#5E6D62]">
              Búsquedas de ruta o local
            </div>
          </div>

          {/* Card 4: Instagram */}
          <div className="bg-white p-6 rounded-2xl border border-[#F0DCEB] bg-gradient-to-b from-white to-[#FAF4F8] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B3347C]">
                  Instagram
                </span>
                <div className="w-8 h-8 rounded-full bg-[#FBEBF5] flex items-center justify-center text-[#B3347C]">
                  <InstagramIcon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-[#B3347C] leading-none mb-2">
                {metrics.totalInstagramClicks}
              </div>
            </div>
            <div className="pt-3 border-t border-[#F0DCEB] text-xs text-[#5E6D62]">
              Visitas a @floresparquememo
            </div>
          </div>
        </div>

        {/* Conversion Rate Highlight */}
        <div className="bg-white border border-[#E8E2D8] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E8EFE9] flex items-center justify-center text-[#26402B] shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-base text-[#1D2520]">
                Tasa de Interacción / Conversión Global
              </div>
              <div className="text-xs text-[#5E6D62]">
                Porcentaje de visitas que hicieron al menos un clic en WhatsApp, Maps o Instagram
              </div>
            </div>
          </div>
          <div className="text-3xl font-black text-[#C27A65] shrink-0">
            {metrics.conversionRate}
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* WhatsApp Placements */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D8] shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-[#1E8E47] flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>Desglose WhatsApp</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-[#3E4D42]">
              {Object.entries(metrics.whatsAppByPlacement).map(([key, count]) => (
                <li key={key} className="flex items-center justify-between pb-1.5 border-b border-[#F0EAE0]">
                  <span>{placementLabels[key] || key}</span>
                  <span className="font-bold text-[#1E8E47]">{count} clics</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Google Maps Placements */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D8] shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-[#C27A65] flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Desglose Google Maps</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-[#3E4D42]">
              {Object.entries(metrics.googleMapsByPlacement).map(([key, count]) => (
                <li key={key} className="flex items-center justify-between pb-1.5 border-b border-[#F0EAE0]">
                  <span>{placementLabels[key] || key}</span>
                  <span className="font-bold text-[#C27A65]">{count} clics</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instagram Placements */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D8] shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-[#B3347C] flex items-center gap-2">
              <InstagramIcon className="w-4 h-4" />
              <span>Desglose Instagram</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-[#3E4D42]">
              {Object.entries(metrics.instagramByPlacement).map(([key, count]) => (
                <li key={key} className="flex items-center justify-between pb-1.5 border-b border-[#F0EAE0]">
                  <span>{placementLabels[key] || key}</span>
                  <span className="font-bold text-[#B3347C]">{count} clics</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Actions (Email & WhatsApp Share) */}
        <div className="bg-white border border-[#E8E2D8] rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="font-bold text-base text-[#1D2520]">
            Acciones Rápidas (Sin necesidad de claves)
          </h2>
          <div className="flex flex-col sm:flex-row gap-3.5">
            <a
              href={`https://wa.me/?text=${whatsappShareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Compartir este resumen por WhatsApp</span>
            </a>

            <a
              href="/api/reports/preview"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#F0EAE0] text-[#26402B] border border-[#E0D7CB] font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-2xs"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Ver plantilla de correo HTML</span>
            </a>
          </div>
          <p className="text-xs text-[#8A968E]">
            Destinatario configurado para reportes automáticos: <strong>floresdelparquemontoya@gmail.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
