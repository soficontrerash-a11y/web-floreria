import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Catalog from "@/components/Catalog";
import FlowerGallery from "@/components/FlowerGallery";
import ServicesSection from "@/components/ServicesSection";
import InstagramBanner from "@/components/InstagramBanner";
import AboutLocation from "@/components/AboutLocation";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1D2520]">
      {/* Header & Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* 1. Hero & Value Proposition */}
        <Hero />

        {/* 2. Bouquet Catalog (3 sizes + Rosas Clásicas) */}
        <Catalog />

        {/* 3. Visual Gallery: "Nuestras Flores Habituales" */}
        <FlowerGallery />

        {/* 4. Servicios Claros y Simples (Local, Envíos, WhatsApp) */}
        <ServicesSection />

        {/* 5. Instagram Integration (Stock semanal de mercado) */}
        <InstagramBanner />

        {/* 6. Nuestra Historia y Ubicación en Parque Memorial */}
        <AboutLocation />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating persistent WhatsApp button */}
      <FloatingWhatsApp />
    </div>
  );
}
