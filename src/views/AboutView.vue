<template>
  <section class="about">
    <h1>Acerca de la App del Clima</h1>

    <p>
      Esta aplicación fue desarrollada como una SPA con Vue 3 para consultar
      información del clima en distintas comunas de Chiloé.
    </p>

    <p>
      Los datos se obtienen desde la API pública de Open-Meteo, utilizando
      coordenadas de latitud y longitud para cada ciudad.
    </p>

    <div class="about-card">
      <h2>Funcionalidades principales</h2>

      <ul>
        <li>Listado de ciudades con clima actual.</li>
        <li>Búsqueda de ciudades usando v-model.</li>
        <li>Cambio de unidad entre Celsius y Fahrenheit.</li>
        <li>Vista de detalle con pronóstico semanal.</li>
        <li>Estadísticas de temperatura mínima, máxima y promedio.</li>
        <li>Navegación interna usando Vue Router.</li>
      </ul>
    </div>

    <div class="about-card">
      <h2>Tecnologías utilizadas</h2>

      <ul>
        <li>Vue 3</li>
        <li>Composition API</li>
        <li>Uso de "script setup"</li>
        <li>Vue Router</li>
        <li>Open-Meteo API</li>
        <li>CSS</li>
      </ul>
    </div>

    <RouterLink to="/" class="volver">
      ← Volver al inicio
    </RouterLink>
  </section>
</template>

<script setup></script>