import catalogoData from "@/data/catalogo.json";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { ArrowRight, Sparkles, Truck, Award } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";
import Image from "next/image";

export default function Hero() {
  const whatsappUrl = getWhatsAppUrl(catalogoData.hero.mensajeWhatsapp);

  return (
    <section className="relative overflow-hidden bg-[#203223] text-white py-16 sm:py-24 lg:py-28">
      {/* Background Image with warm dark gradient overlay for optimal readability */}
      <div className="absolute inset-0 z-0">
        <Image
          src={catalogoData.hero.imagenHero}
          alt="Taller floral artesanal en Pilar con flores frescas"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#17251A] via-[#1F3323]/90 to-[#17251A]/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EFE9]/15 border border-[#E8EFE9]/25 text-[#E8EFE9] text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#E2BAA8]" />
            <span>{catalogoData.hero.badge}</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15] mb-6">
            {catalogoData.hero.titulo}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-[#D3DDD5] font-normal leading-relaxed mb-8 max-w-2xl">
            {catalogoData.hero.subtitulo}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 sm:items-center">
            <a
              href="#catalogo"
              className="inline-flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-white text-[#203223] font-bold text-base px-7 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:translate-y-[-1px] active:translate-y-0"
            >
              <span>{catalogoData.hero.ctaCatalogo}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-base px-7 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:translate-y-[-1px] active:translate-y-0"
            >
              <WhatsAppIcon className="w-5 h-5 fill-white" />
              <span>{catalogoData.hero.ctaWhatsapp}</span>
            </a>
          </div>

          {/* Trust Value Highlights */}
          <div className="mt-12 pt-8 border-t border-[#FFFFFF]/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-[#D3DDD5]">
            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-[#E2BAA8] shrink-0" />
              <span>+30 años de oficio familiar</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#E2BAA8] shrink-0" />
              <span>Flores de mercado semanal</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#E2BAA8] shrink-0" />
              <span>Envíos a domicilio y countries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
