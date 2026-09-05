import catalogoData from "@/data/catalogo.json";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Flower2, Calendar, Store } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";

export default function ServicesSection() {
  const iconMap: Record<string, React.ReactNode> = {
    colocacion: <Flower2 className="w-6 h-6 text-[#26402B]" />,
    eventos: <Calendar className="w-6 h-6 text-[#26402B]" />,
    "atencion-envios": <Store className="w-6 h-6 text-[#26402B]" />,
  };

  return (
    <section id="servicios" className="py-16 sm:py-24 bg-[#FAF7F2] relative scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EFE9] text-[#26402B] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Propuestas y Asistencia</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D2520] tracking-tight mb-4">
            {catalogoData.servicios.titulo}
          </h2>
          <p className="text-base sm:text-lg text-[#5E6D62] leading-relaxed max-w-2xl mx-auto">
            {catalogoData.servicios.subtitulo}
          </p>
        </div>

        {/* 3 Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {catalogoData.servicios.propuestas.map((propuesta) => {
            const whatsappUrl = getWhatsAppUrl(propuesta.mensajeWhatsapp);

            return (
              <div
                key={propuesta.id}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-[#E8E2D8] shadow-xs hover:border-[#26402B]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E8EFE9] border border-[#D5E0D7] flex items-center justify-center mb-5">
                    {iconMap[propuesta.id]}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1D2520] mb-3 leading-snug">
                    {propuesta.titulo}
                  </h3>
                  <p className="text-sm text-[#5E6D62] leading-relaxed mb-6">
                    {propuesta.detalle}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EAE0]">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#25D366] text-[#26402B] hover:text-white border border-[#E0D7CB] hover:border-[#25D366] font-semibold text-sm py-3 px-4 rounded-xl transition-all shadow-2xs group"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current transition-colors" />
                    <span>{propuesta.boton}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
