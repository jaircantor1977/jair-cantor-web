/**
 * Animations Module
 * Maneja animaciones de entrada con Intersection Observer API
 * 
 * Mejoras:
 * - Usa Intersection Observer (low impact performance)
 * - Lazy loading de animaciones
 * - No bloquea el thread principal
 * - Soporte para prefers-reduced-motion
 */

// Verificar si el usuario prefiere menos movimiento
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Elementos que se animarán
const animationSelectors = [
  ".service-card",
  ".case-feature",
  ".case-card",
  ".price-card",
  ".extra-card",
  ".trust-grid article",
];

// Clase para animación de entrada
const ANIMATION_CLASS = "fade-in-up";

// Inyectar estilos de animación si no existen
const injectAnimationStyles = () => {
  // Verificar si ya existe
  if (document.querySelector('style[data-animations]')) return;
  
  const style = document.createElement("style");
  style.setAttribute("data-animations", "true");
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .${ANIMATION_CLASS} {
      animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @media (prefers-reduced-motion: reduce) {
      .${ANIMATION_CLASS} {
        animation: none;
        opacity: 1;
        transform: none;
      }
    }
  `;
  document.head.appendChild(style);
};

// Configuración del Intersection Observer
const observerOptions = {
  root: null,
  rootMargin: "0px 0px -50px 0px", // Trigger 50px antes de que entre en viewport
  threshold: 0.1,
};

// Callback del observer
const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Agregar clase de animación cuando entra en viewport
      entry.target.classList.add(ANIMATION_CLASS);
      // Dejar de observar después de que se anima
      observer.unobserve(entry.target);
    }
  });
};

// Crear el observer
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Inicializar animaciones
const initAnimations = () => {
  if (prefersReducedMotion) {
    console.log("User prefers reduced motion - skipping animations");
    return;
  }
  
  // Inyectar estilos
  injectAnimationStyles();
  
  // Encontrar y observar elementos
  animationSelectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      observer.observe(el);
    });
  });
};

// Inicializar cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAnimations);
} else {
  initAnimations();
}

document.addEventListener("site-content-rendered", initAnimations);

// Exportar funcionalidad
export const cleanup = () => {
  observer.disconnect();
  document.removeEventListener("site-content-rendered", initAnimations);
};

export const observeElement = (element) => {
  if (element) {
    observer.observe(element);
  }
};

export const animateElement = (element) => {
  if (element && !prefersReducedMotion) {
    element.classList.add(ANIMATION_CLASS);
  }
};
