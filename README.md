# App del Clima con Vue 3 y Open-Meteo

## Descripción

Este proyecto recrea una App del Clima como una SPA, aplicación de una sola página, desarrollada con Vue 3, Vite, Vue Router y Composition API.

La aplicación consume datos reales desde la API Open-Meteo para mostrar el clima actual y el pronóstico semanal de distintas ciudades.

## Objetivo del proyecto

Recrear una aplicación del clima utilizando Vue, separando la lógica en componentes, vistas, rutas, datos y servicios.

## Tecnologías utilizadas

- Vue 3
- Vite
- Vue Router
- Composition API
- Script setup
- JavaScript
- CSS
- Open-Meteo API
- Git y GitHub

## Funcionalidades

- Visualización de ciudades en cards.
- Consulta del clima actual desde Open-Meteo.
- Vista de detalle por ciudad.
- Pronóstico semanal.
- Estadísticas de temperatura mínima, máxima y promedio.
- Buscador de ciudades.
- Cambio de unidad entre Celsius y Fahrenheit.
- Navegación sin recargar la página.
- Diseño responsive.

## Rutas

- `/` : Vista principal con listado de ciudades.
- `/detalle/:id` : Vista de detalle de una ciudad seleccionada.
- `/about` : Acerca, muestra información sobre la aplicación, la API utilizada y las tecnologías del proyecto.

## Directivas y recursos de Vue usados

- `v-for` para recorrer ciudades y pronóstico.
- `v-if` para mensajes de carga, error y ciudad no encontrada.
- `v-show` para mostrar cantidad de resultados.
- `v-model` para el buscador y selector de unidad.
- `@submit.prevent` para controlar el formulario.
- `@click` para limpiar la búsqueda.
- `RouterLink` para navegar entre vistas.
- `RouterView` para mostrar las rutas.
- `ref` para datos reactivos.
- `computed` para datos calculados.
- `onMounted` para consumir la API al cargar la vista.

## Instalación

```bash
npm install
```

## Autora
Nelly Ferrada

