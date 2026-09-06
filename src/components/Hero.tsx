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
          alt="Florería Memorial en Pilar — Flores frescas"
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
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#E8EFE9]/15 border border-[#E8EFE9]/25 text-[#E8EFE9] text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm">
            <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <Sparkles className="w-3 h-3 text-[#E2BAA8]" />
            </div>
            <span>{catalogoData.hero.badge}</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.12] mb-5">
            {catalogoData.hero.titulo}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-[#E8EFE9] font-normal leading-relaxed mb-4 max-w-2xl font-sans">
            {catalogoData.hero.subtitulo}
          </p>

          {/* Aclaración sencilla */}
          <p className="text-sm sm:text-base text-[#D0DDD2] leading-relaxed mb-8 max-w-2xl border-l-2 border-[#E2BAA8]/70 pl-3.5 py-0.5">
            {catalogoData.hero.aclaracion}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 sm:items-center">
            <a
              href="#galeria"
              className="inline-flex items-center justify-center gap-2.5 bg-[#FAF7F2] hover:bg-white text-[#203223] font-bold text-base px-7 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:translate-y-[-1px] active:translate-y-0"
            >
              <span>{catalogoData.hero.ctaFlores}</span>
              <span className="w-6 h-6 rounded-full bg-[#203223]/10 flex items-center justify-center shrink-0">
                <ArrowRight className="w-3.5 h-3.5 text-[#203223]" />
              </span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-base px-7 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:translate-y-[-1px] active:translate-y-0"
            >
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <WhatsAppIcon className="w-4 h-4 fill-white" />
              </span>
              <span>{catalogoData.hero.ctaWhatsapp}</span>
            </a>
          </div>

          {/* Trust Value Highlights */}
          <div className="mt-12 pt-8 border-t border-[#FFFFFF]/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-[#D3DDD5]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4 text-[#E2BAA8]" />
              </div>
              <span>+30 años de oficio familiar</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#E2BAA8]" />
              </div>
              <span>Flores frescas de estación</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4 text-[#E2BAA8]" />
              </div>
              <span>Atención en el local y envíos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
