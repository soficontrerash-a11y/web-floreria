import catalogoData from "@/data/catalogo.json";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";
import { Check, Info, Sparkles, AlertCircle } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";
import Image from "next/image";

export default function Catalog() {
  return (
    <section id="catalogo" className="py-16 sm:py-24 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EFE9] text-[#26402B] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C27A65]" />
            <span>Arreglos Artesanales Protagonistas</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D2520] tracking-tight mb-4">
            {catalogoData.catalogo.titulo}
          </h2>
          <p className="text-base sm:text-lg text-[#5E6D62] leading-relaxed">
            {catalogoData.catalogo.subtitulo}
          </p>

          {/* Visible Disclaimer as explicitly required */}
          <div className="mt-6 inline-flex items-start sm:items-center gap-2.5 bg-[#F4EFE6] border border-[#E4DCCE] px-4 py-3 rounded-xl text-xs sm:text-sm text-[#3E4D42] text-left sm:text-center shadow-xs">
            <Info className="w-4 h-4 text-[#26402B] shrink-0 mt-0.5 sm:mt-0" />
            <span className="font-medium">
              {catalogoData.catalogo.aclaracion}
            </span>
          </div>
        </div>

        {/* Product Cards Grid: Exactly 4 products (3 sizes + Rosas Clásicas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {catalogoData.catalogo.productos.map((producto) => {
            const productWhatsAppUrl = getProductWhatsAppUrl(producto.nombre);

            return (
              <div
                key={producto.id}
                className={`flex flex-col bg-white rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${
                  producto.destacado
                    ? "border-[#26402B] ring-2 ring-[#26402B]/15 shadow-md"
                    : "border-[#E8E2D8] hover:border-[#D5CBC0]"
                }`}
              >
                {/* Product Image Container */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#F4EFE6]">
                  <Image
                    src={producto.imagen}
                    alt={producto.nombre}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                        producto.destacado
                          ? "bg-[#26402B] text-white"
                          : "bg-white/90 backdrop-blur-md text-[#203223]"
                      }`}
                    >
                      {producto.etiqueta}
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between bg-white">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1D2520] mb-2">
                      {producto.nombre}
                    </h3>
                    <p className="text-sm sm:text-base text-[#5E6D62] mb-5 font-normal">
                      {producto.descripcion}
                    </p>

                    {/* Rosas Clásicas specific note if applicable */}
                    {"notaExclusiva" in producto && producto.notaExclusiva && (
                      <div className="mb-5 p-3.5 bg-[#FFF7F5] border border-[#F2DCD5] rounded-xl flex items-start gap-2 text-xs text-[#A84B34]">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span className="font-medium">{producto.notaExclusiva}</span>
                      </div>
                    )}

                    {/* Features List */}
                    <div className="space-y-2.5 mb-6 pt-2 border-t border-[#F3EEE5]">
                      {producto.detalles.map((detalle, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3E4D42]">
                          <Check className="w-4 h-4 text-[#26402B] shrink-0 mt-0.5" />
                          <span>{detalle}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Button via WhatsApp */}
                  <div className="pt-4 border-t border-[#F3EEE5] mt-auto">
                    <a
                      href={productWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.99]"
                    >
                      <WhatsAppIcon className="w-5 h-5 fill-white" />
                      <span>Pedir por WhatsApp</span>
                    </a>
                    <p className="text-[11px] text-center text-[#7F8F83] mt-2">
                      Consulta directa por variedades frescas del día
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
