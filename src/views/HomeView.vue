<template>
  <section>
    <div class="intro">
      <h1>Consulta el clima actual</h1>
      <p>Revisa el clima de distintas ciudades usando datos reales desde Open-Meteo.</p>
    </div>

    <form class="formulario" @submit.prevent="buscar">
      <input v-model="busqueda" type="text" placeholder="Buscar ciudad..." />

      <select v-model="unidad">
        <option value="C">Celsius °C</option>
        <option value="F">Fahrenheit °F</option>
      </select>

      <button type="submit">Buscar</button>

      <button type="button" @click="limpiarBusqueda">Limpiar</button>
    </form>

    <p v-if="cargando" class="mensaje">Cargando información del clima...</p>

    <p v-if="error" class="error">
      {{ error }}
    </p>

    <p v-show="!cargando && ciudadesFiltradas.length > 0" class="resultado">
      Ciudades encontradas: {{ ciudadesFiltradas.length }}
    </p>

    <p v-if="!cargando && ciudadesFiltradas.length === 0" class="mensaje">
      No se encontró ninguna ciudad.
    </p>

    <div class="grid" :class="{ 'grid-una-card': ciudadesFiltradas.length === 1 }">
      <ClimaCard
        v-for="ciudad in ciudadesFiltradas"
        :key="ciudad.id"
        :ciudad="ciudad"
        :unidad="unidad"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ClimaCard from '../components/ClimaCard.vue'
import { ciudadesBase } from '../data/ciudades'
import {
  obtenerClima,
  obtenerDescripcionClima,
  obtenerIconoClima,
} from '../services/ClimaServices.js'

const busqueda = ref('')
const unidad = ref('C')
const ciudades = ref([])
const cargando = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const ciudadesConClima = await Promise.all(
      ciudadesBase.map(async (ciudad) => {
        const clima = await obtenerClima(ciudad.lat, ciudad.lon)

        return {
          ...ciudad,
          temperatura: clima.current.temperature_2m,
          humedad: clima.current.relative_humidity_2m,
          viento: clima.current.wind_speed_10m,
          codigoClima: clima.current.weather_code,
          descripcion: obtenerDescripcionClima(clima.current.weather_code),
          icono: obtenerIconoClima(clima.current.weather_code),
        }
      }),
    )

    ciudades.value = ciudadesConClima
  } catch (e) {
    error.value = 'No se pudo cargar la información desde Open-Meteo.'
  } finally {
    cargando.value = false
  }
})

const ciudadesFiltradas = computed(() => {
  return ciudades.value.filter((ciudad) =>
    ciudad.nombre.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

const buscar = () => {
  console.log('Búsqueda realizada:', busqueda.value)
}

const limpiarBusqueda = () => {
  busqueda.value = ''
}
</script>
