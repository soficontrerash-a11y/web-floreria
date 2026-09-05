import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FlowerGallery from "@/components/FlowerGallery";
import ServicesSection from "@/components/ServicesSection";
import DeliverySection from "@/components/DeliverySection";
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
        {/* 1. Portada */}
        <Hero />

        {/* 2. Nuestras Flores Habituales */}
        <FlowerGallery />

        {/* 3. Nuestros Servicios (Colocación, Eventos, Atención y Envíos) */}
        <ServicesSection />

        {/* 4. Envíos a Domicilio */}
        <DeliverySection />

        {/* 5. Novedades en Instagram */}
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
