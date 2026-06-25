<template>
  <section class="about">
    <h1>Acerca de la App del Clima</h1>

    <p>
      Esta aplicación fue desarrollada como una SPA con Vue 3 para consultar información del clima
      en distintas comunas de Chiloé.
    </p>

    <p>
      Los datos se obtienen desde la API pública de Open-Meteo, utilizando coordenadas de latitud y
      longitud para cada ciudad.
    </p>

    <P>
      En esta versión del Módulo 7 se agregó un sistema de usuarios, autenticación, estado global y
      personalización de la experiencia según el usuario conectado.
    </P>

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
      <h2>Funcionalidaes agregadas en el Módulo 7</h2>

      <ul>
        <li>Inicio de sesión con usuarios simulados.</li>
        <li>Registro básico de nuevos usuarios.</li>
        <li>Estado global de usuario con Pinia.</li>
        <li>Rutas protegidas para usuarios autenticados.</li>
        <li>Visualización del usuario conectado.</li>
        <li>Cierre de sesión.</li>
        <li>Lista de ciudades favoritas por usuario.</li>
        <li>Preferencias personalizadas de temperatura y tema visual.</li>
      </ul>
    </div>

    <div class="about-card">
      <h2>Tecnologías utilizadas</h2>

      <ul>
        <li>Vue 3</li>
        <li>Vite</li>
        <li>Composition API</li>
        <li>Uso de "script setup"</li>
        <li>Vue Router</li>
        <li>Pinia</li>
        <li>Open-Meteo API</li>
        <li>LocalStorage</li>
        <li>CSS</li>
      </ul>
    </div>

<div class="about-card">
      <h2>Nota técnica</h2>

      <p>
        En este proyecto se utiliza Pinia como alternativa moderna para Vue 3, para
        manejar el estado global de autenticación, favoritos y preferencias del usuario.
      </p>
    </div>

    <RouterLink to="/" class="volver"> ← Volver al inicio </RouterLink>
  </section>
</template>

<script setup></script>
