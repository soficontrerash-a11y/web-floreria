import catalogoData from "@/data/catalogo.json";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/Icons";
import Image from "next/image";

export default function Footer() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <footer className="bg-[#1C2C1F] text-[#FAF7F2] border-t border-[#2F4734] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2E4533]">
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#44654B] bg-white shadow-sm shrink-0">
                <Image
                  src={catalogoData.negocio.logo || "/logo.jpg"}
                  alt="Logo Florería Memorial"
                  fill
                  quality={95}
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">
                {catalogoData.negocio.nombre}
              </span>
            </div>
            <p className="text-sm text-[#BDCEBF] max-w-sm leading-relaxed">
              Más de 30 años acompañándote con flores frescas, calidez y atención personalizada en Pilar. Confeccionamos ramos de estación en el día con flores de mercado y realizamos envíos a domicilio en la zona.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={catalogoData.negocio.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2E4533] hover:bg-[#E1306C] flex items-center justify-center text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2E4533] hover:bg-[#25D366] flex items-center justify-center text-white transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold text-white tracking-wide">
              Secciones
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#BDCEBF]">
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Ramos de Estación
                </a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-white transition-colors">
                  Flores Habituales
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Nuestros Servicios
                </a>
              </li>
              <li>
                <a href="#historia" className="hover:text-white transition-colors">
                  Nuestra Historia
                </a>
              </li>
              <li>
                <a href="#ubicacion" className="hover:text-white transition-colors">
                  Ubicación & Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="lg:col-span-4 space-y-3 text-xs sm:text-sm text-[#BDCEBF]">
            <h4 className="font-serif text-base font-bold text-white tracking-wide">
              Contacto & Atención
            </h4>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#E2BAA8] shrink-0 mt-0.5" />
              <span>{catalogoData.negocio.ubicacion}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#E2BAA8] shrink-0 mt-0.5" />
              <span>{catalogoData.negocio.horariosAtencion}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-[#E2BAA8] shrink-0 mt-0.5" />
              <span>Teléfono Local: {catalogoData.negocio.telefonoFijo}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <WhatsAppIcon className="w-4 h-4 text-[#E2BAA8] shrink-0 mt-0.5" />
              <span>WhatsApp: {catalogoData.negocio.telefonoMostrar}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-[#E2BAA8] shrink-0 mt-0.5" />
              <span>{catalogoData.negocio.email}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8DA091] gap-4">
          <p>
            © {new Date().getFullYear()} {catalogoData.negocio.nombre}. Atención familiar y tradición floral en Pilar.
          </p>
          <p className="flex items-center gap-1">
            Dedicación y respeto por el oficio floral en Pilar.
          </p>
        </div>
      </div>
    </footer>
  );
}
