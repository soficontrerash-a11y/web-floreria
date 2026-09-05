import catalogoData from "@/data/catalogo.json";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Truck, MapPin, ShieldCheck, Clock, AlertCircle } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";

export default function DeliverySection() {
  const whatsappDeliveryUrl = getWhatsAppUrl(catalogoData.envios.mensajeWhatsapp);

  return (
    <section id="envios" className="py-16 sm:py-24 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border border-[#E8E2D8] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EFE9] text-[#26402B] text-xs font-semibold uppercase tracking-wider">
                <Truck className="w-3.5 h-3.5 text-[#26402B]" />
                <span>Zona Pilar y Alrededores</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D2520] tracking-tight">
                {catalogoData.envios.titulo}
              </h2>

              <p className="text-base sm:text-lg text-[#5E6D62] leading-relaxed">
                {catalogoData.envios.descripcion}
              </p>

              {/* Required Disclaimer */}
              <div className="p-4 bg-[#F8F5EE] border border-[#E8E0D2] rounded-2xl flex items-start gap-3 text-xs sm:text-sm text-[#4D5C51]">
                <AlertCircle className="w-4 h-4 text-[#C27A65] shrink-0 mt-0.5" />
                <span className="font-medium">
                  {catalogoData.envios.aclaracion}
                </span>
              </div>

              {/* Delivery Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {catalogoData.envios.beneficios.map((beneficio, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#ECE5DA]">
                    <div className="flex items-center gap-2 mb-1.5">
                      {i === 0 && <ShieldCheck className="w-4 h-4 text-[#26402B]" />}
                      {i === 1 && <Clock className="w-4 h-4 text-[#26402B]" />}
                      {i === 2 && <MapPin className="w-4 h-4 text-[#26402B]" />}
                      <h4 className="font-serif text-sm font-bold text-[#1D2520]">
                        {beneficio.titulo}
                      </h4>
                    </div>
                    <p className="text-xs text-[#5E6D62] leading-relaxed">
                      {beneficio.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <a
                  href={whatsappDeliveryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-base px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.99]"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  <span>{catalogoData.envios.boton}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Visual Area Coverage Chips (5 cols) */}
            <div className="lg:col-span-5 bg-[#FAF7F2] border border-[#E8E0D2] rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2 text-[#26402B] font-bold text-sm mb-4">
                <MapPin className="w-4 h-4 text-[#C27A65]" />
                <span className="font-serif text-base">Zonas habituales de reparto</span>
              </div>
              <p className="text-xs text-[#5E6D62] mb-5">
                Coordinamos envíos a domicilios particulares, salones y accesos a barrios cerrados:
              </p>

              <div className="flex flex-wrap gap-2">
                {catalogoData.envios.zonasDestacadas.map((zona, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#DDD4C7] text-xs font-medium text-[#38483C] shadow-2xs hover:border-[#26402B] transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#26402B]" />
                    {zona}
                  </span>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8E0D2] flex items-center justify-between text-xs text-[#6B7C6F]">
                <span>¿Tu barrio no figura en la lista?</span>
                <a
                  href={whatsappDeliveryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#26402B] hover:underline"
                >
                  Consultanos
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
