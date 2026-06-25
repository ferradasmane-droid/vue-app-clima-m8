<template>
  <main class="pagina">
    <section class="hero">
      <h2>Mis lugares favoritos</h2>
      <p>
        Esta sección depende del usuario conectado y está protegida por Vue Router.
      </p>
    </section>

    <section v-if="authStore.favoritos.length > 0" class="lista-favoritos">
      <article
        v-for="favorito in authStore.favoritos"
        :key="favorito"
        class="card-ciudad"
      >
        <h3>{{ favorito }}</h3>

        <p>Guardado como ciudad favorita de {{ authStore.nombreUsuario }}.</p>

        <button @click="eliminarFavorito(favorito)">
          Eliminar de favoritos
        </button>
      </article>
    </section>

    <p v-else class="mensaje-vacio">
      Todavía no tienes ciudades favoritas.
    </p>
  </main>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

const eliminarFavorito = ciudad => {
  authStore.eliminarFavorito(ciudad)
}
</script>