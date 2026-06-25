<template>
  <main class="pagina-formulario">
    <section class="card-formulario">
      <h2>Iniciar sesión</h2>

      <form @submit.prevent="iniciarSesion">
        <div class="grupo-formulario">
          <label for="email">Correo electrónico</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="nelly@test.com"
          />
        </div>

        <div class="grupo-formulario">
          <label for="password">Contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="123456"
          />
        </div>

        <p v-if="authStore.error" class="mensaje-error">
          {{ authStore.error }}
        </p>

        <button type="submit" :disabled="authStore.cargando">
          {{ authStore.cargando ? 'Ingresando...' : 'Ingresar' }}
        </button>
      </form>

      <p class="texto-ayuda">
        ¿No tienes cuenta?
        <RouterLink to="/registro">Crear cuenta</RouterLink>
      </p>

      <div class="datos-prueba">
        <p><strong>Usuario de prueba:</strong></p>
        <p>Correo: nelly@test.com</p>
        <p>Contraseña: 123456</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const iniciarSesion = async () => {
  const loginCorrecto = await authStore.login(
    email.value.trim(),
    password.value
  )

  if (loginCorrecto) {
    router.push('/')
  }
}
</script>