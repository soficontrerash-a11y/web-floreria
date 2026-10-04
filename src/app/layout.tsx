import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import catalogoData from "@/data/catalogo.json";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Florería Memorial — Atención familiar y tradición floral en Pilar",
  description:
    "Más de 30 años acompañándote con flores frescas, calidez y atención personalizada en Pilar. Ramos de estación confeccionados en el día con flores frescas. Atendemos en nuestro local y realizamos envíos a domicilio en la zona.",
  keywords: [
    "Florería Memorial",
    "Florería Pilar",
    "Flores Parque Memorial",
    "Ramos de flores Pilar",
    "Flores de estación",
    "Envíos flores Pilar",
    "Arreglos florales Pilar"
  ],
  authors: [{ name: catalogoData.negocio.nombre }],
  openGraph: {
    title: "Florería Memorial — Atención familiar y tradición floral en Pilar",
    description:
      "Más de 30 años acompañándote con flores frescas, calidez y atención personalizada en Pilar.",
    url: "https://floreriapilar.com.ar",
    siteName: catalogoData.negocio.nombre,
    locale: "es_AR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#26402b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import AnalyticsProvider from "@/components/AnalyticsProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${sans.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#FAF7F2] text-[#1D2520] selection:bg-[#426148] selection:text-white">
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </body>
    </html>
  );
}
