<template>
  <section>
    <div class="contenedor">
      <div class="intro">
        <h1>Consulta el clima actual</h1>

        <p>
          Revisa el clima de distintas ciudades usando datos reales desde Open-Meteo.
        </p>

        <p v-if="authStore.isAuthenticated" class="usuario-activo">
          Sesión activa: {{ authStore.nombreUsuario }}
        </p>
      </div>

      <form class="formulario" @submit.prevent="buscar">
        <input
          v-model="busqueda"
          type="text"
          placeholder="Buscar ciudad..."
        />

        <select v-model="unidadSeleccionada">
          <option value="C">Celsius °C</option>
          <option value="F">Fahrenheit °F</option>
        </select>

        <button type="submit">
          Buscar
        </button>

        <button type="button" @click="limpiarBusqueda">
          Limpiar
        </button>
      </form>

      <p v-if="climaStore.cargando" class="mensaje">
        Cargando información del clima...
      </p>

      <p v-if="climaStore.error" class="error">
        {{ climaStore.error }}
      </p>

      <p
        v-show="!climaStore.cargando && ciudadesFiltradas.length > 0"
        class="resultado"
      >
        Ciudades encontradas: {{ ciudadesFiltradas.length }}
      </p>

      <p
        v-if="!climaStore.cargando && ciudadesFiltradas.length === 0"
        class="mensaje"
      >
        No se encontró ninguna ciudad.
      </p>

      <div
        class="grid"
        :class="{ 'grid-una-card': ciudadesFiltradas.length === 1 }"
      >
        <div
          v-for="ciudad in ciudadesFiltradas"
          :key="ciudad.id"
          class="card-contenedor"
        >
          <ClimaCard
            :ciudad="ciudad"
            :unidad="climaStore.unidad"
          />

          <button
            v-if="authStore.isAuthenticated"
            class="btn-favorito"
            type="button"
            @click="agregarFavorito(ciudad)"
          >
            Agregar a favoritos
          </button>

          <p v-else class="texto-login">
            Inicia sesión para guardar esta ciudad.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import ClimaCard from '../components/ClimaCard.vue'
import { useAuthStore } from '../stores/authStore'
import { useClimaStore } from '../stores/climaStore'

const authStore = useAuthStore()
const climaStore = useClimaStore()

const busqueda = ref('')
const unidadSeleccionada = ref(climaStore.unidad)

onMounted(() => {
  climaStore.cargarCiudades()
})

watch(unidadSeleccionada, (nuevaUnidad) => {
  climaStore.cambiarUnidad(nuevaUnidad)
})

const ciudadesFiltradas = computed(() => {
  return climaStore.ciudadesDisponibles.filter((ciudad) =>
    ciudad.nombre.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

const buscar = () => {
  console.log('Búsqueda realizada:', busqueda.value)
}

const limpiarBusqueda = () => {
  busqueda.value = ''
}

const agregarFavorito = (ciudad) => {
  authStore.agregarFavorito(ciudad.nombre)
}
</script>