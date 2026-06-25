<template>
  <main class="pagina-formulario">
    <section v-if="authStore.usuario" class="card-formulario">
      <h2>Mi perfil</h2>

      <div class="datos-usuario">
        <p>
          <strong>Nombre:</strong>
          {{ authStore.usuario?.nombre }}
        </p>

        <p>
          <strong>Correo:</strong>
          {{ authStore.usuario?.email }}
        </p>
      </div>

      <form @submit.prevent="guardarPreferencias">
        <div class="grupo-formulario">
          <label for="unidad">Unidad de temperatura</label>

          <select id="unidad" v-model="unidad">
            <option value="C">Celsius °C</option>
            <option value="F">Fahrenheit °F</option>
          </select>
        </div>

        <div class="grupo-formulario">
          <label for="tema">Tema visual</label>

          <select id="tema" v-model="tema">
            <option value="claro">Claro</option>
            <option value="oscuro">Oscuro</option>
          </select>
        </div>

        <button type="submit">
          Guardar preferencias
        </button>
      </form>

      <p v-if="mensaje" class="mensaje-exito">
        {{ mensaje }}
      </p>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

const unidad = ref(authStore.preferencias.unidad)
const tema = ref(authStore.preferencias.tema)
const mensaje = ref('')

const guardarPreferencias = () => {
  authStore.actualizarPreferencias({
    unidad: unidad.value,
    tema: tema.value,
  })

  mensaje.value = 'Preferencias actualizadas correctamente'
}
</script>