import catalogoData from "@/data/catalogo.json";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Truck, ShieldCheck, Clock, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";

export default function DeliverySection() {
  const whatsappUrl = getWhatsAppUrl(catalogoData.envios.mensajeWhatsapp);

  const icons = [
    <ShieldCheck key="shield" className="w-5 h-5 text-[#26402B]" />,
    <Clock key="clock" className="w-5 h-5 text-[#26402B]" />,
    <MapPin key="map" className="w-5 h-5 text-[#26402B]" />,
  ];

  return (
    <section id="envios" className="py-16 sm:py-24 bg-[#FAF7F2] relative scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E8E2D8] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xs max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EFE9] text-[#26402B] text-xs font-semibold uppercase tracking-wider mb-4">
              <Truck className="w-3.5 h-3.5 text-[#26402B]" />
              <span>Envíos a Domicilio</span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D2520] tracking-tight mb-4">
              {catalogoData.envios.titulo}
            </h2>

            {/* Subtitle / Delivery coordination message */}
            <p className="text-base sm:text-lg lg:text-xl text-[#3E4D42] leading-relaxed mb-8 max-w-2xl mx-auto">
              {catalogoData.envios.subtitulo}
            </p>

            {/* Direct WhatsApp CTA Button */}
            <div className="mb-10">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-base px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:translate-y-[-1px] active:translate-y-0"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                <span>{catalogoData.envios.boton}</span>
              </a>
            </div>

            {/* Simple Trust Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-8 border-t border-[#F0EAE0] text-left">
              {catalogoData.envios.beneficios.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#ECE5DA]">
                  <div className="flex items-center gap-2.5 mb-2">
                    {icons[idx]}
                    <h3 className="font-serif text-sm font-bold text-[#1D2520]">
                      {item.titulo}
                    </h3>
                  </div>
                  <p className="text-xs text-[#5E6D62] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
