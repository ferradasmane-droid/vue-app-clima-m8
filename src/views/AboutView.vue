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

    <p>
      En esta versión final se integran las funcionalidades trabajadas en los
      módulos anteriores, incorporando consumo de API, estado global,
      autenticación, favoritos, preferencias de usuario, estadísticas semanales
      y alertas meteorológicas.
    </p>

    <div class="about-card">
      <h2>Funcionalidades principales del clima</h2>

      <ul>
        <li>Listado de ciudades con clima actual.</li>
        <li>Búsqueda de ciudades usando v-model.</li>
        <li>Cambio de unidad entre Celsius y Fahrenheit.</li>
        <li>Vista de detalle con pronóstico semanal.</li>
        <li>Estadísticas de temperatura mínima, máxima y promedio.</li>
        <li>Alertas meteorológicas generadas por reglas simples.</li>
        <li>Navegación interna usando Vue Router.</li>
      </ul>
    </div>

    <div class="about-card">
      <h2>Funcionalidades de usuario</h2>

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
      <h2>Estado global</h2>

      <ul>
        <li>
          <strong>authStore:</strong> administra login, registro, usuario
          autenticado, favoritos y preferencias.
        </li>

        <li>
          <strong>climaStore:</strong> administra ciudades, clima actual,
          detalle, pronóstico, carga, errores, unidad de temperatura y alertas.
        </li>
      </ul>
    </div>

    <div class="about-card">
      <h2>Tecnologías utilizadas</h2>

      <ul>
        <li>Vue 3</li>
        <li>Vite</li>
        <li>Composition API</li>
        <li>Uso de script setup</li>
        <li>Vue Router</li>
        <li>Pinia como alternativa moderna a Vuex</li>
        <li>Open-Meteo API</li>
        <li>LocalStorage</li>
        <li>Vitest y Vue Test Utils</li>
        <li>CSS</li>
        <li>Git y GitHub</li>
      </ul>
    </div>

    <div class="about-card">
      <h2>Nota técnica</h2>

      <p>
        Aunque la pauta menciona Vuex, este proyecto utiliza Pinia como
        alternativa moderna recomendada para Vue 3. Pinia cumple la misma
        función de administrar el estado global de la aplicación.
      </p>
    </div>

    <RouterLink to="/" class="volver">
      ← Volver al inicio
    </RouterLink>
  </section>
</template>

<script setup></script>
