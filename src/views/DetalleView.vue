<template>
  <section>
    <RouterLink to="/" class="volver"> ← Volver al inicio </RouterLink>

    <p v-if="cargando" class="mensaje">Cargando detalle del clima...</p>

    <p v-if="error" class="error">
      {{ error }}
    </p>

    <div v-if="ciudad && clima" class="detalle">
      <div class="detalle-header" :class="claseClimaActual">
        <img :src="ciudad.imagen" :alt="ciudad.nombre" />

        <div>
          <h1>{{ ciudad.nombre }}</h1>
          <p>{{ ciudad.pais }}</p>
          <p class="icono-grande">{{ iconoActual }}</p>
          <p>{{ descripcionActual }}</p>
        </div>
      </div>

      <section class="detalle-card" :class="claseClimaActual">
        <h2>Clima actual</h2>

        <p>
          Temperatura:
          <strong>{{ clima.current.temperature_2m }}°C</strong>
        </p>

        <p>
          Humedad:
          <strong>{{ clima.current.relative_humidity_2m }}%</strong>
        </p>

        <p>
          Viento:
          <strong>{{ clima.current.wind_speed_10m }} km/h</strong>
        </p>
      </section>

      <section>
        <h2>Pronóstico semanal</h2>

        <div class="grid-pronostico">
          <article
            v-for="(dia, index) in clima.daily.time"
            :key="dia"
            class="pronostico-card"
            :class="obtenerClaseClima(clima.daily.weather_code[index])"
          >
            <h3>{{ formatearFecha(dia) }}</h3>

            <p class="icono">
              {{ obtenerIconoClima(clima.daily.weather_code[index]) }}
            </p>

            <p>
              {{ obtenerDescripcionClima(clima.daily.weather_code[index]) }}
            </p>

            <p>
              Mínima:
              <strong>{{ clima.daily.temperature_2m_min[index] }}°C</strong>
            </p>

            <p>
              Máxima:
              <strong>{{ clima.daily.temperature_2m_max[index] }}°C</strong>
            </p>
          </article>
        </div>
      </section>

      <EstadisticasClima
        :temperaturas-minimas="clima.daily.temperature_2m_min"
        :temperaturas-maximas="clima.daily.temperature_2m_max"
      />
    </div>

    <p v-if="!ciudad && !cargando" class="mensaje">No se encontró la ciudad solicitada.</p>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ciudadesBase } from '../data/ciudades'
import { obtenerClima, obtenerDescripcionClima, obtenerIconoClima } from '../services/ClimaServices'
import EstadisticasClima from '../components/EstadisticasClima.vue'

const route = useRoute()

const clima = ref(null)
const cargando = ref(true)
const error = ref('')

const ciudad = computed(() => {
  return ciudadesBase.find((item) => item.id === Number(route.params.id))
})

onMounted(async () => {
  try {
    if (!ciudad.value) {
      return
    }

    clima.value = await obtenerClima(ciudad.value.lat, ciudad.value.lon)
  } catch (e) {
    error.value = 'No se pudo cargar el detalle desde Open-Meteo.'
  } finally {
    cargando.value = false
  }
})

const descripcionActual = computed(() => {
  if (!clima.value) return ''

  return obtenerDescripcionClima(clima.value.current.weather_code)
})

const iconoActual = computed(() => {
  if (!clima.value) return ''

  return obtenerIconoClima(clima.value.current.weather_code)
})

const formatearFecha = (fecha) => {
  const opciones = {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  }

  return new Date(fecha).toLocaleDateString('es-CL', opciones)
}

const claseClimaActual = computed(() => {
  if (!clima.value) return 'card-normal'

  const codigo = clima.value.current.weather_code

  if (codigo === 0) return 'card-soleado'
  if ([1, 2].includes(codigo)) return 'card-parcial'
  if (codigo === 3) return 'card-nublado'
  if ([45, 48].includes(codigo)) return 'card-neblina'
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(codigo)) return 'card-lluvia'
  if ([71, 73, 75].includes(codigo)) return 'card-nieve'
  if (codigo === 95) return 'card-tormenta'

  return 'card-normal'
})

const obtenerClaseClima = (codigo) => {
  if (codigo === 0) return 'card-soleado'
  if ([1, 2].includes(codigo)) return 'card-parcial'
  if (codigo === 3) return 'card-nublado'
  if ([45, 48].includes(codigo)) return 'card-neblina'
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(codigo)) return 'card-lluvia'
  if ([71, 73, 75].includes(codigo)) return 'card-nieve'
  if (codigo === 95) return 'card-tormenta'

  return 'card-normal'
}
</script>
