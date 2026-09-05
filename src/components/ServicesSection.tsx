import catalogoData from "@/data/catalogo.json";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Store, Truck, MessageSquare, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";

export default function ServicesSection() {
  const whatsappUrl = getWhatsAppUrl("Hola, me gustaría consultar por las flores del día en Florería Memorial.");

  const iconMap: Record<string, React.ReactNode> = {
    local: <Store className="w-6 h-6 text-[#26402B]" />,
    envios: <Truck className="w-6 h-6 text-[#26402B]" />,
    consultas: <MessageSquare className="w-6 h-6 text-[#26402B]" />,
  };

  return (
    <section id="servicios" className="py-16 sm:py-24 bg-[#F4EFE6] relative scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EFE9] text-[#26402B] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>{catalogoData.servicios.titulo}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D2520] tracking-tight mb-4">
            Atención Tradicional y Cercana
          </h2>
          <p className="text-base sm:text-lg text-[#5E6D62] leading-relaxed max-w-2xl mx-auto">
            {catalogoData.servicios.subtitulo}
          </p>
        </div>

        {/* 3 Simple Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {catalogoData.servicios.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-7 sm:p-8 border border-[#E8E2D8] shadow-xs hover:border-[#26402B]/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E8EFE9] border border-[#D5E0D7] flex items-center justify-center mb-5">
                  {iconMap[item.id]}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1D2520] mb-3">
                  {item.titulo}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-[#26402B] mb-3 leading-snug">
                  {item.descripcion}
                </p>
                <p className="text-xs sm:text-sm text-[#5E6D62] leading-relaxed">
                  {item.detalle}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#F0EAE0] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#8A968E] uppercase tracking-wider">
                  {item.etiqueta}
                </span>
                {item.id === "consultas" && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#25D366] hover:text-[#20ba5a] transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>Consultar</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Delivery zones compact highlight */}
        <div className="bg-white/85 border border-[#E2DAD0] rounded-2xl p-5 sm:p-6 text-center max-w-4xl mx-auto shadow-xs">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#4D5C51]">
            <span className="inline-flex items-center gap-1.5 font-bold text-[#1D2520]">
              <MapPin className="w-4 h-4 text-[#26402B]" />
              Zonas de reparto:
            </span>
            {catalogoData.servicios.zonas.map((zona, idx) => (
              <span
                key={idx}
                className="bg-[#FAF7F2] border border-[#E8E2D8] px-2.5 py-1 rounded-lg text-xs text-[#3E4D42] font-medium"
              >
                {zona}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
