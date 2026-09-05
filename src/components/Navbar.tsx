"use client";

import { useState } from "react";
import Image from "next/image";
import catalogoData from "@/data/catalogo.json";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Menu, X, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const whatsappUrl = getWhatsAppUrl();

  const navLinks = [
    { label: "Ramos de Estación", href: "#catalogo" },
    { label: "Flores Habituales", href: "#galeria" },
    { label: "Envíos", href: "#envios" },
    { label: "Eventos", href: "#eventos" },
    { label: "Sobre Nosotros", href: "#sobre-nosotros" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E2D8] transition-all">
      {/* Top micro banner */}
      <div className="bg-[#26402B] text-[#E8EFE9] text-xs py-1.5 px-4 text-center font-medium tracking-wide">
        <span>🌿 Flores frescas de mercado cada semana • Envíos a todo Pilar y countries</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#D5CBC0] bg-white shadow-sm shrink-0 transition-transform group-hover:scale-105">
              <Image
                src={catalogoData.negocio.logo || "/logo.jpg"}
                alt="Logo Florería Memorial"
                fill
                quality={95}
                sizes="48px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1D2520] leading-tight">
                {catalogoData.negocio.nombre}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#5E6D62] font-semibold">
                Oficio Floral Familiar • Pilar
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#3E4D42]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#26402B] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#26402B] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Direct Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${catalogoData.negocio.telefonoWhatsapp}`}
              className="flex items-center gap-2 text-xs font-semibold text-[#5E6D62] hover:text-[#26402B] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#26402B]" />
              <span>{catalogoData.negocio.telefonoMostrar}</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full transition-all shadow-sm hover:shadow active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2 rounded-full bg-[#25D366] text-white"
              aria-label="Abrir WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5 fill-white" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#1D2520] hover:bg-[#F0EAE1] transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E2D8] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-[#1D2520] hover:bg-[#F3EEE5] text-base font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#E8E2D8] space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 rounded-xl transition-all shadow-sm"
            >
              <WhatsAppIcon className="w-5 h-5 fill-white" />
              <span>Consultar por WhatsApp</span>
            </a>
            <p className="text-xs text-center text-[#5E6D62] pt-1">
              {catalogoData.negocio.ubicacionCorta}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
