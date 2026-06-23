<template>
  <div>
    <header class="header">
      <RouterLink to="/" class="logo"> 🌦️ App del Clima </RouterLink>

      <nav class="nav">
        <RouterLink to="/"> Inicio </RouterLink>
        <RouterLink to="/about">Acerca</RouterLink>
      </nav> 
    </header>

    <main class="contenedor">
      <RouterView />
    </main>
  </div>
</template>

<script setup></script>

<style scoped></style>
