<template>
  <section class="detalle-page">
    <div class="detalle-contenedor">
      <RouterLink to="/" class="volver">
        ← Volver al inicio
      </RouterLink>

      <p v-if="climaStore.cargando" class="mensaje">
        Cargando detalle del clima...
      </p>

      <p v-if="climaStore.error" class="error">
        {{ climaStore.error }}
      </p>

      <div
        v-if="climaStore.ciudadSeleccionada && climaStore.climaSeleccionado"
        class="detalle"
      >
        <div class="detalle-header" :class="claseClimaActual">
          <img
            :src="climaStore.ciudadSeleccionada.imagen"
            :alt="climaStore.ciudadSeleccionada.nombre"
          />

          <div>
            <h1>{{ climaStore.ciudadSeleccionada.nombre }}</h1>
            <p>{{ climaStore.ciudadSeleccionada.pais }}</p>
            <p class="icono-grande">{{ iconoActual }}</p>
            <p>{{ descripcionActual }}</p>
          </div>
        </div>

        <section class="detalle-card clima-actual" :class="claseClimaActual">
          <h2>Clima actual</h2>

          <p>
            Temperatura:
            <strong>
              {{ climaStore.convertirTemperatura(climaStore.climaSeleccionado.current.temperature_2m) }}°{{ climaStore.unidad }}
            </strong>
          </p>

          <p>
            Humedad:
            <strong>
              {{ climaStore.climaSeleccionado.current.relative_humidity_2m }}%
            </strong>
          </p>

          <p>
            Viento:
            <strong>
              {{ climaStore.climaSeleccionado.current.wind_speed_10m }} km/h
            </strong>
          </p>
        </section>

        <section class="alerta-meteorologica">
          <h2>Alerta meteorológica</h2>

          <p>
            {{ climaStore.alertaMeteorologica }}
          </p>
        </section>

        <section>
          <h2>Pronóstico semanal</h2>

          <div class="grid-pronostico">
            <article
              v-for="(dia, index) in climaStore.climaSeleccionado.daily.time"
              :key="dia"
              class="pronostico-card"
              :class="obtenerClaseClima(climaStore.climaSeleccionado.daily.weather_code[index])"
            >
              <h3>{{ formatearFecha(dia) }}</h3>

              <p class="icono">
                {{ obtenerIconoClima(climaStore.climaSeleccionado.daily.weather_code[index]) }}
              </p>

              <p>
                {{ obtenerDescripcionClima(climaStore.climaSeleccionado.daily.weather_code[index]) }}
              </p>

              <p>
                Mínima:
                <strong>
                  {{ climaStore.convertirTemperatura(climaStore.climaSeleccionado.daily.temperature_2m_min[index]) }}°{{ climaStore.unidad }}
                </strong>
              </p>

              <p>
                Máxima:
                <strong>
                  {{ climaStore.convertirTemperatura(climaStore.climaSeleccionado.daily.temperature_2m_max[index]) }}°{{ climaStore.unidad }}
                </strong>
              </p>
            </article>
          </div>
        </section>

        <EstadisticasClima
          :temperaturas-minimas="temperaturasMinimasConvertidas"
          :temperaturas-maximas="temperaturasMaximasConvertidas"
          :unidad="climaStore.unidad"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useClimaStore } from '../stores/climaStore'

import {
  obtenerDescripcionClima,
  obtenerIconoClima,
  obtenerClaseClima,
} from '../services/ClimaServices'

import EstadisticasClima from '../components/EstadisticasClima.vue'

const route = useRoute()
const climaStore = useClimaStore()

onMounted(() => {
  climaStore.cargarDetalleCiudad(route.params.id)
})

const descripcionActual = computed(() => {
  if (!climaStore.climaSeleccionado) return ''

  return obtenerDescripcionClima(
    climaStore.climaSeleccionado.current.weather_code,
  )
})

const iconoActual = computed(() => {
  if (!climaStore.climaSeleccionado) return ''

  return obtenerIconoClima(
    climaStore.climaSeleccionado.current.weather_code,
  )
})

const claseClimaActual = computed(() => {
  if (!climaStore.climaSeleccionado) return 'card-normal'

  return obtenerClaseClima(
    climaStore.climaSeleccionado.current.weather_code,
  )
})

const temperaturasMinimasConvertidas = computed(() => {
  if (!climaStore.climaSeleccionado) return []

  return climaStore.climaSeleccionado.daily.temperature_2m_min.map(
    (temperatura) => climaStore.convertirTemperatura(temperatura),
  )
})

const temperaturasMaximasConvertidas = computed(() => {
  if (!climaStore.climaSeleccionado) return []

  return climaStore.climaSeleccionado.daily.temperature_2m_max.map(
    (temperatura) => climaStore.convertirTemperatura(temperatura),
  )
})

const formatearFecha = (fecha) => {
  const opciones = {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  }

  return new Date(fecha).toLocaleDateString('es-CL', opciones)
}
</script>
