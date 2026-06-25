<template>
  <div :class="['app', temaActual]">
    <header class="header">
      <RouterLink to="/" class="logo">
        App del Clima
      </RouterLink>
        
        <p v-if="authStore.isAuthenticated" class="usuario-header">
          Sesión activa: {{ authStore.nombreUsuario }}
        </p>
      

      <nav class="nav">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/about">Acerca</RouterLink>

        <RouterLink v-if="authStore.isAuthenticated" to="/favoritos">
          Favoritos
        </RouterLink>

        <RouterLink v-if="authStore.isAuthenticated" to="/perfil">
          Perfil
        </RouterLink>

        <RouterLink v-if="!authStore.isAuthenticated" to="/login">
          Login
        </RouterLink>

        <RouterLink v-if="!authStore.isAuthenticated" to="/registro">
          Registro
        </RouterLink>

        <button
          v-if="authStore.isAuthenticated"
          class="btn-salir"
          @click="cerrarSesion"
        >
          Cerrar sesión
        </button>
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const temaActual = computed(() => {
  return authStore.preferencias.tema === 'oscuro'
    ? 'tema-oscuro'
    : 'tema-claro'
})

const cerrarSesion = () => {
  authStore.logout()
  router.push('/login')
}
</script>
