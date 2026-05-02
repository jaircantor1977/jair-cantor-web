/**
 * Header Module
 * Maneja el comportamiento del header en scroll
 * 
 * Mejoras:
 * - Usa RAF para mejor performance
 * - Event listener con passive: true
 * - Throttling implícito con RAF
 */

const header = document.querySelector("[data-header]");

if (!header) {
  console.warn("Header element not found");
}

let ticking = false;
let lastScrollY = 0;

const updateHeader = () => {
  const isScrolled = lastScrollY > 24;
  header.classList.toggle("is-scrolled", isScrolled);
  ticking = false;
};

const onScroll = () => {
  lastScrollY = window.scrollY;
  
  if (!ticking) {
    requestAnimationFrame(updateHeader);
    ticking = true;
  }
};

// Inicializar estado del header
updateHeader();

// Event listener optimizado
window.addEventListener("scroll", onScroll, { passive: true });

// Limpieza en caso de que se descargue el módulo
export const cleanup = () => {
  window.removeEventListener("scroll", onScroll);
};
