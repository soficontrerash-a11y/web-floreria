import catalogoData from "@/data/catalogo.json";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Sparkles, HeartHandshake, Wine, PartyPopper } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";

export default function EventsSection() {
  const whatsappEventsUrl = getWhatsAppUrl(catalogoData.eventos.mensajeWhatsapp);

  const eventIcons = [
    <Wine key="wine" className="w-5 h-5 text-[#C27A65]" />,
    <PartyPopper key="party" className="w-5 h-5 text-[#C27A65]" />,
    <HeartHandshake key="heart" className="w-5 h-5 text-[#C27A65]" />,
  ];

  return (
    <section id="eventos" className="py-16 sm:py-24 bg-[#F4EFE6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EFE9] text-[#26402B] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C27A65]" />
            <span>Ambientaciones & Festejos</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D2520] tracking-tight mb-4">
            {catalogoData.eventos.titulo}
          </h2>

          <p className="text-base sm:text-lg text-[#5E6D62] leading-relaxed max-w-2xl mx-auto">
            {catalogoData.eventos.descripcion}
          </p>
        </div>

        {/* Proposals Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          {catalogoData.eventos.propuestas.map((propuesta, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-[#E8E2D8] shadow-xs hover:border-[#26402B]/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#ECE5DA] flex items-center justify-center mb-4">
                  {eventIcons[idx % eventIcons.length]}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1D2520] mb-2">
                  {propuesta.titulo}
                </h3>
                <p className="text-xs sm:text-sm text-[#5E6D62] leading-relaxed">
                  {propuesta.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#F3EEE5] text-[11px] font-semibold text-[#26402B] uppercase tracking-wider">
                Diseño a medida
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center">
          <a
            href={whatsappEventsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-base px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.99]"
          >
            <WhatsAppIcon className="w-5 h-5 fill-white" />
            <span>{catalogoData.eventos.boton}</span>
          </a>
          <p className="text-xs text-[#7F8F83] mt-3">
            Recomendamos consultar con 3 a 7 días de anticipación
          </p>
        </div>
      </div>
    </section>
  );
}
