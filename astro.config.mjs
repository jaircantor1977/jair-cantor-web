import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://jaircantorconsulting.org",
  // en.astro -> en.html, served at /en thanks to cleanUrls in vercel.json
  build: { format: "file" },
});
