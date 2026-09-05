import catalogoData from "@/data/catalogo.json";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MapPin, Clock, Phone, Award, Heart, Sparkles, Mail, ExternalLink, Navigation } from "lucide-react";
import { WhatsAppIcon, InstagramIcon } from "@/components/Icons";
import Image from "next/image";

export default function AboutLocation() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <section id="sobre-nosotros" className="py-16 sm:py-24 bg-[#FAF7F2] relative scroll-mt-10">
      <div id="historia" className="scroll-mt-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section: Story & Tradition with Local Facade Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-20">
          {/* Left Column: Text narrative of family tradition (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EFE9] text-[#26402B] text-xs font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#26402B]" />
              <span>Tradición Familiar en Pilar</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D2520] tracking-tight leading-[1.15]">
              {catalogoData.trayectoria.titulo}
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-[#3E4D42] leading-relaxed">
              {catalogoData.trayectoria.descripcion}
            </p>

            {/* Visit invitation notice */}
            <div className="p-4 sm:p-5 bg-[#F4EFE6] border border-[#E4DCCE] rounded-2xl text-xs sm:text-sm text-[#2E3C32] leading-relaxed space-y-1 shadow-xs">
              <p className="font-semibold text-[#203223]">
                📍 Atención presencial y envíos coordinados:
              </p>
              <p>
                {catalogoData.trayectoria.invitacion}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#3E4D42]">
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-[#E8E0D2] shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#C27A65]" />
                <span>+30 años de oficio ininterrumpido</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-[#E8E0D2] shadow-2xs">
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
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority={false}
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none" />
                <div className="absolute top-3 left-3 bg-[#26402B]/90 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                  Puesto Parque Memorial
                </div>
              </div>

              {/* Warm required caption */}
              <figcaption className="pt-4 pb-1 px-2 text-center">
                <p className="font-serif italic text-sm sm:text-base text-[#3E4D42] leading-relaxed">
                  &ldquo;{catalogoData.trayectoria.pieDeFotoFachada}&rdquo;
                </p>
                <span className="inline-block mt-1.5 text-[11px] text-[#8A968E] uppercase tracking-wider font-semibold">
                  {catalogoData.negocio.nombre} • Parque Memorial
                </span>
              </figcaption>
            </figure>
          </div>
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
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1D2520] mt-1 mb-4">
                  {catalogoData.trayectoria.localNombre}
                </h3>

                {/* Location items */}
                <div className="space-y-4 text-sm text-[#3E4D42]">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#ECE5DA] shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-[#26402B]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1D2520]">Dirección</p>
                      <p className="text-xs sm:text-sm text-[#5E6D62] mt-0.5">
                        {catalogoData.negocio.ubicacion}
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#ECE5DA] shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-[#26402B]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1D2520]">Horarios de Atención</p>
                      <p className="text-xs sm:text-sm text-[#5E6D62] mt-0.5">
                        {catalogoData.negocio.horariosAtencion}
                      </p>
                      <p className="text-xs text-[#8A968E] mt-0.5">
                        {catalogoData.negocio.horariosEnvios}
                      </p>
                    </div>
                  </div>

                  {/* Phones */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#ECE5DA] shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 text-[#26402B]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1D2520]">Teléfonos de Contacto</p>
                      <p className="text-xs sm:text-sm text-[#5E6D62] mt-0.5">
                        Teléfono Local: <a href={`tel:${catalogoData.negocio.telefonoFijo.replace(/\s+/g, '')}`} className="font-medium hover:text-[#26402B] underline">{catalogoData.negocio.telefonoFijo}</a>
                      </p>
                      <p className="text-xs sm:text-sm text-[#5E6D62] mt-0.5">
                        WhatsApp: <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-[#25D366] hover:underline">{catalogoData.negocio.telefonoMostrar}</a>
                      </p>
                    </div>
                  </div>

                  {/* Email & Instagram */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#ECE5DA] shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-[#26402B]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1D2520]">Email & Redes</p>
                      <p className="text-xs sm:text-sm text-[#5E6D62] mt-0.5">
                        <a href={`mailto:${catalogoData.negocio.email}`} className="hover:text-[#26402B] underline">
                          {catalogoData.negocio.email}
                        </a>
                      </p>
                      <p className="text-xs sm:text-sm text-[#5E6D62] mt-0.5 flex items-center gap-1.5">
                        <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C]" />
                        <a href={catalogoData.negocio.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#E1306C] underline">
                          @{catalogoData.negocio.instagramUser}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions: Map button + WhatsApp button */}
              <div className="pt-4 border-t border-[#F3EEE5] flex flex-col sm:flex-row gap-3">
                <a
                  href={catalogoData.negocio.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#203223] hover:bg-[#162419] text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-xs group"
                >
                  <Navigation className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span>Ver en Google Maps o cómo llegar</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
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
            <div className="lg:col-span-7 h-80 sm:h-96 lg:h-auto min-h-[380px] relative bg-[#EFE9DD] border-t lg:border-t-0 lg:border-l border-[#E8E2D8] flex flex-col">
              <iframe
                src={catalogoData.negocio.googleMapsEmbed}
                title="Mapa de ubicación Florería Memorial en Cementerio Memorial Pilar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[380px] filter grayscale-[10%] contrast-[1.02]"
              />
              <div className="absolute bottom-4 right-4 z-10">
                <a
                  href={catalogoData.negocio.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md text-[#203223] hover:bg-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-md border border-[#E8E2D8] transition-all"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#26402B]" />
                  <span>Cómo llegar</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
