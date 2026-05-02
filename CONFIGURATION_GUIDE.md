# Guia de configuracion del sitio

La informacion que cambia con frecuencia vive en estos archivos:

- `config/site.es.json`: contenido de la version en espanol.
- `config/site.en.json`: contenido de la version en ingles.

## Cambiar precios de paquetes

Edita `packages.items` y modifica el campo `price`.

```json
{
  "name": "Profesional",
  "price": "$250 USD",
  "delivery": "Entrega: 5 dias"
}
```

## Agregar un paquete

Agrega un objeto nuevo dentro de `packages.items`.

Campos disponibles:

- `name`: nombre del paquete.
- `price`: precio visible.
- `delivery`: plazo visible.
- `style`: deja `""`, usa `"featured"` para resaltado azul o `"premium"` para borde dorado.
- `badge`: texto pequeno superior, por ejemplo `"Mas popular"`.
- `features`: lista de beneficios.

## Agregar un servicio principal

Agrega un objeto nuevo dentro de `services.items`.

```json
{
  "title": "Nuevo servicio",
  "description": "Descripcion corta del servicio."
}
```

La numeracion se genera automaticamente.

## Agregar un servicio adicional

Agrega un objeto nuevo dentro de `additionalServices.items`.

```json
{
  "name": "Nuevo servicio adicional",
  "price": "$100 - $200",
  "description": "Descripcion corta que aparece dentro de la tarjeta.",
  "details": [
    "Detalle desplegable 1",
    "Detalle desplegable 2",
    "Detalle desplegable 3"
  ]
}
```

Tambien puedes editar `additionalServices.description` y `additionalServices.label` para cambiar el texto superior del bloque.

## Cambiar datos de contacto

Edita la seccion `contact`.

```json
{
  "availability": "Disponible en Workana &middot; Colombia",
  "buttonLabel": "Contactar en Workana",
  "url": "https://www.workana.com/"
}
```

## Importante

Mantén comas entre elementos y no dejes una coma despues del ultimo elemento de una lista. Si un JSON queda invalido, la pagina usa el contenido fijo del HTML como respaldo.
