import catalogoData from "@/data/catalogo.json";
import { Info, Flower2, Sparkles } from "lucide-react";
import Image from "next/image";

export default function FlowerGallery() {
  return (
    <section id="galeria" className="py-16 sm:py-24 bg-[#F4EFE6] relative scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EFE9] text-[#26402B] text-xs font-semibold uppercase tracking-wider mb-3">
            <Flower2 className="w-3.5 h-3.5 text-[#26402B]" />
            <span>Selección de Mercado Semanal</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D2520] tracking-tight mb-4">
            {catalogoData.floresHabituales.titulo}
          </h2>
          <p className="text-base sm:text-lg text-[#5E6D62] leading-relaxed">
            {catalogoData.floresHabituales.subtitulo}
          </p>

          {/* Required Note */}
          <div className="mt-5 inline-flex items-center gap-2 bg-white/85 backdrop-blur-sm border border-[#E2DAD0] px-4 py-2.5 rounded-full text-xs sm:text-sm text-[#4D5C51] shadow-xs">
            <Info className="w-4 h-4 text-[#26402B] shrink-0" />
            <span className="font-medium">{catalogoData.floresHabituales.nota}</span>
          </div>
        </div>

        {/* Flower Grid (8 varieties in balanced 4x2 / 2x4 grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {catalogoData.floresHabituales.items.map((flor) => (
            <div
              key={flor.id}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E8E2D8] hover:border-[#26402B]/40 transition-all duration-300 hover:shadow-lg flex flex-col"
            >
              {/* Image with zoom effect */}
              <div className="relative h-60 w-full overflow-hidden bg-[#EAE3D7]">
                <Image
                  src={flor.imagen}
                  alt={flor.nombre}
                  fill
                  quality={95}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-75 group-hover:opacity-60 transition-opacity" />

                {/* Badge for real photos */}
                {flor.fotoReal && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#26402B]/90 backdrop-blur-sm text-white text-[11px] font-bold tracking-wide shadow-xs">
                      <Sparkles className="w-3 h-3 text-[#E2BAA8]" />
                      <span>Foto Real</span>
                    </span>
                  </div>
                )}

                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-serif text-lg font-bold text-white drop-shadow-sm">
                    {flor.nombre}
                  </h3>
                </div>
              </div>

              {/* Text content */}
              <div className="p-4 flex-grow flex items-center bg-white">
                <p className="text-xs text-[#5E6D62] leading-relaxed">
                  {flor.caracteristica}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
