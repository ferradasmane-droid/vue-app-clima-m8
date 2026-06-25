<template>
  <main class="pagina-formulario">
    <section class="card-formulario">
      <h2>Crear cuenta</h2>

      <form @submit.prevent="crearCuenta">
        <div class="grupo-formulario">
          <label for="nombre">Nombre</label>
          <input
            id="nombre"
            v-model="nombre"
            type="text"
            placeholder="Ingresa tu nombre"
          />
        </div>

        <div class="grupo-formulario">
          <label for="email">Correo electrónico</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div class="grupo-formulario">
          <label for="password">Contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Crea una contraseña"
          />
        </div>

        <p v-if="mensajeError" class="mensaje-error">
          {{ mensajeError }}
        </p>

        <p v-if="authStore.error" class="mensaje-error">
          {{ authStore.error }}
        </p>

        <button type="submit" :disabled="authStore.cargando">
          {{ authStore.cargando ? 'Registrando...' : 'Registrarme' }}
        </button>
      </form>

      <p class="texto-ayuda">
        ¿Ya tienes cuenta?
        <RouterLink to="/login">Iniciar sesión</RouterLink>
      </p>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const nombre = ref('')
const email = ref('')
const password = ref('')
const mensajeError = ref('')

const crearCuenta = async () => {
  mensajeError.value = ''

  if (!nombre.value.trim() || !email.value.trim() || !password.value.trim()) {
    mensajeError.value = 'Todos los campos son obligatorios'
    return
  }

  const registroCorrecto = await authStore.registrar({
    nombre: nombre.value.trim(),
    email: email.value.trim(),
    password: password.value,
  })

  if (registroCorrecto) {
    router.push('/')
  }
}
</script>