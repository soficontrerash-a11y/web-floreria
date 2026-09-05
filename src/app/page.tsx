import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Catalog from "@/components/Catalog";
import FlowerGallery from "@/components/FlowerGallery";
import InstagramBanner from "@/components/InstagramBanner";
import DeliverySection from "@/components/DeliverySection";
import EventsSection from "@/components/EventsSection";
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

        {/* 2. Bouquet Catalog (3 sizes + Rosas Clásicas, no small bouquets) */}
        <Catalog />

        {/* 3. Visual Gallery: "Nuestras Flores Habituales" */}
        <FlowerGallery />

        {/* 4. Instagram Integration (Stock in real time / Wednesday market) */}
        <InstagramBanner />

        {/* 5. Home Delivery (Pilar & surroundings) */}
        <DeliverySection />

        {/* 6. Events & Special Occasions */}
        <EventsSection />

        {/* 7. Where to find us & 30+ years history (Florería Memorial) */}
        <AboutLocation />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating persistent WhatsApp button */}
      <FloatingWhatsApp />
    </div>
  );
}
