"use client";

import { useEffect } from "react";
import { trackEvent, getTrafficAttribution } from "@/lib/tracker";

function detectPlacement(el: HTMLElement): string {
  // Check explicit data attribute first
  const explicit = el.closest("[data-placement]")?.getAttribute("data-placement");
  if (explicit) return explicit;

  // Check closest section or container id/role
  const header = el.closest("header");
  if (header) return "navbar";

  const footer = el.closest("footer");
  if (footer) return "footer";

  const floating = el.closest("[class*='fixed']");
  if (floating) return "flotante";

  const section = el.closest("section");
  if (section?.id) {
    if (section.id === "galeria") return "flores_estacion";
    if (section.id === "servicios") return "servicios";
    if (section.id === "sobre-nosotros" || section.id === "ubicacion") return "ubicacion";
    return section.id;
  }

  // Hero section detection
  if (el.closest("section")?.querySelector("h1")) {
    return "hero";
  }

  return "general";
}

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // 1. Initial page view
    getTrafficAttribution();
    trackEvent("page_view", "homepage");

    // 2. Global click delegator for WhatsApp, Instagram, and Google Maps
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest("a") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.href || "";
      const placement = detectPlacement(link);

      if (
        href.includes("wa.me") ||
        href.includes("whatsapp.com") ||
        link.getAttribute("data-track") === "whatsapp"
      ) {
        trackEvent("click_whatsapp", placement);
      } else if (
        href.includes("instagram.com") ||
        link.getAttribute("data-track") === "instagram"
      ) {
        trackEvent("click_instagram", placement);
      } else if (
        href.includes("google.com/maps") ||
        href.includes("goo.gl/maps") ||
        link.getAttribute("data-track") === "maps"
      ) {
        trackEvent("click_google_maps", placement);
      }
    };

    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  return <>{children}</>;
}
