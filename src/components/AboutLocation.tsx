import catalogoData from "@/data/catalogo.json";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MapPin, Clock, Phone, Navigation, Award, Heart, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";
import Image from "next/image";

export default function AboutLocation() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <section id="sobre-nosotros" className="py-16 sm:py-24 bg-[#FAF7F2] relative scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section: Story & Tradition with Local Facade Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-20">
          {/* Left Column: Text narrative of family tradition (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EFE9] text-[#26402B] text-xs font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#C27A65]" />
              <span>Sobre Nosotros • Oficio & Tradición Familiar</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D2520] tracking-tight leading-[1.15]">
              {catalogoData.trayectoria.titulo}
            </h2>

            <p className="text-lg sm:text-xl text-[#26402B] font-medium leading-relaxed">
              {catalogoData.trayectoria.descripcion}
            </p>

            <p className="text-sm sm:text-base text-[#5E6D62] leading-relaxed">
              {catalogoData.trayectoria.historia}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#3E4D42]">
              <div className="flex items-center gap-2 bg-[#F4EFE6] px-3.5 py-2 rounded-xl border border-[#E8E0D2]">
                <Sparkles className="w-4 h-4 text-[#C27A65]" />
                <span>+30 años de oficio ininterrumpido</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F4EFE6] px-3.5 py-2 rounded-xl border border-[#E8E0D2]">
                <Heart className="w-4 h-4 text-[#C27A65]" />
                <span>Atención familiar y personalizada</span>
              </div>
            </div>
          </div>

          {/* Right Column: Physical stand photo + warm caption (5 cols) */}
          <div className="lg:col-span-5">
            <figure className="bg-white p-3.5 sm:p-4 rounded-3xl border border-[#E8E2D8] shadow-md transition-all hover:shadow-xl group">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#EAE3D7]">
                <Image
                  src={catalogoData.trayectoria.imagenFachada}
                  alt="Fachada del puesto tradicional de Florería Memorial en Pilar"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority={false}
                />
                <div className="absolute top-3 left-3 bg-[#26402B]/85 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                  Puesto Tradicional en Pilar
                </div>
              </div>

              {/* Warm required caption */}
              <figcaption className="pt-4 pb-1 px-2 text-center">
                <p className="font-serif italic text-sm sm:text-base text-[#3E4D42] leading-relaxed">
                  &ldquo;{catalogoData.trayectoria.pieDeFotoFachada}&rdquo;
                </p>
                <span className="inline-block mt-1 text-[11px] text-[#8A968E] uppercase tracking-wider font-semibold">
                  Florería Memorial • La Lonja, Pilar
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* 3 Pillars / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {catalogoData.trayectoria.puntosFuertes.map((punto, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-[#E8E2D8] shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E8EFE9] text-[#26402B] flex items-center justify-center mb-4">
                {idx === 0 && <Award className="w-5 h-5" />}
                {idx === 1 && <Navigation className="w-5 h-5" />}
                {idx === 2 && <Heart className="w-5 h-5" />}
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1D2520] mb-2">
                {punto.titulo}
              </h3>
              <p className="text-xs sm:text-sm text-[#5E6D62] leading-relaxed">
                {punto.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Location & Map Grid */}
        <div id="ubicacion" className="bg-white border border-[#E8E2D8] rounded-3xl overflow-hidden shadow-sm scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Info Column (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C27A65]">
                  {catalogoData.trayectoria.localTitulo}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1D2520] mt-1 mb-4">
                  {catalogoData.trayectoria.localNombre}
                </h3>

                {/* Location item */}
                <div className="space-y-4 text-sm text-[#3E4D42]">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#ECE5DA] shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-[#26402B]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1D2520]">Dirección Física</p>
                      <p className="text-xs sm:text-sm text-[#5E6D62] mt-0.5">
                        {catalogoData.negocio.ubicacion}
                      </p>
                      <p className="text-xs text-[#8A968E] mt-1">
                        {catalogoData.trayectoria.referencia}
                      </p>
                    </div>
                  </div>

                  {/* Hours item */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#ECE5DA] shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-[#26402B]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1D2520]">Horarios de Atención</p>
                      <p className="text-xs sm:text-sm text-[#5E6D62] mt-0.5">
                        {catalogoData.trayectoria.horariosAtencion}
                      </p>
                      <p className="text-xs text-[#8A968E] mt-0.5">
                        Envíos programados de Lunes a Sábado
                      </p>
                    </div>
                  </div>

                  {/* Phone / Contact */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#ECE5DA] shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 text-[#26402B]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1D2520]">Teléfonos de Contacto</p>
                      <p className="text-xs sm:text-sm text-[#5E6D62] mt-0.5">
                        WhatsApp: {catalogoData.negocio.telefonoMostrar}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#F3EEE5] flex flex-col sm:flex-row gap-3">
                <a
                  href={catalogoData.negocio.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#203223] hover:bg-[#162419] text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-xs"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Cómo Llegar con Google Maps</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-xs"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>Escribir al WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Interactive Google Map Column (7 cols) */}
            <div className="lg:col-span-7 h-80 sm:h-96 lg:h-auto min-h-[350px] relative bg-[#EFE9DD] border-t lg:border-t-0 lg:border-l border-[#E8E2D8]">
              <iframe
                src={catalogoData.negocio.googleMapsEmbed}
                title="Mapa de ubicación Florería Memorial en Pilar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[350px] filter grayscale-[15%] contrast-[1.05]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
