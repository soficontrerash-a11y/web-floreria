import catalogoData from "@/data/catalogo.json";

/**
 * Genera un enlace directo a WhatsApp con texto codificado
 * @param mensaje - Texto opcional a enviar. Si no se indica, usa el predeterminado del Hero.
 * @returns URL lista para usar en etiquetas <a> o botones
 */
export function getWhatsAppUrl(mensaje?: string): string {
  const telefono = catalogoData.negocio.telefonoWhatsappSinPrefijo.replace(/\D/g, "");
  const texto = mensaje || catalogoData.hero.mensajeWhatsapp;
  return `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;
}

/**
 * Mensaje predeterminado requerido para cada ramo del catálogo:
 * "Hola, me gustaría encargar el [Nombre del Ramo]. ¿Qué variedades frescas tienen disponibles hoy?"
 */
export function getProductWhatsAppUrl(nombreProducto: string): string {
  const mensaje = `Hola, me gustaría encargar el ${nombreProducto}. ¿Qué variedades frescas tienen disponibles hoy?`;
  return getWhatsAppUrl(mensaje);
}
