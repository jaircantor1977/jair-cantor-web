# Jair Cantor Consulting

Sitio web de [jaircantorconsulting.org](https://jaircantorconsulting.org): landing page de consultoría en BI y análisis financiero, en español (`/`) e inglés (`/en`).

Hecho con [Astro](https://astro.build): se genera HTML estático en `dist/` y Vercel lo publica automáticamente con cada push a `main`.

## Estructura

| Ruta | Qué contiene |
|---|---|
| `src/content/es.json` / `en.json` | **Todo el texto del sitio**, un archivo por idioma |
| `src/components/` | Una plantilla por sección (Hero, Dashboards, Services, Cases, Packages, Process, Contact…) |
| `src/components/HomePage.astro` | Orden de las secciones |
| `src/layouts/Base.astro` | `<head>`: SEO, Open Graph, favicons, fuentes y scripts |
| `src/pages/index.astro` / `en.astro` | Las dos páginas: cada una carga su archivo de contenido |
| `src/styles/global.css` | Todos los estilos |
| `src/scripts/` | Header al hacer scroll, scroll suave, animaciones, complementos desplegables y demo de dashboards |
| `public/` | Archivos que se copian tal cual: imágenes, favicons, `manifest.json`, `robots.txt`, `sitemap.xml` |
| `vercel.json` | Build de Astro, URLs limpias y cabeceras de seguridad |

## Editar contenido

Cambia el texto, precios, servicios, casos o datos del demo en `src/content/es.json` y en `src/content/en.json`. Ambas páginas usan las mismas plantillas, así que no hay que tocar HTML para cambiar contenido.

Para agregar o reordenar secciones, edita `src/components/HomePage.astro`.

## Correr en local

```bash
npm install
```

```bash
npm run dev
```

Abre http://localhost:4321/ (español) o http://localhost:4321/en (inglés). Para probar la versión compilada: `npm run build` y luego `npm run preview`. El script de Vercel Insights da 404 en local; es normal.
