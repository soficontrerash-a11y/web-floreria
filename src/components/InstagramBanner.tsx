import catalogoData from "@/data/catalogo.json";
import { Calendar } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";

export default function InstagramBanner() {
  return (
    <section className="py-12 sm:py-16 bg-[#26402B] text-white relative overflow-hidden">
      {/* Decorative floral texture circles */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-[#325239]/40 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 rounded-full bg-[#1C3020]/60 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#1F3523] border border-[#3E5C43] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Column: Icon & Content */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 lg:max-w-3xl">
            {/* Instagram Gradient Icon Container in Circle */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] flex items-center justify-center text-white shrink-0 shadow-lg">
              <InstagramIcon className="w-9 h-9 sm:w-11 sm:h-11 text-white" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#325239] text-[#E8EFE9] text-xs font-semibold tracking-wide">
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-3 h-3 text-[#E2BAA8]" />
                </div>
                <span>Ingreso de flores frescas todos los miércoles</span>
              </div>
              <h3 className="font-sans text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF7F2] leading-snug">
                {catalogoData.instagramBanner.titulo}
              </h3>
              <p className="text-sm text-[#D0DDD2]">
                {catalogoData.instagramBanner.subtitulo}{" "}
                <span className="font-semibold text-white">
                  {catalogoData.instagramBanner.tagInstagram}
                </span>
              </p>
            </div>
          </div>

          {/* Right Column: CTA Button without internal icon */}
          <div className="w-full sm:w-auto shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={catalogoData.negocio.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-[#E1306C] to-[#C13584] hover:from-[#d82a65] hover:to-[#b12f79] text-white font-bold text-sm sm:text-base px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              <span>{catalogoData.instagramBanner.boton}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
