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
  title: "Taller Floral Pilar | Flores Frescas de Mercado & Envíos a Domicilio",
  description:
    "Más de 30 años de oficio floral y dedicación familiar en Pilar. Ramos artesanales confeccionados con las mejores flores del mercado semanal. Envíos programados a countries y hogares.",
  keywords: [
    "Florería Pilar",
    "Ramos de flores Pilar",
    "Flores frescas mercado",
    "Envíos flores Pilar",
    "Florería Memorial",
    "Flores countries Pilar",
    "Ramos de estación",
    "Arreglos florales Pilar"
  ],
  authors: [{ name: catalogoData.negocio.nombre }],
  openGraph: {
    title: "Taller Floral Pilar — Flores Frescas & Oficio Familiar",
    description:
      "Más de 30 años de oficio floral en Pilar. Ramos de estación con flores frescas del mercado semanal y envíos a domicilio.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${sans.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#FAF7F2] text-[#1D2520] selection:bg-[#426148] selection:text-white">
        {children}
      </body>
    </html>
  );
}
