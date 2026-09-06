import catalogoData from "@/data/catalogo.json";
import { Flower2 } from "lucide-react";
import Image from "next/image";

export default function FlowerGallery() {
  return (
    <section id="galeria" className="py-16 sm:py-24 bg-[#F4EFE6] relative scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EFE9] text-[#26402B] text-xs font-semibold uppercase tracking-wider mb-3">
            <div className="w-5 h-5 rounded-full bg-[#26402B]/10 flex items-center justify-center shrink-0">
              <Flower2 className="w-3.5 h-3.5 text-[#26402B]" />
            </div>
            <span>Flores de Estación</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D2520] tracking-tight mb-4">
            {catalogoData.floresHabituales.titulo}
          </h2>
          <p className="text-base sm:text-lg text-[#5E6D62] leading-relaxed max-w-2xl mx-auto">
            {catalogoData.floresHabituales.subtitulo}
          </p>
        </div>

        {/* Flower Grid (6 cards: photo and flower name) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {catalogoData.floresHabituales.items.map((flor) => (
            <div
              key={flor.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E8E2D8] hover:border-[#26402B]/40 transition-all duration-300 hover:shadow-lg flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE3D7]">
                <Image
                  src={flor.imagen}
                  alt={flor.nombre}
                  fill
                  quality={95}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Card footer: Only Name */}
              <div className="p-5 text-center bg-white border-t border-[#F0EAE0]">
                <h3 className="font-sans text-lg sm:text-xl font-bold text-[#1D2520]">
                  {flor.nombre}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
