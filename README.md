# Jair Cantor Consulting

Sitio web de [jaircantorconsulting.org](https://jaircantorconsulting.org): landing page de consultoría en BI y análisis financiero, en español (`/`) e inglés (`/en`).

HTML, CSS y JavaScript puro, sin dependencias ni paso de build. Se publica en Vercel automáticamente con cada push a `main`.

## Estructura

| Archivo | Qué contiene |
|---|---|
| `index.html` / `en.html` | Página en español / inglés |
| `styles.css` | Todos los estilos |
| `config/site.es.json` / `config/site.en.json` | Servicios, paquetes, complementos y contacto |
| `modules/config-content.js` | Carga el JSON del idioma y reemplaza esas secciones del HTML |
| `modules/dashboard-demo.js` | Datos y lógica del demo de dashboards (ES/EN) |
| `modules/header.js`, `navigation.js`, `animations.js` | Header al hacer scroll, scroll suave y animaciones de entrada |
| `assets/` | Imágenes de los casos (WebP) |
| `vercel.json` | URLs limpias y cabeceras de seguridad |
| `sitemap.xml`, `robots.txt`, `manifest.json` | SEO y PWA |

## Editar contenido

- **Precios, servicios, complementos y contacto:** edita `config/site.es.json` y `config/site.en.json`. Actualiza también el mismo bloque en `index.html` / `en.html`, que se muestra si el JSON no carga.
- **Resto de secciones** (portada, casos, proceso, confianza): edita directamente `index.html` y `en.html`.
- **Demo de dashboards:** edita `modules/dashboard-demo.js`.

## Correr en local

```bash
node dev-server.cjs
```

Abre http://127.0.0.1:8143/ (español) o http://127.0.0.1:8143/en.html (inglés). El script de Vercel Insights da 404 en local; es normal.
