/**
 * Navigation Module
 * Maneja la navegación suave entre secciones
 * 
 * Mejoras:
 * - Event delegation mejorada
 * - Accesibilidad: focus management
 * - Prevención de doble-scroll
 */

// Seleccionar todos los enlaces internos
const scrollLinks = document.querySelectorAll('a[href^="#"]');

// Crear listener reutilizable
const handleScrollLink = (event) => {
  const href = event.currentTarget.getAttribute("href");
  
  // Ignorar si el href es solo "#"
  if (!href || href === "#") return;
  
  const target = document.querySelector(href);
  
  if (!target) {
    console.warn(`Target not found for anchor: ${href}`);
    return;
  }
  
  event.preventDefault();
  
  // Usar scrollIntoView nativo con comportamiento suave
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  
  // Opcional: actualizar focus para accesibilidad
  target.focus({ preventScroll: true });
};

// Agregar event listeners
scrollLinks.forEach((link) => {
  link.addEventListener("click", handleScrollLink);
});

// Soporte para navegación por teclado
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.target.matches('a[href^="#"]')) {
    handleScrollLink({ currentTarget: event.target, preventDefault: () => {} });
  }
});

// Exportar función de limpieza
export const cleanup = () => {
  scrollLinks.forEach((link) => {
    link.removeEventListener("click", handleScrollLink);
  });
};

// Exportar funcionalidad para uso externo
export const scrollToElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    element.focus({ preventScroll: true });
  }
};
