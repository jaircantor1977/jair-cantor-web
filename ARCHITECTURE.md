# 🏗️ Arquitectura del Proyecto

## Estructura de Carpetas

```
WEB_SITE_DJC/
├── index.html                 # Página principal (HTML semántico)
├── styles.css                 # Estilos (SMACSS/BEM, CSS Variables)
├── script.js                  # Archivo deprecado (ver modules/)
├── manifest.json              # PWA manifest
├── robots.txt                 # SEO robots file
├── sitemap.xml               # XML sitemap
├── .htaccess                 # Configuración Apache
│
├── modules/                   # Módulos JavaScript moderno (ES6)
│   ├── header.js             # Header scroll behavior
│   ├── navigation.js         # Smooth scroll navigation
│   └── animations.js         # Intersection Observer animations
│
├── assets/                    # Recursos multimedia
│   ├── case-bank-automation.jpg
│   └── case-retail-dashboard.jpg
│
├── REFACTORIZATION.md         # Documentación de cambios
└── DEPLOYMENT_GUIDE.md        # Guía de deployment

```

---

## 📐 Arquitectura CSS (SMACSS)

### Capas Organizacionales

```
THEME VARIABLES (Raíz)
    ↓
RESET & DEFAULTS (Normalize)
    ↓
TYPOGRAPHY (Base styles)
    ↓
LAYOUT MODULES (Header, Sections)
    ↓
COMPONENT MODULES (Cards, Buttons)
    ↓
RESPONSIVE MEDIA QUERIES
    ↓
ACCESSIBILITY OVERRIDES
    ↓
PRINT STYLES
```

### Estructura de Clases (BEM)

```css
/* Block */
.service-card { }

/* Element */
.service-card__icon { }
.service-card__title { }
.service-card__description { }

/* Modifier */
.service-card--featured { }
.service-card--disabled { }

/* En nuestro caso, utilizamos convención simplificada */
.service-card { }
.service-icon { } /* Related to service-card */
```

---

## 🎨 Sistema de Colores

### Colores Semánticos

```css
:root {
  /* Primary - Acción principal */
  --color-primary: #236aa5;
  --color-primary-dark: #102b57;
  --color-primary-light: #00c2a8;
  
  /* Accent - Destacados especiales */
  --color-accent: #bd9a27;
  
  /* Text - Tipografía */
  --color-text: #09192d;
  --color-text-secondary: #69798c;
  
  /* Background - Fondos */
  --color-background: #f7f9fc;
  --color-surface: #ffffff;
}

/* Modo oscuro */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: #f0f4f8;
    --color-background: #0a1628;
    --color-surface: #1a2942;
  }
}
```

---

## 📊 Escala Tipográfica (Fluid)

```css
h1 {
  font-size: clamp(2rem, 7vw, 6.8rem);
  /* Mín: 2rem (32px) */
  /* Preferencia: 7vw */
  /* Máx: 6.8rem (108px) */
}

h2 {
  font-size: clamp(1.8rem, 5vw, 5rem);
}

.hero-lede {
  font-size: clamp(1.08rem, 2vw, 1.34rem);
}
```

**Ventajas:**
- Responsive sin media queries
- Escalado fluido
- Mejor readability en todos los tamaños

---

## ✨ Sistema de Espaciado

```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 20px;
  --space-2xl: 24px;
  --space-3xl: 28px;
  --space-4xl: 32px;
}

/* Uso */
.button {
  padding: var(--space-md) var(--space-lg);  /* 12px 16px */
}

.section {
  padding: var(--space-4xl) var(--space-lg);  /* 32px 16px */
}
```

---

## 🌊 Sistema Z-Index

```css
:root {
  --z-base: 1;
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-modal: 30;
  --z-tooltip: 40;
}

/* Uso */
.site-header {
  z-index: var(--z-sticky);
}

.floating-card {
  z-index: var(--z-dropdown);
}
```

**Ventaja:** Evita conflictos de z-index confusos.

---

## 🎬 Sistema de Transiciones

```css
:root {
  --transition-fast: 120ms ease;
  --transition-base: 180ms ease;
  --transition-slow: 300ms ease;
}

/* Uso */
.button {
  transition: transform var(--transition-fast),
              box-shadow var(--transition-base);
}
```

---

## 🧩 Componentes Principales

### 1. **Header** (.site-header)
```css
.site-header {
  position: fixed;
  z-index: var(--z-sticky);
  backdrop-filter: blur(18px);
  transition: background var(--transition-base);
}

.site-header.is-scrolled {
  background: var(--color-overlay-dark);
  box-shadow: var(--shadow-lg);
}
```

**JS:** `modules/header.js`
- Actualiza clase `.is-scrolled` en scroll
- Usa RAF para performance

---

### 2. **Hero Section** (.hero)
```css
.hero {
  position: relative;
  min-height: 760px;
  contain: layout;
}

.hero-bg {
  position: absolute;
  background: linear-gradient(120deg, ...);
  clip-path: polygon(...);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: 58px;
}
```

---

### 3. **Buttons** (.button)
```css
.button {
  display: inline-flex;
  padding: 12px 20px;
  border-radius: var(--radius-full);
  font-weight: 900;
  transition: all var(--transition-fast);
}

.button.primary {
  background: var(--color-primary-light);
}

.button.secondary {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.28);
}
```

---

### 4. **Service Cards** (.service-card)
```css
.service-card {
  padding: 28px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-slow);
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

---

## 📱 Breakpoints Responsive

```css
/* Desktop first approach con max-width */

@media (max-width: 960px) {
  /* Tablet */
  .hero-grid {
    grid-template-columns: 1fr;
  }
  
  .service-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  /* Mobile */
  .hero-grid {
    grid-template-columns: 1fr;
  }
  
  .service-grid {
    grid-template-columns: 1fr;
  }
  
  h1 {
    font-size: clamp(2rem, 9.4vw, 2.28rem);
  }
}
```

---

## 🎯 JavaScript Modules

### 1. **header.js**
```javascript
// Responsabilidad: Animar header en scroll

export const cleanup = () => {
  window.removeEventListener("scroll", onScroll);
};

// Características:
// - RAF para performance
// - Throttling implícito
// - Passive event listener
```

### 2. **navigation.js**
```javascript
// Responsabilidad: Navegación suave

export const scrollToElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    element.focus({ preventScroll: true });
  }
};

// Características:
// - Event delegation
// - Accesibilidad (focus management)
// - Soporte teclado
```

### 3. **animations.js**
```javascript
// Responsabilidad: Animaciones de entrada

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "0px 0px -50px 0px" }
);

// Características:
// - No bloquea thread principal
// - Respeta prefers-reduced-motion
// - Limpieza de memoria
```

---

## 🔒 Seguridad & Privacidad

### Headers HTTP (.htaccess)

```
X-Frame-Options: SAMEORIGIN          → Previene clickjacking
X-Content-Type-Options: nosniff       → Previene MIME sniffing
X-XSS-Protection: 1; mode=block       → XSS protection
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=()    → Deniega permisos
```

### CSP (Content Security Policy)
```
Recomendado para producción:
default-src 'self';
script-src 'self' fonts.googleapis.com;
style-src 'self' 'unsafe-inline' fonts.googleapis.com;
font-src fonts.gstatic.com;
```

---

## 📈 Performance Optimizations

### CSS Containment
```css
body {
  contain: layout style;
}

.dashboard-shell {
  contain: layout paint;
}
```

**Beneficio:** Browser optimiza repaint/reflow

### CSS Variables vs Inline
```css
/* ✅ Mejor: Variables reutilizables */
:root { --shadow-lg: ... }
.card { box-shadow: var(--shadow-lg); }

/* ❌ Evitar: Valores hardcoded */
.card { box-shadow: 0 24px 80px rgba(...); }
```

---

## 🧪 Testear Cambios

### Agregar Nueva Sección
1. Crear HTML en `index.html`
2. Crear CSS en `styles.css` (seguir nomenclatura)
3. Si necesita animación:
   ```javascript
   // En animations.js
   const animationSelectors = [
     // ... existing ...
     ".nueva-seccion"
   ];
   ```

### Cambiar Color Principal
```css
:root {
  --color-primary: #NUEVO_COLOR;
}
/* Se propaga automáticamente a todos los elementos */
```

---

## 📚 Referencias de Estándares

- [MDN CSS Variables](https://developer.mozilla.org/docs/Web/CSS/--*)
- [CSS Containment](https://developer.mozilla.org/docs/Web/CSS/contain)
- [Intersection Observer](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API)
- [Web.dev Performance](https://web.dev/performance/)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Última actualización:** Abril 25, 2024
