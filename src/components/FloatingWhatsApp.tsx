"use client";

import { useState } from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { X } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";

export default function FloatingWhatsApp() {
  const [tooltipVisible, setTooltipVisible] = useState(true);
  const whatsappUrl = getWhatsAppUrl();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 pointer-events-none">
      {/* Friendly Tooltip Bubble */}
      {tooltipVisible && (
        <div className="pointer-events-auto flex items-center gap-2.5 bg-white border border-[#E0D7CB] py-2 px-3.5 rounded-2xl shadow-xl text-xs text-[#1D2520] animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-[250px]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] shrink-0 animate-ping" />
          <div className="flex flex-col">
            <span className="font-bold text-[#203223]">¿Querés encargar flores?</span>
            <span className="text-[11px] text-[#5E6D62]">Respondemos en minutos</span>
          </div>
          <button
            type="button"
            onClick={() => setTooltipVisible(false)}
            className="text-[#96A49A] hover:text-[#1D2520] p-1 transition-colors ml-1"
            aria-label="Cerrar mensaje"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp para consultar por flores frescas"
        className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 animate-whatsapp-pulse"
      >
        <WhatsAppIcon className="w-8 h-8 fill-white text-white drop-shadow-sm transition-transform group-hover:rotate-6" />
        {/* Unread dot indicator */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-[#C27A65] border-2 border-white rounded-full flex items-center justify-center text-[9px] font-bold text-white">
          1
        </span>
      </a>
    </div>
  );
}
